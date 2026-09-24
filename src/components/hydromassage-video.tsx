"use client";

import { useEffect, useRef, useState } from "react";

/* Clip di 5 secondi della fontana idromassaggio, estratta dal video
   fornito dal titolare (IDROMASSAGGIOVIDEOLAMORA.mp4, 35s originali) alla
   finestra 7s–12s — dove la fontana è pienamente visibile e ben inquadrata
   — e ricodificata per il web: H.264 High, 480×848, 30fps, ~1,2 Mbps, senza
   traccia audio (riproduzione sempre muta), moov atom in testa (faststart)
   per partire senza scaricare tutto il file. ~750KB invece dei ~7,5MB del
   file intero. Loop nativo del <video>, nessuna logica di salto temporale.
   Caricato solo quando la sezione entra in viewport (IntersectionObserver),
   non subito al mount. */
export function HydromassageVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <div ref={containerRef} className="relative aspect-[9/16] w-full overflow-hidden rounded-[3px] sm:aspect-[3/4]">
      {shouldLoad && (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
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
