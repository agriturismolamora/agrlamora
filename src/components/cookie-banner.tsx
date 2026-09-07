"use client";

import Link from "next/link";
import { CONSENT_TEXT } from "@/data/consent-text";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

/* Banner di primo livello: barra in fondo alla pagina, MAI un overlay a
   piena pagina che blocchi la lettura del contenuto sottostante (nessun
   "cookie wall") — l'utente può continuare a leggere mentre decide.
   I tre pulsanti condividono ESATTAMENTE lo stesso stile (bordo, peso,
   dimensione): nessuno dei tre è reso visivamente più invitante degli
   altri, come richiesto esplicitamente ("pari dignità visiva"). */
export function CookieBanner({
  locale,
  onAcceptAll,
  onRejectNonEssential,
  onCustomize,
}: {
  locale: Locale;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onCustomize: () => void;
}) {
  const text = CONSENT_TEXT[locale].banner;
  const buttonClass =
    "flex-1 rounded-[4px] border border-ink/25 bg-cream px-5 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-ink/50 hover:bg-ink/5 sm:flex-none";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-heading"
      className="fixed inset-x-0 bottom-0 z-[280] flex justify-center px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="w-full max-w-[860px] rounded-[8px] border border-ink/10 bg-cream px-6 py-6 shadow-[0_-10px_50px_-15px_rgba(0,0,0,0.35)] sm:px-8">
        <h2 id="cookie-banner-heading" className="font-display text-[19px] font-normal text-ink">
          {text.heading}
        </h2>
        <p className="mt-2.5 text-[13px] leading-[1.65] text-ink-soft">
          {text.body}{" "}
          <Link href={withLocale(locale, "/privacy/")} className="underline underline-offset-2 hover:text-raspberry">
            {text.privacyLink}
          </Link>{" "}
          ·{" "}
          <Link href={withLocale(locale, "/cookie-policy/")} className="underline underline-offset-2 hover:text-raspberry">
            {text.cookieLink}
          </Link>
        </p>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <button type="button" onClick={onAcceptAll} className={buttonClass}>
            {text.acceptAll}
          </button>
          <button type="button" onClick={onRejectNonEssential} className={buttonClass}>
            {text.rejectNonEssential}
          </button>
          <button type="button" onClick={onCustomize} className={buttonClass}>
            {text.customize}
          </button>
        </div>
      </div>
    </div>
  );
}
