import type { Locale } from "@/lib/i18n";

/* Contenuto editoriale per pagina di ogni appartamento, in aggiunta ai dati
   già presenti in apartments.ts (che restano la fonte per nome/specifiche/
   href, usati anche dal carousel in home). Foto: TUTTE quelle presenti in
   ciascuna cartella public/images/alloggi/appartamento-<slug>/, mai
   mischiate tra appartamenti — le 3 foto "gazebo sagittario" erano
   originariamente nella cartella pesci per un errore di archiviazione
   (nome file inequivocabile), spostate in sagittario prima di scrivere
   questo file. Dotazioni comuni a tutte le unità: PROJECT-BRIEF.md
   sezione 1.

   Struttura: la galleria (foto/alt) è UNICA per appartamento, condivisa da
   tutte le lingue (le foto non cambiano) — il testo editoriale (tagline,
   descrizione, dotazioni) è invece tradotto per lingua. getApartmentDetails
   unisce le due parti al momento dell'uso. */
export type GalleryImage = { src: string; alt: string };

export type ApartmentDetail = {
  tagline: string;
  description: string[];
  distinctiveFeature: string;
  specificAmenities?: string[];
  gallery: GalleryImage[];
};

const GALLERIES: Record<string, GalleryImage[]> = {
  gemelli: [
    { src: "/images/alloggi/appartamento gemelli/stanza letto app gemelli.jpeg", alt: "Camera da letto dell'appartamento Gemelli" },
    { src: "/images/alloggi/appartamento gemelli/camera da letto app gemelli.jpeg", alt: "Vista della camera da letto di Gemelli" },
    { src: "/images/alloggi/appartamento gemelli/letto matrimoniale gemelli.jpeg", alt: "Letto matrimoniale dell'appartamento Gemelli" },
    { src: "/images/alloggi/appartamento gemelli/salotto gemelli.jpeg", alt: "Soggiorno dell'appartamento Gemelli" },
    { src: "/images/alloggi/appartamento gemelli/cucinotto gemelli.jpeg", alt: "Angolo cottura attrezzato di Gemelli" },
    { src: "/images/alloggi/appartamento gemelli/bagnetto gemelli.jpeg", alt: "Bagno dell'appartamento Gemelli" },
    { src: "/images/alloggi/appartamento gemelli/area cani appartamento gemelli esterno .jpg", alt: "Giardino privato recintato di Gemelli" },
  ],
  bilancia: [
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
  pesci: [
    { src: "/images/alloggi/appartamento pesci/vista da davanti letto matrimoniale stanza pesci.jpeg", alt: "Camera da letto dell'appartamento Pesci" },
    { src: "/images/alloggi/appartamento pesci/letto matrimoniale con davanti letto a castello due singoli pesci appartamento.webp", alt: "Letto matrimoniale e letto a castello dell'appartamento Pesci" },
    { src: "/images/alloggi/appartamento pesci/saletta principale appartamento pesci.webp", alt: "Soggiorno dell'appartamento Pesci" },
    { src: "/images/alloggi/appartamento pesci/cucinotto pesci.webp", alt: "Angolo cottura attrezzato di Pesci" },
    { src: "/images/alloggi/appartamento pesci/bagnetto intero stanza pesci.jpeg", alt: "Bagno dell'appartamento Pesci" },
  ],
  acquario: [
    { src: "/images/alloggi/appartamento acquario/orizzontale letto acquario.jpeg", alt: "Camera da letto dell'appartamento Acquario" },
    { src: "/images/alloggi/appartamento acquario/acquario verticale letto matrimoniale.jpeg", alt: "Letto matrimoniale dell'appartamento Acquario" },
    { src: "/images/alloggi/appartamento acquario/letto matrimoniale orizzontale acquario.jpeg", alt: "Vista della camera matrimoniale di Acquario" },
    { src: "/images/alloggi/appartamento acquario/letto a castello acquario verticale.webp", alt: "Letto a castello dell'appartamento Acquario" },
    { src: "/images/alloggi/appartamento acquario/tavolo arredato orizzontale acquario.jpeg", alt: "Tavolo da pranzo dell'appartamento Acquario" },
    { src: "/images/alloggi/appartamento acquario/cucinotto orizzontale acquario.webp", alt: "Angolo cottura attrezzato di Acquario" },
    { src: "/images/alloggi/appartamento acquario/bagno intero acquario orizzontale.jpeg", alt: "Bagno dell'appartamento Acquario" },
    { src: "/images/alloggi/appartamento acquario/doccia verticale acquario.webp", alt: "Doccia dell'appartamento Acquario" },
  ],
  sagittario: [
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
};

type TextOnly = Omit<ApartmentDetail, "gallery">;

const TEXT_BY_LOCALE: Record<Locale, Record<string, TextOnly>> = {
  it: {
    gemelli: {
      tagline: "Un giardino tutto suo, anche per chi viaggia a quattro zampe.",
      description: [
        "Gemelli è il più raccolto dei cinque, pensato per due persone (o due più un cane): una camera con letto matrimoniale, un piccolo soggiorno con cucina attrezzata con lavastoviglie e divano letto matrimoniale con tv, un bagno. Fuori, un giardino recintato che è suo e di nessun altro — non condiviso col resto della struttura.",
        "È l'appartamento che consigliamo a chi arriva con un cane: il recinto significa che può stare libero senza guinzaglio nel proprio spazio, e la vicinanza alla direzione rende comodo qualsiasi bisogno nei primi giorni di ambientamento.",
      ],
      distinctiveFeature: "Giardino privato recintato, ideale per chi viaggia con animali",
      specificAmenities: ["Piano terra", "Giardino privato recintato", "Pet friendly (25€/soggiorno)"],
    },
    bilancia: {
      tagline: "Tre camere, una cucina grande, spazio vero per un gruppo.",
      description: [
        "Bilancia è il più grande dei cinque appartamenti: 75 metri quadri su tre camere da letto, un soggiorno con cucina e un bagno, pensato per famiglie numerose o due famiglie che viaggiano insieme. Non è una camera d'hotel allargata — è una casa, con gli spazi distinti che servono quando si è in tanti sotto lo stesso tetto.",
        "La cucina è il cuore dell'appartamento: abbastanza grande da cucinare per tutti, con vista sul soggiorno per non perdere la conversazione mentre si prepara la cena. Dispone di un divano letto matrimoniale.",
      ],
      distinctiveFeature: "75 m² su tre camere da letto, il più grande dei cinque appartamenti",
      specificAmenities: ["Primo piano", "Giardino privato", "Gazebo privato", "Animali piccola taglia, previo accordo (25€)"],
    },
    pesci: {
      tagline: "Il letto a castello lo adorano i più piccoli, il resto piace a tutti.",
      description: [
        "Pesci è un appartamento compatto e luminoso, 45 metri quadri per una famiglia di quattro: letto matrimoniale per i genitori, letto a castello con due singoli per i bambini, tutto nella stessa camera — nessuno dorme lontano dagli altri.",
        "Il piccolo soggiorno con angolo cottura è il punto in cui la giornata si chiude: una colazione fatta con calma prima di uscire verso Assisi, o una cena semplice dopo una giornata in piscina.",
      ],
      distinctiveFeature: "Letto matrimoniale e letto a castello nella stessa camera, comoda per famiglie con bambini",
      specificAmenities: ["Piano terra", "Animali piccola taglia, previo accordo (25€)"],
    },
    acquario: {
      tagline: "Pratico, luminoso, con tutto lo spazio che serve per quattro.",
      description: [
        "Acquario è tra i più richiesti: 45 metri quadri con letto matrimoniale e letto a castello, un tavolo da pranzo vero (non solo un bancone) e un bagno con doccia ampia. È l'appartamento giusto per chi vuole tutto lo spazio di un 4 posti senza rinunciare a niente dell'essenziale.",
        "La cucina attrezzata e il tavolo arredato lo rendono comodo per chi si ferma qualche giorno in più e preferisce cucinare con calma piuttosto che uscire ogni sera.",
      ],
      distinctiveFeature: "Tavolo da pranzo dedicato e doccia ampia, tra i più richiesti della struttura",
      specificAmenities: ["Primo piano", "Animali piccola taglia, previo accordo (25€)"],
    },
    sagittario: {
      tagline: "Un gazebo tutto suo, per le cene che durano fino a tardi.",
      description: [
        "Sagittario è il più capiente tra gli appartamenti a piano terra: fino a sei persone, camera con letto matrimoniale e letto a castello, soggiorno con cucina e divano letto matrimoniale, giardino privato recintato e un gazebo esterno che è lo spazio informale dove si mangia quando fa caldo, si beve un caffè la mattina, o semplicemente ci si siede a guardare i bambini giocare.",
        "Come Gemelli, accetta animali: il recinto privato lascia i cani liberi di muoversi senza pensieri, e la vicinanza al parco giochi lo rende comodo per chi viaggia con figli piccoli.",
      ],
      distinctiveFeature: "Gazebo esterno privato e giardino recintato, fino a 6 ospiti",
      specificAmenities: ["Piano terra", "Giardino privato recintato", "Gazebo esterno", "Pet friendly (25€/soggiorno)"],
    },
  },
  en: {
    gemelli: {
      tagline: "A garden all its own, even for those travelling on four paws.",
      description: [
        "Gemelli is the coziest of the five, made for two people (or two plus a dog): a bedroom with a double bed, a small living room with an equipped kitchen with dishwasher and a double sofa bed with TV, one bathroom. Outside, a fenced garden that's entirely its own — not shared with the rest of the property.",
        "It's the apartment we recommend for those arriving with a dog: the fence means they can roam free, off the leash, in their own space, and the closeness to the owners' house makes any need easy to handle in the first days of settling in.",
      ],
      distinctiveFeature: "Fenced private garden, ideal for travelling with pets",
      specificAmenities: ["Ground floor", "Fenced private garden", "Pet friendly (€25/stay)"],
    },
    bilancia: {
      tagline: "Three bedrooms, a large kitchen, real space for a group.",
      description: [
        "Bilancia is the largest of the five apartments: 75 square metres across three bedrooms, a living room with kitchen and one bathroom, made for large families or two families travelling together. It's not an enlarged hotel room — it's a home, with the separate spaces you need when there are many of you under one roof.",
        "The kitchen is the heart of the apartment: big enough to cook for everyone, with a view onto the living room so you never miss the conversation while making dinner. It has a double sofa bed.",
      ],
      distinctiveFeature: "75 m² across three bedrooms, the largest of the five apartments",
      specificAmenities: ["First floor", "Private garden", "Private gazebo", "Small pets, subject to agreement (€25)"],
    },
    pesci: {
      tagline: "The little ones love the bunk bed, everyone else loves the rest.",
      description: [
        "Pesci is a compact, bright apartment, 45 square metres for a family of four: a double bed for the parents, a bunk bed with two singles for the children, all in the same room — no one sleeps far from the others.",
        "The small living room with kitchenette is where the day winds down: an unhurried breakfast before heading to Assisi, or a simple dinner after a day at the pool.",
      ],
      distinctiveFeature: "Double bed and bunk bed in the same room, convenient for families with children",
      specificAmenities: ["Ground floor", "Small pets, subject to agreement (€25)"],
    },
    acquario: {
      tagline: "Practical, bright, with all the space four people need.",
      description: [
        "Acquario is among the most requested: 45 square metres with a double bed and bunk bed, a real dining table (not just a counter) and a bathroom with a spacious shower. It's the right apartment for anyone who wants all the space of a 4-person unit without giving up anything essential.",
        "The equipped kitchen and furnished table make it convenient for those staying a few extra days who'd rather cook at their own pace than eat out every night.",
      ],
      distinctiveFeature: "Dedicated dining table and spacious shower, among the property's most requested",
      specificAmenities: ["First floor", "Small pets, subject to agreement (€25)"],
    },
    sagittario: {
      tagline: "A gazebo all its own, for dinners that run late.",
      description: [
        "Sagittario is the largest of the ground-floor apartments: up to six people, a bedroom with a double bed and bunk bed, a living room with kitchen and double sofa bed, a fenced private garden and an outdoor gazebo that's the informal space for eating when it's hot, having a coffee in the morning, or simply sitting to watch the children play.",
        "Like Gemelli, it accepts pets: the private fence lets dogs roam free without worry, and the closeness to the playground makes it convenient for those travelling with young children.",
      ],
      distinctiveFeature: "Private outdoor gazebo and fenced garden, up to 6 guests",
      specificAmenities: ["Ground floor", "Fenced private garden", "Outdoor gazebo", "Pet friendly (€25/stay)"],
    },
  },
  fr: {
    gemelli: {
      tagline: "Un jardin bien à lui, même pour ceux qui voyagent à quatre pattes.",
      description: [
        "Gemelli est le plus intime des cinq, pensé pour deux personnes (ou deux plus un chien) : une chambre avec lit double, un petit salon avec cuisine équipée avec lave-vaisselle et canapé-lit double avec télévision, une salle de bain. Dehors, un jardin clôturé qui n'appartient qu'à lui — non partagé avec le reste de la structure.",
        "C'est l'appartement que nous recommandons à qui arrive avec un chien : la clôture signifie qu'il peut rester libre sans laisse dans son propre espace, et la proximité de la direction facilite tout besoin dans les premiers jours d'adaptation.",
      ],
      distinctiveFeature: "Jardin privé clôturé, idéal pour voyager avec des animaux",
      specificAmenities: ["Rez-de-chaussée", "Jardin privé clôturé", "Animaux acceptés (25€/séjour)"],
    },
    bilancia: {
      tagline: "Trois chambres, une grande cuisine, un vrai espace pour un groupe.",
      description: [
        "Bilancia est le plus grand des cinq appartements : 75 mètres carrés sur trois chambres, un salon avec cuisine et une salle de bain, pensé pour les familles nombreuses ou deux familles voyageant ensemble. Ce n'est pas une chambre d'hôtel agrandie — c'est une maison, avec les espaces distincts nécessaires quand on est nombreux sous le même toit.",
        "La cuisine est le cœur de l'appartement : assez grande pour cuisiner pour tout le monde, avec vue sur le salon pour ne jamais perdre la conversation en préparant le dîner. Dispose d'un canapé-lit double.",
      ],
      distinctiveFeature: "75 m² sur trois chambres, le plus grand des cinq appartements",
      specificAmenities: ["Premier étage", "Jardin privé", "Gazebo privé", "Petits animaux, sous accord préalable (25€)"],
    },
    pesci: {
      tagline: "Le lit superposé est adoré des petits, le reste plaît à tous.",
      description: [
        "Pesci est un appartement compact et lumineux, 45 mètres carrés pour une famille de quatre : lit double pour les parents, lit superposé avec deux lits simples pour les enfants, tout dans la même chambre — personne ne dort loin des autres.",
        "Le petit salon avec coin cuisine est l'endroit où la journée se termine : un petit-déjeuner tranquille avant de partir vers Assise, ou un dîner simple après une journée à la piscine.",
      ],
      distinctiveFeature: "Lit double et lit superposé dans la même chambre, pratique pour les familles avec enfants",
      specificAmenities: ["Rez-de-chaussée", "Petits animaux, sous accord préalable (25€)"],
    },
    acquario: {
      tagline: "Pratique, lumineux, avec tout l'espace nécessaire pour quatre.",
      description: [
        "Acquario est parmi les plus demandés : 45 mètres carrés avec lit double et lit superposé, une vraie table à manger (pas seulement un comptoir) et une salle de bain avec une douche spacieuse. C'est l'appartement idéal pour qui veut tout l'espace d'un 4 personnes sans renoncer à l'essentiel.",
        "La cuisine équipée et la table aménagée le rendent pratique pour ceux qui restent quelques jours de plus et préfèrent cuisiner tranquillement plutôt que sortir chaque soir.",
      ],
      distinctiveFeature: "Table à manger dédiée et douche spacieuse, parmi les plus demandés de la structure",
      specificAmenities: ["Premier étage", "Petits animaux, sous accord préalable (25€)"],
    },
    sagittario: {
      tagline: "Un gazebo bien à lui, pour les dîners qui se prolongent tard.",
      description: [
        "Sagittario est le plus grand des appartements au rez-de-chaussée : jusqu'à six personnes, une chambre avec lit double et lit superposé, un salon avec cuisine et canapé-lit double, un jardin privé clôturé et un gazebo extérieur, l'espace informel où l'on mange quand il fait chaud, où l'on prend un café le matin, ou où l'on s'assoit simplement pour regarder les enfants jouer.",
        "Comme Gemelli, il accepte les animaux : la clôture privée laisse les chiens libres de circuler sans souci, et la proximité de l'aire de jeux le rend pratique pour ceux qui voyagent avec de jeunes enfants.",
      ],
      distinctiveFeature: "Gazebo extérieur privé et jardin clôturé, jusqu'à 6 personnes",
      specificAmenities: ["Rez-de-chaussée", "Jardin privé clôturé", "Gazebo extérieur", "Animaux acceptés (25€/séjour)"],
    },
  },
  de: {
    gemelli: {
      tagline: "Ein eigener Garten, auch für Reisende auf vier Pfoten.",
      description: [
        "Gemelli ist das gemütlichste der fünf Apartments, für zwei Personen gedacht (oder zwei plus einen Hund): ein Schlafzimmer mit Doppelbett, ein kleines Wohnzimmer mit ausgestatteter Küche mit Geschirrspüler und Doppelschlafsofa mit TV, ein Bad. Draußen ein eingezäunter Garten, der ganz für sich allein steht — nicht mit dem Rest der Unterkunft geteilt.",
        "Es ist das Apartment, das wir für Gäste mit Hund empfehlen: der Zaun bedeutet, dass er sich in seinem eigenen Bereich frei ohne Leine bewegen kann, und die Nähe zur Leitung macht jedes Anliegen in den ersten Eingewöhnungstagen einfach.",
      ],
      distinctiveFeature: "Eingezäunter privater Garten, ideal für Reisen mit Haustieren",
      specificAmenities: ["Erdgeschoss", "Eingezäunter privater Garten", "Haustierfreundlich (25€/Aufenthalt)"],
    },
    bilancia: {
      tagline: "Drei Schlafzimmer, eine große Küche, echter Raum für eine Gruppe.",
      description: [
        "Bilancia ist das größte der fünf Apartments: 75 Quadratmeter auf drei Schlafzimmer, ein Wohnzimmer mit Küche und ein Bad, gedacht für kinderreiche Familien oder zwei gemeinsam reisende Familien. Es ist kein vergrößertes Hotelzimmer — es ist ein Zuhause, mit den getrennten Räumen, die man braucht, wenn man zu vielen unter einem Dach ist.",
        "Die Küche ist das Herz des Apartments: groß genug, um für alle zu kochen, mit Blick ins Wohnzimmer, damit man beim Kochen nie das Gespräch verpasst. Verfügt über ein Doppelschlafsofa.",
      ],
      distinctiveFeature: "75 m² auf drei Schlafzimmer, das größte der fünf Apartments",
      specificAmenities: ["Erster Stock", "Privater Garten", "Privater Pavillon", "Kleine Haustiere nach Absprache (25€)"],
    },
    pesci: {
      tagline: "Das Etagenbett lieben die Kleinen, den Rest lieben alle.",
      description: [
        "Pesci ist ein kompaktes, helles Apartment, 45 Quadratmeter für eine vierköpfige Familie: Doppelbett für die Eltern, Etagenbett mit zwei Einzelbetten für die Kinder, alles im selben Zimmer — niemand schläft weit von den anderen entfernt.",
        "Das kleine Wohnzimmer mit Kochnische ist der Ort, an dem der Tag ausklingt: ein gemütliches Frühstück, bevor es nach Assisi geht, oder ein einfaches Abendessen nach einem Tag am Pool.",
      ],
      distinctiveFeature: "Doppelbett und Etagenbett im selben Zimmer, praktisch für Familien mit Kindern",
      specificAmenities: ["Erdgeschoss", "Kleine Haustiere nach Absprache (25€)"],
    },
    acquario: {
      tagline: "Praktisch, hell, mit allem Platz, den vier Personen brauchen.",
      description: [
        "Acquario gehört zu den gefragtesten: 45 Quadratmeter mit Doppelbett und Etagenbett, einem echten Esstisch (nicht nur einer Theke) und einem Bad mit geräumiger Dusche. Das richtige Apartment für alle, die den vollen Platz einer 4-Personen-Einheit wollen, ohne auf etwas Wesentliches zu verzichten.",
        "Die ausgestattete Küche und der eingerichtete Tisch machen es praktisch für alle, die ein paar Tage länger bleiben und lieber in Ruhe kochen als jeden Abend auswärts zu essen.",
      ],
      distinctiveFeature: "Eigener Esstisch und geräumige Dusche, eines der gefragtesten der Unterkunft",
      specificAmenities: ["Erster Stock", "Kleine Haustiere nach Absprache (25€)"],
    },
    sagittario: {
      tagline: "Ein eigener Pavillon, für Abendessen, die sich hinziehen.",
      description: [
        "Sagittario ist das größte der Erdgeschoss-Apartments: bis zu sechs Personen, ein Schlafzimmer mit Doppelbett und Etagenbett, ein Wohnzimmer mit Küche und Doppelschlafsofa, ein eingezäunter privater Garten und ein Pavillon im Freien, der informelle Ort, an dem man bei Hitze isst, morgens einen Kaffee trinkt oder einfach sitzt und den Kindern beim Spielen zusieht.",
        "Wie Gemelli akzeptiert es Haustiere: der private Zaun lässt Hunde sorgenfrei herumlaufen, und die Nähe zum Spielplatz macht es praktisch für Reisende mit kleinen Kindern.",
      ],
      distinctiveFeature: "Privater Pavillon im Freien und eingezäunter Garten, bis zu 6 Gäste",
      specificAmenities: ["Erdgeschoss", "Eingezäunter privater Garten", "Pavillon im Freien", "Haustierfreundlich (25€/Aufenthalt)"],
    },
  },
};

export function getApartmentDetails(locale: Locale): Record<string, ApartmentDetail> {
  const text = TEXT_BY_LOCALE[locale];
  const merged: Record<string, ApartmentDetail> = {};
  for (const slug of Object.keys(GALLERIES)) {
    merged[slug] = { ...text[slug], gallery: GALLERIES[slug] };
  }
  return merged;
}

const SHARED_AMENITIES_BY_LOCALE: Record<Locale, string[]> = {
  it: ["TV con canali satellitari", "Cucina attrezzata", "Aria condizionata", "Cassaforte", "Wi-Fi gratuito", "Biancheria da letto e da bagno", "Specchi e porta valigie"],
  en: ["Satellite TV", "Equipped kitchen", "Air conditioning", "Safe", "Free Wi-Fi", "Bed and bath linen", "Mirrors and luggage rack"],
  fr: ["TV satellite", "Cuisine équipée", "Climatisation", "Coffre-fort", "Wi-Fi gratuit", "Linge de lit et de bain", "Miroirs et porte-bagages"],
  de: ["Sat-TV", "Ausgestattete Küche", "Klimaanlage", "Safe", "Kostenloses WLAN", "Bett- und Badwäsche", "Spiegel und Gepäckablage"],
};

export function getSharedAmenities(locale: Locale): string[] {
  return SHARED_AMENITIES_BY_LOCALE[locale];
}

/* Retro-compatibilità. */
export const SHARED_AMENITIES = SHARED_AMENITIES_BY_LOCALE.it;
export const APARTMENT_DETAILS = getApartmentDetails("it");
