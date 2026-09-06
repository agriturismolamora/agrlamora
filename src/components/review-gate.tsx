"use client";

import { useState } from "react";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

const WHATSAPP_NUMBER = "393934363917";

function StarButton({ filled, onClick, onHover, label }: { filled: boolean; onClick: () => void; onHover: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      aria-label={label}
      className="p-1 transition-transform duration-150 hover:scale-110"
    >
      <svg viewBox="0 0 24 24" width="32" height="32" fill={filled ? "#c9a24b" : "none"} aria-hidden="true">
        <path
          d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5Z"
          stroke="#c9a24b"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* "Review gate": Google non permette di pubblicare una recensione sul
   profilo Business tramite un form di terze parti (vedi nota in
   google-reviews.ts) — quindi il sito non "invia" nulla a Google. Si
   chiede prima il voto: 4-5 stelle apre la vera pagina di recensione
   Google in una nuova scheda; 1-3 stelle raccoglie il feedback in privato
   (via WhatsApp diretto al titolare, non un form silenzioso senza backend)
   invece di mandarlo comunque su Google. Soluzione concordata in
   PROJECT-BRIEF.md sezione 6. */
export function ReviewGate({ writeReviewUrl }: { writeReviewUrl: string }) {
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const displayRating = hovered ?? rating ?? 0;
  const isPositive = rating !== null && rating >= 4;
  const isNegative = rating !== null && rating > 0 && rating < 4;

  const feedbackWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Ciao! Ho soggiornato da voi (voto ${rating}/5) e vorrei lasciarvi un feedback privato: ${feedback || "..."}`
  )}`;

  return (
    <section aria-labelledby="review-gate-heading" className="bg-cream py-20 sm:py-24">
      <Reveal className="mx-auto max-w-[560px] px-6 text-center sm:px-10" as="div">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Sei stato nostro ospite?</span>
        <h2 id="review-gate-heading" className="mt-4 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink">
          Com&apos;è andato il tuo soggiorno?
        </h2>

        <div className="mt-7 flex justify-center gap-1" onMouseLeave={() => setHovered(null)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <StarButton
              key={n}
              filled={n <= displayRating}
              onClick={() => setRating(n)}
              onHover={() => setHovered(n)}
              label={`${n} stelle`}
            />
          ))}
        </div>

        {isPositive && (
          <div className="mt-7">
            <p className="text-[14px] leading-[1.7] text-ink-soft">
              Grazie! Ti va di raccontarlo anche su Google? Bastano due minuti.
            </p>
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-5 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Lascia una recensione su Google
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </div>
        )}

        {isNegative && (
          <div className="mt-7 text-left">
            <p className="text-center text-[14px] leading-[1.7] text-ink-soft">
              Ci dispiace. Raccontaci cosa non ha funzionato: lo leggiamo direttamente noi, in privato — non finisce
              online.
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Cosa possiamo migliorare?"
              rows={3}
              className="mt-4 w-full rounded-[3px] border border-ink/20 bg-cream px-4 py-3 text-[14px] text-ink outline-none placeholder:text-ink-soft/60 focus:border-raspberry"
            />
            <div className="mt-4 flex justify-center">
              <a
                href={feedbackWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8f4324" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  Invia il feedback in privato
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}
