"use client";

import { WatermarkedImage } from "@/components/watermarked-image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

/* Ripristinato: era stato rimosso ("semplificata la sezione foto di Assisi,
   testo scroll-reveal tolto su richiesta") ma la richiesta del titolare era
   di riportarlo, non di lasciarlo fuori — testo e comportamento identici a
   prima della rimozione.

   Ottobre 2026: la foto di Assisi sotto la hero resta PULITA (niente testo
   né velatura scura sopra) ed è stata sostituita con una più luminosa, la
   Basilica di San Francesco in pieno giorno (foto reale già in public/,
   usata anche in Territorio). Il testo che si accende parola per parola è
   stato spostato subito SOTTO la foto, in una sezione a sé, con lo stesso
   effetto di prima. La vecchia foto al tramonto resta invariata negli altri
   punti del sito in cui è usata.

   Ottobre 2026 (2): fondo chiaro standard (bg-cream, come le altre sezioni
   chiare) invece del verde oliva. Testo in ink: le parole non ancora
   rivelate sono ink al 50% (circa 3:1 sul cream, la soglia AA per il testo
   grande: attenuate ma leggibili), quelle rivelate ink pieno (circa 15:1).
   Sezioni vicine: sopra la foto a tutta larghezza, sotto gli Appartamenti
   su fondo scuro (bg-midnight), quindi nessun fondo uguale consecutivo.

   Copy originale, invariato in questo passaggio di visual polish — solo la
   granularità del reveal cambia (da frase a parola). Fatti verificati (5
   appartamenti indipendenti, campagna umbra, piscina, gestione familiare
   desumibile dalla ragione sociale "Mazzoli Giuseppina e Paolo" in
   PLAN.md). */
const SENTENCES_BY_LOCALE: Record<Locale, string[]> = {
  it: [
    "A 6,8 km dal centro di Assisi, La Mora vive al proprio ritmo.",
    "Cinque appartamenti indipendenti, una piscina tra il verde e tanto spazio libero intorno.",
    "I bambini corrono, i cani restano con voi, i giorni si allungano.",
    "È una casa di famiglia, prima ancora che un agriturismo.",
    "Si arriva per Assisi. Si resta per come ci si sente, qui.",
  ],
  en: [
    "Just 6.8 km from the centre of Assisi, La Mora moves at its own pace.",
    "Five independent apartments, a pool surrounded by greenery, and plenty of open space around.",
    "Children run free, dogs stay by your side, the days grow longer.",
    "It's a family home, before it's an agriturismo.",
    "You come for Assisi. You stay for how it feels here.",
  ],
  fr: [
    "À 6,8 km du centre d'Assise, La Mora vit à son propre rythme.",
    "Cinq appartements indépendants, une piscine entourée de verdure et beaucoup d'espace tout autour.",
    "Les enfants courent, les chiens restent avec vous, les journées s'allongent.",
    "C'est une maison de famille, avant d'être un agriturismo.",
    "On vient pour Assise. On reste pour ce que l'on ressent ici.",
  ],
  de: [
    "Nur 6,8 km vom Zentrum Assisis entfernt, lebt La Mora in seinem eigenen Rhythmus.",
    "Fünf unabhängige Apartments, ein Pool inmitten von Grün und viel freier Raum ringsum.",
    "Kinder laufen frei herum, Hunde bleiben bei Ihnen, die Tage werden länger.",
    "Es ist ein Familienhaus, noch bevor es ein Agriturismo ist.",
    "Man kommt wegen Assisi. Man bleibt, weil man sich hier so fühlt.",
  ],
};

const LABEL: Record<Locale, string> = {
  it: "Agriturismo ad Assisi",
  en: "Agriturismo in Assisi",
  fr: "Agriturismo à Assise",
  de: "Agriturismo in Assisi",
};

const PHOTO_ALT: Record<Locale, string> = {
  it: "La Basilica di San Francesco ad Assisi in una giornata di sole, con il prato davanti e la valle umbra sullo sfondo",
  en: "The Basilica of San Francesco in Assisi on a sunny day, with the lawn in front and the Umbrian valley behind",
  fr: "La basilique Saint-François d'Assise par une journée ensoleillée, avec la pelouse devant et la vallée ombrienne au fond",
  de: "Die Basilika San Francesco in Assisi an einem sonnigen Tag, mit der Wiese davor und dem umbrischen Tal im Hintergrund",
};

/* Colore del testo (ink #241f17) in RGB, per l'alpha calcolato dallo scroll. */
const INK_RGB = "36,31,23";
const DIM_ALPHA = 0.5;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export function ImmersiveStory({ locale }: { locale: Locale }) {
  const SENTENCES = SENTENCES_BY_LOCALE[locale];
  const WORDS_BY_SENTENCE = useMemo(() => SENTENCES.map((s) => s.split(" ")), [SENTENCES]);
  const TOTAL_WORDS = useMemo(() => WORDS_BY_SENTENCE.reduce((n, words) => n + words.length, 0), [WORDS_BY_SENTENCE]);
  // Finestra di reveal più larga di 1/TOTAL_WORDS: le parole vicine si
  // sovrappongono leggermente, producendo un avanzamento morbido
  // ("inchiostro che avanza") invece di uno scatto netto parola per parola.
  const WORD_RANGE = 1.6 / TOTAL_WORDS;
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
        if (el) el.style.color = `rgb(${INK_RGB})`;
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
          // Inizi distribuiti su [0, 1 - WORD_RANGE]: anche l'ultima parola
          // arriva a contrasto pieno a fine sezione (con i / TOTAL_WORDS si
          // fermava all'81%).
          const wordStart = (i / Math.max(1, TOTAL_WORDS - 1)) * (1 - WORD_RANGE);
          const local = clamp01((progress - wordStart) / WORD_RANGE);
          const alpha = DIM_ALPHA + (1 - DIM_ALPHA) * local;
          word.style.color = `rgba(${INK_RGB},${alpha})`;
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
  }, [reducedMotion, TOTAL_WORDS, WORD_RANGE]);

  let wordIndex = 0;

  return (
    <>
      {/* Foto di Assisi a tutta larghezza, pulita: nessun testo, nessuna
          velatura. Solo la filigrana del logo, come su tutte le foto reali. */}
      <section className="relative h-[68svh] min-h-[380px] overflow-hidden max-md:mt-7 md:h-[100svh]">
        <WatermarkedImage
          src="/images/territorio/assisi/basilica di assisi.jpg"
          alt={PHOTO_ALT[locale]}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <section
        ref={wrapperRef}
        id="section-story"
        data-snap-exempt="true"
        /* Tratto di scroll "trattenuto" (sezione più alta della viewport +
           contenuto sticky) SOLO da md in su: su telefono la sezione scorre
           via normalmente, testo già tutto acceso (vedi classe sulle parole) —
           richiesta esplicita del titolare, il blocco temporaneo durante lo
           scroll su mobile era sgradevole. */
        className={reducedMotion ? "relative bg-cream" : "relative bg-cream md:min-h-[150vh]"}
      >
        <div className="flex items-center justify-center overflow-hidden py-20 md:sticky md:top-0 md:h-[100svh] md:py-0">
          {/* Contenuto narrativo. Centrato geometricamente, con una leggera
              compensazione verso l'alto (non un padding enorme) per restare a
              proprio agio sopra la booking bar fixed in fondo. */}
          <div className="relative flex h-full w-full flex-col items-center justify-center px-8 text-center sm:px-10 md:-translate-y-[25px]">
            <div className="mx-auto flex max-w-[980px] flex-col items-center">
              <span className="text-[11px] font-medium uppercase leading-none tracking-[0.32em] text-olive-950">
                {LABEL[locale]}
              </span>
              {/* Su mobile il testo pinnato (5 frasi) doveva stare per intero
                  dentro i 100svh della sezione sticky: al valore minimo del
                  clamp desktop (34px) superava l'altezza del viewport e le
                  ultime frasi finivano spinte sotto la booking bar fissa.
                  Sotto sm: dimensione fissa più piccola invece del clamp. */}
              <div className="mt-6 font-display text-[21px] leading-[1.22] [text-wrap:balance] sm:mt-10 sm:text-[clamp(34px,2.4vw,46px)] sm:leading-[1.08]">
                {WORDS_BY_SENTENCE.map((words, si) => (
                  <p key={si} className="my-[0.02em] sm:my-[0.06em]">
                    {words.map((word, wi) => {
                      const i = wordIndex++;
                      return (
                        <Fragment key={wi}>
                          <span
                            ref={(el) => {
                              wordRefs.current[i] = el;
                            }}
                            // max-md + !important: su telefono sempre acceso,
                            // anche sopra al colore inline scritto dallo scroll.
                            className="max-md:text-ink!"
                            style={{ color: reducedMotion ? `rgb(${INK_RGB})` : `rgba(${INK_RGB},${DIM_ALPHA})` }}
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
    </>
  );
}
