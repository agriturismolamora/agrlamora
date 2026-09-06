"use client";

import { useState } from "react";
import { OTHER_PLATFORMS } from "@/data/price-comparison";
import type { Locale } from "@/lib/i18n";

const TEXT: Record<Locale, { label: string; notes: Record<string, string> }> = {
  it: { label: "Altri prezzi", notes: {} },
  en: {
    label: "Other prices",
    notes: {
      "Prezzo da verificare — la prenotazione passa comunque da una delle OTA collegate.": "Price to be verified — booking still goes through one of the linked OTAs.",
      "Non verificabile per queste date: il link disponibile è una pagina di gestione riservata all'host, non un annuncio pubblico.": "Not verifiable for these dates: the available link is a host-only management page, not a public listing.",
    },
  },
  fr: {
    label: "Autres prix",
    notes: {
      "Prezzo da verificare — la prenotazione passa comunque da una delle OTA collegate.": "Prix à vérifier — la réservation passe tout de même par l'une des OTA associées.",
      "Non verificabile per queste date: il link disponibile è una pagina di gestione riservata all'host, non un annuncio pubblico.": "Non vérifiable pour ces dates : le lien disponible est une page de gestion réservée à l'hôte, pas une annonce publique.",
    },
  },
  de: {
    label: "Weitere Preise",
    notes: {
      "Prezzo da verificare — la prenotazione passa comunque da una delle OTA collegate.": "Preis noch zu prüfen — die Buchung erfolgt trotzdem über eine der verknüpften OTAs.",
      "Non verificabile per queste date: il link disponibile è una pagina di gestione riservata all'host, non un annuncio pubblico.": "Für diese Daten nicht überprüfbar: der verfügbare Link ist eine Verwaltungsseite nur für den Gastgeber, kein öffentliches Inserat.",
    },
  },
};

/* Piccolo dropdown "Altri prezzi": le piattaforme aggiuntive (TripAdvisor,
   Airbnb) non hanno ancora un prezzo verificato per questo soggiorno — lo
   dice esplicitamente, non lo nasconde e non lo inventa. Predisposto per
   accogliere prezzi reali in futuro: basta valorizzarli in
   src/data/price-comparison.ts, questo componente li mostrerebbe subito. */
export function OtherPricesDropdown({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const text = TEXT[locale];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.04em] text-ink-soft transition-colors hover:text-ink"
      >
        {text.label}
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
          <div className="mt-3 space-y-2.5 rounded-[4px] border border-ink/10 bg-cream-dim px-4 py-3.5">
            {OTHER_PLATFORMS.map((p) => (
              <div key={p.name} className="flex items-start justify-between gap-4">
                <span className="text-[12px] font-semibold text-ink">{p.name}</span>
                <span className="max-w-[220px] text-right text-[11px] leading-[1.5] text-ink-soft">{text.notes[p.note] ?? p.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
