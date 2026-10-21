import type { Locale } from "@/lib/i18n";

/* Offerte di La Mora non legate a una data, elencate in
   /offerte/offerte-in-corso/ sotto le promo a tempo (src/data/promo.ts).
   Solo offerte già descritte altrove nel sito, con link alla pagina o alla
   sezione che le spiega per intero: nessuna condizione, percentuale, data o
   cumulabilità nuova. Fonti: PROJECT-BRIEF.md (sezione 2, sconti; sezione 4,
   Ottavo Centenario, Smartbox, cofanetti) e le pagine collegate. `href` è il
   path italiano: la lingua la aggiunge withLocale() in pagina. */
export type StandingOffer = {
  id: string;
  href: string;
  /* Numero già pubblicato sul sito (es. "-10%"), se c'è. */
  stat?: string;
  text: Record<Locale, { title: string; body: string }>;
};

export const STANDING_OFFERS: StandingOffer[] = [
  {
    id: "sconto-7-notti",
    href: "/offerte/#sconto-7-notti",
    stat: "-10%",
    text: {
      it: { title: "Da 7 notti", body: "Per chi si ferma una settimana o più e prenota direttamente con noi." },
      en: { title: "From 7 nights", body: "For stays of a week or more booked directly with us." },
      fr: { title: "Dès 7 nuits", body: "Pour les séjours d'une semaine ou plus réservés directement chez nous." },
      de: { title: "Ab 7 Nächten", body: "Für Aufenthalte ab einer Woche bei Direktbuchung bei uns." },
    },
  },
  {
    id: "sconto-chi-torna",
    href: "/offerte/#sconto-chi-torna",
    stat: "-10%",
    text: {
      it: { title: "Per chi torna", body: "Dalla seconda prenotazione diretta in poi, per chi è già stato nostro ospite." },
      en: { title: "For returning guests", body: "From your second direct booking onwards, if you have stayed with us before." },
      fr: { title: "Pour les hôtes qui reviennent", body: "Dès la deuxième réservation directe, pour ceux qui ont déjà séjourné chez nous." },
      de: { title: "Für wiederkehrende Gäste", body: "Ab der zweiten Direktbuchung, für alle, die schon bei uns zu Gast waren." },
    },
  },
  {
    id: "tariffa-non-rimborsabile",
    href: "/offerte/#tariffa-non-rimborsabile",
    stat: "-10%",
    text: {
      it: { title: "Tariffa non rimborsabile", body: "Rispetto alla tariffa flessibile, per chi ha già le date certe. Non è rimborsabile in caso di cancellazione." },
      en: { title: "Non-refundable rate", body: "Compared to the flexible rate, for those whose dates are fixed. It is not refundable in case of cancellation." },
      fr: { title: "Tarif non remboursable", body: "Par rapport au tarif flexible, pour ceux dont les dates sont fixées. Il n'est pas remboursable en cas d'annulation." },
      de: { title: "Nicht erstattbarer Tarif", body: "Im Vergleich zum flexiblen Tarif, für alle mit festen Reisedaten. Bei Stornierung nicht erstattbar." },
    },
  },
  {
    /* Fasce confermate dal titolare (ottobre 2026), gestite nella sezione
       sconti di bed-and-breakfast.it: non si dice su quale voce si
       applicano né che il motore le calcola da solo (non confermato). */
    id: "riduzioni-bambini",
    href: "/vacanza-in-famiglia/",
    text: {
      it: { title: "Riduzioni per i bambini", body: "Da 0 a 2 anni gratis; da 3 a 8 anni non compiuti riduzione del 50%; da 8 a 11 anni non compiuti riduzione del 30%. Indica le età dei bambini quando prenoti." },
      en: { title: "Reductions for children", body: "Ages 0 to 2 free; from 3 to under 8, 50% reduction; from 8 to under 11, 30% reduction. Tell us the children's ages when you book." },
      fr: { title: "Réductions pour les enfants", body: "De 0 à 2 ans gratuit ; de 3 ans à moins de 8 ans, réduction de 50 % ; de 8 ans à moins de 11 ans, réduction de 30 %. Indiquez l'âge des enfants lors de la réservation." },
      de: { title: "Ermäßigungen für Kinder", body: "0 bis 2 Jahre kostenlos; 3 bis unter 8 Jahre 50 % Ermäßigung; 8 bis unter 11 Jahre 30 % Ermäßigung. Geben Sie bei der Buchung das Alter der Kinder an." },
    },
  },
  {
    id: "ottavo-centenario",
    href: "/ottavo-centenario-san-francesco/",
    text: {
      it: { title: "Ottavo Centenario di San Francesco", body: "Colazione bio inclusa per chi prenota direttamente dal sito ufficiale." },
      en: { title: "8th Centenary of St. Francis", body: "Organic breakfast included for those who book directly through the official site." },
      fr: { title: "8e Centenaire de Saint François", body: "Petit-déjeuner bio inclus pour une réservation directe sur le site officiel." },
      de: { title: "800. Todestag des Heiligen Franziskus", body: "Bio-Frühstück inklusive bei Direktbuchung über die offizielle Website." },
    },
  },
  {
    id: "cofanetti-regalo",
    href: "/offerte/cofanetti-regalo/",
    text: {
      it: { title: "Cofanetti regalo", body: "Quattro pacchetti pensati per coppie e famiglie, con notti, colazioni e servizi già inclusi." },
      en: { title: "Gift boxes", body: "Four packages designed for couples and families, with nights, breakfast and services already included." },
      fr: { title: "Coffrets cadeaux", body: "Quatre formules pensées pour les couples et les familles, nuits, petit-déjeuner et services déjà inclus." },
      de: { title: "Geschenkboxen", body: "Vier Pakete für Paare und Familien, mit Nächten, Frühstück und Leistungen bereits inbegriffen." },
    },
  },
  {
    id: "smartbox",
    href: "/offerte/smartbox/",
    text: {
      it: { title: "Smartbox", body: "Hai già un cofanetto Smartbox? Ecco come registrarlo e prenotare il soggiorno." },
      en: { title: "Smartbox", body: "Already have a Smartbox voucher? Here's how to register it and book your stay." },
      fr: { title: "Smartbox", body: "Vous avez déjà un coffret Smartbox ? Voici comment l'enregistrer et réserver votre séjour." },
      de: { title: "Smartbox", body: "Haben Sie bereits eine Smartbox? So registrieren Sie sie und buchen Ihren Aufenthalt." },
    },
  },
];
