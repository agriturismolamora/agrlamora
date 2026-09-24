"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* Wrapper condiviso per il reveal-on-scroll usato da tutte le sezioni sotto
   il carousel appartamenti: evita di riscrivere IntersectionObserver in ogni
   componente. Il contenuto resta sempre nel DOM (mai display:none), quindi
   resta leggibile a crawler e screen reader anche prima del reveal — cambia
   solo opacity/transform, mai visibility.

   SOLO da 768px (md) in su: lo stato "nascosto" vive nella classe .reveal
   di globals.css, dentro una media query, non più nello stile inline. Su
   telefono il contenuto è visibile dal primo istante, anche prima del JS:
   con il reveal attivo, subito dopo ogni gesto di scroll dal 23% al 90%
   dello schermo era ancora vuoto in attesa della dissolvenza (misurato su
   mobile), l'effetto "blocco sezione per sezione" segnalato dal titolare. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function showImmediately() {
      setVisible(true);
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      showImmediately();
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      showImmediately();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";
  return (
    <Component
      ref={ref}
      className={`reveal ${className}`}
      data-revealed={visible ? "true" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Component>
  );
}
