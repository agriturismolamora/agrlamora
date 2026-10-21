import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPosts, getBlogPost } from "@/data/blog-posts";
import { Reveal } from "@/components/scroll-reveal";
import type { Locale } from "@/lib/i18n";
import { LOCALES, withLocale } from "@/lib/i18n";
import { findMentionedPlaces } from "@/data/places";
import { MapsButton } from "@/components/maps-button";
import { BlogBookingCta } from "@/components/blog-booking-cta";
import { getBlogCta, DEFAULT_BLOG_CTA } from "@/data/blog-ctas";
import { PromoOfferBox } from "@/components/promo-offer-box";
import { PromoLine } from "@/components/promo-line";
import type { PromoId } from "@/data/promo";
import { PhotoCreditLine } from "@/components/photo-credit";
import { ChocolateDrip, CocoaParticles } from "@/components/chocolate-decor";
import choco from "@/components/chocolate-theme.module.css";
import ny from "@/components/newyear-theme.module.css";
import { StarField, StaticFireworks, NightHorizon } from "@/components/newyear-decor";
import { FireworksCanvas, FireworksButton } from "@/components/fireworks";
import { NewYearCountdown } from "@/components/newyear-countdown";
import type { BlogPost, BlogTheme } from "@/data/blog-posts";
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { LD_ID, faqPageNode, type JsonLdNode } from "@/lib/structured-data";
import { BrandStrip } from "@/components/brand-strip";
import { StayBox } from "@/components/stay-box";

type Params = { slug: string };

const SITE_URL = "https://www.lamoraassisi.com";

/* URL assoluto sul dominio canonico; encodeURI per i nomi file con spazi
   delle foto in public/. */
function absoluteUrl(path: string): string {
  return `${SITE_URL}${encodeURI(path)}`;
}

function articlePath(locale: Locale, slug: string): string {
  return withLocale(locale, `/blog/${slug}/`);
}

export function blogArticleStaticParams(): Params[] {
  return getBlogPosts("it").map((p) => ({ slug: p.slug }));
}

/* Canonical e hreflang sempre su www.lamoraassisi.com. Le alternative
   linguistiche vengono dichiarate solo per le lingue in cui l'articolo
   esiste davvero (stesso criterio di sitemap.ts). */
export async function blogArticleMetadata(locale: Locale, params: Promise<Params>): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) return {};
  return pageMetadata({
    locale,
    path: `/blog/${slug}/`,
    title: post.title,
    description: post.metaDescription,
    image: { src: post.image, alt: post.alt },
    type: "article",
    locales: LOCALES.filter((l) => getBlogPost(l, slug)),
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
  });
}

const TEXT: Record<Locale, { allArticles: string; otherArticles: string; placesMentioned: string; fireworks: string; fireworksLabel: string }> = {
  it: {
    allArticles: "Tutti gli articoli",
    otherArticles: "Altri articoli",
    placesMentioned: "Luoghi citati nell'articolo",
    fireworks: "Fai partire i fuochi",
    fireworksLabel: "Fai partire i fuochi: animazione senza audio",
  },
  en: {
    allArticles: "All articles",
    otherArticles: "More articles",
    placesMentioned: "Places mentioned in this article",
    fireworks: "Launch the fireworks",
    fireworksLabel: "Launch the fireworks: silent animation",
  },
  fr: {
    allArticles: "Tous les articles",
    otherArticles: "Autres articles",
    placesMentioned: "Lieux cités dans l'article",
    fireworks: "Lancer le feu d'artifice",
    fireworksLabel: "Lancer le feu d'artifice : animation sans son",
  },
  de: {
    allArticles: "Alle Artikel",
    otherArticles: "Weitere Artikel",
    placesMentioned: "Im Artikel erwähnte Orte",
    fireworks: "Feuerwerk starten",
    fireworksLabel: "Feuerwerk starten: Animation ohne Ton",
  },
};

/* Tutto il testo visibile dell'articolo, per riconoscere quali luoghi di
   data/places.ts vi sono nominati: i pulsanti Maps compaiono solo per
   quelli, senza doverli elencare a mano articolo per articolo (e in 4
   lingue) — un articolo nuovo che nomina Perugia o Umbria Fiere li
   riceve da solo. */
function articleText(post: BlogPost): string {
  const parts: string[] = [post.title, post.intro, post.finalCtaHeading, post.finalCtaBody];
  if (post.inBreve) parts.push(...post.inBreve.items.flatMap((f) => [f.label, f.value]));
  for (const block of post.content) {
    if (block.type === "p" || block.type === "h2" || block.type === "h3") parts.push(block.text);
    else if (block.type === "list") parts.push(...block.items);
    else if (block.type === "facts") parts.push(...block.items.flatMap((f) => [f.label, f.value]));
    else if (block.type === "image" && block.caption) parts.push(block.caption);
    else if (block.type === "cta") parts.push(block.heading, block.body ?? "");
  }
  if (post.faq) parts.push(...post.faq.items.flatMap((f) => [f.q, f.a]));
  return parts.join(" · ");
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http") || href.startsWith("tel:");
}

/* Classi dell'articolo per tema: i temi cambiano solo colori e
   decorazioni, mai la struttura (stessi blocchi, stesso ordine). */
type FactsVariant = "default" | "chocolateDark" | "chocolateMilk" | "newyear";

const THEME_CLASSES: Record<
  BlogTheme,
  {
    h2: string;
    h3: string;
    p: string;
    li: string;
    bullet: string;
    caption: string;
    link: string;
    label: string;
    faqItem: string;
    faqQ: string;
    faqA: string;
    places: string;
    disclaimer: string;
    intro: string;
    inBreveHeading: string;
    factsTop: FactsVariant;
    factsBody: FactsVariant;
    category: string;
    heroGradient: string;
  }
> = {
  default: {
    h2: "pt-4 font-display text-[24px] font-normal leading-[1.25] text-ink [text-wrap:balance] sm:text-[27px]",
    h3: "pt-2 font-display text-[18px] font-normal leading-[1.3] text-ink [text-wrap:balance]",
    p: "text-[15px] leading-[1.85] text-ink-soft",
    li: "flex items-start gap-2.5 text-[15px] leading-[1.7] text-ink-soft",
    bullet: "mt-2.5 h-1 w-1 shrink-0 rounded-full bg-raspberry",
    caption: "mt-2 block text-[11.5px] leading-[1.5] text-ink-soft/70",
    link: "text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry",
    label: "text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950",
    faqItem: "rounded-[6px] border border-ink/10 bg-cream-dim px-5 py-4",
    faqQ: "text-ink",
    faqA: "text-ink-soft",
    places: "border border-ink/10 bg-cream-dim",
    disclaimer: "text-ink-soft/80",
    intro: "text-ink",
    inBreveHeading: "text-olive-950",
    factsTop: "default",
    factsBody: "default",
    category: "text-gold",
    heroGradient: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.78) 100%)",
  },
  chocolate: {
    h2: "pt-4 font-display text-[24px] font-normal leading-[1.25] text-[#2b1a10] [text-wrap:balance] sm:text-[27px]",
    h3: "pt-2 font-display text-[18px] font-normal leading-[1.3] text-[#2b1a10] [text-wrap:balance]",
    p: "text-[15px] leading-[1.85] text-[#4a3526]",
    li: "flex items-start gap-3 text-[15px] leading-[1.7] text-[#4a3526]",
    bullet: choco.bean,
    caption: "mt-2 block text-[11.5px] leading-[1.5] text-[#6b5442]",
    link: choco.link,
    label: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7b4a2e]",
    faqItem: choco.faqItem,
    faqQ: "text-[#2b1a10]",
    faqA: "text-[#4a3526]",
    places: "border border-[#7b4a2e]/20 bg-white/40",
    disclaimer: "text-[#6b5442]",
    intro: "text-[var(--crema)]",
    inBreveHeading: "text-[var(--caramello-chiaro)]",
    factsTop: "chocolateDark",
    factsBody: "chocolateMilk",
    category: "text-[#e2b277]",
    heroGradient: "linear-gradient(180deg, rgba(43,26,16,.10) 0%, rgba(43,26,16,.55) 55%, rgba(43,26,16,.95) 100%)",
  },
  newyear: {
    h2: "pt-4 font-display text-[24px] font-normal leading-[1.25] text-[#141a45] [text-wrap:balance] sm:text-[27px]",
    h3: "pt-2 font-display text-[18px] font-normal leading-[1.3] text-[#141a45] [text-wrap:balance]",
    p: "text-[15px] leading-[1.85] text-[#3b3f5c]",
    li: "flex items-start gap-3 text-[15px] leading-[1.7] text-[#3b3f5c]",
    bullet: ny.sparkle,
    caption: "mt-2 block text-[11.5px] leading-[1.5] text-[#555a78]",
    link: ny.link,
    label: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6e5212]",
    faqItem: ny.faqItem,
    faqQ: "text-[#141a45]",
    faqA: "text-[#3b3f5c]",
    places: "border border-[#141a45]/15 bg-white/50",
    disclaimer: "text-[#555a78]",
    intro: "text-[var(--avorio)]",
    inBreveHeading: "text-[var(--oro)]",
    factsTop: "newyear",
    factsBody: "newyear",
    category: "text-[#e3c278]",
    // Cielo notturno sopra la foto: più scuro in alto, dove esplodono i
    // fuochi, e pieno in basso, dove il titolo passa alla sezione notte.
    heroGradient: "linear-gradient(180deg, rgba(11,16,48,.62) 0%, rgba(11,16,48,.36) 38%, rgba(11,16,48,.8) 70%, rgba(11,16,48,1) 100%)",
  },
};

/* Fatti estraibili ("In breve", fatti pratici): sul tema cioccolato una
   tavoletta a segmenti, altrimenti il riquadro crema del sito. */
function FactValue({ fact, locale }: { fact: { value: string; promo?: PromoId }; locale: Locale }) {
  if (!fact.promo) return <>{fact.value}</>;
  return (
    <PromoLine promoId={fact.promo} locale={locale}>
      {fact.value}
    </PromoLine>
  );
}

function FactsGrid({
  items,
  variant,
  locale,
}: {
  items: { label: string; value: string; promo?: PromoId }[];
  variant: FactsVariant;
  locale: Locale;
}) {
  if (variant === "newyear") {
    return (
      <dl className={`${ny.root} ${ny.facts}`}>
        {items.map((f) => (
          <div key={f.label} className={ny.fact}>
            <dt className={ny.factLabel}>{f.label}</dt>
            <dd className={ny.factValue}>
              <FactValue fact={f} locale={locale} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  if (variant === "default") {
    return (
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-[6px] border border-ink/10 bg-cream-dim px-6 py-6 sm:grid-cols-3">
        {items.map((f) => (
          <div key={f.label}>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-soft">{f.label}</dt>
            <dd className="mt-1 font-display text-[17px] leading-tight text-ink">
              <FactValue fact={f} locale={locale} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  return (
    <dl className={`${choco.root} ${choco.tablet} ${variant === "chocolateMilk" ? choco.tabletMilk : ""}`}>
      {items.map((f) => (
        <div key={f.label} className={choco.segment}>
          <dt className={choco.segmentLabel}>{f.label}</dt>
          <dd className={choco.segmentValue}>
            <FactValue fact={f} locale={locale} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export async function BlogArticlePageView({ locale, params }: { locale: Locale; params: Promise<Params> }) {
  const text = TEXT[locale];
  const { slug } = await params;
  const posts = getBlogPosts(locale);
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const post = posts[index];
  const mentionedPlaces = findMentionedPlaces(articleText(post));
  const related = posts.filter((_, i) => i !== index).slice(0, 3);
  const theme: BlogTheme = post.theme ?? "default";
  const c = THEME_CLASSES[theme];

  /* Nel @graph della pagina (StructuredData): l'articolo, con autore ed
     editore = La Mora per @id, e la FAQPage solo quando le FAQ sono anche
     visibili in pagina (sotto). */
  const articleUrl = absoluteUrl(articlePath(locale, post.slug));
  const articleNodes: JsonLdNode[] = [
    {
      "@type": post.schemaType ?? "Article",
      "@id": `${articleUrl}#article`,
      headline: post.title,
      description: post.metaDescription,
      image: [absoluteUrl(post.image)],
      inLanguage: locale,
      mainEntityOfPage: articleUrl,
      ...(post.datePublished ? { datePublished: post.datePublished } : {}),
      ...(post.dateModified ? { dateModified: post.dateModified } : {}),
      author: { "@id": LD_ID.lamora },
      publisher: { "@id": LD_ID.lamora },
      isPartOf: { "@id": LD_ID.website },
    },
    ...(post.faq ? [faqPageNode(locale, `/blog/${post.slug}/`, post.faq.items.map((item) => ({ question: item.q, answer: item.a })))] : []),
  ];

  const intro = (
    <Reveal>
      <p className={`font-display text-[20px] font-normal leading-[1.55] [text-wrap:balance] sm:text-[22px] ${c.intro}`}>
        {post.intro}
      </p>
    </Reveal>
  );

  const inBreve = post.inBreve && (
    <Reveal delay={60}>
      <section aria-labelledby="in-breve-heading" className="mt-10">
        <h2 id="in-breve-heading" className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] ${c.inBreveHeading}`}>
          {post.inBreve.heading}
        </h2>
        <FactsGrid items={post.inBreve.items} variant={c.factsTop} locale={locale} />
      </section>
    </Reveal>
  );

  /* CTA di prenotazione (src/components/blog-booking-cta.tsx): A dopo
     l'intro e "In breve", B a metà articolo, C in chiusura dopo le FAQ.
     Testi per articolo in src/data/blog-ctas.ts; per gli articoli senza voce
     la riga della CTA A è l'introCtaHeading dell'articolo. */
  const ctaCopy = getBlogCta(post.slug);
  const ctaTheme = theme;
  const introLine = ctaCopy?.intro[locale] ?? post.introCtaHeading ?? DEFAULT_BLOG_CTA.intro[locale];
  const distance = (ctaCopy ?? DEFAULT_BLOG_CTA).distance;
  /* Posizione della CTA B: al posto del vecchio blocco "cta" centrale, se
     l'articolo ne ha uno; altrimenti prima del titolo H2 più vicino a metà
     del contenuto (mai il primo H2, mai dopo l'ultimo blocco). */
  const legacyCtaIndex = post.content.findIndex((block) => block.type === "cta");
  const h2Indexes = post.content.flatMap((block, i) => (block.type === "h2" && i > 0 ? [i] : []));
  const half = post.content.length / 2;
  const midIndex =
    legacyCtaIndex >= 0
      ? legacyCtaIndex
      : h2Indexes.reduce((best, i) => (Math.abs(i - half) < Math.abs(best - half) ? i : best), h2Indexes[0] ?? -1);

  const introCta = (
    <Reveal delay={80}>
      <BlogBookingCta variant="intro" locale={locale} theme={ctaTheme} line={introLine} />
    </Reveal>
  );
  const midCta = (
    <Reveal>
      <BlogBookingCta variant="distance" locale={locale} theme={ctaTheme} distance={distance} />
    </Reveal>
  );

  /* Striscia "chi scrive" sotto titolo e lead, in tutti gli articoli; il
     riquadro "Dormi a La Mora" (dove previsto) prende il posto della CTA A. */
  const brandStrip = (
    <Reveal delay={40}>
      <BrandStrip locale={locale} theme={theme} />
    </Reveal>
  );
  const stayBox = post.stayBox && (
    <Reveal delay={60}>
      <StayBox data={post.stayBox} locale={locale} theme={theme} />
    </Reveal>
  );

  /* Riquadro "programma ufficiale" (BlogPost.notice): sul tema newyear è un
     pannello notte opaco, altrimenti il riquadro crema del sito. */
  const isNight = theme === "newyear";
  const notice = post.notice && (
    <Reveal delay={60}>
      <aside
        aria-labelledby="notice-heading"
        className={`mt-10 rounded-[10px] px-6 py-6 sm:px-8 ${isNight ? `${ny.root} ${ny.panel}` : "border border-ink/10 bg-cream-dim"}`}
      >
        <h2 id="notice-heading" className={`font-display text-[20px] font-normal leading-[1.3] [text-wrap:balance] ${isNight ? "text-[var(--avorio)]" : "text-ink"}`}>
          {post.notice.heading}
        </h2>
        <p className={`mt-2 text-[14.5px] leading-[1.7] ${isNight ? "text-[var(--avorio)]/85" : "text-ink-soft"}`}>{post.notice.text}</p>
        <a
          href={post.notice.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 inline-block text-[14px] underline underline-offset-4 ${
            isNight ? "text-[var(--oro)] decoration-[var(--oro)]/40 hover:decoration-[var(--oro)]" : c.link
          }`}
        >
          {post.notice.linkLabel} ↗
        </a>
        <p className={`mt-3 text-[12px] ${isNight ? "text-[var(--avorio)]/70" : "text-ink-soft/80"}`}>{post.notice.lastChecked}</p>
      </aside>
    </Reveal>
  );

  const offerTop = post.offerBox && (
    <Reveal delay={100}>
      <div className="mt-10">
        <PromoOfferBox promoId={post.offerBox} locale={locale} headingAs="h2" id="offerta" />
      </div>
    </Reveal>
  );

  function renderBlock(block: (typeof post.content)[number], i: number) {
    switch (block.type) {
      case "h2":
        return (
          <Reveal key={i}>
            <h2 className={c.h2}>{block.text}</h2>
          </Reveal>
        );
      case "h3":
        return (
          <Reveal key={i}>
            <h3 className={c.h3}>{block.text}</h3>
          </Reveal>
        );
      case "p":
        return (
          <Reveal key={i}>
            <p className={c.p}>{block.text}</p>
          </Reveal>
        );
      case "list":
        return (
          <Reveal key={i}>
            <ul className="space-y-2.5">
              {block.items.map((item, j) => (
                <li key={j} className={c.li}>
                  <span aria-hidden="true" className={c.bullet} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        );
      case "facts":
        return (
          <Reveal key={i}>
            <FactsGrid items={block.items} variant={c.factsBody} locale={locale} />
          </Reveal>
        );
      case "image":
        return (
          <Reveal key={i} className="!mt-8">
            <figure>
              <div className={`relative overflow-hidden rounded-[4px] ${block.portrait ? "mx-auto aspect-[4/5] max-w-[520px]" : "aspect-[3/2]"}`}>
                <Image
                  src={block.src}
                  alt={block.alt}
                  fill
                  loading="lazy"
                  sizes={block.portrait ? "(max-width: 640px) 100vw, 520px" : "(max-width: 640px) 100vw, 680px"}
                  className="object-cover"
                />
              </div>
              {(block.caption || block.credit) && (
                <figcaption className={c.caption}>
                  {block.credit ? (
                    <PhotoCreditLine credit={block.credit} locale={locale} prefix={block.caption} linkClassName={c.link} />
                  ) : (
                    block.caption
                  )}
                </figcaption>
              )}
            </figure>
          </Reveal>
        );
      case "links":
        return (
          <Reveal key={i}>
            <nav aria-label={block.heading} className="!mt-10">
              <span className={c.label}>{block.heading}</span>
              <ul className="mt-3 space-y-2">
                {block.items.map((item) => {
                  const external = isExternalHref(item.href);
                  // Villa Relax ha il suo script del widget camere: da una pagina
                  // La Mora ci si arriva con una navigazione piena (<a>), come nel
                  // resto del sito (vedi rooms-widget-script.tsx).
                  const toVilla = item.href.startsWith("/villa-relax-assisi");
                  return (
                    <li key={item.href} className="text-[15px] leading-[1.6]">
                      {external ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className={c.link}>
                          {item.label} ↗
                        </a>
                      ) : toVilla ? (
                        <a href={withLocale(locale, item.href)} className={c.link}>
                          {item.label} →
                        </a>
                      ) : (
                        <Link href={withLocale(locale, item.href)} className={c.link}>
                          {item.label} →
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Reveal>
        );
      default:
        return null;
    }
  }

  const finalCta = (
    <Reveal delay={80}>
      <BlogBookingCta variant="direct" locale={locale} theme={ctaTheme} heading={post.finalCtaHeading} articleTitle={post.title} />
    </Reveal>
  );

  const body = (
    <>
      <div className="mt-2 space-y-6">
        {post.content.map((block, i) => {
          if (block.type === "cta") return i === midIndex ? <Fragment key={i}>{midCta}</Fragment> : null;
          const rendered = renderBlock(block, i);
          return i === midIndex ? (
            <Fragment key={i}>
              {midCta}
              {rendered}
            </Fragment>
          ) : (
            rendered
          );
        })}
      </div>

      {post.faq && (
        <section aria-labelledby="faq-heading" className="mt-14">
          <Reveal>
            <h2 id="faq-heading" className={c.h2}>
              {post.faq.heading}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {post.faq.items.map((f) => (
              <Reveal key={f.q}>
                <div className={c.faqItem}>
                  <h3 className={`font-display text-[18px] font-normal leading-[1.35] ${c.faqQ}`}>{f.q}</h3>
                  <p className={`mt-2 text-[14.5px] leading-[1.75] ${c.faqA}`}>{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {mentionedPlaces.length > 0 && (
        <Reveal>
          <aside
            aria-label={text.placesMentioned}
            className={`mt-10 rounded-[6px] px-6 py-5 ${c.places}`}
          >
            <span className={c.label}>{text.placesMentioned}</span>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {mentionedPlaces.map((place) => (
                <MapsButton key={place.key} place={place} locale={locale} showName />
              ))}
            </div>
          </aside>
        </Reveal>
      )}

      {post.offerBox && (
        <Reveal>
          <div className="mt-12">
            <PromoOfferBox promoId={post.offerBox} locale={locale} headingAs="p" />
          </div>
        </Reveal>
      )}

      {/* Sul tema newyear la CTA di chiusura sta nel finale con i fuochi. */}
      {!isNight && finalCta}

      {post.disclaimer && <p className={`mt-6 text-[12px] leading-[1.6] ${c.disclaimer}`}>{post.disclaimer}</p>}
    </>
  );

  return (
    <>
      <StructuredData locale={locale} path={`/blog/${post.slug}/`} nodes={articleNodes} crumbName={post.title} />

      {/* Hero. Sul tema newyear è più alto: sopra il titolo resta una fascia
          di cielo riservata a stelle e fuochi (il canvas sta solo lì), così
          nessuna animazione passa dietro al testo. */}
      <section
        className={`relative flex overflow-hidden ${
          isNight ? `${ny.root} min-h-[max(56vh,400px)] flex-col justify-end` : "h-[56vh] min-h-[400px] items-end"
        }`}
      >
        <Image src={post.image} alt={post.alt} fill priority fetchPriority="high" sizes="100vw" className="object-cover" style={{ objectPosition: post.imagePosition }} />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: c.heroGradient }} />
        {isNight && (
          <div aria-hidden="true" className="relative mt-[112px] min-h-[170px] flex-1 sm:mt-[132px] sm:min-h-[220px]">
            <StarField className={ny.heroStars} twinkle />
            <FireworksCanvas id="hero" bandTop={0.12} bandBottom={0.5} className={ny.heroCanvas} />
            <StaticFireworks />
          </div>
        )}
        {post.imageCredit && (
          <PhotoCreditLine
            credit={post.imageCredit}
            locale={locale}
            prefix={post.imageCaption}
            className="absolute bottom-2 right-3 z-[2] max-w-[calc(100%-1.5rem)] text-right text-[10.5px] leading-[1.4] text-cream/80 sm:right-5"
            linkClassName="underline decoration-cream/40 underline-offset-2 hover:text-cream"
          />
        )}
        <div className="relative z-[1] mx-auto w-full max-w-[760px] px-6 pb-12 sm:px-10">
          <Link
            href={withLocale(locale, "/blog/")}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-cream/75 transition-colors hover:text-cream"
          >
            <span aria-hidden="true">←</span> {text.allArticles}
          </Link>
          {isNight && (
            // Spazio fisso: il conto alla rovescia compare dopo il mount senza spostare nulla.
            <div className="mt-5 h-7">
              <NewYearCountdown locale={locale} className={ny.pill} />
            </div>
          )}
          <span className={`block text-[10px] font-semibold uppercase tracking-[0.22em] ${isNight ? "mt-4" : "mt-5"} ${c.category}`}>{post.category}</span>
          <h1 className="mt-3 font-display text-[clamp(28px,4.4vw,44px)] font-normal leading-[1.15] text-cream [text-wrap:balance]">
            {post.title}
          </h1>
          {isNight && <FireworksButton target="hero" label={text.fireworks} ariaLabel={text.fireworksLabel} className={`${ny.fireButton} mt-6`} />}
        </div>
      </section>

      {theme === "chocolate" ? (
        <>
          <section className={`${choco.root} ${choco.melted}`}>
            <CocoaParticles />
            <div className="mx-auto max-w-[760px] px-6 pb-14 pt-12 sm:px-10 sm:pb-16 sm:pt-14">
              {intro}
              {brandStrip}
              {inBreve}
              {notice}
              {stayBox}
              {offerTop}
              {!stayBox && introCta}
            </div>
          </section>
          <div className={`${choco.root} ${choco.cream}`}>
            <ChocolateDrip />
            <div className="mx-auto max-w-[680px] px-6 pb-14 pt-6 sm:px-10 sm:pb-16">{body}</div>
          </div>
        </>
      ) : isNight ? (
        <>
          <section className={`${ny.root} ${ny.night}`}>
            <StarField className={ny.starLayer} />
            <div className="mx-auto max-w-[760px] px-6 pb-14 pt-10 sm:px-10 sm:pb-16 sm:pt-12">
              {intro}
              {brandStrip}
              {inBreve}
              {notice}
              {stayBox}
              {offerTop}
              {!stayBox && introCta}
            </div>
          </section>
          <div className={`${ny.root} ${ny.paper}`}>
            <NightHorizon />
            <div className="mx-auto max-w-[680px] px-6 pb-14 pt-6 sm:px-10 sm:pb-16">{body}</div>
          </div>
          {/* Finale: fuochi e stelle sopra e intorno alla CTA di chiusura, che
              è una card opaca (il testo non sta mai sopra l'animazione); i
              fuochi esplodono nella fascia alta lasciata libera dal padding. */}
          <section className={`${ny.root} ${ny.finale}`}>
            <StarField className={ny.starLayer} twinkle />
            <FireworksCanvas id="finale" bandTop={0.03} bandBottom={0.2} className={ny.finaleCanvas} />
            <StaticFireworks />
            <div className="relative mx-auto max-w-[680px] px-6 pb-14 pt-36 sm:px-10 sm:pb-20 sm:pt-52">
              {finalCta}
              <div className="flex justify-center">
                <FireworksButton target="finale" label={text.fireworks} ariaLabel={text.fireworksLabel} className={ny.fireButton} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-cream py-14 sm:py-16">
          <div className="mx-auto max-w-[680px] px-6 sm:px-10">
            {intro}
            {brandStrip}
            {inBreve}
            {notice}
            {stayBox}
            {offerTop}
            {!stayBox && introCta}
            {body}
          </div>
        </section>
      )}

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
                      style={{ objectPosition: p.imagePosition }}
                      sizes="(max-width: 640px) 90vw, 340px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  {p.imageCredit && (
                    <PhotoCreditLine credit={p.imageCredit} locale={locale} linked={false} className="mt-1.5 block text-[10px] leading-[1.4] text-ink-soft" />
                  )}
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
