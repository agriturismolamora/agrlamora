/* Confronto tariffario reale per un soggiorno campione identico su tutte le
   piattaforme: 12–15 ottobre 2026, 3 notti, 2 adulti, un solo appartamento
   (Acquario — l'unico tra i 5 disponibile su Expedia con queste date e
   nome esplicito, usato come riferimento anche per Booking scegliendo lì
   l'unità con la stessa metratura/configurazione letti: 45 m², 1 letto
   matrimoniale + 1 letto a castello).

   Prezzi rilevati manualmente il 3 settembre 2026 navigando le pagine
   pubbliche di Booking.com ed Expedia con quelle esatte date — non un
   confronto in tempo reale, NON va fatto scraping automatico e continuo
   (violerebbe i termini di entrambe le piattaforme). Airbnb non è
   verificabile: il link fornito è una pagina di gestione riservata
   all'host, non un annuncio pubblico.

   Per aggiornare: modifica SOLO questo file. DIRECT_PRICE_EUR è l'unico
   valore mancante — appena il titolare conferma una tariffa diretta reale
   per queste date, valorizzalo qui (in euro, per l'intero soggiorno di 3
   notti) e la sezione mostra automaticamente il confronto completo. */

export const STAY = {
  checkinLabel: "12 ottobre 2026",
  checkoutLabel: "15 ottobre 2026",
  nights: 3,
  adults: 2,
  apartmentName: "Acquario",
} as const;

export const CHECKED_ON_LABEL = "3 settembre 2026";

/* null = nessuna tariffa diretta ancora verificabile per queste date: la
   sezione mostra uno stato "richiedi il preventivo" invece di un numero
   inventato. Imposta un numero (es. 349) per attivare il confronto pieno
   con il risparmio calcolato automaticamente. */
export const DIRECT_PRICE_EUR: number | null = null;

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
