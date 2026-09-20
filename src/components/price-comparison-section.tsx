import Image from "next/image";
import { getGoogleReviews } from "@/lib/google-reviews";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { StarRow } from "@/components/review-icons";
import { OtherPricesDropdown } from "@/components/other-prices-dropdown";
import type { Locale } from "@/lib/i18n";
import {
  STAY,
  CHECKED_ON_LABEL,
  DISTANCE_LABEL,
  DIRECT_PRICE_EUR,
  DIRECT_PRICE_PER_NIGHT,
  DIRECT_PRICE_CONDITION,
  DIRECT_PRICE_FLEX_EUR,
  DIRECT_PRICE_FLEX_PER_NIGHT,
  DIRECT_PRICE_FLEX_CONDITION,
  OTA_PRICES,
} from "@/data/price-comparison";

/* Le due condizioni tariffarie sono stringhe italiane fisse in
   price-comparison.ts (dato di business, non contenuto editoriale): qui
   una piccola mappa di traduzione stabile, non l'intera ristrutturazione
   del data file. */
const CONDITION_TR: Record<Locale, Record<string, string>> = {
  it: {},
  en: { "Tariffa non rimborsabile": "Non-refundable rate", "Colazione inclusa e cancellazione gratuita": "breakfast included and free cancellation" },
  fr: { "Tariffa non rimborsabile": "Tarif non remboursable", "Colazione inclusa e cancellazione gratuita": "petit-déjeuner inclus et annulation gratuite" },
  de: { "Tariffa non rimborsabile": "Nicht erstattbarer Tarif", "Colazione inclusa e cancellazione gratuita": "Frühstück inklusive und kostenlose Stornierung" },
};
function tr(locale: Locale, s: string) {
  return CONDITION_TR[locale][s] ?? s;
}

/* Stessa logica per la distanza reale e le due date verificate: dati
   fissi in price-comparison.ts, tradotti qui senza duplicare il data file. */
const DISTANCE_TR: Record<Locale, string> = {
  it: DISTANCE_LABEL,
  en: "2.2 km from Santa Maria degli Angeli",
  fr: "2,2 km de Sainte-Marie-des-Anges",
  de: "2,2 km von Santa Maria degli Angeli",
};
const IT_MONTHS: Record<string, Record<Locale, string>> = {
  ottobre: { it: "ottobre", en: "October", fr: "octobre", de: "Oktober" },
  settembre: { it: "settembre", en: "September", fr: "septembre", de: "September" },
};
function trDate(locale: Locale, label: string): string {
  if (locale === "it") return label;
  const [day, month, year] = label.split(" ");
  const tm = IT_MONTHS[month];
  return tm ? `${day} ${tm[locale]} ${year}` : label;
}

const TEXT: Record<
  Locale,
  {
    label: string;
    heading: string;
    identity: string;
    reviewsSoon: string;
    noCommission: string;
    sitoUfficiale: string;
    prenotaConNoi: string;
    perNotte: string;
    nights: string;
    richiediPrezzo: string;
    ospiti: string;
    apartment: string;
    prenotaDirettamente: string;
    preferisciLiberta: (pn: number, tot: number, nights: number, cond: string) => string;
    disclaimer: (checkin: string, checkout: string, nights: number, adults: number, apt: string, checkedOn: string) => string;
    points: { value: string; label: string; detail: string }[];
    whatsappTemplate: (apt: string, checkin: string, checkout: string, adults: number) => string;
    bbAlternative: string;
  }
> = {
  it: {
    label: "Prenotazione diretta",
    heading: "Stesso appartamento, stesse date: confronta tu stesso.",
    identity: "Agriturismo · Assisi, Umbria",
    reviewsSoon: "Recensioni Google verificate in arrivo",
    noCommission: "Nessuna commissione di intermediazione, sconti dedicati a chi prenota diretto",
    sitoUfficiale: "Sito ufficiale",
    prenotaConNoi: "Prenota direttamente con l'agriturismo",
    perNotte: "/ notte",
    nights: "notti",
    richiediPrezzo: "Richiedi il miglior prezzo",
    ospiti: "ospiti",
    apartment: "Appartamento",
    prenotaDirettamente: "Prenota direttamente",
    preferisciLiberta: (pn, tot, nights, cond) => `Preferisci più libertà? €${pn}/notte (€${tot} per ${nights} notti) con ${cond.toLowerCase()}.`,
    disclaimer: (ci, co, n, a, apt, d) =>
      `Tariffe rilevate per il soggiorno ${ci} → ${co} (${n} notti, ${a} ospiti, appartamento ${apt}) il ${d}. Le tariffe possono variare in base a disponibilità e condizioni selezionate — non è un confronto in tempo reale.`,
    points: [
      { value: "-10%", label: "Da 7 notti", detail: "Soggiorni di una settimana o più hanno uno sconto diretto del 10%." },
      { value: "-10%", label: "Clienti di ritorno", detail: "Dalla seconda prenotazione in poi, un altro 10% di sconto." },
      { value: "-10%", label: "Tariffa non rimborsabile", detail: "Rispetto alla tariffa flessibile, per chi ha già le idee chiare." },
    ],
    whatsappTemplate: (apt, ci, co, a) => `Ciao! Vorrei un preventivo per l'appartamento ${apt} dal ${ci} al ${co} (${a} adulti).`,
    bbAlternative: "Preferisci un altro modo di prenotare? Verifica su Bed & Breakfast.it",
  },
  en: {
    label: "Direct booking",
    heading: "Same apartment, same dates: compare for yourself.",
    identity: "Agriturismo · Assisi, Umbria",
    reviewsSoon: "Verified Google reviews coming soon",
    noCommission: "No intermediary commission, discounts reserved for direct bookings",
    sitoUfficiale: "Official website",
    prenotaConNoi: "Book directly with the agriturismo",
    perNotte: "/ night",
    nights: "nights",
    richiediPrezzo: "Request the best price",
    ospiti: "guests",
    apartment: "Apartment",
    prenotaDirettamente: "Book directly",
    preferisciLiberta: (pn, tot, nights, cond) => `Prefer more flexibility? €${pn}/night (€${tot} for ${nights} nights) with ${cond.toLowerCase()}.`,
    disclaimer: (ci, co, n, a, apt, d) =>
      `Rates checked for the stay ${ci} → ${co} (${n} nights, ${a} guests, apartment ${apt}) on ${d}. Rates may vary depending on availability and selected conditions — this is not a real-time comparison.`,
    points: [
      { value: "-10%", label: "From 7 nights", detail: "Stays of a week or more get a 10% direct discount." },
      { value: "-10%", label: "Returning guests", detail: "From your second booking onward, another 10% off." },
      { value: "-10%", label: "Non-refundable rate", detail: "Compared to the flexible rate, for those who already know their plans." },
    ],
    whatsappTemplate: (apt, ci, co, a) => `Hi! I'd like a quote for the ${apt} apartment from ${ci} to ${co} (${a} adults).`,
    bbAlternative: "Prefer another way to book? Check availability on Bed & Breakfast.it",
  },
  fr: {
    label: "Réservation directe",
    heading: "Même appartement, mêmes dates : comparez vous-même.",
    identity: "Agriturismo · Assise, Ombrie",
    reviewsSoon: "Avis Google vérifiés bientôt disponibles",
    noCommission: "Aucune commission d'intermédiaire, réductions réservées aux réservations directes",
    sitoUfficiale: "Site officiel",
    prenotaConNoi: "Réservez directement avec l'agriturismo",
    perNotte: "/ nuit",
    nights: "nuits",
    richiediPrezzo: "Demandez le meilleur prix",
    ospiti: "voyageurs",
    apartment: "Appartement",
    prenotaDirettamente: "Réserver directement",
    preferisciLiberta: (pn, tot, nights, cond) => `Vous préférez plus de flexibilité ? €${pn}/nuit (€${tot} pour ${nights} nuits) avec ${cond.toLowerCase()}.`,
    disclaimer: (ci, co, n, a, apt, d) =>
      `Tarifs relevés pour le séjour ${ci} → ${co} (${n} nuits, ${a} voyageurs, appartement ${apt}) le ${d}. Les tarifs peuvent varier selon la disponibilité et les conditions sélectionnées — ce n'est pas une comparaison en temps réel.`,
    points: [
      { value: "-10%", label: "Dès 7 nuits", detail: "Les séjours d'une semaine ou plus bénéficient de 10% de réduction directe." },
      { value: "-10%", label: "Clients fidèles", detail: "Dès la deuxième réservation, encore 10% de réduction." },
      { value: "-10%", label: "Tarif non remboursable", detail: "Par rapport au tarif flexible, pour ceux qui ont déjà décidé." },
    ],
    whatsappTemplate: (apt, ci, co, a) => `Bonjour ! Je voudrais un devis pour l'appartement ${apt} du ${ci} au ${co} (${a} adultes).`,
    bbAlternative: "Vous préférez une autre façon de réserver ? Vérifiez sur Bed & Breakfast.it",
  },
  de: {
    label: "Direktbuchung",
    heading: "Gleiches Apartment, gleiche Daten: vergleichen Sie selbst.",
    identity: "Agriturismo · Assisi, Umbrien",
    reviewsSoon: "Verifizierte Google-Bewertungen folgen in Kürze",
    noCommission: "Keine Vermittlungsprovision, Rabatte nur bei Direktbuchung",
    sitoUfficiale: "Offizielle Website",
    prenotaConNoi: "Direkt beim Agriturismo buchen",
    perNotte: "/ Nacht",
    nights: "Nächte",
    richiediPrezzo: "Besten Preis anfragen",
    ospiti: "Gäste",
    apartment: "Apartment",
    prenotaDirettamente: "Direkt buchen",
    preferisciLiberta: (pn, tot, nights, cond) => `Mehr Flexibilität gewünscht? €${pn}/Nacht (€${tot} für ${nights} Nächte) mit ${cond.toLowerCase()}.`,
    disclaimer: (ci, co, n, a, apt, d) =>
      `Preise ermittelt für den Aufenthalt ${ci} → ${co} (${n} Nächte, ${a} Gäste, Apartment ${apt}) am ${d}. Die Preise können je nach Verfügbarkeit und gewählten Bedingungen variieren — kein Echtzeitvergleich.`,
    points: [
      { value: "-10%", label: "Ab 7 Nächten", detail: "Aufenthalte ab einer Woche erhalten 10% Direktrabatt." },
      { value: "-10%", label: "Wiederkehrende Gäste", detail: "Ab der zweiten Buchung weitere 10% Rabatt." },
      { value: "-10%", label: "Nicht erstattbarer Tarif", detail: "Im Vergleich zum flexiblen Tarif, für alle, die schon entschieden haben." },
    ],
    whatsappTemplate: (apt, ci, co, a) => `Hallo! Ich hätte gerne ein Angebot für das Apartment ${apt} vom ${ci} bis ${co} (${a} Erwachsene).`,
    bbAlternative: "Lieber anders buchen? Verfügbarkeit auf Bed & Breakfast.it prüfen",
  },
};

/* Scheda comparativa in stile "metasearch": foto → identità →
   punteggio/distanza → badge risparmio → box "Sito ufficiale"
   protagonista (con la tariffa alternativa flessibile+colazione come nota
   secondaria) → fascia OTA + dropdown "Altri prezzi" sotto. Punteggio e
   distanza sono dati reali già verificati altrove nel progetto. Prezzi
   OTA: verificati due volte di persona (Booking/Expedia dal vivo, stesso
   risultato entrambe le volte) — non le cifre indicate come riferimento
   in una fase precedente, che a un doppio controllo diretto non
   corrispondevano a quanto mostrato realmente dalle due piattaforme per
   questo esatto soggiorno (dettagli in src/data/price-comparison.ts). */
export async function PriceComparisonSection({ locale }: { locale: Locale }) {
  const reviews = await getGoogleReviews();
  const text = TEXT[locale];
  const WHATSAPP_URL = `https://wa.me/393934363917?text=${encodeURIComponent(
    text.whatsappTemplate(STAY.apartmentName, STAY.checkinLabel, STAY.checkoutLabel, STAY.adults)
  )}`;

  return (
    <section
      id="section-price-comparison"
      aria-labelledby="price-comparison-heading"
      data-snap-exempt="true"
      className="bg-cream py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <Reveal>
          <div className="text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-olive-950">{text.label}</span>
            <h2
              id="price-comparison-heading"
              className="mx-auto mt-5 max-w-[560px] font-display text-[clamp(26px,3vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]"
            >
              {text.heading}
            </h2>
          </div>
        </Reveal>

        {/* Card comparativa */}
        <Reveal delay={100}>
          <div className="mt-12 overflow-hidden rounded-[8px] border border-ink/10 bg-white shadow-[0_30px_70px_-40px_rgba(28,33,23,0.35)] lg:grid lg:grid-cols-[0.85fr_1fr] lg:items-stretch">
            {/* Foto: gazebo esterno di Sagittario, su richiesta del titolare
                (era la piscina). object-position leggermente spostato in
                alto rispetto al centro: il source è 4:3, qui va a riempire
                un riquadro più largo (16:10 su mobile, altezza piena su
                desktop) — senza aggiustare la resa di default il crop
                centrale tagliava via troppa struttura del gazebo in alto. */}
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Image
                src="/images/alloggi/appartamento sagittario/gazebo sagittario 2.jpeg"
                alt="Gazebo esterno privato dell'appartamento Sagittario, Agriturismo La Mora"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[50%_35%]"
              />
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-9">
              {/* Identità + punteggio */}
              <h3 className="font-display text-[24px] font-normal leading-tight text-ink">Agriturismo La Mora</h3>
              <p className="mt-1 text-[13px] text-ink-soft">{text.identity}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                {reviews.configured && reviews.rating ? (
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-[4px] bg-gold px-1.5 font-sans text-[12px] font-bold text-[#1f180e]">
                      {reviews.rating.toFixed(1)}
                    </span>
                    <StarRow rating={reviews.rating} size={13} locale={locale} />
                  </div>
                ) : (
                  <span className="text-[12px] text-ink-soft">{text.reviewsSoon}</span>
                )}
                <span className="text-[12px] text-ink-soft">{DISTANCE_TR[locale]}</span>
              </div>

              {/* Niente più badge "-X%" con percentuale calcolata sul prezzo
                  OTA: su richiesta del titolare, tolto perché non sempre
                  verificabile con un confronto realmente omogeneo (Acquario,
                  l'appartamento usato nel confronto, può non risultare
                  disponibile sulle OTA per le date correnti). Messaggio
                  qualitativo, sempre vero indipendentemente da disponibilità
                  e date: nessuna commissione, sconti reali (elencati sotto)
                  riservati a chi prenota diretto. */}
              {/* Su mobile il testo va spesso su 3 righe dentro un badge
                  rounded-full pensato per una riga sola (su desktop c'è
                  più larghezza): il risultato era una "pillola" enorme e
                  sproporzionata. Sotto sm: forma più rettangolare (si
                  adatta bene al testo multi-riga), font più piccolo e
                  tracking ridotto — stessa informazione, meno peso visivo. */}
              <Reveal delay={160}>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-[6px] bg-raspberry px-3 py-2 text-[9px] font-semibold uppercase leading-[1.5] tracking-[0.02em] text-cream sm:rounded-full sm:px-3.5 sm:py-1.5 sm:text-[10px] sm:leading-normal sm:tracking-[0.06em]">
                  {text.noCommission}
                </span>
              </Reveal>

              {/* Box "Sito ufficiale" — protagonista, ma sullo stesso
                  linguaggio cromatico chiaro del resto della pagina (era un
                  riquadro marrone scuro/oro, contrasto giudicato troppo
                  forte dal titolare): pannello cream-dim dentro la card
                  bianca, bordo oro a marcare comunque la gerarchia. */}
              <div className="relative mt-6 overflow-hidden rounded-[6px] border-2 border-gold bg-cream-dim px-6 py-7 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#1f180e]">
                  {text.sitoUfficiale}
                </span>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                  {text.prenotaConNoi}
                </p>

                {DIRECT_PRICE_EUR !== null ? (
                  <>
                    <div className="mt-2 flex items-baseline justify-center gap-2">
                      <p className="font-display text-[clamp(48px,7vw,64px)] font-medium leading-none text-raspberry">
                        €{DIRECT_PRICE_PER_NIGHT}
                      </p>
                      <span className="text-[13px] text-ink-soft">{text.perNotte}</span>
                    </div>
                    <p className="mt-2 text-[12px] text-ink-soft">
                      {STAY.nights} {text.nights} a €{DIRECT_PRICE_EUR} · {tr(locale, DIRECT_PRICE_CONDITION)}
                    </p>
                    <p className="mt-4 border-t border-ink/10 pt-4 text-[11px] leading-[1.6] text-ink-soft/80">
                      {text.preferisciLiberta(DIRECT_PRICE_FLEX_PER_NIGHT, DIRECT_PRICE_FLEX_EUR, STAY.nights, tr(locale, DIRECT_PRICE_FLEX_CONDITION))}
                    </p>
                  </>
                ) : (
                  <p className="mx-auto mt-3 max-w-[300px] font-display text-[clamp(20px,3vw,26px)] font-normal leading-[1.3] text-raspberry">
                    {text.richiediPrezzo}
                  </p>
                )}

                <p className="mt-4 text-[12px] text-ink-soft">
                  {STAY.nights} {text.nights} · {STAY.adults} {text.ospiti} · {text.apartment} {STAY.apartmentName}
                </p>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-6 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
                >
                  <HoverFill color="#8a3844" />
                  <span className="relative z-10 inline-flex items-center gap-2.5">
                    {text.prenotaDirettamente}
                    <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>

                {/* Alternativa secondaria: il widget bed-and-breakfast.it
                    resta disponibile ma non è più il sistema principale —
                    un semplice link testuale, non un altro pulsante, per
                    non mettere l'utente davanti a più sistemi paritari
                    (richiesta esplicita del titolare). */}
                <button
                  type="button"
                  className="rrp-widget-open-modal mt-3 text-[10.5px] font-medium text-ink-soft underline decoration-ink-soft/40 underline-offset-4 transition-colors hover:text-raspberry"
                >
                  {text.bbAlternative}
                </button>
              </div>

              {/* Fascia OTA secondaria */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-ink/10 pt-5">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  {OTA_PRICES.map((ota) => (
                    <span key={ota.name} className="text-[13px] text-ink-soft">
                      <span className="font-display text-[18px] text-ink">€{ota.priceEur}</span> {ota.name}
                    </span>
                  ))}
                </div>
                <OtherPricesDropdown locale={locale} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mx-auto mt-6 max-w-[560px] text-center text-[12px] leading-[1.7] text-ink-soft/80">
            {text.disclaimer(trDate(locale, STAY.checkinLabel), trDate(locale, STAY.checkoutLabel), STAY.nights, STAY.adults, STAY.apartmentName, trDate(locale, CHECKED_ON_LABEL))}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <dl className="mx-auto mt-16 grid max-w-[780px] grid-cols-1 gap-10 border-t border-ink/10 pt-12 sm:grid-cols-3">
            {text.points.map((point) => (
              <div key={point.label} className="text-center sm:text-left">
                <dt className="font-display text-4xl text-raspberry">{point.value}</dt>
                <dd className="mt-3">
                  <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-ink">
                    {point.label}
                  </span>
                  <span className="mt-2 block text-[13px] leading-[1.6] text-ink-soft">{point.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
