import Link from "next/link";
import type { Apartment } from "@/data/apartments";

const WHATSAPP_URL = (name: string) =>
  `https://wa.me/393934363917?text=${encodeURIComponent(`Ciao! Vorrei informazioni sulla disponibilità dell'appartamento ${name}.`)}`;

/* Box disponibilità/prenotazione: stesso principio già stabilito nel resto
   del sito (booking-bar.tsx) — nessun motore di prenotazione ancora
   funzionante (PLAN.md, fuori scope), quindi "Prenota ora" resta un
   pulsante placeholder onesto, mentre WhatsApp e telefono sono link reali
   e funzionanti. Su desktop resta agganciato (sticky) mentre si scorre il
   racconto a fianco, così è sempre facilmente raggiungibile. */
export function AvailabilityBox({ apt }: { apt: Apartment }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-[3px] border border-ink/10 bg-cream-dim px-6 py-7 sm:px-7">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">Disponibilità</span>
        <p className="mt-2 font-display text-[22px] leading-tight text-ink">Appartamento {apt.name}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink/10 pt-5 text-[13px]">
          <div>
            <dt className="text-ink-soft">Ospiti</dt>
            <dd className="mt-0.5 font-semibold text-ink">Fino a {apt.maxGuests}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Metratura</dt>
            <dd className="mt-0.5 font-semibold text-ink">{apt.sqm} m²</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Bagni</dt>
            <dd className="mt-0.5 font-semibold text-ink">{apt.bathrooms}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Animali</dt>
            <dd className="mt-0.5 font-semibold text-ink">{apt.petFriendly ? "Ammessi" : "Non ammessi"}</dd>
          </div>
        </dl>

        <button
          type="button"
          className="mt-6 w-full rounded-[3px] bg-raspberry py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#8a3844]"
        >
          Prenota ora
        </button>

        <a
          href={WHATSAPP_URL(apt.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-[3px] border border-ink/15 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-ink/35"
        >
          Scrivici su WhatsApp
        </a>

        <a href="tel:+390758041164" className="mt-3 block text-center text-[12px] text-ink-soft underline decoration-ink-soft/30 underline-offset-4 hover:text-raspberry">
          075 8041164
        </a>

        <p className="mt-5 text-[11px] leading-[1.6] text-ink-soft/80">
          Caparra 25% alla prenotazione, saldo all&apos;arrivo. -10% da 7 notti, -10% per chi torna.
        </p>
      </div>

      <Link
        href="/alloggi/"
        className="mt-4 block text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-soft underline decoration-ink-soft/30 underline-offset-4 hover:text-raspberry"
      >
        Torna a tutti gli appartamenti
      </Link>
    </aside>
  );
}
