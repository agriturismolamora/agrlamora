"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { APARTMENTS } from "@/data/apartments";
import { getVillaConfigurations, VILLA_MAX_GUESTS } from "@/data/villa";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";

const WHATSAPP_NUMBER = "393934363917";
const INTL_TAG: Record<Locale, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR", de: "de-DE" };
/* Capienza massima di una richiesta: somma reale dei 5 appartamenti per
   La Mora, capienza della villa intera per Villa Relax. */
const LAMORA_MAX_GUESTS = APARTMENTS.reduce((sum, apt) => sum + apt.maxGuests, 0);
const CHILD_MAX_AGE = 17;

type Text = {
  label: string;
  heading: string;
  body: string;
  alloggi: string;
  preferenza: string;
  nessunaPreferenza: string;
  etaBambino: (n: number) => string;
  animali: string;
  nome: string;
  email: string;
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
  msgYes: string;
};

const TEXT: Record<Locale, Text> = {
  it: {
    label: "Scrivici",
    heading: "Hai una domanda? Mandaci una richiesta.",
    body: "Ti rispondiamo noi direttamente, senza intermediari: date, ospiti e un messaggio, ci pensiamo noi al resto.",
    alloggi: "Appartamenti",
    preferenza: "Preferenza alloggio",
    nessunaPreferenza: "Nessuna preferenza",
    etaBambino: (n) => `Età bambino ${n}`,
    animali: "Viaggio con animali",
    nome: "Nome e cognome",
    email: "Email (facoltativa)",
    messaggio: "Messaggio",
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
    msgYes: "sì",
  },
  en: {
    label: "Write to us",
    heading: "Have a question? Send us a request.",
    body: "We answer you directly, no middlemen: dates, guests and a message — we'll take care of the rest.",
    alloggi: "Apartments",
    preferenza: "Preferred accommodation",
    nessunaPreferenza: "No preference",
    etaBambino: (n) => `Age of child ${n}`,
    animali: "Travelling with pets",
    nome: "Full name",
    email: "Email (optional)",
    messaggio: "Message",
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
    msgYes: "yes",
  },
  fr: {
    label: "Écrivez-nous",
    heading: "Une question ? Envoyez-nous une demande.",
    body: "Nous vous répondons directement, sans intermédiaire : dates, voyageurs et un message, on s'occupe du reste.",
    alloggi: "Appartements",
    preferenza: "Logement préféré",
    nessunaPreferenza: "Pas de préférence",
    etaBambino: (n) => `Âge enfant ${n}`,
    animali: "Je voyage avec des animaux",
    nome: "Nom et prénom",
    email: "E-mail (facultatif)",
    messaggio: "Message",
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
    msgYes: "oui",
  },
  de: {
    label: "Schreiben Sie uns",
    heading: "Eine Frage? Senden Sie uns eine Anfrage.",
    body: "Wir antworten Ihnen direkt, ohne Vermittler: Daten, Gäste und eine Nachricht — um den Rest kümmern wir uns.",
    alloggi: "Apartments",
    preferenza: "Bevorzugte Unterkunft",
    nessunaPreferenza: "Keine Präferenz",
    etaBambino: (n) => `Alter Kind ${n}`,
    animali: "Ich reise mit Haustieren",
    nome: "Vor- und Nachname",
    email: "E-Mail (optional)",
    messaggio: "Nachricht",
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
    msgYes: "ja",
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
      className={`flex flex-col gap-1 rounded-[3px] border border-ink/10 bg-white px-4 py-3 transition-colors focus-within:border-ink/40 ${className ?? ""}`}
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

const CONTROL_CLASS = "w-full bg-transparent text-[15px] text-ink outline-none [color-scheme:light]";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.86 9.86 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.02.1-3.31-.75-2.79-1.04-4.59-3.9-4.73-4.08-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.3.24-.26.55-.33.73-.33h.53c.17 0 .4-.03.62.48.24.55.8 1.91.87 2.05.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

/* Modulo di richiesta nostro, al posto del widget richieste di
   bed-and-breakfast.it che stava qui (iframe cross-origin, interfaccia non
   stilabile). Stessi dati che raccoglieva quel modulo — date, numero di
   alloggi, adulti, bambini con età, animali, preferenza alloggio, nome,
   email, note — ma l'invio avviene su WhatsApp (scelta del titolare):
   nessun server nostro, nessun servizio email esterno, nessun dato
   salvato dal sito. Il messaggio si apre già compilato nella chat
   dell'agriturismo e parte solo quando l'ospite preme Invia — per questo,
   dopo l'apertura, resta visibile un link per riaprirlo se il browser l'ha
   bloccato. Trattamento già coperto dall'informativa privacy ("richieste
   via WhatsApp o email", gestite a mano da chi risponde). */
export function RichiesteSection({ struttura, locale }: { struttura: "lamora" | "villa"; locale: Locale }) {
  const text = TEXT[locale];
  const isVilla = struttura === "villa";
  const maxGuests = isVilla ? VILLA_MAX_GUESTS : LAMORA_MAX_GUESTS;
  const preferenceOptions = isVilla ? getVillaConfigurations(locale).map((c) => c.name) : APARTMENTS.map((a) => a.name);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [alloggi, setAlloggi] = useState(1);
  const [adults, setAdults] = useState(2);
  const [childAges, setChildAges] = useState<string[]>([]);
  const [preference, setPreference] = useState("");
  const [pets, setPets] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      `${text.nome}: ${name.trim()}`,
      `${t("booking", "arrivo", locale)}: ${dateFormatter.format(parseInputDate(checkIn))}`,
      `${t("booking", "partenza", locale)}: ${dateFormatter.format(parseInputDate(checkOut))} (${text.msgNights(nights)})`,
      `${t("booking", "adulti", locale)}: ${adults}`,
    ];
    if (childAges.length > 0) {
      lines.push(`${t("booking", "bambini", locale)}: ${childAges.length} (${childAges.map((age) => (age === "0" ? "<1" : age)).join(", ")})`);
    }
    if (!isVilla && alloggi > 1) lines.push(`${text.alloggi}: ${alloggi}`);
    if (preference) lines.push(`${text.preferenza}: ${preference}`);
    if (pets) lines.push(`${text.animali}: ${text.msgYes}`);
    // Etichetta del campo senza "(facoltativa)": "Email", "E-mail", "E-Mail".
    if (email.trim()) lines.push(`${text.email.replace(/\s*\(.*\)$/, "")}: ${email.trim()}`);
    if (message.trim()) lines.push("", message.trim());
    return lines.join("\n");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  }

  return (
    <section id="section-richiesta" className="bg-cream-dim py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-6 sm:px-10">
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.label}</span>
          <h2 className="mx-auto mt-5 max-w-[520px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
            {text.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-[440px] text-[14px] leading-[1.7] text-ink-soft">{text.body}</p>
        </div>
        <div className="mt-10 rounded-[8px] border border-ink/10 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(28,33,23,0.35)] sm:p-8">
          {sentUrl ? (
            <div role="status" className="py-6 text-center">
              <h3 className="font-display text-[24px] font-normal leading-[1.25] text-ink">{text.sentHeading}</h3>
              <p className="mx-auto mt-3 max-w-[420px] text-[14px] leading-[1.7] text-ink-soft">{text.sentBody}</p>
              <div className="mt-6 flex flex-col items-center gap-3">
                <a
                  href={sentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry"
                >
                  {text.sentRetry}
                </a>
                <button
                  type="button"
                  onClick={() => setSentUrl(null)}
                  className="text-[12px] font-semibold uppercase tracking-[0.05em] text-ink-soft transition-colors hover:text-ink"
                >
                  {text.sentEdit}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Date in colonna su mobile: affiancate, a 390px il formato
                  "gg/mm/aaaa" di Chrome Android veniva troncato. */}
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={t("booking", "arrivo", locale)}>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    min={today || undefined}
                    onChange={(e) => updateCheckIn(e.target.value)}
                    className={CONTROL_CLASS}
                  />
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

              <div className={`grid gap-3 ${isVilla ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
                <Field label={t("booking", "adulti", locale)}>
                  <select value={adults} onChange={(e) => updateAdults(Number(e.target.value))} className={CONTROL_CLASS}>
                    {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t("booking", "bambini", locale)}>
                  <select value={childAges.length} onChange={(e) => updateChildCount(Number(e.target.value))} className={CONTROL_CLASS}>
                    {Array.from({ length: maxGuests - adults + 1 }, (_, i) => i).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
                {!isVilla && (
                  <Field label={text.alloggi} className="col-span-2 sm:col-span-1">
                    <select value={alloggi} onChange={(e) => setAlloggi(Number(e.target.value))} className={CONTROL_CLASS}>
                      {APARTMENTS.map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </Field>
                )}
              </div>

              {childAges.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {childAges.map((age, i) => (
                    <Field key={i} label={text.etaBambino(i + 1)}>
                      <select
                        required
                        value={age}
                        onChange={(e) => setChildAges((ages) => ages.map((a, j) => (j === i ? e.target.value : a)))}
                        className={CONTROL_CLASS}
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
                    </Field>
                  ))}
                </div>
              )}

              <Field label={text.preferenza}>
                <select value={preference} onChange={(e) => setPreference(e.target.value)} className={CONTROL_CLASS}>
                  <option value="">{text.nessunaPreferenza}</option>
                  {preferenceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <label className="flex items-center gap-2.5 px-1 py-1 text-[14px] text-ink">
                <input
                  type="checkbox"
                  checked={pets}
                  onChange={(e) => setPets(e.target.checked)}
                  className="h-4 w-4 accent-raspberry"
                />
                {text.animali}
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={text.nome}>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={CONTROL_CLASS}
                  />
                </Field>
                <Field label={text.email}>
                  <input
                    type="email"
                    autoComplete="email"
                    maxLength={120}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={CONTROL_CLASS}
                  />
                </Field>
              </div>

              <Field label={text.messaggio}>
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${CONTROL_CLASS} resize-y`}
                />
              </Field>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-[3px] bg-raspberry px-5 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#8a3844]"
              >
                <WhatsAppIcon />
                {text.invia}
              </button>
              <p className="text-center text-[12px] leading-[1.6] text-ink-soft">
                {text.whatsappNote}
                <br />
                {text.privacyPrefix}{" "}
                {isVilla ? (
                  <a href={withLocale(locale, "/privacy/")} className="underline decoration-ink-soft/40 underline-offset-4 hover:text-ink">
                    {text.privacyLink}
                  </a>
                ) : (
                  <Link href={withLocale(locale, "/privacy/")} className="underline decoration-ink-soft/40 underline-offset-4 hover:text-ink">
                    {text.privacyLink}
                  </Link>
                )}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
