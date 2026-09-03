"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/data/apartment-details";

/* Lightbox minimale per le gallerie appartamento: un hook (useLightbox) che
   lascia al chiamante piena libertà sulla composizione della griglia (foto
   grandi, coppie, verticali, orizzontali — dimensioni diverse per foto),
   passandogli solo `open(index)` da agganciare all'onClick di ogni foto.
   <Lightbox /> va renderizzato una sola volta in fondo alla pagina.
   Nessuna libreria esterna, stesso principio del resto del progetto. */
export function useLightbox(images: GalleryImage[]) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)), [images.length]);
  const next = useCallback(() => setIndex((i) => (i === null ? null : (i + 1) % images.length)), [images.length]);

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  const Lightbox = () =>
    index === null ? null : (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Galleria fotografica a schermo intero"
        className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 px-4 py-8 sm:px-10"
        onClick={close}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Chiudi la galleria"
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Foto precedente"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 sm:left-6"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Foto successiva"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 sm:right-6"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        <div className="relative h-[80vh] w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
          <Image src={images[index].src} alt={images[index].alt} fill sizes="100vw" className="object-contain" priority />
        </div>

        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] uppercase tracking-[0.1em] text-cream/50">
          {index + 1} / {images.length}
        </span>
      </div>
    );

  return { open: setIndex, Lightbox };
}
