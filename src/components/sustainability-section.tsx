import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

/* Sostituisce la vecchia EvChargingSection (sezioncina piccola, solo
   colonnina): su richiesta esplicita del titolare, la colonnina di ricarica
   ora ha una sezione a sé, dentro una cornice più ampia sugli investimenti
   energetici della struttura, con e-bike e ricarica EV come le due
   espressioni concrete per gli ospiti. L'e-bike resta ANCHE nella pagina
   Attività (listino prezzi completo, FAQ) — qui è solo un rimando, non un
   duplicato. Solo le 2 foto reali già usate altrove nel progetto: nessuna
   foto di pannelli solari/impianti è disponibile in public/, quindi non è
   stata inventata né simulata (CLAUDE.md). */
const TEXT: Record<
  Locale,
  {
    label: string;
    heading: string;
    intro: string;
    ebikeTag: string;
    ebikeTitle: string;
    ebikeBody: string;
    ebikeCta: string;
    evTag: string;
    evTitle: string;
    evBody: string;
    evNote: string;
  }
> = {
  it: {
    label: "Sostenibilità",
    heading: "Ospitalità che pesa poco sulla terra che la circonda.",
    intro:
      "Negli ultimi anni La Mora ha scelto di investire in impianti a basso impatto per ridurre il proprio consumo dalla rete elettrica, rendendo la struttura quasi autosufficiente dal punto di vista energetico. Un impegno che si estende anche alla mobilità dei nostri ospiti, con due servizi pensati per muoversi in modo più leggero.",
    ebikeTag: "Mobilità dolce",
    ebikeTitle: "Noleggio e-bike",
    ebikeBody:
      "Pedalata assistita per esplorare la campagna intorno ad Assisi senza fatica, anche in salita. Consegna e ritiro direttamente in struttura, a cura di Paolo.",
    ebikeCta: "Listino e dettagli",
    evTag: "Mobilità elettrica",
    evTitle: "Ricarica auto elettriche",
    evBody:
      "Una colonnina da 22 kW è a disposizione degli ospiti nel parcheggio privato della struttura: bastano pochi minuti per fare il pieno di energia mentre si è in piscina o in giro per Assisi.",
    evNote: "Da segnalare in fase di prenotazione",
  },
  en: {
    label: "Sustainability",
    heading: "Hospitality that treads lightly on the land around it.",
    intro:
      "In recent years La Mora has invested in low-impact systems to cut its consumption from the power grid, making the property nearly self-sufficient for energy. A commitment that extends to guest mobility too, with two services designed for getting around more lightly.",
    ebikeTag: "Gentle mobility",
    ebikeTitle: "E-bike rental",
    ebikeBody:
      "Pedal-assist rides to explore the countryside around Assisi without effort, uphill included. Drop-off and pick-up directly on site, with Paolo.",
    ebikeCta: "Rates and details",
    evTag: "Electric mobility",
    evTitle: "Electric car charging",
    evBody:
      "A 22kW charging station is available to guests in the property's private car park: just a few minutes to top up energy while you're at the pool or out around Assisi.",
    evNote: "Let us know when you book",
  },
  fr: {
    label: "Durabilité",
    heading: "Une hospitalité qui pèse peu sur la terre qui l'entoure.",
    intro:
      "Ces dernières années, La Mora a choisi d'investir dans des installations à faible impact pour réduire sa consommation du réseau électrique, rendant la structure presque autosuffisante sur le plan énergétique. Un engagement qui s'étend aussi à la mobilité de nos hôtes, avec deux services pensés pour se déplacer plus légèrement.",
    ebikeTag: "Mobilité douce",
    ebikeTitle: "Location d'e-bike",
    ebikeBody:
      "Pédalage assisté pour explorer la campagne autour d'Assise sans effort, même en montée. Remise et retour directement sur place, avec Paolo.",
    ebikeCta: "Tarifs et détails",
    evTag: "Mobilité électrique",
    evTitle: "Recharge voitures électriques",
    evBody:
      "Une borne de 22 kW est à la disposition des hôtes dans le parking privé de la structure : quelques minutes suffisent pour faire le plein d'énergie pendant la piscine ou une sortie à Assise.",
    evNote: "À signaler lors de la réservation",
  },
  de: {
    label: "Nachhaltigkeit",
    heading: "Gastfreundschaft, die die Umgebung schont.",
    intro:
      "In den letzten Jahren hat La Mora in emissionsarme Anlagen investiert, um den Verbrauch aus dem Stromnetz zu senken — die Struktur ist dadurch energetisch fast autark. Ein Engagement, das sich auch auf die Mobilität unserer Gäste erstreckt, mit zwei Services für eine leichtere Fortbewegung.",
    ebikeTag: "Sanfte Mobilität",
    ebikeTitle: "E-Bike-Verleih",
    ebikeBody:
      "Elektrounterstütztes Fahren, um die Landschaft rund um Assisi mühelos zu erkunden, auch bergauf. Übergabe und Rückgabe direkt vor Ort, bei Paolo.",
    ebikeCta: "Preise und Details",
    evTag: "Elektromobilität",
    evTitle: "Ladestation für Elektroautos",
    evBody:
      "Eine 22-kW-Ladestation steht den Gästen auf dem privaten Parkplatz der Struktur zur Verfügung: wenige Minuten genügen, während man am Pool ist oder Assisi erkundet.",
    evNote: "Bitte bei der Buchung angeben",
  },
};

const ATTIVITA_HREF = "/agriturismo-famiglie-ad-assisi-e-dintorni/";

export function SustainabilitySection({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  return (
    <section aria-labelledby="sustainability-heading" className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-[700px] text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.label}</span>
          <h2
            id="sustainability-heading"
            className="mt-5 font-display text-[clamp(26px,3.2vw,42px)] font-normal leading-[1.2] text-ink [text-wrap:balance]"
          >
            {text.heading}
          </h2>
          <p className="mt-6 text-[15px] leading-[1.7] text-ink-soft">{text.intro}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
              <Image
                src="/images/servizi-extra/e-bike/immagine di due persone con ebike.webp"
                alt="Ospiti in e-bike sulla strada di campagna vicino ad Agriturismo La Mora"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <span className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-terracotta">
              {text.ebikeTag}
            </span>
            <h3 className="mt-2 font-display text-2xl text-ink">{text.ebikeTitle}</h3>
            <p className="mt-2.5 text-[14px] leading-[1.7] text-ink-soft">{text.ebikeBody}</p>
            <Link
              href={withLocale(locale, ATTIVITA_HREF)}
              className="mt-3 inline-block text-[10.5px] font-semibold uppercase tracking-[0.06em] text-raspberry underline decoration-raspberry/40 underline-offset-4 hover:decoration-raspberry"
            >
              {text.ebikeCta} →
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
              <Image
                src="/images/servizi-extra/ricarica-elettrica/ricarica elettrica macchina.jpg"
                alt="Colonnina di ricarica per auto elettriche nel parcheggio di Agriturismo La Mora"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <span className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-terracotta">
              {text.evTag}
            </span>
            <h3 className="mt-2 font-display text-2xl text-ink">{text.evTitle}</h3>
            <p className="mt-2.5 text-[14px] leading-[1.7] text-ink-soft">{text.evBody}</p>
            <span className="mt-3 inline-block rounded-full border border-ink/15 px-3 py-1 text-[10.5px] font-medium text-ink-soft">
              {text.evNote}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
