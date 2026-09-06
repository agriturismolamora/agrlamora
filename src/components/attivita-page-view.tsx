import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { LocationMap } from "@/components/location-map";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Attività",
    description: "Cosa fare in agriturismo ad Assisi: piscina panoramica, noleggio e-bike, parco giochi per famiglie e i cavalli dell'azienda agricola di Agriturismo La Mora.",
  },
  en: {
    title: "Activities",
    description: "What to do at our agriturismo in Assisi: panoramic pool, e-bike rental, family playground and the horses of Agriturismo La Mora's own farm.",
  },
  fr: {
    title: "Activités",
    description: "Que faire à l'agriturismo d'Assise : piscine panoramique, location d'e-bike, aire de jeux pour les familles et les chevaux de l'exploitation d'Agriturismo La Mora.",
  },
  de: {
    title: "Aktivitäten",
    description: "Was man im Agriturismo in Assisi unternehmen kann: Panoramapool, E-Bike-Verleih, Spielplatz für Familien und die Pferde des eigenen Hofs von Agriturismo La Mora.",
  },
};

export function getAttivitaMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/agriturismo-famiglie-ad-assisi-e-dintorni/") } };
}

const EBIKE_PRICES: Record<Locale, { duration: string; price: string }[]> = {
  it: [
    { duration: "Mezza giornata", price: "15€" },
    { duration: "Giornata intera", price: "25€" },
    { duration: "Weekend", price: "40€" },
    { duration: "7 giorni", price: "90€" },
  ],
  en: [
    { duration: "Half day", price: "€15" },
    { duration: "Full day", price: "€25" },
    { duration: "Weekend", price: "€40" },
    { duration: "7 days", price: "€90" },
  ],
  fr: [
    { duration: "Demi-journée", price: "15€" },
    { duration: "Journée entière", price: "25€" },
    { duration: "Week-end", price: "40€" },
    { duration: "7 jours", price: "90€" },
  ],
  de: [
    { duration: "Halber Tag", price: "15€" },
    { duration: "Ganzer Tag", price: "25€" },
    { duration: "Wochenende", price: "40€" },
    { duration: "7 Tage", price: "90€" },
  ],
};

function getFaqItems(locale: Locale): FaqItem[] {
  const items: Record<Locale, FaqItem[]> = {
    it: [
      { question: "È possibile noleggiare le e-bike?", answer: "Sì, direttamente in struttura: consegna e ritiro con Paolo, contatto diretto al +39 393 4363917. Il listino va da 15€ per mezza giornata a 90€ per 7 giorni." },
      { question: "La piscina è adatta alle famiglie?", answer: "Sì: è panoramica, con sedute all'ombra intorno, aperta dal 1° maggio al 28 settembre dalle 9:00 alle 19:00. Accanto ci sono il parco giochi e il campo da calcetto in erba naturale." },
      { question: "Ci sono attività per i bambini?", answer: "Il parco giochi con altalene e scivoli è sempre disponibile per gli ospiti, il babysitting è organizzabile su richiesta e la culla si aggiunge a 10€ a soggiorno." },
      { question: "È possibile andare a cavallo?", answer: "No: i cavalli fanno parte della nostra azienda agricola e gli ospiti possono vederli e avvicinarli, ma non organizziamo lezioni di equitazione né passeggiate a cavallo." },
      { question: "Cosa si può visitare partendo da La Mora?", answer: "Assisi è a pochi minuti, e da qui si raggiungono facilmente anche Santa Maria degli Angeli, Spello e Perugia — a piedi, in auto o in e-bike." },
      { question: "Le attività vanno prenotate?", answer: "Piscina e parco giochi sono sempre a disposizione degli ospiti. E-bike e babysitting vanno concordati in anticipo, scrivendoci su WhatsApp o per telefono." },
    ],
    en: [
      { question: "Can I rent e-bikes?", answer: "Yes, directly on site: drop-off and pick-up with Paolo, direct contact at +39 393 4363917. Rates range from €15 for half a day to €90 for 7 days." },
      { question: "Is the pool suitable for families?", answer: "Yes: it's panoramic, with shaded seating around it, open from 1 May to 28 September, 9am to 7pm. Right next to it are the playground and the natural-grass five-a-side pitch." },
      { question: "Are there activities for children?", answer: "The playground with swings and slides is always available to guests, babysitting can be arranged on request, and a cot can be added for €10 per stay." },
      { question: "Can I go horse riding?", answer: "No: the horses are part of our own farm and guests can see them and get close to them, but we don't organise riding lessons or horseback rides." },
      { question: "What can be visited from La Mora?", answer: "Assisi is minutes away, and from here you can also easily reach Santa Maria degli Angeli, Spello and Perugia — on foot, by car or by e-bike." },
      { question: "Do activities need to be booked?", answer: "The pool and playground are always available to guests. E-bikes and babysitting need to be arranged in advance, by writing to us on WhatsApp or by phone." },
    ],
    fr: [
      { question: "Peut-on louer des e-bikes ?", answer: "Oui, directement sur place : remise et restitution avec Paolo, contact direct au +39 393 4363917. Les tarifs vont de 15€ pour une demi-journée à 90€ pour 7 jours." },
      { question: "La piscine convient-elle aux familles ?", answer: "Oui : elle est panoramique, avec des assises à l'ombre tout autour, ouverte du 1er mai au 28 septembre de 9h à 19h. Juste à côté se trouvent l'aire de jeux et le terrain de football en gazon naturel." },
      { question: "Y a-t-il des activités pour les enfants ?", answer: "L'aire de jeux avec balançoires et toboggans est toujours accessible aux hôtes, le baby-sitting peut être organisé sur demande et le lit bébé s'ajoute pour 10€ par séjour." },
      { question: "Peut-on faire de l'équitation ?", answer: "Non : les chevaux font partie de notre exploitation agricole et les hôtes peuvent les voir et les approcher, mais nous n'organisons ni cours d'équitation ni promenades à cheval." },
      { question: "Que peut-on visiter depuis La Mora ?", answer: "Assise est à quelques minutes, et depuis ici on rejoint aussi facilement Santa Maria degli Angeli, Spello et Pérouse — à pied, en voiture ou en e-bike." },
      { question: "Faut-il réserver les activités ?", answer: "La piscine et l'aire de jeux sont toujours à la disposition des hôtes. Les e-bikes et le baby-sitting doivent être convenus à l'avance, en nous écrivant sur WhatsApp ou par téléphone." },
    ],
    de: [
      { question: "Kann man E-Bikes mieten?", answer: "Ja, direkt vor Ort: Übergabe und Rückgabe mit Paolo, direkter Kontakt unter +39 393 4363917. Die Preise reichen von 15€ für einen halben Tag bis 90€ für 7 Tage." },
      { question: "Ist der Pool für Familien geeignet?", answer: "Ja: er ist panoramisch, mit schattigen Sitzgelegenheiten drumherum, geöffnet vom 1. Mai bis 28. September von 9 bis 19 Uhr. Direkt daneben liegen der Spielplatz und der Fußballplatz mit Naturrasen." },
      { question: "Gibt es Aktivitäten für Kinder?", answer: "Der Spielplatz mit Schaukeln und Rutschen steht den Gästen immer zur Verfügung, Babysitting kann auf Anfrage organisiert werden und ein Kinderbett kostet 10€ pro Aufenthalt." },
      { question: "Kann man reiten?", answer: "Nein: die Pferde gehören zu unserem eigenen Hof, Gäste können sie sehen und sich ihnen nähern, aber wir bieten weder Reitstunden noch Ausritte an." },
      { question: "Was kann man von La Mora aus besichtigen?", answer: "Assisi ist nur wenige Minuten entfernt, und von hier aus erreicht man auch leicht Santa Maria degli Angeli, Spello und Perugia — zu Fuß, mit dem Auto oder mit dem E-Bike." },
      { question: "Müssen Aktivitäten gebucht werden?", answer: "Pool und Spielplatz stehen den Gästen immer zur Verfügung. E-Bikes und Babysitting müssen im Voraus vereinbart werden, indem man uns auf WhatsApp oder telefonisch schreibt." },
    ],
  };
  return items[locale];
}

const TEXT: Record<
  Locale,
  {
    heroLabel: string;
    heroTitle: string;
    introQuote: string;
    ebikeLabel: string;
    ebikeHeading: string;
    ebikeBody: string;
    ebikeCta: string;
    piscinaLabel: string;
    piscinaHeading: string;
    piscinaBody: string;
    piscinaOrario: string;
    piscinaCta: string;
    famiglieLabel: string;
    famiglieHeading: string;
    famiglieBody: string;
    cavalliLabel: string;
    cavalliBody: string;
    territorioLabel: string;
    territorioHeading: string;
    territorioBody: string;
    territorioCta: string;
    pauseQuote: string;
    faqLabel: string;
    faqHeading: string;
  }
> = {
  it: {
    heroLabel: "Agriturismo La Mora · Assisi",
    heroTitle: "Esperienze da vivere.",
    introQuote: "A La Mora, spesso le esperienze migliori sono le più semplici: stare all'aperto, rallentare, lasciare che il verde intorno faccia il suo lavoro — e da qui, partire alla scoperta di Assisi quando se ne ha voglia.",
    ebikeLabel: "E-bike",
    ebikeHeading: "Il modo più semplice per esplorare la campagna umbra.",
    ebikeBody: "Le e-bike si noleggiano direttamente in struttura, consegna e ritiro con Paolo: comode per raggiungere Assisi senza pensare al parcheggio, o per allontanarsi tra gli ulivi senza fatica, anche per chi non è allenato.",
    ebikeCta: "Scopri il noleggio e-bike",
    piscinaLabel: "Piscina e relax",
    piscinaHeading: "Il centro delle giornate, da maggio a settembre.",
    piscinaBody: "Panoramica, circondata dal verde, con sedute all'ombra per chi preferisce restare a guardare. È lo spazio dove le famiglie si ritrovano nel pomeriggio e dove una giornata ad Assisi si chiude, prima di cena.",
    piscinaOrario: "Orario apertura: 09:00 – 19:00",
    piscinaCta: "Scopri la piscina",
    famiglieLabel: "Famiglie",
    famiglieHeading: "Spazio per i bambini, senza smettere di essere un agriturismo vero.",
    famiglieBody: "Altalene, scivoli, un prato dove correre senza sorvegliare ogni passo. Per chi vuole una sera solo per sé, il babysitting è disponibile su richiesta. Non è un parco tematico: è il giardino di una casa, aperto a chi arriva.",
    cavalliLabel: "I cavalli",
    cavalliBody: "Fanno parte dell'azienda agricola. Gli ospiti possono vederli, avvicinarli — non organizziamo lezioni di equitazione né passeggiate a cavallo.",
    territorioLabel: "Oltre la struttura",
    territorioHeading: "Le attività qui sono un punto di partenza, non il punto d'arrivo.",
    territorioBody: "Una mattina in piscina, un giro in e-bike nel pomeriggio, e Assisi resta a pochi minuti per il resto della giornata — con la campagna umbra tutt'intorno a fare da cornice a entrambe le cose.",
    territorioCta: "Scopri il territorio",
    pauseQuote: "Non tutto quello che si vive qui si vede in una fotografia.",
    faqLabel: "Domande frequenti",
    faqHeading: "Le domande che ci fate più spesso sulle attività.",
  },
  en: {
    heroLabel: "Agriturismo La Mora · Assisi",
    heroTitle: "Experiences worth living.",
    introQuote: "At La Mora, the best experiences are often the simplest: being outdoors, slowing down, letting the greenery around you do its work — and from here, setting off to discover Assisi whenever the mood strikes.",
    ebikeLabel: "E-bike",
    ebikeHeading: "The simplest way to explore the Umbrian countryside.",
    ebikeBody: "E-bikes are rented directly on site, with drop-off and pick-up handled by Paolo: convenient for reaching Assisi without worrying about parking, or for venturing among the olive trees with no effort, even if you're not particularly fit.",
    ebikeCta: "Discover e-bike rental",
    piscinaLabel: "Pool and relaxation",
    piscinaHeading: "The centre of the day, from May to September.",
    piscinaBody: "Panoramic, surrounded by greenery, with shaded seating for those who prefer to just watch. It's the space where families gather in the afternoon and where a day in Assisi winds down, before dinner.",
    piscinaOrario: "Opening hours: 9am – 7pm",
    piscinaCta: "Discover the pool",
    famiglieLabel: "Families",
    famiglieHeading: "Room for children, without ceasing to be a real agriturismo.",
    famiglieBody: "Swings, slides, a lawn to run across without watching every step. For those wanting an evening to themselves, babysitting is available on request. It's not a theme park: it's the garden of a home, open to those who arrive.",
    cavalliLabel: "The horses",
    cavalliBody: "They're part of the farm. Guests can see them, get close to them — we don't organise riding lessons or horseback rides.",
    territorioLabel: "Beyond the property",
    territorioHeading: "The activities here are a starting point, not the destination.",
    territorioBody: "A morning at the pool, an e-bike ride in the afternoon, and Assisi remains minutes away for the rest of the day — with the Umbrian countryside all around as the backdrop to both.",
    territorioCta: "Discover the area",
    pauseQuote: "Not everything you experience here can be seen in a photograph.",
    faqLabel: "Frequently asked questions",
    faqHeading: "The questions we're asked most often about activities.",
  },
  fr: {
    heroLabel: "Agriturismo La Mora · Assise",
    heroTitle: "Des expériences à vivre.",
    introQuote: "À La Mora, les meilleures expériences sont souvent les plus simples : être dehors, ralentir, laisser la verdure autour de soi faire son travail — et partir d'ici à la découverte d'Assise quand l'envie vous prend.",
    ebikeLabel: "E-bike",
    ebikeHeading: "La façon la plus simple d'explorer la campagne ombrienne.",
    ebikeBody: "Les e-bikes se louent directement sur place, remise et restitution avec Paolo : pratiques pour rejoindre Assise sans se soucier du stationnement, ou pour s'aventurer parmi les oliviers sans effort, même sans entraînement particulier.",
    ebikeCta: "Découvrir la location d'e-bike",
    piscinaLabel: "Piscine et détente",
    piscinaHeading: "Le cœur des journées, de mai à septembre.",
    piscinaBody: "Panoramique, entourée de verdure, avec des assises à l'ombre pour ceux qui préfèrent simplement regarder. C'est l'endroit où les familles se retrouvent l'après-midi et où une journée à Assise se termine, avant le dîner.",
    piscinaOrario: "Horaires d'ouverture : 9h – 19h",
    piscinaCta: "Découvrir la piscine",
    famiglieLabel: "Familles",
    famiglieHeading: "De la place pour les enfants, sans cesser d'être un vrai agriturismo.",
    famiglieBody: "Balançoires, toboggans, une pelouse où courir sans surveiller chaque pas. Pour ceux qui veulent une soirée pour eux, le baby-sitting est disponible sur demande. Ce n'est pas un parc à thème : c'est le jardin d'une maison, ouvert à qui arrive.",
    cavalliLabel: "Les chevaux",
    cavalliBody: "Ils font partie de l'exploitation agricole. Les hôtes peuvent les voir, les approcher — nous n'organisons ni cours d'équitation ni promenades à cheval.",
    territorioLabel: "Au-delà de la structure",
    territorioHeading: "Les activités ici sont un point de départ, pas une fin en soi.",
    territorioBody: "Une matinée à la piscine, une balade en e-bike l'après-midi, et Assise reste à quelques minutes pour le reste de la journée — avec la campagne ombrienne tout autour en toile de fond des deux.",
    territorioCta: "Découvrir le territoire",
    pauseQuote: "Tout ce que l'on vit ici ne se voit pas sur une photographie.",
    faqLabel: "Questions fréquentes",
    faqHeading: "Les questions que l'on nous pose le plus souvent sur les activités.",
  },
  de: {
    heroLabel: "Agriturismo La Mora · Assisi",
    heroTitle: "Erlebnisse, die es wert sind.",
    introQuote: "Bei La Mora sind die schönsten Erlebnisse oft die einfachsten: draußen sein, langsamer werden, das Grün um sich herum wirken lassen — und von hier aus aufbrechen, um Assisi zu entdecken, wann immer man Lust dazu hat.",
    ebikeLabel: "E-Bike",
    ebikeHeading: "Die einfachste Art, die umbrische Landschaft zu erkunden.",
    ebikeBody: "Die E-Bikes werden direkt vor Ort gemietet, Übergabe und Rückgabe mit Paolo: praktisch, um Assisi zu erreichen, ohne an den Parkplatz zu denken, oder um sich mühelos zwischen die Olivenbäume zu begeben, auch ohne besonderes Training.",
    ebikeCta: "E-Bike-Verleih entdecken",
    piscinaLabel: "Pool und Entspannung",
    piscinaHeading: "Der Mittelpunkt des Tages, von Mai bis September.",
    piscinaBody: "Panoramisch, von Grün umgeben, mit schattigen Sitzplätzen für alle, die lieber zuschauen. Hier treffen sich die Familien am Nachmittag, und hier klingt ein Tag in Assisi vor dem Abendessen aus.",
    piscinaOrario: "Öffnungszeiten: 9 – 19 Uhr",
    piscinaCta: "Den Pool entdecken",
    famiglieLabel: "Familien",
    famiglieHeading: "Platz für Kinder, ohne aufzuhören, ein echter Agriturismo zu sein.",
    famiglieBody: "Schaukeln, Rutschen, eine Wiese zum Herumlaufen, ohne jeden Schritt zu überwachen. Für alle, die einen Abend für sich möchten, ist Babysitting auf Anfrage verfügbar. Kein Themenpark: der Garten eines Hauses, offen für alle, die ankommen.",
    cavalliLabel: "Die Pferde",
    cavalliBody: "Sie gehören zum Hof. Gäste können sie sehen, sich ihnen nähern — wir bieten weder Reitstunden noch Ausritte an.",
    territorioLabel: "Über die Unterkunft hinaus",
    territorioHeading: "Die Aktivitäten hier sind ein Ausgangspunkt, kein Ziel.",
    territorioBody: "Ein Vormittag am Pool, eine E-Bike-Tour am Nachmittag, und Assisi bleibt für den Rest des Tages nur wenige Minuten entfernt — mit der umbrischen Landschaft ringsum als Kulisse für beides.",
    territorioCta: "Die Umgebung entdecken",
    pauseQuote: "Nicht alles, was man hier erlebt, sieht man auf einem Foto.",
    faqLabel: "Häufig gestellte Fragen",
    faqHeading: "Die Fragen, die uns zu den Aktivitäten am häufigsten gestellt werden.",
  },
};

export function AttivitaPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const ebikePrices = EBIKE_PRICES[locale];

  return (
    <>
      <section className="relative flex h-[92vh] min-h-[600px] items-end overflow-hidden">
        <Image
          src="/images/piscina/piscina agriturismo la mora.webp"
          alt="Piscina panoramica di Agriturismo La Mora"
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
            <h1 className="mt-5 font-display text-[clamp(38px,6.5vw,70px)] font-normal leading-[1.08] text-cream [text-wrap:balance]">
              {text.heroTitle}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-olive-950 py-24 sm:py-32">
        <div className="mx-auto flex max-w-[720px] flex-col items-center px-6 text-center sm:px-10">
          <Reveal>
            <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-[3px] shadow-[0_35px_70px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/piscina/foto esterno prato verde con panchina in legno e campo da calcio.webp"
                alt="Prato verde di Agriturismo La Mora"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-12 font-display text-[clamp(22px,3.2vw,32px)] font-normal italic leading-[1.5] text-[#f1f1f1] [text-wrap:balance]">
              {text.introQuote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[4/5]">
              <Image
                src="/images/servizi-extra/e-bike/immagine di due persone con ebike.webp"
                alt="Noleggio e-bike di Agriturismo La Mora"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.ebikeLabel}</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.ebikeHeading}
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">{text.ebikeBody}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ink/10 pt-6 sm:max-w-[360px]">
              {ebikePrices.map((p) => (
                <div key={p.duration} className="flex items-baseline justify-between gap-3 border-b border-ink/10 pb-2">
                  <dt className="text-[12px] text-ink-soft">{p.duration}</dt>
                  <dd className="font-display text-[19px] text-ink">{p.price}</dd>
                </div>
              ))}
            </dl>

            <a
              href="https://wa.me/393934363917?text=Ciao!%20Vorrei%20informazioni%20sul%20noleggio%20e-bike."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.ebikeCta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal className="order-2 sm:order-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.piscinaLabel}</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.piscinaHeading}
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">{text.piscinaBody}</p>
            <p className="mt-3 text-[13px] uppercase tracking-[0.06em] text-ink-soft">{text.piscinaOrario}</p>
            <Link
              href={withLocale(locale, "/piscina/")}
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.piscinaCta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={100} className="order-1 sm:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/piscina/piscina agriturismo la mora lato.jpeg"
                alt="Piscina panoramica di Agriturismo La Mora, vista laterale"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/piscina/esterno parco agriturismo con scivolo per bambini.jpg"
                alt="Parco giochi per bambini di Agriturismo La Mora"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.famiglieLabel}</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.famiglieHeading}
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">{text.famiglieBody}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative flex h-[80vh] min-h-[520px] items-center overflow-hidden">
        <Image
          src="/images/servizi-extra/equitazione/foto di un cavallo agriturismo la mora.jpeg"
          alt="Uno dei cavalli dell'azienda agricola di Agriturismo La Mora"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(20,14,7,.72) 0%, rgba(20,14,7,.15) 55%, rgba(20,14,7,.1) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <div className="max-w-[380px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">{text.cavalliLabel}</span>
              <p className="mt-4 font-display text-[clamp(22px,2.8vw,30px)] font-normal leading-[1.4] text-cream [text-wrap:balance]">
                {text.cavalliBody}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal className="order-2 sm:order-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.territorioLabel}</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.territorioHeading}
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">{text.territorioBody}</p>
            <Link
              href={withLocale(locale, "/territorio/")}
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8f4324" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.territorioCta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={100} className="order-1 sm:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/territorio/assisi/eremo delle carceri assisi.jpg"
                alt="Eremo delle Carceri sul Monte Subasio, vicino Assisi"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative flex h-[76vh] min-h-[480px] items-center justify-center overflow-hidden">
        <Image
          src="/images/piscina/piscina agriturismo la mora di notte.jpeg"
          alt="Piscina di Agriturismo La Mora illuminata di sera"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
        <Reveal>
          <p className="relative z-[1] mx-auto max-w-[560px] px-6 text-center font-display text-[clamp(24px,3.4vw,36px)] font-normal italic leading-[1.4] text-cream [text-wrap:balance]">
            {text.pauseQuote}
          </p>
        </Reveal>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <Reveal>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.faqLabel}</span>
              <h2 className="mt-4 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                {text.faqHeading}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <FaqAccordion items={getFaqItems(locale)} />
            </Reveal>
          </div>
        </div>
      </section>

      <LocationMap locale={locale} />
      <NewsletterSection locale={locale} />
      <CertificationsMarquee locale={locale} />
    </>
  );
}
