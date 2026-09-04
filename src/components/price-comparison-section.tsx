import Image from "next/image";
import { getGoogleReviews } from "@/lib/google-reviews";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { StarRow } from "@/components/review-icons";
import { STAY, CHECKED_ON_LABEL, DISTANCE_LABEL, DIRECT_PRICE_EUR, OTA_PRICES, AIRBNB_NOTE } from "@/data/price-comparison";

const WHATSAPP_URL = `https://wa.me/393934363917?text=${encodeURIComponent(
  `Ciao! Vorrei un preventivo per l'appartamento ${STAY.apartmentName} dal ${STAY.checkinLabel} al ${STAY.checkoutLabel} (${STAY.adults} adulti).`
)}`;

const cheapestOta = Math.min(...OTA_PRICES.map((o) => o.priceEur));
const savingsEur = DIRECT_PRICE_EUR !== null ? cheapestOta - DIRECT_PRICE_EUR : null;
const savingsPct = savingsEur !== null && savingsEur > 0 ? Math.round((savingsEur / cheapestOta) * 100) : null;

/* Sconti reali di prenotazione diretta (PROJECT-BRIEF.md sezione 2),
   mostrati sotto la card come motivazione aggiuntiva. */
const POINTS = [
  { value: "-10%", label: "Da 7 notti", detail: "Soggiorni di una settimana o più hanno uno sconto diretto del 10%." },
  { value: "-10%", label: "Clienti di ritorno", detail: "Dalla seconda prenotazione in poi, un altro 10% di sconto." },
  { value: "-10%", label: "Tariffa non rimborsabile", detail: "Rispetto alla tariffa flessibile, per chi ha già le idee chiare." },
] as const;

/* Ricostruita come una vera scheda comparativa in stile "metasearch"
   (richiesta esplicita, riferimento diretto a una card TripAdvisor):
   foto → identità → punteggio/distanza → badge risparmio (solo se c'è un
   prezzo diretto da cui calcolarlo) → box "Sito ufficiale" protagonista →
   fascia OTA secondaria sotto. Punteggio e distanza sono dati REALI già
   verificati altrove nel progetto (recensioni Google live, distanza dalla
   pagina Booking consultata per i prezzi) — non i numeri riportati nello
   screenshot di riferimento fornito: quello mostrava per Expedia 113€,
   ma la verifica diretta fatta su Expedia per questo stesso soggiorno
   (vedi src/data/price-comparison.ts) ha dato 372€, quindi i valori dello
   screenshot non sono stati usati come dato per questo sito. */
export async function PriceComparisonSection() {
  const reviews = await getGoogleReviews();

  return (
    <section id="section-price-comparison" aria-labelledby="price-comparison-heading" className="bg-[#1f180e] py-24 sm:py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <Reveal>
          <div className="text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Prenotazione diretta</span>
            <h2
              id="price-comparison-heading"
              className="mx-auto mt-5 max-w-[560px] font-display text-[clamp(26px,3vw,38px)] font-normal leading-[1.2] text-cream [text-wrap:balance]"
            >
              Stesso appartamento, stesse date: confronta tu stesso.
            </h2>
          </div>
        </Reveal>

        {/* Card comparativa */}
        <Reveal delay={100}>
          <div className="mt-12 overflow-hidden rounded-[8px] border border-cream/10 bg-[#251c10] lg:grid lg:grid-cols-[0.85fr_1fr] lg:items-stretch">
            {/* Foto */}
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Image
                src="/images/piscina/piscina agriturismo la mora.webp"
                alt="Piscina panoramica di Agriturismo La Mora"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-9">
              {/* Identità + punteggio */}
              <h3 className="font-display text-[24px] font-normal leading-tight text-cream">Agriturismo La Mora</h3>
              <p className="mt-1 text-[13px] text-cream/55">Agriturismo · Assisi, Umbria</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                {reviews.configured && reviews.rating ? (
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-[4px] bg-gold px-1.5 font-sans text-[12px] font-bold text-[#1f180e]">
                      {reviews.rating.toFixed(1)}
                    </span>
                    <StarRow rating={reviews.rating} size={13} />
                  </div>
                ) : (
                  <span className="text-[12px] text-cream/50">Recensioni Google verificate in arrivo</span>
                )}
                <span className="text-[12px] text-cream/50">{DISTANCE_LABEL}</span>
              </div>

              {/* Badge risparmio: solo se c'è un prezzo diretto reale da cui calcolarlo */}
              {savingsPct !== null && (
                <Reveal delay={160}>
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-raspberry px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-cream">
                    -{savingsPct}% rispetto alle altre piattaforme
                  </span>
                </Reveal>
              )}

              {/* Box "Sito ufficiale" — protagonista */}
              <div className="relative mt-6 overflow-hidden rounded-[6px] border-2 border-gold bg-[#1f180e] px-6 py-7 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#1f180e]">
                  Sito ufficiale
                </span>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream/60">
                  Prenota direttamente con l&apos;agriturismo
                </p>

                {DIRECT_PRICE_EUR !== null ? (
                  <>
                    <p className="mt-2 font-display text-[clamp(48px,7vw,64px)] font-medium leading-none text-gold">
                      €{DIRECT_PRICE_EUR}
                    </p>
                    <p className="mt-2 text-[12px] text-cream/55">
                      {STAY.nights} notti a €{DIRECT_PRICE_EUR}
                    </p>
                  </>
                ) : (
                  <p className="mx-auto mt-3 max-w-[300px] font-display text-[clamp(20px,3vw,26px)] font-normal leading-[1.3] text-gold">
                    Richiedi il miglior prezzo
                  </p>
                )}

                <p className="mt-4 text-[12px] text-cream/50">
                  {STAY.nights} notti · {STAY.adults} ospiti · Appartamento {STAY.apartmentName}
                </p>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-6 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
                >
                  <HoverFill color="#8f7330" />
                  <span className="relative z-10 inline-flex items-center gap-2.5">
                    Prenota direttamente
                    <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
              </div>

              {/* Fascia OTA secondaria */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-cream/10 pt-5">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  {OTA_PRICES.map((ota) => (
                    <span key={ota.name} className="text-[13px] text-cream/60">
                      <span className="font-display text-[18px] text-cream/80">€{ota.priceEur}</span> {ota.name}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] uppercase tracking-[0.04em] text-cream/35">Altri prezzi</span>
              </div>
              <p className="mt-2 text-[11px] leading-[1.5] text-cream/35">
                Airbnb: {AIRBNB_NOTE}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mx-auto mt-6 max-w-[560px] text-center text-[12px] leading-[1.7] text-cream/45">
            Tariffe rilevate per il soggiorno {STAY.checkinLabel} → {STAY.checkoutLabel} ({STAY.nights} notti,{" "}
            {STAY.adults} ospiti, appartamento {STAY.apartmentName}) il {CHECKED_ON_LABEL}. Le tariffe possono
            variare in base a disponibilità e condizioni selezionate — non è un confronto in tempo reale.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <dl className="mx-auto mt-16 grid max-w-[780px] grid-cols-1 gap-10 border-t border-cream/10 pt-12 sm:grid-cols-3">
            {POINTS.map((point) => (
              <div key={point.label} className="text-center sm:text-left">
                <dt className="font-display text-4xl text-gold">{point.value}</dt>
                <dd className="mt-3">
                  <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-cream">
                    {point.label}
                  </span>
                  <span className="mt-2 block text-[13px] leading-[1.6] text-cream/55">{point.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
