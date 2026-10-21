import Image from "next/image";
import Link from "next/link";
import { WatermarkedImage } from "@/components/watermarked-image";
import { NewBadge } from "@/components/new-badge";
import { CARFAGNA_NEW_UNTIL, CARFAGNA_PAGE_PATH, CARFAGNA_PHOTOS } from "@/data/ristorante-carfagna";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const COLAZIONE_PATH = "/agriturismo-con-colazione-inclusa-assisi/";

/* Colazione: orari e offerta da PROJECT-BRIEF.md (sezione 1, Colazione);
   ristorante: src/data/ristorante-carfagna.ts. */
const TEXT: Record<Locale, { colazione: string; colazioneBody: string; ristorante: string; ristoranteBody: string; nuovo: string; label: string }> = {
  it: {
    label: "A tavola",
    colazione: "Colazione Bio",
    colazioneBody: "Ogni mattina dalle 8:00 alle 9:30: dolci tipici umbri, frutta di stagione, caffè e cappuccino.",
    ristorante: "Ristorante convenzionato",
    ristoranteBody: "Il Ristorante Carfagna ad Assisi, con menù a prezzo fisso per gli ospiti de La Mora.",
    nuovo: "Novità",
  },
  en: {
    label: "At the table",
    colazione: "Organic breakfast",
    colazioneBody: "Every morning from 8:00 to 9:30: typical Umbrian pastries, seasonal fruit, coffee and cappuccino.",
    ristorante: "Partner restaurant",
    ristoranteBody: "Ristorante Carfagna in Assisi, with fixed-price menus for La Mora's guests.",
    nuovo: "New",
  },
  fr: {
    label: "À table",
    colazione: "Petit-déjeuner bio",
    colazioneBody: "Chaque matin de 8 h à 9 h 30 : pâtisseries typiques d'Ombrie, fruits de saison, café et cappuccino.",
    ristorante: "Restaurant partenaire",
    ristoranteBody: "Le Ristorante Carfagna à Assise, avec des menus à prix fixe pour les hôtes de La Mora.",
    nuovo: "Nouveau",
  },
  de: {
    label: "Essen",
    colazione: "Bio-Frühstück",
    colazioneBody: "Jeden Morgen von 8:00 bis 9:30 Uhr: typisch umbrisches Gebäck, Obst der Saison, Kaffee und Cappuccino.",
    ristorante: "Partnerrestaurant",
    ristoranteBody: "Das Ristorante Carfagna in Assisi, mit Festpreismenüs für die Gäste von La Mora.",
    nuovo: "Neu",
  },
};

const CARD = "group relative flex items-center gap-4 rounded-[6px] border border-ink/10 bg-cream-dim/60 p-3 pr-5 transition-colors hover:border-ink/25";

/* Fascia sobria su /alloggi/: due link-card, Colazione Bio e Ristorante
   convenzionato (con la pillola "Novità" fino a CARFAGNA_NEW_UNTIL). */
export function StayLinksBand({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const cover = CARFAGNA_PHOTOS[0];
  return (
    <section aria-label={text.label} className="bg-cream pt-6">
      <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 px-6 sm:grid-cols-2 sm:px-10">
        <Link href={withLocale(locale, COLAZIONE_PATH)} className={CARD}>
          <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[4px]">
            <WatermarkedImage src="/images/colazione/colazione bio agriturismo la mora.webp" alt="" fill sizes="80px" className="object-cover" />
          </span>
          <span>
            <span className="block font-display text-[20px] leading-tight text-ink">{text.colazione}</span>
            <span className="mt-1 block text-[12.5px] leading-[1.5] text-ink-soft">{text.colazioneBody}</span>
          </span>
        </Link>
        <Link href={withLocale(locale, CARFAGNA_PAGE_PATH)} className={CARD}>
          <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[4px]">
            <Image src={cover.src} alt="" fill sizes="80px" className="object-cover" />
          </span>
          <span>
            <span className="block font-display text-[20px] leading-tight text-ink">{text.ristorante}</span>
            <span className="mt-1 block text-[12.5px] leading-[1.5] text-ink-soft">{text.ristoranteBody}</span>
          </span>
          <NewBadge until={CARFAGNA_NEW_UNTIL} label={text.nuovo} className="absolute -top-2.5 right-3 shadow-sm" />
        </Link>
      </div>
    </section>
  );
}

/* Riga compatta per le schede appartamento, sotto "Caratteristiche":
   stessi due link, senza pillola. */
export function StayLinksRow({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const link = "inline-flex items-center gap-1.5 text-[13px] font-semibold text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry";
  return (
    <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/10 pt-6">
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.label}</span>
      <Link href={withLocale(locale, COLAZIONE_PATH)} className={link}>
        {text.colazione} <span aria-hidden="true">→</span>
      </Link>
      <Link href={withLocale(locale, CARFAGNA_PAGE_PATH)} className={link}>
        {text.ristorante} <span aria-hidden="true">→</span>
      </Link>
    </p>
  );
}
