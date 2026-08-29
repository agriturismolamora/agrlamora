"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* Indice editoriale: foto a piena altezza a sinistra (tocca il bordo del
   browser, nessun container che la isoli), lista a destra con 3 righe
   cliccabili separate da una linea orizzontale, ciascuna con il proprio CTA.
   Passare il mouse (o il focus da tastiera) su una riga cambia la foto a
   sinistra in crossfade — non un semplice hover-color, una vera anteprima
   dedicata a quel fatto.

   Argomenti scelti apposta DIVERSI da quelli già coperti altrove in home
   (Esperienze: e-bike/cavalli/piscina/famiglia/territorio — La Mora da
   Vivere: pet friendly/EV/colazione/famiglie/appartamenti/gestione
   familiare/piscina/territorio — LocationMap: campagna/aeroporto): qui solo
   fatti reali non ancora raccontati in nessun'altra sezione. */
const SIGNATURES = [
  {
    tag: "01",
    title: "Tutti i comfort di una casa vera",
    detail: "Wi-Fi, aria condizionata, cassaforte e TV satellitare in ogni appartamento: nessun pensiero da organizzare.",
    href: "/alloggi/",
    image: "/images/struttura/immagine di una sala dell agriturismo.webp",
    alt: "Sala interna arredata di uno degli appartamenti di Agriturismo La Mora",
    fit: "cover",
  },
  {
    tag: "02",
    title: "Un agriturismo riconosciuto",
    detail: "Certificato di Eccellenza 2025 e Travellers' Choice Tripadvisor, guadagnati recensione dopo recensione.",
    href: "/recensioni/",
    image: "/images/footer/certificazioni/certificato di eccellenza 2025 la mora.png",
    alt: "Certificato di Eccellenza 2025 assegnato ad Agriturismo La Mora",
    fit: "contain",
  },
  {
    tag: "03",
    title: "Tutto pronto quando arrivi",
    detail: "Biancheria da letto e da bagno già preparata, ogni dettaglio sistemato prima ancora del check-in.",
    href: "/chi-siamo/",
    image: "/images/struttura/letto matrimoniale arredato.jpeg",
    alt: "Camera con letto matrimoniale pronto in uno degli appartamenti di Agriturismo La Mora",
    fit: "cover",
  },
] as const;

export function StructureHighlights() {
  const [active, setActive] = useState(0);

  return (
    <section id="section-highlights" className="relative overflow-hidden bg-cream">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
        {/* Colonna fotografica: full-bleed, nessun container/padding a
            sinistra così tocca davvero il bordo del browser su desktop. */}
        <div className="relative order-1 aspect-[4/5] sm:aspect-[16/10] lg:order-1 lg:aspect-auto lg:min-h-[640px]">
          {SIGNATURES.map((s, i) => (
            <div
              key={s.title}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                s.fit === "contain" ? "bg-cream-dim" : ""
              }`}
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={s.fit === "contain" ? "object-contain p-16" : "object-cover"}
              />
            </div>
          ))}
        </div>

        {/* Colonna editoriale. */}
        <div className="order-2 flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:order-2 lg:px-16 lg:py-20 xl:px-20">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Perché La Mora</span>
          <h2 className="mt-5 max-w-[440px] font-display text-[clamp(28px,3vw,42px)] font-normal leading-[1.15] text-ink [text-wrap:balance]">
            Non il solito agriturismo.
          </h2>

          <ul className="mt-10 flex flex-col divide-y divide-ink/10 border-t border-ink/10">
            {SIGNATURES.map((s, i) => (
              <li
                key={s.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="py-6"
              >
                <span className="block font-display text-sm text-ink-soft/50">{s.tag}</span>
                <Link href={s.href} className="group mt-1 block">
                  <h3 className="font-display text-[22px] leading-[1.2] text-ink transition-colors group-hover:text-raspberry sm:text-[26px]">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[400px] text-[13px] leading-[1.65] text-ink-soft">{s.detail}</p>
                </Link>
                <Link
                  href={s.href}
                  className="group/cta mt-4 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.06em] text-ink transition-colors hover:text-raspberry"
                >
                  Scopri di più
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
