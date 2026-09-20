import type { Locale } from "@/lib/i18n";

/* Dizionario per le stringhe di interfaccia CONDIVISE su tutto il sito
   (header, footer, booking bar, concierge, newsletter...). Il contenuto
   editoriale specifico di ogni pagina/sezione vive invece in oggetti
   TEXT locali al componente stesso (stesso pattern già in uso nel
   progetto per i dati multi-variante, es. apartment-details.ts): un
   dizionario centrale unico per migliaia di righe di copy sarebbe
   ingestibile, mentre le stringhe qui sotto sono quelle davvero ripetute
   identiche ovunque. */
export const dict = {
  nav: {
    alloggi: { it: "Alloggi", en: "Apartments", fr: "Logements", de: "Unterkünfte" },
    villaRelax: { it: "Villa Relax", en: "Villa Relax", fr: "Villa Relax", de: "Villa Relax" },
    villaIndipendente: { it: "Villa indipendente", en: "Independent villa", fr: "Villa indépendante", de: "Unabhängige Villa" },
    laMora: { it: "La Mora", en: "La Mora", fr: "La Mora", de: "La Mora" },
    chiSiamo: { it: "Chi Siamo", en: "About Us", fr: "Qui Sommes-Nous", de: "Über Uns" },
    colazioneBio: { it: "Colazione Bio", en: "Organic Breakfast", fr: "Petit-Déjeuner Bio", de: "Bio-Frühstück" },
    territorio: { it: "Territorio", en: "The Area", fr: "Le Territoire", de: "Die Umgebung" },
    blog: { it: "Blog", en: "Blog", fr: "Blog", de: "Blog" },
    ottavoCentenario: { it: "Ottavo Centenario San Francesco", en: "8th Centenary of St. Francis", fr: "8e Centenaire de Saint François", de: "800. Todestag des Heiligen Franziskus" },
    esperienze: { it: "Esperienze", en: "Experiences", fr: "Expériences", de: "Erlebnisse" },
    attivita: { it: "Attività", en: "Activities", fr: "Activités", de: "Aktivitäten" },
    offerte: { it: "Offerte", en: "Offers", fr: "Offres", de: "Angebote" },
    cofanettiRegalo: { it: "Cofanetti regalo", en: "Gift Boxes", fr: "Coffrets Cadeaux", de: "Geschenkboxen" },
    smartbox: { it: "Smartbox", en: "Smartbox", fr: "Smartbox", de: "Smartbox" },
    recensioni: { it: "Recensioni", en: "Reviews", fr: "Avis", de: "Bewertungen" },
    contatti: { it: "Contatti", en: "Contact", fr: "Contact", de: "Kontakt" },
    menu: { it: "Menu", en: "Menu", fr: "Menu", de: "Menü" },
    chiudi: { it: "Chiudi", en: "Close", fr: "Fermer", de: "Schließen" },
    seguici: { it: "Seguici", en: "Follow Us", fr: "Suivez-nous", de: "Folgen Sie uns" },
    domande: { it: "Domande?", en: "Questions?", fr: "Des questions ?", de: "Fragen?" },
    chiama: { it: "Chiama", en: "Call", fr: "Appeler", de: "Anrufen" },
    scriviWhatsapp: { it: "Scrivi WhatsApp", en: "Message WhatsApp", fr: "Écrire sur WhatsApp", de: "WhatsApp schreiben" },
    torna: { it: "Torna alla home", en: "Back to home", fr: "Retour à l'accueil", de: "Zurück zur Startseite" },
  },
  footer: {
    linkUtili: { it: "Link utili", en: "Useful links", fr: "Liens utiles", de: "Nützliche Links" },
    privacy: { it: "Privacy", en: "Privacy", fr: "Confidentialité", de: "Datenschutz" },
    cookie: { it: "Cookie", en: "Cookies", fr: "Cookies", de: "Cookies" },
  },
  booking: {
    entrata: { it: "Entrata", en: "Check-in", fr: "Arrivée", de: "Anreise" },
    uscita: { it: "Uscita", en: "Check-out", fr: "Départ", de: "Abreise" },
    arrivo: { it: "Arrivo", en: "Check-in", fr: "Arrivée", de: "Anreise" },
    partenza: { it: "Partenza", en: "Check-out", fr: "Départ", de: "Abreise" },
    ospiti: { it: "Ospiti", en: "Guests", fr: "Voyageurs", de: "Gäste" },
    adulti: { it: "Adulti", en: "Adults", fr: "Adultes", de: "Erwachsene" },
    bambini: { it: "Bambini", en: "Children", fr: "Enfants", de: "Kinder" },
    fatto: { it: "Fatto", en: "Done", fr: "Terminé", de: "Fertig" },
    prenotaOra: { it: "Prenota ora", en: "Book now", fr: "Réserver", de: "Jetzt buchen" },
    prenotaVilla: { it: "Prenota Villa", en: "Book the Villa", fr: "Réserver la Villa", de: "Villa buchen" },
    aggiungiData: { it: "Aggiungi data", en: "Add date", fr: "Ajouter une date", de: "Datum hinzufügen" },
    verificaDisponibilita: { it: "Verifica disponibilità", en: "Check availability", fr: "Vérifier la disponibilité", de: "Verfügbarkeit prüfen" },
    verificaDisponibilitaVilla: { it: "Verifica disponibilità — Villa Relax", en: "Check availability — Villa Relax", fr: "Vérifier la disponibilité — Villa Relax", de: "Verfügbarkeit prüfen — Villa Relax" },
    mesePrecedente: { it: "Mese precedente", en: "Previous month", fr: "Mois précédent", de: "Vorheriger Monat" },
    meseSuccessivo: { it: "Mese successivo", en: "Next month", fr: "Mois suivant", de: "Nächster Monat" },
    chiamaInvece: { it: "Chiama invece di prenotare online", en: "Call instead of booking online", fr: "Appelez plutôt que de réserver en ligne", de: "Rufen Sie an, statt online zu buchen" },
    ospitiSuffix: { it: "ospite", en: "guest", fr: "voyageur", de: "Gast" },
    ospitiSuffixPlural: { it: "ospiti", en: "guests", fr: "voyageurs", de: "Gäste" },
  },
  concierge: {
    title: { it: "Concierge La Mora", en: "La Mora Concierge", fr: "Concierge La Mora", de: "La Mora Concierge" },
    inputPlaceholder: { it: "Scrivi una domanda...", en: "Ask a question...", fr: "Posez une question...", de: "Stellen Sie eine Frage..." },
    invia: { it: "Invia", en: "Send", fr: "Envoyer", de: "Senden" },
  },
  newsletter: {
    heading: { it: "Iscriviti alla newsletter", en: "Subscribe to our newsletter", fr: "Abonnez-vous à la newsletter", de: "Newsletter abonnieren" },
    emailPlaceholder: { it: "La tua email", en: "Your email", fr: "Votre email", de: "Ihre E-Mail" },
    iscriviti: { it: "Iscriviti", en: "Subscribe", fr: "S'abonner", de: "Abonnieren" },
    verifica: { it: "Verifica…", en: "Verifying…", fr: "Vérification…", de: "Überprüfung…" },
    accetto: { it: "Accetto i", en: "I accept the", fr: "J'accepte les", de: "Ich akzeptiere die" },
    erroreTermini: { it: "Devi accettare i termini e le condizioni d'uso per iscriverti.", en: "You must accept the terms and conditions to subscribe.", fr: "Vous devez accepter les conditions d'utilisation pour vous abonner.", de: "Sie müssen die Nutzungsbedingungen akzeptieren, um sich anzumelden." },
    erroreRecaptcha: { it: "Verifica antispam non superata. Riprova tra qualche secondo.", en: "Anti-spam check failed. Please try again in a few seconds.", fr: "La vérification anti-spam a échoué. Réessayez dans quelques secondes.", de: "Anti-Spam-Prüfung fehlgeschlagen. Bitte versuchen Sie es in ein paar Sekunden erneut." },
    grazie: { it: "Grazie! Il modulo non è ancora collegato al nostro sistema di invio email — lo attiveremo a breve.", en: "Thank you! The form isn't connected to our email system yet — we'll activate it soon.", fr: "Merci ! Le formulaire n'est pas encore connecté à notre système d'envoi d'emails — nous l'activerons bientôt.", de: "Danke! Das Formular ist noch nicht mit unserem E-Mail-System verbunden — wir werden es bald aktivieren." },
    disclaimer: { it: "Puoi annullare l'iscrizione in qualsiasi momento.", en: "You can unsubscribe at any time.", fr: "Vous pouvez vous désabonner à tout moment.", de: "Sie können sich jederzeit abmelden." },
    consentRequired: {
      it: "Per proteggere questo modulo da invii automatizzati serve il tuo consenso ai cookie Funzionali.",
      en: "Protecting this form from automated submissions requires your consent to Functional cookies.",
      fr: "La protection de ce formulaire contre les envois automatisés nécessite votre consentement aux cookies Fonctionnels.",
      de: "Der Schutz dieses Formulars vor automatisierten Übermittlungen erfordert Ihre Zustimmung zu funktionalen Cookies.",
    },
    openCookiePreferences: {
      it: "Apri le preferenze cookie",
      en: "Open cookie preferences",
      fr: "Ouvrir les préférences cookies",
      de: "Cookie-Einstellungen öffnen",
    },
  },
  common: {
    scoprDiPiu: { it: "Scopri di più", en: "Learn more", fr: "En savoir plus", de: "Mehr erfahren" },
    scriviciWhatsapp: { it: "Scrivici su WhatsApp", en: "Message us on WhatsApp", fr: "Écrivez-nous sur WhatsApp", de: "Schreiben Sie uns auf WhatsApp" },
    backToTop: { it: "Torna all'inizio della pagina", en: "Back to top", fr: "Retour en haut de page", de: "Nach oben" },
  },
} as const;

type DictNamespace = keyof typeof dict;

export function t<N extends DictNamespace>(ns: N, key: keyof (typeof dict)[N], locale: Locale): string {
  const entry = dict[ns][key] as Record<Locale, string>;
  return entry[locale] ?? entry.it;
}
