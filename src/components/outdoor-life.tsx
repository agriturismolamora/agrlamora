import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

/* Sezione "Vivere La Mora": grande momento fotografico su piscina e spazi
   verdi. Composizione diversa da StructureHighlights (già approvata, non
   toccata): qui la foto è full-bleed in apertura, il testo arriva DOPO in
   corpo oversize — non uno split foto/testo affiancato. Foto reali, mai
   usate altrove in homepage. */
const FACTS = [
  { label: "Piscina panoramica", detail: "6×12 metri, aperta dal 1° giugno al 28 settembre" },
  { label: "Giardino recintato", detail: "negli appartamenti Gemelli e Sagittario" },
  { label: "Parco giochi e sport", detail: "altalene, scivoli, campo da calcetto in erba naturale, ping-pong; culla e seggiolone su richiesta" },
] as const;

export function OutdoorLife() {
  return (
    <section aria-labelledby="outdoor-life-heading" className="relative bg-cream">
      <div className="relative h-[62vh] min-h-[380px] w-full overflow-hidden sm:h-[72vh]">
        <Image
          src="/images/piscina/foto piscina di giorno.webp"
          alt="La piscina panoramica di Agriturismo La Mora vista di giorno"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(180deg, rgba(28,33,23,.05) 0%, rgba(28,33,23,.55) 100%)" }}
        />
        <span className="absolute bottom-6 left-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream sm:bottom-8 sm:left-10">
          Piscina e spazi all&apos;aperto
        </span>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 py-16 text-center sm:px-10 sm:py-20">
        <Reveal>
          <h2
            id="outdoor-life-heading"
            className="font-display text-[clamp(30px,4vw,52px)] font-normal leading-[1.15] text-ink [text-wrap:balance]"
          >
            Una piscina panoramica, un prato dove i bambini corrono, sedie all&apos;ombra per chi invece si ferma.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mx-auto mt-12 grid max-w-[820px] grid-cols-1 gap-8 border-t border-ink/10 pt-10 text-left sm:grid-cols-3 sm:text-center">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="font-display text-xl text-ink">{fact.label}</dt>
                <dd className="mt-1.5 text-[13px] text-ink-soft">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={220}>
          <Link
            href="/piscina/"
            className="group mt-12 inline-flex items-center gap-2.5 rounded-[3px] border border-ink/20 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors duration-200 hover:border-raspberry hover:text-raspberry"
          >
            Scopri la piscina
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
