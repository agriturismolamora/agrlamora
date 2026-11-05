"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { APARTMENTS } from "@/data/apartments";
import { LAMORA_LOGO_DARK_SMALL } from "@/data/logos";
import { getVillaConfigurations, VILLA_LOGO_ALT, VILLA_LOGO_BLACK_SMALL, VILLA_MAX_GUESTS } from "@/data/villa";
import type { Locale } from "@/lib/i18n";
import { splitLocaleFromPath, withLocale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import {
  WEBMAIL_NAMES,
  detectEmailProvider,
  isMobileDevice,
  mailtoUrl,
  webmailUrl,
  type EmailProvider,
  type Webmail,
} from "@/lib/email-provider";

const WHATSAPP_NUMBER = "393934363917";

/* Email della struttura già pubblicata (footer, menu, JSON-LD di La Mora e
   di Villa Relax): la Villa non ha un indirizzo proprio verificato, usa
   questo. Composta solo nel browser, al passo finale: non compare
   nell'HTML statico del modulo. */
const EMAIL_USER = "agriturismolamora";
const EMAIL_DOMAIN = "gmail.com";
function contactEmail() {
  return `${EMAIL_USER}@${EMAIL_DOMAIN}`;
}

/* Oltre questa lunghezza alcuni client di posta (o Windows) troncano o
   ignorano il link mailto; stesso limite per i link alle webmail. */
const EMAIL_LINK_MAX = 1800;

/* Webmail a cui il pulsante "Invia via email" apre da solo una bozza nel
   browser (solo computer, servizio riconosciuto dal dominio dell'utente,
   vedi src/lib/email-provider.ts): solo quelli col formato del link
   verificato a mano con un account reale (nessuno dei tre è documentato
   ufficialmente). Gmail verificato il 2 novembre 2026; Outlook e Yahoo
   Mail disattivati finché non si provano a mano. Gli stessi servizi sono
   gli unici link di "Non si apre? Apri in:". */
const VERIFIED_WEBMAILS: Webmail[] = ["gmail"];

type EmailTarget = Webmail | "mailto";

/* Avviso dopo il click: "opened" (app o webmail aperti); "noApp" solo su
   computer con mailto, se la pagina non ha perso il focus (nessuna app di
   posta registrata, probabilmente). */
type Notice = "opened" | "noApp" | null;

/* Attesa prima di suggerire le alternative a un mailto che non ha aperto
   nulla (nessun blur né visibilitychange nel frattempo). */
const MAILTO_WATCH_MS = 1500;

function isVerifiedWebmail(provider: EmailProvider): provider is Webmail {
  return (VERIFIED_WEBMAILS as string[]).includes(provider);
}

/* Apre un link (mailto) come un clic su <a>: stesso effetto di
   location.href, ma il link resta solo in memoria il tempo del clic. */
function openLink(href: string) {
  const link = document.createElement("a");
  link.href = href;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/* Copia negli appunti: Clipboard API, altrimenti textarea nascosta +
   execCommand (browser vecchi o contesti non sicuri). */
async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // si prova il metodo di ripiego
  }
  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}
const INTL_TAG: Record<Locale, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR", de: "de-DE" };
/* Capienza massima di una richiesta: somma reale dei 5 appartamenti per
   La Mora, capienza della villa intera per Villa Relax. */
const LAMORA_MAX_GUESTS = APARTMENTS.reduce((sum, apt) => sum + apt.maxGuests, 0);
const CHILD_MAX_AGE = 17;
/* Ordine del selettore appartamento richiesto dal titolare (non quello del
   carousel in APARTMENTS); i nomi vengono comunque da APARTMENTS. */
const APARTMENT_ORDER = ["pesci", "gemelli", "sagittario", "acquario", "bilancia"];
const APARTMENT_NAMES = APARTMENT_ORDER.flatMap((slug) => APARTMENTS.filter((a) => a.slug === slug).map((a) => a.name));

type ShortLabels = {
  nome: string;
  cognome: string;
  telefono: string;
  email: string;
  arrivo: string;
  partenza: string;
  adulti: string;
  bambini: string;
  appartamento: string;
  soluzione: string;
  animale: string;
  colonnina: string;
  colonninaVilla: string;
  ebike: string;
};

type Text = {
  fab: string;
  title: string;
  intro: string;
  nome: string;
  cognome: string;
  telefono: string;
  email: string;
  ospiti: string;
  etaBambino: (n: number) => string;
  appartamento: string;
  soluzione: string;
  nessunaPreferenza: string;
  animali: string;
  taglia: string;
  taglie: [string, string, string];
  tipo: string;
  tipi: [string, string, string];
  messaggio: string;
  invia: string;
  inviaNote: string;
  privacyPrefix: string;
  privacyLink: string;
  /* Passo finale "Come vuoi inviare la richiesta?". */
  reviewHeading: string;
  reviewIntro: string;
  summaryLabel: string;
  sendWhatsapp: string;
  sendEmail: string;
  openedNote: string;
  /* Riga sotto "Invia via email": cosa si aprirà (app di posta o webmail). */
  emailHintApp: string;
  emailHintWebmail: (service: string) => string;
  /* Computer con mailto: le alternative valgono se manca l'app di posta. */
  emailHintNoApp: string;
  /* Computer con mailto, nessuna app aperta (euristica): `services` sono i
     link "Apri in:" attivi (null se nessuno), `address` l'indirizzo. */
  noAppNote: (services: string | null, address: string) => string;
  /* "Non si apre? Apri in: Gmail · …" e nome accessibile di ogni link. */
  openIn: string;
  openInLabel: (service: string) => string;
  copySummary: string;
  copyAddress: string;
  copied: string;
  copyFailed: string;
  addressLabel: string;
  tooLong: string;
  pasteHere: string;
  emailSubject: (struttura: string) => string;
  /* Etichette accorciate, solo per il corpo dell'email quando il link
     (mailto o webmail) supererebbe EMAIL_LINK_MAX caratteri. */
  short: ShortLabels;
  sentEdit: string;
  msgIntro: (struttura: string) => string;
  msgNights: (n: number) => string;
  msgAnimale: string;
  colonnina: string;
  /* Villa Relax: colonnina da 7 kW (La Mora: 22 kW). */
  colonninaVilla: string;
  ebike: string;
  ebikeDurata: string;
  ebikeOpzioni: [string, string, string, string];
  si: string;
};

const TEXT: Record<Locale, Text> = {
  it: {
    fab: "Richiesta",
    title: "Invia una richiesta",
    intro: "Ti rispondiamo noi direttamente, senza intermediari.",
    nome: "Nome",
    cognome: "Cognome",
    telefono: "Telefono",
    email: "Email",
    ospiti: "Ospiti",
    etaBambino: (n) => `Età bambino ${n}`,
    appartamento: "Appartamento preferito",
    soluzione: "Soluzione preferita",
    nessunaPreferenza: "Nessuna preferenza",
    animali: "Viaggio con animali",
    taglia: "Taglia",
    taglie: ["Piccola", "Media", "Grande"],
    tipo: "Tipo di animale",
    tipi: ["Cane", "Gatto", "Altro"],
    messaggio: "Messaggio (facoltativo)",
    invia: "Rivedi e invia",
    inviaNote: "Nel passo successivo vedi il riepilogo e scegli se inviarlo su WhatsApp o via email.",
    privacyPrefix: "Useremo questi dati solo per rispondere alla tua richiesta —",
    privacyLink: "informativa privacy",
    reviewHeading: "Come vuoi inviare la richiesta?",
    reviewIntro: "Questo è il riepilogo che riceveremo. Si apre già scritto nell'app che scegli: lì ti basta premere Invia.",
    summaryLabel: "Riepilogo della richiesta",
    sendWhatsapp: "Invia su WhatsApp",
    sendEmail: "Invia via email",
    openedNote: "Si è aperta l'app: premi Invia per completare la richiesta.",
    emailHintApp: "Si aprirà la tua app di posta",
    emailHintWebmail: (s) => `Si aprirà ${s} nel browser`,
    emailHintNoApp: "Se sul tuo computer non c'è un'app di posta, usa le alternative qui sotto",
    noAppNote: (s, a) => `Se non si è aperta nessuna app di posta, usa le alternative qui sotto: ${s ? `Apri in ${s} oppure ` : ""}Copia riepilogo e incollalo in una nuova email a ${a}.`,
    openIn: "Non si apre? Apri in:",
    openInLabel: (s) => `Apri la bozza in ${s} (nuova scheda)`,
    copySummary: "Copia riepilogo",
    copyAddress: "Copia indirizzo",
    copied: "Copiato",
    copyFailed: "Copia non riuscita: seleziona il testo e copialo a mano.",
    addressLabel: "Il nostro indirizzo email",
    tooLong: "Il riepilogo è troppo lungo per aprirsi già scritto nell'app di posta: premendo «Invia via email» lo copiamo per te, poi incollalo nel testo dell'email.",
    pasteHere: "Incolla qui il riepilogo della richiesta.",
    emailSubject: (s) => `Richiesta di soggiorno – ${s}`,
    short: { nome: "Nome", cognome: "Cogn.", telefono: "Tel.", email: "Email", arrivo: "Arr.", partenza: "Part.", adulti: "Ad.", bambini: "Bamb.", appartamento: "App.", soluzione: "Sol.", animale: "Anim.", colonnina: "Ricarica 22 kW", colonninaVilla: "Ricarica 7 kW", ebike: "E-bike" },
    sentEdit: "Modifica la richiesta",
    msgIntro: (s) => `Ciao! Vi scrivo dal sito con una richiesta per ${s}.`,
    msgNights: (n) => `${n} ${n === 1 ? "notte" : "notti"}`,
    msgAnimale: "Animale",
    colonnina: "Colonnina di ricarica elettrica (22 kW)",
    colonninaVilla: "Colonnina di ricarica elettrica (7 kW)",
    ebike: "Noleggio e-bike",
    ebikeDurata: "Durata noleggio",
    ebikeOpzioni: ["Mezza giornata — €15", "Giornata intera — €25", "Weekend — €40", "7 giorni — €90"],
    si: "Sì",
  },
  en: {
    fab: "Request",
    title: "Send a request",
    intro: "We answer you directly, no middlemen.",
    nome: "First name",
    cognome: "Last name",
    telefono: "Phone",
    email: "Email",
    ospiti: "Guests",
    etaBambino: (n) => `Age of child ${n}`,
    appartamento: "Preferred apartment",
    soluzione: "Preferred option",
    nessunaPreferenza: "No preference",
    animali: "Travelling with pets",
    taglia: "Size",
    taglie: ["Small", "Medium", "Large"],
    tipo: "Type of animal",
    tipi: ["Dog", "Cat", "Other"],
    messaggio: "Message (optional)",
    invia: "Review and send",
    inviaNote: "Next you'll see a summary and choose whether to send it on WhatsApp or by email.",
    privacyPrefix: "We'll only use this information to reply to your request —",
    privacyLink: "privacy policy",
    reviewHeading: "How would you like to send your request?",
    reviewIntro: "This is the summary we'll receive. It opens already written in the app you choose: just press Send there.",
    summaryLabel: "Request summary",
    sendWhatsapp: "Send on WhatsApp",
    sendEmail: "Send by email",
    openedNote: "The app has opened: press Send to complete your request.",
    emailHintApp: "Your email app will open",
    emailHintWebmail: (s) => `${s} will open in your browser`,
    emailHintNoApp: "If your computer has no email app, use the alternatives below",
    noAppNote: (s, a) => `If no email app opened, use the alternatives below: ${s ? `Open in ${s}, or ` : ""}Copy summary and paste it into a new email to ${a}.`,
    openIn: "Nothing opened? Open in:",
    openInLabel: (s) => `Open the draft in ${s} (new tab)`,
    copySummary: "Copy summary",
    copyAddress: "Copy address",
    copied: "Copied",
    copyFailed: "Copying didn't work: select the text and copy it manually.",
    addressLabel: "Our email address",
    tooLong: "The summary is too long to open pre-filled in your email app: when you press “Send by email” we'll copy it for you, then paste it into the email.",
    pasteHere: "Paste the request summary here.",
    emailSubject: (s) => `Stay request – ${s}`,
    short: { nome: "Name", cognome: "Surname", telefono: "Tel.", email: "Email", arrivo: "In", partenza: "Out", adulti: "Adults", bambini: "Children", appartamento: "Apt.", soluzione: "Option", animale: "Pet", colonnina: "EV 22 kW", colonninaVilla: "EV 7 kW", ebike: "E-bike" },
    sentEdit: "Edit the request",
    msgIntro: (s) => `Hi! I'm writing from the website with a request for ${s}.`,
    msgNights: (n) => `${n} ${n === 1 ? "night" : "nights"}`,
    msgAnimale: "Pet",
    colonnina: "EV charging point (22 kW)",
    colonninaVilla: "EV charging point (7 kW)",
    ebike: "E-bike rental",
    ebikeDurata: "Rental length",
    ebikeOpzioni: ["Half day — €15", "Full day — €25", "Weekend — €40", "7 days — €90"],
    si: "Yes",
  },
  fr: {
    fab: "Demande",
    title: "Envoyer une demande",
    intro: "Nous vous répondons directement, sans intermédiaire.",
    nome: "Prénom",
    cognome: "Nom",
    telefono: "Téléphone",
    email: "E-mail",
    ospiti: "Voyageurs",
    etaBambino: (n) => `Âge enfant ${n}`,
    appartamento: "Appartement préféré",
    soluzione: "Formule préférée",
    nessunaPreferenza: "Pas de préférence",
    animali: "Je voyage avec des animaux",
    taglia: "Taille",
    taglie: ["Petite", "Moyenne", "Grande"],
    tipo: "Type d'animal",
    tipi: ["Chien", "Chat", "Autre"],
    messaggio: "Message (facultatif)",
    invia: "Vérifier et envoyer",
    inviaNote: "À l'étape suivante, vous verrez le récapitulatif et choisirez de l'envoyer par WhatsApp ou par e-mail.",
    privacyPrefix: "Nous utiliserons ces données uniquement pour répondre à votre demande —",
    privacyLink: "politique de confidentialité",
    reviewHeading: "Comment souhaitez-vous envoyer votre demande ?",
    reviewIntro: "Voici le récapitulatif que nous recevrons. Il s'ouvre déjà rédigé dans l'application choisie : il suffit d'appuyer sur Envoyer.",
    summaryLabel: "Récapitulatif de la demande",
    sendWhatsapp: "Envoyer sur WhatsApp",
    sendEmail: "Envoyer par e-mail",
    openedNote: "L'application s'est ouverte : appuyez sur Envoyer pour finaliser votre demande.",
    emailHintApp: "Votre application de messagerie s'ouvrira",
    emailHintWebmail: (s) => `${s} s'ouvrira dans le navigateur`,
    emailHintNoApp: "Si votre ordinateur n'a pas d'application de messagerie, utilisez les alternatives ci-dessous",
    noAppNote: (s, a) => `Si aucune application de messagerie ne s'est ouverte, utilisez les alternatives ci-dessous : ${s ? `Ouvrir dans ${s}, ou ` : ""}Copier le récapitulatif, puis collez-le dans un nouvel e-mail à ${a}.`,
    openIn: "Rien ne s'ouvre ? Ouvrir dans :",
    openInLabel: (s) => `Ouvrir le brouillon dans ${s} (nouvel onglet)`,
    copySummary: "Copier le récapitulatif",
    copyAddress: "Copier l'adresse",
    copied: "Copié",
    copyFailed: "La copie n'a pas fonctionné : sélectionnez le texte et copiez-le à la main.",
    addressLabel: "Notre adresse e-mail",
    tooLong: "Le récapitulatif est trop long pour s'ouvrir pré-rempli dans votre messagerie : en appuyant sur « Envoyer par e-mail », nous le copions pour vous ; collez-le ensuite dans l'e-mail.",
    pasteHere: "Collez ici le récapitulatif de la demande.",
    emailSubject: (s) => `Demande de séjour – ${s}`,
    short: { nome: "Prénom", cognome: "Nom", telefono: "Tél.", email: "E-mail", arrivo: "Arr.", partenza: "Dép.", adulti: "Adultes", bambini: "Enfants", appartamento: "Appt.", soluzione: "Formule", animale: "Animal", colonnina: "Recharge 22 kW", colonninaVilla: "Recharge 7 kW", ebike: "Vélo él." },
    sentEdit: "Modifier la demande",
    msgIntro: (s) => `Bonjour ! Je vous écris depuis le site avec une demande pour ${s}.`,
    msgNights: (n) => `${n} ${n === 1 ? "nuit" : "nuits"}`,
    msgAnimale: "Animal",
    colonnina: "Borne de recharge électrique (22 kW)",
    colonninaVilla: "Borne de recharge électrique (7 kW)",
    ebike: "Location de vélo électrique",
    ebikeDurata: "Durée de location",
    ebikeOpzioni: ["Demi-journée — 15 €", "Journée entière — 25 €", "Week-end — 40 €", "7 jours — 90 €"],
    si: "Oui",
  },
  de: {
    fab: "Anfrage",
    title: "Anfrage senden",
    intro: "Wir antworten Ihnen direkt, ohne Vermittler.",
    nome: "Vorname",
    cognome: "Nachname",
    telefono: "Telefon",
    email: "E-Mail",
    ospiti: "Gäste",
    etaBambino: (n) => `Alter Kind ${n}`,
    appartamento: "Bevorzugtes Apartment",
    soluzione: "Bevorzugte Option",
    nessunaPreferenza: "Keine Präferenz",
    animali: "Ich reise mit Haustieren",
    taglia: "Größe",
    taglie: ["Klein", "Mittel", "Groß"],
    tipo: "Art des Tieres",
    tipi: ["Hund", "Katze", "Andere"],
    messaggio: "Nachricht (optional)",
    invia: "Prüfen und senden",
    inviaNote: "Im nächsten Schritt sehen Sie die Zusammenfassung und wählen, ob Sie sie per WhatsApp oder per E-Mail senden.",
    privacyPrefix: "Wir verwenden diese Daten nur, um Ihre Anfrage zu beantworten —",
    privacyLink: "Datenschutzerklärung",
    reviewHeading: "Wie möchten Sie Ihre Anfrage senden?",
    reviewIntro: "Das ist die Zusammenfassung, die wir erhalten. Sie öffnet sich fertig ausgefüllt in der gewählten App: Dort einfach auf Senden tippen.",
    summaryLabel: "Zusammenfassung der Anfrage",
    sendWhatsapp: "Über WhatsApp senden",
    sendEmail: "Per E-Mail senden",
    openedNote: "Die App wurde geöffnet: Tippen Sie auf Senden, um Ihre Anfrage abzuschließen.",
    emailHintApp: "Ihre E-Mail-App wird geöffnet",
    emailHintWebmail: (s) => `${s} wird im Browser geöffnet`,
    emailHintNoApp: "Falls auf Ihrem Computer keine E-Mail-App eingerichtet ist, nutzen Sie die Alternativen unten",
    noAppNote: (s, a) => `Falls sich keine E-Mail-App geöffnet hat, nutzen Sie die Alternativen unten: ${s ? `In ${s} öffnen oder ` : ""}Zusammenfassung kopieren und in eine neue E-Mail an ${a} einfügen.`,
    openIn: "Nichts geöffnet? Öffnen in:",
    openInLabel: (s) => `Entwurf in ${s} öffnen (neuer Tab)`,
    copySummary: "Zusammenfassung kopieren",
    copyAddress: "Adresse kopieren",
    copied: "Kopiert",
    copyFailed: "Kopieren hat nicht funktioniert: Markieren Sie den Text und kopieren Sie ihn von Hand.",
    addressLabel: "Unsere E-Mail-Adresse",
    tooLong: "Die Zusammenfassung ist zu lang, um ausgefüllt in Ihrem E-Mail-Programm zu öffnen: Wenn Sie auf „Per E-Mail senden“ tippen, kopieren wir sie für Sie; fügen Sie sie dann in die E-Mail ein.",
    pasteHere: "Fügen Sie hier die Zusammenfassung der Anfrage ein.",
    emailSubject: (s) => `Aufenthaltsanfrage – ${s}`,
    short: { nome: "Vorname", cognome: "Name", telefono: "Tel.", email: "E-Mail", arrivo: "Anreise", partenza: "Abreise", adulti: "Erw.", bambini: "Kinder", appartamento: "Apt.", soluzione: "Option", animale: "Tier", colonnina: "Laden 22 kW", colonninaVilla: "Laden 7 kW", ebike: "E-Bike" },
    sentEdit: "Anfrage bearbeiten",
    msgIntro: (s) => `Hallo! Ich schreibe Ihnen über die Website mit einer Anfrage für ${s}.`,
    msgNights: (n) => `${n} ${n === 1 ? "Nacht" : "Nächte"}`,
    msgAnimale: "Haustier",
    colonnina: "E-Ladestation (22 kW)",
    colonninaVilla: "E-Ladestation (7 kW)",
    ebike: "E-Bike-Verleih",
    ebikeDurata: "Mietdauer",
    ebikeOpzioni: ["Halber Tag — 15 €", "Ganzer Tag — 25 €", "Wochenende — 40 €", "7 Tage — 90 €"],
    si: "Ja",
  },
};

function todayInputValue() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* "Oggi" calcolato solo nel browser: le pagine sono generate in anticipo,
   una data calcolata durante il render lato server resterebbe ferma al
   giorno della build. Sul server (e in hydration) vale "", nessun min. */
const subscribeNoop = () => () => {};
function useToday() {
  return useSyncExternalStore(subscribeNoop, todayInputValue, () => "");
}

/* I valori di <input type="date"> sono "YYYY-MM-DD": letti come date UTC
   pure, così giorno successivo e numero di notti non slittano col fuso
   orario del visitatore. */
function parseInputDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function nextDayInputValue(value: string) {
  const d = parseInputDate(value);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label
      className={`flex flex-col gap-1 rounded-[3px] border border-ink/10 bg-white px-4 py-2.5 transition-colors focus-within:border-ink/40 ${className ?? ""}`}
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
        {label}
        <span aria-hidden="true"> *</span>
      </span>
      {children}
    </label>
  );
}

const CONTROL_CLASS = "w-full bg-transparent text-[15px] text-ink outline-none [color-scheme:light]";

/* Riga "stepper" in stile Booking.com: etichetta a sinistra, − valore +
   a destra. Il valore è anche annunciato dagli screen reader (aria-live). */
function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-ink/25 text-[18px] leading-none text-ink transition-colors hover:border-raspberry hover:text-raspberry disabled:cursor-not-allowed disabled:opacity-30";
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-[14px] text-ink">{label}</span>
      <div className="flex items-center gap-4">
        <button type="button" className={btn} aria-label={`− ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          −
        </button>
        <span className="w-5 text-center text-[15px] font-medium tabular-nums text-ink" aria-live="polite">
          {value}
        </span>
        <button type="button" className={btn} aria-label={`+ ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

function WhatsAppIcon({ size = 17 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.86 9.86 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.02.1-3.31-.75-2.79-1.04-4.59-3.9-4.73-4.08-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.3.24-.26.55-.33.73-.33h.53c.17 0 .4-.03.62.48.24.55.8 1.91.87 2.05.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

function RequestIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* Modulo di richiesta (La Mora o Villa Relax): tutti i campi obbligatori
   tranne preferenza e messaggio; l'invio apre WhatsApp con il messaggio già
   compilato (nessun server nostro, nessun dato salvato dal sito). */
function RequestForm({ struttura, locale, titleId }: { struttura: "lamora" | "villa"; locale: Locale; titleId: string }) {
  const text = TEXT[locale];
  const isVilla = struttura === "villa";
  const maxGuests = isVilla ? VILLA_MAX_GUESTS : LAMORA_MAX_GUESTS;
  const preferenceOptions = isVilla ? getVillaConfigurations(locale).map((c) => c.name) : APARTMENT_NAMES;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [childAges, setChildAges] = useState<string[]>([]);
  const [preference, setPreference] = useState("");
  const [pets, setPets] = useState(false);
  const [petSize, setPetSize] = useState("");
  const [petType, setPetType] = useState("");
  const [evCharger, setEvCharger] = useState(false);
  const [ebike, setEbike] = useState(false);
  const [ebikeOption, setEbikeOption] = useState("");
  const [message, setMessage] = useState("");
  /* Passo finale: il riepilogo (lo stesso testo di WhatsApp) quando il
     modulo è valido; null mentre si compila. */
  const [review, setReview] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [copied, setCopied] = useState<"summary" | "address" | "failed" | null>(null);
  const emailHintId = useId();
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null);
  const formHeadingRef = useRef<HTMLHeadingElement>(null);
  const backToForm = useRef(false);
  /* Ferma l'attesa dell'esito di un mailto (vedi watchMailto). */
  const stopMailtoWatch = useRef<(() => void) | null>(null);
  const today = useToday();

  useEffect(() => () => stopMailtoWatch.current?.(), []);

  // Focus sul titolo del passo che compare (riepilogo o modulo).
  useEffect(() => {
    if (review !== null) reviewHeadingRef.current?.focus();
    else if (backToForm.current) {
      backToForm.current = false;
      formHeadingRef.current?.focus();
    }
  }, [review]);

  function updateAdults(value: number) {
    setAdults(value);
    // Adulti + bambini non superano mai la capienza massima.
    setChildAges((ages) => ages.slice(0, maxGuests - value));
  }

  function updateChildCount(count: number) {
    setChildAges((ages) => (count <= ages.length ? ages.slice(0, count) : [...ages, ...Array(count - ages.length).fill("")]));
  }

  function updateCheckIn(value: string) {
    setCheckIn(value);
    if (value && checkOut && checkOut <= value) setCheckOut("");
  }

  /* Riepilogo della richiesta: è il testo del messaggio WhatsApp e il corpo
     dell'email. `compact` accorcia solo le etichette (email troppo lunga). */
  function buildMessage(compact = false) {
    const dateFormatter = new Intl.DateTimeFormat(INTL_TAG[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    const nights = Math.round((parseInputDate(checkOut).getTime() - parseInputDate(checkIn).getTime()) / 86_400_000);
    const label = compact
      ? text.short
      : {
          nome: text.nome,
          cognome: text.cognome,
          telefono: text.telefono,
          email: text.email,
          arrivo: t("booking", "arrivo", locale),
          partenza: t("booking", "partenza", locale),
          adulti: t("booking", "adulti", locale),
          bambini: t("booking", "bambini", locale),
          appartamento: text.appartamento,
          soluzione: text.soluzione,
          animale: text.msgAnimale,
          colonnina: text.colonnina,
          colonninaVilla: text.colonninaVilla,
          ebike: text.ebike,
        };
    const lines = [
      text.msgIntro(isVilla ? "Villa Relax" : "Agriturismo La Mora"),
      "",
      `${label.nome}: ${firstName.trim()}`,
      `${label.cognome}: ${lastName.trim()}`,
      `${label.telefono}: ${phone.trim()}`,
      `${label.email}: ${email.trim()}`,
      `${label.arrivo}: ${dateFormatter.format(parseInputDate(checkIn))}`,
      `${label.partenza}: ${dateFormatter.format(parseInputDate(checkOut))} (${text.msgNights(nights)})`,
      `${label.adulti}: ${adults}`,
    ];
    if (childAges.length > 0) {
      lines.push(`${label.bambini}: ${childAges.length} (${childAges.map((age) => (age === "0" ? "<1" : age)).join(", ")})`);
    }
    if (preference) lines.push(`${isVilla ? label.soluzione : label.appartamento}: ${preference}`);
    if (pets) lines.push(`${label.animale}: ${petType} (${text.taglia}: ${petSize})`);
    if (evCharger) lines.push(`${isVilla ? label.colonninaVilla : label.colonnina}: ${text.si}`);
    if (!isVilla && ebike) lines.push(`${label.ebike}: ${ebikeOption}`);
    if (message.trim()) lines.push("", message.trim());
    return lines.join("\n");
  }

  /* Oggetto dell'email: "Richiesta di soggiorno – <struttura>", con le date
     (sempre presenti: sono campi obbligatori del modulo). */
  function emailSubject() {
    const short = new Intl.DateTimeFormat(INTL_TAG[locale], { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" });
    const dates = checkIn && checkOut ? ` (${short.format(parseInputDate(checkIn))} – ${short.format(parseInputDate(checkOut))})` : "";
    return `${text.emailSubject(isVilla ? "Villa Relax Assisi" : "Agriturismo La Mora")}${dates}`;
  }

  /* Link della bozza (mailto o webmail) per un dato corpo. `account`:
     indirizzo Gmail dell'utente, solo per l'apertura automatica. */
  function draftLink(target: EmailTarget, account?: string) {
    return (body: string) => {
      const draft = { to: contactEmail(), subject: emailSubject(), body };
      return target === "mailto" ? mailtoUrl(draft) : webmailUrl(target, draft, account);
    };
  }

  /* Dove si apre la bozza: webmail nel browser solo su computer, se il
     servizio riconosciuto dal dominio dell'utente è verificato; altrimenti
     (telefono, tablet, iCloud, altri domini, email non valida) l'app di
     posta con mailto. */
  function emailTarget(): EmailTarget {
    const provider = detectEmailProvider(email);
    return isVerifiedWebmail(provider) && !isMobileDevice(navigator) ? provider : "mailto";
  }

  /* Corpo dell'email: riepilogo completo; se il link supera EMAIL_LINK_MAX,
     etichette accorciate; se è ancora troppo lungo, "paste": il riepilogo si
     copia negli appunti e nel corpo resta l'invito a incollarlo (avviso
     visibile nel passo finale, mai un errore muto). */
  function emailPlan(summary: string, link: (body: string) => string): { body: string; mode: "full" | "short" | "paste" } {
    const fits = (body: string) => link(body).length <= EMAIL_LINK_MAX;
    if (fits(summary)) return { body: summary, mode: "full" };
    const compact = buildMessage(true);
    if (fits(compact)) return { body: compact, mode: "short" };
    return { body: text.pasteHere, mode: "paste" };
  }

  function showNotice(value: Notice) {
    stopMailtoWatch.current?.();
    setNotice(value);
  }

  /* Computer con mailto: se nessuna app di posta è registrata il link non
     apre nulla e la pagina resta in primo piano. Un blur o un cambio di
     visibilità entro MAILTO_WATCH_MS vale come "app aperta"; altrimenti si
     suggeriscono le alternative. Sceglie solo l'avviso: non blocca né
     nasconde nulla. */
  function watchMailto() {
    showNotice(null);
    const finish = (result: Notice) => {
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onLeave);
      window.clearTimeout(timer);
      stopMailtoWatch.current = null;
      if (result) setNotice(result);
    };
    const onLeave = () => finish("opened");
    const timer = window.setTimeout(() => finish(document.hidden ? "opened" : "noApp"), MAILTO_WATCH_MS);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onLeave);
    stopMailtoWatch.current = () => finish(null);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showNotice(null);
    setCopied(null);
    setReview(buildMessage());
  }

  /* WhatsApp: stesso link e stesso testo di sempre. */
  function sendWhatsapp(summary: string) {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`, "_blank", "noopener,noreferrer");
    showNotice("opened");
  }

  /* Email: destinazione e link si decidono solo qui, al click. */
  async function sendEmail(summary: string) {
    const target = emailTarget();
    const link = draftLink(target, target === "gmail" ? email : undefined);
    const plan = emailPlan(summary, link);
    if (target === "mailto") {
      if (plan.mode === "paste") setCopied((await copyText(summary)) ? "summary" : "failed");
      // Telefoni e tablet: come prima, l'app di posta c'è sempre.
      if (isMobileDevice(navigator)) showNotice("opened");
      else watchMailto();
      openLink(link(plan.body));
    } else {
      /* window.open subito, dentro il gesto dell'utente (altrimenti il
         blocco popup la ferma): la copia parte prima, l'esito arriva dopo. */
      const copying = plan.mode === "paste" ? copyText(summary) : null;
      window.open(link(plan.body), "_blank", "noopener,noreferrer");
      showNotice("opened");
      if (copying) setCopied((await copying) ? "summary" : "failed");
    }
  }

  /* Link "Apri in:": la copia del riepilogo (se troppo lungo) parte nel
     clic, la nuova scheda la apre il link stesso. */
  function openFallback(paste: boolean, summary: string) {
    if (paste) copy(summary, "summary");
    showNotice("opened");
  }

  async function copy(value: string, what: "summary" | "address") {
    setCopied((await copyText(value)) ? what : "failed");
  }

  function backToEdit() {
    stopMailtoWatch.current?.();
    backToForm.current = true;
    setReview(null);
  }

  const privacyHref = withLocale(locale, "/privacy/");
  const privacyLinkClass = "underline decoration-ink-soft/40 underline-offset-4 hover:text-ink";
  const privacyNote = (
    <>
      {text.privacyPrefix}{" "}
      {isVilla ? (
        <a href={privacyHref} className={privacyLinkClass}>
          {text.privacyLink}
        </a>
      ) : (
        <Link href={privacyHref} className={privacyLinkClass}>
          {text.privacyLink}
        </Link>
      )}
    </>
  );

  if (review !== null) {
    const address = contactEmail();
    /* Previsione per l'indicazione sotto il pulsante e per l'avviso: il
       passo finale esiste solo nel browser, dopo l'invio del modulo; al
       click la scelta si rifà da capo. */
    const target = emailTarget();
    const plan = emailPlan(review, draftLink(target, target === "gmail" ? email : undefined));
    const fallbacks = VERIFIED_WEBMAILS.map((service) => {
      const link = draftLink(service);
      const servicePlan = emailPlan(review, link);
      return { service, href: link(servicePlan.body), paste: servicePlan.mode === "paste" };
    });
    /* Computer con mailto: l'app di posta potrebbe mancare, quindi
       indicazione, avviso e "Copia riepilogo" puntano alle alternative. */
    const mobile = isMobileDevice(navigator);
    const mailtoOnDesktop = !mobile && target === "mailto";
    const emailHint = mobile ? text.emailHintApp : target === "mailto" ? text.emailHintNoApp : text.emailHintWebmail(WEBMAIL_NAMES[target]);
    const noAppNote = text.noAppNote(fallbacks.length ? fallbacks.map(({ service }) => WEBMAIL_NAMES[service]).join(" / ") : null, address);
    const notices = mailtoOnDesktop ? [text.openedNote, noAppNote] : [text.openedNote];
    const linkClass = "text-[13px] text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry";
    const smallButton =
      "rounded-[3px] border border-ink/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-raspberry hover:text-raspberry";
    const strongButton =
      "rounded-[3px] border border-raspberry bg-raspberry px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:border-[#8a3844] hover:bg-[#8a3844]";
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 id={titleId} ref={reviewHeadingRef} tabIndex={-1} className="font-display text-[24px] font-normal leading-[1.25] text-ink outline-none [text-wrap:balance] sm:text-[26px]">
            {text.reviewHeading}
          </h2>
          <p className="mx-auto mt-2 max-w-[440px] text-[13px] leading-[1.6] text-ink-soft">{text.reviewIntro}</p>
        </div>

        {/* Riepilogo in sola lettura: lo stesso testo che parte su WhatsApp
            e nell'email. Scorrevole e raggiungibile da tastiera. */}
        <div
          role="region"
          aria-label={text.summaryLabel}
          tabIndex={0}
          className="max-h-[38vh] overflow-y-auto whitespace-pre-wrap break-words rounded-[3px] border border-ink/10 bg-white px-4 py-3 text-[13.5px] leading-[1.6] text-ink outline-none focus-visible:border-ink/40"
        >
          {review}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => sendWhatsapp(review)}
            className="flex w-full items-center justify-center gap-2.5 rounded-[3px] bg-raspberry px-5 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#8a3844]"
          >
            <WhatsAppIcon />
            {text.sendWhatsapp}
          </button>
          <button
            type="button"
            onClick={() => sendEmail(review)}
            aria-describedby={emailHintId}
            className="flex w-full items-center justify-center gap-2.5 rounded-[3px] bg-olive-950 px-5 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#141810]"
          >
            <RequestIcon />
            {text.sendEmail}
          </button>
          {/* Sotto il pulsante email (seconda colonna da tablet in su). */}
          <p id={emailHintId} className="-mt-1.5 text-center text-[12px] leading-[1.4] text-ink-soft sm:col-start-2">
            {emailHint}
          </p>
        </div>

        {plan.mode === "paste" && <p className="rounded-[3px] bg-white px-4 py-3 text-[13px] leading-[1.6] text-ink">{text.tooLong}</p>}

        {/* Esito: l'invio non è automatico, va confermato nell'app. Gli avvisi
            possibili sono già qui, invisibili, nella stessa cella: lo spazio è
            quello del più lungo e quando uno compare non si sposta nulla. */}
        <div className="grid text-center text-[14px] font-semibold leading-[1.3] text-ink wrap-break-word">
          {notices.map((note) => (
            <p key={note} aria-hidden="true" className="invisible col-start-1 row-start-1">
              {note}
            </p>
          ))}
          <p aria-live="polite" className="col-start-1 row-start-1">
            {notice === "opened" ? text.openedNote : notice === "noApp" ? noAppNote : ""}
          </p>
        </div>

        <div className="space-y-3 border-t border-ink/10 pt-4 text-center">
          <p className="text-[13px] leading-[1.6] text-ink-soft">
            {text.openIn}{" "}
            {fallbacks.map(({ service, href, paste }, i) => (
              <Fragment key={service}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={text.openInLabel(WEBMAIL_NAMES[service])}
                  onClick={() => openFallback(paste, review)}
                  className={linkClass}
                >
                  {WEBMAIL_NAMES[service]}
                </a>
              </Fragment>
            ))}
          </p>
          <p className="text-[13px] leading-[1.5] text-ink-soft">
            {text.addressLabel}: <span className="break-all text-ink">{address}</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={() => copy(review, "summary")} className={mailtoOnDesktop ? strongButton : smallButton}>
              {text.copySummary}
            </button>
            <button type="button" onClick={() => copy(address, "address")} className={smallButton}>
              {text.copyAddress}
            </button>
          </div>
          <p aria-live="polite" className="min-h-[1.5em] text-[12px] text-ink-soft">
            {copied === "failed" ? text.copyFailed : copied ? text.copied : ""}
          </p>
          <button type="button" onClick={backToEdit} className="text-[12px] font-semibold uppercase tracking-[0.05em] text-ink-soft transition-colors hover:text-ink">
            {text.sentEdit}
          </button>
          <p className="text-[12px] leading-[1.6] text-ink-soft">{privacyNote}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="text-center">
        <h2 id={titleId} ref={formHeadingRef} tabIndex={-1} className="font-display text-[26px] font-normal leading-[1.2] text-ink outline-none">
          {text.title}
        </h2>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-ink-soft">{text.intro}</p>
      </div>

      <div className="grid gap-3 pt-2 sm:grid-cols-2">
        <Field label={text.nome}>
          <input type="text" required autoComplete="given-name" maxLength={80} value={firstName} onChange={(e) => setFirstName(e.target.value)} className={CONTROL_CLASS} />
        </Field>
        <Field label={text.cognome}>
          <input type="text" required autoComplete="family-name" maxLength={80} value={lastName} onChange={(e) => setLastName(e.target.value)} className={CONTROL_CLASS} />
        </Field>
        <Field label={text.telefono}>
          <input
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            pattern="[0-9+\(\)\s.\-]{6,}"
            maxLength={25}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={CONTROL_CLASS}
          />
        </Field>
        <Field label={text.email}>
          <input type="email" required autoComplete="email" maxLength={120} value={email} onChange={(e) => setEmail(e.target.value)} className={CONTROL_CLASS} />
        </Field>
        <Field label={t("booking", "arrivo", locale)}>
          <input type="date" required value={checkIn} min={today || undefined} onChange={(e) => updateCheckIn(e.target.value)} className={CONTROL_CLASS} />
        </Field>
        <Field label={t("booking", "partenza", locale)}>
          <input
            type="date"
            required
            value={checkOut}
            min={checkIn ? nextDayInputValue(checkIn) : today || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
            className={CONTROL_CLASS}
          />
        </Field>
      </div>

      {/* Ospiti in stile Booking.com: adulti e bambini con + / −; per ogni
          bambino compare una riga con l'età, obbligatoria. */}
      <fieldset className="rounded-[3px] border border-ink/10 bg-white px-4 py-1.5">
        <legend className="sr-only">{text.ospiti}</legend>
        <span aria-hidden="true" className="block pt-2 text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
          {text.ospiti} *
        </span>
        <div className="divide-y divide-ink/10">
          <Stepper label={t("booking", "adulti", locale)} value={adults} min={1} max={maxGuests - childAges.length} onChange={updateAdults} />
          <Stepper label={t("booking", "bambini", locale)} value={childAges.length} min={0} max={maxGuests - adults} onChange={updateChildCount} />
        </div>
        {childAges.length > 0 && (
          <div className="grid grid-cols-2 gap-3 border-t border-ink/10 py-3 sm:grid-cols-3">
            {childAges.map((age, i) => (
              <label key={i} className="flex flex-col gap-1">
                <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
                  {text.etaBambino(i + 1)}
                  <span aria-hidden="true"> *</span>
                </span>
                <select
                  required
                  value={age}
                  onChange={(e) => setChildAges((ages) => ages.map((a, j) => (j === i ? e.target.value : a)))}
                  className="w-full rounded-[3px] border border-ink/15 bg-white px-2 py-1.5 text-[15px] text-ink outline-none focus:border-ink/40"
                >
                  <option value="" disabled>
                    —
                  </option>
                  {Array.from({ length: CHILD_MAX_AGE + 1 }, (_, n) => n).map((n) => (
                    <option key={n} value={n}>
                      {n === 0 ? "<1" : n}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      <label className="flex flex-col gap-1 rounded-[3px] border border-ink/10 bg-white px-4 py-2.5 transition-colors focus-within:border-ink/40">
        <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{isVilla ? text.soluzione : text.appartamento}</span>
        <select value={preference} onChange={(e) => setPreference(e.target.value)} className={CONTROL_CLASS}>
          <option value="">{text.nessunaPreferenza}</option>
          {preferenceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="rounded-[3px] border border-ink/10 bg-white px-4 py-3">
        <label className="flex items-center gap-2.5 text-[14px] text-ink">
          <input type="checkbox" checked={pets} onChange={(e) => setPets(e.target.checked)} className="h-4 w-4 accent-raspberry" />
          {text.animali}
        </label>
        {/* Taglia e tipo servono a Paolo per assegnare l'appartamento
            giusto: obbligatori solo se si viaggia con animali. */}
        {pets && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
                {text.taglia}
                <span aria-hidden="true"> *</span>
              </span>
              <select required value={petSize} onChange={(e) => setPetSize(e.target.value)} className="w-full rounded-[3px] border border-ink/15 bg-white px-2 py-1.5 text-[15px] text-ink outline-none focus:border-ink/40">
                <option value="" disabled>
                  —
                </option>
                {text.taglie.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
                {text.tipo}
                <span aria-hidden="true"> *</span>
              </span>
              <select required value={petType} onChange={(e) => setPetType(e.target.value)} className="w-full rounded-[3px] border border-ink/15 bg-white px-2 py-1.5 text-[15px] text-ink outline-none focus:border-ink/40">
                <option value="" disabled>
                  —
                </option>
                {text.tipi.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>

      {/* Extra facoltativi. Colonnina di ricarica in entrambi i moduli, da
          segnalare subito (serve a Paolo per organizzarsi): 22 kW a La Mora,
          7 kW a Villa Relax (PROJECT-BRIEF.md, villa.ts). Noleggio e-bike col
          listino ufficiale: solo La Mora; la
          durata è obbligatoria solo se si sceglie l'e-bike. */}
      <div className="space-y-3 rounded-[3px] border border-ink/10 bg-white px-4 py-3">
        <label className="flex items-center gap-2.5 text-[14px] text-ink">
          <input type="checkbox" checked={evCharger} onChange={(e) => setEvCharger(e.target.checked)} className="h-4 w-4 accent-raspberry" />
          {isVilla ? text.colonninaVilla : text.colonnina}
        </label>
        {!isVilla && (
          <label className="flex items-center gap-2.5 text-[14px] text-ink">
            <input type="checkbox" checked={ebike} onChange={(e) => setEbike(e.target.checked)} className="h-4 w-4 accent-raspberry" />
            {text.ebike}
          </label>
        )}
        {!isVilla && ebike && (
          <label className="flex flex-col gap-1">
            <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
              {text.ebikeDurata}
              <span aria-hidden="true"> *</span>
            </span>
            <select required value={ebikeOption} onChange={(e) => setEbikeOption(e.target.value)} className="w-full rounded-[3px] border border-ink/15 bg-white px-2 py-1.5 text-[15px] text-ink outline-none focus:border-ink/40">
              <option value="" disabled>
                —
              </option>
              {text.ebikeOpzioni.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <label className="flex flex-col gap-1 rounded-[3px] border border-ink/10 bg-white px-4 py-2.5 transition-colors focus-within:border-ink/40">
        <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{text.messaggio}</span>
        <textarea rows={3} maxLength={1000} value={message} onChange={(e) => setMessage(e.target.value)} className={`${CONTROL_CLASS} resize-y`} />
      </label>

      <button
        type="submit"
        className="mt-1 flex w-full items-center justify-center gap-2.5 rounded-[3px] bg-raspberry px-5 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#8a3844]"
      >
        {text.invia}
        <span aria-hidden="true">→</span>
      </button>
      <p className="text-center text-[12px] leading-[1.6] text-ink-soft">
        {text.inviaNote}
        <br />
        {privacyNote}
      </p>
    </form>
  );
}

/* Pulsante flottante "Richiesta" in basso a sinistra, su ogni pagina, che
   apre il modulo di richiesta in una finestra centrata (al posto della
   sezione con il modulo aperto in pagina — richiesta esplicita del
   titolare). Sulle pagine Villa Relax il modulo è quello della Villa,
   altrove quello di Agriturismo La Mora. Come la booking bar, si dissolve
   vicino al footer per non coprirne i contenuti. Il modulo resta montato
   quando la finestra si chiude, così i dati già inseriti non si perdono. */
export function RichiesteModal({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const struttura = splitLocaleFromPath(pathname ?? "/").path.startsWith("/villa-relax-assisi") ? "villa" : "lamora";
  const text = TEXT[locale];
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), { rootMargin: "0px 0px -15% 0px" });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    const fab = fabRef.current;
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      fab?.focus();
    };
  }, [open]);

  const fabHidden = open || nearFooter;

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={text.title}
        className={`fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] left-5 z-[65] flex h-11 items-center gap-2 rounded-full border border-cream/25 bg-olive-950/90 pl-3.5 pr-4 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-cream shadow-[0_10px_25px_-10px_rgba(0,0,0,0.5)] transition-[opacity,transform,border-color,color] duration-300 hover:border-raspberry-light hover:text-raspberry-light sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:left-6 ${
          fabHidden ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <RequestIcon />
        {text.fab}
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 ${open ? "" : "hidden"}`}
      >
        <div aria-hidden="true" onClick={() => setOpen(false)} className="absolute inset-0 bg-[rgba(36,31,23,0.55)]" />
        <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-[560px] overflow-y-auto rounded-[8px] bg-cream px-5 pb-6 pt-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:max-h-[calc(100dvh-3rem)] sm:px-8 sm:pb-8">
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("nav", "chiudi", locale)}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
          >
            <CloseIcon />
          </button>
          {/* Logo della struttura del modulo: Villa Relax (scritte nere, su
              fondo chiaro) sulle pagine Villa, La Mora altrove. */}
          <div className="flex justify-center pb-3">
            {struttura === "villa" ? (
              <Image src={VILLA_LOGO_BLACK_SMALL} alt={VILLA_LOGO_ALT} width={96} height={79} unoptimized className="h-auto w-[96px]" />
            ) : (
              <Image src={LAMORA_LOGO_DARK_SMALL} alt="Agriturismo La Mora" width={1448} height={1086} unoptimized className="h-auto w-[104px]" />
            )}
          </div>
          <RequestForm key={struttura} struttura={struttura} locale={locale} titleId={titleId} />
        </div>
      </div>
    </>
  );
}
