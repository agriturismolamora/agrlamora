import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Offerte",
  description: "Cofanetti regalo per un soggiorno ad Agriturismo La Mora, o registra un voucher Smartbox già acquistato.",
  alternates: { canonical: "/offerte/" },
};

const CARDS = [
  {
    href: "/offerte/cofanetti-regalo/",
    title: "Cofanetti regalo",
    desc: "Quattro pacchetti pensati per coppie e famiglie, con notti, colazioni e servizi già inclusi.",
    img: "/images/Nuova cartella/Due notti romantiche/due notti romantiche.jpg",
  },
  {
    href: "/offerte/smartbox/",
    title: "Smartbox",
    desc: "Hai già un cofanetto Smartbox? Ecco come registrarlo e prenotare il soggiorno.",
    img: "/images/struttura/foto dell esterno della struttura.webp",
  },
] as const;

export default function OffertePage() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-[1000px] px-6 text-center sm:px-10">
        <Reveal>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Offerte</span>
          <h1 className="mx-auto mt-5 max-w-[560px] font-display text-[clamp(32px,4.6vw,48px)] font-normal leading-[1.15] text-ink [text-wrap:balance]">
            Un regalo, o un cofanetto già in mano.
          </h1>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 text-left sm:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.href} delay={i * 80}>
              <Link href={c.href} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[3px]">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 470px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <h2 className="mt-4 font-display text-[22px] font-normal text-ink">{c.title}</h2>
                <p className="mt-2 text-[14px] leading-[1.7] text-ink-soft">{c.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
