"use client";

import Image from "next/image";
import { useLightbox } from "@/components/gallery-lightbox";
import type { GalleryImage } from "@/data/apartment-details";

/* Composizione editoriale variata (non una griglia uniforme): ogni terza
   foto è grande e orizzontale (span 2 colonne), le altre più piccole e
   verticali — un ritmo "grande / coppia / grande / coppia" invece di un
   muro di thumbnail identici. Click su qualunque foto apre il lightbox
   (useLightbox) su quell'indice esatto. */
function spanClass(i: number) {
  return i % 3 === 0 ? "sm:col-span-2 aspect-[16/10]" : "aspect-[4/5]";
}

export function ApartmentGallery({ images }: { images: GalleryImage[] }) {
  const { open, Lightbox } = useLightbox(images);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => open(i)}
            aria-label={`Apri a schermo intero: ${img.alt}`}
            className={`group relative overflow-hidden rounded-[3px] bg-ink/5 ${spanClass(i)}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={i % 3 === 0 ? "(max-width: 640px) 100vw, 800px" : "(max-width: 640px) 100vw, 390px"}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <Lightbox />
    </>
  );
}
