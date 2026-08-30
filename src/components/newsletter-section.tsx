"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

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
   lo dice in modo onesto. */
export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "checking" | "error" | "recaptcha-error" | "sent">("idle");

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || document.querySelector("script[data-recaptcha]")) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.dataset.recaptcha = "true";
    document.head.appendChild(script);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!accepted) {
      setStatus("error");
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
          Iscriviti alla newsletter
        </h2>

        {status === "sent" ? (
          <p className="mx-auto mt-8 max-w-[440px] text-[14px] leading-[1.7] text-ink-soft">
            Grazie! Il modulo non è ancora collegato al nostro sistema di invio email — lo attiveremo a breve.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email"
                aria-label="La tua email"
                className="min-w-0 flex-1 rounded-[3px] border border-ink/20 bg-cream px-5 py-4 text-[16px] text-ink outline-none placeholder:text-ink-soft/60 focus:border-raspberry sm:text-[14px]"
              />
              <button
                type="submit"
                disabled={status === "checking"}
                className="group relative inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-lg bg-raspberry px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-cream disabled:opacity-60"
              >
                <HoverFill color="#8a3844" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {status === "checking" ? "Verifica…" : "Iscriviti"}
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
                Accetto i{" "}
                <a href="#" className="underline underline-offset-2 hover:text-raspberry">
                  termini e le condizioni d&apos;uso
                </a>
                *
              </span>
            </label>
            {status === "error" && (
              <p role="alert" className="mt-2 text-[12px] text-raspberry">
                Devi accettare i termini e le condizioni d&apos;uso per iscriverti.
              </p>
            )}
            {status === "recaptcha-error" && (
              <p role="alert" className="mt-2 text-[12px] text-raspberry">
                Verifica antispam non superata. Riprova tra qualche secondo.
              </p>
            )}

            {RECAPTCHA_SITE_KEY ? (
              <p className="mt-4 text-[11px] leading-[1.6] text-ink-soft/70">
                Questo sito è protetto da reCAPTCHA e si applicano le{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Norme sulla privacy
                </a>{" "}
                e i{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Termini di servizio
                </a>{" "}
                di Google.
              </p>
            ) : (
              <p className="mt-4 text-[11px] text-ink-soft/70">Puoi annullare l&apos;iscrizione in qualsiasi momento.</p>
            )}
          </form>
        )}
      </Reveal>
    </section>
  );
}
