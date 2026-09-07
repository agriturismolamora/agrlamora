import type { ReactNode } from "react";
import { Reveal } from "@/components/scroll-reveal";

export type LegalSection = { heading: string; body: ReactNode };

/* Layout condiviso dalle 3 pagine legali (Privacy, Cookie Policy, Termini):
   tipografia semplice e leggibile, nessun elemento decorativo che
   distragga dal testo — coerente con lo stile del sito ma pensato per
   essere letto con attenzione, non "scrollato" come le pagine editoriali. */
export function LegalPageLayout({
  label,
  title,
  updated,
  intro,
  sections,
}: {
  label: string;
  title: string;
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <article className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-[760px] px-6 sm:px-10">
        <Reveal>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{label}</span>
          <h1 className="mt-4 font-display text-[clamp(30px,4.2vw,44px)] font-normal leading-[1.15] text-ink [text-wrap:balance]">
            {title}
          </h1>
          <p className="mt-3 text-[12px] uppercase tracking-[0.06em] text-ink-soft/70">{updated}</p>
        </Reveal>

        {intro && (
          <Reveal delay={80}>
            <div className="mt-8 text-[15px] leading-[1.8] text-ink-soft">{intro}</div>
          </Reveal>
        )}

        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={100 + i * 20}>
              <section>
                <h2 className="font-display text-[22px] font-normal leading-[1.3] text-ink">{s.heading}</h2>
                <div className="mt-3 space-y-3 text-[14px] leading-[1.8] text-ink-soft [&_a]:text-raspberry [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-ink [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
                  {s.body}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
