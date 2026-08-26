"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
    document.getElementById("direct-booking-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="promo-popup-heading">
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className="absolute inset-0 bg-ink/60"
      />
      <div className="relative flex w-full max-w-[880px] flex-col overflow-hidden rounded-[6px] bg-cream shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] sm:flex-row">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Chiudi"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-ink shadow-sm transition-colors hover:bg-cream"
        >
          <CloseIcon />
        </button>

        <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-[46%]">
          <Image
            src="/images/piscina/piscina%20vista%20sedie%20e%20piscina.jpg"
            alt="Piscina di Agriturismo La Mora"
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center px-7 py-8 sm:px-10 sm:py-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-raspberry">
            Prenotazione diretta
          </span>
          <h2
            id="promo-popup-heading"
            className="mt-3 font-display text-[clamp(24px,3vw,32px)] font-normal leading-[1.2] text-ink"
          >
            Prenota direttamente: -10% da 7 notti.
          </h2>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-olive-950">
            Per soggiorni di una settimana o più
          </p>
          <p className="mt-4 text-[14px] leading-[1.7] text-ink-soft">
            Chi resta più a lungo scopre La Mora con più calma: la piscina, la colazione lenta, le passeggiate verso
            Assisi. Scrivendoci direttamente, senza intermediari, hai il 10% di sconto sui soggiorni da 7 notti in
            su.
          </p>

          <button
            type="button"
            onClick={goToDirectBooking}
            className="group mt-7 inline-flex w-fit items-center gap-2.5 rounded-[3px] bg-olive-900 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors duration-200 hover:bg-olive-700"
          >
            Scopri la prenotazione diretta
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
