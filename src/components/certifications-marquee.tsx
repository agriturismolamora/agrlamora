import Image from "next/image";
import { MarqueeTrack } from "@/components/marquee-track";
import type { Locale } from "@/lib/i18n";

const ARIA_LABEL: Record<Locale, string> = {
  it: "Certificazioni e riconoscimenti",
  en: "Certifications and recognition",
  fr: "Certifications et distinctions",
  de: "Zertifizierungen und Auszeichnungen",
};

/* Striscia certificazioni: scorrimento infinito via MarqueeTrack (rAF, non
   CSS @keyframes — su alcuni mobile la versione CSS restava ferma, vedi
   marquee-track.tsx), sfondo cream-dim per marcare visivamente il cambio
   di sezione. Tutti i loghi in public/certificazioni/, in un riquadro di
   dimensioni identiche (object-contain, mai ritagliati) così restano
   allineati alla stessa altezza nonostante le proporzioni diverse dei
   singoli file. Alt in italiano, tranne dove serve tradurlo (badge ecobnb,
   con il nome della struttura). Nessun logo è cliccabile. */
const CERTIFICATIONS: { src: string; alt: string | Record<Locale, string> }[] = [
  { src: "/certificazioni/ICEA%20certification.png", alt: "Certificazione ICEA" },
  { src: "/certificazioni/agriturismo%20italia%20certifiazione.png", alt: "Certificazione Agriturismo Italia" },
  { src: "/certificazioni/beb%20certification.png", alt: "Certificazione Bed & Breakfast" },
  { src: "/certificazioni/top%20bnb%20certification.png", alt: "Certificazione Top B&B" },
  { src: "/certificazioni/tripadvisor%20certification.svg", alt: "Certificazione TripAdvisor" },
  /* Badge ecobnb fornito dal titolare (ottobre 2026), copia web 512×512
     dell'originale, proporzioni e colori invariati. Non cliccabile: manca
     un URL di profilo ecobnb confermato. */
  {
    src: "/certificazioni/badge-ecobnb-agriturismo-la-mora.png",
    alt: {
      it: "Badge ecobnb di Agriturismo La Mora",
      en: "ecobnb badge of Agriturismo La Mora",
      fr: "Badge ecobnb de l'Agriturismo La Mora",
      de: "ecobnb-Abzeichen des Agriturismo La Mora",
    },
  },
];

function CertLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex shrink-0 items-center px-9 md:px-12">
      <div className="relative h-16 w-[135px] md:h-[76px] md:w-[158px]">
        <Image src={src} alt={alt} fill sizes="158px" className="object-contain" />
      </div>
    </div>
  );
}

export function CertificationsMarquee({ locale }: { locale: Locale }) {
  return (
    <section aria-label={ARIA_LABEL[locale]} className="overflow-hidden bg-cream-dim py-8 md:py-10">
      <MarqueeTrack className="flex w-max">
        {[...CERTIFICATIONS, ...CERTIFICATIONS].map((cert, i) => (
          <CertLogo key={`${cert.src}-${i}`} src={cert.src} alt={typeof cert.alt === "string" ? cert.alt : cert.alt[locale]} />
        ))}
      </MarqueeTrack>
    </section>
  );
}
