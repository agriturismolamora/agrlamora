import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

export const metadata: Metadata = {
  title: "Colazione Bio",
  description:
    "Colazione biologica dalle 7:00 alle 9:30 ad Assisi: marmellate fatte in casa, frutta di stagione, olio EVO. Dolce 5€/giorno, supplemento salata +10€ a persona.",
  alternates: { canonical: "/agriturismo-con-colazione-inclusa-assisi/" },
};

const FACTS = [
  { label: "Orario", value: "07:00 – 09:30" },
  { label: "Colazione dolce", value: "5€ a persona / giorno" },
  { label: "Supplemento salata", value: "+10€ a persona" },
];

export default function ColazioneBioPage() {
  return (
    <>
      <section className="relative flex h-[58vh] min-h-[420px] items-end overflow-hidden">
        <Image
          src="/images/colazione/colazione bio agriturismo la mora.webp"
          alt="Colazione biologica servita ad Agriturismo La Mora"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.75) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-14 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">Colazione bio</span>
          <h1 className="mt-4 font-display text-[clamp(34px,5.5vw,56px)] font-normal leading-[1.1] text-cream [text-wrap:balance]">
            Marmellate fatte in casa, non un buffet da hotel.
          </h1>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <article>
              <p className="text-[15px] leading-[1.85] text-ink-soft">
                La colazione a La Mora è biologica e preparata in casa: marmellate fatte da noi, frutta di stagione,
                olio extravergine di oliva della struttura. Non è un buffet standardizzato — cambia con quello che
                offre la stagione e con quello che raccogliamo o produciamo direttamente.
              </p>
              <p className="mt-5 text-[15px] leading-[1.85] text-ink-soft">
                A richiesta, caffè, cappuccino, tè o ginseng vengono preparati al momento. Chi vuole un pasto più
                sostanzioso può aggiungere una colazione salata, con un supplemento a persona.
              </p>
              <p className="mt-5 text-[15px] leading-[1.85] text-ink-soft">
                Si serve ogni mattina dalle 7:00 alle 9:30, nella sala comune della struttura — comoda anche per chi
                deve partire presto verso Assisi o l&apos;aeroporto di Perugia.
              </p>
            </article>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[3px]">
              <Image
                src="/images/colazione/sala con colazione pronta agriturismo.webp"
                alt="Sala comune con la colazione pronta ad Agriturismo La Mora"
                fill
                sizes="(max-width: 1024px) 100vw, 660px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <aside className="rounded-[3px] border border-ink/10 bg-cream-dim px-7 py-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">In breve</span>
              <dl className="mt-5 space-y-5 border-t border-ink/10 pt-5">
                {FACTS.map((f) => (
                  <div key={f.label}>
                    <dt className="text-[11px] uppercase tracking-[0.06em] text-ink-soft">{f.label}</dt>
                    <dd className="mt-1 font-display text-[19px] text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[12px] leading-[1.6] text-ink-soft">
                L&apos;offerta varia in base alla stagionalità e ai prodotti disponibili in azienda.
              </p>
              <a
                href="https://wa.me/393934363917?text=Ciao!%20Avrei%20una%20domanda%20sulla%20colazione."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-6 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8a3844" />
                <span className="relative z-10">Scrivici su WhatsApp</span>
              </a>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
