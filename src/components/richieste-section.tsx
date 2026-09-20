import { BbitInlineWidget } from "@/components/bbit-inline-widget";
import { bbitRichiesteUrl } from "@/lib/bbit-widget-urls";
import type { Locale } from "@/lib/i18n";

const TEXT: Record<Locale, { label: string; heading: string; body: string }> = {
  it: {
    label: "Scrivici",
    heading: "Hai una domanda? Mandaci una richiesta.",
    body: "Ti rispondiamo noi direttamente, senza intermediari: date, ospiti e un messaggio, ci pensiamo noi al resto.",
  },
  en: {
    label: "Write to us",
    heading: "Have a question? Send us a request.",
    body: "We answer you directly, no middlemen: dates, guests and a message — we'll take care of the rest.",
  },
  fr: {
    label: "Écrivez-nous",
    heading: "Une question ? Envoyez-nous une demande.",
    body: "Nous vous répondons directement, sans intermédiaire : dates, voyageurs et un message, on s'occupe du reste.",
  },
  de: {
    label: "Schreiben Sie uns",
    heading: "Eine Frage? Senden Sie uns eine Anfrage.",
    body: "Wir antworten Ihnen direkt, ohne Vermittler: Daten, Gäste und eine Nachricht — um den Rest kümmern wir uns.",
  },
};

/* Il "modulo per contattare la struttura" richiesto esplicitamente: il
   widget richieste inietta SOLO un iframe nudo verso bed-and-breakfast.it
   (verificato caricandolo davvero — non ha, a differenza di offerte/last
   minute/punti di interesse, un guscio HTML nostro-stilabile attorno),
   quindi qui mascheriamo tutto ciò che POSSIAMO controllare — l'intestazione
   della sezione, lo sfondo, lo spazio — e lasciamo che il form vero e
   proprio (iframe cross-origin) mostri inevitabilmente la propria
   interfaccia. Wrappato comunque in BbitInlineWidget (iframe srcDoc)
   perché anche il loro script esterno usa document.write per iniettare
   QUELL'iframe — la stessa fragilità del resto della famiglia di widget. */
export function RichiesteSection({ struttura, locale }: { struttura: "lamora" | "villa"; locale: Locale }) {
  const text = TEXT[locale];
  return (
    <section id="section-richiesta" className="bg-cream-dim py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-6 sm:px-10">
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.label}</span>
          <h2 className="mx-auto mt-5 max-w-[520px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
            {text.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-[440px] text-[14px] leading-[1.7] text-ink-soft">{text.body}</p>
        </div>
        <div className="mt-10 overflow-hidden rounded-[8px] border border-ink/10 bg-white shadow-[0_30px_70px_-40px_rgba(28,33,23,0.35)]">
          <BbitInlineWidget scriptSrc={bbitRichiesteUrl(struttura, locale)} minHeight={780} />
        </div>
      </div>
    </section>
  );
}
