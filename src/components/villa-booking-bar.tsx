"use client";

import { useEffect, useRef, useState } from "react";
import { VILLA_MAX_GUESTS } from "@/data/villa";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { openRoomsWidget } from "@/lib/rrp-widget";

/* input[type=date] restituisce sempre "YYYY-MM-DD" (formato HTML, non
   quello italiano): va parsato a mano prima di passarlo a openRoomsWidget,
   che si aspetta un vero Date. new Date("YYYY-MM-DD") lo interpreterebbe
   come UTC mezzanotte, con rischio di finire sul giorno prima/dopo a
   seconda del fuso orario del visitatore — costruiamo il Date con
   anno/mese/giorno espliciti (locale, mezzanotte locale) per evitarlo. */
function parseDateInputValue(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  return new Date(Number(y), Number(m) - 1, Number(d));
}

const PHONE_TEL = "tel:+390758041164";

function guestWord(locale: Locale, guests: number) {
  return t("booking", guests === 1 ? "ospitiSuffix" : "ospitiSuffixPlural", locale);
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1L6.6 10.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
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

function useVillaBookingState() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  return { checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests };
}

function GuestsStepper({
  guests,
  onChange,
  onClose,
  locale,
}: {
  guests: number;
  onChange: (v: number) => void;
  onClose: () => void;
  locale: Locale;
}) {
  return (
    <div className="w-60 rounded-[3px] border border-ink/10 bg-cream p-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink">{t("booking", "ospiti", locale)}</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={`- ${t("booking", "ospiti", locale)}`}
            disabled={guests <= 1}
            onClick={() => onChange(Math.max(1, guests - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-raspberry hover:text-raspberry disabled:cursor-not-allowed disabled:opacity-30"
          >
            −
          </button>
          <span className="w-4 text-center text-sm text-ink">{guests}</span>
          <button
            type="button"
            aria-label={`+ ${t("booking", "ospiti", locale)}`}
            disabled={guests >= VILLA_MAX_GUESTS}
            onClick={() => onChange(Math.min(VILLA_MAX_GUESTS, guests + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-raspberry hover:text-raspberry disabled:cursor-not-allowed disabled:opacity-30"
          >
            +
          </button>
        </div>
      </div>
      <p className="mt-2 text-[11px] leading-[1.5] text-ink-soft">
        {locale === "it" && `Fino a ${VILLA_MAX_GUESTS} ospiti, l'intera villa.`}
        {locale === "en" && `Up to ${VILLA_MAX_GUESTS} guests, the whole villa.`}
        {locale === "fr" && `Jusqu'à ${VILLA_MAX_GUESTS} personnes, toute la villa.`}
        {locale === "de" && `Bis zu ${VILLA_MAX_GUESTS} Gästen, die ganze Villa.`}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-3 w-full rounded-[3px] bg-olive-900 py-2 text-sm font-medium text-cream transition-colors hover:bg-olive-700"
      >
        {t("booking", "fatto", locale)}
      </button>
    </div>
  );
}

/* Booking bar dedicata SOLO a Villa Relax — richiesta esplicita del
   titolare: non deve mai condividere stato, disponibilità o prenotazioni
   con gli appartamenti di Agriturismo La Mora. La <BookingBar /> globale si
   nasconde da sola su questa route (vedi booking-bar.tsx); questa la
   sostituisce, stesso linguaggio visivo del resto del sito ma dati e CTA
   completamente separati. Il CTA apre il modale camere di
   bed-and-breakfast.it (account Villa Relax, vedi rooms-widget-script.tsx)
   con le date/ospiti scelti qui sopra già preselezionati nel form reale
   (openRoomsWidget, vedi rrp-widget.ts) invece di aprirlo vuoto. */
export function VillaBookingBar({ locale }: { locale: Locale }) {
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const booking = useVillaBookingState();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setGuestsOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setGuestsOpen(false);
    }
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Stessa dissolvenza della BookingBar globale (vedi booking-bar.tsx): senza
  // questa, la barra fixed restava sempre opaca e copriva permanentemente
  // P.IVA/copyright nell'ultimo tratto del footer — bug reale osservato in
  // fondo a questa pagina, mai portato qui quando fu creata la barra dedicata.
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!sheetOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[70] flex justify-center px-4 transition-all duration-500 ease-out sm:px-6"
      style={{
        bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
        ...(nearFooter
          ? { opacity: 0, transform: "translateY(16px)" }
          : { opacity: 1, transform: "translateY(0)" }),
      }}
    >
      <div className={`w-max max-w-full ${nearFooter ? "pointer-events-none" : "pointer-events-auto"}`}>
        {/* Desktop / tablet */}
        <div
          ref={rootRef}
          className="hidden w-[min(84vw,980px)] max-w-full overflow-hidden rounded-[3px] bg-cream shadow-[0_24px_50px_-24px_rgba(28,33,23,0.55)] md:grid"
          style={{ gridTemplateColumns: "auto 1fr 1fr .9fr 1fr 60px" }}
        >
          <div className="flex items-center border-r border-ink/10 bg-olive-950 px-5 text-cream">
            <div className="flex flex-col leading-tight">
              <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-cream/60">{t("nav", "villaIndipendente", locale)}</span>
              <span className="font-display text-[15px]">Villa Relax</span>
            </div>
          </div>

          <label className="relative flex min-w-0 flex-col items-start justify-center gap-1 border-r border-ink/10 px-[22px] py-5 text-left">
            <span className="text-[8px] font-semibold uppercase tracking-[0.05em] text-ink-soft">{t("booking", "arrivo", locale)}</span>
            <input
              type="date"
              value={booking.checkIn}
              onChange={(e) => booking.setCheckIn(e.target.value)}
              className="w-full bg-transparent font-display text-[16px] font-medium leading-none text-ink outline-none [color-scheme:light]"
            />
          </label>

          <label className="relative flex min-w-0 flex-col items-start justify-center gap-1 border-r border-ink/10 px-[22px] py-5 text-left">
            <span className="text-[8px] font-semibold uppercase tracking-[0.05em] text-ink-soft">{t("booking", "partenza", locale)}</span>
            <input
              type="date"
              value={booking.checkOut}
              min={booking.checkIn || undefined}
              onChange={(e) => booking.setCheckOut(e.target.value)}
              className="w-full bg-transparent font-display text-[16px] font-medium leading-none text-ink outline-none [color-scheme:light]"
            />
          </label>

          <div className="relative min-w-0 border-r border-ink/10">
            <button
              type="button"
              onClick={() => setGuestsOpen((v) => !v)}
              aria-expanded={guestsOpen}
              className={`flex w-full flex-col items-start justify-center gap-1 px-[22px] py-5 text-left transition-colors ${
                guestsOpen ? "bg-ink/[0.035]" : "hover:bg-ink/[0.02]"
              }`}
            >
              <span className="text-[8px] font-semibold uppercase tracking-[0.05em] text-ink-soft">{t("booking", "ospiti", locale)}</span>
              <span className="truncate font-display text-[16px] font-medium leading-none text-ink">
                {booking.guests} {guestWord(locale, booking.guests)}
              </span>
            </button>
            {guestsOpen && (
              <div className="absolute bottom-full left-0 z-[80] mb-2">
                <GuestsStepper guests={booking.guests} onChange={booking.setGuests} onClose={() => setGuestsOpen(false)} locale={locale} />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              openRoomsWidget({
                checkIn: parseDateInputValue(booking.checkIn),
                checkOut: parseDateInputValue(booking.checkOut),
                guests: booking.guests,
              })
            }
            className="flex h-full w-full items-center justify-center whitespace-nowrap bg-raspberry px-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#8a3844]"
          >
            {t("booking", "prenotaVilla", locale)}
          </button>
          <a
            href={PHONE_TEL}
            aria-label={t("booking", "chiamaVilla", locale)}
            className="flex h-full w-full items-center justify-center bg-raspberry-light text-cream transition-colors hover:bg-[#ad5864]"
          >
            <PhoneIcon />
          </a>
        </div>

        {/* Mobile */}
        <div className="flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="rounded-[3px] bg-raspberry px-7 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-cream shadow-[0_18px_36px_-16px_rgba(28,33,23,0.6)] transition-colors hover:bg-[#8a3844]"
          >
            {t("booking", "verificaDisponibilitaVilla", locale)}
          </button>
        </div>

        <div
          className={`fixed inset-0 z-[300] md:hidden ${sheetOpen ? "visible" : "invisible"}`}
          role="dialog"
          aria-modal="true"
          aria-label={t("booking", "verificaDisponibilitaVilla", locale)}
        >
          <div
            onClick={() => setSheetOpen(false)}
            aria-hidden="true"
            className={`absolute inset-0 bg-[rgba(36,31,23,0.5)] transition-opacity duration-250 ${sheetOpen ? "opacity-100" : "opacity-0"}`}
          />
          <div
            className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[10px] bg-cream p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] transition-transform duration-250 ease-out ${
              sheetOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex items-center justify-between pb-4">
              <span className="font-display text-xl text-ink">Villa Relax</span>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label={t("nav", "chiudi", locale)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="space-y-3">
              <label className="flex flex-col gap-1 rounded-[3px] border border-ink/10 px-5 py-3">
                <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{t("booking", "arrivo", locale)}</span>
                <input
                  type="date"
                  value={booking.checkIn}
                  onChange={(e) => booking.setCheckIn(e.target.value)}
                  className="bg-transparent font-display text-[17px] font-medium text-ink outline-none [color-scheme:light]"
                />
              </label>
              <label className="flex flex-col gap-1 rounded-[3px] border border-ink/10 px-5 py-3">
                <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{t("booking", "partenza", locale)}</span>
                <input
                  type="date"
                  value={booking.checkOut}
                  min={booking.checkIn || undefined}
                  onChange={(e) => booking.setCheckOut(e.target.value)}
                  className="bg-transparent font-display text-[17px] font-medium text-ink outline-none [color-scheme:light]"
                />
              </label>
              <div className="rounded-[3px] border border-ink/10 px-5 py-3">
                <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{t("booking", "ospiti", locale)}</span>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-display text-[17px] font-medium text-ink">
                    {booking.guests} {guestWord(locale, booking.guests)}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`- ${t("booking", "ospiti", locale)}`}
                      disabled={booking.guests <= 1}
                      onClick={() => booking.setGuests(Math.max(1, booking.guests - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink disabled:opacity-30"
                    >
                      −
                    </button>
                    <button
                      type="button"
                      aria-label={`+ ${t("booking", "ospiti", locale)}`}
                      disabled={booking.guests >= VILLA_MAX_GUESTS}
                      onClick={() => booking.setGuests(Math.min(VILLA_MAX_GUESTS, booking.guests + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                openRoomsWidget({
                  checkIn: parseDateInputValue(booking.checkIn),
                  checkOut: parseDateInputValue(booking.checkOut),
                  guests: booking.guests,
                })
              }
              className="mt-5 flex w-full items-center justify-center rounded-[3px] bg-raspberry py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#8a3844]"
            >
              {t("booking", "prenotaVilla", locale)} Relax
            </button>
            <a
              href={PHONE_TEL}
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-[3px] border border-ink/15 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-raspberry hover:text-raspberry"
            >
              <PhoneIcon />
              {t("booking", "chiamaInvece", locale)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
