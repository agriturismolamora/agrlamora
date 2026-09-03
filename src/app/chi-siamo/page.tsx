import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/scroll-reveal";
import { StarRow } from "@/components/review-icons";
import { HoverFill } from "@/components/hover-fill";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description:
    "La Mora è un'azienda agricola di famiglia ad Assisi, gestita da Giuseppina e Paolo. Cinque appartamenti ricavati da un vecchio casale umbro, non una catena.",
  alternates: { canonical: "/chi-siamo/" },
};

/* Pagina "Chi Siamo": nessun dato biografico inventato (età, anno esatto
   di apertura, aneddoti specifici non verificabili) — solo ciò che è
   riscontrabile: ragione sociale (PLAN.md), nome dei titolari, il tono
   delle recensioni reali già raccolte altrove nel progetto (stessa fonte
   di ranking-hero.tsx), e i fatti strutturali (5 appartamenti, gestione
   familiare, posizione). */
export default function ChiSiamoPage() {
  return (
    <>
      <section className="relative flex h-[62vh] min-h-[440px] items-end overflow-hidden">
        <Image
          src="/images/struttura/foto dell esterno della struttura.webp"
          alt="Esterno del casale di Agriturismo La Mora"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.75) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-14 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">Chi siamo</span>
          <h1 className="mt-4 font-display text-[clamp(34px,5.5vw,58px)] font-normal leading-[1.1] text-cream [text-wrap:balance]">
            Una casa di famiglia, prima ancora che un agriturismo.
          </h1>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[720px] px-6 sm:px-10">
          <Reveal>
            <p className="font-display text-[19px] italic leading-[1.6] text-ink [text-wrap:balance]">
              La Mora è un'azienda agricola: la gestiscono Giuseppina e Paolo, con la loro famiglia, non un gruppo
              alberghiero. Quando scrivi o chiami, rispondono loro.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 space-y-5 text-[15px] leading-[1.85] text-ink-soft">
              <p>
                Il casale che oggi ospita i cinque appartamenti è stato ricavato dalla ristrutturazione di un vecchio
                edificio rurale della campagna umbra, a pochi minuti da Assisi. Non è stato costruito per essere un
                agriturismo da cartolina: è ancora, prima di tutto, un&apos;azienda agricola — con un terreno vero, gli
                ulivi, un maneggio con i cavalli, e la logica di chi vive la terra ogni giorno, non solo la
                accoglienza.
              </p>
              <p>
                Le camere e gli appartamenti sono nati da lì: dalla necessità di aprire quella casa a chi viene ad
                Assisi e cerca qualcosa di diverso da un hotel — spazio vero, una cucina propria, un giardino, la
                possibilità di rallentare.
              </p>
              <p>
                Chi lavora a La Mora, dalla colazione alla manutenzione della piscina, fa parte della stessa famiglia
                o è vicino ad essa. Non c&apos;è un call center: le domande su un letto in più, un arrivo fuori orario o
                cosa vedere ad Assisi il giorno dopo, le risponde chi la struttura la vive davvero.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-14 rounded-[3px] border-l-2 border-gold bg-cream-dim px-7 py-7">
              <div className="flex items-center gap-2">
                <StarRow rating={5} size={14} />
              </div>
              <p className="mt-3 font-display text-[17px] italic leading-[1.6] text-ink">
                &ldquo;Hôte très gentil, au petit soin. Emplacement calme, piscine très bien entretenue, appartement
                propre et fonctionnel.&rdquo;
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.1em] text-ink-soft">Ludivine, Francia — Google</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-3 px-6 sm:grid-cols-3 sm:px-10">
          <Reveal className="sm:col-span-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px]">
              <Image
                src="/images/struttura/foto vista alto agriturismo la mora assisi.webp"
                alt="Vista dall'alto di Agriturismo La Mora nella campagna umbra"
                fill
                sizes="(max-width: 640px) 100vw, 700px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] sm:aspect-auto sm:h-full">
              <Image
                src="/images/home/esterno agriturismo la mora carretto e agriturismo.webp"
                alt="Ingresso dell'agriturismo con carretto d'epoca"
                fill
                sizes="(max-width: 640px) 100vw, 330px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[720px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Il territorio</span>
            <h2 className="mx-auto mt-5 max-w-[560px] font-display text-[clamp(24px,3vw,34px)] font-normal leading-[1.25] text-ink [text-wrap:balance]">
              Ad Assisi si arriva per la Basilica. A La Mora si resta per come ci si sente.
            </h2>
            <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-[1.8] text-ink-soft">
              Siamo a pochi minuti dal centro storico di Assisi, abbastanza vicini per andarci a piedi o in bici,
              abbastanza fuori per tornare la sera in un posto silenzioso, con gli ulivi intorno e la piscina che
              aspetta.
            </p>
            <a
              href="/territorio/"
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8f4324" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Scopri il territorio
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
