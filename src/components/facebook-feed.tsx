import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

/* URL reale della pagina Facebook della struttura, fornito dal titolare. */
const FACEBOOK_URL = "https://www.facebook.com/p/Agriturismo-la-Mora-di-Assisi-100066662774182/";

/* Striscia orizzontale minimal, niente foto ai lati e niente iframe di
   Meta: il Page Plugin ufficiale (usato nella versione precedente) è un
   iframe cross-origin con sfondo bianco fisso — Facebook non espone NESSUN
   parametro di tema/colore/layout per quel widget (verificato sulla loro
   stessa documentazione), quindi non è tecnicamente possibile "adattarlo
   allo stile del sito" restando quel widget: qualunque porzione visibile
   sarebbe comunque un riquadro bianco. Per un vero feed di foto reali,
   dello stesso colore del sito, serve un Page Access Token via Graph API
   (lo genera il titolare in pochi minuti da Meta for Developers) — nel
   frattempo questa striscia resta un invito diretto, non un feed finto. */
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

export function FacebookFeed() {
  return (
    <section id="section-facebook" aria-labelledby="facebook-heading" className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-[860px] px-6 sm:px-10">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-[3px] bg-[#1f180e] px-7 py-7 text-center sm:flex-row sm:justify-between sm:gap-8 sm:px-10 sm:text-left">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream/10 text-cream">
                <FacebookIcon />
              </span>
              <div>
                <h2 id="facebook-heading" className="font-display text-[19px] font-normal leading-tight text-cream">
                  Seguici su Facebook
                </h2>
                <p className="mt-1 flex items-center justify-center gap-1.5 text-[12px] text-cream/60 sm:justify-start">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Foto e novità, aggiornate di continuo
                </p>
              </div>
            </div>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Vai alla pagina
                <FacebookIcon />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
