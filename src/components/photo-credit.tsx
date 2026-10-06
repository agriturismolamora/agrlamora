import type { Locale } from "@/lib/i18n";
import type { PhotoCredit } from "@/data/photo-credits";

const PHOTO: Record<Locale, string> = { it: "Foto", en: "Photo", fr: "Photo", de: "Foto" };
const CROPPED: Record<Locale, string> = { it: "ritagliata", en: "cropped", fr: "recadrée", de: "zugeschnitten" };

/* Riga di attribuzione per foto con licenza libera: autore, licenza (con
   link), "ritagliata" se il file è un ritaglio, piattaforma d'origine (con
   link alla pagina del file). `linked={false}` solo dentro un elemento che è
   già un link (card del blog): stesso testo, senza link annidati, che in
   HTML non sono validi — l'attribuzione completa con i link resta nella
   pagina dell'articolo. Nessuno stile di colore fisso: lo eredita dal
   contesto (className). */
export function PhotoCreditLine({
  credit,
  locale,
  prefix,
  linked = true,
  className = "",
  linkClassName = "underline decoration-current/40 underline-offset-2 hover:decoration-current",
}: {
  credit: PhotoCredit;
  locale: Locale;
  /* Didascalia prima del credito (es. edizione e anno dello scatto). */
  prefix?: string;
  linked?: boolean;
  className?: string;
  linkClassName?: string;
}) {
  const sep = " · ";
  return (
    <span className={className}>
      {prefix ? `${prefix} ` : ""}
      {PHOTO[locale]}: {credit.author}
      {sep}
      {linked ? (
        <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className={linkClassName}>
          {credit.license}
        </a>
      ) : (
        credit.license
      )}
      {credit.cropped ? `${sep}${CROPPED[locale]}` : ""}
      {sep}
      {linked ? (
        <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          {credit.source}
        </a>
      ) : (
        credit.source
      )}
    </span>
  );
}
