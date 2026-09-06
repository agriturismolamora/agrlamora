import Image from "next/image";
import Link from "next/link";
import { getGoogleReviews } from "@/lib/google-reviews";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { StarRow } from "@/components/review-icons";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { BlogSection } from "@/components/blog-section";
import { LocationMap } from "@/components/location-map";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Chi Siamo",
    description: "La storia di Agriturismo La Mora: una casa di famiglia ad Assisi, tra campagna umbra e ospitalità diretta. Chi la gestisce, perché esiste, come si vive oggi.",
  },
  en: {
    title: "About Us",
    description: "The story of Agriturismo La Mora: a family home in Assisi, between Umbrian countryside and direct hospitality. Who runs it, why it exists, what it's like today.",
  },
  fr: {
    title: "Qui Sommes-Nous",
    description: "L'histoire d'Agriturismo La Mora : une maison de famille à Assise, entre campagne ombrienne et hospitalité directe. Qui la gère, pourquoi elle existe, comment on y vit aujourd'hui.",
  },
  de: {
    title: "Über Uns",
    description: "Die Geschichte von Agriturismo La Mora: ein Familienhaus in Assisi, zwischen umbrischer Landschaft und persönlicher Gastfreundschaft. Wer es führt, warum es existiert, wie man heute dort lebt.",
  },
};

export function getChiSiamoMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/chi-siamo/") } };
}

function getFaqItems(locale: Locale): FaqItem[] {
  const items: Record<Locale, FaqItem[]> = {
    it: [
      { question: "Quanto dista La Mora da Assisi?", answer: "Il centro storico è a pochi minuti d'auto. La Basilica di Santa Maria degli Angeli è a 2,2 km, la stazione ferroviaria di Assisi a 2,9 km, l'aeroporto dell'Umbria a 10 km." },
      { question: "La struttura è adatta alle famiglie?", answer: "Sì: parco giochi con altalene e scivoli, piscina panoramica e babysitting su richiesta. Diversi appartamenti hanno letti a castello pensati per i bambini." },
      { question: "Sono ammessi animali?", answer: "In due appartamenti su cinque — Gemelli e Sagittario — entrambi con giardino privato recintato, al costo di 25€ a soggiorno, guinzaglio obbligatorio negli spazi comuni. Negli altri tre — Pesci, Acquario e Bilancia — sono ammessi solo animali di piccola taglia, previo accordo con il proprietario, sempre a 25€ a soggiorno." },
      { question: "È possibile prenotare direttamente?", answer: "Sì, scrivendo su WhatsApp o telefonando: rispondiamo noi, senza intermediari. Chi prenota diretto ha anche condizioni migliori rispetto alle piattaforme." },
      { question: "Quali servizi sono inclusi negli appartamenti?", answer: "Cucina attrezzata, aria condizionata, Wi-Fi gratuito, TV con canali satellitari, cassaforte, biancheria da letto e da bagno — in ogni appartamento, senza distinzioni." },
      { question: "Qual è la politica di cancellazione?", answer: "Dipende dalla stagione: bassa stagione, preavviso di 7 giorni; media stagione, 14 giorni; alta stagione (luglio-agosto), 21 giorni. In caso di mancato arrivo senza preavviso (no-show), in bassa stagione si perde la sola caparra, in media e alta stagione è dovuto l'intero importo del soggiorno." },
    ],
    en: [
      { question: "How far is La Mora from Assisi?", answer: "The historic centre is a few minutes' drive away. The Basilica of Santa Maria degli Angeli is 2.2 km away, Assisi railway station 2.9 km, Umbria airport 10 km." },
      { question: "Is the property suitable for families?", answer: "Yes: a playground with swings and slides, a panoramic pool and babysitting on request. Several apartments have bunk beds designed for children." },
      { question: "Are pets allowed?", answer: "In two of the five apartments — Gemelli and Sagittario — both with a private fenced garden, at a cost of €25 per stay, leash required in common areas. In the other three — Pesci, Acquario and Bilancia — only small pets are allowed, subject to agreement with the owner, also at €25 per stay." },
      { question: "Can I book directly?", answer: "Yes, by writing on WhatsApp or calling: we answer personally, with no intermediaries. Those who book directly also get better conditions than on the platforms." },
      { question: "What amenities are included in the apartments?", answer: "Equipped kitchen, air conditioning, free Wi-Fi, TV with satellite channels, safe, bed and bath linen — in every apartment, with no distinctions." },
      { question: "What is the cancellation policy?", answer: "It depends on the season: low season, 7 days' notice; mid season, 14 days; high season (July-August), 21 days. In case of no-show without notice, in low season only the deposit is lost, in mid and high season the full stay amount is due." },
    ],
    fr: [
      { question: "À quelle distance La Mora se trouve-t-elle d'Assise ?", answer: "Le centre historique est à quelques minutes en voiture. La basilique Sainte-Marie-des-Anges est à 2,2 km, la gare d'Assise à 2,9 km, l'aéroport d'Ombrie à 10 km." },
      { question: "La structure convient-elle aux familles ?", answer: "Oui : aire de jeux avec balançoires et toboggans, piscine panoramique et baby-sitting sur demande. Plusieurs appartements ont des lits superposés pensés pour les enfants." },
      { question: "Les animaux sont-ils admis ?", answer: "Dans deux appartements sur cinq — Gemelli et Sagittario — tous deux avec jardin privé clôturé, au coût de 25€ par séjour, laisse obligatoire dans les espaces communs. Dans les trois autres — Pesci, Acquario et Bilancia — seuls les petits animaux sont admis, sous réserve d'accord avec le propriétaire, toujours à 25€ par séjour." },
      { question: "Peut-on réserver directement ?", answer: "Oui, en écrivant sur WhatsApp ou en appelant : c'est nous qui répondons, sans intermédiaires. Une réservation directe donne aussi accès à de meilleures conditions que sur les plateformes." },
      { question: "Quels services sont inclus dans les appartements ?", answer: "Cuisine équipée, climatisation, Wi-Fi gratuit, TV avec chaînes satellite, coffre-fort, linge de lit et de toilette — dans chaque appartement, sans distinction." },
      { question: "Quelle est la politique d'annulation ?", answer: "Cela dépend de la saison : basse saison, préavis de 7 jours ; moyenne saison, 14 jours ; haute saison (juillet-août), 21 jours. En cas de non-présentation sans préavis, en basse saison seul l'acompte est perdu, en moyenne et haute saison le montant total du séjour est dû." },
    ],
    de: [
      { question: "Wie weit ist La Mora von Assisi entfernt?", answer: "Die Altstadt ist wenige Autominuten entfernt. Die Basilika Santa Maria degli Angeli liegt 2,2 km entfernt, der Bahnhof von Assisi 2,9 km, der Flughafen Umbrien 10 km." },
      { question: "Ist die Unterkunft für Familien geeignet?", answer: "Ja: Spielplatz mit Schaukeln und Rutschen, Panoramapool und Babysitting auf Anfrage. Mehrere Apartments verfügen über Etagenbetten für Kinder." },
      { question: "Sind Haustiere erlaubt?", answer: "In zwei der fünf Apartments — Gemelli und Sagittario — beide mit eigenem eingezäuntem Garten, zum Preis von 25€ pro Aufenthalt, Leinenpflicht in den Gemeinschaftsbereichen. In den anderen drei — Pesci, Acquario und Bilancia — sind nur kleine Haustiere erlaubt, nach Absprache mit dem Eigentümer, ebenfalls für 25€ pro Aufenthalt." },
      { question: "Kann man direkt buchen?", answer: "Ja, per WhatsApp oder Telefon: wir selbst antworten, ohne Vermittler. Wer direkt bucht, erhält zudem bessere Konditionen als über die Plattformen." },
      { question: "Welche Leistungen sind in den Apartments inbegriffen?", answer: "Ausgestattete Küche, Klimaanlage, kostenloses WLAN, TV mit Satellitenkanälen, Safe, Bett- und Badwäsche — in jedem Apartment, ohne Unterschiede." },
      { question: "Wie lautet die Stornierungsbedingung?", answer: "Das hängt von der Saison ab: Nebensaison, 7 Tage Vorlauf; Zwischensaison, 14 Tage; Hauptsaison (Juli-August), 21 Tage. Bei Nichterscheinen ohne Vorankündigung entfällt in der Nebensaison nur die Anzahlung, in der Zwischen- und Hauptsaison ist der volle Aufenthaltsbetrag fällig." },
    ],
  };
  return items[locale];
}

const TEXT: Record<
  Locale,
  {
    heroLabel: string;
    heroTitle: string;
    introQuote: string;
    originiLabel: string;
    originiHeading: string;
    originiBody: string;
    evoluzioneLabel: string;
    evoluzioneHeading: string;
    evoluzioneBody: string;
    oggiLabel: string;
    oggiHeading: string;
    moments: { title: string; text: string; img: string; alt: string }[];
    ospitareLabel: string;
    ospitareQuote: string;
    ospitareBody: string;
    assisiLabel: string;
    assisiHeading: string;
    assisiBody: string;
    assisiCta: string;
    personeLabel: string;
    personeQuote: string;
    faqLabel: string;
    faqHeading: string;
    googleSuffix: string;
  }
> = {
  it: {
    heroLabel: "Agriturismo La Mora · Assisi",
    heroTitle: "Una casa di famiglia, prima che un agriturismo.",
    introQuote: "La Mora è una casa di famiglia immersa nella campagna umbra, a pochi minuti da Assisi. L'ospitalità qui è diretta, personale — non un servizio, un'abitudine di famiglia.",
    originiLabel: "Le origini",
    originiHeading: "Un vecchio casale, restituito alla vita.",
    originiBody: "Prima di essere un agriturismo, La Mora è un'azienda agricola: terra vera, ulivi, un maneggio con i cavalli. Il casale che oggi ospita gli appartamenti nasce dal recupero di un edificio rurale della campagna umbra — non costruito per accogliere ospiti, ma trasformato per farlo restando fedele a quello che era.",
    evoluzioneLabel: "L'evoluzione",
    evoluzioneHeading: "Da azienda agricola ad agriturismo di famiglia.",
    evoluzioneBody: "Col tempo, la casa si è aperta: cinque appartamenti indipendenti, ciascuno con la propria cucina e il proprio ingresso, ricavati mantenendo lo spirito originario del casale. Non una catena, non un format replicato — una decisione di famiglia, presa un ambiente alla volta.",
    oggiLabel: "La Mora oggi",
    oggiHeading: "Piscina, campagna, famiglie, animali — una casa che si vive tutta.",
    moments: [
      { title: "Cinque appartamenti", text: "Indipendenti, ognuno con cucina propria e ingresso privato.", img: "/images/struttura/sala arredata di una delle stanze.jpeg", alt: "Interno arredato di uno degli appartamenti" },
      { title: "I cavalli", text: "Fanno parte dell'azienda agricola: gli ospiti possono vederli e avvicinarli.", img: "/images/home/foto dei cavalli.webp", alt: "I cavalli di Agriturismo La Mora" },
      { title: "Colazione bio", text: "Biologica, con dolci tipici umbri e frutta di stagione, ogni mattina.", img: "/images/colazione/colazione bio agriturismo la mora.webp", alt: "Colazione biologica di Agriturismo La Mora" },
      { title: "Assisi vicina", text: "A pochi minuti, base comoda per il centro storico e il territorio.", img: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilica di San Francesco ad Assisi" },
    ],
    ospitareLabel: "Il nostro modo di ospitare",
    ospitareQuote: "Non gestiamo un hotel. Viviamo qui, e apriamo la porta a chi arriva.",
    ospitareBody: "Nessun check-in impersonale, nessun copione. Se un letto in più serve, si aggiunge. Se un consiglio su dove mangiare ad Assisi può essere utile, lo diamo noi — non un cartello in camera. È un ritmo lento, pensato per chi vuole restare, non solo passare.",
    assisiLabel: "Assisi, non solo un indirizzo",
    assisiHeading: "Si arriva per Assisi. Si resta per come ci si sente qui.",
    assisiBody: "La posizione non è un dettaglio: è parte di cosa siamo. Abbastanza vicini al centro storico per andarci a piedi o in bici, abbastanza fuori per tornare la sera in un posto silenzioso, con la campagna intorno invece del traffico turistico. È l'equilibrio che rende un soggiorno qui diverso da un hotel in città.",
    assisiCta: "Scopri il territorio",
    personeLabel: "Chi c'è dietro La Mora",
    personeQuote: "La Mora la gestiamo noi, in famiglia — io, Paolo, e chi lavora con noi ogni giorno. Non è una frase di circostanza: quando scrivi, rispondiamo davvero noi.",
    faqLabel: "Domande frequenti",
    faqHeading: "Le domande che ci fate più spesso.",
    googleSuffix: "— Google",
  },
  en: {
    heroLabel: "Agriturismo La Mora · Assisi",
    heroTitle: "A family home, before it's an agriturismo.",
    introQuote: "La Mora is a family home set in the Umbrian countryside, minutes from Assisi. Hospitality here is direct, personal — not a service, a family habit.",
    originiLabel: "The origins",
    originiHeading: "An old farmhouse, brought back to life.",
    originiBody: "Before it was an agriturismo, La Mora was a working farm: real land, olive trees, a riding stable with horses. The farmhouse that today houses the apartments came from restoring a rural building in the Umbrian countryside — not built to host guests, but transformed to do so while staying true to what it was.",
    evoluzioneLabel: "The evolution",
    evoluzioneHeading: "From working farm to family agriturismo.",
    evoluzioneBody: "Over time, the house opened up: five independent apartments, each with its own kitchen and entrance, carved out while keeping the farmhouse's original spirit. Not a chain, not a replicated format — a family decision, made one room at a time.",
    oggiLabel: "La Mora today",
    oggiHeading: "Pool, countryside, families, animals — a house lived in fully.",
    moments: [
      { title: "Five apartments", text: "Independent, each with its own kitchen and private entrance.", img: "/images/struttura/sala arredata di una delle stanze.jpeg", alt: "Furnished interior of one of the apartments" },
      { title: "The horses", text: "Part of the farm: guests can see them and get close to them.", img: "/images/home/foto dei cavalli.webp", alt: "The horses of Agriturismo La Mora" },
      { title: "Organic breakfast", text: "Organic, with typical Umbrian pastries and seasonal fruit, every morning.", img: "/images/colazione/colazione bio agriturismo la mora.webp", alt: "Organic breakfast at Agriturismo La Mora" },
      { title: "Assisi nearby", text: "Minutes away, a convenient base for the historic centre and the area.", img: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilica of St. Francis in Assisi" },
    ],
    ospitareLabel: "Our way of hosting",
    ospitareQuote: "We don't run a hotel. We live here, and open the door to those who arrive.",
    ospitareBody: "No impersonal check-in, no script. If an extra bed is needed, it's added. If a tip on where to eat in Assisi could help, we give it ourselves — not a sign in the room. It's a slow pace, meant for those who want to stay, not just pass through.",
    assisiLabel: "Assisi, not just an address",
    assisiHeading: "You arrive for Assisi. You stay for how it feels here.",
    assisiBody: "The location isn't a detail: it's part of who we are. Close enough to the historic centre to walk or cycle there, far enough out to come back in the evening to somewhere quiet, with countryside around instead of tourist traffic. It's the balance that makes a stay here different from a hotel in town.",
    assisiCta: "Discover the area",
    personeLabel: "Who's behind La Mora",
    personeQuote: "We run La Mora ourselves, as a family — myself, Paolo, and those who work with us every day. It's not just a phrase: when you write to us, we're the ones who actually reply.",
    faqLabel: "Frequently asked questions",
    faqHeading: "The questions we're asked most often.",
    googleSuffix: "— Google",
  },
  fr: {
    heroLabel: "Agriturismo La Mora · Assise",
    heroTitle: "Une maison de famille, avant d'être un agriturismo.",
    introQuote: "La Mora est une maison de famille nichée dans la campagne ombrienne, à quelques minutes d'Assise. L'hospitalité y est directe, personnelle — pas un service, une habitude de famille.",
    originiLabel: "Les origines",
    originiHeading: "Une ancienne ferme, rendue à la vie.",
    originiBody: "Avant d'être un agriturismo, La Mora était une exploitation agricole : une vraie terre, des oliviers, un manège avec des chevaux. La ferme qui abrite aujourd'hui les appartements est née de la restauration d'un bâtiment rural de la campagne ombrienne — non construit pour accueillir des hôtes, mais transformé pour le faire en restant fidèle à ce qu'il était.",
    evoluzioneLabel: "L'évolution",
    evoluzioneHeading: "D'exploitation agricole à agriturismo familial.",
    evoluzioneBody: "Avec le temps, la maison s'est ouverte : cinq appartements indépendants, chacun avec sa propre cuisine et sa propre entrée, aménagés en conservant l'esprit d'origine de la ferme. Ni une chaîne, ni un format reproduit — une décision de famille, prise pièce après pièce.",
    oggiLabel: "La Mora aujourd'hui",
    oggiHeading: "Piscine, campagne, familles, animaux — une maison vécue pleinement.",
    moments: [
      { title: "Cinq appartements", text: "Indépendants, chacun avec sa propre cuisine et son entrée privée.", img: "/images/struttura/sala arredata di una delle stanze.jpeg", alt: "Intérieur meublé de l'un des appartements" },
      { title: "Les chevaux", text: "Font partie de l'exploitation agricole : les hôtes peuvent les voir et les approcher.", img: "/images/home/foto dei cavalli.webp", alt: "Les chevaux d'Agriturismo La Mora" },
      { title: "Petit-déjeuner bio", text: "Biologique, avec pâtisseries typiques d'Ombrie et fruits de saison, chaque matin.", img: "/images/colazione/colazione bio agriturismo la mora.webp", alt: "Petit-déjeuner biologique d'Agriturismo La Mora" },
      { title: "Assise à proximité", text: "À quelques minutes, une base pratique pour le centre historique et le territoire.", img: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilique Saint-François d'Assise" },
    ],
    ospitareLabel: "Notre façon d'accueillir",
    ospitareQuote: "Nous ne gérons pas un hôtel. Nous vivons ici, et ouvrons la porte à ceux qui arrivent.",
    ospitareBody: "Pas d'enregistrement impersonnel, pas de script. S'il faut un lit de plus, on l'ajoute. Si un conseil sur où manger à Assise peut être utile, c'est nous qui le donnons — pas une pancarte dans la chambre. C'est un rythme lent, pensé pour ceux qui veulent rester, pas seulement passer.",
    assisiLabel: "Assise, pas seulement une adresse",
    assisiHeading: "On arrive pour Assise. On reste pour ce que l'on ressent ici.",
    assisiBody: "L'emplacement n'est pas un détail : il fait partie de ce que nous sommes. Assez proches du centre historique pour y aller à pied ou à vélo, assez à l'écart pour rentrer le soir dans un endroit tranquille, avec la campagne autour au lieu du trafic touristique. C'est cet équilibre qui rend un séjour ici différent d'un hôtel en ville.",
    assisiCta: "Découvrir le territoire",
    personeLabel: "Qui se cache derrière La Mora",
    personeQuote: "C'est nous qui gérons La Mora, en famille — moi, Paolo, et ceux qui travaillent avec nous chaque jour. Ce n'est pas une formule de circonstance : quand vous écrivez, c'est vraiment nous qui répondons.",
    faqLabel: "Questions fréquentes",
    faqHeading: "Les questions que l'on nous pose le plus souvent.",
    googleSuffix: "— Google",
  },
  de: {
    heroLabel: "Agriturismo La Mora · Assisi",
    heroTitle: "Ein Familienhaus, bevor es ein Agriturismo ist.",
    introQuote: "La Mora ist ein Familienhaus inmitten der umbrischen Landschaft, wenige Minuten von Assisi entfernt. Die Gastfreundschaft hier ist direkt, persönlich — kein Service, sondern eine Familiengewohnheit.",
    originiLabel: "Die Ursprünge",
    originiHeading: "Ein altes Landhaus, wieder zum Leben erweckt.",
    originiBody: "Bevor es ein Agriturismo war, war La Mora ein echter Bauernhof: echtes Land, Olivenbäume, ein Reitstall mit Pferden. Das Landhaus, das heute die Apartments beherbergt, entstand aus der Restaurierung eines ländlichen Gebäudes in der umbrischen Landschaft — nicht gebaut, um Gäste zu empfangen, aber so umgestaltet, dass es dem treu blieb, was es war.",
    evoluzioneLabel: "Die Entwicklung",
    evoluzioneHeading: "Vom Bauernhof zum familiengeführten Agriturismo.",
    evoluzioneBody: "Mit der Zeit öffnete sich das Haus: fünf unabhängige Apartments, jedes mit eigener Küche und eigenem Eingang, geschaffen unter Beibehaltung des ursprünglichen Geistes des Landhauses. Keine Kette, kein wiederholtes Konzept — eine Familienentscheidung, Raum für Raum getroffen.",
    oggiLabel: "La Mora heute",
    oggiHeading: "Pool, Landschaft, Familien, Tiere — ein Haus, das man ganz erlebt.",
    moments: [
      { title: "Fünf Apartments", text: "Unabhängig, jedes mit eigener Küche und privatem Eingang.", img: "/images/struttura/sala arredata di una delle stanze.jpeg", alt: "Eingerichtetes Interieur eines der Apartments" },
      { title: "Die Pferde", text: "Gehören zum Hof: Gäste können sie sehen und sich ihnen nähern.", img: "/images/home/foto dei cavalli.webp", alt: "Die Pferde von Agriturismo La Mora" },
      { title: "Bio-Frühstück", text: "Biologisch, mit typisch umbrischem Gebäck und saisonalem Obst, jeden Morgen.", img: "/images/colazione/colazione bio agriturismo la mora.webp", alt: "Bio-Frühstück von Agriturismo La Mora" },
      { title: "Assisi in der Nähe", text: "Wenige Minuten entfernt, eine praktische Basis für die Altstadt und die Umgebung.", img: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilika des Heiligen Franziskus in Assisi" },
    ],
    ospitareLabel: "Unsere Art zu empfangen",
    ospitareQuote: "Wir führen kein Hotel. Wir leben hier und öffnen die Tür für alle, die ankommen.",
    ospitareBody: "Kein unpersönlicher Check-in, kein Skript. Wird ein zusätzliches Bett gebraucht, wird es hinzugefügt. Kann ein Tipp, wo man in Assisi essen kann, helfen, geben wir ihn selbst — kein Schild im Zimmer. Es ist ein langsames Tempo, gedacht für alle, die bleiben wollen, nicht nur vorbeischauen.",
    assisiLabel: "Assisi, nicht nur eine Adresse",
    assisiHeading: "Man kommt wegen Assisi. Man bleibt wegen des Gefühls hier.",
    assisiBody: "Die Lage ist kein Detail: sie ist Teil dessen, was wir sind. Nah genug an der Altstadt, um zu Fuß oder mit dem Rad hinzufahren, weit genug draußen, um abends an einen ruhigen Ort zurückzukehren, mit Landschaft ringsum statt Touristenverkehr. Das ist die Balance, die einen Aufenthalt hier anders macht als in einem Stadthotel.",
    assisiCta: "Die Umgebung entdecken",
    personeLabel: "Wer hinter La Mora steht",
    personeQuote: "Wir führen La Mora selbst, als Familie — ich, Paolo, und alle, die jeden Tag mit uns arbeiten. Das ist keine Floskel: wenn Sie schreiben, antworten wirklich wir.",
    faqLabel: "Häufig gestellte Fragen",
    faqHeading: "Die Fragen, die uns am häufigsten gestellt werden.",
    googleSuffix: "— Google",
  },
};

export async function ChiSiamoPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const reviews = await getGoogleReviews();
  const paoloQuote = reviews.reviews.find((r) => /paolo/i.test(r.text));

  return (
    <>
      <section className="relative flex h-[92vh] min-h-[600px] items-end overflow-hidden">
        <Image
          src="/images/home/foto dell agriturismo dall alto.webp"
          alt="Agriturismo La Mora visto dall'alto, nella campagna umbra vicino Assisi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.35) 60%, rgba(20,14,7,.78) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-16 text-center sm:px-10 sm:pb-20">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/80">{text.heroLabel}</span>
            <h1 className="mt-5 font-display text-[clamp(38px,6.5vw,70px)] font-normal leading-[1.08] text-cream [text-wrap:balance]">
              {text.heroTitle}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-olive-950 py-24 sm:py-32">
        <div className="mx-auto flex max-w-[720px] flex-col items-center px-6 text-center sm:px-10">
          <Reveal>
            <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-[3px] shadow-[0_35px_70px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/home/esterno agriturismo la mora carretto e agriturismo.webp"
                alt="Ingresso di Agriturismo La Mora con carretto d'epoca"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-12 font-display text-[clamp(22px,3.2vw,32px)] font-normal italic leading-[1.5] text-[#f1f1f1] [text-wrap:balance]">
              {text.introQuote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11]">
                <Image
                  src="/images/struttura/foto vista alto agriturismo la mora assisi.webp"
                  alt="Il casale di Agriturismo La Mora visto dall'alto"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
              <div className="order-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.originiLabel}</span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  {text.originiHeading}
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">{text.originiBody}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-20 grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16 sm:mt-24">
              <div className="order-2 sm:order-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.evoluzioneLabel}</span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  {text.evoluzioneHeading}
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">{text.evoluzioneBody}</p>
              </div>
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:order-2 sm:aspect-[16/11]">
                <Image
                  src="/images/struttura/immagine di una sala dell agriturismo.webp"
                  alt="Interno arredato di uno degli spazi comuni di Agriturismo La Mora"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.oggiLabel}</span>
            <h2 className="mt-4 max-w-[620px] font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.oggiHeading}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-[3px] sm:mt-14">
              <Image
                src="/images/home/foto della piscina agriturismo la mora.webp"
                alt="Piscina panoramica di Agriturismo La Mora"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:mt-14 sm:grid-cols-4 sm:gap-8">
            {text.moments.map((moment, i) => (
              <Reveal key={moment.title} delay={i * 60}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[3px]">
                  <Image src={moment.img} alt={moment.alt} fill sizes="(max-width: 640px) 45vw, 260px" className="object-cover" />
                </div>
                <h3 className="mt-3 font-display text-[15px] font-normal leading-[1.2] text-ink sm:text-[17px]">
                  {moment.title}
                </h3>
                <p className="mt-1.5 hidden text-[12px] leading-[1.6] text-ink-soft sm:block">{moment.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1f180e] py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-14 px-6 sm:grid-cols-[1fr_1fr] sm:gap-20 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/piscina/esterno parco agriturismo con casetta.webp"
                alt="Angolo di giardino di Agriturismo La Mora"
                fill
                sizes="(max-width: 640px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">{text.ospitareLabel}</span>
            <p className="mt-6 font-display text-[clamp(26px,3.4vw,38px)] font-normal leading-[1.35] text-cream [text-wrap:balance]">
              {text.ospitareQuote}
            </p>
            <p className="mt-6 max-w-[420px] text-[14px] leading-[1.8] text-cream/65">{text.ospitareBody}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-10 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11]">
              <Image
                src="/images/territorio/assisi/assisi con tramonto.jpg"
                alt="Assisi al tramonto, vista dalla campagna umbra"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.assisiLabel}</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.assisiHeading}
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">{text.assisiBody}</p>
            <Link
              href={withLocale(locale, "/territorio/")}
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-terracotta px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8f4324" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.assisiCta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-[440px_1fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image
                src="/images/struttura/foto dell esterno della struttura.webp"
                alt="Agriturismo La Mora, gestito dalla famiglia Mazzoli"
                fill
                sizes="(max-width: 640px) 100vw, 440px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.personeLabel}</span>
            <p className="mt-5 font-display text-[22px] font-normal italic leading-[1.5] text-ink [text-wrap:balance]">
              &ldquo;{text.personeQuote}&rdquo;
            </p>
            {paoloQuote && (
              <div className="mt-8 border-l-2 border-gold pl-5">
                <StarRow rating={paoloQuote.rating} size={13} />
                <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">&ldquo;{paoloQuote.text}&rdquo;</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-ink-soft/70">
                  {paoloQuote.authorName} {text.googleSuffix}
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <Reveal>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.faqLabel}</span>
              <h2 className="mt-4 font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                {text.faqHeading}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <FaqAccordion items={getFaqItems(locale)} />
            </Reveal>
          </div>
        </div>
      </section>

      <BlogSection locale={locale} />
      <LocationMap locale={locale} />
      <NewsletterSection locale={locale} />
      <CertificationsMarquee locale={locale} />
    </>
  );
}
