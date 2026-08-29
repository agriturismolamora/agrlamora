"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Wrapper condiviso per il reveal-on-scroll usato da tutte le sezioni sotto
   il carousel appartamenti: evita di riscrivere IntersectionObserver in ogni
   componente. Il contenuto resta sempre nel DOM (mai display:none), quindi
   resta leggibile a crawler e screen reader anche prima del reveal — cambia
   solo opacity/transform, mai visibility. */
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
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(34px) scale(0.97)",
        transition: `opacity 850ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform 850ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
        willChange: visible ? undefined : "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
