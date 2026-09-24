"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { APARTMENTS } from "@/data/apartments";
import { getVillaConfigurations, VILLA_MAX_GUESTS } from "@/data/villa";
import type { Locale } from "@/lib/i18n";
import { splitLocaleFromPath, withLocale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";

const WHATSAPP_NUMBER = "393934363917";
const INTL_TAG: Record<Locale, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR", de: "de-DE" };
/* Capienza massima di una richiesta: somma reale dei 5 appartamenti per
   La Mora, capienza della villa intera per Villa Relax. */
const LAMORA_MAX_GUESTS = APARTMENTS.reduce((sum, apt) => sum + apt.maxGuests, 0);
const CHILD_MAX_AGE = 17;
/* Ordine del selettore appartamento richiesto dal titolare (non quello del
   carousel in APARTMENTS); i nomi vengono comunque da APARTMENTS. */
const APARTMENT_ORDER = ["pesci", "gemelli", "sagittario", "acquario", "bilancia"];
const APARTMENT_NAMES = APARTMENT_ORDER.flatMap((slug) => APARTMENTS.filter((a) => a.slug === slug).map((a) => a.name));

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
  whatsappNote: string;
  privacyPrefix: string;
  privacyLink: string;
  sentHeading: string;
  sentBody: string;
  sentRetry: string;
  sentEdit: string;
  msgIntro: (struttura: string) => string;
  msgNights: (n: number) => string;
  msgAnimale: string;
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
    invia: "Invia la richiesta su WhatsApp",
    whatsappNote: "Si apre WhatsApp con il messaggio già compilato: ti basta premere Invia.",
    privacyPrefix: "Useremo questi dati solo per rispondere alla tua richiesta —",
    privacyLink: "informativa privacy",
    sentHeading: "Richiesta pronta su WhatsApp",
    sentBody: "Si è aperta la chat con il messaggio già scritto: premi Invia per mandarcelo, ti rispondiamo noi.",
    sentRetry: "WhatsApp non si è aperto? Aprilo di nuovo",
    sentEdit: "Modifica la richiesta",
    msgIntro: (s) => `Ciao! Vi scrivo dal sito con una richiesta per ${s}.`,
    msgNights: (n) => `${n} ${n === 1 ? "notte" : "notti"}`,
    msgAnimale: "Animale",
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
    invia: "Send the request on WhatsApp",
    whatsappNote: "WhatsApp opens with the message already written: just press Send.",
    privacyPrefix: "We'll only use this information to reply to your request —",
    privacyLink: "privacy policy",
    sentHeading: "Your request is ready on WhatsApp",
    sentBody: "The chat has opened with the message already written: press Send to deliver it and we'll get back to you.",
    sentRetry: "WhatsApp didn't open? Open it again",
    sentEdit: "Edit the request",
    msgIntro: (s) => `Hi! I'm writing from the website with a request for ${s}.`,
    msgNights: (n) => `${n} ${n === 1 ? "night" : "nights"}`,
    msgAnimale: "Pet",
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
    invia: "Envoyer la demande sur WhatsApp",
    whatsappNote: "WhatsApp s'ouvre avec le message déjà rédigé : il suffit d'appuyer sur Envoyer.",
    privacyPrefix: "Nous utiliserons ces données uniquement pour répondre à votre demande —",
    privacyLink: "politique de confidentialité",
    sentHeading: "Votre demande est prête sur WhatsApp",
    sentBody: "La conversation s'est ouverte avec le message déjà rédigé : appuyez sur Envoyer pour nous le transmettre, nous vous répondrons.",
    sentRetry: "WhatsApp ne s'est pas ouvert ? Ouvrez-le à nouveau",
    sentEdit: "Modifier la demande",
    msgIntro: (s) => `Bonjour ! Je vous écris depuis le site avec une demande pour ${s}.`,
    msgNights: (n) => `${n} ${n === 1 ? "nuit" : "nuits"}`,
    msgAnimale: "Animal",
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
    invia: "Anfrage über WhatsApp senden",
    whatsappNote: "WhatsApp öffnet sich mit der bereits verfassten Nachricht: einfach auf Senden tippen.",
    privacyPrefix: "Wir verwenden diese Daten nur, um Ihre Anfrage zu beantworten —",
    privacyLink: "Datenschutzerklärung",
    sentHeading: "Ihre Anfrage ist in WhatsApp bereit",
    sentBody: "Der Chat hat sich mit der bereits verfassten Nachricht geöffnet: tippen Sie auf Senden, und wir melden uns bei Ihnen.",
    sentRetry: "WhatsApp hat sich nicht geöffnet? Erneut öffnen",
    sentEdit: "Anfrage bearbeiten",
    msgIntro: (s) => `Hallo! Ich schreibe Ihnen über die Website mit einer Anfrage für ${s}.`,
    msgNights: (n) => `${n} ${n === 1 ? "Nacht" : "Nächte"}`,
    msgAnimale: "Haustier",
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
  const [message, setMessage] = useState("");
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const today = useToday();

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

  function buildMessage() {
    const dateFormatter = new Intl.DateTimeFormat(INTL_TAG[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    const nights = Math.round((parseInputDate(checkOut).getTime() - parseInputDate(checkIn).getTime()) / 86_400_000);
    const lines = [
      text.msgIntro(isVilla ? "Villa Relax" : "Agriturismo La Mora"),
      "",
      `${text.nome}: ${firstName.trim()}`,
      `${text.cognome}: ${lastName.trim()}`,
      `${text.telefono}: ${phone.trim()}`,
      `${text.email}: ${email.trim()}`,
      `${t("booking", "arrivo", locale)}: ${dateFormatter.format(parseInputDate(checkIn))}`,
      `${t("booking", "partenza", locale)}: ${dateFormatter.format(parseInputDate(checkOut))} (${text.msgNights(nights)})`,
      `${t("booking", "adulti", locale)}: ${adults}`,
    ];
    if (childAges.length > 0) {
      lines.push(`${t("booking", "bambini", locale)}: ${childAges.length} (${childAges.map((age) => (age === "0" ? "<1" : age)).join(", ")})`);
    }
    if (preference) lines.push(`${isVilla ? text.soluzione : text.appartamento}: ${preference}`);
    if (pets) lines.push(`${text.msgAnimale}: ${petType} (${text.taglia}: ${petSize})`);
    if (message.trim()) lines.push("", message.trim());
    return lines.join("\n");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  }

  const privacyHref = withLocale(locale, "/privacy/");
  const privacyLinkClass = "underline decoration-ink-soft/40 underline-offset-4 hover:text-ink";

  if (sentUrl) {
    return (
      <div role="status" className="py-4 text-center">
        <h3 id={titleId} className="font-display text-[24px] font-normal leading-[1.25] text-ink">
          {text.sentHeading}
        </h3>
        <p className="mx-auto mt-3 max-w-[420px] text-[14px] leading-[1.7] text-ink-soft">{text.sentBody}</p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry">
            {text.sentRetry}
          </a>
          <button type="button" onClick={() => setSentUrl(null)} className="text-[12px] font-semibold uppercase tracking-[0.05em] text-ink-soft transition-colors hover:text-ink">
            {text.sentEdit}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="text-center">
        <h2 id={titleId} className="font-display text-[26px] font-normal leading-[1.2] text-ink">
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

      <label className="flex flex-col gap-1 rounded-[3px] border border-ink/10 bg-white px-4 py-2.5 transition-colors focus-within:border-ink/40">
        <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{text.messaggio}</span>
        <textarea rows={3} maxLength={1000} value={message} onChange={(e) => setMessage(e.target.value)} className={`${CONTROL_CLASS} resize-y`} />
      </label>

      <button
        type="submit"
        className="mt-1 flex w-full items-center justify-center gap-2.5 rounded-[3px] bg-raspberry px-5 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#8a3844]"
      >
        <WhatsAppIcon />
        {text.invia}
      </button>
      <p className="text-center text-[12px] leading-[1.6] text-ink-soft">
        {text.whatsappNote}
        <br />
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
          <div className="flex justify-center pb-3">
            <Image src="/images/logo/logo agriturismo la mora.png" alt="Agriturismo La Mora" width={1448} height={1086} className="h-auto w-[104px]" />
          </div>
          <RequestForm key={struttura} struttura={struttura} locale={locale} titleId={titleId} />
        </div>
      </div>
    </>
  );
}
