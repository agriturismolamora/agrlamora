"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/* Apertura esclusiva della homepage: un sipario che si apre sulla hero
   già pronta sotto, non uno schermo di caricamento. Lo stato iniziale
   (tutto nascosto, sfondo scuro pieno) è già quello del render server
   (useState(0) di default) — quindi non c'è mai un fotogramma in cui il
   contenuto reale è visibile prima che questo componente prenda il
   controllo, nemmeno nella finestra fra paint e idratazione.

   Vive dentro page.tsx: si monta — e quindi riparte — solo quando la
   route "/" viene effettivamente montata (caricamento diretto, reload,
   o navigazione interna verso "/"). Non si rimonta mai per ancore,
   section-progress-dots o back-to-top: nessuno di questi cambia route,
   quindi non serve alcuna logica ad-hoc per escluderli. */

const DESKTOP_TIMING = { logo: 20, line: 380, text: 650, hold: 950, open: 1100, done: 1650 };
const MOBILE_TIMING = { logo: 20, line: 310, text: 530, hold: 780, open: 900, done: 1350 };
const REDUCED_TIMING = { text: 20, open: 520, done: 920 };

export function HomeIntro() {
  const [phase, setPhase] = useState<Phase>(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* Rilevamento e pianificazione dei timer nello stesso effect (mount-only,
     deps []): leggere reducedMotion/mobile in due passaggi separati (uno
     stato che si aggiorna via matchMedia, un secondo effect che dipende da
     quello stato) farebbe ripartire questo effect subito dopo il primo
     render — innocuo nella pratica (i timer vecchi vengono ripuliti), ma
     evitabile del tutto leggendo tutto una sola volta qui. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    setReducedMotion(reduced);

    document.body.style.overflow = "hidden";
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    if (reduced) {
      at(REDUCED_TIMING.text, () => setPhase(3));
      at(REDUCED_TIMING.open, () => setPhase(5));
      at(REDUCED_TIMING.done, () => setPhase(6));
    } else {
      const t = mobile ? MOBILE_TIMING : DESKTOP_TIMING;
      at(t.logo, () => setPhase(1));
      at(t.line, () => setPhase(2));
      at(t.text, () => setPhase(3));
      at(t.hold, () => setPhase(4));
      at(t.open, () => setPhase(5));
      at(t.done, () => setPhase(6));
    }

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase >= 5) document.body.style.overflow = "";
  }, [phase]);

  if (phase >= 6) return null;

  const opening = phase >= 5;

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-olive-950"
        style={{
          opacity: opening ? 0 : 1,
          transition: "opacity 400ms ease",
          pointerEvents: opening ? "none" : "auto",
        }}
      >
        <Image
          src="/images/logo/logo-bianco-agriturismo-la-mora.png"
          alt="Agriturismo La Mora"
          width={280}
          height={210}
          priority
          className="h-auto w-[140px] sm:w-[170px]"
        />
        <span className="mt-6 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#f1f1f1] sm:text-[10px]">
          Assisi · Umbria
        </span>
      </div>
    );
  }

  const contentVisible = phase >= 1;
  const lineVisible = phase >= 2;
  const textVisible = phase >= 3;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[500]" style={{ pointerEvents: opening ? "none" : "auto" }}>
      {/* Le due metà del sipario: la linea centrale è idealmente il loro
          punto di distacco, per questo è posizionata esattamente a metà
          altezza (ogni metà è alta il 50% del viewport). */}
      <div
        className="absolute inset-x-0 top-0 bg-olive-950"
        style={{
          height: "50%",
          transform: opening ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 650ms cubic-bezier(.76,0,.24,1)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 bg-olive-950"
        style={{
          height: "50%",
          transform: opening ? "translateY(100%)" : "translateY(0)",
          transition: "transform 650ms cubic-bezier(.76,0,.24,1)",
        }}
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ opacity: opening ? 0 : 1, transition: "opacity 350ms ease" }}
      >
        <div
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 480ms cubic-bezier(.16,1,.3,1), transform 480ms cubic-bezier(.16,1,.3,1)",
          }}
        >
          <Image
            src="/images/logo/logo-bianco-agriturismo-la-mora.png"
            alt="Agriturismo La Mora"
            width={280}
            height={210}
            priority
            className="h-auto w-[150px] sm:w-[190px]"
          />
        </div>

        <div
          className="mt-7 h-px bg-[#f1f1f1]/30 sm:mt-8"
          style={{
            width: lineVisible ? "84px" : "0px",
            transition: "width 380ms cubic-bezier(.16,1,.3,1)",
          }}
        />

        <span
          className="mt-5 text-[9px] font-semibold uppercase tracking-[0.38em] text-[#f1f1f1] sm:text-[10px]"
          style={{ opacity: textVisible ? 1 : 0, transition: "opacity 320ms ease" }}
        >
          Assisi · Umbria
        </span>
      </div>
    </div>
  );
}
