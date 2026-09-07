import type { Locale } from "@/lib/i18n";

/* FONTE DI VERITÀ UNICA per l'audit privacy del sito, verificata leggendo
   il codice reale (non un template generico) il 7 settembre 2026:
   - package.json: nessuna dipendenza di analytics/marketing/tracking.
   - .env.local: solo GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID,
     NEXT_PUBLIC_RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY.
   - Ricerca di "gtag|GTM|fbq|pixel|hotjar|clarity|mixpanel|hubspot|
     intercom" in tutto src/: nessun risultato reale.
   - Ricerca di <iframe>, <script>, document.cookie, localStorage,
     sessionStorage in tutto src/: risultati riportati uno per uno qui sotto.
   Se in futuro si aggiunge un nuovo servizio (Google Analytics, un CRM,
   un nuovo pixel...), va aggiunto QUI PRIMA di essere attivato nel
   codice, e va aggiornata CONSENT_VERSION in src/lib/consent.ts. */

export type ConsentCategory = "necessary" | "functional" | "analytics" | "marketing";

export type PrivacyService = {
  id: string;
  name: string;
  provider: string;
  category: ConsentCategory;
  /** true = i dati escono dal browser dell'utente verso il fornitore terzo. */
  thirdParty: boolean;
  /** Cookie/storage realmente impostati da questo servizio, se presenti. */
  storage: { name: string; type: "cookie" | "localStorage"; duration: string; firstParty: boolean }[];
  active: boolean;
  description: Record<Locale, string>;
  purpose: Record<Locale, string>;
  privacyPolicyUrl?: string;
};

export const PRIVACY_SERVICES: PrivacyService[] = [
  {
    id: "consent-cookie",
    name: "Cookie di consenso",
    provider: "Agriturismo La Mora (prima parte)",
    category: "necessary",
    thirdParty: false,
    storage: [{ name: "lamora_consent", type: "cookie", duration: "6 mesi", firstParty: true }],
    active: true,
    description: {
      it: "Memorizza la scelta espressa nel banner cookie (quali categorie sono state accettate), la versione della policy accettata e la data della scelta.",
      en: "Stores the choice made in the cookie banner (which categories were accepted), the accepted policy version, and the date of the choice.",
      fr: "Enregistre le choix exprimé dans la bannière cookies (catégories acceptées), la version de la politique acceptée et la date du choix.",
      de: "Speichert die im Cookie-Banner getroffene Wahl (akzeptierte Kategorien), die akzeptierte Richtlinienversion und das Datum der Wahl.",
    },
    purpose: {
      it: "Necessario per non richiedere il consenso ad ogni pagina/visita ed evitare di riproporre scelte già fatte.",
      en: "Needed so the site doesn't ask for consent on every page/visit and doesn't repeat choices already made.",
      fr: "Nécessaire pour ne pas redemander le consentement à chaque page/visite et ne pas répéter des choix déjà faits.",
      de: "Notwendig, damit die Website nicht bei jeder Seite/jedem Besuch erneut um Zustimmung bittet.",
    },
  },
  {
    id: "recaptcha",
    name: "Google reCAPTCHA v3",
    provider: "Google LLC",
    category: "functional",
    thirdParty: true,
    storage: [{ name: "_GRECAPTCHA e altri cookie tecnici di Google", type: "cookie", duration: "fino a 6 mesi (definita da Google, non modificabile da noi)", firstParty: false }],
    active: true,
    description: {
      it: "Script anti-spam di Google, caricato solo quando l'utente interagisce con il modulo di iscrizione alla newsletter, e solo se è stato dato il consenso alla categoria Funzionali.",
      en: "Google's anti-spam script, loaded only when the user interacts with the newsletter sign-up form, and only if consent for the Functional category has been given.",
      fr: "Script anti-spam de Google, chargé uniquement lorsque l'utilisateur interagit avec le formulaire d'inscription à la newsletter, et seulement si le consentement à la catégorie Fonctionnels a été donné.",
      de: "Anti-Spam-Skript von Google, das nur geladen wird, wenn der Nutzer mit dem Newsletter-Anmeldeformular interagiert, und nur bei erteilter Zustimmung zur Kategorie Funktional.",
    },
    purpose: {
      it: "Protegge il modulo di iscrizione newsletter da invii automatizzati (bot/spam). Comporta l'invio di dati tecnici del dispositivo a Google.",
      en: "Protects the newsletter sign-up form from automated submissions (bots/spam). Involves sending device technical data to Google.",
      fr: "Protège le formulaire d'inscription à la newsletter contre les envois automatisés (bots/spam). Implique l'envoi de données techniques de l'appareil à Google.",
      de: "Schützt das Newsletter-Anmeldeformular vor automatisierten Übermittlungen (Bots/Spam). Beinhaltet die Übertragung technischer Gerätedaten an Google.",
    },
    privacyPolicyUrl: "https://policies.google.com/privacy",
  },
  {
    id: "promo-popup-timing",
    name: "Promemoria popup promozionale",
    provider: "Agriturismo La Mora (prima parte)",
    category: "functional",
    thirdParty: false,
    storage: [{ name: "lamora_promo_last_shown", type: "localStorage", duration: "fino a cancellazione manuale (rilevante per 2 giorni)", firstParty: true }],
    active: true,
    description: {
      it: "Ricorda quando è stato mostrato l'ultima volta il popup con le condizioni di prenotazione diretta, per non riproporlo ad ogni pagina.",
      en: "Remembers when the direct-booking conditions popup was last shown, so it isn't shown on every page.",
      fr: "Se souvient de la dernière fois où la fenêtre des conditions de réservation directe a été affichée, pour ne pas la répéter à chaque page.",
      de: "Merkt sich, wann das Popup mit den Direktbuchungskonditionen zuletzt angezeigt wurde, damit es nicht auf jeder Seite erscheint.",
    },
    purpose: {
      it: "Solo comfort di navigazione: nessun dato personale, nessuna identificazione dell'utente, nessuna trasmissione a terzi.",
      en: "Pure browsing comfort: no personal data, no user identification, no transmission to third parties.",
      fr: "Simple confort de navigation : aucune donnée personnelle, aucune identification de l'utilisateur, aucune transmission à des tiers.",
      de: "Reiner Navigationskomfort: keine personenbezogenen Daten, keine Nutzeridentifikation, keine Weitergabe an Dritte.",
    },
  },
  {
    id: "google-places-reviews",
    name: "Google Places API (recensioni)",
    provider: "Google LLC",
    category: "necessary",
    thirdParty: true,
    storage: [],
    active: true,
    description: {
      it: "Le recensioni Google mostrate sul sito vengono richieste dal nostro server, non dal browser dell'utente: nessun cookie viene impostato nel tuo dispositivo da questa integrazione.",
      en: "The Google reviews shown on the site are requested by our server, not by the visitor's browser: this integration sets no cookie on your device.",
      fr: "Les avis Google affichés sur le site sont demandés par notre serveur, pas par le navigateur du visiteur : cette intégration ne dépose aucun cookie sur votre appareil.",
      de: "Die auf der Website angezeigten Google-Bewertungen werden von unserem Server abgerufen, nicht vom Browser des Besuchers: diese Integration setzt keinen Cookie auf Ihrem Gerät.",
    },
    purpose: {
      it: "Mostrare recensioni reali e aggiornate della struttura. Le foto profilo dei recensori sono servite tramite il nostro dominio (ottimizzazione immagini di Next.js), non caricate direttamente da Google.",
      en: "Displays real, up-to-date reviews of the property. Reviewer profile photos are served through our own domain (Next.js image optimization), not loaded directly from Google.",
      fr: "Affiche des avis réels et à jour de l'établissement. Les photos de profil des auteurs d'avis sont servies via notre propre domaine (optimisation d'images Next.js), non chargées directement depuis Google.",
      de: "Zeigt echte, aktuelle Bewertungen der Unterkunft. Profilfotos der Bewertenden werden über unsere eigene Domain ausgeliefert (Next.js-Bildoptimierung), nicht direkt von Google geladen.",
    },
  },
  {
    id: "facebook-graph-photos",
    name: "Facebook Graph API (foto pagina)",
    provider: "Meta Platforms, Inc.",
    category: "necessary",
    thirdParty: true,
    storage: [],
    active: false,
    description: {
      it: "Integrazione predisposta ma NON attiva: mancano le variabili d'ambiente necessarie. Se attivata in futuro, resterebbe una chiamata server-to-server (nessun cookie nel browser dell'utente), esattamente come le recensioni Google.",
      en: "Integration is built but NOT active: the required environment variables are missing. If activated in the future, it would remain a server-to-server call (no cookie in the visitor's browser), exactly like the Google reviews.",
      fr: "Intégration prête mais NON active : les variables d'environnement nécessaires sont absentes. Si elle est activée à l'avenir, elle resterait un appel serveur à serveur (aucun cookie dans le navigateur du visiteur), exactement comme les avis Google.",
      de: "Integration ist vorbereitet, aber NICHT aktiv: die erforderlichen Umgebungsvariablen fehlen. Bei künftiger Aktivierung bliebe es ein Server-zu-Server-Aufruf (kein Cookie im Browser des Besuchers), genau wie bei den Google-Bewertungen.",
    },
    purpose: {
      it: "Mostrare le foto più recenti della pagina Facebook della struttura, come riempimento delle sezione \"Seguici su Facebook\".",
      en: "Displays the most recent photos from the property's Facebook page, filling the \"Follow us on Facebook\" section.",
      fr: "Affiche les photos les plus récentes de la page Facebook de l'établissement, dans la section « Suivez-nous sur Facebook ».",
      de: "Zeigt die neuesten Fotos der Facebook-Seite der Unterkunft im Abschnitt „Folgen Sie uns auf Facebook“.",
    },
  },
];

export function getActiveServicesByCategory(category: ConsentCategory): PrivacyService[] {
  return PRIVACY_SERVICES.filter((s) => s.category === category && s.active);
}

export function getAllServicesByCategory(category: ConsentCategory): PrivacyService[] {
  return PRIVACY_SERVICES.filter((s) => s.category === category);
}

/* Link in uscita reali del sito (mai un embed/iframe): navigazione
   iniziata dall'utente, nessun dato inviato prima del click, quindi non
   richiedono consenso — elencati qui solo per trasparenza nella Cookie
   Policy. */
export const OUTBOUND_LINKS = [
  { name: "WhatsApp", provider: "WhatsApp Ireland Limited (Meta)", purpose: "Contatto diretto con la struttura" },
  { name: "Google Maps", provider: "Google LLC", purpose: "Indicazioni stradali verso la struttura" },
  { name: "TripAdvisor", provider: "Tripadvisor LLC", purpose: "Pagina recensioni della struttura" },
  { name: "Facebook", provider: "Meta Platforms, Inc.", purpose: "Pagina Facebook della struttura" },
  { name: "Smartbox", provider: "Smartbox Group", purpose: "Registrazione voucher regalo" },
] as const;
