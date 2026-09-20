"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useApartmentsSectionActive } from "@/hooks/use-apartments-active";
import type { Locale } from "@/lib/i18n";
import { splitLocaleFromPath } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { openRoomsWidget } from "@/lib/rrp-widget";

const PHONE_TEL = "tel:+390758041164";

const INTL_TAG: Record<Locale, string> = { it: "it-IT", en: "en-GB", fr: "fr-FR", de: "de-DE" };
const WEEKDAYS_BY_LOCALE: Record<Locale, string[]> = {
  it: ["L", "M", "M", "G", "V", "S", "D"],
  en: ["M", "T", "W", "T", "F", "S", "S"],
  fr: ["L", "M", "M", "J", "V", "S", "D"],
  de: ["M", "D", "M", "D", "F", "S", "S"],
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildMonthGrid(month: Date) {
  const first = startOfMonth(month);
  const firstWeekday = (first.getDay() + 6) % 7; // lunedì = 0
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day));
  }
  return cells;
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

/* La barra è fissa sul fondo della viewport: i popover si aprono verso
   l'ALTO (bottom-full), non più verso il basso, altrimenti finirebbero
   fuori schermo. z-[80]: sopra la booking bar (70), sotto lo sticky
   header (100) — non c'è mai sovrapposizione reale con l'header dato che
   la barra vive in fondo allo schermo. */
function PopoverShell({ children }: { children: ReactNode }) {
  return <div className="absolute left-0 bottom-full z-[80] mb-2">{children}</div>;
}

function Calendar({
  selected,
  onSelect,
  minDate,
  className = "",
  locale,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
  minDate?: Date;
  className?: string;
  locale: Locale;
}) {
  const [viewMonth, setViewMonth] = useState(() =>
    startOfMonth(selected ?? minDate ?? new Date())
  );
  const cells = buildMonthGrid(viewMonth);
  const min = minDate ?? startOfToday();
  const monthFormatter = useMemo(() => new Intl.DateTimeFormat(INTL_TAG[locale], { month: "long", year: "numeric" }), [locale]);

  return (
    <div className={`w-72 rounded-[3px] border border-ink/10 bg-cream p-3 shadow-2xl ${className}`}>
      <div className="flex items-center justify-between pb-2">
        <button
          type="button"
          aria-label={t("booking", "mesePrecedente", locale)}
          onClick={() =>
            setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
          }
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-dim hover:text-terracotta"
        >
          ‹
        </button>
        <span className="font-display text-base capitalize text-ink">
          {monthFormatter.format(viewMonth)}
        </span>
        <button
          type="button"
          aria-label={t("booking", "meseSuccessivo", locale)}
          onClick={() =>
            setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))
          }
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-dim hover:text-terracotta"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-ink-soft">
        {WEEKDAYS_BY_LOCALE[locale].map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const disabled = d < min;
          const isSelected = selected ? isSameDay(d, selected) : false;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(d)}
              className={`aspect-square rounded-full text-xs transition-colors ${
                isSelected
                  ? "bg-terracotta-dark text-cream"
                  : disabled
                    ? "cursor-not-allowed text-ink-soft/30"
                    : "text-ink hover:bg-cream-dim"
              }`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const STEP_VERB: Record<Locale, { decrease: string; increase: string }> = {
  it: { decrease: "Diminuisci", increase: "Aumenta" },
  en: { decrease: "Decrease", increase: "Increase" },
  fr: { decrease: "Diminuer", increase: "Augmenter" },
  de: { decrease: "Verringern", increase: "Erhöhen" },
};

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  locale,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  locale: Locale;
}) {
  const verb = STEP_VERB[locale];
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-ink">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`${verb.decrease} ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/20 disabled:hover:text-ink"
        >
          −
        </button>
        <span className="w-4 text-center text-sm text-ink">{value}</span>
        <button
          type="button"
          aria-label={`${verb.increase} ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink/20 disabled:hover:text-ink"
        >
          +
        </button>
      </div>
    </div>
  );
}

function GuestsPopover({
  adults,
  childCount,
  onChangeAdults,
  onChangeChildren,
  onClose,
  locale,
}: {
  adults: number;
  childCount: number;
  onChangeAdults: (v: number) => void;
  onChangeChildren: (v: number) => void;
  onClose: () => void;
  locale: Locale;
}) {
  return (
    <div className="w-64 rounded-[3px] border border-ink/10 bg-cream p-4 shadow-2xl">
      <Stepper label={t("booking", "adulti", locale)} value={adults} min={1} max={10} onChange={onChangeAdults} locale={locale} />
      <Stepper label={t("booking", "bambini", locale)} value={childCount} min={0} max={6} onChange={onChangeChildren} locale={locale} />
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

function FieldButton({
  label,
  value,
  active,
  onClick,
  borderRight = true,
  children,
}: {
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
  borderRight?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`relative min-w-0 ${borderRight ? "border-r border-ink/10" : ""}`}>
      <button
        type="button"
        onClick={onClick}
        aria-expanded={active}
        className={`flex w-full flex-col items-start justify-center gap-1 px-[22px] py-5 text-left transition-colors ${
          active ? "bg-ink/[0.035]" : "hover:bg-ink/[0.02]"
        }`}
      >
        <span className="text-[8px] font-semibold uppercase tracking-[0.05em] text-ink-soft">
          {label}
        </span>
        <span className="truncate font-display text-[16px] font-medium leading-none text-ink">
          {value}
        </span>
      </button>
      {children}
    </div>
  );
}

type PopoverKey = "checkin" | "checkout" | "guests" | null;

function buildGuestsLabel(locale: Locale, adults: number, childCount: number): string {
  const forms: Record<Locale, { adult: [string, string]; child: [string, string] }> = {
    it: { adult: ["adulto", "adulti"], child: ["bambino", "bambini"] },
    en: { adult: ["adult", "adults"], child: ["child", "children"] },
    fr: { adult: ["adulte", "adultes"], child: ["enfant", "enfants"] },
    de: { adult: ["Erwachsener", "Erwachsene"], child: ["Kind", "Kinder"] },
  };
  const f = forms[locale];
  const adultWord = f.adult[adults === 1 ? 0 : 1];
  const base = `${adults} ${adultWord}`;
  if (childCount === 0) return base;
  const childWord = f.child[childCount === 1 ? 0 : 1];
  return `${base}, ${childCount} ${childWord}`;
}

function useBookingState(locale: Locale) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [childCount, setChildCount] = useState(0);

  const guestsLabel = buildGuestsLabel(locale, adults, childCount);

  return {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    adults,
    setAdults,
    childCount,
    setChildCount,
    guestsLabel,
  };
}

/* Widget di prenotazione persistente dell'intera homepage: fixed rispetto
   al viewport, stessa posizione/larghezza dalla hero fino in fondo alla
   pagina — non appartiene più alla sola Hero. Sotto i 768px lascia il
   posto al trigger mobile (VERIFICA DISPONIBILITÀ) + bottom sheet, più
   leggibile su schermi piccoli di quattro campi minuscoli affiancati. */
export function BookingBar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<PopoverKey>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [pulse, setPulse] = useState(false);
  const booking = useBookingState(locale);
  const rootRef = useRef<HTMLDivElement>(null);
  const inApartments = useApartmentsSectionActive();
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(INTL_TAG[locale], { day: "2-digit", month: "short" }), [locale]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Vicino al footer la barra fissa coprirebbe indirizzo/contatti reali del
  // footer stesso: si dissolve con una transizione elegante, senza mai
  // sparire dal DOM (resta raggiungibile da tastiera se il focus è dentro).
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        function onChange() {
          setNearFooter(entry.isIntersecting);
        }
        onChange();
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  // Handoff dal concierge chat ("vai alla prenotazione"): su mobile apre la
  // bottom sheet, su desktop la barra è già sempre visibile, quindi la
  // evidenziamo con un breve pulse invece di duplicare la UI di prenotazione.
  useEffect(() => {
    function onOpenRequest() {
      if (window.innerWidth < 768) {
        setSheetOpen(true);
      } else {
        setPulse(true);
        window.setTimeout(() => setPulse(false), 1200);
      }
    }
    window.addEventListener("la-mora:open-booking", onOpenRequest);
    return () => window.removeEventListener("la-mora:open-booking", onOpenRequest);
  }, []);

  // Villa Relax ha una propria booking bar dedicata (villa-booking-bar.tsx):
  // richiesta esplicita del titolare di non mischiare mai disponibilità o
  // prenotazioni tra Villa Relax e gli appartamenti di Agriturismo La Mora.
  // Cofanetti regalo e Smartbox restano esclusi anche loro: non si prenota
  // un soggiorno diretto in quelle pagine (voucher regalo / redirect esterno).
  const HIDDEN_ON = ["/villa-relax-assisi", "/offerte/cofanetti-regalo", "/offerte/smartbox"];
  const { path: barePath } = splitLocaleFromPath(pathname ?? "/");
  if (HIDDEN_ON.some((p) => barePath.startsWith(p))) return null;

  return (
    // Fixed rispetto al viewport: stessa posizione tra Hero e sezioni
    // successive, non più ancorata alla sola Hero. z-[70]: sopra i contenuti
    // di pagina (0–2), sotto sticky header (100) e pannello MENU (150).
    // pointer-events-none sulla riga piena, riattivati solo sul contenuto
    // (w-max) per non intercettare click nello spazio vuoto ai lati.
    // bottom = 20px + safe-area-inset-bottom: su iPhone con home indicator
    // (safe-area ~34px) un fixed a bottom-5 secco finisce a ridosso della
    // gesture area, sia visivamente che come bersaglio di tap. env() vale 0
    // su device senza notch/home indicator, quindi qui non cambia nulla.
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
      {/* Desktop / tablet. Larghezza a due livelli: più generosa (78vw) alle
          risoluzioni intermedie dove 60vw sarebbe troppo stretta, più
          contenuta (60vw, cap 1080px) da 1280px in su — elegante e compatta
          anche a 1440/1920px, come da riferimento Lasala. */}
      <div
        ref={rootRef}
        className={`hidden w-[min(78vw,1050px)] max-w-full overflow-hidden rounded-[3px] bg-cream shadow-[0_24px_50px_-24px_rgba(28,33,23,0.55)] transition-[box-shadow,transform] duration-300 md:grid xl:w-[min(60vw,1080px)] ${
          pulse ? "scale-[1.015] shadow-[0_0_0_4px_rgba(159,65,79,0.45),0_24px_50px_-24px_rgba(28,33,23,0.55)]" : ""
        }`}
        style={{
          gridTemplateColumns: "1fr 1fr .9fr .95fr 60px",
        }}
      >
        <FieldButton
          label={t("booking", "entrata", locale)}
          value={booking.checkIn ? dateFormatter.format(booking.checkIn) : t("booking", "aggiungiData", locale)}
          active={open === "checkin"}
          onClick={() => setOpen((o) => (o === "checkin" ? null : "checkin"))}
        >
          {open === "checkin" && (
            <PopoverShell>
              <Calendar
                locale={locale}
                selected={booking.checkIn}
                onSelect={(d) => {
                  booking.setCheckIn(d);
                  if (booking.checkOut && booking.checkOut < d) booking.setCheckOut(null);
                  setOpen(null);
                }}
              />
            </PopoverShell>
          )}
        </FieldButton>

        <FieldButton
          label={t("booking", "uscita", locale)}
          value={booking.checkOut ? dateFormatter.format(booking.checkOut) : t("booking", "aggiungiData", locale)}
          active={open === "checkout"}
          onClick={() => setOpen((o) => (o === "checkout" ? null : "checkout"))}
        >
          {open === "checkout" && (
            <PopoverShell>
              <Calendar
                locale={locale}
                selected={booking.checkOut}
                minDate={booking.checkIn ?? undefined}
                onSelect={(d) => {
                  booking.setCheckOut(d);
                  setOpen(null);
                }}
              />
            </PopoverShell>
          )}
        </FieldButton>

        <FieldButton
          label={t("booking", "ospiti", locale)}
          value={booking.guestsLabel}
          active={open === "guests"}
          onClick={() => setOpen((o) => (o === "guests" ? null : "guests"))}
        >
          {open === "guests" && (
            <PopoverShell>
              <GuestsPopover
                locale={locale}
                adults={booking.adults}
                childCount={booking.childCount}
                onChangeAdults={booking.setAdults}
                onChangeChildren={booking.setChildCount}
                onClose={() => setOpen(null)}
              />
            </PopoverShell>
          )}
        </FieldButton>

        {/* Deciso di abbandonare l'idea di un booking engine proprietario:
            bed-and-breakfast.it è ora il motore di prenotazione reale del
            sito. Qui NON usiamo la classe rrp-widget-open-modal (che apre
            il modale coi valori di default): openRoomsWidget riscrive
            prima l'iframe del modale con le date/ospiti scelti sopra,
            così il form reale che si apre riparte da quello che l'utente
            ha già selezionato, invece di ignorarlo (vedi rrp-widget.ts). */}
        <button
          type="button"
          onClick={() => openRoomsWidget({ checkIn: booking.checkIn, checkOut: booking.checkOut, guests: booking.adults + booking.childCount })}
          className={`h-full w-full whitespace-nowrap px-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors duration-500 ${
            inApartments ? "bg-[#141a30] hover:bg-[#1c2440]" : "bg-raspberry hover:bg-[#8a3844]"
          }`}
        >
          {t("booking", "prenotaOra", locale)}
        </button>
        <a
          href={PHONE_TEL}
          aria-label={t("booking", "chiamaAgriturismo", locale)}
          className={`flex h-full w-full items-center justify-center text-cream transition-colors duration-500 ${
            inApartments ? "bg-[#1f2742] hover:bg-[#28305a]" : "bg-raspberry-light hover:bg-[#ad5864]"
          }`}
        >
          <PhoneIcon />
        </a>
      </div>

      {/* Mobile: CTA flottante che apre una bottom sheet con i campi in
          verticale, affiancata da un pulsante di chiamata diretta — prima
          "chiama invece" viveva solo dentro la sheet, un passaggio in più
          per chi vuole solo telefonare al volo dalla barra sticky.
          items-stretch (non items-center) + il pulsante telefono senza
          altezza fissa: in tedesco "Verfügbarkeit prüfen" a 320px va su due
          righe (verificato) — con un'altezza fissa sul pulsante telefono
          quel wrap creava due pulsanti di altezza diversa, affiancati in
          modo visibilmente scombinato. Ora l'altezza del telefono segue
          sempre quella reale del pulsante di testo, qualunque sia la lingua.
          px-5/text-[12.5px]/tracking ridotto: guadagnano lo spazio che basta
          perché il tedesco resti su una riga fin dai 320px. */}
      <div className="flex items-stretch gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="rounded-[3px] bg-raspberry px-5 py-4 font-sans text-[12.5px] font-semibold uppercase tracking-[0.03em] text-cream shadow-[0_18px_36px_-16px_rgba(28,33,23,0.6)] transition-colors hover:bg-[#8a3844]"
        >
          {t("booking", "verificaDisponibilita", locale)}
        </button>
        <a
          href={PHONE_TEL}
          aria-label={t("booking", "chiamaAgriturismo", locale)}
          className="flex w-[52px] shrink-0 items-center justify-center rounded-[3px] bg-raspberry-light text-cream shadow-[0_18px_36px_-16px_rgba(28,33,23,0.6)] transition-colors hover:bg-[#ad5864]"
        >
          <PhoneIcon />
        </a>
      </div>

      <MobileBookingSheet locale={locale} open={sheetOpen} onClose={() => setSheetOpen(false)} booking={booking} dateFormatter={dateFormatter} />
      </div>
    </div>
  );
}

function MobileBookingSheet({
  open,
  onClose,
  booking,
  locale,
  dateFormatter,
}: {
  open: boolean;
  onClose: () => void;
  booking: ReturnType<typeof useBookingState>;
  locale: Locale;
  dateFormatter: Intl.DateTimeFormat;
}) {
  const [section, setSection] = useState<PopoverKey>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[300] md:hidden ${open ? "visible" : "invisible"}`}
      role="dialog"
      aria-modal="true"
      aria-label={t("booking", "verificaDisponibilita", locale)}
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-[rgba(36,31,23,0.5)] transition-opacity duration-250 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[10px] bg-cream p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] transition-transform duration-250 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between pb-4">
          <span className="font-display text-xl text-ink">{t("booking", "verificaDisponibilita", locale)}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("nav", "chiudi", locale)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="divide-y divide-ink/10 rounded-[3px] border border-ink/10">
          <button
            type="button"
            onClick={() => setSection((s) => (s === "checkin" ? null : "checkin"))}
            className="flex w-full flex-col items-start gap-1 px-5 py-4 text-left"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{t("booking", "entrata", locale)}</span>
            <span className="font-display text-[17px] font-medium text-ink">
              {booking.checkIn ? dateFormatter.format(booking.checkIn) : t("booking", "aggiungiData", locale)}
            </span>
          </button>
          {section === "checkin" && (
            <div className="p-4">
              <Calendar
                locale={locale}
                className="w-full shadow-none"
                selected={booking.checkIn}
                onSelect={(d) => {
                  booking.setCheckIn(d);
                  if (booking.checkOut && booking.checkOut < d) booking.setCheckOut(null);
                  setSection(null);
                }}
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => setSection((s) => (s === "checkout" ? null : "checkout"))}
            className="flex w-full flex-col items-start gap-1 px-5 py-4 text-left"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{t("booking", "uscita", locale)}</span>
            <span className="font-display text-[17px] font-medium text-ink">
              {booking.checkOut ? dateFormatter.format(booking.checkOut) : t("booking", "aggiungiData", locale)}
            </span>
          </button>
          {section === "checkout" && (
            <div className="p-4">
              <Calendar
                locale={locale}
                className="w-full shadow-none"
                selected={booking.checkOut}
                minDate={booking.checkIn ?? undefined}
                onSelect={(d) => {
                  booking.setCheckOut(d);
                  setSection(null);
                }}
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => setSection((s) => (s === "guests" ? null : "guests"))}
            className="flex w-full flex-col items-start gap-1 px-5 py-4 text-left"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{t("booking", "ospiti", locale)}</span>
            <span className="font-display text-[17px] font-medium text-ink">{booking.guestsLabel}</span>
          </button>
          {section === "guests" && (
            <div className="p-4">
              <Stepper label={t("booking", "adulti", locale)} value={booking.adults} min={1} max={10} onChange={booking.setAdults} locale={locale} />
              <Stepper
                label={t("booking", "bambini", locale)}
                value={booking.childCount}
                min={0}
                max={6}
                onChange={booking.setChildCount}
                locale={locale}
              />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => openRoomsWidget({ checkIn: booking.checkIn, checkOut: booking.checkOut, guests: booking.adults + booking.childCount })}
          className="mt-5 w-full rounded-[3px] bg-raspberry py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#8a3844]"
        >
          {t("booking", "prenotaOra", locale)}
        </button>
        <a
          href={PHONE_TEL}
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-[3px] border border-ink/15 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-terracotta hover:text-terracotta"
        >
          <PhoneIcon />
          {t("booking", "chiamaInvece", locale)}
        </a>
      </div>
    </div>
  );
}
