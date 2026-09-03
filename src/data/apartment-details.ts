/* Contenuto editoriale per pagina di ogni appartamento, in aggiunta ai dati
   già presenti in apartments.ts (che restano la fonte per nome/specifiche/
   href, usati anche dal carousel in home). Foto: TUTTE quelle presenti in
   ciascuna cartella public/images/alloggi/appartamento-<slug>/, mai
   mischiate tra appartamenti — le 3 foto "gazebo sagittario" erano
   originariamente nella cartella pesci per un errore di archiviazione
   (nome file inequivocabile), spostate in sagittario prima di scrivere
   questo file. Dotazioni comuni a tutte le unità: PROJECT-BRIEF.md
   sezione 1. */
export const SHARED_AMENITIES = [
  "TV con canali satellitari",
  "Cucina attrezzata",
  "Aria condizionata",
  "Cassaforte",
  "Wi-Fi gratuito",
  "Biancheria da letto e da bagno",
  "Specchi e porta valigie",
] as const;

export type GalleryImage = { src: string; alt: string };

export type ApartmentDetail = {
  tagline: string;
  description: string[];
  distinctiveFeature: string;
  specificAmenities?: string[];
  gallery: GalleryImage[];
};

export const APARTMENT_DETAILS: Record<string, ApartmentDetail> = {
  gemelli: {
    tagline: "Un giardino tutto suo, anche per chi viaggia a quattro zampe.",
    description: [
      "Gemelli è il più raccolto dei cinque, pensato per due persone (o due più un cane): una camera con letto matrimoniale, un piccolo soggiorno con cucina attrezzata, un bagno. Fuori, un giardino recintato che è suo e di nessun altro — non condiviso col resto della struttura.",
      "È l'appartamento che consigliamo a chi arriva con un cane: il recinto significa che può stare libero senza guinzaglio nel proprio spazio, e la vicinanza alla direzione rende comodo qualsiasi bisogno nei primi giorni di ambientamento.",
    ],
    distinctiveFeature: "Giardino privato recintato, ideale per chi viaggia con animali",
    specificAmenities: ["Giardino privato recintato", "Pet friendly (25€/soggiorno)"],
    gallery: [
      { src: "/images/alloggi/appartamento gemelli/stanza letto app gemelli.jpeg", alt: "Camera da letto dell'appartamento Gemelli" },
      { src: "/images/alloggi/appartamento gemelli/camera da letto app gemelli.jpeg", alt: "Vista della camera da letto di Gemelli" },
      { src: "/images/alloggi/appartamento gemelli/letto matrimoniale gemelli.jpeg", alt: "Letto matrimoniale dell'appartamento Gemelli" },
      { src: "/images/alloggi/appartamento gemelli/salotto gemelli.jpeg", alt: "Soggiorno dell'appartamento Gemelli" },
      { src: "/images/alloggi/appartamento gemelli/cucinotto gemelli.jpeg", alt: "Angolo cottura attrezzato di Gemelli" },
      { src: "/images/alloggi/appartamento gemelli/bagnetto gemelli.jpeg", alt: "Bagno dell'appartamento Gemelli" },
      { src: "/images/alloggi/appartamento gemelli/area cani appartamento gemelli esterno .jpg", alt: "Giardino privato recintato di Gemelli" },
    ],
  },
  bilancia: {
    tagline: "Tre camere, una cucina grande, spazio vero per un gruppo.",
    description: [
      "Bilancia è il più grande dei cinque appartamenti: 75 metri quadri su tre camere da letto, un soggiorno con cucina e un bagno, pensato per famiglie numerose o due famiglie che viaggiano insieme. Non è una camera d'hotel allargata — è una casa, con gli spazi distinti che servono quando si è in tanti sotto lo stesso tetto.",
      "La cucina è il cuore dell'appartamento: abbastanza grande da cucinare per tutti, con vista sul soggiorno per non perdere la conversazione mentre si prepara la cena.",
    ],
    distinctiveFeature: "75 m² su tre camere da letto, il più grande dei cinque appartamenti",
    gallery: [
      { src: "/images/alloggi/appartamento bilancia/foto letto matrimoniale verticale bilancia.jpeg", alt: "Camera matrimoniale dell'appartamento Bilancia" },
      { src: "/images/alloggi/appartamento bilancia/foto verticale camera vista scrivania bilancia.jpeg", alt: "Camera da letto con scrivania di Bilancia" },
      { src: "/images/alloggi/appartamento bilancia/foto orizzontale letto e sala intera orizzontale bilancia.jpeg", alt: "Camera da letto e soggiorno dell'appartamento Bilancia" },
      { src: "/images/alloggi/appartamento bilancia/foto verticale salotto e cucina bilancia.jpeg", alt: "Soggiorno e cucina dell'appartamento Bilancia" },
      { src: "/images/alloggi/appartamento bilancia/foto cucina verticale bilancia.jpeg", alt: "Cucina attrezzata dell'appartamento Bilancia" },
      { src: "/images/alloggi/appartamento bilancia/foto orizzontale cucina bilancia.jpeg", alt: "Vista della cucina di Bilancia" },
      { src: "/images/alloggi/appartamento bilancia/foto cucinotto bilancia verticale.jpeg", alt: "Angolo cottura dell'appartamento Bilancia" },
      { src: "/images/alloggi/appartamento bilancia/bagno orizzontale bilancia.jpeg", alt: "Bagno dell'appartamento Bilancia" },
      { src: "/images/alloggi/appartamento bilancia/bagno verticale bilancia.jpeg", alt: "Vista del bagno di Bilancia" },
      { src: "/images/alloggi/appartamento bilancia/orizzontale foto esterno.jpeg", alt: "Esterno dell'appartamento Bilancia" },
    ],
  },
  pesci: {
    tagline: "Il letto a castello lo adorano i più piccoli, il resto piace a tutti.",
    description: [
      "Pesci è un appartamento compatto e luminoso, 45 metri quadri per una famiglia di quattro: letto matrimoniale per i genitori, letto a castello con due singoli per i bambini, tutto nella stessa camera — nessuno dorme lontano dagli altri.",
      "Il piccolo soggiorno con angolo cottura è il punto in cui la giornata si chiude: una colazione fatta con calma prima di uscire verso Assisi, o una cena semplice dopo una giornata in piscina.",
    ],
    distinctiveFeature: "Letto matrimoniale e letto a castello nella stessa camera, comoda per famiglie con bambini",
    gallery: [
      { src: "/images/alloggi/appartamento pesci/vista da davanti letto matrimoniale stanza pesci.jpeg", alt: "Camera da letto dell'appartamento Pesci" },
      { src: "/images/alloggi/appartamento pesci/letto matrimoniale con davanti letto a castello due singoli pesci appartamento.webp", alt: "Letto matrimoniale e letto a castello dell'appartamento Pesci" },
      { src: "/images/alloggi/appartamento pesci/saletta principale appartamento pesci.webp", alt: "Soggiorno dell'appartamento Pesci" },
      { src: "/images/alloggi/appartamento pesci/cucinotto pesci.webp", alt: "Angolo cottura attrezzato di Pesci" },
      { src: "/images/alloggi/appartamento pesci/bagnetto intero stanza pesci.jpeg", alt: "Bagno dell'appartamento Pesci" },
    ],
  },
  acquario: {
    tagline: "Pratico, luminoso, con tutto lo spazio che serve per quattro.",
    description: [
      "Acquario è tra i più richiesti: 45 metri quadri con letto matrimoniale e letto a castello, un tavolo da pranzo vero (non solo un bancone) e un bagno con doccia ampia. È l'appartamento giusto per chi vuole tutto lo spazio di un 4 posti senza rinunciare a niente dell'essenziale.",
      "La cucina attrezzata e il tavolo arredato lo rendono comodo per chi si ferma qualche giorno in più e preferisce cucinare con calma piuttosto che uscire ogni sera.",
    ],
    distinctiveFeature: "Tavolo da pranzo dedicato e doccia ampia, tra i più richiesti della struttura",
    gallery: [
      { src: "/images/alloggi/appartamento acquario/orizzontale letto acquario.jpeg", alt: "Camera da letto dell'appartamento Acquario" },
      { src: "/images/alloggi/appartamento acquario/acquario verticale letto matrimoniale.jpeg", alt: "Letto matrimoniale dell'appartamento Acquario" },
      { src: "/images/alloggi/appartamento acquario/letto matrimoniale orizzontale acquario.jpeg", alt: "Vista della camera matrimoniale di Acquario" },
      { src: "/images/alloggi/appartamento acquario/letto a castello acquario verticale.webp", alt: "Letto a castello dell'appartamento Acquario" },
      { src: "/images/alloggi/appartamento acquario/tavolo arredato orizzontale acquario.jpeg", alt: "Tavolo da pranzo dell'appartamento Acquario" },
      { src: "/images/alloggi/appartamento acquario/cucinotto orizzontale acquario.webp", alt: "Angolo cottura attrezzato di Acquario" },
      { src: "/images/alloggi/appartamento acquario/bagno intero acquario orizzontale.jpeg", alt: "Bagno dell'appartamento Acquario" },
      { src: "/images/alloggi/appartamento acquario/doccia verticale acquario.webp", alt: "Doccia dell'appartamento Acquario" },
    ],
  },
  sagittario: {
    tagline: "Un gazebo tutto suo, per le cene che durano fino a tardi.",
    description: [
      "Sagittario è il più capiente tra gli appartamenti a piano terra: fino a sei persone, camera con letto matrimoniale e letto a castello, giardino privato recintato e un gazebo esterno che è lo spazio informale dove si mangia quando fa caldo, si beve un caffè la mattina, o semplicemente ci si siede a guardare i bambini giocare.",
      "Come Gemelli, accetta animali: il recinto privato lascia i cani liberi di muoversi senza pensieri, e la vicinanza al parco giochi lo rende comodo per chi viaggia con figli piccoli.",
    ],
    distinctiveFeature: "Gazebo esterno privato e giardino recintato, fino a 6 ospiti",
    specificAmenities: ["Giardino privato recintato", "Gazebo esterno", "Pet friendly (25€/soggiorno)"],
    gallery: [
      { src: "/images/alloggi/appartamento sagittario/IMG_8781.jpeg", alt: "Gazebo e giardino privato dell'appartamento Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/gazebo sagittario 1.jpeg", alt: "Gazebo privato dell'appartamento Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/IMG_8782.jpeg", alt: "Zona pranzo sotto il gazebo di Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/gazebo sagittario 2.jpeg", alt: "Tavolo sotto il gazebo di Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/gazebo sagittario 3.jpeg", alt: "Vista del gazebo esterno di Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/Area cani appartamento sagittario.jpg", alt: "Giardino privato recintato di Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/arredamento tavolo sagittario.jpeg", alt: "Interno arredato dell'appartamento Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/IMG_8896.jpeg", alt: "Camera da letto dell'appartamento Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/IMG_8897.jpeg", alt: "Camera con letto a castello dell'appartamento Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/IMG_8899.jpeg", alt: "Vista della camera da letto di Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/IMG_8901.jpeg", alt: "Zona pranzo interna dell'appartamento Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/IMG_8893.jpeg", alt: "Bagno con doccia dell'appartamento Sagittario" },
      { src: "/images/alloggi/appartamento sagittario/IMG_8900.jpeg", alt: "Bagno dell'appartamento Sagittario" },
    ],
  },
};
