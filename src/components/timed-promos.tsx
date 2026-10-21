"use client";

import Image from "next/image";
import Link from "next/link";
import { BookingModalButton } from "@/components/booking-modal-button";
import { LivePill } from "@/components/live-pill";
import { PhotoCreditLine } from "@/components/photo-credit";
import { getActivePromos, getExpiredPromos, type Promo } from "@/data/promo";
import { useNow } from "@/hooks/use-now";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const TEXT: Record<Locale, { live: string; ended: string; none: string; endedLabel: string; endedHeading: string }> = {
  it: {
    live: "In corso",
    ended: "Conclusa",
    none: "Al momento non ci sono promozioni a tempo attive: qui sotto le altre offerte di La Mora.",
    endedLabel: "Archivio",
    endedHeading: "Offerte concluse",
  },
  en: {
    live: "Now",
    ended: "Ended",
    none: "There are no time-limited promotions running right now: see La Mora's other offers below.",
    endedLabel: "Archive",
    endedHeading: "Past offers",
  },
  fr: {
    live: "En cours",
    ended: "Terminée",
    none: "Aucune promotion à durée limitée n'est en cours pour le moment : voici ci-dessous les autres offres de La Mora.",
    endedLabel: "Archives",
    endedHeading: "Offres terminées",
  },
  de: {
    live: "Läuft",
    ended: "Beendet",
    none: "Derzeit laufen keine zeitlich begrenzten Aktionen: unten finden Sie die weiteren Angebote von La Mora.",
    endedLabel: "Archiv",
    endedHeading: "Beendete Angebote",
  },
};

function ActivePromoCard({ promo, locale }: { promo: Promo; locale: Locale }) {
  const text = promo.text[locale];
  return (
    <article>
      <div className="grid grid-cols-1 overflow-hidden rounded-[6px] border border-ink/10 bg-cream-dim sm:grid-cols-[2fr_3fr]">
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:min-h-[320px]">
          <Image src={promo.image.src} alt={promo.image.alt[locale]} fill sizes="(max-width: 640px) 100vw, 450px" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center px-7 py-8 sm:px-10 sm:py-10">
          <LivePill label={TEXT[locale].live} />
          <h3 className="mt-4 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">{text.title}</h3>
          <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-soft">{text.validity}</p>
          <p className="mt-4 max-w-[520px] text-[14px] leading-[1.75] text-ink-soft">{text.summary}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BookingModalButton className="inline-flex min-h-[46px] items-center gap-2.5 rounded-lg bg-raspberry px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-cream transition-colors hover:bg-[#8a3844]">
              {text.bookCta}
              <span aria-hidden="true">→</span>
            </BookingModalButton>
            <Link
              href={withLocale(locale, `/blog/${promo.articleSlug}/`)}
              className="text-[12px] font-semibold text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry"
            >
              {text.articleCta}
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-2 text-[11px] leading-[1.5] text-ink-soft">
        <PhotoCreditLine credit={promo.image.credit} locale={locale} prefix={promo.image.caption[locale]} />
      </p>
    </article>
  );
}

/* Promo a tempo della pagina /offerte/offerte-in-corso/: `show="active"` le
   attive in evidenza (pill "In corso", Prenota, link all'articolo),
   `show="expired"` le concluse in una sezione più sobria (grigie, più
   piccole, "Conclusa", nessuna pill né CTA), che non compare se non ce ne
   sono. Stato da getActivePromos()/getExpiredPromos() (src/data/promo.ts)
   con l'ora del browser dopo il mount (useNow); prima, sul server e durante
   l'hydration, con l'ora della build (`builtAt`, passata dal server
   component): HTML statico e primo render client coincidono. */
export function TimedPromos({ locale, builtAt, show }: { locale: Locale; builtAt: number; show: "active" | "expired" }) {
  const now = useNow() ?? builtAt;
  const text = TEXT[locale];

  if (show === "active") {
    const promos = getActivePromos(now);
    if (promos.length === 0) return <p className="text-[15px] leading-[1.8] text-ink-soft">{text.none}</p>;
    return (
      <div className="space-y-12">
        {promos.map((promo) => (
          <ActivePromoCard key={promo.id} promo={promo} locale={locale} />
        ))}
      </div>
    );
  }

  const promos = getExpiredPromos(now);
  if (promos.length === 0) return null;
  return (
    <section aria-labelledby="offerte-concluse-heading" className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-[900px] px-6 sm:px-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-soft">{text.endedLabel}</span>
        <h2 id="offerte-concluse-heading" className="mt-2 font-display text-[22px] font-normal leading-[1.2] text-ink-soft">
          {text.endedHeading}
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {promos.map((promo) => (
            <li key={promo.id} className="rounded-[4px] border border-ink/10 bg-cream-dim/60 px-5 py-4">
              <span className="inline-block rounded-full border border-ink/20 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                {text.ended}
              </span>
              <p className="mt-2 font-display text-[17px] leading-[1.3] text-ink-soft">{promo.text[locale].title}</p>
              <p className="mt-1 text-[12px] leading-[1.5] text-ink-soft">{promo.text[locale].validity}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
