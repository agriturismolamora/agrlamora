import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { StarRow } from "@/components/review-icons";
import { ApartmentGallery } from "@/components/apartment-gallery";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";
import { VillaBookingBar } from "@/components/villa-booking-bar";
import {
  VILLA_ADDRESS,
  VILLA_HOST_NAME,
  VILLA_HOST_IMAGE,
  VILLA_RATING,
  VILLA_CIN,
  VILLA_CONFIGURATIONS,
  VILLA_MAX_GUESTS,
  VILLA_AMENITIES,
  VILLA_OUTDOOR_FEATURES,
  VILLA_DISTANCES,
  VILLA_GALLERY,
  VILLA_WHATSAPP_NUMBER,
} from "@/data/villa";

export const metadata: Metadata = {
  title: "Villa Relax — Villa Indipendente ad Assisi",
  description:
    "Villa Relax, ad Assisi: villa indipendente con piscina privata, giardino e fino a 16 posti letto su 6 camere da letto. Ideale per gruppi e famiglie numerose nella campagna umbra, vicino alla Basilica di San Francesco.",
  alternates: { canonical: "/villa-relax-assisi/" },
};

const WHATSAPP_URL = `https://wa.me/${VILLA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Ciao! Vorrei informazioni su Villa Relax."
)}`;
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`Villa Relax, ${VILLA_ADDRESS}`);

/* Icone minimali coerenti con amenity-icons.tsx, ma specifiche di Villa
   Relax (parcheggio/piscina privata/intera villa non servono altrove):
   tenute qui invece che nel file condiviso per non allargarne lo scope. */
function ParkingIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 16V7.5h2.8a2.6 2.6 0 0 1 0 5.2H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function PoolIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M3 16c1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0 1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 20c1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0 1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12V5.5a2 2 0 1 1 4 0M12 9h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function WholeHouseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 11 12 4l8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 9.5V20h13V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 20v-6h4v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="7" cy="9" r="1.6" fill="currentColor" />
      <circle cx="12" cy="6.5" r="1.6" fill="currentColor" />
      <circle cx="17" cy="9" r="1.6" fill="currentColor" />
      <path d="M12 12c-3 0-5.5 2-5.5 4.3 0 1.7 1.5 2.7 3 2.2.9-.3 1.7-.3 2.5 0 1.5.5 3-.5 3-2.2C15.5 14 13 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 9.5c4.5-4 11.5-4 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 13c3-2.5 7-2.5 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.2 16.5c1.1-.9 2.5-.9 3.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="19.3" r="1" fill="currentColor" />
    </svg>
  );
}
function GardenIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M12 20c0-6.5 5-8.5 8-9-1 4.5-3 8-8 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 20c0-7-5-9.5-8-10 1 5 3 9 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 20v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function KitchenIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="8" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function TvIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 20h6M12 16.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const AMENITY_ICONS: Record<string, () => React.JSX.Element> = {
  "Animali ammessi": PawIcon,
  "Parcheggio privato ombreggiato": ParkingIcon,
  "Wi-Fi gratuito": WifiIcon,
  Giardino: GardenIcon,
  "Angolo cottura": KitchenIcon,
  Televisione: TvIcon,
  "Piscina privata": PoolIcon,
  "Intera villa": WholeHouseIcon,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Villa Relax",
  description: "Villa indipendente con piscina privata ad Assisi, fino a 16 ospiti su 6 camere da letto.",
  image: "https://www.agriturismoinassisi.it/images/villa/villa%20esterna.webp",
  url: "https://www.agriturismoinassisi.it/villa-relax-assisi/",
  telephone: "+39 075 8041164",
  email: "agriturismolamora@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Di Bassano, 19",
    addressLocality: "Assisi",
    addressRegion: "PG",
    postalCode: "06081",
    addressCountry: "IT",
  },
  numberOfRooms: 6,
  containsPlace: { "@type": "Accommodation", occupancy: { "@type": "QuantitativeValue", maxValue: VILLA_MAX_GUESTS } },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: VILLA_RATING.value,
    bestRating: VILLA_RATING.scale,
    ratingCount: 1,
  },
};

export default function VillaRelaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero */}
      <section className="relative flex h-[90vh] min-h-[580px] items-end overflow-hidden">
        <Image
          src="/images/villa/vista esterno della villa.webp"
          alt="Villa Relax, villa indipendente nella campagna di Assisi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.08) 0%, rgba(20,14,7,.4) 55%, rgba(20,14,7,.82) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[960px] px-6 pb-16 text-center sm:px-10 sm:pb-20">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/80">
              Villa Relax · Villa indipendente ad Assisi
            </span>
            <h1 className="mt-5 font-display text-[clamp(36px,6.5vw,64px)] font-normal leading-[1.08] text-cream [text-wrap:balance]">
              Una villa indipendente nella campagna di Assisi.
            </h1>
            <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-[1.8] text-cream/85">
              Non uno degli appartamenti di Agriturismo La Mora: una proprietà a sé, con piscina privata e giardino,
              pensata per famiglie numerose e gruppi fino a 16 persone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Presentazione */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11]">
                <Image
                  src="/images/villa/villa esterno.webp"
                  alt="Esterno di Villa Relax, arredata in stile classico"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
              <div className="order-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Villa Relax</span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  Spazio vero, in aperta campagna umbra.
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
                  Villa Relax è una villa indipendente, arredata con gusto in uno stile classico, a breve distanza da
                  Assisi. Non è un appartamento tra altri: è una proprietà a sé, con un proprio giardino e una propria
                  piscina privata, pensata per chi vuole vivere l&apos;Umbria con tutto lo spazio di una casa vera.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-20 grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16 sm:mt-24">
              <div className="order-2 sm:order-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Grandi spazi</span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  Fino a 16 persone, 6 camere da letto.
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
                  Gli interni accoglienti e spaziosi possono ospitare fino a 16 persone, grazie a 6 camere da letto,
                  ciascuna con bagno e doccia privati. Una casa vacanze perfetta per una famiglia numerosa o un grande
                  gruppo di amici che vuole vivere gli spazi insieme, senza rinunciare alla privacy di ognuno.
                </p>
              </div>
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:order-2 sm:aspect-[16/11]">
                <Image
                  src="/images/villa/sala da pranzo villa interno.webp"
                  alt="Sala da pranzo interna di Villa Relax"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Caratteristiche */}
      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Caratteristiche</span>
            <h2 className="mt-4 max-w-[560px] font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Tutto ciò che serve per un soggiorno di gruppo.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {VILLA_AMENITIES.map((label) => {
                const Icon = AMENITY_ICONS[label];
                return (
                  <div key={label} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-olive-700">
                      {Icon && <Icon />}
                    </span>
                    <span className="text-[13px] leading-[1.4] text-ink">{label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Galleria */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Galleria</span>
            <h2 className="mt-4 font-display text-[clamp(24px,2.6vw,32px)] font-normal leading-[1.2] text-ink">
              Villa Relax in immagini
            </h2>
          </Reveal>
          <div className="mt-8">
            <ApartmentGallery images={VILLA_GALLERY} />
          </div>
        </div>
      </section>

      {/* 5. Configurazioni / Capienza */}
      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Configurazioni</span>
            <h2 className="mt-4 max-w-[640px] font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Una sola villa, tre modi di prenotarla.
            </h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-[1.8] text-ink-soft">
              Non sono tre ville diverse: è la stessa proprietà, divisa in due porzioni che si possono prenotare
              separatamente (6 o 10 persone) oppure per intero, tutte e 6 le camere insieme, fino a 16 ospiti.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VILLA_CONFIGURATIONS.map((config, i) => (
              <Reveal key={config.name} delay={i * 80}>
                <div className="flex h-full flex-col rounded-[6px] border border-ink/10 bg-cream px-7 py-8">
                  <span className="font-display text-4xl text-raspberry">{config.guests}</span>
                  <span className="mt-1 text-[11px] uppercase tracking-[0.06em] text-ink-soft">ospiti</span>
                  <h3 className="mt-4 font-display text-[19px] font-normal leading-tight text-ink">{config.name}</h3>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.04em] text-ink-soft">
                    {config.bedrooms} camere da letto
                  </p>
                  <p className="mt-4 flex-1 text-[13px] leading-[1.7] text-ink-soft">{config.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Piscina, giardino e vita all'aperto */}
      <section className="relative overflow-hidden bg-[#1f180e] py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-14 px-6 sm:grid-cols-2 sm:gap-20 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/villa/piscina esterna della villa.webp"
                alt="Piscina privata di Villa Relax"
                fill
                sizes="(max-width: 640px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Piscina e giardino</span>
            <p className="mt-6 font-display text-[clamp(26px,3.4vw,38px)] font-normal leading-[1.35] text-cream [text-wrap:balance]">
              Una piscina privata, un giardino tutto vostro.
            </p>
            <p className="mt-6 max-w-[440px] text-[14px] leading-[1.8] text-cream/65">
              All&apos;esterno, un ampio e curato giardino con piscina privata, lettini e sdraie: il posto ideale per
              lunghe giornate estive nella campagna umbra, in privacy, senza condividere gli spazi con altri ospiti.
              Chi viaggia in gruppo può vivere gli esterni insieme — a bordo vasca, sotto il gazebo, o intorno al
              barbecue.
            </p>
            <ul className="mt-6 space-y-2.5">
              {VILLA_OUTDOOR_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-cream/70">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 7. Il gestore */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src={VILLA_HOST_IMAGE}
                alt={`${VILLA_HOST_NAME}, gestore di Villa Relax`}
                fill
                sizes="(max-width: 640px) 100vw, 280px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Il gestore</span>
            <h2 className="mt-4 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              L&apos;accoglienza di {VILLA_HOST_NAME}.
            </h2>
            <p className="mt-5 max-w-[480px] text-[15px] leading-[1.85] text-ink-soft">
              Villa Relax è gestita direttamente da {VILLA_HOST_NAME}, lo stesso host di Agriturismo La Mora: stesso
              contatto diretto, stessa disponibilità a rispondere di persona, senza intermediari, per organizzare
              l&apos;arrivo del vostro gruppo.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Scrivi a {VILLA_HOST_NAME} su WhatsApp
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 8. Recensioni */}
      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto max-w-[720px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Recensioni</span>
            <div className="mt-6 flex flex-col items-center">
              <span className="font-display text-[64px] leading-none text-raspberry">{VILLA_RATING.value}</span>
              <span className="mt-1 text-[12px] uppercase tracking-[0.08em] text-ink-soft">su {VILLA_RATING.scale}</span>
              <StarRow rating={VILLA_RATING.value / 2} size={16} />
              <p className="mt-4 font-display text-[18px] italic text-ink">{VILLA_RATING.label}</p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.06em] text-ink-soft">
                Fonte: {VILLA_RATING.source} · CIN {VILLA_CIN}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Dove si trova */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Dove si trova</span>
            <h2 className="mt-4 max-w-[640px] font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              Zona campagna, a pochi minuti da Assisi.
            </h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-[1.8] text-ink-soft">
              Villa Relax sorge in zona campagna, vicino ad Assisi e alla Basilica di San Francesco, con la Basilica
              di Santa Maria degli Angeli, San Damiano e l&apos;Eremo delle Carceri tutti nel raggio di pochi
              chilometri — comoda anche per chi arriva a Umbria Fiere, a Bastia Umbra.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/10 pt-8 sm:grid-cols-3 lg:grid-cols-5">
              {VILLA_DISTANCES.map((d) => (
                <div key={d.label}>
                  <dt className="font-display text-2xl text-ink">{d.distance}</dt>
                  <dd className="mt-1 text-[12px] leading-[1.4] text-ink-soft">{d.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-12 flex flex-col items-start gap-6 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
              <address className="text-[14px] not-italic leading-[1.7] text-ink-soft">
                <p className="text-ink">{VILLA_ADDRESS}</p>
              </address>
              <div className="flex flex-wrap gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
                >
                  <HoverFill color="#8f4324" />
                  <span className="relative z-10 inline-flex items-center gap-2.5">
                    Apri in Google Maps
                    <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
                <Link
                  href="/territorio/"
                  className="inline-flex items-center gap-2.5 rounded-[3px] border border-ink/20 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-raspberry hover:text-raspberry"
                >
                  Scopri il territorio
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter — componente globale riusato, generico (non lega a certificazioni La Mora) */}
      <NewsletterSection />

      {/* Banner certificazioni — riusato come chiusura standard del sito; nessuna
          didascalia qui lo presenta come specifico di Villa Relax. */}
      <CertificationsMarquee />

      {/* Booking bar dedicata SOLO a Villa Relax — mai quella degli appartamenti. */}
      <VillaBookingBar />
    </>
  );
}
