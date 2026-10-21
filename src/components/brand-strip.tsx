import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { BookingModalButton } from "@/components/booking-modal-button";
import type { BlogTheme } from "@/data/blog-posts";

/* Striscia "chi scrive": in tutti gli articoli del blog, sotto titolo e
   lead, perché chi arriva da Google su un articolo capisca subito di essere
   sul sito di un agriturismo e possa prenotare o conoscerlo. Logo, nome,
   una riga di fatti (brief) e due azioni: Prenota (modale) e Chi siamo. */
const TEXT: Record<Locale, { name: string; line: string; book: string; discover: string }> = {
  it: { name: "Agriturismo La Mora · Assisi", line: "5 appartamenti indipendenti, parcheggio gratuito, prenotazione diretta", book: "Prenota", discover: "Scopri l'agriturismo" },
  en: { name: "Agriturismo La Mora · Assisi", line: "5 independent apartments, free parking, direct booking", book: "Book", discover: "Discover the agriturismo" },
  fr: { name: "Agriturismo La Mora · Assise", line: "5 appartements indépendants, parking gratuit, réservation directe", book: "Réserver", discover: "Découvrir l'agritourisme" },
  de: { name: "Agriturismo La Mora · Assisi", line: "5 unabhängige Ferienwohnungen, kostenloser Parkplatz, Direktbuchung", book: "Buchen", discover: "Das Agriturismo entdecken" },
};

/* Colori per tema dell'articolo: "chocolate" e "newyear" sono su fondo
   scuro (logo bianco), con la loro palette (CSS module del tema). */
const THEME: Record<BlogTheme, { box: string; dark: boolean; name: string; line: string; book: string; sheen: "soft" | "strong"; discover: string }> = {
  default: {
    box: "border border-ink/10 bg-cream-dim",
    dark: false,
    name: "text-ink",
    line: "text-ink-soft",
    book: "bg-raspberry text-cream hover:bg-[#8a3844]",
    sheen: "soft",
    discover: "border-ink/20 text-ink hover:border-raspberry hover:text-raspberry",
  },
  chocolate: {
    box: "border border-[var(--caramello-chiaro)]/30 bg-black/20",
    dark: true,
    name: "text-[var(--crema)]",
    line: "text-[var(--crema)]/80",
    book: "bg-[var(--caramello-chiaro)] text-[#2b1a10] hover:bg-[var(--crema)]",
    sheen: "strong",
    discover: "border-[var(--crema)]/40 text-[var(--crema)] hover:border-[var(--crema)]",
  },
  newyear: {
    box: "border border-[var(--oro)]/30 bg-[var(--notte-2)]",
    dark: true,
    name: "text-[var(--avorio)]",
    line: "text-[var(--avorio)]/80",
    book: "bg-[var(--oro)] text-[var(--notte)] hover:bg-[var(--champagne)]",
    sheen: "strong",
    discover: "border-[var(--avorio)]/40 text-[var(--avorio)] hover:border-[var(--avorio)]",
  },
};

export function BrandStrip({ locale, theme = "default" }: { locale: Locale; theme?: BlogTheme }) {
  const text = TEXT[locale];
  const c = THEME[theme];
  return (
    <aside aria-label={text.name} className={`mt-8 flex flex-col gap-4 rounded-[6px] px-5 py-5 ${c.box}`}>
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Image
          src={c.dark ? "/images/logo/logo-bianco-agriturismo-la-mora.png" : "/images/logo/logo agriturismo la mora.png"}
          alt=""
          width={72}
          height={54}
          className="h-auto w-[60px] shrink-0 sm:w-[72px]"
        />
        <div className="min-w-0">
          <p className={`font-display text-[18px] leading-[1.2] ${c.name}`}>{text.name}</p>
          <p className={`mt-1 text-[13px] leading-[1.5] ${c.line}`}>{text.line}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5 sm:pl-[92px]">
        <BookingModalButton
          sheen={c.sheen}
          className={`inline-flex min-h-[42px] items-center rounded-lg px-5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] transition-colors ${c.book}`}
        >
          {text.book}
        </BookingModalButton>
        <Link
          href={withLocale(locale, "/chi-siamo/")}
          className={`inline-flex min-h-[42px] items-center rounded-lg border px-5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] transition-colors ${c.discover}`}
        >
          {text.discover}
        </Link>
      </div>
    </aside>
  );
}
