"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/data/apartment-details";
import type { Locale } from "@/lib/i18n";

/* Testi accessibilità: erano hardcoded in italiano, quindi utenti EN/FR/DE
   di screen reader sentivano "Apri a schermo intero" / "Foto precedente"
   ecc. anche sulle pagine tradotte — bug reale trovato durante la verifica
   multilingua (item esplicito della richiesta: "controlla TUTTE le lingue,
   non solo che la traduzione venga caricata"). */
const TEXT: Record<Locale, { dialogLabel: string; close: string; prev: string; next: string }> = {
  it: { dialogLabel: "Galleria fotografica a schermo intero", close: "Chiudi la galleria", prev: "Foto precedente", next: "Foto successiva" },
  en: { dialogLabel: "Full-screen photo gallery", close: "Close the gallery", prev: "Previous photo", next: "Next photo" },
  fr: { dialogLabel: "Galerie photo plein écran", close: "Fermer la galerie", prev: "Photo précédente", next: "Photo suivante" },
  de: { dialogLabel: "Vollbild-Fotogalerie", close: "Galerie schließen", prev: "Vorheriges Foto", next: "Nächstes Foto" },
};

/* Lightbox minimale per le gallerie appartamento: un hook (useLightbox) che
   lascia al chiamante piena libertà sulla composizione della griglia (foto
   grandi, coppie, verticali, orizzontali — dimensioni diverse per foto),
   passandogli solo `open(index)` da agganciare all'onClick di ogni foto.
   <Lightbox /> va renderizzato una sola volta in fondo alla pagina.
   Nessuna libreria esterna, stesso principio del resto del progetto. */
export function useLightbox(images: GalleryImage[], locale: Locale) {
  const text = TEXT[locale];
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
        aria-label={text.dialogLabel}
        // bg-[rgba(...)] letterale, non bg-ink/95: l'utility con modificatore
        // di opacità di Tailwind v4 genera un colore oklab() — durante la
        // verifica multi-viewport lo sfondo di questo overlay a schermo
        // intero risultava a tratti non dipinto (riproducibile anche a
        // mount fresco, con stile calcolato corretto ma resa incoerente).
        // Non isolato con certezza allo strumento di test o al motore di
        // rendering, ma trattandosi dell'overlay più critico del sito
        // (galleria a piena pagina) si evita il rischio con un valore
        // rgba() letterale, identico nel risultato ma senza dipendere da
        // un formato colore più recente.
        className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(36,31,23,0.95)] px-4 py-8 sm:px-10"
        onClick={close}
      >
        <button
          type="button"
          onClick={close}
          aria-label={text.close}
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
              aria-label={text.prev}
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
              aria-label={text.next}
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
