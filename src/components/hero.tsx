"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-olive-950">
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
        poster="/images/piscina/piscina%20agriturismo%20la%20mora.webp"
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
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
          della hero (non sul container della navbar), leggermente sopra il
          centro geometrico per lasciare respiro alla booking bar sospesa. */}
      <div
        className="absolute left-1/2 top-[46%] z-[2] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-6 text-center text-cream"
      >
        <span className="text-[13px] font-medium uppercase tracking-[0.4em] text-cream/90">
          Assisi · Umbria
        </span>
        <Link href="/" aria-label="Agriturismo La Mora — torna alla home" className="mt-8 sm:mt-9">
          <Image
            src="/images/logo/logo-bianco-agriturismo-la-mora.png"
            alt="Agriturismo La Mora, Assisi - Perugia (Umbria)"
            width={370}
            height={278}
            priority
            className="h-auto w-[clamp(220px,26vw,370px)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]"
          />
        </Link>
      </div>
    </section>
  );
}
