/* Confronto tariffario reale per un soggiorno campione identico su tutte le
   piattaforme: 12–15 ottobre 2026, 3 notti, 2 adulti, un solo appartamento
   (Acquario — l'unico tra i 5 disponibile su Expedia con queste date e
   nome esplicito, usato come riferimento anche per Booking scegliendo lì
   l'unità con la stessa metratura/configurazione letti: 45 m², 1 letto
   matrimoniale + 1 letto a castello).

   Prezzi OTA rilevati navigando le pagine pubbliche di Booking.com ed
   Expedia con quelle esatte date, verificati due volte (3 e 4 settembre
   2026, stesso risultato entrambe le volte) — non un confronto in tempo
   reale, NON va fatto scraping automatico e continuo (violerebbe i termini
   di entrambe le piattaforme). Airbnb non è verificabile: il link
   disponibile è una pagina di gestione riservata all'host, non un annuncio
   pubblico.

   Prezzo diretto: confermato dal titolare (4 settembre 2026) per questo
   stesso soggiorno — tariffa non rimborsabile, il tipo di prodotto più
   comparabile al vantaggio "prenota diretto, risparmi di più" che la
   sezione vuole comunicare. È anche disponibile una tariffa flessibile con
   colazione inclusa e cancellazione gratuita, più cara: mostrata come nota
   secondaria, non come cifra principale.

   Per aggiornare: modifica SOLO questo file. */

export const STAY = {
  checkinLabel: "12 ottobre 2026",
  checkoutLabel: "15 ottobre 2026",
  nights: 3,
  adults: 2,
  apartmentName: "Acquario",
} as const;

/* Distanza reale, dalla stessa pagina Booking.com consultata per i prezzi
   sopra ("Basilica di Santa Maria degli Angeli si trova a 2,2 km dalla
   struttura"): non una distanza dal "centro" di Assisi, che non risulta
   verificata da nessuna fonte del progetto. */
export const DISTANCE_LABEL = "2,2 km da Santa Maria degli Angeli";

export const CHECKED_ON_LABEL = "4 settembre 2026";

/* null = nessuna tariffa diretta ancora verificabile per queste date: la
   sezione mostrerebbe uno stato "richiedi il preventivo" invece di un
   numero inventato. Ora valorizzata (vedi commento sopra). */
export const DIRECT_PRICE_EUR: number | null = 244;
export const DIRECT_PRICE_PER_NIGHT = 81;
export const DIRECT_PRICE_CONDITION = "Tariffa non rimborsabile";

/* Tariffa alternativa più cara, con condizioni diverse — mostrata come
   nota secondaria nel box "Sito ufficiale", non come cifra principale. */
export const DIRECT_PRICE_FLEX_EUR = 444;
export const DIRECT_PRICE_FLEX_PER_NIGHT = 148;
export const DIRECT_PRICE_FLEX_CONDITION = "Colazione inclusa e cancellazione gratuita";

export const OTA_PRICES = [
  {
    name: "Booking.com",
    priceEur: 375,
    note: "Tariffa flessibile con colazione inclusa, prezzo pubblico",
  },
  {
    name: "Expedia",
    priceEur: 372,
    note: "Cancellazione gratuita, tasse e costi inclusi",
  },
] as const;

export const AIRBNB_NOTE =
  "Non verificabile per queste date: il link disponibile è una pagina di gestione riservata all'host, non un annuncio pubblico.";

/* Piattaforme aggiuntive mostrate nel dropdown "Altri prezzi": prezzo
   ancora da verificare, mai un numero segnaposto spacciato per reale. */
export const OTHER_PLATFORMS = [
  { name: "TripAdvisor", note: "Prezzo da verificare — la prenotazione passa comunque da una delle OTA collegate." },
  { name: "Airbnb", note: AIRBNB_NOTE },
] as const;
