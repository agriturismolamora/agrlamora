"use client";

import { useEffect, useState } from "react";
import { CookieBanner } from "@/components/cookie-banner";
import { CookiePreferencesModal } from "@/components/cookie-preferences-modal";
import {
  useConsent,
  acceptAll,
  rejectNonEssential,
  saveConsent,
  applyGPCIfPresent,
  detectGPC,
  DEFAULT_CATEGORIES,
  OPEN_PREFERENCES_EVENT,
  type ConsentCategories,
} from "@/lib/consent";
import type { Locale } from "@/lib/i18n";

/* Orchestratore montato una sola volta in RootShell (come PromoPopup /
   ConciergeChat): decide se mostrare il banner di primo livello, espone il
   pannello "Personalizza" sia dal banner sia dal link "Preferenze cookie"
   nel footer (via evento globale, vedi lib/consent.ts), e collega le
   azioni dell'utente al motore di consenso reale.

   GPC (Global Privacy Control): l'unico effetto collaterale reale è
   applyGPCIfPresent() — se il browser invia il segnale e non esiste ancora
   un consenso salvato, scrive subito la scelta restrittiva. Non serve
   nessuno stato locale per "ricordarsi" di averlo fatto: saveConsent()
   notifica da sé i sottoscrittori di useConsent() (vedi lib/consent.ts),
   che si riaggiornano automaticamente con il nuovo valore — la nota GPC
   mostrata nel pannello è quindi calcolata a ogni render, non sincronizzata
   via setState in un effetto. */
export function CookieConsentManager({ locale }: { locale: Locale }) {
  const consent = useConsent();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<"banner" | "footer">("banner");

  useEffect(() => {
    if (consent === null) applyGPCIfPresent();
    // Intenzionale: solo al primo mount, per decidere una sola volta se
    // applicare GPC prima che compaia il banner.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onOpen() {
      setModalSource("footer");
      setModalOpen(true);
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen);
  }, []);

  const showBanner = consent === null && !modalOpen;
  const currentCategories: ConsentCategories = consent?.categories ?? DEFAULT_CATEGORIES;
  const customVia = modalSource === "footer" ? "footer-update" : "banner-custom";
  const gpcHonoured = consent?.via === "gpc" || detectGPC();

  return (
    <>
      {showBanner && (
        <CookieBanner
          locale={locale}
          onAcceptAll={acceptAll}
          onRejectNonEssential={rejectNonEssential}
          onCustomize={() => {
            setModalSource("banner");
            setModalOpen(true);
          }}
        />
      )}
      <CookiePreferencesModal
        key={String(modalOpen)}
        locale={locale}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCategories={currentCategories}
        showGpcNotice={gpcHonoured}
        onSave={(categories) => {
          saveConsent(categories, customVia);
          setModalOpen(false);
        }}
        onAcceptAll={() => {
          saveConsent({ necessary: true, functional: true, analytics: true, marketing: true }, customVia);
          setModalOpen(false);
        }}
        onRejectAll={() => {
          saveConsent({ necessary: true, functional: false, analytics: false, marketing: false }, customVia);
          setModalOpen(false);
        }}
      />
    </>
  );
}
