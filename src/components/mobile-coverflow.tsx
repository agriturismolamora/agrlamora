"use client";

import { useCallback, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

const SWIPE_THRESHOLD = 46;
/* Stessa geometria del coverflow mobile della home (apartments-carousel.tsx,
   MobileCarousel): vicine inclinate di 8°, scala 0.9, parzialmente dietro
   la card centrale (centri distanti l'86% della larghezza card). */
const SIDE_ROTATE = 8;
const SIDE_SCALE = 0.9;
const STEP_PERCENT = 86;

/* Coverflow sotto i 640px, griglia a 3 colonne da sm in su — UN SOLO DOM
   per entrambi (nessuna card duplicata nell'HTML): le trasformazioni del
   coverflow passano da custom property CSS lette solo sotto sm, da sm in
   su le card tornano normali elementi di griglia. Sotto sm tutte le card
   occupano la stessa cella (col/row 1): l'altezza del carousel è quella
   della card più alta e le card si allineano tutte a quella.
   Swipe col dito (soglia 46px, come il resto del sito), tap su una card
   laterale per centrarla, frecce ← → da tastiera, pallini di posizione. */
export function MobileCoverflow({
  items,
  labels,
  ariaLabel,
}: {
  items: ReactNode[];
  /** Nome di ciascuna card, per i pallini (aria-label). */
  labels: string[];
  ariaLabel: string;
}) {
  const [active, setActive] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const last = items.length - 1;

  const go = useCallback((i: number) => setActive(Math.min(last, Math.max(0, i))), [last]);

  function onPointerDown(e: PointerEvent) {
    dragStartX.current = e.clientX;
  }
  function onPointerUp(e: PointerEvent) {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) go(active + (delta < 0 ? 1 : -1));
  }
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  }

  return (
    <div>
      {/* -mx-6/px-6: il ritaglio orizzontale arriva ai bordi dello schermo
          (le vicine sporgono fin lì), senza mai creare scroll orizzontale
          della pagina. py-4: margine per le card ruotate. */}
      <div className="-mx-6 overflow-hidden px-6 py-4 sm:mx-0 sm:overflow-visible sm:p-0">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={ariaLabel}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onKeyDown={onKeyDown}
          className="grid touch-pan-y select-none outline-none sm:touch-auto sm:select-auto sm:grid-cols-3 sm:gap-6"
        >
          {items.map((item, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            return (
              <div
                key={i}
                onClick={() => offset !== 0 && go(i)}
                className="col-start-1 row-start-1 w-[80%] justify-self-center rounded-[6px] opacity-[var(--cf-o)] shadow-[0_22px_44px_-28px_rgba(28,33,23,0.5)] transition-[transform,opacity] duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] [transform:translateX(var(--cf-x))_rotate(var(--cf-r))_scale(var(--cf-s))] motion-reduce:transition-none sm:col-start-auto sm:row-start-auto sm:w-auto sm:justify-self-stretch sm:opacity-100 sm:shadow-none sm:[transform:none]"
                style={
                  {
                    "--cf-x": `${offset * STEP_PERCENT}%`,
                    "--cf-r": `${offset === 0 ? 0 : SIDE_ROTATE * Math.sign(offset)}deg`,
                    "--cf-s": abs === 0 ? 1 : SIDE_SCALE,
                    "--cf-o": abs > 1 ? 0 : 1,
                    zIndex: 10 - abs,
                    // La card fuori scena (opacità 0) non deve intercettare tap.
                    pointerEvents: abs > 1 ? "none" : undefined,
                  } as CSSProperties
                }
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2.5 sm:hidden">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            aria-current={i === active ? "true" : undefined}
            onClick={() => go(i)}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span className={`block h-2 w-2 rounded-full transition-colors ${i === active ? "bg-raspberry" : "bg-ink/20"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
