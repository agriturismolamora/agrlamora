import Link from "next/link";
import type { Apartment } from "@/data/apartments";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { PawIcon } from "@/components/amenity-icons";
import { BookingModalButton } from "@/components/booking-modal-button";

const WHATSAPP_URL = (name: string) =>
  `https://wa.me/393934363917?text=${encodeURIComponent(`Ciao! Vorrei informazioni sulla disponibilità dell'appartamento ${name}.`)}`;

const TEXT: Record<
  Locale,
  {
    disponibilita: string;
    appartamento: string;
    ospiti: string;
    finoA: (n: number) => string;
    metratura: string;
    bagni: string;
    animali: string;
    animaliAmmessi: string;
    animaliPiccolaTaglia: string;
    prenotaOra: string;
    scriviciWhatsapp: string;
    condizioni: string;
    tornaAgliAppartamenti: string;
  }
> = {
  it: {
    disponibilita: "Disponibilità",
    appartamento: "Appartamento",
    ospiti: "Ospiti",
    finoA: (n) => `Fino a ${n}`,
    metratura: "Metratura",
    bagni: "Bagni",
    animali: "Animali",
    animaliAmmessi: "Ammessi",
    animaliPiccolaTaglia: "Piccola taglia, previo accordo",
    prenotaOra: "Prenota ora",
    scriviciWhatsapp: "Scrivici su WhatsApp",
    condizioni: "Caparra 25% alla prenotazione, saldo all'arrivo. -10% da 7 notti, -10% per chi torna.",
    tornaAgliAppartamenti: "Torna a tutti gli appartamenti",
  },
  en: {
    disponibilita: "Availability",
    appartamento: "Apartment",
    ospiti: "Guests",
    finoA: (n) => `Up to ${n}`,
    metratura: "Size",
    bagni: "Bathrooms",
    animali: "Pets",
    animaliAmmessi: "Allowed",
    animaliPiccolaTaglia: "Small breeds, subject to agreement",
    prenotaOra: "Book now",
    scriviciWhatsapp: "Message us on WhatsApp",
    condizioni: "25% deposit at booking, balance on arrival. -10% from 7 nights, -10% for returning guests.",
    tornaAgliAppartamenti: "Back to all apartments",
  },
  fr: {
    disponibilita: "Disponibilité",
    appartamento: "Appartement",
    ospiti: "Voyageurs",
    finoA: (n) => `Jusqu'à ${n}`,
    metratura: "Superficie",
    bagni: "Salles de bain",
    animali: "Animaux",
    animaliAmmessi: "Acceptés",
    animaliPiccolaTaglia: "Petite taille, sous réserve d'accord",
    prenotaOra: "Réserver",
    scriviciWhatsapp: "Écrivez-nous sur WhatsApp",
    condizioni: "Acompte de 25% à la réservation, solde à l'arrivée. -10% dès 7 nuits, -10% pour les clients fidèles.",
    tornaAgliAppartamenti: "Retour à tous les appartements",
  },
  de: {
    disponibilita: "Verfügbarkeit",
    appartamento: "Apartment",
    ospiti: "Gäste",
    finoA: (n) => `Bis zu ${n}`,
    metratura: "Größe",
    bagni: "Bäder",
    animali: "Haustiere",
    animaliAmmessi: "Erlaubt",
    animaliPiccolaTaglia: "Kleine Rassen, nach Absprache",
    prenotaOra: "Jetzt buchen",
    scriviciWhatsapp: "Schreiben Sie uns auf WhatsApp",
    condizioni: "25% Anzahlung bei Buchung, Restzahlung bei Ankunft. -10% ab 7 Nächten, -10% für wiederkehrende Gäste.",
    tornaAgliAppartamenti: "Zurück zu allen Apartments",
  },
};

/* Box disponibilità/prenotazione: "Prenota ora" apre la modale camere di
   bed-and-breakfast.it (BookingModalButton: funziona anche quando la pagina
   è raggiunta con una navigazione interna, vedi booking-modal-button.tsx) — non più un placeholder onesto in attesa di un
   booking engine proprietario, che il titolare ha deciso di abbandonare.
   WhatsApp e telefono restano come contatto diretto alternativo. Su
   desktop resta agganciato (sticky) mentre si scorre il racconto a fianco,
   così è sempre facilmente raggiungibile.

   Prima non riceveva affatto la lingua: testo e link "torna agli
   appartamenti" restavano fissi in italiano anche sulle pagine EN/FR/DE
   (bug trovato durante il collegamento dei widget, corretto qui). */
export function AvailabilityBox({ apt, locale }: { apt: Apartment; locale: Locale }) {
  const text = TEXT[locale];
  return (
    <aside id="prenota" className="scroll-mt-24 lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-[3px] border border-ink/10 bg-cream-dim px-6 py-7 sm:px-7">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">{text.disponibilita}</span>
        <p className="mt-2 font-display text-[22px] leading-tight text-ink">
          {text.appartamento} {apt.name}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink/10 pt-5 text-[13px]">
          <div>
            <dt className="text-ink-soft">{text.ospiti}</dt>{" "}
            <dd className="mt-0.5 font-semibold text-ink">{text.finoA(apt.maxGuests)}</dd>{" "}
          </div>
          <div>
            <dt className="text-ink-soft">{text.metratura}</dt>{" "}
            <dd className="mt-0.5 font-semibold text-ink">{apt.sqm} m²</dd>{" "}
          </div>
          <div>
            <dt className="text-ink-soft">{text.bagni}</dt>{" "}
            <dd className="mt-0.5 font-semibold text-ink">{apt.bathrooms}</dd>{" "}
          </div>
          <div>
            <dt className="text-ink-soft">{text.animali}</dt>{" "}
            {/* Gemelli e Sagittario: pillola con zampetta, stesso segno delle
                card del carousel in home. */}
            {apt.petFriendly ? (
              <dd className="mt-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-olive-950 py-0.5 pl-1.5 pr-2.5 text-[12px] font-semibold text-cream [&_svg]:h-4 [&_svg]:w-4">
                  <PawIcon />
                  {text.animaliAmmessi}
                </span>
              </dd>
            ) : (
              <dd className="mt-0.5 font-semibold text-ink">{text.animaliPiccolaTaglia}</dd>
            )}
          </div>
        </dl>

        <BookingModalButton className="mt-6 w-full rounded-[3px] bg-raspberry py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors hover:bg-[#8a3844]">
          {text.prenotaOra}
        </BookingModalButton>

        <a
          href={WHATSAPP_URL(apt.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-[3px] border border-ink/15 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:border-ink/35"
        >
          {text.scriviciWhatsapp}
        </a>

        <a href="tel:+393934363917" className="mt-3 block text-center text-[12px] text-ink-soft underline decoration-ink-soft/30 underline-offset-4 hover:text-raspberry">
          393 4363917
        </a>

        <p className="mt-5 text-[11px] leading-[1.6] text-ink-soft/80">{text.condizioni}</p>
      </div>

      <Link
        href={withLocale(locale, "/alloggi/")}
        className="mt-4 block text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-soft underline decoration-ink-soft/30 underline-offset-4 hover:text-raspberry"
      >
        {text.tornaAgliAppartamenti}
      </Link>
    </aside>
  );
}
