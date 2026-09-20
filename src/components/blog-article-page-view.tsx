import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPosts, getBlogPost } from "@/data/blog-posts";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

type Params = { slug: string };

export function blogArticleStaticParams(): Params[] {
  return getBlogPosts("it").map((p) => ({ slug: p.slug }));
}

export async function blogArticleMetadata(locale: Locale, params: Promise<Params>): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: withLocale(locale, `/blog/${post.slug}/`) },
    openGraph: { title: post.title, description: post.metaDescription, images: [post.image] },
  };
}

const TEXT: Record<Locale, { allArticles: string; otherArticles: string }> = {
  it: { allArticles: "Tutti gli articoli", otherArticles: "Altri articoli" },
  en: { allArticles: "All articles", otherArticles: "More articles" },
  fr: { allArticles: "Tous les articles", otherArticles: "Autres articles" },
  de: { allArticles: "Alle Artikel", otherArticles: "Weitere Artikel" },
};

/* Blocco CTA riusato per iniziale/centrale/finale: stesso componente,
   varianti solo di colore (oro per iniziale/centrale, raspberry per la
   finale, coerente con il resto del sito — es. price-comparison-section)
   così l'occhio la riconosce sempre come "momento commerciale" senza
   sembrare tre banner diversi incollati nell'articolo. */
function ArticleCta({
  heading,
  body,
  label,
  href,
  locale,
  variant = "gold",
}: {
  heading: string;
  body?: string;
  label: string;
  href: string;
  locale: Locale;
  variant?: "gold" | "raspberry";
}) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("https://wa.me");
  const resolvedHref = isExternal ? href : withLocale(locale, href);
  const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <div className="my-10 rounded-[6px] bg-cream-dim px-6 py-7 text-center sm:px-8 sm:py-8">
      <p className="font-display text-[19px] font-normal leading-[1.4] text-ink [text-wrap:balance] sm:text-[21px]">
        {heading}
      </p>
      {body && <p className="mx-auto mt-2.5 max-w-[440px] text-[13.5px] leading-[1.7] text-ink-soft">{body}</p>}
      <Link
        href={resolvedHref}
        {...linkProps}
        className={`group relative mt-5 inline-flex items-center gap-2.5 overflow-hidden rounded-lg px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] ${
          variant === "raspberry" ? "bg-raspberry text-cream" : "bg-gold text-[#1f180e]"
        }`}
      >
        <HoverFill color={variant === "raspberry" ? "#8a3844" : "#8f7330"} />
        <span className="relative z-10 inline-flex items-center gap-2.5">
          {label}
          <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </div>
  );
}

export async function BlogArticlePageView({ locale, params }: { locale: Locale; params: Promise<Params> }) {
  const text = TEXT[locale];
  const { slug } = await params;
  const posts = getBlogPosts(locale);
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const post = posts[index];
  const related = posts.filter((_, i) => i !== index).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative flex h-[56vh] min-h-[400px] items-end overflow-hidden">
        <Image src={post.image} alt={post.alt} fill priority sizes="100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.78) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[760px] px-6 pb-12 sm:px-10">
          <Link
            href={withLocale(locale, "/blog/")}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-cream/75 transition-colors hover:text-cream"
          >
            <span aria-hidden="true">←</span> {text.allArticles}
          </Link>
          <span className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">{post.category}</span>
          <h1 className="mt-3 font-display text-[clamp(28px,4.4vw,44px)] font-normal leading-[1.15] text-cream [text-wrap:balance]">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-[680px] px-6 sm:px-10">
          <Reveal>
            <p className="font-display text-[20px] font-normal leading-[1.55] text-ink [text-wrap:balance] sm:text-[22px]">
              {post.intro}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ArticleCta
              heading={post.introCtaHeading}
              label={post.introCtaLabel}
              href={post.introCtaHref}
              locale={locale}
              variant="gold"
            />
          </Reveal>

          <div className="mt-2 space-y-6">
            {post.content.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return (
                    <Reveal key={i}>
                      <h2 className="pt-4 font-display text-[24px] font-normal leading-[1.25] text-ink [text-wrap:balance] sm:text-[27px]">
                        {block.text}
                      </h2>
                    </Reveal>
                  );
                case "h3":
                  return (
                    <Reveal key={i}>
                      <h3 className="pt-2 font-display text-[18px] font-normal leading-[1.3] text-ink [text-wrap:balance]">
                        {block.text}
                      </h3>
                    </Reveal>
                  );
                case "p":
                  return (
                    <Reveal key={i}>
                      <p className="text-[15px] leading-[1.85] text-ink-soft">{block.text}</p>
                    </Reveal>
                  );
                case "list":
                  return (
                    <Reveal key={i}>
                      <ul className="space-y-2.5">
                        {block.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-[15px] leading-[1.7] text-ink-soft">
                            <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-raspberry" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  );
                case "facts":
                  return (
                    <Reveal key={i}>
                      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-[6px] border border-ink/10 bg-cream-dim px-6 py-6 sm:grid-cols-3">
                        {block.items.map((f) => (
                          <div key={f.label}>
                            <dt className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-soft">{f.label}</dt>
                            <dd className="mt-1 font-display text-[17px] leading-tight text-ink">{f.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </Reveal>
                  );
                case "image":
                  return (
                    <Reveal key={i} className="!mt-8">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-[4px]">
                        <Image
                          src={block.src}
                          alt={block.alt}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, 680px"
                          className="object-cover"
                        />
                      </div>
                      {block.caption && (
                        <span className="mt-2 block text-[11.5px] leading-[1.5] text-ink-soft/70">{block.caption}</span>
                      )}
                    </Reveal>
                  );
                case "cta":
                  return (
                    <Reveal key={i}>
                      <ArticleCta
                        heading={block.heading}
                        body={block.body}
                        label={block.label}
                        href={block.href}
                        locale={locale}
                        variant="gold"
                      />
                    </Reveal>
                  );
                default:
                  return null;
              }
            })}
          </div>

          <Reveal delay={80}>
            <ArticleCta
              heading={post.finalCtaHeading}
              body={post.finalCtaBody}
              label={post.finalCtaLabel}
              href={post.finalCtaHref}
              locale={locale}
              variant="raspberry"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-14 sm:py-16">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.otherArticles}</span>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link href={withLocale(locale, `/blog/${p.slug}/`)} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, 340px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 font-display text-[16px] leading-[1.3] text-ink [text-wrap:balance]">{p.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
