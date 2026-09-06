import Image from "next/image";
import { Reveal } from "@/components/scroll-reveal";
import { PinnedHold } from "@/components/pinned-hold";
import { HoverFill } from "@/components/hover-fill";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/dictionary";

const ADDRESS = "Via Fonte Citerna, 7 — 06081 Assisi PG";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(
  "Agriturismo La Mora, Via Fonte Citerna 7, 06081 Assisi PG"
);
const PHONE_TEL = "tel:+390758041164";
const PHONE_DISPLAY = "075 804 1164";
const WHATSAPP_URL = "https://wa.me/393934363917";
const EMAIL = "agriturismolamora@gmail.com";

const TEXT: Record<Locale, { label: string; heading: string; body: string; maps: string }> = {
  it: {
    label: "Dove siamo",
    heading: "Assisi fuori dalla finestra. L'Umbria tutt'intorno.",
    body: "La Mora è in aperta campagna, a 5 km da Assisi e a circa 7 km dall'aeroporto di Perugia Sant'Egidio: un punto d'appoggio comodo per muoversi in tutta l'Umbria e tornare ogni sera nel silenzio della campagna.",
    maps: "Apri in Google Maps",
  },
  en: {
    label: "Where we are",
    heading: "Assisi right outside the window. Umbria all around.",
    body: "La Mora is in open countryside, 5 km from Assisi and about 7 km from Perugia Sant'Egidio airport: a convenient base for getting around Umbria and returning every evening to the quiet of the countryside.",
    maps: "Open in Google Maps",
  },
  fr: {
    label: "Où nous sommes",
    heading: "Assise juste devant la fenêtre. L'Ombrie tout autour.",
    body: "La Mora est en pleine campagne, à 5 km d'Assise et à environ 7 km de l'aéroport de Pérouse Sant'Egidio : une base pratique pour parcourir toute l'Ombrie et retrouver chaque soir le calme de la campagne.",
    maps: "Ouvrir dans Google Maps",
  },
  de: {
    label: "Wo wir sind",
    heading: "Assisi direkt vor dem Fenster. Umbrien ringsum.",
    body: "La Mora liegt in offener Landschaft, 5 km von Assisi und etwa 7 km vom Flughafen Perugia Sant'Egidio entfernt: eine praktische Basis, um ganz Umbrien zu erkunden und jeden Abend in die Stille der Landschaft zurückzukehren.",
    maps: "In Google Maps öffnen",
  },
};

/* Sezione finale prima del footer: mappa reale (asset obbligatorio del
   cliente) + pannello contatti. object-cover, a riempire il riquadro senza
   bordi su nessuno dei 4 lati (richiesta esplicita): la mappa è quadrata
   (1254×1254), quindi un object-position center taglia in modo simmetrico
   sui lati eccedenti, senza mai deformare le proporzioni né inclinare il
   contenuto. Nessuna coordinata inventata: il link Maps usa l'indirizzo
   reale via ricerca. */
export function LocationMap({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  return (
    <section id="section-map" aria-labelledby="location-heading" className="bg-cream lg:min-h-[140vh]">
      <PinnedHold>
      <div className="flex flex-col lg:h-[100svh] lg:flex-row">
        <Reveal className="relative aspect-[4/3] w-full bg-cream-dim sm:aspect-[16/10] lg:aspect-auto lg:w-[58%]">
          <Image
            src="/images/home/mappa%20della%20zona%20agriturismo%20la%20mora.png"
            alt="Mappa della zona intorno ad Agriturismo La Mora, ad Assisi"
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
              <p>{ADDRESS}</p>
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
                href={MAPS_URL}
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
