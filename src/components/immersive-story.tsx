"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* Copy originale, scritto per La Mora: nessuna frase presa dal sito
   reference. Fatti verificati (5 appartamenti indipendenti, campagna umbra,
   piscina, gestione familiare desumibile dalla ragione sociale "Mazzoli
   Giuseppina e Paolo" in PLAN.md) — non un elenco di servizi, un'unica idea:
   si vive Assisi restando immersi nella quiete della campagna. */
const LINES = [
  "A pochi minuti da Assisi, La Mora vive al proprio ritmo.",
  "Cinque appartamenti indipendenti, una piscina tra il verde e tanto spazio libero intorno.",
  "I bambini corrono, i cani restano con voi, i giorni si allungano.",
  "È una casa di famiglia, prima ancora che un agriturismo.",
  "Si arriva per Assisi. Si resta per come ci si sente, qui.",
];

function useScrollProgress(ref: React.RefObject<HTMLElement | null>, disabled: boolean) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (disabled) return;
    let ticking = false;

    function update() {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
        setProgress(p);
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, disabled]);

  return progress;
}

export function ImmersiveStory() {
  const wrapperRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const progress = useScrollProgress(wrapperRef, reducedMotion);

  return (
    <section
      ref={wrapperRef}
      className={reducedMotion ? "relative" : "relative min-h-[130vh] sm:min-h-[150vh]"}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Livello 0: fotografia. */}
        <Image
          src="/images/piscina/foto piscina di giorno.webp"
          alt="Piscina di Agriturismo La Mora immersa nel verde della campagna umbra"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Livello 1: overlay verde scuro — calibrato per restare leggero,
            la fotografia deve continuare a percepirsi chiaramente. */}
        <div
          className="absolute inset-0 z-[1]"
          aria-hidden="true"
          style={{
            background: "linear-gradient(180deg, rgba(8,17,13,.50) 0%, rgba(8,17,13,.62) 100%)",
          }}
        />

        {/* Livello 2: contenuto narrativo, con margine per non finire mai
            sotto la booking bar fixed (z-[70]) sospesa in fondo allo schermo. */}
        <div className="relative z-[2] mx-auto flex max-w-[1050px] flex-col items-center px-6 pb-28 text-center sm:pb-32">
          <span className="text-[13px] font-medium uppercase tracking-[0.35em] text-cream/80">
            Agriturismo ad Assisi
          </span>
          <p className="mt-8 font-display text-[clamp(32px,9vw,44px)] leading-[1.15] sm:mt-9 sm:text-[clamp(42px,3.2vw,64px)] sm:leading-[1.08]">
            {LINES.map((line, i) => {
              const active = reducedMotion || progress >= i / LINES.length;
              return (
                <span
                  key={line}
                  className="block transition-colors duration-[350ms] ease-out"
                  style={{ color: active ? "#f1f1f1" : "rgba(241,241,241,.22)" }}
                >
                  {line}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
