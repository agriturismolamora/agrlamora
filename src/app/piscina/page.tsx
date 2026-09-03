import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

export const metadata: Metadata = {
  title: "Piscina Panoramica",
  description:
    "Piscina panoramica 6×12 metri di Agriturismo La Mora ad Assisi, aperta dal 1° giugno al 28 settembre, con area giochi e campo da calcetto in erba naturale.",
  alternates: { canonical: "/piscina/" },
};

const FACTS = [
  { label: "Dimensioni", value: "6 × 12 metri" },
  { label: "Apertura", value: "1 giugno – 28 settembre" },
  { label: "Accesso", value: "Riservato agli ospiti" },
];

export default function PiscinaPage() {
  return (
    <>
      <section className="relative flex h-[68vh] min-h-[480px] items-end overflow-hidden">
        <Image
          src="/images/piscina/piscina agriturismo la mora di notte.jpeg"
          alt="Piscina panoramica di Agriturismo La Mora"
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
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">Piscina</span>
          <h1 className="mt-4 font-display text-[clamp(34px,5.5vw,58px)] font-normal leading-[1.1] text-cream [text-wrap:balance]">
            Una piscina panoramica sulla campagna umbra.
          </h1>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[720px] px-6 sm:px-10">
          <Reveal>
            <p className="text-[15px] leading-[1.85] text-ink-soft">
              6×12 metri, aperta dal 1° giugno al 28 settembre: la piscina è il centro delle giornate a La Mora,
              circondata da sedie all&apos;ombra per chi preferisce guardare invece di nuotare. Accanto, un&apos;area
              giochi per i più piccoli e un campo da calcetto in erba naturale.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
              {FACTS.map((f) => (
                <div key={f.label} className="text-center sm:text-left">
                  <dt className="text-[11px] uppercase tracking-[0.08em] text-ink-soft">{f.label}</dt>
                  <dd className="mt-1 font-display text-[20px] text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-3 px-6 sm:grid-cols-3 sm:px-10">
          <Reveal className="sm:col-span-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px]">
              <Image
                src="/images/piscina/foto piscina di giorno.webp"
                alt="Piscina di Agriturismo La Mora durante il giorno"
                fill
                sizes="(max-width: 640px) 100vw, 700px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] sm:aspect-auto sm:h-full">
              <Image
                src="/images/piscina/piscina agriturismo la mora lato.jpeg"
                alt="Vista laterale della piscina"
                fill
                sizes="(max-width: 640px) 100vw, 330px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#1f180e] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[480px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              Ti aspettiamo in piscina.
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
