import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

/* URL reale della pagina Facebook della struttura, fornito dal titolare. */
const FACEBOOK_URL = "https://www.facebook.com/p/Agriturismo-la-Mora-di-Assisi-100066662774182/";

/* Sostituisce la vecchia sezione "Segui su Instagram" (richiesta esplicita
   del titolare, che aggiorna Facebook più spesso): niente foto nostre da
   scegliere e mantenere aggiornate a mano, ma il Page Plugin ufficiale di
   Meta — un iframe che mostra sempre le foto/post REALI e più recenti
   della pagina, esattamente come li vede chiunque la visiti. Nessuno
   scraping, nessun token/app Facebook da configurare: è lo stesso embed
   pubblico che Meta genera per qualunque sito. Sezione volutamente
   compatta (sfondo chiaro classico, niente pin/scroll-jacking). */
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
    <section id="section-facebook" aria-labelledby="facebook-heading" className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-[560px] px-6 text-center sm:px-10">
        <Reveal>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Sempre aggiornati</span>
          <h2
            id="facebook-heading"
            className="mt-5 font-display text-[clamp(28px,3vw,40px)] font-normal leading-[1.2] text-ink [text-wrap:balance]"
          >
            Le ultime da Facebook
          </h2>
          <p className="mx-auto mt-4 max-w-[420px] text-[14px] leading-[1.7] text-ink-soft">
            Foto e novità direttamente dalla nostra pagina, aggiornata di continuo.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-9 max-w-[500px] overflow-hidden rounded-[8px] bg-cream-dim shadow-[0_20px_45px_-25px_rgba(28,33,23,0.35)]">
            <iframe
              title="Pagina Facebook di Agriturismo La Mora"
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                FACEBOOK_URL
              )}&tabs=timeline&width=500&height=420&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`}
              width="100%"
              height="420"
              style={{ border: "none", overflow: "hidden", display: "block" }}
              scrolling="no"
              frameBorder="0"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg border border-ink/15 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:border-ink/0"
          >
            <HoverFill color="#1877F2" />
            <span className="relative z-10 inline-flex items-center gap-2.5 transition-colors duration-200 group-hover:text-cream">
              Segui su Facebook
              <FacebookIcon />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
