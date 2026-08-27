"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";

/* Banner editoriale a slide unica (non griglia di card): ogni esperienza è
   reale e verificata nel progetto — NIENTE "lezioni di equitazione" (La
   Mora non le offre): i cavalli sono un incontro, non un'attività
   strutturata. Immagini reali già presenti in /public, orizzontali dove
   disponibili; e-bike e piscina non hanno un file a risoluzione più alta
   di 960×720 in tutto il progetto (nessuna miniatura sfocata scartata a
   favore di questa: è la versione migliore esistente). */
type Experience = {
  label: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  ctaLabel: string;
  href: string;
};

const EXPERIENCES: Experience[] = [
  {
    label: "E-bike",
    subtitle: "Tra i sentieri e la campagna umbra",
    description:
      "Pedalata assistita per esplorare il territorio intorno ad Assisi, anche in salita, con le e-bike a disposizione degli ospiti.",
    image: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
    alt: "Due ospiti in e-bike nei dintorni di Agriturismo La Mora",
    ctaLabel: "Scopri le esperienze",
    href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
  },
  {
    label: "I cavalli",
    subtitle: "Un incontro, non una lezione",
    description:
      "In struttura puoi avvicinarti e conoscere i cavalli della tenuta: un momento semplice e genuino, soprattutto per i più piccoli.",
    image: "/images/home/foto dei cavalli.webp",
    alt: "Cavallo della tenuta di Agriturismo La Mora",
    ctaLabel: "Scopri le esperienze",
    href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
  },
  {
    label: "Piscina",
    subtitle: "Il tempo si ferma nel verde",
    description:
      "Una piscina panoramica aperta nella bella stagione, circondata dalla campagna umbra: il posto giusto per non avere fretta.",
    image: "/images/piscina/piscina agriturismo la mora lato.jpeg",
    alt: "Piscina di Agriturismo La Mora circondata dal verde della campagna",
    ctaLabel: "Scopri la piscina",
    href: "/piscina/",
  },
  {
    label: "In famiglia",
    subtitle: "Spazio libero per i più piccoli",
    description:
      "Un parco giochi e ampi spazi all'aperto pensati per le famiglie, con babysitting disponibile su richiesta.",
    image: "/images/piscina/esterno parco agriturismo con scivolo per bambini.jpg",
    alt: "Parco giochi per bambini di Agriturismo La Mora",
    ctaLabel: "Scopri le esperienze",
    href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
  },
  {
    label: "Il territorio",
    subtitle: "Assisi, a due passi da qui",
    description:
      "La Basilica di San Francesco e il centro storico di Assisi si raggiungono in pochi minuti: la base ideale per scoprire l'Umbria.",
    image: "/images/territorio/assisi/assisi con tramonto.jpg",
    alt: "Basilica di San Francesco ad Assisi al tramonto",
    ctaLabel: "Scopri il territorio",
    href: "/territorio/",
  },
];

const N = EXPERIENCES.length;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExperiencesSection() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onChange() {
      setReducedMotion(mq.matches);
    }
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => mod(i + dir, N));
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  }

  const exp = EXPERIENCES[index];

  return (
    <section
      id="section-experiences"
      aria-label="Esperienze da vivere ad Agriturismo La Mora"
      className="relative bg-cream py-10 sm:py-14"
    >
      <div className="mx-auto max-w-[1520px] px-3 sm:px-6">
        <div
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-raspberry-light sm:aspect-[16/9] lg:aspect-[21/9]"
        >
          {EXPERIENCES.map((e, i) => (
            <div
              key={e.label}
              aria-hidden={i !== index}
              className="absolute inset-0 transition-opacity ease-out"
              style={{
                opacity: i === index ? 1 : 0,
                transitionDuration: reducedMotion ? "150ms" : "700ms",
                pointerEvents: i === index ? "auto" : "none",
              }}
            >
              <Image
                src={e.image}
                alt={e.alt}
                fill
                priority={i === 0}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 1520px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(10,12,9,.88) 0%, rgba(10,12,9,.35) 42%, rgba(10,12,9,.12) 100%)",
                }}
              />
            </div>
          ))}

          <span className="pointer-events-none absolute inset-x-0 top-5 z-[3] text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/85 sm:top-7">
            Esperienze da vivere
          </span>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 z-[3] hidden -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/45 lg:block"
            style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
          >
            Esperienze La Mora
          </span>

          <div className="absolute inset-x-4 bottom-4 z-[3] sm:inset-x-auto sm:bottom-8 sm:left-8">
            <div
              key={exp.label}
              aria-live="polite"
              className={`max-w-[min(94vw,440px)] rounded-[4px] bg-[#12160f]/85 px-6 py-6 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.6)] sm:px-9 sm:py-8 ${
                reducedMotion ? "" : "animate-panel-fade"
              }`}
            >
              <h2 className="font-display text-[clamp(26px,3.4vw,40px)] font-normal uppercase leading-[1.05] text-cream">
                {exp.label}
              </h2>
              <p className="mt-2 font-display text-[16px] italic leading-[1.3] text-cream/80">{exp.subtitle}</p>
              <span aria-hidden="true" className="mt-4 block h-px w-14 bg-raspberry-light" />
              <p className="mt-4 text-[13px] leading-[1.7] text-cream/75 sm:text-[14px]">{exp.description}</p>
              <Link
                href={exp.href}
                className="group mt-5 inline-flex items-center gap-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-cream transition-colors hover:text-raspberry-light"
              >
                {exp.ctaLabel}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-[3] flex items-center gap-1 rounded-[4px] bg-[#12160f]/80 px-2 py-1.5 sm:bottom-8 sm:right-8">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Esperienza precedente"
              className="flex h-8 w-8 items-center justify-center rounded-[2px] text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
            >
              <ChevronIcon dir="left" />
            </button>
            <span className="min-w-[46px] text-center font-sans text-[11px] tabular-nums text-cream/85">
              {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Esperienza successiva"
              className="flex h-8 w-8 items-center justify-center rounded-[2px] text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
            >
              <ChevronIcon dir="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
