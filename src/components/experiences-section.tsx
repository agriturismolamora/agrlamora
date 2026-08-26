import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

/* Sezione "Esperienze": griglia di 3 card ritratto (4/5), diversa dalla
   griglia orizzontale asimmetrica di TerritorySection. Ogni card porta allo
   stesso hub Esperienze già esistente in nav (nessuno slug nuovo inventato):
   il dettaglio prezzi/orari resta su quella pagina, qui solo racconto. */
const EXPERIENCES = [
  {
    label: "E-bike",
    title: "Il territorio in sella a un'e-bike",
    text: "Noleggio e-bike per esplorare sentieri e borghi intorno ad Assisi, con la pedalata assistita che aiuta anche in salita.",
    image: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
    alt: "Due ospiti in e-bike nei dintorni di Agriturismo La Mora",
  },
  {
    label: "Equitazione",
    title: "Lezioni di equitazione per tutta la famiglia",
    text: "Un'attività adatta anche ai bambini, per avvicinarsi ai cavalli con calma, immersi nella campagna umbra.",
    image: "/images/servizi-extra/equitazione/immagine uomo a cavallo con bambino lezioni di equitazione.webp",
    alt: "Lezione di equitazione con un bambino ad Agriturismo La Mora",
  },
  {
    label: "E molto altro",
    title: "Parco giochi e tempo libero",
    text: "Un parco giochi per i più piccoli, babysitting su richiesta e tanto spazio all'aperto per chi preferisce restare in struttura.",
    image: "/images/piscina/esterno parco agriturismo con scivolo per bambini.jpg",
    alt: "Parco giochi per bambini di Agriturismo La Mora",
  },
] as const;

export function ExperiencesSection() {
  return (
    <section aria-labelledby="experiences-heading" className="bg-cream-dim py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Esperienze</span>
          <h2
            id="experiences-heading"
            className="mt-5 font-display text-[clamp(28px,3.2vw,44px)] font-normal leading-[1.2] text-ink [text-wrap:balance]"
          >
            Cosa fare, tra un tuffo in piscina e una passeggiata ad Assisi.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-3 sm:gap-6">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.label} delay={i * 100}>
              <Link
                href="/agriturismo-famiglie-ad-assisi-e-dintorni/"
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px]">
                  <Image
                    src={exp.image}
                    alt={exp.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0"
                    aria-hidden="true"
                    style={{ background: "linear-gradient(0deg, rgba(28,33,23,.75) 0%, rgba(28,33,23,0) 50%)" }}
                  />
                  <span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream">
                    {exp.label}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[19px] font-normal leading-[1.3] text-ink transition-colors duration-200 group-hover:text-raspberry">
                  {exp.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-ink-soft">{exp.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320} className="mt-14 flex justify-center sm:mt-16">
          <Link
            href="/agriturismo-famiglie-ad-assisi-e-dintorni/"
            className="group inline-flex items-center gap-2.5 rounded-[3px] bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors duration-200 hover:bg-[#8a3844]"
          >
            Scopri tutte le esperienze
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
