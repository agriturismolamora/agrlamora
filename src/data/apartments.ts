import type { ZodiacKey } from "@/components/zodiac-mark";

/* Brochure di benvenuto in PDF, creata dal titolare (Paolo) e condivisa via
   Google Drive: id estratto dal link di condivisione, formato "uc" per
   forzare il download diretto invece di aprire l'anteprima Drive. */
export const BROCHURE_PDF_URL = "https://drive.google.com/uc?export=download&id=1_sqDWQk6uWS4k8QzcS2mdxbTxhO7SOFM";

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
    /* Le foto "camera da letto" di questo appartamento in /public sono
       thumbnail 120×90px (non l'originale): usata invece l'unica foto
       interna a risoluzione reale (1600×1200) disponibile nella cartella. */
    image: "/images/alloggi/appartamento sagittario/arredamento tavolo sagittario.jpeg",
    alt: "Interno arredato dell'appartamento Sagittario, Agriturismo La Mora",
    href: "/alloggi/sagittario/",
    petFriendly: true,
    maxGuests: 6,
    beds: 6,
    bathrooms: 1,
    sqm: 45,
    floor: "Piano terra",
  },
];
