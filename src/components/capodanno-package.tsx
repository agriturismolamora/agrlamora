"use client";

import { BookingModalButton } from "@/components/booking-modal-button";
import { WhatsappIcon } from "@/components/blog-booking-cta";
import ny from "@/components/newyear-theme.module.css";
import { PACKAGES, formatEuro, getPromoStatus, promoWhatsappUrl, type PackageId, type PackagePromo } from "@/data/promo";
import { useNow } from "@/hooks/use-now";
import type { Locale } from "@/lib/i18n";

/* Pacchetto a prezzo fisso (src/data/promo.ts, oggi il Capodanno).

   CTA: finché il pacchetto NON è nel motore (inMotore: false) "Chiedi il
   pacchetto a Paolo" su WhatsApp, con il messaggio precompilato nella
   lingua della pagina (nessun riflesso: non è un pulsante di
   prenotazione); con inMotore: true diventa da sola BookingModalButton.
   Date e appartamenti restano null nei dati e non si mostrano.

   Stato "concluso" solo dopo il mount (useNow): HTML statico e primo render
   coincidono; le CTA stanno in un contenitore di altezza minima fissa, lo
   scambio con "Offerta conclusa" non sposta il layout. */

export function PackageCta({
  pkg,
  locale,
  bookClassName,
  whatsappClassName,
}: {
  pkg: PackagePromo;
  locale: Locale;
  bookClassName: string;
  whatsappClassName: string;
}) {
  const text = pkg.text[locale];
  if (pkg.inMotore) {
    return (
      <BookingModalButton sheen="strong" className={bookClassName}>
        {text.bookCta}
      </BookingModalButton>
    );
  }
  return (
    <a href={promoWhatsappUrl(pkg, locale)} target="_blank" rel="noopener noreferrer" className={whatsappClassName}>
      <WhatsappIcon />
      {text.whatsappCta}
    </a>
  );
}

export function usePackageEnded(pkg: PackagePromo): boolean {
  const now = useNow();
  return now !== null && getPromoStatus(pkg, now) === "expired";
}

const BUTTON = "inline-flex min-h-[48px] items-center gap-2.5 rounded-lg px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.06em]";

/* Sezione dell'articolo di Capodanno (tema "newyear"), con ancora per i
   link da /offerte/offerte-in-corso/: tre card dei prezzi, 4 notti con
   colazione, CTA. */
export function CapodannoPackageSection({ packageId, locale }: { packageId: PackageId; locale: Locale }) {
  const pkg = PACKAGES[packageId];
  const text = pkg.text[locale];
  const ended = usePackageEnded(pkg);
  const headingId = `${pkg.articleAnchor}-heading`;

  return (
    <section id={pkg.articleAnchor} aria-labelledby={headingId} className="mt-12 scroll-mt-32">
      <div className={`${ny.root} ${ny.panel} px-6 py-8 sm:px-10 sm:py-10`}>
        <span className={`${ny.factLabel} flex items-center gap-2`}>
          <span aria-hidden="true" className={ny.sparkle} style={{ marginTop: 0 }} />
          {text.kicker}
        </span>
        <h2 id={headingId} className="mt-3 font-display text-[clamp(26px,3.6vw,34px)] font-normal leading-[1.15] text-[var(--avorio)] [text-wrap:balance]">
          {text.title}
        </h2>
        <p className="mt-2 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--oro)]">{text.validity}</p>

        <ul className="mt-7 grid grid-cols-3 gap-2.5 sm:gap-4">
          {pkg.prices.map((tier) => (
            <li key={tier.guests} className={ny.priceCard}>
              <span className={ny.priceGuests}>{text.guests.replace("{n}", String(tier.guests))}</span>
              <span className={ny.priceValue}>{formatEuro(tier.price, locale)}</span>
              <span className={ny.priceNote}>{text.nightsShort}</span>
            </li>
          ))}
        </ul>

        <p className={`mt-6 text-[14.5px] leading-[1.7] text-[var(--avorio)]/85 ${ended ? "invisible" : ""}`}>{text.availability}</p>
        <div className="mt-4 flex min-h-[48px] flex-wrap items-center gap-3">
          {ended ? (
            <span className={`${BUTTON} border border-[var(--avorio)]/30 text-[var(--avorio)]/80`}>{text.ended}</span>
          ) : (
            <PackageCta pkg={pkg} locale={locale} bookClassName={`${ny.goldCta} ${BUTTON}`} whatsappClassName={`${ny.goldCta} ${BUTTON}`} />
          )}
        </div>
      </div>
    </section>
  );
}
