import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { LocationMap } from "@/components/location-map";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";

export const metadata: Metadata = {
  title: "Attività",
  description:
    "Cosa fare in agriturismo ad Assisi: piscina panoramica, noleggio e-bike, parco giochi per famiglie e i cavalli dell'azienda agricola di Agriturismo La Mora.",
  alternates: { canonical: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
};

const EBIKE_PRICES = [
  { duration: "Mezza giornata", price: "15€" },
  { duration: "Giornata intera", price: "25€" },
  { duration: "Weekend", price: "40€" },
  { duration: "7 giorni", price: "90€" },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "È possibile noleggiare le e-bike?",
    answer:
      "Sì, direttamente in struttura: consegna e ritiro con Paolo, contatto diretto al +39 393 4363917. Il listino va da 15€ per mezza giornata a 90€ per 7 giorni.",
  },
  {
    question: "La piscina è adatta alle famiglie?",
    answer:
      "Sì: è panoramica, con sedute all'ombra intorno, aperta dal 1° maggio al 28 settembre dalle 9:00 alle 19:00. Accanto ci sono il parco giochi e il campo da calcetto in erba naturale.",
  },
  {
    question: "Ci sono attività per i bambini?",
    answer: "Il parco giochi con altalene e scivoli è sempre disponibile per gli ospiti, il babysitting è organizzabile su richiesta e la culla si aggiunge a 10€ a soggiorno.",
  },
  {
    question: "È possibile andare a cavallo?",
    answer:
      "No: i cavalli fanno parte della nostra azienda agricola e gli ospiti possono vederli e avvicinarli, ma non organizziamo lezioni di equitazione né passeggiate a cavallo.",
  },
  {
    question: "Cosa si può visitare partendo da La Mora?",
    answer:
      "Assisi è a pochi minuti, e da qui si raggiungono facilmente anche Santa Maria degli Angeli, Spello e Perugia — a piedi, in auto o in e-bike.",
  },
  {
    question: "Le attività vanno prenotate?",
    answer:
      "Piscina e parco giochi sono sempre a disposizione degli ospiti. E-bike e babysitting vanno concordati in anticipo, scrivendoci su WhatsApp o per telefono.",
  },
];

/* Pagina "Attività": sequenza narrativa (non una lista di servizi) che
   attraversa relax, natura, famiglia, e-bike, territorio ed esperienza —
   stessa disciplina già stabilita sui cavalli (vedi sezione dedicata: MAI
   lezioni/passeggiate, solo "vederli/avvicinarli", correzione esplicita
   del titolare). Listino e-bike ridisegnato come tabella tipografica reale
   (dati da PROJECT-BRIEF.md), non la locandina fotografata così com'è. */
export default function AttivitaPage() {
  return (
    <>
      {/* 1. Hero immersiva */}
      <section className="relative flex h-[92vh] min-h-[600px] items-end overflow-hidden">
        <Image
          src="/images/piscina/piscina agriturismo la mora.webp"
          alt="Piscina panoramica di Agriturismo La Mora"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.35) 60%, rgba(20,14,7,.78) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-16 text-center sm:px-10 sm:pb-20">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/80">
              Agriturismo La Mora · Assisi
            </span>
            <h1 className="mt-5 font-display text-[clamp(38px,6.5vw,70px)] font-normal leading-[1.08] text-cream [text-wrap:balance]">
              Esperienze da vivere.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* 2. Intro editoriale su sfondo verde */}
      <section className="bg-olive-950 py-24 sm:py-32">
        <div className="mx-auto flex max-w-[720px] flex-col items-center px-6 text-center sm:px-10">
          <Reveal>
            <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-[3px] shadow-[0_35px_70px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/piscina/foto esterno prato verde con panchina in legno e campo da calcio.webp"
                alt="Prato verde di Agriturismo La Mora"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-12 font-display text-[clamp(22px,3.2vw,32px)] font-normal italic leading-[1.5] text-[#f1f1f1] [text-wrap:balance]">
              A La Mora, spesso le esperienze migliori sono le più semplici: stare all&apos;aperto, rallentare,
              lasciare che il verde intorno faccia il suo lavoro — e da qui, partire alla scoperta di Assisi quando
              se ne ha voglia.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. E-bike */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[4/5]">
              <Image
                src="/images/servizi-extra/e-bike/immagine di due persone con ebike.webp"
                alt="Noleggio e-bike di Agriturismo La Mora"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">E-bike</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Il modo più semplice per esplorare la campagna umbra.
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
              Le e-bike si noleggiano direttamente in struttura, consegna e ritiro con Paolo: comode per raggiungere
              Assisi senza pensare al parcheggio, o per allontanarsi tra gli ulivi senza fatica, anche per chi non è
              allenato.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ink/10 pt-6 sm:max-w-[360px]">
              {EBIKE_PRICES.map((p) => (
                <div key={p.duration} className="flex items-baseline justify-between gap-3 border-b border-ink/10 pb-2">
                  <dt className="text-[12px] text-ink-soft">{p.duration}</dt>
                  <dd className="font-display text-[19px] text-ink">{p.price}</dd>
                </div>
              ))}
            </dl>

            <a
              href="https://wa.me/393934363917?text=Ciao!%20Vorrei%20informazioni%20sul%20noleggio%20e-bike."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Scopri il noleggio e-bike
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 4. Piscina e relax */}
      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal className="order-2 sm:order-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Piscina e relax</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Il centro delle giornate, da maggio a settembre.
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
              Panoramica, circondata dal verde, con sedute all&apos;ombra per chi preferisce restare a guardare. È lo
              spazio dove le famiglie si ritrovano nel pomeriggio e dove una giornata ad Assisi si chiude, prima di
              cena.
            </p>
            <p className="mt-3 text-[13px] uppercase tracking-[0.06em] text-ink-soft">Orario apertura: 09:00 – 19:00</p>
            <Link
              href="/piscina/"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Scopri la piscina
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={100} className="order-1 sm:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/piscina/piscina agriturismo la mora lato.jpeg"
                alt="Piscina panoramica di Agriturismo La Mora, vista laterale"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Famiglie e spazi all'aperto */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/piscina/esterno parco agriturismo con scivolo per bambini.jpg"
                alt="Parco giochi per bambini di Agriturismo La Mora"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Famiglie</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Spazio per i bambini, senza smettere di essere un agriturismo vero.
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
              Altalene, scivoli, un prato dove correre senza sorvegliare ogni passo. Per chi vuole una sera solo per
              sé, il babysitting è disponibile su richiesta. Non è un parco tematico: è il giardino di una casa,
              aperto a chi arriva.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6. I cavalli */}
      <section className="relative flex h-[80vh] min-h-[520px] items-center overflow-hidden">
        <Image
          src="/images/servizi-extra/equitazione/foto di un cavallo agriturismo la mora.jpeg"
          alt="Uno dei cavalli dell'azienda agricola di Agriturismo La Mora"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(20,14,7,.72) 0%, rgba(20,14,7,.15) 55%, rgba(20,14,7,.1) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <div className="max-w-[380px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">I cavalli</span>
              <p className="mt-4 font-display text-[clamp(22px,2.8vw,30px)] font-normal leading-[1.4] text-cream [text-wrap:balance]">
                Fanno parte dell&apos;azienda agricola. Gli ospiti possono vederli, avvicinarli — non organizziamo
                lezioni di equitazione né passeggiate a cavallo.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. Vivere il territorio */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal className="order-2 sm:order-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Oltre la struttura</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Le attività qui sono un punto di partenza, non il punto d&apos;arrivo.
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
              Una mattina in piscina, un giro in e-bike nel pomeriggio, e Assisi resta a pochi minuti per il resto
              della giornata — con la campagna umbra tutt&apos;intorno a fare da cornice a entrambe le cose.
            </p>
            <Link
              href="/territorio/"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8f4324" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Scopri il territorio
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={100} className="order-1 sm:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/territorio/assisi/eremo delle carceri assisi.jpg"
                alt="Eremo delle Carceri sul Monte Subasio, vicino Assisi"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Pausa fotografica full-screen */}
      <section className="relative flex h-[76vh] min-h-[480px] items-center justify-center overflow-hidden">
        <Image
          src="/images/piscina/piscina agriturismo la mora di notte.jpeg"
          alt="Piscina di Agriturismo La Mora illuminata di sera"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
        <Reveal>
          <p className="relative z-[1] mx-auto max-w-[560px] px-6 text-center font-display text-[clamp(24px,3.4vw,36px)] font-normal italic leading-[1.4] text-cream [text-wrap:balance]">
            Non tutto quello che si vive qui si vede in una fotografia.
          </p>
        </Reveal>
      </section>

      {/* 9. FAQ */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <Reveal>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Domande frequenti</span>
              <h2 className="mt-4 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                Le domande che ci fate più spesso sulle attività.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <FaqAccordion items={FAQ_ITEMS} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Dove siamo / mappa — stessa sezione della homepage */}
      <LocationMap />

      {/* Newsletter — stessa sezione della homepage */}
      <NewsletterSection />

      {/* Certificazioni — stessa sezione della homepage */}
      <CertificationsMarquee />
    </>
  );
}
