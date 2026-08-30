"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/scroll-reveal";
import { PinnedHold } from "@/components/pinned-hold";
import { HoverFill } from "@/components/hover-fill";

/* Blog/editoriale (PLAN.md Blocco 6, mai costruito finora): i 20 articoli
   veri arriveranno con la produzione contenuti SEO/GEO — per ora 5 card
   placeholder. Le foto qui sotto sono l'UNICA eccezione nel sito alla
   regola "solo foto reali da public/": scaricate da Unsplash (licenza
   Unsplash, libere da diritti) su richiesta esplicita del titolare, solo
   per queste card segnaposto — Basilica di Santa Maria degli Angeli e
   Cascate delle Marmore sono il luogo reale, Bosco di San Francesco/San
   Damiano/Monte Subasio sono foto d'atmosfera coerenti col tema (nessuna
   foto libera del luogo esatto trovata). Da sostituire con foto reali de
   La Mora o le anteprime reali degli articoli quando saranno pubblicati. */
const POSTS = [
  {
    category: "Territorio",
    title: "Basilica di Santa Maria degli Angeli: cosa vedere",
    image: "/images/blog/basilica-santa-maria-degli-angeli.jpg",
    alt: "Basilica di Santa Maria degli Angeli, ad Assisi",
  },
  {
    category: "Natura",
    title: "Il Bosco di San Francesco, tra i sentieri del FAI",
    image: "/images/blog/bosco-san-francesco.jpg",
    alt: "Sentiero nel bosco, Umbria",
  },
  {
    category: "Territorio",
    title: "Il Santuario di San Damiano, fuori dalle mura di Assisi",
    image: "/images/blog/santuario-san-damiano.jpg",
    alt: "Piccola chiesa in pietra, stile santuario francescano",
  },
  {
    category: "Gita di un giorno",
    title: "Cascate delle Marmore: come arrivarci da Assisi",
    image: "/images/blog/cascate-delle-marmore.jpg",
    alt: "Cascate delle Marmore, in Umbria",
  },
  {
    category: "Natura",
    title: "Monte Subasio: i sentieri sopra Assisi",
    image: "/images/blog/monte-subasio.jpg",
    alt: "Sentiero di montagna erboso, Umbria",
  },
] as const;

export function BlogSection() {
  /* z-index dell'hover deve vivere in state React: uno style inline con
     zIndex fisso (necessario per l'ordine base a ventaglio, i+1) batte
     sempre una classe hover: di Tailwind a parità di elemento, quindi
     "hover:z-20" da solo non ha mai funzionato — la card in hover restava
     comunque sotto le vicine con i più alto. */
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="section-blog" aria-labelledby="blog-heading" className="bg-cream-dim py-24 sm:py-28 lg:min-h-[140vh] lg:py-0">
      <PinnedHold>
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:py-24">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-[640px]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
              Dal blog de La Mora
            </span>
            <h2
              id="blog-heading"
              className="mt-5 font-display text-[clamp(26px,2.8vw,38px)] font-normal leading-[1.25] text-ink [text-wrap:balance]"
            >
              Storie, luoghi e consigli per vivere Assisi e l&apos;Umbria con calma.
            </h2>
          </div>
          <Link
            href="/blog/"
            className="group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-lg bg-olive-950 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
          >
            <HoverFill color="#141810" />
            <span className="relative z-10 inline-flex items-center gap-2.5">
              Tutti gli articoli
              <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </Reveal>

        {/* Desktop/tablet: ventaglio di card sovrapposte, quella in hover
            prevale (scale + z-index) sulle altre senza spostarle. Mobile:
            striscia scorrevole con snap, niente sovrapposizione (l'hover non
            esiste su touch). Il reveal è su tutta la fila (non per-card):
            i margini negativi/z-index dell'overlap vivono sui Link, un
            fade-in per-card romperebbe quella geometria. */}
        <Reveal delay={100} className="mt-14 hidden sm:mt-16 lg:flex lg:justify-center">
          {POSTS.map((post, i) => (
            <Link
              key={post.title}
              href="/blog/"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={`group/card relative aspect-[3/4] w-[240px] shrink-0 overflow-hidden shadow-[0_25px_55px_-25px_rgba(28,33,23,0.5)] outline-none transition-transform duration-300 ease-out hover:scale-[1.08] focus-visible:scale-[1.08] xl:w-[270px] ${
                i > 0 ? "-ml-16 xl:-ml-20" : ""
              }`}
              style={{ zIndex: hovered === i ? 50 : i + 1 }}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                quality={90}
                sizes="270px"
                className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.06]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(10,12,9,.85) 0%, rgba(10,12,9,.1) 55%, rgba(10,12,9,.35) 100%)" }}
              />
              <span className="absolute left-4 top-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-cream/80">
                {post.category}
              </span>
              <div className="absolute inset-x-4 bottom-4">
                <span className="block font-display text-[17px] leading-[1.25] text-cream [text-wrap:balance]">
                  {post.title}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-cream/85">
                  Scopri di più
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover/card:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </Reveal>

        <Reveal delay={100} className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:mt-16 lg:hidden">
          {POSTS.map((post) => (
            <Link
              key={post.title}
              href="/blog/"
              className="group/card relative aspect-[3/4] w-[220px] shrink-0 snap-start overflow-hidden"
            >
              <Image src={post.image} alt={post.alt} fill quality={90} sizes="220px" className="object-cover" />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(10,12,9,.85) 0%, rgba(10,12,9,.1) 55%, rgba(10,12,9,.3) 100%)" }}
              />
              <span className="absolute left-4 top-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-cream/80">
                {post.category}
              </span>
              <div className="absolute inset-x-4 bottom-4">
                <span className="block font-display text-[16px] leading-[1.25] text-cream [text-wrap:balance]">
                  {post.title}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-cream/85">
                  Scopri di più
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
      </PinnedHold>
    </section>
  );
}
