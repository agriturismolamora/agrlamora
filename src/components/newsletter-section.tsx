"use client";

import { useState, type FormEvent } from "react";

/* Modulo iscrizione newsletter: solo UI per ora, nessun servizio di invio
   email collegato (serve un provider tipo Mailchimp/Brevo, con relative
   credenziali del titolare — lavoro futuro, come per le recensioni
   Google). Niente messaggio di finta conferma: lo stato dopo l'invio è
   onesto sul fatto che non è ancora collegato a nulla. */
export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "sent">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!accepted) {
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  return (
    <section aria-labelledby="newsletter-heading" className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-[720px] px-6 text-center sm:px-10">
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
                className="min-w-0 flex-1 rounded-[3px] border border-ink/20 bg-white px-5 py-4 text-[14px] text-ink outline-none placeholder:text-ink-soft/60 focus:border-raspberry"
              />
              <button
                type="submit"
                className="group inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-[3px] bg-raspberry px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors duration-200 hover:bg-[#8a3844]"
              >
                Iscriviti
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
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
                Accetto la{" "}
                <a href="#" className="underline underline-offset-2 hover:text-raspberry">
                  privacy policy
                </a>
                *
              </span>
            </label>
            {status === "error" && (
              <p role="alert" className="mt-2 text-[12px] text-raspberry">
                Devi accettare la privacy policy per iscriverti.
              </p>
            )}

            <p className="mt-4 text-[11px] text-ink-soft/70">Puoi annullare l&apos;iscrizione in qualsiasi momento.</p>
          </form>
        )}
      </div>
    </section>
  );
}
