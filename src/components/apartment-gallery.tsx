"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { useLightbox } from "@/components/gallery-lightbox";
import type { GalleryImage } from "@/data/apartment-details";
import type { Locale } from "@/lib/i18n";

const SWIPE_THRESHOLD = 46;

/* Erano hardcoded in italiano (bug trovato durante la verifica multilingua):
   utenti di screen reader su /en/, /fr/, /de/ sentivano comunque "Galleria
   fotografica", "Foto precedente/successiva", "Apri a schermo intero". */
const TEXT: Record<Locale, { region: string; prev: string; next: string; openFullscreen: (alt: string) => string }> = {
  it: { region: "Galleria fotografica", prev: "Foto precedente", next: "Foto successiva", openFullscreen: (alt) => `Apri a schermo intero: ${alt}` },
  en: { region: "Photo gallery", prev: "Previous photo", next: "Next photo", openFullscreen: (alt) => `Open full screen: ${alt}` },
  fr: { region: "Galerie photo", prev: "Photo précédente", next: "Photo suivante", openFullscreen: (alt) => `Ouvrir en plein écran : ${alt}` },
  de: { region: "Fotogalerie", prev: "Vorheriges Foto", next: "Nächstes Foto", openFullscreen: (alt) => `Vollbild öffnen: ${alt}` },
};

/* Galleria come slider/carousel (richiesta esplicita del titolare — le
   foto "sparse" in griglia editoriale non gli piacevano): una foto grande
   alla volta, frecce ← → pulite, contatore "01 / N", swipe su mobile,
   frecce da tastiera quando il carousel ha il focus. La foto resta sempre
   protagonista — nessuna striscia di thumbnail, mai richiesta come
   necessaria dalla UX qui. Click sulla foto apre lo stesso lightbox
   fullscreen già usato altrove, sull'indice corrente. Transizione morbida
   (600ms, mai a scatto) via translateX su un'unica pista di slide — non
   un remount per foto, così resta fluida anche scorrendo rapidamente. */
function pad(n: number) {
  return String(n + 1).padStart(2, "0");
}

export function ApartmentGallery({ images, locale }: { images: GalleryImage[]; locale: Locale }) {
  const text = TEXT[locale];
  const [current, setCurrent] = useState(0);
  const { open, Lightbox } = useLightbox(images, locale);
  const dragStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => setCurrent(((i % images.length) + images.length) % images.length),
    [images.length]
  );
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  }

  function onPointerDown(e: PointerEvent) {
    dragStartX.current = e.clientX;
  }
  function onPointerUp(e: PointerEvent) {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      if (delta < 0) next();
      else prev();
    }
  }

  return (
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={text.region}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="relative aspect-[4/3] touch-pan-y select-none overflow-hidden rounded-[3px] bg-ink/5 outline-none sm:aspect-[16/10]"
      >
        <div
          className="flex h-full transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => open(current)}
              aria-label={text.openFullscreen(img.alt)}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 900px"
                priority={i === 0}
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label={text.prev}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/35 text-cream backdrop-blur-[2px] transition-colors hover:bg-ink/55 sm:left-5"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={text.next}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/35 text-cream backdrop-blur-[2px] transition-colors hover:bg-ink/55 sm:right-5"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/45 px-2.5 py-1 text-[11px] font-medium tabular-nums text-cream backdrop-blur-[2px] sm:bottom-4 sm:right-4">
              {pad(current)} / {pad(images.length - 1)}
            </span>
          </>
        )}
      </div>
      <Lightbox />
    </div>
  );
}
