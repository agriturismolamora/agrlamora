import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

/* Villa Relax aveva una pagina completa e una voce di menu propria, ma
   nessun richiamo in homepage: chi non nota il menu non scopre mai
   l'offerta. Sezione compatta, un solo blocco, che porta in evidenza il
   concetto di "locazione esclusiva" richiesto dal titolare (badge +
   copy), senza appesantire il resto della homepage. */
const TEXT: Record<Locale, { label: string; badge: string; heading: string; body: string; cta: string }> = {
  it: {
    label: "Un'altra possibilità",
    badge: "Locazione esclusiva",
    heading: "Villa Relax: tutta la proprietà, solo per il vostro gruppo.",
    body: "Non uno degli appartamenti, ma una villa indipendente con piscina e giardino privati, fino a 16 ospiti su 6 camere da letto — in locazione esclusiva, senza condividere gli spazi con altri ospiti.",
    cta: "Scopri Villa Relax",
  },
  en: {
    label: "Another option",
    badge: "Exclusive rental",
    heading: "Villa Relax: the whole property, just for your group.",
    body: "Not one of the apartments, but an independent villa with private pool and garden, up to 16 guests across 6 bedrooms — an exclusive rental, with no other guests sharing the space.",
    cta: "Discover Villa Relax",
  },
  fr: {
    label: "Une autre possibilité",
    badge: "Location exclusive",
    heading: "Villa Relax : toute la propriété, rien que pour votre groupe.",
    body: "Pas l'un des appartements, mais une villa indépendante avec piscine et jardin privés, jusqu'à 16 personnes sur 6 chambres — en location exclusive, sans partager les espaces avec d'autres hôtes.",
    cta: "Découvrir Villa Relax",
  },
  de: {
    label: "Eine weitere Möglichkeit",
    badge: "Exklusive Vermietung",
    heading: "Villa Relax: die ganze Immobilie, nur für Ihre Gruppe.",
    body: "Kein Apartment, sondern eine unabhängige Villa mit privatem Pool und Garten, bis zu 16 Gästen auf 6 Schlafzimmer — exklusiv vermietet, ohne die Räume mit anderen Gästen zu teilen.",
    cta: "Villa Relax entdecken",
  },
};

export function VillaTeaser({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  return (
    <section aria-labelledby="villa-teaser-heading" className="bg-cream-dim py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-10 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11]">
          <Image
            src="/images/villa/vista esterno della villa.webp"
            alt="Villa Relax, villa indipendente con piscina privata vicino ad Assisi"
            fill
            sizes="(max-width: 640px) 100vw, 540px"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={100}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.label}</span>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#1f180e]">
            {text.badge}
          </span>
          <h2
            id="villa-teaser-heading"
            className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]"
          >
            {text.heading}
          </h2>
          <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">{text.body}</p>
          <Link
            href={withLocale(locale, "/villa-relax-assisi/")}
            className="group mt-8 inline-flex items-center gap-2.5 rounded-[3px] bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors duration-200 hover:bg-[#8a3844]"
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
