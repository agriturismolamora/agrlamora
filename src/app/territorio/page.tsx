import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

export const metadata: Metadata = {
  title: "Territorio",
  description:
    "Assisi, Santa Maria degli Angeli, Spello, Perugia: la guida al territorio umbro intorno ad Agriturismo La Mora, base ideale per visitare Assisi e dintorni.",
  alternates: { canonical: "/territorio/" },
};

/* `credit` compare solo sulle foto NON scattate dalla struttura: Piazza del
   Comune, Rocca Maggiore e Rocca Minore vengono da Wikimedia Commons
   (nessuna foto reale della struttura disponibile per questi 3 luoghi),
   con licenza verificata singolarmente — mai foto stock generiche, sempre
   fotografie reali e specifiche dei luoghi con licenza libera che ne
   permette l'uso, attribuite come richiesto dalla licenza. */
type Place = { name: string; src: string; alt: string; note: string; credit?: string };

const ASSISI_PLACES: Place[] = [
  {
    name: "Basilica di San Francesco",
    src: "/images/territorio/assisi/basilica di assisi.jpg",
    alt: "Basilica di San Francesco ad Assisi",
    note: "Il cuore della città, patrimonio UNESCO: gli affreschi di Giotto nella Basilica Superiore sono tra i motivi principali per cui si viene ad Assisi.",
  },
  {
    name: "Basilica di Santa Maria degli Angeli",
    src: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg",
    alt: "Basilica di Santa Maria degli Angeli con la Porziuncola",
    note: "Custodisce al suo interno la Porziuncola, la piccola chiesa dove San Francesco fondò l'ordine francescano. A pochi minuti dalla struttura.",
  },
  {
    name: "Eremo delle Carceri",
    src: "/images/territorio/assisi/eremo delle carceri assisi.jpg",
    alt: "Eremo delle Carceri sul Monte Subasio",
    note: "Il romitorio dove Francesco si ritirava in preghiera, immerso nel bosco del Monte Subasio: una tappa più silenziosa, lontana dal centro.",
  },
  {
    name: "Bosco di San Francesco",
    src: "/images/territorio/assisi/bosco di san francesco assisi.jpg",
    alt: "Bosco di San Francesco, area naturale protetta dal FAI",
    note: "Un percorso naturalistico gestito dal FAI, tra uliveti, bosco e il torrente Tescio: una passeggiata diversa dal centro storico.",
  },
  {
    name: "Santuario di San Damiano",
    src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg",
    alt: "Santuario di San Damiano nei dintorni di Assisi",
    note: "Dove Francesco udì il celebre invito a 'riparare la mia chiesa' e dove Chiara d'Assisi visse gran parte della sua vita.",
  },
  {
    name: "Piazza del Comune",
    src: "/images/territorio/assisi/piazza del comune assisi.jpg",
    alt: "Piazza del Comune ad Assisi, con il Tempio di Minerva",
    note: "Il centro laico della città medievale, con il Tempio di Minerva e la Torre del Popolo: da qui si irradiano le vie del centro storico.",
    credit: "Berthold Werner, Wikimedia Commons (pubblico dominio)",
  },
  {
    name: "Rocca Maggiore",
    src: "/images/territorio/assisi/rocca maggiore assisi.jpg",
    alt: "Rocca Maggiore, la fortezza medievale che domina Assisi",
    note: "La fortezza che domina Assisi dall'alto da otto secoli, con una vista che arriva fino alla Valle Umbra.",
    credit: "Superchilum, Wikimedia Commons (CC BY-SA 3.0)",
  },
  {
    name: "Rocca Minore",
    src: "/images/territorio/assisi/rocca minore assisi.jpg",
    alt: "Rocca Minore, la fortificazione minore di Assisi verso nord-est",
    note: "La più piccola delle due rocche cittadine, verso nord-est: meno visitata, ma con la stessa vista sulla città.",
    credit: "LigaDue, Wikimedia Commons (CC BY 3.0)",
  },
];

const DINTORNI_PLACES: Place[] = [
  {
    name: "Monte Subasio",
    src: "/images/territorio/dintorni/monte subasio alto.jpg",
    alt: "Monte Subasio, il massiccio che domina Assisi",
    note: "Il parco naturale che sovrasta Assisi: sentieri per camminare o pedalare, e i pascoli d'altura che hanno dato il nome al formaggio locale.",
  },
  {
    name: "Cascate delle Marmore",
    src: "/images/territorio/dintorni/cascate delle marmore.jpg",
    alt: "Cascate delle Marmore in Umbria",
    note: "Tra le cascate artificiali più alte d'Europa, a circa un'ora d'auto: una gita di mezza giornata per chi si ferma qualche notte in più.",
  },
];

export default function TerritorioPage() {
  return (
    <>
      <section className="relative flex h-[64vh] min-h-[460px] items-end overflow-hidden">
        <Image
          src="/images/territorio/assisi/assisi con tramonto.jpg"
          alt="Assisi al tramonto vista dalla campagna umbra"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.78) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-14 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">Il territorio</span>
          <h1 className="mt-4 font-display text-[clamp(34px,5.5vw,58px)] font-normal leading-[1.1] text-cream [text-wrap:balance]">
            Assisi fuori dalla finestra. L&apos;Umbria tutt&apos;intorno.
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.7] text-cream/80">
            La Mora è a pochi minuti da Assisi, in posizione comoda anche per Santa Maria degli Angeli, Spello e
            Perugia. Una base per muoversi, non solo per dormire.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Assisi</span>
            <h2 className="mt-4 max-w-[600px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              La città di Francesco, a pochi minuti dalla struttura.
            </h2>
          </Reveal>

          <div className="mt-10 space-y-14">
            {ASSISI_PLACES.map((place, i) => (
              <Reveal key={place.name} delay={i * 40}>
                <div className={`grid grid-cols-1 items-center gap-8 sm:grid-cols-2 ${i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                    <Image src={place.src} alt={place.alt} fill sizes="(max-width: 640px) 100vw, 500px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display text-[22px] font-normal text-ink">{place.name}</h3>
                    <p className="mt-3 text-[14px] leading-[1.75] text-ink-soft">{place.note}</p>
                    {place.credit && <p className="mt-3 text-[11px] text-ink-soft/60">Foto: {place.credit}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Dintorni</span>
            <h2 className="mt-4 max-w-[600px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Oltre Assisi, l&apos;Umbria che si scopre in giornata.
            </h2>
            <p className="mt-5 max-w-[640px] text-[14px] leading-[1.75] text-ink-soft">
              A una quindicina di chilometri, <strong>Spello</strong> merita una tappa: un altro borgo medievale in
              pietra rosa, meno affollato di Assisi, noto per le Infiorate di giugno. Più lontano, il Monte Subasio e
              le Cascate delle Marmore allungano la giornata per chi si ferma qualche notte in più.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {DINTORNI_PLACES.map((place, i) => (
              <Reveal key={place.name} delay={i * 60}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                  <Image src={place.src} alt={place.alt} fill sizes="(max-width: 640px) 100vw, 500px" className="object-cover" />
                </div>
                <h3 className="mt-4 font-display text-[20px] font-normal text-ink">{place.name}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">{place.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Perugia</span>
            <h2 className="mt-4 max-w-[600px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Il capoluogo umbro, a mezz&apos;ora d&apos;auto.
            </h2>
            <p className="mt-5 max-w-[640px] text-[14px] leading-[1.75] text-ink-soft">
              Perugia ha un centro storico su un colle, l&apos;Acquedotto medievale trasformato in passeggiata sospesa e
              una vita universitaria che la rende diversa, più mossa, rispetto ad Assisi. L&apos;aeroporto dell&apos;Umbria
              (Perugia San Francesco d&apos;Assisi) è a soli 7 km dalla struttura.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-[3px]">
              <Image
                src="/images/territorio/perugia/perugia vista alto.jpg"
                alt="Vista dall'alto del centro storico di Perugia"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-14 sm:py-16">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <p className="text-[14px] leading-[1.8] text-ink-soft">
              Il 2026 aggiunge un motivo in più per visitare Assisi: leggi di più sull&apos;
              <Link href="/ottavo-centenario-san-francesco/" className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry">
                Ottavo Centenario di San Francesco
              </Link>
              . E se tra una tappa e l&apos;altra cercate qualcosa da fare senza uscire dalla struttura, trovate tutto
              nella pagina{" "}
              <Link href="/agriturismo-famiglie-ad-assisi-e-dintorni/" className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry">
                Attività
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#1f180e] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[480px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              Una base comoda per vedere tutto questo.
            </h2>
            <Link
              href="/alloggi/"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Scopri gli appartamenti
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
