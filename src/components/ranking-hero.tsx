import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { CountUp } from "@/components/count-up";
import { StarRow } from "@/components/review-icons";

/* Impaginazione confermata dal titolare, sfondo passato da scuro a chiaro
   (l'inchiostro scuro del badge non si leggeva su sfondo scuro) e la
   medaglia disegnata sostituita di nuovo dal badge reale fornito dal
   titolare. Nota per il futuro: quel badge riutilizza il logo/marchio
   TripAdvisor in una grafica auto-prodotta ("Miglior Prezzo" non è una
   categoria di premio che TripAdvisor rilascia davvero) — rischio di
   marchio già segnalato esplicitamente al titolare; usato qui su sua
   richiesta ripetuta ed esplicita, non una scelta presa di iniziativa. */
const TRIPADVISOR_URL = "https://www.tripadvisor.it/ShowUserReviews-g187905-d1021888-r1068110253";

export function RankingHero() {
  return (
    <section id="section-ranking" aria-labelledby="ranking-heading" className="relative overflow-hidden bg-cream-dim py-24 sm:py-28">
      <h2 id="ranking-heading" className="sr-only">
        Agriturismo La Mora è il numero 1 su TripAdvisor tra 38 agriturismi ad Assisi
      </h2>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(182,146,60,0.14) 0%, rgba(182,146,60,0) 72%)" }}
      />

      <div className="relative z-[1] mx-auto flex max-w-[560px] flex-col items-center px-6 text-center sm:px-10">
        <Reveal>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-olive-950">Riconoscimenti</span>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 w-full max-w-[240px]">
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
          <p className="mt-2 font-display text-[19px] font-normal leading-[1.3] text-ink [text-wrap:balance]">
            Su <CountUp to={38} className="tabular-nums" /> agriturismi ad Assisi
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-5 flex flex-col items-center gap-2">
            <StarRow rating={5} size={15} />
            <span className="text-[10px] uppercase tracking-[0.12em] text-ink-soft">Secondo le recensioni TripAdvisor</span>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <p className="mt-6 max-w-[380px] text-[14px] leading-[1.7] text-ink-soft">
            Non lo diciamo noi: sono le recensioni degli ospiti a metterci al primo posto — e a dirti che, prenotando
            diretto, hai anche il prezzo migliore.
          </p>
        </Reveal>

        <Reveal delay={440}>
          <Link
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
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
    </section>
  );
}
