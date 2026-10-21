/* Fuochi d'artificio su canvas per il tema "newyear" (articolo di
   Capodanno). Nessuna libreria, nessuna immagine: razzi e scintille
   disegnati a mano. Caricato SOLO con import() dinamico da fireworks.tsx,
   dopo il load della pagina: non pesa sul bundle iniziale né sull'LCP.

   Due modalità:
   - piena (predefinita);
   - "morbida" (`soft`), usata con prefers-reduced-motion: razzi lenti,
     scoppi piccoli che compaiono e svaniscono in dissolvenza, nessuna
     somma di luce tra le scintille, al massimo un lancio ogni 2,8 s (anche
     dalle raffiche del pulsante): niente lampi, ben sotto le 3 variazioni
     di luminosità al secondo.

   Contenimento dei costi:
   - devicePixelRatio limitato a 1,5;
   - tetto di particelle (più basso sugli schermi stretti);
   - animazione ferma quando il canvas è fuori schermo
     (IntersectionObserver), la scheda è nascosta (visibilitychange) o
     l'utente mette in pausa: nessun requestAnimationFrame attivo in quei
     casi.
   Solo API presenti anche su Safari/iOS; ResizeObserver e
   IntersectionObserver hanno un ripiego se mancano (iOS vecchi). */

export type FireworksOptions = {
  /* Fascia verticale (frazioni dell'altezza, 0 = in alto) in cui
     esplodono i fuochi. */
  bandTop: number;
  bandBottom: number;
  /* Pausa tra un lancio automatico e l'altro, in ms (modalità piena). */
  minDelay: number;
  maxDelay: number;
  soft?: boolean;
  /* Solo per i razzi "udibili" (raffiche chieste dall'utente): agganci per
     il suono (src/lib/fireworks-sound.ts). x in frazioni della larghezza. */
  onLaunch?: (event: { x: number; flightMs: number }) => void;
  onExplode?: (event: { x: number }) => void;
};

export type FireworksHandle = {
  /* Raffica di `count` razzi, uno ogni `spacing` ms (in modalità morbida
     mai meno di SOFT_GAP). */
  burst: (count: number, options?: { audible?: boolean; spacing?: number }) => void;
  setPaused: (paused: boolean) => void;
  destroy: () => void;
};

type Rocket = { x: number; y: number; vy: number; targetY: number; hue: string; audible: boolean };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; decay: number; color: string; size: number; age: number };

/* Oro, champagne, avorio, rosa e azzurro tenui: in tono con la palette del
   tema, mai colori saturi da luna park. */
const COLORS = ["#f1dfb4", "#e3c278", "#ffd98a", "#fff6e0", "#f4a9b8", "#a9c8ff"];
const MAX_DPR = 1.5;
const SOFT_GAP = 2800;
/* Modalità morbida: frame (a 60 fps) di dissolvenza in entrata delle
   scintille, ~300 ms. */
const SOFT_FADE_IN = 18;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

/* Durata stimata della salita: velocità che cala dello 0,8% a frame. */
function flightFrames(distance: number, speed: number): number {
  const ratio = (0.008 * distance) / speed;
  return ratio >= 0.95 ? 360 : Math.log(1 - ratio) / Math.log(0.992);
}

export function startFireworks(canvas: HTMLCanvasElement, options: FireworksOptions): FireworksHandle {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { burst: () => {}, setPaused: () => {}, destroy: () => {} };

  const soft = options.soft === true;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let maxSparks = 360;
  const rockets: Rocket[] = [];
  const sparks: Spark[] = [];
  /* Razzi in attesa di lancio (raffiche): partono nel loop, rispettando
     l'intervallo minimo, solo mentre l'animazione gira. */
  const queue: { audible: boolean; gap: number }[] = [];
  let frame = 0;
  let last = 0;
  let lastLaunch = -Infinity;
  let nextLaunch = 0;
  let inView = typeof IntersectionObserver === "undefined";
  let pageVisible = document.visibilityState === "visible";
  let paused = false;
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

  function launch(time: number, audible: boolean) {
    lastLaunch = time;
    if (width === 0 || height === 0) return;
    const targetY = rand(options.bandTop, options.bandBottom) * height;
    // Morbida: salita breve e di lunghezza quasi costante (max 90 px), così
    // gli scoppi restano distanziati quanto i lanci.
    const y = Math.min(height, targetY + (soft ? Math.min(height * 0.3, 90) : height * 0.45));
    const vy = soft ? -rand(2.2, 2.5) : -rand(5.5, 7.5);
    const rocket: Rocket = { x: rand(0.12, 0.88) * width, y, vy, targetY, hue: pick(COLORS), audible };
    rockets.push(rocket);
    if (audible) options.onLaunch?.({ x: rocket.x / width, flightMs: flightFrames(y - targetY, -vy) * 16.67 });
  }

  function explode(rocket: Rocket) {
    if (rocket.audible) options.onExplode?.({ x: rocket.x / width });
    const room = maxSparks - sparks.length;
    if (room <= 0) return;
    const count = Math.min(room, Math.round(soft ? rand(18, 26) : rand(36, 58)));
    const power = Math.min(3, Math.max(1.6, Math.min(width, height) / 150)) * (soft ? 0.5 : 1);
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
        decay: soft ? rand(0.006, 0.009) : rand(0.011, 0.018),
        color: i % 3 === 0 ? second : rocket.hue,
        size: soft ? rand(1, 1.6) : rand(1.1, 2),
        age: 0,
      });
    }
  }

  function step(time: number) {
    frame = 0;
    if (!running()) return;
    // Passo normalizzato a 60 fps, limitato dopo una pausa lunga.
    const dt = last ? Math.min((time - last) / 16.67, 3) : 1;
    last = time;

    if (queue.length && time - lastLaunch >= queue[0].gap) {
      launch(time, queue.shift()!.audible);
      nextLaunch = time + (soft ? rand(SOFT_GAP, SOFT_GAP + 1000) : rand(options.minDelay, options.maxDelay));
    } else if (!queue.length && time >= nextLaunch && time - lastLaunch >= (soft ? SOFT_GAP : 0)) {
      launch(time, false);
      nextLaunch = time + (soft ? rand(SOFT_GAP, SOFT_GAP + 1000) : rand(options.minDelay, options.maxDelay));
    }

    // Scia: sfuma il fotogramma precedente lasciando il canvas trasparente.
    ctx!.globalCompositeOperation = "destination-out";
    ctx!.fillStyle = soft ? "rgba(0, 0, 0, 0.14)" : "rgba(0, 0, 0, 0.22)";
    ctx!.fillRect(0, 0, width, height);
    // Morbida: niente somma di luce dove le scintille si sovrappongono.
    ctx!.globalCompositeOperation = soft ? "source-over" : "lighter";

    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy * dt;
      r.vy *= 0.992;
      ctx!.globalAlpha = soft ? 0.45 : 0.9;
      ctx!.fillStyle = r.hue;
      ctx!.fillRect(r.x - 1, r.y, 2, soft ? 4 : 6);
      if (r.y <= r.targetY) {
        explode(r);
        rockets.splice(i, 1);
      }
    }

    const gravity = (soft ? 0.012 : 0.035) * dt;
    const drag = Math.pow(soft ? 0.98 : 0.985, dt);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.vx *= drag;
      s.vy = s.vy * drag + gravity;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.life -= s.decay * dt;
      s.age += dt;
      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      ctx!.globalAlpha = soft ? Math.min(1, s.age / SOFT_FADE_IN) * s.life * 0.85 : s.life;
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
    return !destroyed && !paused && inView && pageVisible;
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

  const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
  if (resizeObserver) resizeObserver.observe(canvas);
  else window.addEventListener("resize", resize);
  const intersectionObserver =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver((entries) => {
          inView = entries.some((entry) => entry.isIntersecting);
          sync();
        });
  intersectionObserver?.observe(canvas);
  const onVisibility = () => {
    pageVisible = document.visibilityState === "visible";
    sync();
  };
  document.addEventListener("visibilitychange", onVisibility);
  resize();
  sync();

  return {
    burst(count, { audible = false, spacing = 150 } = {}) {
      const gap = soft ? Math.max(SOFT_GAP, spacing) : spacing;
      // Il primo razzo parte subito (o appena trascorso l'intervallo minimo).
      for (let i = 0; i < count; i++) queue.push({ audible, gap: i === 0 && !soft ? 0 : gap });
    },
    setPaused(value) {
      paused = value;
      sync();
    },
    destroy() {
      destroyed = true;
      sync();
      queue.length = 0;
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", resize);
      intersectionObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      ctx.clearRect(0, 0, width, height);
    },
  };
}
