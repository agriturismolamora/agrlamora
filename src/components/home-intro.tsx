"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/home-intro.module.css";

/* Apertura esclusiva della homepage: un sipario che si apre sulla hero
   già pronta sotto, non uno schermo di caricamento.

   Tutta la sequenza (logo, linea, scritta, apertura, fine) è in CSS
   (home-intro.module.css) e parte dal primo paint, anche prima che il
   JavaScript sia caricato: prima era scandita da timer avviati dopo
   l'hydration, e su un telefono lento il sipario restava chiuso per
   secondi (la hero, e quindi l'LCP, aspettavano il JavaScript). L'aspetto
   e i tempi sono gli stessi. Al JavaScript restano due compiti:
   - bloccare lo scroll della pagina finché il sipario è chiuso, solo per
     il tempo che ne resta (l'animazione può essere già avanzata quando
     il componente si idrata);
   - togliere il sipario dal DOM a sequenza conclusa.

   Vive dentro page.tsx: si monta — e quindi riparte — solo quando la
   route "/" viene effettivamente montata (caricamento diretto, reload,
   o navigazione interna verso "/"). Non si rimonta mai per ancore,
   section-progress-dots o back-to-top. */

/* Tempo trascorso dall'inizio delle animazioni del sipario (null se il
   browser non espone getAnimations: in quel caso niente blocco dello
   scroll, il sipario si apre comunque da solo). */
function elapsedMs(root: HTMLElement): number | null {
  if (typeof root.getAnimations !== "function") return null;
  const [animation] = root.getAnimations();
  const time = animation?.currentTime;
  return typeof time === "number" ? time : null;
}

function readMs(root: HTMLElement, name: string): number {
  return parseFloat(getComputedStyle(root).getPropertyValue(name)) || 0;
}

export function HomeIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const elapsed = elapsedMs(root) ?? 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const openAt = reduced ? 520 : readMs(root, "--open-at");
    const doneAt = readMs(root, "--done-at");
    const timers: number[] = [];

    if (elapsed < openAt) {
      document.body.style.overflow = "hidden";
      timers.push(window.setTimeout(() => (document.body.style.overflow = ""), openAt - elapsed));
    }
    timers.push(window.setTimeout(() => setDone(true), Math.max(0, doneAt - elapsed)));

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={ref} aria-hidden="true" className={styles.root}>
      <div className={`${styles.half} ${styles.top}`} />
      <div className={`${styles.half} ${styles.bottom}`} />
      <div className={styles.content}>
        <div className={styles.logo}>
          <Image
            src="/images/logo/logo-bianco-agriturismo-la-mora.png"
            alt="Agriturismo La Mora"
            width={280}
            height={210}
            priority
            className="h-auto w-[150px] sm:w-[190px]"
          />
        </div>
        <div className={styles.line} />
        <span className={`${styles.text} mt-5 text-[9px] font-semibold uppercase tracking-[0.38em] text-[#f1f1f1] sm:text-[10px]`}>
          Assisi · Umbria
        </span>
      </div>
    </div>
  );
}
