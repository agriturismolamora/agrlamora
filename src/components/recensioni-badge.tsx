"use client";

import { useEffect, useRef } from "react";
import { ExternalContentGate } from "@/components/external-content-gate";
import { bbitRecensioniBadgeId } from "@/lib/bbit-widget-urls";
import type { Locale } from "@/lib/i18n";

const REVIEWS_SCRIPT_SRC = "https://d117yjdt0789wg.cloudfront.net/CDN-widget/grunt/wdg-reviews.min.js";

declare global {
  interface Window {
    WdgReviews?: { wdgInit: () => void };
  }
}

const TEXT: Record<Locale, string> = {
  it: "Recensioni verificate",
  en: "Verified reviews",
  fr: "Avis vérifiés",
  de: "Verifizierte Bewertungen",
};

function RecensioniBadgeWidget({ struttura, locale }: { struttura: "lamora" | "villa"; locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    const el = document.createElement("div");
    el.id = "wdg-reviews";
    el.dataset.id = bbitRecensioniBadgeId(struttura);
    el.dataset.lang = locale;
    el.dataset.layout = "badge";
    el.dataset.color = struttura === "villa" ? "default" : "green";
    container.appendChild(el);

    // Il bundle si auto-inizializza solo su window "DOMContentLoaded" —
    // evento che, verificato direttamente, è già passato nel momento in cui
    // uno script viene inserito da un useEffect React (vale sia per una
    // navigazione client-side sia per un primo caricamento pieno, dato che
    // l'hydration React parte sempre dopo DOMContentLoaded): l'auto-init
    // del bundle quindi non scatta mai da solo, va richiamato a mano
    // tramite window.WdgReviews.wdgInit() (legge di nuovo il div
    // #wdg-reviews e il suo dataset ad ogni chiamata, quindi è sicuro
    // richiamarlo più volte, anche quando lo script è già presente da una
    // pagina precedente).
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${REVIEWS_SCRIPT_SRC}"]`);
    if (window.WdgReviews) {
      window.WdgReviews.wdgInit();
    } else if (existingScript) {
      existingScript.addEventListener("load", () => window.WdgReviews?.wdgInit());
    } else {
      const script = document.createElement("script");
      script.src = REVIEWS_SCRIPT_SRC;
      script.addEventListener("load", () => window.WdgReviews?.wdgInit());
      document.body.appendChild(script);
    }
  }, [struttura, locale]);

  return <div ref={containerRef} />;
}

/* Badge recensioni (Bed-and-breakfast.it / Google / TripAdvisor): a
   differenza degli altri widget bed-and-breakfast.it, questo è un
   componente moderno (Shadow DOM, non document.write) — verificato
   caricandolo davvero: usa le API standard del browser, non ha la
   fragilità "silenziosamente ignorato se montato dopo il caricamento
   della pagina" degli script legacy, quindi può stare direttamente nella
   pagina senza il wrapper iframe di BbitInlineWidget.

   Richiesta esplicita del titolare: NON sostituisce l'attuale sezione
   "Ospiti e riconoscimenti" (reviews-section.tsx) — va solo in fondo alle
   pagine appartamento e sulla pagina Villa Relax, mai in homepage.

   Mostra i loghi Bed-and-breakfast.it/Google/TripAdvisor: deliberatamente
   NON mascherato. È un badge di fiducia multi-piattaforma — senza i loghi
   perderebbe il senso (un punteggio senza dire da dove viene).

   Si carica da solo ad ogni visita della pagina e la sua chiamata
   wdgInit() interroga api.bed-and-breakfast.it direttamente dal browser
   del visitatore (non dal nostro server, a differenza delle recensioni
   Google): resta quindi dietro al consenso "Funzionali" (ExternalContentGate),
   stesso trattamento dei widget offerte/last minute/punti di interesse. */
export function RecensioniBadge({ struttura, locale }: { struttura: "lamora" | "villa"; locale: Locale }) {
  return (
    <div className="mx-auto max-w-[420px] text-center">
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">{TEXT[locale]}</span>
      <div className="mt-3">
        <ExternalContentGate locale={locale} category="functional" minHeight={70}>
          <RecensioniBadgeWidget struttura={struttura} locale={locale} />
        </ExternalContentGate>
      </div>
    </div>
  );
}
