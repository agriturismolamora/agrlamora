"use client";

import { useEffect, useRef, useState } from "react";

/* Contenitore per i widget bed-and-breakfast.it che iniettano contenuto via
   document.write (offerte, last minute, punti di interesse, richieste) —
   tutti diversi dal widget camere (rrp-widget-open-modal), che resta uno
   script persistente unico in root-shell.tsx/rooms-widget-script.tsx.

   Perché un iframe con srcDoc e non uno script diretto nella pagina:
   verificato (non solo per supposizione) che quando uno di questi script
   viene inserito nel DOM DOPO che la pagina ha già finito di caricare —
   esattamente ciò che succede ogni volta che si arriva su una pagina
   tramite una normale navigazione client-side di Next.js, non un
   caricamento pieno — il browser IGNORA silenziosamente le sue chiamate a
   document.write() (intervento noto di Chrome sugli script async):
   risultato, il widget semplicemente non appare, senza errori. Un iframe
   con srcDoc crea invece un documento sempre "fresco" ad ogni mount, dove
   lo script è sempre analizzato dal parser HTML come se fosse la prima
   volta — sicuro indipendentemente da quando/come viene montato il
   componente React. srcDoc (non src) mantiene l'iframe same-origin, quindi
   restiamo in grado di leggerne/dimensionarne l'altezza e di iniettare CSS
   di mascheramento dal nostro lato. */
export function BbitInlineWidget({
  scriptSrc,
  css,
  minHeight = 60,
  className,
  onContent,
}: {
  scriptSrc: string;
  css?: string;
  minHeight?: number;
  className?: string;
  /* Richiamata ad ogni variazione di altezza del contenuto, col body
     dell'iframe già popolato — usata da last-minute-section.tsx per
     nascondere l'intera sezione quando il widget segnala "nessun last
     minute in corso" (niente da mostrare, niente sezione vuota). */
  onContent?: (body: HTMLElement) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);

  const srcDoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank"><style>
html,body{margin:0;padding:0;background:transparent;}
${css ?? ""}
</style></head><body>
<script src="${scriptSrc}"><\/script>
</body></html>`;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let ro: ResizeObserver | null = null;
    let cancelled = false;

    function attach() {
      const doc = iframe?.contentDocument;
      const body = doc?.body;
      if (!body || cancelled) return;
      // Può essere richiamata più volte (documento già pronto + "load"):
      // un solo osservatore attivo, sempre sul body del documento corrente.
      ro?.disconnect();
      const update = () => {
        setHeight(Math.max(minHeight, body.scrollHeight));
        onContent?.(body);
      };
      update();
      ro = new ResizeObserver(update);
      ro.observe(body);
    }

    // Il contenuto del widget arriva col documento srcdoc: il suo "load"
    // scatta dopo che lo script (sincrono, document.write) ha scritto
    // tutto, quindi è l'innesco affidabile — ResizeObserver copre le
    // variazioni successive (immagine caricata, contenuto aggiornato).
    //
    // Due casi reali, entrambi verificati nel browser:
    // - il documento srcdoc può essere già "complete" quando QUESTO effect
    //   gira (parsing e document.write finiti prima che React committi):
    //   il suo "load" è già passato, quindi si aggancia subito;
    // - più spesso (29/09/2026, pagina home dopo il consenso) al momento
    //   del mount l'iframe contiene ancora il documento iniziale
    //   about:blank, ANCH'ESSO "complete" ma vuoto: agganciarsi a quello
    //   e saltare il listener lasciava onContent cieco per sempre (la
    //   sezione Last Minute non si accorgeva mai di "nessun last minute").
    // Quindi: aggancio immediato SOLO se il documento è davvero quello
    // srcdoc, e listener "load" registrato comunque, in ogni caso.
    iframe.addEventListener("load", attach);
    const initialDoc = iframe.contentDocument;
    if (initialDoc?.readyState === "complete" && initialDoc.URL === "about:srcdoc") {
      attach();
    }
    return () => {
      cancelled = true;
      iframe.removeEventListener("load", attach);
      ro?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minHeight]);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={srcDoc}
      title="widget"
      className={className}
      style={{ width: "100%", height, border: "none", display: "block", overflow: "hidden" }}
      scrolling="no"
    />
  );
}
