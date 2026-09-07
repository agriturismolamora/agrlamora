"use client";

import { useEffect, useRef } from "react";

/* Scorrimento via rAF invece di CSS @keyframes: alcuni browser mobile (in
   particolare Safari in Modalità Risparmio Energetico) mettono in pausa le
   animazioni CSS per risparmiare batteria — lo stato calcolato riporta
   ancora "running", ma la striscia resta visivamente ferma. Un loop rAF
   non ha questo problema. Il chiamante deve già duplicare il contenuto (due
   copie identiche in fila): il loop azzera l'offset a metà della larghezza
   totale, così il ciclo resta impercettibile. Rispetta prefers-reduced-motion
   restando fermo (stessa scelta già fatta per .animate-marquee). */
export function MarqueeTrack({
  children,
  speed = 32,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let last = performance.now();
    let raf = 0;

    function frame(now: number) {
      const dt = now - last;
      last = now;
      const halfWidth = track!.scrollWidth / 2;
      if (halfWidth > 0) {
        offset = (offset + (speed * dt) / 1000) % halfWidth;
        track!.style.transform = `translateX(-${offset}px)`;
      }
      raf = window.requestAnimationFrame(frame);
    }

    raf = window.requestAnimationFrame(frame);
    return () => window.cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div ref={trackRef} className={className}>
      {children}
    </div>
  );
}
