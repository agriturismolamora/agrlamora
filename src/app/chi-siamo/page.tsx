import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getGoogleReviews } from "@/lib/google-reviews";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { StarRow } from "@/components/review-icons";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { BlogSection } from "@/components/blog-section";
import { LocationMap } from "@/components/location-map";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description:
    "La storia di Agriturismo La Mora: una casa di famiglia ad Assisi, tra campagna umbra e ospitalità diretta. Chi la gestisce, perché esiste, come si vive oggi.",
  alternates: { canonical: "/chi-siamo/" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quanto dista La Mora da Assisi?",
    answer:
      "Il centro storico è a pochi minuti d'auto. La Basilica di Santa Maria degli Angeli è a 2,2 km, la stazione ferroviaria di Assisi a 2,9 km, l'aeroporto dell'Umbria a 10 km.",
  },
  {
    question: "La struttura è adatta alle famiglie?",
    answer:
      "Sì: parco giochi con altalene e scivoli, piscina panoramica e babysitting su richiesta. Diversi appartamenti hanno letti a castello pensati per i bambini.",
  },
  {
    question: "Sono ammessi animali?",
    answer:
      "In due appartamenti su cinque — Gemelli e Sagittario — entrambi con giardino privato recintato. Il costo è di 25€ a soggiorno, guinzaglio obbligatorio negli spazi comuni. Negli altri appartamenti sono ammessi solo animali di piccola taglia abituati a vivere in appartamento.",
  },
  {
    question: "È possibile prenotare direttamente?",
    answer:
      "Sì, scrivendo su WhatsApp o telefonando: rispondiamo noi, senza intermediari. Chi prenota diretto ha anche condizioni migliori rispetto alle piattaforme.",
  },
  {
    question: "Quali servizi sono inclusi negli appartamenti?",
    answer:
      "Cucina attrezzata, aria condizionata, Wi-Fi gratuito, TV con canali satellitari, cassaforte, biancheria da letto e da bagno — in ogni appartamento, senza distinzioni.",
  },
];

export default async function ChiSiamoPage() {
  const reviews = await getGoogleReviews();
  const paoloQuote = reviews.reviews.find((r) => /paolo/i.test(r.text));

  return (
    <>
      {/* 1. Hero immersiva */}
      <section className="relative flex h-[92vh] min-h-[600px] items-end overflow-hidden">
        <Image
          src="/images/home/foto dell agriturismo dall alto.webp"
          alt="Agriturismo La Mora visto dall'alto, nella campagna umbra vicino Assisi"
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
              Una casa di famiglia, prima che un agriturismo.
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
                src="/images/home/esterno agriturismo la mora carretto e agriturismo.webp"
                alt="Ingresso di Agriturismo La Mora con carretto d'epoca"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-12 font-display text-[clamp(22px,3.2vw,32px)] font-normal italic leading-[1.5] text-[#f1f1f1] [text-wrap:balance]">
              La Mora è una casa di famiglia immersa nella campagna umbra, a pochi minuti da Assisi. L&apos;ospitalità
              qui è diretta, personale — non un servizio, un&apos;abitudine di famiglia.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Storia / Origini */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11]">
                <Image
                  src="/images/struttura/foto vista alto agriturismo la mora assisi.webp"
                  alt="Il casale di Agriturismo La Mora visto dall'alto"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
              <div className="order-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Le origini</span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  Un vecchio casale, restituito alla vita.
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
                  Prima di essere un agriturismo, La Mora è un&apos;azienda agricola: terra vera, ulivi, un maneggio
                  con i cavalli. Il casale che oggi ospita gli appartamenti nasce dal recupero di un edificio rurale
                  della campagna umbra — non costruito per accogliere ospiti, ma trasformato per farlo restando
                  fedele a quello che era.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-20 grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16 sm:mt-24">
              <div className="order-2 sm:order-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">L&apos;evoluzione</span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  Da azienda agricola ad agriturismo di famiglia.
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
                  Col tempo, la casa si è aperta: cinque appartamenti indipendenti, ciascuno con la propria cucina e
                  il proprio ingresso, ricavati mantenendo lo spirito originario del casale. Non una catena, non un
                  format replicato — una decisione di famiglia, presa un ambiente alla volta.
                </p>
              </div>
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:order-2 sm:aspect-[16/11]">
                <Image
                  src="/images/struttura/immagine di una sala dell agriturismo.webp"
                  alt="Interno arredato di uno degli spazi comuni di Agriturismo La Mora"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. La Mora oggi */}
      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">La Mora oggi</span>
            <h2 className="mt-4 max-w-[620px] font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Piscina, campagna, famiglie, animali — una casa che si vive tutta.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-[3px] sm:mt-14">
              <Image
                src="/images/home/foto della piscina agriturismo la mora.webp"
                alt="Piscina panoramica di Agriturismo La Mora"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:mt-14 sm:grid-cols-4 sm:gap-8">
            {[
              {
                title: "Cinque appartamenti",
                text: "Indipendenti, ognuno con cucina propria e ingresso privato.",
                img: "/images/struttura/sala arredata di una delle stanze.jpeg",
                alt: "Interno arredato di uno degli appartamenti",
              },
              {
                title: "I cavalli",
                text: "Fanno parte dell'azienda agricola: gli ospiti possono vederli e avvicinarli.",
                img: "/images/home/foto dei cavalli.webp",
                alt: "I cavalli di Agriturismo La Mora",
              },
              {
                title: "Colazione bio",
                text: "Biologica, con dolci tipici umbri e frutta di stagione, ogni mattina.",
                img: "/images/colazione/colazione bio agriturismo la mora.webp",
                alt: "Colazione biologica di Agriturismo La Mora",
              },
              {
                title: "Assisi vicina",
                text: "A pochi minuti, base comoda per il centro storico e il territorio.",
                img: "/images/territorio/assisi/basilica di assisi.jpg",
                alt: "Basilica di San Francesco ad Assisi",
              },
            ].map((moment, i) => (
              <Reveal key={moment.title} delay={i * 60}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[3px]">
                  <Image src={moment.img} alt={moment.alt} fill sizes="(max-width: 640px) 45vw, 260px" className="object-cover" />
                </div>
                <h3 className="mt-3 font-display text-[15px] font-normal leading-[1.2] text-ink sm:text-[17px]">
                  {moment.title}
                </h3>
                <p className="mt-1.5 hidden text-[12px] leading-[1.6] text-ink-soft sm:block">{moment.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Il nostro modo di ospitare */}
      <section className="relative overflow-hidden bg-[#1f180e] py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-14 px-6 sm:grid-cols-[1fr_1fr] sm:gap-20 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/piscina/esterno parco agriturismo con casetta.webp"
                alt="Angolo di giardino di Agriturismo La Mora"
                fill
                sizes="(max-width: 640px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Il nostro modo di ospitare</span>
            <p className="mt-6 font-display text-[clamp(26px,3.4vw,38px)] font-normal leading-[1.35] text-cream [text-wrap:balance]">
              Non gestiamo un hotel. Viviamo qui, e apriamo la porta a chi arriva.
            </p>
            <p className="mt-6 max-w-[420px] text-[14px] leading-[1.8] text-cream/65">
              Nessun check-in impersonale, nessun copione. Se un letto in più serve, si aggiunge. Se un consiglio su
              dove mangiare ad Assisi può essere utile, lo diamo noi — non un cartello in camera. È un ritmo lento,
              pensato per chi vuole restare, non solo passare.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6. Assisi come parte dell'identità */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-10 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11]">
              <Image
                src="/images/territorio/assisi/assisi con tramonto.jpg"
                alt="Assisi al tramonto, vista dalla campagna umbra"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Assisi, non solo un indirizzo</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Si arriva per Assisi. Si resta per come ci si sente qui.
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
              La posizione non è un dettaglio: è parte di cosa siamo. Abbastanza vicini al centro storico per andarci
              a piedi o in bici, abbastanza fuori per tornare la sera in un posto silenzioso, con la campagna intorno
              invece del traffico turistico. È l&apos;equilibrio che rende un soggiorno qui diverso da un hotel in
              città.
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
        </div>
      </section>

      {/* 7. Persone / gestione familiare */}
      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-[440px_1fr] lg:gap-16">
          <Reveal>
            {/* Nessuna foto della famiglia disponibile: sezione progettata per
                accoglierla facilmente in futuro (basta sostituire questa
                immagine), nel frattempo usa la struttura come ancora visiva. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/struttura/foto dell esterno della struttura.webp"
                alt="Agriturismo La Mora, gestito dalla famiglia Mazzoli"
                fill
                sizes="(max-width: 640px) 100vw, 440px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Chi c&apos;è dietro La Mora</span>
            <p className="mt-5 font-display text-[22px] font-normal italic leading-[1.5] text-ink [text-wrap:balance]">
              &ldquo;La Mora la gestiamo noi, in famiglia — io, Paolo, e chi lavora con noi ogni giorno. Non è una
              frase di circostanza: quando scrivi, rispondiamo davvero noi.&rdquo;
            </p>
            {paoloQuote && (
              <div className="mt-8 border-l-2 border-gold pl-5">
                <StarRow rating={paoloQuote.rating} size={13} />
                <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">&ldquo;{paoloQuote.text}&rdquo;</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-ink-soft/70">
                  {paoloQuote.authorName} — Google
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* 8. FAQ */}
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

      {/* Blog — stessa sezione della homepage */}
      <BlogSection />

      {/* Dove siamo / mappa — stessa sezione della homepage */}
      <LocationMap />

      {/* Newsletter — stessa sezione della homepage */}
      <NewsletterSection />

      {/* Certificazioni — stessa sezione della homepage */}
      <CertificationsMarquee />
    </>
  );
}
