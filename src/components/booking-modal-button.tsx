"use client";

import type { ReactNode } from "react";
import { openRoomsWidget } from "@/lib/rrp-widget";

/* Pulsante che apre la modale di prenotazione bed-and-breakfast.it, la
   stessa di "Prenota ora". Oltre alla classe rrp-widget-open-modal chiama
   direttamente openRoomsWidget(): lo script del fornitore aggancia il click
   solo agli elementi già presenti al caricamento della pagina, quindi un
   pulsante montato dopo una navigazione interna, senza questa chiamata, non
   aprirebbe nulla. Se invece lo script lo ha agganciato, i due handler fanno
   la stessa cosa (rendono visibile la modale): nessun effetto doppio. */
export function BookingModalButton({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={() => openRoomsWidget()} className={`rrp-widget-open-modal ${className}`}>
      {children}
    </button>
  );
}
