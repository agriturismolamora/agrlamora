import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { LocationMap } from "@/components/location-map";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Cofanetti Regalo",
    description: "Regala un soggiorno ad Agriturismo La Mora, ad Assisi: quattro cofanetti reali con notti, colazioni e servizi già inclusi, da 139,90€.",
  },
  en: {
    title: "Gift Boxes",
    description: "Give the gift of a stay at Agriturismo La Mora, in Assisi: four real gift boxes with nights, breakfast and services already included, from €139.90.",
  },
  fr: {
    title: "Coffrets Cadeaux",
    description: "Offrez un séjour à Agriturismo La Mora, à Assise : quatre coffrets réels avec nuits, petits-déjeuners et services déjà inclus, à partir de 139,90€.",
  },
  de: {
    title: "Geschenkboxen",
    description: "Verschenken Sie einen Aufenthalt bei Agriturismo La Mora in Assisi: vier echte Geschenkboxen mit Nächten, Frühstück und Leistungen bereits inbegriffen, ab 139,90€.",
  },
};

export function getCofanettiMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/offerte/cofanetti-regalo/") } };
}

type Box = { slug: string; title: string; people: number; priceEur: string; included: string; img: string; alt: string };

const BOXES: Record<Locale, Box[]> = {
  it: [
    { slug: "due-notti-in-fuga", title: "Due notti in fuga", people: 2, priceEur: "139,90€", included: "2 notti in Bilocale + 2 colazioni all'italiana", img: "/images/Nuova cartella/Due notti in Fuga per 2 persone/Due notti in Fuga per 2 persone.jpg", alt: "Cofanetto regalo Due notti in fuga — Agriturismo La Mora" },
    { slug: "due-notti-romantiche", title: "Due notti romantiche", people: 2, priceEur: "159,90€", included: "2 notti in Bilocale + 2 colazioni + drink di benvenuto", img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg", alt: "Cofanetto regalo Due notti romantiche — Agriturismo La Mora" },
    { slug: "4-giorni-fuori-dal-mondo", title: "4 giorni fuori dal mondo", people: 2, priceEur: "189,90€", included: "3 notti in Bilocale + 3 colazioni all'italiana", img: "/images/Nuova cartella/4 giorni fuori dal mondo/4 giorni fuori dal mondo coppia che fa colazione.jpg", alt: "Cofanetto regalo 4 giorni fuori dal mondo — Agriturismo La Mora" },
    { slug: "tre-giorni-in-famiglia", title: "Tre giorni in famiglia", people: 4, priceEur: "189,90€", included: "2 notti in Bilocale + 2 colazioni all'italiana", img: "/images/Nuova cartella/Tre giorni in famiglia/tre giorni in famiglia agriturismo la mora.jpg", alt: "Cofanetto regalo Tre giorni in famiglia — Agriturismo La Mora" },
  ],
  en: [
    { slug: "due-notti-in-fuga", title: "Two nights away", people: 2, priceEur: "€139.90", included: "2 nights in a 2-room apartment + 2 Italian breakfasts", img: "/images/Nuova cartella/Due notti in Fuga per 2 persone/Due notti in Fuga per 2 persone.jpg", alt: "Gift box Two nights away — Agriturismo La Mora" },
    { slug: "due-notti-romantiche", title: "Two romantic nights", people: 2, priceEur: "€159.90", included: "2 nights in a 2-room apartment + 2 breakfasts + welcome drink", img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg", alt: "Gift box Two romantic nights — Agriturismo La Mora" },
    { slug: "4-giorni-fuori-dal-mondo", title: "4 days off the grid", people: 2, priceEur: "€189.90", included: "3 nights in a 2-room apartment + 3 Italian breakfasts", img: "/images/Nuova cartella/4 giorni fuori dal mondo/4 giorni fuori dal mondo coppia che fa colazione.jpg", alt: "Gift box 4 days off the grid — Agriturismo La Mora" },
    { slug: "tre-giorni-in-famiglia", title: "Three days as a family", people: 4, priceEur: "€189.90", included: "2 nights in a 2-room apartment + 2 Italian breakfasts", img: "/images/Nuova cartella/Tre giorni in famiglia/tre giorni in famiglia agriturismo la mora.jpg", alt: "Gift box Three days as a family — Agriturismo La Mora" },
  ],
  fr: [
    { slug: "due-notti-in-fuga", title: "Deux nuits en escapade", people: 2, priceEur: "139,90€", included: "2 nuits en appartement 2 pièces + 2 petits-déjeuners à l'italienne", img: "/images/Nuova cartella/Due notti in Fuga per 2 persone/Due notti in Fuga per 2 persone.jpg", alt: "Coffret cadeau Deux nuits en escapade — Agriturismo La Mora" },
    { slug: "due-notti-romantiche", title: "Deux nuits romantiques", people: 2, priceEur: "159,90€", included: "2 nuits en appartement 2 pièces + 2 petits-déjeuners + boisson de bienvenue", img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg", alt: "Coffret cadeau Deux nuits romantiques — Agriturismo La Mora" },
    { slug: "4-giorni-fuori-dal-mondo", title: "4 jours hors du monde", people: 2, priceEur: "189,90€", included: "3 nuits en appartement 2 pièces + 3 petits-déjeuners à l'italienne", img: "/images/Nuova cartella/4 giorni fuori dal mondo/4 giorni fuori dal mondo coppia che fa colazione.jpg", alt: "Coffret cadeau 4 jours hors du monde — Agriturismo La Mora" },
    { slug: "tre-giorni-in-famiglia", title: "Trois jours en famille", people: 4, priceEur: "189,90€", included: "2 nuits en appartement 2 pièces + 2 petits-déjeuners à l'italienne", img: "/images/Nuova cartella/Tre giorni in famiglia/tre giorni in famiglia agriturismo la mora.jpg", alt: "Coffret cadeau Trois jours en famille — Agriturismo La Mora" },
  ],
  de: [
    { slug: "due-notti-in-fuga", title: "Zwei Nächte Auszeit", people: 2, priceEur: "139,90€", included: "2 Nächte im Zwei-Zimmer-Apartment + 2 italienische Frühstücke", img: "/images/Nuova cartella/Due notti in Fuga per 2 persone/Due notti in Fuga per 2 persone.jpg", alt: "Geschenkbox Zwei Nächte Auszeit — Agriturismo La Mora" },
    { slug: "due-notti-romantiche", title: "Zwei romantische Nächte", people: 2, priceEur: "159,90€", included: "2 Nächte im Zwei-Zimmer-Apartment + 2 Frühstücke + Willkommensdrink", img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg", alt: "Geschenkbox Zwei romantische Nächte — Agriturismo La Mora" },
    { slug: "4-giorni-fuori-dal-mondo", title: "4 Tage fernab vom Alltag", people: 2, priceEur: "189,90€", included: "3 Nächte im Zwei-Zimmer-Apartment + 3 italienische Frühstücke", img: "/images/Nuova cartella/4 giorni fuori dal mondo/4 giorni fuori dal mondo coppia che fa colazione.jpg", alt: "Geschenkbox 4 Tage fernab vom Alltag — Agriturismo La Mora" },
    { slug: "tre-giorni-in-famiglia", title: "Drei Tage als Familie", people: 4, priceEur: "189,90€", included: "2 Nächte im Zwei-Zimmer-Apartment + 2 italienische Frühstücke", img: "/images/Nuova cartella/Tre giorni in famiglia/tre giorni in famiglia agriturismo la mora.jpg", alt: "Geschenkbox Drei Tage als Familie — Agriturismo La Mora" },
  ],
};

const TEXT: Record<
  Locale,
  {
    heroLabel: string;
    heroTitle: string;
    introBody: string;
    introNote: string;
    badge: string;
    perPersone: (n: number) => string;
    extraNote: string;
    richiedi: string;
    waMsg: (title: string) => string;
    diversoHeading: string;
    diversoBody: string;
    diversoCta: string;
    diversoWaMsg: string;
    microItems: { title: string; text: string }[];
    microCta: string;
  }
> = {
  it: {
    heroLabel: "Regala La Mora · Assisi",
    heroTitle: "Un cofanetto, un soggiorno vero.",
    introBody: "Quattro cofanetti pensati per occasioni diverse: notti, colazioni e piccoli extra già inclusi, così chi riceve il regalo deve solo scegliere le date.",
    introNote: "“Bilocale” indica una tipologia di appartamento, non una delle cinque unità nominate: l'assegnazione avviene su una di quelle disponibili per le date scelte.",
    badge: "Cofanetto regalo",
    perPersone: (n) => `Per ${n} persone`,
    extraNote: "Extra da pagare a parte: pulizia finale 25€, tassa di soggiorno 3€/persona/giorno.",
    richiedi: "Richiedi informazioni",
    waMsg: (title) => `Ciao! Vorrei informazioni sul cofanetto "${title}".`,
    diversoHeading: "Cerchi qualcosa di diverso?",
    diversoBody: "Raccontaci per chi è il regalo e cosa vorresti includere: verifichiamo insieme disponibilità e la soluzione più adatta.",
    diversoCta: "Chiedi informazioni",
    diversoWaMsg: "Ciao! Vorrei un consiglio su quale cofanetto regalo scegliere.",
    microItems: [
      { title: "Contatto diretto", text: "Scrivi a chi gestisce La Mora ogni giorno, non a un call center." },
      { title: "Cofanetti reali", text: "Notti, colazioni e servizi già definiti — nessuna condizione nascosta." },
      { title: "Nessun intermediario", text: "Prenoti e regali senza passare da terzi." },
    ],
    microCta: "Tutte le offerte",
  },
  en: {
    heroLabel: "Give La Mora · Assisi",
    heroTitle: "A gift box, a real stay.",
    introBody: "Four gift boxes designed for different occasions: nights, breakfast and small extras already included, so whoever receives the gift only has to pick the dates.",
    introNote: "“2-room apartment” indicates a type of apartment, not one of the five named units: the assignment is made among those available for the chosen dates.",
    badge: "Gift box",
    perPersone: (n) => `For ${n} people`,
    extraNote: "Extras to be paid separately: final cleaning €25, tourist tax €3/person/day.",
    richiedi: "Request information",
    waMsg: (title) => `Hi! I'd like information about the "${title}" gift box.`,
    diversoHeading: "Looking for something different?",
    diversoBody: "Tell us who the gift is for and what you'd like to include: we'll check together the availability and the best solution for you.",
    diversoCta: "Ask for information",
    diversoWaMsg: "Hi! I'd like advice on which gift box to choose.",
    microItems: [
      { title: "Direct contact", text: "Write to the people who run La Mora every day, not a call centre." },
      { title: "Real gift boxes", text: "Nights, breakfast and services already defined — no hidden conditions." },
      { title: "No middleman", text: "You book and gift without going through third parties." },
    ],
    microCta: "All offers",
  },
  fr: {
    heroLabel: "Offrez La Mora · Assise",
    heroTitle: "Un coffret, un vrai séjour.",
    introBody: "Quatre coffrets pensés pour des occasions différentes : nuits, petits-déjeuners et petits extras déjà inclus, pour que la personne qui reçoit le cadeau n'ait qu'à choisir les dates.",
    introNote: "« Appartement 2 pièces » indique une typologie d'appartement, pas l'une des cinq unités nommées : l'attribution se fait parmi celles disponibles pour les dates choisies.",
    badge: "Coffret cadeau",
    perPersone: (n) => `Pour ${n} personnes`,
    extraNote: "Extras à payer séparément : ménage final 25€, taxe de séjour 3€/personne/jour.",
    richiedi: "Demander des informations",
    waMsg: (title) => `Bonjour ! Je voudrais des informations sur le coffret "${title}".`,
    diversoHeading: "Vous cherchez autre chose ?",
    diversoBody: "Dites-nous à qui est destiné le cadeau et ce que vous aimeriez inclure : nous vérifions ensemble la disponibilité et la solution la plus adaptée.",
    diversoCta: "Demander des informations",
    diversoWaMsg: "Bonjour ! Je voudrais un conseil sur quel coffret cadeau choisir.",
    microItems: [
      { title: "Contact direct", text: "Écrivez à ceux qui gèrent La Mora chaque jour, pas à un centre d'appels." },
      { title: "Coffrets réels", text: "Nuits, petits-déjeuners et services déjà définis — aucune condition cachée." },
      { title: "Aucun intermédiaire", text: "Vous réservez et offrez sans passer par des tiers." },
    ],
    microCta: "Toutes les offres",
  },
  de: {
    heroLabel: "Verschenken Sie La Mora · Assisi",
    heroTitle: "Eine Geschenkbox, ein echter Aufenthalt.",
    introBody: "Vier Geschenkboxen für unterschiedliche Anlässe: Nächte, Frühstück und kleine Extras bereits inbegriffen, sodass der Beschenkte nur noch die Daten wählen muss.",
    introNote: "„Zwei-Zimmer-Apartment“ bezeichnet einen Apartmenttyp, nicht eine der fünf namentlich genannten Einheiten: die Zuweisung erfolgt unter den für die gewählten Daten verfügbaren Einheiten.",
    badge: "Geschenkbox",
    perPersone: (n) => `Für ${n} Personen`,
    extraNote: "Separat zu zahlende Extras: Endreinigung 25€, Kurtaxe 3€/Person/Tag.",
    richiedi: "Informationen anfordern",
    waMsg: (title) => `Hallo! Ich hätte gerne Informationen zur Geschenkbox "${title}".`,
    diversoHeading: "Suchen Sie etwas anderes?",
    diversoBody: "Erzählen Sie uns, für wen das Geschenk ist und was Sie einbeziehen möchten: wir prüfen gemeinsam die Verfügbarkeit und die passendste Lösung.",
    diversoCta: "Informationen anfordern",
    diversoWaMsg: "Hallo! Ich hätte gerne eine Beratung, welche Geschenkbox ich wählen soll.",
    microItems: [
      { title: "Direkter Kontakt", text: "Schreiben Sie an die, die La Mora jeden Tag führen, nicht an ein Callcenter." },
      { title: "Echte Geschenkboxen", text: "Nächte, Frühstück und Leistungen bereits festgelegt — keine versteckten Bedingungen." },
      { title: "Kein Vermittler", text: "Sie buchen und verschenken, ohne über Dritte zu gehen." },
    ],
    microCta: "Alle Angebote",
  },
};

export function CofanettiPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const boxes = BOXES[locale];

  return (
    <>
      <section className="relative flex h-[86vh] min-h-[560px] items-end overflow-hidden">
        <Image
          src="/images/home/foto della piscina agriturismo la mora.webp"
          alt="Piscina di Agriturismo La Mora"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.35) 60%, rgba(20,14,7,.78) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-16 text-center sm:px-10 sm:pb-20">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/80">{text.heroLabel}</span>
            <h1 className="mt-5 font-display text-[clamp(38px,6.5vw,64px)] font-normal leading-[1.08] text-cream [text-wrap:balance]">
              {text.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <span aria-hidden="true" className="mx-auto mt-10 block h-10 w-px bg-cream/40" />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[720px] px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-display text-[clamp(22px,3vw,30px)] font-normal leading-[1.5] text-ink [text-wrap:balance]">
              {text.introBody}
            </p>
            <p className="mx-auto mt-5 max-w-[480px] text-[13px] leading-[1.7] text-ink-soft">{text.introNote}</p>
          </Reveal>
        </div>
      </section>

      {boxes.map((box, i) => (
        <section key={box.slug} className={i % 2 === 0 ? "bg-cream-dim py-20 sm:py-28" : "bg-cream py-20 sm:py-28"}>
          <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
            <Reveal className={i % 2 === 1 ? "order-2 sm:order-1" : undefined}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                <Image src={box.img} alt={box.alt} fill sizes="(max-width: 640px) 100vw, 540px" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={100} className={i % 2 === 1 ? "order-1 sm:order-2" : undefined}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-olive-950">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                {text.badge}
              </span>
              <h2 className="mt-5 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                {box.title}
              </h2>
              <p className="mt-2 text-[13px] uppercase tracking-[0.06em] text-ink-soft">{text.perPersone(box.people)}</p>

              <p className="mt-5 font-display text-[44px] leading-none text-raspberry">{box.priceEur}</p>

              <p className="mt-5 max-w-[420px] text-[14px] leading-[1.8] text-ink-soft">{box.included}</p>
              <p className="mt-3 max-w-[420px] text-[12px] leading-[1.6] text-ink-soft/70">{text.extraNote}</p>

              <a
                href={`https://wa.me/393934363917?text=${encodeURIComponent(text.waMsg(box.title))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8a3844" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {text.richiedi}
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="relative flex h-[64vh] min-h-[440px] items-center justify-center overflow-hidden">
        <Image
          src="/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg"
          alt="Basilica di Santa Maria degli Angeli, vicino Assisi"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
        <div className="relative z-[1] mx-auto max-w-[520px] px-6 text-center sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(26px,3.4vw,36px)] font-normal leading-[1.3] text-cream [text-wrap:balance]">
              {text.diversoHeading}
            </h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-cream/75">{text.diversoBody}</p>
            <a
              href={`https://wa.me/393934363917?text=${encodeURIComponent(text.diversoWaMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.diversoCta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <Reveal>
            <dl className="grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 text-center sm:grid-cols-3 sm:text-left">
              {text.microItems.map((item) => (
                <div key={item.title}>
                  <dt className="font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-ink">{item.title}</dt>
                  <dd className="mt-2 text-[13px] leading-[1.6] text-ink-soft">{item.text}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex justify-center sm:justify-start">
              <Link
                href={withLocale(locale, "/offerte/")}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8f4324" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {text.microCta}
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <LocationMap locale={locale} />
      <NewsletterSection locale={locale} />
      <CertificationsMarquee locale={locale} />
    </>
  );
}
