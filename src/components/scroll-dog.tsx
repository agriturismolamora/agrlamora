"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

/* Sul server (e in hydration) vale "ridotto": il cagnolino compare solo
   dopo, nel browser, e solo se il visitatore non ha chiesto meno movimento. */
function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => true);
}

/* Cagnolino decorativo che segue lo scroll lungo il bordo destro, solo
   nelle pagine delle due unità pet friendly (Gemelli, Sagittario).
   Leggero: nessuno stato React per frame — la posizione è una custom
   property aggiornata al massimo una volta per frame (rAF) e applicata con
   transform (niente layout); le animazioni di trotto/coda sono CSS
   (globals.css) e partono solo mentre la pagina scorre. Solo da md in su:
   su mobile il bordo è già occupato da contenuto e pulsanti flottanti.
   Disattivato con prefers-reduced-motion; aria-hidden, nessun focus. */
export function ScrollDog() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (reducedMotion || !root) return;

    let frame = 0;
    let stopTimer: number | undefined;

    const apply = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--dog-progress", progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
      root.dataset.moving = "true";
      window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => {
        root.dataset.moving = "false";
      }, 220);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(stopTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-moving="false"
      className="scroll-dog pointer-events-none fixed right-3 top-[24vh] z-[55] hidden h-[42vh] w-10 md:block"
    >
      {/* Traccia: tratteggio leggero, la parte già percorsa più marcata. */}
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-ink/15" />
      <span
        className="absolute left-1/2 top-0 h-full w-px origin-top bg-olive-700/60"
        style={{ transform: "translateX(-50%) scaleY(var(--dog-progress, 0))" }}
      />
      <div
        className="absolute left-0 top-0 h-7 w-10"
        style={{ transform: "translateY(calc(var(--dog-progress, 0) * (42vh - 1.75rem)))" }}
      >
        <svg viewBox="0 0 40 28" width="40" height="28" className="scroll-dog-body text-olive-950 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
          <path
            className="scroll-dog-tail"
            d="M9.5 13.5c-2.2-.6-3.6-2.4-4.2-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M9 14.5c0-2 1.6-3.5 3.6-3.5h13.2c2.4 0 4.2 1.9 4.2 4.2v1.6c0 2.2-1.8 4-4 4H13c-2.2 0-4-1.8-4-4v-2.3Z" fill="currentColor" />
          <path d="M12 19.5v5.5M16.5 20v5M23.5 20v5M27.5 19.5v5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M26 12.5c.2-3 2.3-5.5 5.2-5.5 2.5 0 3.8 1.3 5.3 2.6.9.8.6 2.2-.5 2.5l-2.2.6c-.6 2.4-2.6 3.8-4.9 3.8" fill="currentColor" />
          <path d="M29.2 7.4c-.9-1.8-.8-3.6.4-4.9 1.1 1.2 1.7 2.8 1.6 4.6" fill="currentColor" />
          <circle cx="32.4" cy="9.6" r=".85" fill="#f5efe4" />
          <path d="M26.6 13.2c1 .9 2.3 1.4 3.7 1.4" fill="none" stroke="#b08d3c" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
