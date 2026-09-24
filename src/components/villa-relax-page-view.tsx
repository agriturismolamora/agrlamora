import Image from "next/image";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { StarRow } from "@/components/review-icons";
import { ApartmentGallery } from "@/components/apartment-gallery";
import { MobileCoverflow } from "@/components/mobile-coverflow";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";
import { VillaBookingBar } from "@/components/villa-booking-bar";
import { RichiesteSection } from "@/components/richieste-section";
import { LastMinuteSection } from "@/components/last-minute-section";
import { BbitWidgetCard } from "@/components/bbit-widget-card";
import { bbitOfferteUrl } from "@/lib/bbit-widget-urls";
import {
  VILLA_ADDRESS,
  VILLA_HOST_NAME,
  VILLA_HOST_IMAGE,
  VILLA_CIN,
  VILLA_MAX_GUESTS,
  VILLA_GALLERY,
  VILLA_WHATSAPP_NUMBER,
  getVillaRating,
  getVillaConfigurations,
  getVillaAmenities,
  getVillaOutdoorFeatures,
  getVillaDistances,
} from "@/data/villa";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const VILLA_OFFERS_WIDGET_TEXT: Record<Locale, { label: string; heading: string }> = {
  it: { label: "Offerte in corso", heading: "Le promozioni attive per Villa Relax" },
  en: { label: "Current offers", heading: "Promotions active for Villa Relax" },
  fr: { label: "Offres en cours", heading: "Les promotions actives pour Villa Relax" },
  de: { label: "Aktuelle Angebote", heading: "Derzeit aktive Aktionen für Villa Relax" },
};

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Villa Relax — Villa Indipendente ad Assisi",
    description: "Villa Relax, ad Assisi: villa indipendente con piscina privata, giardino e fino a 16 posti letto su 6 camere da letto. Ideale per gruppi e famiglie numerose nella campagna umbra, vicino alla Basilica di San Francesco.",
  },
  en: {
    title: "Villa Relax — Independent Villa in Assisi",
    description: "Villa Relax, in Assisi: an independent villa with private pool, garden and up to 16 beds across 6 bedrooms. Ideal for groups and large families in the Umbrian countryside, near the Basilica of St. Francis.",
  },
  fr: {
    title: "Villa Relax — Villa Indépendante à Assise",
    description: "Villa Relax, à Assise : villa indépendante avec piscine privée, jardin et jusqu'à 16 couchages sur 6 chambres. Idéale pour les groupes et les grandes familles dans la campagne ombrienne, près de la basilique Saint-François.",
  },
  de: {
    title: "Villa Relax — Unabhängige Villa in Assisi",
    description: "Villa Relax, in Assisi: eine unabhängige Villa mit privatem Pool, Garten und bis zu 16 Betten auf 6 Schlafzimmer. Ideal für Gruppen und große Familien in der umbrischen Landschaft, nahe der Basilika des Heiligen Franziskus.",
  },
};

export function getVillaRelaxMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/villa-relax-assisi/") } };
}

function ParkingIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 16V7.5h2.8a2.6 2.6 0 0 1 0 5.2H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function PoolIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M3 16c1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0 1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 20c1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0 1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12V5.5a2 2 0 1 1 4 0M12 9h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function WholeHouseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 11 12 4l8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 9.5V20h13V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 20v-6h4v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="7" cy="9" r="1.6" fill="currentColor" />
      <circle cx="12" cy="6.5" r="1.6" fill="currentColor" />
      <circle cx="17" cy="9" r="1.6" fill="currentColor" />
      <path d="M12 12c-3 0-5.5 2-5.5 4.3 0 1.7 1.5 2.7 3 2.2.9-.3 1.7-.3 2.5 0 1.5.5 3-.5 3-2.2C15.5 14 13 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 9.5c4.5-4 11.5-4 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 13c3-2.5 7-2.5 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.2 16.5c1.1-.9 2.5-.9 3.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="19.3" r="1" fill="currentColor" />
    </svg>
  );
}
function GardenIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M12 20c0-6.5 5-8.5 8-9-1 4.5-3 8-8 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 20c0-7-5-9.5-8-10 1 5 3 9 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 20v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function KitchenIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="8" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function TvIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 20h6M12 16.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const AMENITY_ICON_BY_INDEX: (() => React.JSX.Element)[] = [PawIcon, ParkingIcon, WifiIcon, GardenIcon, KitchenIcon, TvIcon, PoolIcon, WholeHouseIcon];

const jsonLd = (locale: Locale, maxGuests: number) => ({
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Villa Relax",
  description: "Villa indipendente con piscina privata ad Assisi, fino a 16 ospiti su 6 camere da letto.",
  image: "https://www.lamoraassisi.com/images/villa/villa%20esterna.webp",
  url: `https://www.lamoraassisi.com${withLocale(locale, "/villa-relax-assisi/")}`,
  telephone: "+39 075 8041164",
  email: "agriturismolamora@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Di Bassano, 19",
    addressLocality: "Assisi",
    addressRegion: "PG",
    postalCode: "06081",
    addressCountry: "IT",
  },
  numberOfRooms: 6,
  containsPlace: { "@type": "Accommodation", occupancy: { "@type": "QuantitativeValue", maxValue: maxGuests } },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 9.7,
    bestRating: 10,
    ratingCount: 1,
  },
});

const TEXT: Record<
  Locale,
  {
    heroLabel: string;
    heroBadge: string;
    heroTitle: string;
    heroBody: string;
    presLabel: string;
    presHeading: string;
    presBody: string;
    spaziLabel: string;
    spaziHeading: string;
    spaziBody: string;
    caratteristicheLabel: string;
    caratteristicheHeading: string;
    galleriaLabel: string;
    galleriaHeading: string;
    configurazioniLabel: string;
    configurazioniHeading: string;
    configurazioniBody: string;
    ospitiWord: string;
    camereWord: (n: number) => string;
    piscinaLabel: string;
    piscinaHeading: string;
    piscinaBody: string;
    gestoreLabel: string;
    gestoreHeading: (name: string) => string;
    gestoreBody: (name: string) => string;
    gestoreCta: (name: string) => string;
    recensioniLabel: string;
    suWord: string;
    fonteWord: string;
    doveLabel: string;
    doveHeading: string;
    doveBody: string;
    mapsCta: string;
    territorioCta: string;
    waMsg: string;
  }
> = {
  it: {
    heroLabel: "Villa Relax · Villa indipendente ad Assisi",
    heroBadge: "Locazione esclusiva",
    heroTitle: "Una villa indipendente nella campagna di Assisi.",
    heroBody: "Non uno degli appartamenti di Agriturismo La Mora: una proprietà a sé in locazione esclusiva — tutta per il vostro gruppo, nessun altro ospite — con piscina privata e giardino, pensata per famiglie numerose e gruppi fino a 16 persone.",
    presLabel: "Villa Relax",
    presHeading: "Spazio vero, in aperta campagna umbra.",
    presBody: "Villa Relax è una villa indipendente, arredata con gusto in uno stile classico, a breve distanza da Assisi, affittabile in esclusiva: quando la prenotate, la villa è solo vostra. Non è un appartamento tra altri: è una proprietà a sé, con un proprio giardino e una propria piscina privata, pensata per chi vuole vivere l'Umbria con tutto lo spazio di una casa vera.",
    spaziLabel: "Grandi spazi",
    spaziHeading: "Fino a 16 persone, 6 camere da letto.",
    spaziBody: "Gli interni accoglienti e spaziosi possono ospitare fino a 16 persone, grazie a 6 camere da letto, ciascuna con bagno e doccia privati. Una casa vacanze perfetta per una famiglia numerosa o un grande gruppo di amici che vuole vivere gli spazi insieme, senza rinunciare alla privacy di ognuno.",
    caratteristicheLabel: "Caratteristiche",
    caratteristicheHeading: "Tutto ciò che serve per un soggiorno di gruppo.",
    galleriaLabel: "Galleria",
    galleriaHeading: "Villa Relax in immagini",
    configurazioniLabel: "Configurazioni",
    configurazioniHeading: "Una sola villa, tre modi di prenotarla.",
    configurazioniBody: "Non sono tre ville diverse: è la stessa proprietà, divisa in due porzioni che si possono prenotare separatamente (6 o 10 persone) oppure per intero, tutte e 6 le camere insieme, fino a 16 ospiti.",
    ospitiWord: "ospiti",
    camereWord: (n) => `${n} camere da letto`,
    piscinaLabel: "Piscina e giardino",
    piscinaHeading: "Una piscina privata, un giardino tutto vostro.",
    piscinaBody: "All'esterno, un ampio e curato giardino con piscina privata, lettini e sdraie: il posto ideale per lunghe giornate estive nella campagna umbra, in privacy, senza condividere gli spazi con altri ospiti. Chi viaggia in gruppo può vivere gli esterni insieme — a bordo vasca, sotto il gazebo, o intorno al barbecue.",
    gestoreLabel: "Il gestore",
    gestoreHeading: (name) => `L'accoglienza di ${name}.`,
    gestoreBody: (name) => `Villa Relax è gestita direttamente da ${name}, lo stesso host di Agriturismo La Mora: stesso contatto diretto, stessa disponibilità a rispondere di persona, senza intermediari, per organizzare l'arrivo del vostro gruppo.`,
    gestoreCta: (name) => `Scrivi a ${name} su WhatsApp`,
    recensioniLabel: "Recensioni",
    suWord: "su",
    fonteWord: "Fonte",
    doveLabel: "Dove si trova",
    doveHeading: "Zona campagna, a pochi minuti da Assisi.",
    doveBody: "Villa Relax sorge in zona campagna, vicino ad Assisi e alla Basilica di San Francesco, con la Basilica di Santa Maria degli Angeli, San Damiano e l'Eremo delle Carceri tutti nel raggio di pochi chilometri — comoda anche per chi arriva a Umbria Fiere, a Bastia Umbra.",
    mapsCta: "Apri in Google Maps",
    territorioCta: "Scopri il territorio",
    waMsg: "Ciao! Vorrei informazioni su Villa Relax.",
  },
  en: {
    heroLabel: "Villa Relax · Independent villa in Assisi",
    heroBadge: "Exclusive rental",
    heroTitle: "An independent villa in the Assisi countryside.",
    heroBody: "Not one of Agriturismo La Mora's apartments: a property of its own on an exclusive rental basis — the whole villa for your group, no other guests — with private pool and garden, designed for large families and groups of up to 16 people.",
    presLabel: "Villa Relax",
    presHeading: "Real space, in the open Umbrian countryside.",
    presBody: "Villa Relax is an independent villa, tastefully furnished in a classic style, a short distance from Assisi, available as an exclusive rental: once you book it, the villa is yours alone. It's not one apartment among others: it's a property of its own, with its own garden and its own private pool, designed for those who want to experience Umbria with all the space of a real house.",
    spaziLabel: "Large spaces",
    spaziHeading: "Up to 16 people, 6 bedrooms.",
    spaziBody: "The cosy, spacious interiors can host up to 16 people, thanks to 6 bedrooms, each with private bathroom and shower. A holiday home perfect for a large family or a big group of friends who want to share the space together, without giving up anyone's privacy.",
    caratteristicheLabel: "Features",
    caratteristicheHeading: "Everything needed for a group stay.",
    galleriaLabel: "Gallery",
    galleriaHeading: "Villa Relax in pictures",
    configurazioniLabel: "Configurations",
    configurazioniHeading: "One villa, three ways to book it.",
    configurazioniBody: "These aren't three different villas: it's the same property, divided into two portions that can be booked separately (6 or 10 people) or in full, all 6 bedrooms together, up to 16 guests.",
    ospitiWord: "guests",
    camereWord: (n) => `${n} bedrooms`,
    piscinaLabel: "Pool and garden",
    piscinaHeading: "A private pool, a garden all your own.",
    piscinaBody: "Outside, a large, well-kept garden with a private pool, sunbeds and loungers: the ideal place for long summer days in the Umbrian countryside, in privacy, without sharing the space with other guests. Those travelling in a group can enjoy the outdoors together — poolside, under the gazebo, or around the barbecue.",
    gestoreLabel: "The host",
    gestoreHeading: (name) => `Hosted by ${name}.`,
    gestoreBody: (name) => `Villa Relax is run directly by ${name}, the same host as Agriturismo La Mora: the same direct contact, the same willingness to reply personally, with no intermediaries, to organise your group's arrival.`,
    gestoreCta: (name) => `Write to ${name} on WhatsApp`,
    recensioniLabel: "Reviews",
    suWord: "out of",
    fonteWord: "Source",
    doveLabel: "Where it is",
    doveHeading: "Countryside area, minutes from Assisi.",
    doveBody: "Villa Relax stands in a countryside area, close to Assisi and the Basilica of St. Francis, with the Basilica of Santa Maria degli Angeli, San Damiano and the Eremo delle Carceri hermitage all within a few kilometres — also convenient for those arriving at Umbria Fiere, in Bastia Umbra.",
    mapsCta: "Open in Google Maps",
    territorioCta: "Discover the area",
    waMsg: "Hi! I'd like information about Villa Relax.",
  },
  fr: {
    heroLabel: "Villa Relax · Villa indépendante à Assise",
    heroBadge: "Location exclusive",
    heroTitle: "Une villa indépendante dans la campagne d'Assise.",
    heroBody: "Pas l'un des appartements d'Agriturismo La Mora : une propriété à part entière en location exclusive — toute la villa pour votre groupe, aucun autre hôte — avec piscine privée et jardin, pensée pour les grandes familles et les groupes jusqu'à 16 personnes.",
    presLabel: "Villa Relax",
    presHeading: "Un véritable espace, en pleine campagne ombrienne.",
    presBody: "Villa Relax est une villa indépendante, meublée avec goût dans un style classique, à courte distance d'Assise, louable en exclusivité : une fois réservée, la villa est entièrement à vous. Ce n'est pas un appartement parmi d'autres : c'est une propriété à part entière, avec son propre jardin et sa propre piscine privée, pensée pour ceux qui veulent vivre l'Ombrie avec tout l'espace d'une vraie maison.",
    spaziLabel: "De grands espaces",
    spaziHeading: "Jusqu'à 16 personnes, 6 chambres.",
    spaziBody: "Les intérieurs chaleureux et spacieux peuvent accueillir jusqu'à 16 personnes, grâce à 6 chambres, chacune avec salle de bain et douche privées. Une maison de vacances parfaite pour une grande famille ou un grand groupe d'amis qui veut partager les espaces ensemble, sans renoncer à l'intimité de chacun.",
    caratteristicheLabel: "Caractéristiques",
    caratteristicheHeading: "Tout ce qu'il faut pour un séjour de groupe.",
    galleriaLabel: "Galerie",
    galleriaHeading: "Villa Relax en images",
    configurazioniLabel: "Configurations",
    configurazioniHeading: "Une seule villa, trois façons de la réserver.",
    configurazioniBody: "Ce ne sont pas trois villas différentes : c'est la même propriété, divisée en deux parties réservables séparément (6 ou 10 personnes) ou dans son intégralité, les 6 chambres ensemble, jusqu'à 16 personnes.",
    ospitiWord: "personnes",
    camereWord: (n) => `${n} chambres`,
    piscinaLabel: "Piscine et jardin",
    piscinaHeading: "Une piscine privée, un jardin rien qu'à vous.",
    piscinaBody: "À l'extérieur, un grand jardin soigné avec piscine privée, bains de soleil et transats : l'endroit idéal pour de longues journées d'été dans la campagne ombrienne, en toute intimité, sans partager les espaces avec d'autres hôtes. Ceux qui voyagent en groupe peuvent profiter des extérieurs ensemble — au bord de la piscine, sous le gazebo, ou autour du barbecue.",
    gestoreLabel: "Le gestionnaire",
    gestoreHeading: (name) => `L'accueil de ${name}.`,
    gestoreBody: (name) => `Villa Relax est gérée directement par ${name}, le même hôte qu'Agriturismo La Mora : même contact direct, même disponibilité à répondre en personne, sans intermédiaires, pour organiser l'arrivée de votre groupe.`,
    gestoreCta: (name) => `Écrivez à ${name} sur WhatsApp`,
    recensioniLabel: "Avis",
    suWord: "sur",
    fonteWord: "Source",
    doveLabel: "Où elle se trouve",
    doveHeading: "Zone de campagne, à quelques minutes d'Assise.",
    doveBody: "Villa Relax se trouve en zone de campagne, près d'Assise et de la basilique Saint-François, avec la basilique Sainte-Marie-des-Anges, San Damiano et l'ermitage des Carceri tous à quelques kilomètres — pratique aussi pour ceux qui arrivent à Umbria Fiere, à Bastia Umbra.",
    mapsCta: "Ouvrir dans Google Maps",
    territorioCta: "Découvrir le territoire",
    waMsg: "Bonjour ! Je voudrais des informations sur Villa Relax.",
  },
  de: {
    heroLabel: "Villa Relax · Unabhängige Villa in Assisi",
    heroBadge: "Exklusive Vermietung",
    heroTitle: "Eine unabhängige Villa in der Landschaft von Assisi.",
    heroBody: "Kein Apartment von Agriturismo La Mora: eine eigenständige Immobilie zur exklusiven Vermietung — die ganze Villa für Ihre Gruppe, keine anderen Gäste — mit privatem Pool und Garten, gedacht für große Familien und Gruppen bis zu 16 Personen.",
    presLabel: "Villa Relax",
    presHeading: "Echter Raum, mitten in der umbrischen Landschaft.",
    presBody: "Villa Relax ist eine unabhängige Villa, geschmackvoll im klassischen Stil eingerichtet, in kurzer Entfernung von Assisi, exklusiv mietbar: sobald sie gebucht ist, gehört die Villa ganz Ihnen. Kein Apartment unter anderen: eine eigenständige Immobilie mit eigenem Garten und eigenem privatem Pool, gedacht für alle, die Umbrien mit dem ganzen Raum eines echten Hauses erleben möchten.",
    spaziLabel: "Große Räume",
    spaziHeading: "Bis zu 16 Personen, 6 Schlafzimmer.",
    spaziBody: "Die gemütlichen, geräumigen Innenräume bieten Platz für bis zu 16 Personen, dank 6 Schlafzimmer, jedes mit eigenem Bad und Dusche. Ein Ferienhaus, perfekt für eine große Familie oder eine große Gruppe von Freunden, die die Räume gemeinsam nutzen möchten, ohne auf die Privatsphäre jedes Einzelnen zu verzichten.",
    caratteristicheLabel: "Ausstattung",
    caratteristicheHeading: "Alles, was für einen Gruppenaufenthalt nötig ist.",
    galleriaLabel: "Galerie",
    galleriaHeading: "Villa Relax in Bildern",
    configurazioniLabel: "Konfigurationen",
    configurazioniHeading: "Eine einzige Villa, drei Buchungsmöglichkeiten.",
    configurazioniBody: "Es sind keine drei verschiedenen Villen: es ist dieselbe Immobilie, aufgeteilt in zwei Teile, die separat gebucht werden können (6 oder 10 Personen) oder vollständig, alle 6 Schlafzimmer zusammen, bis zu 16 Gästen.",
    ospitiWord: "Gäste",
    camereWord: (n) => `${n} Schlafzimmer`,
    piscinaLabel: "Pool und Garten",
    piscinaHeading: "Ein privater Pool, ein Garten ganz für Sie.",
    piscinaBody: "Draußen ein großer, gepflegter Garten mit privatem Pool, Sonnenliegen: der ideale Ort für lange Sommertage in der umbrischen Landschaft, in Privatsphäre, ohne die Räume mit anderen Gästen zu teilen. Wer in der Gruppe reist, kann die Außenbereiche gemeinsam genießen — am Pool, unter dem Pavillon oder rund um den Grill.",
    gestoreLabel: "Der Gastgeber",
    gestoreHeading: (name) => `Der Empfang von ${name}.`,
    gestoreBody: (name) => `Villa Relax wird direkt von ${name} geführt, demselben Gastgeber wie Agriturismo La Mora: derselbe direkte Kontakt, dieselbe Bereitschaft, persönlich zu antworten, ohne Vermittler, um die Ankunft Ihrer Gruppe zu organisieren.`,
    gestoreCta: (name) => `Schreiben Sie ${name} auf WhatsApp`,
    recensioniLabel: "Bewertungen",
    suWord: "von",
    fonteWord: "Quelle",
    doveLabel: "Lage",
    doveHeading: "Ländliche Gegend, wenige Minuten von Assisi entfernt.",
    doveBody: "Villa Relax liegt in ländlicher Umgebung, nahe Assisi und der Basilika des Heiligen Franziskus, mit der Basilika Santa Maria degli Angeli, San Damiano und der Einsiedelei Eremo delle Carceri alle im Umkreis weniger Kilometer — auch praktisch für alle, die zur Umbria Fiere in Bastia Umbra kommen.",
    mapsCta: "In Google Maps öffnen",
    territorioCta: "Die Umgebung entdecken",
    waMsg: "Hallo! Ich hätte gerne Informationen zu Villa Relax.",
  },
};

export function VillaRelaxPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const rating = getVillaRating(locale);
  const configurations = getVillaConfigurations(locale);
  const amenities = getVillaAmenities(locale);
  const outdoorFeatures = getVillaOutdoorFeatures(locale);
  const distances = getVillaDistances(locale);
  const whatsappUrl = `https://wa.me/${VILLA_WHATSAPP_NUMBER}?text=${encodeURIComponent(text.waMsg)}`;
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`Villa Relax, ${VILLA_ADDRESS}`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale, VILLA_MAX_GUESTS)) }} />

      <section className="relative flex h-[90vh] min-h-[580px] items-end overflow-hidden">
        <Image
          src="/images/villa/vista esterno della villa.webp"
          alt="Villa Relax, villa indipendente nella campagna di Assisi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.08) 0%, rgba(20,14,7,.4) 55%, rgba(20,14,7,.82) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[960px] px-6 pb-16 text-center sm:px-10 sm:pb-20">
          <Reveal>
            {/* Badge "Locazione esclusiva": richiesta esplicita del titolare
                di rendere questo concetto immediatamente riconoscibile, non
                solo implicito nel testo — stesso stile pillola oro già
                usato altrove nel sito (es. "Sito ufficiale"). */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#1f180e]">
              {text.heroBadge}
            </span>
            <span className="mt-4 block text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/80">{text.heroLabel}</span>
            <h1 className="mt-5 font-display text-[clamp(36px,6.5vw,64px)] font-normal leading-[1.08] text-cream [text-wrap:balance]">
              {text.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-[1.8] text-cream/85">{text.heroBody}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11]">
                <Image
                  src="/images/villa/villa esterno.webp"
                  alt="Esterno di Villa Relax, arredata in stile classico"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
              <div className="order-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.presLabel}</span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  {text.presHeading}
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">{text.presBody}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-20 grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16 sm:mt-24">
              <div className="order-2 sm:order-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.spaziLabel}</span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  {text.spaziHeading}
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">{text.spaziBody}</p>
              </div>
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:order-2 sm:aspect-[16/11]">
                <Image
                  src="/images/villa/sala da pranzo villa interno.webp"
                  alt="Sala da pranzo interna di Villa Relax"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.caratteristicheLabel}</span>
            <h2 className="mt-4 max-w-[560px] font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.caratteristicheHeading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {amenities.map((label, i) => {
                const Icon = AMENITY_ICON_BY_INDEX[i];
                return (
                  <div key={label} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-olive-700">
                      {Icon && <Icon />}
                    </span>
                    <span className="text-[13px] leading-[1.4] text-ink">{label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.galleriaLabel}</span>
            <h2 className="mt-4 font-display text-[clamp(24px,2.6vw,32px)] font-normal leading-[1.2] text-ink">
              {text.galleriaHeading}
            </h2>
          </Reveal>
          <div className="mt-8">
            <ApartmentGallery images={VILLA_GALLERY} locale={locale} />
          </div>
        </div>
      </section>

      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.configurazioniLabel}</span>
            <h2 className="mt-4 max-w-[640px] font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.configurazioniHeading}
            </h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-[1.8] text-ink-soft">{text.configurazioniBody}</p>
          </Reveal>

          {/* Su mobile coverflow (card centrale, vicine oblique ai lati,
              swipe) invece delle tre card impilate — richiesta esplicita,
              stesso pattern del carousel appartamenti della home. Da sm in
              su resta la griglia a 3 colonne di prima. */}
          <div className="mt-12">
            <MobileCoverflow
              ariaLabel={text.configurazioniLabel}
              labels={configurations.map((config) => config.name)}
              items={configurations.map((config, i) => (
                <Reveal key={config.name} delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-[6px] border border-ink/10 bg-cream px-7 py-8">
                    <span className="font-display text-4xl text-raspberry">{config.guests}</span>
                    <span className="mt-1 text-[11px] uppercase tracking-[0.06em] text-ink-soft">{text.ospitiWord}</span>
                    <h3 className="mt-4 font-display text-[19px] font-normal leading-tight text-ink">{config.name}</h3>
                    <p className="mt-2 text-[13px] uppercase tracking-[0.04em] text-ink-soft">{text.camereWord(config.bedrooms)}</p>
                    <p className="mt-4 flex-1 text-[13px] leading-[1.7] text-ink-soft">{config.note}</p>
                  </div>
                </Reveal>
              ))}
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1f180e] py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-14 px-6 sm:grid-cols-2 sm:gap-20 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/villa/piscina esterna della villa.webp"
                alt="Piscina privata di Villa Relax"
                fill
                sizes="(max-width: 640px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">{text.piscinaLabel}</span>
            <p className="mt-6 font-display text-[clamp(26px,3.4vw,38px)] font-normal leading-[1.35] text-cream [text-wrap:balance]">
              {text.piscinaHeading}
            </p>
            <p className="mt-6 max-w-[440px] text-[14px] leading-[1.8] text-cream/65">{text.piscinaBody}</p>
            <ul className="mt-6 space-y-2.5">
              {outdoorFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-cream/70">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src={VILLA_HOST_IMAGE}
                alt={`${VILLA_HOST_NAME}, gestore di Villa Relax`}
                fill
                sizes="(max-width: 640px) 100vw, 280px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.gestoreLabel}</span>
            <h2 className="mt-4 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.gestoreHeading(VILLA_HOST_NAME)}
            </h2>
            <p className="mt-5 max-w-[480px] text-[15px] leading-[1.85] text-ink-soft">{text.gestoreBody(VILLA_HOST_NAME)}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.gestoreCta(VILLA_HOST_NAME)}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto max-w-[720px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.recensioniLabel}</span>
            <div className="mt-6 flex flex-col items-center">
              <span className="font-display text-[64px] leading-none text-raspberry">{rating.value}</span>
              <span className="mt-1 text-[12px] uppercase tracking-[0.08em] text-ink-soft">
                {text.suWord} {rating.scale}
              </span>
              <StarRow rating={rating.value / 2} size={16} locale={locale} />
              <p className="mt-4 font-display text-[18px] italic text-ink">{rating.label}</p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.06em] text-ink-soft">
                {text.fonteWord}: {rating.source} · CIN {VILLA_CIN}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.doveLabel}</span>
            <h2 className="mt-4 max-w-[640px] font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.doveHeading}
            </h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-[1.8] text-ink-soft">{text.doveBody}</p>
          </Reveal>

          <Reveal delay={80}>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/10 pt-8 sm:grid-cols-3 lg:grid-cols-5">
              {distances.map((d) => (
                <div key={d.label}>
                  <dt className="font-display text-2xl text-ink">{d.distance}</dt>
                  <dd className="mt-1 text-[12px] leading-[1.4] text-ink-soft">{d.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-12 flex flex-col items-start gap-6 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
              <address className="text-[14px] not-italic leading-[1.7] text-ink-soft">
                <p className="text-ink">{VILLA_ADDRESS}</p>
              </address>
              <div className="flex flex-wrap gap-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
                >
                  <HoverFill color="#8f4324" />
                  <span className="relative z-10 inline-flex items-center gap-2.5">
                    {text.mapsCta}
                    <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
                {/* <a> pieno, non <Link>: da Villa Relax verso una pagina
                    La Mora attraversa il confine tra i due account
                    bed-and-breakfast.it (vedi rooms-widget-script.tsx). */}
                <a
                  href={withLocale(locale, "/territorio/")}
                  className="inline-flex items-center gap-2.5 rounded-[3px] border border-ink/20 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-raspberry hover:text-raspberry"
                >
                  {text.territorioCta}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <LastMinuteSection struttura="villa" locale={locale} />

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[680px] px-6 sm:px-10">
          <BbitWidgetCard
            label={VILLA_OFFERS_WIDGET_TEXT[locale].label}
            heading={VILLA_OFFERS_WIDGET_TEXT[locale].heading}
            scriptSrc={bbitOfferteUrl("villa")}
            minHeight={120}
            locale={locale}
          />
        </div>
      </section>

      <RichiesteSection struttura="villa" locale={locale} />

      <NewsletterSection locale={locale} />
      <CertificationsMarquee locale={locale} />
      <VillaBookingBar locale={locale} />
    </>
  );
}
