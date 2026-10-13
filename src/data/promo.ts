import type { Locale } from "@/lib/i18n";
import { EUROCHOCOLATE_2024_PHOTO, type CreditedPhoto } from "@/data/photo-credits";

/* Promozioni a tempo del sito: UNICA fonte per date, condizioni e testi
   delle offerte legate a un evento. Oggi solo Eurochocolate 2026 (offerta
   del titolare pubblicata sulla pagina Facebook della struttura).

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

const ALL_PROMOS: Promo[] = Object.values(PROMOS);

export function getPromoStatus(promo: Promo, now: number): PromoStatus {
  if (promo.startsAt && now < Date.parse(promo.startsAt)) return "upcoming";
  return now <= Date.parse(promo.endsAt) ? "active" : "expired";
}

/* Promo a tempo da mostrare adesso (popup, etichetta nell'header, offerte
   in corso), dalla più vicina alla scadenza. */
export function getActivePromos(now: number): Promo[] {
  return ALL_PROMOS.filter((p) => getPromoStatus(p, now) === "active").sort((a, b) => Date.parse(a.endsAt) - Date.parse(b.endsAt));
}

/* Promo concluse, dalla più recente. */
export function getExpiredPromos(now: number): Promo[] {
  return ALL_PROMOS.filter((p) => getPromoStatus(p, now) === "expired").sort((a, b) => Date.parse(b.endsAt) - Date.parse(a.endsAt));
}

export const WHATSAPP_NUMBER = "393934363917";

export function promoWhatsappUrl(promo: Promo, locale: Locale): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(promo.text[locale].whatsappMessage)}`;
}
