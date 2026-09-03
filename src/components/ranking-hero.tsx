import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { CountUp } from "@/components/count-up";
import { StarRow } from "@/components/review-icons";
import { LaurelMedallion } from "@/components/laurel-medallion";

/* Rifatta da zero (richiesta esplicita): via il pannello fotografico e il
   badge "certificato" (immagine che riusava il logo Tripadvisor — mai
   davvero risolto il problema di brand, la soluzione corretta è non
   usarlo affatto). Ora: nessuna foto, una medaglia originale disegnata a
   corona d'alloro come protagonista visivo, sfondo scuro pieno e un
   bagliore dorato appena percettibile dietro — l'obiettivo è "sembrare un
   riconoscimento importante", non un banner. Testo ridotto all'essenziale:
   niente paragrafo lungo, solo i fatti (posizione, valutazione, il
   vantaggio del diretto in una riga sola). */
const TRIPADVISOR_URL = "https://www.tripadvisor.it/ShowUserReviews-g187905-d1021888-r1068110253";

export function RankingHero() {
  return (
    <section id="section-ranking" aria-labelledby="ranking-heading" className="relative overflow-hidden bg-[#1f180e] py-24 sm:py-28">
      <h2 id="ranking-heading" className="sr-only">
        Agriturismo La Mora è il numero 1 su TripAdvisor tra 38 agriturismi ad Assisi
      </h2>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(182,146,60,0.16) 0%, rgba(182,146,60,0) 72%)" }}
      />

      <div className="relative z-[1] mx-auto flex max-w-[560px] flex-col items-center px-6 text-center sm:px-10">
        <Reveal>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Riconoscimenti</span>
        </Reveal>

        <Reveal delay={100}>
          <LaurelMedallion size={188} className="mt-8 text-gold" />
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-2 font-display text-[19px] font-normal leading-[1.3] text-cream [text-wrap:balance]">
            Su <CountUp to={38} className="tabular-nums" /> agriturismi ad Assisi
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-5 flex flex-col items-center gap-2">
            <StarRow rating={5} size={15} />
            <span className="text-[10px] uppercase tracking-[0.12em] text-cream/50">Secondo le recensioni TripAdvisor</span>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <p className="mt-6 max-w-[380px] text-[14px] leading-[1.7] text-cream/65">
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
