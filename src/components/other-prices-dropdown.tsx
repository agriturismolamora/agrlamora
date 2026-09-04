"use client";

import { useState } from "react";
import { OTHER_PLATFORMS } from "@/data/price-comparison";

/* Piccolo dropdown "Altri prezzi": le piattaforme aggiuntive (TripAdvisor,
   Airbnb) non hanno ancora un prezzo verificato per questo soggiorno — lo
   dice esplicitamente, non lo nasconde e non lo inventa. Predisposto per
   accogliere prezzi reali in futuro: basta valorizzarli in
   src/data/price-comparison.ts, questo componente li mostrerebbe subito. */
export function OtherPricesDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.04em] text-cream/50 transition-colors hover:text-cream/80"
      >
        Altri prezzi
        <svg
          viewBox="0 0 24 24"
          width="11"
          height="11"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-3 space-y-2.5 rounded-[4px] border border-cream/10 bg-ink/20 px-4 py-3.5">
            {OTHER_PLATFORMS.map((p) => (
              <div key={p.name} className="flex items-start justify-between gap-4">
                <span className="text-[12px] font-semibold text-cream/70">{p.name}</span>
                <span className="max-w-[220px] text-right text-[11px] leading-[1.5] text-cream/40">{p.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
