"use client";

import { useEffect, useRef, useState } from "react";

/* Macro-sezioni reali della homepage, nello stesso ordine in cui compaiono
   nel DOM (src/app/page.tsx). Sezioni brevi/di supporto (BenefitMarquee,
   OutdoorLife, ReviewsSection, DirectBooking, NewsletterSection,
   CertificationsMarquee) non hanno un proprio dot: restano "coperte" dal dot
   della sezione narrativa precedente, così il totale resta contenuto invece
   di esplodere a una voce per componente. */
const SECTIONS = [
  { id: "section-hero", label: "Home" },
  { id: "section-story", label: "La Mora" },
  { id: "section-apartments", label: "Appartamenti" },
  { id: "section-highlights", label: "Perché La Mora" },
  { id: "section-ranking", label: "Riconoscimenti" },
  { id: "section-facebook", label: "Facebook" },
  { id: "section-territorio", label: "Territorio" },
  { id: "section-vivere", label: "La Mora da vivere" },
  { id: "section-map", label: "Dove siamo" },
] as const;

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

export function SectionProgressDots() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
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
      let next: string = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= referenceY) {
          next = s.id;
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

  return (
    <nav
      aria-label="Sezioni della homepage"
      className="pointer-events-none fixed right-[18px] top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = s.id === activeId;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.id)}
            aria-label={s.label}
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
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
