"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import { openRoomsWidget } from "@/lib/rrp-widget";

/* Intensità del riflesso (classe .booking-sheen in globals.css) in base
   alla palette del pulsante, per non abbassare mai il contrasto del testo:
   "soft" testo chiaro su fondo lampone/scuro, "strong" testo scuro su
   oro/caramello, "tint" pulsante a contorno su fondo chiaro. */
const SHEEN_CLASS = { soft: "", strong: "booking-sheen-strong", tint: "booking-sheen-tint" } as const;

/* Sfasamento della partenza del riflesso, 0–6,4 s, ricavato da useId():
   uguale su server e client (nessun errore di hydration) e diverso da un
   pulsante all'altro, così quelli visibili insieme non partono insieme. */
function sheenDelay(id: string): string {
  let hash = 0;
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return `${(hash % 65) / 10}s`;
}

/* Pulsante che apre la modale di prenotazione bed-and-breakfast.it, la
   stessa di "Prenota ora". Oltre alla classe rrp-widget-open-modal chiama
   direttamente openRoomsWidget(): lo script del fornitore aggancia il click
   solo agli elementi già presenti al caricamento della pagina, quindi un
   pulsante montato dopo una navigazione interna, senza questa chiamata, non
   aprirebbe nulla. Se invece lo script lo ha agganciato, i due handler fanno
   la stessa cosa (rendono visibile la modale): nessun effetto doppio.
   Tutti i CTA di prenotazione del sito passano da qui, quindi hanno tutti
   lo stesso riflesso animato (.booking-sheen). */
export function BookingModalButton({
  className = "",
  children,
  onClick,
  sheen = "soft",
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  sheen?: keyof typeof SHEEN_CLASS;
}) {
  const id = useId();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.(); // es. chiudere il popup prima di aprire la prenotazione
        openRoomsWidget();
      }}
      className={`rrp-widget-open-modal booking-sheen ${SHEEN_CLASS[sheen]} ${className}`}
      style={{ "--sheen-delay": sheenDelay(id) } as CSSProperties}
    >
      {children}
    </button>
  );
}
