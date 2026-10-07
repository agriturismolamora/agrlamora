"use client";

import { useEffect, useRef } from "react";

/* Scorrimento via rAF invece di CSS @keyframes: alcuni browser mobile (in
   particolare Safari in Modalità Risparmio Energetico) mettono in pausa le
   animazioni CSS per risparmiare batteria — lo stato calcolato riporta
   ancora "running", ma la striscia resta visivamente ferma. Un loop rAF
   non ha questo problema. Il chiamante deve già duplicare il contenuto (due
   copie identiche in fila): il loop azzera l'offset a metà della larghezza
   totale, così il ciclo resta impercettibile. Scorre anche con "Riduci
   movimento" attivo sul dispositivo (richiesta esplicita del titolare: era
   il motivo della striscia ferma sull'iPhone di Paolo — stessa scelta già
   fatta per il video della hero e il carousel appartamenti).
   Il loop gira solo mentre la striscia è sullo schermo (IntersectionObserver)
   e la larghezza si misura solo quando cambia (ResizeObserver): leggere
   scrollWidth a ogni fotogramma forzava un layout continuo, anche a
   striscia fuori vista, e pesava su tutta la pagina. */
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

    let offset = 0;
    let last = 0;
    let raf = 0;
    let halfWidth = track.scrollWidth / 2;

    function frame(now: number) {
      // Alla ripartenza (last = 0) nessun salto: il tempo fuori vista non conta.
      const dt = last ? now - last : 0;
      last = now;
      if (halfWidth > 0) {
        offset = (offset + (speed * dt) / 1000) % halfWidth;
        track!.style.transform = `translateX(-${offset}px)`;
      }
      raf = window.requestAnimationFrame(frame);
    }

    function start() {
      if (raf) return;
      last = 0;
      raf = window.requestAnimationFrame(frame);
    }

    function stop() {
      window.cancelAnimationFrame(raf);
      raf = 0;
    }

    const resize = new ResizeObserver(() => {
      halfWidth = track.scrollWidth / 2;
    });
    resize.observe(track);
    // Osservato il contenitore fermo, non la traccia che scorre.
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(track.parentElement ?? track);

    return () => {
      stop();
      visibility.disconnect();
      resize.disconnect();
    };
  }, [speed]);

  return (
    <div ref={trackRef} className={className}>
      {children}
    </div>
  );
}
