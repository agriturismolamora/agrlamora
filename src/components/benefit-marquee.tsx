import Image from "next/image";

/* Claim verificati su PROJECT-BRIEF.md / vecchio sito agriturismoinassisi.it
   — nessun claim del riferimento Lasala (prezzo garantito, cancellazione
   48h, late check-out) è stato riutilizzato: non risultano approvati per
   La Mora. Ogni voce è abbinata a una fotografia reale coerente. */
const BENEFITS = [
  {
    label: "10% di sconto da 7 notti",
    img: "/images/piscina/piscina agriturismo la mora.webp",
    alt: "Piscina di Agriturismo La Mora",
  },
  {
    label: "10% per chi torna a La Mora",
    img: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
    alt: "Esterno di Agriturismo La Mora",
  },
  {
    label: "Caparra 25% · saldo all'arrivo",
    img: "/images/home/foto dell agriturismo dall alto.webp",
    alt: "Vista dall'alto di Agriturismo La Mora",
  },
  {
    label: "Pet friendly · giardino recintato",
    img: "/images/home/area cani appartamento gemelli esterno .jpg",
    alt: "Giardino privato recintato, appartamento Gemelli",
  },
  {
    label: "Ricarica auto elettriche 22kW",
    img: "/images/servizi-extra/ricarica-elettrica/ricarica elettrica macchina.jpg",
    alt: "Colonnina di ricarica elettrica in struttura",
  },
  {
    label: "Noleggio e-bike per il territorio",
    img: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
    alt: "Noleggio e-bike ad Agriturismo La Mora",
  },
] as const;

function BenefitItem({ label, img, alt }: (typeof BENEFITS)[number]) {
  return (
    <div className="flex shrink-0 items-center gap-3.5 px-7 md:px-9">
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
        <Image src={img} alt={alt} fill sizes="48px" className="object-cover" />
      </span>
      <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.06em] text-olive-950 md:text-xs">
        {label}
      </span>
    </div>
  );
}

export function BenefitMarquee() {
  return (
    <section aria-label="Perché prenotare a La Mora" className="overflow-hidden bg-cream py-6 md:py-8">
      <div className="flex w-max animate-marquee">
        {[...BENEFITS, ...BENEFITS].map((benefit, i) => (
          <BenefitItem key={`${benefit.label}-${i}`} {...benefit} />
        ))}
      </div>
    </section>
  );
}
