"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { FireworksHandle } from "@/lib/fireworks-engine";
import { playExplosion, playLaunch, silenceAudio, unlockAudio } from "@/lib/fireworks-sound";
import type { Locale } from "@/lib/i18n";
import ny from "@/components/newyear-theme.module.css";

/* Fuochi d'artificio del tema "newyear" (articolo di Capodanno).
   Il canvas c'è già nell'HTML (vuoto, assoluto, aria-hidden: nessun layout
   shift); il motore (src/lib/fireworks-engine.ts) arriva con import()
   dinamico dopo il load della pagina, quindi non tocca l'LCP.

   - Senza prefers-reduced-motion: versione piena.
   - Con prefers-reduced-motion: modalità "morbida" (fuochi lenti e piccoli,
     al massimo uno ogni ~2,8 s, nessun lampo), NON solo l'illustrazione
     statica: su iPhone con "Riduci movimento" attivo i fuochi sparivano.
   - "Pausa animazioni" (aria-pressed) ferma canvas e stelle e mostra i
     fuochi statici di newyear-decor.tsx (attributo data-fx-paused su
     <html>, newyear-theme.module.css).
   - Suono (src/lib/fireworks-sound.ts): solo dopo un gesto dell'utente,
     mai all'ingresso. Al primo tocco/tasto sulla pagina (non sui link, sui
     pulsanti o nelle finestre di dialogo; lo scroll non conta) parte UNA
     volta lo show d'apertura con il suono; con prefers-reduced-motion solo
     dai pulsanti espliciti. I fuochi automatici sono muti.
   Stato (pausa, suono on/off, show già fatto) solo in memoria: nessuno
   storage, nessun cookie. */

const FX_TEXT: Record<Locale, { fire: string; sound: string; pause: string; invite: string; dismiss: string; controls: string }> = {
  it: {
    fire: "Fai partire i fuochi",
    sound: "Suono",
    pause: "Pausa animazioni",
    invite: "Tocca per i fuochi con il suono",
    dismiss: "Chiudi l'invito",
    controls: "Fuochi d'artificio",
  },
  en: {
    fire: "Launch the fireworks",
    sound: "Sound",
    pause: "Pause animations",
    invite: "Tap for fireworks with sound",
    dismiss: "Dismiss",
    controls: "Fireworks",
  },
  fr: {
    fire: "Lancer le feu d'artifice",
    sound: "Son",
    pause: "Pause des animations",
    invite: "Touchez pour les feux d'artifice avec le son",
    dismiss: "Fermer l'invitation",
    controls: "Feu d'artifice",
  },
  de: {
    fire: "Feuerwerk starten",
    sound: "Ton",
    pause: "Animationen pausieren",
    invite: "Tippen für Feuerwerk mit Ton",
    dismiss: "Hinweis schließen",
    controls: "Feuerwerk",
  },
};

type Burst = { audible: boolean; spacing?: number };
type Stage = {
  soft: boolean;
  burst: (count: number, options: Burst) => void;
  setPaused: (paused: boolean) => void;
  inView: () => boolean;
};

/* Canvas montati, per id ("hero", "finale"): i pulsanti lanciano la
   raffica sul canvas della propria sezione. */
const stages = new Map<string, Stage>();

/* Stato condiviso tra hero e finale, solo in memoria. */
type FxState = { paused: boolean; sound: boolean; introDone: boolean };
const INITIAL_FX: FxState = { paused: false, sound: true, introDone: false };
let fx = INITIAL_FX;
const fxListeners = new Set<() => void>();

function setFx(patch: Partial<FxState>) {
  fx = { ...fx, ...patch };
  if (patch.paused !== undefined) {
    document.documentElement.toggleAttribute("data-fx-paused", fx.paused);
    stages.forEach((stage) => stage.setPaused(fx.paused));
  }
  fxListeners.forEach((listener) => listener());
}

function subscribeFx(listener: () => void) {
  fxListeners.add(listener);
  return () => {
    fxListeners.delete(listener);
  };
}

function useFx(): FxState {
  return useSyncExternalStore(subscribeFx, () => fx, () => INITIAL_FX);
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/* matchMedia: addEventListener manca su Safari < 14, lì c'è addListener. */
function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }
  query.addListener(onChange);
  return () => query.removeListener(onChange);
}

function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
}

const subscribeNothing = () => () => {};

function useMounted(): boolean {
  return useSyncExternalStore(subscribeNothing, () => true, () => false);
}

/* Avvio dopo il load (+ un attimo di quiete) e, come rete di sicurezza,
   al più tardi START_FALLBACK_MS dopo il mount anche se il load tarda
   (widget esterni lenti su mobile). requestIdleCallback solo dove esiste:
   Safari/iOS non ce l'ha e usa il setTimeout. */
const START_FALLBACK_MS = 4000;

function afterLoad(callback: () => void): () => void {
  let done = false;
  let idleId = 0;
  let timeoutId = 0;
  const fire = () => {
    if (done) return;
    done = true;
    callback();
  };
  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(fire, { timeout: 2500 });
    else timeoutId = window.setTimeout(fire, 600);
  };
  const fallbackId = window.setTimeout(fire, START_FALLBACK_MS);
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    done = true;
    window.removeEventListener("load", schedule);
    if (idleId) window.cancelIdleCallback(idleId);
    window.clearTimeout(timeoutId);
    window.clearTimeout(fallbackId);
  };
}

/* Raffica chiesta dall'utente: sblocca l'audio NEL gesto (sincrono), toglie
   la pausa e lancia. "show" = apertura di ~3–4 s; "button" = pulsante. */
function fire(stage: Stage, kind: "show" | "button") {
  const audible = fx.sound && unlockAudio();
  if (fx.paused) setFx({ paused: false });
  if (stage.soft) stage.burst(3, { audible });
  else if (kind === "show") stage.burst(10, { audible, spacing: 330 });
  else stage.burst(7, { audible, spacing: 150 });
}

export function FireworksCanvas({
  id,
  bandTop,
  bandBottom,
  minDelay = 1400,
  maxDelay = 2600,
  className,
}: {
  id: string;
  bandTop: number;
  bandBottom: number;
  minDelay?: number;
  maxDelay?: number;
  className: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const soft = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let handle: FireworksHandle | null = null;
    let loading = false;
    let cancelled = false;
    const pending: { count: number; options: Burst }[] = [];

    const load = () => {
      if (loading) return;
      loading = true;
      import("@/lib/fireworks-engine")
        .then(({ startFireworks }) => {
          if (cancelled) return;
          const engine = startFireworks(canvas, {
            bandTop,
            bandBottom,
            minDelay,
            maxDelay,
            soft,
            onLaunch: ({ x, flightMs }) => {
              if (fx.sound) playLaunch(x, flightMs, soft);
            },
            onExplode: ({ x }) => {
              if (fx.sound) playExplosion(x, soft);
            },
          });
          engine.setPaused(fx.paused);
          pending.splice(0).forEach((b) => engine.burst(b.count, b.options));
          handle = engine;
        })
        .catch(() => {});
    };

    stages.set(id, {
      soft,
      burst(count, options) {
        if (handle) handle.burst(count, options);
        else {
          pending.push({ count, options });
          load();
        }
      },
      setPaused(paused) {
        handle?.setPaused(paused);
      },
      inView() {
        const rect = canvas.getBoundingClientRect();
        return rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
      },
    });
    const cancelStart = afterLoad(load);

    return () => {
      cancelled = true;
      cancelStart();
      handle?.destroy();
      stages.delete(id);
      if (stages.size === 0) silenceAudio();
    };
  }, [id, bandTop, bandBottom, minDelay, maxDelay, soft]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 6h2.2L8 3.2v9.6L4.7 10H2.5z" fill="currentColor" stroke="none" />
      {on ? <path d="M10.5 5.5a3.2 3.2 0 0 1 0 5M12.3 3.8a5.6 5.6 0 0 1 0 8.4" /> : <path d="M10.5 6l3.5 4M14 6l-3.5 4" />}
    </svg>
  );
}

function PauseIcon({ paused }: { paused: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
      {paused ? <path d="M4.5 3v10l8.5-5z" /> : <path d="M4 3h3v10H4zM9 3h3v10H9z" />}
    </svg>
  );
}

/* Pulsanti accanto ai fuochi (hero e finale), con lo stato condiviso:
   "Fai partire i fuochi" (raffica + suono se attivo), "Suono" e "Pausa
   animazioni" (interruttori con aria-pressed, etichetta fissa). */
export function FireworksControls({ target, locale, className = "" }: { target: string; locale: Locale; className?: string }) {
  const state = useFx();
  const text = FX_TEXT[locale];
  return (
    <div role="group" aria-label={text.controls} data-fx-control="" className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <button
        type="button"
        className={ny.fireButton}
        onClick={() => {
          const stage = stages.get(target);
          if (stage) fire(stage, "button");
        }}
      >
        <span aria-hidden="true">✦</span>
        {text.fire}
      </button>
      <button
        type="button"
        aria-pressed={state.sound}
        className={ny.fxToggle}
        onClick={() => {
          const sound = !fx.sound;
          if (sound) unlockAudio();
          else silenceAudio();
          setFx({ sound });
        }}
      >
        <SoundIcon on={state.sound} />
        {text.sound}
      </button>
      <button
        type="button"
        aria-pressed={state.paused}
        className={ny.fxToggle}
        onClick={() => {
          const paused = !fx.paused;
          if (paused) silenceAudio();
          else if (fx.sound) unlockAudio();
          setFx({ paused });
        }}
      >
        <PauseIcon paused={state.paused} />
        {text.pause}
      </button>
    </div>
  );
}

/* Elementi su cui un tocco NON avvia lo show d'apertura: hanno già un loro
   scopo (link, pulsanti, campi, finestre di dialogo come il banner cookie). */
const NOT_A_SHOW_GESTURE = 'a, button, input, select, textarea, label, summary, [role="button"], [role="dialog"]';
const MODIFIER_KEYS = ["Escape", "Shift", "Control", "Alt", "Meta", "CapsLock"];

/* Invito discreto in alto nell'hero ("Tocca per i fuochi con il suono"),
   chiudibile, e ascolto del primo gesto sulla pagina. Compare solo dopo il
   mount (assoluto: nessun layout shift) e solo se Web Audio esiste. */
export function FireworksIntro({ locale, className = "" }: { locale: Locale; className?: string }) {
  const state = useFx();
  const mounted = useMounted();
  const text = FX_TEXT[locale];

  useEffect(() => {
    if (fx.introDone) return;
    const onGesture = (event: Event) => {
      if (fx.introDone) return;
      if (event instanceof KeyboardEvent && MODIFIER_KEYS.includes(event.key)) return;
      const target = event.target instanceof Element ? event.target : null;
      // I controlli dei fuochi (e l'invito) fanno da sé: niente show doppio.
      if (target?.closest("[data-fx-control]")) {
        setFx({ introDone: true });
        return;
      }
      if (target?.closest(NOT_A_SHOW_GESTURE)) return;
      if (window.matchMedia(REDUCED_MOTION).matches) return;
      const stage = [...stages.values()].find((s) => s.inView());
      if (!stage) return;
      setFx({ introDone: true });
      fire(stage, "show");
    };
    window.addEventListener("click", onGesture, true);
    window.addEventListener("keydown", onGesture, true);
    return () => {
      window.removeEventListener("click", onGesture, true);
      window.removeEventListener("keydown", onGesture, true);
    };
  }, []);

  const audioSupported = mounted && (typeof window.AudioContext === "function" || "webkitAudioContext" in window);
  if (!audioSupported || state.introDone || !state.sound) return null;

  return (
    <div className={className}>
      <div data-fx-control="" className={ny.invite}>
        <button
          type="button"
          className={ny.inviteButton}
          onClick={() => {
            const stage = stages.get("hero");
            if (stage) fire(stage, "show");
          }}
        >
          <SoundIcon on />
          {text.invite}
        </button>
        <button type="button" aria-label={text.dismiss} className={ny.inviteClose} onClick={() => setFx({ introDone: true })}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
}
