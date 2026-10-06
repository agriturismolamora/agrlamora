import type { Locale } from "@/lib/i18n";

/* Foto di terzi con licenza libera usate nel sito: UNICA fonte per file,
   autore, licenza e pagina d'origine, così l'attribuzione è identica in
   articolo, card e popup. Licenze verificate sulla pagina di ogni foto il
   06/10/2026 (Wikimedia Commons: API extmetadata; Flickr: pagina della foto
   e oEmbed). Solo CC0, CC BY, CC BY-SA. Mai la filigrana del logo La Mora su
   queste foto (vedi watermarked-image.tsx). */

export type PhotoCredit = {
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
  /* Pagina del file sulla piattaforma d'origine. */
  sourceUrl: string;
  /* true se il file pubblicato è un ritaglio dell'originale. */
  cropped?: boolean;
};

export type CreditedPhoto = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
  /* Didascalia onesta: edizione/anno reali dello scatto. */
  caption: Record<Locale, string>;
  credit: PhotoCredit;
};

/* Eurochocolate 2024 (scattata il 16/11/2024), Piazza IV Novembre.
   Originale 5504×6880 verticale: pubblicato un ritaglio orizzontale 16:9
   (fascia dal 30% al 75% dell'altezza, senza le persone in primo piano),
   2000×1125, webp. */
export const EUROCHOCOLATE_2024_PHOTO: CreditedPhoto = {
  src: "/images/blog/eurochocolate/eurochocolate-2024-piazza-iv-novembre-perugia.webp",
  width: 2000,
  height: 1125,
  alt: {
    it: "Folla in piazza IV Novembre a Perugia durante Eurochocolate 2024, con la Fontana Maggiore e il fianco della Cattedrale di San Lorenzo",
    en: "Crowds in Piazza IV Novembre, Perugia, during Eurochocolate 2024, with the Fontana Maggiore and the side of the Cathedral of San Lorenzo",
    fr: "Foule sur la Piazza IV Novembre à Pérouse pendant Eurochocolate 2024, avec la Fontana Maggiore et le flanc de la cathédrale San Lorenzo",
    de: "Menschenmenge auf der Piazza IV Novembre in Perugia während der Eurochocolate 2024, mit der Fontana Maggiore und der Seitenfassade der Kathedrale San Lorenzo",
  },
  caption: {
    it: "Piazza IV Novembre a Perugia durante Eurochocolate 2024.",
    en: "Piazza IV Novembre in Perugia during Eurochocolate 2024.",
    fr: "La Piazza IV Novembre à Pérouse pendant Eurochocolate 2024.",
    de: "Die Piazza IV Novembre in Perugia während der Eurochocolate 2024.",
  },
  credit: {
    author: "Flavia Ruffinelli",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Eurochocolate_2024_a_Perugia.jpg",
    cropped: true,
  },
};

/* Città del Cioccolato, Perugia (scattata il 19/05/2026): NON è una foto di
   Eurochocolate, va sempre presentata come tale. Originale 3648×2736,
   pubblicato intero ridimensionato a 1600×1200, webp. */
export const CIOCCOLATO_FUSO_PHOTO: CreditedPhoto = {
  src: "/images/blog/eurochocolate/cioccolato-fuso-citta-del-cioccolato-perugia-2026.webp",
  width: 1600,
  height: 1200,
  alt: {
    it: "Cioccolato fuso che scende in una vasca di lavorazione in acciaio alla Città del Cioccolato di Perugia",
    en: "Melted chocolate pouring into a steel processing tank at the Città del Cioccolato in Perugia",
    fr: "Chocolat fondu coulant dans une cuve de travail en acier à la Città del Cioccolato de Pérouse",
    de: "Geschmolzene Schokolade fließt in ein Verarbeitungsbecken aus Stahl in der Città del Cioccolato in Perugia",
  },
  caption: {
    it: "Cioccolato fuso alla Città del Cioccolato di Perugia, maggio 2026 (foto scattata al museo, non durante Eurochocolate).",
    en: "Melted chocolate at the Città del Cioccolato in Perugia, May 2026 (taken at the museum, not during Eurochocolate).",
    fr: "Chocolat fondu à la Città del Cioccolato de Pérouse, mai 2026 (photo prise au musée, pas pendant Eurochocolate).",
    de: "Geschmolzene Schokolade in der Città del Cioccolato in Perugia, Mai 2026 (im Museum aufgenommen, nicht während der Eurochocolate).",
  },
  credit: {
    author: "Tery14",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "Flickr",
    sourceUrl: "https://www.flickr.com/photos/90533773@N06/55440515180/",
  },
};
