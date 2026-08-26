import Image from "next/image";
import Link from "next/link";

/* Blocco 4 (PLAN.md §2): editoriale split + lista servizi. Copy originale
   su fatti verificati (piscina, colazione bio, attività/territorio) — non
   il testo del riferimento Lasala. */
const SERVICE_LINKS = [
  { label: "Piscina", href: "/piscina/" },
  { label: "Colazione Bio", href: "/agriturismo-con-colazione-inclusa-assisi/" },
  { label: "Attività & Territorio", href: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
] as const;

export function StructureHighlights() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-24">
        {/* Colonna fotografica: foto grande + inset più piccola sovrapposta. */}
        <div className="relative mx-auto w-full max-w-[520px] pb-10 pr-8 sm:pb-14 sm:pr-14 lg:mx-0">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)]">
            <Image
              src="/images/piscina/piscina agriturismo la mora lato.jpeg"
              alt="Piscina panoramica di Agriturismo La Mora circondata dal verde della campagna umbra"
              fill
              sizes="(max-width: 1024px) 85vw, 520px"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[52%] max-w-[230px] overflow-hidden rounded-[3px] border-[6px] border-cream shadow-[0_20px_45px_-15px_rgba(0,0,0,0.4)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/colazione/colazione bio agriturismo la mora.webp"
                alt="Colazione biologica servita agli ospiti di Agriturismo La Mora"
                fill
                sizes="230px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Colonna editoriale. */}
        <div className="mx-auto w-full max-w-[520px] lg:mx-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
            La vita alla Mora
          </span>
          <h2 className="mt-5 font-display text-[clamp(30px,3vw,46px)] font-normal leading-[1.12] text-ink [text-wrap:balance]">
            Il tempo qui si misura in tuffi in piscina, colazioni lente e strade da scoprire in bicicletta.
          </h2>
          <ul className="mt-10 flex flex-col divide-y divide-ink/10 border-t border-ink/10">
            {SERVICE_LINKS.map((service) => (
              <li key={service.label}>
                <Link
                  href={service.href}
                  className="group flex items-center justify-between py-4 font-display text-xl text-ink transition-colors hover:text-raspberry"
                >
                  {service.label}
                  <span
                    aria-hidden="true"
                    className="text-sm text-ink-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-raspberry"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/chi-siamo/"
            className="group mt-10 inline-flex items-center gap-2.5 rounded-[3px] bg-raspberry px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors duration-200 hover:bg-[#8a3844]"
          >
            Scopri la struttura
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
