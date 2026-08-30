"use client";

import { useEffect, useRef, useState } from "react";

/* Riempimento hover direzionale per le CTA principali della homepage: il
   colore entra esattamente da dove entra il cursore (alto/basso/sinistra/
   destra/angolo) con una forma morbida che si espande fino a coprire
   tutto il pulsante, e si ritira verso il punto da cui il cursore esce.

   Un cerchio molto più grande del pulsante (300% di lato, sempre
   sufficiente a coprire anche l'angolo più lontano dal punto di ingresso)
   parte scalato a 0 centrato sul punto di ingresso/uscita e anima solo
   `transform: scale()` — mai width/height/left/top — quindi resta fluido
   a qualunque dimensione di pulsante senza ricalcolare il layout.

   Gli event listener vivono sull'elemento PADRE (il vero pulsante/link),
   non su questo span: essendo pointer-events-none, questo componente non
   riceverebbe mai un mouseenter/mouseleave se li ascoltasse su se stesso.
   Va inserito come primo figlio di un contenitore con `relative
   overflow-hidden`; il testo/icona del pulsante va poi avvolto in uno
   span con `relative z-10` per restare sempre sopra il riempimento. */
export function HoverFill({ color }: { color: string }) {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parent = spanRef.current?.parentElement;
    if (!parent) return;

    function place(e: MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
    function onEnter(e: MouseEvent) {
      place(e);
      setActive(true);
    }
    function onLeave(e: MouseEvent) {
      place(e);
      setActive(false);
    }

    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={spanRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      <span
        className="absolute aspect-square rounded-full"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: "300%",
          background: color,
          transform: `translate(-50%, -50%) scale(${active ? 1 : 0})`,
          transition: "transform 480ms cubic-bezier(.22,1,.36,1)",
        }}
      />
    </span>
  );
}
