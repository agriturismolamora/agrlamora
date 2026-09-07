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
   singoli file. */
const CERTIFICATIONS = [
  { src: "/certificazioni/ICEA%20certification.png", alt: "Certificazione ICEA" },
  { src: "/certificazioni/agriturismo%20italia%20certifiazione.png", alt: "Certificazione Agriturismo Italia" },
  { src: "/certificazioni/beb%20certification.png", alt: "Certificazione Bed & Breakfast" },
  { src: "/certificazioni/top%20bnb%20certification.png", alt: "Certificazione Top B&B" },
  { src: "/certificazioni/tripadvisor%20certification.svg", alt: "Certificazione TripAdvisor" },
] as const;

function CertLogo({ src, alt }: (typeof CERTIFICATIONS)[number]) {
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
          <CertLogo key={`${cert.alt}-${i}`} {...cert} />
        ))}
      </MarqueeTrack>
    </section>
  );
}
