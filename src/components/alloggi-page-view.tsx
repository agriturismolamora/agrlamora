import { WatermarkedImage } from "@/components/watermarked-image";
import Link from "next/link";
import { APARTMENTS } from "@/data/apartments";
import { getApartmentDetails } from "@/data/apartment-details";
import { Reveal } from "@/components/scroll-reveal";
import { ZodiacMark } from "@/components/zodiac-mark";
import { HoverFill } from "@/components/hover-fill";
import { PawIcon } from "@/components/amenity-icons";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { apartmentNodes, faqPageNode } from "@/lib/structured-data";
import { PetsSection } from "@/components/pets-section";
import { PETS_TEXT } from "@/data/pets";

const TEXT: Record<
  Locale,
  {
    label: string;
    heading: string;
    intro: string;
    /* Frase con il link alla piscina (testo prima, link, testo dopo). */
    pool: [string, string, string];
    petFriendly: string;
    upTo: string;
    guests: string;
    notSure: string;
    notSureBody: string;
  }
> = {
  it: {
    label: "I nostri appartamenti",
    heading: "Cinque appartamenti indipendenti, ognuno con la sua storia.",
    intro: "Da due a otto ospiti, tutti con cucina attrezzata e bagno privato. Due — Gemelli e Sagittario — hanno un giardino recintato tutto loro e accettano animali.",
    pool: ["Per tutti gli ospiti c'è la ","piscina dell'agriturismo",", aperta dal 1° maggio al 28 settembre."],
    petFriendly: "Pet friendly",
    upTo: "Fino a",
    guests: "ospiti",
    notSure: "Non sai quale scegliere?",
    notSureBody: "Scrivici il numero di ospiti e le date: ti diciamo subito quale appartamento fa per voi.",
  },
  en: {
    label: "Our apartments",
    heading: "Five independent apartments, each with its own story.",
    intro: "From two to eight guests, all with an equipped kitchen and private bathroom. Two — Gemelli and Sagittario — have their own fenced garden and accept pets.",
    pool: ["All guests can use the ","agriturismo's swimming pool",", open from 1 May to 28 September."],
    petFriendly: "Pet friendly",
    upTo: "Up to",
    guests: "guests",
    notSure: "Not sure which one to choose?",
    notSureBody: "Tell us the number of guests and the dates: we'll tell you right away which apartment suits you.",
  },
  fr: {
    label: "Nos appartements",
    heading: "Cinq appartements indépendants, chacun avec sa propre histoire.",
    intro: "De deux à huit personnes, tous avec cuisine équipée et salle de bain privée. Deux — Gemelli et Sagittario — ont leur propre jardin clôturé et acceptent les animaux.",
    pool: ["Tous les hôtes profitent de la ","piscine de l'agritourisme",", ouverte du 1er mai au 28 septembre."],
    petFriendly: "Animaux acceptés",
    upTo: "Jusqu'à",
    guests: "personnes",
    notSure: "Vous ne savez pas lequel choisir ?",
    notSureBody: "Indiquez-nous le nombre de personnes et les dates : nous vous dirons tout de suite quel appartement vous convient.",
  },
  de: {
    label: "Unsere Apartments",
    heading: "Fünf unabhängige Apartments, jedes mit seiner eigenen Geschichte.",
    intro: "Für zwei bis acht Gäste, alle mit ausgestatteter Küche und eigenem Bad. Zwei — Gemelli und Sagittario — haben einen eigenen eingezäunten Garten und akzeptieren Haustiere.",
    pool: ["Allen Gästen steht der ","Pool des Agriturismo"," zur Verfügung, geöffnet vom 1. Mai bis 28. September."],
    petFriendly: "Haustierfreundlich",
    upTo: "Bis zu",
    guests: "Gäste",
    notSure: "Nicht sicher, welches Sie wählen sollen?",
    notSureBody: "Teilen Sie uns die Anzahl der Gäste und die Daten mit: wir sagen Ihnen sofort, welches Apartment zu Ihnen passt.",
  },
};

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Appartamenti ad Assisi",
    description: "Cinque appartamenti indipendenti ad Assisi, da 4 a 8 posti letto, con piscina, giardino e cucina. Prenotazione diretta senza commissioni e con sconti.",
  },
  en: {
    title: "Self-catering apartments in Assisi, Umbria",
    description: "Five independent self-catering apartments in Assisi, sleeping 4 to 8, with pool, garden and full kitchen. Book direct: no commission, with exclusive discounts.",
  },
  fr: {
    title: "Location d'appartements à Assise, en Ombrie",
    description: "Cinq appartements indépendants à Assise, de 4 à 8 couchages, avec piscine, jardin et cuisine équipée. Réservation directe sans commission, avec réductions.",
  },
  de: {
    title: "Ferienwohnungen in Assisi, Umbrien",
    description: "Fünf unabhängige Ferienwohnungen in Assisi für 4 bis 8 Personen, mit Pool, Garten und eigener Küche. Direkt buchen: ohne Provision, mit Rabatten.",
  },
};

export function getAlloggiMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return pageMetadata({ locale, path: "/alloggi/", title: m.title, description: m.description });
}

export function AlloggiPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const details = getApartmentDetails(locale);

  return (
    <>
      <StructuredData locale={locale} path="/alloggi/" nodes={[...apartmentNodes(locale), faqPageNode(locale, "/alloggi/", PETS_TEXT[locale].faq)]} />
      <section className="bg-cream pb-4 pt-16 sm:pt-20">
        <div className="mx-auto max-w-[1200px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.label}</span>
            <h1 className="mx-auto mt-5 max-w-[680px] font-display text-[clamp(34px,5vw,54px)] font-normal leading-[1.1] text-ink [text-wrap:balance]">
              {text.heading}
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.75] text-ink-soft">
              {text.intro} {text.pool[0]}
              <Link href={withLocale(locale, "/piscina/")} className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry">
                {text.pool[1]}
              </Link>
              {text.pool[2]}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
          {APARTMENTS.map((apt, i) => {
            const detail = details[apt.slug];
            return (
              <Reveal key={apt.slug} delay={i * 60}>
                <Link href={withLocale(locale, apt.href)} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-ink/5">
                    <WatermarkedImage
                      src={apt.image}
                      alt={apt.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {apt.petFriendly && (
                      <span
                        role="img"
                        aria-label={text.petFriendly}
                        title={text.petFriendly}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-olive-950 shadow-[0_6px_16px_rgba(0,0,0,0.3)]"
                      >
                        <PawIcon />
                      </span>
                    )}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]"
                      style={{ background: "linear-gradient(0deg, rgba(10,10,8,.6) 0%, rgba(10,10,8,0) 100%)" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 px-4 pb-4 text-cream">
                      <ZodiacMark sign={apt.zodiac} className="h-6 w-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
                      <span className="font-display text-[24px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">{apt.name}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-[13px] leading-[1.5] text-ink-soft">{detail?.tagline}</p>
                  <p className="mt-2 text-[12px] uppercase tracking-[0.04em] text-ink-soft/70">
                    {text.upTo} {apt.maxGuests} {text.guests} · {apt.sqm} m²
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <PetsSection locale={locale} />

      <section className="bg-[#1f180e] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[480px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              {text.notSure}
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-cream/65">
              {text.notSureBody}
            </p>
            <a
              href="https://wa.me/393934363917?text=Ciao!%20Vorrei%20un%20consiglio%20su%20quale%20appartamento%20scegliere."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {t("common", "scriviciWhatsapp", locale)}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
