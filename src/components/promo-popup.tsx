"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { useConsent } from "@/lib/consent";
import { getActivePromos, type Promo, type PromoId } from "@/data/promo";
import { ChocolateDrip, CocoaParticles } from "@/components/chocolate-decor";
import choco from "@/components/chocolate-theme.module.css";
import { PhotoCreditLine } from "@/components/photo-credit";
import { EUROCHOCOLATE_2024_PHOTO } from "@/data/photo-credits";
import { BookingModalButton } from "@/components/booking-modal-button";

/* Prefisso delle chiavi di storage del popup (invariato): una chiave per
   ogni promo a tempo, legata al suo id. Elencata in
   src/data/privacy-services.ts. La chiave senza id era del vecchio popup di
   prenotazione diretta, rimosso: non viene più scritta. */
const STORAGE_KEY = "lamora_promo_last_shown";
const COOLDOWN_MS = 2 * 24 * 60 * 60 * 1000; // 2 giorni: non ripresentarlo ad ogni visita
const SHOW_DELAY_MS = 3000;

function promoStorageKey(promo: Promo): string {
  return `${STORAGE_KEY}:${promo.id}`;
}

/* Popup già mostrati in questa sessione di navigazione (stessa scheda, nessun
   ricaricamento): memoria in RAM, nessuno storage. Evita di ripresentarlo
   tornando alla home con una navigazione interna, o quando l'utente dà il
   consenso dopo averlo già visto (prima, senza consenso, non c'era nulla
   che lo ricordasse). */
const shownThisSession = new Set<string>();

/* Testi del popup per ogni promo a tempo (una nuova promo in promo.ts
   richiede i suoi testi qui, il tipo lo impone). Eurochocolate: stesso
   messaggio del box nell'articolo ("Dormi a La Mora con il -10%..."),
   Prenota (modale) e link alle condizioni complete, che stanno
   nell'articolo. */
type PopupText = { label: string; heading: string; dates: string; detail: string; cta: string; book: string };
const POPUP_TEXT: Record<PromoId, Record<Locale, PopupText>> = {
  "eurochocolate-2026": {
    it: {
      label: "Eurochocolate 2026 · Perugia",
      heading: "Dormi a La\u00a0Mora con il -10% durante Eurochocolate",
      dates: "13–22 novembre 2026",
      detail: "L'agriturismo a 23 minuti dal centro di Perugia: 10% di sconto per tutta la durata dell'evento, alle condizioni dell'offerta.",
      cta: "Condizioni dell'offerta",
      book: "Prenota all'Agriturismo La Mora",
    },
    en: {
      label: "Eurochocolate 2026 · Perugia",
      heading: "Stay at La\u00a0Mora with 10% off during Eurochocolate",
      dates: "13–22 November 2026",
      detail: "Our agriturismo 23 minutes from central Perugia: 10% off for the whole event, under the offer's conditions.",
      cta: "Offer conditions",
      book: "Book at Agriturismo La Mora",
    },
    fr: {
      label: "Eurochocolate 2026 · Pérouse",
      heading: "Dormez à La\u00a0Mora avec -10 % pendant Eurochocolate",
      dates: "13–22 novembre 2026",
      detail: "Notre agritourisme à 23 minutes du centre de Pérouse : 10 % de remise pendant tout l'événement, aux conditions de l'offre.",
      cta: "Conditions de l'offre",
      book: "Réserver à l'Agriturismo La Mora",
    },
    de: {
      label: "Eurochocolate 2026 · Perugia",
      heading: "Mit 10 % Rabatt im La\u00a0Mora übernachten, während der Eurochocolate",
      dates: "13.–22. November 2026",
      detail: "Unser Agriturismo 23 Minuten vom Zentrum Perugias: 10 % Rabatt während der gesamten Veranstaltung, zu den Bedingungen des Angebots.",
      cta: "Angebotsbedingungen",
      book: "Im Agriturismo La Mora buchen",
    },
  },
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* Popup della home alla prima visita (o dopo 2 giorni di assenza), SOLO
   mentre c'è una promo a tempo attiva (getActivePromos() in
   src/data/promo.ts; oggi Eurochocolate 2026, fino al 22/11/2026 ora
   italiana): popup a tema cioccolato che porta all'articolo. Senza promo
   attive il componente non rende nulla: scaduta l'ultima promo il popup
   non compare più, e non torna il vecchio popup di prenotazione diretta
   (rimosso: i due sconti diretti restano nel confronto prezzi della home e
   nella pagina Offerte).
   Lo stato della promo si legge nel browser, dopo il mount (il sito è
   statico): il popup compare comunque solo dopo un ritardo, quindi non c'è
   alcun contenuto server da far combaciare.
   Il timestamp in localStorage funge da "memoria" per non ripresentarlo ad
   ogni rientro — ma quel salvataggio è tecnologia "Funzionale" (vedi
   src/data/privacy-services.ts), quindi legge/scrive SOLO se l'utente ha già
   dato quel consenso. Senza consenso il popup può ancora comparire
   (mostrarlo non richiede storage), ma non viene ricordato tra una visita e
   l'altra: nessun dato persiste prima della scelta dell'utente.
   Accessibilità: focus portato sul pulsante di chiusura all'apertura, Tab
   confinato nel dialogo, focus restituito all'elemento di prima alla
   chiusura; chiusura con X, Esc o click sull'overlay. */
export function PromoPopup({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [promo, setPromo] = useState<Promo | null>(null);
  const consent = useConsent();
  const functionalAllowed = consent?.categories.functional === true;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Solo le promo "discount": i pacchetti (Capodanno) non hanno popup.
    const activePromo = getActivePromos(Date.now()).find((p): p is Promo => p.kind === "discount");
    if (!activePromo || shownThisSession.has(activePromo.id)) return;
    const key = promoStorageKey(activePromo);

    let lastShown = 0;
    if (functionalAllowed) {
      try {
        lastShown = Number(window.localStorage.getItem(key)) || 0;
      } catch {
        lastShown = 0;
      }
    }
    if (Date.now() - lastShown < COOLDOWN_MS) return;

    const timer = window.setTimeout(() => {
      shownThisSession.add(activePromo.id);
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setPromo(activePromo);
      setOpen(true);
      if (functionalAllowed) {
        try {
          window.localStorage.setItem(key, String(Date.now()));
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
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previousFocusRef.current?.focus?.();
    };
  }, [open]);

  if (!open || !promo) return null;

  const text = POPUP_TEXT[promo.id][locale];
  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-popup-heading"
    >
      <div onClick={() => setOpen(false)} aria-hidden="true" className="absolute inset-0 bg-[rgba(36,31,23,0.6)]" />
      <div
        ref={dialogRef}
        className={`${choco.root} ${choco.melted} relative my-auto w-full max-w-[400px] rounded-[10px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] sm:max-w-[460px]`}
      >
        <CocoaParticles count={6} />
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t("nav", "chiudi", locale)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-[var(--crema)] transition-colors hover:bg-black/65"
        >
          <CloseIcon />
        </button>

        {/* Foto reale di Eurochocolate (edizione 2024, CC BY-SA): niente
            filigrana, didascalia con l'anno vero e attribuzione completa. */}
        <div className="relative h-[118px] w-full overflow-hidden rounded-t-[10px] sm:h-[170px]">
          <Image
            src={EUROCHOCOLATE_2024_PHOTO.src}
            alt={EUROCHOCOLATE_2024_PHOTO.alt[locale]}
            fill
            sizes="(max-width: 640px) 92vw, 460px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(43,26,16,0) 45%, rgba(43,26,16,.9) 100%)" }}
          />
        </div>
        <p className="px-5 pt-1.5 text-center text-[9.5px] leading-[1.4] text-[var(--crema)]/70 sm:px-9">
          <PhotoCreditLine
            credit={EUROCHOCOLATE_2024_PHOTO.credit}
            locale={locale}
            prefix={EUROCHOCOLATE_2024_PHOTO.caption[locale]}
            linkClassName="underline decoration-[var(--crema)]/40 underline-offset-2 hover:text-[var(--crema)]"
          />
        </p>

        <div className="px-6 pb-2 pt-4 text-center sm:px-9 sm:pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--caramello-chiaro)]">{text.label}</span>
          <h2
            id="promo-popup-heading"
            className="mx-auto mt-3 max-w-[320px] font-display text-[clamp(24px,6vw,30px)] font-normal leading-[1.15] text-[var(--crema)] [text-wrap:balance]"
          >
            {text.heading}
          </h2>
          <p className={`${choco.offerBadge} mt-4`}>-{promo.discountPercent}%</p>
          <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--crema)]">{text.dates}</p>
          <p className="mx-auto mt-3 max-w-[340px] text-[13px] leading-[1.6] text-[var(--crema)]/85">{text.detail}</p>
          <BookingModalButton
            onClick={() => setOpen(false)}
            sheen="strong"
            className={`${choco.caramelCta} mt-6 inline-flex min-h-[46px] items-center gap-2.5 rounded-lg px-7 font-sans text-[11px] font-semibold uppercase tracking-[0.08em]`}
          >
            {text.book}
            <span aria-hidden="true">→</span>
          </BookingModalButton>
          <Link
            href={withLocale(locale, `/blog/${promo.articleSlug}/`)}
            onClick={() => setOpen(false)}
            className="mt-3 block text-[12px] font-semibold text-[var(--caramello-chiaro)] underline decoration-[var(--caramello-chiaro)]/40 underline-offset-4 hover:text-[var(--crema)]"
          >
            {text.cta}
          </Link>
        </div>
        <ChocolateDrip className="!mt-4 rotate-180 rounded-b-[10px] text-[#24150c]" />
      </div>
    </div>
  );
}
