import type { Locale } from "@/lib/i18n";

/* Luoghi di interesse con pulsante "Apri su Google Maps": URL forniti dal
   titolare (29/09/2026), usati ESATTAMENTE così — mai generarne altri.

   Distanze e tempi in auto: percorso consigliato da Google Maps con
   partenza da Agriturismo La Mora (Via Fonte Citerna 7, place_id
   ChIJ6cNo016cLhMR7KOqeC82Wic), rilevati il 29/09/2026 alle 15:09. Per
   ogni luogo è stato verificato che la destinazione calcolata da Google
   avesse esattamente il place_id qui sotto (per Perugia: "Centro storico
   di Perugia"; per Spello: "Centro Storico Spello"). Valori non
   arrotondati: sono quelli mostrati da Google Maps. I tempi dipendono dal
   traffico: vanno letti come indicativi.

   Luoghi aggiunti il 06/10/2026 per gli articoli del blog (blogOnly: non
   compaiono nella sezione "Distanze" della home):
   - Santuario della Spogliazione e Cascate di Rasiglia: place_id forniti
     dal titolare;
   - Gubbio (Piazza dei Quaranta Martiri), Albero di Natale di Gubbio, Rocca
     del Leone: place_id letti da Google Maps (feature id della scheda del
     luogo) e VERIFICATI riaprendo Google Maps con place_id:<id> — nome e
     indirizzo restituiti coincidono con il luogo cercato.
   Distanze e tempi: indicazioni stradali di Google Maps (web), percorso
   consigliato da La Mora, lette il 06/10/2026 alle 21:55; per questi luoghi
   Google mostra solo km e minuti, quindi meters/seconds non sono indicati. */
export type PlaceKey =
  | "basilica"
  | "piazzaDelComune"
  | "roccaMaggiore"
  | "roccaMinore"
  | "perugia"
  | "spello"
  | "aeroporto"
  | "umbriafiere"
  | "santuarioSpogliazione"
  | "rasiglia"
  | "gubbio"
  | "alberoGubbio"
  | "roccaDelLeone";

export type PlaceInfo = {
  key: PlaceKey;
  placeId: string;
  mapsUrl: string;
  /* Distanza in metri e durata in secondi, come restituite da Google
     (assenti per i luoghi letti dall'interfaccia web, vedi sopra). */
  meters?: number;
  seconds?: number;
  /* Stringhe mostrate da Google Maps (it), riportate identiche. */
  km: string;
  minutes: number;
  name: Record<Locale, string>;
  /* true: solo pulsanti Maps negli articoli, non nella sezione Distanze. */
  blogOnly?: boolean;
};

const mapsUrl = (placeId: string) => `https://www.google.com/maps/place/?q=place_id:${placeId}`;

export const PLACES: PlaceInfo[] = [
  {
    key: "basilica",
    placeId: "ChIJ5cO0QEedLhMR2DfH3U4y3kc",
    mapsUrl: mapsUrl("ChIJ5cO0QEedLhMR2DfH3U4y3kc"),
    meters: 7501,
    seconds: 1056,
    km: "7,5",
    minutes: 18,
    name: { it: "Basilica di San Francesco", en: "Basilica of San Francesco", fr: "Basilique Saint-François", de: "Basilika San Francesco" },
  },
  {
    key: "piazzaDelComune",
    placeId: "ChIJfZOFbzadLhMRIAFWJ0aiPMQ",
    mapsUrl: mapsUrl("ChIJfZOFbzadLhMRIAFWJ0aiPMQ"),
    meters: 6763,
    seconds: 853,
    km: "6,8",
    minutes: 14,
    name: { it: "Piazza del Comune", en: "Piazza del Comune", fr: "Piazza del Comune", de: "Piazza del Comune" },
  },
  {
    key: "roccaMaggiore",
    placeId: "ChIJcdct-UmdLhMRS10zlKEnqjY",
    mapsUrl: mapsUrl("ChIJcdct-UmdLhMRS10zlKEnqjY"),
    meters: 8998,
    seconds: 1061,
    km: "9,0",
    minutes: 18,
    name: { it: "Rocca Maggiore", en: "Rocca Maggiore", fr: "Rocca Maggiore", de: "Rocca Maggiore" },
  },
  {
    key: "roccaMinore",
    placeId: "ChIJaVGUvsqCLhMROJ_CMIXuQN4",
    mapsUrl: mapsUrl("ChIJaVGUvsqCLhMROJ_CMIXuQN4"),
    meters: 8649,
    seconds: 980,
    km: "8,6",
    minutes: 16,
    name: { it: "Rocca Minore", en: "Rocca Minore", fr: "Rocca Minore", de: "Rocca Minore" },
  },
  {
    key: "perugia",
    placeId: "ChIJqSANXIigLhMReFI9IQbWKZw",
    mapsUrl: mapsUrl("ChIJqSANXIigLhMReFI9IQbWKZw"),
    meters: 20984,
    seconds: 1367,
    km: "21,0",
    minutes: 23,
    name: { it: "Perugia", en: "Perugia", fr: "Pérouse", de: "Perugia" },
  },
  {
    key: "spello",
    placeId: "ChIJ-zjJxueFLhMRU_81rOsHprE",
    mapsUrl: mapsUrl("ChIJ-zjJxueFLhMRU_81rOsHprE"),
    meters: 15119,
    seconds: 1070,
    km: "15,1",
    minutes: 18,
    name: { it: "Spello", en: "Spello", fr: "Spello", de: "Spello" },
  },
  {
    key: "aeroporto",
    placeId: "ChIJYcg1N5YgLBMRP-H-vipRR4c",
    mapsUrl: mapsUrl("ChIJYcg1N5YgLBMRP-H-vipRR4c"),
    meters: 11437,
    seconds: 655,
    km: "11,4",
    minutes: 11,
    name: {
      it: "Aeroporto di Perugia S. Egidio",
      en: "Perugia S. Egidio Airport",
      fr: "Aéroport de Pérouse S. Egidio",
      de: "Flughafen Perugia S. Egidio",
    },
  },
  {
    key: "umbriafiere",
    placeId: "ChIJifGGHTOcLhMRJyaR66t25ZI",
    mapsUrl: mapsUrl("ChIJifGGHTOcLhMRJyaR66t25ZI"),
    meters: 3357,
    seconds: 330,
    km: "3,4",
    minutes: 6,
    name: { it: "Umbria Fiere", en: "Umbria Fiere", fr: "Umbria Fiere", de: "Umbria Fiere" },
  },
  {
    key: "santuarioSpogliazione",
    placeId: "ChIJnTkX8zadLhMR1H0B5jqTKt8",
    mapsUrl: mapsUrl("ChIJnTkX8zadLhMR1H0B5jqTKt8"),
    km: "6,8",
    minutes: 15,
    name: { it: "Santuario della Spogliazione", en: "Sanctuary of Renunciation", fr: "Sanctuaire du Dépouillement", de: "Heiligtum der Entkleidung" },
    blogOnly: true,
  },
  {
    key: "rasiglia",
    placeId: "ChIJ2Xe2FLp9LhMRsIUH23wLIsw",
    mapsUrl: mapsUrl("ChIJ2Xe2FLp9LhMRsIUH23wLIsw"),
    km: "36,5",
    minutes: 37,
    name: { it: "Cascate di Rasiglia", en: "Rasiglia waterfalls", fr: "Cascades de Rasiglia", de: "Wasserfälle von Rasiglia" },
    blogOnly: true,
  },
  {
    key: "gubbio",
    placeId: "ChIJLQyi6Kc5LBMRoFkbAS95Xk0",
    mapsUrl: mapsUrl("ChIJLQyi6Kc5LBMRoFkbAS95Xk0"),
    km: "54,7",
    minutes: 42,
    name: { it: "Gubbio, Piazza dei Quaranta Martiri", en: "Gubbio, Piazza dei Quaranta Martiri", fr: "Gubbio, Piazza dei Quaranta Martiri", de: "Gubbio, Piazza dei Quaranta Martiri" },
    blogOnly: true,
  },
  {
    key: "alberoGubbio",
    placeId: "ChIJfWJqL6Y5LBMRyjgdz_LlNGM",
    mapsUrl: mapsUrl("ChIJfWJqL6Y5LBMRyjgdz_LlNGM"),
    km: "61,0",
    minutes: 51,
    name: { it: "Albero di Natale di Gubbio", en: "Gubbio Christmas tree", fr: "Sapin de Noël de Gubbio", de: "Weihnachtsbaum von Gubbio" },
    blogOnly: true,
  },
  {
    key: "roccaDelLeone",
    placeId: "ChIJtZQ7EgBVKRMR2uyQlzmS3fo",
    mapsUrl: mapsUrl("ChIJtZQ7EgBVKRMR2uyQlzmS3fo"),
    km: "64,3",
    minutes: 50,
    name: { it: "Rocca del Leone, Castiglione del Lago", en: "Rocca del Leone, Castiglione del Lago", fr: "Rocca del Leone, Castiglione del Lago", de: "Rocca del Leone, Castiglione del Lago" },
    blogOnly: true,
  },
];

export function getPlace(key: PlaceKey): PlaceInfo {
  return PLACES.find((p) => p.key === key)!;
}

/* Km nel formato della lingua: virgola decimale ovunque tranne in inglese. */
export function formatKm(place: PlaceInfo, locale: Locale): string {
  return locale === "en" ? place.km.replace(",", ".") : place.km;
}

/* Riconoscimento dei luoghi citati in un testo (articoli del blog), nelle
   4 lingue, con i nomi effettivamente usati nei contenuti. "Basilica di
   San Francesco" non deve catturare "Basilica di Santa Maria degli
   Angeli": il pattern richiede "San Francesco" subito dopo. */
const MENTION_PATTERNS: Record<PlaceKey, RegExp> = {
  basilica: /Basilica (di|of) San Francesco|Basilica of St\. Francis|basilique Saint-François|Basilika (San Francesco|des Heiligen Franziskus)/i,
  piazzaDelComune: /Piazza del Comune/i,
  roccaMaggiore: /Rocca Maggiore/i,
  roccaMinore: /Rocca Minore/i,
  perugia: /Perugia|Pérouse/i,
  spello: /Spello/i,
  aeroporto: /aeroporto|airport|aéroport|Flughafen|Sant'Egidio|S\. Egidio/i,
  umbriafiere: /Umbriafiere|Umbria Fiere/i,
  santuarioSpogliazione: /Santuario della Spogliazione|Sanctuary of (the )?Renunciation|Sanctuaire du Dépouillement|Heiligtum der Entkleidung/i,
  rasiglia: /Rasiglia/i,
  gubbio: /Quaranta Martiri/i,
  alberoGubbio: /albero di Natale di Gubbio|Gubbio Christmas tree|sapin de Noël de Gubbio|Weihnachtsbaum von Gubbio/i,
  roccaDelLeone: /Rocca del Leone/i,
};

export function findMentionedPlaces(text: string): PlaceInfo[] {
  return PLACES.filter((p) => MENTION_PATTERNS[p.key].test(text));
}
