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

/* Sotto i 1024px le tre schede (Bed-and-breakfast.it, Google, TripAdvisor)
   restano in UNA riga da scorrere col dito, come su desktop, invece di
   impilarsi (richiesta esplicita del titolare). Il widget vive in uno Shadow
   DOM aperto: creiamo noi lo shadow root prima di inizializzarlo e ci
   "adottiamo" questo foglio di stile. Il loro codice riusa lo shadow root
   esistente e lo svuota con innerHTML ad ogni aggiornamento, ma
   adoptedStyleSheets non viene toccato da innerHTML: le regole restano.
   Browser senza fogli di stile costruibili (Safari < 16.4): nessun errore,
   resta il layout originale del widget. */
const ROW_LAYOUT_CSS = `
@media (max-width: 1023.98px) {
  .rw-wrapper { max-width: none; margin: 0; padding: 5px 0; }
  .rw-chipgrid { flex-wrap: nowrap; justify-content: flex-start; margin-bottom: 10px; }
  .rw-chipgrid.rw-chipgrid-badge .rw-chip { width: 210px; flex: 0 0 auto; scroll-snap-align: start; }
  .rw-credits { text-align: left; }
  .rw-madeby { flex-direction: row; justify-content: flex-start; text-align: left; gap: .35rem; }
}`;

function adoptRowLayout(host: HTMLElement) {
  try {
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(ROW_LAYOUT_CSS);
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
  } catch {
    // Nessun supporto: il widget mantiene il suo layout (schede impilate).
  }
}

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
    adoptRowLayout(el);

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

   Da lg in su etichetta a sinistra e schede a destra; sotto, etichetta
   sopra e schede in una riga scorrevole col dito (vedi ROW_LAYOUT_CSS). Il
   contenitore scorrevole si allarga fino ai bordi dello schermo (-mx) così
   le schede scorrono da bordo a bordo; scroll-px riallinea l'aggancio
   (snap) al margine del footer invece che al bordo dello schermo. */
export function RecensioniBadge({ struttura, locale }: { struttura: "lamora" | "villa"; locale: Locale }) {
  const consentText = CONSENT_TEXT[locale];
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/45">{TEXT[locale]}</span>
      <div className="-mx-6 snap-x snap-mandatory scroll-px-6 overflow-x-auto px-6 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
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
    </div>
  );
}
