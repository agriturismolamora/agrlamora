export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  body: string[];
};

/* Cinque articoli reali e completi (non 20 pezzi inventati per riempire un
   calendario editoriale che non esiste): stessi fatti già verificati per
   territorio-section.tsx e src/app/territorio/page.tsx, qui sviluppati in
   forma di articolo autonomo. Foto reali de La Mora (cartella
   public/images/territorio/), diverse da quelle già usate sulla pagina
   Territorio per non duplicare la stessa immagine su due pagine — sostituiscono
   le foto stock Unsplash che erano l'unica eccezione documentata nel
   progetto alla regola "solo foto reali". */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "basilica-santa-maria-degli-angeli",
    category: "Territorio",
    title: "Basilica di Santa Maria degli Angeli: cosa vedere",
    excerpt: "La chiesa che racchiude la Porziuncola, il luogo dove nacque l'ordine francescano, a pochi minuti da La Mora.",
    image: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
    alt: "Porziuncola all'interno della Basilica di Santa Maria degli Angeli",
    body: [
      "La Basilica di Santa Maria degli Angeli è una delle chiese più grandi della cristianità, costruita nel Cinquecento intorno a un edificio molto più piccolo e molto più antico: la Porziuncola, la cappella dove San Francesco visse gran parte della sua vita religiosa e dove morì, il 3 ottobre 1226.",
      "Entrare nella basilica e trovarsi davanti alla Porziuncola, minuscola sotto la cupola enorme, è l'esperienza che la maggior parte dei visitatori ricorda di più: un contrasto che dice più di qualunque descrizione sulla distanza tra la semplicità originaria di Francesco e come la sua eredità è stata poi celebrata.",
      "È a circa 2 km da Agriturismo La Mora — la tappa più comoda e veloce del territorio, spesso la prima che i nostri ospiti visitano appena arrivati, prima ancora di salire ad Assisi.",
    ],
  },
  {
    slug: "bosco-san-francesco",
    category: "Natura",
    title: "Il Bosco di San Francesco, tra i sentieri del FAI",
    excerpt: "Un'area naturale protetta tra Assisi e Santa Maria degli Angeli: uliveti, bosco e il torrente Tescio, gestiti dal FAI.",
    image: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
    alt: "Sentiero nel Bosco di San Francesco vicino ad Assisi",
    body: [
      "Il Bosco di San Francesco è un percorso naturalistico di circa 4 km che collega Assisi a Santa Maria degli Angeli, attraversando uliveti secolari, bosco misto e il torrente Tescio. Dal 2008 è gestito dal FAI (Fondo Ambiente Italiano), che ne cura la manutenzione e organizza visite guidate.",
      "È un modo diverso di vivere Assisi rispetto al centro storico: meno pietra, più verde, un ritmo di cammino lento che si abbina bene a una giornata passata anche tra piscina e campagna. L'ingresso principale è vicino alla Basilica di Santa Maria degli Angeli — per orari e biglietti d'ingresso conviene sempre controllare il sito ufficiale del FAI prima di partire, dato che possono variare per stagione.",
      "Per chi soggiorna a La Mora, è una delle gite più semplici da organizzare: pochi minuti d'auto fino all'ingresso, poi si cammina.",
    ],
  },
  {
    slug: "santuario-san-damiano",
    category: "Territorio",
    title: "Il Santuario di San Damiano, fuori dalle mura di Assisi",
    excerpt: "Dove Francesco udì il celebre invito a 'riparare la mia chiesa', e dove Chiara d'Assisi visse gran parte della sua vita.",
    image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
    alt: "Santuario di San Damiano nei dintorni di Assisi",
    body: [
      "San Damiano è un piccolo santuario immerso negli ulivi, a circa due chilometri a sud delle mura di Assisi. È qui che, secondo la tradizione, il crocifisso ligneo parlò a Francesco invitandolo a 'riparare la mia chiesa' — l'episodio che segnò l'inizio della sua conversione.",
      "È anche il luogo dove Chiara d'Assisi visse per oltre quarant'anni, fondando l'ordine delle Clarisse proprio in questo convento. A differenza della Basilica di San Francesco, San Damiano resta un luogo raccolto e silenzioso, poco battuto dal turismo di massa nonostante la sua importanza storica.",
      "Si raggiunge a piedi dal centro di Assisi in circa 20-25 minuti di cammino in discesa (la salita al ritorno è più impegnativa), oppure in auto in pochi minuti. Una tappa che consigliamo a chi cerca un momento di silenzio dopo la Basilica.",
    ],
  },
  {
    slug: "cascate-delle-marmore",
    category: "Gita di un giorno",
    title: "Cascate delle Marmore: come arrivarci da Assisi",
    excerpt: "Tra le cascate artificiali più alte d'Europa, a circa un'ora d'auto da La Mora: una gita di mezza giornata.",
    image: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
    alt: "Cascate delle Marmore in Umbria",
    body: [
      "Le Cascate delle Marmore, vicino Terni, sono tra le cascate artificiali più alte d'Europa: un salto complessivo di 165 metri, create in epoca romana per bonificare le paludi della zona e oggi regolate per l'apertura al pubblico secondo orari stabiliti (l'acqua scorre solo in fasce orarie specifiche — controllare sempre il calendario ufficiale prima di partire, cambia per stagione).",
      "Ci sono più punti panoramici, raggiungibili con percorsi di difficoltà diversa: il Belvedere Inferiore è il più semplice e vicino al parcheggio, mentre i sentieri superiori richiedono più tempo e un po' di allenamento.",
      "Da Agriturismo La Mora sono circa 55-60 minuti d'auto: una gita fattibile in mezza giornata, che si può abbinare con una sosta a Terni o rientrare in tempo per un pomeriggio in piscina.",
    ],
  },
  {
    slug: "monte-subasio",
    category: "Natura",
    title: "Monte Subasio: i sentieri sopra Assisi",
    excerpt: "Il parco naturale che domina la città: pascoli d'altura, il formaggio omonimo, e sentieri per camminare o pedalare.",
    image: "/images/territorio/dintorni/monte-subasio.jpg",
    alt: "Vista dai pascoli d'altura del Monte Subasio",
    body: [
      "Il Monte Subasio è il massiccio che sovrasta Assisi, oggi Parco Regionale: pascoli d'altura, boschi di lecci e faggi, e una rete di sentieri che collegano la città all'Eremo delle Carceri e proseguono verso la vetta, a 1.290 metri.",
      "È il luogo che ha dato il nome al formaggio pecorino di Subasio, prodotto ancora oggi dagli allevamenti sul monte, e il retroterra naturale da cui viene estratta la celebre pietra rosa con cui è costruita gran parte di Assisi.",
      "Per chi ama camminare o pedalare, i sentieri partono direttamente dall'Eremo delle Carceri (raggiungibile in auto da Assisi in pochi minuti) e offrono viste sulla valle umbra che il centro storico, per quanto bello, non può dare.",
    ],
  },
];
