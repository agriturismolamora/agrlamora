/* Script Octorate (Octobook) richiesto dal titolare per il collegamento
   Octorate/Trivago: presente su ogni pagina ma invisibile. Stesso principio
   di rooms-widget-script.tsx — <script> sincrono nell'HTML del root layout,
   quindi eseguito durante il parsing della pagina: form.js si aggancia
   all'evento window "load" (verificato leggendone il codice), che uno
   script iniettato da un useEffect dopo l'hydration non vedrebbe mai.

   Cosa fa, verificato leggendolo e interrogando i suoi endpoint (24/09/2026):
   al "load" carica jquery.js da resx.octorate.com, scarica il modulo di
   ricerca da book.octorate.com/octobook/site/widget/form.xhtml?sitekey=… e
   lo inietta nel contenitore indicato da data-container. Nessun cookie
   impostato sul nostro dominio. Il modulo include 3 fogli di stile
   PrimeFlex da unpkg.com che definiscono solo variabili su :root
   (--text-color, --primary-color, --surface-*…) mai usate dal sito.
   ATTENZIONE: a quella data book.octorate.com risponde "Il codice sitekey
   non è valido o mancante" per questa sitekey — da verificare con Octorate.

   Contenitore fuori schermo (left:-9999px, MAI display:none: molti widget
   smettono di funzionare senza un'area di layout reale), aria-hidden e
   inert: invisibile e non raggiungibile da tastiera o screen reader.
   Registrato in src/data/privacy-services.ts ("octorate-widget"). */
const OCTORATE_SRC = "https://resx.octorate.com/octobook/resources/widget/js/form.js";
const OCTORATE_SITEKEY = "92568f100426d377bdde748789653e9b";
const CONTAINER_ID = "octorate-widget";

export function OctorateWidgetScript() {
  return (
    <>
      <div id={CONTAINER_ID} aria-hidden="true" inert style={{ position: "absolute", left: "-9999px", top: 0, width: "360px" }} />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script type="text/javascript" src={OCTORATE_SRC} data-sitekey={OCTORATE_SITEKEY} data-container={CONTAINER_ID} />
    </>
  );
}
