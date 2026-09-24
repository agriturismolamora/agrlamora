import type { Locale } from "@/lib/i18n";

/* FONTE DI VERITÀ UNICA per l'audit privacy del sito, verificata leggendo
   il codice reale (non un template generico) il 7 settembre 2026, e
   aggiornata il 20 settembre 2026 con l'integrazione dei widget
   bed-and-breakfast.it (camere, richieste, offerte, last minute, punti di
   interesse, badge recensioni), e il 24 settembre 2026: rimossi dal sito
   il widget richieste (sostituito dal nostro modulo che prepara un
   messaggio WhatsApp, nessun servizio terzo) e il widget punti di
   interesse:
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
    id: "bbit-booking-request",
    name: "Widget prenotazione (Bed-and-breakfast.it)",
    provider: "Studio Scivoletto S.r.l. Unipersonale (bed-and-breakfast.it)",
    category: "necessary",
    thirdParty: true,
    storage: [{ name: "cookie di sessione impostati da bed-and-breakfast.it nel modulo aperto", type: "cookie", duration: "definita da bed-and-breakfast.it, non modificabile da noi", firstParty: false }],
    active: true,
    description: {
      it: "Il pulsante \"Prenota\" apre un modulo di prenotazione di bed-and-breakfast.it (camere disponibili, date, prezzi). Il modulo si carica SOLO quando lo apri tu cliccando quel pulsante, mai automaticamente: è la stessa azione esplicita con cui richiedi la prenotazione, quindi lo trattiamo come necessario, come le richieste che ci scrivi direttamente. Una volta aperto, sei nel loro modulo: i dati che inserisci lì sono trattati da bed-and-breakfast.it secondo la loro informativa, non dalla nostra.",
      en: "The \"Book now\" button opens a bed-and-breakfast.it booking form (available rooms, dates, prices). The form loads ONLY when you open it by clicking that button, never automatically: it's the same explicit action as asking to book, so we treat it as necessary, like requests you send us directly. Once open, you're inside their form: any data you enter there is processed by bed-and-breakfast.it under their own notice, not ours.",
      fr: "Le bouton « Réserver » ouvre un formulaire de réservation de bed-and-breakfast.it (chambres disponibles, dates, prix). Le formulaire ne se charge QUE lorsque vous l'ouvrez en cliquant sur ce bouton, jamais automatiquement : c'est la même action explicite que demander une réservation, nous le traitons donc comme nécessaire, comme les demandes que vous nous envoyez directement. Une fois ouvert, vous êtes dans leur formulaire : les données que vous y saisissez sont traitées par bed-and-breakfast.it selon leur propre politique, pas la nôtre.",
      de: "Die Schaltfläche „Jetzt buchen“ öffnet ein Buchungsformular von bed-and-breakfast.it (verfügbare Zimmer, Daten, Preise). Das Formular wird NUR geladen, wenn Sie es durch Klick auf diese Schaltfläche öffnen, niemals automatisch: es ist dieselbe ausdrückliche Handlung wie eine Buchungsanfrage, wir behandeln es daher als notwendig, wie Anfragen, die Sie uns direkt schreiben. Einmal geöffnet, befinden Sie sich in deren Formular: die dort eingegebenen Daten werden von bed-and-breakfast.it gemäß deren eigener Hinweise verarbeitet, nicht von uns.",
    },
    purpose: {
      it: "Permette di prenotare direttamente dal sito, senza dover scrivere via WhatsApp/email.",
      en: "Lets you book directly from the site, without having to write via WhatsApp/email.",
      fr: "Permet de réserver directement depuis le site, sans avoir à écrire via WhatsApp/e-mail.",
      de: "Ermöglicht die Buchung direkt über die Website, ohne per WhatsApp/E-Mail schreiben zu müssen.",
    },
    privacyPolicyUrl: "https://www.bed-and-breakfast.it/privacy.cfm?locale=it",
  },
  {
    id: "bbit-passive-widgets",
    name: "Widget offerte, last minute e recensioni (Bed-and-breakfast.it)",
    provider: "Studio Scivoletto S.r.l. Unipersonale (bed-and-breakfast.it)",
    category: "functional",
    thirdParty: true,
    storage: [{ name: "possibili cookie tecnici impostati da bed-and-breakfast.it/api.bed-and-breakfast.it", type: "cookie", duration: "definita da bed-and-breakfast.it, non modificabile da noi", firstParty: false }],
    active: true,
    description: {
      it: "A differenza del modulo di prenotazione, questi contenuti (offerte in corso, last minute, badge con il punteggio recensioni) si caricano da soli ad ogni visita della pagina in cui compaiono, senza un click: il tuo browser contatta direttamente bed-and-breakfast.it per mostrarli, il che espone il tuo indirizzo IP a loro anche se non interagisci con nulla. Per questo restano disattivati finché non accetti la categoria Funzionali: al loro posto vedi un breve avviso con un pulsante per attivarli.",
      en: "Unlike the booking form, this content (current offers, last-minute deals, the reviews-score badge) loads on its own every time you visit the page it appears on, with no click: your browser contacts bed-and-breakfast.it directly to display it, which exposes your IP address to them even if you don't interact with anything. Because of this, it stays off until you accept the Functional category: in its place you'll see a short notice with a button to turn it on.",
      fr: "Contrairement au formulaire de réservation, ces contenus (offres en cours, dernière minute, badge du score des avis) se chargent d'eux-mêmes à chaque visite de la page où ils apparaissent, sans clic : votre navigateur contacte directement bed-and-breakfast.it pour les afficher, ce qui expose votre adresse IP même si vous n'interagissez avec rien. C'est pourquoi ils restent désactivés tant que vous n'avez pas accepté la catégorie Fonctionnels : à leur place, vous verrez un court avis avec un bouton pour les activer.",
      de: "Anders als das Buchungsformular laden sich diese Inhalte (aktuelle Angebote, Last-Minute-Angebote, das Bewertungs-Badge) bei jedem Besuch der Seite, auf der sie erscheinen, von selbst, ohne Klick: Ihr Browser kontaktiert bed-and-breakfast.it direkt, um sie anzuzeigen, wodurch Ihre IP-Adresse offengelegt wird, auch wenn Sie mit nichts interagieren. Deshalb bleiben sie deaktiviert, bis Sie die Kategorie Funktional akzeptieren: an ihrer Stelle sehen Sie einen kurzen Hinweis mit einer Schaltfläche zur Aktivierung.",
    },
    purpose: {
      it: "Mostra contenuti informativi (offerte, last minute, punteggio recensioni) senza che tu debba visitare bed-and-breakfast.it separatamente.",
      en: "Shows informational content (offers, last-minute deals, reviews score) without you having to visit bed-and-breakfast.it separately.",
      fr: "Affiche du contenu informatif (offres, dernière minute, score des avis) sans que vous ayez à visiter bed-and-breakfast.it séparément.",
      de: "Zeigt informative Inhalte (Angebote, Last-Minute-Angebote, Bewertungspunktzahl), ohne dass Sie bed-and-breakfast.it separat besuchen müssen.",
    },
    privacyPolicyUrl: "https://www.bed-and-breakfast.it/privacy.cfm?locale=it",
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
