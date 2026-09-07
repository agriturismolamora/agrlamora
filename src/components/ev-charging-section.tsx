import Image from "next/image";
import { Reveal } from "@/components/scroll-reveal";
import type { Locale } from "@/lib/i18n";

/* Sezioncina piccola e informativa, non un "momento" fotografico come le
   altre sezioni della home: nessuna colonnina con prezzo inventato (non
   confermato in PROJECT-BRIEF.md, a differenza di e-bike/culla che hanno un
   prezzo esplicito) — solo il fatto reale (22kW, da segnalare in
   prenotazione) e l'invito a scriverci prima dell'arrivo. */
const TEXT: Record<Locale, { label: string; heading: string; body: string }> = {
  it: {
    label: "Servizi extra",
    heading: "Ricarica per auto elettriche, direttamente in struttura.",
    body: "Una colonnina di ricarica da 22kW è a disposizione degli ospiti in azienda. Se arrivi con un'auto elettrica, segnalacelo al momento della prenotazione: ci organizziamo per farla trovare libera al tuo arrivo.",
  },
  en: {
    label: "Extra services",
    heading: "Electric car charging, right on site.",
    body: "A 22kW EV charging station is available to guests on the property. If you're arriving with an electric car, let us know when you book: we'll make sure it's free for you on arrival.",
  },
  fr: {
    label: "Services supplémentaires",
    heading: "Recharge pour voitures électriques, directement sur place.",
    body: "Une borne de recharge de 22kW est à la disposition des hôtes sur la propriété. Si vous arrivez en voiture électrique, signalez-le-nous au moment de la réservation : nous nous organisons pour qu'elle soit libre à votre arrivée.",
  },
  de: {
    label: "Zusatzleistungen",
    heading: "Ladestation für Elektroautos, direkt vor Ort.",
    body: "Den Gästen steht auf dem Gelände eine 22-kW-Ladestation zur Verfügung. Wenn Sie mit einem Elektroauto anreisen, teilen Sie uns dies bei der Buchung mit: wir sorgen dafür, dass sie bei Ihrer Ankunft frei ist.",
  },
};

export function EvChargingSection({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  return (
    <section className="bg-cream py-12 sm:py-16">
      <div className="mx-auto grid max-w-[820px] grid-cols-1 items-center gap-6 px-6 sm:grid-cols-[200px_1fr] sm:gap-10 sm:px-10">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] sm:aspect-square">
            <Image
              src="/images/servizi-extra/ricarica-elettrica/ricarica elettrica macchina.jpg"
              alt="Colonnina di ricarica elettrica per auto disponibile ad Agriturismo La Mora"
              fill
              sizes="(max-width: 640px) 100vw, 200px"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.label}</span>
          <h2 className="mt-2.5 font-display text-[clamp(19px,2.2vw,24px)] font-normal leading-[1.3] text-ink [text-wrap:balance]">
            {text.heading}
          </h2>
          <p className="mt-2.5 text-[13px] leading-[1.7] text-ink-soft sm:text-[14px]">{text.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
