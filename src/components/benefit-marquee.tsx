import Image from "next/image";
import type { Locale } from "@/lib/i18n";

/* Claim verificati su PROJECT-BRIEF.md / vecchio sito agriturismoinassisi.it
   — nessun claim del riferimento Lasala (prezzo garantito, cancellazione
   48h, late check-out) è stato riutilizzato: non risultano approvati per
   La Mora. Ogni voce è abbinata a una fotografia reale coerente. */
const BENEFITS: { label: Record<Locale, string>; img: string; alt: string }[] = [
  {
    label: {
      it: "10% di sconto da 7 notti",
      en: "10% off from 7 nights",
      fr: "10% de réduction dès 7 nuits",
      de: "10% Rabatt ab 7 Nächten",
    },
    img: "/images/piscina/piscina agriturismo la mora.webp",
    alt: "Piscina di Agriturismo La Mora",
  },
  {
    label: {
      it: "10% per chi torna a La Mora",
      en: "10% for returning guests",
      fr: "10% pour les clients qui reviennent",
      de: "10% für wiederkehrende Gäste",
    },
    img: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
    alt: "Esterno di Agriturismo La Mora",
  },
  {
    label: {
      it: "Caparra 25% · saldo all'arrivo",
      en: "25% deposit · balance on arrival",
      fr: "Acompte 25% · solde à l'arrivée",
      de: "25% Anzahlung · Rest bei Ankunft",
    },
    img: "/images/home/foto dell agriturismo dall alto.webp",
    alt: "Vista dall'alto di Agriturismo La Mora",
  },
  {
    label: {
      it: "Pet friendly · giardino recintato",
      en: "Pet friendly · fenced garden",
      fr: "Animaux acceptés · jardin clôturé",
      de: "Haustierfreundlich · eingezäunter Garten",
    },
    img: "/images/home/area cani appartamento gemelli esterno .jpg",
    alt: "Giardino privato recintato, appartamento Gemelli",
  },
  {
    label: {
      it: "Ricarica auto elettriche 22kW",
      en: "22kW EV charging station",
      fr: "Borne de recharge électrique 22kW",
      de: "22-kW-Ladestation für Elektroautos",
    },
    img: "/images/servizi-extra/ricarica-elettrica/ricarica elettrica macchina.jpg",
    alt: "Colonnina di ricarica elettrica in struttura",
  },
  {
    label: {
      it: "Noleggio e-bike per il territorio",
      en: "E-bike rental to explore the area",
      fr: "Location d'e-bikes pour explorer la région",
      de: "E-Bike-Verleih zur Erkundung der Umgebung",
    },
    img: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
    alt: "Noleggio e-bike ad Agriturismo La Mora",
  },
];

function BenefitItem({ label, img, alt, locale }: { label: Record<Locale, string>; img: string; alt: string; locale: Locale }) {
  return (
    <div className="flex shrink-0 items-center gap-3.5 px-7 md:px-9">
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
        <Image src={img} alt={alt} fill sizes="48px" className="object-cover" />
      </span>
      <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.06em] text-olive-950 md:text-xs">
        {label[locale]}
      </span>
    </div>
  );
}

const SECTION_LABEL: Record<Locale, string> = {
  it: "Perché prenotare a La Mora",
  en: "Why book at La Mora",
  fr: "Pourquoi réserver à La Mora",
  de: "Warum bei La Mora buchen",
};

export function BenefitMarquee({ locale }: { locale: Locale }) {
  return (
    <section aria-label={SECTION_LABEL[locale]} className="overflow-hidden bg-cream py-6 md:py-8">
      <div className="flex w-max animate-marquee">
        {[...BENEFITS, ...BENEFITS].map((benefit, i) => (
          <BenefitItem key={`${i}`} {...benefit} locale={locale} />
        ))}
      </div>
    </section>
  );
}
