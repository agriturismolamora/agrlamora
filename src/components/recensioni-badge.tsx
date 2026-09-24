"use client";

import { useEffect, useRef } from "react";
import { ExternalContentGate } from "@/components/external-content-gate";
import { CONSENT_TEXT } from "@/data/consent-text";
import { openCookiePreferences } from "@/lib/consent";
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
    // Col colore "default" il link di credito "Bed-and-breakfast.it" (e il
    // contorno di focus delle card) è #333: invisibile sul footer scuro.
    // Una custom property impostata sull'host batte la regola :host del
    // loro Shadow DOM; col colore "green" la ridefiniscono loro, già leggibile.
    if (struttura === "villa") el.style.setProperty("--rw-link", "var(--color-cream)");
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

   Collocazione: nel footer di ogni pagina (site-footer.tsx), in basso a
   destra, account La Mora ovunque e account Villa Relax sulle pagine
   Villa. Scelta consapevole del titolare (settembre 2026) che SOSTITUISCE
   la precedente richiesta "solo pagine appartamento e Villa, mai in
   homepage": ora compare anche in home. Continua a NON sostituire la
   sezione "Ospiti e riconoscimenti" (reviews-section.tsx).
   Un solo badge per pagina: lo script cerca un unico elemento
   #wdg-reviews, quindi non va rimontato anche dentro le pagine.

   Mostra i loghi Bed-and-breakfast.it/Google/TripAdvisor: deliberatamente
   NON mascherato. È un badge di fiducia multi-piattaforma — senza i loghi
   perderebbe il senso (un punteggio senza dire da dove viene).

   Si carica da solo ad ogni visita della pagina e la sua chiamata
   wdgInit() interroga api.bed-and-breakfast.it direttamente dal browser
   del visitatore (non dal nostro server, a differenza delle recensioni
   Google): resta quindi dietro al consenso "Funzionali" (ExternalContentGate),
   stesso trattamento dei widget offerte/last minute/punti di interesse.
   Senza consenso, nel footer scuro il riquadro standard del gate sarebbe
   fuori scala su ogni pagina: al suo posto un link compatto sulla stessa
   riga dell'etichetta, che apre le preferenze cookie.

   Layout orizzontale (etichetta a sinistra, badge a destra); flex-wrap
   solo come rete di sicurezza sugli schermi più stretti. Il contenuto
   interno del badge è Shadow DOM di bed-and-breakfast.it, non nostro. */
export function RecensioniBadge({ struttura, locale }: { struttura: "lamora" | "villa"; locale: Locale }) {
  const consentText = CONSENT_TEXT[locale];
  return (
    <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/50">{TEXT[locale]}</span>
      <ExternalContentGate
        locale={locale}
        category="functional"
        fallback={
          <button
            type="button"
            onClick={openCookiePreferences}
            className="text-[11px] text-cream/60 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream/85"
          >
            {consentText.externalGate.button}
          </button>
        }
      >
        <RecensioniBadgeWidget struttura={struttura} locale={locale} />
      </ExternalContentGate>
    </div>
  );
}
