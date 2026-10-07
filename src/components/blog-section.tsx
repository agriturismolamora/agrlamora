"use client";

import Image from "next/image";
import { PhotoCreditLine } from "@/components/photo-credit";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Reveal } from "@/components/scroll-reveal";
import { PinnedHold } from "@/components/pinned-hold";
import { HoverFill } from "@/components/hover-fill";
import { getBlogPosts } from "@/data/blog-posts";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const TEXT: Record<Locale, { label: string; heading: string; cta: string; scopriDiPiu: string }> = {
  it: {
    label: "Dal blog de La Mora",
    heading: "Storie, luoghi e consigli per vivere Assisi e l'Umbria con calma.",
    cta: "Tutti gli articoli",
    scopriDiPiu: "Scopri di più",
  },
  en: {
    label: "From the La Mora blog",
    heading: "Stories, places and tips for taking your time in Assisi and Umbria.",
    cta: "All articles",
    scopriDiPiu: "Learn more",
  },
  fr: {
    label: "Le blog de La Mora",
    heading: "Histoires, lieux et conseils pour vivre Assise et l'Ombrie sans se presser.",
    cta: "Tous les articles",
    scopriDiPiu: "En savoir plus",
  },
  de: {
    label: "Vom La-Mora-Blog",
    heading: "Geschichten, Orte und Tipps, um Assisi und Umbrien in Ruhe zu erleben.",
    cta: "Alle Artikel",
    scopriDiPiu: "Mehr erfahren",
  },
};

/* Ventaglio (da lg) e striscia (sotto lg) sono sempre entrambi nel DOM,
   scambiati dal CSS: quello non mostrato è aria-hidden. Sul server (null)
   si considera mostrata la striscia, che ha tutti gli articoli. */
const LG_QUERY = "(min-width: 64rem)";
function subscribeLg(onChange: () => void) {
  const mq = window.matchMedia(LG_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function useIsLg(): boolean | null {
  return useSyncExternalStore(subscribeLg, () => window.matchMedia(LG_QUERY).matches, () => null);
}

export function BlogSection({ locale }: { locale: Locale }) {
  const POSTS = getBlogPosts(locale);
  /* Ventaglio desktop: al massimo FAN_MAX card. Con 8 articoli (dopo
     Eurochocolate) le card sovrapposte superavano la larghezza della pagina
     anche a 1440px e la prima e l'ultima venivano tagliate. La striscia
     mobile scorre, quindi li mostra tutti; "Tutti gli articoli" porta
     comunque all'indice completo. */
  const FAN_MAX = 6;
  const fanPosts = POSTS.slice(0, FAN_MAX);
  const text = TEXT[locale];
  /* z-index dell'hover deve vivere in state React: uno style inline con
     zIndex fisso (necessario per l'ordine base a ventaglio, i+1) batte
     sempre una classe hover: di Tailwind a parità di elemento, quindi
     "hover:z-20" da solo non ha mai funzionato — la card in hover restava
     comunque sotto le vicine con i più alto. */
  const [hovered, setHovered] = useState<number | null>(null);
  const isLg = useIsLg();

  return (
    <section id="section-blog" aria-labelledby="blog-heading" className="bg-cream-dim py-24 sm:py-28 lg:min-h-[140vh] lg:py-0">
      <PinnedHold>
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:py-24">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-[640px]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
              {text.label}
            </span>
            <h2
              id="blog-heading"
              className="mt-5 font-display text-[clamp(26px,2.8vw,38px)] font-normal leading-[1.25] text-ink [text-wrap:balance]"
            >
              {text.heading}
            </h2>
          </div>
          <Link
            href={withLocale(locale, "/blog/")}
            className="group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-lg bg-olive-950 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
          >
            <HoverFill color="#141810" />
            <span className="relative z-10 inline-flex items-center gap-2.5">
              {text.cta}
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
        <Reveal delay={100} className="mt-14 hidden sm:mt-16 lg:flex lg:justify-center" ariaHidden={isLg !== true}>
          {fanPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={withLocale(locale, `/blog/${post.slug}/`)}
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
                style={{ objectPosition: post.imagePosition }}
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
                {/* max-w come per il credito: con i titoli lunghi (Blocco C)
                    le ultime parole finivano sotto la card successiva. */}
                <span className="block max-w-[150px] font-display text-[17px] leading-[1.25] text-cream [text-wrap:balance] xl:max-w-[165px]">
                  {post.title}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-cream/85">
                  {text.scopriDiPiu}
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover/card:translate-x-1">
                    →
                  </span>
                </span>
                {/* max-w: la card successiva del ventaglio copre il bordo destro. */}
                {post.imageCredit && (
                  <PhotoCreditLine credit={post.imageCredit} locale={locale} linked={false} className="mt-2 block max-w-[150px] text-[8.5px] leading-[1.35] text-cream/65 xl:max-w-[165px]" />
                )}
              </div>
            </Link>
          ))}
        </Reveal>

        <Reveal delay={100} className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:mt-16 lg:hidden" ariaHidden={isLg === true}>
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={withLocale(locale, `/blog/${post.slug}/`)}
              className="group/card relative aspect-[3/4] w-[220px] shrink-0 snap-start overflow-hidden"
            >
              <Image src={post.image} alt={post.alt} fill quality={90} sizes="220px" className="object-cover" style={{ objectPosition: post.imagePosition }} />
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
                  {text.scopriDiPiu}
                  <span aria-hidden="true">→</span>
                </span>
                {post.imageCredit && (
                  <PhotoCreditLine credit={post.imageCredit} locale={locale} linked={false} className="mt-2 block text-[8.5px] leading-[1.35] text-cream/65" />
                )}
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
      </PinnedHold>
    </section>
  );
}
