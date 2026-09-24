"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";

const HERO_H1: Record<Locale, string> = {
  it: "Agriturismo La Mora — Appartamenti indipendenti ad Assisi, Umbria",
  en: "Agriturismo La Mora — Independent apartments in Assisi, Umbria",
  fr: "Agriturismo La Mora — Appartements indépendants à Assise, Ombrie",
  de: "Agriturismo La Mora — Unabhängige Apartments in Assisi, Umbrien",
};

export function Hero({ locale }: { locale: Locale }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Il video va in loop per tutti, anche con "Riduci movimento" attivo sul
     telefono (richiesta esplicita del titolare: prima veniva messo in pausa
     in quel caso, ed era il "video fermo al primo frame" visto sull'iPhone
     di Paolo). play() esplicito come rete di sicurezza per i browser
     integrati nelle app che a volte ignorano l'attributo autoplay; se il
     sistema lo vieta (es. Risparmio energetico su iOS) resta il poster,
     nessun errore. */
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section id="section-hero" className="relative min-h-[100svh] overflow-hidden bg-olive-950">
      {/* Livello 0: fotografia/video di sfondo. */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        poster="/videos/hero/agriturismo-la-mora-hero-poster.jpg"
      >
        <source src="/videos/hero/agriturismo-la-mora-hero.webm" type="video/webm" />
        <source src="/videos/hero/agriturismo-la-mora-hero.mp4" type="video/mp4" />
      </video>

      {/* Livello 1: scrim verde scuro coerente col brand — leggibilità per
          header/logo senza appiattire la fotografia. */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,33,23,.34) 0%, rgba(28,33,23,.20) 38%, rgba(28,33,23,.38) 72%, rgba(28,33,23,.58) 100%)",
        }}
      />

      {/* Livello 2: contenuto. Centrato in modo assoluto sull'intero viewport
          della hero (non sul container della navbar). */}
      {/* w-full sotto md: senza una larghezza esplicita, un blocco absolute
          con left:50% si restringe a METÀ viewport (spazio residuo a destra
          del left) — su mobile ~147px utili, e il max-width:100% delle
          immagini schiacciava il logo ben sotto la larghezza voluta. Da md
          in su resta com'era (w-auto): lì metà viewport basta e avanza. */}
      <div
        className="absolute left-1/2 top-1/2 z-[2] flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6 text-center text-cream md:w-auto"
      >
        <h1 className="sr-only">{HERO_H1[locale]}</h1>
        {/* Tracking ridotto sotto sm: a 0.4em su viewport stretti "ASSISI ·
            UMBRIA" andava a capo su due righe (15 caratteri + spaziatura
            estrema non ci stavano in ~320px utili) — su mobile resta su
            un'unica riga, leggibile come sulla versione desktop. */}
        <span className="text-[11px] font-medium uppercase tracking-[0.26em] text-cream/90 sm:text-[13px] sm:tracking-[0.4em]">
          Assisi · Umbria
        </span>
        {/* Logo ingrandito su mobile, richiesta esplicita del titolare:
            290px (max 76vw per restare nei margini a 320px) sotto md; da md
            in su invariato, clamp(260px, 26vw, 370px).
            Nessun filtro CSS (prima: drop-shadow): un filter su un'immagine
            sopra un <video> in riproduzione, dentro un contenitore con
            transform, su alcuni iPhone/Android viene composto come un
            rettangolo grigio attorno al logo. Il PNG è già trasparente;
            la leggibilità la garantisce la velatura scura della hero. */}
        <Link href={withLocale(locale, "/")} aria-label={`Agriturismo La Mora — ${t("nav", "torna", locale)}`} className="mt-7 sm:mt-9">
          <Image
            src="/images/logo/logo-bianco-agriturismo-la-mora.png"
            alt="Agriturismo La Mora, Assisi - Perugia (Umbria)"
            width={370}
            height={278}
            priority
            className="h-auto w-[min(290px,76vw)] md:w-[clamp(260px,26vw,370px)]"
          />
        </Link>
      </div>
    </section>
  );
}
