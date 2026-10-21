/* Fuochi d'artificio su canvas per il tema "newyear" (articolo di
   Capodanno). Nessuna libreria, nessuna immagine: razzi e scintille
   disegnati a mano. Caricato SOLO con import() dinamico da fireworks.tsx,
   dopo il load della pagina e a browser inattivo: non pesa sul bundle
   iniziale né sull'LCP.

   Contenimento dei costi:
   - devicePixelRatio limitato a 1,5;
   - tetto di particelle (più basso sugli schermi stretti);
   - animazione ferma quando il canvas è fuori schermo
     (IntersectionObserver) o la scheda è nascosta (visibilitychange):
     nessun requestAnimationFrame attivo in quei casi. */

export type FireworksOptions = {
  /* Fascia verticale (frazioni dell'altezza, 0 = in alto) in cui
     esplodono i fuochi. */
  bandTop: number;
  bandBottom: number;
  /* Pausa tra un lancio automatico e l'altro, in ms. */
  minDelay: number;
  maxDelay: number;
};

export type FireworksHandle = {
  /* Raffica di `count` razzi, uno ogni ~150 ms. */
  burst: (count: number) => void;
  destroy: () => void;
};

type Rocket = { x: number; y: number; vy: number; targetY: number; hue: string };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; decay: number; color: string; size: number };

/* Oro, champagne, avorio, rosa e azzurro tenui: in tono con la palette del
   tema, mai colori saturi da luna park. */
const COLORS = ["#f1dfb4", "#e3c278", "#ffd98a", "#fff6e0", "#f4a9b8", "#a9c8ff"];
const MAX_DPR = 1.5;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

export function startFireworks(canvas: HTMLCanvasElement, options: FireworksOptions): FireworksHandle {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { burst: () => {}, destroy: () => {} };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let maxSparks = 360;
  const rockets: Rocket[] = [];
  const sparks: Spark[] = [];
  const timers = new Set<number>();
  let frame = 0;
  let last = 0;
  let nextLaunch = 0;
  let inView = false;
  let pageVisible = document.visibilityState === "visible";
  let destroyed = false;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    maxSparks = width < 640 ? 220 : 380;
  }

  function launch() {
    if (width === 0 || height === 0) return;
    const targetY = rand(options.bandTop, options.bandBottom) * height;
    rockets.push({
      x: rand(0.12, 0.88) * width,
      y: Math.min(height, targetY + height * 0.45),
      vy: -rand(5.5, 7.5),
      targetY,
      hue: pick(COLORS),
    });
  }

  function explode(rocket: Rocket) {
    const room = maxSparks - sparks.length;
    if (room <= 0) return;
    const count = Math.min(room, Math.round(rand(36, 58)));
    const power = Math.min(3, Math.max(1.6, Math.min(width, height) / 150));
    const second = Math.random() < 0.45 ? pick(COLORS) : rocket.hue;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + rand(-0.08, 0.08);
      const speed = rand(0.55, 1) * power;
      sparks.push({
        x: rocket.x,
        y: rocket.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: rand(0.011, 0.018),
        color: i % 3 === 0 ? second : rocket.hue,
        size: rand(1.1, 2),
      });
    }
  }

  function step(time: number) {
    frame = 0;
    if (!running()) return;
    // Passo normalizzato a 60 fps, limitato dopo una pausa lunga.
    const dt = last ? Math.min((time - last) / 16.67, 3) : 1;
    last = time;

    if (time >= nextLaunch) {
      launch();
      nextLaunch = time + rand(options.minDelay, options.maxDelay);
    }

    // Scia: sfuma il fotogramma precedente lasciando il canvas trasparente.
    ctx!.globalCompositeOperation = "destination-out";
    ctx!.fillStyle = "rgba(0, 0, 0, 0.22)";
    ctx!.fillRect(0, 0, width, height);
    ctx!.globalCompositeOperation = "lighter";

    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy * dt;
      r.vy *= 0.992;
      ctx!.globalAlpha = 0.9;
      ctx!.fillStyle = r.hue;
      ctx!.fillRect(r.x - 1, r.y, 2, 6);
      if (r.y <= r.targetY) {
        explode(r);
        rockets.splice(i, 1);
      }
    }

    const gravity = 0.035 * dt;
    const drag = Math.pow(0.985, dt);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.vx *= drag;
      s.vy = s.vy * drag + gravity;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.life -= s.decay * dt;
      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      ctx!.globalAlpha = s.life;
      ctx!.fillStyle = s.color;
      ctx!.beginPath();
      ctx!.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx!.fill();
    }
    ctx!.globalAlpha = 1;
    ctx!.globalCompositeOperation = "source-over";

    frame = requestAnimationFrame(step);
  }

  function running() {
    return !destroyed && inView && pageVisible;
  }

  function sync() {
    if (running() && !frame) {
      last = 0;
      frame = requestAnimationFrame(step);
    } else if (!running() && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver((entries) => {
    inView = entries.some((entry) => entry.isIntersecting);
    sync();
  });
  intersectionObserver.observe(canvas);
  const onVisibility = () => {
    pageVisible = document.visibilityState === "visible";
    sync();
  };
  document.addEventListener("visibilitychange", onVisibility);
  resize();

  return {
    burst(count) {
      for (let i = 0; i < count; i++) {
        const id = window.setTimeout(() => {
          timers.delete(id);
          if (!destroyed) launch();
        }, i * 150);
        timers.add(id);
      }
    },
    destroy() {
      destroyed = true;
      sync();
      timers.forEach((id) => window.clearTimeout(id));
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      ctx.clearRect(0, 0, width, height);
    },
  };
}
