import { WatermarkedImage } from "@/components/watermarked-image";
import { BookingModalButton } from "@/components/booking-modal-button";
import { PromoLine } from "@/components/promo-line";
import choco from "@/components/chocolate-theme.module.css";
import ny from "@/components/newyear-theme.module.css";
import type { BlogTheme } from "@/data/blog-posts";
import type { PromoId } from "@/data/promo";
import type { Locale } from "@/lib/i18n";

/* Un vantaggio legato a una promo a tempo diventa "Offerta conclusa" dopo
   la scadenza (PromoLine). */
type StayBoxBenefit = string | { text: string; promo: PromoId };

export type StayBoxData = { heading: string; image: string; alt: string; benefits: StayBoxBenefit[]; cta: string };

/* Colori per tema dell'articolo (CSS module del tema per pannello e CTA). */
const THEME: Record<BlogTheme, { box: string; heading: string; item: string; check: string; cta: string; sheen: "soft" | "strong" }> = {
  default: {
    box: "border border-ink/10 bg-cream-dim",
    heading: "text-ink",
    item: "text-ink-soft",
    check: "text-olive-700",
    cta: "bg-raspberry text-cream hover:bg-[#8a3844]",
    sheen: "soft",
  },
  chocolate: {
    box: `${choco.root} ${choco.offer}`,
    heading: "text-[var(--crema)]",
    item: "text-[var(--crema)]/90",
    check: "text-[var(--caramello-chiaro)]",
    cta: choco.caramelCta,
    sheen: "strong",
  },
  newyear: {
    box: `${ny.root} ${ny.panel}`,
    heading: "text-[var(--avorio)]",
    item: "text-[var(--avorio)]/90",
    check: "text-[var(--oro)]",
    cta: ny.goldCta,
    sheen: "strong",
  },
};

/* "Dormi a La Mora": foto nostra HD, tre vantaggi e Prenota (modale), dopo
   "In breve" negli articoli che lo prevedono (Eurochocolate, Capodanno), al
   posto della CTA A: stesso invito, più chiaro su dove si dorme. */
export function StayBox({ data, locale, theme = "default" }: { data: StayBoxData; locale: Locale; theme?: BlogTheme }) {
  const c = THEME[theme];
  return (
    <section aria-labelledby="stay-box-heading" className={`mt-10 overflow-hidden rounded-[10px] ${c.box}`}>
      <div className="relative aspect-[16/9] w-full">
        <WatermarkedImage src={data.image} alt={data.alt} fill sizes="(max-width: 760px) 100vw, 700px" className="object-cover" />
      </div>
      <div className="px-6 py-7 sm:px-8 sm:py-8">
        <h2 id="stay-box-heading" className={`font-display text-[clamp(22px,3vw,28px)] font-normal leading-[1.2] [text-wrap:balance] ${c.heading}`}>
          {data.heading.replace(/La Mora/g, "La Mora")}
        </h2>
        <ul className="mt-5 space-y-2.5">
          {data.benefits.map((benefit) => {
            const text = typeof benefit === "string" ? benefit : benefit.text;
            return (
              <li key={text} className={`flex items-start gap-2.5 text-[14px] leading-[1.6] ${c.item}`}>
                <span aria-hidden="true" className={c.check}>
                  ✓
                </span>
                {typeof benefit === "string" ? (
                  benefit
                ) : (
                  <PromoLine promoId={benefit.promo} locale={locale}>
                    {benefit.text}
                  </PromoLine>
                )}
              </li>
            );
          })}
        </ul>
        <BookingModalButton
          sheen={c.sheen}
          className={`${c.cta} mt-6 inline-flex min-h-[46px] items-center gap-2.5 rounded-lg px-7 font-sans text-[11px] font-semibold uppercase tracking-[0.08em]`}
        >
          {data.cta}
          <span aria-hidden="true">→</span>
        </BookingModalButton>
      </div>
    </section>
  );
}
