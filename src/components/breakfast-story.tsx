import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

/* Sezione Colazione/gestione familiare: composizione invertita rispetto a
   StructureHighlights (testo prima, foto dopo, più piccola e centrata) —
   editoriale e intima, non una scheda prezzi. Foto reale non ancora usata
   altrove (StructureHighlights usa l'altra foto colazione disponibile). */
export function BreakfastStory() {
  return (
    <section aria-labelledby="breakfast-heading" className="bg-cream pb-24 pt-10 sm:pb-32 sm:pt-12">
      <div className="mx-auto grid max-w-[1100px] gap-14 px-6 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
        <Reveal>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Colazione</span>
          <h2
            id="breakfast-heading"
            className="mt-5 font-display text-[clamp(28px,3vw,42px)] font-normal leading-[1.18] text-ink [text-wrap:balance]"
          >
            Ogni mattina, tra le 7 e le 9:30, la tavola è pronta con quello che il giorno offre.
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-[1.7] text-ink-soft">
            <p>
              Marmellate fatte in casa, frutta di stagione, il dolce e — su richiesta — il salato. A prepararla sono
              Giuseppina e Paolo, la stessa famiglia che gestisce La Mora da anni: non un buffet impersonale, ma una
              colazione biologica pensata giorno per giorno su quello che la campagna umbra offre in quel momento.
            </p>
          </div>
          <Link
            href="/agriturismo-con-colazione-inclusa-assisi/"
            className="group mt-8 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-raspberry underline decoration-raspberry/40 underline-offset-4 transition-colors hover:text-[#8a3844]"
          >
            Scopri la colazione bio
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>

        <Reveal delay={140} className="mx-auto w-full max-w-[380px] lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.3)]">
            <Image
              src="/images/colazione/sala con colazione pronta agriturismo.webp"
              alt="Tavolo apparecchiato per la colazione biologica di Agriturismo La Mora"
              fill
              sizes="(max-width: 1024px) 80vw, 420px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
