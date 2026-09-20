import Image from "next/image";
import { getFacebookPhotos } from "@/lib/facebook-photos";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import type { Locale } from "@/lib/i18n";

/* URL reale della pagina Facebook della struttura, fornito dal titolare. */
const FACEBOOK_URL = "https://www.facebook.com/p/Agriturismo-la-Mora-di-Assisi-100066662774182/";

const TEXT: Record<Locale, { heading: string; subLive: string; subFallback: string; cta: string }> = {
  it: { heading: "Seguici su Facebook", subLive: "Le ultime foto dalla pagina", subFallback: "La vita di tutti i giorni a La Mora", cta: "Vai alla pagina" },
  en: { heading: "Follow us on Facebook", subLive: "The latest photos from the page", subFallback: "Everyday life at La Mora", cta: "Visit the page" },
  fr: { heading: "Suivez-nous sur Facebook", subLive: "Les dernières photos de la page", subFallback: "La vie quotidienne à La Mora", cta: "Aller sur la page" },
  de: { heading: "Folgen Sie uns auf Facebook", subLive: "Die neuesten Fotos von der Seite", subFallback: "Der Alltag bei La Mora", cta: "Zur Seite" },
};

/* Foto reali della struttura (non ancora usate altrove in home) mostrate
   finché FACEBOOK_PAGE_ACCESS_TOKEN non è configurato: mai un placeholder
   finto, sempre fotografia vera — vedi il commento in facebook-photos.ts
   per come/quando collegare le foto vere della Pagina via Graph API. */
const FALLBACK_PHOTOS = [
  { id: "cavalli", src: "/images/home/foto dei cavalli.webp", alt: "I cavalli di Agriturismo La Mora" },
  { id: "piscina-lato", src: "/images/piscina/piscina agriturismo la mora lato.jpeg", alt: "Piscina di Agriturismo La Mora" },
  {
    id: "scivolo",
    src: "/images/piscina/esterno parco agriturismo con scivolo per bambini.jpg",
    alt: "Area giochi per bambini di Agriturismo La Mora",
  },
  { id: "cucina", src: "/images/struttura/immagine cucina arredata.jpeg", alt: "Cucina arredata di uno degli appartamenti" },
  {
    id: "campo",
    src: "/images/piscina/esterno agriturismo con vista struttura e rete calcio piu campo da calcio.jpg",
    alt: "Campo da calcio e giardino di Agriturismo La Mora",
  },
] as const;

/* Logo Facebook originale (cerchio blu ufficiale #1877F2 + "f" bianca),
   stesso principio di GoogleMark/TripadvisorMark in review-icons.tsx: colori
   di brand reali, usato come attribuzione della piattaforma. Variante
   "mono": solo la "f" bianca, senza il cerchio blu — per l'uso dentro il
   pulsante blu Facebook, dove il cerchio si confonderebbe con lo sfondo
   dello stesso colore. */
function FacebookMark({ size = 22, variant = "brand" }: { size?: number; variant?: "brand" | "mono" }) {
  if (variant === "mono") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <path
          d="M15.5 12.25h-2.35V20h-3.2v-7.75H8.25V9.5h1.7v-1.65c0-2 .95-3.35 3.35-3.35h2v2.75h-1.3c-.85 0-1.05.35-1.05.95V9.5h2.3l-.35 2.75Z"
          fill="#fff"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="#1877F2" />
      <path
        d="M31 24.5h-4.7V40h-6.4V24.5H16.5V19h3.4v-3.3c0-4 1.9-6.7 6.7-6.7h4v5.5h-2.6c-1.7 0-1.9.7-1.9 1.9V19h4.6l-.7 5.5Z"
        fill="#fff"
      />
    </svg>
  );
}

export async function FacebookFeed({ locale }: { locale: Locale }) {
  const fb = await getFacebookPhotos();
  const photos = fb.configured && fb.photos.length > 0 ? fb.photos : FALLBACK_PHOTOS;
  const text = TEXT[locale];

  return (
    <section id="section-facebook" aria-labelledby="facebook-heading" className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <FacebookMark size={40} />
              <div>
                <h2 id="facebook-heading" className="font-display text-[19px] font-normal leading-tight text-ink">
                  {text.heading}
                </h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-soft">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {fb.configured ? text.subLive : text.subFallback}
                </p>
              </div>
            </div>

            {/* Stesso "sistema pulsante" del resto del sito (forma, padding,
                tipografia, HoverFill direzionale) ma con la palette presa
                dal blu ufficiale Facebook (#1877F2, lo stesso di
                FacebookMark) invece dell'oro generico usato altrove: resta
                riconoscibile come brand Facebook senza sembrare un widget
                esterno incollato nella pagina. */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-lg bg-[#1877F2] px-5 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-white"
            >
              <HoverFill color="#0f5dd8" />
              <span className="relative z-10 inline-flex items-center gap-2">
                <FacebookMark size={16} variant="mono" />
                {text.cta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="-mx-6 mt-7 flex gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {photos.map((photo) => (
              <div key={photo.id} className="relative aspect-square w-[120px] shrink-0 overflow-hidden rounded-[3px] sm:w-full">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 120px, 19vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
