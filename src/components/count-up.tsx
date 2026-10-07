"use client";

import { useEffect, useRef, useState } from "react";

/* Conteggio animato fino al valore finale (es. "Su 38 agriturismi").
   Il render server contiene già il valore FINALE: l'HTML è corretto anche
   senza JavaScript e per chi legge il testo della pagina (motori di ricerca,
   lettori di schermo) — prima partiva da 0 e l'HTML diceva "Su 0".
   L'animazione è solo un abbellimento successivo: se all'idratazione il
   numero è già in vista resta fermo sul valore finale; se è fuori dallo
   schermo viene azzerato lì (invisibile) e conta fino al valore quando entra
   in viewport. Con prefers-reduced-motion resta sempre il valore finale.
   setState solo nei callback di IntersectionObserver/requestAnimationFrame,
   mai in modo sincrono nell'effetto. */
export function CountUp({
  to,
  duration = 1200,
  className = "",
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let armed = false;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!armed) {
          // Primo callback = stato iniziale: se è già visibile non si anima.
          if (entry.intersectionRatio > 0) {
            io.disconnect();
            return;
          }
          armed = true;
          setValue(0);
          return;
        }
        if (entry.intersectionRatio >= 0.4) {
          io.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            setValue(Math.round((1 - Math.pow(1 - t, 3)) * to));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: [0, 0.4] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
