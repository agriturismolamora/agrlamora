import { Reveal } from "@/components/scroll-reveal";
import { MapsButton } from "@/components/maps-button";
import { PLACES, formatKm } from "@/data/places";
import type { Locale } from "@/lib/i18n";

const TEXT: Record<Locale, { label: string; heading: string; note: string; byCar: string }> = {
  it: {
    label: "Distanze reali",
    heading: "Assisi, Perugia, Spello: le distanze vere, in auto.",
    note: "Percorsi in auto da Via Fonte Citerna 7, calcolati con Google Maps a settembre 2026. I tempi sono indicativi e variano con il traffico.",
    byCar: "in auto",
  },
  en: {
    label: "Real distances",
    heading: "Assisi, Perugia, Spello: the real distances by car.",
    note: "Driving routes from Via Fonte Citerna 7, calculated with Google Maps in September 2026. Times are indicative and vary with traffic.",
    byCar: "by car",
  },
  fr: {
    label: "Distances réelles",
    heading: "Assise, Pérouse, Spello : les vraies distances en voiture.",
    note: "Itinéraires en voiture depuis Via Fonte Citerna 7, calculés avec Google Maps en septembre 2026. Les temps sont indicatifs et varient selon la circulation.",
    byCar: "en voiture",
  },
  de: {
    label: "Echte Entfernungen",
    heading: "Assisi, Perugia, Spello: die echten Entfernungen mit dem Auto.",
    note: "Autorouten ab Via Fonte Citerna 7, berechnet mit Google Maps im September 2026. Die Zeiten sind Richtwerte und hängen vom Verkehr ab.",
    byCar: "mit dem Auto",
  },
};

/* Distanze reali in home: una riga per luogo con km/minuti in auto da
   Google Maps (valori e metodo in data/places.ts) e pulsante Maps con
   l'URL esatto del titolare. Componente nuovo e autonomo — NON il vecchio
   PuntiInteresseSection (widget bed-and-breakfast.it rimosso in passato).
   Righe testuali, non card fotografiche: frasi factual estraibili anche
   dai motori AI (nome luogo + km + minuti nella stessa riga). */
export function DistancesSection({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  return (
    <section id="section-distanze" aria-labelledby="distances-heading" className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <Reveal className="max-w-[640px]">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.label}</span>
          <h2
            id="distances-heading"
            className="mt-4 font-display text-[clamp(28px,3.2vw,42px)] font-normal leading-[1.15] text-ink [text-wrap:balance]"
          >
            {text.heading}
          </h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 border-t border-ink/10 md:grid-cols-2 md:gap-x-12">
          {PLACES.map((place, i) => (
            <li key={place.key} className="border-b border-ink/10">
              <Reveal delay={(i % 2) * 60} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-5">
                <div className="min-w-0">
                  <p className="font-display text-[20px] leading-tight text-ink">{place.name[locale]}</p>
                  <p className="mt-1 text-[13px] tabular-nums text-ink-soft">
                    <strong className="font-semibold text-ink">{formatKm(place, locale)} km</strong>
                    {" · "}
                    {place.minutes} min {text.byCar}
                  </p>
                </div>
                <MapsButton place={place} locale={locale} />
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-[640px] text-[12px] leading-[1.6] text-ink-soft/80">{text.note}</p>
      </div>
    </section>
  );
}
