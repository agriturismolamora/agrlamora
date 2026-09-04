import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { LocationMap } from "@/components/location-map";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";

export const metadata: Metadata = {
  title: "Cofanetti Regalo",
  description:
    "Regala un soggiorno ad Agriturismo La Mora, ad Assisi: quattro cofanetti reali con notti, colazioni e servizi già inclusi, da 139,90€.",
  alternates: { canonical: "/offerte/cofanetti-regalo/" },
};

type Box = {
  slug: string;
  badge: string;
  title: string;
  people: number;
  priceEur: string;
  included: string;
  img: string;
  alt: string;
};

/* Quattro cofanetti reali (PROJECT-BRIEF.md sezione 4) presentati come
   grandi blocchi editoriali alternati, non come card e-commerce — stesso
   principio già applicato a /offerte/ per le tre condizioni dirette:
   niente prezzo o beneficio inventato, "Bilocale" resta esplicitamente
   una tipologia (assegnazione dinamica), mai un appartamento specifico
   tra i cinque nominati. */
const BOXES: Box[] = [
  {
    slug: "due-notti-in-fuga",
    badge: "Cofanetto regalo",
    title: "Due notti in fuga",
    people: 2,
    priceEur: "139,90€",
    included: "2 notti in Bilocale + 2 colazioni all'italiana",
    img: "/images/Nuova cartella/Due notti in Fuga per 2 persone/Due notti in Fuga per 2 persone.jpg",
    alt: "Cofanetto regalo Due notti in fuga — Agriturismo La Mora",
  },
  {
    slug: "due-notti-romantiche",
    badge: "Cofanetto regalo",
    title: "Due notti romantiche",
    people: 2,
    priceEur: "159,90€",
    included: "2 notti in Bilocale + 2 colazioni + drink di benvenuto",
    img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg",
    alt: "Cofanetto regalo Due notti romantiche — Agriturismo La Mora",
  },
  {
    slug: "4-giorni-fuori-dal-mondo",
    badge: "Cofanetto regalo",
    title: "4 giorni fuori dal mondo",
    people: 2,
    priceEur: "189,90€",
    included: "3 notti in Bilocale + 3 colazioni all'italiana",
    img: "/images/Nuova cartella/4 giorni fuori dal mondo/4 giorni fuori dal mondo coppia che fa colazione.jpg",
    alt: "Cofanetto regalo 4 giorni fuori dal mondo — Agriturismo La Mora",
  },
  {
    slug: "tre-giorni-in-famiglia",
    badge: "Cofanetto regalo",
    title: "Tre giorni in famiglia",
    people: 4,
    priceEur: "189,90€",
    included: "2 notti in Bilocale + 2 colazioni all'italiana",
    img: "/images/Nuova cartella/Tre giorni in famiglia/tre giorni in famiglia agriturismo la mora.jpg",
    alt: "Cofanetto regalo Tre giorni in famiglia — Agriturismo La Mora",
  },
];

export default function CofanettiRegaloPage() {
  return (
    <>
      {/* 1. Hero immersiva */}
      <section className="relative flex h-[86vh] min-h-[560px] items-end overflow-hidden">
        <Image
          src="/images/home/foto della piscina agriturismo la mora.webp"
          alt="Piscina di Agriturismo La Mora"
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
              Regala La Mora · Assisi
            </span>
            <h1 className="mt-5 font-display text-[clamp(38px,6.5vw,64px)] font-normal leading-[1.08] text-cream [text-wrap:balance]">
              Un cofanetto, un soggiorno vero.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <span aria-hidden="true" className="mx-auto mt-10 block h-10 w-px bg-cream/40" />
          </Reveal>
        </div>
      </section>

      {/* 2. Intro editoriale */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[720px] px-6 text-center sm:px-10">
          <Reveal>
            <p className="font-display text-[clamp(22px,3vw,30px)] font-normal leading-[1.5] text-ink [text-wrap:balance]">
              Quattro cofanetti pensati per occasioni diverse: notti, colazioni e piccoli extra già inclusi, così chi
              riceve il regalo deve solo scegliere le date.
            </p>
            <p className="mx-auto mt-5 max-w-[480px] text-[13px] leading-[1.7] text-ink-soft">
              &ldquo;Bilocale&rdquo; indica una tipologia di appartamento, non una delle cinque unità nominate:
              l&apos;assegnazione avviene su una di quelle disponibili per le date scelte.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. I quattro cofanetti */}
      {BOXES.map((box, i) => (
        <section key={box.slug} className={i % 2 === 0 ? "bg-cream-dim py-20 sm:py-28" : "bg-cream py-20 sm:py-28"}>
          <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-12 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
            <Reveal className={i % 2 === 1 ? "order-2 sm:order-1" : undefined}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                <Image src={box.img} alt={box.alt} fill sizes="(max-width: 640px) 100vw, 540px" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={100} className={i % 2 === 1 ? "order-1 sm:order-2" : undefined}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-olive-950">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                {box.badge}
              </span>
              <h2 className="mt-5 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                {box.title}
              </h2>
              <p className="mt-2 text-[13px] uppercase tracking-[0.06em] text-ink-soft">Per {box.people} persone</p>

              <p className="mt-5 font-display text-[44px] leading-none text-raspberry">{box.priceEur}</p>

              <p className="mt-5 max-w-[420px] text-[14px] leading-[1.8] text-ink-soft">{box.included}</p>
              <p className="mt-3 max-w-[420px] text-[12px] leading-[1.6] text-ink-soft/70">
                Extra da pagare a parte: pulizia finale 25€, tassa di soggiorno 3€/persona/giorno.
              </p>

              <a
                href={`https://wa.me/393934363917?text=${encodeURIComponent(`Ciao! Vorrei informazioni sul cofanetto "${box.title}".`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8a3844" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  Richiedi informazioni
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </section>
      ))}

      {/* 6. Non trovi il cofanetto giusto? */}
      <section className="relative flex h-[64vh] min-h-[440px] items-center justify-center overflow-hidden">
        <Image
          src="/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg"
          alt="Basilica di Santa Maria degli Angeli, vicino Assisi"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
        <div className="relative z-[1] mx-auto max-w-[520px] px-6 text-center sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(26px,3.4vw,36px)] font-normal leading-[1.3] text-cream [text-wrap:balance]">
              Cerchi qualcosa di diverso?
            </h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-cream/75">
              Raccontaci per chi è il regalo e cosa vorresti includere: verifichiamo insieme disponibilità e la
              soluzione più adatta.
            </p>
            <a
              href="https://wa.me/393934363917?text=Ciao!%20Vorrei%20un%20consiglio%20su%20quale%20cofanetto%20regalo%20scegliere."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Chiedi informazioni
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 7. Micro-blocco prenotazione diretta */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <Reveal>
            <dl className="grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 text-center sm:grid-cols-3 sm:text-left">
              {[
                { title: "Contatto diretto", text: "Scrivi a chi gestisce La Mora ogni giorno, non a un call center." },
                { title: "Cofanetti reali", text: "Notti, colazioni e servizi già definiti — nessuna condizione nascosta." },
                { title: "Nessun intermediario", text: "Prenoti e regali senza passare da terzi." },
              ].map((item) => (
                <div key={item.title}>
                  <dt className="font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-ink">{item.title}</dt>
                  <dd className="mt-2 text-[13px] leading-[1.6] text-ink-soft">{item.text}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex justify-center sm:justify-start">
              <Link
                href="/offerte/"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8f4324" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  Tutte le offerte
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </Reveal>
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
