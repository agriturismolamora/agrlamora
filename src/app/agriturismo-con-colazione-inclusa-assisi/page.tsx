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
  title: "Colazione Bio",
  description:
    "Colazione biologica dalle 7:00 alle 9:30 ad Assisi: marmellate fatte in casa, frutta di stagione, olio EVO. Dolce 5€/persona/giorno, supplemento salata +10€, inclusa per chi prenota diretto.",
  alternates: { canonical: "/agriturismo-con-colazione-inclusa-assisi/" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "A che ora si serve la colazione?",
    answer:
      "Ogni mattina dalle 7:00 alle 9:30, nella sala comune della struttura — comoda anche per chi deve partire presto verso Assisi o l'aeroporto di Perugia.",
  },
  {
    question: "La colazione è inclusa nel prezzo della camera?",
    answer:
      "Dipende dalla tariffa scelta: alcune tariffe dirette la includono già (vale anche per la promozione Ottavo Centenario). Se non è inclusa, si aggiunge a parte: 5€ a persona al giorno per la colazione dolce, +10€ a persona per il supplemento salata.",
  },
  {
    question: "Cosa include la colazione dolce?",
    answer:
      "Marmellate e dolci fatti in casa, frutta di stagione, olio EVO della struttura. Caffè, cappuccino, tè o ginseng vengono preparati al momento, su richiesta.",
  },
  {
    question: "Il menu cambia durante l'anno?",
    answer:
      "Sì: l'offerta varia in base alla stagionalità e ai prodotti disponibili in azienda, non è un buffet standardizzato uguale tutto l'anno.",
  },
];

export default function ColazioneBioPage() {
  return (
    <>
      {/* 1. Hero immersiva */}
      <section className="relative flex h-[86vh] min-h-[560px] items-end overflow-hidden">
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
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.35) 60%, rgba(20,14,7,.78) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-16 text-center sm:px-10 sm:pb-20">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/80">
              Colazione bio · Agriturismo La Mora
            </span>
            <h1 className="mt-5 font-display text-[clamp(34px,6vw,60px)] font-normal leading-[1.1] text-cream [text-wrap:balance]">
              Marmellate fatte in casa, non un buffet da hotel.
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
                src="/images/colazione/sala con colazione pronta agriturismo.webp"
                alt="Sala comune con la colazione pronta ad Agriturismo La Mora"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-12 font-display text-[clamp(22px,3.2vw,32px)] font-normal italic leading-[1.5] text-[#f1f1f1] [text-wrap:balance]">
              È biologica e preparata in casa: marmellate fatte da noi, frutta di stagione, olio extravergine della
              struttura. Cambia con quello che offre la stagione, non con un listino fisso.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Cosa portiamo in tavola / Dove e quando */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11]">
                <Image
                  src="/images/colazione/colazione bio agriturismo la mora.webp"
                  alt="Marmellate fatte in casa e prodotti della colazione bio di Agriturismo La Mora"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
              <div className="order-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
                  Cosa portiamo in tavola
                </span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  Quello che raccogliamo e produciamo noi, prima di tutto.
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
                  Marmellate e dolci fatti in casa, frutta di stagione, olio extravergine di oliva della struttura.
                  Non è un buffet standardizzato uguale ogni giorno dell&apos;anno — cambia con quello che c&apos;è
                  davvero in azienda in quel momento.
                </p>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
                  A richiesta, caffè, cappuccino, tè o ginseng vengono preparati al momento. Chi vuole un pasto più
                  sostanzioso può aggiungere una colazione salata, con un supplemento a persona.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-20 grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16 sm:mt-24">
              <div className="order-2 sm:order-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
                  Dove e quando
                </span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  Nella sala comune, con calma, prima di uscire.
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
                  Si serve ogni mattina dalle 7:00 alle 9:30 nella sala comune della struttura — comoda anche per chi
                  deve partire presto verso Assisi, l&apos;aeroporto di Perugia o la giornata in campagna.
                </p>
              </div>
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:order-2 sm:aspect-[16/11]">
                <Image
                  src="/images/colazione/sala con colazione pronta agriturismo.webp"
                  alt="Sala comune con la colazione pronta ad Agriturismo La Mora"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. In breve — orario e prezzi */}
      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <Reveal>
            <dl className="grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 text-center sm:grid-cols-3">
              {[
                { value: "07:00–09:30", label: "Orario", detail: "Ogni mattina, nella sala comune della struttura." },
                { value: "5€", label: "Colazione dolce", detail: "A persona, al giorno — dove non è già inclusa nella tariffa." },
                { value: "+10€", label: "Supplemento salata", detail: "A persona, per chi vuole un pasto più sostanzioso." },
              ].map((point) => (
                <div key={point.label}>
                  <dt className="font-display text-4xl text-raspberry">{point.value}</dt>
                  <dd className="mt-3">
                    <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-ink">
                      {point.label}
                    </span>
                    <span className="mt-2 block text-[13px] leading-[1.6] text-ink-soft">{point.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mx-auto mt-10 max-w-[520px] text-center text-[12px] leading-[1.7] text-ink-soft/80">
              L&apos;offerta varia in base alla stagionalità e ai prodotti disponibili in azienda.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. Ponte verso la promo Ottavo Centenario */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-10 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11]">
              <Image
                src="/images/ottavo centenario san francesco/basilica di san francesco di assisi ottavo centenario.webp"
                alt="Basilica di San Francesco d'Assisi"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Prenotazione diretta</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Colazione inclusa, per chi prenota direttamente.
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
              Per l&apos;Ottavo Centenario di San Francesco, la colazione bio è inclusa a chi scrive direttamente a
              noi invece di passare da un intermediario — valida su ogni prenotazione diretta, non solo durante le
              celebrazioni.
            </p>
            <Link
              href="/ottavo-centenario-san-francesco/"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Scopri la promozione
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 6. Pausa fotografica: colazione, poi Assisi */}
      <section className="relative flex h-[64vh] min-h-[440px] items-center justify-center overflow-hidden">
        <Image
          src="/images/territorio/assisi/assisi con tramonto.jpg"
          alt="Assisi al tramonto, vista dalla campagna umbra"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
        <div className="relative z-[1] mx-auto max-w-[520px] px-6 text-center sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(26px,3.4vw,36px)] font-normal leading-[1.3] text-cream [text-wrap:balance]">
              Colazione con calma, poi si parte per Assisi.
            </h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-cream/75">
              Il centro storico è a pochi minuti: si fa colazione presto e si arriva in tempo per una mattinata
              tranquilla, prima dell&apos;afflusso dei bus turistici.
            </p>
            <Link
              href="/territorio/"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Scopri il territorio
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <Reveal>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Domande frequenti</span>
              <h2 className="mt-4 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                Le domande che ci fate più spesso.
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
