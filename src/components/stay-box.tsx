import { WatermarkedImage } from "@/components/watermarked-image";
import { BookingModalButton } from "@/components/booking-modal-button";
import choco from "@/components/chocolate-theme.module.css";

export type StayBoxData = { heading: string; image: string; alt: string; benefits: string[]; cta: string };

/* "Dormi a La Mora": foto nostra HD, tre vantaggi e Prenota (modale), dopo
   "In breve" negli articoli che lo prevedono (oggi solo Eurochocolate), al
   posto della CTA A: stesso invito, più chiaro su dove si dorme. */
export function StayBox({ data, chocolate = false }: { data: StayBoxData; chocolate?: boolean }) {
  return (
    <section
      aria-labelledby="stay-box-heading"
      className={`mt-10 overflow-hidden rounded-[10px] ${chocolate ? `${choco.root} ${choco.offer}` : "border border-ink/10 bg-cream-dim"}`}
    >
      <div className="relative aspect-[16/9] w-full">
        <WatermarkedImage src={data.image} alt={data.alt} fill sizes="(max-width: 760px) 100vw, 700px" className="object-cover" />
      </div>
      <div className="px-6 py-7 sm:px-8 sm:py-8">
        <h2
          id="stay-box-heading"
          className={`font-display text-[clamp(22px,3vw,28px)] font-normal leading-[1.2] [text-wrap:balance] ${chocolate ? "text-[var(--crema)]" : "text-ink"}`}
        >
          {data.heading.replace(/La Mora/g, "La Mora")}
        </h2>
        <ul className="mt-5 space-y-2.5">
          {data.benefits.map((benefit) => (
            <li key={benefit} className={`flex items-start gap-2.5 text-[14px] leading-[1.6] ${chocolate ? "text-[var(--crema)]/90" : "text-ink-soft"}`}>
              <span aria-hidden="true" className={chocolate ? "text-[var(--caramello-chiaro)]" : "text-olive-700"}>
                ✓
              </span>
              {benefit}
            </li>
          ))}
        </ul>
        <BookingModalButton
          className={`${chocolate ? choco.sheen : "bg-raspberry text-cream hover:bg-[#8a3844]"} mt-6 inline-flex min-h-[46px] items-center gap-2.5 rounded-lg px-7 font-sans text-[11px] font-semibold uppercase tracking-[0.08em]`}
        >
          {data.cta}
          <span aria-hidden="true">→</span>
        </BookingModalButton>
      </div>
    </section>
  );
}
