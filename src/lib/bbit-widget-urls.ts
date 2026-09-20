/* URL dei widget bed-and-breakfast.it, uno per tipo/struttura. Account
   separati per le due strutture (richiesta esplicita del titolare, mai
   mischiare i dati di La Mora con quelli di Villa Relax): 60754 = La Mora,
   61792 = Villa Relax. idregione 18 = Umbria, uguale per entrambe. */
const LA_MORA_ID = "60754";
const VILLA_ID = "61792";
const REGIONE_ID = "18";

export function bbitOfferteUrl(struttura: "lamora" | "villa"): string {
  const id = struttura === "villa" ? VILLA_ID : LA_MORA_ID;
  const n = struttura === "villa" ? 3 : 5;
  return `https://www.bed-and-breakfast.it/scripts/widget/widget_offerte.cfm?orientamento=largo&n=${n}&id=${id}&idregione=${REGIONE_ID}`;
}

export function bbitLastMinuteUrl(struttura: "lamora" | "villa"): string {
  const id = struttura === "villa" ? VILLA_ID : LA_MORA_ID;
  const n = struttura === "villa" ? 3 : 5;
  const nomebeb = struttura === "villa" ? "Villa Relax" : "Agriturismo La Mora";
  return `https://www.bed-and-breakfast.it/scripts/widget/widget_lastminute.cfm?orientamento=largo&n=${n}&id=${id}&idregione=${REGIONE_ID}&nomebeb=${encodeURIComponent(nomebeb)}`;
}

export function bbitProssimitaUrl(struttura: "lamora" | "villa"): string {
  const id = struttura === "villa" ? VILLA_ID : LA_MORA_ID;
  return `https://www.bed-and-breakfast.it/scripts/widget/widget_prossimita.cfm?id=${id}&idregione=${REGIONE_ID}`;
}

export function bbitRichiesteUrl(struttura: "lamora" | "villa", locale: string): string {
  const id = struttura === "villa" ? VILLA_ID : LA_MORA_ID;
  return `https://www.bed-and-breakfast.it/scripts/widget/widget_richieste.cfm?id=${id}&IDRegione=${REGIONE_ID}&locale=${locale}`;
}

export function bbitRecensioniBadgeId(struttura: "lamora" | "villa"): string {
  return struttura === "villa" ? `bbit${VILLA_ID}` : `bbit${LA_MORA_ID}`;
}
