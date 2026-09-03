import { getGoogleReviews } from "@/lib/google-reviews";
import { GoogleMark, StarRow, TripadvisorMark } from "@/components/review-icons";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { Reveal } from "@/components/scroll-reveal";
import { PinnedHold } from "@/components/pinned-hold";

/* URL reale della pagina TripAdvisor della struttura (derivato dal link di
   esempio fornito dal cliente: g187905 = Assisi, d1021888 = La Mora),
   senza i parametri di ricerca date/ospiti che erano contestuali a quella
   sessione. */
const TRIPADVISOR_URL = "https://www.tripadvisor.it/ShowUserReviews-g187905-d1021888-r1068110253";

/* Sezione "Ospiti e riconoscimenti": sostituisce i badge di certificazione
   con un collegamento reale a Google (Places API, filtrando solo le
   recensioni da 4-5 stelle). Finché GOOGLE_PLACES_API_KEY e
   GOOGLE_PLACE_ID non sono configurate su Google Cloud Console dal
   titolare, mostriamo uno stato onesto con link reali — MAI recensioni
   inventate (vedi src/lib/google-reviews.ts). */
export async function ReviewsSection() {
  const data = await getGoogleReviews();
  const hasLiveReviews = data.configured && data.reviews.length > 0;

  return (
    <section id="section-reviews" aria-labelledby="reviews-heading" className="bg-cream-dim py-24 sm:py-28 lg:min-h-[140vh] lg:py-0">
      <PinnedHold>
      <div className="mx-auto max-w-[1300px] px-6 sm:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
              Ospiti e riconoscimenti
            </span>
            <h2
              id="reviews-heading"
              className="mt-5 font-display text-[clamp(28px,3vw,40px)] font-normal leading-[1.2] text-ink [text-wrap:balance]"
            >
              Il giudizio di chi è già stato qui.
            </h2>

            <div className="mt-8 flex items-center gap-3.5">
              <GoogleMark size={30} />
              {hasLiveReviews && data.rating ? (
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl text-ink">{data.rating.toFixed(1)}</span>
                    <StarRow rating={data.rating} size={15} />
                  </div>
                  {data.totalReviews !== null && (
                    <span className="text-[12px] text-ink-soft">{data.totalReviews} recensioni Google</span>
                  )}
                </div>
              ) : (
                <span className="text-[13px] leading-[1.5] text-ink-soft">
                  Recensioni Google
                  <br />
                  verificate in arrivo
                </span>
              )}
            </div>

            <div className="mt-7 flex flex-col gap-2.5">
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.04em] text-ink transition-colors hover:text-raspberry"
              >
                Leggi su Google
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={TRIPADVISOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.04em] text-ink transition-colors hover:text-raspberry"
              >
                Leggi su TripAdvisor
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {hasLiveReviews ? (
              <ReviewsCarousel reviews={data.reviews} />
            ) : (
              <div className="flex h-full flex-col justify-center rounded-[8px] border border-dashed border-ink/15 bg-cream/60 px-8 py-12 text-center">
                <p className="mx-auto max-w-[420px] text-[14px] leading-[1.7] text-ink-soft">
                  Le recensioni verificate arriveranno qui non appena colleghiamo l&apos;account Google della
                  struttura. Nel frattempo, le trovi vere e aggiornate direttamente su Google o TripAdvisor, nei
                  link qui a fianco.
                </p>
              </div>
            )}
          </Reveal>
        </div>

        {/* Attribuzione piattaforme: piccola, in fondo alla sezione — comunica
            che le recensioni sono reali e raccolte sia da Google sia da
            TripAdvisor, senza reintrodurre un badge/certificazione. */}
        <Reveal delay={160}>
          <div className="mt-14 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 sm:mt-16">
            <span>Recensioni reali da</span>
            <GoogleMark size={14} />
            <span>e</span>
            <TripadvisorMark size={20} />
          </div>
        </Reveal>
      </div>
      </PinnedHold>
    </section>
  );
}
