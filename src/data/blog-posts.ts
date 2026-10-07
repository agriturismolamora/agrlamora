import type { Locale } from "@/lib/i18n";
import type { PromoId } from "@/data/promo";
import {
  EUROCHOCOLATE_2024_PHOTO,
  CIOCCOLATO_FONDENTE_PHOTO,
  SPOGLIAZIONE_FACCIATA_PHOTO,
  SPOGLIAZIONE_ROSONE_PHOTO,
  SPOGLIAZIONE_VEDUTA_PHOTO,
  GUBBIO_NATALE_PIAZZA_PHOTO,
  ALBERO_TRASIMENO_PHOTO,
  ROCCA_DEL_LEONE_PHOTO,
  TRASIMENO_VELE_PHOTO,
  RASIGLIA_BORGO_PHOTO,
  RASIGLIA_MULINO_PHOTO,
  RASIGLIA_TELAIO_PHOTO,
  RASIGLIA_CASCATELLA_PHOTO,
  type CreditedPhoto,
  type PhotoCredit,
} from "@/data/photo-credits";

/* Contenuto editoriale del blog: non semplici paragrafi ma un piccolo
   sistema di blocchi (ContentBlock), per poter alternare titoli, immagini,
   liste e box informativi come in un vero articolo — non un unico muro di
   testo. Le CTA di prenotazione sono tre e uguali in ogni articolo
   (src/components/blog-booking-cta.tsx, testi in src/data/blog-ctas.ts):
   A dopo l'intro e "In breve", B a metà (al posto dell'eventuale blocco
   `cta` di `content`), C in chiusura con il titolo finalCtaHeading.
   Le CTA che puntano a pagine interne usano un path semplice (es.
   "/alloggi/"): withLocale() lo risolve nella lingua giusta al momento del
   render, qui non va mai scritto già completo di prefisso lingua. */
export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  /* credit: obbligatorio per foto di terzi con licenza libera (src/data/
     photo-credits.ts), mostrato sotto l'immagine con link a licenza e file.
     portrait: foto verticale, mostrata in 4:5 invece del 3:2 di default. */
  | { type: "image"; src: string; alt: string; caption?: string; credit?: PhotoCredit; portrait?: boolean }
  | { type: "list"; items: string[] }
  | { type: "facts"; items: { label: string; value: string }[] }
  /* Vecchio CTA centrale: non viene più mostrato, la sua posizione è
     quella della CTA B ("Dormi a X km", blog-booking-cta.tsx). href
     "#prenota": pulsante che apre la modale di
     prenotazione bed-and-breakfast.it (stessa di "Prenota ora"). */
  | { type: "cta"; heading: string; body?: string; label: string; href: string }
  /* Link interni (Alloggi, Offerte, Territorio...): path italiano, la
     lingua la aggiunge withLocale() al render. */
  | { type: "links"; heading: string; items: { label: string; href: string }[] };

export const BOOKING_MODAL_HREF = "#prenota";

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  image: string;
  alt: string;
  /* Credito per una copertina di terzi (mai per le foto nostre) e
     didascalia onesta (edizione/anno reali dello scatto). */
  imageCredit?: PhotoCredit;
  imageCaption?: string;
  /* object-position CSS della copertina nei ritagli (hero, card): per
     tenere in vista il soggetto quando il formato taglia molto. */
  imagePosition?: string;
  /* Data reale di pubblicazione (YYYY-MM-DD), per il JSON-LD. Assente
     negli articoli più vecchi, di cui non si conosce una data affidabile. */
  datePublished?: string;
  schemaType?: "Article" | "BlogPosting";
  /* Blocco "In breve" iniziale: fatti estraibili (date, distanze, tempi). */
  inBreve?: { heading: string; items: { label: string; value: string }[] };
  intro: string;
  /* introCtaHeading: riga della CTA A solo se l'articolo non ha testi in
     src/data/blog-ctas.ts; label/href non sono più mostrati (la CTA A ha
     sempre "Prenota" e "Vedi gli appartamenti"). */
  introCtaHeading?: string;
  introCtaLabel?: string;
  introCtaHref?: string;
  content: ContentBlock[];
  /* FAQ visibili in fondo all'articolo, riprese nel JSON-LD FAQPage. */
  faq?: { heading: string; items: { q: string; a: string }[] };
  /* Box offerta di src/data/promo.ts, mostrato in alto e in fondo. */
  offerBox?: PromoId;
  /* Tema grafico dedicato: solo dove indicato esplicitamente. */
  theme?: "chocolate";
  /* Nota legale in fondo all'articolo (es. marchi di terzi). */
  disclaimer?: string;
  /* finalCtaHeading: titolo della CTA C (chiusura). Body, label e href
     restano per compatibilità ma non sono più mostrati: la CTA C ha i
     vantaggi della prenotazione diretta, Prenota, WhatsApp e /offerte/. */
  finalCtaHeading: string;
  finalCtaBody: string;
  finalCtaLabel: string;
  finalCtaHref: string;
};

/* Eurochocolate 2026 (offerta del titolare, vedi src/data/promo.ts).
   Fonti verificate il 06/10/2026:
   - eurochocolate.com/perugia2026/ (date, tema, luoghi, ingresso, orari,
     format annunciati) e /perugia2026/come-arrivare (parcheggi, treno);
   - comunicato stampa Città del Cioccolato del 31/10/2025
     (drive.cittadelcioccolato.it/comunicati-stampa/2025/CdC_20251031.pdf):
     inaugurazione 30/10/2025, apertura ai turisti 1/11/2025; sito ufficiale
     cittadelcioccolato.it per orari, superficie e storia dell'ex Mercato
     Coperto (1931–1932);
   - nestle.it, comunicato "Baci Perugina compie 100 anni" (1922, Luisa
     Spagnoli, "Cazzotto", Giovanni Buitoni, Federico Seneca); perugina.com
     per la fondazione nel 1907;
   - distanze da src/data/places.ts (Google Maps).
   "Chocolate Experience" e "Fabbrica del Cioccolato" NON compaiono sulla
   pagina ufficiale 2026: omessi. Ospiti citati per nome omessi di proposito
   (il programma può cambiare). */
/* Immagini (ottobre 2026): copertina e og:image = foto reale di
   Eurochocolate 2024 da Wikimedia Commons (vedi src/data/photo-credits.ts);
   nel testo, alternate a foto nostre ("il festival di giorno, la sera in
   campagna"). Foto CC di Eurochocolate valide trovate: una sola (vedi
   photo-credits.ts per i criteri).
   07/10/2026 (soglia: copertine >= 2400 px, interne >= 1600 px): copertina
   riesportata a 2400 px; foto Flickr del cioccolato sostituita con una foto
   Commons illustrativa; il camino (1200×900) sostituito dall'esterno HD (qui)
   e dal soggiorno di Gemelli (articolo sui mercatini). Il parco giochi resta
   a 800×531: non esiste una foto nostra HD, va scattata. */
const LAMORA_ESTERNO = "/images/home/esterno agriturismo la mora carretto e agriturismo.webp";
const LAMORA_SALOTTO_GEMELLI = "/images/alloggi/appartamento gemelli/salotto gemelli.jpeg";
const EUROCHOCOLATE_PARCO = "/images/piscina/esterno parco agriturismo con scivolo per bambini.jpg";
const EUROCHOCOLATE_APARTMENT = "/images/alloggi/appartamento bilancia/foto orizzontale letto e sala intera orizzontale bilancia.jpeg";
const EUROCHOCOLATE_OFFICIAL_URL = "https://www.eurochocolate.com/perugia2026/";

const EUROCHOCOLATE_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "eurochocolate-2026-dove-dormire",
    category: "Eventi",
    title: "Eurochocolate 2026: dove dormire vicino a Perugia",
    excerpt: "Date, programma e consigli pratici per Eurochocolate 2026 (Perugia, 13–22 novembre) e un -10% per chi soggiorna ad Agriturismo La Mora, a 21 km dal centro.",
    metaDescription: "Eurochocolate 2026 a Perugia dal 13 al 22 novembre: date, orari, cosa vedere e dove dormire. Agriturismo La Mora è a 21 km dal centro, con il 10% di sconto.",
    image: EUROCHOCOLATE_2024_PHOTO.src,
    alt: EUROCHOCOLATE_2024_PHOTO.alt.it,
    imageCaption: EUROCHOCOLATE_2024_PHOTO.caption.it,
    imageCredit: EUROCHOCOLATE_2024_PHOTO.credit,
    imagePosition: "28% 72%",
    datePublished: "2026-10-06",
    schemaType: "BlogPosting",
    theme: "chocolate",
    offerBox: "eurochocolate-2026",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Date", value: "13–22 novembre 2026" },
        { label: "Dove", value: "Centro storico di Perugia" },
        { label: "Tema", value: "«Fate Dolci», 32ª edizione" },
        { label: "Ingresso", value: "Libero" },
        { label: "Da La Mora", value: "21,0 km · circa 23 min in auto" },
        { label: "Offerta La Mora", value: "-10% durante l'evento" },
      ],
    },
    intro:
      "Dal 13 al 22 novembre 2026 il centro storico di Perugia ospita la 32ª edizione di Eurochocolate, il festival internazionale del cioccolato, quest'anno con il tema «Fate Dolci». Agriturismo La Mora è a 21,0 km dal centro di Perugia, circa 23 minuti in auto: una base in campagna, tra Perugia e Assisi, per vivere il festival di giorno e la sera rientrare in un appartamento tutto vostro.",
    content: [
      { type: "h2", text: "Quando e dove si svolge Eurochocolate 2026?" },
      {
        type: "p",
        text: "Eurochocolate 2026 si tiene da venerdì 13 a domenica 22 novembre: dieci giornate nel centro storico di Perugia, tra Giardini Carducci, Piazza Italia, Corso Vannucci, Piazza della Repubblica, Via Mazzini, Via Fani e Piazza Matteotti. L'ingresso è libero, perché il festival si svolge lungo le vie e le piazze della città, e si tiene anche in caso di maltempo.",
      },
      {
        type: "facts",
        items: [
          { label: "Lunedì–venerdì", value: "10:00–19:30" },
          { label: "Sabato", value: "9:30–22:00" },
          { label: "Domenica", value: "9:00–20:00" },
        ],
      },
      {
        type: "p",
        text: "Sono gli orari degli stand pubblicati dagli organizzatori: prima di partire conviene ricontrollarli sulla pagina ufficiale del festival, insieme al programma aggiornato.",
      },
      { type: "h2", text: "Cosa vedere a Eurochocolate 2026?" },
      {
        type: "p",
        text: "«Fate Dolci» invita a vivere il cioccolato in modo attivo: non solo assaggiarlo, ma sperimentarlo e condividerlo. Questi i format annunciati dagli organizzatori per l'edizione 2026:",
      },
      {
        type: "list",
        items: [
          "Chocolate Show — la grande mostra-mercato del cioccolato all'aperto, con la novità dello spazio Eurochocolate Free From: prodotti senza zucchero, senza lattosio, senza glutine e vegan.",
          "Eurochocolate World — l'area dei produttori bean to bar e tree to bar, con marchi da oltre 20 terre del cacao tra America Latina, Africa e Asia.",
          "Spazio Fate Dolci — in piazza Matteotti, con i prodotti a tema dell'edizione e dolci a base di cacao.",
          "ChocoLab — degustazioni e approfondimenti quotidiani al LAB – Luisa Annibale Base, in via Angusta.",
          "Show cooking — dimostrazioni dal vivo con un maestro pasticcere.",
          "Fate Lab — laboratorio didattico per bambini e famiglie all'ex Borsa Merci di via Mazzini.",
          "Spettacoli itineranti — Choco Buskers, Chocoparade e Chocolieri per le vie del centro.",
          "Regione Ospite — la Calabria è la prima protagonista del nuovo progetto «Regione Ospite».",
        ],
      },
      {
        type: "p",
        text: "Il programma può cambiare durante l'edizione: per i singoli appuntamenti, gli orari dei laboratori e le novità dell'ultima ora fa fede la pagina ufficiale di Eurochocolate.",
      },
      { type: "h2", text: "Cos'è la Città del Cioccolato e quando ha aperto?" },
      {
        type: "p",
        text: "La Città del Cioccolato è un museo esperienziale dedicato al cacao e al cioccolato: oltre 2.800 m² dentro l'ex Mercato Coperto di Perugia, l'edificio costruito tra il 1931 e il 1932. È stata inaugurata il 30 ottobre 2025 e ha aperto ai visitatori il 1° novembre 2025.",
      },
      {
        type: "p",
        text: "Secondo il sito ufficiale è aperta tutti i giorni dalle 10:00 alle 19:00, con biglietto d'ingresso. Per Eurochocolate 2026 gli organizzatori annunciano sconti sul biglietto del museo per chi acquista al Chocolate Show: tariffe e condizioni aggiornate sono su cittadelcioccolato.it.",
      },
      {
        type: "image",
        src: CIOCCOLATO_FONDENTE_PHOTO.src,
        alt: CIOCCOLATO_FONDENTE_PHOTO.alt.it,
        caption: CIOCCOLATO_FONDENTE_PHOTO.caption.it,
        credit: CIOCCOLATO_FONDENTE_PHOTO.credit,
      },
      { type: "h2", text: "Perché Perugia è la città del cioccolato?" },
      {
        type: "p",
        text: "Il legame nasce con la Perugina, fondata a Perugia nel 1907. Nel 1922 Luisa Spagnoli creò un cioccolatino con granella di nocciole che, per la forma simile alle nocche di un pugno, si chiamava «Cazzotto»: fu Giovanni Buitoni a ribattezzarlo Bacio. L'idea di avvolgere ogni Bacio in un messaggio d'amore venne invece a Federico Seneca, direttore artistico della Perugina.",
      },
      {
        type: "p",
        text: "Durante il festival i ChocoLab si tengono proprio nel locale storico di via Angusta, usato da Luisa e Annibale Spagnoli nei primi anni di attività della Perugina.",
      },
      {
        type: "p",
        text: "C'è anche un filo che porta ad Assisi: tra le novità annunciate per il 2026 c'è la tavoletta CioccolaTau, dedicata all'ottavo centenario della morte di San Francesco e realizzata con nocciole Tonda Francescana coltivate in Umbria.",
      },
      { type: "h2", text: "Come arrivare a Eurochocolate da Agriturismo La Mora?" },
      {
        type: "p",
        text: "In auto, Agriturismo La Mora dista 21,0 km dal centro storico di Perugia: circa 23 minuti secondo Google Maps, traffico permettendo. Nei giorni del festival conviene lasciare l'auto in uno dei parcheggi indicati dagli organizzatori, collegati al centro da minimetrò, scale mobili o ascensori:",
      },
      {
        type: "list",
        items: [
          "Parcheggio gratuito Porta Nova (Piazzale Umbria Jazz), con il minimetrò fino alla stazione Pincetto, in centro. Per chi arriva in auto, gli organizzatori indicano l'uscita Perugia – Madonna Alta e poi le indicazioni per lo stadio e il minimetrò.",
          "Parcheggi custoditi a pagamento: Mercato Coperto (con ascensore), Piazzale Europa, Piazza Partigiani e Pellini (con scale mobili).",
        ],
      },
      {
        type: "p",
        text: "In treno, la stazione di Perugia in piazza Vittorio Veneto è a circa 3 km dal centro, collegata dal minimetrò e dagli autobus urbani. Per orari e biglietti dei treni fa fede Trenitalia.",
      },
      { type: "h2", text: "Dove dormire per Eurochocolate 2026?" },
      {
        type: "p",
        text: "Nei giorni del festival Perugia è molto richiesta. Agriturismo La Mora, in via Fonte Citerna 7 ad Assisi, ha cinque appartamenti indipendenti, ognuno con cucina attrezzata, Wi-Fi e aria condizionata, e il parcheggio gratuito all'interno della struttura: si parte la mattina per Perugia e la sera si torna in campagna, lontano dalla folla.",
      },
      {
        type: "image",
        src: LAMORA_ESTERNO,
        alt: "Esterno di Agriturismo La Mora: un vecchio carretto agricolo tra i fiori, davanti alla casa e a un grande olivo",
        caption: "Agriturismo La Mora, nella campagna di Assisi.",
      },
      {
        type: "image",
        src: EUROCHOCOLATE_APARTMENT,
        alt: "Letto matrimoniale e soggiorno dell'appartamento Bilancia di Agriturismo La Mora",
        caption: "L'appartamento Bilancia, il più grande dei cinque.",
      },
      {
        type: "p",
        text: "Dalla stessa base, la Basilica di San Francesco ad Assisi è a 7,5 km, circa 18 minuti in auto: un weekend a Eurochocolate si abbina facilmente a una giornata ad Assisi. Gemelli e Sagittario, con giardino privato recintato, accolgono anche chi viaggia con animali.",
      },
      { type: "p", text: "Per chi arriva con i bambini, magari reduci dal Fate Lab, nel giardino c'è un parco giochi con scivolo e giostrina." },
      {
        type: "image",
        src: EUROCHOCOLATE_PARCO,
        alt: "Parco giochi con scivolo giallo e giostrina nel giardino di Agriturismo La Mora",
        caption: "Il parco giochi nel giardino di La Mora.",
      },
      {
        type: "links",
        heading: "Organizza il soggiorno",
        items: [
          { label: "Gli appartamenti di La Mora", href: "/alloggi/" },
          { label: "Le offerte per chi prenota diretto", href: "/offerte/" },
          { label: "Il territorio intorno a La Mora", href: "/territorio/" },
          { label: "Ottavo Centenario di San Francesco", href: "/ottavo-centenario-san-francesco/" },
          { label: "Programma ufficiale di Eurochocolate 2026", href: EUROCHOCOLATE_OFFICIAL_URL },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti su Eurochocolate 2026",
      items: [
        { q: "Quando si svolge Eurochocolate 2026?", a: "Da venerdì 13 a domenica 22 novembre 2026, nel centro storico di Perugia. È la 32ª edizione e il tema è «Fate Dolci»." },
        { q: "Si paga l'ingresso a Eurochocolate?", a: "No: il festival si svolge lungo le vie e le piazze del centro storico e non è previsto un biglietto d'ingresso. Si pagano gli acquisti agli stand; la Città del Cioccolato, museo permanente, ha un biglietto a parte." },
        { q: "Quali sono gli orari di Eurochocolate 2026?", a: "Secondo gli organizzatori, gli stand sono aperti dal lunedì al venerdì dalle 10:00 alle 19:30, il sabato dalle 9:30 alle 22:00 e la domenica dalle 9:00 alle 20:00." },
        { q: "Quanto dista Agriturismo La Mora da Eurochocolate?", a: "Il centro storico di Perugia è a 21,0 km da Agriturismo La Mora, circa 23 minuti in auto secondo Google Maps." },
        { q: "Dove parcheggiare per Eurochocolate?", a: "Gli organizzatori indicano il parcheggio gratuito Porta Nova (Piazzale Umbria Jazz), collegato al centro dal minimetrò fino alla stazione Pincetto, e alcuni parcheggi a pagamento collegati da scale mobili o ascensori, come Mercato Coperto, Piazzale Europa e Piazza Partigiani." },
        { q: "Come funziona lo sconto del 10% di La Mora?", a: "Vale per tutta la durata dell'evento, dal 13 al 22 novembre 2026. Condizioni: mettere «Mi piace» alla pagina Facebook di Agriturismo La Mora e salvare il post dell'offerta oppure mostrare il biglietto di Eurochocolate al momento del pagamento. Disponibilità limitata nei giorni dell'evento." },
        { q: "Quando ha aperto la Città del Cioccolato?", a: "È stata inaugurata il 30 ottobre 2025 e ha aperto ai visitatori il 1° novembre 2025, negli spazi dell'ex Mercato Coperto di Perugia." },
      ],
    },
    disclaimer: "Eurochocolate è un marchio dei rispettivi titolari; Agriturismo La Mora non è affiliata all'evento.",
    finalCtaHeading: "Dieci giorni di cioccolato, una base tranquilla in campagna.",
    finalCtaBody: "Guarda gli appartamenti e scegli quello giusto per il tuo weekend a Eurochocolate.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "eurochocolate-2026-dove-dormire",
    category: "Events",
    title: "Eurochocolate 2026: where to stay near Perugia",
    excerpt: "Dates, programme and practical tips for Eurochocolate 2026 (Perugia, 13–22 November), plus 10% off at Agriturismo La Mora, 21 km from the centre.",
    metaDescription: "Eurochocolate 2026 in Perugia, 13–22 November: dates, opening hours, what to see and where to stay. Agriturismo La Mora is 21 km from the centre, with 10% off.",
    image: EUROCHOCOLATE_2024_PHOTO.src,
    alt: EUROCHOCOLATE_2024_PHOTO.alt.en,
    imageCaption: EUROCHOCOLATE_2024_PHOTO.caption.en,
    imageCredit: EUROCHOCOLATE_2024_PHOTO.credit,
    imagePosition: "28% 72%",
    datePublished: "2026-10-06",
    schemaType: "BlogPosting",
    theme: "chocolate",
    offerBox: "eurochocolate-2026",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Dates", value: "13–22 November 2026" },
        { label: "Where", value: "Perugia's historic centre" },
        { label: "Theme", value: "“Fate Dolci”, 32nd edition" },
        { label: "Entry", value: "Free" },
        { label: "From La Mora", value: "21.0 km · about 23 min by car" },
        { label: "La Mora offer", value: "10% off during the event" },
      ],
    },
    intro:
      "From 13 to 22 November 2026, Perugia's historic centre hosts the 32nd Eurochocolate, the international chocolate festival, this year themed “Fate Dolci” — a play on words meaning both “sweet fairies” and “make sweets”. Agriturismo La Mora is 21.0 km from central Perugia, about 23 minutes by car: a countryside base between Perugia and Assisi, so you can enjoy the festival by day and come back to an apartment of your own in the evening.",
    content: [
      { type: "h2", text: "When and where is Eurochocolate 2026?" },
      {
        type: "p",
        text: "Eurochocolate 2026 runs from Friday 13 to Sunday 22 November: ten days across Perugia's historic centre, between Giardini Carducci, Piazza Italia, Corso Vannucci, Piazza della Repubblica, Via Mazzini, Via Fani and Piazza Matteotti. Entry is free, since the festival takes place in the city's streets and squares, and it goes ahead whatever the weather.",
      },
      {
        type: "facts",
        items: [
          { label: "Monday–Friday", value: "10:00–19:30" },
          { label: "Saturday", value: "9:30–22:00" },
          { label: "Sunday", value: "9:00–20:00" },
        ],
      },
      {
        type: "p",
        text: "These are the stall opening hours published by the organisers: double-check them on the festival's official page before you set off, together with the latest programme.",
      },
      { type: "h2", text: "What can you see at Eurochocolate 2026?" },
      {
        type: "p",
        text: "“Fate Dolci” is an invitation to experience chocolate hands-on: not just tasting it, but making it and sharing it. These are the formats the organisers have announced for 2026:",
      },
      {
        type: "list",
        items: [
          "Chocolate Show — the big open-air chocolate market, with the new Eurochocolate Free From area: sugar-free, lactose-free, gluten-free and vegan products.",
          "Eurochocolate World — the area for bean-to-bar and tree-to-bar makers, with brands from more than 20 cocoa-growing countries across Latin America, Africa and Asia.",
          "Spazio Fate Dolci — in Piazza Matteotti, with the edition's themed products and cocoa-based desserts.",
          "ChocoLab — daily tastings and talks at the LAB – Luisa Annibale Base, in Via Angusta.",
          "Show cooking — live demonstrations by a master pastry chef.",
          "Fate Lab — a hands-on workshop for children and families at the former Borsa Merci in Via Mazzini.",
          "Street shows — Choco Buskers, Chocoparade and Chocolieri around the old town.",
          "Guest Region — Calabria is the first region featured in the new “Regione Ospite” project.",
        ],
      },
      {
        type: "p",
        text: "The programme may change during the festival: for individual events, workshop times and last-minute news, the official Eurochocolate page is the reference.",
      },
      { type: "h2", text: "What is the Città del Cioccolato and when did it open?" },
      {
        type: "p",
        text: "The Città del Cioccolato (“Chocolate City”) is an experiential museum devoted to cocoa and chocolate: more than 2,800 m² inside Perugia's former covered market, the Mercato Coperto, built between 1931 and 1932. It was inaugurated on 30 October 2025 and opened to visitors on 1 November 2025.",
      },
      {
        type: "p",
        text: "According to its official website it is open every day from 10:00 to 19:00, with paid admission. For Eurochocolate 2026 the organisers announce discounts on museum tickets for anyone buying at the Chocolate Show: current prices and conditions are on cittadelcioccolato.it.",
      },
      {
        type: "image",
        src: CIOCCOLATO_FONDENTE_PHOTO.src,
        alt: CIOCCOLATO_FONDENTE_PHOTO.alt.en,
        caption: CIOCCOLATO_FONDENTE_PHOTO.caption.en,
        credit: CIOCCOLATO_FONDENTE_PHOTO.credit,
      },
      { type: "h2", text: "Why is Perugia Italy's chocolate city?" },
      {
        type: "p",
        text: "It all started with Perugina, founded in Perugia in 1907. In 1922 Luisa Spagnoli created a chocolate with chopped hazelnuts that, because its shape resembled the knuckles of a fist, was called “Cazzotto” (“punch”): it was Giovanni Buitoni who renamed it Bacio (“kiss”). The idea of wrapping every Bacio in a love note came from Federico Seneca, Perugina's art director.",
      },
      {
        type: "p",
        text: "During the festival the ChocoLab sessions take place in the historic premises in Via Angusta, used by Luisa and Annibale Spagnoli in Perugina's early years.",
      },
      {
        type: "p",
        text: "There is a link with Assisi too: among the new products announced for 2026 is the CioccolaTau bar, dedicated to the eighth centenary of the death of Saint Francis and made with Tonda Francescana hazelnuts grown in Umbria.",
      },
      { type: "h2", text: "How do you get to Eurochocolate from Agriturismo La Mora?" },
      {
        type: "p",
        text: "By car, Agriturismo La Mora is 21.0 km from Perugia's historic centre: about 23 minutes according to Google Maps, traffic permitting. During the festival it's best to leave the car in one of the car parks recommended by the organisers, linked to the centre by the Minimetrò, escalators or lifts:",
      },
      {
        type: "list",
        items: [
          "Free Porta Nova car park (Piazzale Umbria Jazz), then the Minimetrò to Pincetto station in the centre. For drivers, the organisers point to the Perugia – Madonna Alta exit, then the signs for the stadium and the Minimetrò.",
          "Paid, attended car parks: Mercato Coperto (with lift), Piazzale Europa, Piazza Partigiani and Pellini (with escalators).",
        ],
      },
      {
        type: "p",
        text: "By train, Perugia station in Piazza Vittorio Veneto is about 3 km from the centre, connected by the Minimetrò and city buses. Check Trenitalia for train times and tickets.",
      },
      { type: "h2", text: "Where to stay for Eurochocolate 2026?" },
      {
        type: "p",
        text: "Perugia is in high demand during the festival. Agriturismo La Mora, at Via Fonte Citerna 7 in Assisi, has five independent apartments, each with a fully equipped kitchen, Wi-Fi and air conditioning, plus free parking on site: head into Perugia in the morning and come back to the countryside in the evening, away from the crowds.",
      },
      {
        type: "image",
        src: LAMORA_ESTERNO,
        alt: "Outside Agriturismo La Mora: an old farm cart among the flowers, in front of the house and a large olive tree",
        caption: "Agriturismo La Mora, in the countryside outside Assisi.",
      },
      {
        type: "image",
        src: EUROCHOCOLATE_APARTMENT,
        alt: "Double bed and living area of the Bilancia apartment at Agriturismo La Mora",
        caption: "The Bilancia apartment, the largest of the five.",
      },
      {
        type: "p",
        text: "From the same base, the Basilica of San Francesco in Assisi is 7.5 km away, about 18 minutes by car: a Eurochocolate weekend pairs easily with a day in Assisi. Gemelli and Sagittario, with a private fenced garden, also welcome guests travelling with pets.",
      },
      { type: "p", text: "If you're travelling with children, perhaps fresh from the Fate Lab, there's a playground with a slide and a small roundabout in the garden." },
      {
        type: "image",
        src: EUROCHOCOLATE_PARCO,
        alt: "Playground with a yellow slide and a small roundabout in the garden of Agriturismo La Mora",
        caption: "The playground in La Mora's garden.",
      },
      {
        type: "links",
        heading: "Plan your stay",
        items: [
          { label: "La Mora's apartments", href: "/alloggi/" },
          { label: "Offers for direct bookings", href: "/offerte/" },
          { label: "The area around La Mora", href: "/territorio/" },
          { label: "Eighth Centenary of Saint Francis", href: "/ottavo-centenario-san-francesco/" },
          { label: "Official Eurochocolate 2026 programme", href: EUROCHOCOLATE_OFFICIAL_URL },
        ],
      },
    ],
    faq: {
      heading: "Eurochocolate 2026: frequently asked questions",
      items: [
        { q: "When is Eurochocolate 2026?", a: "From Friday 13 to Sunday 22 November 2026, in Perugia's historic centre. It is the 32nd edition and the theme is “Fate Dolci”." },
        { q: "Do you have to pay to enter Eurochocolate?", a: "No: the festival takes place in the streets and squares of the historic centre and there is no entry ticket. You pay for what you buy at the stalls; the Città del Cioccolato, a permanent museum, has its own ticket." },
        { q: "What are the opening hours of Eurochocolate 2026?", a: "According to the organisers, stalls are open Monday to Friday from 10:00 to 19:30, Saturday from 9:30 to 22:00 and Sunday from 9:00 to 20:00." },
        { q: "How far is Agriturismo La Mora from Eurochocolate?", a: "Perugia's historic centre is 21.0 km from Agriturismo La Mora, about 23 minutes by car according to Google Maps." },
        { q: "Where can you park for Eurochocolate?", a: "The organisers recommend the free Porta Nova car park (Piazzale Umbria Jazz), linked to the centre by the Minimetrò to Pincetto station, as well as several paid car parks connected by escalators or lifts, such as Mercato Coperto, Piazzale Europa and Piazza Partigiani." },
        { q: "How does La Mora's 10% discount work?", a: "It applies for the whole event, from 13 to 22 November 2026. Conditions: like the Agriturismo La Mora Facebook page, and save the offer post or show your Eurochocolate ticket when you pay. Limited availability on the days of the event." },
        { q: "When did the Città del Cioccolato open?", a: "It was inaugurated on 30 October 2025 and opened to visitors on 1 November 2025, in the former Mercato Coperto in Perugia." },
      ],
    },
    disclaimer: "Eurochocolate is a trademark of its respective owners; Agriturismo La Mora is not affiliated with the event.",
    finalCtaHeading: "Ten days of chocolate, a quiet base in the countryside.",
    finalCtaBody: "Browse the apartments and pick the right one for your Eurochocolate weekend.",
    finalCtaLabel: "Discover the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "eurochocolate-2026-dove-dormire",
    category: "Événements",
    title: "Eurochocolate 2026 : où dormir près de Pérouse",
    excerpt: "Dates, programme et conseils pratiques pour Eurochocolate 2026 (Pérouse, 13–22 novembre), et -10 % pour un séjour à l'Agriturismo La Mora, à 21 km du centre.",
    metaDescription: "Eurochocolate 2026 à Pérouse du 13 au 22 novembre : dates, horaires, que voir et où dormir. L'Agriturismo La Mora est à 21 km du centre, avec 10 % de remise.",
    image: EUROCHOCOLATE_2024_PHOTO.src,
    alt: EUROCHOCOLATE_2024_PHOTO.alt.fr,
    imageCaption: EUROCHOCOLATE_2024_PHOTO.caption.fr,
    imageCredit: EUROCHOCOLATE_2024_PHOTO.credit,
    imagePosition: "28% 72%",
    datePublished: "2026-10-06",
    schemaType: "BlogPosting",
    theme: "chocolate",
    offerBox: "eurochocolate-2026",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "Dates", value: "13–22 novembre 2026" },
        { label: "Où", value: "Centre historique de Pérouse" },
        { label: "Thème", value: "« Fate Dolci », 32e édition" },
        { label: "Entrée", value: "Libre" },
        { label: "Depuis La Mora", value: "21,0 km · env. 23 min en voiture" },
        { label: "Offre La Mora", value: "-10 % pendant l'événement" },
      ],
    },
    intro:
      "Du 13 au 22 novembre 2026, le centre historique de Pérouse accueille la 32e édition d'Eurochocolate, le festival international du chocolat, cette année sur le thème « Fate Dolci » — un jeu de mots entre « fées douces » et « faites des douceurs ». L'Agriturismo La Mora est à 21,0 km du centre de Pérouse, environ 23 minutes en voiture : une base à la campagne, entre Pérouse et Assise, pour profiter du festival en journée et retrouver le soir un appartement rien qu'à vous.",
    content: [
      { type: "h2", text: "Quand et où a lieu Eurochocolate 2026 ?" },
      {
        type: "p",
        text: "Eurochocolate 2026 se déroule du vendredi 13 au dimanche 22 novembre : dix jours dans le centre historique de Pérouse, entre les Giardini Carducci, la Piazza Italia, le Corso Vannucci, la Piazza della Repubblica, la Via Mazzini, la Via Fani et la Piazza Matteotti. L'entrée est libre, car le festival se tient dans les rues et sur les places de la ville, et il a lieu même par mauvais temps.",
      },
      {
        type: "facts",
        items: [
          { label: "Lundi–vendredi", value: "10h00–19h30" },
          { label: "Samedi", value: "9h30–22h00" },
          { label: "Dimanche", value: "9h00–20h00" },
        ],
      },
      {
        type: "p",
        text: "Ce sont les horaires des stands publiés par les organisateurs : vérifiez-les avant de partir sur la page officielle du festival, avec le programme à jour.",
      },
      { type: "h2", text: "Que voir à Eurochocolate 2026 ?" },
      {
        type: "p",
        text: "« Fate Dolci » invite à vivre le chocolat de façon active : pas seulement le goûter, mais l'expérimenter et le partager. Voici les formats annoncés par les organisateurs pour 2026 :",
      },
      {
        type: "list",
        items: [
          "Chocolate Show — le grand marché du chocolat en plein air, avec le nouvel espace Eurochocolate Free From : produits sans sucre, sans lactose, sans gluten et vegan.",
          "Eurochocolate World — l'espace des chocolatiers bean to bar et tree to bar, avec des marques de plus de 20 pays producteurs de cacao d'Amérique latine, d'Afrique et d'Asie.",
          "Spazio Fate Dolci — sur la Piazza Matteotti, avec les produits à thème de l'édition et des desserts au cacao.",
          "ChocoLab — dégustations et rencontres quotidiennes au LAB – Luisa Annibale Base, Via Angusta.",
          "Show cooking — démonstrations en direct par un maître pâtissier.",
          "Fate Lab — atelier pédagogique pour enfants et familles dans l'ancienne Borsa Merci, Via Mazzini.",
          "Spectacles de rue — Choco Buskers, Chocoparade et Chocolieri dans les rues du centre.",
          "Région invitée — la Calabre est la première région à l'honneur du nouveau projet « Regione Ospite ».",
        ],
      },
      {
        type: "p",
        text: "Le programme peut évoluer pendant le festival : pour chaque rendez-vous, les horaires des ateliers et les nouveautés de dernière minute, la page officielle d'Eurochocolate fait foi.",
      },
      { type: "h2", text: "Qu'est-ce que la Città del Cioccolato et quand a-t-elle ouvert ?" },
      {
        type: "p",
        text: "La Città del Cioccolato (« Cité du Chocolat ») est un musée expérientiel consacré au cacao et au chocolat : plus de 2 800 m² dans l'ancien marché couvert de Pérouse, le Mercato Coperto, construit entre 1931 et 1932. Elle a été inaugurée le 30 octobre 2025 et a ouvert au public le 1er novembre 2025.",
      },
      {
        type: "p",
        text: "D'après son site officiel, elle est ouverte tous les jours de 10h00 à 19h00, avec entrée payante. Pour Eurochocolate 2026, les organisateurs annoncent des réductions sur le billet du musée pour les achats effectués au Chocolate Show : tarifs et conditions à jour sur cittadelcioccolato.it.",
      },
      {
        type: "image",
        src: CIOCCOLATO_FONDENTE_PHOTO.src,
        alt: CIOCCOLATO_FONDENTE_PHOTO.alt.fr,
        caption: CIOCCOLATO_FONDENTE_PHOTO.caption.fr,
        credit: CIOCCOLATO_FONDENTE_PHOTO.credit,
      },
      { type: "h2", text: "Pourquoi Pérouse est-elle la ville du chocolat ?" },
      {
        type: "p",
        text: "Tout commence avec la Perugina, fondée à Pérouse en 1907. En 1922, Luisa Spagnoli crée un chocolat aux éclats de noisette qui, parce que sa forme rappelait les jointures d'un poing, s'appelait « Cazzotto » (« coup de poing ») : c'est Giovanni Buitoni qui le rebaptise Bacio (« baiser »). L'idée d'envelopper chaque Bacio d'un message d'amour revient à Federico Seneca, directeur artistique de la Perugina.",
      },
      {
        type: "p",
        text: "Pendant le festival, les ChocoLab ont lieu justement dans le local historique de la Via Angusta, utilisé par Luisa et Annibale Spagnoli dans les premières années de la Perugina.",
      },
      {
        type: "p",
        text: "Un fil mène aussi à Assise : parmi les nouveautés annoncées pour 2026 figure la tablette CioccolaTau, dédiée au huitième centenaire de la mort de saint François et réalisée avec des noisettes Tonda Francescana cultivées en Ombrie.",
      },
      { type: "h2", text: "Comment aller à Eurochocolate depuis l'Agriturismo La Mora ?" },
      {
        type: "p",
        text: "En voiture, l'Agriturismo La Mora est à 21,0 km du centre historique de Pérouse : environ 23 minutes selon Google Maps, selon la circulation. Pendant le festival, mieux vaut laisser la voiture dans l'un des parkings indiqués par les organisateurs, reliés au centre par le Minimetrò, des escalators ou des ascenseurs :",
      },
      {
        type: "list",
        items: [
          "Parking gratuit Porta Nova (Piazzale Umbria Jazz), puis le Minimetrò jusqu'à la station Pincetto, en centre-ville. Pour les automobilistes, les organisateurs indiquent la sortie Perugia – Madonna Alta, puis les panneaux du stade et du Minimetrò.",
          "Parkings gardés payants : Mercato Coperto (avec ascenseur), Piazzale Europa, Piazza Partigiani et Pellini (avec escalators).",
        ],
      },
      {
        type: "p",
        text: "En train, la gare de Pérouse, Piazza Vittorio Veneto, est à environ 3 km du centre, reliée par le Minimetrò et les bus urbains. Pour les horaires et les billets, consultez Trenitalia.",
      },
      { type: "h2", text: "Où dormir pour Eurochocolate 2026 ?" },
      {
        type: "p",
        text: "Pendant le festival, Pérouse est très demandée. L'Agriturismo La Mora, Via Fonte Citerna 7 à Assise, propose cinq appartements indépendants, chacun avec cuisine équipée, Wi-Fi et climatisation, et un parking gratuit dans la propriété : on part le matin pour Pérouse et on rentre le soir à la campagne, loin de la foule.",
      },
      {
        type: "image",
        src: LAMORA_ESTERNO,
        alt: "L'extérieur de l'Agriturismo La Mora : une ancienne charrette agricole parmi les fleurs, devant la maison et un grand olivier",
        caption: "L'Agriturismo La Mora, dans la campagne d'Assise.",
      },
      {
        type: "image",
        src: EUROCHOCOLATE_APARTMENT,
        alt: "Lit double et coin salon de l'appartement Bilancia à l'Agriturismo La Mora",
        caption: "L'appartement Bilancia, le plus grand des cinq.",
      },
      {
        type: "p",
        text: "Depuis la même base, la basilique Saint-François d'Assise est à 7,5 km, environ 18 minutes en voiture : un week-end à Eurochocolate se combine facilement avec une journée à Assise. Gemelli et Sagittario, avec jardin privé clôturé, accueillent aussi les voyageurs avec leurs animaux.",
      },
      { type: "p", text: "Pour ceux qui voyagent avec des enfants, peut-être tout juste sortis du Fate Lab, le jardin a une aire de jeux avec toboggan et petit manège." },
      {
        type: "image",
        src: EUROCHOCOLATE_PARCO,
        alt: "Aire de jeux avec toboggan jaune et petit manège dans le jardin de l'Agriturismo La Mora",
        caption: "L'aire de jeux dans le jardin de La Mora.",
      },
      {
        type: "links",
        heading: "Organisez votre séjour",
        items: [
          { label: "Les appartements de La Mora", href: "/alloggi/" },
          { label: "Les offres en réservation directe", href: "/offerte/" },
          { label: "Les environs de La Mora", href: "/territorio/" },
          { label: "Huitième centenaire de saint François", href: "/ottavo-centenario-san-francesco/" },
          { label: "Programme officiel d'Eurochocolate 2026", href: EUROCHOCOLATE_OFFICIAL_URL },
        ],
      },
    ],
    faq: {
      heading: "Eurochocolate 2026 : questions fréquentes",
      items: [
        { q: "Quand a lieu Eurochocolate 2026 ?", a: "Du vendredi 13 au dimanche 22 novembre 2026, dans le centre historique de Pérouse. C'est la 32e édition, sur le thème « Fate Dolci »." },
        { q: "L'entrée d'Eurochocolate est-elle payante ?", a: "Non : le festival se déroule dans les rues et sur les places du centre historique, sans billet d'entrée. On paie ses achats aux stands ; la Città del Cioccolato, musée permanent, a son propre billet." },
        { q: "Quels sont les horaires d'Eurochocolate 2026 ?", a: "Selon les organisateurs, les stands sont ouverts du lundi au vendredi de 10h00 à 19h30, le samedi de 9h30 à 22h00 et le dimanche de 9h00 à 20h00." },
        { q: "À quelle distance l'Agriturismo La Mora se trouve-t-il d'Eurochocolate ?", a: "Le centre historique de Pérouse est à 21,0 km de l'Agriturismo La Mora, environ 23 minutes en voiture selon Google Maps." },
        { q: "Où se garer pour Eurochocolate ?", a: "Les organisateurs indiquent le parking gratuit Porta Nova (Piazzale Umbria Jazz), relié au centre par le Minimetrò jusqu'à la station Pincetto, ainsi que plusieurs parkings payants reliés par escalators ou ascenseurs, comme Mercato Coperto, Piazzale Europa et Piazza Partigiani." },
        { q: "Comment fonctionne la remise de 10 % de La Mora ?", a: "Elle est valable pendant toute la durée de l'événement, du 13 au 22 novembre 2026. Conditions : aimer la page Facebook de l'Agriturismo La Mora, et enregistrer la publication de l'offre ou présenter votre billet Eurochocolate au moment du paiement. Disponibilité limitée pendant les jours de l'événement." },
        { q: "Quand la Città del Cioccolato a-t-elle ouvert ?", a: "Elle a été inaugurée le 30 octobre 2025 et a ouvert au public le 1er novembre 2025, dans l'ancien Mercato Coperto de Pérouse." },
      ],
    },
    disclaimer: "Eurochocolate est une marque de ses titulaires respectifs ; l'Agriturismo La Mora n'est pas affilié à l'événement.",
    finalCtaHeading: "Dix jours de chocolat, une base tranquille à la campagne.",
    finalCtaBody: "Découvrez les appartements et choisissez celui qui convient à votre week-end Eurochocolate.",
    finalCtaLabel: "Découvrir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "eurochocolate-2026-dove-dormire",
    category: "Veranstaltungen",
    title: "Eurochocolate 2026: Übernachten in der Nähe von Perugia",
    excerpt: "Termine, Programm und praktische Tipps zur Eurochocolate 2026 (Perugia, 13.–22. November) – dazu 10 % Rabatt im Agriturismo La Mora, 21 km vom Zentrum.",
    metaDescription: "Eurochocolate 2026 in Perugia vom 13. bis 22. November: Termine, Öffnungszeiten, Programm und Unterkunft. Agriturismo La Mora liegt 21 km vom Zentrum, mit 10 % Rabatt.",
    image: EUROCHOCOLATE_2024_PHOTO.src,
    alt: EUROCHOCOLATE_2024_PHOTO.alt.de,
    imageCaption: EUROCHOCOLATE_2024_PHOTO.caption.de,
    imageCredit: EUROCHOCOLATE_2024_PHOTO.credit,
    imagePosition: "28% 72%",
    datePublished: "2026-10-06",
    schemaType: "BlogPosting",
    theme: "chocolate",
    offerBox: "eurochocolate-2026",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "Termin", value: "13.–22. November 2026" },
        { label: "Ort", value: "Altstadt von Perugia" },
        { label: "Motto", value: "„Fate Dolci“, 32. Ausgabe" },
        { label: "Eintritt", value: "Frei" },
        { label: "Ab La Mora", value: "21,0 km · ca. 23 Min. mit dem Auto" },
        { label: "Angebot La Mora", value: "-10 % während der Veranstaltung" },
      ],
    },
    intro:
      "Vom 13. bis 22. November 2026 findet in der Altstadt von Perugia die 32. Eurochocolate statt, das internationale Schokoladenfestival – in diesem Jahr unter dem Motto „Fate Dolci“, ein Wortspiel aus „süße Feen“ und „macht Süßes“. Das Agriturismo La Mora liegt 21,0 km vom Zentrum Perugias entfernt, rund 23 Minuten mit dem Auto: ein ländlicher Ausgangspunkt zwischen Perugia und Assisi, um tagsüber das Festival zu erleben und abends in die eigene Ferienwohnung zurückzukehren.",
    content: [
      { type: "h2", text: "Wann und wo findet die Eurochocolate 2026 statt?" },
      {
        type: "p",
        text: "Die Eurochocolate 2026 läuft von Freitag, 13., bis Sonntag, 22. November: zehn Tage in der Altstadt von Perugia, zwischen den Giardini Carducci, der Piazza Italia, dem Corso Vannucci, der Piazza della Repubblica, der Via Mazzini, der Via Fani und der Piazza Matteotti. Der Eintritt ist frei, da das Festival auf den Straßen und Plätzen der Stadt stattfindet – und zwar bei jedem Wetter.",
      },
      {
        type: "facts",
        items: [
          { label: "Montag–Freitag", value: "10:00–19:30" },
          { label: "Samstag", value: "9:30–22:00" },
          { label: "Sonntag", value: "9:00–20:00" },
        ],
      },
      {
        type: "p",
        text: "Das sind die von den Veranstaltern veröffentlichten Öffnungszeiten der Stände: Prüfen Sie sie vor der Abfahrt auf der offiziellen Festivalseite, zusammen mit dem aktuellen Programm.",
      },
      { type: "h2", text: "Was gibt es bei der Eurochocolate 2026 zu sehen?" },
      {
        type: "p",
        text: "„Fate Dolci“ lädt dazu ein, Schokolade aktiv zu erleben: nicht nur zu probieren, sondern selbst auszuprobieren und zu teilen. Diese Formate haben die Veranstalter für 2026 angekündigt:",
      },
      {
        type: "list",
        items: [
          "Chocolate Show – der große Schokoladenmarkt unter freiem Himmel, neu mit dem Bereich Eurochocolate Free From: Produkte ohne Zucker, ohne Laktose, glutenfrei und vegan.",
          "Eurochocolate World – der Bereich der Bean-to-Bar- und Tree-to-Bar-Hersteller, mit Marken aus mehr als 20 Kakaoanbauländern in Lateinamerika, Afrika und Asien.",
          "Spazio Fate Dolci – auf der Piazza Matteotti, mit den Themenprodukten der Ausgabe und Desserts aus Kakao.",
          "ChocoLab – tägliche Verkostungen und Vorträge im LAB – Luisa Annibale Base in der Via Angusta.",
          "Show Cooking – Live-Vorführungen mit einem Konditormeister.",
          "Fate Lab – eine Mitmachwerkstatt für Kinder und Familien in der ehemaligen Borsa Merci in der Via Mazzini.",
          "Straßenshows – Choco Buskers, Chocoparade und Chocolieri in den Gassen der Altstadt.",
          "Gastregion – Kalabrien ist die erste Region im neuen Projekt „Regione Ospite“.",
        ],
      },
      {
        type: "p",
        text: "Das Programm kann sich während des Festivals ändern: Für einzelne Termine, Workshop-Zeiten und kurzfristige Neuigkeiten gilt die offizielle Seite der Eurochocolate.",
      },
      { type: "h2", text: "Was ist die Città del Cioccolato und wann wurde sie eröffnet?" },
      {
        type: "p",
        text: "Die Città del Cioccolato („Schokoladenstadt“) ist ein Erlebnismuseum rund um Kakao und Schokolade: mehr als 2.800 m² in der ehemaligen Markthalle von Perugia, dem Mercato Coperto, erbaut 1931–1932. Sie wurde am 30. Oktober 2025 eingeweiht und am 1. November 2025 für Besucher geöffnet.",
      },
      {
        type: "p",
        text: "Laut der offiziellen Website ist sie täglich von 10:00 bis 19:00 Uhr geöffnet, der Eintritt ist kostenpflichtig. Zur Eurochocolate 2026 kündigen die Veranstalter Ermäßigungen auf das Museumsticket für Einkäufe bei der Chocolate Show an: aktuelle Preise und Bedingungen auf cittadelcioccolato.it.",
      },
      {
        type: "image",
        src: CIOCCOLATO_FONDENTE_PHOTO.src,
        alt: CIOCCOLATO_FONDENTE_PHOTO.alt.de,
        caption: CIOCCOLATO_FONDENTE_PHOTO.caption.de,
        credit: CIOCCOLATO_FONDENTE_PHOTO.credit,
      },
      { type: "h2", text: "Warum ist Perugia die Stadt der Schokolade?" },
      {
        type: "p",
        text: "Alles begann mit der Perugina, 1907 in Perugia gegründet. 1922 schuf Luisa Spagnoli eine Praline mit gehackten Haselnüssen, die wegen ihrer Form – sie erinnerte an die Knöchel einer Faust – „Cazzotto“ („Faustschlag“) hieß: Giovanni Buitoni taufte sie in Bacio („Kuss“) um. Die Idee, jeden Bacio in eine Liebesbotschaft zu hüllen, stammte von Federico Seneca, dem künstlerischen Leiter der Perugina.",
      },
      {
        type: "p",
        text: "Während des Festivals finden die ChocoLab-Termine genau in den historischen Räumen in der Via Angusta statt, die Luisa und Annibale Spagnoli in den ersten Jahren der Perugina nutzten.",
      },
      {
        type: "p",
        text: "Auch nach Assisi führt ein Faden: Zu den für 2026 angekündigten Neuheiten gehört die Tafel CioccolaTau, gewidmet dem 800. Todestag des heiligen Franziskus und hergestellt mit Haselnüssen der Sorte Tonda Francescana aus Umbrien.",
      },
      { type: "h2", text: "Wie kommt man vom Agriturismo La Mora zur Eurochocolate?" },
      {
        type: "p",
        text: "Mit dem Auto liegt das Agriturismo La Mora 21,0 km von der Altstadt Perugias entfernt: laut Google Maps rund 23 Minuten, je nach Verkehr. Während des Festivals parkt man am besten auf einem der von den Veranstaltern empfohlenen Parkplätze, die per Minimetrò, Rolltreppen oder Aufzügen mit dem Zentrum verbunden sind:",
      },
      {
        type: "list",
        items: [
          "Kostenloser Parkplatz Porta Nova (Piazzale Umbria Jazz), dann mit dem Minimetrò bis zur Station Pincetto im Zentrum. Für Autofahrer nennen die Veranstalter die Ausfahrt Perugia – Madonna Alta und danach die Beschilderung zum Stadion und zum Minimetrò.",
          "Bewachte, kostenpflichtige Parkplätze: Mercato Coperto (mit Aufzug), Piazzale Europa, Piazza Partigiani und Pellini (mit Rolltreppen).",
        ],
      },
      {
        type: "p",
        text: "Mit dem Zug: Der Bahnhof Perugia an der Piazza Vittorio Veneto liegt etwa 3 km vom Zentrum entfernt und ist per Minimetrò und Stadtbus angebunden. Fahrpläne und Tickets bei Trenitalia.",
      },
      { type: "h2", text: "Wo übernachten zur Eurochocolate 2026?" },
      {
        type: "p",
        text: "Während des Festivals ist Perugia sehr gefragt. Das Agriturismo La Mora in der Via Fonte Citerna 7 in Assisi bietet fünf unabhängige Ferienwohnungen, jede mit voll ausgestatteter Küche, WLAN und Klimaanlage, dazu kostenlose Parkplätze auf dem Gelände: morgens nach Perugia, abends zurück aufs Land, fern vom Trubel.",
      },
      {
        type: "image",
        src: LAMORA_ESTERNO,
        alt: "Außenbereich des Agriturismo La Mora: ein alter Bauernkarren zwischen Blumen vor dem Haus und einem großen Olivenbaum",
        caption: "Das Agriturismo La Mora auf dem Land bei Assisi.",
      },
      {
        type: "image",
        src: EUROCHOCOLATE_APARTMENT,
        alt: "Doppelbett und Wohnbereich der Ferienwohnung Bilancia im Agriturismo La Mora",
        caption: "Die Ferienwohnung Bilancia, die größte der fünf.",
      },
      {
        type: "p",
        text: "Vom selben Ausgangspunkt ist die Basilika San Francesco in Assisi 7,5 km entfernt, rund 18 Minuten mit dem Auto: Ein Eurochocolate-Wochenende lässt sich leicht mit einem Tag in Assisi verbinden. Gemelli und Sagittario mit privatem, eingezäuntem Garten nehmen auch Gäste mit Haustieren auf.",
      },
      { type: "p", text: "Für Familien mit Kindern, vielleicht frisch aus dem Fate Lab, gibt es im Garten einen Spielplatz mit Rutsche und kleinem Karussell." },
      {
        type: "image",
        src: EUROCHOCOLATE_PARCO,
        alt: "Spielplatz mit gelber Rutsche und kleinem Karussell im Garten des Agriturismo La Mora",
        caption: "Der Spielplatz im Garten von La Mora.",
      },
      {
        type: "links",
        heading: "Planen Sie Ihren Aufenthalt",
        items: [
          { label: "Die Ferienwohnungen von La Mora", href: "/alloggi/" },
          { label: "Angebote bei Direktbuchung", href: "/offerte/" },
          { label: "Die Umgebung von La Mora", href: "/territorio/" },
          { label: "800 Jahre heiliger Franziskus", href: "/ottavo-centenario-san-francesco/" },
          { label: "Offizielles Programm der Eurochocolate 2026", href: EUROCHOCOLATE_OFFICIAL_URL },
        ],
      },
    ],
    faq: {
      heading: "Eurochocolate 2026: häufige Fragen",
      items: [
        { q: "Wann findet die Eurochocolate 2026 statt?", a: "Von Freitag, 13., bis Sonntag, 22. November 2026, in der Altstadt von Perugia. Es ist die 32. Ausgabe, das Motto lautet „Fate Dolci“." },
        { q: "Kostet die Eurochocolate Eintritt?", a: "Nein: Das Festival findet auf den Straßen und Plätzen der Altstadt statt, ein Eintrittsticket gibt es nicht. Bezahlt werden die Einkäufe an den Ständen; die Città del Cioccolato, ein ständiges Museum, hat ein eigenes Ticket." },
        { q: "Wie sind die Öffnungszeiten der Eurochocolate 2026?", a: "Laut den Veranstaltern sind die Stände montags bis freitags von 10:00 bis 19:30 Uhr, samstags von 9:30 bis 22:00 Uhr und sonntags von 9:00 bis 20:00 Uhr geöffnet." },
        { q: "Wie weit ist das Agriturismo La Mora von der Eurochocolate entfernt?", a: "Die Altstadt von Perugia liegt 21,0 km vom Agriturismo La Mora entfernt, laut Google Maps rund 23 Minuten mit dem Auto." },
        { q: "Wo parkt man zur Eurochocolate?", a: "Die Veranstalter empfehlen den kostenlosen Parkplatz Porta Nova (Piazzale Umbria Jazz), mit dem Minimetrò bis zur Station Pincetto mit dem Zentrum verbunden, sowie mehrere kostenpflichtige Parkplätze mit Rolltreppen oder Aufzügen, etwa Mercato Coperto, Piazzale Europa und Piazza Partigiani." },
        { q: "Wie funktioniert der 10-%-Rabatt von La Mora?", a: "Er gilt während der gesamten Veranstaltung, vom 13. bis 22. November 2026. Bedingungen: der Facebook-Seite des Agriturismo La Mora ein „Gefällt mir“ geben und den Beitrag mit dem Angebot speichern oder beim Bezahlen das Eurochocolate-Ticket vorzeigen. Begrenzte Verfügbarkeit an den Veranstaltungstagen." },
        { q: "Wann wurde die Città del Cioccolato eröffnet?", a: "Sie wurde am 30. Oktober 2025 eingeweiht und am 1. November 2025 für Besucher geöffnet, in der ehemaligen Markthalle Mercato Coperto in Perugia." },
      ],
    },
    disclaimer: "Eurochocolate ist eine Marke der jeweiligen Inhaber; das Agriturismo La Mora ist mit der Veranstaltung nicht verbunden.",
    finalCtaHeading: "Zehn Tage Schokolade, ein ruhiger Ausgangspunkt auf dem Land.",
    finalCtaBody: "Sehen Sie sich die Ferienwohnungen an und wählen Sie die passende für Ihr Eurochocolate-Wochenende.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};

/* ---- Blocco C (ottobre 2026): 4 articoli per traffico organico (SEO/GEO).
   Solo fatti da fonti ufficiali o affidabili, verificati il 06/10/2026:
   - Carlo Acutis: assisisantuariospogliazione.it (biografia, orari, storia
     della chiesa), carloacutis.com (tomba nella navata destra), Vatican
     News (canonizzazione 7/9/2025, rinvio dal 27/4/2025), visit-assisi.it
     (ZTL, parcheggi, bus urbani).
   - Natale: umbriatourism.it (Natale a Perugia 2025/26), italia.it (albero e
     mercatini di Gubbio; Luci sul Trasimeno), Comune di Foligno (presepe di
     Rasiglia).
   - Albero sul lago: Provincia di Perugia (edizione 2023: misure, luci,
     prezzo), italia.it (record dichiarato, periodo).
   - Rasiglia: Comune di Foligno (scheda del borgo, Infopoint, eventi,
     accessibilità; navette da Casenove nei periodi di punta), italia.it
     (altitudine circa 600 m, "borgo dei ruscelli").
   Distanze: Google Maps (indicazioni stradali, percorso consigliato da La
   Mora) lette il 06/10/2026, vedi src/data/places.ts. Date 2026 di eventi
   non ancora annunciate: forma evergreen con rimando ai siti ufficiali. */
const LAMORA_BASILICA = "/images/territorio/assisi/basilica di assisi.jpg";
const LAMORA_ACQUARIO = "/images/alloggi/appartamento acquario/orizzontale letto acquario.jpeg";
const LAMORA_DALL_ALTO = "/images/home/foto dell agriturismo dall alto.webp";
const LAMORA_PISCINA = "/images/piscina/foto piscina di giorno.webp";

/* Copertina e blocchi immagine da una foto con licenza (photo-credits.ts):
   alt, didascalia con l'anno reale e credito sempre insieme. */
function cover(p: CreditedPhoto, l: Locale) {
  return { image: p.src, alt: p.alt[l], imageCaption: p.caption[l], imageCredit: p.credit };
}
function credited(p: CreditedPhoto, l: Locale): ContentBlock {
  return { type: "image", src: p.src, alt: p.alt[l], caption: p.caption[l], credit: p.credit };
}

const SANTUARIO_URL = "https://www.assisisantuariospogliazione.it/";

const CARLO_ACUTIS_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "carlo-acutis-assisi",
    category: "Spiritualità",
    title: "Carlo Acutis ad Assisi: guida alla tomba e al santuario",
    excerpt: "Chi era San Carlo Acutis, dove riposa ad Assisi e come visitare il Santuario della Spogliazione: orari, parcheggi, cosa vedere vicino e dove dormire a 6,8 km.",
    metaDescription: "San Carlo Acutis ad Assisi: la tomba nel Santuario della Spogliazione, orari, come arrivare, cosa vedere vicino e dove dormire a 6,8 km dal santuario.",
    ...cover(SPOGLIAZIONE_FACCIATA_PHOTO, "it"),
    imagePosition: "50% 20%",
    datePublished: "2026-10-06",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Dove riposa", value: "Santuario della Spogliazione (Santa Maria Maggiore), Assisi" },
        { label: "Canonizzazione", value: "7 settembre 2025, piazza San Pietro" },
        { label: "Memoria liturgica", value: "12 ottobre" },
        { label: "Domenica e festivi", value: "visite sospese 10:30–12:30" },
        { label: "A piedi dalla Basilica", value: "1,0 km · circa 13 min" },
        { label: "Da La Mora", value: "6,8 km · circa 15 min in auto" },
      ],
    },
    intro:
      "Dal 6 aprile 2019 il corpo di Carlo Acutis riposa ad Assisi, nella chiesa di Santa Maria Maggiore, oggi Santuario della Spogliazione. Canonizzato il 7 settembre 2025, San Carlo Acutis è meta di molti pellegrini, soprattutto giovani. In questa guida trovi i fatti essenziali sulla sua vita e le informazioni pratiche per visitare il santuario, a 6,8 km da Agriturismo La Mora.",
    introCtaHeading: "Visiti Assisi per San Carlo Acutis? Dormi a 6,8 km dal santuario, in campagna.",
    introCtaLabel: "Prenota",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Chi era Carlo Acutis?" },
      {
        type: "p",
        text: "Carlo Acutis nacque a Londra il 3 maggio 1991 e visse a Milano, ma trascorse lunghi periodi ad Assisi, dove — scrive il santuario — «respirò la spiritualità di San Francesco». La Messa era per lui un appuntamento quotidiano, anche nelle chiese di Assisi: tra queste Santa Maria Maggiore, dove oggi riposa.",
      },
      {
        type: "p",
        text: "Colpito da una leucemia fulminante, la visse, secondo la biografia ufficiale del santuario, «come prova da offrire per il Papa e per la Chiesa». Morì il 12 ottobre 2006, a 15 anni.",
      },
      {
        type: "facts",
        items: [
          { label: "Nascita", value: "Londra, 3 maggio 1991" },
          { label: "Morte", value: "12 ottobre 2006" },
          { label: "Beatificazione", value: "Assisi, 10 ottobre 2020" },
          { label: "Canonizzazione", value: "Roma, 7 settembre 2025" },
          { label: "Tomba", value: "Assisi, dal 6 aprile 2019" },
          { label: "Memoria", value: "12 ottobre" },
        ],
      },
      { type: "h2", text: "Quando è diventato santo Carlo Acutis?" },
      {
        type: "p",
        text: "Il 10 ottobre 2020 Carlo Acutis è stato beatificato nella Basilica di San Francesco ad Assisi, in una celebrazione presieduta dal cardinale Agostino Vallini. La canonizzazione, inizialmente prevista per il 27 aprile 2025 durante il Giubileo degli adolescenti, fu rinviata dopo la morte di Papa Francesco: Papa Leone XIV lo ha proclamato santo il 7 settembre 2025 in piazza San Pietro, insieme a Pier Giorgio Frassati.",
      },
      {
        type: "p",
        text: "La memoria liturgica di San Carlo Acutis è il 12 ottobre, giorno della sua morte. Nel 2026 ricorrono vent'anni dalla scomparsa: per l'anniversario il santuario ha organizzato celebrazioni dal 9 al 12 ottobre.",
      },
      { type: "h2", text: "Dove si trova la tomba di Carlo Acutis?" },
      {
        type: "p",
        text: "La tomba di San Carlo Acutis è nella chiesa di Santa Maria Maggiore, in piazza del Vescovado, nel centro storico di Assisi: è il Santuario della Spogliazione. Il corpo vi riposa dal 6 aprile 2019 e il monumento sepolcrale si trova nella navata destra.",
      },
      credited(SPOGLIAZIONE_VEDUTA_PHOTO, "it"),
      { type: "h2", text: "Perché si chiama Santuario della Spogliazione?" },
      {
        type: "p",
        text: "Il nome ricorda uno degli episodi più noti della vita di San Francesco: il giovane Francesco si spogliò delle sue vesti davanti al padre e al vescovo Guido, che lo ricoprì con il proprio pallio. La tradizione colloca l'episodio nel vescovado accanto alla chiesa. Il santuario custodisce la memoria di quel gesto e organizza visite guidate all'antico episcopio e alla «porta di Francesco».",
      },
      {
        type: "p",
        text: "La chiesa ha una storia lunga. Secondo la tradizione fu la prima cattedrale di Assisi, costruita nel IV secolo sopra una casa romana, la domus di Properzio; nel 1035 il titolo di cattedrale passò a San Rufino. Sul rosone è incisa la data 1163, l'abside fu ricostruita nel 1216 e la facciata ha assunto l'aspetto attuale nel 1938.",
      },
      credited(SPOGLIAZIONE_ROSONE_PHOTO, "it"),
      { type: "h2", text: "Come si visita la tomba di Carlo Acutis?" },
      {
        type: "p",
        text: "Il santuario è aperto tutti i giorni. Gli orari pubblicati sul sito ufficiale al momento della stesura di questa guida sono:",
      },
      {
        type: "list",
        items: [
          "dal 1° novembre al 31 marzo: dalle 8:00 alle 19:00;",
          "dal 1° aprile al 30 ottobre: dalle 8:00 alle 19:00 il lunedì e il giovedì, dalle 7:00 alle 19:00 negli altri giorni;",
          "domenica e festivi: dalle 10:30 alle 12:30 le visite al santuario e alla tomba sono sospese per la Messa delle 11:00 (chi vuole partecipare deve entrare entro le 10:30).",
        ],
      },
      {
        type: "p",
        text: "Le Messe sono alle 18:00 nei giorni feriali, precedute dal rosario alle 17:30, e alle 9:30 e alle 11:00 nei festivi. Il santuario propone anche visite guidate alla domus di Properzio, nella cripta, dalle 12:30 alle 13:30 (la cripta non è visitabile durante le celebrazioni), e all'antico episcopio con la porta di Francesco, per cui consiglia la prenotazione. Orari e celebrazioni possono cambiare: prima di partire controlla il sito ufficiale del santuario.",
      },
      { type: "h2", text: "Come si arriva al Santuario della Spogliazione?" },
      {
        type: "p",
        text: "Da Agriturismo La Mora il santuario dista 6,8 km, circa 15 minuti in auto secondo Google Maps. Il centro storico di Assisi è in buona parte zona a traffico limitato (ZTL), con regole che cambiano secondo la stagione: conviene lasciare l'auto in uno dei parcheggi indicati dal portale turistico del Comune e proseguire a piedi.",
      },
      {
        type: "list",
        items: [
          "Parcheggi a pagamento: Giovanni Paolo II, Mojano, Porta Nuova e Matteotti.",
          "Parcheggi gratuiti: zona cimitero (via Egidio Albornoz), piazza Caduti Forze dell'Ordine e Porta San Giacomo.",
          "In città circolano anche le linee urbane di autobus A, B e C.",
        ],
      },
      { type: "h2", text: "Cosa vedere vicino al Santuario della Spogliazione?" },
      {
        type: "p",
        text: "Il santuario è nel centro storico e da qui i luoghi principali di Assisi si raggiungono a piedi:",
      },
      {
        type: "list",
        items: [
          "la Basilica di San Francesco: 1,0 km, circa 13 minuti a piedi lungo via San Francesco secondo Google Maps;",
          "Piazza del Comune, con il Tempio di Minerva e la Torre del Popolo;",
          "la Cattedrale di San Rufino, che nel 1035 ereditò da Santa Maria Maggiore il titolo di cattedrale;",
          "la Rocca Maggiore, la fortezza che domina la città.",
        ],
      },
      { type: "h2", text: "Come abbinare la visita alla Basilica di San Francesco?" },
      {
        type: "p",
        text: "Un itinerario semplice, tutto a piedi: la mattina al Santuario della Spogliazione (la domenica e i festivi le visite alla tomba sono sospese dalle 10:30 alle 12:30), poi lungo via San Francesco fino alla Basilica di San Francesco, dove Carlo Acutis è stato beatificato nel 2020. Nel pomeriggio si risale verso Piazza del Comune e la Cattedrale di San Rufino.",
      },
      {
        type: "image",
        src: LAMORA_BASILICA,
        alt: "La Basilica di San Francesco ad Assisi in una giornata di sole, con il prato davanti",
        caption: "La Basilica di San Francesco, a circa 1 km a piedi dal santuario.",
      },
      {
        type: "p",
        text: "Nel 2026 Assisi celebra anche l'Ottavo Centenario della morte di San Francesco (1226–2026). E a 2,1 km da La Mora, nella piana sotto la città, c'è la Basilica di Santa Maria degli Angeli con la Porziuncola: ne parliamo nella nostra guida dedicata.",
      },
      { type: "h2", text: "Dove dormire vicino alla tomba di Carlo Acutis?" },
      {
        type: "p",
        text: "Agriturismo La Mora, in via Fonte Citerna 7, è a 6,8 km dal Santuario della Spogliazione (circa 15 minuti in auto) e a 7,5 km dalla Basilica di San Francesco. I cinque appartamenti indipendenti hanno cucina attrezzata, Wi-Fi e aria condizionata, e il parcheggio è gratuito all'interno della struttura: una base tranquilla in campagna, comoda per famiglie e piccoli gruppi.",
      },
      {
        type: "image",
        src: LAMORA_ACQUARIO,
        alt: "Camera dell'appartamento Acquario di Agriturismo La Mora, con letto matrimoniale e letto a castello",
        caption: "Una camera dell'appartamento Acquario.",
      },
      {
        type: "p",
        text: "Per i gruppi più numerosi l'appartamento Bilancia ospita fino a 8 persone; Gemelli e Sagittario, con giardino privato recintato, accolgono anche chi viaggia con animali.",
      },
      {
        type: "links",
        heading: "Organizza la visita",
        items: [
          { label: "Gli appartamenti di La Mora", href: "/alloggi/" },
          { label: "Le offerte per chi prenota diretto", href: "/offerte/" },
          { label: "Il territorio intorno a La Mora", href: "/territorio/" },
          { label: "Ottavo Centenario di San Francesco", href: "/ottavo-centenario-san-francesco/" },
          { label: "Guida alla Basilica di Santa Maria degli Angeli", href: "/blog/basilica-santa-maria-degli-angeli/" },
          { label: "Sito ufficiale del Santuario della Spogliazione", href: SANTUARIO_URL },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti su Carlo Acutis ad Assisi",
      items: [
        { q: "Dove è sepolto Carlo Acutis?", a: "Ad Assisi, nella chiesa di Santa Maria Maggiore — Santuario della Spogliazione, in piazza del Vescovado. Il corpo vi riposa dal 6 aprile 2019." },
        { q: "Quando è stato canonizzato Carlo Acutis?", a: "Il 7 settembre 2025, da Papa Leone XIV, in piazza San Pietro a Roma, insieme a Pier Giorgio Frassati. Era stato beatificato ad Assisi il 10 ottobre 2020." },
        { q: "Quando si festeggia San Carlo Acutis?", a: "La memoria liturgica è il 12 ottobre, giorno della sua morte nel 2006." },
        { q: "Si può visitare la tomba la domenica?", a: "Sì, ma la domenica e nei giorni festivi le visite al santuario e alla tomba sono sospese dalle 10:30 alle 12:30, durante la Messa delle 11:00." },
        { q: "Quanto dista il santuario dalla Basilica di San Francesco?", a: "Circa 1 km, 13 minuti a piedi lungo via San Francesco secondo Google Maps." },
        { q: "Dove parcheggiare per visitare il santuario?", a: "Il centro storico è in buona parte ZTL: conviene usare i parcheggi indicati dal Comune, a pagamento (Giovanni Paolo II, Mojano, Porta Nuova, Matteotti) o gratuiti (zona cimitero, piazza Caduti Forze dell'Ordine, Porta San Giacomo), e proseguire a piedi." },
        { q: "Quanto dista Agriturismo La Mora dal santuario?", a: "6,8 km, circa 15 minuti in auto secondo Google Maps." },
      ],
    },
    finalCtaHeading: "Un pellegrinaggio ad Assisi, con una casa in campagna dove tornare la sera.",
    finalCtaBody: "Scegli l'appartamento giusto per te, la tua famiglia o il tuo gruppo.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "carlo-acutis-assisi",
    category: "Spirituality",
    title: "Carlo Acutis in Assisi: a guide to his tomb and sanctuary",
    excerpt: "Who Saint Carlo Acutis was, where he rests in Assisi and how to visit the Sanctuary of Renunciation: opening hours, parking, what's nearby and where to stay, 6.8 km away.",
    metaDescription: "Saint Carlo Acutis in Assisi: his tomb in the Sanctuary of Renunciation, opening hours, getting there, what to see nearby and where to stay 6.8 km away.",
    ...cover(SPOGLIAZIONE_FACCIATA_PHOTO, "en"),
    imagePosition: "50% 20%",
    datePublished: "2026-10-06",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Resting place", value: "Santuario della Spogliazione (Santa Maria Maggiore), Assisi" },
        { label: "Canonisation", value: "7 September 2025, St Peter's Square" },
        { label: "Feast day", value: "12 October" },
        { label: "Sundays and holidays", value: "no visits 10:30–12:30" },
        { label: "On foot from the Basilica", value: "1.0 km · about 13 min" },
        { label: "From La Mora", value: "6.8 km · about 15 min by car" },
      ],
    },
    intro:
      "Since 6 April 2019 the body of Carlo Acutis has rested in Assisi, in the church of Santa Maria Maggiore, now the Santuario della Spogliazione (Sanctuary of Renunciation). Canonised on 7 September 2025, Saint Carlo Acutis draws many pilgrims, especially young people. This guide covers the essential facts of his life and the practical information you need to visit the sanctuary, 6.8 km from Agriturismo La Mora.",
    introCtaHeading: "Visiting Assisi for Saint Carlo Acutis? Stay in the countryside, 6.8 km from the sanctuary.",
    introCtaLabel: "Book",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Who was Carlo Acutis?" },
      {
        type: "p",
        text: "Carlo Acutis was born in London on 3 May 1991 and lived in Milan, but spent long periods in Assisi where, as the sanctuary puts it, he “breathed in the spirituality of Saint Francis”. Daily Mass was a fixed appointment for him, in Assisi's churches too — among them Santa Maria Maggiore, where he now rests.",
      },
      {
        type: "p",
        text: "Struck by a sudden, aggressive leukaemia, he lived it, according to the sanctuary's official biography, “as a trial to offer for the Pope and for the Church”. He died on 12 October 2006, aged 15.",
      },
      {
        type: "facts",
        items: [
          { label: "Born", value: "London, 3 May 1991" },
          { label: "Died", value: "12 October 2006" },
          { label: "Beatified", value: "Assisi, 10 October 2020" },
          { label: "Canonised", value: "Rome, 7 September 2025" },
          { label: "Tomb", value: "Assisi, since 6 April 2019" },
          { label: "Feast day", value: "12 October" },
        ],
      },
      { type: "h2", text: "When did Carlo Acutis become a saint?" },
      {
        type: "p",
        text: "Carlo Acutis was beatified on 10 October 2020 in the Basilica of San Francesco in Assisi, at a celebration presided over by Cardinal Agostino Vallini. His canonisation, originally scheduled for 27 April 2025 during the Jubilee of Adolescents, was postponed after the death of Pope Francis: Pope Leo XIV proclaimed him a saint on 7 September 2025 in St Peter's Square, together with Pier Giorgio Frassati.",
      },
      {
        type: "p",
        text: "The liturgical memorial of Saint Carlo Acutis is on 12 October, the day of his death. 2026 marks twenty years since he died: for the anniversary the sanctuary organised celebrations from 9 to 12 October.",
      },
      { type: "h2", text: "Where is Carlo Acutis's tomb?" },
      {
        type: "p",
        text: "The tomb of Saint Carlo Acutis is in the church of Santa Maria Maggiore, on Piazza del Vescovado in the historic centre of Assisi: this is the Sanctuary of Renunciation. His body has rested here since 6 April 2019, and the tomb monument is in the right-hand aisle.",
      },
      credited(SPOGLIAZIONE_VEDUTA_PHOTO, "en"),
      { type: "h2", text: "Why is it called the Sanctuary of Renunciation?" },
      {
        type: "p",
        text: "The name recalls one of the best-known episodes in the life of Saint Francis: the young Francis stripped off his clothes before his father and Bishop Guido, who covered him with his own mantle. Tradition places the episode in the bishop's palace next to the church. The sanctuary keeps the memory of that gesture alive and runs guided tours of the old bishop's palace and the “door of Francis”.",
      },
      {
        type: "p",
        text: "The church has a long history. According to tradition it was Assisi's first cathedral, built in the 4th century over a Roman house, the domus of Propertius; in 1035 the title of cathedral passed to San Rufino. The rose window bears the date 1163, the apse was rebuilt in 1216 and the façade took on its present appearance in 1938.",
      },
      credited(SPOGLIAZIONE_ROSONE_PHOTO, "en"),
      { type: "h2", text: "How can you visit Carlo Acutis's tomb?" },
      {
        type: "p",
        text: "The sanctuary is open every day. The opening hours published on the official website at the time of writing are:",
      },
      {
        type: "list",
        items: [
          "1 November to 31 March: 8:00 to 19:00;",
          "1 April to 30 October: 8:00 to 19:00 on Mondays and Thursdays, 7:00 to 19:00 on the other days;",
          "Sundays and holidays: from 10:30 to 12:30 visits to the sanctuary and the tomb are suspended for the 11:00 Mass (if you wish to attend, enter by 10:30).",
        ],
      },
      {
        type: "p",
        text: "Mass is at 18:00 on weekdays, preceded by the rosary at 17:30, and at 9:30 and 11:00 on Sundays and holidays. The sanctuary also offers guided tours of the domus of Propertius in the crypt, from 12:30 to 13:30 (the crypt is closed to visitors during services), and of the old bishop's palace with the door of Francis, for which booking is recommended. Times and services can change: check the sanctuary's official website before you go.",
      },
      { type: "h2", text: "How do you get to the Sanctuary of Renunciation?" },
      {
        type: "p",
        text: "From Agriturismo La Mora the sanctuary is 6.8 km away, about 15 minutes by car according to Google Maps. Much of Assisi's historic centre is a limited traffic zone (ZTL), with rules that change with the season: it's best to leave the car in one of the car parks listed by the town's official tourism website and continue on foot.",
      },
      {
        type: "list",
        items: [
          "Paid car parks: Giovanni Paolo II, Mojano, Porta Nuova and Matteotti.",
          "Free car parks: cemetery area (Via Egidio Albornoz), Piazza Caduti Forze dell'Ordine and Porta San Giacomo.",
          "Town bus lines A, B and C also run through Assisi.",
        ],
      },
      { type: "h2", text: "What can you see near the Sanctuary of Renunciation?" },
      {
        type: "p",
        text: "The sanctuary is in the historic centre, and Assisi's main sights are within walking distance:",
      },
      {
        type: "list",
        items: [
          "the Basilica of San Francesco: 1.0 km, about 13 minutes on foot along Via San Francesco according to Google Maps;",
          "Piazza del Comune, with the Temple of Minerva and the Torre del Popolo;",
          "the Cathedral of San Rufino, which inherited the title of cathedral from Santa Maria Maggiore in 1035;",
          "the Rocca Maggiore, the fortress overlooking the town.",
        ],
      },
      { type: "h2", text: "How can you combine the visit with the Basilica of San Francesco?" },
      {
        type: "p",
        text: "A simple itinerary, all on foot: the Sanctuary of Renunciation in the morning (on Sundays and holidays visits to the tomb are suspended from 10:30 to 12:30), then along Via San Francesco to the Basilica of San Francesco, where Carlo Acutis was beatified in 2020. In the afternoon, walk back up towards Piazza del Comune and the Cathedral of San Rufino.",
      },
      {
        type: "image",
        src: LAMORA_BASILICA,
        alt: "The Basilica of San Francesco in Assisi on a sunny day, with the lawn in front",
        caption: "The Basilica of San Francesco, about 1 km on foot from the sanctuary.",
      },
      {
        type: "p",
        text: "In 2026 Assisi is also celebrating the Eighth Centenary of the death of Saint Francis (1226–2026). And 2.1 km from La Mora, on the plain below the town, stands the Basilica of Santa Maria degli Angeli with the Porziuncola: we cover it in a dedicated guide.",
      },
      { type: "h2", text: "Where to stay near Carlo Acutis's tomb?" },
      {
        type: "p",
        text: "Agriturismo La Mora, at Via Fonte Citerna 7, is 6.8 km from the Sanctuary of Renunciation (about 15 minutes by car) and 7.5 km from the Basilica of San Francesco. Its five independent apartments have a fully equipped kitchen, Wi-Fi and air conditioning, with free parking on site: a quiet countryside base that works well for families and small groups.",
      },
      {
        type: "image",
        src: LAMORA_ACQUARIO,
        alt: "Bedroom of the Acquario apartment at Agriturismo La Mora, with a double bed and a bunk bed",
        caption: "A bedroom in the Acquario apartment.",
      },
      {
        type: "p",
        text: "For larger groups, the Bilancia apartment sleeps up to 8; Gemelli and Sagittario, with a private fenced garden, also welcome guests travelling with pets.",
      },
      {
        type: "links",
        heading: "Plan your visit",
        items: [
          { label: "La Mora's apartments", href: "/alloggi/" },
          { label: "Offers for direct bookings", href: "/offerte/" },
          { label: "The area around La Mora", href: "/territorio/" },
          { label: "Eighth Centenary of Saint Francis", href: "/ottavo-centenario-san-francesco/" },
          { label: "Guide to the Basilica of Santa Maria degli Angeli", href: "/blog/basilica-santa-maria-degli-angeli/" },
          { label: "Official website of the Sanctuary", href: SANTUARIO_URL },
        ],
      },
    ],
    faq: {
      heading: "Carlo Acutis in Assisi: frequently asked questions",
      items: [
        { q: "Where is Carlo Acutis buried?", a: "In Assisi, in the church of Santa Maria Maggiore — Sanctuary of Renunciation, on Piazza del Vescovado. His body has rested there since 6 April 2019." },
        { q: "When was Carlo Acutis canonised?", a: "On 7 September 2025, by Pope Leo XIV, in St Peter's Square in Rome, together with Pier Giorgio Frassati. He had been beatified in Assisi on 10 October 2020." },
        { q: "When is the feast of Saint Carlo Acutis?", a: "His liturgical memorial is on 12 October, the day he died in 2006." },
        { q: "Can you visit the tomb on Sundays?", a: "Yes, but on Sundays and holidays visits to the sanctuary and the tomb are suspended from 10:30 to 12:30, during the 11:00 Mass." },
        { q: "How far is the sanctuary from the Basilica of San Francesco?", a: "About 1 km, a 13-minute walk along Via San Francesco according to Google Maps." },
        { q: "Where can you park to visit the sanctuary?", a: "Much of the historic centre is a ZTL: use the car parks listed by the town — paid (Giovanni Paolo II, Mojano, Porta Nuova, Matteotti) or free (cemetery area, Piazza Caduti Forze dell'Ordine, Porta San Giacomo) — and continue on foot." },
        { q: "How far is Agriturismo La Mora from the sanctuary?", a: "6.8 km, about 15 minutes by car according to Google Maps." },
      ],
    },
    finalCtaHeading: "A pilgrimage to Assisi, with a countryside home to return to in the evening.",
    finalCtaBody: "Choose the right apartment for you, your family or your group.",
    finalCtaLabel: "Discover the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "carlo-acutis-assisi",
    category: "Spiritualité",
    title: "Carlo Acutis à Assise : guide de son tombeau et du sanctuaire",
    excerpt: "Qui était saint Carlo Acutis, où il repose à Assise et comment visiter le Sanctuaire du Dépouillement : horaires, parkings, que voir autour et où dormir, à 6,8 km.",
    metaDescription: "Saint Carlo Acutis à Assise : son tombeau au Sanctuaire du Dépouillement, horaires, accès, que voir autour et où dormir à 6,8 km du sanctuaire.",
    ...cover(SPOGLIAZIONE_FACCIATA_PHOTO, "fr"),
    imagePosition: "50% 20%",
    datePublished: "2026-10-06",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "Où il repose", value: "Santuario della Spogliazione (Santa Maria Maggiore), Assise" },
        { label: "Canonisation", value: "7 septembre 2025, place Saint-Pierre" },
        { label: "Mémoire liturgique", value: "12 octobre" },
        { label: "Dimanches et fêtes", value: "visites suspendues 10h30–12h30" },
        { label: "À pied depuis la basilique", value: "1,0 km · env. 13 min" },
        { label: "Depuis La Mora", value: "6,8 km · env. 15 min en voiture" },
      ],
    },
    intro:
      "Depuis le 6 avril 2019, le corps de Carlo Acutis repose à Assise, dans l'église Santa Maria Maggiore, aujourd'hui Santuario della Spogliazione (Sanctuaire du Dépouillement). Canonisé le 7 septembre 2025, saint Carlo Acutis attire de nombreux pèlerins, surtout des jeunes. Ce guide réunit l'essentiel sur sa vie et les informations pratiques pour visiter le sanctuaire, à 6,8 km de l'Agriturismo La Mora.",
    introCtaHeading: "Vous venez à Assise pour saint Carlo Acutis ? Dormez à la campagne, à 6,8 km du sanctuaire.",
    introCtaLabel: "Réserver",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Qui était Carlo Acutis ?" },
      {
        type: "p",
        text: "Carlo Acutis est né à Londres le 3 mai 1991 et a vécu à Milan, mais il passait de longues périodes à Assise où, écrit le sanctuaire, il « respira la spiritualité de saint François ». La messe était pour lui un rendez-vous quotidien, y compris dans les églises d'Assise — parmi elles Santa Maria Maggiore, où il repose aujourd'hui.",
      },
      {
        type: "p",
        text: "Frappé par une leucémie foudroyante, il la vécut, selon la biographie officielle du sanctuaire, « comme une épreuve à offrir pour le Pape et pour l'Église ». Il est mort le 12 octobre 2006, à 15 ans.",
      },
      {
        type: "facts",
        items: [
          { label: "Naissance", value: "Londres, 3 mai 1991" },
          { label: "Décès", value: "12 octobre 2006" },
          { label: "Béatification", value: "Assise, 10 octobre 2020" },
          { label: "Canonisation", value: "Rome, 7 septembre 2025" },
          { label: "Tombeau", value: "Assise, depuis le 6 avril 2019" },
          { label: "Mémoire", value: "12 octobre" },
        ],
      },
      { type: "h2", text: "Quand Carlo Acutis est-il devenu saint ?" },
      {
        type: "p",
        text: "Carlo Acutis a été béatifié le 10 octobre 2020 dans la basilique Saint-François d'Assise, lors d'une célébration présidée par le cardinal Agostino Vallini. Sa canonisation, d'abord prévue le 27 avril 2025 pendant le Jubilé des adolescents, a été reportée après la mort du pape François : le pape Léon XIV l'a proclamé saint le 7 septembre 2025 sur la place Saint-Pierre, en même temps que Pier Giorgio Frassati.",
      },
      {
        type: "p",
        text: "La mémoire liturgique de saint Carlo Acutis est fixée au 12 octobre, jour de sa mort. En 2026, cela fait vingt ans qu'il est mort : pour cet anniversaire, le sanctuaire a organisé des célébrations du 9 au 12 octobre.",
      },
      { type: "h2", text: "Où se trouve le tombeau de Carlo Acutis ?" },
      {
        type: "p",
        text: "Le tombeau de saint Carlo Acutis se trouve dans l'église Santa Maria Maggiore, piazza del Vescovado, dans le centre historique d'Assise : c'est le Sanctuaire du Dépouillement. Son corps y repose depuis le 6 avril 2019 et le monument funéraire se trouve dans le bas-côté droit.",
      },
      credited(SPOGLIAZIONE_VEDUTA_PHOTO, "fr"),
      { type: "h2", text: "Pourquoi l'appelle-t-on Sanctuaire du Dépouillement ?" },
      {
        type: "p",
        text: "Le nom rappelle l'un des épisodes les plus célèbres de la vie de saint François : le jeune François se dépouilla de ses vêtements devant son père et l'évêque Guido, qui le couvrit de son propre manteau. La tradition situe l'épisode à l'évêché, à côté de l'église. Le sanctuaire garde la mémoire de ce geste et propose des visites guidées de l'ancien évêché et de la « porte de François ».",
      },
      {
        type: "p",
        text: "L'église a une longue histoire. Selon la tradition, ce fut la première cathédrale d'Assise, construite au IVe siècle sur une maison romaine, la domus de Properce ; en 1035, le titre de cathédrale passa à San Rufino. La rosace porte la date de 1163, l'abside fut reconstruite en 1216 et la façade a pris son aspect actuel en 1938.",
      },
      credited(SPOGLIAZIONE_ROSONE_PHOTO, "fr"),
      { type: "h2", text: "Comment visiter le tombeau de Carlo Acutis ?" },
      {
        type: "p",
        text: "Le sanctuaire est ouvert tous les jours. Les horaires publiés sur le site officiel au moment de la rédaction de ce guide sont :",
      },
      {
        type: "list",
        items: [
          "du 1er novembre au 31 mars : de 8h00 à 19h00 ;",
          "du 1er avril au 30 octobre : de 8h00 à 19h00 le lundi et le jeudi, de 7h00 à 19h00 les autres jours ;",
          "dimanches et jours fériés : de 10h30 à 12h30, les visites du sanctuaire et du tombeau sont suspendues pour la messe de 11h00 (pour y assister, il faut entrer avant 10h30).",
        ],
      },
      {
        type: "p",
        text: "Les messes ont lieu à 18h00 en semaine, précédées du chapelet à 17h30, et à 9h30 et 11h00 les dimanches et jours fériés. Le sanctuaire propose aussi des visites guidées de la domus de Properce, dans la crypte, de 12h30 à 13h30 (la crypte ne se visite pas pendant les célébrations), et de l'ancien évêché avec la porte de François, pour lesquelles la réservation est conseillée. Horaires et célébrations peuvent changer : consultez le site officiel du sanctuaire avant de partir.",
      },
      { type: "h2", text: "Comment se rendre au Sanctuaire du Dépouillement ?" },
      {
        type: "p",
        text: "Depuis l'Agriturismo La Mora, le sanctuaire est à 6,8 km, environ 15 minutes en voiture selon Google Maps. Le centre historique d'Assise est en grande partie en zone à trafic limité (ZTL), avec des règles qui changent selon la saison : mieux vaut laisser la voiture dans l'un des parkings indiqués par le site touristique officiel de la commune et continuer à pied.",
      },
      {
        type: "list",
        items: [
          "Parkings payants : Giovanni Paolo II, Mojano, Porta Nuova et Matteotti.",
          "Parkings gratuits : zone du cimetière (via Egidio Albornoz), piazza Caduti Forze dell'Ordine et Porta San Giacomo.",
          "Les lignes de bus urbaines A, B et C desservent aussi la ville.",
        ],
      },
      { type: "h2", text: "Que voir près du Sanctuaire du Dépouillement ?" },
      {
        type: "p",
        text: "Le sanctuaire est au cœur du centre historique, d'où l'on rejoint à pied les principaux sites d'Assise :",
      },
      {
        type: "list",
        items: [
          "la basilique Saint-François : 1,0 km, environ 13 minutes à pied par la via San Francesco selon Google Maps ;",
          "la piazza del Comune, avec le temple de Minerve et la Torre del Popolo ;",
          "la cathédrale San Rufino, qui reçut de Santa Maria Maggiore le titre de cathédrale en 1035 ;",
          "la Rocca Maggiore, la forteresse qui domine la ville.",
        ],
      },
      { type: "h2", text: "Comment combiner la visite avec la basilique Saint-François ?" },
      {
        type: "p",
        text: "Un itinéraire simple, entièrement à pied : le matin au Sanctuaire du Dépouillement (les dimanches et jours fériés, les visites du tombeau sont suspendues de 10h30 à 12h30), puis la via San Francesco jusqu'à la basilique Saint-François, où Carlo Acutis a été béatifié en 2020. L'après-midi, remontez vers la piazza del Comune et la cathédrale San Rufino.",
      },
      {
        type: "image",
        src: LAMORA_BASILICA,
        alt: "La basilique Saint-François d'Assise par une journée ensoleillée, avec la pelouse devant",
        caption: "La basilique Saint-François, à environ 1 km à pied du sanctuaire.",
      },
      {
        type: "p",
        text: "En 2026, Assise célèbre aussi le huitième centenaire de la mort de saint François (1226–2026). Et à 2,1 km de La Mora, dans la plaine au pied de la ville, se trouve la basilique Sainte-Marie-des-Anges avec la Portioncule : nous lui consacrons un guide.",
      },
      { type: "h2", text: "Où dormir près du tombeau de Carlo Acutis ?" },
      {
        type: "p",
        text: "L'Agriturismo La Mora, via Fonte Citerna 7, est à 6,8 km du Sanctuaire du Dépouillement (environ 15 minutes en voiture) et à 7,5 km de la basilique Saint-François. Ses cinq appartements indépendants disposent d'une cuisine équipée, du Wi-Fi et de la climatisation, avec parking gratuit dans la propriété : une base tranquille à la campagne, pratique pour les familles et les petits groupes.",
      },
      {
        type: "image",
        src: LAMORA_ACQUARIO,
        alt: "Chambre de l'appartement Acquario à l'Agriturismo La Mora, avec un lit double et des lits superposés",
        caption: "Une chambre de l'appartement Acquario.",
      },
      {
        type: "p",
        text: "Pour les groupes plus nombreux, l'appartement Bilancia accueille jusqu'à 8 personnes ; Gemelli et Sagittario, avec jardin privé clôturé, accueillent aussi les voyageurs avec leurs animaux.",
      },
      {
        type: "links",
        heading: "Organisez votre visite",
        items: [
          { label: "Les appartements de La Mora", href: "/alloggi/" },
          { label: "Les offres en réservation directe", href: "/offerte/" },
          { label: "Les environs de La Mora", href: "/territorio/" },
          { label: "Huitième centenaire de saint François", href: "/ottavo-centenario-san-francesco/" },
          { label: "Guide de la basilique Sainte-Marie-des-Anges", href: "/blog/basilica-santa-maria-degli-angeli/" },
          { label: "Site officiel du Sanctuaire", href: SANTUARIO_URL },
        ],
      },
    ],
    faq: {
      heading: "Carlo Acutis à Assise : questions fréquentes",
      items: [
        { q: "Où est enterré Carlo Acutis ?", a: "À Assise, dans l'église Santa Maria Maggiore — Sanctuaire du Dépouillement, piazza del Vescovado. Son corps y repose depuis le 6 avril 2019." },
        { q: "Quand Carlo Acutis a-t-il été canonisé ?", a: "Le 7 septembre 2025, par le pape Léon XIV, place Saint-Pierre à Rome, avec Pier Giorgio Frassati. Il avait été béatifié à Assise le 10 octobre 2020." },
        { q: "Quand fête-t-on saint Carlo Acutis ?", a: "Sa mémoire liturgique est le 12 octobre, jour de sa mort en 2006." },
        { q: "Peut-on visiter le tombeau le dimanche ?", a: "Oui, mais les dimanches et jours fériés, les visites du sanctuaire et du tombeau sont suspendues de 10h30 à 12h30, pendant la messe de 11h00." },
        { q: "Quelle distance entre le sanctuaire et la basilique Saint-François ?", a: "Environ 1 km, soit 13 minutes à pied par la via San Francesco selon Google Maps." },
        { q: "Où se garer pour visiter le sanctuaire ?", a: "Le centre historique est en grande partie en ZTL : utilisez les parkings indiqués par la commune, payants (Giovanni Paolo II, Mojano, Porta Nuova, Matteotti) ou gratuits (zone du cimetière, piazza Caduti Forze dell'Ordine, Porta San Giacomo), puis continuez à pied." },
        { q: "À quelle distance l'Agriturismo La Mora se trouve-t-il du sanctuaire ?", a: "À 6,8 km, environ 15 minutes en voiture selon Google Maps." },
      ],
    },
    finalCtaHeading: "Un pèlerinage à Assise, avec une maison à la campagne où rentrer le soir.",
    finalCtaBody: "Choisissez l'appartement qui vous convient, pour vous, votre famille ou votre groupe.",
    finalCtaLabel: "Découvrir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "carlo-acutis-assisi",
    category: "Spiritualität",
    title: "Carlo Acutis in Assisi: Grab und Heiligtum – ein Leitfaden",
    excerpt: "Wer der heilige Carlo Acutis war, wo er in Assisi ruht und wie man das Heiligtum der Entkleidung besucht: Öffnungszeiten, Parken, Sehenswertes und Unterkunft, 6,8 km entfernt.",
    metaDescription: "Der heilige Carlo Acutis in Assisi: sein Grab im Heiligtum der Entkleidung, Öffnungszeiten, Anreise, Sehenswertes und Unterkunft 6,8 km vom Heiligtum.",
    ...cover(SPOGLIAZIONE_FACCIATA_PHOTO, "de"),
    imagePosition: "50% 20%",
    datePublished: "2026-10-06",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "Grab", value: "Santuario della Spogliazione (Santa Maria Maggiore), Assisi" },
        { label: "Heiligsprechung", value: "7. September 2025, Petersplatz" },
        { label: "Gedenktag", value: "12. Oktober" },
        { label: "Sonn- und Feiertage", value: "keine Besuche 10:30–12:30" },
        { label: "Zu Fuß von der Basilika", value: "1,0 km · ca. 13 Min." },
        { label: "Ab La Mora", value: "6,8 km · ca. 15 Min. mit dem Auto" },
      ],
    },
    intro:
      "Seit dem 6. April 2019 ruht der Leichnam von Carlo Acutis in Assisi, in der Kirche Santa Maria Maggiore, heute Santuario della Spogliazione (Heiligtum der Entkleidung). Seit seiner Heiligsprechung am 7. September 2025 ist der heilige Carlo Acutis Ziel vieler Pilger, vor allem junger Menschen. Dieser Leitfaden fasst das Wesentliche zu seinem Leben und die praktischen Informationen für den Besuch des Heiligtums zusammen – 6,8 km vom Agriturismo La Mora entfernt.",
    introCtaHeading: "Sie besuchen Assisi wegen des heiligen Carlo Acutis? Übernachten Sie auf dem Land, 6,8 km vom Heiligtum.",
    introCtaLabel: "Buchen",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Wer war Carlo Acutis?" },
      {
        type: "p",
        text: "Carlo Acutis wurde am 3. Mai 1991 in London geboren und lebte in Mailand, verbrachte aber lange Zeiten in Assisi, wo er – so das Heiligtum – „die Spiritualität des heiligen Franziskus atmete“. Die tägliche Messe war für ihn ein fester Termin, auch in den Kirchen von Assisi – darunter Santa Maria Maggiore, wo er heute ruht.",
      },
      {
        type: "p",
        text: "An einer plötzlichen, schweren Leukämie erkrankt, nahm er sie laut der offiziellen Biografie des Heiligtums „als Prüfung an, die er für den Papst und die Kirche aufopferte“. Er starb am 12. Oktober 2006 im Alter von 15 Jahren.",
      },
      {
        type: "facts",
        items: [
          { label: "Geboren", value: "London, 3. Mai 1991" },
          { label: "Gestorben", value: "12. Oktober 2006" },
          { label: "Seligsprechung", value: "Assisi, 10. Oktober 2020" },
          { label: "Heiligsprechung", value: "Rom, 7. September 2025" },
          { label: "Grab", value: "Assisi, seit 6. April 2019" },
          { label: "Gedenktag", value: "12. Oktober" },
        ],
      },
      { type: "h2", text: "Wann wurde Carlo Acutis heiliggesprochen?" },
      {
        type: "p",
        text: "Carlo Acutis wurde am 10. Oktober 2020 in der Basilika San Francesco in Assisi seliggesprochen, in einer Feier unter dem Vorsitz von Kardinal Agostino Vallini. Seine Heiligsprechung war ursprünglich für den 27. April 2025 während des Jubiläums der Jugendlichen geplant und wurde nach dem Tod von Papst Franziskus verschoben: Papst Leo XIV. sprach ihn am 7. September 2025 auf dem Petersplatz heilig, zusammen mit Pier Giorgio Frassati.",
      },
      {
        type: "p",
        text: "Der liturgische Gedenktag des heiligen Carlo Acutis ist der 12. Oktober, sein Todestag. 2026 jährt sich sein Tod zum zwanzigsten Mal: Zum Jahrestag hat das Heiligtum vom 9. bis 12. Oktober Feierlichkeiten organisiert.",
      },
      { type: "h2", text: "Wo befindet sich das Grab von Carlo Acutis?" },
      {
        type: "p",
        text: "Das Grab des heiligen Carlo Acutis befindet sich in der Kirche Santa Maria Maggiore an der Piazza del Vescovado in der Altstadt von Assisi: Sie ist das Heiligtum der Entkleidung. Sein Leichnam ruht hier seit dem 6. April 2019, das Grabmonument steht im rechten Seitenschiff.",
      },
      credited(SPOGLIAZIONE_VEDUTA_PHOTO, "de"),
      { type: "h2", text: "Warum heißt es Heiligtum der Entkleidung?" },
      {
        type: "p",
        text: "Der Name erinnert an eine der bekanntesten Episoden im Leben des heiligen Franziskus: Der junge Franziskus legte vor seinem Vater und Bischof Guido seine Kleider ab, und der Bischof bedeckte ihn mit seinem eigenen Mantel. Die Überlieferung verortet die Szene im Bischofspalast neben der Kirche. Das Heiligtum hält die Erinnerung an diese Geste wach und bietet Führungen durch den alten Bischofspalast und zur „Tür des Franziskus“ an.",
      },
      {
        type: "p",
        text: "Die Kirche hat eine lange Geschichte. Der Überlieferung nach war sie die erste Kathedrale von Assisi, im 4. Jahrhundert über einem römischen Haus errichtet, der Domus des Properz; 1035 ging der Titel der Kathedrale an San Rufino über. In die Fensterrose ist die Jahreszahl 1163 eingemeißelt, die Apsis wurde 1216 neu errichtet, und die Fassade erhielt 1938 ihr heutiges Aussehen.",
      },
      credited(SPOGLIAZIONE_ROSONE_PHOTO, "de"),
      { type: "h2", text: "Wie kann man das Grab von Carlo Acutis besuchen?" },
      {
        type: "p",
        text: "Das Heiligtum ist täglich geöffnet. Die zum Zeitpunkt dieses Leitfadens auf der offiziellen Website veröffentlichten Öffnungszeiten:",
      },
      {
        type: "list",
        items: [
          "1. November bis 31. März: 8:00 bis 19:00 Uhr;",
          "1. April bis 30. Oktober: montags und donnerstags 8:00 bis 19:00 Uhr, an den übrigen Tagen 7:00 bis 19:00 Uhr;",
          "Sonn- und Feiertage: Von 10:30 bis 12:30 Uhr sind Besuche des Heiligtums und des Grabes wegen der Messe um 11:00 Uhr ausgesetzt (wer teilnehmen möchte, muss bis 10:30 Uhr in der Kirche sein).",
        ],
      },
      {
        type: "p",
        text: "Die Messe ist werktags um 18:00 Uhr, davor um 17:30 Uhr der Rosenkranz, sonn- und feiertags um 9:30 und 11:00 Uhr. Das Heiligtum bietet außerdem Führungen an: durch die Domus des Properz in der Krypta von 12:30 bis 13:30 Uhr (während der Gottesdienste ist die Krypta nicht zugänglich) und durch den alten Bischofspalast mit der Tür des Franziskus, für die eine Reservierung empfohlen wird. Zeiten und Gottesdienste können sich ändern: Prüfen Sie vor der Abfahrt die offizielle Website des Heiligtums.",
      },
      { type: "h2", text: "Wie kommt man zum Heiligtum der Entkleidung?" },
      {
        type: "p",
        text: "Vom Agriturismo La Mora ist das Heiligtum 6,8 km entfernt, laut Google Maps rund 15 Minuten mit dem Auto. Die Altstadt von Assisi ist großenteils verkehrsberuhigte Zone (ZTL) mit Regeln, die je nach Saison wechseln: Am besten lässt man das Auto auf einem der Parkplätze, die das offizielle Tourismusportal der Stadt nennt, und geht zu Fuß weiter.",
      },
      {
        type: "list",
        items: [
          "Kostenpflichtige Parkplätze: Giovanni Paolo II, Mojano, Porta Nuova und Matteotti.",
          "Kostenlose Parkplätze: Friedhofsbereich (Via Egidio Albornoz), Piazza Caduti Forze dell'Ordine und Porta San Giacomo.",
          "In der Stadt verkehren außerdem die Stadtbuslinien A, B und C.",
        ],
      },
      { type: "h2", text: "Was gibt es in der Nähe des Heiligtums der Entkleidung zu sehen?" },
      {
        type: "p",
        text: "Das Heiligtum liegt mitten in der Altstadt, von hier aus sind die wichtigsten Sehenswürdigkeiten Assisis zu Fuß erreichbar:",
      },
      {
        type: "list",
        items: [
          "die Basilika San Francesco: 1,0 km, laut Google Maps rund 13 Minuten zu Fuß über die Via San Francesco;",
          "die Piazza del Comune mit dem Minerva-Tempel und dem Torre del Popolo;",
          "die Kathedrale San Rufino, die 1035 von Santa Maria Maggiore den Titel der Kathedrale übernahm;",
          "die Rocca Maggiore, die Festung über der Stadt.",
        ],
      },
      { type: "h2", text: "Wie lässt sich der Besuch mit der Basilika San Francesco verbinden?" },
      {
        type: "p",
        text: "Eine einfache Route, ganz zu Fuß: morgens das Heiligtum der Entkleidung (an Sonn- und Feiertagen sind Besuche am Grab von 10:30 bis 12:30 Uhr ausgesetzt), dann über die Via San Francesco zur Basilika San Francesco, wo Carlo Acutis 2020 seliggesprochen wurde. Am Nachmittag geht es hinauf zur Piazza del Comune und zur Kathedrale San Rufino.",
      },
      {
        type: "image",
        src: LAMORA_BASILICA,
        alt: "Die Basilika San Francesco in Assisi an einem sonnigen Tag, mit der Wiese davor",
        caption: "Die Basilika San Francesco, rund 1 km zu Fuß vom Heiligtum.",
      },
      {
        type: "p",
        text: "2026 feiert Assisi außerdem den 800. Todestag des heiligen Franziskus (1226–2026). Und 2,1 km von La Mora entfernt, in der Ebene unterhalb der Stadt, steht die Basilika Santa Maria degli Angeli mit der Portiuncula: Ihr widmen wir einen eigenen Leitfaden.",
      },
      { type: "h2", text: "Wo übernachten in der Nähe des Grabes von Carlo Acutis?" },
      {
        type: "p",
        text: "Das Agriturismo La Mora in der Via Fonte Citerna 7 liegt 6,8 km vom Heiligtum der Entkleidung (rund 15 Minuten mit dem Auto) und 7,5 km von der Basilika San Francesco entfernt. Die fünf unabhängigen Ferienwohnungen haben eine voll ausgestattete Küche, WLAN und Klimaanlage, dazu kostenlose Parkplätze auf dem Gelände: ein ruhiger Ausgangspunkt auf dem Land, ideal für Familien und kleine Gruppen.",
      },
      {
        type: "image",
        src: LAMORA_ACQUARIO,
        alt: "Schlafzimmer der Ferienwohnung Acquario im Agriturismo La Mora, mit Doppelbett und Etagenbett",
        caption: "Ein Schlafzimmer der Ferienwohnung Acquario.",
      },
      {
        type: "p",
        text: "Für größere Gruppen bietet die Ferienwohnung Bilancia Platz für bis zu 8 Personen; Gemelli und Sagittario mit privatem, eingezäuntem Garten nehmen auch Gäste mit Haustieren auf.",
      },
      {
        type: "links",
        heading: "Planen Sie Ihren Besuch",
        items: [
          { label: "Die Ferienwohnungen von La Mora", href: "/alloggi/" },
          { label: "Angebote bei Direktbuchung", href: "/offerte/" },
          { label: "Die Umgebung von La Mora", href: "/territorio/" },
          { label: "800 Jahre heiliger Franziskus", href: "/ottavo-centenario-san-francesco/" },
          { label: "Leitfaden zur Basilika Santa Maria degli Angeli", href: "/blog/basilica-santa-maria-degli-angeli/" },
          { label: "Offizielle Website des Heiligtums", href: SANTUARIO_URL },
        ],
      },
    ],
    faq: {
      heading: "Carlo Acutis in Assisi: häufige Fragen",
      items: [
        { q: "Wo ist Carlo Acutis begraben?", a: "In Assisi, in der Kirche Santa Maria Maggiore – Heiligtum der Entkleidung, an der Piazza del Vescovado. Sein Leichnam ruht dort seit dem 6. April 2019." },
        { q: "Wann wurde Carlo Acutis heiliggesprochen?", a: "Am 7. September 2025 von Papst Leo XIV. auf dem Petersplatz in Rom, zusammen mit Pier Giorgio Frassati. Seliggesprochen worden war er am 10. Oktober 2020 in Assisi." },
        { q: "Wann ist der Gedenktag des heiligen Carlo Acutis?", a: "Sein liturgischer Gedenktag ist der 12. Oktober, sein Todestag im Jahr 2006." },
        { q: "Kann man das Grab sonntags besuchen?", a: "Ja, aber an Sonn- und Feiertagen sind Besuche des Heiligtums und des Grabes von 10:30 bis 12:30 Uhr während der Messe um 11:00 Uhr ausgesetzt." },
        { q: "Wie weit ist das Heiligtum von der Basilika San Francesco entfernt?", a: "Rund 1 km, laut Google Maps 13 Minuten zu Fuß über die Via San Francesco." },
        { q: "Wo parkt man für den Besuch des Heiligtums?", a: "Die Altstadt ist großenteils ZTL: Nutzen Sie die von der Stadt genannten Parkplätze, kostenpflichtig (Giovanni Paolo II, Mojano, Porta Nuova, Matteotti) oder kostenlos (Friedhofsbereich, Piazza Caduti Forze dell'Ordine, Porta San Giacomo), und gehen Sie zu Fuß weiter." },
        { q: "Wie weit ist das Agriturismo La Mora vom Heiligtum entfernt?", a: "6,8 km, laut Google Maps rund 15 Minuten mit dem Auto." },
      ],
    },
    finalCtaHeading: "Eine Pilgerreise nach Assisi – mit einem Zuhause auf dem Land für den Abend.",
    finalCtaBody: "Wählen Sie die passende Ferienwohnung für sich, Ihre Familie oder Ihre Gruppe.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};

const ITALIA_GUBBIO_URL = "https://www.italia.it/it/umbria/cosa-fare/natale-a-gubbio-albero-di-natale-e-mercatini";
const UMBRIA_TOURISM_URL = "https://www.umbriatourism.it/";
const VISIT_ASSISI_URL = "https://www.visit-assisi.it/";

const NATALE_UMBRIA_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "mercatini-di-natale-umbria",
    category: "Eventi",
    title: "Mercatini di Natale in Umbria: Perugia, Gubbio e il Trasimeno",
    excerpt: "Mercatini e luci di Natale in Umbria: Perugia, l'albero di Gubbio, l'albero sull'acqua del Trasimeno e il presepe vivente di Rasiglia, con date e distanze da Assisi.",
    metaDescription: "Mercatini di Natale in Umbria: Perugia, Gubbio e il suo albero da record, l'albero sul lago Trasimeno e il presepe di Rasiglia. Date, distanze e consigli.",
    ...cover(GUBBIO_NATALE_PIAZZA_PHOTO, "it"),
    datePublished: "2026-10-06",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Periodo", value: "da fine novembre all'Epifania" },
        { label: "Albero sul Trasimeno", value: "5 dicembre 2026 – 6 gennaio 2027" },
        { label: "Perugia", value: "21,0 km da La Mora · circa 23 min" },
        { label: "Gubbio", value: "54,7 km · circa 42 min" },
        { label: "Castiglione del Lago", value: "64,3 km · circa 50 min" },
        { label: "Rasiglia", value: "36,5 km · circa 37 min" },
      ],
    },
    intro:
      "In Umbria il Natale ha tanti indirizzi: i mercatini nel centro di Perugia, l'albero di luci di Gubbio, l'albero disegnato sull'acqua del Trasimeno, il presepe vivente di Rasiglia. Da Agriturismo La Mora, nella campagna di Assisi, si raggiungono tutti in giornata. Ecco cosa vedere, quando e a che distanza (in auto, secondo Google Maps). Non tutte le date 2026 sono già state annunciate: dove mancano le conferme ti indichiamo il sito ufficiale da controllare.",
    introCtaHeading: "Mercatini, alberi di luci e presepi: una base in campagna per vederli tutti.",
    introCtaLabel: "Prenota",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Quando ci sono i mercatini di Natale in Umbria?" },
      {
        type: "p",
        text: "In genere da fine novembre all'Epifania, ma ogni città ha il suo calendario. A Perugia l'edizione 2025/26 è andata dal 29 novembre al 6 gennaio; a Gubbio i mercatini aprono da fine novembre e l'albero si accende per tradizione il 7 dicembre; a Castiglione del Lago «Luci sul Trasimeno» 2026/27 è in programma dal 5 dicembre 2026 al 6 gennaio 2027. Per Perugia e Gubbio le date 2026 non erano ancora state pubblicate quando abbiamo scritto questa guida: controllale sui siti ufficiali prima di partire.",
      },
      { type: "h2", text: "Cosa vedere al Natale di Perugia?" },
      {
        type: "p",
        text: "Nell'edizione 2025/26, «Perugia, un Natale insieme», il centro storico si è riempito di luci e di installazioni d'artista, anche di Mimmo Paladino. I mercatini, con artigianato, specialità gastronomiche e idee regalo, erano lungo corso Vannucci e tra corso Vannucci e la Rocca Paolina; al Cassero e sulla terrazza dell'ex Mercato Coperto c'erano videomapping e scenografie luminose, con gli alberi di piazza della Repubblica e piazza Matteotti, spettacoli e attività per bambini.",
      },
      {
        type: "p",
        text: "Il programma cambia ogni anno: per l'edizione 2026 controlla il portale turistico ufficiale della Regione, Umbria Tourism. Perugia è a 21,0 km da La Mora, circa 23 minuti in auto. Se vieni a novembre, dal 13 al 22 novembre 2026 in città c'è anche Eurochocolate: ne parliamo in una guida dedicata.",
      },
      { type: "h2", text: "Dove si trova l'albero di Natale più grande del mondo?" },
      {
        type: "p",
        text: "A Gubbio. Dal 1981, sulle pendici del Monte Ingino, sopra la città, oltre 300 luci disegnano un albero alto 750 metri, con una base di 450 metri; nel 1991 l'albero di Natale di Gubbio è entrato nel Guinness dei primati come il più grande del mondo. Per tradizione si accende il 7 dicembre, vigilia dell'Immacolata, e resta acceso ogni sera fino a tarda notte: nell'edizione 2025/26, secondo Umbria Tourism, dal 7 dicembre all'11 gennaio, dalle 17:00.",
      },
      {
        type: "p",
        text: "Da fine novembre la grande Piazza dei Quaranta Martiri ospita i mercatini di Natale, con bancarelle in stile tirolese: artigianato, decorazioni e specialità gastronomiche. Gubbio è a 54,7 km da La Mora, circa 42 minuti in auto lungo la SS318.",
      },
      { type: "h2", text: "Com'è l'albero di Natale sul lago Trasimeno?" },
      {
        type: "p",
        text: "A Castiglione del Lago, dal 2019, le luci disegnano un albero di Natale sull'acqua del Trasimeno: 1.080 metri di lunghezza e 50 di larghezza, con 2.400 luci perimetrali alimentate da energia rinnovabile. È il cuore di «Luci sul Trasimeno», che nel 2026/27 si visita tutti i giorni dal 5 dicembre al 6 gennaio, dalle 17:00 alle 23:00. Secondo gli organizzatori, nelle sue proporzioni l'albero si vede solo dal «Percorso dell'Albero», a pagamento, sotto le mura della Rocca del Leone.",
      },
      credited(ALBERO_TRASIMENO_PHOTO, "it"),
      {
        type: "p",
        text: "Biglietti, parcheggi e cosa c'è intorno: trovi tutto nella nostra guida all'albero di Natale sul lago Trasimeno. Castiglione del Lago è a 64,3 km da La Mora, circa 50 minuti.",
      },
      { type: "h2", text: "Dove vedere un presepe vivente in Umbria?" },
      {
        type: "p",
        text: "A Rasiglia, il borgo dei ruscelli in comune di Foligno, il presepe vivente «Rasiglia, Paese presepe» si svolge il 26 dicembre e il 6 gennaio. Rasiglia è a 36,5 km da La Mora, circa 37 minuti: ti raccontiamo come visitarla nella nostra guida dedicata.",
      },
      {
        type: "p",
        text: "Per il Natale ad Assisi, a 6,8 km da La Mora, il calendario degli eventi è sul portale turistico ufficiale del Comune, visit-assisi.it.",
      },
      { type: "h2", text: "Come organizzare un weekend tra mercatini e luci di Natale?" },
      {
        type: "list",
        items: [
          "Venerdì sera: Perugia, a 23 minuti, per le luci e i mercatini del centro.",
          "Sabato: Gubbio, con i mercatini di Piazza dei Quaranta Martiri e, quando fa buio, l'albero acceso sul Monte Ingino.",
          "Domenica: Castiglione del Lago per l'albero sul Trasimeno, visitabile dalle 17:00.",
          "Se sei in Umbria il 26 dicembre o il 6 gennaio: il presepe vivente di Rasiglia.",
        ],
      },
      { type: "h2", text: "Dove dormire per i mercatini di Natale in Umbria?" },
      {
        type: "p",
        text: "Agriturismo La Mora è in via Fonte Citerna 7, nella campagna di Assisi: Perugia è a 21,0 km, Rasiglia a 36,5 km, Gubbio a 54,7 km e Castiglione del Lago a 64,3 km. I cinque appartamenti indipendenti hanno cucina attrezzata, Wi-Fi e aria condizionata, e il parcheggio è gratuito all'interno della struttura: la sera, dopo i mercatini, si torna in campagna.",
      },
      {
        type: "image",
        src: LAMORA_SALOTTO_GEMELLI,
        alt: "Soggiorno con angolo cottura dell'appartamento Gemelli di Agriturismo La Mora: divano, tavolo con tovaglia a quadri e finestra sul verde",
        caption: "Il soggiorno con angolo cottura dell'appartamento Gemelli.",
      },
      {
        type: "links",
        heading: "Organizza il tuo Natale in Umbria",
        items: [
          { label: "Gli appartamenti di La Mora", href: "/alloggi/" },
          { label: "Le offerte per chi prenota diretto", href: "/offerte/" },
          { label: "Il territorio intorno a La Mora", href: "/territorio/" },
          { label: "Guida all'albero di Natale sul lago Trasimeno", href: "/blog/albero-di-natale-lago-trasimeno/" },
          { label: "Guida a Rasiglia, la piccola Venezia dell'Umbria", href: "/blog/rasiglia-piccola-venezia-umbria/" },
          { label: "Eurochocolate 2026 a Perugia", href: "/blog/eurochocolate-2026-dove-dormire/" },
          { label: "Natale a Gubbio su italia.it", href: ITALIA_GUBBIO_URL },
          { label: "Umbria Tourism, portale ufficiale della Regione", href: UMBRIA_TOURISM_URL },
          { label: "Eventi ad Assisi su visit-assisi.it", href: VISIT_ASSISI_URL },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti sui mercatini di Natale in Umbria",
      items: [
        { q: "Quando iniziano i mercatini di Natale in Umbria?", a: "In genere a fine novembre: a Gubbio i mercatini di Piazza dei Quaranta Martiri aprono da fine novembre, a Perugia l'edizione 2025/26 è iniziata il 29 novembre. Le date cambiano ogni anno: controlla i siti ufficiali." },
        { q: "Dove si trova l'albero di Natale più grande del mondo?", a: "A Gubbio, sulle pendici del Monte Ingino: alto 750 metri, con una base di 450, è nel Guinness dei primati dal 1991. Si accende per tradizione il 7 dicembre." },
        { q: "L'albero sul lago Trasimeno è lo stesso di Gubbio?", a: "No. Quello del Trasimeno è disegnato con le luci sull'acqua del lago a Castiglione del Lago, dal 2019; nel 2026/27 si visita dal 5 dicembre 2026 al 6 gennaio 2027." },
        { q: "Quando c'è il presepe vivente di Rasiglia?", a: "«Rasiglia, Paese presepe» si svolge il 26 dicembre e il 6 gennaio." },
        { q: "Quanto dista Gubbio da Assisi?", a: "Da Agriturismo La Mora, nella campagna di Assisi, Piazza dei Quaranta Martiri a Gubbio è a 54,7 km, circa 42 minuti in auto secondo Google Maps." },
        { q: "Dove dormire per vedere i mercatini di Natale in Umbria?", a: "Agriturismo La Mora, vicino ad Assisi, è a 21,0 km da Perugia, 36,5 km da Rasiglia, 54,7 km da Gubbio e 64,3 km da Castiglione del Lago: cinque appartamenti indipendenti con cucina e parcheggio gratuito." },
      ],
    },
    finalCtaHeading: "Le luci di Natale dell'Umbria, e la sera una casa in campagna.",
    finalCtaBody: "Scegli l'appartamento per il tuo weekend di mercatini.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "mercatini-di-natale-umbria",
    category: "Events",
    title: "Christmas markets in Umbria: Perugia, Gubbio and Lake Trasimeno",
    excerpt: "Christmas markets and lights in Umbria: Perugia, the Gubbio tree, the tree drawn on Lake Trasimeno and the living nativity of Rasiglia, with dates and distances from Assisi.",
    metaDescription: "Christmas markets in Umbria: Perugia, Gubbio and its record-breaking tree, the tree on Lake Trasimeno and Rasiglia's nativity. Dates, distances and tips.",
    ...cover(GUBBIO_NATALE_PIAZZA_PHOTO, "en"),
    datePublished: "2026-10-06",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Season", value: "late November to Epiphany" },
        { label: "Tree on Lake Trasimeno", value: "5 December 2026 – 6 January 2027" },
        { label: "Perugia", value: "21.0 km from La Mora · about 23 min" },
        { label: "Gubbio", value: "54.7 km · about 42 min" },
        { label: "Castiglione del Lago", value: "64.3 km · about 50 min" },
        { label: "Rasiglia", value: "36.5 km · about 37 min" },
      ],
    },
    intro:
      "Christmas in Umbria has many addresses: the markets in the heart of Perugia, the Gubbio tree of lights, the tree drawn on the water of Lake Trasimeno, the living nativity of Rasiglia. From Agriturismo La Mora, in the countryside outside Assisi, each is an easy day trip. Here is what to see, when, and how far it is (by car, according to Google Maps). Not every 2026 date has been announced yet: where there is no confirmation, we point you to the official website to check.",
    introCtaHeading: "Markets, trees of light and nativity scenes: one countryside base for all of them.",
    introCtaLabel: "Book",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "When are the Christmas markets in Umbria?" },
      {
        type: "p",
        text: "Usually from late November to Epiphany, but every town has its own calendar. In Perugia the 2025/26 edition ran from 29 November to 6 January; in Gubbio the markets open from late November and the tree is traditionally lit on 7 December; in Castiglione del Lago, “Luci sul Trasimeno” 2026/27 is scheduled from 5 December 2026 to 6 January 2027. For Perugia and Gubbio the 2026 dates had not yet been published when we wrote this guide: check the official websites before you go.",
      },
      { type: "h2", text: "What can you see at Christmas in Perugia?" },
      {
        type: "p",
        text: "In the 2025/26 edition, “Perugia, un Natale insieme”, the historic centre was filled with lights and artists' installations, including works by Mimmo Paladino. The markets, with crafts, food specialities and gift ideas, ran along Corso Vannucci and between Corso Vannucci and the Rocca Paolina; the Cassero and the terrace of the former Mercato Coperto hosted videomapping and light displays, alongside the trees in Piazza della Repubblica and Piazza Matteotti, shows and children's activities.",
      },
      {
        type: "p",
        text: "The programme changes every year: for the 2026 edition, check the region's official tourism website, Umbria Tourism. Perugia is 21.0 km from La Mora, about 23 minutes by car. If you come in November, Eurochocolate is also on in the city from 13 to 22 November 2026: we cover it in a dedicated guide.",
      },
      { type: "h2", text: "Where is the world's largest Christmas tree?" },
      {
        type: "p",
        text: "In Gubbio. Since 1981, on the slopes of Monte Ingino above the town, more than 300 lights have drawn a tree 750 metres high with a 450-metre base; in 1991 the Gubbio Christmas tree entered the Guinness World Records as the largest in the world. It is traditionally lit on 7 December, the eve of the Immaculate Conception, and stays lit every evening until late at night: in the 2025/26 edition, according to Umbria Tourism, from 7 December to 11 January, from 17:00.",
      },
      {
        type: "p",
        text: "From late November the large Piazza dei Quaranta Martiri hosts the Christmas markets, with Tyrolean-style stalls selling crafts, decorations and food specialities. Gubbio is 54.7 km from La Mora, about 42 minutes by car along the SS318.",
      },
      { type: "h2", text: "What is the Christmas tree on Lake Trasimeno like?" },
      {
        type: "p",
        text: "At Castiglione del Lago, since 2019, lights have drawn a Christmas tree on the water of Lake Trasimeno: 1,080 metres long and 50 metres wide, with 2,400 perimeter lights powered by renewable energy. It is the heart of “Luci sul Trasimeno”, which in 2026/27 is open every day from 5 December to 6 January, from 17:00 to 23:00. According to the organisers, the tree can only be seen in its proper proportions from the paid “Percorso dell'Albero” (Tree Path), below the walls of the Rocca del Leone.",
      },
      credited(ALBERO_TRASIMENO_PHOTO, "en"),
      {
        type: "p",
        text: "Tickets, parking and what else is on: it's all in our guide to the Christmas tree on Lake Trasimeno. Castiglione del Lago is 64.3 km from La Mora, about 50 minutes.",
      },
      { type: "h2", text: "Where can you see a living nativity in Umbria?" },
      {
        type: "p",
        text: "In Rasiglia, the “village of streams” in the municipality of Foligno, the living nativity “Rasiglia, Paese presepe” takes place on 26 December and 6 January. Rasiglia is 36.5 km from La Mora, about 37 minutes: our dedicated guide explains how to visit.",
      },
      {
        type: "p",
        text: "For Christmas in Assisi, 6.8 km from La Mora, the events calendar is on the town's official tourism website, visit-assisi.it.",
      },
      { type: "h2", text: "How to plan a weekend of Christmas markets and lights?" },
      {
        type: "list",
        items: [
          "Friday evening: Perugia, 23 minutes away, for the lights and the markets in the centre.",
          "Saturday: Gubbio, with the markets in Piazza dei Quaranta Martiri and, once it's dark, the tree lit up on Monte Ingino.",
          "Sunday: Castiglione del Lago for the tree on Lake Trasimeno, open from 17:00.",
          "If you're in Umbria on 26 December or 6 January: the living nativity of Rasiglia.",
        ],
      },
      { type: "h2", text: "Where to stay for the Christmas markets in Umbria?" },
      {
        type: "p",
        text: "Agriturismo La Mora is at Via Fonte Citerna 7, in the countryside outside Assisi: Perugia is 21.0 km away, Rasiglia 36.5 km, Gubbio 54.7 km and Castiglione del Lago 64.3 km. Its five independent apartments have a fully equipped kitchen, Wi-Fi and air conditioning, with free parking on site: after the markets, you come back to the countryside for the night.",
      },
      {
        type: "image",
        src: LAMORA_SALOTTO_GEMELLI,
        alt: "Living room with kitchenette in the Gemelli apartment at Agriturismo La Mora: sofa, table with a checked tablecloth and a window onto the greenery",
        caption: "The living room and kitchenette of the Gemelli apartment.",
      },
      {
        type: "links",
        heading: "Plan your Christmas in Umbria",
        items: [
          { label: "La Mora's apartments", href: "/alloggi/" },
          { label: "Offers for direct bookings", href: "/offerte/" },
          { label: "The area around La Mora", href: "/territorio/" },
          { label: "Guide to the Christmas tree on Lake Trasimeno", href: "/blog/albero-di-natale-lago-trasimeno/" },
          { label: "Guide to Rasiglia, the little Venice of Umbria", href: "/blog/rasiglia-piccola-venezia-umbria/" },
          { label: "Eurochocolate 2026 in Perugia", href: "/blog/eurochocolate-2026-dove-dormire/" },
          { label: "Christmas in Gubbio on italia.it", href: ITALIA_GUBBIO_URL },
          { label: "Umbria Tourism, the region's official website", href: UMBRIA_TOURISM_URL },
          { label: "Events in Assisi on visit-assisi.it", href: VISIT_ASSISI_URL },
        ],
      },
    ],
    faq: {
      heading: "Christmas markets in Umbria: frequently asked questions",
      items: [
        { q: "When do the Christmas markets in Umbria start?", a: "Usually in late November: in Gubbio the markets in Piazza dei Quaranta Martiri open from late November, and in Perugia the 2025/26 edition began on 29 November. Dates change every year, so check the official websites." },
        { q: "Where is the world's largest Christmas tree?", a: "In Gubbio, on the slopes of Monte Ingino: 750 metres high with a 450-metre base, it has been in the Guinness World Records since 1991. It is traditionally lit on 7 December." },
        { q: "Is the tree on Lake Trasimeno the same as the one in Gubbio?", a: "No. The Trasimeno tree is drawn in lights on the water of the lake at Castiglione del Lago, since 2019; in 2026/27 it can be visited from 5 December 2026 to 6 January 2027." },
        { q: "When is the living nativity in Rasiglia?", a: "“Rasiglia, Paese presepe” takes place on 26 December and 6 January." },
        { q: "How far is Gubbio from Assisi?", a: "From Agriturismo La Mora, in the countryside outside Assisi, Piazza dei Quaranta Martiri in Gubbio is 54.7 km away, about 42 minutes by car according to Google Maps." },
        { q: "Where to stay to visit the Christmas markets in Umbria?", a: "Agriturismo La Mora, near Assisi, is 21.0 km from Perugia, 36.5 km from Rasiglia, 54.7 km from Gubbio and 64.3 km from Castiglione del Lago: five independent apartments with a kitchen and free parking." },
      ],
    },
    finalCtaHeading: "Umbria's Christmas lights, and a countryside home for the night.",
    finalCtaBody: "Choose the apartment for your Christmas market weekend.",
    finalCtaLabel: "Discover the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "mercatini-di-natale-umbria",
    category: "Événements",
    title: "Marchés de Noël en Ombrie : Pérouse, Gubbio et le lac Trasimène",
    excerpt: "Marchés et lumières de Noël en Ombrie : Pérouse, le sapin de Gubbio, le sapin dessiné sur le lac Trasimène et la crèche vivante de Rasiglia, avec dates et distances depuis Assise.",
    metaDescription: "Marchés de Noël en Ombrie : Pérouse, Gubbio et son sapin record, le sapin sur le lac Trasimène et la crèche de Rasiglia. Dates, distances et conseils.",
    ...cover(GUBBIO_NATALE_PIAZZA_PHOTO, "fr"),
    datePublished: "2026-10-06",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "Période", value: "de fin novembre à l'Épiphanie" },
        { label: "Sapin du Trasimène", value: "5 décembre 2026 – 6 janvier 2027" },
        { label: "Pérouse", value: "21,0 km de La Mora · env. 23 min" },
        { label: "Gubbio", value: "54,7 km · env. 42 min" },
        { label: "Castiglione del Lago", value: "64,3 km · env. 50 min" },
        { label: "Rasiglia", value: "36,5 km · env. 37 min" },
      ],
    },
    intro:
      "En Ombrie, Noël a plusieurs adresses : les marchés au cœur de Pérouse, le sapin de lumières de Gubbio, le sapin dessiné sur l'eau du lac Trasimène, la crèche vivante de Rasiglia. Depuis l'Agriturismo La Mora, dans la campagne d'Assise, tous se rejoignent dans la journée. Voici quoi voir, quand, et à quelle distance (en voiture, selon Google Maps). Toutes les dates 2026 ne sont pas encore annoncées : quand une confirmation manque, nous indiquons le site officiel à consulter.",
    introCtaHeading: "Marchés, sapins de lumière et crèches : une base à la campagne pour tout voir.",
    introCtaLabel: "Réserver",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Quand ont lieu les marchés de Noël en Ombrie ?" },
      {
        type: "p",
        text: "En général de fin novembre à l'Épiphanie, mais chaque ville a son calendrier. À Pérouse, l'édition 2025/26 s'est tenue du 29 novembre au 6 janvier ; à Gubbio, les marchés ouvrent dès la fin novembre et le sapin s'allume traditionnellement le 7 décembre ; à Castiglione del Lago, « Luci sul Trasimeno » 2026/27 est programmé du 5 décembre 2026 au 6 janvier 2027. Pour Pérouse et Gubbio, les dates 2026 n'étaient pas encore publiées au moment où nous avons écrit ce guide : vérifiez-les sur les sites officiels avant de partir.",
      },
      { type: "h2", text: "Que voir à Noël à Pérouse ?" },
      {
        type: "p",
        text: "Lors de l'édition 2025/26, « Perugia, un Natale insieme », le centre historique s'est rempli de lumières et d'installations d'artistes, dont Mimmo Paladino. Les marchés, avec artisanat, spécialités gastronomiques et idées cadeaux, s'étendaient le long du corso Vannucci et entre le corso Vannucci et la Rocca Paolina ; le Cassero et la terrasse de l'ancien Mercato Coperto accueillaient videomapping et scénographies lumineuses, avec les sapins de la piazza della Repubblica et de la piazza Matteotti, des spectacles et des activités pour les enfants.",
      },
      {
        type: "p",
        text: "Le programme change chaque année : pour l'édition 2026, consultez le site touristique officiel de la région, Umbria Tourism. Pérouse est à 21,0 km de La Mora, environ 23 minutes en voiture. Si vous venez en novembre, Eurochocolate a aussi lieu en ville du 13 au 22 novembre 2026 : nous lui consacrons un guide.",
      },
      { type: "h2", text: "Où se trouve le plus grand sapin de Noël du monde ?" },
      {
        type: "p",
        text: "À Gubbio. Depuis 1981, sur les pentes du Monte Ingino au-dessus de la ville, plus de 300 lumières dessinent un sapin haut de 750 mètres, avec une base de 450 mètres ; en 1991, le sapin de Noël de Gubbio est entré au Guinness des records comme le plus grand du monde. Il s'allume traditionnellement le 7 décembre, veille de l'Immaculée Conception, et reste allumé chaque soir jusque tard dans la nuit : lors de l'édition 2025/26, selon Umbria Tourism, du 7 décembre au 11 janvier, à partir de 17h00.",
      },
      {
        type: "p",
        text: "Dès la fin novembre, la grande Piazza dei Quaranta Martiri accueille les marchés de Noël, avec des stands de style tyrolien : artisanat, décorations et spécialités gastronomiques. Gubbio est à 54,7 km de La Mora, environ 42 minutes en voiture par la SS318.",
      },
      { type: "h2", text: "À quoi ressemble le sapin de Noël sur le lac Trasimène ?" },
      {
        type: "p",
        text: "À Castiglione del Lago, depuis 2019, des lumières dessinent un sapin de Noël sur l'eau du lac Trasimène : 1 080 mètres de long et 50 de large, avec 2 400 lumières périmétriques alimentées par des énergies renouvelables. C'est le cœur de « Luci sul Trasimeno », ouvert en 2026/27 tous les jours du 5 décembre au 6 janvier, de 17h00 à 23h00. Selon les organisateurs, on ne voit le sapin dans ses justes proportions que depuis le « Percorso dell'Albero » (le parcours du sapin), payant, sous les remparts de la Rocca del Leone.",
      },
      credited(ALBERO_TRASIMENO_PHOTO, "fr"),
      {
        type: "p",
        text: "Billets, parkings et animations : tout est dans notre guide du sapin de Noël sur le lac Trasimène. Castiglione del Lago est à 64,3 km de La Mora, environ 50 minutes.",
      },
      { type: "h2", text: "Où voir une crèche vivante en Ombrie ?" },
      {
        type: "p",
        text: "À Rasiglia, le « village des ruisseaux » sur la commune de Foligno, la crèche vivante « Rasiglia, Paese presepe » a lieu le 26 décembre et le 6 janvier. Rasiglia est à 36,5 km de La Mora, environ 37 minutes : notre guide explique comment la visiter.",
      },
      {
        type: "p",
        text: "Pour Noël à Assise, à 6,8 km de La Mora, le calendrier des événements se trouve sur le site touristique officiel de la commune, visit-assisi.it.",
      },
      { type: "h2", text: "Comment organiser un week-end de marchés et de lumières de Noël ?" },
      {
        type: "list",
        items: [
          "Vendredi soir : Pérouse, à 23 minutes, pour les lumières et les marchés du centre.",
          "Samedi : Gubbio, avec les marchés de la Piazza dei Quaranta Martiri et, à la nuit tombée, le sapin allumé sur le Monte Ingino.",
          "Dimanche : Castiglione del Lago pour le sapin du lac Trasimène, ouvert dès 17h00.",
          "Si vous êtes en Ombrie le 26 décembre ou le 6 janvier : la crèche vivante de Rasiglia.",
        ],
      },
      { type: "h2", text: "Où dormir pour les marchés de Noël en Ombrie ?" },
      {
        type: "p",
        text: "L'Agriturismo La Mora se trouve via Fonte Citerna 7, dans la campagne d'Assise : Pérouse est à 21,0 km, Rasiglia à 36,5 km, Gubbio à 54,7 km et Castiglione del Lago à 64,3 km. Ses cinq appartements indépendants disposent d'une cuisine équipée, du Wi-Fi et de la climatisation, avec parking gratuit dans la propriété : le soir, après les marchés, on rentre à la campagne.",
      },
      {
        type: "image",
        src: LAMORA_SALOTTO_GEMELLI,
        alt: "Séjour avec coin cuisine de l'appartement Gemelli à l'Agriturismo La Mora : canapé, table à nappe à carreaux et fenêtre sur la verdure",
        caption: "Le séjour avec coin cuisine de l'appartement Gemelli.",
      },
      {
        type: "links",
        heading: "Organisez votre Noël en Ombrie",
        items: [
          { label: "Les appartements de La Mora", href: "/alloggi/" },
          { label: "Les offres en réservation directe", href: "/offerte/" },
          { label: "Les environs de La Mora", href: "/territorio/" },
          { label: "Guide du sapin de Noël sur le lac Trasimène", href: "/blog/albero-di-natale-lago-trasimeno/" },
          { label: "Guide de Rasiglia, la petite Venise de l'Ombrie", href: "/blog/rasiglia-piccola-venezia-umbria/" },
          { label: "Eurochocolate 2026 à Pérouse", href: "/blog/eurochocolate-2026-dove-dormire/" },
          { label: "Noël à Gubbio sur italia.it", href: ITALIA_GUBBIO_URL },
          { label: "Umbria Tourism, site officiel de la région", href: UMBRIA_TOURISM_URL },
          { label: "Événements à Assise sur visit-assisi.it", href: VISIT_ASSISI_URL },
        ],
      },
    ],
    faq: {
      heading: "Marchés de Noël en Ombrie : questions fréquentes",
      items: [
        { q: "Quand commencent les marchés de Noël en Ombrie ?", a: "En général fin novembre : à Gubbio, les marchés de la Piazza dei Quaranta Martiri ouvrent dès la fin novembre, et à Pérouse l'édition 2025/26 a commencé le 29 novembre. Les dates changent chaque année : vérifiez sur les sites officiels." },
        { q: "Où se trouve le plus grand sapin de Noël du monde ?", a: "À Gubbio, sur les pentes du Monte Ingino : haut de 750 mètres avec une base de 450, il figure au Guinness des records depuis 1991. Il s'allume traditionnellement le 7 décembre." },
        { q: "Le sapin du lac Trasimène est-il le même que celui de Gubbio ?", a: "Non. Celui du Trasimène est dessiné en lumières sur l'eau du lac à Castiglione del Lago, depuis 2019 ; en 2026/27, il se visite du 5 décembre 2026 au 6 janvier 2027." },
        { q: "Quand a lieu la crèche vivante de Rasiglia ?", a: "« Rasiglia, Paese presepe » a lieu le 26 décembre et le 6 janvier." },
        { q: "Quelle distance entre Gubbio et Assise ?", a: "Depuis l'Agriturismo La Mora, dans la campagne d'Assise, la Piazza dei Quaranta Martiri de Gubbio est à 54,7 km, environ 42 minutes en voiture selon Google Maps." },
        { q: "Où dormir pour visiter les marchés de Noël en Ombrie ?", a: "L'Agriturismo La Mora, près d'Assise, est à 21,0 km de Pérouse, 36,5 km de Rasiglia, 54,7 km de Gubbio et 64,3 km de Castiglione del Lago : cinq appartements indépendants avec cuisine et parking gratuit." },
      ],
    },
    finalCtaHeading: "Les lumières de Noël de l'Ombrie, et le soir une maison à la campagne.",
    finalCtaBody: "Choisissez l'appartement pour votre week-end de marchés de Noël.",
    finalCtaLabel: "Découvrir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "mercatini-di-natale-umbria",
    category: "Veranstaltungen",
    title: "Weihnachtsmärkte in Umbrien: Perugia, Gubbio und der Trasimenische See",
    excerpt: "Weihnachtsmärkte und Lichter in Umbrien: Perugia, der Baum von Gubbio, der auf den Trasimenischen See gezeichnete Baum und die lebende Krippe von Rasiglia – mit Terminen und Entfernungen ab Assisi.",
    metaDescription: "Weihnachtsmärkte in Umbrien: Perugia, Gubbio mit seinem Rekordbaum, der Baum auf dem Trasimenischen See und die Krippe von Rasiglia. Termine und Tipps.",
    ...cover(GUBBIO_NATALE_PIAZZA_PHOTO, "de"),
    datePublished: "2026-10-06",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "Zeitraum", value: "Ende November bis Dreikönig" },
        { label: "Baum am Trasimenischen See", value: "5. Dezember 2026 – 6. Januar 2027" },
        { label: "Perugia", value: "21,0 km ab La Mora · ca. 23 Min." },
        { label: "Gubbio", value: "54,7 km · ca. 42 Min." },
        { label: "Castiglione del Lago", value: "64,3 km · ca. 50 Min." },
        { label: "Rasiglia", value: "36,5 km · ca. 37 Min." },
      ],
    },
    intro:
      "Weihnachten hat in Umbrien viele Adressen: die Märkte im Zentrum von Perugia, den Lichterbaum von Gubbio, den auf das Wasser des Trasimenischen Sees gezeichneten Baum, die lebende Krippe von Rasiglia. Vom Agriturismo La Mora auf dem Land bei Assisi erreichen Sie alle bequem an einem Tag. Hier lesen Sie, was es zu sehen gibt, wann und wie weit es ist (mit dem Auto, laut Google Maps). Noch sind nicht alle Termine für 2026 bekannt: Wo eine Bestätigung fehlt, nennen wir die offizielle Website zum Nachsehen.",
    introCtaHeading: "Märkte, Lichterbäume und Krippen: ein Ausgangspunkt auf dem Land für alles.",
    introCtaLabel: "Buchen",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Wann finden die Weihnachtsmärkte in Umbrien statt?" },
      {
        type: "p",
        text: "Meist von Ende November bis Dreikönig, doch jede Stadt hat ihren eigenen Kalender. In Perugia lief die Ausgabe 2025/26 vom 29. November bis 6. Januar; in Gubbio öffnen die Märkte ab Ende November, und der Baum wird traditionell am 7. Dezember angezündet; in Castiglione del Lago ist „Luci sul Trasimeno“ 2026/27 vom 5. Dezember 2026 bis 6. Januar 2027 geplant. Für Perugia und Gubbio waren die Termine 2026 bei Redaktionsschluss dieses Leitfadens noch nicht veröffentlicht: Prüfen Sie sie vor der Abreise auf den offiziellen Websites.",
      },
      { type: "h2", text: "Was gibt es zu Weihnachten in Perugia zu sehen?" },
      {
        type: "p",
        text: "In der Ausgabe 2025/26, „Perugia, un Natale insieme“, war die Altstadt voller Lichter und Künstlerinstallationen, unter anderem von Mimmo Paladino. Die Märkte mit Kunsthandwerk, kulinarischen Spezialitäten und Geschenkideen lagen am Corso Vannucci und zwischen Corso Vannucci und Rocca Paolina; am Cassero und auf der Terrasse des ehemaligen Mercato Coperto gab es Videomapping und Lichtinszenierungen, dazu die Weihnachtsbäume auf der Piazza della Repubblica und der Piazza Matteotti, Shows und Programm für Kinder.",
      },
      {
        type: "p",
        text: "Das Programm ändert sich jedes Jahr: Für die Ausgabe 2026 sehen Sie auf dem offiziellen Tourismusportal der Region nach, Umbria Tourism. Perugia liegt 21,0 km von La Mora entfernt, rund 23 Minuten mit dem Auto. Wenn Sie im November kommen: Vom 13. bis 22. November 2026 findet in der Stadt auch die Eurochocolate statt – dazu gibt es einen eigenen Leitfaden.",
      },
      { type: "h2", text: "Wo steht der größte Weihnachtsbaum der Welt?" },
      {
        type: "p",
        text: "In Gubbio. Seit 1981 zeichnen an den Hängen des Monte Ingino oberhalb der Stadt mehr als 300 Lichter einen 750 Meter hohen Baum mit 450 Metern Basis; 1991 kam der Weihnachtsbaum von Gubbio als größter der Welt ins Guinness-Buch der Rekorde. Traditionell wird er am 7. Dezember angezündet, am Vorabend von Mariä Empfängnis, und leuchtet jeden Abend bis spät in die Nacht: in der Ausgabe 2025/26 laut Umbria Tourism vom 7. Dezember bis 11. Januar, ab 17:00 Uhr.",
      },
      {
        type: "p",
        text: "Ab Ende November finden auf der großen Piazza dei Quaranta Martiri die Weihnachtsmärkte statt, mit Ständen im Tiroler Stil: Kunsthandwerk, Dekoration und kulinarische Spezialitäten. Gubbio liegt 54,7 km von La Mora entfernt, rund 42 Minuten mit dem Auto über die SS318.",
      },
      { type: "h2", text: "Wie sieht der Weihnachtsbaum auf dem Trasimenischen See aus?" },
      {
        type: "p",
        text: "In Castiglione del Lago zeichnen Lichter seit 2019 einen Weihnachtsbaum auf das Wasser des Trasimenischen Sees: 1.080 Meter lang und 50 Meter breit, mit 2.400 Umrisslichtern, die mit erneuerbarer Energie betrieben werden. Er ist das Herzstück von „Luci sul Trasimeno“, 2026/27 täglich vom 5. Dezember bis 6. Januar von 17:00 bis 23:00 Uhr geöffnet. Laut den Veranstaltern ist der Baum in seinen richtigen Proportionen nur vom kostenpflichtigen „Percorso dell'Albero“ (Baumweg) unterhalb der Mauern der Rocca del Leone zu sehen.",
      },
      credited(ALBERO_TRASIMENO_PHOTO, "de"),
      {
        type: "p",
        text: "Tickets, Parken und Rahmenprogramm: Alles steht in unserem Leitfaden zum Weihnachtsbaum auf dem Trasimenischen See. Castiglione del Lago liegt 64,3 km von La Mora entfernt, rund 50 Minuten.",
      },
      { type: "h2", text: "Wo gibt es eine lebende Krippe in Umbrien?" },
      {
        type: "p",
        text: "In Rasiglia, dem „Dorf der Bäche“ in der Gemeinde Foligno, findet die lebende Krippe „Rasiglia, Paese presepe“ am 26. Dezember und am 6. Januar statt. Rasiglia liegt 36,5 km von La Mora entfernt, rund 37 Minuten: Wie man es besucht, erklären wir in einem eigenen Leitfaden.",
      },
      {
        type: "p",
        text: "Für Weihnachten in Assisi, 6,8 km von La Mora, steht der Veranstaltungskalender auf dem offiziellen Tourismusportal der Stadt, visit-assisi.it.",
      },
      { type: "h2", text: "Wie plant man ein Wochenende mit Weihnachtsmärkten und Lichtern?" },
      {
        type: "list",
        items: [
          "Freitagabend: Perugia, 23 Minuten entfernt, für die Lichter und Märkte im Zentrum.",
          "Samstag: Gubbio mit den Märkten auf der Piazza dei Quaranta Martiri und, sobald es dunkel ist, dem leuchtenden Baum am Monte Ingino.",
          "Sonntag: Castiglione del Lago für den Baum auf dem Trasimenischen See, geöffnet ab 17:00 Uhr.",
          "Wenn Sie am 26. Dezember oder 6. Januar in Umbrien sind: die lebende Krippe von Rasiglia.",
        ],
      },
      { type: "h2", text: "Wo übernachten für die Weihnachtsmärkte in Umbrien?" },
      {
        type: "p",
        text: "Das Agriturismo La Mora liegt in der Via Fonte Citerna 7 auf dem Land bei Assisi: Perugia ist 21,0 km entfernt, Rasiglia 36,5 km, Gubbio 54,7 km und Castiglione del Lago 64,3 km. Die fünf unabhängigen Ferienwohnungen haben eine voll ausgestattete Küche, WLAN und Klimaanlage, dazu kostenlose Parkplätze auf dem Gelände: Nach den Märkten geht es abends zurück aufs Land.",
      },
      {
        type: "image",
        src: LAMORA_SALOTTO_GEMELLI,
        alt: "Wohnraum mit Kochecke der Ferienwohnung Gemelli im Agriturismo La Mora: Sofa, Tisch mit karierter Tischdecke und Fenster ins Grüne",
        caption: "Wohnraum mit Kochecke der Ferienwohnung Gemelli.",
      },
      {
        type: "links",
        heading: "Planen Sie Ihr Weihnachten in Umbrien",
        items: [
          { label: "Die Ferienwohnungen von La Mora", href: "/alloggi/" },
          { label: "Angebote bei Direktbuchung", href: "/offerte/" },
          { label: "Die Umgebung von La Mora", href: "/territorio/" },
          { label: "Leitfaden zum Weihnachtsbaum auf dem Trasimenischen See", href: "/blog/albero-di-natale-lago-trasimeno/" },
          { label: "Leitfaden zu Rasiglia, dem kleinen Venedig Umbriens", href: "/blog/rasiglia-piccola-venezia-umbria/" },
          { label: "Eurochocolate 2026 in Perugia", href: "/blog/eurochocolate-2026-dove-dormire/" },
          { label: "Weihnachten in Gubbio auf italia.it", href: ITALIA_GUBBIO_URL },
          { label: "Umbria Tourism, offizielles Portal der Region", href: UMBRIA_TOURISM_URL },
          { label: "Veranstaltungen in Assisi auf visit-assisi.it", href: VISIT_ASSISI_URL },
        ],
      },
    ],
    faq: {
      heading: "Weihnachtsmärkte in Umbrien: häufige Fragen",
      items: [
        { q: "Wann beginnen die Weihnachtsmärkte in Umbrien?", a: "Meist Ende November: In Gubbio öffnen die Märkte auf der Piazza dei Quaranta Martiri ab Ende November, in Perugia begann die Ausgabe 2025/26 am 29. November. Die Termine ändern sich jedes Jahr: Prüfen Sie die offiziellen Websites." },
        { q: "Wo steht der größte Weihnachtsbaum der Welt?", a: "In Gubbio, an den Hängen des Monte Ingino: 750 Meter hoch mit 450 Metern Basis, seit 1991 im Guinness-Buch der Rekorde. Er wird traditionell am 7. Dezember angezündet." },
        { q: "Ist der Baum am Trasimenischen See derselbe wie in Gubbio?", a: "Nein. Der Baum am Trasimenischen See wird seit 2019 bei Castiglione del Lago mit Lichtern auf das Wasser gezeichnet; 2026/27 ist er vom 5. Dezember 2026 bis 6. Januar 2027 zu sehen." },
        { q: "Wann findet die lebende Krippe in Rasiglia statt?", a: "„Rasiglia, Paese presepe“ findet am 26. Dezember und am 6. Januar statt." },
        { q: "Wie weit ist Gubbio von Assisi entfernt?", a: "Vom Agriturismo La Mora auf dem Land bei Assisi liegt die Piazza dei Quaranta Martiri in Gubbio 54,7 km entfernt, laut Google Maps rund 42 Minuten mit dem Auto." },
        { q: "Wo übernachtet man für die Weihnachtsmärkte in Umbrien?", a: "Das Agriturismo La Mora bei Assisi liegt 21,0 km von Perugia, 36,5 km von Rasiglia, 54,7 km von Gubbio und 64,3 km von Castiglione del Lago entfernt: fünf unabhängige Ferienwohnungen mit Küche und kostenlosem Parkplatz." },
      ],
    },
    finalCtaHeading: "Umbriens Weihnachtslichter – und abends ein Zuhause auf dem Land.",
    finalCtaBody: "Wählen Sie die Ferienwohnung für Ihr Weihnachtsmarkt-Wochenende.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};

const LUCI_TRASIMENO_URL = "https://www.lucisultrasimeno.it/";

const ALBERO_TRASIMENO_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "albero-di-natale-lago-trasimeno",
    category: "Eventi",
    title: "Albero di Natale sul lago Trasimeno: date, biglietti e come vederlo",
    excerpt: "A Castiglione del Lago un albero di Natale di luci lungo 1.080 metri disegnato sull'acqua del Trasimeno: date 2026/27, biglietti, da dove si vede e come arrivare da Assisi.",
    metaDescription: "L'albero di Natale sul lago Trasimeno a Castiglione del Lago: date 2026/27, orari, biglietti, da dove si vede e come arrivare da Assisi in circa 50 minuti.",
    ...cover(ALBERO_TRASIMENO_PHOTO, "it"),
    datePublished: "2026-10-06",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Dove", value: "Castiglione del Lago, lago Trasimeno" },
        { label: "Edizione 2026/27", value: "5 dicembre 2026 – 6 gennaio 2027" },
        { label: "Orario", value: "tutti i giorni, 17:00–23:00" },
        { label: "Biglietto", value: "10 € · 5 € da 13 a 17 anni · gratis fino a 12" },
        { label: "Misure", value: "1.080 m di lunghezza, 50 m di larghezza" },
        { label: "Da La Mora", value: "64,3 km · circa 50 min in auto" },
      ],
    },
    intro:
      "Dal dicembre 2019 Castiglione del Lago accende sul lago Trasimeno un albero di Natale disegnato con le luci sull'acqua, lungo 1.080 metri: gli organizzatori lo presentano come «l'albero di Natale più grande del mondo costruito sull'acqua». È il cuore di «Luci sul Trasimeno», che nell'edizione 2026/27 va dal 5 dicembre al 6 gennaio. Ecco come vederlo, quanto costa e come arrivarci da Agriturismo La Mora, a circa 50 minuti.",
    introCtaHeading: "L'albero sul lago, i mercatini e Assisi: dormi in campagna, in mezzo a tutto.",
    introCtaLabel: "Prenota",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Com'è fatto l'albero di Natale sul lago Trasimeno?" },
      {
        type: "p",
        text: "È un'opera di ingegneria elettrica costruita direttamente nel lago: secondo gli organizzatori si può realizzare solo sulle acque poco profonde del Trasimeno. Le luci disegnano la sagoma dell'albero sulla superficie, sorrette da 166 pali, e lo spettacolo non è mai uguale: forma, intensità e riflessi cambiano con il punto da cui lo si guarda e con il tempo.",
      },
      {
        type: "facts",
        items: [
          { label: "Lunghezza", value: "1.080 metri" },
          { label: "Larghezza", value: "50 metri" },
          { label: "Luci perimetrali", value: "2.400" },
          { label: "Lampade interne", value: "250" },
          { label: "Cavo", value: "7.165 metri" },
          { label: "Energia", value: "100% da fonti rinnovabili" },
        ],
      },
      { type: "h2", text: "Quando si può vedere l'albero sul Trasimeno?" },
      {
        type: "p",
        text: "L'edizione 2026/27 di Luci sul Trasimeno è in programma tutti i giorni dal 5 dicembre 2026 al 6 gennaio 2027, dalle 17:00 alle 23:00; in caso di maltempo, avvertono gli organizzatori, gli orari possono cambiare. Il programma degli eventi giornalieri era ancora in aggiornamento quando abbiamo scritto questa guida: controllalo sul sito ufficiale.",
      },
      { type: "h2", text: "Da dove si vede l'albero di Natale sul lago?" },
      {
        type: "p",
        text: "Secondo gli organizzatori, nella sua forma e nelle sue proporzioni l'albero si vede solo dal «Percorso dell'Albero», a pagamento. Il punto di osservazione è nell'area del «Poggio», sotto le mura della Rocca del Leone, la rocca medievale di Castiglione del Lago; l'evento si svolge lungo le mura che costeggiano il centro storico e la rocca, in via Belvedere, a partire da Porta Fiorentina.",
      },
      credited(ROCCA_DEL_LEONE_PHOTO, "it"),
      {
        type: "p",
        text: "Il biglietto del Percorso dell'Albero, nell'edizione 2026/27, costa 10 euro; 5 euro dai 13 ai 17 anni; è gratuito fino a 12 anni e per le persone con disabilità. Comprende anche il Babbo Natale Xmas Garden e il Sentiero del Presepe e si acquista alla biglietteria dell'evento oppure online, sul sito ufficiale.",
      },
      { type: "h2", text: "Cos'altro c'è a Luci sul Trasimeno?" },
      {
        type: "p",
        text: "Lungo via Belvedere ci sono le Casette del Natale, con artigianato e prodotti tipici, e la pista di pattinaggio del Ghiaccio Park; il programma 2026 comprende anche la mostra di mattoncini «Castiglione del Lego». Di giorno vale la pena passeggiare nel centro storico di Castiglione del Lago, sul promontorio affacciato sul lago.",
      },
      credited(TRASIMENO_VELE_PHOTO, "it"),
      { type: "h2", text: "Come arrivare a Castiglione del Lago da Assisi?" },
      {
        type: "p",
        text: "In auto: da Agriturismo La Mora sono 64,3 km, circa 50 minuti secondo Google Maps, lungo il raccordo autostradale Perugia–Bettolle. Gli organizzatori segnalano numerosi parcheggi gratuiti a poche decine di metri dall'evento, da cui si raggiunge a piedi il centro storico; nei giorni festivi e prefestivi c'è una navetta gratuita.",
      },
      {
        type: "p",
        text: "Il raccordo passa da Perugia, a 21,0 km da La Mora: nello stesso giorno puoi fermarti per le luci e i mercatini del centro, che raccontiamo nella guida ai mercatini di Natale in Umbria.",
      },
      { type: "h2", text: "Dove dormire per vedere l'albero sul Trasimeno?" },
      {
        type: "p",
        text: "Agriturismo La Mora è nella campagna di Assisi, in via Fonte Citerna 7: da qui Castiglione del Lago è a circa 50 minuti, Perugia a 23 e la Basilica di San Francesco a 18. I cinque appartamenti indipendenti hanno cucina attrezzata, Wi-Fi, aria condizionata e parcheggio gratuito: una base per un weekend di Natale tra il lago, Perugia e Assisi.",
      },
      {
        type: "image",
        src: LAMORA_DALL_ALTO,
        alt: "Agriturismo La Mora vista dall'alto: gli edifici, la piscina, il gazebo, il campo da calcio e i campi intorno",
        caption: "Agriturismo La Mora dall'alto, nella campagna di Assisi.",
      },
      {
        type: "links",
        heading: "Organizza il weekend",
        items: [
          { label: "Gli appartamenti di La Mora", href: "/alloggi/" },
          { label: "Le offerte per chi prenota diretto", href: "/offerte/" },
          { label: "Il territorio intorno a La Mora", href: "/territorio/" },
          { label: "Guida ai mercatini di Natale in Umbria", href: "/blog/mercatini-di-natale-umbria/" },
          { label: "Sito ufficiale di Luci sul Trasimeno", href: LUCI_TRASIMENO_URL },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti sull'albero di Natale sul Trasimeno",
      items: [
        { q: "Quando si vede l'albero di Natale sul lago Trasimeno?", a: "Nell'edizione 2026/27, tutti i giorni dal 5 dicembre 2026 al 6 gennaio 2027, dalle 17:00 alle 23:00. Con il maltempo gli orari possono cambiare." },
        { q: "Quanto costa il biglietto?", a: "Nel 2026/27 il biglietto del Percorso dell'Albero costa 10 euro, 5 euro dai 13 ai 17 anni; è gratuito fino a 12 anni e per le persone con disabilità. Comprende anche il Babbo Natale Xmas Garden e il Sentiero del Presepe." },
        { q: "Si può vedere l'albero senza biglietto?", a: "Secondo gli organizzatori, nella sua forma e nelle sue proporzioni l'albero si vede solo dal Percorso dell'Albero, a pagamento, sotto le mura della Rocca del Leone." },
        { q: "Quanto è grande l'albero sul lago?", a: "1.080 metri di lunghezza e 50 di larghezza, con 2.400 luci perimetrali e 250 lampade interne, alimentate al 100% da energia rinnovabile." },
        { q: "È lo stesso albero di Gubbio?", a: "No. Quello di Gubbio è acceso dal 1981 sulle pendici del Monte Ingino ed è nel Guinness dei primati come albero di Natale più grande del mondo; quello del Trasimeno, dal 2019, è costruito sull'acqua del lago a Castiglione del Lago." },
        { q: "Dove si parcheggia a Castiglione del Lago?", a: "Gli organizzatori indicano numerosi parcheggi gratuiti a poche decine di metri dall'evento; nei giorni festivi e prefestivi è previsto un servizio navetta gratuito." },
        { q: "Quanto dista Agriturismo La Mora da Castiglione del Lago?", a: "64,3 km, circa 50 minuti in auto secondo Google Maps, lungo il raccordo Perugia–Bettolle." },
      ],
    },
    finalCtaHeading: "Natale sul lago, la notte in campagna.",
    finalCtaBody: "Scegli l'appartamento per il tuo weekend di Natale in Umbria.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "albero-di-natale-lago-trasimeno",
    category: "Events",
    title: "Christmas tree on Lake Trasimeno: dates, tickets and how to see it",
    excerpt: "At Castiglione del Lago, a Christmas tree of lights 1,080 metres long drawn on the water of Lake Trasimeno: 2026/27 dates, tickets, where to see it from and how to get there from Assisi.",
    metaDescription: "The Christmas tree on Lake Trasimeno at Castiglione del Lago: 2026/27 dates, opening hours, tickets, where to see it and how to get there from Assisi.",
    ...cover(ALBERO_TRASIMENO_PHOTO, "en"),
    datePublished: "2026-10-06",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Where", value: "Castiglione del Lago, Lake Trasimeno" },
        { label: "2026/27 edition", value: "5 December 2026 – 6 January 2027" },
        { label: "Hours", value: "every day, 17:00–23:00" },
        { label: "Ticket", value: "€10 · €5 ages 13–17 · free up to 12" },
        { label: "Size", value: "1,080 m long, 50 m wide" },
        { label: "From La Mora", value: "64.3 km · about 50 min by car" },
      ],
    },
    intro:
      "Since December 2019, Castiglione del Lago has lit up a Christmas tree drawn in lights on the water of Lake Trasimeno, 1,080 metres long: the organisers present it as “the world's largest Christmas tree built on water”. It is the heart of “Luci sul Trasimeno”, which in its 2026/27 edition runs from 5 December to 6 January. Here's how to see it, what it costs and how to get there from Agriturismo La Mora, about 50 minutes away.",
    introCtaHeading: "The tree on the lake, the markets and Assisi: stay in the countryside, close to it all.",
    introCtaLabel: "Book",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "How is the Christmas tree on Lake Trasimeno made?" },
      {
        type: "p",
        text: "It is a feat of electrical engineering built right in the lake: according to the organisers it can only be made on the shallow waters of Trasimeno. The lights trace the outline of the tree on the surface, held up by 166 poles, and the show is never the same twice: shape, brightness and reflections change with where you watch from and with the weather.",
      },
      {
        type: "facts",
        items: [
          { label: "Length", value: "1,080 metres" },
          { label: "Width", value: "50 metres" },
          { label: "Perimeter lights", value: "2,400" },
          { label: "Inner lamps", value: "250" },
          { label: "Cable", value: "7,165 metres" },
          { label: "Energy", value: "100% renewable" },
        ],
      },
      { type: "h2", text: "When can you see the tree on Lake Trasimeno?" },
      {
        type: "p",
        text: "The 2026/27 edition of Luci sul Trasimeno is scheduled every day from 5 December 2026 to 6 January 2027, from 17:00 to 23:00; in bad weather, the organisers warn, opening hours may change. The daily events programme was still being updated when we wrote this guide: check it on the official website.",
      },
      { type: "h2", text: "Where can you see the Christmas tree on the lake from?" },
      {
        type: "p",
        text: "According to the organisers, the tree can only be seen in its proper shape and proportions from the paid “Percorso dell'Albero” (Tree Path). The viewing point is in the “Poggio” area, below the walls of the Rocca del Leone, the medieval fortress of Castiglione del Lago; the event runs along the walls that skirt the historic centre and the fortress, on Via Belvedere, starting from Porta Fiorentina.",
      },
      credited(ROCCA_DEL_LEONE_PHOTO, "en"),
      {
        type: "p",
        text: "In the 2026/27 edition, the Tree Path ticket costs €10, or €5 for ages 13 to 17; it is free for children up to 12 and for people with disabilities. It also includes the Babbo Natale Xmas Garden and the Sentiero del Presepe (nativity trail), and can be bought at the event ticket office or online on the official website.",
      },
      { type: "h2", text: "What else is there at Luci sul Trasimeno?" },
      {
        type: "p",
        text: "Along Via Belvedere you'll find the Casette del Natale, little Christmas huts selling crafts and local products, and the Ghiaccio Park ice rink; the 2026 programme also includes “Castiglione del Lego”, an exhibition of building bricks. By day it's worth strolling through the historic centre of Castiglione del Lago, on its promontory overlooking the lake.",
      },
      credited(TRASIMENO_VELE_PHOTO, "en"),
      { type: "h2", text: "How do you get to Castiglione del Lago from Assisi?" },
      {
        type: "p",
        text: "By car: from Agriturismo La Mora it's 64.3 km, about 50 minutes according to Google Maps, along the Perugia–Bettolle motorway link. The organisers point to plenty of free car parks a few dozen metres from the event, from which you can walk into the historic centre; on Sundays, public holidays and the days before them there is a free shuttle.",
      },
      {
        type: "p",
        text: "The motorway link passes Perugia, 21.0 km from La Mora: on the same day you can stop for the lights and markets in the centre, which we describe in our guide to the Christmas markets in Umbria.",
      },
      { type: "h2", text: "Where to stay to see the tree on Lake Trasimeno?" },
      {
        type: "p",
        text: "Agriturismo La Mora is in the countryside outside Assisi, at Via Fonte Citerna 7: from here Castiglione del Lago is about 50 minutes away, Perugia 23 and the Basilica of San Francesco 18. The five independent apartments have a fully equipped kitchen, Wi-Fi, air conditioning and free parking: a base for a Christmas weekend between the lake, Perugia and Assisi.",
      },
      {
        type: "image",
        src: LAMORA_DALL_ALTO,
        alt: "Agriturismo La Mora from above: the buildings, the pool, the gazebo, the football pitch and the surrounding fields",
        caption: "Agriturismo La Mora from above, in the countryside outside Assisi.",
      },
      {
        type: "links",
        heading: "Plan your weekend",
        items: [
          { label: "La Mora's apartments", href: "/alloggi/" },
          { label: "Offers for direct bookings", href: "/offerte/" },
          { label: "The area around La Mora", href: "/territorio/" },
          { label: "Guide to the Christmas markets in Umbria", href: "/blog/mercatini-di-natale-umbria/" },
          { label: "Official website of Luci sul Trasimeno", href: LUCI_TRASIMENO_URL },
        ],
      },
    ],
    faq: {
      heading: "The Christmas tree on Lake Trasimeno: frequently asked questions",
      items: [
        { q: "When can you see the Christmas tree on Lake Trasimeno?", a: "In the 2026/27 edition, every day from 5 December 2026 to 6 January 2027, from 17:00 to 23:00. Opening hours may change in bad weather." },
        { q: "How much is the ticket?", a: "In 2026/27 the Tree Path ticket costs €10, or €5 for ages 13 to 17; it is free up to age 12 and for people with disabilities. It also includes the Babbo Natale Xmas Garden and the nativity trail." },
        { q: "Can you see the tree without a ticket?", a: "According to the organisers, the tree can only be seen in its proper shape and proportions from the paid Tree Path, below the walls of the Rocca del Leone." },
        { q: "How big is the tree on the lake?", a: "1,080 metres long and 50 metres wide, with 2,400 perimeter lights and 250 inner lamps, powered 100% by renewable energy." },
        { q: "Is it the same tree as Gubbio's?", a: "No. Gubbio's tree has been lit on the slopes of Monte Ingino since 1981 and is in the Guinness World Records as the world's largest Christmas tree; the Trasimeno tree, since 2019, is built on the water of the lake at Castiglione del Lago." },
        { q: "Where can you park in Castiglione del Lago?", a: "The organisers point to plenty of free car parks a few dozen metres from the event; on Sundays, public holidays and the days before them a free shuttle runs." },
        { q: "How far is Agriturismo La Mora from Castiglione del Lago?", a: "64.3 km, about 50 minutes by car according to Google Maps, along the Perugia–Bettolle motorway link." },
      ],
    },
    finalCtaHeading: "Christmas on the lake, nights in the countryside.",
    finalCtaBody: "Choose the apartment for your Christmas weekend in Umbria.",
    finalCtaLabel: "Discover the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "albero-di-natale-lago-trasimeno",
    category: "Événements",
    title: "Sapin de Noël sur le lac Trasimène : dates, billets et où le voir",
    excerpt: "À Castiglione del Lago, un sapin de Noël de lumières long de 1 080 mètres dessiné sur l'eau du lac Trasimène : dates 2026/27, billets, d'où le voir et comment venir depuis Assise.",
    metaDescription: "Le sapin de Noël sur le lac Trasimène à Castiglione del Lago : dates 2026/27, horaires, billets, d'où le voir et comment s'y rendre depuis Assise.",
    ...cover(ALBERO_TRASIMENO_PHOTO, "fr"),
    datePublished: "2026-10-06",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "Où", value: "Castiglione del Lago, lac Trasimène" },
        { label: "Édition 2026/27", value: "5 décembre 2026 – 6 janvier 2027" },
        { label: "Horaires", value: "tous les jours, 17h00–23h00" },
        { label: "Billet", value: "10 € · 5 € de 13 à 17 ans · gratuit jusqu'à 12 ans" },
        { label: "Dimensions", value: "1 080 m de long, 50 m de large" },
        { label: "Depuis La Mora", value: "64,3 km · env. 50 min en voiture" },
      ],
    },
    intro:
      "Depuis décembre 2019, Castiglione del Lago allume sur le lac Trasimène un sapin de Noël dessiné en lumières sur l'eau, long de 1 080 mètres : les organisateurs le présentent comme « le plus grand sapin de Noël du monde construit sur l'eau ». C'est le cœur de « Luci sul Trasimeno », dont l'édition 2026/27 a lieu du 5 décembre au 6 janvier. Voici comment le voir, combien cela coûte et comment s'y rendre depuis l'Agriturismo La Mora, à environ 50 minutes.",
    introCtaHeading: "Le sapin sur le lac, les marchés et Assise : dormez à la campagne, au milieu de tout.",
    introCtaLabel: "Réserver",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Comment est fait le sapin de Noël du lac Trasimène ?" },
      {
        type: "p",
        text: "C'est un ouvrage d'ingénierie électrique construit directement dans le lac : selon les organisateurs, il ne peut être réalisé que sur les eaux peu profondes du Trasimène. Les lumières tracent la silhouette du sapin à la surface, portées par 166 poteaux, et le spectacle n'est jamais le même : forme, intensité et reflets changent selon l'endroit d'où on le regarde et selon la météo.",
      },
      {
        type: "facts",
        items: [
          { label: "Longueur", value: "1 080 mètres" },
          { label: "Largeur", value: "50 mètres" },
          { label: "Lumières périmétriques", value: "2 400" },
          { label: "Lampes intérieures", value: "250" },
          { label: "Câble", value: "7 165 mètres" },
          { label: "Énergie", value: "100 % renouvelable" },
        ],
      },
      { type: "h2", text: "Quand peut-on voir le sapin du Trasimène ?" },
      {
        type: "p",
        text: "L'édition 2026/27 de Luci sul Trasimeno est programmée tous les jours du 5 décembre 2026 au 6 janvier 2027, de 17h00 à 23h00 ; par mauvais temps, préviennent les organisateurs, les horaires peuvent changer. Le programme des animations quotidiennes était encore en cours de mise à jour quand nous avons écrit ce guide : consultez-le sur le site officiel.",
      },
      { type: "h2", text: "D'où voit-on le sapin de Noël sur le lac ?" },
      {
        type: "p",
        text: "Selon les organisateurs, on ne voit le sapin dans sa forme et ses proportions que depuis le « Percorso dell'Albero » (le parcours du sapin), payant. Le point d'observation se trouve dans la zone du « Poggio », sous les remparts de la Rocca del Leone, la forteresse médiévale de Castiglione del Lago ; l'événement se déroule le long des remparts qui bordent le centre historique et la forteresse, via Belvedere, à partir de la Porta Fiorentina.",
      },
      credited(ROCCA_DEL_LEONE_PHOTO, "fr"),
      {
        type: "p",
        text: "Pour l'édition 2026/27, le billet du parcours coûte 10 euros, 5 euros de 13 à 17 ans ; il est gratuit jusqu'à 12 ans et pour les personnes handicapées. Il comprend aussi le Babbo Natale Xmas Garden et le Sentiero del Presepe (le sentier de la crèche), et s'achète à la billetterie de l'événement ou en ligne sur le site officiel.",
      },
      { type: "h2", text: "Qu'y a-t-il d'autre à Luci sul Trasimeno ?" },
      {
        type: "p",
        text: "Le long de la via Belvedere, on trouve les Casette del Natale, des chalets d'artisanat et de produits typiques, et la patinoire du Ghiaccio Park ; le programme 2026 comprend aussi « Castiglione del Lego », une exposition de briques de construction. Le jour, une promenade dans le centre historique de Castiglione del Lago, sur son promontoire au-dessus du lac, vaut le détour.",
      },
      credited(TRASIMENO_VELE_PHOTO, "fr"),
      { type: "h2", text: "Comment aller à Castiglione del Lago depuis Assise ?" },
      {
        type: "p",
        text: "En voiture : depuis l'Agriturismo La Mora, il y a 64,3 km, environ 50 minutes selon Google Maps, par la voie rapide Pérouse–Bettolle. Les organisateurs signalent de nombreux parkings gratuits à quelques dizaines de mètres de l'événement, d'où l'on rejoint à pied le centre historique ; les dimanches, jours fériés et veilles de fêtes, une navette gratuite circule.",
      },
      {
        type: "p",
        text: "La voie rapide passe par Pérouse, à 21,0 km de La Mora : le même jour, vous pouvez vous arrêter pour les lumières et les marchés du centre, que nous décrivons dans notre guide des marchés de Noël en Ombrie.",
      },
      { type: "h2", text: "Où dormir pour voir le sapin du lac Trasimène ?" },
      {
        type: "p",
        text: "L'Agriturismo La Mora est dans la campagne d'Assise, via Fonte Citerna 7 : d'ici, Castiglione del Lago est à environ 50 minutes, Pérouse à 23 et la basilique Saint-François à 18. Les cinq appartements indépendants ont une cuisine équipée, le Wi-Fi, la climatisation et un parking gratuit : une base pour un week-end de Noël entre le lac, Pérouse et Assise.",
      },
      {
        type: "image",
        src: LAMORA_DALL_ALTO,
        alt: "L'Agriturismo La Mora vu d'en haut : les bâtiments, la piscine, le gazebo, le terrain de football et les champs alentour",
        caption: "L'Agriturismo La Mora vu d'en haut, dans la campagne d'Assise.",
      },
      {
        type: "links",
        heading: "Organisez votre week-end",
        items: [
          { label: "Les appartements de La Mora", href: "/alloggi/" },
          { label: "Les offres en réservation directe", href: "/offerte/" },
          { label: "Les environs de La Mora", href: "/territorio/" },
          { label: "Guide des marchés de Noël en Ombrie", href: "/blog/mercatini-di-natale-umbria/" },
          { label: "Site officiel de Luci sul Trasimeno", href: LUCI_TRASIMENO_URL },
        ],
      },
    ],
    faq: {
      heading: "Le sapin de Noël du lac Trasimène : questions fréquentes",
      items: [
        { q: "Quand peut-on voir le sapin de Noël sur le lac Trasimène ?", a: "Pour l'édition 2026/27, tous les jours du 5 décembre 2026 au 6 janvier 2027, de 17h00 à 23h00. Par mauvais temps, les horaires peuvent changer." },
        { q: "Combien coûte le billet ?", a: "En 2026/27, le billet du Percorso dell'Albero coûte 10 euros, 5 euros de 13 à 17 ans ; il est gratuit jusqu'à 12 ans et pour les personnes handicapées. Il comprend aussi le Babbo Natale Xmas Garden et le sentier de la crèche." },
        { q: "Peut-on voir le sapin sans billet ?", a: "Selon les organisateurs, on ne voit le sapin dans sa forme et ses proportions que depuis le parcours payant, sous les remparts de la Rocca del Leone." },
        { q: "Quelle est la taille du sapin sur le lac ?", a: "1 080 mètres de long et 50 de large, avec 2 400 lumières périmétriques et 250 lampes intérieures, alimentées à 100 % par des énergies renouvelables." },
        { q: "Est-ce le même sapin que celui de Gubbio ?", a: "Non. Celui de Gubbio s'allume depuis 1981 sur les pentes du Monte Ingino et figure au Guinness des records comme le plus grand sapin de Noël du monde ; celui du Trasimène, depuis 2019, est construit sur l'eau du lac à Castiglione del Lago." },
        { q: "Où se garer à Castiglione del Lago ?", a: "Les organisateurs indiquent de nombreux parkings gratuits à quelques dizaines de mètres de l'événement ; les dimanches, jours fériés et veilles de fêtes, une navette gratuite est prévue." },
        { q: "À quelle distance l'Agriturismo La Mora se trouve-t-il de Castiglione del Lago ?", a: "À 64,3 km, environ 50 minutes en voiture selon Google Maps, par la voie rapide Pérouse–Bettolle." },
      ],
    },
    finalCtaHeading: "Noël sur le lac, les nuits à la campagne.",
    finalCtaBody: "Choisissez l'appartement pour votre week-end de Noël en Ombrie.",
    finalCtaLabel: "Découvrir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "albero-di-natale-lago-trasimeno",
    category: "Veranstaltungen",
    title: "Weihnachtsbaum auf dem Trasimenischen See: Termine, Tickets und Aussicht",
    excerpt: "In Castiglione del Lago ein 1.080 Meter langer Weihnachtsbaum aus Lichtern auf dem Wasser des Trasimenischen Sees: Termine 2026/27, Tickets, von wo man ihn sieht und Anreise ab Assisi.",
    metaDescription: "Der Weihnachtsbaum auf dem Trasimenischen See in Castiglione del Lago: Termine 2026/27, Öffnungszeiten, Tickets, beste Sicht und Anreise ab Assisi.",
    ...cover(ALBERO_TRASIMENO_PHOTO, "de"),
    datePublished: "2026-10-06",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "Wo", value: "Castiglione del Lago, Trasimenischer See" },
        { label: "Ausgabe 2026/27", value: "5. Dezember 2026 – 6. Januar 2027" },
        { label: "Öffnungszeiten", value: "täglich 17:00–23:00 Uhr" },
        { label: "Ticket", value: "10 € · 5 € von 13 bis 17 Jahren · frei bis 12" },
        { label: "Maße", value: "1.080 m lang, 50 m breit" },
        { label: "Ab La Mora", value: "64,3 km · ca. 50 Min. mit dem Auto" },
      ],
    },
    intro:
      "Seit Dezember 2019 lässt Castiglione del Lago auf dem Trasimenischen See einen Weihnachtsbaum aus Lichtern auf dem Wasser erstrahlen, 1.080 Meter lang: Die Veranstalter nennen ihn „den größten auf dem Wasser gebauten Weihnachtsbaum der Welt“. Er ist das Herzstück von „Luci sul Trasimeno“, das in der Ausgabe 2026/27 vom 5. Dezember bis 6. Januar läuft. Hier lesen Sie, wie Sie ihn sehen, was es kostet und wie Sie vom Agriturismo La Mora hinkommen – rund 50 Minuten entfernt.",
    introCtaHeading: "Der Baum auf dem See, die Märkte und Assisi: Übernachten Sie auf dem Land, mittendrin.",
    introCtaLabel: "Buchen",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Wie ist der Weihnachtsbaum auf dem Trasimenischen See gebaut?" },
      {
        type: "p",
        text: "Er ist ein Werk der Elektrotechnik, direkt im See errichtet: Laut den Veranstaltern lässt er sich nur im flachen Wasser des Trasimenischen Sees bauen. Die Lichter zeichnen, getragen von 166 Masten, den Umriss des Baumes auf die Wasseroberfläche, und das Schauspiel ist nie gleich: Form, Leuchtkraft und Spiegelungen ändern sich mit dem Standort und dem Wetter.",
      },
      {
        type: "facts",
        items: [
          { label: "Länge", value: "1.080 Meter" },
          { label: "Breite", value: "50 Meter" },
          { label: "Umrisslichter", value: "2.400" },
          { label: "Innere Lampen", value: "250" },
          { label: "Kabel", value: "7.165 Meter" },
          { label: "Energie", value: "100 % erneuerbar" },
        ],
      },
      { type: "h2", text: "Wann kann man den Baum auf dem Trasimenischen See sehen?" },
      {
        type: "p",
        text: "Die Ausgabe 2026/27 von Luci sul Trasimeno ist täglich vom 5. Dezember 2026 bis 6. Januar 2027 geplant, von 17:00 bis 23:00 Uhr; bei schlechtem Wetter, so die Veranstalter, können sich die Zeiten ändern. Das Tagesprogramm wurde bei Redaktionsschluss dieses Leitfadens noch aktualisiert: Prüfen Sie es auf der offiziellen Website.",
      },
      { type: "h2", text: "Von wo sieht man den Weihnachtsbaum auf dem See?" },
      {
        type: "p",
        text: "Laut den Veranstaltern ist der Baum in seiner Form und seinen Proportionen nur vom kostenpflichtigen „Percorso dell'Albero“ (Baumweg) aus zu sehen. Der Aussichtspunkt liegt im Bereich „Poggio“ unterhalb der Mauern der Rocca del Leone, der mittelalterlichen Festung von Castiglione del Lago; die Veranstaltung erstreckt sich entlang der Mauern, die Altstadt und Festung säumen, in der Via Belvedere ab der Porta Fiorentina.",
      },
      credited(ROCCA_DEL_LEONE_PHOTO, "de"),
      {
        type: "p",
        text: "In der Ausgabe 2026/27 kostet das Ticket für den Baumweg 10 Euro, 5 Euro von 13 bis 17 Jahren; für Kinder bis 12 Jahre und für Menschen mit Behinderung ist der Eintritt frei. Es umfasst auch den Babbo Natale Xmas Garden und den Sentiero del Presepe (Krippenweg) und ist an der Kasse der Veranstaltung oder online auf der offiziellen Website erhältlich.",
      },
      { type: "h2", text: "Was gibt es sonst bei Luci sul Trasimeno?" },
      {
        type: "p",
        text: "Entlang der Via Belvedere stehen die Casette del Natale, Weihnachtshütten mit Kunsthandwerk und regionalen Produkten, und die Eisbahn des Ghiaccio Park; zum Programm 2026 gehört auch „Castiglione del Lego“, eine Ausstellung mit Bausteinen. Tagsüber lohnt ein Spaziergang durch die Altstadt von Castiglione del Lago, auf einem Vorgebirge über dem See.",
      },
      credited(TRASIMENO_VELE_PHOTO, "de"),
      { type: "h2", text: "Wie kommt man von Assisi nach Castiglione del Lago?" },
      {
        type: "p",
        text: "Mit dem Auto: Vom Agriturismo La Mora sind es 64,3 km, laut Google Maps rund 50 Minuten, über den Autobahnzubringer Perugia–Bettolle. Die Veranstalter nennen zahlreiche kostenlose Parkplätze wenige Dutzend Meter von der Veranstaltung entfernt, von denen man zu Fuß in die Altstadt gelangt; an Sonn- und Feiertagen sowie am Vortag fährt ein kostenloser Shuttlebus.",
      },
      {
        type: "p",
        text: "Der Zubringer führt an Perugia vorbei, 21,0 km von La Mora: Am selben Tag können Sie dort für die Lichter und Märkte im Zentrum haltmachen, die wir im Leitfaden zu den Weihnachtsmärkten in Umbrien beschreiben.",
      },
      { type: "h2", text: "Wo übernachten, um den Baum auf dem Trasimenischen See zu sehen?" },
      {
        type: "p",
        text: "Das Agriturismo La Mora liegt auf dem Land bei Assisi, in der Via Fonte Citerna 7: Von hier sind es rund 50 Minuten nach Castiglione del Lago, 23 nach Perugia und 18 zur Basilika San Francesco. Die fünf unabhängigen Ferienwohnungen haben eine voll ausgestattete Küche, WLAN, Klimaanlage und kostenlose Parkplätze: ein Ausgangspunkt für ein Weihnachtswochenende zwischen See, Perugia und Assisi.",
      },
      {
        type: "image",
        src: LAMORA_DALL_ALTO,
        alt: "Das Agriturismo La Mora von oben: die Gebäude, der Pool, der Pavillon, der Fußballplatz und die Felder ringsum",
        caption: "Das Agriturismo La Mora von oben, auf dem Land bei Assisi.",
      },
      {
        type: "links",
        heading: "Planen Sie Ihr Wochenende",
        items: [
          { label: "Die Ferienwohnungen von La Mora", href: "/alloggi/" },
          { label: "Angebote bei Direktbuchung", href: "/offerte/" },
          { label: "Die Umgebung von La Mora", href: "/territorio/" },
          { label: "Leitfaden zu den Weihnachtsmärkten in Umbrien", href: "/blog/mercatini-di-natale-umbria/" },
          { label: "Offizielle Website von Luci sul Trasimeno", href: LUCI_TRASIMENO_URL },
        ],
      },
    ],
    faq: {
      heading: "Der Weihnachtsbaum auf dem Trasimenischen See: häufige Fragen",
      items: [
        { q: "Wann sieht man den Weihnachtsbaum auf dem Trasimenischen See?", a: "In der Ausgabe 2026/27 täglich vom 5. Dezember 2026 bis 6. Januar 2027, von 17:00 bis 23:00 Uhr. Bei schlechtem Wetter können sich die Zeiten ändern." },
        { q: "Was kostet das Ticket?", a: "2026/27 kostet das Ticket für den Percorso dell'Albero 10 Euro, 5 Euro von 13 bis 17 Jahren; bis 12 Jahre und für Menschen mit Behinderung ist der Eintritt frei. Es umfasst auch den Babbo Natale Xmas Garden und den Krippenweg." },
        { q: "Kann man den Baum ohne Ticket sehen?", a: "Laut den Veranstaltern ist der Baum in seiner Form und seinen Proportionen nur vom kostenpflichtigen Baumweg unterhalb der Mauern der Rocca del Leone aus zu sehen." },
        { q: "Wie groß ist der Baum auf dem See?", a: "1.080 Meter lang und 50 Meter breit, mit 2.400 Umrisslichtern und 250 inneren Lampen, zu 100 % mit erneuerbarer Energie betrieben." },
        { q: "Ist es derselbe Baum wie in Gubbio?", a: "Nein. Der Baum von Gubbio leuchtet seit 1981 an den Hängen des Monte Ingino und steht als größter Weihnachtsbaum der Welt im Guinness-Buch der Rekorde; der Baum am Trasimenischen See wird seit 2019 bei Castiglione del Lago auf dem Wasser errichtet." },
        { q: "Wo parkt man in Castiglione del Lago?", a: "Die Veranstalter nennen zahlreiche kostenlose Parkplätze wenige Dutzend Meter von der Veranstaltung entfernt; an Sonn- und Feiertagen sowie am Vortag fährt ein kostenloser Shuttlebus." },
        { q: "Wie weit ist das Agriturismo La Mora von Castiglione del Lago entfernt?", a: "64,3 km, laut Google Maps rund 50 Minuten mit dem Auto, über den Zubringer Perugia–Bettolle." },
      ],
    },
    finalCtaHeading: "Weihnachten am See, die Nächte auf dem Land.",
    finalCtaBody: "Wählen Sie die Ferienwohnung für Ihr Weihnachtswochenende in Umbrien.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};

const RASIGLIA_COMUNE_URL = "https://comune.foligno.pg.it/vivere-il-comune/luoghi/il-borgo-di-rasiglia/";

const RASIGLIA_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "rasiglia-piccola-venezia-umbria",
    category: "Gita di un giorno",
    title: "Rasiglia, la piccola Venezia dell'Umbria: cosa vedere e come arrivare",
    excerpt: "Rasiglia, il borgo dei ruscelli vicino a Foligno: cosa vedere tra sorgenti, cascatelle e telai, come arrivare da Assisi, parcheggio, ingresso, Infopoint ed eventi.",
    metaDescription: "Rasiglia, la piccola Venezia dell'Umbria: cosa vedere, come arrivare da Assisi in circa 37 minuti, parcheggio, ingresso, orari dell'Infopoint ed eventi.",
    ...cover(RASIGLIA_BORGO_PHOTO, "it"),
    imagePosition: "50% 85%",
    datePublished: "2026-10-06",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Dove", value: "frazione di Foligno (PG), a circa 600 m di quota" },
        { label: "Da La Mora", value: "36,5 km · circa 37 min in auto" },
        { label: "Biglietto", value: "nessuno indicato dal Comune: è un borgo abitato" },
        { label: "Eventi", value: "presepe vivente il 26 dicembre e il 6 gennaio; Penelope a Rasiglia a giugno" },
        { label: "Infopoint", value: "Località I Santi · 0742 354459" },
        { label: "Accessibilità", value: "non accessibile in sedia a rotelle" },
      ],
    },
    intro:
      "Rasiglia è un piccolo borgo medievale in comune di Foligno, a circa 600 metri di quota, attraversato da ruscelli, canali e cascatelle: per questo la chiamano «piccola Venezia dell'Umbria». Da Agriturismo La Mora, vicino ad Assisi, si arriva in circa 37 minuti. In questa guida trovi cosa vedere, come arrivare, dove lasciare l'auto, gli orari dell'Infopoint e i giorni migliori per andarci, con le informazioni del Comune di Foligno.",
    introCtaHeading: "Una gita a Rasiglia partendo dalla campagna di Assisi? Prenota il tuo appartamento.",
    introCtaLabel: "Prenota",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Perché Rasiglia è chiamata la piccola Venezia dell'Umbria?" },
      {
        type: "p",
        text: "Per l'acqua che la attraversa. Il paese, scrive il Comune di Foligno, conserva le caratteristiche del borgo medievale, raccolto in una struttura ad anfiteatro, ed è celebre soprattutto per le sue sorgenti. La principale, Capovena, nasce nella parte alta del paese, ai piedi del palazzo che i Trinci occupavano al tempo del loro governo sul territorio di Foligno: scende tra le case formando rivoli e cascatelle che si riuniscono in una grande vasca, la «Peschiera», e poi si riversano nel fiume Menotre. Altre sorgenti sono quelle di Alzabove e Venarella.",
      },
      credited(RASIGLIA_CASCATELLA_PHOTO, "it"),
      { type: "h2", text: "Cosa vedere a Rasiglia?" },
      {
        type: "p",
        text: "Rasiglia si scopre a piedi, seguendo l'acqua tra vicoli e ponticelli. Da secoli la vita del borgo è scandita dall'acqua, che muoveva la tessitura, la lavorazione della lana e la tintura: una tradizione che il Comune fa risalire al 1200.",
      },
      {
        type: "list",
        items: [
          "la sorgente di Capovena, nella parte alta del paese;",
          "la Peschiera, la grande vasca dove si riuniscono i ruscelli prima del Menotre;",
          "i mulini ad acqua e il parco archeologico-industriale del tessile;",
          "i vicoli e i ponticelli lungo i corsi d'acqua.",
        ],
      },
      credited(RASIGLIA_MULINO_PHOTO, "it"),
      {
        type: "p",
        text: "Il parco archeologico-industriale del tessile, secondo il Comune, è un raro esempio di conservazione di tutti gli elementi necessari alla produzione tessile, dalla tosatura al prodotto finito: racconta il passaggio dai telai a mano a quelli idraulici, sostituiti all'inizio del Novecento dal telaio meccanico Jacquard.",
      },
      credited(RASIGLIA_TELAIO_PHOTO, "it"),
      { type: "h2", text: "Come arrivare a Rasiglia da Assisi?" },
      {
        type: "p",
        text: "In auto: da Agriturismo La Mora sono 36,5 km, circa 37 minuti secondo Google Maps, lungo la SS75 verso Foligno e poi la SS77 della Val di Chienti. Rasiglia si trova nel Parco dell'Altolina, l'area di alta collina alle spalle di Foligno che il Comune descrive come una delle più suggestive dell'Appennino umbro-marchigiano.",
      },
      { type: "h2", text: "Dove si parcheggia a Rasiglia?" },
      {
        type: "p",
        text: "La scheda ufficiale del Comune di Foligno non indica parcheggi né regole di sosta per il borgo. Nei giorni di maggiore affluenza, come quelli del presepe vivente, possono esserci indicazioni dedicate: prima di partire chiama l'Infopoint di Rasiglia (0742 354459 o 0742 354165) o controlla il sito del Comune.",
      },
      { type: "h2", text: "Quanto costa visitare Rasiglia? Biglietti e orari" },
      {
        type: "p",
        text: "Rasiglia è un borgo abitato e la scheda del Comune non prevede biglietti d'ingresso. In Località I Santi c'è l'Infopoint di Rasiglia, aperto con questi orari (scheda del Comune aggiornata a giugno 2026):",
      },
      {
        type: "list",
        items: [
          "dal 21 marzo al 30 giugno: sabato, domenica, festivi e prefestivi, 9:00–13:00 e 15:00–19:00;",
          "dal 1° luglio al 15 settembre: tutti i giorni, 9:00–13:00 e 15:00–19:00;",
          "dal 16 settembre al 31 ottobre: sabato e domenica, 9:00–13:00 e 15:00–19:00;",
          "novembre, dicembre e gennaio: festivi e prefestivi, 9:00–13:00 e 15:00–19:00 (chiuso la mattina del 25 dicembre e del 1° gennaio);",
          "dal 1° febbraio al 20 marzo: chiuso.",
        ],
      },
      {
        type: "p",
        text: "Nella stessa scheda il borgo è indicato come non accessibile in sedia a rotelle.",
      },
      { type: "h2", text: "Quando andare a Rasiglia?" },
      {
        type: "p",
        text: "Il borgo si visita tutto l'anno, e due appuntamenti valgono il viaggio: «Rasiglia, Paese presepe», il presepe vivente del 26 dicembre e del 6 gennaio, e «Penelope a Rasiglia», dedicata agli antichi mestieri della tessitura, il primo fine settimana di giugno (compatibilmente con le altre festività nazionali). D'estate, dal 1° luglio al 15 settembre, l'Infopoint è aperto tutti i giorni.",
      },
      { type: "h2", text: "Cosa vedere vicino a Rasiglia?" },
      {
        type: "p",
        text: "Il Parco dell'Altolina è un territorio di alta collina rimasto da sempre isolato rispetto alla via Flaminia e alla Valle Umbra: il Comune lo descrive disseminato di luoghi ameni e di borghi che sembrano essersi fermati nel tempo. A dicembre puoi abbinare il presepe di Rasiglia ai mercatini di Natale in Umbria; nella bella stagione, alle altre gite di un giorno da La Mora, come le Cascate delle Marmore.",
      },
      { type: "h2", text: "Dove dormire per visitare Rasiglia?" },
      {
        type: "p",
        text: "Agriturismo La Mora, in via Fonte Citerna 7 nella campagna di Assisi, è a 36,5 km da Rasiglia, circa 37 minuti in auto. I cinque appartamenti indipendenti hanno cucina attrezzata, Wi-Fi, aria condizionata e parcheggio gratuito; d'estate, dopo una giornata tra ruscelli e vicoli, c'è la piscina, aperta dal 1° maggio al 28 settembre, dalle 9:00 alle 19:00.",
      },
      {
        type: "image",
        src: LAMORA_PISCINA,
        alt: "La piscina di Agriturismo La Mora in una giornata di sole, con l'acqua azzurra, il prato e le siepi intorno",
        caption: "La piscina di La Mora in una giornata di sole.",
      },
      {
        type: "links",
        heading: "Organizza la gita",
        items: [
          { label: "Gli appartamenti di La Mora", href: "/alloggi/" },
          { label: "Le offerte per chi prenota diretto", href: "/offerte/" },
          { label: "Il territorio intorno a La Mora", href: "/territorio/" },
          { label: "Guida ai mercatini di Natale in Umbria", href: "/blog/mercatini-di-natale-umbria/" },
          { label: "Guida alle Cascate delle Marmore", href: "/blog/cascate-delle-marmore/" },
          { label: "Scheda ufficiale di Rasiglia (Comune di Foligno)", href: RASIGLIA_COMUNE_URL },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti su Rasiglia",
      items: [
        { q: "Dove si trova Rasiglia?", a: "È una frazione del comune di Foligno, in Umbria, a circa 600 metri di quota, nel Parco dell'Altolina. Da Agriturismo La Mora, vicino ad Assisi, sono 36,5 km." },
        { q: "Perché Rasiglia è chiamata la piccola Venezia dell'Umbria?", a: "Per i ruscelli, i canali e le cascatelle che attraversano il paese, alimentati dalle sorgenti di Capovena, Alzabove e Venarella." },
        { q: "Si paga per entrare a Rasiglia?", a: "La scheda ufficiale del Comune di Foligno non indica biglietti d'ingresso: Rasiglia è un borgo abitato, che si visita passeggiando." },
        { q: "Come si arriva a Rasiglia da Assisi?", a: "In auto, lungo la SS75 verso Foligno e poi la SS77 della Val di Chienti: da Agriturismo La Mora sono 36,5 km, circa 37 minuti secondo Google Maps." },
        { q: "Quando c'è il presepe vivente di Rasiglia?", a: "«Rasiglia, Paese presepe» si svolge il 26 dicembre e il 6 gennaio." },
        { q: "Rasiglia è accessibile in sedia a rotelle?", a: "No: la scheda del Comune di Foligno indica il borgo come non accessibile in sedia a rotelle." },
        { q: "Quando è aperto l'Infopoint di Rasiglia?", a: "Tutti i giorni dal 1° luglio al 15 settembre; nel weekend o nei festivi e prefestivi negli altri mesi, dalle 9:00 alle 13:00 e dalle 15:00 alle 19:00. È chiuso dal 1° febbraio al 20 marzo." },
      ],
    },
    finalCtaHeading: "Una giornata tra ruscelli e vicoli, la sera in campagna.",
    finalCtaBody: "Scegli l'appartamento giusto per la tua gita in Umbria.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "rasiglia-piccola-venezia-umbria",
    category: "Day trip",
    title: "Rasiglia, the little Venice of Umbria: what to see and how to get there",
    excerpt: "Rasiglia, the village of streams near Foligno: what to see among springs, little waterfalls and looms, how to get there from Assisi, parking, admission, the Infopoint and events.",
    metaDescription: "Rasiglia, the little Venice of Umbria: what to see, how to get there from Assisi in about 37 minutes, parking, admission, Infopoint hours and events.",
    ...cover(RASIGLIA_BORGO_PHOTO, "en"),
    imagePosition: "50% 85%",
    datePublished: "2026-10-06",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Where", value: "a hamlet of Foligno (PG), at about 600 m" },
        { label: "From La Mora", value: "36.5 km · about 37 min by car" },
        { label: "Ticket", value: "none listed by the municipality: it's a lived-in village" },
        { label: "Events", value: "living nativity on 26 December and 6 January; Penelope a Rasiglia in June" },
        { label: "Infopoint", value: "Località I Santi · +39 0742 354459" },
        { label: "Accessibility", value: "not wheelchair accessible" },
      ],
    },
    intro:
      "Rasiglia is a small medieval village in the municipality of Foligno, at about 600 metres above sea level, crossed by streams, channels and little waterfalls: that's why it's called the “little Venice of Umbria”. From Agriturismo La Mora, near Assisi, it takes about 37 minutes to get there. This guide covers what to see, how to get there, where to leave the car, Infopoint opening hours and the best days to go, based on information from the Municipality of Foligno.",
    introCtaHeading: "A day trip to Rasiglia from the countryside outside Assisi? Book your apartment.",
    introCtaLabel: "Book",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Why is Rasiglia called the little Venice of Umbria?" },
      {
        type: "p",
        text: "Because of the water running through it. The village, writes the Municipality of Foligno, keeps the features of a medieval borgo, gathered in an amphitheatre shape, and is famous above all for its springs. The main one, Capovena, rises in the upper part of the village, at the foot of the palace the Trinci family occupied when they ruled the Foligno area: it flows down between the houses in rivulets and little waterfalls that collect in a large basin, the “Peschiera”, and then pour into the river Menotre. The other springs are Alzabove and Venarella.",
      },
      credited(RASIGLIA_CASCATELLA_PHOTO, "en"),
      { type: "h2", text: "What is there to see in Rasiglia?" },
      {
        type: "p",
        text: "Rasiglia is best discovered on foot, following the water through lanes and over little bridges. For centuries life here has been shaped by water, which powered weaving, wool working and dyeing: a tradition the municipality dates back to the 1200s.",
      },
      {
        type: "list",
        items: [
          "the Capovena spring, in the upper part of the village;",
          "the Peschiera, the large basin where the streams meet before the Menotre;",
          "the water mills and the textile archaeological-industrial park;",
          "the lanes and little bridges along the watercourses.",
        ],
      },
      credited(RASIGLIA_MULINO_PHOTO, "en"),
      {
        type: "p",
        text: "According to the municipality, the textile archaeological-industrial park is a rare example of the preservation of every element needed for textile production, from shearing to the finished product: it tells the story of the move from hand looms to hydraulic ones, replaced in the early 20th century by the mechanical Jacquard loom.",
      },
      credited(RASIGLIA_TELAIO_PHOTO, "en"),
      { type: "h2", text: "How do you get to Rasiglia from Assisi?" },
      {
        type: "p",
        text: "By car: from Agriturismo La Mora it's 36.5 km, about 37 minutes according to Google Maps, along the SS75 towards Foligno and then the SS77 Val di Chienti road. Rasiglia lies in the Parco dell'Altolina, the hill country behind Foligno that the municipality describes as one of the most striking areas of the Umbria–Marche Apennines.",
      },
      { type: "h2", text: "Where can you park in Rasiglia?" },
      {
        type: "p",
        text: "The Municipality of Foligno's official page does not list car parks or parking rules for the village. On the busiest days, such as those of the living nativity, there may be specific arrangements: before you set off, call the Rasiglia Infopoint (+39 0742 354459 or +39 0742 354165) or check the municipality's website.",
      },
      { type: "h2", text: "How much does it cost to visit Rasiglia? Tickets and opening hours" },
      {
        type: "p",
        text: "Rasiglia is a lived-in village and the municipality's page lists no admission ticket. In Località I Santi you'll find the Rasiglia Infopoint, open at these times (municipality page updated in June 2026):",
      },
      {
        type: "list",
        items: [
          "21 March to 30 June: Saturdays, Sundays, public holidays and the days before them, 9:00–13:00 and 15:00–19:00;",
          "1 July to 15 September: every day, 9:00–13:00 and 15:00–19:00;",
          "16 September to 31 October: Saturdays and Sundays, 9:00–13:00 and 15:00–19:00;",
          "November, December and January: public holidays and the days before them, 9:00–13:00 and 15:00–19:00 (closed on the mornings of 25 December and 1 January);",
          "1 February to 20 March: closed.",
        ],
      },
      {
        type: "p",
        text: "The same page lists the village as not wheelchair accessible.",
      },
      { type: "h2", text: "When is the best time to visit Rasiglia?" },
      {
        type: "p",
        text: "The village can be visited all year round, and two events are worth the trip: “Rasiglia, Paese presepe”, the living nativity on 26 December and 6 January, and “Penelope a Rasiglia”, devoted to the old weaving crafts, on the first weekend of June (depending on other national holidays). In summer, from 1 July to 15 September, the Infopoint is open every day.",
      },
      { type: "h2", text: "What else is there to see near Rasiglia?" },
      {
        type: "p",
        text: "The Parco dell'Altolina is hill country that has always stayed apart from the Via Flaminia and the Umbrian Valley: the municipality describes it as dotted with pleasant spots and villages that seem to have stopped in time. In December you can combine the Rasiglia nativity with the Christmas markets in Umbria; in the warmer months, with other day trips from La Mora, such as the Marmore Falls.",
      },
      { type: "h2", text: "Where to stay to visit Rasiglia?" },
      {
        type: "p",
        text: "Agriturismo La Mora, at Via Fonte Citerna 7 in the countryside outside Assisi, is 36.5 km from Rasiglia, about 37 minutes by car. The five independent apartments have a fully equipped kitchen, Wi-Fi, air conditioning and free parking; in summer, after a day among streams and lanes, there's the pool, open from 1 May to 28 September, from 9:00 to 19:00.",
      },
      {
        type: "image",
        src: LAMORA_PISCINA,
        alt: "The swimming pool at Agriturismo La Mora on a sunny day, with blue water, the lawn and hedges around",
        caption: "La Mora's pool on a sunny day.",
      },
      {
        type: "links",
        heading: "Plan your day trip",
        items: [
          { label: "La Mora's apartments", href: "/alloggi/" },
          { label: "Offers for direct bookings", href: "/offerte/" },
          { label: "The area around La Mora", href: "/territorio/" },
          { label: "Guide to the Christmas markets in Umbria", href: "/blog/mercatini-di-natale-umbria/" },
          { label: "Guide to the Marmore Falls", href: "/blog/cascate-delle-marmore/" },
          { label: "Official Rasiglia page (Municipality of Foligno)", href: RASIGLIA_COMUNE_URL },
        ],
      },
    ],
    faq: {
      heading: "Rasiglia: frequently asked questions",
      items: [
        { q: "Where is Rasiglia?", a: "It's a hamlet of the municipality of Foligno, in Umbria, at about 600 metres above sea level, in the Parco dell'Altolina. From Agriturismo La Mora, near Assisi, it's 36.5 km." },
        { q: "Why is Rasiglia called the little Venice of Umbria?", a: "Because of the streams, channels and little waterfalls that run through the village, fed by the Capovena, Alzabove and Venarella springs." },
        { q: "Do you have to pay to enter Rasiglia?", a: "The Municipality of Foligno's official page lists no admission ticket: Rasiglia is a lived-in village that you visit on foot." },
        { q: "How do you get to Rasiglia from Assisi?", a: "By car, along the SS75 towards Foligno and then the SS77 Val di Chienti road: from Agriturismo La Mora it's 36.5 km, about 37 minutes according to Google Maps." },
        { q: "When is the living nativity in Rasiglia?", a: "“Rasiglia, Paese presepe” takes place on 26 December and 6 January." },
        { q: "Is Rasiglia wheelchair accessible?", a: "No: the Municipality of Foligno's page lists the village as not wheelchair accessible." },
        { q: "When is the Rasiglia Infopoint open?", a: "Every day from 1 July to 15 September; at weekends or on public holidays and the days before them in the other months, from 9:00 to 13:00 and 15:00 to 19:00. It is closed from 1 February to 20 March." },
      ],
    },
    finalCtaHeading: "A day among streams and lanes, evenings in the countryside.",
    finalCtaBody: "Choose the right apartment for your day trips in Umbria.",
    finalCtaLabel: "Discover the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "rasiglia-piccola-venezia-umbria",
    category: "Excursion d'une journée",
    title: "Rasiglia, la petite Venise de l'Ombrie : que voir et comment y aller",
    excerpt: "Rasiglia, le village des ruisseaux près de Foligno : que voir entre sources, cascatelles et métiers à tisser, comment venir depuis Assise, parking, entrée, Infopoint et événements.",
    metaDescription: "Rasiglia, la petite Venise de l'Ombrie : que voir, comment y aller depuis Assise en 37 minutes environ, parking, entrée, horaires de l'Infopoint, événements.",
    ...cover(RASIGLIA_BORGO_PHOTO, "fr"),
    imagePosition: "50% 85%",
    datePublished: "2026-10-06",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "Où", value: "hameau de Foligno (PG), à environ 600 m d'altitude" },
        { label: "Depuis La Mora", value: "36,5 km · env. 37 min en voiture" },
        { label: "Billet", value: "aucun indiqué par la commune : c'est un village habité" },
        { label: "Événements", value: "crèche vivante les 26 décembre et 6 janvier ; Penelope a Rasiglia en juin" },
        { label: "Infopoint", value: "Località I Santi · +39 0742 354459" },
        { label: "Accessibilité", value: "non accessible en fauteuil roulant" },
      ],
    },
    intro:
      "Rasiglia est un petit village médiéval de la commune de Foligno, à environ 600 mètres d'altitude, traversé par des ruisseaux, des canaux et des cascatelles : c'est pourquoi on l'appelle la « petite Venise de l'Ombrie ». Depuis l'Agriturismo La Mora, près d'Assise, on y arrive en 37 minutes environ. Ce guide indique que voir, comment y aller, où laisser la voiture, les horaires de l'Infopoint et les meilleurs moments pour y aller, d'après les informations de la commune de Foligno.",
    introCtaHeading: "Une excursion à Rasiglia depuis la campagne d'Assise ? Réservez votre appartement.",
    introCtaLabel: "Réserver",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Pourquoi appelle-t-on Rasiglia la petite Venise de l'Ombrie ?" },
      {
        type: "p",
        text: "Pour l'eau qui la traverse. Le village, écrit la commune de Foligno, a gardé les caractéristiques d'un bourg médiéval, rassemblé en amphithéâtre, et il est surtout célèbre pour ses sources. La principale, Capovena, jaillit dans le haut du village, au pied du palais qu'occupaient les Trinci au temps où ils gouvernaient le territoire de Foligno : elle descend entre les maisons en ruisselets et cascatelles qui se rejoignent dans un grand bassin, la « Peschiera », avant de se jeter dans la rivière Menotre. Les autres sources sont celles d'Alzabove et de Venarella.",
      },
      credited(RASIGLIA_CASCATELLA_PHOTO, "fr"),
      { type: "h2", text: "Que voir à Rasiglia ?" },
      {
        type: "p",
        text: "Rasiglia se découvre à pied, en suivant l'eau entre ruelles et petits ponts. Depuis des siècles, la vie du village est rythmée par l'eau, qui faisait tourner le tissage, le travail de la laine et la teinture : une tradition que la commune fait remonter au XIIIe siècle.",
      },
      {
        type: "list",
        items: [
          "la source de Capovena, dans le haut du village ;",
          "la Peschiera, le grand bassin où se rejoignent les ruisseaux avant le Menotre ;",
          "les moulins à eau et le parc archéologique et industriel du textile ;",
          "les ruelles et les petits ponts le long des cours d'eau.",
        ],
      },
      credited(RASIGLIA_MULINO_PHOTO, "fr"),
      {
        type: "p",
        text: "Selon la commune, le parc archéologique et industriel du textile est un rare exemple de conservation de tous les éléments nécessaires à la production textile, de la tonte au produit fini : il raconte le passage des métiers à tisser manuels aux métiers hydrauliques, remplacés au début du XXe siècle par le métier mécanique Jacquard.",
      },
      credited(RASIGLIA_TELAIO_PHOTO, "fr"),
      { type: "h2", text: "Comment aller à Rasiglia depuis Assise ?" },
      {
        type: "p",
        text: "En voiture : depuis l'Agriturismo La Mora, il y a 36,5 km, environ 37 minutes selon Google Maps, par la SS75 en direction de Foligno puis la SS77 du Val di Chienti. Rasiglia se trouve dans le Parco dell'Altolina, la zone de hautes collines derrière Foligno que la commune décrit comme l'une des plus belles de l'Apennin ombrien et marchesan.",
      },
      { type: "h2", text: "Où se garer à Rasiglia ?" },
      {
        type: "p",
        text: "La page officielle de la commune de Foligno n'indique ni parkings ni règles de stationnement pour le village. Les jours de grande affluence, comme ceux de la crèche vivante, des dispositions particulières peuvent être prises : avant de partir, appelez l'Infopoint de Rasiglia (+39 0742 354459 ou +39 0742 354165) ou consultez le site de la commune.",
      },
      { type: "h2", text: "Combien coûte la visite de Rasiglia ? Billets et horaires" },
      {
        type: "p",
        text: "Rasiglia est un village habité et la page de la commune ne prévoit aucun billet d'entrée. À Località I Santi se trouve l'Infopoint de Rasiglia, ouvert aux horaires suivants (page de la commune mise à jour en juin 2026) :",
      },
      {
        type: "list",
        items: [
          "du 21 mars au 30 juin : samedi, dimanche, jours fériés et veilles de fêtes, 9h00–13h00 et 15h00–19h00 ;",
          "du 1er juillet au 15 septembre : tous les jours, 9h00–13h00 et 15h00–19h00 ;",
          "du 16 septembre au 31 octobre : samedi et dimanche, 9h00–13h00 et 15h00–19h00 ;",
          "novembre, décembre et janvier : jours fériés et veilles de fêtes, 9h00–13h00 et 15h00–19h00 (fermé le matin du 25 décembre et du 1er janvier) ;",
          "du 1er février au 20 mars : fermé.",
        ],
      },
      {
        type: "p",
        text: "La même page indique que le village n'est pas accessible en fauteuil roulant.",
      },
      { type: "h2", text: "Quand aller à Rasiglia ?" },
      {
        type: "p",
        text: "Le village se visite toute l'année, et deux rendez-vous valent le voyage : « Rasiglia, Paese presepe », la crèche vivante du 26 décembre et du 6 janvier, et « Penelope a Rasiglia », consacrée aux anciens métiers du tissage, le premier week-end de juin (selon les autres fêtes nationales). En été, du 1er juillet au 15 septembre, l'Infopoint est ouvert tous les jours.",
      },
      { type: "h2", text: "Que voir près de Rasiglia ?" },
      {
        type: "p",
        text: "Le Parco dell'Altolina est un territoire de hautes collines resté de tout temps à l'écart de la via Flaminia et de la Valle Umbra : la commune le décrit parsemé de lieux charmants et de villages qui semblent arrêtés dans le temps. En décembre, vous pouvez combiner la crèche de Rasiglia avec les marchés de Noël en Ombrie ; à la belle saison, avec d'autres excursions d'une journée depuis La Mora, comme les cascades des Marmore.",
      },
      { type: "h2", text: "Où dormir pour visiter Rasiglia ?" },
      {
        type: "p",
        text: "L'Agriturismo La Mora, via Fonte Citerna 7 dans la campagne d'Assise, est à 36,5 km de Rasiglia, environ 37 minutes en voiture. Les cinq appartements indépendants ont une cuisine équipée, le Wi-Fi, la climatisation et un parking gratuit ; en été, après une journée entre ruisseaux et ruelles, il y a la piscine, ouverte du 1er mai au 28 septembre, de 9h00 à 19h00.",
      },
      {
        type: "image",
        src: LAMORA_PISCINA,
        alt: "La piscine de l'Agriturismo La Mora par une journée ensoleillée, avec l'eau bleue, la pelouse et les haies autour",
        caption: "La piscine de La Mora par une journée ensoleillée.",
      },
      {
        type: "links",
        heading: "Organisez l'excursion",
        items: [
          { label: "Les appartements de La Mora", href: "/alloggi/" },
          { label: "Les offres en réservation directe", href: "/offerte/" },
          { label: "Les environs de La Mora", href: "/territorio/" },
          { label: "Guide des marchés de Noël en Ombrie", href: "/blog/mercatini-di-natale-umbria/" },
          { label: "Guide des cascades des Marmore", href: "/blog/cascate-delle-marmore/" },
          { label: "Page officielle de Rasiglia (commune de Foligno)", href: RASIGLIA_COMUNE_URL },
        ],
      },
    ],
    faq: {
      heading: "Rasiglia : questions fréquentes",
      items: [
        { q: "Où se trouve Rasiglia ?", a: "C'est un hameau de la commune de Foligno, en Ombrie, à environ 600 mètres d'altitude, dans le Parco dell'Altolina. Depuis l'Agriturismo La Mora, près d'Assise, il y a 36,5 km." },
        { q: "Pourquoi appelle-t-on Rasiglia la petite Venise de l'Ombrie ?", a: "Pour les ruisseaux, les canaux et les cascatelles qui traversent le village, alimentés par les sources de Capovena, d'Alzabove et de Venarella." },
        { q: "Faut-il payer pour entrer à Rasiglia ?", a: "La page officielle de la commune de Foligno n'indique aucun billet d'entrée : Rasiglia est un village habité, qui se visite à pied." },
        { q: "Comment aller à Rasiglia depuis Assise ?", a: "En voiture, par la SS75 en direction de Foligno puis la SS77 du Val di Chienti : depuis l'Agriturismo La Mora, il y a 36,5 km, environ 37 minutes selon Google Maps." },
        { q: "Quand a lieu la crèche vivante de Rasiglia ?", a: "« Rasiglia, Paese presepe » a lieu le 26 décembre et le 6 janvier." },
        { q: "Rasiglia est-elle accessible en fauteuil roulant ?", a: "Non : la page de la commune de Foligno indique que le village n'est pas accessible en fauteuil roulant." },
        { q: "Quand l'Infopoint de Rasiglia est-il ouvert ?", a: "Tous les jours du 1er juillet au 15 septembre ; le week-end ou les jours fériés et veilles de fêtes les autres mois, de 9h00 à 13h00 et de 15h00 à 19h00. Il est fermé du 1er février au 20 mars." },
      ],
    },
    finalCtaHeading: "Une journée entre ruisseaux et ruelles, le soir à la campagne.",
    finalCtaBody: "Choisissez l'appartement qui convient à vos excursions en Ombrie.",
    finalCtaLabel: "Découvrir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "rasiglia-piccola-venezia-umbria",
    category: "Tagesausflug",
    title: "Rasiglia, das kleine Venedig Umbriens: Sehenswertes und Anreise",
    excerpt: "Rasiglia, das Dorf der Bäche bei Foligno: Sehenswertes zwischen Quellen, kleinen Wasserfällen und Webstühlen, Anreise ab Assisi, Parken, Eintritt, Infopoint und Veranstaltungen.",
    metaDescription: "Rasiglia, das kleine Venedig Umbriens: Sehenswertes, Anreise ab Assisi in rund 37 Minuten, Parken, Eintritt, Öffnungszeiten des Infopoints, Termine.",
    ...cover(RASIGLIA_BORGO_PHOTO, "de"),
    imagePosition: "50% 85%",
    datePublished: "2026-10-06",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "Wo", value: "Ortsteil von Foligno (PG), auf rund 600 m Höhe" },
        { label: "Ab La Mora", value: "36,5 km · ca. 37 Min. mit dem Auto" },
        { label: "Eintritt", value: "laut Gemeinde kein Ticket: ein bewohntes Dorf" },
        { label: "Termine", value: "lebende Krippe am 26. Dezember und 6. Januar; Penelope a Rasiglia im Juni" },
        { label: "Infopoint", value: "Località I Santi · +39 0742 354459" },
        { label: "Barrierefreiheit", value: "nicht rollstuhlgerecht" },
      ],
    },
    intro:
      "Rasiglia ist ein kleines mittelalterliches Dorf in der Gemeinde Foligno, auf rund 600 Metern Höhe, durchzogen von Bächen, Kanälen und kleinen Wasserfällen: Deshalb nennt man es das „kleine Venedig Umbriens“. Vom Agriturismo La Mora bei Assisi erreichen Sie es in rund 37 Minuten. Dieser Leitfaden zeigt, was es zu sehen gibt, wie Sie hinkommen, wo Sie das Auto abstellen, die Öffnungszeiten des Infopoints und die besten Tage für einen Besuch – nach den Angaben der Gemeinde Foligno.",
    introCtaHeading: "Ein Ausflug nach Rasiglia vom Land bei Assisi aus? Buchen Sie Ihre Ferienwohnung.",
    introCtaLabel: "Buchen",
    introCtaHref: BOOKING_MODAL_HREF,
    content: [
      { type: "h2", text: "Warum heißt Rasiglia das kleine Venedig Umbriens?" },
      {
        type: "p",
        text: "Wegen des Wassers, das es durchfließt. Das Dorf, schreibt die Gemeinde Foligno, hat die Züge eines mittelalterlichen Borgo bewahrt, amphitheaterförmig angelegt, und ist vor allem für seine Quellen berühmt. Die wichtigste, Capovena, entspringt im oberen Teil des Dorfes, am Fuß des Palastes, den die Familie Trinci zur Zeit ihrer Herrschaft über das Gebiet von Foligno bewohnte: Sie fließt in Rinnsalen und kleinen Wasserfällen zwischen den Häusern hinab, die sich in einem großen Becken, der „Peschiera“, sammeln und dann in den Fluss Menotre münden. Weitere Quellen sind Alzabove und Venarella.",
      },
      credited(RASIGLIA_CASCATELLA_PHOTO, "de"),
      { type: "h2", text: "Was gibt es in Rasiglia zu sehen?" },
      {
        type: "p",
        text: "Rasiglia entdeckt man zu Fuß, immer dem Wasser nach, durch Gassen und über kleine Brücken. Seit Jahrhunderten bestimmt das Wasser das Leben im Dorf: Es trieb Weberei, Wollverarbeitung und Färberei an – eine Tradition, die die Gemeinde auf das 13. Jahrhundert zurückführt.",
      },
      {
        type: "list",
        items: [
          "die Quelle Capovena im oberen Teil des Dorfes;",
          "die Peschiera, das große Becken, in dem sich die Bäche vor dem Menotre sammeln;",
          "die Wassermühlen und den archäologisch-industriellen Textilpark;",
          "die Gassen und kleinen Brücken entlang der Wasserläufe.",
        ],
      },
      credited(RASIGLIA_MULINO_PHOTO, "de"),
      {
        type: "p",
        text: "Laut der Gemeinde ist der archäologisch-industrielle Textilpark ein seltenes Beispiel dafür, dass alle für die Textilherstellung nötigen Elemente erhalten sind, von der Schur bis zum fertigen Produkt: Er erzählt vom Übergang vom Handwebstuhl zum wassergetriebenen Webstuhl, der Anfang des 20. Jahrhunderts vom mechanischen Jacquard-Webstuhl abgelöst wurde.",
      },
      credited(RASIGLIA_TELAIO_PHOTO, "de"),
      { type: "h2", text: "Wie kommt man von Assisi nach Rasiglia?" },
      {
        type: "p",
        text: "Mit dem Auto: Vom Agriturismo La Mora sind es 36,5 km, laut Google Maps rund 37 Minuten, über die SS75 Richtung Foligno und dann die SS77 della Val di Chienti. Rasiglia liegt im Parco dell'Altolina, dem Hügelland hinter Foligno, das die Gemeinde als eine der eindrucksvollsten Gegenden des umbrisch-marchigianischen Apennins beschreibt.",
      },
      { type: "h2", text: "Wo parkt man in Rasiglia?" },
      {
        type: "p",
        text: "Die offizielle Seite der Gemeinde Foligno nennt für das Dorf weder Parkplätze noch Parkregeln. An Tagen mit großem Andrang, etwa bei der lebenden Krippe, kann es eigene Regelungen geben: Rufen Sie vor der Abfahrt beim Infopoint Rasiglia an (+39 0742 354459 oder +39 0742 354165) oder sehen Sie auf der Website der Gemeinde nach.",
      },
      { type: "h2", text: "Was kostet ein Besuch in Rasiglia? Tickets und Öffnungszeiten" },
      {
        type: "p",
        text: "Rasiglia ist ein bewohntes Dorf, und die Seite der Gemeinde sieht kein Eintrittsticket vor. In der Località I Santi befindet sich der Infopoint Rasiglia, zu diesen Zeiten geöffnet (Seite der Gemeinde, Stand Juni 2026):",
      },
      {
        type: "list",
        items: [
          "21. März bis 30. Juni: samstags, sonntags, an Feiertagen und deren Vortagen, 9:00–13:00 und 15:00–19:00 Uhr;",
          "1. Juli bis 15. September: täglich, 9:00–13:00 und 15:00–19:00 Uhr;",
          "16. September bis 31. Oktober: samstags und sonntags, 9:00–13:00 und 15:00–19:00 Uhr;",
          "November, Dezember und Januar: an Feiertagen und deren Vortagen, 9:00–13:00 und 15:00–19:00 Uhr (am Vormittag des 25. Dezember und des 1. Januar geschlossen);",
          "1. Februar bis 20. März: geschlossen.",
        ],
      },
      {
        type: "p",
        text: "Auf derselben Seite wird das Dorf als nicht rollstuhlgerecht angegeben.",
      },
      { type: "h2", text: "Wann ist die beste Zeit für Rasiglia?" },
      {
        type: "p",
        text: "Das Dorf lässt sich das ganze Jahr über besuchen, und zwei Termine lohnen die Reise besonders: „Rasiglia, Paese presepe“, die lebende Krippe am 26. Dezember und am 6. Januar, und „Penelope a Rasiglia“, den alten Webhandwerken gewidmet, am ersten Juniwochenende (je nach den übrigen Nationalfeiertagen). Im Sommer, vom 1. Juli bis 15. September, ist der Infopoint täglich geöffnet.",
      },
      { type: "h2", text: "Was gibt es in der Nähe von Rasiglia zu sehen?" },
      {
        type: "p",
        text: "Der Parco dell'Altolina ist ein Hügelland, das seit jeher abseits der Via Flaminia und des Umbrischen Tals liegt: Die Gemeinde beschreibt es als übersät mit lieblichen Orten und Dörfern, in denen die Zeit stehen geblieben scheint. Im Dezember lässt sich die Krippe von Rasiglia mit den Weihnachtsmärkten in Umbrien verbinden; in der warmen Jahreszeit mit anderen Tagesausflügen ab La Mora, etwa zu den Marmore-Wasserfällen.",
      },
      { type: "h2", text: "Wo übernachten für einen Besuch in Rasiglia?" },
      {
        type: "p",
        text: "Das Agriturismo La Mora in der Via Fonte Citerna 7, auf dem Land bei Assisi, liegt 36,5 km von Rasiglia entfernt, rund 37 Minuten mit dem Auto. Die fünf unabhängigen Ferienwohnungen haben eine voll ausgestattete Küche, WLAN, Klimaanlage und kostenlose Parkplätze; im Sommer wartet nach einem Tag zwischen Bächen und Gassen der Pool, geöffnet vom 1. Mai bis 28. September von 9:00 bis 19:00 Uhr.",
      },
      {
        type: "image",
        src: LAMORA_PISCINA,
        alt: "Der Pool des Agriturismo La Mora an einem sonnigen Tag, mit blauem Wasser, Rasen und Hecken ringsum",
        caption: "Der Pool von La Mora an einem sonnigen Tag.",
      },
      {
        type: "links",
        heading: "Planen Sie Ihren Ausflug",
        items: [
          { label: "Die Ferienwohnungen von La Mora", href: "/alloggi/" },
          { label: "Angebote bei Direktbuchung", href: "/offerte/" },
          { label: "Die Umgebung von La Mora", href: "/territorio/" },
          { label: "Leitfaden zu den Weihnachtsmärkten in Umbrien", href: "/blog/mercatini-di-natale-umbria/" },
          { label: "Leitfaden zu den Marmore-Wasserfällen", href: "/blog/cascate-delle-marmore/" },
          { label: "Offizielle Seite zu Rasiglia (Gemeinde Foligno)", href: RASIGLIA_COMUNE_URL },
        ],
      },
    ],
    faq: {
      heading: "Rasiglia: häufige Fragen",
      items: [
        { q: "Wo liegt Rasiglia?", a: "Rasiglia ist ein Ortsteil der Gemeinde Foligno in Umbrien, auf rund 600 Metern Höhe im Parco dell'Altolina. Vom Agriturismo La Mora bei Assisi sind es 36,5 km." },
        { q: "Warum heißt Rasiglia das kleine Venedig Umbriens?", a: "Wegen der Bäche, Kanäle und kleinen Wasserfälle, die das Dorf durchziehen, gespeist von den Quellen Capovena, Alzabove und Venarella." },
        { q: "Kostet Rasiglia Eintritt?", a: "Die offizielle Seite der Gemeinde Foligno nennt kein Eintrittsticket: Rasiglia ist ein bewohntes Dorf, das man zu Fuß erkundet." },
        { q: "Wie kommt man von Assisi nach Rasiglia?", a: "Mit dem Auto über die SS75 Richtung Foligno und dann die SS77 della Val di Chienti: Vom Agriturismo La Mora sind es 36,5 km, laut Google Maps rund 37 Minuten." },
        { q: "Wann findet die lebende Krippe in Rasiglia statt?", a: "„Rasiglia, Paese presepe“ findet am 26. Dezember und am 6. Januar statt." },
        { q: "Ist Rasiglia rollstuhlgerecht?", a: "Nein: Die Seite der Gemeinde Foligno gibt das Dorf als nicht rollstuhlgerecht an." },
        { q: "Wann ist der Infopoint Rasiglia geöffnet?", a: "Täglich vom 1. Juli bis 15. September; in den übrigen Monaten am Wochenende oder an Feiertagen und deren Vortagen, von 9:00 bis 13:00 und 15:00 bis 19:00 Uhr. Vom 1. Februar bis 20. März ist er geschlossen." },
      ],
    },
    finalCtaHeading: "Ein Tag zwischen Bächen und Gassen, abends auf dem Land.",
    finalCtaBody: "Wählen Sie die passende Ferienwohnung für Ihre Ausflüge in Umbrien.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};

const BLOG_POSTS_BY_LOCALE: Record<Locale, BlogPost[]> = {
  it: [
    EUROCHOCOLATE_POST.it,
    CARLO_ACUTIS_POST.it,
    NATALE_UMBRIA_POST.it,
    ALBERO_TRASIMENO_POST.it,
    RASIGLIA_POST.it,
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "Territorio",
      title: "Santa Maria degli Angeli: basilica, Porziuncola e cappella",
      excerpt: "La basilica che custodisce la Porziuncola e la Cappella del Transito, a 2,1 km da La Mora: cosa vedere, orari e ingresso.",
      metaDescription: "La Basilica di Santa Maria degli Angeli ad Assisi custodisce la Porziuncola e la Cappella del Transito. Orari, ingresso gratuito e dove dormire a 2,1 km.",
      image: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg",
      alt: "Facciata della Basilica di Santa Maria degli Angeli, ad Assisi",
      inBreve: {
        heading: "In breve",
        items: [
          { label: "Dentro la basilica", value: "Porziuncola e Cappella del Transito" },
          { label: "Orari", value: "Tutti i giorni 7:30–12:30 e 14:30–19:00" },
          { label: "Ingresso", value: "Gratuito" },
          { label: "Da Agriturismo La Mora", value: "2,1 km in auto" },
        ],
      },
      intro:
        "A 2,1 km da Agriturismo La Mora, nella piana sotto Assisi, la Basilica di Santa Maria degli Angeli fu costruita tra il 1569 e il 1679, su progetto di Galeazzo Alessi, intorno a una chiesetta molto più piccola e antica: la Porziuncola.",
      introCtaHeading: "Programmi la visita? Scegli dove alloggiare a 2,1 km dalla Basilica.",
      introCtaLabel: "Scopri gli appartamenti",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "La Porziuncola, il cuore dentro il cuore" },
        {
          type: "p",
          text: "La Porziuncola è la piccola chiesa che Francesco restaurò e dove comprese la propria vocazione: qui fondò l'Ordine dei Frati Minori, nel 1212 accolse Chiara e ottenne il Perdono di Assisi, l'indulgenza plenaria. Per proteggerla e accogliere i pellegrini, intorno a lei venne costruita un'enorme basilica: oggi, entrando, ci si trova davanti a una cappella minuscola sotto una cupola immensa — un contrasto che racconta, meglio di qualunque descrizione, la distanza tra la semplicità originaria di Francesco e il modo in cui la sua eredità è stata poi celebrata.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
          alt: "Interno della Porziuncola, all'interno della Basilica di Santa Maria degli Angeli",
          caption: "La Porziuncola vista da dentro la navata della basilica.",
        },
        { type: "h2", text: "Basilica, Porziuncola e Cappella del Transito: la differenza" },
        {
          type: "list",
          items: [
            "La basilica è la grande chiesa costruita tra il 1569 e il 1679 su progetto di Galeazzo Alessi. Il terremoto del 1832 ne distrusse parte della navata centrale; la facciata, con la statua dorata della Madonna degli Angeli di Guglielmo Colasanti, fu rifatta tra il 1925 e il 1930.",
            "La Porziuncola è la chiesetta medievale al centro della basilica, sotto la cupola: è la «cappella» a cui si pensa quando si parla di Santa Maria degli Angeli, il luogo dove nacque l'ordine francescano.",
            "La Cappella del Transito, anch'essa dentro la basilica, era una cella dell'infermeria del convento: qui Francesco morì la sera del 3 ottobre 1226.",
          ],
        },
        { type: "h2", text: "Cosa vedere oltre alla Porziuncola" },
        {
          type: "list",
          items: [
            "Il Roseto — le rose senza spine legate al miracolo raccontato dalla tradizione francescana.",
            "Il Museo della Porziuncola — dedicato alla storia del santuario e del francescanesimo, aperto dalle 9:00 alle 13:00 e dalle 14:30 alle 17:00, chiuso il mercoledì.",
            "La facciata con la statua dorata della Madonna degli Angeli, visibile già dal piazzale.",
          ],
        },
        { type: "h2", text: "Informazioni pratiche" },
        {
          type: "facts",
          items: [
            { label: "Orari della basilica", value: "7:30–12:30 e 14:30–19:00, tutti i giorni" },
            { label: "Ingresso", value: "Gratuito, come le guide dei frati" },
            { label: "Museo della Porziuncola", value: "9:00–13:00 e 14:30–17:00, chiuso il mercoledì" },
            { label: "Distanza da La Mora", value: "2,1 km in auto" },
          ],
        },
        { type: "p", text: "Orari dal sito ufficiale del santuario, porziuncola.org (ottobre 2026): possono cambiare nei giorni di festa." },
        {
          type: "cta",
          heading: "Prenota direttamente e organizza la visita senza pensieri.",
          body: "Scrivendoci parli con chi gestisce La Mora ogni giorno: nessun intermediario, condizioni migliori di quelle delle piattaforme.",
          label: "Vai alla prenotazione diretta",
          href: BOOKING_MODAL_HREF,
        },
        { type: "h2", text: "Una villa vicino a Santa Maria degli Angeli" },
        { type: "p", text: "Per gruppi e famiglie numerose c'è anche Villa Relax, la villa indipendente della stessa proprietà, a Rivotorto di Assisi, a 5 km dalla basilica: fino a 16 ospiti in 6 camere, con piscina privata e giardino, in locazione esclusiva." },
        { type: "links", heading: "Per un gruppo", items: [{ label: "Villa Relax, villa indipendente fino a 16 ospiti", href: "/villa-relax-assisi/" }] },
        { type: "h2", text: "Come arrivare da Agriturismo La Mora" },
        {
          type: "p",
          text: "Il tragitto è di 2,1 km in auto, lungo la piana che collega la campagna dove sorge La Mora al centro di Assisi: la Basilica è la prima tappa naturale per chi arriva in giornata, spesso ancora prima di salire al centro storico. Chi preferisce muoversi in modo più leggero può anche noleggiare una e-bike direttamente in struttura.",
        },
        {
          type: "image",
          src: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
          alt: "Esterno di Agriturismo La Mora, punto di partenza per la Basilica di Santa Maria degli Angeli",
          caption: "Si parte da qui: 2,1 km in auto, o una pedalata in e-bike.",
        },
      ],
      faq: {
        heading: "Domande frequenti",
        items: [
          { q: "La chiesa di Santa Maria degli Angeli e la Porziuncola sono la stessa cosa?", a: "No: la chiesa di Santa Maria degli Angeli è la grande basilica costruita tra il 1569 e il 1679 su progetto di Galeazzo Alessi; la Porziuncola è la piccola chiesa medievale che la basilica racchiude al centro, sotto la cupola." },
          { q: "Cos'è la cappella della Porziuncola?", a: "È la chiesetta restaurata da San Francesco: qui comprese la propria vocazione, fondò l'Ordine dei Frati Minori, accolse Santa Chiara nel 1212 e ottenne il Perdono di Assisi." },
          { q: "Dove morì San Francesco?", a: "Nella Cappella del Transito, dentro la basilica: era una cella dell'infermeria del convento, e Francesco vi morì la sera del 3 ottobre 1226." },
          { q: "Quanto costa entrare e quali sono gli orari?", a: "L'ingresso al santuario è gratuito. La basilica è aperta tutti i giorni dalle 7:30 alle 12:30 e dalle 14:30 alle 19:00; il Museo della Porziuncola dalle 9:00 alle 13:00 e dalle 14:30 alle 17:00, chiuso il mercoledì (porziuncola.org, ottobre 2026)." },
          { q: "C'è una villa da affittare vicino a Santa Maria degli Angeli?", a: "Villa Relax, la villa indipendente della stessa proprietà di Agriturismo La Mora, è a Rivotorto di Assisi, a 5 km dalla basilica: fino a 16 ospiti in 6 camere, con piscina privata, in locazione esclusiva." },
          { q: "Quanto dista la basilica da Agriturismo La Mora?", a: "2,1 km in auto secondo Google Maps: è il luogo francescano più vicino alla struttura." },
        ],
      },
      finalCtaHeading: "A 2,1 km da qui, in campagna.",
      finalCtaBody: "Cinque appartamenti indipendenti, una piscina panoramica, e la Basilica a 2,1 km.",
      finalCtaLabel: "Scopri gli appartamenti",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "bosco-san-francesco",
      category: "Natura",
      title: "Il Bosco di San Francesco, tra i sentieri del FAI",
      excerpt: "Un'area naturale protetta tra Assisi e Santa Maria degli Angeli: uliveti, bosco e il torrente Tescio, gestiti dal FAI.",
      metaDescription: "Il Bosco di San Francesco ad Assisi: percorso FAI di 4 km tra uliveti e torrente Tescio, orari e come arrivare da Agriturismo La Mora.",
      image: "/images/territorio/assisi/bosco di san francesco assisi.jpg",
      alt: "Vista aerea del Bosco di San Francesco, con gli uliveti circolari e le mura di Assisi sullo sfondo",
      intro:
        "Tra Assisi e Santa Maria degli Angeli, un percorso naturalistico di circa 4 km attraversa uliveti secolari, bosco misto e il torrente Tescio — un modo diverso di vivere il territorio, lontano dalla pietra del centro storico.",
      introCtaHeading: "Vuoi camminare tra gli ulivi e tornare in piscina lo stesso pomeriggio?",
      introCtaLabel: "Verifica la disponibilità",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "Un bosco gestito dal FAI" },
        {
          type: "p",
          text: "Dal 2008 il Bosco di San Francesco è affidato al FAI (Fondo Ambiente Italiano), che ne cura la manutenzione e organizza visite guidate lungo il percorso. Il sentiero collega idealmente due luoghi simbolo del francescanesimo — Assisi in alto, Santa Maria degli Angeli in basso — attraversando un paesaggio che è rimasto agricolo: uliveti ancora coltivati, terrazzamenti, il corso del Tescio che accompagna buona parte del cammino.",
        },
        { type: "h3", text: "Cosa si vede lungo il percorso" },
        {
          type: "p",
          text: "Oltre agli uliveti, il percorso include un'installazione artistica permanente — un grande cerchio di ulivi visibile anche dall'alto — pensata come luogo di sosta e riflessione, oltre a punti panoramici sulle mura di Assisi che dominano la vallata da entrambi i lati del bosco.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
          alt: "Sentiero tra gli ulivi nel Bosco di San Francesco",
        },
        { type: "h2", text: "Informazioni pratiche" },
        {
          type: "facts",
          items: [
            { label: "Lunghezza", value: "Circa 4 km" },
            { label: "Gestione", value: "FAI, dal 2008" },
            { label: "Ingresso principale", value: "Vicino a Santa Maria degli Angeli" },
            { label: "Orari e biglietti", value: "Variano per stagione — verificare sul sito FAI" },
          ],
        },
        {
          type: "cta",
          heading: "Un soggiorno di più giorni rende più semplice organizzare ogni gita.",
          body: "Da 7 notti in su, prenotando direttamente hai il 10% di sconto.",
          label: "Scopri gli appartamenti",
          href: "/alloggi/",
        },
        { type: "h2", text: "Da Agriturismo La Mora" },
        {
          type: "p",
          text: "L'ingresso principale del bosco, dalla piazza della Basilica superiore di San Francesco, è a 7,5 km da La Mora, circa 18 minuti in auto: si lascia la macchina in uno dei parcheggi di Assisi e si prosegue a piedi. È una delle gite più semplici da organizzare durante il soggiorno — non serve una giornata intera, si può abbinare comodamente a una visita alla Basilica o a un pomeriggio in piscina al ritorno.",
        },
      ],
      finalCtaHeading: "Ci si arriva in 18 minuti, si torna per il resto della giornata.",
      finalCtaBody: "La piscina panoramica di La Mora è a pochi passi dagli appartamenti.",
      finalCtaLabel: "Scopri la piscina",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "santuario-san-damiano",
      category: "Territorio",
      title: "San Damiano ad Assisi: il santuario di Francesco e Chiara",
      excerpt: "Il santuario appena fuori dal centro di Assisi dove il crocifisso parlò a Francesco e dove Chiara visse per 42 anni.",
      metaDescription: "San Damiano ad Assisi: il santuario dove il crocifisso parlò a Francesco e Chiara visse 42 anni. A 1,5 km a piedi dal centro e a 7,4 km da La Mora.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Santuario di San Damiano tra gli ulivi, nei dintorni di Assisi",
      inBreve: {
        heading: "In breve",
        items: [
          { label: "Cos'è", value: "Santuario francescano, patrimonio UNESCO dal 2000" },
          { label: "Il crocifisso", value: "L'originale è nella Basilica di Santa Chiara" },
          { label: "A piedi dal centro", value: "1,5 km · circa 21 min in discesa" },
          { label: "Da Agriturismo La Mora", value: "7,4 km · circa 11 min in auto" },
        ],
      },
      intro:
        "Appena fuori dal centro di Assisi, a 1,5 km a piedi da Piazza del Comune, tra gli ulivi, il santuario di San Damiano custodisce due delle storie più importanti del francescanesimo: la conversione di Francesco e la vita di Chiara.",
      introCtaHeading: "Un momento di silenzio dopo la Basilica: organizza il soggiorno.",
      introCtaLabel: "Verifica la disponibilità",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "«Va', ripara la mia casa»" },
        {
          type: "p",
          text: "Secondo la tradizione, è qui che il crocifisso dipinto oggi conservato nella Basilica di Santa Chiara parlò a Francesco: «Francesco, va' e ripara la mia casa che, come vedi, è tutta in rovina». Francesco prese l'invito alla lettera e restaurò con le proprie mani la chiesetta, allora in rovina. Sull'altare maggiore di San Damiano oggi c'è una copia del crocifisso.",
        },
        { type: "h2", text: "Il monastero di Chiara" },
        {
          type: "p",
          text: "San Damiano è anche il luogo dove Chiara d'Assisi visse per 42 anni e dove morì. Dal 2000, con gli altri luoghi francescani di Assisi, è patrimonio mondiale UNESCO. A differenza della Basilica di San Francesco, resta un luogo raccolto e silenzioso: probabilmente la tappa più autentica per chi cerca un momento di raccoglimento lontano dai flussi del centro.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg",
          alt: "Vista del santuario di San Damiano tra gli ulivi",
        },
        { type: "h2", text: "Come arrivarci" },
        {
          type: "facts",
          items: [
            { label: "A piedi da Piazza del Comune", value: "1,5 km · circa 21 min in discesa" },
            { label: "In auto da La Mora", value: "7,4 km · circa 11 min" },
            { label: "Patrimonio UNESCO", value: "Dal 2000, con gli altri luoghi francescani" },
            { label: "Da abbinare a", value: "La Basilica di Santa Chiara, dove è conservato il crocifisso originale" },
          ],
        },
        {
          type: "cta",
          heading: "Prenoti direttamente, risparmi di più.",
          body: "Nessuna commissione di intermediazione, sconti dedicati a chi prenota diretto.",
          label: "Scopri il vantaggio diretto",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Da Agriturismo La Mora" },
        {
          type: "p",
          text: "Da La Mora San Damiano è a 7,4 km, circa 11 minuti in auto secondo Google Maps. Si può anche abbinare a una giornata nel centro storico: da Piazza del Comune sono 1,5 km a piedi lungo Via San Damiano, circa 21 minuti in discesa. Al ritorno la salita è più impegnativa, da tenere a mente con bambini piccoli.",
        },
      ],
      faq: {
        heading: "Domande frequenti",
        items: [
          { q: "Dove si trova San Damiano ad Assisi?", a: "Appena fuori dal centro storico, sotto le mura: da Piazza del Comune sono 1,5 km a piedi lungo Via San Damiano, circa 21 minuti in discesa secondo Google Maps." },
          { q: "Cosa è successo a San Damiano?", a: "Secondo la tradizione, qui il crocifisso parlò a Francesco chiedendogli di riparare la sua casa. A San Damiano, inoltre, Santa Chiara visse per 42 anni e morì." },
          { q: "Dove si trova il crocifisso di San Damiano?", a: "L'originale è conservato nella Basilica di Santa Chiara, nel centro di Assisi; sull'altare maggiore di San Damiano c'è una copia." },
          { q: "San Damiano è patrimonio UNESCO?", a: "Sì, dal 2000, insieme agli altri luoghi francescani di Assisi." },
          { q: "Come si arriva a San Damiano da Agriturismo La Mora?", a: "In auto sono 7,4 km, circa 11 minuti secondo Google Maps." },
        ],
      },
      finalCtaHeading: "Torna a La Mora, e rilassati in piscina.",
      finalCtaBody: "A 6,8 km dal centro di Assisi, la campagna umbra aspetta con calma.",
      finalCtaLabel: "Scopri gli appartamenti",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "cascate-delle-marmore",
      category: "Gita di un giorno",
      title: "Cascate delle Marmore da Assisi: 77 km, poco più di un'ora",
      excerpt: "A 77,7 km da Assisi e 77,3 km da La Mora, poco più di un'ora d'auto: come arrivare, quando c'è l'acqua e quale belvedere scegliere.",
      metaDescription: "Cascate delle Marmore da Assisi: 77,7 km, circa 1 ora e 15 minuti d'auto; da Agriturismo La Mora 77,3 km. Come arrivare, orari dell'acqua e belvedere.",
      image: "/images/territorio/dintorni/cascate delle marmore.jpg",
      alt: "Le Cascate delle Marmore in Umbria",
      inBreve: {
        heading: "In breve",
        items: [
          { label: "Da Assisi (Piazza del Comune)", value: "77,7 km · circa 1 h 15 min" },
          { label: "Da Agriturismo La Mora", value: "77,3 km · circa 1 h 10 min" },
          { label: "Altezza", value: "165 m in tre salti" },
          { label: "Acqua", value: "A orari stabiliti, diversi per mese e giorno" },
          { label: "Ingressi", value: "Belvedere Inferiore e Belvedere Superiore" },
        ],
      },
      intro:
        "Le Cascate delle Marmore sono a 77,7 km dal centro di Assisi (Piazza del Comune): circa 1 ora e 15 minuti d'auto lungo la SS3, secondo Google Maps. Da Agriturismo La Mora sono 77,3 km, circa 1 ora e 10 minuti, per vedere vicino a Terni un salto d'acqua di 165 metri creato dai Romani.",
      introCtaHeading: "Una gita fuori porta, un ritorno comodo: dove alloggiare nel mezzo.",
      introCtaLabel: "Scopri gli appartamenti",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Una cascata costruita dai Romani" },
        {
          type: "p",
          text: "La Cascata delle Marmore nasce da un'opera dei Romani: nel 271 a.C. il console Manio Curio Dentato, per liberare la piana di Rieti dalle acque stagnanti, fece defluire il fiume Velino verso il Nera. Il risultato è un salto di 165 metri in tre balzi, che il portale ufficiale del turismo italiano indica come il più alto d'Europa.",
        },
        { type: "h2", text: "I belvedere e i sentieri" },
        {
          type: "list",
          items: [
            "Belvedere Inferiore — sulla strada per la Valnerina: da qui si vede l'intera cascata.",
            "Belvedere Superiore — alla fine del paese di Marmore, affacciato sul primo salto.",
            "Sentiero dell'Antico Passaggio — sale ripido dal Belvedere Inferiore verso la sommità; lungo il percorso un tunnel porta al Balcone degli Innamorati, a un passo dall'acqua.",
          ],
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
          alt: "Vista ravvicinata delle Cascate delle Marmore in piena portata",
        },
        { type: "h2", text: "Quando vedere l'acqua" },
        {
          type: "p",
          text: "La cascata è a flusso controllato: quando il salto non è a pieno regime, l'acqua viene deviata nelle condotte della centrale idroelettrica. Il rilascio avviene solo in alcune fasce orarie, diverse per mese e giorno della settimana (a novembre 2026, per esempio, nei giorni feriali non è previsto): prima di partire controlla il calendario sul sito ufficiale del parco, cascatadellemarmore.info.",
        },
        {
          type: "cta",
          heading: "Organizza la gita con calma: prenota direttamente il tuo soggiorno.",
          label: "Verifica la disponibilità",
          href: BOOKING_MODAL_HREF,
        },
        { type: "h2", text: "Da Assisi e da Agriturismo La Mora" },
        {
          type: "facts",
          items: [
            { label: "Da Assisi (Piazza del Comune)", value: "77,7 km · circa 1 h 15 min" },
            { label: "Da Agriturismo La Mora", value: "77,3 km · circa 1 h 10 min" },
            { label: "Percorso alternativo", value: "Con la SS 209 Valnerina, circa 75 km" },
            { label: "Da combinare con", value: "Una sosta a Terni" },
          ],
        },
        {
          type: "p",
          text: "Con poco più di un'ora di strada per tratta, le Marmore stanno in una mezza giornata: si parte al mattino, si visita la cascata nell'orario di apertura delle acque e si rientra in tempo per il pomeriggio, oppure si allunga la giornata con una sosta nel centro di Terni.",
        },
      ],
      faq: {
        heading: "Domande frequenti",
        items: [
          { q: "Quanto distano le Cascate delle Marmore da Assisi?", a: "Dal centro di Assisi (Piazza del Comune) 77,7 km, circa 1 ora e 15 minuti in auto; da Agriturismo La Mora 77,3 km, circa 1 ora e 10 minuti (Google Maps, percorso lungo la SS3)." },
          { q: "Come si arriva alle Cascate delle Marmore da Assisi?", a: "In auto: Google Maps propone il percorso lungo la SS3, circa 77 km, oppure quello con un tratto di SS 209 Valnerina, circa 75 km, entrambi poco più di un'ora. Gli ingressi del parco sono il Belvedere Inferiore e il Belvedere Superiore." },
          { q: "Quando c'è l'acqua alle Cascate delle Marmore?", a: "Solo in alcune fasce orarie, diverse per mese e giorno della settimana: fuori da quegli orari l'acqua viene deviata alla centrale idroelettrica. Il calendario aggiornato è sul sito ufficiale del parco, cascatadellemarmore.info." },
          { q: "Quanto è alta la Cascata delle Marmore?", a: "165 metri in tre salti: è il fiume Velino che precipita nel Nera." },
          { q: "Chi ha creato la Cascata delle Marmore?", a: "I Romani: nel 271 a.C. il console Manio Curio Dentato fece defluire le acque del Velino verso il Nera, per liberare dalle paludi la piana di Rieti." },
          { q: "Si possono vedere le Marmore in mezza giornata da Assisi?", a: "Sì: con poco più di un'ora di strada per tratta si parte al mattino e si rientra nel primo pomeriggio. Conviene far coincidere la visita con l'orario di apertura delle acque." },
        ],
      },
      finalCtaHeading: "Rientra a La Mora per il resto della giornata.",
      finalCtaBody: "Piscina panoramica aperta da maggio a settembre, a due passi dagli appartamenti.",
      finalCtaLabel: "Scopri la piscina",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "monte-subasio",
      category: "Natura",
      title: "Monte Subasio: i sentieri sopra Assisi",
      excerpt: "Il parco naturale che domina la città: pascoli d'altura, il formaggio omonimo, e sentieri per camminare o pedalare.",
      metaDescription: "Monte Subasio, Parco Regionale sopra Assisi: sentieri da Eremo delle Carceri, pascoli d'altura e pecorino di Subasio. Vicino ad Agriturismo La Mora.",
      image: "/images/territorio/dintorni/monte subasio alto.jpg",
      alt: "Vista aerea dai pascoli d'altura del Monte Subasio al tramonto",
      intro:
        "Sopra Assisi, il massiccio che dà il nome al celebre pecorino si apre in pascoli d'altura e boschi di lecci e faggi — un parco regionale attraversato da sentieri per camminare o pedalare, con viste sulla valle umbra che il centro storico non può dare.",
      introCtaHeading: "Una base comoda per chi vuole camminare o pedalare in Umbria.",
      introCtaLabel: "Scopri gli appartamenti",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Dalla città al parco" },
        {
          type: "p",
          text: "Il Monte Subasio è oggi Parco Regionale: una rete di sentieri collega Assisi all'Eremo delle Carceri — il romitorio dove Francesco si ritirava in preghiera, incastonato nella roccia del monte — e prosegue verso la vetta, a 1.290 metri. Il paesaggio cambia gradualmente lungo il percorso: dai boschi fitti vicino all'Eremo si sale verso pascoli d'altura aperti, dove lo sguardo arriva fino alla valle umbra.",
        },
        { type: "h2", text: "Il pecorino di Subasio" },
        {
          type: "p",
          text: "È il monte che ha dato il nome al pecorino di Subasio, prodotto ancora oggi dagli allevamenti che pascolano in quota. Lo stesso massiccio è anche il retroterra naturale da cui viene estratta la celebre pietra rosa con cui è costruita gran parte di Assisi — la pietra che dà alla città il colore che si vede da lontano, soprattutto al tramonto.",
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/monte-subasio.jpg",
          alt: "Sentiero tra i pascoli del Monte Subasio",
        },
        { type: "h2", text: "Camminare o pedalare" },
        {
          type: "facts",
          items: [
            { label: "Altitudine vetta", value: "1.290 metri" },
            { label: "Punto di partenza", value: "Eremo delle Carceri" },
            { label: "Statuto", value: "Parco Regionale" },
            { label: "Adatto a", value: "Trekking e mountain bike / e-bike" },
          ],
        },
        {
          type: "cta",
          heading: "Noleggia una e-bike direttamente in struttura.",
          body: "Comoda per salire senza fatica anche nei tratti più impegnativi.",
          label: "Scopri le attività",
          href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
        },
        { type: "h2", text: "Da Agriturismo La Mora" },
        {
          type: "p",
          text: "L'Eremo delle Carceri, punto di partenza dei sentieri principali, è a 12,2 km da La Mora, circa 20 minuti in auto secondo Google Maps. Per chi preferisce muoversi in modo più leggero, l'e-bike a noleggio in struttura rende più semplice affrontare i tratti in salita senza rinunciare alla gita.",
        },
      ],
      finalCtaHeading: "Torna a La Mora, tra piscina e campagna.",
      finalCtaBody: "Cinque appartamenti indipendenti, a 6,8 km dal centro di Assisi e a 12,2 km dall'Eremo delle Carceri.",
      finalCtaLabel: "Scopri gli appartamenti",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "agriumbria-umbriafiere",
      category: "Eventi",
      title: "Agriumbria a Umbriafiere: dove dormire vicino alla fiera",
      excerpt: "Ogni anno, generalmente a fine marzo, la mostra nazionale di agricoltura, zootecnia e alimentazione più importante dell'Umbria si tiene a Bastia Umbra, a 3,4 km da La Mora.",
      metaDescription: "Agriumbria a Umbriafiere (Bastia Umbra): cosa vedere in fiera, quando si svolge e dove dormire vicino ad Agriumbria — Agriturismo La Mora, a 3,4 km, con Assisi a 6,8 km.",
      image: "/images/blog/agriumbria-mucche-fiera-agricola.jpg",
      alt: "Bestiame condotto da espositori durante una fiera agricola all'aperto",
      intro:
        "Ogni anno, generalmente a fine marzo, Umbriafiere a Bastia Umbra ospita Agriumbria: la mostra nazionale di agricoltura, zootecnia e alimentazione più importante della regione — a 3,4 km da Agriturismo La Mora, circa 6 minuti in auto.",
      introCtaHeading: "Stai organizzando il soggiorno per Agriumbria?",
      introCtaLabel: "Verifica la disponibilità",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "Cos'è Agriumbria" },
        {
          type: "p",
          text: "Agriumbria è la Mostra Nazionale di Agricoltura, Zootecnia e Alimentazione: una delle fiere di settore più importanti del centro Italia, organizzata ogni anno a Umbriafiere, il quartiere fieristico di Bastia Umbra. L'edizione 2026 ha tagliato il traguardo della 57ª edizione, svolta dal 27 al 29 marzo — la fiera ricorre tipicamente in questo periodo, a fine marzo, anche se le date esatte di ogni edizione vanno sempre verificate sul calendario ufficiale di Umbriafiere, che può cambiare di anno in anno.",
        },
        { type: "h2", text: "Cosa trovi in fiera" },
        {
          type: "list",
          items: [
            "Macchinari e attrezzature agricole, dalle grandi aziende ai piccoli produttori.",
            "Mostre di razze bovine, ovine e avicole nazionali — tra cui Chianina, Limousine, Charolaise e Romagnola.",
            "Tecnologie per la produzione di olio, vino e per i caseifici.",
            "Un'area prodotti tipici e degustazioni, che attira anche chi non lavora nel settore.",
          ],
        },
        {
          type: "image",
          src: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
          alt: "Campagna umbra intorno ad Agriturismo La Mora, a 3,4 km da Umbriafiere",
        },
        { type: "h2", text: "Dove dormire vicino a Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distanza da Umbriafiere", value: "3,4 km · circa 6 min in auto" },
            { label: "Distanza da Assisi", value: "6,8 km (Piazza del Comune) · circa 14 min" },
            { label: "Appartamenti", value: "5 indipendenti, con cucina propria" },
            { label: "Prenotazione", value: "Diretta, senza intermediari" },
          ],
        },
        {
          type: "p",
          text: "Per chi espone, lavora alla fiera o la visita per più giorni, un agriturismo vicino ad Agriumbria è spesso più comodo di un hotel in città: cinque appartamenti indipendenti, ciascuno con cucina propria, in campagna invece che nel traffico di Bastia Umbra — a 3,4 km da Umbriafiere ma abbastanza fuori per tornare la sera in un posto tranquillo.",
        },
        {
          type: "cta",
          heading: "Prenota direttamente: niente commissioni, condizioni migliori.",
          body: "Scrivendoci parli con chi gestisce La Mora ogni giorno.",
          label: "Scopri gli appartamenti",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi a 6,8 km, anche durante la fiera" },
        {
          type: "p",
          text: "Chi soggiorna vicino a Umbriafiere per Agriumbria ha anche Assisi a portata di mano: da La Mora la Basilica di Santa Maria degli Angeli è a 2,1 km, il centro storico a 6,8 km (circa 14 minuti) e la Basilica di San Francesco a 7,5 km (circa 18 minuti), comodi da abbinare a una giornata di fiera o a una pausa tra due appuntamenti.",
        },
      ],
      finalCtaHeading: "Prenota il tuo soggiorno per Agriumbria.",
      finalCtaBody: "A 3,4 km da Umbriafiere, a 6,8 km dal centro di Assisi: la base comoda per la fiera.",
      finalCtaLabel: "Prenota direttamente",
      finalCtaHref: BOOKING_MODAL_HREF,
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Eventi",
      title: "Caccia Village a Umbriafiere: dove dormire per la fiera della caccia",
      excerpt: "Ogni anno, generalmente a metà maggio, centinaia di aziende del mondo venatorio si radunano a Bastia Umbra, tra Perugia e Assisi, a 3,4 km da La Mora.",
      metaDescription: "Caccia Village a Umbriafiere (Bastia Umbra): date, espositori e dove dormire vicino alla fiera della caccia — Agriturismo La Mora, a 3,4 km, con Assisi a 6,8 km.",
      image: "/images/blog/caccia-village-campagna-umbria.jpg",
      alt: "Campagna umbra con balle di fieno al tramonto",
      intro:
        "Ogni anno, generalmente a metà maggio, Umbriafiere a Bastia Umbra ospita Caccia Village: la fiera dedicata al mondo della caccia, tra Perugia e Assisi — a 3,4 km da Agriturismo La Mora, circa 6 minuti in auto.",
      introCtaHeading: "Stai organizzando il soggiorno per Caccia Village?",
      introCtaLabel: "Verifica la disponibilità",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "Cos'è Caccia Village" },
        {
          type: "p",
          text: "Caccia Village è la fiera dedicata al mondo della caccia che si tiene ogni anno a Umbriafiere, il quartiere fieristico di Bastia Umbra, tra Perugia e Assisi. L'edizione 2026 si è svolta dal 16 al 18 maggio, con oltre 250 aziende espositrici — la partecipazione più alta nella storia della manifestazione: la fiera ricorre tipicamente in questo periodo, a metà maggio, anche se le date esatte vanno sempre verificate sul calendario ufficiale di Umbriafiere.",
        },
        { type: "h2", text: "Cosa trovi in fiera" },
        {
          type: "list",
          items: [
            "Armi e munizioni, sempre esposte disattivate.",
            "Abbigliamento e attrezzatura tecnica per l'outdoor.",
            "Ottiche e strumentazione specializzata.",
            "Uno spazio ENCI dedicato ai cani da caccia e alle prove cinofile.",
            "Gastronomia di selvaggina e banchi di macelleria specializzata.",
          ],
        },
        {
          type: "image",
          src: "/images/piscina/piscina agriturismo la mora.webp",
          alt: "Piscina panoramica di Agriturismo La Mora, a 3,4 km da Umbriafiere",
        },
        { type: "h2", text: "Dove dormire vicino a Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distanza da Umbriafiere", value: "3,4 km · circa 6 min in auto" },
            { label: "Distanza da Assisi", value: "6,8 km (Piazza del Comune) · circa 14 min" },
            { label: "Appartamenti", value: "5 indipendenti, con cucina propria" },
            { label: "Prenotazione", value: "Diretta, senza intermediari" },
          ],
        },
        {
          type: "p",
          text: "Anche per chi arriva da fuori regione solo per la fiera, un agriturismo vicino a Caccia Village è un punto d'appoggio comodo in campagna: cinque appartamenti indipendenti a 3,4 km da Umbriafiere, con la possibilità — tra una giornata di fiera e l'altra — di dedicare qualche ora ad Assisi, a circa 14 minuti di distanza.",
        },
        {
          type: "cta",
          heading: "Prenota direttamente: niente commissioni, condizioni migliori.",
          body: "Scrivendoci parli con chi gestisce La Mora ogni giorno.",
          label: "Scopri gli appartamenti",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi e la campagna umbra, oltre la fiera" },
        {
          type: "p",
          text: "Chi soggiorna a La Mora durante Caccia Village trova anche una struttura pensata per famiglie e gruppi: piscina panoramica aperta da maggio a settembre — proprio nel periodo della fiera — parco giochi e spazi comuni per chi viaggia con bambini mentre un altro membro del gruppo è impegnato in fiera.",
        },
      ],
      finalCtaHeading: "Prenota il tuo soggiorno per Caccia Village.",
      finalCtaBody: "A 3,4 km da Umbriafiere, a 6,8 km dal centro di Assisi: la base comoda per la fiera.",
      finalCtaLabel: "Prenota direttamente",
      finalCtaHref: BOOKING_MODAL_HREF,
    },
  ],
  en: [
    EUROCHOCOLATE_POST.en,
    CARLO_ACUTIS_POST.en,
    NATALE_UMBRIA_POST.en,
    ALBERO_TRASIMENO_POST.en,
    RASIGLIA_POST.en,
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "Territory",
      title: "Santa Maria degli Angeli: basilica, Porziuncola and chapel",
      excerpt: "The basilica that holds the Porziuncola and the Chapel of the Transito, 2.1 km from La Mora: what to see, opening hours and admission.",
      metaDescription: "Santa Maria degli Angeli in Assisi: the basilica holding the Porziuncola and the Chapel of the Transito. Opening hours, free admission, a stay 2.1 km away.",
      image: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg",
      alt: "Facade of the Basilica di Santa Maria degli Angeli, in Assisi",
      inBreve: {
        heading: "At a glance",
        items: [
          { label: "Inside the basilica", value: "Porziuncola and Chapel of the Transito" },
          { label: "Opening hours", value: "Daily 7:30am–12:30pm and 2:30–7pm" },
          { label: "Admission", value: "Free" },
          { label: "From Agriturismo La Mora", value: "2.1 km by car" },
        ],
      },
      intro:
        "2.1 km from Agriturismo La Mora, on the plain below Assisi, the Basilica of Santa Maria degli Angeli was built between 1569 and 1679, to a design by Galeazzo Alessi, around a much smaller and older church: the Porziuncola.",
      introCtaHeading: "Planning your visit? Choose where to stay 2.1 km from the Basilica.",
      introCtaLabel: "Discover the apartments",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "The Porziuncola, a heart within a heart" },
        {
          type: "p",
          text: "The Porziuncola is the small church Francis restored and where he understood his vocation: here he founded the Order of Friars Minor, welcomed Clare in 1212 and obtained the Pardon of Assisi, the plenary indulgence. To protect it and welcome pilgrims, an enormous basilica was built around it: today, walking in, you find a tiny chapel beneath an immense dome — a contrast that tells, better than any description, the distance between Francis's original simplicity and the way his legacy was later celebrated.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
          alt: "Interior of the Porziuncola, inside the Basilica di Santa Maria degli Angeli",
          caption: "The Porziuncola seen from inside the basilica's nave.",
        },
        { type: "h2", text: "Basilica, Porziuncola and Chapel of the Transito: the difference" },
        {
          type: "list",
          items: [
            "The basilica is the great church built between 1569 and 1679 to a design by Galeazzo Alessi. The 1832 earthquake destroyed part of its central nave; the facade, topped by Guglielmo Colasanti's gilded statue of the Madonna of the Angels, was rebuilt between 1925 and 1930.",
            "The Porziuncola is the medieval chapel at the centre of the basilica, under the dome: the 'chapel' people mean when they talk about Santa Maria degli Angeli, the place where the Franciscan order was born.",
            "The Chapel of the Transito, also inside the basilica, was a cell of the convent infirmary: Francis died here on the evening of 3 October 1226.",
          ],
        },
        { type: "h2", text: "What to see beyond the Porziuncola" },
        {
          type: "list",
          items: [
            "The Rose Garden — the thornless roses linked to the miracle told by Franciscan tradition.",
            "The Porziuncola Museum — devoted to the history of the sanctuary and of the Franciscans, open 9am–1pm and 2:30–5pm, closed on Wednesdays.",
            "The facade with the gilded statue of the Madonna of the Angels, visible from the square.",
          ],
        },
        { type: "h2", text: "Practical information" },
        {
          type: "facts",
          items: [
            { label: "Basilica opening hours", value: "7:30am–12:30pm and 2:30–7pm, daily" },
            { label: "Admission", value: "Free, as are the friars' guided visits" },
            { label: "Porziuncola Museum", value: "9am–1pm and 2:30–5pm, closed on Wednesdays" },
            { label: "Distance from La Mora", value: "2.1 km by car" },
          ],
        },
        { type: "p", text: "Opening hours from the sanctuary's official website, porziuncola.org (October 2026): they may change on feast days." },
        {
          type: "cta",
          heading: "Book directly and plan your visit without a worry.",
          body: "By writing to us, you speak directly with the people who run La Mora every day: no middlemen, better terms than the platforms.",
          label: "Go to direct booking",
          href: BOOKING_MODAL_HREF,
        },
        { type: "h2", text: "A villa near Santa Maria degli Angeli" },
        { type: "p", text: "For groups and large families there is also Villa Relax, the independent villa owned by the same family, in Rivotorto di Assisi, 5 km from the basilica: up to 16 guests in 6 bedrooms, with a private pool and garden, rented exclusively." },
        { type: "links", heading: "For a group", items: [{ label: "Villa Relax, an independent villa for up to 16 guests", href: "/villa-relax-assisi/" }] },
        { type: "h2", text: "Getting there from Agriturismo La Mora" },
        {
          type: "p",
          text: "It's a 2.1 km drive along the plain connecting the countryside around La Mora to the centre of Assisi: the Basilica is a natural first stop for a day out, often even before heading up to the historic centre. Those who prefer to travel lighter can also rent an e-bike directly at the property.",
        },
        {
          type: "image",
          src: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
          alt: "Exterior of Agriturismo La Mora, starting point for the Basilica di Santa Maria degli Angeli",
          caption: "It starts here: 2.1 km by car, or a ride on an e-bike.",
        },
      ],
      faq: {
        heading: "Frequently asked questions",
        items: [
          { q: "Are the church of Santa Maria degli Angeli and the Porziuncola the same thing?", a: "No: the church of Santa Maria degli Angeli is the great basilica built between 1569 and 1679 to a design by Galeazzo Alessi; the Porziuncola is the small medieval church the basilica encloses at its centre, under the dome." },
          { q: "What is the Porziuncola chapel?", a: "The little church restored by Saint Francis: here he understood his vocation, founded the Order of Friars Minor, welcomed Saint Clare in 1212 and obtained the Pardon of Assisi." },
          { q: "Where did Saint Francis die?", a: "In the Chapel of the Transito, inside the basilica: it was a cell of the convent infirmary, and Francis died there on the evening of 3 October 1226." },
          { q: "How much does it cost to visit, and what are the opening hours?", a: "Admission to the sanctuary is free. The basilica is open daily from 7:30am to 12:30pm and from 2:30 to 7pm; the Porziuncola Museum from 9am to 1pm and from 2:30 to 5pm, closed on Wednesdays (porziuncola.org, October 2026)." },
          { q: "Is there a villa to rent near Santa Maria degli Angeli?", a: "Villa Relax, the independent villa owned by the same family as Agriturismo La Mora, is in Rivotorto di Assisi, 5 km from the basilica: up to 16 guests in 6 bedrooms, with a private pool, rented exclusively." },
          { q: "How far is the basilica from Agriturismo La Mora?", a: "2.1 km by car according to Google Maps: it's the closest Franciscan site to the property." },
        ],
      },
      finalCtaHeading: "2.1 km from here, in the countryside.",
      finalCtaBody: "Five independent apartments, a panoramic pool, and the Basilica 2.1 km away.",
      finalCtaLabel: "Discover the apartments",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "bosco-san-francesco",
      category: "Nature",
      title: "Bosco di San Francesco, on the FAI trails",
      excerpt: "A protected natural area between Assisi and Santa Maria degli Angeli: olive groves, woodland and the Tescio stream, cared for by the FAI.",
      metaDescription: "Bosco di San Francesco in Assisi: a 4 km FAI trail through olive groves and the Tescio stream, opening hours and how to get there from Agriturismo La Mora.",
      image: "/images/territorio/assisi/bosco di san francesco assisi.jpg",
      alt: "Aerial view of Bosco di San Francesco, with its circular olive grove and the walls of Assisi in the background",
      intro:
        "Between Assisi and Santa Maria degli Angeli, a roughly 4 km nature trail crosses centuries-old olive groves, mixed woodland and the Tescio stream — a different way to experience the area, away from the stone of the historic centre.",
      introCtaHeading: "Want to walk among the olive trees and be back at the pool the same afternoon?",
      introCtaLabel: "Check availability",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "A wood cared for by the FAI" },
        {
          type: "p",
          text: "Since 2008, Bosco di San Francesco has been entrusted to the FAI (Italian National Trust), which maintains it and organises guided visits along the trail. The path ideally connects two symbolic Franciscan sites — Assisi above, Santa Maria degli Angeli below — crossing a landscape that has stayed agricultural: olive groves still cultivated, terracing, and the Tescio stream running alongside much of the walk.",
        },
        { type: "h3", text: "What you'll see along the way" },
        {
          type: "p",
          text: "Besides the olive groves, the trail includes a permanent art installation — a large circle of olive trees visible even from above — designed as a place to pause and reflect, along with panoramic points looking onto the walls of Assisi, which dominate the valley from both sides of the wood.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
          alt: "Path among the olive trees in Bosco di San Francesco",
        },
        { type: "h2", text: "Practical information" },
        {
          type: "facts",
          items: [
            { label: "Length", value: "About 4 km" },
            { label: "Managed by", value: "FAI, since 2008" },
            { label: "Main entrance", value: "Near Santa Maria degli Angeli" },
            { label: "Hours and tickets", value: "Vary by season — check the FAI website" },
          ],
        },
        {
          type: "cta",
          heading: "A longer stay makes it easier to plan every day trip.",
          body: "From 7 nights, direct booking gets you a 10% discount.",
          label: "Discover the apartments",
          href: "/alloggi/",
        },
        { type: "h2", text: "From Agriturismo La Mora" },
        {
          type: "p",
          text: "The wood's main entrance, from the square of the upper Basilica of San Francesco, is 7.5 km from La Mora, about 18 minutes by car: you leave the car in one of Assisi's car parks and continue on foot. It's one of the easiest trips to fit into your stay — no need for a full day, it pairs comfortably with a visit to the Basilica or an afternoon at the pool on the way back.",
        },
      ],
      finalCtaHeading: "You're there in 18 minutes, and back for the rest of the day.",
      finalCtaBody: "La Mora's panoramic pool is steps from the apartments.",
      finalCtaLabel: "Discover the pool",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "santuario-san-damiano",
      category: "Territory",
      title: "San Damiano Sanctuary, Assisi: Francis, Clare and the cross",
      excerpt: "The sanctuary just outside the centre of Assisi where the crucifix spoke to Francis and where Clare lived for 42 years.",
      metaDescription: "San Damiano Sanctuary in Assisi: where the crucifix spoke to Francis and Clare lived for 42 years. 1.5 km on foot from the centre, 7.4 km from La Mora.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Sanctuary of San Damiano among the olive trees, near Assisi",
      inBreve: {
        heading: "At a glance",
        items: [
          { label: "What it is", value: "Franciscan sanctuary, UNESCO World Heritage since 2000" },
          { label: "The crucifix", value: "The original is in the Basilica of Santa Chiara" },
          { label: "On foot from the centre", value: "1.5 km · about 21 min downhill" },
          { label: "From Agriturismo La Mora", value: "7.4 km · about 11 min by car" },
        ],
      },
      intro:
        "Just outside the centre of Assisi, 1.5 km on foot from Piazza del Comune, among the olive trees, the Sanctuary of San Damiano holds two of the most important stories in Franciscan history: Francis's conversion and Clare's life.",
      introCtaHeading: "A moment of quiet after the Basilica: plan your stay.",
      introCtaLabel: "Check availability",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "'Go, repair my house'" },
        {
          type: "p",
          text: "According to tradition, it was here that the painted crucifix now kept in the Basilica of Santa Chiara spoke to Francis: 'Francis, go and repair my house, which, as you see, is falling into ruin.' Francis took the call literally and restored the little church, then in ruins, with his own hands. A copy of the crucifix now hangs over San Damiano's main altar.",
        },
        { type: "h2", text: "Clare's monastery" },
        {
          type: "p",
          text: "San Damiano is also where Clare of Assisi lived for 42 years and where she died. Since 2000, together with Assisi's other Franciscan sites, it has been a UNESCO World Heritage Site. Unlike the Basilica of San Francesco, it remains a quiet, intimate place: probably the most authentic stop for anyone seeking a moment of reflection away from the crowds in the centre.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg",
          alt: "View of the Sanctuary of San Damiano among the olive trees",
        },
        { type: "h2", text: "How to get there" },
        {
          type: "facts",
          items: [
            { label: "On foot from Piazza del Comune", value: "1.5 km · about 21 min downhill" },
            { label: "By car from La Mora", value: "7.4 km · about 11 min" },
            { label: "UNESCO World Heritage", value: "Since 2000, with the other Franciscan sites" },
            { label: "Pair with", value: "The Basilica of Santa Chiara, home of the original crucifix" },
          ],
        },
        {
          type: "cta",
          heading: "Book directly, save more.",
          body: "No booking commission, and discounts dedicated to direct bookings.",
          label: "Discover the direct-booking advantage",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "From Agriturismo La Mora" },
        {
          type: "p",
          text: "From La Mora, San Damiano is 7.4 km away, about 11 minutes by car according to Google Maps. It also pairs well with a day in the historic centre: from Piazza del Comune it's 1.5 km on foot along Via San Damiano, about 21 minutes downhill. The walk back uphill is more demanding, worth keeping in mind with small children.",
        },
      ],
      faq: {
        heading: "Frequently asked questions",
        items: [
          { q: "Where is San Damiano in Assisi?", a: "Just outside the historic centre, below the walls: from Piazza del Comune it's 1.5 km on foot along Via San Damiano, about 21 minutes downhill according to Google Maps." },
          { q: "What happened at San Damiano Sanctuary?", a: "According to tradition, the crucifix spoke to Francis here, asking him to repair his house. Saint Clare also lived at San Damiano for 42 years and died there." },
          { q: "Where is the San Damiano cross today?", a: "The original is kept in the Basilica of Santa Chiara, in the centre of Assisi; a copy hangs over San Damiano's main altar." },
          { q: "Is San Damiano a UNESCO World Heritage Site?", a: "Yes, since 2000, together with Assisi's other Franciscan sites." },
          { q: "How do you get to San Damiano from Agriturismo La Mora?", a: "By car it's 7.4 km, about 11 minutes according to Google Maps." },
        ],
      },
      finalCtaHeading: "Back to La Mora, and unwind by the pool.",
      finalCtaBody: "6.8 km from the centre of Assisi, the Umbrian countryside waits with no rush.",
      finalCtaLabel: "Discover the apartments",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "cascate-delle-marmore",
      category: "Day trip",
      title: "Marmore Falls from Assisi: 77 km, just over an hour",
      excerpt: "77.7 km from Assisi and 77.3 km from La Mora, just over an hour's drive: how to get there, when the water flows and which viewpoint to choose.",
      metaDescription: "Marmore Falls from Assisi: 77.7 km, about 1 hour 15 minutes by car; 77.3 km from Agriturismo La Mora. How to get there, water times and viewpoints.",
      image: "/images/territorio/dintorni/cascate delle marmore.jpg",
      alt: "The Cascate delle Marmore in Umbria",
      inBreve: {
        heading: "At a glance",
        items: [
          { label: "From Assisi (Piazza del Comune)", value: "77.7 km · about 1 h 15 min" },
          { label: "From Agriturismo La Mora", value: "77.3 km · about 1 h 10 min" },
          { label: "Height", value: "165 m in three drops" },
          { label: "Water", value: "At set times, different by month and day" },
          { label: "Entrances", value: "Belvedere Inferiore and Belvedere Superiore" },
        ],
      },
      intro:
        "The Marmore Falls are 77.7 km from the centre of Assisi (Piazza del Comune): about 1 hour 15 minutes by car along the SS3, according to Google Maps. From Agriturismo La Mora it's 77.3 km, about 1 hour 10 minutes, to see a 165-metre waterfall near Terni created by the Romans.",
      introCtaHeading: "A day trip out and an easy way back: where to stay in between.",
      introCtaLabel: "Discover the apartments",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "A waterfall built by the Romans" },
        {
          type: "p",
          text: "The Marmore Falls began as a Roman project: in 271 BC the consul Manius Curius Dentatus diverted the Velino river towards the Nera to free the Rieti plain from stagnant water. The result is a 165-metre drop in three leaps, which Italy's official tourism portal describes as the highest in Europe.",
        },
        { type: "h2", text: "Viewpoints and trails" },
        {
          type: "list",
          items: [
            "Belvedere Inferiore — on the road to the Valnerina: from here you see the whole waterfall.",
            "Belvedere Superiore — at the end of the village of Marmore, overlooking the first drop.",
            "Sentiero dell'Antico Passaggio — climbs steeply from the Belvedere Inferiore towards the top; along the way a tunnel leads to the Balcone degli Innamorati, right next to the water.",
          ],
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
          alt: "Close-up view of the Cascate delle Marmore at full flow",
        },
        { type: "h2", text: "When the water flows" },
        {
          type: "p",
          text: "The falls have a controlled flow: when the drop is not at full capacity, the water is diverted into the penstocks of the hydroelectric plant. Water is released only in certain time slots, which differ by month and day of the week (in November 2026, for example, there is no release on weekdays): before setting off, check the calendar on the park's official website, cascatadellemarmore.info.",
        },
        {
          type: "cta",
          heading: "Plan the trip with no rush: book your stay directly.",
          label: "Check availability",
          href: BOOKING_MODAL_HREF,
        },
        { type: "h2", text: "From Assisi and from Agriturismo La Mora" },
        {
          type: "facts",
          items: [
            { label: "From Assisi (Piazza del Comune)", value: "77.7 km · about 1 h 15 min" },
            { label: "From Agriturismo La Mora", value: "77.3 km · about 1 h 10 min" },
            { label: "Alternative route", value: "Via the SS 209 Valnerina, about 75 km" },
            { label: "Pair with", value: "A stop in Terni" },
          ],
        },
        {
          type: "p",
          text: "With just over an hour's drive each way, the Marmore Falls fit into half a day: leave in the morning, visit during the water-release hours and be back in time for the afternoon — or extend the day with a stop in the centre of Terni.",
        },
      ],
      faq: {
        heading: "Frequently asked questions",
        items: [
          { q: "How far are the Marmore Falls from Assisi?", a: "From the centre of Assisi (Piazza del Comune) 77.7 km, about 1 hour 15 minutes by car; from Agriturismo La Mora 77.3 km, about 1 hour 10 minutes (Google Maps, route along the SS3)." },
          { q: "How do you get to the Marmore Falls from Assisi?", a: "By car: Google Maps suggests the route along the SS3, about 77 km, or the one with a stretch of the SS 209 Valnerina, about 75 km, both just over an hour. The park's entrances are the Belvedere Inferiore and the Belvedere Superiore." },
          { q: "When does the water flow at the Marmore Falls?", a: "Only in certain time slots, which differ by month and day of the week: outside those hours the water is diverted to the hydroelectric plant. The up-to-date calendar is on the park's official website, cascatadellemarmore.info." },
          { q: "How high are the Marmore Falls?", a: "165 metres in three drops: it's the Velino river plunging into the Nera." },
          { q: "Who created the Marmore Falls?", a: "The Romans: in 271 BC the consul Manius Curius Dentatus diverted the waters of the Velino towards the Nera, to drain the marshes of the Rieti plain." },
          { q: "Can you see the Marmore Falls in half a day from Assisi?", a: "Yes: with just over an hour's drive each way you can leave in the morning and be back in the early afternoon. Plan your visit around the water-release hours." },
        ],
      },
      finalCtaHeading: "Back to La Mora for the rest of the day.",
      finalCtaBody: "Panoramic pool open from May to September, steps from the apartments.",
      finalCtaLabel: "Discover the pool",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "monte-subasio",
      category: "Nature",
      title: "Monte Subasio: the trails above Assisi",
      excerpt: "The natural park overlooking the city: high pastures, its namesake cheese, and trails for walking or cycling.",
      metaDescription: "Monte Subasio, Regional Park above Assisi: trails from Eremo delle Carceri, high pastures and Subasio pecorino cheese. Near Agriturismo La Mora.",
      image: "/images/territorio/dintorni/monte subasio alto.jpg",
      alt: "Aerial view of the high pastures of Monte Subasio at sunset",
      intro:
        "Above Assisi, the massif that gives its name to the famous pecorino cheese opens into high pastures and woods of oak and beech — a regional park crossed by trails for walking or cycling, with views over the Umbrian valley that the historic centre can't offer.",
      introCtaHeading: "A convenient base for walking or cycling in Umbria.",
      introCtaLabel: "Discover the apartments",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "From the city to the park" },
        {
          type: "p",
          text: "Monte Subasio is today a Regional Park: a network of trails connects Assisi to the Eremo delle Carceri — the hermitage where Francis retreated to pray, set into the mountain's rock — and continues towards the summit, at 1,290 metres. The landscape changes gradually along the way: from the dense woods near the Eremo, the trail climbs towards open high pastures, where the view stretches all the way to the Umbrian valley.",
        },
        { type: "h2", text: "Subasio pecorino cheese" },
        {
          type: "p",
          text: "It's the mountain that gave its name to Subasio pecorino, still produced today by the flocks grazing at altitude. The same massif is also the natural source of the famous pink stone used to build much of Assisi — the stone that gives the town the colour visible from afar, especially at sunset.",
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/monte-subasio.jpg",
          alt: "Trail through the pastures of Monte Subasio",
        },
        { type: "h2", text: "Walking or cycling" },
        {
          type: "facts",
          items: [
            { label: "Summit altitude", value: "1,290 metres" },
            { label: "Starting point", value: "Eremo delle Carceri" },
            { label: "Status", value: "Regional Park" },
            { label: "Suited for", value: "Trekking and mountain / e-biking" },
          ],
        },
        {
          type: "cta",
          heading: "Rent an e-bike directly at the property.",
          body: "Handy for climbing effortlessly even on the steeper stretches.",
          label: "Discover the activities",
          href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
        },
        { type: "h2", text: "From Agriturismo La Mora" },
        {
          type: "p",
          text: "The Eremo delle Carceri, starting point of the main trails, is 12.2 km from La Mora, about 20 minutes by car according to Google Maps. For those who prefer to travel lighter, the e-bike available for hire at the property makes the uphill stretches much easier without giving up on the trip.",
        },
      ],
      finalCtaHeading: "Back to La Mora, between the pool and the countryside.",
      finalCtaBody: "Five independent apartments, 6.8 km from the centre of Assisi and 12.2 km from the Eremo delle Carceri.",
      finalCtaLabel: "Discover the apartments",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "agriumbria-umbriafiere",
      category: "Events",
      title: "Agriumbria at Umbriafiere: where to stay near the fair",
      excerpt: "Every year, generally in late March, Umbria's leading agriculture, livestock and food trade show takes place in Bastia Umbra, 3.4 km from La Mora.",
      metaDescription: "Agriumbria at Umbriafiere (Bastia Umbra): what to see at the fair, when it takes place and where to stay near Agriumbria — Agriturismo La Mora, 3.4 km away, with Assisi 6.8 km away.",
      image: "/images/blog/agriumbria-mucche-fiera-agricola.jpg",
      alt: "Livestock led by exhibitors during an outdoor agricultural fair",
      intro:
        "Every year, generally in late March, Umbriafiere in Bastia Umbra hosts Agriumbria: the region's leading agriculture, livestock and food trade show — 3.4 km from Agriturismo La Mora, about 6 minutes by car.",
      introCtaHeading: "Planning your stay for Agriumbria?",
      introCtaLabel: "Check availability",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "What is Agriumbria" },
        {
          type: "p",
          text: "Agriumbria is the National Exhibition of Agriculture, Livestock and Food: one of central Italy's most important trade fairs, held every year at Umbriafiere, the exhibition grounds in Bastia Umbra. The 2026 edition marked its 57th year, running from 27 to 29 March — the fair typically falls around this time, in late March, though exact dates for each edition should always be checked on Umbriafiere's official calendar, which can change year to year.",
        },
        { type: "h2", text: "What you'll find at the fair" },
        {
          type: "list",
          items: [
            "Agricultural machinery and equipment, from large companies to small producers.",
            "Showcases of national cattle, sheep and poultry breeds — including Chianina, Limousin, Charolais and Romagnola.",
            "Technology for olive oil and wine production and for dairies.",
            "A local-produce and tasting area, which draws visitors beyond the trade itself.",
          ],
        },
        {
          type: "image",
          src: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
          alt: "Umbrian countryside around Agriturismo La Mora, 3.4 km from Umbriafiere",
        },
        { type: "h2", text: "Where to stay near Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distance from Umbriafiere", value: "3.4 km · about 6 min by car" },
            { label: "Distance from Assisi", value: "6.8 km (Piazza del Comune) · about 14 min" },
            { label: "Apartments", value: "5 independent, each with its own kitchen" },
            { label: "Booking", value: "Direct, no intermediaries" },
          ],
        },
        {
          type: "p",
          text: "For exhibitors, workers or multi-day visitors, an agriturismo near Agriumbria is often more convenient than a hotel in town: five independent apartments, each with its own kitchen, set in the countryside rather than Bastia Umbra's traffic — 3.4 km from Umbriafiere but far enough to come back to somewhere quiet in the evening.",
        },
        {
          type: "cta",
          heading: "Book directly: no commissions, better terms.",
          body: "By writing to us, you speak directly with the people who run La Mora every day.",
          label: "Discover the apartments",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi 6.8 km away, even during the fair" },
        {
          type: "p",
          text: "Guests staying near Umbriafiere for Agriumbria also have Assisi within easy reach: from La Mora the Basilica of Santa Maria degli Angeli is 2.1 km away, the historic centre 6.8 km (about 14 minutes) and the Basilica of San Francesco 7.5 km (about 18 minutes), easy to pair with a day at the fair or a break between appointments.",
        },
      ],
      finalCtaHeading: "Book your stay for Agriumbria.",
      finalCtaBody: "3.4 km from Umbriafiere, 6.8 km from the centre of Assisi: the convenient base for the fair.",
      finalCtaLabel: "Book directly",
      finalCtaHref: BOOKING_MODAL_HREF,
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Events",
      title: "Caccia Village at Umbriafiere: where to stay for the hunting fair",
      excerpt: "Every year, generally in mid-May, hundreds of companies from the hunting world gather in Bastia Umbra, between Perugia and Assisi, 3.4 km from La Mora.",
      metaDescription: "Caccia Village at Umbriafiere (Bastia Umbra): dates, exhibitors and where to stay near the hunting fair — Agriturismo La Mora, 3.4 km away, with Assisi 6.8 km away.",
      image: "/images/blog/caccia-village-campagna-umbria.jpg",
      alt: "Umbrian countryside with hay bales at sunset",
      intro:
        "Every year, generally in mid-May, Umbriafiere in Bastia Umbra hosts Caccia Village: the trade fair dedicated to the hunting world, between Perugia and Assisi — 3.4 km from Agriturismo La Mora, about 6 minutes by car.",
      introCtaHeading: "Planning your stay for Caccia Village?",
      introCtaLabel: "Check availability",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "What is Caccia Village" },
        {
          type: "p",
          text: "Caccia Village is the trade fair dedicated to the hunting world, held every year at Umbriafiere, the exhibition grounds in Bastia Umbra, between Perugia and Assisi. The 2026 edition ran from 16 to 18 May, with over 250 exhibiting companies — the highest turnout in the event's history: the fair typically falls around this time, in mid-May, though exact dates should always be checked on Umbriafiere's official calendar.",
        },
        { type: "h2", text: "What you'll find at the fair" },
        {
          type: "list",
          items: [
            "Firearms and ammunition, always displayed deactivated.",
            "Outdoor clothing and technical gear.",
            "Optics and specialised equipment.",
            "An ENCI area dedicated to hunting dogs and field trials.",
            "Game-meat food stalls and specialist butchery counters.",
          ],
        },
        {
          type: "image",
          src: "/images/piscina/piscina agriturismo la mora.webp",
          alt: "Panoramic pool at Agriturismo La Mora, 3.4 km from Umbriafiere",
        },
        { type: "h2", text: "Where to stay near Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distance from Umbriafiere", value: "3.4 km · about 6 min by car" },
            { label: "Distance from Assisi", value: "6.8 km (Piazza del Comune) · about 14 min" },
            { label: "Apartments", value: "5 independent, each with its own kitchen" },
            { label: "Booking", value: "Direct, no intermediaries" },
          ],
        },
        {
          type: "p",
          text: "Even for visitors coming from out of region just for the fair, an agriturismo near Caccia Village is a convenient base in the countryside: five independent apartments 3.4 km from Umbriafiere, with the chance — between one fair day and the next — to spend a few hours in Assisi, about 14 minutes away.",
        },
        {
          type: "cta",
          heading: "Book directly: no commissions, better terms.",
          body: "By writing to us, you speak directly with the people who run La Mora every day.",
          label: "Discover the apartments",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi and the Umbrian countryside, beyond the fair" },
        {
          type: "p",
          text: "Guests staying at La Mora during Caccia Village also find a property designed for families and groups: a panoramic pool open from May to September — right during the fair's season — a playground and shared spaces for those travelling with children while another member of the group is at the fair.",
        },
      ],
      finalCtaHeading: "Book your stay for Caccia Village.",
      finalCtaBody: "3.4 km from Umbriafiere, 6.8 km from the centre of Assisi: the convenient base for the fair.",
      finalCtaLabel: "Book directly",
      finalCtaHref: BOOKING_MODAL_HREF,
    },
  ],
  fr: [
    EUROCHOCOLATE_POST.fr,
    CARLO_ACUTIS_POST.fr,
    NATALE_UMBRIA_POST.fr,
    ALBERO_TRASIMENO_POST.fr,
    RASIGLIA_POST.fr,
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "Territoire",
      title: "Sainte-Marie-des-Anges : basilique, Portioncule et chapelle",
      excerpt: "La basilique qui abrite la Portioncule et la chapelle du Transitus, à 2,1 km de La Mora : que voir, horaires et entrée.",
      metaDescription: "La basilique Sainte-Marie-des-Anges à Assise abrite la Portioncule et la chapelle du Transitus. Horaires, entrée gratuite et où dormir à 2,1 km.",
      image: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg",
      alt: "Façade de la basilique Santa Maria degli Angeli, à Assise",
      inBreve: {
        heading: "En bref",
        items: [
          { label: "Dans la basilique", value: "Portioncule et chapelle du Transitus" },
          { label: "Horaires", value: "Tous les jours 7h30–12h30 et 14h30–19h" },
          { label: "Entrée", value: "Gratuite" },
          { label: "Depuis Agriturismo La Mora", value: "2,1 km en voiture" },
        ],
      },
      intro:
        "À 2,1 km d'Agriturismo La Mora, dans la plaine en contrebas d'Assise, la basilique Sainte-Marie-des-Anges (Santa Maria degli Angeli) fut construite entre 1569 et 1679, sur un projet de Galeazzo Alessi, autour d'une église bien plus petite et plus ancienne : la Portioncule.",
      introCtaHeading: "Vous préparez votre visite ? Choisissez où loger à 2,1 km de la basilique.",
      introCtaLabel: "Découvrir les appartements",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "La Portioncule, un cœur dans le cœur" },
        {
          type: "p",
          text: "La Portioncule est la petite église que François restaura et où il comprit sa vocation : ici, il fonda l'ordre des Frères mineurs, accueillit Claire en 1212 et obtint le Pardon d'Assise, l'indulgence plénière. Pour la protéger et accueillir les pèlerins, une immense basilique fut construite tout autour : aujourd'hui, en entrant, on se retrouve face à une chapelle minuscule sous une coupole immense — un contraste qui raconte, mieux que toute description, la distance entre la simplicité originelle de François et la manière dont son héritage a ensuite été célébré.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
          alt: "Intérieur de la Portioncule, à l'intérieur de la basilique Santa Maria degli Angeli",
          caption: "La Portioncule vue depuis la nef de la basilique.",
        },
        { type: "h2", text: "Basilique, Portioncule et chapelle du Transitus : la différence" },
        {
          type: "list",
          items: [
            "La basilique est la grande église construite entre 1569 et 1679 sur un projet de Galeazzo Alessi. Le séisme de 1832 en détruisit une partie de la nef centrale ; la façade, surmontée de la statue dorée de la Madone des Anges de Guglielmo Colasanti, fut refaite entre 1925 et 1930.",
            "La Portioncule est la chapelle médiévale au centre de la basilique, sous la coupole : la « chapelle » à laquelle on pense quand on parle de Sainte-Marie-des-Anges, le lieu où naquit l'ordre franciscain.",
            "La chapelle du Transitus, elle aussi dans la basilique, était une cellule de l'infirmerie du couvent : François y mourut le soir du 3 octobre 1226.",
          ],
        },
        { type: "h2", text: "Que voir au-delà de la Portioncule" },
        {
          type: "list",
          items: [
            "La roseraie — les roses sans épines liées au miracle raconté par la tradition franciscaine.",
            "Le musée de la Portioncule — consacré à l'histoire du sanctuaire et du franciscanisme, ouvert de 9h à 13h et de 14h30 à 17h, fermé le mercredi.",
            "La façade avec la statue dorée de la Madone des Anges, visible dès le parvis.",
          ],
        },
        { type: "h2", text: "Informations pratiques" },
        {
          type: "facts",
          items: [
            { label: "Horaires de la basilique", value: "7h30–12h30 et 14h30–19h, tous les jours" },
            { label: "Entrée", value: "Gratuite, comme les visites guidées des frères" },
            { label: "Musée de la Portioncule", value: "9h–13h et 14h30–17h, fermé le mercredi" },
            { label: "Distance depuis La Mora", value: "2,1 km en voiture" },
          ],
        },
        { type: "p", text: "Horaires du site officiel du sanctuaire, porziuncola.org (octobre 2026) : ils peuvent changer les jours de fête." },
        {
          type: "cta",
          heading: "Réservez en direct et organisez votre visite sans souci.",
          body: "En nous écrivant, vous parlez directement à ceux qui gèrent La Mora au quotidien : aucun intermédiaire, de meilleures conditions que sur les plateformes.",
          label: "Aller à la réservation directe",
          href: BOOKING_MODAL_HREF,
        },
        { type: "h2", text: "Une villa près de Sainte-Marie-des-Anges" },
        { type: "p", text: "Pour les groupes et les grandes familles, il y a aussi Villa Relax, la villa indépendante des mêmes propriétaires, à Rivotorto di Assisi, à 5 km de la basilique : jusqu'à 16 personnes dans 6 chambres, avec piscine privée et jardin, en location exclusive." },
        { type: "links", heading: "Pour un groupe", items: [{ label: "Villa Relax, villa indépendante jusqu'à 16 personnes", href: "/villa-relax-assisi/" }] },
        { type: "h2", text: "Comment y aller depuis Agriturismo La Mora" },
        {
          type: "p",
          text: "Le trajet fait 2,1 km en voiture, le long de la plaine qui relie la campagne de La Mora au centre d'Assise : la basilique est l'étape naturelle pour une visite d'une journée, souvent avant même de monter au centre historique. Ceux qui préfèrent se déplacer autrement peuvent aussi louer un vélo électrique directement sur place.",
        },
        {
          type: "image",
          src: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
          alt: "Extérieur d'Agriturismo La Mora, point de départ pour la basilique Santa Maria degli Angeli",
          caption: "On part d'ici : 2,1 km en voiture, ou un tour en vélo électrique.",
        },
      ],
      faq: {
        heading: "Questions fréquentes",
        items: [
          { q: "L'église Sainte-Marie-des-Anges et la Portioncule, est-ce la même chose ?", a: "Non : l'église Sainte-Marie-des-Anges est la grande basilique construite entre 1569 et 1679 sur un projet de Galeazzo Alessi ; la Portioncule est la petite église médiévale que la basilique renferme en son centre, sous la coupole." },
          { q: "Qu'est-ce que la chapelle de la Portioncule ?", a: "La petite église restaurée par saint François : il y comprit sa vocation, fonda l'ordre des Frères mineurs, accueillit sainte Claire en 1212 et obtint le Pardon d'Assise." },
          { q: "Où mourut saint François ?", a: "Dans la chapelle du Transitus, à l'intérieur de la basilique : c'était une cellule de l'infirmerie du couvent, et François y mourut le soir du 3 octobre 1226." },
          { q: "Combien coûte l'entrée et quels sont les horaires ?", a: "L'entrée au sanctuaire est gratuite. La basilique est ouverte tous les jours de 7h30 à 12h30 et de 14h30 à 19h ; le musée de la Portioncule de 9h à 13h et de 14h30 à 17h, fermé le mercredi (porziuncola.org, octobre 2026)." },
          { q: "Y a-t-il une villa à louer près de Sainte-Marie-des-Anges ?", a: "Villa Relax, la villa indépendante des mêmes propriétaires qu'Agriturismo La Mora, se trouve à Rivotorto di Assisi, à 5 km de la basilique : jusqu'à 16 personnes dans 6 chambres, avec piscine privée, en location exclusive." },
          { q: "À quelle distance d'Agriturismo La Mora se trouve la basilique ?", a: "À 2,1 km en voiture selon Google Maps : c'est le lieu franciscain le plus proche de la structure." },
        ],
      },
      finalCtaHeading: "À 2,1 km d'ici, à la campagne.",
      finalCtaBody: "Cinq appartements indépendants, une piscine panoramique, et la basilique à 2,1 km.",
      finalCtaLabel: "Découvrir les appartements",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "bosco-san-francesco",
      category: "Nature",
      title: "Le Bosco di San Francesco, sur les sentiers du FAI",
      excerpt: "Une zone naturelle protégée entre Assise et Santa Maria degli Angeli : oliveraies, bois et le torrent Tescio, gérés par le FAI.",
      metaDescription: "Le Bosco di San Francesco à Assise : parcours FAI de 4 km entre oliveraies et torrent Tescio, horaires et comment y aller depuis Agriturismo La Mora.",
      image: "/images/territorio/assisi/bosco di san francesco assisi.jpg",
      alt: "Vue aérienne du Bosco di San Francesco, avec ses oliviers disposés en cercle et les remparts d'Assise en arrière-plan",
      intro:
        "Entre Assise et Santa Maria degli Angeli, un parcours naturaliste d'environ 4 km traverse des oliveraies séculaires, un bois mixte et le torrent Tescio — une autre façon de découvrir le territoire, loin de la pierre du centre historique.",
      introCtaHeading: "Envie de marcher parmi les oliviers et de retrouver la piscine le même après-midi ?",
      introCtaLabel: "Vérifier les disponibilités",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "Un bois géré par le FAI" },
        {
          type: "p",
          text: "Depuis 2008, le Bosco di San Francesco est confié au FAI (Fondo Ambiente Italiano), qui en assure l'entretien et organise des visites guidées le long du parcours. Le sentier relie symboliquement deux hauts lieux du franciscanisme — Assise en haut, Santa Maria degli Angeli en bas — en traversant un paysage resté agricole : oliveraies encore cultivées, terrasses, et le cours du Tescio qui accompagne une bonne partie du chemin.",
        },
        { type: "h3", text: "Ce que l'on découvre le long du parcours" },
        {
          type: "p",
          text: "Outre les oliveraies, le parcours comprend une installation artistique permanente — un grand cercle d'oliviers visible même depuis le ciel — conçue comme un lieu de halte et de réflexion, ainsi que des points de vue sur les remparts d'Assise qui dominent la vallée des deux côtés du bois.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
          alt: "Sentier parmi les oliviers dans le Bosco di San Francesco",
        },
        { type: "h2", text: "Informations pratiques" },
        {
          type: "facts",
          items: [
            { label: "Longueur", value: "Environ 4 km" },
            { label: "Gestion", value: "FAI, depuis 2008" },
            { label: "Entrée principale", value: "Près de Santa Maria degli Angeli" },
            { label: "Horaires et billets", value: "Variables selon la saison — vérifier sur le site du FAI" },
          ],
        },
        {
          type: "cta",
          heading: "Un séjour de plusieurs jours facilite l'organisation de chaque excursion.",
          body: "À partir de 7 nuits, la réservation directe donne droit à 10 % de réduction.",
          label: "Découvrir les appartements",
          href: "/alloggi/",
        },
        { type: "h2", text: "Depuis Agriturismo La Mora" },
        {
          type: "p",
          text: "L'entrée principale du bois, depuis la place de la basilique supérieure Saint-François, est à 7,5 km de La Mora, environ 18 minutes en voiture : on laisse la voiture dans l'un des parkings d'Assise et on continue à pied. C'est l'une des excursions les plus simples à organiser pendant le séjour — pas besoin d'y consacrer une journée entière, elle se combine facilement avec une visite de la basilique ou un après-midi à la piscine au retour.",
        },
      ],
      finalCtaHeading: "On y arrive en 18 minutes, on revient pour le reste de la journée.",
      finalCtaBody: "La piscine panoramique de La Mora est à deux pas des appartements.",
      finalCtaLabel: "Découvrir la piscine",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "santuario-san-damiano",
      category: "Territoire",
      title: "Sanctuaire de San Damiano à Assise : François et Claire",
      excerpt: "Le sanctuaire juste à la sortie du centre d'Assise où le crucifix parla à François et où Claire vécut 42 ans.",
      metaDescription: "San Damiano à Assise : le sanctuaire où le crucifix parla à François et où Claire vécut 42 ans. À 1,5 km à pied du centre et à 7,4 km de La Mora.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Sanctuaire de San Damiano parmi les oliviers, aux abords d'Assise",
      inBreve: {
        heading: "En bref",
        items: [
          { label: "Ce que c'est", value: "Sanctuaire franciscain, patrimoine mondial de l'UNESCO depuis 2000" },
          { label: "Le crucifix", value: "L'original est dans la basilique Sainte-Claire" },
          { label: "À pied depuis le centre", value: "1,5 km · env. 21 min en descente" },
          { label: "Depuis Agriturismo La Mora", value: "7,4 km · env. 11 min en voiture" },
        ],
      },
      intro:
        "Juste à la sortie du centre d'Assise, à 1,5 km à pied de la Piazza del Comune, parmi les oliviers, le sanctuaire de San Damiano abrite deux des histoires les plus importantes du franciscanisme : la conversion de François et la vie de Claire.",
      introCtaHeading: "Un moment de calme après la basilique : organisez votre séjour.",
      introCtaLabel: "Vérifier les disponibilités",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "« Va, répare ma maison »" },
        {
          type: "p",
          text: "Selon la tradition, c'est ici que le crucifix peint aujourd'hui conservé dans la basilique Sainte-Claire parla à François : « François, va et répare ma maison qui, comme tu le vois, tombe en ruine ». François prit l'appel au pied de la lettre et restaura de ses propres mains la petite église, alors en ruine. Une copie du crucifix se trouve aujourd'hui au-dessus du maître-autel de San Damiano.",
        },
        { type: "h2", text: "Le monastère de Claire" },
        {
          type: "p",
          text: "San Damiano est aussi le lieu où Claire d'Assise vécut 42 ans et où elle mourut. Depuis 2000, avec les autres lieux franciscains d'Assise, il est inscrit au patrimoine mondial de l'UNESCO. Contrairement à la basilique Saint-François, il reste un lieu recueilli et silencieux : sans doute l'étape la plus authentique pour qui cherche un moment de recueillement loin de l'affluence du centre.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg",
          alt: "Vue du sanctuaire de San Damiano parmi les oliviers",
        },
        { type: "h2", text: "Comment y arriver" },
        {
          type: "facts",
          items: [
            { label: "À pied depuis la Piazza del Comune", value: "1,5 km · env. 21 min en descente" },
            { label: "En voiture depuis La Mora", value: "7,4 km · env. 11 min" },
            { label: "Patrimoine de l'UNESCO", value: "Depuis 2000, avec les autres lieux franciscains" },
            { label: "À combiner avec", value: "La basilique Sainte-Claire, où est conservé le crucifix original" },
          ],
        },
        {
          type: "cta",
          heading: "Réservez en direct, économisez davantage.",
          body: "Aucune commission d'intermédiation, des réductions dédiées à la réservation directe.",
          label: "Découvrir l'avantage direct",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Depuis Agriturismo La Mora" },
        {
          type: "p",
          text: "Depuis La Mora, San Damiano est à 7,4 km, environ 11 minutes en voiture selon Google Maps. On peut aussi le combiner avec une journée dans le centre historique : depuis la Piazza del Comune, il y a 1,5 km à pied par la Via San Damiano, environ 21 minutes en descente. La montée au retour est plus exigeante, à garder à l'esprit avec de jeunes enfants.",
        },
      ],
      faq: {
        heading: "Questions fréquentes",
        items: [
          { q: "Où se trouve San Damiano à Assise ?", a: "Juste à la sortie du centre historique, sous les remparts : depuis la Piazza del Comune, il y a 1,5 km à pied par la Via San Damiano, environ 21 minutes en descente selon Google Maps." },
          { q: "Que s'est-il passé à San Damiano ?", a: "Selon la tradition, le crucifix y parla à François pour lui demander de réparer sa maison. Sainte Claire vécut aussi 42 ans à San Damiano et y mourut." },
          { q: "Où se trouve aujourd'hui le crucifix de San Damiano ?", a: "L'original est conservé dans la basilique Sainte-Claire, dans le centre d'Assise ; une copie se trouve au-dessus du maître-autel de San Damiano." },
          { q: "San Damiano est-il inscrit au patrimoine de l'UNESCO ?", a: "Oui, depuis 2000, avec les autres lieux franciscains d'Assise." },
          { q: "Comment aller à San Damiano depuis Agriturismo La Mora ?", a: "En voiture, il y a 7,4 km, environ 11 minutes selon Google Maps." },
        ],
      },
      finalCtaHeading: "Retour à La Mora, pour se détendre à la piscine.",
      finalCtaBody: "À 6,8 km du centre d'Assise, la campagne ombrienne attend, sans hâte.",
      finalCtaLabel: "Découvrir les appartements",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "cascate-delle-marmore",
      category: "Excursion d'une journée",
      title: "Cascades des Marmore depuis Assise : 77 km en voiture",
      excerpt: "À 77,7 km d'Assise et 77,3 km de La Mora, un peu plus d'une heure de route : comment y aller, quand l'eau coule et quel belvédère choisir.",
      metaDescription: "Cascades des Marmore depuis Assise : 77,7 km, environ 1 h 15 de route ; 77,3 km depuis Agriturismo La Mora. Itinéraire, horaires de l'eau et belvédères.",
      image: "/images/territorio/dintorni/cascate delle marmore.jpg",
      alt: "Les Cascate delle Marmore en Ombrie",
      inBreve: {
        heading: "En bref",
        items: [
          { label: "Depuis Assise (Piazza del Comune)", value: "77,7 km · env. 1 h 15" },
          { label: "Depuis Agriturismo La Mora", value: "77,3 km · env. 1 h 10" },
          { label: "Hauteur", value: "165 m en trois sauts" },
          { label: "Eau", value: "À heures fixes, différentes selon le mois et le jour" },
          { label: "Entrées", value: "Belvedere Inferiore et Belvedere Superiore" },
        ],
      },
      intro:
        "Les cascades des Marmore sont à 77,7 km du centre d'Assise (Piazza del Comune) : environ 1 h 15 en voiture par la SS3, selon Google Maps. Depuis Agriturismo La Mora, il y a 77,3 km, environ 1 h 10, pour découvrir près de Terni une chute d'eau de 165 mètres créée par les Romains.",
      introCtaHeading: "Une excursion hors les murs, un retour tranquille : où loger entre les deux.",
      introCtaLabel: "Découvrir les appartements",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Une cascade construite par les Romains" },
        {
          type: "p",
          text: "La cascade des Marmore est née d'un ouvrage romain : en 271 av. J.-C., le consul Manius Curius Dentatus fit dévier le Velino vers le Nera pour libérer la plaine de Rieti des eaux stagnantes. Le résultat est une chute de 165 mètres en trois sauts, que le portail officiel du tourisme italien présente comme la plus haute d'Europe.",
        },
        { type: "h2", text: "Les belvédères et les sentiers" },
        {
          type: "list",
          items: [
            "Belvedere Inferiore — sur la route de la Valnerina : on y voit toute la cascade.",
            "Belvedere Superiore — au bout du village de Marmore, face au premier saut.",
            "Sentiero dell'Antico Passaggio — monte en pente raide du Belvedere Inferiore vers le sommet ; en chemin, un tunnel mène au Balcone degli Innamorati, tout près de l'eau.",
          ],
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
          alt: "Vue rapprochée des Cascate delle Marmore en plein débit",
        },
        { type: "h2", text: "Quand voir l'eau" },
        {
          type: "p",
          text: "La cascade est à débit contrôlé : quand le saut n'est pas à plein régime, l'eau est déviée vers les conduites de la centrale hydroélectrique. Elle n'est lâchée qu'à certaines heures, différentes selon le mois et le jour de la semaine (en novembre 2026, par exemple, pas de lâcher en semaine) : avant de partir, consultez le calendrier sur le site officiel du parc, cascatadellemarmore.info.",
        },
        {
          type: "cta",
          heading: "Organisez l'excursion tranquillement : réservez votre séjour en direct.",
          label: "Vérifier les disponibilités",
          href: BOOKING_MODAL_HREF,
        },
        { type: "h2", text: "Depuis Assise et depuis Agriturismo La Mora" },
        {
          type: "facts",
          items: [
            { label: "Depuis Assise (Piazza del Comune)", value: "77,7 km · env. 1 h 15" },
            { label: "Depuis Agriturismo La Mora", value: "77,3 km · env. 1 h 10" },
            { label: "Autre itinéraire", value: "Par la SS 209 Valnerina, environ 75 km" },
            { label: "À combiner avec", value: "Une halte à Terni" },
          ],
        },
        {
          type: "p",
          text: "Avec un peu plus d'une heure de route par trajet, les Marmore tiennent en une demi-journée : on part le matin, on visite la cascade pendant les heures de lâcher d'eau et on rentre à temps pour l'après-midi — ou on prolonge la journée par une halte dans le centre de Terni.",
        },
      ],
      faq: {
        heading: "Questions fréquentes",
        items: [
          { q: "À quelle distance d'Assise se trouvent les cascades des Marmore ?", a: "Depuis le centre d'Assise (Piazza del Comune), 77,7 km, environ 1 h 15 en voiture ; depuis Agriturismo La Mora, 77,3 km, environ 1 h 10 (Google Maps, itinéraire par la SS3)." },
          { q: "Comment aller aux cascades des Marmore depuis Assise ?", a: "En voiture : Google Maps propose l'itinéraire par la SS3, environ 77 km, ou celui avec un tronçon de la SS 209 Valnerina, environ 75 km, tous deux d'un peu plus d'une heure. Les entrées du parc sont le Belvedere Inferiore et le Belvedere Superiore." },
          { q: "Quand l'eau coule-t-elle aux cascades des Marmore ?", a: "Seulement à certaines heures, différentes selon le mois et le jour de la semaine : en dehors, l'eau est déviée vers la centrale hydroélectrique. Le calendrier à jour est sur le site officiel du parc, cascatadellemarmore.info." },
          { q: "Quelle est la hauteur de la cascade des Marmore ?", a: "165 mètres en trois sauts : c'est le Velino qui se jette dans le Nera." },
          { q: "Qui a créé la cascade des Marmore ?", a: "Les Romains : en 271 av. J.-C., le consul Manius Curius Dentatus fit dévier les eaux du Velino vers le Nera pour assécher les marais de la plaine de Rieti." },
          { q: "Peut-on voir les Marmore en une demi-journée depuis Assise ?", a: "Oui : avec un peu plus d'une heure de route par trajet, on part le matin et on rentre en début d'après-midi. Mieux vaut caler la visite sur les heures de lâcher d'eau." },
        ],
      },
      finalCtaHeading: "Retour à La Mora pour le reste de la journée.",
      finalCtaBody: "Piscine panoramique ouverte de mai à septembre, à deux pas des appartements.",
      finalCtaLabel: "Découvrir la piscine",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "monte-subasio",
      category: "Nature",
      title: "Monte Subasio : les sentiers au-dessus d'Assise",
      excerpt: "Le parc naturel qui domine la ville : pâturages d'altitude, le fromage du même nom, et des sentiers pour marcher ou pédaler.",
      metaDescription: "Monte Subasio, parc régional au-dessus d'Assise : sentiers depuis l'Eremo delle Carceri, pâturages d'altitude et pecorino di Subasio. Près d'Agriturismo La Mora.",
      image: "/images/territorio/dintorni/monte subasio alto.jpg",
      alt: "Vue aérienne des pâturages d'altitude du Monte Subasio au coucher du soleil",
      intro:
        "Au-dessus d'Assise, le massif qui donne son nom au célèbre pecorino s'ouvre en pâturages d'altitude et en bois de chênes et de hêtres — un parc régional traversé par des sentiers pour marcher ou pédaler, avec des vues sur la vallée ombrienne que le centre historique ne peut offrir.",
      introCtaHeading: "Une base pratique pour qui veut marcher ou pédaler en Ombrie.",
      introCtaLabel: "Découvrir les appartements",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "De la ville au parc" },
        {
          type: "p",
          text: "Le Monte Subasio est aujourd'hui un parc régional : un réseau de sentiers relie Assise à l'Eremo delle Carceri — l'ermitage où François se retirait pour prier, enchâssé dans la roche du mont — et se poursuit vers le sommet, à 1 290 mètres. Le paysage change progressivement le long du parcours : des bois denses près de l'Eremo, on monte vers des pâturages d'altitude ouverts, où le regard porte jusqu'à la vallée ombrienne.",
        },
        { type: "h2", text: "Le pecorino di Subasio" },
        {
          type: "p",
          text: "C'est ce mont qui a donné son nom au pecorino di Subasio, encore produit aujourd'hui par les troupeaux qui paissent en altitude. Le même massif est aussi la source naturelle de la célèbre pierre rose avec laquelle est construite une grande partie d'Assise — la pierre qui donne à la ville la couleur que l'on voit de loin, surtout au coucher du soleil.",
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/monte-subasio.jpg",
          alt: "Sentier parmi les pâturages du Monte Subasio",
        },
        { type: "h2", text: "Marcher ou pédaler" },
        {
          type: "facts",
          items: [
            { label: "Altitude du sommet", value: "1 290 mètres" },
            { label: "Point de départ", value: "Eremo delle Carceri" },
            { label: "Statut", value: "Parc régional" },
            { label: "Adapté à", value: "Randonnée et VTT / vélo électrique" },
          ],
        },
        {
          type: "cta",
          heading: "Louez un vélo électrique directement sur place.",
          body: "Pratique pour monter sans effort même sur les tronçons les plus exigeants.",
          label: "Découvrir les activités",
          href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
        },
        { type: "h2", text: "Depuis Agriturismo La Mora" },
        {
          type: "p",
          text: "L'Eremo delle Carceri, point de départ des principaux sentiers, est à 12,2 km de La Mora, environ 20 minutes en voiture selon Google Maps. Pour qui préfère se déplacer autrement, le vélo électrique loué sur place facilite les tronçons en montée sans renoncer à l'excursion.",
        },
      ],
      finalCtaHeading: "Retour à La Mora, entre piscine et campagne.",
      finalCtaBody: "Cinq appartements indépendants, à 6,8 km du centre d'Assise et à 12,2 km de l'Eremo delle Carceri.",
      finalCtaLabel: "Découvrir les appartements",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "agriumbria-umbriafiere",
      category: "Événements",
      title: "Agriumbria à Umbriafiere : où loger près du salon",
      excerpt: "Chaque année, généralement fin mars, le plus grand salon régional de l'agriculture, de l'élevage et de l'alimentation se tient à Bastia Umbra, à 3,4 km de La Mora.",
      metaDescription: "Agriumbria à Umbriafiere (Bastia Umbra) : ce qu'il y a à voir, dates et où loger près d'Agriumbria — Agriturismo La Mora, à 3,4 km, avec Assise à 6,8 km.",
      image: "/images/blog/agriumbria-mucche-fiera-agricola.jpg",
      alt: "Bétail conduit par des exposants lors d'un salon agricole en plein air",
      intro:
        "Chaque année, généralement fin mars, Umbriafiere à Bastia Umbra accueille Agriumbria : le plus grand salon régional de l'agriculture, de l'élevage et de l'alimentation — à 3,4 km d'Agriturismo La Mora, environ 6 minutes en voiture.",
      introCtaHeading: "Vous organisez votre séjour pour Agriumbria ?",
      introCtaLabel: "Vérifier les disponibilités",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "Qu'est-ce qu'Agriumbria" },
        {
          type: "p",
          text: "Agriumbria est le Salon national de l'agriculture, de l'élevage et de l'alimentation : l'un des salons professionnels les plus importants du centre de l'Italie, organisé chaque année à Umbriafiere, le parc des expositions de Bastia Umbra. L'édition 2026 a franchi le cap de la 57e édition, qui s'est tenue du 27 au 29 mars — le salon a généralement lieu à cette période, fin mars, mais les dates exactes de chaque édition doivent toujours être vérifiées sur le calendrier officiel d'Umbriafiere, qui peut changer d'une année à l'autre.",
        },
        { type: "h2", text: "Ce que l'on trouve au salon" },
        {
          type: "list",
          items: [
            "Machines et équipements agricoles, des grandes entreprises aux petits producteurs.",
            "Expositions de races bovines, ovines et avicoles nationales — dont Chianina, Limousine, Charolaise et Romagnola.",
            "Technologies pour la production d'huile, de vin et pour les laiteries.",
            "Un espace produits typiques et dégustations, qui attire aussi les visiteurs extérieurs au secteur.",
          ],
        },
        {
          type: "image",
          src: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
          alt: "Campagne ombrienne autour d'Agriturismo La Mora, à 3,4 km d'Umbriafiere",
        },
        { type: "h2", text: "Où loger près d'Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distance depuis Umbriafiere", value: "3,4 km · env. 6 min en voiture" },
            { label: "Distance depuis Assise", value: "6,8 km (Piazza del Comune) · env. 14 min" },
            { label: "Appartements", value: "5 indépendants, avec cuisine propre" },
            { label: "Réservation", value: "Directe, sans intermédiaire" },
          ],
        },
        {
          type: "p",
          text: "Pour les exposants, ceux qui travaillent au salon ou le visitent sur plusieurs jours, un agriturismo près d'Agriumbria est souvent plus pratique qu'un hôtel en ville : cinq appartements indépendants, chacun avec sa propre cuisine, à la campagne plutôt que dans la circulation de Bastia Umbra — à 3,4 km d'Umbriafiere mais assez à l'écart pour retrouver le calme le soir.",
        },
        {
          type: "cta",
          heading: "Réservez en direct : aucune commission, de meilleures conditions.",
          body: "En nous écrivant, vous parlez directement à ceux qui gèrent La Mora au quotidien.",
          label: "Découvrir les appartements",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assise à 6,8 km, même pendant le salon" },
        {
          type: "p",
          text: "Les hôtes logeant près d'Umbriafiere pour Agriumbria ont aussi Assise à portée de main : depuis La Mora, la basilique Santa Maria degli Angeli est à 2,1 km, le centre historique à 6,8 km (environ 14 minutes) et la basilique Saint-François à 7,5 km (environ 18 minutes), faciles à combiner avec une journée de salon ou une pause entre deux rendez-vous.",
        },
      ],
      finalCtaHeading: "Réservez votre séjour pour Agriumbria.",
      finalCtaBody: "À 3,4 km d'Umbriafiere, à 6,8 km du centre d'Assise : la base pratique pour le salon.",
      finalCtaLabel: "Réserver en direct",
      finalCtaHref: BOOKING_MODAL_HREF,
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Événements",
      title: "Caccia Village à Umbriafiere : où loger pour le salon de la chasse",
      excerpt: "Chaque année, généralement mi-mai, des centaines d'entreprises du monde de la chasse se réunissent à Bastia Umbra, entre Pérouse et Assise, à 3,4 km de La Mora.",
      metaDescription: "Caccia Village à Umbriafiere (Bastia Umbra) : dates, exposants et où loger près du salon de la chasse — Agriturismo La Mora, à 3,4 km, avec Assise à 6,8 km.",
      image: "/images/blog/caccia-village-campagna-umbria.jpg",
      alt: "Campagne ombrienne avec des bottes de foin au coucher du soleil",
      intro:
        "Chaque année, généralement mi-mai, Umbriafiere à Bastia Umbra accueille Caccia Village : le salon dédié au monde de la chasse, entre Pérouse et Assise — à 3,4 km d'Agriturismo La Mora, environ 6 minutes en voiture.",
      introCtaHeading: "Vous organisez votre séjour pour Caccia Village ?",
      introCtaLabel: "Vérifier les disponibilités",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "Qu'est-ce que Caccia Village" },
        {
          type: "p",
          text: "Caccia Village est le salon dédié au monde de la chasse qui se tient chaque année à Umbriafiere, le parc des expositions de Bastia Umbra, entre Pérouse et Assise. L'édition 2026 s'est déroulée du 16 au 18 mai, avec plus de 250 entreprises exposantes — la participation la plus élevée de l'histoire de l'événement : le salon a généralement lieu à cette période, mi-mai, mais les dates exactes doivent toujours être vérifiées sur le calendrier officiel d'Umbriafiere.",
        },
        { type: "h2", text: "Ce que l'on trouve au salon" },
        {
          type: "list",
          items: [
            "Armes et munitions, toujours exposées désactivées.",
            "Vêtements et équipements techniques outdoor.",
            "Optiques et instruments spécialisés.",
            "Un espace ENCI dédié aux chiens de chasse et aux épreuves cynophiles.",
            "Gastronomie de gibier et étals de boucherie spécialisée.",
          ],
        },
        {
          type: "image",
          src: "/images/piscina/piscina agriturismo la mora.webp",
          alt: "Piscine panoramique d'Agriturismo La Mora, à 3,4 km d'Umbriafiere",
        },
        { type: "h2", text: "Où loger près d'Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distance depuis Umbriafiere", value: "3,4 km · env. 6 min en voiture" },
            { label: "Distance depuis Assise", value: "6,8 km (Piazza del Comune) · env. 14 min" },
            { label: "Appartements", value: "5 indépendants, avec cuisine propre" },
            { label: "Réservation", value: "Directe, sans intermédiaire" },
          ],
        },
        {
          type: "p",
          text: "Même pour les visiteurs venus d'une autre région uniquement pour le salon, un agriturismo près de Caccia Village est un point d'ancrage pratique à la campagne : cinq appartements indépendants à 3,4 km d'Umbriafiere, avec la possibilité — entre deux journées de salon — de consacrer quelques heures à Assise, à environ 14 minutes de route.",
        },
        {
          type: "cta",
          heading: "Réservez en direct : aucune commission, de meilleures conditions.",
          body: "En nous écrivant, vous parlez directement à ceux qui gèrent La Mora au quotidien.",
          label: "Découvrir les appartements",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assise et la campagne ombrienne, au-delà du salon" },
        {
          type: "p",
          text: "Les hôtes qui séjournent à La Mora pendant Caccia Village trouvent aussi une structure pensée pour les familles et les groupes : piscine panoramique ouverte de mai à septembre — justement pendant la période du salon — aire de jeux et espaces communs pour ceux qui voyagent avec des enfants pendant qu'un autre membre du groupe est au salon.",
        },
      ],
      finalCtaHeading: "Réservez votre séjour pour Caccia Village.",
      finalCtaBody: "À 3,4 km d'Umbriafiere, à 6,8 km du centre d'Assise : la base pratique pour le salon.",
      finalCtaLabel: "Réserver en direct",
      finalCtaHref: BOOKING_MODAL_HREF,
    },
  ],
  de: [
    EUROCHOCOLATE_POST.de,
    CARLO_ACUTIS_POST.de,
    NATALE_UMBRIA_POST.de,
    ALBERO_TRASIMENO_POST.de,
    RASIGLIA_POST.de,
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "Umgebung",
      title: "Santa Maria degli Angeli: Basilika, Portiunkula und Kapelle",
      excerpt: "Die Basilika mit der Portiunkula und der Transitus-Kapelle, 2,1 km von La Mora: Sehenswertes, Öffnungszeiten und Eintritt.",
      metaDescription: "Die Basilika Santa Maria degli Angeli in Assisi birgt die Portiunkula und die Transitus-Kapelle. Öffnungszeiten, freier Eintritt, Unterkunft 2,1 km entfernt.",
      image: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg",
      alt: "Fassade der Basilika Santa Maria degli Angeli in Assisi",
      inBreve: {
        heading: "Auf einen Blick",
        items: [
          { label: "In der Basilika", value: "Portiunkula und Transitus-Kapelle" },
          { label: "Öffnungszeiten", value: "Täglich 7:30–12:30 und 14:30–19:00 Uhr" },
          { label: "Eintritt", value: "Frei" },
          { label: "Ab Agriturismo La Mora", value: "2,1 km mit dem Auto" },
        ],
      },
      intro:
        "2,1 km von Agriturismo La Mora entfernt, in der Ebene unterhalb von Assisi, wurde die Basilika Santa Maria degli Angeli zwischen 1569 und 1679 nach Plänen von Galeazzo Alessi errichtet — um eine viel kleinere und ältere Kirche herum: die Portiunkula.",
      introCtaHeading: "Planen Sie den Besuch? Wählen Sie eine Unterkunft 2,1 km von der Basilika entfernt.",
      introCtaLabel: "Die Apartments entdecken",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Die Portiunkula, ein Herz im Herzen" },
        {
          type: "p",
          text: "Die Portiunkula ist die kleine Kirche, die Franziskus restaurierte und in der er seine Berufung erkannte: Hier gründete er den Orden der Minderbrüder, nahm 1212 Klara auf und erlangte den Portiunkula-Ablass, den vollkommenen Ablass. Um sie zu schützen und die Pilger aufzunehmen, wurde eine riesige Basilika um sie herum errichtet: Wer heute eintritt, findet eine winzige Kapelle unter einer gewaltigen Kuppel vor — ein Kontrast, der besser als jede Beschreibung den Abstand zwischen der ursprünglichen Einfachheit des Franziskus und der Art zeigt, wie sein Erbe später gefeiert wurde.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
          alt: "Innenansicht der Portiunkula, im Inneren der Basilika Santa Maria degli Angeli",
          caption: "Die Portiunkula, vom Kirchenschiff der Basilika aus gesehen.",
        },
        { type: "h2", text: "Basilika, Portiunkula und Transitus-Kapelle: der Unterschied" },
        {
          type: "list",
          items: [
            "Die Basilika ist die große Kirche, die zwischen 1569 und 1679 nach Plänen von Galeazzo Alessi entstand. Das Erdbeben von 1832 zerstörte einen Teil des Mittelschiffs; die Fassade mit der vergoldeten Statue der Madonna degli Angeli von Guglielmo Colasanti wurde zwischen 1925 und 1930 erneuert.",
            "Die Portiunkula ist die mittelalterliche Kapelle in der Mitte der Basilika, unter der Kuppel: die „Kapelle“, an die man bei Santa Maria degli Angeli denkt, der Ort, an dem der Franziskanerorden entstand.",
            "Die Transitus-Kapelle, ebenfalls in der Basilika, war eine Zelle der Krankenstation des Klosters: Hier starb Franziskus am Abend des 3. Oktober 1226.",
          ],
        },
        { type: "h2", text: "Was man neben der Portiunkula sehen sollte" },
        {
          type: "list",
          items: [
            "Der Rosengarten — die dornenlosen Rosen, verbunden mit dem Wunder, von dem die franziskanische Überlieferung erzählt.",
            "Das Portiunkula-Museum — zur Geschichte des Heiligtums und des Franziskanertums, geöffnet 9–13 und 14:30–17 Uhr, mittwochs geschlossen.",
            "Die Fassade mit der vergoldeten Statue der Madonna degli Angeli, schon vom Vorplatz aus zu sehen.",
          ],
        },
        { type: "h2", text: "Praktische Informationen" },
        {
          type: "facts",
          items: [
            { label: "Öffnungszeiten der Basilika", value: "Täglich 7:30–12:30 und 14:30–19:00 Uhr" },
            { label: "Eintritt", value: "Frei, ebenso die Führungen der Brüder" },
            { label: "Portiunkula-Museum", value: "9–13 und 14:30–17 Uhr, mittwochs geschlossen" },
            { label: "Entfernung von La Mora", value: "2,1 km mit dem Auto" },
          ],
        },
        { type: "p", text: "Öffnungszeiten von der offiziellen Website des Heiligtums, porziuncola.org (Oktober 2026): an Feiertagen können sie sich ändern." },
        {
          type: "cta",
          heading: "Buchen Sie direkt und planen Sie den Besuch ganz ohne Sorgen.",
          body: "Wenn Sie uns schreiben, sprechen Sie direkt mit denen, die La Mora jeden Tag führen: kein Vermittler, bessere Konditionen als auf den Plattformen.",
          label: "Zur Direktbuchung",
          href: BOOKING_MODAL_HREF,
        },
        { type: "h2", text: "Eine Villa bei Santa Maria degli Angeli" },
        { type: "p", text: "Für Gruppen und große Familien gibt es außerdem Villa Relax, die unabhängige Villa derselben Eigentümer in Rivotorto di Assisi, 5 km von der Basilika: bis zu 16 Gäste in 6 Schlafzimmern, mit privatem Pool und Garten, exklusiv vermietet." },
        { type: "links", heading: "Für Gruppen", items: [{ label: "Villa Relax, unabhängige Villa für bis zu 16 Gäste", href: "/villa-relax-assisi/" }] },
        { type: "h2", text: "Anfahrt von Agriturismo La Mora" },
        {
          type: "p",
          text: "Die Fahrt ist nur 2,1 km lang, entlang der Ebene, die die Landschaft um La Mora mit dem Zentrum von Assisi verbindet: Die Basilika ist der natürliche erste Halt für einen Tagesausflug, oft schon bevor man in die Altstadt hinaufsteigt. Wer lieber leichter unterwegs ist, kann auch direkt vor Ort ein E-Bike mieten.",
        },
        {
          type: "image",
          src: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
          alt: "Außenansicht von Agriturismo La Mora, Ausgangspunkt für die Basilika Santa Maria degli Angeli",
          caption: "Hier startet man: 2,1 km mit dem Auto, oder eine Fahrt mit dem E-Bike.",
        },
      ],
      faq: {
        heading: "Häufige Fragen",
        items: [
          { q: "Sind die Kirche Santa Maria degli Angeli und die Portiunkula dasselbe?", a: "Nein: Die Kirche Santa Maria degli Angeli ist die große Basilika, die zwischen 1569 und 1679 nach Plänen von Galeazzo Alessi entstand; die Portiunkula ist die kleine mittelalterliche Kirche, die die Basilika in ihrer Mitte unter der Kuppel umschließt." },
          { q: "Was ist die Portiunkula-Kapelle?", a: "Die kleine Kirche, die der heilige Franziskus restaurierte: Hier erkannte er seine Berufung, gründete den Orden der Minderbrüder, nahm 1212 die heilige Klara auf und erlangte den Portiunkula-Ablass." },
          { q: "Wo starb der heilige Franziskus?", a: "In der Transitus-Kapelle in der Basilika: Sie war eine Zelle der Krankenstation des Klosters, und Franziskus starb dort am Abend des 3. Oktober 1226." },
          { q: "Was kostet der Eintritt und wann ist geöffnet?", a: "Der Eintritt in das Heiligtum ist frei. Die Basilika ist täglich von 7:30 bis 12:30 und von 14:30 bis 19:00 Uhr geöffnet, das Portiunkula-Museum von 9 bis 13 und von 14:30 bis 17 Uhr, mittwochs geschlossen (porziuncola.org, Oktober 2026)." },
          { q: "Gibt es eine Villa zur Miete bei Santa Maria degli Angeli?", a: "Villa Relax, die unabhängige Villa derselben Eigentümer wie Agriturismo La Mora, liegt in Rivotorto di Assisi, 5 km von der Basilika: bis zu 16 Gäste in 6 Schlafzimmern, mit privatem Pool, exklusiv vermietet." },
          { q: "Wie weit ist die Basilika von Agriturismo La Mora entfernt?", a: "2,1 km mit dem Auto laut Google Maps: Sie ist der franziskanische Ort, der der Unterkunft am nächsten liegt." },
        ],
      },
      finalCtaHeading: "2,1 km von hier, mitten auf dem Land.",
      finalCtaBody: "Fünf unabhängige Apartments, ein Panorama-Pool, und die Basilika 2,1 km entfernt.",
      finalCtaLabel: "Die Apartments entdecken",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "bosco-san-francesco",
      category: "Natur",
      title: "Der Bosco di San Francesco, auf den Wegen des FAI",
      excerpt: "Ein geschütztes Naturgebiet zwischen Assisi und Santa Maria degli Angeli: Olivenhaine, Wald und der Bach Tescio, gepflegt vom FAI.",
      metaDescription: "Der Bosco di San Francesco in Assisi: 4 km langer FAI-Weg durch Olivenhaine und entlang des Bachs Tescio, Öffnungszeiten und Anfahrt von Agriturismo La Mora.",
      image: "/images/territorio/assisi/bosco di san francesco assisi.jpg",
      alt: "Luftaufnahme des Bosco di San Francesco mit dem kreisförmigen Olivenhain und den Mauern von Assisi im Hintergrund",
      intro:
        "Zwischen Assisi und Santa Maria degli Angeli führt ein etwa 4 km langer Naturpfad durch jahrhundertealte Olivenhaine, Mischwald und entlang des Bachs Tescio — eine andere Art, die Gegend zu erleben, fernab vom Stein der Altstadt.",
      introCtaHeading: "Lust, zwischen Olivenbäumen zu spazieren und am selben Nachmittag wieder am Pool zu sein?",
      introCtaLabel: "Verfügbarkeit prüfen",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "Ein vom FAI gepflegter Wald" },
        {
          type: "p",
          text: "Seit 2008 wird der Bosco di San Francesco vom FAI (italienischer Nationaltrust) betreut, der ihn instand hält und Führungen entlang des Weges organisiert. Der Pfad verbindet symbolisch zwei Franziskus-Stätten — Assisi oben, Santa Maria degli Angeli unten — und durchquert dabei eine Landschaft, die landwirtschaftlich geblieben ist: noch bewirtschaftete Olivenhaine, Terrassen und der Tescio, der einen Großteil des Weges begleitet.",
        },
        { type: "h3", text: "Was man unterwegs sieht" },
        {
          type: "p",
          text: "Neben den Olivenhainen umfasst der Weg eine dauerhafte Kunstinstallation — ein großer Olivenbaum-Kreis, der sogar von oben sichtbar ist — als Ort zum Innehalten und Nachdenken gedacht, sowie Aussichtspunkte auf die Mauern von Assisi, die das Tal von beiden Seiten des Waldes dominieren.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
          alt: "Weg zwischen den Olivenbäumen im Bosco di San Francesco",
        },
        { type: "h2", text: "Praktische Informationen" },
        {
          type: "facts",
          items: [
            { label: "Länge", value: "Etwa 4 km" },
            { label: "Verwaltung", value: "FAI, seit 2008" },
            { label: "Haupteingang", value: "Nahe Santa Maria degli Angeli" },
            { label: "Öffnungszeiten und Tickets", value: "Saisonabhängig — auf der FAI-Website prüfen" },
          ],
        },
        {
          type: "cta",
          heading: "Ein längerer Aufenthalt erleichtert die Planung jedes Ausflugs.",
          body: "Ab 7 Nächten gibt es bei Direktbuchung 10 % Rabatt.",
          label: "Die Apartments entdecken",
          href: "/alloggi/",
        },
        { type: "h2", text: "Von Agriturismo La Mora aus" },
        {
          type: "p",
          text: "Der Haupteingang des Waldes, am Platz der Oberkirche von San Francesco, liegt 7,5 km von La Mora entfernt, rund 18 Minuten mit dem Auto: Man lässt das Auto auf einem der Parkplätze von Assisi stehen und geht zu Fuß weiter. Es ist einer der einfachsten Ausflüge während des Aufenthalts — kein ganzer Tag nötig, gut kombinierbar mit einem Besuch der Basilika oder einem Nachmittag am Pool danach.",
        },
      ],
      finalCtaHeading: "In 18 Minuten dort, und zurück für den Rest des Tages.",
      finalCtaBody: "Der Panorama-Pool von La Mora liegt nur wenige Schritte von den Apartments entfernt.",
      finalCtaLabel: "Den Pool entdecken",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "santuario-san-damiano",
      category: "Umgebung",
      title: "San Damiano in Assisi: Heiligtum von Franziskus und Klara",
      excerpt: "Das Heiligtum direkt vor der Altstadt von Assisi, in dem das Kreuz zu Franziskus sprach und Klara 42 Jahre lebte.",
      metaDescription: "San Damiano in Assisi: das Heiligtum, in dem das Kreuz zu Franziskus sprach und Klara 42 Jahre lebte. 1,5 km zu Fuß vom Zentrum, 7,4 km von La Mora.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Heiligtum San Damiano zwischen Olivenbäumen, in der Nähe von Assisi",
      inBreve: {
        heading: "Auf einen Blick",
        items: [
          { label: "Was es ist", value: "Franziskanisches Heiligtum, UNESCO-Welterbe seit 2000" },
          { label: "Das Kreuz", value: "Das Original ist in der Basilika Santa Chiara" },
          { label: "Zu Fuß vom Zentrum", value: "1,5 km · ca. 21 Min. bergab" },
          { label: "Ab Agriturismo La Mora", value: "7,4 km · ca. 11 Min. mit dem Auto" },
        ],
      },
      intro:
        "Direkt vor der Altstadt von Assisi, 1,5 km zu Fuß von der Piazza del Comune, zwischen Olivenbäumen, bewahrt das Heiligtum San Damiano zwei der wichtigsten Geschichten des Franziskanertums: die Bekehrung des Franziskus und das Leben der Klara.",
      introCtaHeading: "Ein ruhiger Moment nach der Basilika: planen Sie den Aufenthalt.",
      introCtaLabel: "Verfügbarkeit prüfen",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "„Geh, stelle mein Haus wieder her“" },
        {
          type: "p",
          text: "Der Überlieferung nach sprach hier das bemalte Kreuz, das heute in der Basilika Santa Chiara aufbewahrt wird, zu Franziskus: „Franziskus, geh und stelle mein Haus wieder her, das, wie du siehst, ganz verfällt.“ Franziskus nahm den Ruf wörtlich und restaurierte die damals verfallene kleine Kirche mit eigenen Händen. Über dem Hauptaltar von San Damiano hängt heute eine Kopie des Kreuzes.",
        },
        { type: "h2", text: "Das Kloster der Klara" },
        {
          type: "p",
          text: "San Damiano ist auch der Ort, an dem Klara von Assisi 42 Jahre lang lebte und starb. Seit 2000 gehört es mit den übrigen franziskanischen Stätten von Assisi zum UNESCO-Welterbe. Anders als die Basilika San Francesco bleibt es ein stiller, zurückgezogener Ort: wohl die authentischste Station für alle, die einen Moment der Einkehr abseits des Andrangs im Zentrum suchen.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg",
          alt: "Blick auf das Heiligtum San Damiano zwischen den Olivenbäumen",
        },
        { type: "h2", text: "Anfahrt" },
        {
          type: "facts",
          items: [
            { label: "Zu Fuß ab der Piazza del Comune", value: "1,5 km · ca. 21 Min. bergab" },
            { label: "Mit dem Auto ab La Mora", value: "7,4 km · ca. 11 Min." },
            { label: "UNESCO-Welterbe", value: "Seit 2000, mit den anderen franziskanischen Stätten" },
            { label: "Kombinieren mit", value: "Der Basilika Santa Chiara, wo das Originalkreuz hängt" },
          ],
        },
        {
          type: "cta",
          heading: "Direkt buchen, mehr sparen.",
          body: "Keine Vermittlungsgebühr, Rabatte speziell für die Direktbuchung.",
          label: "Den Direktbuchungs-Vorteil entdecken",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Von Agriturismo La Mora aus" },
        {
          type: "p",
          text: "Von La Mora aus liegt San Damiano 7,4 km entfernt, laut Google Maps rund 11 Minuten mit dem Auto. Man kann es auch mit einem Tag in der Altstadt verbinden: Von der Piazza del Comune sind es 1,5 km zu Fuß über die Via San Damiano, rund 21 Minuten bergab. Der Rückweg bergauf ist anstrengender — für Familien mit kleinen Kindern ein wichtiger Hinweis.",
        },
      ],
      faq: {
        heading: "Häufige Fragen",
        items: [
          { q: "Wo liegt San Damiano in Assisi?", a: "Direkt vor der Altstadt, unterhalb der Mauern: Von der Piazza del Comune sind es 1,5 km zu Fuß über die Via San Damiano, laut Google Maps rund 21 Minuten bergab." },
          { q: "Was geschah in San Damiano?", a: "Der Überlieferung nach sprach hier das Kreuz zu Franziskus und bat ihn, sein Haus wiederherzustellen. Die heilige Klara lebte außerdem 42 Jahre in San Damiano und starb dort." },
          { q: "Wo ist das Kreuz von San Damiano heute?", a: "Das Original wird in der Basilika Santa Chiara im Zentrum von Assisi aufbewahrt; über dem Hauptaltar von San Damiano hängt eine Kopie." },
          { q: "Gehört San Damiano zum UNESCO-Welterbe?", a: "Ja, seit 2000, zusammen mit den anderen franziskanischen Stätten von Assisi." },
          { q: "Wie kommt man von Agriturismo La Mora nach San Damiano?", a: "Mit dem Auto sind es 7,4 km, laut Google Maps rund 11 Minuten." },
        ],
      },
      finalCtaHeading: "Zurück nach La Mora, zum Entspannen am Pool.",
      finalCtaBody: "6,8 km vom Zentrum Assisis entfernt wartet die umbrische Landschaft, ganz ohne Eile.",
      finalCtaLabel: "Die Apartments entdecken",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "cascate-delle-marmore",
      category: "Tagesausflug",
      title: "Marmore-Wasserfälle ab Assisi: 77 km, gut eine Stunde",
      excerpt: "77,7 km von Assisi und 77,3 km von La Mora, gut eine Stunde Fahrt: Anfahrt, Zeiten des Wasserflusses und welcher Aussichtspunkt.",
      metaDescription: "Marmore-Wasserfälle ab Assisi: 77,7 km, rund 1 Stunde 15 Minuten mit dem Auto; 77,3 km ab Agriturismo La Mora. Anfahrt, Wasserzeiten, Aussichtspunkte.",
      image: "/images/territorio/dintorni/cascate delle marmore.jpg",
      alt: "Die Cascate delle Marmore in Umbrien",
      inBreve: {
        heading: "Auf einen Blick",
        items: [
          { label: "Ab Assisi (Piazza del Comune)", value: "77,7 km · ca. 1 Std. 15 Min." },
          { label: "Ab Agriturismo La Mora", value: "77,3 km · ca. 1 Std. 10 Min." },
          { label: "Höhe", value: "165 m in drei Stufen" },
          { label: "Wasser", value: "Zu festen Zeiten, je nach Monat und Wochentag" },
          { label: "Eingänge", value: "Belvedere Inferiore und Belvedere Superiore" },
        ],
      },
      intro:
        "Die Marmore-Wasserfälle liegen 77,7 km vom Zentrum Assisis (Piazza del Comune) entfernt: laut Google Maps rund 1 Stunde 15 Minuten mit dem Auto über die SS3. Ab Agriturismo La Mora sind es 77,3 km, rund 1 Stunde 10 Minuten, zu einem 165 Meter hohen Wasserfall bei Terni, den die Römer geschaffen haben.",
      introCtaHeading: "Ein Ausflug, eine entspannte Rückfahrt: wo man dazwischen übernachtet.",
      introCtaLabel: "Die Apartments entdecken",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Ein von den Römern erbauter Wasserfall" },
        {
          type: "p",
          text: "Der Marmore-Wasserfall geht auf ein römisches Bauwerk zurück: 271 v. Chr. ließ der Konsul Manius Curius Dentatus den Fluss Velino in den Nera ableiten, um die Ebene von Rieti von stehendem Wasser zu befreien. Das Ergebnis ist ein Fall von 165 Metern in drei Stufen, den das offizielle Tourismusportal Italiens als den höchsten Europas bezeichnet.",
        },
        { type: "h2", text: "Aussichtspunkte und Wege" },
        {
          type: "list",
          items: [
            "Belvedere Inferiore — an der Straße ins Valnerina: Von hier sieht man den ganzen Wasserfall.",
            "Belvedere Superiore — am Ende des Dorfes Marmore, mit Blick auf die erste Stufe.",
            "Sentiero dell'Antico Passaggio — steigt steil vom Belvedere Inferiore zur Spitze an; unterwegs führt ein Tunnel zum Balcone degli Innamorati, direkt am Wasser.",
          ],
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
          alt: "Nahaufnahme der Cascate delle Marmore bei voller Wasserführung",
        },
        { type: "h2", text: "Wann das Wasser fließt" },
        {
          type: "p",
          text: "Der Wasserfall wird reguliert: Wenn er nicht voll läuft, wird das Wasser in die Druckleitungen des Wasserkraftwerks umgeleitet. Freigegeben wird es nur zu bestimmten Zeiten, die je nach Monat und Wochentag wechseln (im November 2026 zum Beispiel werktags gar nicht): Prüfen Sie vor der Fahrt den Kalender auf der offiziellen Website des Parks, cascatadellemarmore.info.",
        },
        {
          type: "cta",
          heading: "Planen Sie den Ausflug entspannt: buchen Sie Ihren Aufenthalt direkt.",
          label: "Verfügbarkeit prüfen",
          href: BOOKING_MODAL_HREF,
        },
        { type: "h2", text: "Ab Assisi und ab Agriturismo La Mora" },
        {
          type: "facts",
          items: [
            { label: "Ab Assisi (Piazza del Comune)", value: "77,7 km · ca. 1 Std. 15 Min." },
            { label: "Ab Agriturismo La Mora", value: "77,3 km · ca. 1 Std. 10 Min." },
            { label: "Alternative Route", value: "Über die SS 209 Valnerina, rund 75 km" },
            { label: "Kombinieren mit", value: "Einem Halt in Terni" },
          ],
        },
        {
          type: "p",
          text: "Mit gut einer Stunde Fahrt pro Strecke passen die Marmore-Fälle in einen halben Tag: morgens losfahren, den Wasserfall während der Freigabezeiten besichtigen und rechtzeitig zum Nachmittag zurück sein — oder den Tag mit einem Halt im Zentrum von Terni verlängern.",
        },
      ],
      faq: {
        heading: "Häufige Fragen",
        items: [
          { q: "Wie weit sind die Marmore-Wasserfälle von Assisi entfernt?", a: "Vom Zentrum Assisis (Piazza del Comune) 77,7 km, rund 1 Stunde 15 Minuten mit dem Auto; ab Agriturismo La Mora 77,3 km, rund 1 Stunde 10 Minuten (Google Maps, Route über die SS3)." },
          { q: "Wie kommt man von Assisi zu den Marmore-Wasserfällen?", a: "Mit dem Auto: Google Maps schlägt die Route über die SS3 vor, rund 77 km, oder die mit einem Abschnitt der SS 209 Valnerina, rund 75 km, beide gut eine Stunde. Die Eingänge des Parks sind Belvedere Inferiore und Belvedere Superiore." },
          { q: "Wann fließt das Wasser an den Marmore-Wasserfällen?", a: "Nur zu bestimmten Zeiten, die je nach Monat und Wochentag wechseln: Außerhalb dieser Zeiten wird das Wasser zum Wasserkraftwerk umgeleitet. Der aktuelle Kalender steht auf der offiziellen Website des Parks, cascatadellemarmore.info." },
          { q: "Wie hoch ist der Marmore-Wasserfall?", a: "165 Meter in drei Stufen: Der Velino stürzt hier in den Nera." },
          { q: "Wer hat den Marmore-Wasserfall geschaffen?", a: "Die Römer: 271 v. Chr. ließ der Konsul Manius Curius Dentatus das Wasser des Velino in den Nera ableiten, um die Sümpfe der Ebene von Rieti trockenzulegen." },
          { q: "Kann man die Marmore-Fälle an einem halben Tag ab Assisi sehen?", a: "Ja: Mit gut einer Stunde Fahrt pro Strecke fährt man morgens los und ist am frühen Nachmittag zurück. Den Besuch am besten auf die Zeiten der Wasserfreigabe legen." },
        ],
      },
      finalCtaHeading: "Zurück nach La Mora für den Rest des Tages.",
      finalCtaBody: "Panorama-Pool von Mai bis September geöffnet, nur wenige Schritte von den Apartments entfernt.",
      finalCtaLabel: "Den Pool entdecken",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "monte-subasio",
      category: "Natur",
      title: "Monte Subasio: die Wanderwege über Assisi",
      excerpt: "Der Naturpark, der die Stadt überragt: Almweiden in der Höhe, der gleichnamige Käse, und Wege zum Wandern oder Radfahren.",
      metaDescription: "Monte Subasio, Regionalpark über Assisi: Wege ab der Eremo delle Carceri, Almweiden und Pecorino di Subasio. In der Nähe von Agriturismo La Mora.",
      image: "/images/territorio/dintorni/monte subasio alto.jpg",
      alt: "Luftaufnahme der Almweiden des Monte Subasio bei Sonnenuntergang",
      intro:
        "Über Assisi öffnet sich das Massiv, das dem berühmten Pecorino seinen Namen gibt, zu Almweiden und Eichen- und Buchenwäldern — ein Regionalpark, durchzogen von Wegen zum Wandern oder Radfahren, mit Blicken auf das umbrische Tal, die die Altstadt nicht bieten kann.",
      introCtaHeading: "Ein praktischer Ausgangspunkt für Wandern oder Radfahren in Umbrien.",
      introCtaLabel: "Die Apartments entdecken",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Von der Stadt in den Park" },
        {
          type: "p",
          text: "Der Monte Subasio ist heute Regionalpark: Ein Wegenetz verbindet Assisi mit der Eremo delle Carceri — der Einsiedelei, in die sich Franziskus zum Gebet zurückzog, in den Fels des Berges eingebettet — und führt weiter zum Gipfel, auf 1.290 Metern. Die Landschaft verändert sich entlang des Weges allmählich: Von den dichten Wäldern nahe der Eremo steigt man zu offenen Almweiden auf, von wo der Blick bis ins umbrische Tal reicht.",
        },
        { type: "h2", text: "Der Pecorino di Subasio" },
        {
          type: "p",
          text: "Dieser Berg gab dem Pecorino di Subasio seinen Namen, der noch heute von den in der Höhe weidenden Herden hergestellt wird. Dasselbe Massiv ist auch die natürliche Quelle des berühmten rosafarbenen Steins, aus dem ein Großteil von Assisi gebaut ist — der Stein, der der Stadt die Farbe verleiht, die man von weitem sieht, besonders bei Sonnenuntergang.",
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/monte-subasio.jpg",
          alt: "Weg durch die Weiden des Monte Subasio",
        },
        { type: "h2", text: "Wandern oder Radfahren" },
        {
          type: "facts",
          items: [
            { label: "Gipfelhöhe", value: "1.290 Meter" },
            { label: "Ausgangspunkt", value: "Eremo delle Carceri" },
            { label: "Status", value: "Regionalpark" },
            { label: "Geeignet für", value: "Trekking und Mountainbike / E-Bike" },
          ],
        },
        {
          type: "cta",
          heading: "Mieten Sie ein E-Bike direkt vor Ort.",
          body: "Praktisch, um auch die anspruchsvolleren Abschnitte mühelos zu bewältigen.",
          label: "Die Aktivitäten entdecken",
          href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
        },
        { type: "h2", text: "Von Agriturismo La Mora aus" },
        {
          type: "p",
          text: "Die Eremo delle Carceri, Ausgangspunkt der wichtigsten Wege, liegt 12,2 km von La Mora entfernt, laut Google Maps rund 20 Minuten mit dem Auto. Wer lieber leichter unterwegs ist, dem erleichtert das vor Ort mietbare E-Bike die Anstiege, ohne auf den Ausflug verzichten zu müssen.",
        },
      ],
      finalCtaHeading: "Zurück nach La Mora, zwischen Pool und Landschaft.",
      finalCtaBody: "Fünf unabhängige Apartments, 6,8 km vom Zentrum Assisis und 12,2 km von der Eremo delle Carceri entfernt.",
      finalCtaLabel: "Die Apartments entdecken",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "agriumbria-umbriafiere",
      category: "Veranstaltungen",
      title: "Agriumbria auf der Umbriafiere: wo man in Messenähe übernachtet",
      excerpt: "Jedes Jahr, in der Regel Ende März, findet in Bastia Umbra die wichtigste Messe Umbriens für Landwirtschaft, Viehzucht und Ernährung statt, nur 3,4 km von La Mora entfernt.",
      metaDescription: "Agriumbria auf der Umbriafiere (Bastia Umbra): was man auf der Messe sieht, wann sie stattfindet und wo man in Messenähe übernachtet — Agriturismo La Mora, 3,4 km entfernt, Assisi 6,8 km.",
      image: "/images/blog/agriumbria-mucche-fiera-agricola.jpg",
      alt: "Von Ausstellern geführtes Vieh auf einer landwirtschaftlichen Freiluftmesse",
      intro:
        "Jedes Jahr, in der Regel Ende März, beherbergt die Umbriafiere in Bastia Umbra die Agriumbria: die wichtigste regionale Messe für Landwirtschaft, Viehzucht und Ernährung — 3,4 km von Agriturismo La Mora entfernt, rund 6 Minuten mit dem Auto.",
      introCtaHeading: "Planen Sie den Aufenthalt für die Agriumbria?",
      introCtaLabel: "Verfügbarkeit prüfen",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "Was ist die Agriumbria" },
        {
          type: "p",
          text: "Die Agriumbria ist die Nationale Messe für Landwirtschaft, Viehzucht und Ernährung: eine der wichtigsten Fachmessen Mittelitaliens, die jedes Jahr auf der Umbriafiere, dem Messegelände von Bastia Umbra, stattfindet. Die Ausgabe 2026 markierte die 57. Auflage, die vom 27. bis 29. März stattfand — die Messe findet typischerweise in diesem Zeitraum, Ende März, statt, auch wenn die genauen Termine jeder Ausgabe stets im offiziellen Kalender der Umbriafiere überprüft werden sollten, da sie sich von Jahr zu Jahr ändern können.",
        },
        { type: "h2", text: "Was man auf der Messe findet" },
        {
          type: "list",
          items: [
            "Landmaschinen und -geräte, von großen Unternehmen bis zu kleinen Erzeugern.",
            "Ausstellungen nationaler Rinder-, Schaf- und Geflügelrassen — darunter Chianina, Limousin, Charolais und Romagnola.",
            "Technologien für die Öl- und Weinherstellung sowie für Molkereien.",
            "Ein Bereich für typische Produkte und Verkostungen, der auch Besucher außerhalb der Branche anzieht.",
          ],
        },
        {
          type: "image",
          src: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
          alt: "Umbrische Landschaft rund um Agriturismo La Mora, 3,4 km von der Umbriafiere entfernt",
        },
        { type: "h2", text: "Wo man in Messenähe übernachtet" },
        {
          type: "facts",
          items: [
            { label: "Entfernung von Umbriafiere", value: "3,4 km · ca. 6 Min. mit dem Auto" },
            { label: "Entfernung von Assisi", value: "6,8 km (Piazza del Comune) · ca. 14 Min." },
            { label: "Apartments", value: "5 unabhängige, mit eigener Küche" },
            { label: "Buchung", value: "Direkt, ohne Vermittler" },
          ],
        },
        {
          type: "p",
          text: "Für Aussteller, Messearbeitende oder mehrtägige Besucher ist ein Agriturismo in der Nähe der Agriumbria oft praktischer als ein Hotel in der Stadt: fünf unabhängige Apartments, jedes mit eigener Küche, auf dem Land statt im Verkehr von Bastia Umbra — 3,4 km von der Umbriafiere entfernt, aber weit genug, um abends an einen ruhigen Ort zurückzukehren.",
        },
        {
          type: "cta",
          heading: "Direkt buchen: keine Provisionen, bessere Konditionen.",
          body: "Wenn Sie uns schreiben, sprechen Sie direkt mit denen, die La Mora jeden Tag führen.",
          label: "Die Apartments entdecken",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi 6,8 km entfernt, auch während der Messe" },
        {
          type: "p",
          text: "Gäste, die während der Agriumbria in Messenähe übernachten, haben auch Assisi in greifbarer Nähe: Von La Mora liegt die Basilika Santa Maria degli Angeli 2,1 km entfernt, die Altstadt 6,8 km (rund 14 Minuten) und die Basilika San Francesco 7,5 km (rund 18 Minuten), gut kombinierbar mit einem Messetag oder einer Pause zwischen zwei Terminen.",
        },
      ],
      finalCtaHeading: "Buchen Sie Ihren Aufenthalt für die Agriumbria.",
      finalCtaBody: "3,4 km von der Umbriafiere, 6,8 km vom Zentrum Assisis: der praktische Ausgangspunkt für die Messe.",
      finalCtaLabel: "Direkt buchen",
      finalCtaHref: BOOKING_MODAL_HREF,
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Veranstaltungen",
      title: "Caccia Village auf der Umbriafiere: wo man für die Jagdmesse übernachtet",
      excerpt: "Jedes Jahr, in der Regel Mitte Mai, versammeln sich Hunderte Unternehmen der Jagdwelt in Bastia Umbra, zwischen Perugia und Assisi, 3,4 km von La Mora entfernt.",
      metaDescription: "Caccia Village auf der Umbriafiere (Bastia Umbra): Termine, Aussteller und wo man in Nähe der Jagdmesse übernachtet — Agriturismo La Mora, 3,4 km entfernt, Assisi 6,8 km.",
      image: "/images/blog/caccia-village-campagna-umbria.jpg",
      alt: "Umbrische Landschaft mit Heuballen bei Sonnenuntergang",
      intro:
        "Jedes Jahr, in der Regel Mitte Mai, beherbergt die Umbriafiere in Bastia Umbra das Caccia Village: die Messe für die Welt der Jagd, zwischen Perugia und Assisi — 3,4 km von Agriturismo La Mora entfernt, rund 6 Minuten mit dem Auto.",
      introCtaHeading: "Planen Sie den Aufenthalt für Caccia Village?",
      introCtaLabel: "Verfügbarkeit prüfen",
      introCtaHref: BOOKING_MODAL_HREF,
      content: [
        { type: "h2", text: "Was ist Caccia Village" },
        {
          type: "p",
          text: "Caccia Village ist die der Jagdwelt gewidmete Messe, die jedes Jahr auf der Umbriafiere, dem Messegelände von Bastia Umbra zwischen Perugia und Assisi, stattfindet. Die Ausgabe 2026 fand vom 16. bis 18. Mai statt, mit über 250 ausstellenden Unternehmen — die höchste Teilnehmerzahl in der Geschichte der Veranstaltung: Die Messe findet typischerweise in diesem Zeitraum, Mitte Mai, statt, auch wenn die genauen Termine stets im offiziellen Kalender der Umbriafiere überprüft werden sollten.",
        },
        { type: "h2", text: "Was man auf der Messe findet" },
        {
          type: "list",
          items: [
            "Waffen und Munition, stets deaktiviert ausgestellt.",
            "Bekleidung und technische Ausrüstung für den Outdoor-Bereich.",
            "Optik und Spezialausrüstung.",
            "Ein ENCI-Bereich für Jagdhunde und Hundeprüfungen.",
            "Wildgastronomie und spezialisierte Metzgereistände.",
          ],
        },
        {
          type: "image",
          src: "/images/piscina/piscina agriturismo la mora.webp",
          alt: "Panorama-Pool von Agriturismo La Mora, 3,4 km von der Umbriafiere entfernt",
        },
        { type: "h2", text: "Wo man in Messenähe übernachtet" },
        {
          type: "facts",
          items: [
            { label: "Entfernung von Umbriafiere", value: "3,4 km · ca. 6 Min. mit dem Auto" },
            { label: "Entfernung von Assisi", value: "6,8 km (Piazza del Comune) · ca. 14 Min." },
            { label: "Apartments", value: "5 unabhängige, mit eigener Küche" },
            { label: "Buchung", value: "Direkt, ohne Vermittler" },
          ],
        },
        {
          type: "p",
          text: "Auch für Besucher, die nur für die Messe von außerhalb der Region anreisen, ist ein Agriturismo in der Nähe von Caccia Village ein praktischer Ausgangspunkt auf dem Land: fünf unabhängige Apartments 3,4 km von der Umbriafiere entfernt, mit der Möglichkeit, zwischen zwei Messetagen ein paar Stunden in Assisi zu verbringen, rund 14 Minuten entfernt.",
        },
        {
          type: "cta",
          heading: "Direkt buchen: keine Provisionen, bessere Konditionen.",
          body: "Wenn Sie uns schreiben, sprechen Sie direkt mit denen, die La Mora jeden Tag führen.",
          label: "Die Apartments entdecken",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi und die umbrische Landschaft, über die Messe hinaus" },
        {
          type: "p",
          text: "Gäste, die während Caccia Village bei La Mora übernachten, finden auch eine auf Familien und Gruppen ausgerichtete Unterkunft: Panorama-Pool von Mai bis September geöffnet — genau in der Messesaison — Spielplatz und Gemeinschaftsbereiche für alle, die mit Kindern reisen, während ein anderes Gruppenmitglied auf der Messe ist.",
        },
      ],
      finalCtaHeading: "Buchen Sie Ihren Aufenthalt für Caccia Village.",
      finalCtaBody: "3,4 km von der Umbriafiere, 6,8 km vom Zentrum Assisis: der praktische Ausgangspunkt für die Messe.",
      finalCtaLabel: "Direkt buchen",
      finalCtaHref: BOOKING_MODAL_HREF,
    },
  ],
};

export function getBlogPosts(locale: Locale): BlogPost[] {
  return BLOG_POSTS_BY_LOCALE[locale];
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  return BLOG_POSTS_BY_LOCALE[locale].find((p) => p.slug === slug);
}

/* Retro-compatibilità per eventuali import diretti dell'array italiano. */
export const BLOG_POSTS = BLOG_POSTS_BY_LOCALE.it;
