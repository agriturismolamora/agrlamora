import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { APARTMENTS, getBrochureWhatsappUrl } from "@/data/apartments";
import { getApartmentDetails, getSharedAmenities } from "@/data/apartment-details";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { ZodiacMark } from "@/components/zodiac-mark";
import { AvailabilityBox } from "@/components/availability-box";
import { ApartmentGallery } from "@/components/apartment-gallery";
import { AMENITY_ICON_BY_LABEL, MirrorIcon } from "@/components/amenity-icons";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.42a9.86 9.86 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.02.1-3.31-.75-2.79-1.04-4.59-3.9-4.73-4.08-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.3.24-.26.55-.33.73-.33h.53c.17 0 .4-.03.62.48.24.55.8 1.91.87 2.05.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

type Params = { slug: string };

const TEXT: Record<
  Locale,
  {
    torna: string;
    richiediGuida: string;
    ospiti: string;
    metratura: string;
    letti: string;
    bagni: string;
    lAppartamento: string;
    caratteristiche: string;
    galleria: string;
    inImmagini: string;
    daXTutta: (name: string) => string;
    ilTerritorio: string;
    leAttivita: string;
    piscinaInclusa: string;
    verificaDisponibilitaPer: (name: string) => string;
    scriviciDirettamente: string;
    verificaDisponibilita: string;
    tornaATutti: string;
    scaricaBrochure: string;
    whatsappQuote: (name: string) => string;
    metaTitle: (name: string) => string;
    metaDesc: (tagline: string, guests: number, sqm: number, feature: string) => string;
  }
> = {
  it: {
    torna: "Torna agli appartamenti",
    richiediGuida: "Richiedi la guida su WhatsApp",
    ospiti: "Ospiti",
    metratura: "Metratura",
    letti: "Letti",
    bagni: "Bagni",
    lAppartamento: "L'appartamento",
    caratteristiche: "Caratteristiche e servizi",
    galleria: "Galleria",
    inImmagini: "in immagini",
    daXTutta: (name) => `Da ${name}, tutta l'Umbria è vicina: scopri`,
    ilTerritorio: "il territorio",
    leAttivita: "le attività",
    piscinaInclusa: "disponibili in struttura, piscina inclusa.",
    verificaDisponibilitaPer: (name) => `Verifica la disponibilità per ${name}`,
    scriviciDirettamente: "Scrivici direttamente: nessun intermediario, nessuna commissione.",
    verificaDisponibilita: "Verifica disponibilità",
    tornaATutti: "Torna a tutti gli appartamenti",
    scaricaBrochure: "Scarica la brochure di benvenuto (PDF)",
    whatsappQuote: (name) => `Ciao! Vorrei informazioni sulla disponibilità dell'appartamento ${name}.`,
    metaTitle: (name) => `Appartamento ${name} ad Assisi`,
    metaDesc: (tagline, guests, sqm, feature) => `${tagline} Fino a ${guests} ospiti, ${sqm} m², ad Assisi (Umbria). ${feature}.`,
  },
  en: {
    torna: "Back to apartments",
    richiediGuida: "Request the guide on WhatsApp",
    ospiti: "Guests",
    metratura: "Size",
    letti: "Beds",
    bagni: "Bathrooms",
    lAppartamento: "The apartment",
    caratteristiche: "Features and amenities",
    galleria: "Gallery",
    inImmagini: "in pictures",
    daXTutta: (name) => `From ${name}, all of Umbria is close by: discover`,
    ilTerritorio: "the area",
    leAttivita: "the activities",
    piscinaInclusa: "available at the property, pool included.",
    verificaDisponibilitaPer: (name) => `Check availability for ${name}`,
    scriviciDirettamente: "Write to us directly: no middlemen, no commission.",
    verificaDisponibilita: "Check availability",
    tornaATutti: "Back to all apartments",
    scaricaBrochure: "Download the welcome brochure (PDF)",
    whatsappQuote: (name) => `Hi! I'd like information on the availability of the ${name} apartment.`,
    metaTitle: (name) => `${name} Apartment in Assisi`,
    metaDesc: (tagline, guests, sqm, feature) => `${tagline} Up to ${guests} guests, ${sqm} m², in Assisi (Umbria). ${feature}.`,
  },
  fr: {
    torna: "Retour aux appartements",
    richiediGuida: "Demander le guide sur WhatsApp",
    ospiti: "Voyageurs",
    metratura: "Superficie",
    letti: "Lits",
    bagni: "Salles de bain",
    lAppartamento: "L'appartement",
    caratteristiche: "Caractéristiques et services",
    galleria: "Galerie",
    inImmagini: "en images",
    daXTutta: (name) => `Depuis ${name}, toute l'Ombrie est proche : découvrez`,
    ilTerritorio: "le territoire",
    leAttivita: "les activités",
    piscinaInclusa: "disponibles dans la structure, piscine incluse.",
    verificaDisponibilitaPer: (name) => `Vérifiez la disponibilité pour ${name}`,
    scriviciDirettamente: "Écrivez-nous directement : aucun intermédiaire, aucune commission.",
    verificaDisponibilita: "Vérifier la disponibilité",
    tornaATutti: "Retour à tous les appartements",
    scaricaBrochure: "Télécharger la brochure de bienvenue (PDF)",
    whatsappQuote: (name) => `Bonjour ! Je voudrais des informations sur la disponibilité de l'appartement ${name}.`,
    metaTitle: (name) => `Appartement ${name} à Assise`,
    metaDesc: (tagline, guests, sqm, feature) => `${tagline} Jusqu'à ${guests} personnes, ${sqm} m², à Assise (Ombrie). ${feature}.`,
  },
  de: {
    torna: "Zurück zu den Apartments",
    richiediGuida: "Anleitung auf WhatsApp anfordern",
    ospiti: "Gäste",
    metratura: "Größe",
    letti: "Betten",
    bagni: "Bäder",
    lAppartamento: "Das Apartment",
    caratteristiche: "Ausstattung und Service",
    galleria: "Galerie",
    inImmagini: "in Bildern",
    daXTutta: (name) => `Von ${name} aus ist ganz Umbrien nah: entdecken Sie`,
    ilTerritorio: "die Umgebung",
    leAttivita: "die Aktivitäten",
    piscinaInclusa: "der Unterkunft, Pool inklusive.",
    verificaDisponibilitaPer: (name) => `Verfügbarkeit für ${name} prüfen`,
    scriviciDirettamente: "Schreiben Sie uns direkt: kein Vermittler, keine Provision.",
    verificaDisponibilita: "Verfügbarkeit prüfen",
    tornaATutti: "Zurück zu allen Apartments",
    scaricaBrochure: "Willkommensbroschüre herunterladen (PDF)",
    whatsappQuote: (name) => `Hallo! Ich hätte gerne Informationen zur Verfügbarkeit des Apartments ${name}.`,
    metaTitle: (name) => `Apartment ${name} in Assisi`,
    metaDesc: (tagline, guests, sqm, feature) => `${tagline} Bis zu ${guests} Gäste, ${sqm} m², in Assisi (Umbrien). ${feature}.`,
  },
};

export function apartmentStaticParams(): Params[] {
  return APARTMENTS.map((a) => ({ slug: a.slug }));
}

export async function apartmentMetadata(locale: Locale, params: Promise<Params>): Promise<Metadata> {
  const { slug } = await params;
  const apt = APARTMENTS.find((a) => a.slug === slug);
  const detail = getApartmentDetails(locale)[slug];
  if (!apt || !detail) return {};
  const t = TEXT[locale];

  const title = t.metaTitle(apt.name);
  const description = t.metaDesc(detail.tagline, apt.maxGuests, apt.sqm, detail.distinctiveFeature);

  return {
    title,
    description,
    alternates: { canonical: withLocale(locale, apt.href) },
    openGraph: { title, description, images: [detail.gallery[0].src] },
  };
}

export async function ApartmentPageView({ locale, params }: { locale: Locale; params: Promise<Params> }) {
  const { slug } = await params;
  const apt = APARTMENTS.find((a) => a.slug === slug);
  const detail = getApartmentDetails(locale)[slug];
  if (!apt || !detail) notFound();
  const t = TEXT[locale];

  const hero = detail.gallery[0];
  const allAmenities = [...getSharedAmenities(locale), ...(detail.specificAmenities ?? [])];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: `Appartamento ${apt.name}`,
    description: detail.tagline,
    numberOfRooms: 1,
    occupancy: { "@type": "QuantitativeValue", maxValue: apt.maxGuests },
    floorSize: { "@type": "QuantitativeValue", value: apt.sqm, unitCode: "MTK" },
    petsAllowed: Boolean(apt.petFriendly),
    containedInPlace: { "@type": "LodgingBusiness", name: "Agriturismo La Mora", address: "Via Fonte Citerna 7, 06081 Assisi (PG)" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero immersiva */}
      <section className="relative flex h-[78vh] min-h-[520px] items-end overflow-hidden">
        <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.75) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[1200px] px-6 pb-12 sm:px-10 sm:pb-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={withLocale(locale, "/alloggi/")}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-cream/75 transition-colors hover:text-cream"
            >
              <span aria-hidden="true">←</span> {t.torna}
            </Link>
            <a
              href={getBrochureWhatsappUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-ink/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.05em] text-cream backdrop-blur-sm transition-colors hover:border-cream hover:bg-ink/35"
            >
              <WhatsAppIcon />
              {t.richiediGuida}
            </a>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <ZodiacMark sign={apt.zodiac} className="h-8 w-8 text-cream" />
            <h1 className="font-display text-[clamp(40px,7vw,72px)] font-normal leading-none text-cream">{apt.name}</h1>
          </div>
          <p className="mt-3 max-w-[520px] font-display text-[19px] font-normal italic leading-[1.4] text-cream/85">
            {detail.tagline}
          </p>
        </div>
      </section>

      {/* 2. Fascia dati essenziali */}
      <section className="border-b border-ink/10 bg-cream-dim">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-6 py-7 text-center sm:grid-cols-4 sm:px-10">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">{t.ospiti}</dt>
            <dd className="mt-1 font-display text-2xl text-ink">{apt.maxGuests}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">{t.metratura}</dt>
            <dd className="mt-1 font-display text-2xl text-ink">{apt.sqm} m²</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">{t.letti}</dt>
            <dd className="mt-1 font-display text-2xl text-ink">{apt.beds}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">{t.bagni}</dt>
            <dd className="mt-1 font-display text-2xl text-ink">{apt.bathrooms}</dd>
          </div>
        </div>
      </section>

      {/* 3. Descrizione + prenotazione */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_340px] lg:gap-20">
          <Reveal>
            <article>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{t.lAppartamento}</span>
              <h2 className="mt-4 font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                {detail.distinctiveFeature}
              </h2>
              <div className="mt-6 space-y-5">
                {detail.description.map((p, i) => (
                  <p key={i} className="max-w-[620px] text-[15px] leading-[1.8] text-ink-soft">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <AvailabilityBox apt={apt} />
          </Reveal>
        </div>
      </section>

      {/* 4. Caratteristiche e servizi */}
      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{t.caratteristiche}</span>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
              {allAmenities.map((label) => {
                const Icon = AMENITY_ICON_BY_LABEL[label] ?? MirrorIcon;
                return (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-olive-700">
                      <Icon />
                    </span>
                    <span className="text-[13px] leading-[1.4] text-ink">{label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Galleria */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{t.galleria}</span>
            <h2 className="mt-4 font-display text-[clamp(24px,2.6vw,32px)] font-normal leading-[1.2] text-ink">
              {apt.name} {t.inImmagini}
            </h2>
          </Reveal>
          <div className="mt-8">
            <ApartmentGallery images={detail.gallery} />
          </div>
        </div>
      </section>

      {/* Link interni contestuali: cosa fare oltre l'appartamento */}
      <section className="bg-cream-dim py-10">
        <div className="mx-auto max-w-[1200px] px-6 text-center sm:px-10">
          <Reveal>
            <p className="text-[13px] leading-[1.7] text-ink-soft">
              {t.daXTutta(apt.name)}{" "}
              <Link href={withLocale(locale, "/territorio/")} className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry">
                {t.ilTerritorio}
              </Link>{" "}
              {locale === "it" ? "intorno ad Assisi o le" : locale === "en" ? "around Assisi or" : locale === "fr" ? "autour d'Assise ou" : "rund um Assisi oder"}{" "}
              <Link
                href={withLocale(locale, "/agriturismo-famiglie-ad-assisi-e-dintorni/")}
                className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry"
              >
                {t.leAttivita}
              </Link>{" "}
              {t.piscinaInclusa}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6. Conversione finale */}
      <section className="bg-[#1f180e] py-20 text-center sm:py-24">
        <div className="mx-auto max-w-[560px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              {t.verificaDisponibilitaPer(apt.name)}
            </h2>
            <p className="mx-auto mt-4 max-w-[420px] text-[14px] leading-[1.7] text-cream/65">
              {t.scriviciDirettamente}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/393934363917?text=${encodeURIComponent(t.whatsappQuote(apt.name))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
              >
                <HoverFill color="#8f7330" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {t.verificaDisponibilita}
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
              <Link
                href={withLocale(locale, "/alloggi/")}
                className="text-[11px] font-semibold uppercase tracking-[0.06em] text-cream/70 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
              >
                {t.tornaATutti}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
