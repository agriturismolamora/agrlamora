import type { Locale } from "@/lib/i18n";
import type { BlogTopic } from "@/data/blog-posts";

/* Pagine hub "Vacanza con animali" e "Vacanza in famiglia" (menu Alloggi).
   SOLO fatti confermati dal titolare (ottobre 2026: supplemento animali
   25 € a soggiorno, culla 15 € a soggiorno, riduzioni bambini, parco giochi
   sempre libero sotto la supervisione degli adulti, cuffia obbligatoria in
   piscina fino a 16 anni) e dati già nel progetto: PROJECT-BRIEF.md,
   apartments.ts, piscina e home (6×12 m, 1° maggio–28 settembre,
   9:00–19:00), places.ts (6,8 km da Piazza del Comune, circa 14 minuti),
   ristorante convenzionato (menù bambini). Mai "giardino recintato" né
   seggioloni (indicazione del titolare). */

export type HubId = "pets" | "family";
export type HubIcon = "paw" | "garden" | "shower" | "euro" | "leash" | "form" | "slide" | "pool" | "ball" | "kitchen" | "cradle" | "baby" | "cup" | "plate";

export type HubText = {
  metaTitle: string;
  metaDescription: string;
  heroLabel: string;
  heroAlt: string;
  h1: string;
  intro: string[];
  offerLabel: string;
  offerHeading: string;
  offers: { icon: HubIcon; title: string; body: string; href?: string; linkLabel?: string }[];
  apartmentsLabel: string;
  apartmentsHeading: string;
  apartmentsBody: string;
  costsLabel: string;
  costsHeading: string;
  costs: { label: string; value: string; note?: string; href?: string; linkLabel?: string }[];
  costsNote?: string;
  nearbyLabel: string;
  nearbyHeading: string;
  nearbyBody: string;
  nearbyLinks: { label: string; href: string }[];
  blogLabel: string;
  blogHeading: string;
  faqLabel: string;
  faq: { question: string; answer: string }[];
  ctaHeading: string;
  ctaBody: string;
  ctaWhatsapp: string;
  whatsappMessage: string;
  ctaBook: string;
};

export type Hub = {
  id: HubId;
  path: string;
  topic: BlogTopic;
  heroImage: { src: string; position?: string };
  /* Slug degli appartamenti da mostrare, nell'ordine (apartments.ts). */
  apartments: string[];
  text: Record<Locale, HubText>;
};

export const PETS_HUB: Hub = {
  id: "pets",
  path: "/vacanza-con-animali/",
  topic: "pets",
  heroImage: { src: "/images/alloggi/appartamento gemelli/area cani appartamento gemelli esterno .jpg", position: "50% 40%" },
  apartments: ["gemelli", "sagittario"],
  text: {
    it: {
      metaTitle: "Vacanza con animali ad Assisi: agriturismo pet friendly",
      metaDescription:
        "Agriturismo pet friendly ad Assisi: Gemelli e Sagittario, al piano terra con giardino privato, accolgono il tuo cane con un supplemento di 25 € a soggiorno.",
      heroLabel: "Vacanza con animali",
      heroAlt: "Il giardino privato dell'appartamento Gemelli, con un cagnolino sul prato",
      h1: "Agriturismo pet friendly ad Assisi",
      intro: [
        "Ad Agriturismo La Mora chi viaggia con il proprio cane è il benvenuto. Gemelli e Sagittario, i due appartamenti pet friendly, sono al piano terra e hanno ciascuno un giardino privato: il supplemento per l'animale è di 25 € a soggiorno, non a notte.",
        "Siamo nella campagna di Assisi, a 6,8 km da Piazza del Comune (circa 14 minuti in auto): la mattina in giardino con il cane, il pomeriggio in giro per l'Umbria.",
      ],
      offerLabel: "Cosa offriamo",
      offerHeading: "Tutto quello che serve a te e al tuo cane",
      offers: [
        { icon: "paw", title: "Due appartamenti pet friendly", body: "Gemelli (fino a 4 ospiti) e Sagittario (fino a 6), entrambi al piano terra." },
        { icon: "garden", title: "Un giardino privato", body: "Ogni appartamento pet friendly ha il suo giardino, non condiviso con il resto della struttura." },
        { icon: "shower", title: "Doccia esterna per i cani", body: "Per una sciacquata dopo una passeggiata in campagna." },
        { icon: "euro", title: "25 € a soggiorno", body: "Un solo supplemento per tutto il soggiorno, non a notte." },
        { icon: "leash", title: "Guinzaglio nelle aree comuni", body: "Negli spazi condivisi della struttura gli animali vanno tenuti al guinzaglio." },
        { icon: "form", title: "Lo segnali quando prenoti", body: "Nel modulo di richiesta c'è la voce «Viaggio con animali», con taglia e tipo di animale." },
      ],
      apartmentsLabel: "Gli appartamenti",
      apartmentsHeading: "Gemelli e Sagittario, i due appartamenti pet friendly",
      apartmentsBody:
        "Negli appartamenti Pesci, Acquario e Bilancia sono ammessi solo animali di piccola taglia, previo accordo con il proprietario, sempre a 25 € a soggiorno.",
      costsLabel: "Servizi e costi",
      costsHeading: "Costi e regole, senza sorprese",
      costs: [
        { label: "Supplemento animali", value: "25 € a soggiorno", note: "In Gemelli e Sagittario; negli altri appartamenti solo piccola taglia, previo accordo." },
        { label: "Guinzaglio", value: "Nelle aree comuni", note: "Negli spazi condivisi della struttura." },
        { label: "Culla", value: "15 € a soggiorno", note: "Su richiesta, per chi viaggia anche con un bebè." },
      ],
      nearbyLabel: "Nei dintorni",
      nearbyHeading: "Cosa fare nei dintorni",
      nearbyBody:
        "Intorno a La Mora ci sono la campagna umbra, i sentieri del Monte Subasio e i borghi della valle. Prima di partire, controlla sul sito ufficiale di ogni luogo le regole per gli animali.",
      nearbyLinks: [
        { label: "Cosa vedere ad Assisi e dintorni", href: "/territorio/" },
        { label: "Monte Subasio: i sentieri sopra Assisi", href: "/blog/monte-subasio/" },
        { label: "Il Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
      ],
      blogLabel: "Dal blog",
      blogHeading: "Idee per la tua vacanza con animali",
      faqLabel: "Domande frequenti",
      faq: [
        {
          question: "Quali appartamenti accettano animali?",
          answer:
            "Gemelli e Sagittario, al piano terra con giardino privato. Negli altri appartamenti (Pesci, Acquario e Bilancia) sono ammessi solo animali di piccola taglia, previo accordo con il proprietario.",
        },
        { question: "Quanto costa portare un animale?", answer: "Il supplemento è di 25 € a soggiorno, non a notte." },
        { question: "Gli animali devono stare al guinzaglio?", answer: "Sì, nelle aree comuni della struttura." },
        {
          question: "Come segnalo che viaggio con un animale?",
          answer: "Indicalo quando prenoti o nella richiesta: nel modulo c'è la voce «Viaggio con animali», con taglia e tipo di animale. Puoi anche scriverci su WhatsApp.",
        },
      ],
      ctaHeading: "Prenota la tua vacanza con il tuo cane",
      ctaBody: "Scegli le date e indica che viaggi con un animale: ti rispondiamo noi, senza intermediari.",
      ctaWhatsapp: "Scrivici su WhatsApp",
      whatsappMessage: "Ciao! Vorrei soggiornare a La Mora con il mio animale.",
      ctaBook: "Prenota ora",
    },
    en: {
      metaTitle: "Holidays with pets in Assisi: pet-friendly agriturismo",
      metaDescription:
        "Pet-friendly agriturismo in Assisi: Gemelli and Sagittario, on the ground floor with a private garden, welcome your dog for a supplement of €25 per stay.",
      heroLabel: "Holidays with pets",
      heroAlt: "The private garden of the Gemelli apartment, with a little dog on the lawn",
      h1: "Pet-friendly agriturismo in Assisi",
      intro: [
        "At Agriturismo La Mora, guests travelling with their dog are welcome. Gemelli and Sagittario, the two pet-friendly apartments, are on the ground floor and each has its own private garden: the pet supplement is €25 per stay, not per night.",
        "We're in the Assisi countryside, 6.8 km from Piazza del Comune (about 14 minutes by car): mornings in the garden with your dog, afternoons out exploring Umbria.",
      ],
      offerLabel: "What we offer",
      offerHeading: "Everything you and your dog need",
      offers: [
        { icon: "paw", title: "Two pet-friendly apartments", body: "Gemelli (up to 4 guests) and Sagittario (up to 6), both on the ground floor." },
        { icon: "garden", title: "A private garden", body: "Each pet-friendly apartment has its own garden, not shared with the rest of the property." },
        { icon: "shower", title: "Outdoor shower for dogs", body: "For a rinse after a walk in the countryside." },
        { icon: "euro", title: "€25 per stay", body: "One supplement for the whole stay, not per night." },
        { icon: "leash", title: "Lead in shared areas", body: "In the shared spaces of the property, pets must be kept on a lead." },
        { icon: "form", title: "Tell us when you book", body: "The request form has a 'Travelling with pets' option, with the animal's size and type." },
      ],
      apartmentsLabel: "The apartments",
      apartmentsHeading: "Gemelli and Sagittario, the two pet-friendly apartments",
      apartmentsBody: "The Pesci, Acquario and Bilancia apartments accept small pets only, by prior agreement with the owner, also at €25 per stay.",
      costsLabel: "Services and costs",
      costsHeading: "Costs and rules, no surprises",
      costs: [
        { label: "Pet supplement", value: "€25 per stay", note: "In Gemelli and Sagittario; small pets only in the other apartments, by prior agreement." },
        { label: "Lead", value: "In shared areas", note: "In the shared spaces of the property." },
        { label: "Cot", value: "€15 per stay", note: "On request, for those also travelling with a baby." },
      ],
      nearbyLabel: "Nearby",
      nearbyHeading: "What to do nearby",
      nearbyBody:
        "Around La Mora you'll find the Umbrian countryside, the Monte Subasio trails and the villages of the valley. Before you go, check each place's official website for its rules on pets.",
      nearbyLinks: [
        { label: "What to see in and around Assisi", href: "/territorio/" },
        { label: "Monte Subasio: the trails above Assisi", href: "/blog/monte-subasio/" },
        { label: "The Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
      ],
      blogLabel: "From the blog",
      blogHeading: "Ideas for your holiday with pets",
      faqLabel: "Frequently asked questions",
      faq: [
        {
          question: "Which apartments accept pets?",
          answer:
            "Gemelli and Sagittario, on the ground floor with a private garden. The other apartments (Pesci, Acquario and Bilancia) accept small pets only, by prior agreement with the owner.",
        },
        { question: "How much does it cost to bring a pet?", answer: "The supplement is €25 per stay, not per night." },
        { question: "Do pets have to be kept on a lead?", answer: "Yes, in the shared areas of the property." },
        {
          question: "How do I tell you I'm travelling with a pet?",
          answer: "Mention it when you book or in your request: the form has a 'Travelling with pets' option, with the animal's size and type. You can also message us on WhatsApp.",
        },
      ],
      ctaHeading: "Book your holiday with your dog",
      ctaBody: "Choose your dates and tell us you're travelling with a pet: we reply ourselves, with no middlemen.",
      ctaWhatsapp: "Message us on WhatsApp",
      whatsappMessage: "Hi! I'd like to stay at La Mora with my pet.",
      ctaBook: "Book now",
    },
    fr: {
      metaTitle: "Vacances avec animaux à Assise : agritourisme pet friendly",
      metaDescription:
        "Agritourisme pet friendly à Assise : Gemelli et Sagittario, au rez-de-chaussée avec jardin privé, accueillent votre chien pour un supplément de 25 € par séjour.",
      heroLabel: "Vacances avec animaux",
      heroAlt: "Le jardin privé de l'appartement Gemelli, avec un petit chien sur la pelouse",
      h1: "Agritourisme pet friendly à Assise",
      intro: [
        "À l'Agriturismo La Mora, ceux qui voyagent avec leur chien sont les bienvenus. Gemelli et Sagittario, les deux appartements qui acceptent les animaux, sont au rez-de-chaussée et ont chacun un jardin privé : le supplément pour l'animal est de 25 € par séjour, et non par nuit.",
        "Nous sommes dans la campagne d'Assise, à 6,8 km de la Piazza del Comune (environ 14 minutes en voiture) : le matin au jardin avec votre chien, l'après-midi à la découverte de l'Ombrie.",
      ],
      offerLabel: "Ce que nous proposons",
      offerHeading: "Tout ce qu'il faut pour vous et votre chien",
      offers: [
        { icon: "paw", title: "Deux appartements pet friendly", body: "Gemelli (jusqu'à 4 personnes) et Sagittario (jusqu'à 6), tous deux au rez-de-chaussée." },
        { icon: "garden", title: "Un jardin privé", body: "Chaque appartement qui accepte les animaux a son propre jardin, non partagé avec le reste de la structure." },
        { icon: "shower", title: "Douche extérieure pour les chiens", body: "Pour un rinçage après une promenade dans la campagne." },
        { icon: "euro", title: "25 € par séjour", body: "Un seul supplément pour tout le séjour, et non par nuit." },
        { icon: "leash", title: "Laisse dans les espaces communs", body: "Dans les espaces partagés de la structure, les animaux doivent être tenus en laisse." },
        { icon: "form", title: "À signaler lors de la réservation", body: "Le formulaire de demande a l'option « Je voyage avec des animaux », avec la taille et le type d'animal." },
      ],
      apartmentsLabel: "Les appartements",
      apartmentsHeading: "Gemelli et Sagittario, les deux appartements pet friendly",
      apartmentsBody:
        "Les appartements Pesci, Acquario et Bilancia acceptent uniquement les animaux de petite taille, après accord avec le propriétaire, également à 25 € par séjour.",
      costsLabel: "Services et coûts",
      costsHeading: "Coûts et règles, sans surprise",
      costs: [
        { label: "Supplément animaux", value: "25 € par séjour", note: "Dans Gemelli et Sagittario ; dans les autres appartements, petite taille uniquement, après accord." },
        { label: "Laisse", value: "Dans les espaces communs", note: "Dans les espaces partagés de la structure." },
        { label: "Lit bébé", value: "15 € par séjour", note: "Sur demande, pour ceux qui voyagent aussi avec un bébé." },
      ],
      nearbyLabel: "Aux alentours",
      nearbyHeading: "Que faire aux alentours",
      nearbyBody:
        "Autour de La Mora : la campagne ombrienne, les sentiers du Mont Subasio et les villages de la vallée. Avant de partir, vérifiez sur le site officiel de chaque lieu les règles concernant les animaux.",
      nearbyLinks: [
        { label: "Que voir à Assise et aux alentours", href: "/territorio/" },
        { label: "Mont Subasio : les sentiers au-dessus d'Assise", href: "/blog/monte-subasio/" },
        { label: "Le Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
      ],
      blogLabel: "Sur le blog",
      blogHeading: "Des idées pour vos vacances avec animaux",
      faqLabel: "Questions fréquentes",
      faq: [
        {
          question: "Quels appartements acceptent les animaux ?",
          answer:
            "Gemelli et Sagittario, au rez-de-chaussée avec jardin privé. Les autres appartements (Pesci, Acquario et Bilancia) acceptent uniquement les animaux de petite taille, après accord avec le propriétaire.",
        },
        { question: "Combien coûte la venue d'un animal ?", answer: "Le supplément est de 25 € par séjour, et non par nuit." },
        { question: "Les animaux doivent-ils être tenus en laisse ?", answer: "Oui, dans les espaces communs de la structure." },
        {
          question: "Comment signaler que je voyage avec un animal ?",
          answer: "Indiquez-le lors de la réservation ou dans votre demande : le formulaire a l'option « Je voyage avec des animaux », avec la taille et le type d'animal. Vous pouvez aussi nous écrire sur WhatsApp.",
        },
      ],
      ctaHeading: "Réservez vos vacances avec votre chien",
      ctaBody: "Choisissez vos dates et indiquez que vous voyagez avec un animal : c'est nous qui répondons, sans intermédiaire.",
      ctaWhatsapp: "Écrivez-nous sur WhatsApp",
      whatsappMessage: "Bonjour ! Je voudrais séjourner à La Mora avec mon animal.",
      ctaBook: "Réserver",
    },
    de: {
      metaTitle: "Urlaub mit Haustieren in Assisi: haustierfreundlicher Agriturismo",
      metaDescription:
        "Haustierfreundlicher Agriturismo in Assisi: Gemelli und Sagittario im Erdgeschoss mit privatem Garten nehmen Ihren Hund für 25 € Aufpreis pro Aufenthalt auf.",
      heroLabel: "Urlaub mit Haustieren",
      heroAlt: "Der private Garten des Apartments Gemelli, mit einem kleinen Hund auf der Wiese",
      h1: "Haustierfreundlicher Agriturismo in Assisi",
      intro: [
        "Im Agriturismo La Mora sind Gäste mit Hund willkommen. Gemelli und Sagittario, die beiden haustierfreundlichen Apartments, liegen im Erdgeschoss und haben jeweils einen eigenen privaten Garten: Der Aufpreis für das Tier beträgt 25 € pro Aufenthalt, nicht pro Nacht.",
        "Wir liegen in der Landschaft von Assisi, 6,8 km von der Piazza del Comune entfernt (rund 14 Minuten mit dem Auto): morgens mit dem Hund im Garten, nachmittags unterwegs in Umbrien.",
      ],
      offerLabel: "Was wir bieten",
      offerHeading: "Alles, was Sie und Ihr Hund brauchen",
      offers: [
        { icon: "paw", title: "Zwei haustierfreundliche Apartments", body: "Gemelli (bis zu 4 Gäste) und Sagittario (bis zu 6), beide im Erdgeschoss." },
        { icon: "garden", title: "Ein privater Garten", body: "Jedes haustierfreundliche Apartment hat einen eigenen Garten, nicht mit dem Rest der Unterkunft geteilt." },
        { icon: "shower", title: "Außendusche für Hunde", body: "Zum Abspülen nach einem Spaziergang auf dem Land." },
        { icon: "euro", title: "25 € pro Aufenthalt", body: "Ein einziger Aufpreis für den ganzen Aufenthalt, nicht pro Nacht." },
        { icon: "leash", title: "Leine in den Gemeinschaftsbereichen", body: "In den gemeinsamen Bereichen der Unterkunft sind Tiere an der Leine zu führen." },
        { icon: "form", title: "Bei der Buchung angeben", body: "Im Anfrageformular gibt es die Option „Ich reise mit Haustieren“, mit Größe und Art des Tieres." },
      ],
      apartmentsLabel: "Die Apartments",
      apartmentsHeading: "Gemelli und Sagittario, die beiden haustierfreundlichen Apartments",
      apartmentsBody:
        "In den Apartments Pesci, Acquario und Bilancia sind nur kleine Haustiere nach vorheriger Absprache mit dem Eigentümer erlaubt, ebenfalls für 25 € pro Aufenthalt.",
      costsLabel: "Leistungen und Kosten",
      costsHeading: "Kosten und Regeln, ohne Überraschungen",
      costs: [
        { label: "Aufpreis für Haustiere", value: "25 € pro Aufenthalt", note: "In Gemelli und Sagittario; in den übrigen Apartments nur kleine Tiere, nach Absprache." },
        { label: "Leine", value: "In den Gemeinschaftsbereichen", note: "In den gemeinsamen Bereichen der Unterkunft." },
        { label: "Babybett", value: "15 € pro Aufenthalt", note: "Auf Anfrage, für alle, die auch mit einem Baby reisen." },
      ],
      nearbyLabel: "In der Umgebung",
      nearbyHeading: "Was man in der Umgebung unternehmen kann",
      nearbyBody:
        "Rund um La Mora: die umbrische Landschaft, die Wege am Monte Subasio und die Orte im Tal. Prüfen Sie vor dem Besuch auf der offiziellen Website jedes Ortes, welche Regeln für Haustiere gelten.",
      nearbyLinks: [
        { label: "Sehenswertes in und um Assisi", href: "/territorio/" },
        { label: "Monte Subasio: die Wege über Assisi", href: "/blog/monte-subasio/" },
        { label: "Der Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
      ],
      blogLabel: "Aus dem Blog",
      blogHeading: "Ideen für Ihren Urlaub mit Haustieren",
      faqLabel: "Häufige Fragen",
      faq: [
        {
          question: "Welche Apartments nehmen Haustiere auf?",
          answer:
            "Gemelli und Sagittario im Erdgeschoss, mit privatem Garten. In den übrigen Apartments (Pesci, Acquario und Bilancia) sind nur kleine Haustiere nach vorheriger Absprache mit dem Eigentümer erlaubt.",
        },
        { question: "Was kostet es, ein Haustier mitzubringen?", answer: "Der Aufpreis beträgt 25 € pro Aufenthalt, nicht pro Nacht." },
        { question: "Müssen Tiere an der Leine geführt werden?", answer: "Ja, in den gemeinsamen Bereichen der Unterkunft." },
        {
          question: "Wie gebe ich an, dass ich mit einem Haustier reise?",
          answer: "Geben Sie es bei der Buchung oder in der Anfrage an: Im Formular gibt es die Option „Ich reise mit Haustieren“, mit Größe und Art des Tieres. Sie können uns auch auf WhatsApp schreiben.",
        },
      ],
      ctaHeading: "Buchen Sie Ihren Urlaub mit Hund",
      ctaBody: "Wählen Sie Ihre Daten und geben Sie an, dass Sie mit einem Haustier reisen: Wir antworten selbst, ohne Vermittler.",
      ctaWhatsapp: "Schreiben Sie uns auf WhatsApp",
      whatsappMessage: "Hallo! Ich möchte mit meinem Haustier im La Mora übernachten.",
      ctaBook: "Jetzt buchen",
    },
  },
};

const KIDS_REDUCTIONS: Record<Locale, { label: string; value: string }[]> = {
  it: [
    { label: "Da 0 a 2 anni", value: "Gratis" },
    { label: "Da 3 a 8 anni non compiuti", value: "Riduzione del 50%" },
    { label: "Da 8 a 11 anni non compiuti", value: "Riduzione del 30%" },
  ],
  en: [
    { label: "Ages 0 to 2", value: "Free" },
    { label: "From 3 to under 8", value: "50% reduction" },
    { label: "From 8 to under 11", value: "30% reduction" },
  ],
  fr: [
    { label: "De 0 à 2 ans", value: "Gratuit" },
    { label: "De 3 ans à moins de 8 ans", value: "Réduction de 50 %" },
    { label: "De 8 ans à moins de 11 ans", value: "Réduction de 30 %" },
  ],
  de: [
    { label: "0 bis 2 Jahre", value: "Kostenlos" },
    { label: "3 bis unter 8 Jahre", value: "50 % Ermäßigung" },
    { label: "8 bis unter 11 Jahre", value: "30 % Ermäßigung" },
  ],
};

export const FAMILY_HUB: Hub = {
  id: "family",
  path: "/vacanza-in-famiglia/",
  topic: "family",
  heroImage: { src: "/images/piscina/foto piscina di giorno.webp" },
  apartments: ["bilancia", "sagittario", "gemelli", "pesci", "acquario"],
  text: {
    it: {
      metaTitle: "Vacanza in famiglia ad Assisi: agriturismo per famiglie",
      metaDescription:
        "Agriturismo per famiglie ad Assisi: appartamenti con cucina fino a 8 ospiti, piscina, parco giochi, culla e riduzioni per i bambini da 0 a 11 anni.",
      heroLabel: "Vacanza in famiglia",
      heroAlt: "La piscina di Agriturismo La Mora in una giornata di sole",
      h1: "Agriturismo per famiglie ad Assisi",
      intro: [
        "Cinque appartamenti indipendenti con cucina, una piscina, il parco giochi e tanto prato: Agriturismo La Mora, nella campagna di Assisi, è pensato anche per chi viaggia con i bambini. Per le famiglie numerose c'è Bilancia, fino a 8 ospiti.",
        "Siamo a 6,8 km da Piazza del Comune (circa 14 minuti in auto): Assisi la mattina, la piscina il pomeriggio, la sera ognuno a casa propria.",
      ],
      offerLabel: "Cosa offriamo",
      offerHeading: "Spazio per giocare, tempo per riposare",
      offers: [
        { icon: "slide", title: "Parco giochi", body: "Altalene, scivoli e giostre: sempre libero, sotto la supervisione degli adulti." },
        { icon: "pool", title: "Piscina", body: "6×12 metri, aperta dal 1° maggio al 28 settembre, dalle 9:00 alle 19:00. Per i bambini fino a 16 anni la cuffia è obbligatoria." },
        { icon: "ball", title: "Calcetto e ping-pong", body: "Un campo da calcetto in erba naturale e il tavolo da ping-pong." },
        { icon: "kitchen", title: "Appartamenti con cucina", body: "Tutti gli appartamenti hanno la cucina attrezzata: pappe e merende come a casa." },
        { icon: "cradle", title: "Culla su richiesta", body: "15 € a soggiorno: segnalala quando prenoti." },
        { icon: "baby", title: "Babysitting su richiesta", body: "Disponibile su richiesta." },
        { icon: "cup", title: "Colazione bio", body: "Ogni mattina dalle 8:00 alle 9:30.", href: "/agriturismo-con-colazione-inclusa-assisi/", linkLabel: "La colazione bio" },
        { icon: "plate", title: "Menù bambini al ristorante", body: "15 € per i bambini da 3 a 10 anni al Ristorante Carfagna, convenzionato con La Mora.", href: "/ristorante-convenzionato/", linkLabel: "Il ristorante convenzionato" },
      ],
      apartmentsLabel: "Gli appartamenti",
      apartmentsHeading: "L'appartamento giusto per la tua famiglia",
      apartmentsBody: "Bilancia ospita fino a 8 persone, Sagittario fino a 6; Gemelli, Pesci e Acquario fino a 4. Tutti indipendenti, con cucina e bagno privato.",
      costsLabel: "Servizi e costi",
      costsHeading: "Riduzioni per i bambini e servizi",
      costs: [
        ...KIDS_REDUCTIONS.it,
        { label: "Culla", value: "15 € a soggiorno", note: "Su richiesta." },
        { label: "Menù bambini (3–10 anni)", value: "15 €", note: "Al Ristorante Carfagna, da concordare con il ristorante.", href: "/ristorante-convenzionato/", linkLabel: "Il ristorante convenzionato" },
      ],
      costsNote: "Indica le età dei bambini quando prenoti.",
      nearbyLabel: "Nei dintorni",
      nearbyHeading: "Cosa fare nei dintorni con i bambini",
      nearbyBody:
        "Dalle attività in agriturismo alle gite di un giorno: i luoghi e gli eventi della zona che abbiamo raccontato, con distanze e consigli pratici.",
      nearbyLinks: [
        { label: "Le attività in agriturismo", href: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
        { label: "Cosa vedere ad Assisi e dintorni", href: "/territorio/" },
        { label: "Le Cascate delle Marmore", href: "/blog/cascate-delle-marmore/" },
        { label: "Rasiglia, la piccola Venezia dell'Umbria", href: "/blog/rasiglia-piccola-venezia-umbria/" },
      ],
      blogLabel: "Dal blog",
      blogHeading: "Idee per la vacanza in famiglia",
      faqLabel: "Domande frequenti",
      faq: [
        {
          question: "Ci sono riduzioni per i bambini?",
          answer: "Sì: da 0 a 2 anni gratis, da 3 a 8 anni non compiuti riduzione del 50%, da 8 a 11 anni non compiuti riduzione del 30%. Indica le età dei bambini quando prenoti.",
        },
        { question: "C'è la culla?", answer: "Sì, su richiesta, a 15 € a soggiorno." },
        { question: "Il parco giochi è sempre aperto?", answer: "Sì, è sempre libero, sotto la supervisione degli adulti." },
        { question: "Serve la cuffia in piscina?", answer: "Sì, per i bambini fino a 16 anni la cuffia è obbligatoria: è una regola della nostra piscina." },
        {
          question: "Dove possiamo mangiare con i bambini?",
          answer: "Al Ristorante Carfagna, ad Assisi, convenzionato con La Mora: il menù bambini (da 3 a 10 anni) costa 15 € e si concorda con il ristorante in base alle esigenze dei bambini.",
        },
      ],
      ctaHeading: "Prenota la vacanza in famiglia",
      ctaBody: "Scegli le date e indica le età dei bambini: ti rispondiamo noi, senza intermediari.",
      ctaWhatsapp: "Scrivici su WhatsApp",
      whatsappMessage: "Ciao! Vorrei informazioni per un soggiorno in famiglia a La Mora.",
      ctaBook: "Prenota ora",
    },
    en: {
      metaTitle: "Family holidays in Assisi: family-friendly agriturismo",
      metaDescription:
        "Family-friendly agriturismo in Assisi: apartments with kitchen for up to 8 guests, pool, playground, cot and reductions for children aged 0 to 11.",
      heroLabel: "Family holidays",
      heroAlt: "Agriturismo La Mora's pool on a sunny day",
      h1: "Family-friendly agriturismo in Assisi",
      intro: [
        "Five independent apartments with kitchen, a pool, the playground and plenty of lawn: Agriturismo La Mora, in the Assisi countryside, is made for travelling with children too. For large families there's Bilancia, for up to 8 guests.",
        "We're 6.8 km from Piazza del Comune (about 14 minutes by car): Assisi in the morning, the pool in the afternoon, and in the evening everyone in their own home.",
      ],
      offerLabel: "What we offer",
      offerHeading: "Space to play, time to rest",
      offers: [
        { icon: "slide", title: "Playground", body: "Swings, slides and roundabouts: always open, under adult supervision." },
        { icon: "pool", title: "Pool", body: "6×12 metres, open from 1 May to 28 September, 9am to 7pm. A swim cap is compulsory for children up to 16." },
        { icon: "ball", title: "Five-a-side and table tennis", body: "A natural-grass five-a-side pitch and a table tennis table." },
        { icon: "kitchen", title: "Apartments with kitchen", body: "Every apartment has an equipped kitchen: meals and snacks just like at home." },
        { icon: "cradle", title: "Cot on request", body: "€15 per stay: let us know when you book." },
        { icon: "baby", title: "Babysitting on request", body: "Available on request." },
        { icon: "cup", title: "Organic breakfast", body: "Every morning from 8:00 to 9:30.", href: "/agriturismo-con-colazione-inclusa-assisi/", linkLabel: "The organic breakfast" },
        { icon: "plate", title: "Children's menu at the restaurant", body: "€15 for children aged 3 to 10 at Ristorante Carfagna, La Mora's partner restaurant.", href: "/ristorante-convenzionato/", linkLabel: "The partner restaurant" },
      ],
      apartmentsLabel: "The apartments",
      apartmentsHeading: "The right apartment for your family",
      apartmentsBody: "Bilancia sleeps up to 8, Sagittario up to 6; Gemelli, Pesci and Acquario up to 4. All independent, with kitchen and private bathroom.",
      costsLabel: "Services and costs",
      costsHeading: "Reductions for children and services",
      costs: [
        ...KIDS_REDUCTIONS.en,
        { label: "Cot", value: "€15 per stay", note: "On request." },
        { label: "Children's menu (ages 3–10)", value: "€15", note: "At Ristorante Carfagna, to be agreed with the restaurant.", href: "/ristorante-convenzionato/", linkLabel: "The partner restaurant" },
      ],
      costsNote: "Tell us the children's ages when you book.",
      nearbyLabel: "Nearby",
      nearbyHeading: "What to do nearby with children",
      nearbyBody: "From activities at the agriturismo to day trips: the places and events in the area we've written about, with distances and practical tips.",
      nearbyLinks: [
        { label: "Activities at the agriturismo", href: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
        { label: "What to see in and around Assisi", href: "/territorio/" },
        { label: "The Marmore Falls", href: "/blog/cascate-delle-marmore/" },
        { label: "Rasiglia, the little Venice of Umbria", href: "/blog/rasiglia-piccola-venezia-umbria/" },
      ],
      blogLabel: "From the blog",
      blogHeading: "Ideas for your family holiday",
      faqLabel: "Frequently asked questions",
      faq: [
        {
          question: "Are there reductions for children?",
          answer: "Yes: ages 0 to 2 free, from 3 to under 8 a 50% reduction, from 8 to under 11 a 30% reduction. Tell us the children's ages when you book.",
        },
        { question: "Is there a cot?", answer: "Yes, on request, for €15 per stay." },
        { question: "Is the playground always open?", answer: "Yes, it's always open, under adult supervision." },
        { question: "Is a swim cap needed in the pool?", answer: "Yes, a swim cap is compulsory for children up to 16: it's one of our pool rules." },
        {
          question: "Where can we eat with the children?",
          answer: "At Ristorante Carfagna in Assisi, La Mora's partner restaurant: the children's menu (ages 3 to 10) costs €15 and is agreed with the restaurant according to the children's needs.",
        },
      ],
      ctaHeading: "Book your family holiday",
      ctaBody: "Choose your dates and tell us the children's ages: we reply ourselves, with no middlemen.",
      ctaWhatsapp: "Message us on WhatsApp",
      whatsappMessage: "Hi! I'd like some information about a family stay at La Mora.",
      ctaBook: "Book now",
    },
    fr: {
      metaTitle: "Vacances en famille à Assise : agritourisme pour familles",
      metaDescription:
        "Agritourisme pour familles à Assise : appartements avec cuisine jusqu'à 8 personnes, piscine, aire de jeux, lit bébé et réductions pour les enfants de 0 à 11 ans.",
      heroLabel: "Vacances en famille",
      heroAlt: "La piscine de l'Agriturismo La Mora par une journée ensoleillée",
      h1: "Agritourisme pour familles à Assise",
      intro: [
        "Cinq appartements indépendants avec cuisine, une piscine, l'aire de jeux et beaucoup de pelouse : l'Agriturismo La Mora, dans la campagne d'Assise, est aussi pensé pour ceux qui voyagent avec des enfants. Pour les familles nombreuses, il y a Bilancia, jusqu'à 8 personnes.",
        "Nous sommes à 6,8 km de la Piazza del Comune (environ 14 minutes en voiture) : Assise le matin, la piscine l'après-midi, et le soir chacun chez soi.",
      ],
      offerLabel: "Ce que nous proposons",
      offerHeading: "De l'espace pour jouer, du temps pour se reposer",
      offers: [
        { icon: "slide", title: "Aire de jeux", body: "Balançoires, toboggans et manèges : toujours accessible, sous la surveillance des adultes." },
        { icon: "pool", title: "Piscine", body: "6×12 mètres, ouverte du 1er mai au 28 septembre, de 9 h à 19 h. Le bonnet de bain est obligatoire pour les enfants jusqu'à 16 ans." },
        { icon: "ball", title: "Foot à cinq et ping-pong", body: "Un terrain de foot à cinq en gazon naturel et une table de ping-pong." },
        { icon: "kitchen", title: "Appartements avec cuisine", body: "Tous les appartements ont une cuisine équipée : repas et goûters comme à la maison." },
        { icon: "cradle", title: "Lit bébé sur demande", body: "15 € par séjour : signalez-le lors de la réservation." },
        { icon: "baby", title: "Baby-sitting sur demande", body: "Disponible sur demande." },
        { icon: "cup", title: "Petit-déjeuner bio", body: "Chaque matin de 8 h à 9 h 30.", href: "/agriturismo-con-colazione-inclusa-assisi/", linkLabel: "Le petit-déjeuner bio" },
        { icon: "plate", title: "Menu enfants au restaurant", body: "15 € pour les enfants de 3 à 10 ans au Ristorante Carfagna, partenaire de La Mora.", href: "/ristorante-convenzionato/", linkLabel: "Le restaurant partenaire" },
      ],
      apartmentsLabel: "Les appartements",
      apartmentsHeading: "L'appartement qu'il faut à votre famille",
      apartmentsBody: "Bilancia accueille jusqu'à 8 personnes, Sagittario jusqu'à 6 ; Gemelli, Pesci et Acquario jusqu'à 4. Tous indépendants, avec cuisine et salle de bain privée.",
      costsLabel: "Services et coûts",
      costsHeading: "Réductions pour les enfants et services",
      costs: [
        ...KIDS_REDUCTIONS.fr,
        { label: "Lit bébé", value: "15 € par séjour", note: "Sur demande." },
        { label: "Menu enfants (3–10 ans)", value: "15 €", note: "Au Ristorante Carfagna, à convenir avec le restaurant.", href: "/ristorante-convenzionato/", linkLabel: "Le restaurant partenaire" },
      ],
      costsNote: "Indiquez l'âge des enfants lors de la réservation.",
      nearbyLabel: "Aux alentours",
      nearbyHeading: "Que faire aux alentours avec les enfants",
      nearbyBody: "Des activités à l'agritourisme aux excursions d'une journée : les lieux et les événements de la région que nous avons racontés, avec distances et conseils pratiques.",
      nearbyLinks: [
        { label: "Les activités à l'agritourisme", href: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
        { label: "Que voir à Assise et aux alentours", href: "/territorio/" },
        { label: "Les Cascate delle Marmore", href: "/blog/cascate-delle-marmore/" },
        { label: "Rasiglia, la petite Venise de l'Ombrie", href: "/blog/rasiglia-piccola-venezia-umbria/" },
      ],
      blogLabel: "Sur le blog",
      blogHeading: "Des idées pour les vacances en famille",
      faqLabel: "Questions fréquentes",
      faq: [
        {
          question: "Y a-t-il des réductions pour les enfants ?",
          answer: "Oui : de 0 à 2 ans gratuit, de 3 ans à moins de 8 ans réduction de 50 %, de 8 ans à moins de 11 ans réduction de 30 %. Indiquez l'âge des enfants lors de la réservation.",
        },
        { question: "Y a-t-il un lit bébé ?", answer: "Oui, sur demande, à 15 € par séjour." },
        { question: "L'aire de jeux est-elle toujours ouverte ?", answer: "Oui, elle est toujours accessible, sous la surveillance des adultes." },
        { question: "Le bonnet de bain est-il obligatoire à la piscine ?", answer: "Oui, pour les enfants jusqu'à 16 ans le bonnet de bain est obligatoire : c'est une règle de notre piscine." },
        {
          question: "Où manger avec les enfants ?",
          answer: "Au Ristorante Carfagna, à Assise, partenaire de La Mora : le menu enfants (de 3 à 10 ans) coûte 15 € et se convient avec le restaurant selon les besoins des enfants.",
        },
      ],
      ctaHeading: "Réservez vos vacances en famille",
      ctaBody: "Choisissez vos dates et indiquez l'âge des enfants : c'est nous qui répondons, sans intermédiaire.",
      ctaWhatsapp: "Écrivez-nous sur WhatsApp",
      whatsappMessage: "Bonjour ! J'aimerais des informations pour un séjour en famille à La Mora.",
      ctaBook: "Réserver",
    },
    de: {
      metaTitle: "Familienurlaub in Assisi: familienfreundlicher Agriturismo",
      metaDescription:
        "Familienfreundlicher Agriturismo in Assisi: Apartments mit Küche für bis zu 8 Gäste, Pool, Spielplatz, Babybett und Ermäßigungen für Kinder von 0 bis 11 Jahren.",
      heroLabel: "Familienurlaub",
      heroAlt: "Der Pool des Agriturismo La Mora an einem sonnigen Tag",
      h1: "Familienfreundlicher Agriturismo in Assisi",
      intro: [
        "Fünf unabhängige Apartments mit Küche, ein Pool, der Spielplatz und viel Wiese: Das Agriturismo La Mora in der Landschaft von Assisi ist auch für Reisen mit Kindern gemacht. Für große Familien gibt es Bilancia, für bis zu 8 Gäste.",
        "Wir liegen 6,8 km von der Piazza del Comune entfernt (rund 14 Minuten mit dem Auto): morgens Assisi, nachmittags der Pool, abends jeder in seinem eigenen Zuhause.",
      ],
      offerLabel: "Was wir bieten",
      offerHeading: "Platz zum Spielen, Zeit zum Ausruhen",
      offers: [
        { icon: "slide", title: "Spielplatz", body: "Schaukeln, Rutschen und Karussells: immer offen, unter Aufsicht der Erwachsenen." },
        { icon: "pool", title: "Pool", body: "6×12 Meter, geöffnet vom 1. Mai bis 28. September, 9 bis 19 Uhr. Für Kinder bis 16 Jahre ist eine Badekappe Pflicht." },
        { icon: "ball", title: "Fußball und Tischtennis", body: "Ein Fünf-gegen-fünf-Feld aus Naturrasen und eine Tischtennisplatte." },
        { icon: "kitchen", title: "Apartments mit Küche", body: "Alle Apartments haben eine ausgestattete Küche: Mahlzeiten und Snacks wie zu Hause." },
        { icon: "cradle", title: "Babybett auf Anfrage", body: "15 € pro Aufenthalt: bitte bei der Buchung angeben." },
        { icon: "baby", title: "Babysitting auf Anfrage", body: "Auf Anfrage verfügbar." },
        { icon: "cup", title: "Bio-Frühstück", body: "Jeden Morgen von 8:00 bis 9:30 Uhr.", href: "/agriturismo-con-colazione-inclusa-assisi/", linkLabel: "Das Bio-Frühstück" },
        { icon: "plate", title: "Kindermenü im Restaurant", body: "15 € für Kinder von 3 bis 10 Jahren im Ristorante Carfagna, dem Partnerrestaurant von La Mora.", href: "/ristorante-convenzionato/", linkLabel: "Das Partnerrestaurant" },
      ],
      apartmentsLabel: "Die Apartments",
      apartmentsHeading: "Das passende Apartment für Ihre Familie",
      apartmentsBody: "Bilancia bietet Platz für bis zu 8 Personen, Sagittario für bis zu 6; Gemelli, Pesci und Acquario für bis zu 4. Alle unabhängig, mit Küche und eigenem Bad.",
      costsLabel: "Leistungen und Kosten",
      costsHeading: "Ermäßigungen für Kinder und Leistungen",
      costs: [
        ...KIDS_REDUCTIONS.de,
        { label: "Babybett", value: "15 € pro Aufenthalt", note: "Auf Anfrage." },
        { label: "Kindermenü (3–10 Jahre)", value: "15 €", note: "Im Ristorante Carfagna, mit dem Restaurant abzustimmen.", href: "/ristorante-convenzionato/", linkLabel: "Das Partnerrestaurant" },
      ],
      costsNote: "Geben Sie bei der Buchung das Alter der Kinder an.",
      nearbyLabel: "In der Umgebung",
      nearbyHeading: "Was man mit Kindern in der Umgebung unternehmen kann",
      nearbyBody: "Von den Aktivitäten im Agriturismo bis zu Tagesausflügen: die Orte und Veranstaltungen der Gegend, über die wir geschrieben haben, mit Entfernungen und praktischen Tipps.",
      nearbyLinks: [
        { label: "Die Aktivitäten im Agriturismo", href: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
        { label: "Sehenswertes in und um Assisi", href: "/territorio/" },
        { label: "Die Wasserfälle von Marmore", href: "/blog/cascate-delle-marmore/" },
        { label: "Rasiglia, das kleine Venedig Umbriens", href: "/blog/rasiglia-piccola-venezia-umbria/" },
      ],
      blogLabel: "Aus dem Blog",
      blogHeading: "Ideen für den Familienurlaub",
      faqLabel: "Häufige Fragen",
      faq: [
        {
          question: "Gibt es Ermäßigungen für Kinder?",
          answer: "Ja: 0 bis 2 Jahre kostenlos, 3 bis unter 8 Jahre 50 % Ermäßigung, 8 bis unter 11 Jahre 30 % Ermäßigung. Geben Sie bei der Buchung das Alter der Kinder an.",
        },
        { question: "Gibt es ein Babybett?", answer: "Ja, auf Anfrage, für 15 € pro Aufenthalt." },
        { question: "Ist der Spielplatz immer offen?", answer: "Ja, er ist immer offen, unter Aufsicht der Erwachsenen." },
        { question: "Braucht man im Pool eine Badekappe?", answer: "Ja, für Kinder bis 16 Jahre ist eine Badekappe Pflicht: Das ist eine Regel unseres Pools." },
        {
          question: "Wo können wir mit den Kindern essen?",
          answer: "Im Ristorante Carfagna in Assisi, dem Partnerrestaurant von La Mora: Das Kindermenü (3 bis 10 Jahre) kostet 15 € und wird mit dem Restaurant nach den Bedürfnissen der Kinder abgestimmt.",
        },
      ],
      ctaHeading: "Buchen Sie Ihren Familienurlaub",
      ctaBody: "Wählen Sie Ihre Daten und geben Sie das Alter der Kinder an: Wir antworten selbst, ohne Vermittler.",
      ctaWhatsapp: "Schreiben Sie uns auf WhatsApp",
      whatsappMessage: "Hallo! Ich hätte gerne Informationen zu einem Familienaufenthalt im La Mora.",
      ctaBook: "Jetzt buchen",
    },
  },
};

export const HUBS: Record<HubId, Hub> = { pets: PETS_HUB, family: FAMILY_HUB };
