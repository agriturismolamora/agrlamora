/* Articolo "Capodanno ad Assisi" (blog-posts.ts, tema "newyear"): date del
   conto alla rovescia e fonti ufficiali. Da aggiornare OGNI ANNO insieme al
   testo dell'articolo (slug, date, programma, dateModified): vedi CLAUDE.md.

   Tutte le date sono istanti assoluti con il fuso di Roma (+01:00 in
   inverno): il conto alla rovescia li confronta con l'ora del browser dopo
   il mount (useNow), mai sul server. */
export const NEW_YEAR = {
  year: 2027,
  /* Mezzanotte del 1° gennaio, ora di Roma. */
  midnight: "2027-01-01T00:00:00+01:00",
  /* Dal 3 gennaio il conto alla rovescia ("Buon 2027!") sparisce. */
  hideFrom: "2027-01-03T00:00:00+01:00",
} as const;

/* Data dell'ultima verifica delle fonti (programmi degli anni scorsi,
   ordinanze, orari delle celebrazioni). Mostrata nel riquadro "programma
   ufficiale" dell'articolo e usata come dateModified nel JSON-LD. */
export const CAPODANNO_LAST_CHECKED = "2026-10-21";

/* Fonti ufficiali linkate nell'articolo. */
export const CAPODANNO_SOURCES = {
  /* Portale turistico ufficiale del Comune di Assisi: eventi e programma
     di Natale/Capodanno. */
  visitAssisiEvents: "https://www.visit-assisi.it/eventi/",
  comune: "https://www.comune.assisi.pg.it/",
  /* Basilica e Sacro Convento di San Francesco. */
  sacroConvento: "https://www.sanfrancescoassisi.org/",
  /* Frati Minori dell'Umbria: Porziuncola / Santa Maria degli Angeli. */
  porziuncola: "https://assisiofm.it/",
} as const;
