import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

export const metadata: Metadata = {
  title: "Cofanetti Regalo",
  description:
    "Regala un soggiorno ad Agriturismo La Mora: quattro cofanetti reali, da Due notti in fuga a Tre giorni in famiglia, con prezzi e condizioni verificati.",
  alternates: { canonical: "/offerte/cofanetti-regalo/" },
};

const BOXES = [
  {
    name: "Due notti in fuga",
    people: 2,
    included: "2 notti in Bilocale + 2 colazioni all'italiana",
    price: "139,90€",
    img: "/images/Nuova cartella/Due notti in Fuga per 2 persone/Due notti in Fuga per 2 persone.jpg",
  },
  {
    name: "Due notti romantiche",
    people: 2,
    included: "2 notti in Bilocale + 2 colazioni + drink di benvenuto",
    price: "159,90€",
    img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg",
  },
  {
    name: "4 giorni fuori dal mondo",
    people: 2,
    included: "3 notti in Bilocale + 3 colazioni all'italiana",
    price: "189,90€",
    img: "/images/Nuova cartella/4 giorni fuori dal mondo/4 giorni fuori dal mondo coppia che fa colazione.jpg",
  },
  {
    name: "Tre giorni in famiglia",
    people: 4,
    included: "2 notti in Bilocale + 2 colazioni all'italiana",
    price: "189,90€",
    img: "/images/Nuova cartella/Tre giorni in famiglia/tre giorni in famiglia agriturismo la mora.jpg",
  },
] as const;

export default function CofanettiRegaloPage() {
  return (
    <>
      <section className="relative flex h-[50vh] min-h-[380px] items-end overflow-hidden">
        <Image
          src="/images/piscina/foto esterno prato verde con panchina in legno e campo da calcio.webp"
          alt="Il prato verde di Agriturismo La Mora"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.1) 0%, rgba(20,14,7,.72) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[700px] px-6 pb-12 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">Offerte</span>
          <h1 className="mt-3 font-display text-[clamp(30px,4.6vw,48px)] font-normal leading-[1.15] text-cream [text-wrap:balance]">
            Regala un soggiorno a La Mora.
          </h1>
        </div>
      </section>

      <section className="bg-cream pb-4 pt-14 sm:pt-16">
        <div className="mx-auto max-w-[700px] px-6 text-center sm:px-10">
          <Reveal>
            <p className="text-[15px] leading-[1.8] text-ink-soft">
              Quattro cofanetti pensati per occasioni diverse. &ldquo;Bilocale&rdquo; è una tipologia, non un
              appartamento specifico tra i cinque: l&apos;assegnazione avviene su una delle unità di quel tipo
              disponibili per le date scelte.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 px-6 sm:grid-cols-2 sm:px-10">
          {BOXES.map((box, i) => (
            <Reveal key={box.name} delay={i * 60}>
              <div className="overflow-hidden rounded-[3px] border border-ink/10">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={box.img}
                    alt={`Cofanetto regalo ${box.name} — Agriturismo La Mora`}
                    fill
                    sizes="(max-width: 640px) 100vw, 520px"
                    className="object-cover"
                  />
                </div>
                <div className="px-6 py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-display text-[21px] font-normal text-ink">{box.name}</h2>
                    <span className="shrink-0 font-display text-[22px] text-raspberry">{box.price}</span>
                  </div>
                  <p className="mt-2 text-[13px] text-ink-soft">Per {box.people} persone</p>
                  <p className="mt-3 text-[13px] leading-[1.6] text-ink-soft">{box.included}</p>
                  <p className="mt-3 text-[11px] leading-[1.6] text-ink-soft/70">
                    Extra da pagare a parte: pulizia finale 25€, tassa di soggiorno 3€/persona/giorno.
                  </p>
                  <a
                    href={`https://wa.me/393934363917?text=${encodeURIComponent(`Ciao! Vorrei informazioni sul cofanetto "${box.name}".`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mt-5 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-5 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
                  >
                    <HoverFill color="#8a3844" />
                    <span className="relative z-10">Richiedi informazioni</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#1f180e] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[480px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              Non sai quale scegliere?
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-cream/65">
              Scrivici l&apos;occasione e per chi è il regalo: ti aiutiamo a scegliere il cofanetto giusto.
            </p>
            <a
              href="https://wa.me/393934363917?text=Ciao!%20Vorrei%20un%20consiglio%20su%20quale%20cofanetto%20regalo%20scegliere."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Scrivici su WhatsApp
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
