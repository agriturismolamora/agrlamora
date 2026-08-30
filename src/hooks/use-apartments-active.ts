"use client";

import { useEffect, useState } from "react";

const REFERENCE_FRACTION = 0.4;

/* Vero mentre la sezione Appartamenti (sfondo notturno stellato) occupa il
   punto di riferimento della viewport — stessa tecnica già usata da
   section-progress-dots.tsx (getBoundingClientRect + scroll/rAF, non
   IntersectionObserver): un singolo controllo booleano, riutilizzato sia
   dalla booking bar che dal concierge chat, per decidere quando passare
   alla palette scura in armonia con quello sfondo. */
export function useApartmentsSectionActive() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let ticking = false;

    function compute() {
      const el = document.getElementById("section-apartments");
      if (el) {
        const rect = el.getBoundingClientRect();
        const referenceY = window.innerHeight * REFERENCE_FRACTION;
        setActive(rect.top <= referenceY && rect.bottom > referenceY);
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

  return active;
}
