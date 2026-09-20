import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { HydromassageVideo } from "@/components/hydromassage-video";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Piscina Panoramica",
    description: "Piscina panoramica 6×12 metri di Agriturismo La Mora ad Assisi, aperta dal 1° maggio al 28 settembre, orario 09:00–19:00, con area giochi e campo da calcetto in erba naturale.",
  },
  en: {
    title: "Panoramic Pool",
    description: "6×12 metre panoramic pool at Agriturismo La Mora in Assisi, open from May 1st to September 28th, 9am–7pm, with a play area and natural-grass five-a-side pitch.",
  },
  fr: {
    title: "Piscine Panoramique",
    description: "Piscine panoramique de 6×12 mètres à Agriturismo La Mora, Assise, ouverte du 1er mai au 28 septembre, de 9h à 19h, avec aire de jeux et terrain de foot à cinq en gazon naturel.",
  },
  de: {
    title: "Panorama-Pool",
    description: "6×12 Meter großer Panorama-Pool bei Agriturismo La Mora in Assisi, geöffnet vom 1. Mai bis 28. September, 9–19 Uhr, mit Spielbereich und Fünf-gegen-fünf-Feld aus Naturrasen.",
  },
};

export function getPiscinaMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/piscina/") } };
}

const TEXT: Record<
  Locale,
  {
    label: string;
    heading: string;
    intro: string;
    attivitaLink: string;
    facts: { label: string; value: string }[];
    fontanaLabel: string;
    fontanaHeading: string;
    fontanaBody: string;
    relaxLabel: string;
    relaxHeading: string;
    relaxBody1: string;
    relaxBody2: string;
    quote: string;
    quoteAttribution: string;
    closingHeading: string;
    closingCta: string;
  }
> = {
  it: {
    label: "Piscina",
    heading: "Una piscina panoramica sulla campagna umbra.",
    intro: "6×12 metri, aperta dal 1° maggio al 28 settembre dalle 9:00 alle 19:00: la piscina è il centro delle giornate a La Mora, circondata da sedie all'ombra per chi preferisce guardare invece di nuotare. Accanto, un'area giochi per i più piccoli e un campo da calcetto in erba naturale — trovi tutte le altre attività della struttura nella pagina",
    attivitaLink: "Attività",
    facts: [
      { label: "Dimensioni", value: "6 × 12 metri" },
      { label: "Apertura", value: "1 maggio – 28 settembre" },
      { label: "Orario", value: "09:00 – 19:00" },
      { label: "Accesso", value: "Riservato agli ospiti" },
    ],
    fontanaLabel: "Fontana idromassaggio",
    fontanaHeading: "Un getto d'acqua per rinfrescarsi, nelle ore più calde.",
    fontanaBody: "Oltre alla vasca, la piscina ha una fontana idromassaggio che viene azionata nelle ore più calde della giornata: un modo in più per rinfrescarsi, apprezzato soprattutto da chi si ferma in acqua nel primo pomeriggio.",
    relaxLabel: "Relax",
    relaxHeading: "Non solo per nuotare.",
    relaxBody1: "Le sedie all'ombra intorno alla vasca sono pensate per chi si ferma a leggere mentre i bambini giocano in acqua, o per un caffè lento guardando la campagna. La piscina è visibile da gran parte del giardino: anche chi non nuota resta comunque dentro l'atmosfera.",
    relaxBody2: "È a pochi passi dagli appartamenti — si scende in costume, non serve organizzare nulla. Il momento ideale è dopo una giornata ad Assisi: si torna, ci si cambia, e si rilassa in acqua invece di restare seduti in macchina o in hotel.",
    quote: "Emplacement calme, piscine très bien entretenue.",
    quoteAttribution: "Ludivine, Francia — Google",
    closingHeading: "Ti aspettiamo in piscina.",
    closingCta: "Scopri gli appartamenti",
  },
  en: {
    label: "Pool",
    heading: "A panoramic pool over the Umbrian countryside.",
    intro: "6×12 metres, open from May 1st to September 28th, 9am to 7pm: the pool is the centre of daily life at La Mora, surrounded by shaded chairs for those who'd rather watch than swim. Alongside, a play area for younger guests and a natural-grass five-a-side pitch — you'll find all the property's other activities on the",
    attivitaLink: "Activities",
    facts: [
      { label: "Size", value: "6 × 12 metres" },
      { label: "Open", value: "May 1st – September 28th" },
      { label: "Hours", value: "09:00 – 19:00" },
      { label: "Access", value: "Guests only" },
    ],
    fontanaLabel: "Hydromassage fountain",
    fontanaHeading: "A jet of water to cool off, during the hottest hours.",
    fontanaBody: "Besides the pool itself, there's a hydromassage fountain that's turned on during the hottest hours of the day: an extra way to cool down, especially appreciated by those who stay in the water in the early afternoon.",
    relaxLabel: "Relax",
    relaxHeading: "Not just for swimming.",
    relaxBody1: "The shaded chairs around the pool are made for those who stop to read while children play in the water, or for a slow coffee looking out over the countryside. The pool is visible from much of the garden: even non-swimmers stay within the atmosphere.",
    relaxBody2: "It's a few steps from the apartments — you head down in your swimsuit, no need to organise anything. The ideal moment is after a day in Assisi: you come back, change, and relax in the water instead of staying seated in the car or at a hotel.",
    quote: "Emplacement calme, piscine très bien entretenue.",
    quoteAttribution: "Ludivine, France — Google",
    closingHeading: "We'll see you at the pool.",
    closingCta: "Discover the apartments",
  },
  fr: {
    label: "Piscine",
    heading: "Une piscine panoramique sur la campagne ombrienne.",
    intro: "6×12 mètres, ouverte du 1er mai au 28 septembre de 9h à 19h : la piscine est le centre des journées à La Mora, entourée de chaises à l'ombre pour ceux qui préfèrent regarder plutôt que nager. À côté, une aire de jeux pour les plus petits et un terrain de foot à cinq en gazon naturel — retrouvez toutes les autres activités de la structure sur la page",
    attivitaLink: "Activités",
    facts: [
      { label: "Dimensions", value: "6 × 12 mètres" },
      { label: "Ouverture", value: "1er mai – 28 septembre" },
      { label: "Horaires", value: "09h00 – 19h00" },
      { label: "Accès", value: "Réservé aux hôtes" },
    ],
    fontanaLabel: "Fontaine hydromassante",
    fontanaHeading: "Un jet d'eau pour se rafraîchir, aux heures les plus chaudes.",
    fontanaBody: "En plus du bassin, la piscine dispose d'une fontaine hydromassante activée aux heures les plus chaudes de la journée : une façon supplémentaire de se rafraîchir, particulièrement appréciée par ceux qui restent dans l'eau en début d'après-midi.",
    relaxLabel: "Détente",
    relaxHeading: "Pas seulement pour nager.",
    relaxBody1: "Les chaises à l'ombre autour du bassin sont pensées pour ceux qui s'arrêtent pour lire pendant que les enfants jouent dans l'eau, ou pour un café tranquille en regardant la campagne. La piscine est visible depuis une grande partie du jardin : même sans nager, on reste dans l'ambiance.",
    relaxBody2: "Elle est à quelques pas des appartements — on y descend en maillot, sans rien organiser. Le moment idéal est après une journée à Assise : on rentre, on se change, et on se détend dans l'eau plutôt que de rester assis en voiture ou à l'hôtel.",
    quote: "Emplacement calme, piscine très bien entretenue.",
    quoteAttribution: "Ludivine, France — Google",
    closingHeading: "On vous attend à la piscine.",
    closingCta: "Découvrir les appartements",
  },
  de: {
    label: "Pool",
    heading: "Ein Panorama-Pool über der umbrischen Landschaft.",
    intro: "6×12 Meter, geöffnet vom 1. Mai bis 28. September, 9 bis 19 Uhr: der Pool ist der Mittelpunkt der Tage bei La Mora, umgeben von schattigen Stühlen für alle, die lieber zusehen als schwimmen. Daneben ein Spielbereich für die Kleinen und ein Fünf-gegen-fünf-Feld aus Naturrasen — alle weiteren Aktivitäten der Unterkunft finden Sie auf der Seite",
    attivitaLink: "Aktivitäten",
    facts: [
      { label: "Größe", value: "6 × 12 Meter" },
      { label: "Geöffnet", value: "1. Mai – 28. September" },
      { label: "Öffnungszeiten", value: "09:00 – 19:00" },
      { label: "Zugang", value: "Nur für Gäste" },
    ],
    fontanaLabel: "Hydromassage-Brunnen",
    fontanaHeading: "Ein Wasserstrahl zur Abkühlung, in den heißesten Stunden.",
    fontanaBody: "Neben dem Becken gibt es einen Hydromassage-Brunnen, der in den heißesten Stunden des Tages eingeschaltet wird: eine zusätzliche Möglichkeit zur Abkühlung, besonders geschätzt von allen, die am frühen Nachmittag im Wasser bleiben.",
    relaxLabel: "Entspannung",
    relaxHeading: "Nicht nur zum Schwimmen.",
    relaxBody1: "Die schattigen Stühle rund um das Becken sind für alle gedacht, die lesen möchten, während die Kinder im Wasser spielen, oder für einen gemütlichen Kaffee mit Blick auf die Landschaft. Der Pool ist von einem Großteil des Gartens aus sichtbar: auch wer nicht schwimmt, bleibt Teil der Atmosphäre.",
    relaxBody2: "Er liegt nur wenige Schritte von den Apartments entfernt — man geht im Badeanzug hinunter, ohne etwas organisieren zu müssen. Der ideale Moment ist nach einem Tag in Assisi: man kommt zurück, zieht sich um und entspannt im Wasser, statt im Auto oder im Hotel sitzen zu bleiben.",
    quote: "Emplacement calme, piscine très bien entretenue.",
    quoteAttribution: "Ludivine, Frankreich — Google",
    closingHeading: "Wir erwarten Sie am Pool.",
    closingCta: "Apartments entdecken",
  },
};

export function PiscinaPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  return (
    <>
      <section className="relative flex h-[68vh] min-h-[480px] items-end overflow-hidden">
        <Image
          src="/images/piscina/piscina agriturismo la mora di notte.jpeg"
          alt="Piscina panoramica di Agriturismo La Mora"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.75) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-14 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">{text.label}</span>
          <h1 className="mt-4 font-display text-[clamp(34px,5.5vw,58px)] font-normal leading-[1.1] text-cream [text-wrap:balance]">
            {text.heading}
          </h1>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[720px] px-6 sm:px-10">
          <Reveal>
            <p className="text-[15px] leading-[1.85] text-ink-soft">
              {text.intro}{" "}
              <Link href={withLocale(locale, "/agriturismo-famiglie-ad-assisi-e-dintorni/")} className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry">
                {text.attivitaLink}
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={80}>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-4">
              {text.facts.map((f) => (
                <div key={f.label} className="text-center sm:text-left">
                  <dt className="text-[11px] uppercase tracking-[0.08em] text-ink-soft">{f.label}</dt>
                  <dd className="mt-1 font-display text-[20px] text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-3 px-6 sm:grid-cols-3 sm:px-10">
          <Reveal className="sm:col-span-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px]">
              <Image
                src="/images/piscina/foto piscina di giorno.webp"
                alt="Piscina di Agriturismo La Mora durante il giorno"
                fill
                sizes="(max-width: 640px) 100vw, 700px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] sm:aspect-auto sm:h-full">
              <Image
                src="/images/piscina/piscina agriturismo la mora lato.jpeg"
                alt="Vista laterale della piscina"
                fill
                sizes="(max-width: 640px) 100vw, 330px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 px-6 sm:grid-cols-2 sm:px-10 sm:gap-16">
          <Reveal className="mx-auto w-full max-w-[320px] sm:max-w-none">
            <HydromassageVideo />
          </Reveal>
          <Reveal delay={80}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">{text.fontanaLabel}</span>
            <h2 className="mt-3 font-display text-[26px] font-normal leading-[1.2] text-ink">
              {text.fontanaHeading}
            </h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-ink-soft">
              {text.fontanaBody}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 px-6 sm:grid-cols-2 sm:px-10 sm:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
              <Image
                src="/images/piscina/esterno parco agriturismo con casetta.webp"
                alt="Area relax accanto alla piscina di Agriturismo La Mora"
                fill
                sizes="(max-width: 640px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">{text.relaxLabel}</span>
            <h2 className="mt-3 font-display text-[26px] font-normal leading-[1.2] text-ink">
              {text.relaxHeading}
            </h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-ink-soft">
              {text.relaxBody1}
            </p>
            <p className="mt-4 text-[14px] leading-[1.75] text-ink-soft">
              {text.relaxBody2}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-display text-[22px] font-normal italic leading-[1.5] text-ink [text-wrap:balance]">
              &ldquo;{text.quote}&rdquo;
            </p>
            <span className="mt-3 block text-[11px] uppercase tracking-[0.1em] text-ink-soft">{text.quoteAttribution}</span>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#1f180e] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[480px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              {text.closingHeading}
            </h2>
            <Link
              href={withLocale(locale, "/alloggi/")}
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.closingCta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
