import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

export const metadata: Metadata = {
  title: "Ottavo Centenario di San Francesco",
  description:
    "Il 2026 segna gli 800 anni dalla morte di San Francesco d'Assisi. Agriturismo La Mora, a pochi minuti dalla Basilica, offre la colazione bio inclusa a chi prenota direttamente.",
  alternates: { canonical: "/ottavo-centenario-san-francesco/" },
};

/* Pagina delicata: nessuna data/evento/programma specifico inventato. Il
   solo fatto storico riportato (morte di Francesco il 3 ottobre 1226,
   quindi 2026 come ottavo centenario) è di dominio pubblico e verificabile
   indipendentemente da qualunque fonte del progetto. Per il programma
   ufficiale delle celebrazioni si rimanda ai canali della Basilica/diocesi,
   mai inventato qui. L'unica promozione reale è quella già confermata in
   PROJECT-BRIEF.md: colazione bio inclusa per chi prenota diretto. */
export default function OttavoCentenarioPage() {
  return (
    <>
      <section className="relative flex h-[64vh] min-h-[460px] items-end overflow-hidden">
        <Image
          src="/images/ottavo centenario san francesco/basilica di san francesco di assisi ottavo centenario.webp"
          alt="Basilica di San Francesco d'Assisi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.1) 0%, rgba(20,14,7,.8) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[860px] px-6 pb-14 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">Ottavo Centenario</span>
          <h1 className="mt-4 font-display text-[clamp(30px,4.8vw,50px)] font-normal leading-[1.15] text-cream [text-wrap:balance]">
            Ottocento anni dalla morte di San Francesco.
          </h1>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[700px] px-6 sm:px-10">
          <Reveal>
            <div className="space-y-5 text-[15px] leading-[1.85] text-ink-soft">
              <p>
                San Francesco morì ad Assisi il 3 ottobre 1226, nella Porziuncola. Il 2026 segna quindi l&apos;ottavo
                centenario della sua morte — una ricorrenza che la città vive con particolare intensità, tra
                celebrazioni religiose, iniziative culturali e un flusso di pellegrini e visitatori superiore
                all&apos;ordinario.
              </p>
              <p>
                Per il programma ufficiale delle celebrazioni — liturgie, eventi, aperture straordinarie — il
                riferimento più affidabile restano i canali della Basilica di San Francesco e della Diocesi di
                Assisi: è un anno importante per la città, e le informazioni cambiano con l&apos;avvicinarsi delle
                date, quindi meglio verificarle direttamente lì piuttosto che affidarsi a terzi.
              </p>
              <p>
                Quello che possiamo offrire noi è più semplice: siamo a pochi minuti dalla Basilica, in un momento in
                cui trovare un alloggio ad Assisi — soprattutto vicino al centro, in un anno di grande afflusso — può
                non essere scontato.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 rounded-[3px] border border-gold/40 bg-cream-dim px-7 py-8 text-center">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">La nostra promozione</span>
              <p className="mx-auto mt-4 max-w-[420px] font-display text-[20px] font-normal leading-[1.4] text-ink [text-wrap:balance]">
                Colazione bio inclusa per chi prenota direttamente dal sito ufficiale.
              </p>
              <p className="mx-auto mt-3 max-w-[420px] text-[13px] leading-[1.7] text-ink-soft">
                Valida su ogni prenotazione diretta, non solo durante le celebrazioni — un modo per dire grazie a chi
                sceglie di scrivere direttamente a noi invece che passare da un intermediario.
              </p>
              <a
                href="https://wa.me/393934363917?text=Ciao!%20Vorrei%20prenotare%20direttamente%20e%20sapere%20di%20pi%C3%B9%20sulla%20promo%20colazione%20inclusa."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-6 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
              >
                <HoverFill color="#8f7330" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  Prenota direttamente
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-[3px]">
              <Image
                src="/images/ottavo centenario san francesco/assisi per ostensione delle spoglie di san francesco ottavo centenario.jpg"
                alt="Assisi durante le celebrazioni per l'Ottavo Centenario di San Francesco"
                fill
                sizes="(max-width: 640px) 100vw, 700px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
