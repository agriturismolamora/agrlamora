import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

/* Territorio: griglia asimmetrica con gerarchia geografica (Assisi grande,
   dintorni più piccoli) invece di una lista di destinazioni. Copy scritto
   per essere estraibile da motori di ricerca AI-based: frasi autocontenute
   con nome del luogo e distanza/relazione con Assisi, mai un solo blocco
   generico. */
export function TerritorySection() {
  return (
    <section aria-labelledby="territory-heading" className="bg-olive-950 py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-[1300px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[700px] text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/70">Il territorio</span>
          <h2
            id="territory-heading"
            className="mt-5 font-display text-[clamp(30px,3.4vw,48px)] font-normal leading-[1.15] text-cream [text-wrap:balance]"
          >
            Assisi a 5 km. Il resto dell&apos;Umbria si scopre da qui.
          </h2>
          <p className="mt-6 text-[15px] leading-[1.7] text-cream/75">
            Agriturismo La Mora è a soli 5 km dal centro di Assisi e a 2 km dalla stazione ferroviaria, comodo anche
            per chi arriva in treno. Da qui, la Basilica di San Francesco, la Basilica di Santa Maria degli Angeli e
            l&apos;Eremo delle Carceri sono raggiungibili in pochi minuti d&apos;auto. Perugia è a distanza di una
            gita di mezza giornata, e borghi come Spello restano tappe naturali per chi si ferma più di qualche
            notte.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-20 lg:grid-cols-[1.6fr_1fr] lg:gap-6">
          {/* Assisi: foto dominante. */}
          <Reveal delay={80} className="relative aspect-[4/3] overflow-hidden rounded-[3px] lg:aspect-auto lg:h-full">
            <Image
              src="/images/territorio/assisi/basilica di assisi.jpg"
              alt="Basilica di San Francesco ad Assisi, a pochi minuti da Agriturismo La Mora"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{ background: "linear-gradient(0deg, rgba(28,33,23,.7) 0%, rgba(28,33,23,0) 45%)" }}
            />
            <span className="absolute bottom-5 left-5 font-display text-2xl text-cream sm:bottom-7 sm:left-7 sm:text-3xl">
              Assisi
            </span>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-6">
            <Reveal delay={160} className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
              <Image
                src="/images/territorio/assisi/eremo delle carceri assisi.jpg"
                alt="Eremo delle Carceri, sul Monte Subasio ad Assisi"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{ background: "linear-gradient(0deg, rgba(28,33,23,.7) 0%, rgba(28,33,23,0) 55%)" }}
              />
              <span className="absolute bottom-4 left-4 font-display text-lg text-cream">Eremo delle Carceri</span>
            </Reveal>
            <Reveal delay={240} className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
              <Image
                src="/images/territorio/perugia/perugia vista alto.jpg"
                alt="Perugia vista dall'alto, capoluogo dell'Umbria"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{ background: "linear-gradient(0deg, rgba(28,33,23,.7) 0%, rgba(28,33,23,0) 55%)" }}
              />
              <span className="absolute bottom-4 left-4 font-display text-lg text-cream">Perugia</span>
            </Reveal>
          </div>
        </div>

        <Reveal delay={300} className="mt-10 flex justify-center">
          <Link
            href="/territorio/"
            className="group inline-flex items-center gap-2.5 rounded-[3px] bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors duration-200 hover:bg-[#8a3844]"
          >
            Scopri il territorio
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
