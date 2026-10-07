import { Reveal } from "@/components/scroll-reveal";
import { FaqAccordion } from "@/components/faq-accordion";
import { HOME_FAQ } from "@/data/home-faq";
import type { Locale } from "@/lib/i18n";

/* FAQ della home: risposte brevi su piscina, animali, colazione, ricarica
   EV, distanze e prenotazione diretta (src/data/home-faq.ts), le stesse
   della FAQPage nel JSON-LD della home. Stesso impianto delle FAQ di Chi
   siamo. data-snap-exempt: con le risposte aperte la sezione può superare
   lo schermo, e lo snap a sezioni (section-snap-scroll.tsx) non deve
   riportare in cima mentre la si legge. */
export function HomeFaq({ locale }: { locale: Locale }) {
  const faq = HOME_FAQ[locale];
  return (
    <section id="section-faq" aria-labelledby="faq-heading" data-snap-exempt="true" className="bg-cream-dim py-20 sm:py-28">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{faq.label}</span>
            <h2 id="faq-heading" className="mt-4 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {faq.heading}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={faq.items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
