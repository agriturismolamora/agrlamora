import type { ZodiacKey } from "@/components/zodiac-mark";
import type { Locale } from "@/lib/i18n";

/* Guida di benvenuto: NON più un link Drive scaricabile (rimosso su
   richiesta del titolare) — il pulsante apre la chat WhatsApp
   dell'agriturismo, dove la guida è già pronta da scaricare. */
const BROCHURE_MSG: Record<Locale, string> = {
  it: "Ciao! Vorrei ricevere la guida di benvenuto di Agriturismo La Mora.",
  en: "Hi! I'd like to receive the Agriturismo La Mora welcome guide.",
  fr: "Bonjour ! Je voudrais recevoir le guide de bienvenue d'Agriturismo La Mora.",
  de: "Hallo! Ich hätte gerne den Willkommensguide von Agriturismo La Mora.",
};
export function getBrochureWhatsappUrl(locale: Locale): string {
  return `https://wa.me/393934363917?text=${encodeURIComponent(BROCHURE_MSG[locale])}`;
}
/* Retro-compatibilità per import esistenti (pagine italiane). */
export const BROCHURE_WHATSAPP_URL = getBrochureWhatsappUrl("it");

export type Apartment = {
  slug: string;
  name: string;
  zodiac: ZodiacKey;
  image: string;
  alt: string;
  href: string;
  petFriendly?: boolean;
  /* Dati reali confermati (occupazione/letti/bagni/mq), stesso formato
     "Specifiche" già usato in ogni scheda appartamento del sito — non i
     numeri discordanti che comparivano nei paragrafi descrittivi (es.
     "55 mq" per Sagittario/Gemelli, corretto a 45 dal titolare). */
  maxGuests: number;
  beds: number;
  bathrooms: number;
  sqm: number;
  /* Confermato dal titolare: Pesci, Sagittario e Gemelli sono a piano
     terra; Acquario e Bilancia al primo piano. */
  floor: "Piano terra" | "Primo piano";
};

/* Stesse route già usate nel dropdown "Alloggi" dell'header (non
   duplicate/inventate: i valori coincidono con quelli in site-header.tsx,
   fonte di verità per gli slug finché non esiste un CMS/dati condivisi).
   Ordine: Gemelli, Bilancia, Pesci, Acquario, Sagittario — sequenza scelta
   per il carousel della homepage. */
export const APARTMENTS: Apartment[] = [
  {
    slug: "gemelli",
    name: "Gemelli",
    zodiac: "gemelli",
    image: "/images/alloggi/appartamento gemelli/stanza letto app gemelli.jpeg",
    alt: "Camera da letto dell'appartamento Gemelli, Agriturismo La Mora",
    href: "/alloggi/gemelli/",
    petFriendly: true,
    maxGuests: 4,
    beds: 4,
    bathrooms: 1,
    sqm: 45,
    floor: "Piano terra",
  },
  {
    slug: "bilancia",
    name: "Bilancia",
    zodiac: "bilancia",
    image: "/images/alloggi/appartamento bilancia/foto letto matrimoniale verticale bilancia.jpeg",
    alt: "Camera da letto dell'appartamento Bilancia, Agriturismo La Mora",
    href: "/alloggi/bilancia/",
    maxGuests: 8,
    beds: 8,
    bathrooms: 1,
    sqm: 75,
    floor: "Primo piano",
  },
  {
    slug: "pesci",
    name: "Pesci",
    zodiac: "pesci",
    image: "/images/alloggi/appartamento pesci/vista da davanti letto matrimoniale stanza pesci.jpeg",
    alt: "Camera da letto dell'appartamento Pesci, Agriturismo La Mora",
    href: "/alloggi/pesci/",
    maxGuests: 4,
    beds: 4,
    bathrooms: 1,
    sqm: 45,
    floor: "Piano terra",
  },
  {
    slug: "acquario",
    name: "Acquario",
    zodiac: "acquario",
    image: "/images/alloggi/appartamento acquario/orizzontale letto acquario.jpeg",
    alt: "Camera da letto dell'appartamento Acquario, Agriturismo La Mora",
    href: "/alloggi/acquario/",
    maxGuests: 4,
    beds: 4,
    bathrooms: 1,
    sqm: 45,
    floor: "Primo piano",
  },
  {
    slug: "sagittario",
    name: "Sagittario",
    zodiac: "sagittario",
    /* Unica card con una foto esterna (richiesta esplicita): scelta la
       migliore tra le esterne disponibili — facciata in pietra, portone e
       gazebo privato — verificata anche nel ritaglio verticale 3:4 della
       card, dove resta leggibile. */
    image: "/images/alloggi/appartamento sagittario/gazebo sagittario 1.jpeg",
    alt: "Esterno in pietra dell'appartamento Sagittario con gazebo e giardino privato, Agriturismo La Mora",
    href: "/alloggi/sagittario/",
    petFriendly: true,
    maxGuests: 6,
    beds: 6,
    bathrooms: 1,
    sqm: 45,
    floor: "Piano terra",
  },
];
