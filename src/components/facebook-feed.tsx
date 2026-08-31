import Image from "next/image";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

/* URL reale della pagina Facebook della struttura, fornito dal titolare. */
const FACEBOOK_URL = "https://www.facebook.com/p/Agriturismo-la-Mora-di-Assisi-100066662774182/";

/* Sostituisce la vecchia sezione "Segui su Instagram" (richiesta esplicita
   del titolare, che aggiorna Facebook più spesso): niente foto nostre da
   scegliere e mantenere aggiornate a mano, ma il Page Plugin ufficiale di
   Meta — un iframe che mostra sempre le foto/post REALI e più recenti
   della pagina. Nessuno scraping, nessun token/app da configurare.

   Impaginazione asimmetrica (non un box centrato piatto): una foto reale
   a sinistra come ancora visiva, il riquadro Facebook a destra leggermente
   inclinato come una polaroid appoggiata — stessa idea di "elemento fisico
   posato" già usata nel badge di ranking-hero.tsx, qui declinata in modo
   diverso (rotazione opposta, nessun bordo crema) per non sembrare un
   copia-incolla della sezione precedente. */
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d="M15.5 8.5H18V5.3h-2.5C13.2 5.3 11.5 7 11.5 9.3V11H9.3v3.2h2.2V19h3.2v-4.8h2.4l.6-3.2h-3V9.3c0-.5.3-.8.9-.8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FacebookFeed() {
  return (
    <section id="section-facebook" aria-labelledby="facebook-heading" className="overflow-hidden bg-cream py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] rotate-2 overflow-hidden rounded-[3px] shadow-[0_25px_50px_-20px_rgba(28,33,23,0.4)] lg:mx-0">
            <Image
              src="/images/struttura/foto dell esterno della struttura.webp"
              alt="Esterno di Agriturismo La Mora"
              fill
              sizes="(max-width: 1024px) 70vw, 360px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Sempre aggiornati</span>
            <h2
              id="facebook-heading"
              className="mt-5 font-display text-[clamp(28px,3vw,40px)] font-normal leading-[1.2] text-ink [text-wrap:balance]"
            >
              Le ultime da Facebook
            </h2>
            <p className="mt-4 max-w-[380px] text-[14px] leading-[1.7] text-ink-soft">
              Foto e novità direttamente dalla nostra pagina, aggiornata di continuo.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 w-full max-w-[420px] -rotate-1 overflow-hidden rounded-[8px] border-4 border-white bg-cream-dim shadow-[0_25px_50px_-20px_rgba(28,33,23,0.45)]">
              <iframe
                title="Pagina Facebook di Agriturismo La Mora"
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                  FACEBOOK_URL
                )}&tabs=timeline&width=420&height=380&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                width="100%"
                height="380"
                style={{ border: "none", overflow: "hidden", display: "block" }}
                scrolling="no"
                frameBorder="0"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal delay={220}>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg border border-ink/15 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:border-ink/0"
            >
              <HoverFill color="#1877F2" />
              <span className="relative z-10 inline-flex items-center gap-2.5 transition-colors duration-200 group-hover:text-cream">
                Segui su Facebook
                <FacebookIcon />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
