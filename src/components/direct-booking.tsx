import { Reveal } from "@/components/scroll-reveal";

/* Prenotazione diretta: solo condizioni reali da PROJECT-BRIEF.md (sconto
   7+ notti, sconto clienti di ritorno, caparra/saldo). Niente "miglior
   prezzo garantito" o "cancellazione gratuita" non verificati. */
const POINTS = [
  {
    value: "-10%",
    label: "Da 7 notti",
    detail: "Soggiorni di una settimana o più hanno uno sconto diretto del 10%.",
  },
  {
    value: "-10%",
    label: "Clienti di ritorno",
    detail: "Dalla seconda prenotazione in poi, chi torna da noi ha un altro 10% di sconto.",
  },
  {
    value: "25%",
    label: "Caparra alla prenotazione",
    detail: "Il saldo si paga all'arrivo: prenotare non significa pagare tutto subito.",
  },
] as const;

export function DirectBooking() {
  return (
    <section aria-labelledby="direct-booking-heading" className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-[1000px] px-6 text-center sm:px-10">
        <Reveal>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
            Prenotazione diretta
          </span>
          <h2
            id="direct-booking-heading"
            className="mt-5 font-display text-[clamp(28px,3vw,42px)] font-normal leading-[1.2] text-ink [text-wrap:balance]"
          >
            Scrivendoci direttamente parli con chi gestisce La Mora ogni giorno.
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-[1.7] text-ink-soft">
            Nessun intermediario: la disponibilità che vedi è reale, e per qualsiasi esigenza — un letto in più, un
            arrivo fuori orario, una domanda sul territorio — rispondiamo noi, Giuseppina e Paolo.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mx-auto mt-14 grid max-w-[780px] grid-cols-1 gap-10 border-t border-ink/10 pt-12 sm:grid-cols-3">
            {POINTS.map((point) => (
              <div key={point.label}>
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
