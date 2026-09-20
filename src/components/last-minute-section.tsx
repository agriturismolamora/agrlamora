"use client";

import { useCallback, useState } from "react";
import { BbitInlineWidget } from "@/components/bbit-inline-widget";
import { ExternalContentGate } from "@/components/external-content-gate";
import { BBIT_OFFERS_FAMILY_CSS } from "@/lib/bbit-widget-css";
import { bbitLastMinuteUrl } from "@/lib/bbit-widget-urls";
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

/* Sezione dedicata ai last minute — nascosta automaticamente quando il
   widget non ha nulla da mostrare (bbit_avviso, "Non ci sono last minute
   in corso"): niente sezione vuota in mezzo alla pagina, si popola da sola
   quando Paolo attiva un last minute dal pannello bed-and-breakfast.it.

   Il widget si carica da solo ad ogni visita (non al click), quindi resta
   dietro al consenso "Funzionali" (ExternalContentGate): finché non è dato,
   la sezione resta visibile col placeholder al posto del widget — non può
   nascondersi da sola perché senza il contenuto reale non sappiamo se ci
   sono last minute attivi o no. */
export function LastMinuteSection({ struttura, locale }: { struttura: "lamora" | "villa"; locale: Locale }) {
  const [hasOffers, setHasOffers] = useState(true);
  const text = TEXT[locale];

  const handleContent = useCallback((body: HTMLElement) => {
    const empty = !!body.querySelector(".bbit_avviso");
    setHasOffers(!empty);
  }, []);

  if (!hasOffers) return null;

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
                scriptSrc={bbitLastMinuteUrl(struttura)}
                css={BBIT_OFFERS_FAMILY_CSS}
                minHeight={90}
                onContent={handleContent}
              />
            </ExternalContentGate>
          </div>
        </div>
      </div>
    </section>
  );
}
