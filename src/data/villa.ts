/* Villa Relax — struttura indipendente, stessa proprietà/P.IVA di
   Agriturismo La Mora (03900200548) ma un immobile distinto, con proprio
   indirizzo. Tutti i fatti qui sotto sono stati verificati navigando
   direttamente il sito reale https://www.villaassisi.it/it/ (unica fonte,
   oltre alle foto reali in public/images/villa/) il 5 settembre 2026: nessun
   numero, configurazione o distanza è stato inventato. Il sito reale è
   costruito su piattaforma beb.it (bed-and-breakfast.it) — da lì viene anche
   il punteggio 9.7/10. Per aggiornare: modifica SOLO questo file. */

export type GalleryImage = { src: string; alt: string };

export const VILLA_ADDRESS = "Via Di Bassano, 19 — 06081 Assisi (PG)";

export const VILLA_HOST_NAME = "Paolo";
export const VILLA_HOST_IMAGE = "/images/villa/paologestoreagriturismolamora.webp";

export const VILLA_RATING = {
  value: 9.7,
  scale: 10,
  label: "Certificato di eccellenza 2026",
  source: "Bed-and-Breakfast.it",
};

export const VILLA_CIN = "IT054001B501006646";

/* Non tre ville diverse: un'unica proprietà (6 camere, ciascuna con bagno e
   doccia privati) prenotabile per intero o in due porzioni più piccole. */
export const VILLA_CONFIGURATIONS = [
  {
    name: "Porzione 6 persone",
    guests: 6,
    bedrooms: 3,
    note: "Una porzione della villa, con 3 delle 6 camere.",
  },
  {
    name: "Porzione 10 persone",
    guests: 10,
    bedrooms: 3,
    note: "L'altra porzione della villa, con le restanti 3 camere.",
  },
  {
    name: "Villa intera — 16 persone",
    guests: 16,
    bedrooms: 6,
    note: "L'intera proprietà, tutte e 6 le camere da letto, per un unico grande gruppo o due famiglie insieme.",
  },
] as const;

export const VILLA_MAX_GUESTS = 16;

export const VILLA_AMENITIES = [
  "Animali ammessi",
  "Parcheggio privato ombreggiato",
  "Wi-Fi gratuito",
  "Giardino",
  "Angolo cottura",
  "Televisione",
  "Piscina privata",
  "Intera villa",
] as const;

export const VILLA_OUTDOOR_FEATURES = [
  "Piscina privata con lettini e sdraie",
  "Gazebo per aperitivi e cene a bordo vasca",
  "Area barbecue attrezzata",
  "Campo da calcetto privato in erba",
  "Tavolo da ping pong",
] as const;

/* Distanze reali dalla pagina "Zona" del sito villaassisi.it. */
export const VILLA_DISTANCES = [
  { label: "Terme Francescane Village (Spello)", distance: "2 km" },
  { label: "Santuario di Rivotorto", distance: "2 km" },
  { label: "Santuario di San Damiano", distance: "4 km" },
  { label: "Stazione di Assisi", distance: "5 km" },
  { label: "Eremo delle Carceri", distance: "5 km" },
  { label: "Basilica di Santa Maria degli Angeli", distance: "5 km" },
  { label: "Rocca Minore", distance: "5 km" },
  { label: "Basilica di San Francesco", distance: "6 km" },
  { label: "Umbria Fiere (Bastia Umbra)", distance: "7 km" },
  { label: "Aeroporto di Perugia — Sant'Egidio", distance: "12 km" },
] as const;

export const VILLA_GALLERY: GalleryImage[] = [
  { src: "/images/villa/villa esterna.webp", alt: "Villa Relax vista dall'esterno, ad Assisi" },
  { src: "/images/villa/villa esterno.webp", alt: "Esterno di Villa Relax nella campagna umbra" },
  { src: "/images/villa/vista esterno villa dall alto.webp", alt: "Villa Relax vista dall'alto" },
  { src: "/images/villa/vista esterno della villa.webp", alt: "Vista d'insieme di Villa Relax" },
  { src: "/images/villa/villa vista scalinata.webp", alt: "Scalinata d'ingresso di Villa Relax" },
  { src: "/images/villa/esterno villa di notte.webp", alt: "Villa Relax di sera" },
  { src: "/images/villa/esterno villa di notte entrata.webp", alt: "Ingresso di Villa Relax di sera" },
  { src: "/images/villa/piscina esterna della villa.webp", alt: "Piscina privata di Villa Relax" },
  { src: "/images/villa/piscina della villa esterno arredata.webp", alt: "Bordo piscina arredato di Villa Relax" },
  { src: "/images/villa/foto vista giaridno.webp", alt: "Giardino di Villa Relax" },
  { src: "/images/villa/gazebo arredato villa esterno.webp", alt: "Gazebo esterno arredato di Villa Relax" },
  { src: "/images/villa/esterno con barbeque.webp", alt: "Area barbecue di Villa Relax" },
  { src: "/images/villa/esterno giochi.webp", alt: "Spazio giochi esterno di Villa Relax" },
  { src: "/images/villa/sala da pranzo villa interno.webp", alt: "Sala da pranzo interna di Villa Relax" },
];

export const VILLA_WHATSAPP_NUMBER = "393934363917";
