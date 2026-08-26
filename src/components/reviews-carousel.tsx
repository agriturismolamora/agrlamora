"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GoogleReview } from "@/lib/google-reviews";
import { StarRow } from "@/components/review-icons";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 4l-8 8 8 8" : "M9 4l8 8-8 8"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const initial = review.authorName.trim().charAt(0).toUpperCase() || "?";
  const isLong = review.text.length > 180;

  return (
    <article className="w-[300px] shrink-0 snap-start rounded-[8px] bg-cream p-6 shadow-[0_18px_40px_-24px_rgba(28,33,23,0.35)] sm:w-[340px]">
      <div className="flex items-center gap-3">
        {review.authorPhotoUrl ? (
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <Image src={review.authorPhotoUrl} alt="" fill sizes="44px" className="object-cover" />
          </div>
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-olive-900 font-display text-lg text-cream">
            {initial}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] text-ink">{review.authorName}</p>
          <p className="text-[11px] text-ink-soft">{review.relativeTime}</p>
        </div>
      </div>

      <div className="mt-3">
        <StarRow rating={review.rating} />
      </div>

      <p className={`mt-3 text-[13.5px] leading-[1.65] text-ink-soft ${expanded ? "" : "line-clamp-4"}`}>{review.text}</p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1.5 text-[12px] font-semibold text-raspberry underline underline-offset-4"
        >
          {expanded ? "Mostra meno" : "Leggi di più"}
        </button>
      )}
    </article>
  );
}

/* Carousel a scroll-snap nativo (niente libreria drag esterna): scorrimento
   touch/trackpad fluido di serie, i due pulsanti circolari avanzano di una
   card alla volta. Maschera sfumata ai bordi per suggerire che c'è altro
   contenuto, più moderna di semplici frecce piatte. */
export function ReviewsCarousel({ reviews }: { reviews: GoogleReview[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 320) + 20;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ maskImage: "linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)" }}
      >
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Recensione precedente"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-raspberry hover:text-raspberry"
        >
          <ChevronIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Recensione successiva"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-raspberry hover:text-raspberry"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
