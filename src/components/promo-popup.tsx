"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HoverFill } from "@/components/hover-fill";
import { StarRow } from "@/components/review-icons";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { useConsent } from "@/lib/consent";

const STORAGE_KEY = "lamora_promo_last_shown";
const COOLDOWN_MS = 2 * 24 * 60 * 60 * 1000; // 2 giorni: non ripresentarlo ad ogni visita
const SHOW_DELAY_MS = 3000;

const TEXT: Record<
  Locale,
  {
    badge: string;
    label: string;
    heading: string;
    perks: { stat: string; title: string; detail: string }[];
    tripadvisor: string;
    cta: string;
  }
> = {
  it: {
    badge: "Sito ufficiale",
    label: "Prenotazione diretta",
    heading: "Due modi per risparmiare, prenotando diretto.",
    perks: [
      { stat: "-10%", title: "Da 7 notti", detail: "Per soggiorni di una settimana o più, senza bisogno di codici." },
      { stat: "-10%", title: "Per chi torna", detail: "Dalla seconda prenotazione diretta in poi." },
    ],
    tripadvisor: "N.1 su 38 agriturismi ad Assisi, secondo TripAdvisor",
    cta: "Scopri la prenotazione diretta",
  },
  en: {
    badge: "Official website",
    label: "Direct booking",
    heading: "Two ways to save, booking direct.",
    perks: [
      { stat: "-10%", title: "From 7 nights", detail: "For stays of a week or more, no code needed." },
      { stat: "-10%", title: "For returning guests", detail: "From your second direct booking onwards." },
    ],
    tripadvisor: "#1 out of 38 agriturismi in Assisi, according to TripAdvisor",
    cta: "Discover direct booking",
  },
  fr: {
    badge: "Site officiel",
    label: "Réservation directe",
    heading: "Deux façons d'économiser, en réservant directement.",
    perks: [
      { stat: "-10%", title: "Dès 7 nuits", detail: "Pour les séjours d'une semaine ou plus, sans code." },
      { stat: "-10%", title: "Pour les hôtes qui reviennent", detail: "Dès la deuxième réservation directe." },
    ],
    tripadvisor: "N°1 sur 38 agriturismi à Assise, selon TripAdvisor",
    cta: "Découvrir la réservation directe",
  },
  de: {
    badge: "Offizielle Website",
    label: "Direktbuchung",
    heading: "Zwei Wege zu sparen, bei Direktbuchung.",
    perks: [
      { stat: "-10%", title: "Ab 7 Nächten", detail: "Für Aufenthalte ab einer Woche, ohne Code." },
      { stat: "-10%", title: "Für wiederkehrende Gäste", detail: "Ab der zweiten Direktbuchung." },
    ],
    tripadvisor: "Nr. 1 von 38 Agriturismi in Assisi, laut TripAdvisor",
    cta: "Direktbuchung entdecken",
  },
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* Popup promo alla prima visita (o dopo 2 giorni di assenza): usa SOLO lo
   sconto diretto reale già confermato altrove nel sito (10% da 7 notti),
   mai un finto codice promo o una scadenza inventata. Il timestamp in
   localStorage funge da "memoria" per non ripresentarlo ad ogni rientro —
   ma quel salvataggio è tecnologia "Funzionale" (vedi
   src/data/privacy-services.ts), quindi legge/scrive lamora_promo_last_shown
   SOLO se l'utente ha già dato quel consenso. Senza consenso il popup può
   ancora comparire (mostrarlo non richiede storage), ma non viene
   ricordato tra una visita e l'altra: nessun dato persiste prima della
   scelta dell'utente. */
export function PromoPopup({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const text = TEXT[locale];
  const consent = useConsent();
  const functionalAllowed = consent?.categories.functional === true;

  useEffect(() => {
    let lastShown = 0;
    if (functionalAllowed) {
      try {
        lastShown = Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
      } catch {
        lastShown = 0;
      }
    }
    if (Date.now() - lastShown < COOLDOWN_MS) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      if (functionalAllowed) {
        try {
          window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch {
          // storage non disponibile (es. navigazione privata): il popup
          // ricomparirà ad ogni visita in quel caso, nessun errore bloccante.
        }
      }
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [functionalAllowed]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function goToDirectBooking() {
    setOpen(false);
    document.getElementById("price-comparison-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-popup-heading"
    >
      {/* rgba() letterale invece di bg-ink/60: vedi nota in
          gallery-lightbox.tsx sullo stesso overlay a piena pagina. */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(36,31,23,0.6)]"
      />
      <div className="relative my-auto flex w-full max-w-[920px] flex-col overflow-hidden rounded-[6px] bg-cream shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] sm:flex-row">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t("nav", "chiudi", locale)}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/40 text-cream backdrop-blur-[2px] transition-colors hover:bg-ink/60"
        >
          <CloseIcon />
        </button>

        <div className="relative h-52 w-full shrink-0 sm:h-auto sm:w-[48%]">
          <Image
            src="/images/piscina/piscina agriturismo la mora di notte.jpeg"
            alt="Piscina di Agriturismo La Mora illuminata di sera"
            fill
            sizes="(max-width: 640px) 100vw, 440px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 sm:bg-gradient-to-r sm:from-transparent sm:to-[#1f180e]/10"
            style={{ background: "linear-gradient(0deg, rgba(20,14,7,.45) 0%, rgba(20,14,7,0) 45%)" }}
          />
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-olive-950 shadow-sm">
            {text.badge}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center px-7 py-9 sm:px-10 sm:py-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-raspberry">
            {text.label}
          </span>
          <h2
            id="promo-popup-heading"
            className="mt-3 font-display text-[clamp(26px,3.2vw,34px)] font-normal leading-[1.15] text-ink [text-wrap:balance]"
          >
            {text.heading}
          </h2>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            {text.perks.map((perk) => (
              <div key={perk.title}>
                <dt className="font-display text-[26px] leading-none text-raspberry">{perk.stat}</dt>
                <dd className="mt-1.5">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.04em] text-ink">{perk.title}</span>
                  <span className="mt-1 block text-[12px] leading-[1.5] text-ink-soft">{perk.detail}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex items-center gap-2 border-t border-ink/10 pt-5">
            <StarRow rating={5} size={13} locale={locale} />
            <span className="text-[11px] text-ink-soft">{text.tripadvisor}</span>
          </div>

          <button
            type="button"
            onClick={goToDirectBooking}
            className="group relative mt-7 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
          >
            <HoverFill color="#8a3844" />
            <span className="relative z-10 inline-flex items-center gap-2.5">
              {text.cta}
              <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
