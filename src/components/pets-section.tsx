import { Reveal } from "@/components/scroll-reveal";
import { FaqAccordion } from "@/components/faq-accordion";
import { PawIcon } from "@/components/amenity-icons";
import { PETS_TEXT } from "@/data/pets";
import type { Locale } from "@/lib/i18n";

/* "Agriturismo ad Assisi con animali": testo breve e FAQ (src/data/pets.ts),
   su /alloggi/ e sulle schede di Gemelli e Sagittario. La FAQPage nel
   JSON-LD la aggiunge la pagina (faqPageNode con le stesse domande). */
export function PetsSection({ locale }: { locale: Locale }) {
  const text = PETS_TEXT[locale];
  return (
    <section aria-labelledby="pets-heading" className="bg-cream-dim py-16 sm:py-20">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950 [&_svg]:h-4 [&_svg]:w-4">
              <PawIcon />
              {text.label}
            </span>
            <h2 id="pets-heading" className="mt-4 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.heading}
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-ink-soft">{text.body}</p>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={text.faq} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
