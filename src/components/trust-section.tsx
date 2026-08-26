import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

/* Social proof: SOLO dati reali e verificabili (i tre badge sono asset
   reali in /public/images/footer/certificazioni, non ricreati). Nessuna
   recensione inventata. Il link "Leggi le recensioni" porta alla pagina
   /recensioni/ già prevista nel routing — è lì che vivrà in futuro
   l'eventuale integrazione Google in tempo reale, non duplicata qui. */
const BADGES = [
  {
    src: "/images/footer/certificazioni/tripadvisor travller's choice agriturismo la mora.png",
    alt: "Tripadvisor Travellers' Choice Awards 2025 — Agriturismo La Mora tra il primo 10% nel mondo",
  },
  {
    src: "/images/footer/certificazioni/certificato di eccellenza 2025 la mora.png",
    alt: "Certificato di eccellenza 2025 di Bed-and-Breakfast.it — Agriturismo La Mora, 9.2 su 10",
  },
  {
    src: "/images/footer/certificazioni/Certificazione TOP B&B.png",
    alt: "Riconoscimento Top B&B per Agriturismo La Mora",
  },
] as const;

export function TrustSection() {
  return (
    <section aria-labelledby="trust-heading" className="bg-cream-dim py-24 sm:py-28">
      <div className="mx-auto max-w-[1000px] px-6 text-center sm:px-10">
        <Reveal>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
            Ospiti e riconoscimenti
          </span>
          <h2
            id="trust-heading"
            className="mt-5 font-display text-[clamp(28px,3vw,42px)] font-normal leading-[1.2] text-ink [text-wrap:balance]"
          >
            Il giudizio di chi è già stato qui conta più di ogni descrizione.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-14 grid max-w-[640px] grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3">
            {BADGES.map((badge) => (
              <div
                key={badge.src}
                className="relative h-28 w-28 overflow-hidden rounded-[3px] bg-cream shadow-[0_10px_25px_-15px_rgba(28,33,23,0.3)] sm:h-32 sm:w-32"
              >
                {/* object-contain, non cover: sono badge con testo (punteggi,
                    nomi) — un crop li renderebbe illeggibili. */}
                <Image src={badge.src} alt={badge.alt} fill sizes="128px" className="object-contain p-2" />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={220}>
          <Link
            href="/recensioni/"
            className="group mt-14 inline-flex items-center gap-2.5 rounded-[3px] border border-ink/20 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors duration-200 hover:border-raspberry hover:text-raspberry"
          >
            Leggi le recensioni
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
