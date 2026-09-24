"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { StickyBookingCta } from "@/components/sticky-booking-cta";
import { useApartmentsSectionActive } from "@/hooks/use-apartments-active";
import type { Locale } from "@/lib/i18n";
import { splitLocaleFromPath } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { openRoomsWidget } from "@/lib/rrp-widget";

/* Barra di prenotazione persistente di Agriturismo La Mora (tutte le
   pagine tranne Villa Relax, cofanetti e Smartbox). Solo "PRENOTA ORA" +
   WhatsApp, desktop e mobile (richiesta esplicita del titolare: niente più
   campi Entrata/Uscita/Ospiti né bottom sheet mobile). Il CTA apre il
   modale di bed-and-breakfast.it, il motore di prenotazione reale del
   sito, dove date e ospiti si scelgono direttamente. */
export function BookingBar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const inApartments = useApartmentsSectionActive();

  // Handoff dal concierge chat ("vai alla prenotazione"): apre direttamente
  // il modale di prenotazione, ora che la barra non ha più campi propri.
  useEffect(() => {
    function onOpenRequest() {
      openRoomsWidget();
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
    <StickyBookingCta
      label={t("booking", "prenotaOra", locale)}
      whatsappLabel={t("booking", "whatsappAgriturismo", locale)}
      onBook={() => openRoomsWidget()}
      night={inApartments}
    />
  );
}
