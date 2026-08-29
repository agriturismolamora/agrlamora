"use client";

import { useEffect } from "react";

/* "Blocca" lo scroll sezione per sezione (richiesta esplicita: non uno
   scroll fluido continuo, ma un avanzamento a scatti tra le sezioni della
   home). Approccio: non CSS scroll-snap-type puro — con sezioni "pinned"
   molto più alte della viewport (carousel appartamenti 460vh, immersive
   story 130-150vh, galleria Instagram 220vh) uno snap CSS "mandatory"
   agganciato al wrapper esterno di quelle sezioni tenta di tornare
   all'inizio della sezione dopo OGNI singolo gesto di scroll, intrappolando
   l'utente vicino all'inizio invece di lasciarlo avanzare nel loro scroll
   interno — un difetto noto di CSS scroll-snap con sezioni multi-viewport.

   Soluzione: individua da solo, a runtime, tutte le sezioni dirette di
   <main> (nessuna lista duplicata da mantenere in sync con page.tsx).
   Quelle marcate data-snap-exempt="true" (le tre pinned sopra) restano
   valide come PUNTO DI ARRIVO dello snap (ci si aggancia normalmente
   all'inizio), ma mentre l'utente vi si trova dentro non scatta nessun
   ulteriore snap: il loro scroll interno resta libero e intatto.

   Solo desktop (stesso limite di isDesktop già usato da instagram-gallery
   e dal fallback mobile di apartments-carousel: su schermi piccoli lo
   scroll a scatti via JS su gesti touch è tipicamente fastidioso) e
   disattivato con prefers-reduced-motion. */
const SETTLE_MS = 200;
const SNAP_LOCK_MS = 1000;
const MIN_DISTANCE_PX = 40;

export function SectionSnapScroll() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    if (reducedMotionQuery.matches || !desktopQuery.matches) return;

    const main = document.getElementById("main");
    if (!main) return;

    let settleTimer: number | undefined;
    let snapping = false;
    let unlockTimer: number | undefined;

    function getSections(): HTMLElement[] {
      return Array.from(main!.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el.tagName === "SECTION");
    }

    function currentlyInsideExemptSection(sections: HTMLElement[]): boolean {
      const mid = window.innerHeight / 2;
      return sections.some((s) => {
        if (s.dataset.snapExempt !== "true") return false;
        const r = s.getBoundingClientRect();
        return r.top < mid && r.bottom > mid;
      });
    }

    function snapToNearest() {
      const sections = getSections();
      if (currentlyInsideExemptSection(sections)) return;

      let nearest: HTMLElement | null = null;
      let nearestDistance = Infinity;
      for (const s of sections) {
        const distance = Math.abs(s.getBoundingClientRect().top);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = s;
        }
      }
      if (!nearest || nearestDistance < MIN_DISTANCE_PX) return;

      snapping = true;
      nearest.scrollIntoView({ behavior: "smooth", block: "start" });
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        snapping = false;
      }, SNAP_LOCK_MS);
    }

    function onScroll() {
      if (snapping) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(snapToNearest, SETTLE_MS);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(settleTimer);
      window.clearTimeout(unlockTimer);
    };
  }, []);

  return null;
}
