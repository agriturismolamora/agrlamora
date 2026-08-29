"use client";

import { useEffect, useState, type ComponentType } from "react";
import { Reveal } from "@/components/scroll-reveal";

/* Sezione interattiva "un highlight alla volta": icone monocromatiche
   lineari (stesso linguaggio delle altre icone del progetto), nessun dot
   locale — l'indicatore globale della homepage (section-progress-dots.tsx)
   si occupa della navigazione tra macro-sezioni. Selezione solo via click
   (niente auto-avanzamento/blocco scroll con la rotella: l'utente sceglie
   liberamente quale icona guardare). Solo fatti reali già verificati
   altrove nel progetto. */
function LandscapeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 18l5.5-7 4 4.5L16 11l5 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M3 9c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 14.5c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CupIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M5 8h11v5a5.5 5.5 0 0 1-5.5 5.5A5.5 5.5 0 0 1 5 13V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 9.5h1.5a2 2 0 0 1 0 4H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 20.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="9" cy="7" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 18c0-2.8 2.2-4.6 5-4.6s5 1.8 5 4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17.5" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 18c0-2 1.6-3.4 3.5-3.4s3.5 1.4 3.5 3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="12" cy="15.5" r="3.4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6.5" cy="10" r="1.7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="10" r="1.7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BikeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="5.5" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18.5" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 17 9 9h4l3.5 8M9 9 7.5 6h-2M9 9l3 5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M13 3 5 13.5h5.5L11 21l8-11h-5.5L13 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function HomeKeyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 11 12 4l8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9.5h12V10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="10.5" cy="15" r="1.4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11.8 15h2.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M12 19.5S4 14.8 4 9.3A4 4 0 0 1 12 7a4 4 0 0 1 8 2.3c0 5.5-8 10.2-8 10.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Highlight = { Icon: ComponentType; label: string; title: string; description: string };

const HIGHLIGHTS: Highlight[] = [
  {
    Icon: LandscapeIcon,
    label: "Territorio",
    title: "Vista su Assisi",
    description: "La campagna intorno, la Basilica di San Francesco a pochi minuti di auto.",
  },
  {
    Icon: WaveIcon,
    label: "Piscina",
    title: "Piscina panoramica",
    description: "Aperta nella bella stagione, immersa nel verde della campagna umbra.",
  },
  {
    Icon: CupIcon,
    label: "Colazione",
    title: "Colazione biologica",
    description: "Fatta in casa ogni mattina da Giuseppina, con prodotti del territorio.",
  },
  {
    Icon: FamilyIcon,
    label: "Famiglie",
    title: "Pensato per le famiglie",
    description: "Parco giochi, spazi aperti e appartamenti adatti a chi viaggia con bambini.",
  },
  {
    Icon: PawIcon,
    label: "Pet friendly",
    title: "Pet friendly",
    description: "Giardini privati recintati per Gemelli e Sagittario, doccia esterna per i cani.",
  },
  {
    Icon: BikeIcon,
    label: "E-bike",
    title: "Noleggio e-bike",
    description: "Per scoprire il territorio in sella, anche in salita, direttamente dalla struttura.",
  },
  {
    Icon: BoltIcon,
    label: "Ricarica EV",
    title: "Ricarica auto elettriche",
    description: "Colonnina da 22 kW nel parcheggio privato della struttura.",
  },
  {
    Icon: HomeKeyIcon,
    label: "Appartamenti",
    title: "5 appartamenti indipendenti",
    description: "Ognuno con ingresso autonomo, cucina attrezzata e i propri spazi.",
  },
  {
    Icon: HeartIcon,
    label: "Gestione familiare",
    title: "Gestione familiare",
    description: "Paolo e Giuseppina seguono personalmente ogni ospite, da sempre.",
  },
];

export function LaMoraDaVivere() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onChange() {
      setReducedMotion(mq.matches);
    }
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const current = HIGHLIGHTS[active];

  return (
    <section
      id="section-vivere"
      aria-label="La Mora da vivere"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-olive-950 py-20 text-cream sm:py-24"
    >
      <Reveal className="relative z-[2] mx-auto max-w-[820px] px-6 text-center sm:px-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/55">La Mora da vivere</span>
        <h2 className="mt-6 font-display text-[clamp(30px,4.4vw,58px)] font-normal leading-[1.1] [text-wrap:balance]">
          <span className="text-cream">Il piacere è</span> <span className="italic text-cream/40">nei dettagli.</span>
        </h2>
      </Reveal>

      <div
        role="tablist"
        aria-label="Highlight di Agriturismo La Mora"
        className="relative z-[2] mt-12 flex max-w-[720px] flex-wrap items-center justify-center gap-2.5 px-6 sm:mt-14 sm:gap-3"
      >
        {HIGHLIGHTS.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={item.label}
              onClick={() => setActive(i)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border transition-all duration-300 sm:h-14 sm:w-14 ${
                isActive
                  ? "border-gold text-gold shadow-[0_0_0_1px_rgba(182,146,60,0.4),0_0_20px_rgba(182,146,60,0.3)]"
                  : "border-cream/15 text-cream/40 hover:border-cream/35 hover:text-cream/70"
              }`}
            >
              <item.Icon />
            </button>
          );
        })}
      </div>

      <div
        key={current.label}
        role="tabpanel"
        aria-live="polite"
        className={`relative z-[2] mt-12 max-w-[560px] px-6 text-center sm:mt-14 ${reducedMotion ? "" : "animate-panel-fade"}`}
      >
        <h3 className="font-display text-[26px] font-normal uppercase leading-[1.2] text-cream sm:text-[30px]">
          {current.title}
        </h3>
        <p className="mt-3 text-[14px] leading-[1.7] text-cream/70">{current.description}</p>
      </div>
    </section>
  );
}
