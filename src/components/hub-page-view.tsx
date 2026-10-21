import Link from "next/link";
import { WatermarkedImage } from "@/components/watermarked-image";
import { Reveal } from "@/components/scroll-reveal";
import { BookingModalButton } from "@/components/booking-modal-button";
import { FaqAccordion } from "@/components/faq-accordion";
import { StructuredData } from "@/components/structured-data";
import { BlogCard } from "@/components/blog-card";
import { APARTMENTS } from "@/data/apartments";
import { getApartmentDetails } from "@/data/apartment-details";
import { getBlogPostsByTopic } from "@/data/blog-posts";
import { HUBS, type HubIcon, type HubId } from "@/data/hubs";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { SITE_URL, pageMetadata } from "@/lib/seo";
import { LD_ID, faqPageNode, type JsonLdNode } from "@/lib/structured-data";

const WHATSAPP_NUMBER = "393934363917";

export function getHubMetadata(id: HubId, locale: Locale) {
  const hub = HUBS[id];
  const text = hub.text[locale];
  return pageMetadata({ locale, path: hub.path, title: text.metaTitle, description: text.metaDescription });
}

const UI: Record<Locale, { guests: (n: number) => string; readMore: string; open: string }> = {
  it: { guests: (n) => `Fino a ${n} ospiti`, readMore: "Leggi l'articolo", open: "Scopri l'appartamento" },
  en: { guests: (n) => `Up to ${n} guests`, readMore: "Read the article", open: "See the apartment" },
  fr: { guests: (n) => `Jusqu'à ${n} personnes`, readMore: "Lire l'article", open: "Voir l'appartement" },
  de: { guests: (n) => `Bis zu ${n} Gäste`, readMore: "Artikel lesen", open: "Zum Apartment" },
};

/* Icone con lo stesso tratto (1.5) del resto del sito. */
function Icon({ name }: { name: HubIcon }) {
  const p = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  const paths: Record<HubIcon, React.JSX.Element> = {
    paw: (
      <>
        <circle cx="7" cy="9" r="1.6" fill="currentColor" />
        <circle cx="12" cy="6.5" r="1.6" fill="currentColor" />
        <circle cx="17" cy="9" r="1.6" fill="currentColor" />
        <path {...p} d="M12 12c-3 0-5.5 2-5.5 4.3 0 1.7 1.5 2.7 3 2.2.9-.3 1.7-.3 2.5 0 1.5.5 3-.5 3-2.2C15.5 14 13 12 12 12Z" />
      </>
    ),
    garden: (
      <>
        <path {...p} d="M12 20c0-6.5 5-8.5 8-9-1 4.5-3 8-8 9Z" />
        <path {...p} d="M12 20c0-7-5-9.5-8-10 1 5 3 9 8 10Z" />
        <path {...p} d="M12 20v-5" />
      </>
    ),
    shower: (
      <>
        <path {...p} d="M5 20V8a4 4 0 0 1 8 0" />
        <path {...p} d="M10 8h6" />
        <path {...p} d="M11 12v1M14 12v1M17 12v1M12 15.5v1M15 15.5v1M13.5 19v1" />
      </>
    ),
    euro: (
      <>
        <circle {...p} cx="12" cy="12" r="8" />
        <path {...p} d="M15 9a3.5 3.5 0 1 0 0 6M8 11h5M8 13h5" />
      </>
    ),
    leash: (
      <>
        <path {...p} d="M5 5c3 0 5 2 5 5v4a4 4 0 0 0 8 0v-1" />
        <circle {...p} cx="18" cy="11" r="2" />
      </>
    ),
    form: (
      <>
        <rect {...p} x="5" y="3.5" width="14" height="17" rx="1.5" />
        <path {...p} d="M8.5 8h7M8.5 11.5h7M8.5 15h4" />
      </>
    ),
    slide: (
      <>
        <path {...p} d="M5 20V6h3v14M5 10h3M5 14h3" />
        <path {...p} d="M8 6c4 0 4 5 7.5 9.5 1 1.3 2.5 2.5 4.5 3" />
      </>
    ),
    pool: (
      <>
        <path {...p} d="M3 16c1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0 1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0" />
        <path {...p} d="M3 20c1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0 1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0" />
        <path {...p} d="M8 12V5.5a2 2 0 1 1 4 0M12 9h5" />
      </>
    ),
    ball: (
      <>
        <circle {...p} cx="12" cy="12" r="8" />
        <path {...p} d="m12 8 3 2.2-1.1 3.5h-3.8L9 10.2 12 8ZM12 8V4.5M15 10.2l3.4-1.1M13.9 13.7l2 3M10.1 13.7l-2 3M9 10.2l-3.4-1.1" />
      </>
    ),
    kitchen: (
      <>
        <rect {...p} x="4" y="4" width="16" height="16" rx="1.5" />
        <path {...p} d="M4 9h16" />
        <circle {...p} cx="9" cy="14.5" r="2.2" />
        <circle {...p} cx="15.5" cy="14.5" r="1.4" />
      </>
    ),
    cradle: (
      <>
        <path {...p} d="M4 10h16v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5Z" />
        <path {...p} d="M7 10V6.5M10.5 10V6M14 10V6M17 10V6.5M4 6h16" />
        <path {...p} d="M6 20.5 8 18M18 20.5 16 18" />
      </>
    ),
    baby: (
      <>
        <circle {...p} cx="12" cy="8" r="3.5" />
        <path {...p} d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
        <path {...p} d="M10.5 8.2h.01M13.5 8.2h.01" />
      </>
    ),
    cup: (
      <>
        <path {...p} d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9Z" />
        <path {...p} d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c0 1.5 1.5 1.5 1.5 3M11.5 3.5c0 1.5 1.5 1.5 1.5 3" />
      </>
    ),
    plate: (
      <>
        <circle {...p} cx="12" cy="13" r="6.5" />
        <circle {...p} cx="12" cy="13" r="3.5" />
        <path {...p} d="M3.5 4.5v6.5M2 4.5v3a1.5 1.5 0 0 0 3 0v-3M20.5 4.5c-1.4.6-2 2.4-2 4.5h2v8" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const LINK_CLASS = "text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry";

function hubNodes(id: HubId, locale: Locale): JsonLdNode[] {
  const hub = HUBS[id];
  const text = hub.text[locale];
  const url = `${SITE_URL}${withLocale(locale, hub.path)}`;
  return [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: text.metaTitle,
      description: text.metaDescription,
      inLanguage: locale,
      isPartOf: { "@id": LD_ID.website },
      about: { "@id": LD_ID.lamora },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    faqPageNode(locale, hub.path, text.faq),
  ];
}

/* Pagina hub "Vacanza con animali" / "Vacanza in famiglia" (menu Alloggi,
   dati in src/data/hubs.ts). La sezione "Dal blog" elenca da sola gli
   articoli con il topic dell'hub (blog-posts.ts) e non compare se non ce
   ne sono. */
export function HubPageView({ id, locale }: { id: HubId; locale: Locale }) {
  const hub = HUBS[id];
  const text = hub.text[locale];
  const ui = UI[locale];
  const details = getApartmentDetails(locale);
  const apartments = hub.apartments.map((slug) => APARTMENTS.find((a) => a.slug === slug)).filter((a) => a !== undefined);
  const posts = getBlogPostsByTopic(locale, hub.topic);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text.whatsappMessage)}`;

  return (
    <>
      <StructuredData locale={locale} path={hub.path} nodes={hubNodes(id, locale)} />

      <section className="relative flex h-[68vh] min-h-[460px] items-end overflow-hidden">
        <WatermarkedImage
          src={hub.heroImage.src}
          alt={text.heroAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          style={hub.heroImage.position ? { objectPosition: hub.heroImage.position } : undefined}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.08) 0%, rgba(20,14,7,.32) 55%, rgba(20,14,7,.78) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-14 text-center sm:px-10 sm:pb-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/80">{text.heroLabel}</span>
          <h1 className="mt-4 font-display text-[clamp(32px,5vw,56px)] font-normal leading-[1.1] text-cream [text-wrap:balance]">{text.h1}</h1>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[760px] px-6 sm:px-10">
          <Reveal>
            {text.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "font-display text-[clamp(21px,2.6vw,27px)] leading-[1.5] text-ink [text-wrap:pretty]" : "mt-6 text-[15px] leading-[1.85] text-ink-soft"}>
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.offerLabel}</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">{text.offerHeading}</h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {text.offers.map((o) => (
              <li key={o.title} className="flex gap-4 rounded-[6px] border border-ink/10 bg-cream px-5 py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream-dim text-olive-700">
                  <Icon name={o.icon} />
                </span>
                <span>
                  <span className="block font-display text-[20px] leading-tight text-ink">{o.title}</span>
                  <span className="mt-1.5 block text-[13.5px] leading-[1.65] text-ink-soft">{o.body}</span>
                  {o.href && o.linkLabel && (
                    <Link href={withLocale(locale, o.href)} className={`mt-2 inline-block text-[12.5px] font-semibold ${LINK_CLASS}`}>
                      {o.linkLabel} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.apartmentsLabel}</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">{text.apartmentsHeading}</h2>
            <p className="mt-4 max-w-[680px] text-[14.5px] leading-[1.75] text-ink-soft">{text.apartmentsBody}</p>
          </Reveal>
          <ul className={`mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 ${apartments.length > 2 ? "lg:grid-cols-3" : ""}`}>
            {apartments.map((apt) => (
              <li key={apt.slug}>
                <Link href={withLocale(locale, apt.href)} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-ink/5">
                    <WatermarkedImage
                      src={apt.image}
                      alt={apt.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-[23px] font-normal leading-tight text-ink">{apt.name}</h3>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.04em] text-ink-soft">
                    {ui.guests(apt.maxGuests)} · {apt.sqm} m²
                  </p>
                  {details[apt.slug]?.tagline && <p className="mt-2 text-[13.5px] leading-[1.6] text-ink-soft">{details[apt.slug].tagline}</p>}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-raspberry">
                    {ui.open} <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.costsLabel}</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">{text.costsHeading}</h2>
          </Reveal>
          <dl className="mt-8 divide-y divide-ink/10 rounded-[6px] border border-ink/10 bg-cream">
            {text.costs.map((c) => (
              <div key={c.label} className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                <dt className="text-[14px] font-semibold text-ink">
                  {c.label}
                  {c.note && <span className="mt-0.5 block text-[12.5px] font-normal leading-[1.55] text-ink-soft">{c.note}</span>}
                  {c.href && c.linkLabel && (
                    <Link href={withLocale(locale, c.href)} className={`mt-1 inline-block text-[12.5px] font-semibold ${LINK_CLASS}`}>
                      {c.linkLabel} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </dt>
                <dd className="font-display text-[22px] leading-tight text-raspberry [font-variant-numeric:lining-nums]">{c.value}</dd>
              </div>
            ))}
          </dl>
          {text.costsNote && <p className="mt-4 text-[14px] font-semibold text-ink">{text.costsNote}</p>}
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.nearbyLabel}</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">{text.nearbyHeading}</h2>
            <p className="mt-4 text-[14.5px] leading-[1.75] text-ink-soft">{text.nearbyBody}</p>
            <ul className="mt-5 space-y-2 text-[14.5px]">
              {text.nearbyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={withLocale(locale, l.href)} className={LINK_CLASS}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {posts.length > 0 && (
        <section aria-labelledby={`${id}-blog-heading`} className="bg-cream-dim py-16 sm:py-20">
          <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.blogLabel}</span>
            <h2 id={`${id}-blog-heading`} className="mt-3 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink">
              {text.blogHeading}
            </h2>
            <Reveal>
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <BlogCard post={post} locale={locale} readMore={ui.readMore} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.faqLabel}</span>
          <div className="mt-6">
            <FaqAccordion items={text.faq} />
          </div>
        </div>
      </section>

      <section className="bg-[#1f180e] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[560px] px-6 sm:px-10">
          <h2 className="font-display text-[clamp(26px,3vw,34px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">{text.ctaHeading}</h2>
          <p className="mt-4 text-[14px] leading-[1.75] text-cream/75">{text.ctaBody}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <BookingModalButton
              sheen="strong"
              className="inline-flex min-h-[46px] items-center gap-2.5 rounded-lg bg-gold px-7 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-[#1f180e] transition-colors hover:bg-[#c9a24a]"
            >
              {text.ctaBook}
              <span aria-hidden="true">→</span>
            </BookingModalButton>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center rounded-lg border border-cream/30 px-6 font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-cream transition-colors hover:border-cream"
            >
              {text.ctaWhatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
