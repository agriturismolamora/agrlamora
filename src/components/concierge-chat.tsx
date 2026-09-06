"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useApartmentsSectionActive } from "@/hooks/use-apartments-active";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";

const HOST_NAME = "Paolo";
const HOST_PHOTO = "/images/villa/paologestoreagriturismolamora.webp";

const PHONE_DISPLAY = "075 8041164";
const WHATSAPP_URL = "https://wa.me/393934363917";
const EMAIL = "agriturismolamora@gmail.com";

type Cta = { label: string; href?: string; action?: "open-booking" };
type ChatMessage = { role: "user" | "bot"; text: string; cta?: Cta };
type Rule = { keywords: string[]; reply: string; cta?: Cta };

const GREETING: Record<Locale, string> = {
  it: "Ciao! Sono il concierge digitale di Agriturismo La Mora. Rispondo solo a domande sulla struttura: appartamenti, piscina, colazione, animali, ricarica elettrica, territorio e prenotazioni. Come posso aiutarti?",
  en: "Hi! I'm Agriturismo La Mora's digital concierge. I only answer questions about the property: apartments, pool, breakfast, pets, EV charging, the area and bookings. How can I help?",
  fr: "Bonjour ! Je suis le concierge numérique d'Agriturismo La Mora. Je réponds uniquement aux questions sur la structure : appartements, piscine, petit-déjeuner, animaux, recharge électrique, territoire et réservations. Comment puis-je vous aider ?",
  de: "Hallo! Ich bin der digitale Concierge von Agriturismo La Mora. Ich beantworte nur Fragen zur Unterkunft: Apartments, Pool, Frühstück, Haustiere, E-Ladestation, Umgebung und Buchungen. Wie kann ich helfen?",
};

function getQuickReplies(locale: Locale): string[] {
  const map: Record<Locale, string[]> = {
    it: ["Gli appartamenti", "La piscina", "Animali ammessi", "Come prenoto?"],
    en: ["The apartments", "The pool", "Pets allowed", "How do I book?"],
    fr: ["Les appartements", "La piscine", "Animaux acceptés", "Comment réserver ?"],
    de: ["Die Apartments", "Der Pool", "Haustiere erlaubt", "Wie buche ich?"],
  };
  return map[locale];
}

/* Motore a regole, non un vero LLM: dimostrativo per la presentazione,
   ma con SOLO fatti reali già verificati nel progetto (stessi dati usati
   in homepage). "Strutturarlo bene" con un modello reale è lavoro futuro,
   esplicitamente rimandato dal cliente. Le keyword restano quelle nella
   lingua corrente (l'utente scrive nella lingua della pagina). */
function getRules(locale: Locale): Rule[] {
  const whatsappCta = { label: t("common", "scriviciWhatsapp", locale), href: WHATSAPP_URL };
  const bookingCta = {
    label: { it: "Vai alla prenotazione", en: "Go to booking", fr: "Aller à la réservation", de: "Zur Buchung" }[locale],
    action: "open-booking" as const,
  };

  const byLocale: Record<Locale, Rule[]> = {
    it: [
      {
        keywords: ["appartament", "camera", "stanz", "alloggi", "gemelli", "bilancia", "pesci", "acquario", "sagittario"],
        reply: "Abbiamo 5 appartamenti indipendenti: Gemelli, Bilancia, Pesci, Acquario e Sagittario. Gemelli e Sagittario hanno giardino privato recintato e sono pet friendly.",
        cta: { label: "Vedi tutti gli appartamenti", href: withLocale(locale, "/alloggi/") },
      },
      {
        keywords: ["piscina", "nuoto"],
        reply: "La piscina panoramica è di 6×12 metri, aperta dal 1° maggio al 28 settembre dalle 9:00 alle 19:00, con area giochi e campo da calcetto in erba naturale.",
        cta: { label: "Scopri la piscina", href: withLocale(locale, "/piscina/") },
      },
      {
        keywords: ["colazione", "breakfast"],
        reply: "La colazione biologica è servita ogni mattina dalle 8:00 alle 9:30: dolci tipici umbri di alta pasticceria, frutta di stagione, dolce incluso in alcune tariffe (altrimenti 5€/persona/giorno) e salato su richiesta (+10€). Opzione senza glutine: +5€ a persona.",
        cta: { label: "Scopri la colazione bio", href: withLocale(locale, "/agriturismo-con-colazione-inclusa-assisi/") },
      },
      {
        keywords: ["cane", "cani", "gatt", "animal", "pet"],
        reply: "Sì, siamo pet friendly: gli appartamenti Gemelli e Sagittario hanno giardino recintato (25€/soggiorno). Negli altri tre — Pesci, Acquario e Bilancia — sono ammessi solo animali di piccola taglia, previo accordo con il proprietario, sempre a 25€/soggiorno.",
      },
      {
        keywords: ["elettric", "ricaric", "kw", "colonnina"],
        reply: "Il parcheggio privato ha una colonnina di ricarica rapida da 22 kW: basta segnalarlo in fase di prenotazione.",
      },
      {
        keywords: ["ebike", "e-bike", "bici", "cavall", "equitazione", "attività", "esperienz"],
        reply: "Puoi noleggiare e-bike per esplorare il territorio, vedere i cavalli dell'azienda agricola, e c'è un parco giochi per i più piccoli.",
        cta: { label: "Scopri le esperienze", href: withLocale(locale, "/agriturismo-famiglie-ad-assisi-e-dintorni/") },
      },
      {
        keywords: ["assisi", "distanza", " km", "dove siamo", "posizione", "territorio", "perugia", "spello", "aeroporto"],
        reply: "Siamo a 5 km da Assisi, 2 km dalla stazione ferroviaria e circa 7 km dall'aeroporto di Perugia Sant'Egidio.",
        cta: { label: "Apri in Google Maps", href: "https://www.google.com/maps/search/?api=1&query=Agriturismo+La+Mora+Via+Fonte+Citerna+7+Assisi" },
      },
      {
        keywords: ["sconto", "diretta", "caparra"],
        reply: "Prenotando direttamente hai il 10% di sconto per soggiorni da 7 notti, e un altro 10% se sei già stato nostro ospite. Si versa il 25% come caparra, il saldo si paga all'arrivo.",
        cta: bookingCta,
      },
      {
        keywords: ["prezzo", "costo", "tariffa", "quanto"],
        reply: "Il prezzo dipende dalle date e dall'appartamento scelto: la disponibilità e le tariffe reali le trovi nel box di prenotazione qui sotto.",
        cta: bookingCta,
      },
      {
        keywords: ["prenot", "disponibil", "camere libere", "date"],
        reply: "Posso aprirti subito il box di prenotazione, così controlli le date disponibili.",
        cta: bookingCta,
      },
      {
        keywords: ["contatt", "telefono", "email", "mail", "whatsapp", "chiama", "numero"],
        reply: `Puoi raggiungerci al ${PHONE_DISPLAY}, su WhatsApp oppure via email a ${EMAIL}.`,
        cta: whatsappCta,
      },
    ],
    en: [
      {
        keywords: ["apartment", "room", "flat", "gemelli", "bilancia", "pesci", "acquario", "sagittario"],
        reply: "We have 5 independent apartments: Gemelli, Bilancia, Pesci, Acquario and Sagittario. Gemelli and Sagittario have a fenced private garden and are pet friendly.",
        cta: { label: "See all apartments", href: withLocale(locale, "/alloggi/") },
      },
      {
        keywords: ["pool", "swim"],
        reply: "The panoramic pool is 6×12 metres, open from May 1st to September 28th, 9am to 7pm, with a play area and a natural-grass five-a-side pitch.",
        cta: { label: "Discover the pool", href: withLocale(locale, "/piscina/") },
      },
      {
        keywords: ["breakfast"],
        reply: "Organic breakfast is served every morning from 8am to 9:30am: fine Umbrian pastries, seasonal fruit, sweet breakfast included in some rates (otherwise €5/person/day) and savoury on request (+€10). Gluten-free option: +€5 per person.",
        cta: { label: "Discover the organic breakfast", href: withLocale(locale, "/agriturismo-con-colazione-inclusa-assisi/") },
      },
      {
        keywords: ["dog", "cat", "pet", "animal"],
        reply: "Yes, we're pet friendly: Gemelli and Sagittario have a fenced garden (€25/stay). In the other three — Pesci, Acquario and Bilancia — only small pets are allowed, subject to the owner's agreement, also at €25/stay.",
      },
      {
        keywords: ["electric", "charging", "kw", "charger"],
        reply: "The private car park has a fast 22 kW charging station: just flag it when you book.",
      },
      {
        keywords: ["ebike", "e-bike", "bike", "horse", "activit", "experienc"],
        reply: "You can rent e-bikes to explore the area, see the horses on the farm, and there's a playground for younger guests.",
        cta: { label: "Discover our experiences", href: withLocale(locale, "/agriturismo-famiglie-ad-assisi-e-dintorni/") },
      },
      {
        keywords: ["assisi", "distance", " km", "where are", "location", "area", "perugia", "spello", "airport"],
        reply: "We're 5 km from Assisi, 2 km from the train station and about 7 km from Perugia Sant'Egidio airport.",
        cta: { label: "Open in Google Maps", href: "https://www.google.com/maps/search/?api=1&query=Agriturismo+La+Mora+Via+Fonte+Citerna+7+Assisi" },
      },
      {
        keywords: ["discount", "direct", "deposit"],
        reply: "Booking directly gets you 10% off stays of 7 nights or more, plus another 10% if you've stayed with us before. A 25% deposit is due at booking, the balance on arrival.",
        cta: bookingCta,
      },
      {
        keywords: ["price", "cost", "rate", "how much"],
        reply: "The price depends on the dates and apartment: real availability and rates are in the booking box below.",
        cta: bookingCta,
      },
      {
        keywords: ["book", "availability", "free rooms", "dates"],
        reply: "I can open the booking box right away so you can check available dates.",
        cta: bookingCta,
      },
      {
        keywords: ["contact", "phone", "email", "mail", "whatsapp", "call", "number"],
        reply: `You can reach us at ${PHONE_DISPLAY}, on WhatsApp, or by email at ${EMAIL}.`,
        cta: whatsappCta,
      },
    ],
    fr: [
      {
        keywords: ["appartement", "chambre", "logement", "gemelli", "bilancia", "pesci", "acquario", "sagittario"],
        reply: "Nous avons 5 appartements indépendants : Gemelli, Bilancia, Pesci, Acquario et Sagittario. Gemelli et Sagittario ont un jardin privé clôturé et acceptent les animaux.",
        cta: { label: "Voir tous les appartements", href: withLocale(locale, "/alloggi/") },
      },
      {
        keywords: ["piscine", "nager"],
        reply: "La piscine panoramique fait 6×12 mètres, ouverte du 1er mai au 28 septembre de 9h à 19h, avec une aire de jeux et un terrain de foot à cinq en gazon naturel.",
        cta: { label: "Découvrir la piscine", href: withLocale(locale, "/piscina/") },
      },
      {
        keywords: ["petit-déjeuner", "petit déjeuner"],
        reply: "Le petit-déjeuner biologique est servi chaque matin de 8h à 9h30 : pâtisseries typiques d'Ombrie, fruits de saison, formule sucrée incluse dans certains tarifs (sinon 5€/personne/jour) et salée sur demande (+10€). Option sans gluten : +5€ par personne.",
        cta: { label: "Découvrir le petit-déjeuner bio", href: withLocale(locale, "/agriturismo-con-colazione-inclusa-assisi/") },
      },
      {
        keywords: ["chien", "chat", "animal", "animaux"],
        reply: "Oui, nous acceptons les animaux : Gemelli et Sagittario ont un jardin clôturé (25€/séjour). Dans les trois autres — Pesci, Acquario et Bilancia — seuls les animaux de petite taille sont admis, avec l'accord préalable du propriétaire, toujours à 25€/séjour.",
      },
      {
        keywords: ["électrique", "recharge", "kw", "borne"],
        reply: "Le parking privé dispose d'une borne de recharge rapide de 22 kW : il suffit de le signaler lors de la réservation.",
      },
      {
        keywords: ["ebike", "e-bike", "vélo", "cheval", "activité", "expérience"],
        reply: "Vous pouvez louer des e-bikes pour explorer le territoire, voir les chevaux de l'exploitation agricole, et il y a une aire de jeux pour les plus petits.",
        cta: { label: "Découvrir nos expériences", href: withLocale(locale, "/agriturismo-famiglie-ad-assisi-e-dintorni/") },
      },
      {
        keywords: ["assise", "assisi", "distance", " km", "où êtes", "position", "territoire", "pérouse", "spello", "aéroport"],
        reply: "Nous sommes à 5 km d'Assise, 2 km de la gare et environ 7 km de l'aéroport de Pérouse Sant'Egidio.",
        cta: { label: "Ouvrir dans Google Maps", href: "https://www.google.com/maps/search/?api=1&query=Agriturismo+La+Mora+Via+Fonte+Citerna+7+Assisi" },
      },
      {
        keywords: ["réduction", "directe", "acompte"],
        reply: "En réservant directement, vous avez 10% de réduction pour les séjours de 7 nuits ou plus, et encore 10% si vous avez déjà séjourné chez nous. Un acompte de 25% est versé à la réservation, le solde à l'arrivée.",
        cta: bookingCta,
      },
      {
        keywords: ["prix", "coût", "tarif", "combien"],
        reply: "Le prix dépend des dates et de l'appartement choisi : la disponibilité et les tarifs réels se trouvent dans le module de réservation ci-dessous.",
        cta: bookingCta,
      },
      {
        keywords: ["réserv", "disponibilité", "chambres libres", "dates"],
        reply: "Je peux ouvrir tout de suite le module de réservation pour vérifier les dates disponibles.",
        cta: bookingCta,
      },
      {
        keywords: ["contact", "téléphone", "email", "mail", "whatsapp", "appeler", "numéro"],
        reply: `Vous pouvez nous joindre au ${PHONE_DISPLAY}, sur WhatsApp ou par email à ${EMAIL}.`,
        cta: whatsappCta,
      },
    ],
    de: [
      {
        keywords: ["apartment", "wohnung", "zimmer", "gemelli", "bilancia", "pesci", "acquario", "sagittario"],
        reply: "Wir haben 5 unabhängige Apartments: Gemelli, Bilancia, Pesci, Acquario und Sagittario. Gemelli und Sagittario haben einen eingezäunten privaten Garten und sind haustierfreundlich.",
        cta: { label: "Alle Apartments ansehen", href: withLocale(locale, "/alloggi/") },
      },
      {
        keywords: ["pool", "schwimm"],
        reply: "Der Panorama-Pool ist 6×12 Meter groß, geöffnet vom 1. Mai bis 28. September, 9 bis 19 Uhr, mit Spielbereich und Fünf-gegen-fünf-Feld aus Naturrasen.",
        cta: { label: "Pool entdecken", href: withLocale(locale, "/piscina/") },
      },
      {
        keywords: ["frühstück"],
        reply: "Das Bio-Frühstück wird jeden Morgen von 8 bis 9:30 Uhr serviert: feines umbrisches Gebäck, saisonales Obst, süßes Frühstück in manchen Tarifen inklusive (sonst 5€/Person/Tag) und herzhaft auf Anfrage (+10€). Glutenfreie Option: +5€ pro Person.",
        cta: { label: "Bio-Frühstück entdecken", href: withLocale(locale, "/agriturismo-con-colazione-inclusa-assisi/") },
      },
      {
        keywords: ["hund", "katze", "haustier", "tier"],
        reply: "Ja, wir sind haustierfreundlich: Gemelli und Sagittario haben einen eingezäunten Garten (25€/Aufenthalt). In den anderen drei — Pesci, Acquario und Bilancia — sind nur kleine Haustiere erlaubt, nach Absprache mit dem Eigentümer, ebenfalls für 25€/Aufenthalt.",
      },
      {
        keywords: ["elektro", "laden", "kw", "ladestation"],
        reply: "Der private Parkplatz verfügt über eine schnelle 22-kW-Ladestation: bei der Buchung einfach angeben.",
      },
      {
        keywords: ["ebike", "e-bike", "fahrrad", "pferd", "aktivität", "erlebnis"],
        reply: "Sie können E-Bikes mieten, um die Gegend zu erkunden, die Pferde des Bauernhofs sehen, und es gibt einen Spielplatz für die Kleinen.",
        cta: { label: "Unsere Erlebnisse entdecken", href: withLocale(locale, "/agriturismo-famiglie-ad-assisi-e-dintorni/") },
      },
      {
        keywords: ["assisi", "entfernung", " km", "wo befindet", "lage", "umgebung", "perugia", "spello", "flughafen"],
        reply: "Wir sind 5 km von Assisi, 2 km vom Bahnhof und etwa 7 km vom Flughafen Perugia Sant'Egidio entfernt.",
        cta: { label: "In Google Maps öffnen", href: "https://www.google.com/maps/search/?api=1&query=Agriturismo+La+Mora+Via+Fonte+Citerna+7+Assisi" },
      },
      {
        keywords: ["rabatt", "direkt", "anzahlung"],
        reply: "Bei Direktbuchung erhalten Sie 10% Rabatt ab 7 Nächten und weitere 10%, wenn Sie schon einmal bei uns waren. Eine Anzahlung von 25% ist bei der Buchung fällig, der Rest bei Ankunft.",
        cta: bookingCta,
      },
      {
        keywords: ["preis", "kosten", "tarif", "wie viel"],
        reply: "Der Preis hängt von Datum und Apartment ab: die echte Verfügbarkeit und Preise finden Sie unten im Buchungsfeld.",
        cta: bookingCta,
      },
      {
        keywords: ["buchen", "verfügbarkeit", "freie zimmer", "termine"],
        reply: "Ich kann Ihnen gleich das Buchungsfeld öffnen, damit Sie freie Termine prüfen können.",
        cta: bookingCta,
      },
      {
        keywords: ["kontakt", "telefon", "email", "mail", "whatsapp", "anrufen", "nummer"],
        reply: `Sie erreichen uns unter ${PHONE_DISPLAY}, auf WhatsApp oder per E-Mail an ${EMAIL}.`,
        cta: whatsappCta,
      },
    ],
  };

  return byLocale[locale];
}

function getFallback(locale: Locale): ChatMessage {
  const text: Record<Locale, string> = {
    it: "Posso rispondere solo a domande su Agriturismo La Mora (appartamenti, piscina, colazione, animali, territorio, prenotazioni dirette). Per tutto il resto, scrivici direttamente.",
    en: "I can only answer questions about Agriturismo La Mora (apartments, pool, breakfast, pets, the area, direct bookings). For anything else, message us directly.",
    fr: "Je ne peux répondre qu'aux questions sur Agriturismo La Mora (appartements, piscine, petit-déjeuner, animaux, territoire, réservations directes). Pour le reste, écrivez-nous directement.",
    de: "Ich kann nur Fragen zu Agriturismo La Mora beantworten (Apartments, Pool, Frühstück, Haustiere, Umgebung, Direktbuchungen). Für alles andere schreiben Sie uns direkt.",
  };
  return { role: "bot", text: text[locale], cta: { label: t("common", "scriviciWhatsapp", locale), href: WHATSAPP_URL } };
}

function matchRule(text: string, rules: Rule[]) {
  const lower = text.toLowerCase();
  return rules.find((r) => r.keywords.some((k) => lower.includes(k)));
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M4 12h15.5M13 5.5 20 12l-7 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CLOSE_LABEL: Record<Locale, string> = {
  it: "Chiudi il concierge virtuale",
  en: "Close the virtual concierge",
  fr: "Fermer le concierge virtuel",
  de: "Virtuellen Concierge schließen",
};
const OPEN_LABEL: Record<Locale, string> = {
  it: "Apri il concierge virtuale — rispondiamo noi, in prima persona",
  en: "Open the virtual concierge — we answer in person",
  fr: "Ouvrir le concierge virtuel — nous répondons en personne",
  de: "Virtuellen Concierge öffnen — wir antworten persönlich",
};
const ARIA_MESSAGE_INPUT: Record<Locale, string> = {
  it: "Scrivi un messaggio al concierge",
  en: "Write a message to the concierge",
  fr: "Écrivez un message au concierge",
  de: "Schreiben Sie eine Nachricht an den Concierge",
};
const ONLINE_TITLE: Record<Locale, string> = {
  it: `${HOST_NAME}, host di Agriturismo La Mora — online ora`,
  en: `${HOST_NAME}, host of Agriturismo La Mora — online now`,
  fr: `${HOST_NAME}, hôte d'Agriturismo La Mora — en ligne maintenant`,
  de: `${HOST_NAME}, Gastgeber von Agriturismo La Mora — jetzt online`,
};
const HOST_ALT: Record<Locale, string> = {
  it: `${HOST_NAME}, host di Agriturismo La Mora`,
  en: `${HOST_NAME}, host of Agriturismo La Mora`,
  fr: `${HOST_NAME}, hôte d'Agriturismo La Mora`,
  de: `${HOST_NAME}, Gastgeber von Agriturismo La Mora`,
};

/* Widget concierge fisso in basso a destra. bottom-24 su mobile per non
   sovrapporsi al CTA "Verifica disponibilità" della booking bar (centrato
   ma largo su schermi stretti); bottom-6 da sm in su, dove la booking bar
   compatta lascia ampio margine sul lato destro. Stessa logica di
   dissolvenza vicino al footer già usata dalla booking bar. */
export function ConciergeChat({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const inApartments = useApartmentsSectionActive();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const rules = getRules(locale);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      rootMargin: "0px 0px -15% 0px",
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open || greeted) return;
    function showGreeting() {
      setMessages([{ role: "bot", text: GREETING[locale] }]);
      setGreeted(true);
    }
    showGreeting();
  }, [open, greeted, locale]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function pushUserMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    window.setTimeout(() => {
      const rule = matchRule(trimmed, rules);
      setMessages((m) => [...m, rule ? { role: "bot", text: rule.reply, cta: rule.cta } : getFallback(locale)]);
    }, 400);
  }

  function handleCtaClick(cta: Cta) {
    if (cta.action === "open-booking") {
      window.dispatchEvent(new Event("la-mora:open-booking"));
      setOpen(false);
    }
  }

  return (
    <div
      className="fixed bottom-24 right-5 z-[75] transition-opacity duration-300 sm:bottom-6 sm:right-6"
      style={nearFooter ? { opacity: 0, pointerEvents: "none" } : undefined}
    >
      {open && (
        <div
          role="complementary"
          aria-label="Concierge virtuale Agriturismo La Mora"
          className="absolute bottom-[68px] right-0 flex h-[min(480px,70dvh)] w-[min(92vw,360px)] flex-col overflow-hidden rounded-[6px] bg-cream shadow-[0_30px_70px_-20px_rgba(28,33,23,0.5)]"
        >
          <div className="flex items-center justify-between bg-olive-950 px-5 py-4 text-cream">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#7cb87c]" aria-hidden="true" />
              <span className="font-display text-[17px]">{t("concierge", "title", locale)}</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={CLOSE_LABEL[locale]}
              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-cream/10"
            >
              <CloseIcon />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-[10px] px-3.5 py-2.5 text-[13px] leading-[1.55] ${
                    m.role === "user" ? "bg-raspberry text-cream" : "bg-cream-dim text-ink"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.cta && (
                    <button
                      type="button"
                      onClick={() => {
                        if (m.cta!.action) {
                          handleCtaClick(m.cta!);
                        } else if (m.cta!.href) {
                          window.open(m.cta!.href, m.cta!.href.startsWith("http") ? "_blank" : "_self", "noopener,noreferrer");
                        }
                      }}
                      className={`mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.04em] underline underline-offset-4 ${
                        m.role === "user" ? "text-cream" : "text-raspberry"
                      }`}
                    >
                      {m.cta.label} →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-ink/10 px-4 py-2.5">
            {getQuickReplies(locale).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => pushUserMessage(q)}
                className="rounded-full border border-ink/15 px-2.5 py-1 text-[10.5px] font-medium text-ink-soft transition-colors hover:border-raspberry hover:text-raspberry"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              pushUserMessage(input);
            }}
            className="flex items-center gap-2 border-t border-ink/10 px-3 py-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("concierge", "inputPlaceholder", locale)}
              aria-label={ARIA_MESSAGE_INPUT[locale]}
              className="min-w-0 flex-1 rounded-[3px] border border-ink/15 bg-white px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-soft/60 focus:border-raspberry"
            />
            <button
              type="submit"
              aria-label={t("concierge", "invia", locale)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] bg-raspberry text-cream transition-colors hover:bg-[#8a3844]"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      {/* Foto dell'host sopra il pulsante: richiesta esplicita del titolare
          per far capire subito che dietro il concierge virtuale risponde
          davvero lui, non un bot anonimo — pallino verde "online" a
          rinforzare la fiducia. Nascosta a pannello aperto, dove occuperebbe
          lo stesso spazio del pannello chat. */}
      {!open && (
        <div className="mb-2.5 flex justify-end">
          <div
            className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-cream shadow-[0_10px_24px_-10px_rgba(28,33,23,0.6)]"
            title={ONLINE_TITLE[locale]}
          >
            <Image src={HOST_PHOTO} alt={HOST_ALT[locale]} fill sizes="48px" className="object-cover" />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-cream bg-[#4caf50]"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? CLOSE_LABEL[locale] : OPEN_LABEL[locale]}
        className={`flex h-14 w-14 items-center justify-center rounded-full text-cream shadow-[0_18px_36px_-16px_rgba(28,33,23,0.6)] transition-colors duration-500 ${
          inApartments && !open ? "bg-[#141a30] hover:bg-[#1c2440]" : "bg-raspberry hover:bg-[#8a3844]"
        }`}
      >
        {open ? <CloseIcon /> : <ChatBubbleIcon />}
      </button>
    </div>
  );
}
