"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HoverFill } from "@/components/hover-fill";
import { StarRow } from "@/components/review-icons";

const STORAGE_KEY = "lamora_promo_last_shown";
const COOLDOWN_MS = 2 * 24 * 60 * 60 * 1000; // 2 giorni: non ripresentarlo ad ogni visita
const SHOW_DELAY_MS = 3000;

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
   localStorage funge da "memoria" per non ripresentarlo ad ogni rientro. */
export function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastShown = 0;
    try {
      lastShown = Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
    } catch {
      lastShown = 0;
    }
    if (Date.now() - lastShown < COOLDOWN_MS) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {
        // storage non disponibile (es. navigazione privata): il popup
        // ricomparirà ad ogni visita in quel caso, nessun errore bloccante.
      }
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

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
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className="absolute inset-0 bg-ink/60"
      />
      <div className="relative my-auto flex w-full max-w-[920px] flex-col overflow-hidden rounded-[6px] bg-cream shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] sm:flex-row">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Chiudi"
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
            Sito ufficiale
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center px-7 py-9 sm:px-10 sm:py-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-raspberry">
            Prenotazione diretta
          </span>
          <h2
            id="promo-popup-heading"
            className="mt-3 font-display text-[clamp(26px,3.2vw,34px)] font-normal leading-[1.15] text-ink [text-wrap:balance]"
          >
            Resta una settimana, risparmia il 10%.
          </h2>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-olive-950">
            Per soggiorni di 7 notti o più, prenotando diretto
          </p>
          <p className="mt-4 text-[14px] leading-[1.75] text-ink-soft">
            Chi resta più a lungo scopre La Mora con più calma: la piscina, la colazione lenta, le passeggiate verso
            Assisi. Scrivendoci direttamente, senza intermediari, hai il 10% di sconto sui soggiorni da 7 notti in
            su — oltre al vantaggio di parlare con chi la struttura la gestisce ogni giorno.
          </p>

          <div className="mt-5 flex items-center gap-2 border-t border-ink/10 pt-5">
            <StarRow rating={5} size={13} />
            <span className="text-[11px] text-ink-soft">N.1 su 38 agriturismi ad Assisi, secondo TripAdvisor</span>
          </div>

          <button
            type="button"
            onClick={goToDirectBooking}
            className="group relative mt-7 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
          >
            <HoverFill color="#8a3844" />
            <span className="relative z-10 inline-flex items-center gap-2.5">
              Scopri la prenotazione diretta
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
