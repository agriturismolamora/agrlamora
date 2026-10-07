import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { dict, t } from "@/lib/dictionary";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { APARTMENTS, type Apartment } from "@/data/apartments";
import { getApartmentDetails } from "@/data/apartment-details";
import { VILLA_LOGO_BLACK, VILLA_MAX_GUESTS } from "@/data/villa";

/* Dati strutturati (JSON-LD) in un unico @graph per pagina, stampato da
   <StructuredData> (src/components/structured-data.tsx). Gli @id sono
   stabili, uguali in tutte le lingue, e collegano i nodi tra loro:
   - WebSite e LodgingBusiness di La Mora: su ogni pagina;
   - Apartment, uno per appartamento di apartments.ts: home, /alloggi/ e
     scheda dell'appartamento;
   - Villa Relax: LodgingBusiness a sé, solo sulle pagine Villa;
   - BreadcrumbList: su tutte le pagine interne;
   - Article e FAQPage: dove la pagina li mostra.
   Solo fatti di PROJECT-BRIEF.md e dei file in src/data; niente
   AggregateRating né Review. */

export type JsonLdNode = Record<string, unknown>;

export const LD_ID = {
  website: `${SITE_URL}/#website`,
  lamora: `${SITE_URL}/#lodgingbusiness`,
  villa: `${SITE_URL}/villa-relax-assisi/#lodgingbusiness`,
  apartment: (href: string) => `${SITE_URL}${href}#apartment`,
};

/* Profili ufficiali in sameAs: pagina Facebook e scheda Google Maps. Gli
   URL dei profili Booking, TripAdvisor e bed-and-breakfast.it non sono nel
   codice: si aggiungono qui quando il titolare li fornisce. */
const FACEBOOK_URL = "https://www.facebook.com/p/Agriturismo-la-Mora-di-Assisi-100066662774182/";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/?q=place_id:ChIJ6cNo016cLhMR7KOqeC82Wic";

/* Segnaposto della scheda Google Maps (place_id qui sopra), letto il
   07/10/2026. La scheda mostra il CAP 06181: qui resta 06081 (brief). */
const GEO = { latitude: 43.0440922, longitude: 12.5725421 };

const PHONE = "+39 393 4363917";
const EMAIL = "agriturismolamora@gmail.com";

const LAMORA_TEXT: Record<Locale, { description: string; petsAllowed: string; amenities: string[] }> = {
  it: {
    description: "Agriturismo nella campagna di Assisi: 5 appartamenti indipendenti, piscina stagionale, parcheggio gratuito, prenotazione diretta.",
    petsAllowed: "Gemelli e Sagittario",
    amenities: [
      "Piscina all'aperto stagionale (1° maggio – 28 settembre, 9:00–19:00)",
      "Parcheggio gratuito",
      "Wi-Fi",
      "Aria condizionata",
      "Colonnina di ricarica per auto elettriche da 22 kW",
      "Barbecue in comune",
      "Lavatrice in comune",
    ],
  },
  en: {
    description: "Farm stay in the Assisi countryside: 5 independent apartments, seasonal pool, free parking, direct booking.",
    petsAllowed: "Gemelli and Sagittario",
    amenities: [
      "Seasonal outdoor pool (1 May – 28 September, 9am–7pm)",
      "Free parking",
      "Wi-Fi",
      "Air conditioning",
      "22 kW electric car charging point",
      "Shared barbecue",
      "Shared washing machine",
    ],
  },
  fr: {
    description: "Agritourisme dans la campagne d'Assise : 5 appartements indépendants, piscine saisonnière, parking gratuit, réservation directe.",
    petsAllowed: "Gemelli et Sagittario",
    amenities: [
      "Piscine extérieure saisonnière (1er mai – 28 septembre, 9h–19h)",
      "Parking gratuit",
      "Wi-Fi",
      "Climatisation",
      "Borne de recharge pour voitures électriques de 22 kW",
      "Barbecue commun",
      "Lave-linge commun",
    ],
  },
  de: {
    description: "Agriturismo in der Landschaft von Assisi: 5 unabhängige Ferienwohnungen, saisonaler Pool, kostenloser Parkplatz, Direktbuchung.",
    petsAllowed: "Gemelli und Sagittario",
    amenities: [
      "Saisonaler Außenpool (1. Mai – 28. September, 9–19 Uhr)",
      "Kostenloser Parkplatz",
      "WLAN",
      "Klimaanlage",
      "22-kW-Ladestation für Elektroautos",
      "Gemeinsamer Grill",
      "Gemeinsame Waschmaschine",
    ],
  },
};

const APARTMENT_WORD: Record<Locale, string> = { it: "Appartamento", en: "Apartment", fr: "Appartement", de: "Apartment" };

const FLOOR: Record<Locale, Record<Apartment["floor"], string>> = {
  it: { "Piano terra": "Piano terra", "Primo piano": "Primo piano" },
  en: { "Piano terra": "Ground floor", "Primo piano": "First floor" },
  fr: { "Piano terra": "Rez-de-chaussée", "Primo piano": "Premier étage" },
  de: { "Piano terra": "Erdgeschoss", "Primo piano": "Erster Stock" },
};

/* Pesci, Acquario e Bilancia (PROJECT-BRIEF.md, sezione 2). */
const SMALL_PETS_ONLY: Record<Locale, string> = {
  it: "Solo animali di piccola taglia, previo accordo con il proprietario",
  en: "Small pets only, by prior agreement with the owner",
  fr: "Uniquement les animaux de petite taille, après accord avec le propriétaire",
  de: "Nur kleine Haustiere, nach vorheriger Absprache mit dem Eigentümer",
};

const VILLA_DESCRIPTION: Record<Locale, string> = {
  it: "Villa indipendente in locazione esclusiva a Rivotorto di Assisi, con piscina privata e giardino: fino a 16 ospiti in 6 camere da letto.",
  en: "Independent villa rented exclusively in Rivotorto di Assisi, with a private pool and garden: up to 16 guests in 6 bedrooms.",
  fr: "Villa indépendante en location exclusive à Rivotorto di Assisi, avec piscine privée et jardin : jusqu'à 16 personnes dans 6 chambres.",
  de: "Unabhängige Villa zur exklusiven Vermietung in Rivotorto di Assisi, mit privatem Pool und Garten: bis zu 16 Gäste in 6 Schlafzimmern.",
};

const absolute = (locale: Locale, path: string) => `${SITE_URL}${withLocale(locale, path)}`;

function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": LD_ID.website,
    url: `${SITE_URL}/`,
    name: "Agriturismo La Mora",
    inLanguage: ["it", "en", "fr", "de"],
    publisher: { "@id": LD_ID.lamora },
    // Chi ha realizzato il sito: lo stesso credito del footer.
    creator: { "@type": "Organization", name: "Agria System", url: "https://agriasystem.com" },
  };
}

function lamoraNode(locale: Locale): JsonLdNode {
  const text = LAMORA_TEXT[locale];
  return {
    "@type": "LodgingBusiness",
    "@id": LD_ID.lamora,
    name: "Agriturismo La Mora",
    description: text.description,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo/logo agriturismo la mora.png"), width: 1448, height: 1086 },
    image: absoluteUrl("/images/piscina/piscina agriturismo la mora.webp"),
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Fonte Citerna, 7",
      postalCode: "06081",
      addressLocality: "Assisi",
      addressRegion: "PG",
      addressCountry: "IT",
    },
    geo: { "@type": "GeoCoordinates", ...GEO },
    hasMap: GOOGLE_MAPS_URL,
    numberOfRooms: APARTMENTS.length,
    petsAllowed: text.petsAllowed,
    amenityFeature: text.amenities.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    containsPlace: APARTMENTS.map((apt) => ({ "@id": LD_ID.apartment(apt.href) })),
    sameAs: [FACEBOOK_URL, GOOGLE_MAPS_URL],
  };
}

/* Nodi presenti su ogni pagina. */
export function siteNodes(locale: Locale): JsonLdNode[] {
  return [websiteNode(), lamoraNode(locale)];
}

export function apartmentName(locale: Locale, apt: Apartment): string {
  return `${APARTMENT_WORD[locale]} ${apt.name}`;
}

export function apartmentNode(locale: Locale, apt: Apartment): JsonLdNode {
  const detail = getApartmentDetails(locale)[apt.slug];
  return {
    "@type": "Apartment",
    "@id": LD_ID.apartment(apt.href),
    name: apartmentName(locale, apt),
    ...(detail ? { description: detail.tagline } : {}),
    url: absolute(locale, apt.href),
    image: absoluteUrl(apt.image),
    occupancy: { "@type": "QuantitativeValue", maxValue: apt.maxGuests },
    floorSize: { "@type": "QuantitativeValue", value: apt.sqm, unitCode: "MTK" },
    numberOfBathroomsTotal: apt.bathrooms,
    floorLevel: FLOOR[locale][apt.floor],
    petsAllowed: apt.petFriendly ? true : SMALL_PETS_ONLY[locale],
    containedInPlace: { "@id": LD_ID.lamora },
  };
}

export function apartmentNodes(locale: Locale): JsonLdNode[] {
  return APARTMENTS.map((apt) => apartmentNode(locale, apt));
}

export function villaNode(locale: Locale): JsonLdNode {
  return {
    "@type": "LodgingBusiness",
    "@id": LD_ID.villa,
    name: "Villa Relax",
    description: VILLA_DESCRIPTION[locale],
    url: absolute(locale, "/villa-relax-assisi/"),
    logo: { "@type": "ImageObject", url: absoluteUrl(VILLA_LOGO_BLACK.src), width: VILLA_LOGO_BLACK.width, height: VILLA_LOGO_BLACK.height },
    image: absoluteUrl("/images/villa/villa esterna.webp"),
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via di Bassano, 19",
      postalCode: "06081",
      addressLocality: "Rivotorto di Assisi",
      addressRegion: "PG",
      addressCountry: "IT",
    },
    numberOfRooms: 6,
    containsPlace: { "@type": "Accommodation", name: "Villa Relax", occupancy: { "@type": "QuantitativeValue", maxValue: VILLA_MAX_GUESTS } },
  };
}

/* FAQPage di una pagina: solo domande e risposte visibili in pagina. */
export function faqPageNode(locale: Locale, path: string, items: { question: string; answer: string }[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${absolute(locale, path)}#faq`,
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/* Etichette delle briciole: voci di menu dove esistono, altrimenti i
   titoli delle pagine. Le schede (appartamenti, articoli) passano il nome. */
const HOME_LABEL: Record<Locale, string> = { it: "Home", en: "Home", fr: "Accueil", de: "Startseite" };
const NAV_LABEL: Record<string, keyof (typeof dict)["nav"]> = {
  "/alloggi/": "alloggi",
  "/villa-relax-assisi/": "villaRelax",
  "/blog/": "blog",
  "/chi-siamo/": "chiSiamo",
  "/territorio/": "territorio",
  "/agriturismo-con-colazione-inclusa-assisi/": "colazioneBio",
  "/offerte/": "offerte",
  "/offerte/cofanetti-regalo/": "cofanettiRegalo",
  "/offerte/smartbox/": "smartbox",
  "/ottavo-centenario-san-francesco/": "ottavoCentenario",
  "/agriturismo-famiglie-ad-assisi-e-dintorni/": "attivita",
};
const PAGE_LABEL: Record<string, Record<Locale, string>> = {
  "/piscina/": { it: "Piscina", en: "Swimming pool", fr: "Piscine", de: "Pool" },
  "/privacy/": { it: "Informativa sulla privacy", en: "Privacy Policy", fr: "Politique de Confidentialité", de: "Datenschutzerklärung" },
  "/cookie-policy/": { it: "Informativa sui cookie", en: "Cookie Policy", fr: "Politique de Cookies", de: "Cookie-Richtlinie" },
  "/termini-e-condizioni/": { it: "Termini e Condizioni", en: "Terms and Conditions", fr: "Conditions Générales", de: "Allgemeine Geschäftsbedingungen" },
};

function crumbLabel(locale: Locale, path: string): string | undefined {
  const nav = NAV_LABEL[path];
  return nav ? t("nav", nav, locale) : PAGE_LABEL[path]?.[locale];
}

export function breadcrumbNode(locale: Locale, path: string, lastName?: string): JsonLdNode {
  const segments = path.split("/").filter(Boolean);
  const trail = [{ name: HOME_LABEL[locale], path: "/" }];
  segments.forEach((_, i) => {
    const crumbPath = `/${segments.slice(0, i + 1).join("/")}/`;
    const name = (i === segments.length - 1 && lastName) || crumbLabel(locale, crumbPath);
    // Errore in build, non una briciola vuota in produzione.
    if (!name) throw new Error(`BreadcrumbList: nessuna etichetta per ${crumbPath}`);
    trail.push({ name, path: crumbPath });
  });
  return {
    "@type": "BreadcrumbList",
    "@id": `${absolute(locale, path)}#breadcrumb`,
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absolute(locale, crumb.path),
    })),
  };
}

/* Testo dello script: "<" escapato, così nessuna stringa può chiudere il tag. */
export function graphJson(nodes: JsonLdNode[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}
