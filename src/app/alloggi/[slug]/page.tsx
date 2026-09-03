import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { APARTMENTS } from "@/data/apartments";
import { APARTMENT_DETAILS, SHARED_AMENITIES } from "@/data/apartment-details";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { ZodiacMark } from "@/components/zodiac-mark";
import { AvailabilityBox } from "@/components/availability-box";
import { ApartmentGallery } from "@/components/apartment-gallery";
import { AMENITY_ICON_BY_LABEL, MirrorIcon } from "@/components/amenity-icons";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return APARTMENTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const apt = APARTMENTS.find((a) => a.slug === slug);
  const detail = APARTMENT_DETAILS[slug];
  if (!apt || !detail) return {};

  const title = `Appartamento ${apt.name} ad Assisi`;
  const description = `${detail.tagline} Fino a ${apt.maxGuests} ospiti, ${apt.sqm} m², ad Assisi (Umbria). ${detail.distinctiveFeature}.`;

  return {
    title,
    description,
    alternates: { canonical: apt.href },
    openGraph: { title, description, images: [detail.gallery[0].src] },
  };
}

export default async function ApartmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const apt = APARTMENTS.find((a) => a.slug === slug);
  const detail = APARTMENT_DETAILS[slug];
  if (!apt || !detail) notFound();

  const hero = detail.gallery[0];
  const allAmenities = [...SHARED_AMENITIES, ...(detail.specificAmenities ?? [])];

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
          <Link
            href="/alloggi/"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-cream/75 transition-colors hover:text-cream"
          >
            <span aria-hidden="true">←</span> Torna agli appartamenti
          </Link>
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
            <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">Ospiti</dt>
            <dd className="mt-1 font-display text-2xl text-ink">{apt.maxGuests}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">Metratura</dt>
            <dd className="mt-1 font-display text-2xl text-ink">{apt.sqm} m²</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">Letti</dt>
            <dd className="mt-1 font-display text-2xl text-ink">{apt.beds}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft">Bagni</dt>
            <dd className="mt-1 font-display text-2xl text-ink">{apt.bathrooms}</dd>
          </div>
        </div>
      </section>

      {/* 3. Descrizione + prenotazione */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_340px] lg:gap-20">
          <Reveal>
            <article>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">L&apos;appartamento</span>
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
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Caratteristiche e servizi</span>
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
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Galleria</span>
            <h2 className="mt-4 font-display text-[clamp(24px,2.6vw,32px)] font-normal leading-[1.2] text-ink">
              Appartamento {apt.name} in immagini
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
              Da {apt.name}, tutta l&apos;Umbria è vicina: scopri{" "}
              <Link href="/territorio/" className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry">
                il territorio
              </Link>{" "}
              intorno ad Assisi o le{" "}
              <Link
                href="/agriturismo-famiglie-ad-assisi-e-dintorni/"
                className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry"
              >
                attività
              </Link>{" "}
              disponibili in struttura, piscina inclusa.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6. Conversione finale */}
      <section className="bg-[#1f180e] py-20 text-center sm:py-24">
        <div className="mx-auto max-w-[560px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              Verifica la disponibilità per {apt.name}
            </h2>
            <p className="mx-auto mt-4 max-w-[420px] text-[14px] leading-[1.7] text-cream/65">
              Scrivici direttamente: nessun intermediario, nessuna commissione.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/393934363917?text=${encodeURIComponent(
                  `Ciao! Vorrei informazioni sulla disponibilità dell'appartamento ${apt.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
              >
                <HoverFill color="#8f7330" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  Verifica disponibilità
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
              <Link
                href="/alloggi/"
                className="text-[11px] font-semibold uppercase tracking-[0.06em] text-cream/70 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
              >
                Torna a tutti gli appartamenti
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
