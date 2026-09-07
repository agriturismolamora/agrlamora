"use client";

import { useSyncExternalStore } from "react";

/* Motore di consenso proprietario (nessuna CMP esterna installata: zero
   dipendenze di terze parti nel progetto, vedi package.json). Vive
   interamente lato client: il sito è statico (SSG), quindi non esiste un
   momento server-side in cui leggere il cookie prima di servire la pagina
   — la scelta blocca/sblocca script SOLO dopo l'hydration, esattamente
   come già fa promo-popup.tsx. Nessuno script non necessario viene mai
   iniettato nel markup lato server: vedi newsletter-section.tsx, che
   inietta lo <script> reCAPTCHA solo in un useEffect condizionato dal
   consenso.

   CONSENT_VERSION: da incrementare OGNI VOLTA che cambia la Cookie Policy,
   vengono aggiunte nuove finalità, un nuovo servizio/terza parte rilevante,
   o cambia la struttura delle categorie (vedi src/data/privacy-services.ts).
   Un cookie con versione diversa da questa viene trattato come assente:
   il banner ricompare, come richiesto. */
export const CONSENT_VERSION = "1";
const COOKIE_NAME = "lamora_consent";
const MAX_AGE_DAYS = 180; // 6 mesi

export type ConsentCategories = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentSource = "banner-accept-all" | "banner-reject" | "banner-custom" | "footer-update" | "gpc";

export type ConsentRecord = {
  version: string;
  categories: ConsentCategories;
  timestamp: number;
  via: ConsentSource;
};

export const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

function readRawCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function isValidCategories(value: unknown): value is ConsentCategories {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return v.necessary === true && typeof v.functional === "boolean" && typeof v.analytics === "boolean" && typeof v.marketing === "boolean";
}

/* Un cookie mancante, malformato, o con `version` diversa dalla corrente
   viene trattato come "nessun consenso registrato" — copre insieme sia il
   caso "utente ha cancellato i cookie" sia il caso "la policy è cambiata",
   entrambi richiesti dal punto 5 della specifica. */
export function readConsentCookie(): ConsentRecord | null {
  const raw = readRawCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      parsed.version === CONSENT_VERSION &&
      isValidCategories(parsed.categories) &&
      typeof parsed.timestamp === "number" &&
      typeof parsed.via === "string"
    ) {
      return parsed as ConsentRecord;
    }
    return null;
  } catch {
    return null;
  }
}

function writeRawCookie(record: ConsentRecord) {
  const value = encodeURIComponent(JSON.stringify(record));
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${maxAge}; path=/; SameSite=Lax${secure}`;
}

let currentSnapshot: ConsentRecord | null | undefined;
const listeners = new Set<() => void>();

function ensureInitialized() {
  if (currentSnapshot === undefined) {
    currentSnapshot = readConsentCookie();
  }
}

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribeConsent(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getConsentSnapshot(): ConsentRecord | null {
  ensureInitialized();
  return currentSnapshot ?? null;
}

export function getServerConsentSnapshot(): ConsentRecord | null {
  return null; // il server non conosce mai il consenso: sito statico, nessun momento SSR consapevole del cookie.
}

/* Rimuove ciò che possiamo effettivamente controllare (prima parte). I
   cookie che Google ha già impostato sul PROPRIO dominio (es. _GRECAPTCHA)
   non sono leggibili né cancellabili da document.cookie per via delle
   normali restrizioni same-origin del browser: nessuna API web permette a
   un sito di cancellare i cookie di un altro dominio. La mitigazione reale
   è che, revocando, lo script non viene più ricaricato e nessuna nuova
   richiesta/cookie viene generata — il cookie già presente scadrà secondo
   la politica di Google. Questo limite è dichiarato esplicitamente nella
   Cookie Policy, non nascosto. */
export function clearNonEssentialFirstPartyStorage() {
  try {
    window.localStorage.removeItem("lamora_promo_last_shown");
  } catch {
    // storage non disponibile (es. navigazione privata): nulla da pulire.
  }
  const recaptchaScript = document.querySelector('script[data-recaptcha="true"]');
  recaptchaScript?.remove();
}

export function saveConsent(categories: ConsentCategories, via: ConsentSource) {
  const record: ConsentRecord = { version: CONSENT_VERSION, categories, timestamp: Date.now(), via };
  writeRawCookie(record);
  currentSnapshot = record;
  // Tutti i servizi realmente presenti oggi (reCAPTCHA, timer del popup)
  // ricadono in "functional": revocarla è sufficiente per bloccarli tutti.
  if (!categories.functional) clearNonEssentialFirstPartyStorage();
  notify();
}

export function acceptAll() {
  saveConsent({ necessary: true, functional: true, analytics: true, marketing: true }, "banner-accept-all");
}

export function rejectNonEssential() {
  saveConsent({ necessary: true, functional: false, analytics: false, marketing: false }, "banner-reject");
}

/* Global Privacy Control: segnale del browser che vale come opt-out
   esplicito. Applicato a TUTTI i visitatori, non solo a chi si trova in
   una giurisdizione che lo riconosce legalmente (vedi punto 12: standard
   unico e restrittivo per tutti, mai un doppio standard basato sul
   Paese) — evita anche di dover fare geo-IP lookup, che sarebbe esso
   stesso un trattamento dati aggiuntivo non necessario. */
export function detectGPC(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function applyGPCIfPresent(): boolean {
  if (!detectGPC()) return false;
  saveConsent({ necessary: true, functional: false, analytics: false, marketing: false }, "gpc");
  return true;
}

/** Riflette lo stato di consenso corrente, riaggiornandosi ad ogni scelta
    fatta dal banner, dal pannello preferenze, o dal footer — usato da
    qualunque componente che deve caricare/bloccare qualcosa in base a una
    categoria (es. NewsletterSection per reCAPTCHA). */
export function useConsent(): ConsentRecord | null {
  return useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);
}

/* Evento globale per aprire il pannello preferenze da qualunque punto del
   sito (link "Preferenze cookie" nel footer di ogni pagina) senza dover
   far passare stato/callback attraverso l'albero dei componenti — lo stesso
   pattern leggero già usato altrove nel progetto per componenti globali
   indipendenti dal flusso della pagina. */
export const OPEN_PREFERENCES_EVENT = "lamora-open-cookie-preferences";

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
