import type { Locale } from "@/lib/i18n";

/* Ristorante Carfagna (Assisi), ristorante INDIPENDENTE convenzionato con
   Agriturismo La Mora: unica fonte per la pagina /ristorante-convenzionato/,
   per i PDF della convenzione (scripts/build-carfagna-pdf.mjs, che importa
   questo file: qui solo `import type`, niente alias a runtime) e per i
   rimandi dalle altre pagine (menù bambini).

   Fonti:
   - proposte della convenzione: confermate dal titolare (ottobre 2026). Il
     ristorante NON fa sconti sul menù alla carta (sua politica aziendale):
     non va mai scritto da nessuna parte;
   - nome, indirizzo, gestore e sito: pagina ufficiale
     https://www.lartedelgustosrl.com/carfagna-assisi/ (ristorantecarfagna.it
     reindirizza lì), letta il 21/10/2026; pagina Facebook e album forniti
     dal titolare, la pagina coincide con il link Facebook del sito ufficiale;
   - distanza da La Mora: Google Maps (indicazioni in auto da Agriturismo La
     Mora, place_id ChIJ6cNo016cLhMR7KOqeC82Wic, a Via Campiglione 1), lette
     il 21/10/2026: 7,0 km / 12 min è il primo percorso senza strade a
     traffico limitato (quello "più veloce", 6,0 km / 11 min, ne attraversa). */
export const CARFAGNA = {
  name: "Ristorante Carfagna",
  operator: "L'Arte del Gusto s.r.l.",
  address: { street: "Via Campiglione, 1", postalCode: "06081", locality: "Assisi", region: "PG", country: "IT" },
  addressDisplay: "Via Campiglione 1, 06081 Assisi (PG)",
  officialUrl: "https://www.lartedelgustosrl.com/carfagna-assisi/",
  facebookUrl: "https://www.facebook.com/ristorantecarfagna/",
  facebookAlbumUrl: "https://www.facebook.com/ristorantecarfagna/albums/775284610395634/",
  facebookAlbumTitle: "Assisi dal Ristorante Carfagna",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Ristorante Carfagna, Via Campiglione 1, 06081 Assisi PG")}`,
  fromLaMora: { km: "7,0", minutes: 12 },
} as const;

export const CARFAGNA_PAGE_PATH = "/ristorante-convenzionato/";

/* PDF della convenzione, uno per lingua (generati da scripts/). */
export function carfagnaPdfHref(locale: Locale): string {
  return `/downloads/la-mora-convenzione-ristorante-carfagna-${locale}.pdf`;
}

export type CarfagnaOffer = {
  id: "bambini" | "giorno" | "carta";
  priceEur: number;
  text: Record<Locale, { title: string; who: string; price: string; detail: string }>;
};

/* Le tre proposte, con le stesse parole e cifre su sito e PDF. */
export const CARFAGNA_OFFERS: CarfagnaOffer[] = [
  {
    id: "bambini",
    priceEur: 15,
    text: {
      it: { title: "Menù bambini", who: "Da 3 a 10 anni", price: "15 €", detail: "Da concordare con il ristorante in base alle esigenze dei bambini." },
      en: { title: "Children's menu", who: "Ages 3 to 10", price: "€15", detail: "To be agreed with the restaurant according to the children's needs." },
      fr: { title: "Menu enfants", who: "De 3 à 10 ans", price: "15 €", detail: "À convenir avec le restaurant selon les besoins des enfants." },
      de: { title: "Kindermenü", who: "3 bis 10 Jahre", price: "15 €", detail: "Mit dem Restaurant nach den Bedürfnissen der Kinder abzustimmen." },
    },
  },
  {
    id: "giorno",
    priceEur: 25,
    text: {
      it: { title: "Menù del giorno", who: "A persona", price: "25 €", detail: "Scelta dal menù del giorno. Bevande, caffè e dolce della casa inclusi." },
      en: { title: "Menu of the day", who: "Per person", price: "€25", detail: "Choice from the menu of the day. Drinks, coffee and house dessert included." },
      fr: { title: "Menu du jour", who: "Par personne", price: "25 €", detail: "Au choix dans le menu du jour. Boissons, café et dessert maison inclus." },
      de: { title: "Tagesmenü", who: "Pro Person", price: "25 €", detail: "Auswahl aus dem Tagesmenü. Getränke, Kaffee und Dessert des Hauses inklusive." },
    },
  },
  {
    id: "carta",
    priceEur: 35,
    text: {
      it: {
        title: "Menù dalla carta",
        who: "A persona",
        price: "35 €",
        detail: "Dalla carta: 1 antipasto (escluso l'antipasto Carfagna), 1 primo (escluso il tartufo), 1 secondo, 1 contorno e 1 dolce. Bevande e caffè inclusi.",
      },
      en: {
        title: "Menu from the à la carte list",
        who: "Per person",
        price: "€35",
        detail: "From the à la carte list: 1 starter (except the Antipasto Carfagna), 1 first course (truffle excluded), 1 main course, 1 side dish and 1 dessert. Drinks and coffee included.",
      },
      fr: {
        title: "Menu composé à la carte",
        who: "Par personne",
        price: "35 €",
        detail: "À la carte : 1 entrée (sauf l'Antipasto Carfagna), 1 premier plat (hors truffe), 1 plat principal, 1 accompagnement et 1 dessert. Boissons et café inclus.",
      },
      de: {
        title: "Menü von der Karte",
        who: "Pro Person",
        price: "35 €",
        detail: "Von der Karte: 1 Vorspeise (außer dem Antipasto Carfagna), 1 erster Gang (ohne Trüffel), 1 Hauptgang, 1 Beilage und 1 Dessert. Getränke und Kaffee inklusive.",
      },
    },
  },
];

/* Frase sull'uso della convenzione: sito (pagina e PDF) e PDF stampato. */
export const CARFAGNA_SHOW_TEXT: Record<Locale, { page: string; pdf: string }> = {
  it: { page: "Mostra il PDF o questa pagina al ristorante: conoscono già la convenzione.", pdf: "Mostra questo documento al ristorante: conoscono già la convenzione." },
  en: { page: "Show the PDF or this page at the restaurant: they already know about the agreement.", pdf: "Show this document at the restaurant: they already know about the agreement." },
  fr: { page: "Montrez le PDF ou cette page au restaurant : il connaît déjà la convention.", pdf: "Montrez ce document au restaurant : il connaît déjà la convention." },
  de: { page: "Zeigen Sie im Restaurant das PDF oder diese Seite: Die Vereinbarung ist dort bereits bekannt.", pdf: "Zeigen Sie dieses Dokument im Restaurant: Die Vereinbarung ist dort bereits bekannt." },
};

export const CARFAGNA_PDF_TITLE: Record<Locale, { title: string; subtitle: string }> = {
  it: { title: "Convenzione riservata agli ospiti de La Mora", subtitle: "Ristorante Carfagna, Assisi" },
  en: { title: "Agreement reserved for La Mora's guests", subtitle: "Ristorante Carfagna, Assisi" },
  fr: { title: "Convention réservée aux hôtes de La Mora", subtitle: "Ristorante Carfagna, Assise" },
  de: { title: "Vereinbarung exklusiv für Gäste von La Mora", subtitle: "Ristorante Carfagna, Assisi" },
};

export type CarfagnaPhoto = { src: string; width: number; height: number; alt: Record<Locale, string> };

/* Foto fornite dal titolare (dal ristorante), selezionate il 21/10/2026 da
   public/images/Carfagna Foto Ristorante Assisi/: senza filigrana La Mora
   (foto di terzi) e con il credito RISTORANTE_CARFAGNA_PHOTO_CREDIT di
   src/data/photo-credits.ts. La prima è la copertina. */
export const CARFAGNA_PHOTOS: CarfagnaPhoto[] = [
  {
    src: "/images/ristorante-carfagna/carfagna-terrazza-vista-basilica.webp",
    width: 2400,
    height: 1600,
    alt: {
      it: "Terrazza del Ristorante Carfagna con i tavoli apparecchiati e la Basilica di San Francesco sullo sfondo, ad Assisi",
      en: "Ristorante Carfagna's terrace with laid tables and the Basilica of St. Francis in the background, Assisi",
      fr: "La terrasse du Ristorante Carfagna avec les tables dressées et la basilique Saint-François en arrière-plan, à Assise",
      de: "Terrasse des Ristorante Carfagna mit gedeckten Tischen und der Basilika des Heiligen Franziskus im Hintergrund, Assisi",
    },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-sala-vetrate-vista-assisi.webp",
    width: 1440,
    height: 961,
    alt: {
      it: "Sala del Ristorante Carfagna con le ampie vetrate affacciate su Assisi",
      en: "Ristorante Carfagna's dining room with large windows looking out on Assisi",
      fr: "La salle du Ristorante Carfagna avec ses grandes baies vitrées donnant sur Assise",
      de: "Speisesaal des Ristorante Carfagna mit großen Fenstern mit Blick auf Assisi",
    },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-tavolo-vista-sacro-convento.webp",
    width: 1400,
    height: 936,
    alt: {
      it: "Tavolo apparecchiato davanti alla vetrata, con il Sacro Convento di Assisi sullo sfondo",
      en: "A laid table by the window, with the Sacro Convento of Assisi in the background",
      fr: "Une table dressée devant la baie vitrée, avec le Sacro Convento d'Assise en arrière-plan",
      de: "Gedeckter Tisch am Fenster, im Hintergrund der Sacro Convento von Assisi",
    },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-sala-ristorante.webp",
    width: 1440,
    height: 961,
    alt: {
      it: "La sala principale del Ristorante Carfagna con i tavoli apparecchiati",
      en: "The main dining room of Ristorante Carfagna with laid tables",
      fr: "La salle principale du Ristorante Carfagna avec les tables dressées",
      de: "Der große Speisesaal des Ristorante Carfagna mit gedeckten Tischen",
    },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-tagliere-salumi.webp",
    width: 1400,
    height: 933,
    alt: {
      it: "Tagliere di salumi con pane su ardesia, visto dall'alto",
      en: "Board of cured meats with bread on slate, seen from above",
      fr: "Planche de charcuteries avec du pain sur ardoise, vue d'en haut",
      de: "Wurstplatte mit Brot auf Schiefer, von oben",
    },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-piatti-dall-alto.webp",
    width: 1400,
    height: 933,
    alt: {
      it: "Una tavola del Ristorante Carfagna vista dall'alto, con tagliere di salumi, antipasti e piatti caldi",
      en: "A table at Ristorante Carfagna seen from above, with cured meats, starters and hot dishes",
      fr: "Une table du Ristorante Carfagna vue d'en haut, avec charcuteries, entrées et plats chauds",
      de: "Ein Tisch im Ristorante Carfagna von oben, mit Wurstplatte, Vorspeisen und warmen Gerichten",
    },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-pappardelle.webp",
    width: 1400,
    height: 933,
    alt: {
      it: "Piatto di pappardelle al sugo",
      en: "A plate of pappardelle with sauce",
      fr: "Une assiette de pappardelle en sauce",
      de: "Ein Teller Pappardelle mit Soße",
    },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-gnocchi.webp",
    width: 1400,
    height: 933,
    alt: { it: "Piatto di gnocchi", en: "A plate of gnocchi", fr: "Une assiette de gnocchis", de: "Ein Teller Gnocchi" },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-arrosto.webp",
    width: 1400,
    height: 933,
    alt: { it: "Arrosto di carne servito nel piatto", en: "Roast meat served on the plate", fr: "Viande rôtie servie dans l'assiette", de: "Braten auf dem Teller serviert" },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-costolette-alla-brace.webp",
    width: 1400,
    height: 933,
    alt: { it: "Costolette alla brace", en: "Grilled chops", fr: "Côtelettes grillées", de: "Gegrillte Koteletts" },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-prosciutto-al-coltello.webp",
    width: 1152,
    height: 1440,
    alt: {
      it: "Prosciutto tagliato al coltello davanti al camino",
      en: "Ham being sliced by hand in front of the fireplace",
      fr: "Jambon tranché au couteau devant la cheminée",
      de: "Schinken wird vor dem Kamin von Hand aufgeschnitten",
    },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-brace-camino.webp",
    width: 1400,
    height: 933,
    alt: {
      it: "La brace del camino del Ristorante Carfagna",
      en: "The fireplace grill at Ristorante Carfagna",
      fr: "Les braises de la cheminée du Ristorante Carfagna",
      de: "Die Glut im Kamin des Ristorante Carfagna",
    },
  },
  {
    src: "/images/ristorante-carfagna/carfagna-dolce.webp",
    width: 1440,
    height: 1440,
    alt: { it: "Dolce con una spolverata di cacao", en: "Dessert dusted with cocoa", fr: "Dessert saupoudré de cacao", de: "Dessert mit Kakao bestäubt" },
  },
];
