import Link from "next/link";
import { WatermarkedImage } from "@/components/watermarked-image";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { TimedPromos } from "@/components/timed-promos";
import { StructuredData } from "@/components/structured-data";
import { getActivePromos } from "@/data/promo";
import { STANDING_OFFERS } from "@/data/standing-offers";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { SITE_URL, pageMetadata } from "@/lib/seo";
import { LD_ID, type JsonLdNode } from "@/lib/structured-data";

const PATH = "/offerte/offerte-in-corso/";

/* Ora della build (pagina statica): stato delle promo nell'HTML generato e
   nel JSON-LD. Nel browser lo ricalcola TimedPromos con l'ora reale. */
const BUILT_AT = Date.now();

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Offerte in corso",
    description: "Le promozioni a tempo attive ad Agriturismo La Mora, ad Assisi, e le altre offerte per chi prenota direttamente: sconti, colazione inclusa e cofanetti regalo, con le condizioni complete.",
  },
  en: {
    title: "Current offers in Assisi",
    description: "Time-limited promotions now running at Agriturismo La Mora in Assisi, plus the other offers for direct bookings: discounts, breakfast included and gift boxes, with full conditions.",
  },
  fr: {
    title: "Offres en cours à Assise",
    description: "Les promotions à durée limitée en cours à l'Agriturismo La Mora, à Assise, et les autres offres pour une réservation directe : remises, petit-déjeuner inclus et coffrets cadeaux, avec les conditions complètes.",
  },
  de: {
    title: "Aktuelle Angebote in Assisi",
    description: "Zeitlich begrenzte Aktionen im Agriturismo La Mora in Assisi und die weiteren Angebote bei Direktbuchung: Rabatte, Frühstück inklusive und Geschenkboxen, mit allen Bedingungen.",
  },
};

export function getOfferteInCorsoMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return pageMetadata({ locale, path: PATH, title: m.title, description: m.description });
}

const TEXT: Record<
  Locale,
  {
    heroLabel: string;
    heroTitle: string;
    heroAlt: string;
    intro: string;
    activeLabel: string;
    activeHeading: string;
    otherLabel: string;
    otherHeading: string;
    offerCta: string;
    allOffers: string;
  }
> = {
  it: {
    heroLabel: "Offerte · Agriturismo La Mora",
    heroTitle: "Offerte in corso",
    heroAlt: "Agriturismo La Mora visto dall'alto: la casa, gli appartamenti, il parco e la campagna intorno",
    intro: "Le promozioni a tempo attive in questo momento e le altre offerte per chi prenota direttamente con noi. Ogni offerta rimanda alla pagina con le condizioni complete.",
    activeLabel: "Promozioni a tempo",
    activeHeading: "In corso adesso",
    otherLabel: "Prenotando direttamente",
    otherHeading: "Le altre offerte di La Mora",
    offerCta: "Scopri l'offerta",
    allOffers: "Tutti i vantaggi della prenotazione diretta",
  },
  en: {
    heroLabel: "Offers · Agriturismo La Mora",
    heroTitle: "Current offers",
    heroAlt: "Agriturismo La Mora from above: the farmhouse, the apartments, the grounds and the surrounding countryside",
    intro: "The time-limited promotions running right now and the other offers for those who book directly with us. Each offer links to the page with its full conditions.",
    activeLabel: "Time-limited promotions",
    activeHeading: "Running now",
    otherLabel: "When you book direct",
    otherHeading: "La Mora's other offers",
    offerCta: "See the offer",
    allOffers: "All the benefits of booking direct",
  },
  fr: {
    heroLabel: "Offres · Agriturismo La Mora",
    heroTitle: "Offres en cours",
    heroAlt: "L'Agriturismo La Mora vu d'en haut : la maison, les appartements, le parc et la campagne autour",
    intro: "Les promotions à durée limitée en cours et les autres offres pour ceux qui réservent directement chez nous. Chaque offre renvoie à la page avec ses conditions complètes.",
    activeLabel: "Promotions à durée limitée",
    activeHeading: "En ce moment",
    otherLabel: "En réservant en direct",
    otherHeading: "Les autres offres de La Mora",
    offerCta: "Voir l'offre",
    allOffers: "Tous les avantages de la réservation directe",
  },
  de: {
    heroLabel: "Angebote · Agriturismo La Mora",
    heroTitle: "Aktuelle Angebote",
    heroAlt: "Das Agriturismo La Mora von oben: das Haus, die Wohnungen, der Park und die Landschaft ringsum",
    intro: "Die zeitlich begrenzten Aktionen, die gerade laufen, und die weiteren Angebote für alle, die direkt bei uns buchen. Jedes Angebot führt zur Seite mit allen Bedingungen.",
    activeLabel: "Zeitlich begrenzte Aktionen",
    activeHeading: "Jetzt aktuell",
    otherLabel: "Bei Direktbuchung",
    otherHeading: "Die weiteren Angebote von La Mora",
    offerCta: "Zum Angebot",
    allOffers: "Alle Vorteile der Direktbuchung",
  },
};

/* CollectionPage con l'elenco delle pagine in cui le offerte sono descritte
   (ItemList di link): niente schema Offer, perché prezzi, sconti e
   condizioni stanno nelle pagine collegate e non tutti sono certi. Le promo
   a tempo entrano solo se attive alla build. */
function collectionPageNode(locale: Locale, builtAt: number): JsonLdNode {
  const url = `${SITE_URL}${withLocale(locale, PATH)}`;
  const m = METADATA_TEXT[locale];
  const items = [
    ...getActivePromos(builtAt).map((p) => ({ name: p.text[locale].title, url: `${SITE_URL}${withLocale(locale, `/blog/${p.articleSlug}/`)}` })),
    ...STANDING_OFFERS.map((o) => ({ name: o.text[locale].title, url: `${SITE_URL}${withLocale(locale, o.href)}` })),
  ];
  return {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: m.title,
    description: m.description,
    inLanguage: locale,
    isPartOf: { "@id": LD_ID.website },
    about: { "@id": LD_ID.lamora },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: item.url })),
    },
  };
}

/* Pagina "Offerte in corso" (/offerte/offerte-in-corso/, voce del menu
   Offerte): in alto le promo a tempo attive (src/data/promo.ts), poi le
   offerte sempre presenti sul sito (src/data/standing-offers.ts), in fondo
   le promo concluse. Tutto dai dati, nessun testo di offerta nel JSX. */
export function OfferteInCorsoPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];

  return (
    <>
      <StructuredData locale={locale} path={PATH} nodes={[collectionPageNode(locale, BUILT_AT)]} />
      <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden">
        <WatermarkedImage
          src="/images/home/foto dell agriturismo dall alto.webp"
          alt={text.heroAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.15) 0%, rgba(20,14,7,.74) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[680px] px-6 pb-10 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/80">{text.heroLabel}</span>
          <h1 className="mt-3 font-display text-[clamp(30px,4.4vw,46px)] font-normal leading-[1.12] text-cream [text-wrap:balance]">{text.heroTitle}</h1>
        </div>
      </section>

      <section className="bg-cream pb-16 pt-14 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <p className="mx-auto max-w-[640px] text-center text-[15px] leading-[1.8] text-ink-soft">{text.intro}</p>
          <div className="mt-12">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.activeLabel}</span>
            <h2 className="mb-8 mt-3 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink">{text.activeHeading}</h2>
            <TimedPromos locale={locale} builtAt={BUILT_AT} show="active" />
          </div>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.otherLabel}</span>
            <h2 className="mt-3 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink">{text.otherHeading}</h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STANDING_OFFERS.map((offer, i) => (
              <li key={offer.id}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <Link
                    href={withLocale(locale, offer.href)}
                    className="group flex h-full flex-col rounded-[4px] border border-ink/10 bg-cream px-6 py-6 transition-colors hover:border-ink/25"
                  >
                    {offer.stat && <span className="font-display text-[36px] leading-none text-raspberry">{offer.stat}</span>}
                    <h3 className={`font-display text-[21px] font-normal leading-[1.25] text-ink ${offer.stat ? "mt-2" : ""}`}>{offer.text[locale].title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-[1.7] text-ink-soft">{offer.text[locale].body}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-raspberry">
                      {text.offerCta}
                      <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TimedPromos locale={locale} builtAt={BUILT_AT} show="expired" />

      <section className="bg-cream py-14 text-center sm:py-16">
        <div className="mx-auto max-w-[640px] px-6 sm:px-10">
          <Link
            href={withLocale(locale, "/offerte/")}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
          >
            <HoverFill color="#8f4324" />
            <span className="relative z-10 inline-flex items-center gap-2.5">
              {text.allOffers}
              <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
