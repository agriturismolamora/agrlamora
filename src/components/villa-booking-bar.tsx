"use client";

import { StickyBookingCta } from "@/components/sticky-booking-cta";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { openRoomsWidget } from "@/lib/rrp-widget";

/* Booking bar dedicata SOLO a Villa Relax — richiesta esplicita del
   titolare: non deve mai condividere stato, disponibilità o prenotazioni
   con gli appartamenti di Agriturismo La Mora. La <BookingBar /> globale si
   nasconde da sola su questa route (vedi booking-bar.tsx); questa la
   sostituisce. Solo "PRENOTA VILLA" + WhatsApp, desktop e mobile (niente
   campi Arrivo/Partenza/Ospiti): il CTA apre il modale camere di
   bed-and-breakfast.it con l'account Villa Relax (vedi
   rooms-widget-script.tsx), dove date e ospiti si scelgono direttamente. */
export function VillaBookingBar({ locale }: { locale: Locale }) {
  return (
    <StickyBookingCta
      label={t("booking", "prenotaVilla", locale)}
      whatsappLabel={t("booking", "whatsappVilla", locale)}
      onBook={() => openRoomsWidget()}
    />
  );
}
