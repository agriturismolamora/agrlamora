import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { PinnedHold } from "@/components/pinned-hold";
import { HoverFill } from "@/components/hover-fill";

/* Indice editoriale: foto fissa a piena altezza a sinistra (tocca il bordo
   del browser, nessun container che la isoli), lista a destra con 3 righe
   cliccabili separate da una linea orizzontale — solo tag+titolo, niente
   paragrafo sotto: la sezione resta corta verticalmente. Un solo CTA in
   fondo alla lista (non uno per riga) verso "Chi siamo".

   3 argomenti "fondamentali" scelti su richiesta esplicita — gli stessi
   temi prima raccontati in "Esperienze La Mora" (sezione eliminata: questo
   contenuto ci si sovrappone di proposito, non è un errore di ripetizione). */
const HERO_IMAGE = "/images/struttura/foto vista alto agriturismo la mora assisi.webp";
const HERO_ALT = "Vista dall'alto di Agriturismo La Mora, Assisi";

const SIGNATURES = [
  { tag: "01", title: "Colazione biologica", href: "/agriturismo-con-colazione-inclusa-assisi/" },
  { tag: "02", title: "Piscina panoramica", href: "/piscina/" },
  { tag: "03", title: "Il territorio di Assisi", href: "/territorio/" },
] as const;

export function StructureHighlights() {
  return (
    <section id="section-highlights" className="relative bg-cream lg:min-h-[140vh]">
      <PinnedHold>
        <div className="grid grid-cols-1 lg:h-[100svh] lg:grid-cols-2 lg:items-stretch">
          {/* Colonna fotografica: full-bleed, nessun container/padding a
              sinistra così tocca davvero il bordo del browser su desktop. */}
          <div className="relative order-1 aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:order-1 lg:aspect-auto lg:min-h-[560px]">
            <Reveal className="absolute inset-0" as="div">
              <Image
                src={HERO_IMAGE}
                alt={HERO_ALT}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          {/* Colonna editoriale. */}
          <div className="order-2 flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:order-2 lg:px-16 lg:py-20 xl:px-20">
            <Reveal>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Perché La Mora</span>
              <h2 className="mt-5 max-w-[440px] font-display text-[clamp(28px,3vw,42px)] font-normal leading-[1.15] text-ink [text-wrap:balance]">
                Non il solito agriturismo.
              </h2>
            </Reveal>

            <ul className="mt-8 flex flex-col divide-y divide-ink/10 border-t border-ink/10">
              {SIGNATURES.map((s, i) => (
                <Reveal key={s.title} as="li" delay={i * 100}>
                  <Link href={s.href} className="group flex items-baseline gap-5 py-5">
                    <span className="shrink-0 font-display text-sm text-ink-soft/50">{s.tag}</span>
                    <h3 className="font-display text-[24px] leading-[1.2] text-ink transition-colors group-hover:text-raspberry sm:text-[28px]">
                      {s.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="ml-auto text-ink-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-raspberry"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={300}>
              <Link
                href="/chi-siamo/"
                className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8a3844" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  Scopri chi siamo
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </PinnedHold>
    </section>
  );
}
