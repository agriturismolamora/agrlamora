"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/scroll-reveal";

/* Sezione scura "editoriale + galleria" (PLAN.md Blocco 5): il testo resta
   fisso al centro, mentre foto verticali reali della struttura in generale
   (non legate a un singolo appartamento/esperienza — MAI usate altrove in
   home) fluttuano sparse attraverso TUTTA la sezione da destra a sinistra,
   guidate dallo scroll dell'utente — passano anche dietro a testo/CTA
   (z-index più basso) — tramite lo stesso schema "wrapper alto + sticky"
   già usato da apartments-carousel.tsx (niente preventDefault sulla rotella:
   lo scroll nativo resta sempre intatto, cambia solo cosa succede mentre la
   sezione è agganciata). Ogni foto ha la propria altezza, velocità e punto
   di partenza (non una fila unica che scorre in blocco): l'effetto voluto è
   "galleggiante", non un nastro trasportatore. A fine corsa sono tutte
   uscite a sinistra e la sezione si sgancia, lasciando proseguire lo scroll
   normale. */
type GalleryCard = {
  src: string;
  alt: string;
  top: number; // % dall'alto della sezione
  widthVw: number;
  startVw: number; // posizione di partenza (oltre il bordo destro)
  speed: number; // moltiplicatore di velocità: card diverse, ritmo diverso
  rotation: number;
};

const GALLERY_CARDS: GalleryCard[] = [
  { src: "/images/struttura/foto dell esterno della struttura.webp", alt: "Esterno di Agriturismo La Mora", top: 8, widthVw: 12, startVw: 105, speed: 0.85, rotation: -6 },
  { src: "/images/struttura/immagine cucina arredata.jpeg", alt: "Cucina arredata di uno degli appartamenti", top: 58, widthVw: 14, startVw: 130, speed: 1.2, rotation: 4 },
  { src: "/images/struttura/sala arredata di una delle stanze.jpeg", alt: "Sala interna arredata della struttura", top: 28, widthVw: 10, startVw: 95, speed: 1.0, rotation: -3 },
  { src: "/images/struttura/foto di un bagno dell agriturismo.webp", alt: "Bagno di uno degli appartamenti", top: 72, widthVw: 13, startVw: 145, speed: 0.7, rotation: 7 },
  { src: "/images/struttura/immagine stanza con letto arredato.jpeg", alt: "Camera da letto arredata della struttura", top: 42, widthVw: 9, startVw: 115, speed: 1.35, rotation: -5 },
  { src: "/images/struttura/immagine di una stanza alloggio agriturismo la mora.webp", alt: "Interno di uno degli alloggi di Agriturismo La Mora", top: 16, widthVw: 12, startVw: 160, speed: 0.95, rotation: 3 },
];

const OUTER_VH = 220;
const TRAVEL_VW = 260;

const INSTAGRAM_URL = "https://www.instagram.com/paolo.720/";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export function InstagramGallery() {
  const outerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onChange() {
      setReducedMotion(mq.matches);
    }
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // La galleria scroll-jacked esiste solo da lg in su (stesso breakpoint
  // della corsia foto, "hidden lg:block" più sotto): su mobile/tablet non
  // c'è nulla da rivelare durante lo scroll, quindi la sezione resta
  // un'altezza normale invece di imporre 220vh di scroll "morto".
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    function onChange() {
      setIsDesktop(mq.matches);
    }
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || !isDesktop) return;
    let ticking = false;

    function compute() {
      const el = outerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        setProgress(total > 0 ? clamp01(scrolled / total) : 0);
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(compute);
        ticking = true;
      }
    }

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion, isDesktop]);

  return (
    <section
      ref={outerRef}
      id="section-instagram"
      data-snap-exempt="true"
      aria-label="Agriturismo La Mora su Instagram"
      className="relative bg-olive-950"
      style={{ height: reducedMotion || !isDesktop ? undefined : `${OUTER_VH}vh` }}
    >
      <div className="sticky top-0 flex min-h-[70vh] items-center justify-center overflow-hidden py-24 lg:min-h-0 lg:h-[100svh] lg:py-0">
        {!reducedMotion && isDesktop && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden lg:block">
            {GALLERY_CARDS.map((card) => {
              const x = card.startVw - progress * card.speed * TRAVEL_VW;
              return (
                <div
                  key={card.src}
                  className="absolute aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_25px_50px_-20px_rgba(0,0,0,0.6)]"
                  style={{
                    top: `${card.top}%`,
                    width: `${card.widthVw}vw`,
                    transform: `translateX(${x}vw) rotate(${card.rotation}deg)`,
                  }}
                >
                  <Image src={card.src} alt={card.alt} fill sizes="18vw" className="object-cover" />
                </div>
              );
            })}
          </div>
        )}

        <Reveal className="relative z-[2] mx-auto max-w-[640px] px-6 text-center sm:px-10">
          <p className="font-display text-[clamp(24px,3.4vw,40px)] font-normal italic leading-[1.3] text-cream [text-wrap:balance]">
            Viaggiare è una forma di restare. Scopri i piccoli momenti che porterai a casa se vieni a trovarci.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-cream transition-colors duration-200 hover:border-cream/60"
          >
            Segui su Instagram
            <InstagramIcon />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
