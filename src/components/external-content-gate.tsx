"use client";

import { CONSENT_TEXT } from "@/data/consent-text";
import { useConsent, openCookiePreferences, type ConsentCategories } from "@/lib/consent";
import type { Locale } from "@/lib/i18n";

/* Infrastruttura pronta per il punto 8 della specifica privacy: NESSUN
   iframe/embed di terze parti (Google Maps live, video esterni, social
   embed...) è presente oggi nel sito — la mappa è un'immagine statica e i
   collegamenti a Maps/Facebook/TripAdvisor sono link in uscita, non embed
   (vedi audit in src/data/privacy-services.ts). Questo componente esiste
   per essere usato SUBITO se in futuro viene aggiunto un vero embed:

     <ExternalContentGate locale={locale} category="functional">
       <iframe src="..." />
     </ExternalContentGate>

   Finché la categoria richiesta non è stata autorizzata, il contenuto
   reale non viene mai montato nel DOM (non solo nascosto via CSS): al suo
   posto compare il placeholder col messaggio richiesto e un pulsante per
   aprire le preferenze cookie.

   Primo uso reale: i widget bed-and-breakfast.it che si caricano da soli
   ad ogni visita della pagina (offerte, last minute, punti di interesse,
   badge recensioni — vedi bbit-widget-card.tsx, last-minute-section.tsx,
   recensioni-badge.tsx), categoria "functional". Il widget camere/
   richieste resta invece "necessary" (si attiva solo al click su un
   pulsante di prenotazione/richiesta, la stessa logica di questo file). */
export function ExternalContentGate({
  locale,
  category,
  children,
  className,
  minHeight,
}: {
  locale: Locale;
  category: keyof ConsentCategories;
  children: React.ReactNode;
  className?: string;
  /** Altezza minima del placeholder, per evitare salti di layout quando il
      widget reale ha una dimensione nota (es. i widget bbit mascherati). */
  minHeight?: number;
}) {
  const consent = useConsent();
  const allowed = category === "necessary" || consent?.categories[category] === true;
  const text = CONSENT_TEXT[locale];

  if (allowed) return <>{children}</>;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 bg-cream-dim px-6 py-14 text-center ${className ?? ""}`}
      style={minHeight ? { minHeight } : undefined}
    >
      <p className="max-w-[360px] text-[13px] leading-[1.6] text-ink-soft">{text.externalGate.message}</p>
      <button
        type="button"
        onClick={openCookiePreferences}
        className="rounded-[4px] border border-ink/25 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-ink/50"
      >
        {text.externalGate.button}
      </button>
    </div>
  );
}
