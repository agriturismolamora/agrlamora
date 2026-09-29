import Image from "next/image";
import { Reveal } from "@/components/scroll-reveal";
import { PinnedHold } from "@/components/pinned-hold";
import { HoverFill } from "@/components/hover-fill";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";
import { VILLA_ADDRESS } from "@/data/villa";

type Struttura = "lamora" | "villa";
type Text = { label: string; heading: string; body: string; maps: string };

const PHONE_TEL = "tel:+393934363917";
const PHONE_DISPLAY = "393 4363917";
const WHATSAPP_URL = "https://wa.me/393934363917";
const EMAIL = "agriturismolamora@gmail.com";

const MAPS_LABEL: Record<Locale, string> = {
  it: "Apri in Google Maps",
  en: "Open in Google Maps",
  fr: "Ouvrir dans Google Maps",
  de: "In Google Maps öffnen",
};

/* Dati per struttura. Villa Relax: indirizzo fornito dal titolare
   (29/09/2026) con la frazione, Rivotorto; CAP 06081 come su villa.ts e sul
   sito ufficiale villaassisi.it. Link Maps identico a quello già usato
   nella pagina Villa Relax (stessa ricerca, stesso pin). Distanze nel testo
   solo da villa.ts (Santuario di Rivotorto 2 km, Basilica di San
   Francesco 6 km). */
const CONFIG: Record<
  Struttura,
  { address: string; mapsUrl: string; image: string; alt: string; text: Record<Locale, Omit<Text, "maps">> }
> = {
  lamora: {
    address: "Via Fonte Citerna, 7 — 06081 Assisi PG",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Agriturismo La Mora, Via Fonte Citerna 7, 06081 Assisi PG"),
    image: "/images/home/mappa%20della%20zona%20agriturismo%20la%20mora.png",
    alt: "Mappa della zona intorno ad Agriturismo La Mora, ad Assisi",
    text: {
      it: {
        label: "Dove siamo",
        heading: "Assisi fuori dalla finestra. L'Umbria tutt'intorno.",
        body: "La Mora è in aperta campagna, a 5 km da Assisi e a circa 7 km dall'aeroporto di Perugia Sant'Egidio: un punto d'appoggio comodo per muoversi in tutta l'Umbria e tornare ogni sera nel silenzio della campagna.",
      },
      en: {
        label: "Where we are",
        heading: "Assisi right outside the window. Umbria all around.",
        body: "La Mora is in open countryside, 5 km from Assisi and about 7 km from Perugia Sant'Egidio airport: a convenient base for getting around Umbria and returning every evening to the quiet of the countryside.",
      },
      fr: {
        label: "Où nous sommes",
        heading: "Assise juste devant la fenêtre. L'Ombrie tout autour.",
        body: "La Mora est en pleine campagne, à 5 km d'Assise et à environ 7 km de l'aéroport de Pérouse Sant'Egidio : une base pratique pour parcourir toute l'Ombrie et retrouver chaque soir le calme de la campagne.",
      },
      de: {
        label: "Wo wir sind",
        heading: "Assisi direkt vor dem Fenster. Umbrien ringsum.",
        body: "La Mora liegt in offener Landschaft, 5 km von Assisi und etwa 7 km vom Flughafen Perugia Sant'Egidio entfernt: eine praktische Basis, um ganz Umbrien zu erkunden und jeden Abend in die Stille der Landschaft zurückzukehren.",
      },
    },
  },
  villa: {
    address: "Via di Bassano, 19 — 06081 Rivotorto di Assisi (PG)",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`Villa Relax, ${VILLA_ADDRESS}`),
    image: "/images/home/villa%20relax%20posizione%20reale.png",
    alt: "Mappa illustrata della zona intorno a Villa Relax, a Rivotorto di Assisi, tra Assisi e Spello",
    text: {
      it: {
        label: "Dove siamo",
        heading: "Tra Assisi e Spello, nella campagna di Rivotorto.",
        body: "Villa Relax è una villa indipendente nella campagna di Rivotorto, a 2 km dal Santuario di Rivotorto e a 6 km dalla Basilica di San Francesco: abbastanza vicina ad Assisi per andarci ogni giorno, abbastanza lontana da ritrovare ogni sera il silenzio della campagna.",
      },
      en: {
        label: "Where we are",
        heading: "Between Assisi and Spello, in the Rivotorto countryside.",
        body: "Villa Relax is an independent villa in the Rivotorto countryside, 2 km from the Sanctuary of Rivotorto and 6 km from the Basilica of St. Francis: close enough to Assisi to go there every day, far enough to find the quiet of the countryside every evening.",
      },
      fr: {
        label: "Où nous sommes",
        heading: "Entre Assise et Spello, dans la campagne de Rivotorto.",
        body: "Villa Relax est une villa indépendante dans la campagne de Rivotorto, à 2 km du Sanctuaire de Rivotorto et à 6 km de la Basilique Saint-François : assez proche d'Assise pour y aller chaque jour, assez loin pour retrouver chaque soir le calme de la campagne.",
      },
      de: {
        label: "Wo wir sind",
        heading: "Zwischen Assisi und Spello, in der Landschaft von Rivotorto.",
        body: "Villa Relax ist eine unabhängige Villa in der Landschaft von Rivotorto, 2 km von der Wallfahrtskirche Rivotorto und 6 km von der Basilika des Heiligen Franziskus entfernt: nah genug an Assisi, um jeden Tag hinzufahren, weit genug, um jeden Abend die Stille der Landschaft wiederzufinden.",
      },
    },
  },
};

/* Sezione finale prima del footer: mappa reale (asset obbligatorio del
   cliente) + pannello contatti. object-cover, a riempire il riquadro senza
   bordi su nessuno dei 4 lati (richiesta esplicita): la mappa è quadrata
   (1254×1254), quindi un object-position center taglia in modo simmetrico
   sui lati eccedenti, senza mai deformare le proporzioni né inclinare il
   contenuto. Nessuna coordinata inventata: il link Maps usa l'indirizzo
   reale via ricerca. */
export function LocationMap({ locale, struttura = "lamora" }: { locale: Locale; struttura?: Struttura }) {
  const config = CONFIG[struttura];
  const text: Text = { ...config.text[locale], maps: MAPS_LABEL[locale] };
  return (
    <section id="section-map" aria-labelledby="location-heading" className="bg-cream lg:min-h-[140vh]">
      <PinnedHold>
      <div className="flex flex-col lg:h-[100svh] lg:flex-row">
        <Reveal className="relative aspect-[4/3] w-full bg-cream-dim sm:aspect-[16/10] lg:aspect-auto lg:w-[58%]">
          <Image
            src={config.image}
            alt={config.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
          />
        </Reveal>

        <div className="flex w-full items-center bg-olive-950 px-6 py-16 text-cream sm:px-10 sm:py-20 lg:w-[42%] lg:px-16">
          <Reveal className="mx-auto max-w-[420px] lg:mx-0">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/70">{text.label}</span>
            <h2
              id="location-heading"
              className="mt-5 font-display text-[clamp(28px,3vw,40px)] font-normal leading-[1.2] text-cream [text-wrap:balance]"
            >
              {text.heading}
            </h2>
            <p className="mt-6 text-[14px] leading-[1.75] text-cream/75">
              {text.body}
            </p>

            <address className="mt-8 space-y-3 text-[14px] not-italic leading-[1.6] text-cream/90">
              <p>{config.address}</p>
              <p>
                <a href={PHONE_TEL} className="underline decoration-cream/30 underline-offset-4 hover:text-cream">
                  {PHONE_DISPLAY}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline decoration-cream/30 underline-offset-4 hover:text-cream"
                >
                  {EMAIL}
                </a>
              </p>
            </address>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={config.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8a3844" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {text.maps}
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-[3px] border border-cream/25 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors duration-200 hover:border-cream"
              >
                {t("common", "scriviciWhatsapp", locale)}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      </PinnedHold>
    </section>
  );
}
