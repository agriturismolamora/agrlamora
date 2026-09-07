"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { useConsent, openCookiePreferences } from "@/lib/consent";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/* Modulo iscrizione newsletter: reCAPTCHA v3 reale (non simulato) quando
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY è configurata — il badge visibile di
   Google viene nascosto via CSS (globals.css) solo perché al suo posto
   mostriamo il testo di attribuzione richiesto dai loro termini d'uso.
   Senza la chiave, nessun claim falso: si vede solo la nota generica.
   L'invio vero dell'email resta comunque non collegato (serve un
   provider tipo Mailchimp/Brevo — lavoro futuro): il messaggio finale
   lo dice in modo onesto.

   Privacy: lo script di reCAPTCHA (terze parti, categoria "Funzionali" —
   vedi src/data/privacy-services.ts) viene iniettato SOLO se l'utente ha
   già dato consenso a quella categoria. Senza consenso, il modulo resta
   utilizzabile ma l'invio è bloccato con un invito esplicito ad aprire le
   preferenze cookie: mai un caricamento "silenzioso" prima della scelta,
   mai un obbligo di accettare marketing per usare il modulo (sono due
   consensi distinti: questo è quello per la sicurezza del form, il
   checkbox sotto è quello, separato e facoltativo, per la newsletter). */
export function NewsletterSection({ locale }: { locale: Locale }) {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "checking" | "error" | "recaptcha-error" | "sent" | "consent-required">("idle");
  const consent = useConsent();
  const functionalAllowed = consent?.categories.functional === true;

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || !functionalAllowed || document.querySelector("script[data-recaptcha]")) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.dataset.recaptcha = "true";
    document.head.appendChild(script);
  }, [functionalAllowed]);

  // Derivato invece di sincronizzato via effetto: appena il consenso
  // Funzionale viene dato, il messaggio "serve il consenso" smette di
  // essere vero senza bisogno di un setState reattivo separato.
  const displayStatus = status === "consent-required" && functionalAllowed ? "idle" : status;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!accepted) {
      setStatus("error");
      return;
    }

    if (RECAPTCHA_SITE_KEY && !functionalAllowed) {
      setStatus("consent-required");
      return;
    }

    if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) {
      setStatus("sent");
      return;
    }

    setStatus("checking");
    try {
      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha!.ready(() => {
          window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: "newsletter" }).then(resolve, reject);
        });
      });
      const res = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "recaptcha-error");
    } catch {
      setStatus("recaptcha-error");
    }
  }

  return (
    <section aria-labelledby="newsletter-heading" className="bg-cream py-20 sm:py-24">
      <Reveal className="mx-auto max-w-[720px] px-6 text-center sm:px-10" as="div">
        <h2
          id="newsletter-heading"
          className="font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink"
        >
          {t("newsletter", "heading", locale)}
        </h2>

        {displayStatus === "sent" ? (
          <p className="mx-auto mt-8 max-w-[440px] text-[14px] leading-[1.7] text-ink-soft">
            {t("newsletter", "grazie", locale)}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter", "emailPlaceholder", locale)}
                aria-label={t("newsletter", "emailPlaceholder", locale)}
                className="min-w-0 flex-1 rounded-[3px] border border-ink/20 bg-cream px-5 py-4 text-[16px] text-ink outline-none placeholder:text-ink-soft/60 focus:border-raspberry sm:text-[14px]"
              />
              <button
                type="submit"
                disabled={displayStatus === "checking"}
                className="group relative inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-lg bg-raspberry px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-cream disabled:opacity-60"
              >
                <HoverFill color="#8a3844" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {displayStatus === "checking" ? t("newsletter", "verifica", locale) : t("newsletter", "iscriviti", locale)}
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>
            </div>

            <label className="mt-5 flex items-start justify-center gap-2.5 text-[13px] leading-[1.5] text-ink-soft">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => {
                  setAccepted(e.target.checked);
                  if (status === "error") setStatus("idle");
                }}
                className="mt-0.5 h-4 w-4 shrink-0 accent-raspberry"
              />
              <span>
                {t("newsletter", "accetto", locale)}
                {" "}
                <a href={withLocale(locale, "/termini-e-condizioni/")} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-raspberry">
                  {{ it: "termini e le condizioni d'uso", en: "terms and conditions", fr: "conditions d'utilisation", de: "Nutzungsbedingungen" }[locale]}
                </a>
                *
              </span>
            </label>
            {displayStatus === "error" && (
              <p role="alert" className="mt-2 text-[12px] text-raspberry">
                {t("newsletter", "erroreTermini", locale)}
              </p>
            )}
            {displayStatus === "recaptcha-error" && (
              <p role="alert" className="mt-2 text-[12px] text-raspberry">
                {t("newsletter", "erroreRecaptcha", locale)}
              </p>
            )}
            {displayStatus === "consent-required" && (
              <p role="alert" className="mt-2 text-[12px] text-raspberry">
                {t("newsletter", "consentRequired", locale)}{" "}
                <button type="button" onClick={openCookiePreferences} className="underline underline-offset-2">
                  {t("newsletter", "openCookiePreferences", locale)}
                </button>
              </p>
            )}

            {RECAPTCHA_SITE_KEY ? (
              <p className="mt-4 text-[11px] leading-[1.6] text-ink-soft/70">
                {{
                  it: <>Questo sito è protetto da reCAPTCHA e si applicano le{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Norme sulla privacy</a>{" "}
                    e i{" "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Termini di servizio</a>{" "}
                    di Google.</>,
                  en: <>This site is protected by reCAPTCHA and the Google{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Privacy Policy</a>{" "}
                    and{" "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Terms of Service</a>{" "}
                    apply.</>,
                  fr: <>Ce site est protégé par reCAPTCHA, et les{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">règles de confidentialité</a>{" "}
                    et{" "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">conditions d&apos;utilisation</a>{" "}
                    de Google s&apos;appliquent.</>,
                  de: <>Diese Seite ist durch reCAPTCHA geschützt, es gelten die{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Datenschutzbestimmungen</a>{" "}
                    und{" "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Nutzungsbedingungen</a>{" "}
                    von Google.</>,
                }[locale]}
              </p>
            ) : (
              <p className="mt-4 text-[11px] text-ink-soft/70">{t("newsletter", "disclaimer", locale)}</p>
            )}
          </form>
        )}
      </Reveal>
    </section>
  );
}
