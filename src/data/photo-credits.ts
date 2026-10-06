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

/* ---- Blocco C (articoli del blog, ottobre 2026): foto Wikimedia Commons,
   licenze verificate via API Commons (extmetadata) il 06/10/2026. Nessuna
   con volti in primo piano o loghi. Anno nelle didascalie = data di scatto
   riportata da Commons. */

const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const SPOGLIAZIONE_FACCIATA_PHOTO: CreditedPhoto = {
  src: "/images/blog/carlo-acutis/santuario-spogliazione-santa-maria-maggiore-assisi.webp",
  width: 2000,
  height: 1500,
  alt: {
    it: "Facciata in pietra della chiesa di Santa Maria Maggiore ad Assisi, sede del Santuario della Spogliazione, con il rosone",
    en: "Stone façade of the church of Santa Maria Maggiore in Assisi, home of the Sanctuary of Renunciation, with its rose window",
    fr: "Façade en pierre de l'église Santa Maria Maggiore à Assise, siège du Sanctuaire du Dépouillement, avec sa rosace",
    de: "Steinfassade der Kirche Santa Maria Maggiore in Assisi, Sitz des Heiligtums der Entkleidung, mit Fensterrose",
  },
  caption: {
    it: "La facciata di Santa Maria Maggiore, sede del Santuario della Spogliazione (foto del 2023).",
    en: "The façade of Santa Maria Maggiore, home of the Sanctuary of Renunciation (photo from 2023).",
    fr: "La façade de Santa Maria Maggiore, siège du Sanctuaire du Dépouillement (photo de 2023).",
    de: "Die Fassade von Santa Maria Maggiore, Sitz des Heiligtums der Entkleidung (Foto von 2023).",
  },
  credit: { author: "Marta Trullu", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Assisi_-_Chiesa_di_Santa_Maria_Maggiore_-_2023-09-21_13-26-51_001.jpg") },
};

export const SPOGLIAZIONE_ROSONE_PHOTO: CreditedPhoto = {
  src: "/images/blog/carlo-acutis/rosone-santa-maria-maggiore-assisi.webp",
  width: 1600,
  height: 1200,
  alt: {
    it: "Il rosone in pietra della facciata di Santa Maria Maggiore ad Assisi",
    en: "The stone rose window on the façade of Santa Maria Maggiore in Assisi",
    fr: "La rosace en pierre de la façade de Santa Maria Maggiore à Assise",
    de: "Die steinerne Fensterrose an der Fassade von Santa Maria Maggiore in Assisi",
  },
  caption: {
    it: "Il rosone di Santa Maria Maggiore: secondo il santuario vi è incisa la data 1163 (foto del 2026).",
    en: "The rose window of Santa Maria Maggiore: according to the sanctuary, it bears the date 1163 (photo from 2026).",
    fr: "La rosace de Santa Maria Maggiore : selon le sanctuaire, elle porte la date de 1163 (photo de 2026).",
    de: "Die Fensterrose von Santa Maria Maggiore: Laut dem Heiligtum trägt sie die Jahreszahl 1163 (Foto von 2026).",
  },
  credit: { author: "Effems", license: "CC0 1.0", licenseUrl: CC0, source: "Wikimedia Commons", sourceUrl: commons("Santa_Maria_Maggiore_(Assisi)_06_05_2026_03.jpg") },
};

export const SPOGLIAZIONE_VEDUTA_PHOTO: CreditedPhoto = {
  src: "/images/blog/carlo-acutis/santa-maria-maggiore-campanile-assisi.webp",
  width: 1600,
  height: 1203,
  alt: {
    it: "Santa Maria Maggiore e il suo campanile tra le case di Assisi, con la valle sullo sfondo",
    en: "Santa Maria Maggiore and its bell tower among the houses of Assisi, with the valley behind",
    fr: "Santa Maria Maggiore et son clocher parmi les maisons d'Assise, avec la vallée en arrière-plan",
    de: "Santa Maria Maggiore mit Glockenturm zwischen den Häusern von Assisi, im Hintergrund das Tal",
  },
  caption: {
    it: "Santa Maria Maggiore e il campanile tra i tetti di Assisi (foto del 2013).",
    en: "Santa Maria Maggiore and its bell tower among the rooftops of Assisi (photo from 2013).",
    fr: "Santa Maria Maggiore et son clocher parmi les toits d'Assise (photo de 2013).",
    de: "Santa Maria Maggiore und ihr Glockenturm über den Dächern von Assisi (Foto von 2013).",
  },
  credit: { author: "Bbruno", license: "CC BY-SA 3.0", licenseUrl: CC_BY_SA_3, source: "Wikimedia Commons", sourceUrl: commons("Assisi_S_Maria_Maggiore.JPG") },
};

export const ALBERO_GUBBIO_PHOTO: CreditedPhoto = {
  src: "/images/blog/natale-umbria/albero-di-natale-gubbio-2014.webp",
  width: 2200,
  height: 885,
  alt: {
    it: "L'albero di Natale di Gubbio illuminato di notte sulle pendici del Monte Ingino, sopra le mura della città",
    en: "The Gubbio Christmas tree lit up at night on the slopes of Monte Ingino, above the town walls",
    fr: "Le sapin de Noël de Gubbio illuminé la nuit sur les pentes du Monte Ingino, au-dessus des remparts",
    de: "Der Weihnachtsbaum von Gubbio, nachts beleuchtet an den Hängen des Monte Ingino über der Stadtmauer",
  },
  caption: {
    it: "L'albero di Natale di Gubbio sul Monte Ingino (foto del dicembre 2014).",
    en: "The Gubbio Christmas tree on Monte Ingino (photo from December 2014).",
    fr: "Le sapin de Noël de Gubbio sur le Monte Ingino (photo de décembre 2014).",
    de: "Der Weihnachtsbaum von Gubbio am Monte Ingino (Foto von Dezember 2014).",
  },
  credit: { author: "Adri08", license: "CC BY-SA 3.0", licenseUrl: CC_BY_SA_3, source: "Wikimedia Commons", sourceUrl: commons("Sapin_Noel_Geant_Gubbio_2014.jpg") },
};

export const GUBBIO_NATALE_PIAZZA_PHOTO: CreditedPhoto = {
  src: "/images/blog/natale-umbria/gubbio-piazza-san-giovanni-natale-2025.webp",
  width: 1600,
  height: 1200,
  alt: {
    it: "Piazza San Giovanni a Gubbio con le luci di Natale, di sera",
    en: "Piazza San Giovanni in Gubbio with Christmas lights in the evening",
    fr: "La Piazza San Giovanni à Gubbio avec les illuminations de Noël, le soir",
    de: "Die Piazza San Giovanni in Gubbio mit Weihnachtsbeleuchtung am Abend",
  },
  caption: {
    it: "Gubbio, piazza San Giovanni durante le feste (foto del dicembre 2025).",
    en: "Gubbio, Piazza San Giovanni during the festive season (photo from December 2025).",
    fr: "Gubbio, la Piazza San Giovanni pendant les fêtes (photo de décembre 2025).",
    de: "Gubbio, Piazza San Giovanni in der Weihnachtszeit (Foto von Dezember 2025).",
  },
  credit: { author: "Bultro", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Gubbio_-_Piazza_S._Giovanni_a_Natale.jpg") },
};

export const ALBERO_TRASIMENO_PHOTO: CreditedPhoto = {
  src: "/images/blog/albero-natale-trasimeno/albero-di-natale-sul-lago-castiglione-2019.webp",
  width: 1800,
  height: 1012,
  alt: {
    it: "L'albero di Natale di luci disegnato sull'acqua del lago Trasimeno a Castiglione del Lago, di notte",
    en: "The Christmas tree drawn in lights on the water of Lake Trasimeno at Castiglione del Lago, at night",
    fr: "Le sapin de Noël dessiné en lumières sur l'eau du lac Trasimène à Castiglione del Lago, la nuit",
    de: "Der aus Lichtern auf das Wasser des Trasimenischen Sees gezeichnete Weihnachtsbaum bei Castiglione del Lago, nachts",
  },
  caption: {
    it: "L'albero di Natale sull'acqua del Trasimeno (foto del dicembre 2019).",
    en: "The Christmas tree on the water of Lake Trasimeno (photo from December 2019).",
    fr: "Le sapin de Noël sur l'eau du lac Trasimène (photo de décembre 2019).",
    de: "Der Weihnachtsbaum auf dem Wasser des Trasimenischen Sees (Foto von Dezember 2019).",
  },
  credit: { author: "Walter Giannetti", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Albero_di_Natale_sul_lago_(Castiglione_del_Lago).jpg"), cropped: true },
};

export const ROCCA_DEL_LEONE_PHOTO: CreditedPhoto = {
  src: "/images/blog/albero-natale-trasimeno/rocca-del-leone-castiglione-del-lago.webp",
  width: 1600,
  height: 1200,
  alt: {
    it: "Le mura e le torri della Rocca del Leone a Castiglione del Lago",
    en: "The walls and towers of the Rocca del Leone in Castiglione del Lago",
    fr: "Les remparts et les tours de la Rocca del Leone à Castiglione del Lago",
    de: "Mauern und Türme der Rocca del Leone in Castiglione del Lago",
  },
  caption: {
    it: "La Rocca del Leone a Castiglione del Lago (foto del 2015).",
    en: "The Rocca del Leone in Castiglione del Lago (photo from 2015).",
    fr: "La Rocca del Leone à Castiglione del Lago (photo de 2015).",
    de: "Die Rocca del Leone in Castiglione del Lago (Foto von 2015).",
  },
  credit: { author: "Diego Baglieri", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Rocca_del_Leone_-_Castiglione_del_Lago_04.jpg") },
};

export const TRASIMENO_VISTA_PHOTO: CreditedPhoto = {
  src: "/images/blog/albero-natale-trasimeno/lago-trasimeno-da-castiglione-del-lago.webp",
  width: 1600,
  height: 1067,
  alt: {
    it: "Il lago Trasimeno visto dalle mura di Castiglione del Lago, con le torri della rocca",
    en: "Lake Trasimeno seen from the walls of Castiglione del Lago, with the fortress towers",
    fr: "Le lac Trasimène vu des remparts de Castiglione del Lago, avec les tours de la forteresse",
    de: "Der Trasimenische See von der Stadtmauer von Castiglione del Lago aus, mit den Türmen der Festung",
  },
  caption: {
    it: "Il lago Trasimeno visto da Castiglione del Lago (foto del 2018).",
    en: "Lake Trasimeno seen from Castiglione del Lago (photo from 2018).",
    fr: "Le lac Trasimène vu de Castiglione del Lago (photo de 2018).",
    de: "Der Trasimenische See, gesehen von Castiglione del Lago (Foto von 2018).",
  },
  credit: { author: "Federica Cidale", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Lago_Trasimen_visto_da_Castiglione_del_Lago.jpg") },
};

export const RASIGLIA_BORGO_PHOTO: CreditedPhoto = {
  src: "/images/blog/rasiglia/rasiglia-ponticello-cascata.webp",
  width: 2000,
  height: 1240,
  alt: {
    it: "Case in pietra, un ponticello di legno e una cascatella tra i canali di Rasiglia",
    en: "Stone houses, a small wooden bridge and a little waterfall among the channels of Rasiglia",
    fr: "Maisons en pierre, petit pont en bois et cascatelle parmi les canaux de Rasiglia",
    de: "Steinhäuser, eine kleine Holzbrücke und ein kleiner Wasserfall zwischen den Kanälen von Rasiglia",
  },
  caption: {
    it: "Rasiglia, tra case in pietra e canali d'acqua (foto del dicembre 2019).",
    en: "Rasiglia, between stone houses and water channels (photo from December 2019).",
    fr: "Rasiglia, entre maisons en pierre et canaux (photo de décembre 2019).",
    de: "Rasiglia zwischen Steinhäusern und Wasserkanälen (Foto von Dezember 2019).",
  },
  credit: { author: "Iaia quark", license: "CC0 1.0", licenseUrl: CC0, source: "Wikimedia Commons", sourceUrl: commons("Rasiglia.jpg"), cropped: true },
};

export const RASIGLIA_MULINO_PHOTO: CreditedPhoto = {
  src: "/images/blog/rasiglia/mulino-rasiglia.webp",
  width: 2000,
  height: 1174,
  alt: {
    it: "Un antico mulino in pietra affacciato sull'acqua a Rasiglia",
    en: "An old stone mill overlooking the water in Rasiglia",
    fr: "Un ancien moulin en pierre au bord de l'eau à Rasiglia",
    de: "Eine alte Steinmühle am Wasser in Rasiglia",
  },
  caption: {
    it: "Uno dei mulini di Rasiglia (foto del 2022).",
    en: "One of Rasiglia's mills (photo from 2022).",
    fr: "L'un des moulins de Rasiglia (photo de 2022).",
    de: "Eine der Mühlen von Rasiglia (Foto von 2022).",
  },
  credit: { author: "NikonZ7II", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Mill_of_Rasiglia.jpg") },
};

export const RASIGLIA_TELAIO_PHOTO: CreditedPhoto = {
  src: "/images/blog/rasiglia/telaio-rasiglia.webp",
  width: 1600,
  height: 1200,
  alt: {
    it: "Un grande telaio storico conservato a Rasiglia",
    en: "A large historic loom preserved in Rasiglia",
    fr: "Un grand métier à tisser historique conservé à Rasiglia",
    de: "Ein großer historischer Webstuhl in Rasiglia",
  },
  caption: {
    it: "Un telaio storico a Rasiglia, memoria della tradizione tessile del borgo (foto del 2021).",
    en: "A historic loom in Rasiglia, a reminder of the village's weaving tradition (photo from 2021).",
    fr: "Un métier à tisser historique à Rasiglia, témoin de la tradition textile du village (photo de 2021).",
    de: "Ein historischer Webstuhl in Rasiglia, Zeugnis der Webtradition des Dorfes (Foto von 2021).",
  },
  credit: { author: "Manuelarosi", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Rasiglia_2021_03.jpg") },
};

export const RASIGLIA_CASCATELLA_PHOTO: CreditedPhoto = {
  src: "/images/blog/rasiglia/cascatella-rasiglia.webp",
  width: 1600,
  height: 1200,
  alt: {
    it: "Una cascatella d'acqua che scende tra pietre e muschio a Rasiglia",
    en: "A small waterfall flowing over stones and moss in Rasiglia",
    fr: "Une cascatelle qui coule entre pierres et mousse à Rasiglia",
    de: "Ein kleiner Wasserfall zwischen Steinen und Moos in Rasiglia",
  },
  caption: {
    it: "Una delle cascatelle del borgo (foto del 2021).",
    en: "One of the village's little waterfalls (photo from 2021).",
    fr: "L'une des cascatelles du village (photo de 2021).",
    de: "Einer der kleinen Wasserfälle des Dorfes (Foto von 2021).",
  },
  credit: { author: "Manuelarosi", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Rasiglia_2021_08.jpg") },
};
