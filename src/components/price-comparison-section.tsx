import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { STAY, CHECKED_ON_LABEL, DIRECT_PRICE_EUR, OTA_PRICES, AIRBNB_NOTE } from "@/data/price-comparison";

const WHATSAPP_URL = `https://wa.me/393934363917?text=${encodeURIComponent(
  `Ciao! Vorrei un preventivo per l'appartamento ${STAY.apartmentName} dal ${STAY.checkinLabel} al ${STAY.checkoutLabel} (${STAY.adults} adulti).`
)}`;

const cheapestOta = Math.min(...OTA_PRICES.map((o) => o.priceEur));
const savingsEur = DIRECT_PRICE_EUR !== null ? cheapestOta - DIRECT_PRICE_EUR : null;
const savingsPct = savingsEur !== null && savingsEur > 0 ? Math.round((savingsEur / cheapestOta) * 100) : null;

/* Sostituisce il precedente blocco "Prenotazione diretta" (solo le 3
   statistiche di sconto) con il confronto tariffario concreto richiesto:
   stesso soggiorno campione (appartamento Acquario, 12-15 ott 2026, 3
   notti, 2 adulti) verificato manualmente su Booking.com ed Expedia — dati
   e metodologia in src/data/price-comparison.ts, mai numeri inventati.
   Le statistiche reali di sconto/caparra restano sotto, come motivazione
   aggiuntiva invece che ripetere lo stesso messaggio due volte. */
const POINTS = [
  { value: "-10%", label: "Da 7 notti", detail: "Soggiorni di una settimana o più hanno uno sconto diretto del 10%." },
  { value: "-10%", label: "Clienti di ritorno", detail: "Dalla seconda prenotazione in poi, un altro 10% di sconto." },
  { value: "25%", label: "Caparra alla prenotazione", detail: "Il saldo si paga all'arrivo, non tutto subito." },
] as const;

export function PriceComparisonSection() {
  return (
    <section aria-labelledby="price-comparison-heading" className="bg-[#1f180e] py-24 sm:py-28">
      <div className="mx-auto max-w-[860px] px-6 sm:px-10">
        <Reveal>
          <div className="text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Prenotazione diretta</span>
            <h2
              id="price-comparison-heading"
              className="mx-auto mt-5 max-w-[560px] font-display text-[clamp(26px,3vw,38px)] font-normal leading-[1.2] text-cream [text-wrap:balance]"
            >
              Stesso appartamento, stesse date: confronta tu stesso.
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[14px] leading-[1.7] text-cream/65">
              Un soggiorno identico — {STAY.apartmentName}, {STAY.checkinLabel} → {STAY.checkoutLabel}, {STAY.nights} notti,{" "}
              {STAY.adults} ospiti — verificato sulle pagine pubbliche delle principali piattaforme.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mt-12 overflow-hidden rounded-[3px] border border-gold/40 bg-[#251c10] px-7 py-10 text-center sm:px-12 sm:py-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#1f180e]">
              Sito ufficiale
            </span>

            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/60">Tariffa diretta</p>

            {DIRECT_PRICE_EUR !== null ? (
              <>
                <p className="mt-2 font-display text-[clamp(52px,8vw,76px)] font-medium leading-none text-gold">
                  €{DIRECT_PRICE_EUR}
                </p>
                {savingsPct !== null && (
                  <span className="mt-4 inline-block rounded-full bg-cream/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-cream">
                    Risparmi €{savingsEur} · -{savingsPct}% rispetto alla piattaforma più economica
                  </span>
                )}
              </>
            ) : (
              <p className="mx-auto mt-3 max-w-[360px] font-display text-[clamp(22px,3vw,28px)] font-normal leading-[1.3] text-gold">
                Richiedi il miglior prezzo
              </p>
            )}

            <p className="mt-4 text-[13px] text-cream/60">
              {STAY.nights} notti · {STAY.adults} ospiti · Appartamento {STAY.apartmentName}
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
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
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-6 divide-y divide-cream/10 rounded-[3px] border border-cream/10">
            {OTA_PRICES.map((ota) => (
              <div key={ota.name} className="flex items-center justify-between gap-4 px-6 py-4">
                <div>
                  <span className="text-[13px] font-semibold text-cream/85">{ota.name}</span>
                  <span className="mt-0.5 block text-[11px] text-cream/45">{ota.note}</span>
                </div>
                <span className="font-display text-[22px] text-cream/70">€{ota.priceEur}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 px-6 py-4">
              <div>
                <span className="text-[13px] font-semibold text-cream/85">Airbnb</span>
                <span className="mt-0.5 block max-w-[380px] text-[11px] leading-[1.5] text-cream/45">{AIRBNB_NOTE}</span>
              </div>
              <span className="shrink-0 text-[12px] uppercase tracking-[0.04em] text-cream/35">Non verificabile</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-5 text-center text-[11px] leading-[1.6] text-cream/40">
            Prezzi rilevati il {CHECKED_ON_LABEL}, confronto statico aggiornato manualmente — non un motore di
            prenotazione in tempo reale. Le tariffe delle piattaforme possono variare nel tempo e in base alle
            condizioni selezionate.
          </p>
        </Reveal>

        <Reveal delay={320}>
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
