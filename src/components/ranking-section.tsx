import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { PinnedHold } from "@/components/pinned-hold";
import { HoverFill } from "@/components/hover-fill";
import { CountUp } from "@/components/count-up";
import { StarRow } from "@/components/review-icons";

/* URL reale della pagina TripAdvisor della struttura, stessa fonte già
   usata in reviews-section.tsx (g187905 = Assisi, d1021888 = La Mora). */
const TRIPADVISOR_URL = "https://www.tripadvisor.it/ShowUserReviews-g187905-d1021888-r1068110253";

/* Sezione "riconoscimenti": sfondo chiaro coerente col resto del sito
   (cream-dim, la stessa variante "cambio di sezione" già usata da
   blog/reviews) — non più il bronzo scuro della prima versione. Il tono
   "premium" ora viene dalla cornice: una targa con bordo oro sottile che
   racchiude tutto il contenuto, come un vero attestato incorniciato,
   invece che da uno sfondo scuro drammatico. Il badge del certificato è
   disegnato in inchiostro scuro pensato per una superficie chiara: qui si
   legge direttamente, senza bisogno di una targa interna separata. Il "38"
   cresce con un conteggio animato al primo ingresso in viewport invece di
   comparire già scritto — l'unica animazione extra oltre al consueto
   Reveal, per restare premium senza diventare giocosa. */
export function RankingSection() {
  return (
    <section id="section-ranking" aria-labelledby="ranking-heading" className="relative overflow-hidden bg-cream-dim lg:min-h-[140vh]">
      <h2 id="ranking-heading" className="sr-only">
        Agriturismo La Mora è il numero 1 su TripAdvisor tra 38 agriturismi ad Assisi
      </h2>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(182,146,60,0.14) 0%, rgba(182,146,60,0) 70%)" }}
      />
      <PinnedHold>
        <div className="relative z-[2] mx-auto max-w-[640px] px-6 py-8 sm:px-10 sm:py-10">
          <div className="rounded-[2px] border border-gold/35 px-7 py-12 text-center sm:px-14 sm:py-14">
            <Reveal>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-olive-950">Riconoscimenti</span>
            </Reveal>

            <Reveal delay={100}>
              <div className="mx-auto mt-7 w-full max-w-[260px]">
                <Image
                  src="/certificazioni/agriturismo numero 1 ad assisi agriturismo la mora.png"
                  alt="Agriturismo La Mora — N.1 Agriturismo ad Assisi, miglior prezzo secondo TripAdvisor"
                  width={1536}
                  height={1024}
                  className="h-auto w-full"
                />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 font-display text-[clamp(20px,2.4vw,28px)] font-normal text-ink [text-wrap:balance]">
                Il numero uno su <CountUp to={38} className="tabular-nums" /> agriturismi ad Assisi
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-6 flex flex-col items-center gap-2.5">
                <StarRow rating={5} size={16} />
                <span className="text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  Secondo le recensioni TripAdvisor
                </span>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <p className="mx-auto mt-8 max-w-[460px] text-[15px] leading-[1.75] text-ink-soft">
                Non lo diciamo noi: sono gli ospiti, con le loro recensioni, ad averci messo al primo posto.
                Prenotando direttamente qui, senza intermediari che alzano il conto, hai anche il prezzo migliore.
              </p>
            </Reveal>

            <Reveal delay={440}>
              <Link
                href={TRIPADVISOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-10 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
              >
                <HoverFill color="#8f7330" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  Leggi le recensioni
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
