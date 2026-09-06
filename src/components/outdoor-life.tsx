import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

/* Sezione "Vivere La Mora": grande momento fotografico su piscina e spazi
   verdi. Composizione diversa da StructureHighlights (già approvata, non
   toccata): qui la foto è full-bleed in apertura, il testo arriva DOPO in
   corpo oversize — non uno split foto/testo affiancato. Foto reali, mai
   usate altrove in homepage. */
const TEXT: Record<
  Locale,
  {
    label: string;
    heading: string;
    cta: string;
    facts: { label: string; detail: string }[];
  }
> = {
  it: {
    label: "Piscina e spazi all'aperto",
    heading: "Una piscina panoramica, un prato dove i bambini corrono, sedie all'ombra per chi invece si ferma.",
    cta: "Scopri la piscina",
    facts: [
      { label: "Piscina panoramica", detail: "6×12 metri, aperta dal 1° maggio al 28 settembre, 9:00–19:00" },
      { label: "Fontana idromassaggio", detail: "azionata nelle ore più calde, per rinfrescarsi" },
      { label: "Giardino recintato", detail: "negli appartamenti Gemelli e Sagittario" },
      { label: "Parco giochi e sport", detail: "altalene, scivoli, campo da calcetto in erba naturale, ping-pong; culla (10€/soggiorno) e seggiolone su richiesta" },
    ],
  },
  en: {
    label: "Pool and outdoor spaces",
    heading: "A panoramic pool, a lawn where children can run free, shaded chairs for those who'd rather sit back.",
    cta: "Discover the pool",
    facts: [
      { label: "Panoramic pool", detail: "6×12 metres, open May 1st to September 28th, 9am–7pm" },
      { label: "Hydromassage fountain", detail: "turned on during the hottest hours, for a quick cool-down" },
      { label: "Fenced garden", detail: "in the Gemelli and Sagittario apartments" },
      { label: "Playground and sports", detail: "swings, slides, natural-grass five-a-side pitch, table tennis; cot (€10/stay) and high chair on request" },
    ],
  },
  fr: {
    label: "Piscine et espaces extérieurs",
    heading: "Une piscine panoramique, une pelouse où les enfants courent librement, des chaises à l'ombre pour ceux qui préfèrent s'installer.",
    cta: "Découvrir la piscine",
    facts: [
      { label: "Piscine panoramique", detail: "6×12 mètres, ouverte du 1er mai au 28 septembre, 9h–19h" },
      { label: "Fontaine hydromassante", detail: "activée aux heures les plus chaudes, pour se rafraîchir" },
      { label: "Jardin clôturé", detail: "dans les appartements Gemelli et Sagittario" },
      { label: "Aire de jeux et sport", detail: "balançoires, toboggans, terrain de foot à cinq en gazon naturel, ping-pong ; lit bébé (10€/séjour) et chaise haute sur demande" },
    ],
  },
  de: {
    label: "Pool und Außenbereiche",
    heading: "Ein Panorama-Pool, eine Wiese, auf der Kinder frei herumlaufen können, schattige Stühle für alle, die lieber sitzen bleiben.",
    cta: "Pool entdecken",
    facts: [
      { label: "Panorama-Pool", detail: "6×12 Meter, geöffnet vom 1. Mai bis 28. September, 9–19 Uhr" },
      { label: "Hydromassage-Brunnen", detail: "wird in den heißesten Stunden zur Abkühlung eingeschaltet" },
      { label: "Eingezäunter Garten", detail: "in den Apartments Gemelli und Sagittario" },
      { label: "Spielplatz und Sport", detail: "Schaukeln, Rutschen, Fünf-gegen-fünf-Feld aus Naturrasen, Tischtennis; Babybett (10€/Aufenthalt) und Hochstuhl auf Anfrage" },
    ],
  },
};

export function OutdoorLife({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  return (
    <section aria-labelledby="outdoor-life-heading" className="relative bg-cream">
      <div className="relative h-[62vh] min-h-[380px] w-full overflow-hidden sm:h-[72vh]">
        <Image
          src="/images/piscina/foto piscina di giorno.webp"
          alt="La piscina panoramica di Agriturismo La Mora vista di giorno"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(180deg, rgba(28,33,23,.05) 0%, rgba(28,33,23,.55) 100%)" }}
        />
        <span className="absolute bottom-6 left-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream sm:bottom-8 sm:left-10">
          {text.label}
        </span>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 py-16 text-center sm:px-10 sm:py-20">
        <Reveal>
          <h2
            id="outdoor-life-heading"
            className="font-display text-[clamp(30px,4vw,52px)] font-normal leading-[1.15] text-ink [text-wrap:balance]"
          >
            {text.heading}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mx-auto mt-12 grid max-w-[900px] grid-cols-2 gap-8 border-t border-ink/10 pt-10 text-left sm:grid-cols-4 sm:text-center">
            {text.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-display text-xl text-ink">{fact.label}</dt>
                <dd className="mt-1.5 text-[13px] text-ink-soft">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={220}>
          <Link
            href={withLocale(locale, "/piscina/")}
            className="group mt-12 inline-flex items-center gap-2.5 rounded-[3px] border border-ink/20 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors duration-200 hover:border-raspberry hover:text-raspberry"
          >
            {text.cta}
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
