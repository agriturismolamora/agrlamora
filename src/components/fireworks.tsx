"use client";

import { useEffect, useRef } from "react";
import type { FireworksHandle } from "@/lib/fireworks-engine";

/* Fuochi d'artificio del tema "newyear" (articolo di Capodanno).
   Il canvas c'è già nell'HTML (vuoto, assoluto, aria-hidden: nessun layout
   shift); il motore (src/lib/fireworks-engine.ts) arriva con import()
   dinamico solo dopo il load della pagina e a browser inattivo, quindi non
   tocca l'LCP. Con prefers-reduced-motion il motore non parte mai e il CSS
   nasconde canvas e pulsante (newyear-theme.module.css), mostrando i fuochi
   statici di newyear-decor.tsx. */

type Stage = { burst: (count: number) => void };

/* Canvas montati, per id: il pulsante "Fai partire i fuochi" lancia la
   raffica sul canvas della propria sezione. */
const stages = new Map<string, Stage>();

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function afterLoadAndIdle(callback: () => void): () => void {
  let idleId = 0;
  let timeoutId = 0;
  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(callback, { timeout: 2500 });
    else timeoutId = window.setTimeout(callback, 600);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    window.removeEventListener("load", schedule);
    if (idleId) window.cancelIdleCallback(idleId);
    if (timeoutId) window.clearTimeout(timeoutId);
  };
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

  useEffect(() => {
    const canvas = ref.current;
    const motion = window.matchMedia(REDUCED_MOTION);
    if (!canvas || motion.matches) return;

    let handle: FireworksHandle | null = null;
    let loading = false;
    let cancelled = false;
    let pending = 0;

    const load = () => {
      if (loading) return;
      loading = true;
      import("@/lib/fireworks-engine").then(({ startFireworks }) => {
        if (cancelled) return;
        handle = startFireworks(canvas, { bandTop, bandBottom, minDelay, maxDelay });
        if (pending) handle.burst(pending);
        pending = 0;
      });
    };

    stages.set(id, {
      burst(count) {
        if (handle) handle.burst(count);
        else {
          pending += count;
          load();
        }
      },
    });
    const cancelIdle = afterLoadAndIdle(load);

    // Se l'utente attiva "riduci movimento" a pagina aperta, i fuochi si fermano.
    const onMotionChange = () => {
      if (!motion.matches) return;
      cancelled = true;
      handle?.destroy();
      handle = null;
      stages.delete(id);
    };
    motion.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      cancelIdle();
      motion.removeEventListener("change", onMotionChange);
      handle?.destroy();
      stages.delete(id);
    };
  }, [id, bandTop, bandBottom, minDelay, maxDelay]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}

/* Pulsante giocoso: una raffica di razzi sul canvas `target`. Niente audio.
   Il nome accessibile comincia con il testo visibile (WCAG 2.5.3). */
export function FireworksButton({ target, label, ariaLabel, className }: { target: string; label: string; ariaLabel: string; className: string }) {
  return (
    <button type="button" aria-label={ariaLabel} onClick={() => stages.get(target)?.burst(7)} className={className}>
      <span aria-hidden="true">✦</span>
      {label}
    </button>
  );
}
