"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { CountUp } from "@/components/count-up";
import { StarRow } from "@/components/review-icons";

/* Pannello fotografico "pinned", stesso identico meccanismo (già in
   produzione, collaudato) di immersive-story.tsx: outer più alto del
   viewport + sticky interno, invece del box centrato piatto della prima
   versione. La foto ha un lento Ken Burns (scale+translate legati allo
   scroll, stesso schema rAF di immersive-story) per restare "viva" mentre
   la sezione è agganciata. Il badge di certificazione è mostrato grande,
   leggermente inclinato come un sigillo/timbro appoggiato sulla foto (non
   in una targa piatta), accostato al testo invece che impilato sopra —
   la coppia badge+testo rompe la simmetria pura invece di essere un altro
   blocco centrato come immersive-story. */
function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

const TRIPADVISOR_URL = "https://www.tripadvisor.it/ShowUserReviews-g187905-d1021888-r1068110253";

export function RankingHero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;

    function paint() {
      const el = wrapperRef.current;
      const photo = photoRef.current;
      if (el && photo) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const progress = total > 0 ? clamp01(scrolled / total) : 0;
        // Ken Burns molto lento: scala 1.08 -> 1.18, pan verticale minimo —
        // stesso principio "delta piccolo" dei layer parallax (5-15%),
        // mai sulla foto intera in modo brusco.
        const scale = 1.08 + progress * 0.1;
        const y = progress * 24;
        photo.style.transform = `scale(${scale.toFixed(4)}) translateY(${y.toFixed(2)}px)`;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(paint);
        ticking = true;
      }
    }

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={wrapperRef}
      id="section-ranking"
      aria-labelledby="ranking-heading"
      data-snap-exempt="true"
      className={reducedMotion ? "relative" : "relative min-h-[130vh] sm:min-h-[150vh]"}
    >
      <h2 id="ranking-heading" className="sr-only">
        Agriturismo La Mora è il numero 1 su TripAdvisor tra 38 agriturismi ad Assisi
      </h2>

      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div ref={photoRef} className="absolute inset-0" style={{ transform: "scale(1.08)" }}>
          <Image
            src="/images/piscina/piscina agriturismo la mora di notte.jpeg"
            alt="Piscina di Agriturismo La Mora illuminata di sera"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.55) 0%, rgba(20,14,7,.72) 100%)" }}
        />

        <div className="relative z-[2] mx-auto flex w-full max-w-[980px] flex-col items-center gap-9 px-6 sm:px-10 lg:flex-row lg:items-center lg:gap-14 lg:text-left">
          <Reveal>
            <div className="w-full max-w-[230px] shrink-0 -rotate-3 drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)] lg:max-w-[240px]">
              <Image
                src="/certificazioni/agriturismo numero 1 ad assisi agriturismo la mora.png"
                alt="Agriturismo La Mora — N.1 Agriturismo ad Assisi, miglior prezzo secondo TripAdvisor"
                width={1536}
                height={1024}
                className="h-auto w-full rounded-[3px] bg-cream p-3"
              />
            </div>
          </Reveal>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Reveal delay={80}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Riconoscimenti</span>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-4 max-w-[420px] font-display text-[clamp(24px,2.8vw,34px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
                Il numero uno su <CountUp to={38} className="tabular-nums" /> agriturismi ad Assisi
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-5 flex flex-col items-center gap-2.5 lg:items-start">
                <StarRow rating={5} size={16} />
                <span className="text-[11px] uppercase tracking-[0.1em] text-cream/60">
                  Secondo le recensioni TripAdvisor
                </span>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <p className="mt-6 max-w-[420px] text-[14px] leading-[1.75] text-cream/75">
                Non lo diciamo noi: sono gli ospiti, con le loro recensioni, ad averci messo al primo posto.
                Prenotando direttamente qui, senza intermediari che alzano il conto, hai anche il prezzo migliore.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <Link
                href={TRIPADVISOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
              >
                <HoverFill color="#8f7330" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  Leggi le recensioni
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
