"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { splitLocaleFromPath } from "@/lib/i18n";

/* Le due strutture hanno account bed-and-breakfast.it separati: mai
   mischiare le camere di uno con i pulsanti dell'altro. idregione è lo
   stesso per entrambi (18 = Umbria). */
const LA_MORA_ID = "60754";
const VILLA_ID = "61792";
const REGIONE_ID = "18";

function widgetSrc(struttura: string, locale: Locale) {
  return `https://www.bed-and-breakfast.it/scripts/widget/widget_frm_camere.cfm?idstruttura=${struttura}&idregione=${REGIONE_ID}&l=${locale}`;
}

/* Sceglie lo script camere corretto (La Mora o Villa Relax) in base alla
   pagina corrente, e lo ricarica se cambia lingua. Qualunque elemento con
   classe "rrp-widget-open-modal" — sparso in tutto il sito, vedi
   booking-bar.tsx, apartments-carousel.tsx, availability-box.tsx,
   price-comparison-section.tsx, villa-booking-bar.tsx — apre la modale di
   QUALUNQUE script sia attualmente caricato: non serve differenziare i
   trigger, basta che sulla pagina giusta sia montato lo script giusto.

   ATTENZIONE alla stabilità di questo componente: lo script del fornitore
   usa document.write() per iniettare markup (verificato caricandolo
   davvero, non per supposizione — vedi il modale già in produzione).
   document.write() chiamato DOPO che la pagina ha finito di caricare
   (cioè quando React rimonta questo script durante una normale
   navigazione client-side, non un caricamento pagina pieno) FA
   IMPLICITAMENTE document.open(), che cancella l'intera pagina — bug
   reale del browser, non teorico. La `key` sotto forza un remount SOLO
   quando cambiano struttura o lingua (mai per la sola navigazione tra
   pagine della stessa struttura, che sono la stragrande maggioranza dei
   click): il resto della sicurezza lo garantiscono i link che
   attraversano il confine La Mora <-> Villa Relax, convertiti in <a>
   pieni (niente Link/navigazione client-side) proprio per evitare che
   questo componente si smonti e rimonti a pagina già caricata — vedi
   site-header.tsx, site-footer.tsx, villa-teaser.tsx,
   villa-relax-page-view.tsx. */
export function RoomsWidgetScript({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { path: barePath } = splitLocaleFromPath(pathname ?? "/");
  const isVilla = barePath.startsWith("/villa-relax-assisi");
  const struttura = isVilla ? VILLA_ID : LA_MORA_ID;

  return (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script key={`${struttura}-${locale}`} src={widgetSrc(struttura, locale)} />
  );
}
