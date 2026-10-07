import type { Locale } from "@/lib/i18n";

/* Foto di terzi con licenza libera usate nel sito: UNICA fonte per file,
   autore, licenza e pagina d'origine, così l'attribuzione è identica in
   articolo, card e popup. Licenze verificate sulla pagina di ogni foto il
   06/10/2026 e il 07/10/2026 (Wikimedia Commons: API extmetadata, pagina
   del file e richieste di cancellazione). Solo CC0, CC BY, CC BY-SA, solo
   Wikimedia Commons (dal 07/10/2026 niente più Flickr).

   Soglia di qualità (ottobre 2026): copertine >= 2400 px sul lato lungo,
   foto interne >= 1600 px, mai ingrandite oltre la risoluzione nativa del
   ritaglio. File HD con nomi nuovi (es. "-2400"), così la CDN non serve
   versioni vecchie. Mai la filigrana del logo La Mora su
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
   2400×1350, webp (stessa inquadratura della versione 2000×1125). */
export const EUROCHOCOLATE_2024_PHOTO: CreditedPhoto = {
  src: "/images/blog/eurochocolate/eurochocolate-2024-piazza-iv-novembre-perugia-2400.webp",
  width: 2400,
  height: 1350,
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

/* Cioccolato fondente fuso (Wikimedia Commons, 10/02/2013): foto
   ILLUSTRATIVA, non di Eurochocolate né di Perugia — va sempre presentata
   così. Sostituisce la foto Flickr della Città del Cioccolato (dal
   07/10/2026 Flickr non è più una fonte ammessa). Originale 4000×3000,
   pubblicato intero a 2000×1500, webp. */
export const CIOCCOLATO_FONDENTE_PHOTO: CreditedPhoto = {
  src: "/images/blog/eurochocolate/cioccolato-fondente-fuso.webp",
  width: 2000,
  height: 1500,
  alt: {
    it: "Cioccolato fondente fuso raccolto con una spatola di legno da una ciotola bianca",
    en: "Melted dark chocolate scooped with a wooden spatula from a white bowl",
    fr: "Chocolat noir fondu prélevé à la spatule en bois dans un bol blanc",
    de: "Geschmolzene Zartbitterschokolade auf einem Holzspatel über einer weißen Schüssel",
  },
  caption: {
    it: "Cioccolato fondente fuso: foto illustrativa, non scattata a Eurochocolate (2013).",
    en: "Melted dark chocolate: illustrative photo, not taken at Eurochocolate (2013).",
    fr: "Chocolat noir fondu : photo d'illustration, non prise à Eurochocolate (2013).",
    de: "Geschmolzene Zartbitterschokolade: Symbolfoto, nicht bei der Eurochocolate aufgenommen (2013).",
  },
  credit: {
    author: "Andrea Pavanello",
    license: "CC BY-SA 3.0 IT",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/it/",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:%22_13_ITALY_Chocolate_melted_-_italian_premium_chocolate_top_quality.JPG",
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
  src: "/images/blog/carlo-acutis/santuario-spogliazione-santa-maria-maggiore-assisi-2400.webp",
  width: 2400,
  height: 1800,
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

export const GUBBIO_NATALE_PIAZZA_PHOTO: CreditedPhoto = {
  src: "/images/blog/natale-umbria/gubbio-piazza-san-giovanni-natale-2025-2400.webp",
  width: 2400,
  height: 1800,
  alt: {
    it: "Piazza San Giovanni a Gubbio di sera, con la chiesa illuminata, luci colorate a terra e decorazioni di Natale",
    en: "Piazza San Giovanni in Gubbio in the evening, with the church lit up, coloured lights on the ground and Christmas decorations",
    fr: "La Piazza San Giovanni à Gubbio le soir, avec l'église illuminée, des lumières colorées au sol et des décorations de Noël",
    de: "Die Piazza San Giovanni in Gubbio am Abend, mit beleuchteter Kirche, bunten Lichtern am Boden und Weihnachtsdekoration",
  },
  caption: {
    it: "Gubbio durante le feste: piazza San Giovanni con le decorazioni di Natale (foto del dicembre 2025).",
    en: "Gubbio during the festive season: Piazza San Giovanni with its Christmas decorations (photo from December 2025).",
    fr: "Gubbio pendant les fêtes : la Piazza San Giovanni et ses décorations de Noël (photo de décembre 2025).",
    de: "Gubbio in der Weihnachtszeit: die Piazza San Giovanni mit Weihnachtsdekoration (Foto von Dezember 2025).",
  },
  credit: { author: "Bultro", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Gubbio_-_Piazza_S._Giovanni_a_Natale.jpg") },
};

/* Albero di Natale sul Trasimeno: dal 07/10/2026 nessuna foto dell'albero.
   L'unica su Commons (Walter Giannetti, 2019) è stata tolta su richiesta
   del titolare e non esistono altre foto HD dell'albero con licenza
   valida. Copertina dell'articolo: il lago d'inverno al tramonto, con
   didascalia che non suggerisce di mostrare l'albero. */
export const TRASIMENO_TRAMONTO_PHOTO: CreditedPhoto = {
  src: "/images/blog/albero-natale-trasimeno/lago-trasimeno-tramonto-isola-polvese-2400.webp",
  width: 2400,
  height: 1601,
  alt: {
    it: "Il lago Trasimeno al tramonto d'inverno, con l'Isola Polvese all'orizzonte e due pescatori sul molo",
    en: "Lake Trasimeno at sunset in winter, with Isola Polvese on the horizon and two people fishing from the jetty",
    fr: "Le lac Trasimène au coucher du soleil en hiver, avec l'île Polvese à l'horizon et deux pêcheurs sur la jetée",
    de: "Der Trasimenische See bei Sonnenuntergang im Winter, mit der Isola Polvese am Horizont und zwei Anglern auf dem Steg",
  },
  caption: {
    it: "Il lago Trasimeno al tramonto visto da San Feliciano, con l'Isola Polvese (foto del gennaio 2020).",
    en: "Lake Trasimeno at sunset from San Feliciano, with Isola Polvese (photo from January 2020).",
    fr: "Le lac Trasimène au coucher du soleil depuis San Feliciano, avec l'île Polvese (photo de janvier 2020).",
    de: "Der Trasimenische See bei Sonnenuntergang, von San Feliciano aus, mit der Isola Polvese (Foto von Januar 2020).",
  },
  credit: { author: "Repuli", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Isola_Polvese_al_tramonto.jpg") },
};

/* Castiglione del Lago d'inverno, nell'articolo sui mercatini al posto
   della foto dell'albero. Originale 6720×4480, pubblicato intero a 2000 px. */
export const CASTIGLIONE_INVERNO_PHOTO: CreditedPhoto = {
  src: "/images/blog/natale-umbria/castiglione-del-lago-inverno-2000.webp",
  width: 2000,
  height: 1333,
  alt: {
    it: "I tetti di Castiglione del Lago visti dall'alto in una giornata d'inverno, con un campanile, una cupola e la campagna sullo sfondo",
    en: "The rooftops of Castiglione del Lago seen from above on a winter day, with a bell tower, a dome and the countryside behind",
    fr: "Les toits de Castiglione del Lago vus d'en haut par une journée d'hiver, avec un clocher, une coupole et la campagne en arrière-plan",
    de: "Die Dächer von Castiglione del Lago von oben an einem Wintertag, mit Glockenturm, Kuppel und Landschaft im Hintergrund",
  },
  caption: {
    it: "Castiglione del Lago d'inverno, vista dall'alto (foto del gennaio 2020).",
    en: "Castiglione del Lago in winter, seen from above (photo from January 2020).",
    fr: "Castiglione del Lago en hiver, vue d'en haut (photo de janvier 2020).",
    de: "Castiglione del Lago im Winter, von oben gesehen (Foto von Januar 2020).",
  },
  credit: { author: "Maurizio Moro5153", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Castiglione_del_Lago_Giorno.jpg") },
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

export const TRASIMENO_VELE_PHOTO: CreditedPhoto = {
  src: "/images/blog/albero-natale-trasimeno/lago-trasimeno-vele-castiglione-del-lago.webp",
  width: 2000,
  height: 1500,
  alt: {
    it: "Barche a vela sul lago Trasimeno a Castiglione del Lago, con le colline sullo sfondo e il prato in primo piano",
    en: "Sailing boats on Lake Trasimeno at Castiglione del Lago, with hills behind and a lawn in the foreground",
    fr: "Voiliers sur le lac Trasimène à Castiglione del Lago, avec les collines en arrière-plan et une pelouse au premier plan",
    de: "Segelboote auf dem Trasimenischen See bei Castiglione del Lago, mit Hügeln im Hintergrund und Rasen im Vordergrund",
  },
  caption: {
    it: "Vele sul Trasimeno a Castiglione del Lago (foto del 2017).",
    en: "Sails on Lake Trasimeno at Castiglione del Lago (photo from 2017).",
    fr: "Voiles sur le lac Trasimène à Castiglione del Lago (photo de 2017).",
    de: "Segel auf dem Trasimenischen See bei Castiglione del Lago (Foto von 2017).",
  },
  credit: { author: "Wolfgang Sauber", license: "CC BY-SA 4.0", licenseUrl: CC_BY_SA_4, source: "Wikimedia Commons", sourceUrl: commons("Castiglione_del_Lago_-_Lago_Trasimeno_2.jpg") },
};

export const RASIGLIA_BORGO_PHOTO: CreditedPhoto = {
  src: "/images/blog/rasiglia/rasiglia-ponticello-cascata-2400.webp",
  width: 2400,
  height: 1488,
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
