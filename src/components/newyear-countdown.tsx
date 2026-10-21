"use client";

import { useNow } from "@/hooks/use-now";
import { NEW_YEAR } from "@/data/capodanno";
import type { Locale } from "@/lib/i18n";

/* Conto alla rovescia discreto dell'articolo di Capodanno: "Mancano X
   giorni a Capodanno" (giorni di calendario, fuso Europe/Rome), dal 1°
   gennaio "Buon 2027!", dal 3 gennaio niente. Calcolo nel browser dopo il
   mount (useNow): sul server e durante l'hydration non mostra nulla, e sta
   in uno spazio ad altezza fissa riservato dalla pagina (nessun layout
   shift). Date in src/data/capodanno.ts. */
const TEXT: Record<Locale, { days: (n: number) => string; happy: (year: number) => string }> = {
  it: { days: (n) => (n === 1 ? "Manca 1 giorno a Capodanno" : `Mancano ${n} giorni a Capodanno`), happy: (y) => `Buon ${y}!` },
  en: { days: (n) => (n === 1 ? "1 day until New Year" : `${n} days until New Year`), happy: (y) => `Happy ${y}!` },
  fr: { days: (n) => (n === 1 ? "Plus qu'un jour avant le Nouvel An" : `Plus que ${n} jours avant le Nouvel An`), happy: (y) => `Bonne année ${y} !` },
  de: { days: (n) => (n === 1 ? "Noch 1 Tag bis Neujahr" : `Noch ${n} Tage bis Neujahr`), happy: (y) => `Frohes neues Jahr ${y}!` },
};

const ROME_DATE = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome", year: "numeric", month: "2-digit", day: "2-digit" });

/* Giorni di calendario (ora di Roma) da `now` al 1° gennaio. */
function daysToNewYear(now: number): number {
  const [y, m, d] = ROME_DATE.format(now).split("-").map(Number);
  return Math.round((Date.UTC(NEW_YEAR.year, 0, 1) - Date.UTC(y, m - 1, d)) / 86_400_000);
}

export function NewYearCountdown({ locale, className }: { locale: Locale; className: string }) {
  const now = useNow();
  if (now === null || now >= Date.parse(NEW_YEAR.hideFrom)) return null;
  const text = TEXT[locale];
  const label = now >= Date.parse(NEW_YEAR.midnight) ? text.happy(NEW_YEAR.year) : text.days(daysToNewYear(now));
  return (
    <p className={className}>
      <span aria-hidden="true">✦</span>
      {label}
    </p>
  );
}
