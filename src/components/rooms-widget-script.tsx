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

/* L'iframe della modale (la pagina di prenotazione del fornitore) si carica
   solo quando la modale si apre, non a ogni pagina: lo script lo scrive con
   src via document.write e il browser lo scaricava subito, nascosto, con
   circa 20 MB di foto delle camere più gli script di terzi della pagina del
   fornitore (Google Tag Manager, accesso Google/Apple, Facebook), prima di
   qualsiasi clic o consenso. Questo script, eseguito subito prima di quello
   del fornitore, intercetta UNA sola chiamata a document.write (poi rimette
   l'originale) e sposta l'URL in data-rrp-src; openRoomsWidget()
   (lib/rrp-widget.ts) lo copia in src all'apertura. Il resto del markup del
   fornitore non cambia. */
const DEFER_IFRAME = `(function(){var w=document.write;document.write=function(h){document.write=w;return w.call(document,String(h).replace('<iframe src="','<iframe data-rrp-src="'))}})();`;

function widgetSrc(struttura: string, locale: Locale) {
  return `https://www.bed-and-breakfast.it/scripts/widget/widget_frm_camere.cfm?idstruttura=${struttura}&idregione=${REGIONE_ID}&l=${locale}`;
}

/* Sceglie lo script camere corretto (La Mora o Villa Relax) in base alla
   pagina corrente, e lo ricarica se cambia lingua. Tutti i CTA di
   prenotazione del sito sono BookingModalButton (booking-modal-button.tsx),
   che apre la modale di QUALUNQUE script sia attualmente caricato: non
   serve differenziare i trigger, basta che sulla pagina giusta sia montato
   lo script giusto. NB: lo script del fornitore aggancia da solo la classe
   "rrp-widget-open-modal" solo agli elementi presenti al caricamento della
   pagina (verificato leggendone il codice e riprodotto nel browser: dopo
   una navigazione interna quei pulsanti non aprivano nulla), per questo
   BookingModalButton chiama anche openRoomsWidget() direttamente.

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
    <>
      <script key={`defer-${struttura}-${locale}`} dangerouslySetInnerHTML={{ __html: DEFER_IFRAME }} />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script key={`${struttura}-${locale}`} src={widgetSrc(struttura, locale)} />
    </>
  );
}
