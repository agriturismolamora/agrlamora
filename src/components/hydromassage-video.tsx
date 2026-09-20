"use client";

import { useEffect, useRef, useState } from "react";

/* Estratto di ~5 secondi dal video fornito dal titolare
   (IDROMASSAGGIOVIDEOLAMORA.mp4, 35s totali) che inquadra bene la fontana
   idromassaggio: nessun tool di editing video disponibile in questa sessione
   per tagliare fisicamente il file, quindi il file originale viene caricato
   per intero ma la riproduzione resta vincolata alla finestra 7s–12s (loop
   continuo, muto), dove la fontana è pienamente visibile e ben inquadrata —
   verificato fotogramma per fotogramma prima di scegliere questi timestamp.
   Caricato solo quando la sezione entra in viewport (IntersectionObserver),
   non subito al mount: il file è pesante (~7MB) per un contenuto che è solo
   un dettaglio secondario della pagina piscina. */
const CLIP_START = 7;
const CLIP_END = 12;

export function HydromassageVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const v = videoRef.current;
    if (!v) return;

    function onLoaded() {
      if (v) v.currentTime = CLIP_START;
    }
    function onTimeUpdate() {
      if (v && v.currentTime >= CLIP_END) {
        v.currentTime = CLIP_START;
      }
    }
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="relative aspect-[9/16] w-full overflow-hidden rounded-[3px] sm:aspect-[3/4]">
      {shouldLoad && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/videos/IDROMASSAGGIOVIDEOLAMORA.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
