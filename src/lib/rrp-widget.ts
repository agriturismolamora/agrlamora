"use client";

/* Il modale camere (rrp-widget-open-modal, vedi rooms-widget-script.tsx)
   punta sempre allo STESSO iframe, con l'URL fissato una volta sola quando
   lo script del fornitore lo costruisce via document.write al
   caricamento della pagina — la funzione globale rrpWidgetOpenModal() non
   accetta parametri (verificato leggendo il suo codice: si limita a
   impostare la visibilità del modale). Per portare davvero le date/ospiti
   scelti nella booking bar dentro il form di prenotazione reale,
   riscriviamo noi l'src dell'iframe PRIMA di aprire il modale.

   Verificato empiricamente (navigando direttamente alla pagina di
   prenotazione del fornitore con questi query string) che checkin/checkout
   in formato DD/MM/YYYY vengono letti e pre-selezionati nel calendario
   reale, e che riscrivere gli eventuali flag esistenti (?wl&widget) in
   forma esplicita (wl=&widget=) non cambia il comportamento della pagina. */
function formatDateParam(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

export function openRoomsWidget(params?: { checkIn?: Date | null; checkOut?: Date | null; guests?: number }) {
  const modal = document.getElementById("rrpWidgetModal");
  const iframe = modal?.querySelector<HTMLIFrameElement>(".rrp-widget-iframe-form-camere");

  if (iframe) {
    try {
      const url = new URL(iframe.src);
      if (params?.checkIn) url.searchParams.set("checkin", formatDateParam(params.checkIn));
      if (params?.checkOut) url.searchParams.set("checkout", formatDateParam(params.checkOut));
      if (params?.guests) {
        url.searchParams.set("NumberRooms", "1");
        url.searchParams.set("NumberPeople", String(params.guests));
      }
      const next = url.toString();
      if (next !== iframe.src) iframe.src = next;
    } catch {
      // src non ancora valido/pronto: apriamo comunque il modale con
      // quello di default, meglio di un pulsante che non fa nulla.
    }
  }

  const win = window as typeof window & { rrpWidgetOpenModal?: () => void };
  if (typeof win.rrpWidgetOpenModal === "function") {
    win.rrpWidgetOpenModal();
  } else if (modal) {
    modal.style.visibility = "visible";
  }
}
