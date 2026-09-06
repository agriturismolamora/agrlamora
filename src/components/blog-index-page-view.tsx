import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/data/blog-posts";
import { Reveal } from "@/components/scroll-reveal";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Blog",
    description: "Storie, luoghi e consigli per vivere Assisi e l'Umbria con calma: la Basilica di San Damiano, il Bosco di San Francesco, le Cascate delle Marmore e altro, dal blog di Agriturismo La Mora.",
  },
  en: {
    title: "Blog",
    description: "Stories, places and tips for experiencing Assisi and Umbria at an easy pace: the Sanctuary of San Damiano, the Bosco di San Francesco, the Marmore Falls and more, from the Agriturismo La Mora blog.",
  },
  fr: {
    title: "Blog",
    description: "Histoires, lieux et conseils pour vivre Assise et l'Ombrie tranquillement : le sanctuaire de San Damiano, le Bosco di San Francesco, les Cascate delle Marmore et plus encore, sur le blog d'Agriturismo La Mora.",
  },
  de: {
    title: "Blog",
    description: "Geschichten, Orte und Tipps, um Assisi und Umbrien in Ruhe zu erleben: die Wallfahrtskirche San Damiano, der Bosco di San Francesco, die Wasserfälle von Marmore und mehr, im Blog von Agriturismo La Mora.",
  },
};

export function getBlogIndexMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/blog/") } };
}

const TEXT: Record<Locale, { label: string; heading: string; readMore: string }> = {
  it: {
    label: "Dal blog de La Mora",
    heading: "Storie, luoghi e consigli per vivere Assisi con calma.",
    readMore: "Leggi l'articolo",
  },
  en: {
    label: "From La Mora's blog",
    heading: "Stories, places and tips for experiencing Assisi at an easy pace.",
    readMore: "Read the article",
  },
  fr: {
    label: "Le blog de La Mora",
    heading: "Histoires, lieux et conseils pour vivre Assise tranquillement.",
    readMore: "Lire l'article",
  },
  de: {
    label: "Aus dem Blog von La Mora",
    heading: "Geschichten, Orte und Tipps, um Assisi in Ruhe zu erleben.",
    readMore: "Artikel lesen",
  },
};

export function BlogIndexPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const posts = getBlogPosts(locale);
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="bg-cream pb-4 pt-16 sm:pt-20">
        <div className="mx-auto max-w-[900px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.label}</span>
            <h1 className="mx-auto mt-5 max-w-[640px] font-display text-[clamp(32px,4.6vw,52px)] font-normal leading-[1.15] text-ink [text-wrap:balance]">
              {text.heading}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <Link href={withLocale(locale, `/blog/${featured.slug}/`)} className="group grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center sm:gap-10">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[3px]">
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">{featured.category}</span>
                <h2 className="mt-3 font-display text-[28px] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.7] text-ink-soft">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-raspberry">
                  {text.readMore}
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-10 border-t border-ink/10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
                <Link href={withLocale(locale, `/blog/${post.slug}/`)} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, 280px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">
                    {post.category}
                  </span>
                  <h3 className="mt-1.5 font-display text-[17px] leading-[1.3] text-ink [text-wrap:balance]">{post.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
