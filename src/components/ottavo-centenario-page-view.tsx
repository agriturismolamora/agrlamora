import Image from "next/image";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Ottavo Centenario di San Francesco",
    description: "Il 2026 segna gli 800 anni dalla morte di San Francesco d'Assisi. Agriturismo La Mora, a pochi minuti dalla Basilica, offre la colazione bio inclusa a chi prenota direttamente.",
  },
  en: {
    title: "8th Centenary of St. Francis",
    description: "2026 marks 800 years since the death of St. Francis of Assisi. Agriturismo La Mora, minutes from the Basilica, offers organic breakfast included for direct bookings.",
  },
  fr: {
    title: "8e Centenaire de Saint François",
    description: "2026 marque les 800 ans de la mort de Saint François d'Assise. Agriturismo La Mora, à quelques minutes de la basilique, offre le petit-déjeuner bio inclus pour les réservations directes.",
  },
  de: {
    title: "800. Todestag des Heiligen Franziskus",
    description: "2026 markiert 800 Jahre seit dem Tod des Heiligen Franziskus von Assisi. Agriturismo La Mora, wenige Minuten von der Basilika entfernt, bietet bei Direktbuchung inklusives Bio-Frühstück.",
  },
};

export function getOttavoCentenarioMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/ottavo-centenario-san-francesco/") } };
}

const TEXT: Record<
  Locale,
  {
    label: string;
    heroTitle: string;
    p1: string;
    p2: string;
    p3: string;
    promoLabel: string;
    promoHeading: string;
    promoBody: string;
    promoCta: string;
    consiglioLabel: string;
    consiglioHeading: string;
    consiglioBody: string;
  }
> = {
  it: {
    label: "Ottavo Centenario",
    heroTitle: "Ottocento anni dalla morte di San Francesco.",
    p1: "San Francesco morì ad Assisi il 3 ottobre 1226, nella Porziuncola. Il 2026 segna quindi l'ottavo centenario della sua morte — una ricorrenza che la città vive con particolare intensità, tra celebrazioni religiose, iniziative culturali e un flusso di pellegrini e visitatori superiore all'ordinario.",
    p2: "Per il programma ufficiale delle celebrazioni — liturgie, eventi, aperture straordinarie — il riferimento più affidabile restano i canali della Basilica di San Francesco e della Diocesi di Assisi: è un anno importante per la città, e le informazioni cambiano con l'avvicinarsi delle date, quindi meglio verificarle direttamente lì piuttosto che affidarsi a terzi.",
    p3: "Quello che possiamo offrire noi è più semplice: siamo a pochi minuti dalla Basilica, in un momento in cui trovare un alloggio ad Assisi — soprattutto vicino al centro, in un anno di grande afflusso — può non essere scontato.",
    promoLabel: "La nostra promozione",
    promoHeading: "Colazione bio inclusa per chi prenota direttamente dal sito ufficiale.",
    promoBody: "Valida su ogni prenotazione diretta, non solo durante le celebrazioni — un modo per dire grazie a chi sceglie di scrivere direttamente a noi invece che passare da un intermediario.",
    promoCta: "Prenota direttamente",
    consiglioLabel: "Un consiglio pratico",
    consiglioHeading: "Prenota con anticipo, se vieni in questo periodo.",
    consiglioBody: "Un anno di celebrazioni porta più visitatori del solito ad Assisi, e la disponibilità nei periodi centrali si esaurisce prima. Se hai già in mente delle date, meglio verificare presto — noi rispondiamo direttamente, senza intermediari, e ti diciamo subito cosa è ancora libero.",
  },
  en: {
    label: "8th Centenary",
    heroTitle: "Eight hundred years since the death of St. Francis.",
    p1: "St. Francis died in Assisi on 3 October 1226, at the Porziuncola. 2026 therefore marks the eighth centenary of his death — an occasion the city marks with particular intensity, with religious celebrations, cultural initiatives and a greater-than-usual flow of pilgrims and visitors.",
    p2: "For the official programme of celebrations — liturgies, events, special openings — the most reliable reference remains the channels of the Basilica of St. Francis and the Diocese of Assisi: it's an important year for the city, and information changes as dates approach, so it's best to check directly there rather than rely on third parties.",
    p3: "What we can offer is simpler: we're minutes from the Basilica, at a time when finding accommodation in Assisi — especially near the centre, in a year of high demand — may not be a given.",
    promoLabel: "Our promotion",
    promoHeading: "Organic breakfast included for those who book directly through the official site.",
    promoBody: "Valid on every direct booking, not just during the celebrations — a way of saying thank you to those who choose to write to us directly instead of going through a middleman.",
    promoCta: "Book directly",
    consiglioLabel: "A practical tip",
    consiglioHeading: "Book ahead if you're visiting during this period.",
    consiglioBody: "A year of celebrations brings more visitors than usual to Assisi, and availability during peak periods runs out sooner. If you already have dates in mind, it's best to check early — we reply directly, with no intermediaries, and tell you right away what's still available.",
  },
  fr: {
    label: "8e Centenaire",
    heroTitle: "Huit cents ans depuis la mort de Saint François.",
    p1: "Saint François mourut à Assise le 3 octobre 1226, à la Portioncule. 2026 marque donc le huitième centenaire de sa mort — une commémoration que la ville vit avec une intensité particulière, entre célébrations religieuses, initiatives culturelles et un afflux de pèlerins et de visiteurs supérieur à l'ordinaire.",
    p2: "Pour le programme officiel des célébrations — liturgies, événements, ouvertures exceptionnelles — la référence la plus fiable reste les canaux de la basilique Saint-François et du diocèse d'Assise : c'est une année importante pour la ville, et les informations évoluent à l'approche des dates, mieux vaut donc les vérifier directement là-bas plutôt que de se fier à des tiers.",
    p3: "Ce que nous pouvons offrir est plus simple : nous sommes à quelques minutes de la basilique, à un moment où trouver un logement à Assise — surtout près du centre, dans une année de forte affluence — peut ne pas être évident.",
    promoLabel: "Notre promotion",
    promoHeading: "Petit-déjeuner bio inclus pour une réservation directe sur le site officiel.",
    promoBody: "Valable sur toute réservation directe, pas seulement pendant les célébrations — une façon de remercier ceux qui choisissent de nous écrire directement plutôt que de passer par un intermédiaire.",
    promoCta: "Réserver directement",
    consiglioLabel: "Un conseil pratique",
    consiglioHeading: "Réservez à l'avance si vous venez pendant cette période.",
    consiglioBody: "Une année de célébrations attire plus de visiteurs que d'habitude à Assise, et la disponibilité pendant les périodes centrales s'épuise plus vite. Si vous avez déjà des dates en tête, mieux vaut vérifier tôt — nous répondons directement, sans intermédiaires, et vous disons tout de suite ce qui est encore libre.",
  },
  de: {
    label: "800. Todestag",
    heroTitle: "Achthundert Jahre seit dem Tod des Heiligen Franziskus.",
    p1: "Der Heilige Franziskus starb am 3. Oktober 1226 in Assisi, in der Portiuncula-Kapelle. 2026 markiert somit den 800. Jahrestag seines Todes — ein Ereignis, das die Stadt mit besonderer Intensität begeht, mit religiösen Feiern, kulturellen Initiativen und einem größeren Zustrom an Pilgern und Besuchern als gewöhnlich.",
    p2: "Für das offizielle Programm der Feierlichkeiten — Liturgien, Veranstaltungen, Sonderöffnungen — bleiben die Kanäle der Basilika des Heiligen Franziskus und der Diözese Assisi die zuverlässigste Quelle: es ist ein wichtiges Jahr für die Stadt, und die Informationen ändern sich, je näher die Termine rücken — es lohnt sich also, direkt dort nachzuschauen, statt sich auf Dritte zu verlassen.",
    p3: "Was wir bieten können, ist einfacher: wir sind nur wenige Minuten von der Basilika entfernt, zu einer Zeit, in der eine Unterkunft in Assisi zu finden — besonders nahe der Altstadt, in einem Jahr mit großem Andrang — nicht selbstverständlich sein könnte.",
    promoLabel: "Unsere Aktion",
    promoHeading: "Bio-Frühstück inklusive bei Direktbuchung über die offizielle Website.",
    promoBody: "Gültig für jede Direktbuchung, nicht nur während der Feierlichkeiten — eine Art, Danke zu sagen an alle, die sich entscheiden, uns direkt zu schreiben, statt über einen Vermittler zu buchen.",
    promoCta: "Direkt buchen",
    consiglioLabel: "Ein praktischer Tipp",
    consiglioHeading: "Buchen Sie frühzeitig, wenn Sie in diesem Zeitraum kommen.",
    consiglioBody: "Ein Jahr voller Feierlichkeiten bringt mehr Besucher als gewöhnlich nach Assisi, und die Verfügbarkeit in den zentralen Zeiträumen ist schneller erschöpft. Wenn Sie bereits Termine im Kopf haben, prüfen Sie am besten frühzeitig — wir antworten direkt, ohne Vermittler, und sagen Ihnen sofort, was noch frei ist.",
  },
};

export function OttavoCentenarioPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];

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
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">{text.label}</span>
          <h1 className="mt-4 font-display text-[clamp(30px,4.8vw,50px)] font-normal leading-[1.15] text-cream [text-wrap:balance]">
            {text.heroTitle}
          </h1>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[700px] px-6 sm:px-10">
          <Reveal>
            <div className="space-y-5 text-[15px] leading-[1.85] text-ink-soft">
              <p>{text.p1}</p>
              <p>{text.p2}</p>
              <p>{text.p3}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 rounded-[3px] border border-gold/40 bg-cream-dim px-7 py-8 text-center">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">{text.promoLabel}</span>
              <p className="mx-auto mt-4 max-w-[420px] font-display text-[20px] font-normal leading-[1.4] text-ink [text-wrap:balance]">
                {text.promoHeading}
              </p>
              <p className="mx-auto mt-3 max-w-[420px] text-[13px] leading-[1.7] text-ink-soft">{text.promoBody}</p>
              {/* Apre il modale di prenotazione di bed-and-breakfast.it come
                  il resto del sito (classe rrp-widget-open-modal, vedi
                  root-shell.tsx), non più WhatsApp: la promo vale proprio
                  per chi prenota direttamente. */}
              <button
                type="button"
                className="rrp-widget-open-modal group relative mt-6 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
              >
                <HoverFill color="#8f7330" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {text.promoCta}
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>
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

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 px-6 sm:grid-cols-2 sm:px-10 sm:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/ottavo centenario san francesco/san francesco.jpg"
                alt="San Francesco d'Assisi"
                fill
                sizes="(max-width: 640px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">{text.consiglioLabel}</span>
            <h2 className="mt-3 font-display text-[26px] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.consiglioHeading}
            </h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-ink-soft">{text.consiglioBody}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
