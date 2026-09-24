"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";

/* Impilato SOPRA il pulsante flottante "Richiesta" (richieste-modal.tsx),
   che occupa il suo vecchio posto in basso a sinistra: su mobile quello sta
   a bottom-24 (sopra la booking bar), da sm in su a bottom-6. Vicino al
   footer si dissolve come booking bar, concierge e "Richiesta": lì il
   "torna su" è un link dentro il footer stesso (site-footer.tsx), così
   nessun pulsante fisso copre i contenuti del footer. */
function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BackToTop({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), { rootMargin: "0px 0px -15% 0px" });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

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
      className={`group fixed bottom-[calc(9.5rem+env(safe-area-inset-bottom))] left-5 z-[65] flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 bg-olive-950/90 text-cream shadow-[0_10px_25px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-raspberry-light hover:text-raspberry-light sm:bottom-[calc(5rem+env(safe-area-inset-bottom))] sm:left-6 ${
        visible && !nearFooter ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
        <ArrowUpIcon />
      </span>
    </button>
  );
}
