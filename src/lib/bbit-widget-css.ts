/* CSS di mascheramento condiviso dai widget bed-and-breakfast.it della
   famiglia "offerte/last minute/punti di interesse" (tutti e tre generano
   la stessa struttura .bbit_widgetRecensioni — verificato caricando
   davvero ciascuno script, non per supposizione). Sovrascrive il foglio di
   stile del fornitore (bordo verde, font Arial, logo come sfondo
   dell'intestazione, barra verde "www.bed-and-breakfast.it" in fondo) con
   la stessa lingua visiva del resto del sito — cream/ink/raspberry,
   Montserrat — e nasconde gli elementi che sarebbero SOLO il loro brand
   (intestazione col logo, footer). Iniettato dentro l'iframe srcDoc di
   BbitInlineWidget: essendo lì dentro un documento a sé (stesso dominio),
   può sovrascrivere liberamente anche senza !important nella maggior
   parte dei casi, ma lo usiamo comunque per vincere sicuramente lo stile
   inline che il loro CSS applica in alcuni punti. */
export const BBIT_OFFERS_FAMILY_CSS = `
  body { font-family: "Montserrat", Arial, Helvetica, sans-serif !important; }

  .bbit_widgetRecensioni {
    border: none !important;
    background-color: transparent !important;
    color: #241f17 !important;
    font-size: 13px !important;
    width: 100% !important;
    max-width: none !important;
  }

  /* Intestazione col logo bed-and-breakfast.it come sfondo: nascosta,
     è solo il loro brand, non aggiunge informazione. */
  .bbit_widgetRecensioni a.bbit_header,
  .bbit_widgetRecensioni a.bbit_header_offerte,
  .bbit_widgetRecensioni a.bbit_header_lastminute,
  .bbit_widgetRecensioni a.bbit_header_prossimita,
  .bbit_widgetRecensioni a.bbit_header_eventi,
  .bbit_widgetRecensioni a.bbit_header_fiere,
  .bbit_widgetRecensioni a.bbit_header_prezzi {
    display: none !important;
  }

  /* Barra verde "www.bed-and-breakfast.it" in fondo: stesso motivo. */
  .bbit_widgetRecensioni a.bbit_footer {
    display: none !important;
  }

  .bbit_widgetRecensioni .bbit_offerte_tit,
  .bbit_widgetRecensioni .bbit_nome {
    margin: 0 !important;
    padding: 0 0 10px 0 !important;
    border-top: none !important;
    text-align: left !important;
    font-family: "Cormorant Garamond", Georgia, serif !important;
    font-size: 19px !important;
    font-weight: 400 !important;
    color: #241f17 !important;
  }
  .bbit_widgetRecensioni .bbit_nome a { font-weight: 400 !important; }

  .bbit_widgetRecensioni .bbit_avviso {
    background: #efe6d4 !important;
    color: #5c5344 !important;
    margin: 0 !important;
    padding: 14px !important;
    border-radius: 4px !important;
    text-align: left !important;
  }

  .bbit_widgetRecensioni .bbit_eventi,
  .bbit_widgetRecensioni .bbit_recensioni {
    margin: 0 !important;
    padding: 10px 0 0 0 !important;
    border-top: 1px solid rgba(36,31,23,0.1) !important;
    line-height: 1.7 !important;
    color: #5c5344 !important;
  }

  .bbit_widgetRecensioni a,
  .bbit_widgetRecensioni .bbit_recensioni a {
    color: #9f414f !important;
    font-weight: 600 !important;
  }
  .bbit_widgetRecensioni a:hover { text-decoration: underline !important; }

  .bbit_widgetRecensioni .bbit_link {
    text-align: left !important;
    margin: 10px 0 0 0 !important;
  }
  .bbit_widgetRecensioni .bbit_link a {
    font-size: 10px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.06em !important;
    text-decoration: underline !important;
    text-decoration-color: rgba(159,65,79,0.4) !important;
    text-underline-offset: 4px !important;
  }

  ul.elencoCitta, ul.elencoCittaRidotto {
    margin: 0 !important;
  }
  ul.elencoCitta li, ul.elencoCittaRidotto li {
    border-bottom: 1px dotted rgba(36,31,23,0.15) !important;
    padding: 6px 0 !important;
    font-size: 13px !important;
    color: #241f17 !important;
  }
  ul.elencoCitta li span.opzioni, ul.elencoCittaRidotto li span.opzioni {
    background: transparent !important;
    color: #5c5344 !important;
    font-weight: 600 !important;
  }
`;
