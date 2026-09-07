import type { Locale } from "@/lib/i18n";
import type { ConsentCategory } from "@/data/privacy-services";

export type ConsentText = {
  banner: {
    heading: string;
    body: string;
    privacyLink: string;
    cookieLink: string;
    acceptAll: string;
    rejectNonEssential: string;
    customize: string;
  };
  modal: {
    title: string;
    intro: string;
    alwaysActive: string;
    noServicesToday: string;
    detailsToggle: string;
    provider: string;
    duration: string;
    purpose: string;
    savePreferences: string;
    acceptAll: string;
    rejectAll: string;
    close: string;
    gpcNotice: string;
  };
  categories: Record<ConsentCategory, { label: string; description: string }>;
  footerLink: string;
  externalGate: { message: string; button: string };
};

export const CONSENT_TEXT: Record<Locale, ConsentText> = {
  it: {
    banner: {
      heading: "La tua privacy, prima di tutto",
      body: "Usiamo tecnologie tecniche necessarie al funzionamento del sito e, solo con il tuo consenso, tecnologie funzionali di terze parti (come la protezione anti-spam dei moduli). Nessun analytics, nessuna profilazione, nessun marketing è attivo finché non lo scegli tu.",
      privacyLink: "Privacy Policy",
      cookieLink: "Cookie Policy",
      acceptAll: "Accetta tutti",
      rejectNonEssential: "Rifiuta non essenziali",
      customize: "Personalizza",
    },
    modal: {
      title: "Preferenze cookie",
      intro: "Scegli quali categorie di tecnologie autorizzare. Puoi cambiare idea in qualsiasi momento da \"Preferenze cookie\" in fondo ad ogni pagina.",
      alwaysActive: "Sempre attivi",
      noServicesToday: "Nessun servizio di questa categoria è attualmente utilizzato sul sito.",
      detailsToggle: "Vedi i dettagli tecnici",
      provider: "Fornitore",
      duration: "Durata",
      purpose: "Finalità",
      savePreferences: "Salva le preferenze",
      acceptAll: "Accetta tutti",
      rejectAll: "Rifiuta non essenziali",
      close: "Chiudi",
      gpcNotice: "Abbiamo rilevato un segnale del browser (Global Privacy Control) che richiede di non attivare tecnologie non necessarie: lo abbiamo già rispettato automaticamente. Puoi comunque modificare la scelta qui sotto.",
    },
    categories: {
      necessary: {
        label: "Necessari",
        description: "Indispensabili per il funzionamento del sito (es. ricordare la tua scelta sui cookie). Non richiedono consenso e non possono essere disattivati.",
      },
      functional: {
        label: "Funzionali",
        description: "Abilitano funzioni aggiuntive non indispensabili, come la protezione anti-spam dei moduli o il non ripetere un popup già visto.",
      },
      analytics: {
        label: "Analitici",
        description: "Aiuterebbero a capire come viene usato il sito in forma aggregata. Al momento non utilizziamo alcuno strumento di analisi statistica.",
      },
      marketing: {
        label: "Marketing e profilazione",
        description: "Permetterebbero pubblicità mirata o la misurazione di campagne su altre piattaforme. Al momento non utilizziamo alcuno strumento di marketing o profilazione di terze parti.",
      },
    },
    footerLink: "Preferenze cookie",
    externalGate: {
      message: "Per visualizzare questo contenuto è necessario autorizzare i contenuti esterni.",
      button: "Attiva questo contenuto",
    },
  },
  en: {
    banner: {
      heading: "Your privacy comes first",
      body: "We use technical cookies necessary for the site to work and, only with your consent, third-party functional technologies (such as anti-spam protection on our forms). No analytics, profiling, or marketing is active until you choose to allow it.",
      privacyLink: "Privacy Policy",
      cookieLink: "Cookie Policy",
      acceptAll: "Accept all",
      rejectNonEssential: "Reject non-essential",
      customize: "Customize",
    },
    modal: {
      title: "Cookie preferences",
      intro: "Choose which categories of technologies to allow. You can change your mind at any time from \"Cookie preferences\" at the bottom of every page.",
      alwaysActive: "Always active",
      noServicesToday: "No service in this category is currently used on the site.",
      detailsToggle: "See technical details",
      provider: "Provider",
      duration: "Duration",
      purpose: "Purpose",
      savePreferences: "Save preferences",
      acceptAll: "Accept all",
      rejectAll: "Reject non-essential",
      close: "Close",
      gpcNotice: "We detected a browser signal (Global Privacy Control) requesting that non-essential technologies stay off: we've already honoured it automatically. You can still change this choice below.",
    },
    categories: {
      necessary: {
        label: "Necessary",
        description: "Essential for the site to work (e.g. remembering your cookie choice). They don't require consent and can't be turned off.",
      },
      functional: {
        label: "Functional",
        description: "Enable additional, non-essential features, such as anti-spam protection on forms or not repeating a popup you've already seen.",
      },
      analytics: {
        label: "Analytics",
        description: "Would help us understand aggregated site usage. We currently don't use any statistical analytics tool.",
      },
      marketing: {
        label: "Marketing and profiling",
        description: "Would allow targeted advertising or campaign measurement on other platforms. We currently don't use any third-party marketing or profiling tool.",
      },
    },
    footerLink: "Cookie preferences",
    externalGate: {
      message: "To view this content you need to authorise external content.",
      button: "Enable this content",
    },
  },
  fr: {
    banner: {
      heading: "Votre vie privée avant tout",
      body: "Nous utilisons des cookies techniques nécessaires au fonctionnement du site et, uniquement avec votre consentement, des technologies fonctionnelles de tiers (comme la protection anti-spam de nos formulaires). Aucun outil d'analyse, de profilage ou de marketing n'est actif tant que vous ne l'avez pas choisi.",
      privacyLink: "Politique de confidentialité",
      cookieLink: "Politique de cookies",
      acceptAll: "Tout accepter",
      rejectNonEssential: "Refuser le non essentiel",
      customize: "Personnaliser",
    },
    modal: {
      title: "Préférences cookies",
      intro: "Choisissez les catégories de technologies à autoriser. Vous pouvez changer d'avis à tout moment via « Préférences cookies » en bas de chaque page.",
      alwaysActive: "Toujours actifs",
      noServicesToday: "Aucun service de cette catégorie n'est actuellement utilisé sur le site.",
      detailsToggle: "Voir les détails techniques",
      provider: "Fournisseur",
      duration: "Durée",
      purpose: "Finalité",
      savePreferences: "Enregistrer les préférences",
      acceptAll: "Tout accepter",
      rejectAll: "Refuser le non essentiel",
      close: "Fermer",
      gpcNotice: "Nous avons détecté un signal du navigateur (Global Privacy Control) demandant de ne pas activer les technologies non essentielles : nous l'avons déjà respecté automatiquement. Vous pouvez tout de même modifier ce choix ci-dessous.",
    },
    categories: {
      necessary: {
        label: "Nécessaires",
        description: "Indispensables au fonctionnement du site (par ex. mémoriser votre choix sur les cookies). Ils ne nécessitent pas de consentement et ne peuvent pas être désactivés.",
      },
      functional: {
        label: "Fonctionnels",
        description: "Activent des fonctions supplémentaires non indispensables, comme la protection anti-spam des formulaires ou le fait de ne pas répéter une fenêtre déjà vue.",
      },
      analytics: {
        label: "Analytiques",
        description: "Aideraient à comprendre l'utilisation agrégée du site. Nous n'utilisons actuellement aucun outil d'analyse statistique.",
      },
      marketing: {
        label: "Marketing et profilage",
        description: "Permettraient une publicité ciblée ou la mesure de campagnes sur d'autres plateformes. Nous n'utilisons actuellement aucun outil de marketing ou de profilage tiers.",
      },
    },
    footerLink: "Préférences cookies",
    externalGate: {
      message: "Pour afficher ce contenu, vous devez autoriser les contenus externes.",
      button: "Activer ce contenu",
    },
  },
  de: {
    banner: {
      heading: "Ihre Privatsphäre zuerst",
      body: "Wir verwenden technisch notwendige Cookies für den Betrieb der Website und, nur mit Ihrer Zustimmung, funktionale Technologien Dritter (z. B. Anti-Spam-Schutz unserer Formulare). Keine Analyse, kein Profiling, kein Marketing ist aktiv, bevor Sie es nicht ausgewählt haben.",
      privacyLink: "Datenschutzerklärung",
      cookieLink: "Cookie-Richtlinie",
      acceptAll: "Alle akzeptieren",
      rejectNonEssential: "Nicht notwendige ablehnen",
      customize: "Anpassen",
    },
    modal: {
      title: "Cookie-Einstellungen",
      intro: "Wählen Sie, welche Technologiekategorien Sie zulassen möchten. Sie können Ihre Wahl jederzeit über „Cookie-Einstellungen“ am Ende jeder Seite ändern.",
      alwaysActive: "Immer aktiv",
      noServicesToday: "Derzeit wird kein Dienst dieser Kategorie auf der Website verwendet.",
      detailsToggle: "Technische Details anzeigen",
      provider: "Anbieter",
      duration: "Dauer",
      purpose: "Zweck",
      savePreferences: "Einstellungen speichern",
      acceptAll: "Alle akzeptieren",
      rejectAll: "Nicht notwendige ablehnen",
      close: "Schließen",
      gpcNotice: "Wir haben ein Browsersignal (Global Privacy Control) erkannt, das verlangt, keine nicht notwendigen Technologien zu aktivieren: wir haben dies bereits automatisch berücksichtigt. Sie können diese Wahl unten trotzdem ändern.",
    },
    categories: {
      necessary: {
        label: "Notwendig",
        description: "Unverzichtbar für den Betrieb der Website (z. B. Speichern Ihrer Cookie-Wahl). Sie erfordern keine Zustimmung und können nicht deaktiviert werden.",
      },
      functional: {
        label: "Funktional",
        description: "Ermöglichen zusätzliche, nicht unverzichtbare Funktionen, wie den Anti-Spam-Schutz von Formularen oder das Nicht-Wiederholen eines bereits gesehenen Popups.",
      },
      analytics: {
        label: "Analyse",
        description: "Würden helfen, die aggregierte Nutzung der Website zu verstehen. Wir verwenden derzeit kein statistisches Analysetool.",
      },
      marketing: {
        label: "Marketing und Profiling",
        description: "Würden gezielte Werbung oder die Messung von Kampagnen auf anderen Plattformen ermöglichen. Wir verwenden derzeit kein Marketing- oder Profiling-Tool Dritter.",
      },
    },
    footerLink: "Cookie-Einstellungen",
    externalGate: {
      message: "Um diesen Inhalt anzuzeigen, müssen Sie externe Inhalte autorisieren.",
      button: "Diesen Inhalt aktivieren",
    },
  },
};
