import type { ZodiacKey } from "@/components/zodiac-mark";

export type Apartment = {
  slug: string;
  name: string;
  zodiac: ZodiacKey;
  image: string;
  alt: string;
  href: string;
  petFriendly?: boolean;
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
    image: "/images/alloggi/appartamento gemelli/camera da letto app gemelli.jpeg",
    alt: "Camera da letto dell'appartamento Gemelli, Agriturismo La Mora",
    href: "/alloggi/gemelli/",
    petFriendly: true,
  },
  {
    slug: "bilancia",
    name: "Bilancia",
    zodiac: "bilancia",
    image: "/images/alloggi/appartamento bilancia/letto matrimoniale bilancia.webp",
    alt: "Camera da letto dell'appartamento Bilancia, Agriturismo La Mora",
    href: "/alloggi/bilancia/",
  },
  {
    slug: "pesci",
    name: "Pesci",
    zodiac: "pesci",
    image: "/images/alloggi/appartamento pesci/vista da davanti letto matrimoniale stanza pesci.jpeg",
    alt: "Camera da letto dell'appartamento Pesci, Agriturismo La Mora",
    href: "/alloggi/pesci/",
  },
  {
    slug: "acquario",
    name: "Acquario",
    zodiac: "acquario",
    /* Tutte le foto disponibili per questo appartamento in /public sono
       thumbnail a 120×90px (verificato: nessun file più grande esiste
       nella cartella, .jpeg e .webp inclusi) — cambiata inquadratura per
       scelta del titolare, ma il limite di risoluzione resta lo stesso su
       qualunque file di questa cartella finché non arriva una foto reale
       a risoluzione piena. */
    image: "/images/alloggi/appartamento acquario/letto piu letto a castello acquario.jpeg",
    alt: "Camera da letto dell'appartamento Acquario, Agriturismo La Mora",
    href: "/alloggi/acquario/",
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
  },
];
