import Image from "next/image";
import { getFacebookPhotos } from "@/lib/facebook-photos";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

/* URL reale della pagina Facebook della struttura, fornito dal titolare. */
const FACEBOOK_URL = "https://www.facebook.com/p/Agriturismo-la-Mora-di-Assisi-100066662774182/";

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

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path
        d="M15.5 8.5H18V5.3h-2.5C13.2 5.3 11.5 7 11.5 9.3V11H9.3v3.2h2.2V19h3.2v-4.8h2.4l.6-3.2h-3V9.3c0-.5.3-.8.9-.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export async function FacebookFeed() {
  const fb = await getFacebookPhotos();
  const photos = fb.configured && fb.photos.length > 0 ? fb.photos : FALLBACK_PHOTOS;

  return (
    <section id="section-facebook" aria-labelledby="facebook-heading" className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f180e] text-cream">
                <FacebookIcon />
              </span>
              <div>
                <h2 id="facebook-heading" className="font-display text-[19px] font-normal leading-tight text-ink">
                  Seguici su Facebook
                </h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-soft">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {fb.configured ? "Le ultime foto dalla pagina" : "La vita di tutti i giorni a La Mora"}
                </p>
              </div>
            </div>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-5 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Vai alla pagina
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
