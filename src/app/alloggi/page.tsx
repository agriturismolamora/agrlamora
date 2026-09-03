import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { APARTMENTS } from "@/data/apartments";
import { APARTMENT_DETAILS } from "@/data/apartment-details";
import { Reveal } from "@/components/scroll-reveal";
import { ZodiacMark } from "@/components/zodiac-mark";
import { HoverFill } from "@/components/hover-fill";

export const metadata: Metadata = {
  title: "Appartamenti ad Assisi",
  description:
    "Cinque appartamenti indipendenti immersi nel verde umbro, da 2 a 8 ospiti: Gemelli, Bilancia, Pesci, Acquario, Sagittario. Piscina, giardino, cucina attrezzata in ognuno.",
  alternates: { canonical: "/alloggi/" },
};

export default function AlloggiPage() {
  return (
    <>
      <section className="bg-cream pb-4 pt-16 sm:pt-20">
        <div className="mx-auto max-w-[1200px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">I nostri appartamenti</span>
            <h1 className="mx-auto mt-5 max-w-[680px] font-display text-[clamp(34px,5vw,54px)] font-normal leading-[1.1] text-ink [text-wrap:balance]">
              Cinque appartamenti indipendenti, ognuno con la sua storia.
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.75] text-ink-soft">
              Da due a otto ospiti, tutti con cucina attrezzata e bagno privato. Due — Gemelli e Sagittario — hanno un
              giardino recintato tutto loro e accettano animali.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
          {APARTMENTS.map((apt, i) => {
            const detail = APARTMENT_DETAILS[apt.slug];
            return (
              <Reveal key={apt.slug} delay={i * 60}>
                <Link href={apt.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-ink/5">
                    <Image
                      src={apt.image}
                      alt={apt.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {apt.petFriendly && (
                      <span className="absolute right-3 top-3 rounded-full bg-cream px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-olive-950 shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
                        Pet friendly
                      </span>
                    )}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]"
                      style={{ background: "linear-gradient(0deg, rgba(10,10,8,.6) 0%, rgba(10,10,8,0) 100%)" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 px-4 pb-4 text-cream">
                      <ZodiacMark sign={apt.zodiac} className="h-6 w-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
                      <span className="font-display text-[24px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">{apt.name}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-[13px] leading-[1.5] text-ink-soft">{detail?.tagline}</p>
                  <p className="mt-2 text-[12px] uppercase tracking-[0.04em] text-ink-soft/70">
                    Fino a {apt.maxGuests} ospiti · {apt.sqm} m²
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-[#1f180e] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[480px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              Non sai quale scegliere?
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-cream/65">
              Scrivici il numero di ospiti e le date: ti diciamo subito quale appartamento fa per voi.
            </p>
            <a
              href="https://wa.me/393934363917?text=Ciao!%20Vorrei%20un%20consiglio%20su%20quale%20appartamento%20scegliere."
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
