import { BbitInlineWidget } from "@/components/bbit-inline-widget";
import { ExternalContentGate } from "@/components/external-content-gate";
import { BBIT_OFFERS_FAMILY_CSS } from "@/lib/bbit-widget-css";
import type { Locale } from "@/lib/i18n";

/* Card di presentazione condivisa da offerte/last minute/punti di
   interesse: stessa cornice cream-dim del resto del sito, il widget vero
   e proprio vive dentro (mascherato via BBIT_OFFERS_FAMILY_CSS). Entrambi
   gli usi attuali (offerte, punti di interesse) si caricano da soli ad
   ogni visita della pagina, quindi restano dietro al consenso "Funzionali"
   (ExternalContentGate, vedi external-content-gate.tsx). */
export function BbitWidgetCard({
  label,
  heading,
  scriptSrc,
  minHeight = 90,
  locale,
}: {
  label: string;
  heading: string;
  scriptSrc: string;
  minHeight?: number;
  locale: Locale;
}) {
  return (
    <div className="rounded-[6px] border border-ink/10 bg-cream-dim px-6 py-7 sm:px-8">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">{label}</span>
      <h3 className="mt-2 font-display text-[22px] font-normal leading-tight text-ink [text-wrap:balance]">{heading}</h3>
      <div className="mt-5">
        <ExternalContentGate locale={locale} category="functional" minHeight={minHeight}>
          <BbitInlineWidget scriptSrc={scriptSrc} css={BBIT_OFFERS_FAMILY_CSS} minHeight={minHeight} />
        </ExternalContentGate>
      </div>
    </div>
  );
}
