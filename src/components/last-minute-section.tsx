"use client";

import { useCallback, useState } from "react";
import { BbitInlineWidget } from "@/components/bbit-inline-widget";
import { ExternalContentGate } from "@/components/external-content-gate";
import { BBIT_OFFERS_FAMILY_CSS } from "@/lib/bbit-widget-css";
import { bbitLastMinuteUrl, bbitOfferteUrl } from "@/lib/bbit-widget-urls";
import type { Locale } from "@/lib/i18n";

const TEXT: Record<Locale, { label: string; heading: string; body: string }> = {
  it: {
    label: "Last minute",
    heading: "Offerte last minute",
    body: "Quando si libera un posto all'ultimo momento, lo trovi qui prima che altrove.",
  },
  en: {
    label: "Last minute",
    heading: "Last-minute offers",
    body: "When a spot opens up at the last moment, you'll find it here first.",
  },
  fr: {
    label: "Dernière minute",
    heading: "Offres de dernière minute",
    body: "Quand une place se libère à la dernière minute, vous la trouvez ici en premier.",
  },
  de: {
    label: "Last Minute",
    heading: "Last-Minute-Angebote",
    body: "Wenn kurzfristig ein Platz frei wird, finden Sie ihn hier zuerst.",
  },
};

/* Testi della sezione quando, senza last minute attivi, mostra il widget
   Offerte al suo posto (solo con fallbackToOffers). Nessun dettaglio
   dell'offerta scritto qui: il contenuto è quello pubblicato da Paolo sul
   pannello bed-and-breakfast.it (oggi: -10% da 7 notti). */
const OFFERS_TEXT: Record<Locale, { label: string; heading: string; body: string }> = {
  it: {
    label: "Offerte",
    heading: "Offerte attive",
    body: "In questo momento non ci sono last minute: queste sono le offerte attive.",
  },
  en: {
    label: "Offers",
    heading: "Current offers",
    body: "There are no last-minute deals right now: these are the offers currently available.",
  },
  fr: {
    label: "Offres",
    heading: "Offres en cours",
    body: "Aucune offre de dernière minute pour le moment : voici les offres actuellement disponibles.",
  },
  de: {
    label: "Angebote",
    heading: "Aktuelle Angebote",
    body: "Derzeit gibt es keine Last-Minute-Angebote: Das sind die aktuell verfügbaren Angebote.",
  },
};

/* Sezione dedicata ai last minute — quando il widget non ha nulla da
   mostrare (bbit_avviso, "Non ci sono last minute in corso"):
   - con fallbackToOffers (home La Mora) passa al widget Offerte della
     stessa struttura, così l'offerta attiva (es. -10% da 7 notti, che sul
     pannello bed-and-breakfast.it è un'"Offerta", non un "Last minute")
     resta visibile; se è vuoto anche quello, la sezione si nasconde;
   - senza (Villa Relax, che ha già una sua sezione Offerte subito dopo) la
     sezione si nasconde direttamente.
   Diagnosi del 29/09/2026: il widget last minute risponde con bbit_avviso
   già lato server — nessun problema di tempi nel controllo qui sotto.

   Il widget si carica da solo ad ogni visita (non al click), quindi resta
   dietro al consenso "Funzionali" (ExternalContentGate): finché non è dato,
   la sezione resta visibile col placeholder al posto del widget — non può
   nascondersi da sola perché senza il contenuto reale non sappiamo se ci
   sono last minute attivi o no. */
export function LastMinuteSection({
  struttura,
  locale,
  fallbackToOffers = false,
}: {
  struttura: "lamora" | "villa";
  locale: Locale;
  fallbackToOffers?: boolean;
}) {
  const [mode, setMode] = useState<"lastminute" | "offerte" | "hidden">("lastminute");
  const text = mode === "offerte" ? OFFERS_TEXT[locale] : TEXT[locale];

  /* Un callback per widget: ogni iframe (key={mode}) tiene il proprio, e
     ciascuno agisce solo se la sezione è ancora nella sua fase — un
     ultimo "vuoto" dal widget last minute mentre si smonta non può
     nascondere le Offerte appena mostrate. */
  const handleLastMinute = useCallback(
    (body: HTMLElement) => {
      if (!body.querySelector(".bbit_avviso")) return;
      setMode((current) => (current === "lastminute" ? (fallbackToOffers ? "offerte" : "hidden") : current));
    },
    [fallbackToOffers],
  );

  const handleOffers = useCallback((body: HTMLElement) => {
    if (!body.querySelector(".bbit_avviso")) return;
    setMode((current) => (current === "offerte" ? "hidden" : current));
  }, []);

  if (mode === "hidden") return null;

  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-[680px] px-6 sm:px-10">
        <div className="rounded-[6px] border border-gold/40 bg-cream-dim px-6 py-7 sm:px-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-raspberry">{text.label}</span>
          <h2 className="mt-2 font-display text-[24px] font-normal leading-tight text-ink [text-wrap:balance]">{text.heading}</h2>
          <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">{text.body}</p>
          <div className="mt-5">
            <ExternalContentGate locale={locale} category="functional" minHeight={90}>
              <BbitInlineWidget
                key={mode}
                scriptSrc={mode === "offerte" ? bbitOfferteUrl(struttura) : bbitLastMinuteUrl(struttura)}
                css={BBIT_OFFERS_FAMILY_CSS}
                minHeight={90}
                onContent={mode === "offerte" ? handleOffers : handleLastMinute}
              />
            </ExternalContentGate>
          </div>
        </div>
      </div>
    </section>
  );
}
