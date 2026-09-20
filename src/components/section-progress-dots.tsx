"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

/* Macro-sezioni reali della homepage, nello stesso ordine in cui compaiono
   nel DOM (src/app/page.tsx). Sezioni brevi/di supporto (OutdoorLife,
   SustainabilitySection, ReviewsSection, NewsletterSection, CertificationsMarquee)
   non hanno un proprio dot: restano "coperte" dal dot della sezione
   narrativa precedente, così il totale resta contenuto invece di
   esplodere a una voce per componente. PriceComparisonSection ha un dot
   proprio: è il blocco ad alta conversione spostato subito dopo "Perché
   La Mora", merita un punto di riferimento diretto nella navigazione.

   Le label erano hardcoded in italiano nonostante il componente sia
   montato (senza prop locale) su tutte e 4 le home /it /en /fr /de — bug
   trovato durante la verifica multilingua: i tooltip dei dot restavano in
   italiano anche sulle pagine tradotte. */
const SECTION_IDS = [
  "section-hero",
  "section-story",
  "section-apartments",
  "section-highlights",
  "section-price-comparison",
  "section-ranking",
  "section-territorio",
  "section-vivere",
  "section-map",
  "section-facebook",
] as const;

const LABELS: Record<Locale, Record<(typeof SECTION_IDS)[number], string>> = {
  it: {
    "section-hero": "Home",
    "section-story": "La Mora",
    "section-apartments": "Appartamenti",
    "section-highlights": "Perché La Mora",
    "section-price-comparison": "Prenota diretto",
    "section-ranking": "Riconoscimenti",
    "section-territorio": "Territorio",
    "section-vivere": "La Mora da vivere",
    "section-map": "Dove siamo",
    "section-facebook": "Facebook",
  },
  en: {
    "section-hero": "Home",
    "section-story": "La Mora",
    "section-apartments": "Apartments",
    "section-highlights": "Why La Mora",
    "section-price-comparison": "Book directly",
    "section-ranking": "Recognition",
    "section-territorio": "The area",
    "section-vivere": "Life at La Mora",
    "section-map": "Where we are",
    "section-facebook": "Facebook",
  },
  fr: {
    "section-hero": "Accueil",
    "section-story": "La Mora",
    "section-apartments": "Appartements",
    "section-highlights": "Pourquoi La Mora",
    "section-price-comparison": "Réserver en direct",
    "section-ranking": "Distinctions",
    "section-territorio": "Le territoire",
    "section-vivere": "Vivre La Mora",
    "section-map": "Où nous sommes",
    "section-facebook": "Facebook",
  },
  de: {
    "section-hero": "Startseite",
    "section-story": "La Mora",
    "section-apartments": "Apartments",
    "section-highlights": "Warum La Mora",
    "section-price-comparison": "Direkt buchen",
    "section-ranking": "Auszeichnungen",
    "section-territorio": "Die Umgebung",
    "section-vivere": "Leben in La Mora",
    "section-map": "Wo wir sind",
    "section-facebook": "Facebook",
  },
};

const NAV_LABEL: Record<Locale, string> = {
  it: "Sezioni della homepage",
  en: "Homepage sections",
  fr: "Sections de la page d'accueil",
  de: "Abschnitte der Startseite",
};

/* Punto di riferimento della viewport usato per decidere quale sezione è
   "attiva": non una soglia hardcoded di scrollY, ma una frazione
   dell'altezza reale della viewport — la sezione attiva è l'ultima (in
   ordine di documento) il cui bordo superiore ha già superato questo punto.
   Robusto per sezioni pinned molto più alte della viewport (es. il carousel
   appartamenti, 460vh): resta attiva per tutto il suo intervallo di scroll,
   perché il suo `top` resta <= referenceY finché non la si supera del tutto. */
function getReferenceY() {
  return window.innerHeight * 0.35;
}

export function SectionProgressDots({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onChange() {
      setReducedMotion(mq.matches);
    }
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let ticking = false;

    function compute() {
      const referenceY = getReferenceY();
      let next: string = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= referenceY) {
          next = id;
        } else {
          break;
        }
      }
      if (next !== activeIdRef.current) {
        activeIdRef.current = next;
        setActiveId(next);
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
  }, []);

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  const labels = LABELS[locale];

  return (
    <nav
      aria-label={NAV_LABEL[locale]}
      className="pointer-events-none fixed right-[18px] top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {SECTION_IDS.map((id) => {
        const isActive = id === activeId;
        const label = labels[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => goTo(id)}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
            className="group pointer-events-auto relative flex h-4 w-4 items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={`rounded-full transition-all duration-250 ease-out ${
                isActive ? "h-2.5 w-2.5 bg-[#f1f1f1]" : "h-[7px] w-[7px] bg-[#f1f1f1]/35 group-hover:bg-[#f1f1f1]/60"
              }`}
              style={isActive ? { boxShadow: "0 0 12px 3px rgba(241,241,241,0.5)" } : undefined}
            />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-[3px] bg-ink/85 px-2.5 py-1 text-[10px] font-medium text-cream opacity-0 shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition-opacity duration-150 group-hover:opacity-100">
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
