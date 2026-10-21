import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/scroll-reveal";
import { ApartmentGallery } from "@/components/apartment-gallery";
import { BookingModalButton } from "@/components/booking-modal-button";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { StructuredData } from "@/components/structured-data";
import { getBlogPost } from "@/data/blog-posts";
import { RISTORANTE_CARFAGNA_PHOTO_CREDIT } from "@/data/photo-credits";
import { CARFAGNA, CARFAGNA_OFFERS, CARFAGNA_PAGE_PATH, CARFAGNA_PHOTOS, CARFAGNA_SHOW_TEXT, carfagnaPdfHref, type CarfagnaOffer } from "@/data/ristorante-carfagna";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { SITE_URL, absoluteUrl, pageMetadata } from "@/lib/seo";
import { LD_ID, faqPageNode, type JsonLdNode } from "@/lib/structured-data";

const WHATSAPP_NUMBER = "393934363917";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Ristorante convenzionato ad Assisi: Carfagna",
    description: "Dove mangiare ad Assisi: il Ristorante Carfagna, sotto il Sacro Convento, è convenzionato con Agriturismo La Mora. Menù bambini 15 €, menù del giorno 25 €, menù dalla carta 35 €.",
  },
  en: {
    title: "Partner restaurant in Assisi: Carfagna",
    description: "Where to eat in Assisi: Ristorante Carfagna, below the Sacro Convento, has an agreement with Agriturismo La Mora. Children's menu €15, menu of the day €25, à la carte menu €35.",
  },
  fr: {
    title: "Restaurant partenaire à Assise : Carfagna",
    description: "Où manger à Assise : le Ristorante Carfagna, sous le Sacro Convento, est partenaire de l'Agriturismo La Mora. Menu enfants 15 €, menu du jour 25 €, menu à la carte 35 €.",
  },
  de: {
    title: "Partnerrestaurant in Assisi: Carfagna",
    description: "Wo man in Assisi isst: Das Ristorante Carfagna unterhalb des Sacro Convento ist Partner des Agriturismo La Mora. Kindermenü 15 €, Tagesmenü 25 €, Menü von der Karte 35 €.",
  },
};

export function getRistoranteMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return pageMetadata({ locale, path: CARFAGNA_PAGE_PATH, title: m.title, description: m.description });
}

type Text = {
  heroLabel: string;
  heroTitle: string;
  intro: string;
  taste: string;
  offerLabel: string;
  offerHeading: string;
  ctaPdf: string;
  ctaWhatsapp: string;
  whatsappMessage: string;
  ctaBook: string;
  galleryLabel: string;
  galleryHeading: string;
  facebookAlbum: string;
  facebookPage: string;
  whereLabel: string;
  whereHeading: string;
  distance: (km: string, minutes: number) => string;
  maps: string;
  officialSite: string;
  laMoraLabel: string;
  laMoraHeading: string;
  laMoraBody: string;
  colazione: string;
  alloggi: string;
  territorio: string;
  blogAssisi: string;
  faqLabel: string;
  faq: FaqItem[];
};

const TEXT: Record<Locale, Text> = {
  it: {
    heroLabel: "Dove mangiare ad Assisi",
    heroTitle: "Ristorante Carfagna ad Assisi, il ristorante convenzionato con La Mora",
    intro:
      "Il Ristorante Carfagna è un ristorante indipendente nella campagna ai piedi di Assisi, proprio sotto il Sacro Convento, a 7,0 km da La Mora (circa 12 minuti in auto). Non fa parte dell'agriturismo: è un ristorante convenzionato, che per gli ospiti de La Mora ha preparato tre proposte a prezzo fisso.",
    taste:
      "Il gusto dell'Umbria a tavola: un menù fisso e le proposte alla carta, dall'antipasto al dolce, con i prodotti tipici del territorio. È l'indirizzo giusto per un pranzo dopo una passeggiata ad Assisi o per una cena in compagnia, con la Basilica davanti agli occhi.",
    offerLabel: "La convenzione",
    offerHeading: "La convenzione per gli ospiti de La Mora",
    ctaPdf: "Scarica il menù convenzione (PDF)",
    ctaWhatsapp: "Chiedi informazioni su WhatsApp",
    whatsappMessage: "Ciao Paolo! Vorrei informazioni sulla convenzione con il Ristorante Carfagna.",
    ctaBook: "Prenota il tuo soggiorno",
    galleryLabel: "Le foto",
    galleryHeading: "Dalla terrazza alla tavola",
    facebookAlbum: `Guarda l'album "${CARFAGNA.facebookAlbumTitle}" su Facebook`,
    facebookPage: "Pagina Facebook di Ristorante Carfagna",
    whereLabel: "Dove si trova",
    whereHeading: "Ai piedi di Assisi, sotto il Sacro Convento",
    distance: (km, minutes) => `A ${km} km da La Mora, circa ${minutes} minuti in auto (Google Maps).`,
    maps: "Apri in Google Maps",
    officialSite: "Sito ufficiale del ristorante",
    laMoraLabel: "Da La Mora",
    laMoraHeading: "La giornata comincia in agriturismo",
    laMoraBody: "La mattina la colazione bio a La Mora, poi Assisi a piedi e a tavola dal Carfagna: idee e itinerari per organizzare la giornata.",
    colazione: "La colazione bio de La Mora",
    alloggi: "Gli appartamenti de La Mora",
    territorio: "Cosa vedere ad Assisi e dintorni",
    blogAssisi: "Dal blog, su Assisi",
    faqLabel: "Domande frequenti",
    faq: [
      {
        question: "Cos'è la convenzione con il Ristorante Carfagna?",
        answer:
          "È un accordo tra Agriturismo La Mora e il Ristorante Carfagna, un ristorante indipendente di Assisi: per gli ospiti de La Mora ci sono tre proposte a prezzo fisso, il menù bambini (da 3 a 10 anni) a 15 €, il menù del giorno a 25 € a persona e il menù dalla carta a 35 € a persona.",
      },
      {
        question: "Ci sono menù per bambini?",
        answer: "Sì: il menù bambini, per i bambini da 3 a 10 anni, costa 15 € e si concorda con il ristorante in base alle esigenze dei bambini.",
      },
      {
        question: "Come uso la convenzione?",
        answer: "Basta mostrare al ristorante il PDF della convenzione oppure questa pagina: il Ristorante Carfagna conosce già le condizioni.",
      },
    ],
  },
  en: {
    heroLabel: "Where to eat in Assisi",
    heroTitle: "Ristorante Carfagna in Assisi, La Mora's partner restaurant",
    intro:
      "Ristorante Carfagna is an independent restaurant in the countryside at the foot of Assisi, right below the Sacro Convento, 7.0 km from La Mora (about 12 minutes by car). It is not part of the agriturismo: it is a partner restaurant that has prepared three fixed-price options for La Mora's guests.",
    taste:
      "The taste of Umbria at the table: a set menu and à la carte dishes, from starter to dessert, with the typical products of the area. It's the right place for lunch after a walk around Assisi or for dinner with friends, with the Basilica right in front of you.",
    offerLabel: "The agreement",
    offerHeading: "The agreement for La Mora's guests",
    ctaPdf: "Download the agreement menu (PDF)",
    ctaWhatsapp: "Ask for information on WhatsApp",
    whatsappMessage: "Hi Paolo! I'd like some information about the agreement with Ristorante Carfagna.",
    ctaBook: "Book your stay",
    galleryLabel: "Photos",
    galleryHeading: "From the terrace to the table",
    facebookAlbum: `See the album "${CARFAGNA.facebookAlbumTitle}" on Facebook`,
    facebookPage: "Ristorante Carfagna's Facebook page",
    whereLabel: "Where it is",
    whereHeading: "At the foot of Assisi, below the Sacro Convento",
    distance: (km, minutes) => `${km.replace(",", ".")} km from La Mora, about ${minutes} minutes by car (Google Maps).`,
    maps: "Open in Google Maps",
    officialSite: "The restaurant's official website",
    laMoraLabel: "From La Mora",
    laMoraHeading: "The day starts at the agriturismo",
    laMoraBody: "Organic breakfast at La Mora in the morning, Assisi on foot, then a meal at Carfagna: ideas and itineraries to plan your day.",
    colazione: "La Mora's organic breakfast",
    alloggi: "La Mora's apartments",
    territorio: "What to see in and around Assisi",
    blogAssisi: "From the blog, on Assisi",
    faqLabel: "Frequently asked questions",
    faq: [
      {
        question: "What is the agreement with Ristorante Carfagna?",
        answer:
          "It's an agreement between Agriturismo La Mora and Ristorante Carfagna, an independent restaurant in Assisi: La Mora's guests have three fixed-price options, the children's menu (ages 3 to 10) at €15, the menu of the day at €25 per person and the à la carte menu at €35 per person.",
      },
      {
        question: "Are there children's menus?",
        answer: "Yes: the children's menu, for children aged 3 to 10, costs €15 and is agreed with the restaurant according to the children's needs.",
      },
      {
        question: "How do I use the agreement?",
        answer: "Just show the restaurant the agreement PDF or this page: Ristorante Carfagna already knows the conditions.",
      },
    ],
  },
  fr: {
    heroLabel: "Où manger à Assise",
    heroTitle: "Ristorante Carfagna à Assise, le restaurant partenaire de La Mora",
    intro:
      "Le Ristorante Carfagna est un restaurant indépendant dans la campagne au pied d'Assise, juste sous le Sacro Convento, à 7,0 km de La Mora (environ 12 minutes en voiture). Il ne fait pas partie de l'agritourisme : c'est un restaurant partenaire, qui a préparé trois formules à prix fixe pour les hôtes de La Mora.",
    taste:
      "Le goût de l'Ombrie à table : un menu fixe et des plats à la carte, de l'entrée au dessert, avec les produits typiques du territoire. C'est l'adresse idéale pour un déjeuner après une promenade dans Assise ou pour un dîner entre amis, avec la basilique sous les yeux.",
    offerLabel: "La convention",
    offerHeading: "La convention pour les hôtes de La Mora",
    ctaPdf: "Télécharger le menu de la convention (PDF)",
    ctaWhatsapp: "Demander des informations sur WhatsApp",
    whatsappMessage: "Bonjour Paolo ! J'aimerais des informations sur la convention avec le Ristorante Carfagna.",
    ctaBook: "Réservez votre séjour",
    galleryLabel: "Les photos",
    galleryHeading: "De la terrasse à la table",
    facebookAlbum: `Voir l'album « ${CARFAGNA.facebookAlbumTitle} » sur Facebook`,
    facebookPage: "Page Facebook du Ristorante Carfagna",
    whereLabel: "Où il se trouve",
    whereHeading: "Au pied d'Assise, sous le Sacro Convento",
    distance: (km, minutes) => `À ${km} km de La Mora, environ ${minutes} minutes en voiture (Google Maps).`,
    maps: "Ouvrir dans Google Maps",
    officialSite: "Site officiel du restaurant",
    laMoraLabel: "Depuis La Mora",
    laMoraHeading: "La journée commence à l'agritourisme",
    laMoraBody: "Le matin le petit-déjeuner bio à La Mora, puis Assise à pied et le repas chez Carfagna : idées et itinéraires pour organiser la journée.",
    colazione: "Le petit-déjeuner bio de La Mora",
    alloggi: "Les appartements de La Mora",
    territorio: "Que voir à Assise et aux alentours",
    blogAssisi: "Sur le blog, à propos d'Assise",
    faqLabel: "Questions fréquentes",
    faq: [
      {
        question: "Qu'est-ce que la convention avec le Ristorante Carfagna ?",
        answer:
          "C'est un accord entre l'Agriturismo La Mora et le Ristorante Carfagna, un restaurant indépendant d'Assise : les hôtes de La Mora ont trois formules à prix fixe, le menu enfants (de 3 à 10 ans) à 15 €, le menu du jour à 25 € par personne et le menu à la carte à 35 € par personne.",
      },
      {
        question: "Y a-t-il des menus pour les enfants ?",
        answer: "Oui : le menu enfants, pour les enfants de 3 à 10 ans, coûte 15 € et se convient avec le restaurant selon les besoins des enfants.",
      },
      {
        question: "Comment utiliser la convention ?",
        answer: "Il suffit de montrer au restaurant le PDF de la convention ou cette page : le Ristorante Carfagna connaît déjà les conditions.",
      },
    ],
  },
  de: {
    heroLabel: "Wo man in Assisi isst",
    heroTitle: "Ristorante Carfagna in Assisi, das Partnerrestaurant von La Mora",
    intro:
      "Das Ristorante Carfagna ist ein unabhängiges Restaurant auf dem Land am Fuß von Assisi, direkt unterhalb des Sacro Convento, 7,0 km von La Mora entfernt (rund 12 Minuten mit dem Auto). Es gehört nicht zum Agriturismo: Es ist ein Partnerrestaurant, das für die Gäste von La Mora drei Angebote zum Festpreis vorbereitet hat.",
    taste:
      "Der Geschmack Umbriens auf dem Tisch: ein festes Menü und Gerichte à la carte, von der Vorspeise bis zum Dessert, mit den typischen Produkten der Gegend. Die richtige Adresse für ein Mittagessen nach einem Spaziergang durch Assisi oder ein Abendessen in Gesellschaft, mit der Basilika vor Augen.",
    offerLabel: "Die Vereinbarung",
    offerHeading: "Die Vereinbarung für die Gäste von La Mora",
    ctaPdf: "Menü der Vereinbarung herunterladen (PDF)",
    ctaWhatsapp: "Per WhatsApp nachfragen",
    whatsappMessage: "Hallo Paolo! Ich hätte gerne Informationen zur Vereinbarung mit dem Ristorante Carfagna.",
    ctaBook: "Buchen Sie Ihren Aufenthalt",
    galleryLabel: "Fotos",
    galleryHeading: "Von der Terrasse auf den Tisch",
    facebookAlbum: `Das Album „${CARFAGNA.facebookAlbumTitle}“ auf Facebook ansehen`,
    facebookPage: "Facebook-Seite des Ristorante Carfagna",
    whereLabel: "Lage",
    whereHeading: "Am Fuß von Assisi, unterhalb des Sacro Convento",
    distance: (km, minutes) => `${km} km von La Mora, rund ${minutes} Minuten mit dem Auto (Google Maps).`,
    maps: "In Google Maps öffnen",
    officialSite: "Offizielle Website des Restaurants",
    laMoraLabel: "Von La Mora aus",
    laMoraHeading: "Der Tag beginnt im Agriturismo",
    laMoraBody: "Morgens das Bio-Frühstück im La Mora, dann Assisi zu Fuß und das Essen im Carfagna: Ideen und Routen, um den Tag zu planen.",
    colazione: "Das Bio-Frühstück im La Mora",
    alloggi: "Die Apartments von La Mora",
    territorio: "Sehenswertes in und um Assisi",
    blogAssisi: "Aus dem Blog, über Assisi",
    faqLabel: "Häufige Fragen",
    faq: [
      {
        question: "Was ist die Vereinbarung mit dem Ristorante Carfagna?",
        answer:
          "Eine Vereinbarung zwischen dem Agriturismo La Mora und dem Ristorante Carfagna, einem unabhängigen Restaurant in Assisi: Für die Gäste von La Mora gibt es drei Angebote zum Festpreis, das Kindermenü (3 bis 10 Jahre) für 15 €, das Tagesmenü für 25 € pro Person und das Menü von der Karte für 35 € pro Person.",
      },
      {
        question: "Gibt es Kindermenüs?",
        answer: "Ja: Das Kindermenü für Kinder von 3 bis 10 Jahren kostet 15 € und wird mit dem Restaurant nach den Bedürfnissen der Kinder abgestimmt.",
      },
      {
        question: "Wie nutze ich die Vereinbarung?",
        answer: "Zeigen Sie dem Restaurant einfach das PDF der Vereinbarung oder diese Seite: Das Ristorante Carfagna kennt die Bedingungen bereits.",
      },
    ],
  },
};

/* Articoli del blog su Assisi linkati in fondo (titoli da blog-posts.ts). */
const ASSISI_ARTICLES = ["basilica-santa-maria-degli-angeli", "santuario-san-damiano", "carlo-acutis-assisi"];

/* Icone delle tre card, stesso tratto 1.5 delle altre icone del sito. */
function OfferIcon({ id }: { id: CarfagnaOffer["id"] }) {
  const common = { viewBox: "0 0 24 24", width: 26, height: 26, fill: "none", "aria-hidden": true } as const;
  if (id === "bambini") {
    return (
      <svg {...common}>
        <circle cx="12" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.5 12.5 12 10l4.5 2.5M12 10v5.5m0 0-2.8 4.5M12 15.5l2.8 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "giorno") {
    return (
      <svg {...common}>
        <circle cx="12" cy="13" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3.5 4.5v6.5M2 4.5v3a1.5 1.5 0 0 0 3 0v-3M20.5 4.5c-1.4.6-2 2.4-2 4.5h2v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function pageNodes(locale: Locale): JsonLdNode[] {
  const url = `${SITE_URL}${withLocale(locale, CARFAGNA_PAGE_PATH)}`;
  const m = METADATA_TEXT[locale];
  const restaurantId = `${SITE_URL}${CARFAGNA_PAGE_PATH}#restaurant`;
  return [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: m.title,
      description: m.description,
      inLanguage: locale,
      isPartOf: { "@id": LD_ID.website },
      about: { "@id": restaurantId },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      primaryImageOfPage: absoluteUrl(CARFAGNA_PHOTOS[0].src),
    },
    /* Solo dati verificati sulla pagina ufficiale del ristorante. */
    {
      "@type": "Restaurant",
      "@id": restaurantId,
      name: CARFAGNA.name,
      url: CARFAGNA.officialUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: CARFAGNA.address.street,
        postalCode: CARFAGNA.address.postalCode,
        addressLocality: CARFAGNA.address.locality,
        addressRegion: CARFAGNA.address.region,
        addressCountry: CARFAGNA.address.country,
      },
      sameAs: [CARFAGNA.facebookUrl],
    },
    faqPageNode(locale, CARFAGNA_PAGE_PATH, TEXT[locale].faq),
  ];
}

const LINK_CLASS = "text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry";

/* Pagina "Ristorante convenzionato" (voce La Mora → sotto Colazione Bio).
   Fatti in src/data/ristorante-carfagna.ts. Foto del ristorante: niente
   filigrana La Mora, credito visibile. Solo link verso Facebook e Maps,
   nessun contenuto incorporato. */
export function RistoranteConvenzionatoPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const cover = CARFAGNA_PHOTOS[0];
  const gallery = CARFAGNA_PHOTOS.slice(1).map((p) => ({ src: p.src, alt: p.alt[locale] }));
  const credit = RISTORANTE_CARFAGNA_PHOTO_CREDIT[locale];
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text.whatsappMessage)}`;
  const articles = ASSISI_ARTICLES.map((slug) => getBlogPost(locale, slug)).filter((p) => p !== undefined);

  return (
    <>
      <StructuredData locale={locale} path={CARFAGNA_PAGE_PATH} nodes={pageNodes(locale)} />

      <section className="relative flex h-[72vh] min-h-[480px] items-end overflow-hidden">
        <Image src={cover.src} alt={cover.alt[locale]} fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.08) 0%, rgba(20,14,7,.35) 55%, rgba(20,14,7,.8) 100%)" }}
        />
        {/* Logo La Mora piccolo in alto a sinistra, sotto l'header (che sulla
            hero non mostra il logo): porta alla home nella lingua corrente.
            Velatura radiale scura dietro (come il logo Villa Relax) per il
            contrasto su cielo e foglie; assoluto e con misure fisse, nessun
            layout shift. */}
        <Link href={withLocale(locale, "/")} className="absolute left-6 top-[100px] z-[2] block sm:left-10 sm:top-[116px]">
          <span
            aria-hidden="true"
            className="absolute -inset-x-[45%] -inset-y-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(20,14,7,0.5),rgba(20,14,7,0))]"
          />
          <Image
            src="/images/logo/logo-bianco-agriturismo-la-mora.png"
            alt="Agriturismo La Mora"
            width={1448}
            height={1086}
            sizes="(max-width: 640px) 54px, 86px"
            loading="eager"
            className="relative h-10 w-auto sm:h-16"
          />
        </Link>
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-14 text-center sm:px-10 sm:pb-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/80">{text.heroLabel}</span>
          <h1 className="mt-4 font-display text-[clamp(30px,4.8vw,52px)] font-normal leading-[1.12] text-cream [text-wrap:balance]">{text.heroTitle}</h1>
          <p className="mt-4 text-[11px] text-cream/75">{credit}</p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[760px] px-6 sm:px-10">
          <Reveal>
            <p className="font-display text-[clamp(21px,2.6vw,27px)] leading-[1.5] text-ink [text-wrap:pretty]">{text.intro}</p>
            <p className="mt-6 text-[15px] leading-[1.85] text-ink-soft">{text.taste}</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="convenzione-heading" className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.offerLabel}</span>
            <h2 id="convenzione-heading" className="mt-3 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.offerHeading}
            </h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {CARFAGNA_OFFERS.map((offer) => {
              const o = offer.text[locale];
              return (
                <li key={offer.id} className="flex flex-col rounded-[6px] border border-ink/10 bg-cream px-6 py-7 shadow-[0_18px_40px_-30px_rgba(36,31,23,0.45)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-dim text-raspberry">
                    <OfferIcon id={offer.id} />
                  </span>
                  <h3 className="mt-5 font-display text-[23px] font-normal leading-[1.2] text-ink">{o.title}</h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-soft">{o.who}</p>
                  <p className="mt-4 font-display text-[44px] leading-none text-raspberry [font-variant-numeric:lining-nums]">{o.price}</p>
                  <p className="mt-4 text-[14px] leading-[1.7] text-ink-soft">{o.detail}</p>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 rounded-[4px] border-l-2 border-gold bg-cream/70 px-5 py-4 text-[15px] font-semibold leading-[1.6] text-ink">{CARFAGNA_SHOW_TEXT[locale].page}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {/* PDF statico in public/downloads/ (scripts/build-carfagna-pdf.mjs). */}
            <a
              href={carfagnaPdfHref(locale)}
              download
              className="inline-flex min-h-[46px] items-center gap-2.5 rounded-lg bg-olive-950 px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-cream transition-colors hover:bg-olive-900"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {text.ctaPdf}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center rounded-lg border border-ink/20 px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-ink transition-colors hover:border-raspberry hover:text-raspberry"
            >
              {text.ctaWhatsapp}
            </a>
            <BookingModalButton className="inline-flex min-h-[46px] items-center gap-2.5 rounded-lg bg-raspberry px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-cream transition-colors hover:bg-[#8a3844]">
              {text.ctaBook}
              <span aria-hidden="true">→</span>
            </BookingModalButton>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.galleryLabel}</span>
            <h2 className="mt-3 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink">{text.galleryHeading}</h2>
          </Reveal>
          <div className="mt-8">
            <ApartmentGallery images={gallery} locale={locale} mark="none" />
          </div>
          <p className="mt-3 text-[12px] text-ink-soft">{credit}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ExternalLink
              href={CARFAGNA.facebookAlbumUrl}
              className="inline-flex min-h-[44px] items-center rounded-lg bg-olive-950 px-5 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-olive-900"
            >
              {text.facebookAlbum}
            </ExternalLink>
            <ExternalLink href={CARFAGNA.facebookUrl} className={`text-[13px] font-semibold ${LINK_CLASS}`}>
              {text.facebookPage}
            </ExternalLink>
          </div>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 px-6 sm:px-10 md:grid-cols-2">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.whereLabel}</span>
            <h2 className="mt-3 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">{text.whereHeading}</h2>
            <address className="mt-5 text-[15px] not-italic leading-[1.7] text-ink">
              {CARFAGNA.name}
              <br />
              {CARFAGNA.addressDisplay}
            </address>
            <p className="mt-2 text-[14px] leading-[1.7] text-ink-soft">{text.distance(CARFAGNA.fromLaMora.km, CARFAGNA.fromLaMora.minutes)}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <ExternalLink href={CARFAGNA.mapsUrl} className={`text-[13px] font-semibold ${LINK_CLASS}`}>
                {text.maps}
              </ExternalLink>
              <ExternalLink href={CARFAGNA.officialUrl} className={`text-[13px] font-semibold ${LINK_CLASS}`}>
                {text.officialSite}
              </ExternalLink>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.laMoraLabel}</span>
            <h2 className="mt-3 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">{text.laMoraHeading}</h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-ink-soft">{text.laMoraBody}</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li>
                <Link href={withLocale(locale, "/agriturismo-con-colazione-inclusa-assisi/")} className={LINK_CLASS}>
                  {text.colazione}
                </Link>
              </li>
              <li>
                <Link href={withLocale(locale, "/alloggi/")} className={LINK_CLASS}>
                  {text.alloggi}
                </Link>
              </li>
              <li>
                <Link href={withLocale(locale, "/territorio/")} className={LINK_CLASS}>
                  {text.territorio}
                </Link>
              </li>
            </ul>
            {articles.length > 0 && (
              <>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">{text.blogAssisi}</p>
                <ul className="mt-2 space-y-2 text-[14px]">
                  {articles.map((post) => (
                    <li key={post.slug}>
                      <Link href={withLocale(locale, `/blog/${post.slug}/`)} className={LINK_CLASS}>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.faqLabel}</span>
          <div className="mt-6">
            <FaqAccordion items={text.faq} />
          </div>
        </div>
      </section>
    </>
  );
}
