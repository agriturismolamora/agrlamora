import type { Locale } from "@/lib/i18n";
import { EUROCHOCOLATE_2024_PHOTO, type CreditedPhoto } from "@/data/photo-credits";

/* Promozioni a tempo del sito: UNICA fonte per date, condizioni e testi
   delle offerte legate a un evento. Due tipi (`kind`):
   - "discount": sconto legato a un evento (Eurochocolate 2026, offerta del
     titolare pubblicata sulla pagina Facebook della struttura);
   - "package": pacchetto a prezzo fisso (Capodanno, più sotto).

   Le condizioni sono riportate ESATTAMENTE come nel post del titolare: niente
   cumulabilità, minimo notti, appartamenti esclusi o applicazione automatica
   nel motore di prenotazione — sono punti non confermati, tenuti qui sotto
   come costanti a valore null (DA CONFERMARE) e mai mostrati in pagina.

   Le date sono interpretate nel fuso Europe/Rome: `endsAt` è l'ultimo
   istante di validità (fine giornata, ora italiana). Lo stato di una promo
   si legge SOLO da getPromoStatus() / getActivePromos() qui sotto, mai con
   confronti di date sparsi nei componenti. Il sito è statico (SSG), quindi
   lo stato va calcolato nel browser, DOPO il mount (hook useNow(), vedi
   src/hooks/use-now.ts): mai durante il render statico, altrimenti HTML del
   server e del client divergerebbero. Scaduta una promo, il sito smette da
   solo di mostrarla: niente popup, niente etichetta nell'header, "Offerta
   conclusa" dove resta citata. */

export type PromoId = "eurochocolate-2026";
export type PackageId = "capodanno-2027";

/* upcoming: non ancora pubblicizzata; active: da mostrare (popup,
   etichetta nell'header, offerte in corso); expired: conclusa. */
export type PromoStatus = "upcoming" | "active" | "expired";

export type PromoText = {
  /* Testo datato, presente nell'HTML statico: resta vero anche per chi
     legge la pagina senza JavaScript (crawler compresi). */
  validity: string;
  title: string;
  conditionsHeading: string;
  conditions: string[];
  bookCta: string;
  whatsappCta: string;
  whatsappMessage: string;
  /* Link alla pagina Facebook ("Mi piace") e al post dell'offerta ("Salva"). */
  facebookCta: string;
  facebookPostCta: string;
  ended: string;
  /* Pagina /offerte/offerte-in-corso/: 1–2 righe sulla promo e testo del
     link all'articolo con le condizioni complete. */
  summary: string;
  articleCta: string;
};

export type Promo = {
  kind: "discount";
  id: PromoId;
  discountPercent: number;
  /* Date dell'evento (13–22 novembre 2026, fonte: eurochocolate.com). */
  eventStart: string;
  eventEnd: string;
  /* Primo istante in cui la promo si mostra sul sito, ora italiana.
     Assente: in corso già dalla pubblicazione. */
  startsAt?: string;
  /* Ultimo istante di validità dell'offerta, ora italiana. */
  endsAt: string;
  articleSlug: string;
  /* Foto reale con credito (src/data/photo-credits.ts), per la card. */
  image: CreditedPhoto;
  text: Record<Locale, PromoText>;
};

export const FACEBOOK_PAGE_URL = "https://www.facebook.com/p/Agriturismo-la-Mora-di-Assisi-100066662774182/";

/* Post Facebook dell'offerta Eurochocolate (fornito dal titolare il
   07/10/2026): è il link di "Salva il post dell'offerta". Se tornasse vuoto,
   facebookOfferUrl() ripiega sulla pagina Facebook. */
export const FACEBOOK_POST_URL =
  "https://www.facebook.com/story.php?story_fbid=pfbid0c7CRt6fxW6bHasJwNmYKb4jep2ZWhrK6M3oRJsCUvhWar5GnE8KDKhJQiw8LYgDkl&id=100066662774182";

export function facebookOfferUrl(): string {
  return FACEBOOK_POST_URL || FACEBOOK_PAGE_URL;
}

/* DA CONFERMARE col titolare — NON mostrati da nessuna parte nel sito
   finché restano null. Il post non dice nulla su questi punti:
   - cumulabilità con le altre offerte dirette (-10% da 7 notti, -10% per
     chi torna, -10% tariffa non rimborsabile);
   - soggiorno minimo richiesto durante l'evento;
   - appartamenti esclusi dall'offerta;
   - come si applica lo sconto: il motore bed-and-breakfast.it NON lo
     applica da solo (vedi nota sotto), il post parla di verifica "al
     momento del pagamento". */
export const EUROCHOCOLATE_CUMULABILE: boolean | null = null;
export const EUROCHOCOLATE_MINIMO_NOTTI: number | null = null;
export const EUROCHOCOLATE_APPARTAMENTI_ESCLUSI: string[] | null = null;
export const EUROCHOCOLATE_APPLICAZIONE_NEL_MOTORE: "automatica" | "manuale" | null = null;

/* NOTA — widget Offerte bed-and-breakfast.it (widget_offerte.cfm, id 60754),
   interrogato il 06/10/2026: NON contiene un'offerta Eurochocolate. Risponde
   con due sole offerte:
   1. "10% di sconto — Valida dal 22 set 2026 al 31 gen 2029 — Soggiorno
      minimo: 7" (corrisponde al -10% da 7 notti già sul sito);
   2. "10% di sconto — Valida dal 29 set 2026 al 14 ott 2026", SENZA titolo
      né altre condizioni: non si sa a cosa corrisponda, da chiarire col
      titolare. */

export const EUROCHOCOLATE_2026: Promo = {
  kind: "discount",
  id: "eurochocolate-2026",
  discountPercent: 10,
  eventStart: "2026-11-13",
  eventEnd: "2026-11-22",
  /* Fine dell'offerta confermata dal titolare (13/10/2026): ultimo giorno
     di Eurochocolate, fine giornata a Roma (a novembre CET, +01:00). */
  endsAt: "2026-11-22T23:59:59.999+01:00",
  articleSlug: "eurochocolate-2026-dove-dormire",
  image: EUROCHOCOLATE_2024_PHOTO,
  text: {
    it: {
      validity: "Valida per tutta la durata di Eurochocolate, dal 13 al 22 novembre 2026",
      title: "Dormi a La Mora con il -10% durante Eurochocolate",
      conditionsHeading: "Condizioni",
      conditions: [
        "Metti \"Mi piace\" alla pagina Facebook di Agriturismo La Mora.",
        "Salva il post dell'offerta oppure mostra il biglietto di Eurochocolate al momento del pagamento.",
        "Disponibilità limitata nei giorni dell'evento.",
      ],
      bookCta: "Prenota all'Agriturismo La Mora",
      whatsappCta: "Scrivici su WhatsApp",
      whatsappMessage: "Ciao! Vorrei soggiornare a La Mora durante Eurochocolate 2026 con l'offerta -10%. Le mie date sono: ",
      facebookCta: "Metti Mi piace alla pagina Facebook",
      facebookPostCta: "Salva il post dell'offerta",
      ended: "Offerta conclusa",
      summary: "Il festival internazionale del cioccolato nel centro di Perugia, a 21,0 km da La Mora: 10% di sconto sul soggiorno per tutta la durata dell'evento, alle condizioni dell'offerta.",
      articleCta: "Leggi l'articolo e le condizioni",
    },
    en: {
      validity: "Valid for the whole of Eurochocolate, 13 to 22 November 2026",
      title: "Stay at La Mora with 10% off during Eurochocolate",
      conditionsHeading: "Conditions",
      conditions: [
        "Like the Agriturismo La Mora Facebook page.",
        "Save the offer post or show your Eurochocolate ticket when you pay.",
        "Limited availability on the days of the event.",
      ],
      bookCta: "Book at Agriturismo La Mora",
      whatsappCta: "Message us on WhatsApp",
      whatsappMessage: "Hi! I'd like to stay at La Mora during Eurochocolate 2026 with the 10% offer. My dates are: ",
      facebookCta: "Like our Facebook page",
      facebookPostCta: "Save the offer post",
      ended: "Offer ended",
      summary: "The international chocolate festival in the centre of Perugia, 21.0 km from La Mora: 10% off your stay for the whole event, under the offer's conditions.",
      articleCta: "Read the article and conditions",
    },
    fr: {
      validity: "Valable pendant toute la durée d'Eurochocolate, du 13 au 22 novembre 2026",
      title: "Dormez à La Mora avec -10 % pendant Eurochocolate",
      conditionsHeading: "Conditions",
      conditions: [
        "Aimez la page Facebook d'Agriturismo La Mora.",
        "Enregistrez la publication de l'offre ou présentez votre billet Eurochocolate au moment du paiement.",
        "Disponibilité limitée pendant les jours de l'événement.",
      ],
      bookCta: "Réserver à l'Agriturismo La Mora",
      whatsappCta: "Écrivez-nous sur WhatsApp",
      whatsappMessage: "Bonjour ! Je voudrais séjourner à La Mora pendant Eurochocolate 2026 avec l'offre -10%. Mes dates sont : ",
      facebookCta: "Aimer notre page Facebook",
      facebookPostCta: "Enregistrer la publication de l'offre",
      ended: "Offre terminée",
      summary: "Le festival international du chocolat dans le centre de Pérouse, à 21,0 km de La Mora : 10 % de remise sur le séjour pendant toute la durée de l'événement, aux conditions de l'offre.",
      articleCta: "Lire l'article et les conditions",
    },
    de: {
      validity: "Gültig während der gesamten Eurochocolate, vom 13. bis 22. November 2026",
      title: "Mit 10 % Rabatt im La Mora übernachten, während der Eurochocolate",
      conditionsHeading: "Bedingungen",
      conditions: [
        "Geben Sie der Facebook-Seite von Agriturismo La Mora ein „Gefällt mir“.",
        "Speichern Sie den Beitrag mit dem Angebot oder zeigen Sie beim Bezahlen Ihr Eurochocolate-Ticket vor.",
        "Begrenzte Verfügbarkeit an den Veranstaltungstagen.",
      ],
      bookCta: "Im Agriturismo La Mora buchen",
      whatsappCta: "Schreiben Sie uns auf WhatsApp",
      whatsappMessage: "Hallo! Ich möchte während der Eurochocolate 2026 mit dem Angebot -10% bei La Mora übernachten. Meine Daten sind: ",
      facebookCta: "Unsere Facebook-Seite liken",
      facebookPostCta: "Den Angebotsbeitrag speichern",
      ended: "Angebot beendet",
      summary: "Das internationale Schokoladenfestival im Zentrum von Perugia, 21,0 km von La Mora: 10 % Rabatt auf den Aufenthalt während der gesamten Veranstaltung, zu den Bedingungen des Angebots.",
      articleCta: "Artikel und Bedingungen lesen",
    },
  },
};

export const PROMOS: Record<PromoId, Promo> = {
  "eurochocolate-2026": EUROCHOCOLATE_2026,
};

/* Pacchetto a prezzo fisso: niente sconto, niente popup della home (scelta
   del 21/10/2026), ma è una promo a tempo a tutti gli effetti: tiene accesa
   l'etichetta "Offerte in corso!" nell'header, compare tra le offerte
   attive di /offerte/offerte-in-corso/ e, scaduto, passa tra le concluse. */
export type PackageText = {
  kicker: string;
  title: string;
  /* "4 notti per Capodanno, colazione inclusa": sotto il titolo e
     nell'elenco delle concluse. Nessuna data: non confermate. */
  validity: string;
  /* "4 notti", nelle card dei prezzi. */
  nightsShort: string;
  summary: string;
  availability: string;
  /* Etichetta della fascia di prezzo, {n} = numero di persone. */
  guests: string;
  whatsappCta: string;
  whatsappMessage: string;
  /* Solo quando il pacchetto è nel motore (inMotore: true). */
  bookCta: string;
  ended: string;
  articleCta: string;
};

export type PackagePromo = {
  kind: "package";
  id: PackageId;
  nights: number;
  breakfastIncluded: boolean;
  /* Prezzo del pacchetto per numero di persone, in euro. */
  prices: { guests: number; price: number }[];
  /* false finché il titolare non crea il pacchetto nel motore
     bed-and-breakfast.it: CTA WhatsApp. true: la CTA diventa
     BookingModalButton (capodanno-package.tsx), senza altre modifiche. */
  inMotore: boolean;
  /* NON confermati dal titolare: restano null e non si mostrano. */
  dates: { from: string; to: string } | null;
  apartments: string[] | null;
  startsAt?: string;
  endsAt: string;
  articleSlug: string;
  /* Ancora della sezione del pacchetto nell'articolo. */
  articleAnchor: string;
  /* Foto reale del titolare (con filigrana fuori dal blog). */
  image: { src: string; position?: string; alt: Record<Locale, string> };
  text: Record<Locale, PackageText>;
};

/* Pacchetto Capodanno, confermato dal titolare il 21/10/2026: 4 notti con
   colazione inclusa; per 2 persone 450 €, per 3 persone 500 €, per 4
   persone 550 €. Date, appartamenti e altre condizioni NON indicati (null,
   mai mostrati); non ancora nel motore di prenotazione (lo crea il
   titolare). Visibile da subito fino a fine giornata del 02/01/2027 (ora
   italiana, CET): valore predefinito, da confermare col titolare. */
export const CAPODANNO_PACKAGE_2027: PackagePromo = {
  kind: "package",
  id: "capodanno-2027",
  nights: 4,
  breakfastIncluded: true,
  prices: [
    { guests: 2, price: 450 },
    { guests: 3, price: 500 },
    { guests: 4, price: 550 },
  ],
  inMotore: false,
  dates: null,
  apartments: null,
  endsAt: "2027-01-02T23:59:59.999+01:00",
  articleSlug: "capodanno-assisi-2027",
  articleAnchor: "pacchetto-capodanno",
  image: {
    src: "/images/territorio/assisi/assisi con tramonto.jpg",
    position: "62% 50%",
    alt: {
      it: "Assisi al tramonto, con la Basilica di San Francesco e il Sacro Convento",
      en: "Assisi at sunset, with the Basilica of St. Francis and the Sacro Convento",
      fr: "Assise au coucher du soleil, avec la basilique Saint-François et le Sacro Convento",
      de: "Assisi im Sonnenuntergang, mit der Basilika San Francesco und dem Sacro Convento",
    },
  },
  text: {
    it: {
      kicker: "Il nostro pacchetto",
      title: "Pacchetto Capodanno a La Mora",
      validity: "4 notti per Capodanno, colazione inclusa",
      nightsShort: "4 notti",
      summary: "Per 2 persone 450 €, per 3 persone 500 €, per 4 persone 550 €.",
      availability: "Date e disponibilità: chiedi a Paolo.",
      guests: "{n} persone",
      whatsappCta: "Chiedi il pacchetto a Paolo su WhatsApp",
      whatsappMessage: "Ciao Paolo! Mi interessa il pacchetto Capodanno di La Mora (4 notti con colazione inclusa). Quali date sono disponibili? Saremmo in: ",
      bookCta: "Prenota il pacchetto Capodanno",
      ended: "Offerta conclusa",
      articleCta: "Il pacchetto nell'articolo sul Capodanno",
    },
    en: {
      kicker: "Our package",
      title: "New Year package at La Mora",
      validity: "4 nights for New Year, breakfast included",
      nightsShort: "4 nights",
      summary: "€450 for 2 people, €500 for 3 people, €550 for 4 people.",
      availability: "Dates and availability: ask Paolo.",
      guests: "{n} people",
      whatsappCta: "Ask Paolo about the package on WhatsApp",
      whatsappMessage: "Hi Paolo! I'm interested in La Mora's New Year package (4 nights with breakfast included). Which dates are available? We would be: ",
      bookCta: "Book the New Year package",
      ended: "Offer ended",
      articleCta: "The package in our New Year article",
    },
    fr: {
      kicker: "Notre forfait",
      title: "Forfait Nouvel An à La Mora",
      validity: "4 nuits pour le Nouvel An, petit-déjeuner inclus",
      nightsShort: "4 nuits",
      summary: "450 € pour 2 personnes, 500 € pour 3 personnes, 550 € pour 4 personnes.",
      availability: "Dates et disponibilités : demandez à Paolo.",
      guests: "{n} personnes",
      whatsappCta: "Demander le forfait à Paolo sur WhatsApp",
      whatsappMessage: "Bonjour Paolo ! Le forfait Nouvel An de La Mora (4 nuits avec petit-déjeuner inclus) m'intéresse. Quelles dates sont disponibles ? Nous serions : ",
      bookCta: "Réserver le forfait Nouvel An",
      ended: "Offre terminée",
      articleCta: "Le forfait dans notre article sur le Nouvel An",
    },
    de: {
      kicker: "Unser Paket",
      title: "Silvesterpaket im La Mora",
      validity: "4 Nächte zu Silvester, Frühstück inklusive",
      nightsShort: "4 Nächte",
      summary: "Für 2 Personen 450 €, für 3 Personen 500 €, für 4 Personen 550 €.",
      availability: "Termine und Verfügbarkeit: fragen Sie Paolo.",
      guests: "{n} Personen",
      whatsappCta: "Paolo auf WhatsApp nach dem Paket fragen",
      whatsappMessage: "Hallo Paolo! Ich interessiere mich für das Silvesterpaket im La Mora (4 Nächte mit Frühstück inklusive). Welche Termine sind frei? Wir wären: ",
      bookCta: "Silvesterpaket buchen",
      ended: "Angebot beendet",
      articleCta: "Das Paket in unserem Silvester-Artikel",
    },
  },
};

export const PACKAGES: Record<PackageId, PackagePromo> = {
  "capodanno-2027": CAPODANNO_PACKAGE_2027,
};

/* Prezzo nel formato del sito: "450 €" (it, fr, de; spazio non
   separabile), "€450" (en). */
export function formatEuro(amount: number, locale: Locale): string {
  return locale === "en" ? `€${amount}` : `${amount} €`;
}

export type TimedPromo = Promo | PackagePromo;

const ALL_PROMOS: TimedPromo[] = [...Object.values(PROMOS), ...Object.values(PACKAGES)];

export function getPromoStatus(promo: { startsAt?: string; endsAt: string }, now: number): PromoStatus {
  if (promo.startsAt && now < Date.parse(promo.startsAt)) return "upcoming";
  return now <= Date.parse(promo.endsAt) ? "active" : "expired";
}

/* Promo a tempo da mostrare adesso (etichetta nell'header, offerte in
   corso; il popup solo per le "discount"), dalla più vicina alla scadenza. */
export function getActivePromos(now: number): TimedPromo[] {
  return ALL_PROMOS.filter((p) => getPromoStatus(p, now) === "active").sort((a, b) => Date.parse(a.endsAt) - Date.parse(b.endsAt));
}

/* Promo concluse, dalla più recente. */
export function getExpiredPromos(now: number): TimedPromo[] {
  return ALL_PROMOS.filter((p) => getPromoStatus(p, now) === "expired").sort((a, b) => Date.parse(b.endsAt) - Date.parse(a.endsAt));
}

export const WHATSAPP_NUMBER = "393934363917";

/* Link all'articolo della promo (con l'ancora della sezione, per i
   pacchetti), path italiano: la lingua la aggiunge withLocale(). */
export function promoArticlePath(promo: TimedPromo): string {
  return `/blog/${promo.articleSlug}/${promo.kind === "package" ? `#${promo.articleAnchor}` : ""}`;
}

export function promoWhatsappUrl(promo: { text: Record<Locale, { whatsappMessage: string }> }, locale: Locale): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(promo.text[locale].whatsappMessage)}`;
}
