import { BbitWidgetCard } from "@/components/bbit-widget-card";
import { bbitProssimitaUrl } from "@/lib/bbit-widget-urls";
import type { Locale } from "@/lib/i18n";

const TEXT: Record<Locale, { label: string; heading: string }> = {
  it: { label: "Nei dintorni", heading: "Punti di interesse vicini" },
  en: { label: "Nearby", heading: "Points of interest close by" },
  fr: { label: "Aux alentours", heading: "Points d'intérêt à proximité" },
  de: { label: "In der Nähe", heading: "Sehenswürdigkeiten in der Nähe" },
};

export function PuntiInteresseSection({ struttura, locale }: { struttura: "lamora" | "villa"; locale: Locale }) {
  const text = TEXT[locale];
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-[680px] px-6 sm:px-10">
        <BbitWidgetCard label={text.label} heading={text.heading} scriptSrc={bbitProssimitaUrl(struttura)} minHeight={200} locale={locale} />
      </div>
    </section>
  );
}
