import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

export const metadata: Metadata = {
  title: "Attività per Famiglie",
  description:
    "Piscina panoramica, parco giochi con babysitting su richiesta, e-bike a noleggio e i cavalli dell'azienda: le attività reali di Agriturismo La Mora ad Assisi.",
  alternates: { canonical: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
};

const EBIKE_PRICES = [
  { duration: "Mezza giornata", price: "15€" },
  { duration: "Giornata intera", price: "25€" },
  { duration: "Weekend", price: "40€" },
  { duration: "7 giorni", price: "90€" },
];

export default function AttivitaPage() {
  return (
    <>
      <section className="relative flex h-[58vh] min-h-[440px] items-end overflow-hidden">
        <Image
          src="/images/piscina/esterno parco agriturismo con scivolo per bambini.jpg"
          alt="Area giochi per bambini di Agriturismo La Mora"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.75) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-14 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">Attività</span>
          <h1 className="mt-4 font-display text-[clamp(34px,5.5vw,56px)] font-normal leading-[1.1] text-cream [text-wrap:balance]">
            Quello che c&apos;è davvero da fare a La Mora.
          </h1>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          {/* Piscina */}
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                <Image
                  src="/images/piscina/piscina agriturismo la mora.webp"
                  alt="Piscina panoramica di Agriturismo La Mora"
                  fill
                  sizes="(max-width: 640px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">Piscina</span>
                <h2 className="mt-3 font-display text-[26px] font-normal leading-[1.2] text-ink">
                  Panoramica, aperta in stagione.
                </h2>
                <p className="mt-4 text-[14px] leading-[1.75] text-ink-soft">
                  Immersa nel verde, con vista sulla campagna umbra e sedute all&apos;ombra per chi preferisce
                  restare a guardare. Il punto d&apos;incontro della giornata, tra un&apos;uscita ad Assisi e l&apos;altra.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Parco giochi */}
          <Reveal delay={80}>
            <div className="mt-16 grid grid-cols-1 items-center gap-10 sm:grid-cols-2">
              <div className="order-2 sm:order-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">Famiglie</span>
                <h2 className="mt-3 font-display text-[26px] font-normal leading-[1.2] text-ink">
                  Parco giochi e babysitting su richiesta.
                </h2>
                <p className="mt-4 text-[14px] leading-[1.75] text-ink-soft">
                  Altalene, scivoli e giostre nel parco della struttura. Per chi vuole una serata solo per sé, il
                  servizio di babysitting è disponibile su richiesta — basta chiedere in anticipo.
                </p>
              </div>
              <div className="order-1 relative aspect-[4/3] overflow-hidden rounded-[3px] sm:order-2">
                <Image
                  src="/images/piscina/esterno parco agriturismo con scivolo per bambini.jpg"
                  alt="Scivolo e area giochi per bambini"
                  fill
                  sizes="(max-width: 640px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* E-bike */}
          <Reveal delay={120}>
            <div className="mt-16 grid grid-cols-1 items-start gap-10 sm:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                <Image
                  src="/images/servizi-extra/e-bike/immagine di due persone con ebike.webp"
                  alt="Noleggio e-bike di Agriturismo La Mora"
                  fill
                  sizes="(max-width: 640px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">E-bike</span>
                <h2 className="mt-3 font-display text-[26px] font-normal leading-[1.2] text-ink">
                  A noleggio, per esplorare senza fatica.
                </h2>
                <p className="mt-4 text-[14px] leading-[1.75] text-ink-soft">
                  Consegna e ritiro direttamente in struttura, contatto diretto con Paolo. Comode per raggiungere
                  Assisi in autonomia o girare la campagna intorno.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-ink/10 pt-5">
                  {EBIKE_PRICES.map((p) => (
                    <div key={p.duration}>
                      <dt className="text-[12px] text-ink-soft">{p.duration}</dt>
                      <dd className="mt-0.5 font-display text-[18px] text-ink">{p.price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>

          {/* Cavalli */}
          <Reveal delay={160}>
            <div className="mt-16 grid grid-cols-1 items-center gap-10 sm:grid-cols-2">
              <div className="order-2 sm:order-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">In azienda</span>
                <h2 className="mt-3 font-display text-[26px] font-normal leading-[1.2] text-ink">I cavalli di La Mora.</h2>
                <p className="mt-4 text-[14px] leading-[1.75] text-ink-soft">
                  Fanno parte dell&apos;azienda agricola: gli ospiti possono vederli e avvicinarli durante il
                  soggiorno. Non organizziamo passeggiate a cavallo né lezioni di equitazione — è un&apos;occasione
                  per i bambini di stare vicino agli animali, non un servizio strutturato.
                </p>
              </div>
              <div className="order-1 relative aspect-[4/3] overflow-hidden rounded-[3px] sm:order-2">
                <Image
                  src="/images/servizi-extra/equitazione/foto di un cavallo agriturismo la mora.jpeg"
                  alt="Uno dei cavalli dell'azienda agricola La Mora"
                  fill
                  sizes="(max-width: 640px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#1f180e] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[480px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              Ti aspettiamo in campagna.
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
