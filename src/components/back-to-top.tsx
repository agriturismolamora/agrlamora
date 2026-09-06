"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";

/* bottom-24 su mobile (non bottom-6): il trigger "Verifica disponibilità"
   della booking bar vive centrato alla stessa altezza di un bottom-6 — la
   stessa soluzione già adottata da concierge-chat.tsx per lo stesso motivo.
   Da sm in su la booking bar desktop è compatta e centrata, lasciando
   ampio margine sul lato sinistro. */
function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BackToTop({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
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

  useEffect(() => {
    let ticking = false;
    function compute() {
      setVisible(window.scrollY > window.innerHeight * 0.9);
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

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
      aria-label={t("common", "backToTop", locale)}
      className={`group fixed bottom-24 left-5 z-[65] flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 bg-olive-950/90 text-cream shadow-[0_10px_25px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-raspberry-light hover:text-raspberry-light sm:bottom-6 sm:left-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
        <ArrowUpIcon />
      </span>
    </button>
  );
}
