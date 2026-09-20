import { getGoogleReviews } from "@/lib/google-reviews";
import { GoogleMark, StarRow, TripadvisorMark } from "@/components/review-icons";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { Reveal } from "@/components/scroll-reveal";
import { PinnedHold } from "@/components/pinned-hold";
import type { Locale } from "@/lib/i18n";

/* URL reale della pagina TripAdvisor della struttura (derivato dal link di
   esempio fornito dal cliente: g187905 = Assisi, d1021888 = La Mora),
   senza i parametri di ricerca date/ospiti che erano contestuali a quella
   sessione. */
const TRIPADVISOR_URL = "https://www.tripadvisor.it/ShowUserReviews-g187905-d1021888-r1068110253";

const TEXT: Record<Locale, { label: string; heading: string; comingSoon: string; leggiGoogle: string; leggiTripadvisor: string; placeholder: string; reviewsWord: string; da: string; e: string }> = {
  it: {
    label: "Ospiti e riconoscimenti",
    heading: "Il giudizio di chi è già stato qui.",
    comingSoon: "Recensioni Google\nverificate in arrivo",
    leggiGoogle: "Leggi su Google",
    leggiTripadvisor: "Leggi su TripAdvisor",
    placeholder: "Le recensioni verificate arriveranno qui non appena colleghiamo l'account Google della struttura. Nel frattempo, le trovi vere e aggiornate direttamente su Google o TripAdvisor, nei link qui a fianco.",
    reviewsWord: "recensioni Google",
    da: "Recensioni reali da",
    e: "e",
  },
  en: {
    label: "Guests and recognition",
    heading: "What the people who've already been here think.",
    comingSoon: "Verified Google reviews\ncoming soon",
    leggiGoogle: "Read on Google",
    leggiTripadvisor: "Read on TripAdvisor",
    placeholder: "Verified reviews will appear here as soon as we connect the property's Google account. In the meantime, you'll find real, up-to-date reviews directly on Google or TripAdvisor, in the links alongside.",
    reviewsWord: "Google reviews",
    da: "Real reviews from",
    e: "and",
  },
  fr: {
    label: "Hôtes et reconnaissances",
    heading: "L'avis de ceux qui sont déjà venus.",
    comingSoon: "Avis Google vérifiés\nbientôt disponibles",
    leggiGoogle: "Lire sur Google",
    leggiTripadvisor: "Lire sur TripAdvisor",
    placeholder: "Les avis vérifiés apparaîtront ici dès que nous aurons connecté le compte Google de la structure. En attendant, vous les trouverez vrais et à jour directement sur Google ou TripAdvisor, dans les liens ci-contre.",
    reviewsWord: "avis Google",
    da: "Avis réels provenant de",
    e: "et",
  },
  de: {
    label: "Gäste und Auszeichnungen",
    heading: "Das Urteil derer, die schon hier waren.",
    comingSoon: "Verifizierte Google-Bewertungen\nfolgen in Kürze",
    leggiGoogle: "Auf Google lesen",
    leggiTripadvisor: "Auf TripAdvisor lesen",
    placeholder: "Verifizierte Bewertungen erscheinen hier, sobald wir das Google-Konto der Unterkunft verbunden haben. In der Zwischenzeit finden Sie echte, aktuelle Bewertungen direkt auf Google oder TripAdvisor über die Links nebenan.",
    reviewsWord: "Google-Bewertungen",
    da: "Echte Bewertungen von",
    e: "und",
  },
};

/* Sezione "Ospiti e riconoscimenti": sostituisce i badge di certificazione
   con un collegamento reale a Google (Places API, filtrando solo le
   recensioni da 4-5 stelle). Finché GOOGLE_PLACES_API_KEY e
   GOOGLE_PLACE_ID non sono configurate su Google Cloud Console dal
   titolare, mostriamo uno stato onesto con link reali — MAI recensioni
   inventate (vedi src/lib/google-reviews.ts). */
export async function ReviewsSection({ locale }: { locale: Locale }) {
  const data = await getGoogleReviews();
  const hasLiveReviews = data.configured && data.reviews.length > 0;
  const text = TEXT[locale];

  return (
    <section id="section-reviews" aria-labelledby="reviews-heading" className="bg-cream-dim py-24 sm:py-28 lg:min-h-[140vh] lg:py-0">
      <PinnedHold>
      <div className="mx-auto max-w-[1300px] px-6 sm:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
          {/* Su mobile centrato invece che allineato a sinistra come su
              desktop (richiesta esplicita di più libertà creativa qui, non
              solo "la stessa cosa ma stretta"): con una singola colonna
              piena larghezza il testo a sinistra risultava sbilanciato,
              centrato legge più come un momento editoriale a sé. */}
          <Reveal>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
              {text.label}
            </span>
            <h2
              id="reviews-heading"
              className="mt-5 font-display text-[clamp(28px,3vw,40px)] font-normal leading-[1.2] text-ink [text-wrap:balance]"
            >
              {text.heading}
            </h2>

            <div className="mt-8 flex items-center gap-3.5">
              <GoogleMark size={30} />
              {hasLiveReviews && data.rating ? (
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl text-ink">{data.rating.toFixed(1)}</span>
                    <StarRow rating={data.rating} size={15} locale={locale} />
                  </div>
                  {data.totalReviews !== null && (
                    <span className="text-[12px] text-ink-soft">{data.totalReviews} {text.reviewsWord}</span>
                  )}
                </div>
              ) : (
                <span className="whitespace-pre-line text-left text-[13px] leading-[1.5] text-ink-soft">
                  {text.comingSoon}
                </span>
              )}
            </div>

            <div className="mt-7 flex flex-col items-center gap-2.5 lg:items-start">
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.04em] text-ink transition-colors hover:text-raspberry"
              >
                {text.leggiGoogle}
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
                {text.leggiTripadvisor}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {hasLiveReviews ? (
              <ReviewsCarousel reviews={data.reviews} locale={locale} />
            ) : (
              <div className="flex h-full flex-col justify-center rounded-[8px] border border-dashed border-ink/15 bg-cream/60 px-8 py-12 text-center">
                <p className="mx-auto max-w-[420px] text-[14px] leading-[1.7] text-ink-soft">
                  {text.placeholder}
                </p>
              </div>
            )}
          </Reveal>
        </div>

        {/* Attribuzione piattaforme: piccola, centrata, in fondo alla sezione —
            loghi originali un po' più grandi del primo tentativo (che li
            rendeva illeggibili) ma senza diventare un blocco statistico a
            sé stante come nella versione intermedia. */}
        <Reveal delay={160}>
          <div className="mt-14 flex items-center justify-center gap-2.5 text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 sm:mt-16">
            <span>{text.da}</span>
            <GoogleMark size={20} />
            <span>{text.e}</span>
            <TripadvisorMark size={85} />
          </div>
        </Reveal>
      </div>
      </PinnedHold>
    </section>
  );
}
