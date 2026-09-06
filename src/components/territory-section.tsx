import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

/* Territorio: griglia asimmetrica con gerarchia geografica (Assisi grande,
   dintorni più piccoli) invece di una lista di destinazioni. Copy scritto
   per essere estraibile da motori di ricerca AI-based: frasi autocontenute
   con nome del luogo e distanza/relazione con Assisi, mai un solo blocco
   generico. */
const TEXT: Record<Locale, { label: string; heading: string; body: string; assisi: string; eremo: string; perugia: string; cta: string }> = {
  it: {
    label: "Il territorio",
    heading: "Assisi a 5 km. Il resto dell'Umbria si scopre da qui.",
    body: "Agriturismo La Mora è a soli 5 km dal centro di Assisi e a 2 km dalla stazione ferroviaria, comodo anche per chi arriva in treno. Da qui, la Basilica di San Francesco, la Basilica di Santa Maria degli Angeli e l'Eremo delle Carceri sono raggiungibili in pochi minuti d'auto. Perugia è a distanza di una gita di mezza giornata, e borghi come Spello restano tappe naturali per chi si ferma più di qualche notte.",
    assisi: "Assisi",
    eremo: "Eremo delle Carceri",
    perugia: "Perugia",
    cta: "Scopri il territorio",
  },
  en: {
    label: "The area",
    heading: "Assisi 5 km away. The rest of Umbria unfolds from here.",
    body: "Agriturismo La Mora is just 5 km from the centre of Assisi and 2 km from the train station, convenient for those arriving by rail. From here, the Basilica of St. Francis, the Basilica of Santa Maria degli Angeli and the Eremo delle Carceri are minutes away by car. Perugia makes a good half-day trip, and villages like Spello are a natural stop for those staying a few extra nights.",
    assisi: "Assisi",
    eremo: "Eremo delle Carceri",
    perugia: "Perugia",
    cta: "Discover the area",
  },
  fr: {
    label: "Le territoire",
    heading: "Assise à 5 km. Le reste de l'Ombrie se découvre d'ici.",
    body: "Agriturismo La Mora est à seulement 5 km du centre d'Assise et à 2 km de la gare, pratique pour ceux qui arrivent en train. D'ici, la Basilique Saint-François, la Basilique Sainte-Marie-des-Anges et l'Ermitage des Prisons sont à quelques minutes en voiture. Pérouse se visite en une demi-journée, et des bourgs comme Spello sont des étapes naturelles pour un séjour de plusieurs nuits.",
    assisi: "Assise",
    eremo: "Ermitage des Prisons",
    perugia: "Pérouse",
    cta: "Découvrir le territoire",
  },
  de: {
    label: "Die Umgebung",
    heading: "Assisi 5 km entfernt. Der Rest Umbriens erschließt sich von hier aus.",
    body: "Agriturismo La Mora liegt nur 5 km vom Zentrum Assisis und 2 km vom Bahnhof entfernt, praktisch für alle, die mit dem Zug anreisen. Von hier aus sind die Basilika des Heiligen Franziskus, die Basilika Santa Maria degli Angeli und die Eremo delle Carceri in wenigen Autominuten erreichbar. Perugia eignet sich für einen Halbtagesausflug, und Orte wie Spello sind naheliegende Ziele für einen längeren Aufenthalt.",
    assisi: "Assisi",
    eremo: "Eremo delle Carceri",
    perugia: "Perugia",
    cta: "Die Umgebung entdecken",
  },
};

export function TerritorySection({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  return (
    <section id="section-territorio" aria-labelledby="territory-heading" className="bg-olive-950 py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-[1300px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[700px] text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/70">{text.label}</span>
          <h2
            id="territory-heading"
            className="mt-5 font-display text-[clamp(30px,3.4vw,48px)] font-normal leading-[1.15] text-cream [text-wrap:balance]"
          >
            {text.heading}
          </h2>
          <p className="mt-6 text-[15px] leading-[1.7] text-cream/75">
            {text.body}
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
              {text.assisi}
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
              <span className="absolute bottom-4 left-4 font-display text-lg text-cream">{text.eremo}</span>
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
              <span className="absolute bottom-4 left-4 font-display text-lg text-cream">{text.perugia}</span>
            </Reveal>
          </div>
        </div>

        <Reveal delay={300} className="mt-10 flex justify-center">
          <Link
            href={withLocale(locale, "/territorio/")}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
          >
            <HoverFill color="#8a3844" />
            <span className="relative z-10 inline-flex items-center gap-2.5">
              {text.cta}
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
