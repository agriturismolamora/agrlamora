/* Villa Relax — struttura indipendente, stessa proprietà/P.IVA di
   Agriturismo La Mora (03900200548) ma un immobile distinto, con proprio
   indirizzo. Tutti i fatti qui sotto sono stati verificati navigando
   direttamente il sito reale https://www.villaassisi.it/it/ (unica fonte,
   oltre alle foto reali in public/images/villa/) il 5 settembre 2026: nessun
   numero, configurazione o distanza è stato inventato. Il sito reale è
   costruito su piattaforma beb.it (bed-and-breakfast.it) — da lì viene anche
   il punteggio 9.7/10. Per aggiornare: modifica SOLO questo file. */

import type { Locale } from "@/lib/i18n";

export type GalleryImage = { src: string; alt: string };

export const VILLA_ADDRESS = "Via Di Bassano, 19 — 06081 Assisi (PG)";

export const VILLA_HOST_NAME = "Paolo";
export const VILLA_HOST_IMAGE = "/images/villa/paologestoreagriturismolamora.webp";

const VILLA_RATING_LABEL: Record<Locale, string> = {
  it: "Certificato di eccellenza 2026",
  en: "Certificate of Excellence 2026",
  fr: "Certificat d'excellence 2026",
  de: "Zertifikat für Exzellenz 2026",
};

export function getVillaRating(locale: Locale) {
  return { value: 9.7, scale: 10, label: VILLA_RATING_LABEL[locale], source: "Bed-and-Breakfast.it" };
}

export const VILLA_RATING = {
  value: 9.7,
  scale: 10,
  label: VILLA_RATING_LABEL.it,
  source: "Bed-and-Breakfast.it",
};

export const VILLA_CIN = "IT054001B501006646";

/* Non tre ville diverse: un'unica proprietà (6 camere, ciascuna con bagno e
   doccia privati) prenotabile per intero o in due porzioni più piccole. */
const VILLA_CONFIGURATIONS_BY_LOCALE: Record<
  Locale,
  { name: string; guests: number; bedrooms: number; note: string }[]
> = {
  it: [
    { name: "Porzione 6 persone", guests: 6, bedrooms: 3, note: "Una porzione della villa, con 3 delle 6 camere." },
    { name: "Porzione 10 persone", guests: 10, bedrooms: 3, note: "L'altra porzione della villa, con le restanti 3 camere." },
    { name: "Villa intera — 16 persone", guests: 16, bedrooms: 6, note: "L'intera proprietà, tutte e 6 le camere da letto, per un unico grande gruppo o due famiglie insieme." },
  ],
  en: [
    { name: "6-guest portion", guests: 6, bedrooms: 3, note: "One portion of the villa, with 3 of the 6 bedrooms." },
    { name: "10-guest portion", guests: 10, bedrooms: 3, note: "The other portion of the villa, with the remaining 3 bedrooms." },
    { name: "Whole villa — 16 guests", guests: 16, bedrooms: 6, note: "The entire property, all 6 bedrooms together, for one large group or two families sharing." },
  ],
  fr: [
    { name: "Partie 6 personnes", guests: 6, bedrooms: 3, note: "Une partie de la villa, avec 3 des 6 chambres." },
    { name: "Partie 10 personnes", guests: 10, bedrooms: 3, note: "L'autre partie de la villa, avec les 3 chambres restantes." },
    { name: "Villa entière — 16 personnes", guests: 16, bedrooms: 6, note: "La propriété entière, les 6 chambres ensemble, pour un grand groupe ou deux familles réunies." },
  ],
  de: [
    { name: "Teil für 6 Personen", guests: 6, bedrooms: 3, note: "Ein Teil der Villa, mit 3 der 6 Schlafzimmer." },
    { name: "Teil für 10 Personen", guests: 10, bedrooms: 3, note: "Der andere Teil der Villa, mit den restlichen 3 Schlafzimmern." },
    { name: "Ganze Villa — 16 Personen", guests: 16, bedrooms: 6, note: "Die gesamte Immobilie, alle 6 Schlafzimmer zusammen, für eine große Gruppe oder zwei Familien gemeinsam." },
  ],
};

export function getVillaConfigurations(locale: Locale) {
  return VILLA_CONFIGURATIONS_BY_LOCALE[locale];
}

export const VILLA_CONFIGURATIONS = VILLA_CONFIGURATIONS_BY_LOCALE.it;

export const VILLA_MAX_GUESTS = 16;

const VILLA_AMENITIES_BY_LOCALE: Record<Locale, string[]> = {
  it: ["Animali ammessi", "Parcheggio privato ombreggiato", "Wi-Fi gratuito", "Giardino", "Angolo cottura", "Televisione", "Piscina privata", "Intera villa"],
  en: ["Pets allowed", "Private shaded parking", "Free Wi-Fi", "Garden", "Kitchenette", "Television", "Private pool", "Whole villa"],
  fr: ["Animaux acceptés", "Parking privé ombragé", "Wi-Fi gratuit", "Jardin", "Coin cuisine", "Télévision", "Piscine privée", "Villa entière"],
  de: ["Haustiere erlaubt", "Privater schattiger Parkplatz", "Kostenloses WLAN", "Garten", "Kochnische", "Fernseher", "Privater Pool", "Ganze Villa"],
};

export function getVillaAmenities(locale: Locale) {
  return VILLA_AMENITIES_BY_LOCALE[locale];
}

export const VILLA_AMENITIES = VILLA_AMENITIES_BY_LOCALE.it;

const VILLA_OUTDOOR_FEATURES_BY_LOCALE: Record<Locale, string[]> = {
  it: ["Piscina privata con lettini e sdraie", "Gazebo per aperitivi e cene a bordo vasca", "Area barbecue attrezzata", "Campo da calcetto privato in erba", "Tavolo da ping pong"],
  en: ["Private pool with sunbeds and loungers", "Gazebo for poolside drinks and dinners", "Equipped barbecue area", "Private grass five-a-side pitch", "Ping pong table"],
  fr: ["Piscine privée avec bains de soleil et transats", "Gazebo pour apéritifs et dîners au bord de la piscine", "Espace barbecue équipé", "Terrain de football privé en gazon", "Table de ping-pong"],
  de: ["Privater Pool mit Sonnenliegen", "Pavillon für Aperitifs und Abendessen am Pool", "Ausgestatteter Grillbereich", "Privater Rasenfußballplatz", "Tischtennisplatte"],
};

export function getVillaOutdoorFeatures(locale: Locale) {
  return VILLA_OUTDOOR_FEATURES_BY_LOCALE[locale];
}

export const VILLA_OUTDOOR_FEATURES = VILLA_OUTDOOR_FEATURES_BY_LOCALE.it;

/* Distanze reali dalla pagina "Zona" del sito villaassisi.it. */
const VILLA_DISTANCES_BY_LOCALE: Record<Locale, { label: string; distance: string }[]> = {
  it: [
    { label: "Terme Francescane Village (Spello)", distance: "2 km" },
    { label: "Santuario di Rivotorto", distance: "2 km" },
    { label: "Santuario di San Damiano", distance: "4 km" },
    { label: "Stazione di Assisi", distance: "5 km" },
    { label: "Eremo delle Carceri", distance: "5 km" },
    { label: "Basilica di Santa Maria degli Angeli", distance: "5 km" },
    { label: "Rocca Minore", distance: "5 km" },
    { label: "Basilica di San Francesco", distance: "6 km" },
    { label: "Umbria Fiere (Bastia Umbra)", distance: "7 km" },
    { label: "Aeroporto di Perugia — Sant'Egidio", distance: "12 km" },
  ],
  en: [
    { label: "Terme Francescane Village (Spello)", distance: "2 km" },
    { label: "Sanctuary of Rivotorto", distance: "2 km" },
    { label: "Sanctuary of San Damiano", distance: "4 km" },
    { label: "Assisi railway station", distance: "5 km" },
    { label: "Eremo delle Carceri hermitage", distance: "5 km" },
    { label: "Basilica of Santa Maria degli Angeli", distance: "5 km" },
    { label: "Rocca Minore fortress", distance: "5 km" },
    { label: "Basilica of St. Francis", distance: "6 km" },
    { label: "Umbria Fiere (Bastia Umbra)", distance: "7 km" },
    { label: "Perugia Airport — Sant'Egidio", distance: "12 km" },
  ],
  fr: [
    { label: "Terme Francescane Village (Spello)", distance: "2 km" },
    { label: "Sanctuaire de Rivotorto", distance: "2 km" },
    { label: "Sanctuaire de San Damiano", distance: "4 km" },
    { label: "Gare d'Assise", distance: "5 km" },
    { label: "Ermitage des Carceri", distance: "5 km" },
    { label: "Basilique Sainte-Marie-des-Anges", distance: "5 km" },
    { label: "Rocca Minore", distance: "5 km" },
    { label: "Basilique Saint-François", distance: "6 km" },
    { label: "Umbria Fiere (Bastia Umbra)", distance: "7 km" },
    { label: "Aéroport de Pérouse — Sant'Egidio", distance: "12 km" },
  ],
  de: [
    { label: "Terme Francescane Village (Spello)", distance: "2 km" },
    { label: "Wallfahrtskirche Rivotorto", distance: "2 km" },
    { label: "Wallfahrtskirche San Damiano", distance: "4 km" },
    { label: "Bahnhof Assisi", distance: "5 km" },
    { label: "Einsiedelei Eremo delle Carceri", distance: "5 km" },
    { label: "Basilika Santa Maria degli Angeli", distance: "5 km" },
    { label: "Festung Rocca Minore", distance: "5 km" },
    { label: "Basilika des Heiligen Franziskus", distance: "6 km" },
    { label: "Umbria Fiere (Bastia Umbra)", distance: "7 km" },
    { label: "Flughafen Perugia — Sant'Egidio", distance: "12 km" },
  ],
};

export function getVillaDistances(locale: Locale) {
  return VILLA_DISTANCES_BY_LOCALE[locale];
}

export const VILLA_DISTANCES = VILLA_DISTANCES_BY_LOCALE.it;

export const VILLA_GALLERY: GalleryImage[] = [
  { src: "/images/villa/villa esterna.webp", alt: "Villa Relax vista dall'esterno, ad Assisi" },
  { src: "/images/villa/villa esterno.webp", alt: "Esterno di Villa Relax nella campagna umbra" },
  { src: "/images/villa/vista esterno villa dall alto.webp", alt: "Villa Relax vista dall'alto" },
  { src: "/images/villa/vista esterno della villa.webp", alt: "Vista d'insieme di Villa Relax" },
  { src: "/images/villa/villa vista scalinata.webp", alt: "Scalinata d'ingresso di Villa Relax" },
  { src: "/images/villa/esterno villa di notte.webp", alt: "Villa Relax di sera" },
  { src: "/images/villa/esterno villa di notte entrata.webp", alt: "Ingresso di Villa Relax di sera" },
  { src: "/images/villa/piscina esterna della villa.webp", alt: "Piscina privata di Villa Relax" },
  { src: "/images/villa/piscina della villa esterno arredata.webp", alt: "Bordo piscina arredato di Villa Relax" },
  { src: "/images/villa/foto vista giaridno.webp", alt: "Giardino di Villa Relax" },
  { src: "/images/villa/gazebo arredato villa esterno.webp", alt: "Gazebo esterno arredato di Villa Relax" },
  { src: "/images/villa/esterno con barbeque.webp", alt: "Area barbecue di Villa Relax" },
  { src: "/images/villa/esterno giochi.webp", alt: "Spazio giochi esterno di Villa Relax" },
  { src: "/images/villa/sala da pranzo villa interno.webp", alt: "Sala da pranzo interna di Villa Relax" },
];

export const VILLA_WHATSAPP_NUMBER = "393934363917";
