import Image from "next/image";
import Link from "next/link";

/* Indice editoriale (non il classico "foto grande + titolo + paragrafo"):
   colonna intro sticky a sinistra, lista a destra con rientro alternato
   (asimmetria deliberata, non 4 card uguali). Ogni riga porta una miniatura
   reale con il numero d'ordine sovrapposto. Solo fatti reali già verificati
   altrove nel progetto — nessun nuovo dato inventato qui. */
const SIGNATURES = [
  {
    tag: "01",
    title: "Pet friendly",
    detail: "Giardino privato recintato per gli appartamenti Gemelli e Sagittario, con doccia esterna per i cani.",
    href: "/alloggi/",
    image: "/images/alloggi/appartamento gemelli/area cani appartamento gemelli esterno .jpg",
    alt: "Giardino recintato per cani dell'appartamento Gemelli, Agriturismo La Mora",
  },
  {
    tag: "02",
    title: "Mobilità pulita",
    detail: "Ricarica per auto elettriche da 22 kW e noleggio e-bike, disponibili direttamente in struttura.",
    href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
    image: "/images/servizi-extra/ricarica-elettrica/ricarica elettrica macchina.jpg",
    alt: "Colonnina di ricarica per auto elettriche nel parcheggio di Agriturismo La Mora",
  },
  {
    tag: "03",
    title: "Colazione bio",
    detail: "Preparata ogni mattina da Giuseppina con prodotti del territorio, dalle 7:00 alle 9:30.",
    href: "/agriturismo-con-colazione-inclusa-assisi/",
    image: "/images/colazione/colazione bio agriturismo la mora.webp",
    alt: "Colazione biologica servita ogni mattina ad Agriturismo La Mora",
  },
  {
    tag: "04",
    title: "Pensato per le famiglie",
    detail: "Piscina panoramica, parco giochi e appartamenti indipendenti per soggiornare senza pensieri.",
    href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
    image: "/images/piscina/esterno agriturismo con vista struttura e rete calcio piu campo da calcio.jpg",
    alt: "Area esterna di Agriturismo La Mora con piscina e campo da calcio",
  },
] as const;

export function StructureHighlights() {
  return (
    <section id="section-highlights" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1300px] gap-12 px-6 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Perché La Mora</span>
          <h2 className="mt-5 font-display text-[clamp(32px,3.6vw,52px)] font-normal leading-[1.12] text-ink [text-wrap:balance]">
            Non il solito agriturismo.
          </h2>
          <p className="mt-5 max-w-[380px] font-display text-[21px] italic leading-[1.35] text-ink-soft [text-wrap:balance]">
            È una casa, con tutto quello che serve per sentirsi a proprio agio.
          </p>
        </div>

        <ul className="flex flex-col divide-y divide-ink/10 border-t border-ink/10">
          {SIGNATURES.map((s, i) => (
            <li key={s.title}>
              <Link
                href={s.href}
                className={`group flex items-center gap-5 py-7 transition-colors sm:gap-8 sm:py-8 ${
                  i % 2 === 1 ? "sm:pl-14" : ""
                }`}
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[3px] sm:h-28 sm:w-28">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 80px, 112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-1.5 top-1.5 font-display text-[11px] text-cream/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                    {s.tag}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[21px] leading-[1.15] text-ink transition-colors group-hover:text-raspberry sm:text-[26px]">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[420px] text-[13px] leading-[1.65] text-ink-soft">{s.detail}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-raspberry sm:block"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
