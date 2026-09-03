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
      <section className="bg-cream pb-4 pt-16 sm:pt-20">
        <div className="mx-auto max-w-[900px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Offerte</span>
            <h1 className="mx-auto mt-5 max-w-[620px] font-display text-[clamp(32px,4.6vw,50px)] font-normal leading-[1.15] text-ink [text-wrap:balance]">
              Regala un soggiorno a La Mora.
            </h1>
            <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-[1.75] text-ink-soft">
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
    </>
  );
}
