/* Infrastruttura i18n: niente libreria esterna (next-intl, ecc.) — il sito
   usa routing nativo App Router con un route group (it) per l'italiano
   (URL invariati, nessun impatto SEO sulle pagine già indicizzate) e
   cartelle reali en/, fr/, de/ che rispecchiano la stessa struttura con
   contenuto tradotto. Ogni pagina di lingua non italiana è un file fisico
   a sé (stesso pattern già in uso nel progetto per i dati multi-variante,
   es. apartment-details.ts), non un [locale] dinamico: niente rewrite,
   niente negoziazione automatica della lingua del browser (esplicitamente
   rimandata in PROJECT-BRIEF.md, "da decidere in fase tecnica") — il
   selettore lingua nell'header è l'unico modo per cambiare lingua. */
export const LOCALES = ["it", "en", "fr", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "it";

export const LOCALE_LABEL: Record<Locale, string> = { it: "IT", en: "EN", fr: "FR", de: "DE" };

/* Prefisso di root per una data lingua: "" per l'italiano (URL invariati),
   "/en" ecc. per le altre. Usato per costruire sia gli href assoluti dei
   Link sia, quando serve, l'URL della pagina gemella in un'altra lingua. */
export function localeRoot(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/* Converte un path assoluto italiano (es. "/alloggi/gemelli/") nell'href
   corretto per la lingua data. `path` è sempre scritto in italiano nel
   codice chiamante (unica fonte per la struttura degli URL): la funzione
   si occupa solo di anteporre il prefisso di lingua. */
export function withLocale(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return `/${locale}${path}`;
}

/* Rimuove il prefisso di lingua da un pathname reale (da usePathname()),
   restituendo sia la lingua rilevata che il path italiano "nudo" — usato
   dal selettore lingua per passare da una lingua all'altra restando sulla
   STESSA pagina, non tornando sempre alla home. */
export function splitLocaleFromPath(pathname: string): { locale: Locale; path: string } {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    const prefix = `/${locale}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      const rest = pathname.slice(prefix.length) || "/";
      return { locale, path: rest };
    }
  }
  return { locale: DEFAULT_LOCALE, path: pathname };
}
