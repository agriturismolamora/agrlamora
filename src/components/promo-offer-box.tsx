"use client";

import { useEffect, useState } from "react";
import styles from "@/components/chocolate-theme.module.css";
import { PROMOS, FACEBOOK_PAGE_URL, facebookOfferUrl, isPromoActive, promoWhatsappUrl, type PromoId } from "@/data/promo";
import { BookingModalButton } from "@/components/booking-modal-button";
import type { Locale } from "@/lib/i18n";

/* Box offerta riutilizzabile, configurato per articolo tramite il campo
   `offerBox` di blog-posts.ts (oggi solo Eurochocolate 2026). Mostrato in
   alto e in fondo all'articolo.

   La validità è un testo DATATO nell'HTML statico ("dal 13 al 22 novembre
   2026"), vero anche senza JavaScript. Lo stato "conclusa" si calcola solo
   dopo il mount (useEffect): il primo render è identico su server e client
   (nessun hydration mismatch), e il contenitore delle CTA ha altezza minima
   fissa, quindi lo scambio CTA → "Offerta conclusa" non sposta il layout.

   "Prenota" apre la stessa modale bed-and-breakfast.it di "Prenota ora"
   (BookingModalButton, vedi lì perché non basta la sola classe). Nessuna promessa sull'applicazione automatica dello sconto nel
   motore: solo le condizioni del titolare (src/data/promo.ts). */
export function PromoOfferBox({
  promoId,
  locale,
  headingAs = "h2",
  id,
}: {
  promoId: PromoId;
  locale: Locale;
  headingAs?: "h2" | "p";
  id?: string;
}) {
  const promo = PROMOS[promoId];
  const text = promo.text[locale];
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- stato che dipende dall'ora del browser: va letto dopo il mount, mai durante il render statico
    setEnded(!isPromoActive(promo, Date.now()));
  }, [promo]);

  const Heading = headingAs;

  return (
    <section id={id} aria-label={text.title} className={`${styles.root} ${styles.offer} px-6 py-8 sm:px-10 sm:py-10`}>
      <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-10">
        <div>
          <span aria-hidden="true" className={styles.offerBadge}>
            -{promo.discountPercent}%
          </span>
        </div>
        <div>
          <Heading className="font-display text-[clamp(24px,3.4vw,32px)] font-normal leading-[1.15] text-[var(--crema)] [text-wrap:balance]">
            {text.title}
          </Heading>
          <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--caramello-chiaro)]">{text.validity}</p>

          <span className="mt-6 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--crema)]/80">
            {text.conditionsHeading}
          </span>
          <ul className="mt-3 space-y-2.5">
            {text.conditions.map((c) => (
              <li key={c} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[var(--crema)]">
                <span aria-hidden="true" className={`${styles.check} flex items-center justify-center`}>
                  <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
                    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex min-h-[48px] flex-wrap items-center gap-3">
            {ended ? (
              <span className="inline-flex min-h-[48px] items-center rounded-lg border border-[var(--crema)]/30 px-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--crema)]/80">
                {text.ended}
              </span>
            ) : (
              <>
                <BookingModalButton
                  className={`${styles.sheen} inline-flex min-h-[48px] items-center rounded-lg px-7 font-sans text-[11px] font-semibold uppercase tracking-[0.08em]`}
                >
                  {text.bookCta}
                </BookingModalButton>
                <a
                  href={promoWhatsappUrl(promo, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.ghost} inline-flex min-h-[48px] items-center rounded-lg px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.08em]`}
                >
                  {text.whatsappCta}
                </a>
              </>
            )}
          </div>

          {/* Le due azioni Facebook dell'offerta: "Mi piace" alla pagina e
              "Salva" sul post dell'offerta, entrambe in una nuova scheda. */}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[12px] font-semibold text-[var(--caramello-chiaro)] underline decoration-[var(--caramello-chiaro)]/40 underline-offset-4 hover:text-[var(--crema)]"
            >
              {text.facebookCta} →
            </a>
            <a
              href={facebookOfferUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[12px] font-semibold text-[var(--caramello-chiaro)] underline decoration-[var(--caramello-chiaro)]/40 underline-offset-4 hover:text-[var(--crema)]"
            >
              {text.facebookPostCta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
