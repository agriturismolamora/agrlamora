"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";

/* Copy originale, invariato in questo passaggio di visual polish — solo la
   granularità del reveal cambia (da frase a parola). Fatti verificati (5
   appartamenti indipendenti, campagna umbra, piscina, gestione familiare
   desumibile dalla ragione sociale "Mazzoli Giuseppina e Paolo" in
   PLAN.md). */
const SENTENCES = [
  "A pochi minuti da Assisi, La Mora vive al proprio ritmo.",
  "Cinque appartamenti indipendenti, una piscina tra il verde e tanto spazio libero intorno.",
  "I bambini corrono, i cani restano con voi, i giorni si allungano.",
  "È una casa di famiglia, prima ancora che un agriturismo.",
  "Si arriva per Assisi. Si resta per come ci si sente, qui.",
];

const WORDS_BY_SENTENCE = SENTENCES.map((s) => s.split(" "));
const TOTAL_WORDS = WORDS_BY_SENTENCE.reduce((n, words) => n + words.length, 0);

const DIM_ALPHA = 0.2;
// Finestra di reveal più larga di 1/TOTAL_WORDS: le parole vicine si
// sovrappongono leggermente, producendo un avanzamento morbido ("inchiostro
// che avanza") invece di uno scatto netto parola per parola.
const WORD_RANGE = 1.6 / TOTAL_WORDS;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export function ImmersiveStory() {
  const wrapperRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Colora le parole scrivendo direttamente lo stile DOM a ogni frame di
  // scroll (nessun setState React per parola/pixel): mantiene 60fps anche
  // con decine di span, e reagisce naturalmente in entrambe le direzioni
  // dato che il colore è sempre una funzione pura del progress corrente.
  useEffect(() => {
    if (reducedMotion) {
      wordRefs.current.forEach((el) => {
        if (el) el.style.color = "#f1f1f1";
      });
      return;
    }

    let ticking = false;

    function paint() {
      const el = wrapperRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const progress = total > 0 ? clamp01(scrolled / total) : 0;

        wordRefs.current.forEach((word, i) => {
          if (!word) return;
          const wordStart = i / TOTAL_WORDS;
          const local = clamp01((progress - wordStart) / WORD_RANGE);
          const alpha = DIM_ALPHA + (1 - DIM_ALPHA) * local;
          word.style.color = `rgba(241,241,241,${alpha})`;
        });
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

  let wordIndex = 0;

  return (
    <section
      ref={wrapperRef}
      id="section-story"
      data-snap-exempt="true"
      className={reducedMotion ? "relative" : "relative min-h-[130vh] sm:min-h-[150vh]"}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Livello 0: fotografia. */}
        <Image
          src="/images/territorio/assisi/assisi con tramonto.jpg"
          alt="Assisi al tramonto, vista dalla campagna umbra intorno ad Agriturismo La Mora"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Livello 1: overlay verde scuro — la fotografia deve restare leggibile. */}
        <div
          className="absolute inset-0 z-[1]"
          aria-hidden="true"
          style={{
            background: "linear-gradient(180deg, rgba(8,17,13,.50) 0%, rgba(8,17,13,.62) 100%)",
          }}
        />

        {/* Livello 2: contenuto narrativo. Centrato geometricamente, con una
            leggera compensazione verso l'alto (non un padding enorme) per
            restare a proprio agio sopra la booking bar fixed in fondo. */}
        <div
          className="relative z-[2] flex h-full w-full flex-col items-center justify-center px-8 text-center sm:px-10"
          style={{ transform: "translateY(-25px)" }}
        >
          <div className="mx-auto flex max-w-[980px] flex-col items-center">
            <span className="text-[11px] font-medium uppercase leading-none tracking-[0.32em] text-[#f1f1f1]">
              Agriturismo ad Assisi
            </span>
            <div className="mt-10 font-display text-[clamp(34px,2.4vw,46px)] leading-[1.08] [text-wrap:balance]">
              {WORDS_BY_SENTENCE.map((words, si) => (
                <p key={si} className="my-[0.06em]">
                  {words.map((word, wi) => {
                    const i = wordIndex++;
                    return (
                      <Fragment key={wi}>
                        <span
                          ref={(el) => {
                            wordRefs.current[i] = el;
                          }}
                          style={{ color: reducedMotion ? "#f1f1f1" : `rgba(241,241,241,${DIM_ALPHA})` }}
                        >
                          {word}
                        </span>
                        {wi < words.length - 1 ? " " : ""}
                      </Fragment>
                    );
                  })}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
