import type { Locale } from "@/lib/i18n";
import type { BlogPost, ContentBlock } from "@/data/blog-posts";
import { TRASIMENO_VELE_PHOTO, type CreditedPhoto } from "@/data/photo-credits";

/* Cluster "animali" e "famiglie" del blog (ottobre 2026): sei articoli in
   4 lingue, stesso slug nelle quattro. Le pagine hub /vacanza-con-animali/
   e /vacanza-in-famiglia/ li elencano da sole tramite `topics`; Territorio
   li raggruppa per tema (territorio-page-view.tsx).

   Fatti di La Mora SOLO da PROJECT-BRIEF.md (sezioni 2, 3, 4-bis, 4-ter):
   animali ammessi in Gemelli e Sagittario, al piano terra con giardino
   privato (mai "recintato"), 25 € a soggiorno, guinzaglio nelle aree
   comuni, taglia e tipo nel modulo; parco giochi sempre libero sotto la
   supervisione degli adulti; piscina 6×12 m dal 1° maggio al 28 settembre,
   9:00–19:00, cuffia obbligatoria per i bambini fino a 16 anni; riduzioni
   0–2 anni gratis, 3–8 non compiuti 50%, 8–11 non compiuti 30% (senza dire
   su quale voce né che il motore le calcola); culla 15 € a soggiorno;
   niente seggioloni; menù bambini 15 € (3–10 anni) al Ristorante Carfagna;
   tassa di soggiorno 3 € a persona al giorno per i primi 3 giorni, esenti
   i minori di 12 anni.
   Distanze in auto da La Mora: src/data/places.ts e blog-ctas.ts (Google
   Maps). Fatti esterni: fonti ufficiali indicate articolo per articolo,
   verificate il 21/10/2026 ("Ultima verifica" in fondo a ogni articolo).
   Foto: solo nostre (appartamenti, parco giochi, territorio) o Wikimedia
   con credito; nessuna foto di cani o bambini di terzi. */

const CHECKED: Record<Locale, string> = {
  it: "Ultima verifica: 21 ottobre 2026. Orari, prezzi e regole dei luoghi citati possono cambiare: prima di partire controlla sempre i siti ufficiali.",
  en: "Last checked: 21 October 2026. Opening times, prices and rules of the places mentioned can change: always check the official websites before you go.",
  fr: "Dernière vérification : 21 octobre 2026. Les horaires, les prix et les règles des lieux cités peuvent changer : vérifiez toujours les sites officiels avant de partir.",
  de: "Zuletzt geprüft: 21. Oktober 2026. Öffnungszeiten, Preise und Regeln der genannten Orte können sich ändern: Prüfen Sie vor der Abreise immer die offiziellen Websites.",
};

const SAGITTARIO_GAZEBO = "/images/alloggi/appartamento sagittario/gazebo sagittario 1.jpeg";
const GEMELLI_GIARDINO = "/images/alloggi/appartamento gemelli/area cani appartamento gemelli esterno .jpg";
const PARCO_GIOCHI = "/images/piscina/parco giochi agriturismo ad assisi.jpeg";
const PISCINA = "/images/piscina/foto piscina di giorno.webp";
const PUBLISHED = "2026-10-21";

/* Foto con licenza (photo-credits.ts): alt, didascalia e credito insieme,
   come credited() in blog-posts.ts. */
function credited(p: CreditedPhoto, l: Locale): ContentBlock {
  return { type: "image", src: p.src, alt: p.alt[l], caption: p.caption[l], credit: p.credit };
}

/* "Agriturismo pet friendly in Umbria: cosa chiedere prima di prenotare".
   Checklist con i soli fatti di La Mora del brief; nessuna norma esterna
   citata (consigli generici). */
export const PET_FRIENDLY_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "agriturismo-pet-friendly-umbria",
    topics: ["pets"],
    category: "Con il cane",
    title: "Agriturismo pet friendly in Umbria: cosa chiedere prima di prenotare",
    excerpt:
      "Le domande da fare prima di prenotare un agriturismo con il cane in Umbria: alloggio, spazio all'aperto, supplemento, regole e cosa mettere in valigia. Con le risposte di La Mora.",
    metaDescription:
      "Agriturismo pet friendly in Umbria: cosa chiedere prima di prenotare con il cane. A La Mora Gemelli e Sagittario, con giardino privato, 25 € a soggiorno.",
    image: SAGITTARIO_GAZEBO,
    alt: "Il giardino privato dell'appartamento Sagittario, con il gazebo e il prato davanti alla casa in pietra",
    imagePosition: "50% 60%",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Appartamenti pet friendly", value: "Gemelli e Sagittario" },
        { label: "Dove", value: "al piano terra, ciascuno con giardino privato" },
        { label: "Supplemento", value: "25 € a soggiorno, non a notte" },
        { label: "Nelle aree comuni", value: "animali al guinzaglio" },
        { label: "Quando prenoti", value: "indica taglia e tipo di animale" },
        { label: "Centro di Assisi", value: "6,8 km · circa 14 min in auto" },
      ],
    },
    intro:
      "«Pet friendly» è un'etichetta che dice poco: tra un agriturismo che accetta gli animali e uno dove il tuo cane sta bene davvero ci sono alcune domande da fare prima di prenotare. Ecco la lista che useremmo noi, una domanda alla volta, con le risposte di Agriturismo La Mora, nella campagna di Assisi.",
    content: [
      { type: "h2", text: "Quali alloggi accettano animali?" },
      {
        type: "p",
        text: "«Animali ammessi» non sempre vale per tutta la struttura: spesso gli animali sono accettati solo in alcune camere o in alcuni appartamenti, e scoprirlo a prenotazione fatta significa cambiare piani all'ultimo. Chiedilo prima di scegliere le date, insieme al numero di animali che porti con te.",
      },
      {
        type: "p",
        text: "A La Mora gli appartamenti pet friendly sono due, Gemelli e Sagittario. Gemelli ospita fino a 4 persone, Sagittario fino a 6: entrambi sono indipendenti, con cucina e bagno privato, e si trovano al piano terra, così si esce in giardino senza scale.",
      },
      { type: "h2", text: "Com'è lo spazio all'aperto?" },
      {
        type: "p",
        text: "Per un cane la differenza la fa l'esterno: un prato dove uscire la mattina presto, un angolo all'ombra nelle ore calde, la possibilità di stare vicino a te mentre leggi o pranzi fuori. Chiedi se lo spazio esterno è privato o condiviso con gli altri ospiti e com'è fatto: ogni giardino è diverso, e se il tuo cane tende ad allontanarsi è meglio saperlo prima di partire.",
      },
      {
        type: "p",
        text: "Gemelli e Sagittario hanno ciascuno il proprio giardino privato; quello di Sagittario ha anche un gazebo. Intorno c'è la campagna di Assisi, con il prato, il parco giochi e la piscina dell'agriturismo.",
      },
      {
        type: "image",
        src: GEMELLI_GIARDINO,
        alt: "Il giardino privato dell'appartamento Gemelli, con un cagnolino sul prato",
        caption: "Il giardino privato di Gemelli.",
      },
      { type: "h2", text: "Quanto costa portare il cane?" },
      {
        type: "p",
        text: "Il supplemento per gli animali cambia molto da una struttura all'altra: c'è chi lo calcola a notte, chi a soggiorno, chi aggiunge altre voci. Fatti dire l'importo totale per il tuo soggiorno: solo così confronti prezzi davvero comparabili.",
      },
      {
        type: "p",
        text: "A La Mora il supplemento è di 25 € a soggiorno, non a notte: per un fine settimana o per una settimana intera la cifra resta la stessa.",
      },
      { type: "h2", text: "Ci sono limiti di taglia o di tipo?" },
      {
        type: "p",
        text: "Alcune strutture accettano solo cani di piccola taglia, altre escludono certi animali. Meglio chiarirlo subito, descrivendo il tuo: taglia, tipo, abitudini, se è abituato a dormire in un posto nuovo.",
      },
      {
        type: "p",
        text: "Nel modulo di richiesta di La Mora c'è la voce «Viaggio con animali», dove indichi taglia e tipo di animale; segnalalo anche quando prenoti. Se hai un dubbio, scrivi a Paolo su WhatsApp prima di confermare.",
      },
      { type: "h2", text: "Quali regole valgono nella struttura?" },
      {
        type: "p",
        text: "Ogni agriturismo ha le sue regole per gli animali nelle aree comuni: guinzaglio, zone dove non possono entrare, momenti della giornata da rispettare. Chiedile prima, soprattutto se il tuo cane non è abituato a stare vicino ad altre persone o ad altri animali, e chiedi se ci sono spazi vietati agli animali, come la piscina.",
      },
      {
        type: "p",
        text: "A La Mora, nelle aree comuni della struttura, gli animali vanno tenuti al guinzaglio: è la regola che permette a tutti, ospiti con o senza cane, bambini compresi, di godersi la campagna in tranquillità.",
      },
      { type: "h2", text: "Cosa c'è intorno per le passeggiate?" },
      {
        type: "p",
        text: "Un agriturismo pet friendly vale anche per le passeggiate che ha intorno. La Mora è nella campagna di Assisi: il centro storico è a 6,8 km, circa 14 minuti in auto, e l'Eremo delle Carceri, da cui partono i sentieri del Monte Subasio, a 12,2 km. Nelle nostre guide trovi come visitare Assisi con il cane e un'uscita di un giorno nei dintorni, con le regole dei luoghi.",
      },
      { type: "h2", text: "Cosa mettere in valigia" },
      {
        type: "list",
        items: [
          "i documenti sanitari dell'animale; se arrivi dall'estero, informati prima sulle regole per entrare in Italia con un animale;",
          "il guinzaglio, e la museruola da tenere con te dove è richiesta;",
          "ciotole, il cibo di sempre e la sua coperta o cuccia: in un posto nuovo, un odore familiare aiuta;",
          "sacchetti per raccogliere i bisogni, in passeggiata e in giardino;",
          "un asciugamano per le zampe dopo le passeggiate in campagna;",
          "il numero del tuo veterinario e una foto recente del cane, sempre sul telefono.",
        ],
      },
      { type: "h2", text: "Prenotare a La Mora con il cane" },
      {
        type: "p",
        text: "Se le risposte ti convincono, scegli Gemelli o Sagittario, indica taglia e tipo di animale quando prenoti e scrivici se hai domande. Tutte le informazioni per chi viaggia con un animale sono anche nella pagina Vacanza con animali.",
      },
      {
        type: "links",
        heading: "Per organizzare la vacanza",
        items: [
          { label: "Vacanza con animali a La Mora", href: "/vacanza-con-animali/" },
          { label: "L'appartamento Gemelli", href: "/alloggi/gemelli/" },
          { label: "L'appartamento Sagittario", href: "/alloggi/sagittario/" },
          { label: "Assisi con il cane: guida pratica", href: "/blog/assisi-con-il-cane/" },
          { label: "Cascata delle Marmore con il cane", href: "/blog/cascata-delle-marmore-con-il-cane/" },
          { label: "Cosa vedere intorno a La Mora", href: "/territorio/" },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti sul soggiorno con il cane",
      items: [
        { q: "Quali appartamenti di La Mora accettano animali?", a: "Gemelli e Sagittario, al piano terra, ciascuno con il proprio giardino privato." },
        { q: "Quanto costa portare il cane a La Mora?", a: "Il supplemento è di 25 € a soggiorno, non a notte." },
        { q: "Gli animali devono stare al guinzaglio?", a: "Sì, nelle aree comuni della struttura." },
        { q: "Come segnalo che viaggio con il cane?", a: "Quando prenoti o nel modulo di richiesta, alla voce «Viaggio con animali», indicando taglia e tipo di animale." },
        { q: "Quanto dista La Mora dal centro di Assisi?", a: "Piazza del Comune è a 6,8 km, circa 14 minuti in auto secondo Google Maps." },
      ],
    },
    disclaimer: CHECKED.it,
    finalCtaHeading: "In vacanza con il cane, nella campagna di Assisi.",
    finalCtaBody: "Gemelli e Sagittario, al piano terra con giardino privato.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "agriturismo-pet-friendly-umbria",
    topics: ["pets"],
    category: "With your dog",
    title: "Pet-friendly agriturismo in Umbria: what to ask before you book",
    excerpt:
      "The questions to ask before booking an agriturismo in Umbria with your dog: accommodation, outdoor space, supplement, rules and what to pack. With La Mora's answers.",
    metaDescription:
      "Pet-friendly agriturismo in Umbria: what to ask before booking with your dog. At La Mora, Gemelli and Sagittario have a private garden; €25 per stay.",
    image: SAGITTARIO_GAZEBO,
    alt: "The private garden of the Sagittario apartment, with the gazebo and the lawn in front of the stone house",
    imagePosition: "50% 60%",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Pet-friendly apartments", value: "Gemelli and Sagittario" },
        { label: "Where", value: "on the ground floor, each with a private garden" },
        { label: "Supplement", value: "€25 per stay, not per night" },
        { label: "In shared areas", value: "pets on a lead" },
        { label: "When you book", value: "state your pet's size and type" },
        { label: "Centre of Assisi", value: "6.8 km · about 14 min by car" },
      ],
    },
    intro:
      "'Pet friendly' is a label that says very little: between an agriturismo that accepts animals and one where your dog is truly happy, there are a few questions worth asking before you book. Here is the list we would use ourselves, one question at a time, with the answers from Agriturismo La Mora, in the countryside of Assisi.",
    content: [
      { type: "h2", text: "Which accommodation accepts pets?" },
      {
        type: "p",
        text: "'Pets allowed' does not always apply to the whole property: animals are often accepted only in some rooms or apartments, and finding out after booking means changing plans at the last minute. Ask before choosing your dates, and say how many animals are coming with you.",
      },
      {
        type: "p",
        text: "At La Mora there are two pet-friendly apartments, Gemelli and Sagittario. Gemelli sleeps up to 4 people, Sagittario up to 6: both are independent, with a kitchen and private bathroom, and both are on the ground floor, so you step out into the garden without any stairs.",
      },
      { type: "h2", text: "What is the outdoor space like?" },
      {
        type: "p",
        text: "For a dog, the outdoors makes all the difference: a lawn for the early-morning walk, a shady corner in the hottest hours, the chance to lie next to you while you read or eat outside. Ask whether the outdoor space is private or shared with other guests, and what it is like: every garden is different, and if your dog tends to wander off it is better to know before you leave.",
      },
      {
        type: "p",
        text: "Gemelli and Sagittario each have their own private garden; Sagittario's also has a gazebo. All around is the Assisi countryside, with the agriturismo's lawn, playground and pool.",
      },
      {
        type: "image",
        src: GEMELLI_GIARDINO,
        alt: "The private garden of the Gemelli apartment, with a little dog on the lawn",
        caption: "Gemelli's private garden.",
      },
      { type: "h2", text: "How much does it cost to bring your dog?" },
      {
        type: "p",
        text: "Pet supplements vary a lot from one place to another: some charge per night, some per stay, some add other items. Ask for the total amount for your stay: it is the only way to compare prices that are genuinely comparable.",
      },
      {
        type: "p",
        text: "At La Mora the supplement is €25 per stay, not per night: whether you come for a weekend or a whole week, the amount stays the same.",
      },
      { type: "h2", text: "Are there limits on size or type?" },
      {
        type: "p",
        text: "Some places only accept small dogs, others exclude certain animals. It is best to clear this up straight away by describing yours: size, type, habits, and whether it is used to sleeping somewhere new.",
      },
      {
        type: "p",
        text: "La Mora's enquiry form has a 'Travelling with pets' option, where you state your animal's size and type; mention it when you book, too. If in doubt, message Paolo on WhatsApp before confirming.",
      },
      { type: "h2", text: "What rules apply on the property?" },
      {
        type: "p",
        text: "Every agriturismo has its own rules for animals in shared areas: leads, places they cannot go, times of day to respect. Ask about them beforehand, especially if your dog is not used to being near other people or animals, and ask whether any areas are off-limits to animals, such as the pool.",
      },
      {
        type: "p",
        text: "At La Mora, pets must be kept on a lead in the shared areas of the property: it is the rule that lets everyone, guests with or without a dog, children included, enjoy the countryside in peace.",
      },
      { type: "h2", text: "Where can you walk nearby?" },
      {
        type: "p",
        text: "A pet-friendly agriturismo is also worth the walks around it. La Mora is in the countryside of Assisi: the historic centre is 6.8 km away, about 14 minutes by car, and the Eremo delle Carceri, where the trails of Monte Subasio begin, 12.2 km. In our guides you will find how to visit Assisi with your dog and a day out nearby, with the rules of each place.",
      },
      { type: "h2", text: "What to pack" },
      {
        type: "list",
        items: [
          "your pet's health documents; if you are coming from abroad, check the rules for entering Italy with an animal in advance;",
          "the lead, and a muzzle to carry where one is required;",
          "bowls, the usual food and its blanket or bed: somewhere new, a familiar smell helps;",
          "bags to pick up after your dog, on walks and in the garden;",
          "a towel for its paws after countryside walks;",
          "your vet's number and a recent photo of your dog, always on your phone.",
        ],
      },
      { type: "h2", text: "Booking La Mora with your dog" },
      {
        type: "p",
        text: "If the answers convince you, choose Gemelli or Sagittario, state your pet's size and type when you book, and message us with any questions. Everything you need to know about travelling with an animal is also on our Holidays with pets page.",
      },
      {
        type: "links",
        heading: "Plan your stay",
        items: [
          { label: "Holidays with pets at La Mora", href: "/vacanza-con-animali/" },
          { label: "The Gemelli apartment", href: "/alloggi/gemelli/" },
          { label: "The Sagittario apartment", href: "/alloggi/sagittario/" },
          { label: "Assisi with your dog: a practical guide", href: "/blog/assisi-con-il-cane/" },
          { label: "Marmore Falls with your dog", href: "/blog/cascata-delle-marmore-con-il-cane/" },
          { label: "What to see around La Mora", href: "/territorio/" },
        ],
      },
    ],
    faq: {
      heading: "Frequently asked questions about staying with your dog",
      items: [
        { q: "Which La Mora apartments accept pets?", a: "Gemelli and Sagittario, on the ground floor, each with its own private garden." },
        { q: "How much does it cost to bring a dog to La Mora?", a: "The supplement is €25 per stay, not per night." },
        { q: "Do pets have to be kept on a lead?", a: "Yes, in the shared areas of the property." },
        { q: "How do I tell you I'm travelling with my dog?", a: "When you book or in the enquiry form, under 'Travelling with pets', stating your animal's size and type." },
        { q: "How far is La Mora from the centre of Assisi?", a: "Piazza del Comune is 6.8 km away, about 14 minutes by car according to Google Maps." },
      ],
    },
    disclaimer: CHECKED.en,
    finalCtaHeading: "A holiday with your dog, in the Assisi countryside.",
    finalCtaBody: "Gemelli and Sagittario, on the ground floor with a private garden.",
    finalCtaLabel: "See the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "agriturismo-pet-friendly-umbria",
    topics: ["pets"],
    category: "Avec son chien",
    title: "Agritourisme qui accepte les chiens en Ombrie : que demander avant de réserver",
    excerpt:
      "Les questions à poser avant de réserver un agritourisme en Ombrie avec son chien : logement, espace extérieur, supplément, règles et valise. Avec les réponses de La Mora.",
    metaDescription:
      "Agritourisme qui accepte les chiens en Ombrie : que demander avant de réserver. À La Mora, Gemelli et Sagittario avec jardin privé, 25 € par séjour.",
    image: SAGITTARIO_GAZEBO,
    alt: "Le jardin privé de l'appartement Sagittario, avec le gazebo et la pelouse devant la maison en pierre",
    imagePosition: "50% 60%",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "Appartements qui acceptent les animaux", value: "Gemelli et Sagittario" },
        { label: "Où", value: "au rez-de-chaussée, chacun avec jardin privé" },
        { label: "Supplément", value: "25 € par séjour, et non par nuit" },
        { label: "Dans les espaces communs", value: "animaux tenus en laisse" },
        { label: "À la réservation", value: "indiquez la taille et le type d'animal" },
        { label: "Centre d'Assise", value: "6,8 km · environ 14 min en voiture" },
      ],
    },
    intro:
      "« Animaux acceptés » ne dit pas grand-chose : entre un agritourisme qui accepte les animaux et un lieu où votre chien se sent vraiment bien, il y a quelques questions à poser avant de réserver. Voici la liste que nous utiliserions nous-mêmes, une question à la fois, avec les réponses de l'Agriturismo La Mora, dans la campagne d'Assise.",
    content: [
      { type: "h2", text: "Quels logements acceptent les animaux ?" },
      {
        type: "p",
        text: "« Animaux acceptés » ne vaut pas toujours pour toute la structure : souvent, les animaux ne sont admis que dans certaines chambres ou certains appartements, et le découvrir après la réservation oblige à changer ses plans au dernier moment. Demandez-le avant de choisir vos dates, en précisant combien d'animaux vous accompagnent.",
      },
      {
        type: "p",
        text: "À La Mora, deux appartements accueillent les animaux : Gemelli et Sagittario. Gemelli reçoit jusqu'à 4 personnes, Sagittario jusqu'à 6 : tous deux sont indépendants, avec cuisine et salle de bains privée, et se trouvent au rez-de-chaussée, pour sortir au jardin sans escalier.",
      },
      { type: "h2", text: "À quoi ressemble l'espace extérieur ?" },
      {
        type: "p",
        text: "Pour un chien, c'est l'extérieur qui fait la différence : une pelouse pour la sortie du petit matin, un coin d'ombre aux heures chaudes, la possibilité de rester près de vous pendant que vous lisez ou déjeunez dehors. Demandez si l'espace extérieur est privé ou partagé avec les autres hôtes, et comment il est conçu : chaque jardin est différent, et si votre chien a tendance à s'éloigner, mieux vaut le savoir avant de partir.",
      },
      {
        type: "p",
        text: "Gemelli et Sagittario ont chacun leur jardin privé ; celui de Sagittario a aussi un gazebo. Tout autour, la campagne d'Assise, avec la pelouse, l'aire de jeux et la piscine de l'agritourisme.",
      },
      {
        type: "image",
        src: GEMELLI_GIARDINO,
        alt: "Le jardin privé de l'appartement Gemelli, avec un petit chien sur la pelouse",
        caption: "Le jardin privé de Gemelli.",
      },
      { type: "h2", text: "Combien coûte la venue du chien ?" },
      {
        type: "p",
        text: "Le supplément pour les animaux varie beaucoup d'une structure à l'autre : certains le calculent par nuit, d'autres par séjour, d'autres encore ajoutent des frais. Demandez le montant total pour votre séjour : c'est la seule façon de comparer des prix vraiment comparables.",
      },
      {
        type: "p",
        text: "À La Mora, le supplément est de 25 € par séjour, et non par nuit : pour un week-end comme pour une semaine entière, le montant reste le même.",
      },
      { type: "h2", text: "Y a-t-il des limites de taille ou de type ?" },
      {
        type: "p",
        text: "Certaines structures n'acceptent que les chiens de petite taille, d'autres excluent certains animaux. Mieux vaut le clarifier tout de suite en décrivant le vôtre : taille, type, habitudes, et s'il a l'habitude de dormir dans un lieu nouveau.",
      },
      {
        type: "p",
        text: "Le formulaire de demande de La Mora comporte la rubrique « Je voyage avec des animaux », où vous indiquez la taille et le type de votre animal ; signalez-le aussi lors de la réservation. En cas de doute, écrivez à Paolo sur WhatsApp avant de confirmer.",
      },
      { type: "h2", text: "Quelles règles s'appliquent dans la structure ?" },
      {
        type: "p",
        text: "Chaque agritourisme a ses règles pour les animaux dans les espaces communs : laisse, zones interdites, moments de la journée à respecter. Renseignez-vous avant, surtout si votre chien n'a pas l'habitude d'être près d'autres personnes ou d'autres animaux, et demandez si certains espaces leur sont interdits, comme la piscine.",
      },
      {
        type: "p",
        text: "À La Mora, dans les espaces communs de la structure, les animaux doivent être tenus en laisse : c'est la règle qui permet à tous, hôtes avec ou sans chien, enfants compris, de profiter de la campagne en toute tranquillité.",
      },
      { type: "h2", text: "Où se promener aux alentours ?" },
      {
        type: "p",
        text: "Un agritourisme qui accepte les chiens vaut aussi par les promenades qui l'entourent. La Mora se trouve dans la campagne d'Assise : le centre historique est à 6,8 km, environ 14 minutes en voiture, et l'Eremo delle Carceri, d'où partent les sentiers du Monte Subasio, à 12,2 km. Dans nos guides, vous trouverez comment visiter Assise avec votre chien et une sortie d'une journée aux alentours, avec les règles de chaque lieu.",
      },
      { type: "h2", text: "Que mettre dans la valise" },
      {
        type: "list",
        items: [
          "les documents sanitaires de l'animal ; si vous venez de l'étranger, renseignez-vous à l'avance sur les règles d'entrée en Italie avec un animal ;",
          "la laisse, et une muselière à garder avec vous là où elle est exigée ;",
          "gamelles, sa nourriture habituelle et sa couverture ou son panier : dans un lieu nouveau, une odeur familière aide ;",
          "des sacs pour ramasser ses besoins, en promenade et au jardin ;",
          "une serviette pour ses pattes après les balades à la campagne ;",
          "le numéro de votre vétérinaire et une photo récente de votre chien, toujours sur votre téléphone.",
        ],
      },
      { type: "h2", text: "Réserver La Mora avec son chien" },
      {
        type: "p",
        text: "Si les réponses vous conviennent, choisissez Gemelli ou Sagittario, indiquez la taille et le type de votre animal lors de la réservation et écrivez-nous pour toute question. Toutes les informations pour voyager avec un animal sont aussi sur notre page Vacances avec animaux.",
      },
      {
        type: "links",
        heading: "Pour organiser le séjour",
        items: [
          { label: "Vacances avec animaux à La Mora", href: "/vacanza-con-animali/" },
          { label: "L'appartement Gemelli", href: "/alloggi/gemelli/" },
          { label: "L'appartement Sagittario", href: "/alloggi/sagittario/" },
          { label: "Assise avec son chien : guide pratique", href: "/blog/assisi-con-il-cane/" },
          { label: "La cascade des Marmore avec son chien", href: "/blog/cascata-delle-marmore-con-il-cane/" },
          { label: "Que voir autour de La Mora", href: "/territorio/" },
        ],
      },
    ],
    faq: {
      heading: "Questions fréquentes sur le séjour avec son chien",
      items: [
        { q: "Quels appartements de La Mora acceptent les animaux ?", a: "Gemelli et Sagittario, au rez-de-chaussée, chacun avec son jardin privé." },
        { q: "Combien coûte la venue d'un chien à La Mora ?", a: "Le supplément est de 25 € par séjour, et non par nuit." },
        { q: "Les animaux doivent-ils être tenus en laisse ?", a: "Oui, dans les espaces communs de la structure." },
        { q: "Comment signaler que je voyage avec mon chien ?", a: "Lors de la réservation ou dans le formulaire de demande, rubrique « Je voyage avec des animaux », en indiquant la taille et le type de l'animal." },
        { q: "À quelle distance se trouve La Mora du centre d'Assise ?", a: "La Piazza del Comune est à 6,8 km, environ 14 minutes en voiture selon Google Maps." },
      ],
    },
    disclaimer: CHECKED.fr,
    finalCtaHeading: "En vacances avec votre chien, dans la campagne d'Assise.",
    finalCtaBody: "Gemelli et Sagittario, au rez-de-chaussée avec jardin privé.",
    finalCtaLabel: "Voir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "agriturismo-pet-friendly-umbria",
    topics: ["pets"],
    category: "Mit Hund",
    title: "Hundefreundlicher Agriturismo in Umbrien: Was Sie vor der Buchung fragen sollten",
    excerpt:
      "Die Fragen vor der Buchung eines Agriturismo in Umbrien mit Hund: Unterkunft, Platz im Freien, Zuschlag, Regeln und was in den Koffer gehört. Mit den Antworten von La Mora.",
    metaDescription:
      "Hundefreundlicher Agriturismo in Umbrien: Was Sie vor der Buchung mit Hund fragen sollten. Im La Mora: Gemelli und Sagittario mit eigenem Garten, 25 € pro Aufenthalt.",
    image: SAGITTARIO_GAZEBO,
    alt: "Der eigene Garten der Ferienwohnung Sagittario, mit Pavillon und Rasen vor dem Steinhaus",
    imagePosition: "50% 60%",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "Haustierfreundliche Wohnungen", value: "Gemelli und Sagittario" },
        { label: "Wo", value: "im Erdgeschoss, jeweils mit eigenem Garten" },
        { label: "Zuschlag", value: "25 € pro Aufenthalt, nicht pro Nacht" },
        { label: "In den Gemeinschaftsbereichen", value: "Tiere an der Leine" },
        { label: "Bei der Buchung", value: "Größe und Art des Tieres angeben" },
        { label: "Zentrum von Assisi", value: "6,8 km · rund 14 Min. mit dem Auto" },
      ],
    },
    intro:
      "„Haustiere erlaubt“ sagt wenig aus: Zwischen einem Agriturismo, der Tiere akzeptiert, und einem Ort, an dem sich Ihr Hund wirklich wohlfühlt, liegen ein paar Fragen, die Sie vor der Buchung stellen sollten. Hier ist die Liste, die wir selbst verwenden würden, Frage für Frage, mit den Antworten des Agriturismo La Mora auf dem Land bei Assisi.",
    content: [
      { type: "h2", text: "Welche Unterkünfte nehmen Tiere auf?" },
      {
        type: "p",
        text: "„Haustiere erlaubt“ gilt nicht immer für das ganze Haus: Oft sind Tiere nur in einigen Zimmern oder Ferienwohnungen erlaubt, und wer das erst nach der Buchung erfährt, muss in letzter Minute umplanen. Fragen Sie, bevor Sie Ihre Daten wählen, und sagen Sie, wie viele Tiere mitkommen.",
      },
      {
        type: "p",
        text: "Im La Mora sind zwei Ferienwohnungen haustierfreundlich: Gemelli und Sagittario. Gemelli bietet Platz für bis zu 4 Personen, Sagittario für bis zu 6: Beide sind unabhängig, mit Küche und eigenem Bad, und liegen im Erdgeschoss, sodass man ohne Treppen in den Garten kommt.",
      },
      { type: "h2", text: "Wie sieht der Platz im Freien aus?" },
      {
        type: "p",
        text: "Für einen Hund macht der Außenbereich den Unterschied: eine Wiese für die erste Runde am Morgen, ein schattiger Platz in den heißen Stunden, die Möglichkeit, neben Ihnen zu liegen, während Sie lesen oder draußen essen. Fragen Sie, ob der Außenbereich privat ist oder mit anderen Gästen geteilt wird, und wie er beschaffen ist: Jeder Garten ist anders, und wenn Ihr Hund gerne wegläuft, wissen Sie es besser vor der Abreise.",
      },
      {
        type: "p",
        text: "Gemelli und Sagittario haben jeweils einen eigenen Garten; der von Sagittario hat auch einen Pavillon. Ringsum liegt die Landschaft von Assisi, mit der Wiese, dem Spielplatz und dem Pool des Agriturismo.",
      },
      {
        type: "image",
        src: GEMELLI_GIARDINO,
        alt: "Der eigene Garten der Ferienwohnung Gemelli, mit einem kleinen Hund auf der Wiese",
        caption: "Der eigene Garten von Gemelli.",
      },
      { type: "h2", text: "Was kostet es, den Hund mitzubringen?" },
      {
        type: "p",
        text: "Der Zuschlag für Tiere ist von Haus zu Haus sehr unterschiedlich: Manche berechnen ihn pro Nacht, andere pro Aufenthalt, wieder andere fügen weitere Posten hinzu. Lassen Sie sich den Gesamtbetrag für Ihren Aufenthalt nennen: Nur so vergleichen Sie wirklich vergleichbare Preise.",
      },
      {
        type: "p",
        text: "Im La Mora beträgt der Zuschlag 25 € pro Aufenthalt, nicht pro Nacht: Für ein Wochenende wie für eine ganze Woche bleibt der Betrag gleich.",
      },
      { type: "h2", text: "Gibt es Grenzen bei Größe oder Art?" },
      {
        type: "p",
        text: "Manche Unterkünfte nehmen nur kleine Hunde auf, andere schließen bestimmte Tiere aus. Klären Sie das am besten sofort und beschreiben Sie Ihren Hund: Größe, Art, Gewohnheiten und ob er gewohnt ist, an einem neuen Ort zu schlafen.",
      },
      {
        type: "p",
        text: "Im Anfrageformular des La Mora gibt es die Option „Ich reise mit Haustieren“, in der Sie Größe und Art Ihres Tieres angeben; geben Sie es auch bei der Buchung an. Im Zweifel schreiben Sie Paolo vor der Bestätigung auf WhatsApp.",
      },
      { type: "h2", text: "Welche Regeln gelten im Haus?" },
      {
        type: "p",
        text: "Jeder Agriturismo hat eigene Regeln für Tiere in den Gemeinschaftsbereichen: Leine, Bereiche, in die sie nicht dürfen, Tageszeiten, die zu beachten sind. Fragen Sie vorher danach, besonders wenn Ihr Hund nicht an andere Menschen oder Tiere gewöhnt ist, und fragen Sie, ob bestimmte Bereiche für Tiere tabu sind, etwa der Pool.",
      },
      {
        type: "p",
        text: "Im La Mora müssen Tiere in den Gemeinschaftsbereichen an der Leine geführt werden: Diese Regel erlaubt allen, Gästen mit oder ohne Hund und auch Kindern, die Landschaft in Ruhe zu genießen.",
      },
      { type: "h2", text: "Wo kann man in der Nähe spazieren gehen?" },
      {
        type: "p",
        text: "Ein hundefreundlicher Agriturismo zählt auch durch die Spaziergänge in seiner Umgebung. Das La Mora liegt auf dem Land bei Assisi: Die Altstadt ist 6,8 km entfernt, rund 14 Minuten mit dem Auto, die Einsiedelei Eremo delle Carceri, wo die Wege des Monte Subasio beginnen, 12,2 km. In unseren Ratgebern finden Sie, wie Sie Assisi mit Hund besuchen, und einen Tagesausflug in der Umgebung, mit den Regeln der einzelnen Orte.",
      },
      { type: "h2", text: "Was in den Koffer gehört" },
      {
        type: "list",
        items: [
          "die Gesundheitsdokumente des Tieres; wenn Sie aus dem Ausland anreisen, informieren Sie sich vorab über die Regeln für die Einreise nach Italien mit einem Tier;",
          "die Leine und einen Maulkorb, den Sie dort dabeihaben, wo er verlangt wird;",
          "Näpfe, das gewohnte Futter und seine Decke oder sein Körbchen: An einem neuen Ort hilft ein vertrauter Geruch;",
          "Beutel für die Hinterlassenschaften, beim Spaziergang und im Garten;",
          "ein Handtuch für die Pfoten nach Spaziergängen auf dem Land;",
          "die Nummer Ihres Tierarztes und ein aktuelles Foto Ihres Hundes, immer auf dem Handy.",
        ],
      },
      { type: "h2", text: "Mit Hund im La Mora buchen" },
      {
        type: "p",
        text: "Wenn Sie die Antworten überzeugen, wählen Sie Gemelli oder Sagittario, geben Sie bei der Buchung Größe und Art Ihres Tieres an und schreiben Sie uns bei Fragen. Alle Informationen für die Reise mit Tier finden Sie auch auf unserer Seite Urlaub mit Haustieren.",
      },
      {
        type: "links",
        heading: "Den Aufenthalt planen",
        items: [
          { label: "Urlaub mit Haustieren im La Mora", href: "/vacanza-con-animali/" },
          { label: "Die Ferienwohnung Gemelli", href: "/alloggi/gemelli/" },
          { label: "Die Ferienwohnung Sagittario", href: "/alloggi/sagittario/" },
          { label: "Assisi mit Hund: ein praktischer Ratgeber", href: "/blog/assisi-con-il-cane/" },
          { label: "Marmore-Wasserfälle mit Hund", href: "/blog/cascata-delle-marmore-con-il-cane/" },
          { label: "Sehenswertes rund um das La Mora", href: "/territorio/" },
        ],
      },
    ],
    faq: {
      heading: "Häufige Fragen zum Aufenthalt mit Hund",
      items: [
        { q: "Welche Ferienwohnungen im La Mora nehmen Tiere auf?", a: "Gemelli und Sagittario, im Erdgeschoss, jeweils mit eigenem Garten." },
        { q: "Was kostet es, einen Hund ins La Mora mitzubringen?", a: "Der Zuschlag beträgt 25 € pro Aufenthalt, nicht pro Nacht." },
        { q: "Müssen Tiere an der Leine bleiben?", a: "Ja, in den Gemeinschaftsbereichen des Hauses." },
        { q: "Wie gebe ich an, dass ich mit Hund reise?", a: "Bei der Buchung oder im Anfrageformular unter „Ich reise mit Haustieren“, mit Angabe von Größe und Art des Tieres." },
        { q: "Wie weit ist das La Mora vom Zentrum Assisis entfernt?", a: "Die Piazza del Comune ist 6,8 km entfernt, laut Google Maps rund 14 Minuten mit dem Auto." },
      ],
    },
    disclaimer: CHECKED.de,
    finalCtaHeading: "Urlaub mit Hund, auf dem Land bei Assisi.",
    finalCtaBody: "Gemelli und Sagittario, im Erdgeschoss mit eigenem Garten.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};

/* "Agriturismo con bambini: come scegliere quello giusto". Checklist con i
   soli fatti di La Mora del brief (sezioni 2, 3, 4-bis, 4-ter). */
export const FAMILY_CHOICE_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "agriturismo-con-bambini-come-scegliere",
    topics: ["family"],
    category: "In famiglia",
    title: "Agriturismo con bambini: come scegliere quello giusto",
    excerpt:
      "Spazi, piscina, prezzi per i bambini, culla e pasti: le domande da fare prima di prenotare un agriturismo con i bambini, con le risposte di La Mora, vicino ad Assisi.",
    metaDescription:
      "Agriturismo con bambini: come scegliere. Le domande giuste e le risposte di La Mora ad Assisi: parco giochi, piscina, riduzioni da 0 a 11 anni, culla.",
    image: PISCINA,
    alt: "La piscina di Agriturismo La Mora in una giornata di sole, con il prato e le siepi intorno",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Da 0 a 2 anni", value: "gratis" },
        { label: "Da 3 a 8 anni non compiuti", value: "riduzione del 50%" },
        { label: "Da 8 a 11 anni non compiuti", value: "riduzione del 30%" },
        { label: "Culla", value: "su richiesta, 15 € a soggiorno" },
        { label: "Parco giochi", value: "sempre libero, con la supervisione degli adulti" },
        { label: "Piscina", value: "1° maggio – 28 settembre, cuffia fino a 16 anni" },
      ],
    },
    intro:
      "Con i bambini la vacanza si decide nei dettagli: dove dormono, dove giocano, cosa si mangia, quanto costa davvero. Un agriturismo può essere perfetto per una famiglia, ma non tutti lo sono allo stesso modo. Ecco cosa chiedere prima di prenotare, domanda per domanda, con le risposte di Agriturismo La Mora, nella campagna di Assisi.",
    content: [
      { type: "h2", text: "Camera o appartamento?" },
      {
        type: "p",
        text: "Con i bambini piccoli un appartamento indipendente cambia le giornate: una stanza per il riposino, un tavolo per la merenda, la possibilità di mettere a letto i più piccoli e restare svegli nella stanza accanto. Chiedi quante persone può ospitare davvero l'alloggio e come sono disposti i letti.",
      },
      {
        type: "p",
        text: "A La Mora gli appartamenti sono cinque, tutti indipendenti, con cucina attrezzata e bagno privato. Per le famiglie numerose c'è Bilancia, fino a 8 ospiti; Sagittario arriva a 6; Gemelli, Pesci e Acquario a 4.",
      },
      { type: "h2", text: "Una cucina tutta per voi" },
      {
        type: "p",
        text: "Pappe, latte caldo, merende a orari impossibili: una cucina vera vale più di molti servizi. Verifica che sia attrezzata, non un semplice angolo cottura, e chiedi se la colazione è inclusa nel prezzo o si paga a parte.",
      },
      {
        type: "p",
        text: "Tutti gli appartamenti di La Mora hanno la cucina attrezzata. La colazione bio si serve ogni mattina dalle 8:00 alle 9:30, e alcune tariffe dirette la includono.",
      },
      { type: "h2", text: "Dove giocano i bambini?" },
      {
        type: "p",
        text: "Spazio all'aperto e giochi sono il motivo per cui molte famiglie scelgono la campagna. Chiedi cosa c'è e con quali regole: un parco giochi a disposizione, un prato dove correre, qualcosa da fare anche per i più grandi.",
      },
      {
        type: "p",
        text: "A La Mora il parco giochi, con altalene, scivoli e giostre, è sempre libero, sotto la supervisione degli adulti. Intorno ci sono un campo da calcetto in erba naturale, il tavolo da ping-pong e i cavalli dell'azienda agricola, da vedere da vicino.",
      },
      {
        type: "image",
        src: PARCO_GIOCHI,
        alt: "Il parco giochi di Agriturismo La Mora: altalene, scivolo giallo, tavolo da ping-pong e porta da calcetto sul prato",
        caption: "Il parco giochi e il prato di La Mora.",
      },
      { type: "h2", text: "La piscina: periodo, orari e regole" },
      {
        type: "p",
        text: "Se viaggi d'estate, la piscina diventa il centro della giornata. Chiedi in quali mesi è aperta, a che ore e quali regole valgono per i bambini: meglio saperlo prima che scoprirlo a bordo vasca.",
      },
      {
        type: "p",
        text: "La piscina di La Mora misura 6×12 metri ed è aperta dal 1° maggio al 28 settembre, dalle 9:00 alle 19:00. Per i bambini fino a 16 anni la cuffia è obbligatoria: mettila in valigia.",
      },
      { type: "h2", text: "Quanto costano i bambini?" },
      {
        type: "p",
        text: "I prezzi per i bambini cambiano molto da una struttura all'altra: c'è chi applica riduzioni per fasce d'età e chi li fa pagare come gli adulti. Chiedi le fasce esatte e indica sempre le età dei bambini al momento della prenotazione.",
      },
      {
        type: "p",
        text: "A La Mora ci sono riduzioni per i bambini: da 0 a 2 anni sono gratis, da 3 a 8 anni non compiuti la riduzione è del 50%, da 8 a 11 anni non compiuti del 30%. Indica le età dei bambini quando prenoti. Anche la tassa di soggiorno, 3 € a persona al giorno per i primi 3 giorni, non si paga sotto i 12 anni.",
      },
      { type: "h2", text: "Culla e servizi per i più piccoli" },
      {
        type: "p",
        text: "Se viaggi con un neonato, chiedi della culla prima di partire: non tutte le strutture ce l'hanno e il costo cambia. A La Mora la culla è disponibile su richiesta, a 15 € a soggiorno: segnalala quando prenoti. Su richiesta si può organizzare anche il babysitting.",
      },
      { type: "h2", text: "E la sera, dove si mangia?" },
      {
        type: "p",
        text: "Dopo una giornata in giro non sempre si ha voglia di cucinare: chiedi se ci sono ristoranti vicini adatti ai bambini. Il Ristorante Carfagna, convenzionato con La Mora, a 7,0 km, propone agli ospiti un menù bambini da 15 € per i bambini da 3 a 10 anni, da concordare in base alle loro esigenze.",
      },
      { type: "h2", text: "Cosa c'è da fare nei dintorni?" },
      {
        type: "p",
        text: "La posizione conta quanto la struttura: con i bambini meglio tragitti brevi. Da La Mora la Basilica di Santa Maria degli Angeli è a 2,1 km, circa 3 minuti in auto; Piazza del Comune, nel centro di Assisi, a 6,8 km, circa 14 minuti; Perugia a 21,0 km. Nelle nostre guide trovi cosa fare ad Assisi con i bambini in uno o due giorni e le idee per un weekend in Umbria.",
      },
      { type: "h2", text: "Le domande da fare, in breve" },
      {
        type: "list",
        items: [
          "quante persone ospita l'alloggio e com'è attrezzata la cucina;",
          "cosa c'è all'aperto per giocare, e con quali regole;",
          "periodo, orari e regole della piscina;",
          "le riduzioni per i bambini, fascia per fascia;",
          "se c'è la culla e quanto costa;",
          "quanto distano i luoghi che volete visitare.",
        ],
      },
      {
        type: "links",
        heading: "Per organizzare la vacanza",
        items: [
          { label: "Vacanza in famiglia a La Mora", href: "/vacanza-in-famiglia/" },
          { label: "L'appartamento Bilancia, fino a 8 ospiti", href: "/alloggi/bilancia/" },
          { label: "L'appartamento Sagittario, fino a 6 ospiti", href: "/alloggi/sagittario/" },
          { label: "La piscina", href: "/piscina/" },
          { label: "Le attività in agriturismo", href: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
          { label: "Il ristorante convenzionato", href: "/ristorante-convenzionato/" },
          { label: "Assisi con i bambini", href: "/blog/assisi-con-i-bambini/" },
          { label: "Umbria con i bambini: idee per un weekend", href: "/blog/umbria-con-i-bambini-weekend/" },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti sulla vacanza con i bambini",
      items: [
        { q: "Ci sono riduzioni per i bambini a La Mora?", a: "Sì: da 0 a 2 anni gratis, da 3 a 8 anni non compiuti riduzione del 50%, da 8 a 11 anni non compiuti riduzione del 30%. Indica le età dei bambini quando prenoti." },
        { q: "C'è la culla?", a: "Sì, su richiesta, a 15 € a soggiorno." },
        { q: "Il parco giochi è sempre aperto?", a: "Sì, è sempre libero, sotto la supervisione degli adulti." },
        { q: "Serve la cuffia in piscina?", a: "Sì, per i bambini fino a 16 anni la cuffia è obbligatoria. La piscina è aperta dal 1° maggio al 28 settembre, dalle 9:00 alle 19:00." },
        { q: "Qual è l'appartamento più grande?", a: "Bilancia, che ospita fino a 8 persone." },
        { q: "C'è un menù per i bambini al ristorante convenzionato?", a: "Sì, al Ristorante Carfagna il menù bambini costa 15 €, per i bambini da 3 a 10 anni." },
      ],
    },
    disclaimer: CHECKED.it,
    finalCtaHeading: "Una vacanza in famiglia, nella campagna di Assisi.",
    finalCtaBody: "Cinque appartamenti con cucina, il parco giochi e la piscina.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "agriturismo-con-bambini-come-scegliere",
    topics: ["family"],
    category: "Family",
    title: "Agriturismo with children: how to choose the right one",
    excerpt:
      "Space, pool, prices for children, cots and meals: the questions to ask before booking an agriturismo with children, with the answers from La Mora, near Assisi.",
    metaDescription:
      "Agriturismo with children: how to choose. The right questions and La Mora's answers in Assisi: playground, pool, reductions for ages 0 to 11, cot.",
    image: PISCINA,
    alt: "Agriturismo La Mora's pool on a sunny day, with the lawn and hedges around it",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Ages 0 to 2", value: "free" },
        { label: "From 3 to under 8", value: "50% reduction" },
        { label: "From 8 to under 11", value: "30% reduction" },
        { label: "Cot", value: "on request, €15 per stay" },
        { label: "Playground", value: "always open, under adult supervision" },
        { label: "Pool", value: "1 May – 28 September, swim cap up to age 16" },
      ],
    },
    intro:
      "With children, a holiday comes down to the details: where they sleep, where they play, what you eat, what it really costs. An agriturismo can be perfect for a family, but not every one is equally so. Here is what to ask before you book, question by question, with the answers from Agriturismo La Mora, in the countryside of Assisi.",
    content: [
      { type: "h2", text: "A room or an apartment?" },
      {
        type: "p",
        text: "With young children, an independent apartment changes your days: a room for the afternoon nap, a table for snacks, the chance to put the little ones to bed and stay up in the next room. Ask how many people the accommodation really sleeps and how the beds are arranged.",
      },
      {
        type: "p",
        text: "La Mora has five apartments, all independent, with a fully equipped kitchen and private bathroom. For large families there is Bilancia, for up to 8 guests; Sagittario sleeps up to 6; Gemelli, Pesci and Acquario up to 4.",
      },
      { type: "h2", text: "A kitchen of your own" },
      {
        type: "p",
        text: "Baby food, warm milk, snacks at impossible hours: a real kitchen is worth more than many services. Check that it is properly equipped, not just a kitchenette, and ask whether breakfast is included in the price or paid separately.",
      },
      {
        type: "p",
        text: "All La Mora's apartments have a fully equipped kitchen. The organic breakfast is served every morning from 8:00 to 9:30, and some direct rates include it.",
      },
      { type: "h2", text: "Where do the children play?" },
      {
        type: "p",
        text: "Outdoor space and games are why many families choose the countryside. Ask what there is and what the rules are: a playground they can use, a lawn to run on, something for older children too.",
      },
      {
        type: "p",
        text: "At La Mora the playground, with swings, slides and roundabouts, is always open, under adult supervision. Around it there is a natural-grass five-a-side pitch, the table-tennis table and the farm's horses, to see up close.",
      },
      {
        type: "image",
        src: PARCO_GIOCHI,
        alt: "The playground at Agriturismo La Mora: swings, a yellow slide, a table-tennis table and a football goal on the lawn",
        caption: "La Mora's playground and lawn.",
      },
      { type: "h2", text: "The pool: season, hours and rules" },
      {
        type: "p",
        text: "If you travel in summer, the pool becomes the centre of the day. Ask in which months it is open, at what times and which rules apply to children: better to know before than to find out at the poolside.",
      },
      {
        type: "p",
        text: "La Mora's pool measures 6×12 metres and is open from 1 May to 28 September, from 9:00 to 19:00. A swim cap is compulsory for children up to age 16: pack one.",
      },
      { type: "h2", text: "What do children cost?" },
      {
        type: "p",
        text: "Prices for children vary a lot from one place to another: some apply reductions by age band, others charge children like adults. Ask for the exact bands and always state the children's ages when you book.",
      },
      {
        type: "p",
        text: "At La Mora there are reductions for children: from 0 to 2 they are free, from 3 to under 8 the reduction is 50%, from 8 to under 11 it is 30%. State the children's ages when you book. The tourist tax, €3 per person per day for the first 3 days, is not charged for under-12s either.",
      },
      { type: "h2", text: "Cots and services for the little ones" },
      {
        type: "p",
        text: "If you are travelling with a baby, ask about a cot before you leave: not every place has one and the cost varies. At La Mora a cot is available on request, for €15 per stay: let us know when you book. Babysitting can also be arranged on request.",
      },
      { type: "h2", text: "And in the evening, where do you eat?" },
      {
        type: "p",
        text: "After a day out, you don't always feel like cooking: ask whether there are child-friendly restaurants nearby. Ristorante Carfagna, La Mora's partner restaurant 7.0 km away, offers guests a children's menu at €15 for children aged 3 to 10, agreed according to their needs.",
      },
      { type: "h2", text: "What is there to do nearby?" },
      {
        type: "p",
        text: "Location matters as much as the place itself: with children, short journeys are best. From La Mora the Basilica of Santa Maria degli Angeli is 2.1 km away, about 3 minutes by car; Piazza del Comune, in the centre of Assisi, 6.8 km, about 14 minutes; Perugia 21.0 km. In our guides you will find what to do in Assisi with children in one or two days, and ideas for a weekend in Umbria.",
      },
      { type: "h2", text: "The questions to ask, in short" },
      {
        type: "list",
        items: [
          "how many people the accommodation sleeps and how the kitchen is equipped;",
          "what there is outdoors for playing, and with what rules;",
          "the pool's season, hours and rules;",
          "the reductions for children, band by band;",
          "whether there is a cot and what it costs;",
          "how far the places you want to visit are.",
        ],
      },
      {
        type: "links",
        heading: "Plan your stay",
        items: [
          { label: "Family holidays at La Mora", href: "/vacanza-in-famiglia/" },
          { label: "The Bilancia apartment, up to 8 guests", href: "/alloggi/bilancia/" },
          { label: "The Sagittario apartment, up to 6 guests", href: "/alloggi/sagittario/" },
          { label: "The pool", href: "/piscina/" },
          { label: "Activities at the agriturismo", href: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
          { label: "Our partner restaurant", href: "/ristorante-convenzionato/" },
          { label: "Assisi with children", href: "/blog/assisi-con-i-bambini/" },
          { label: "Umbria with children: weekend ideas", href: "/blog/umbria-con-i-bambini-weekend/" },
        ],
      },
    ],
    faq: {
      heading: "Frequently asked questions about holidays with children",
      items: [
        { q: "Are there reductions for children at La Mora?", a: "Yes: ages 0 to 2 free, from 3 to under 8 a 50% reduction, from 8 to under 11 a 30% reduction. State the children's ages when you book." },
        { q: "Is there a cot?", a: "Yes, on request, for €15 per stay." },
        { q: "Is the playground always open?", a: "Yes, it is always open, under adult supervision." },
        { q: "Do you need a swim cap in the pool?", a: "Yes, a swim cap is compulsory for children up to age 16. The pool is open from 1 May to 28 September, from 9:00 to 19:00." },
        { q: "Which is the largest apartment?", a: "Bilancia, which sleeps up to 8 people." },
        { q: "Is there a children's menu at the partner restaurant?", a: "Yes, at Ristorante Carfagna the children's menu costs €15, for children aged 3 to 10." },
      ],
    },
    disclaimer: CHECKED.en,
    finalCtaHeading: "A family holiday in the Assisi countryside.",
    finalCtaBody: "Five apartments with a kitchen, the playground and the pool.",
    finalCtaLabel: "See the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "agriturismo-con-bambini-come-scegliere",
    topics: ["family"],
    category: "En famille",
    title: "Agritourisme avec enfants : comment bien le choisir",
    excerpt:
      "Espace, piscine, prix pour les enfants, lit bébé et repas : les questions à poser avant de réserver un agritourisme avec des enfants, avec les réponses de La Mora, près d'Assise.",
    metaDescription:
      "Agritourisme avec enfants : comment choisir. Les bonnes questions et les réponses de La Mora à Assise : aire de jeux, piscine, réductions de 0 à 11 ans.",
    image: PISCINA,
    alt: "La piscine de l'Agriturismo La Mora par une journée ensoleillée, avec la pelouse et les haies autour",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "De 0 à 2 ans", value: "gratuit" },
        { label: "De 3 ans à moins de 8 ans", value: "réduction de 50 %" },
        { label: "De 8 ans à moins de 11 ans", value: "réduction de 30 %" },
        { label: "Lit bébé", value: "sur demande, 15 € par séjour" },
        { label: "Aire de jeux", value: "toujours accessible, sous la surveillance des adultes" },
        { label: "Piscine", value: "1er mai – 28 septembre, bonnet jusqu'à 16 ans" },
      ],
    },
    intro:
      "Avec des enfants, les vacances se jouent dans les détails : où ils dorment, où ils jouent, ce que l'on mange, ce que cela coûte vraiment. Un agritourisme peut être parfait pour une famille, mais tous ne le sont pas de la même façon. Voici ce qu'il faut demander avant de réserver, question par question, avec les réponses de l'Agriturismo La Mora, dans la campagne d'Assise.",
    content: [
      { type: "h2", text: "Chambre ou appartement ?" },
      {
        type: "p",
        text: "Avec de jeunes enfants, un appartement indépendant change les journées : une pièce pour la sieste, une table pour le goûter, la possibilité de coucher les plus petits et de rester éveillés dans la pièce d'à côté. Demandez combien de personnes le logement peut vraiment accueillir et comment les lits sont disposés.",
      },
      {
        type: "p",
        text: "La Mora compte cinq appartements, tous indépendants, avec cuisine équipée et salle de bains privée. Pour les familles nombreuses, il y a Bilancia, jusqu'à 8 personnes ; Sagittario en accueille jusqu'à 6 ; Gemelli, Pesci et Acquario jusqu'à 4.",
      },
      { type: "h2", text: "Une cuisine rien que pour vous" },
      {
        type: "p",
        text: "Petits pots, lait chaud, goûters à des heures impossibles : une vraie cuisine vaut plus que bien des services. Vérifiez qu'elle est équipée, et pas seulement un coin cuisine, et demandez si le petit-déjeuner est compris dans le prix ou payant.",
      },
      {
        type: "p",
        text: "Tous les appartements de La Mora disposent d'une cuisine équipée. Le petit-déjeuner bio est servi chaque matin de 8h00 à 9h30, et certains tarifs directs l'incluent.",
      },
      { type: "h2", text: "Où jouent les enfants ?" },
      {
        type: "p",
        text: "Beaucoup de familles choisissent la campagne pour l'espace et les jeux. Demandez ce qu'il y a et avec quelles règles : une aire de jeux, une pelouse pour courir, de quoi occuper les plus grands.",
      },
      {
        type: "p",
        text: "À La Mora, l'aire de jeux, avec balançoires, toboggans et manèges, est toujours accessible, sous la surveillance des adultes. Autour, il y a un terrain de foot à cinq en gazon naturel, la table de ping-pong et les chevaux de l'exploitation agricole, à voir de près.",
      },
      {
        type: "image",
        src: PARCO_GIOCHI,
        alt: "L'aire de jeux de l'Agriturismo La Mora : balançoires, toboggan jaune, table de ping-pong et cage de football sur la pelouse",
        caption: "L'aire de jeux et la pelouse de La Mora.",
      },
      { type: "h2", text: "La piscine : période, horaires et règles" },
      {
        type: "p",
        text: "L'été, la piscine devient le centre de la journée. Demandez quand elle est ouverte, à quelles heures et quelles règles s'appliquent aux enfants.",
      },
      {
        type: "p",
        text: "La piscine de La Mora mesure 6×12 mètres et elle est ouverte du 1er mai au 28 septembre, de 9h00 à 19h00. Pour les enfants jusqu'à 16 ans, le bonnet de bain est obligatoire : mettez-le dans la valise.",
      },
      { type: "h2", text: "Combien coûtent les enfants ?" },
      {
        type: "p",
        text: "Les prix pour les enfants varient beaucoup d'une structure à l'autre : certaines appliquent des réductions par tranche d'âge, d'autres les font payer comme les adultes. Demandez les tranches exactes et indiquez toujours l'âge des enfants lors de la réservation.",
      },
      {
        type: "p",
        text: "À La Mora, il y a des réductions pour les enfants : de 0 à 2 ans, c'est gratuit ; de 3 ans à moins de 8 ans, la réduction est de 50 % ; de 8 ans à moins de 11 ans, de 30 %. Indiquez l'âge des enfants lors de la réservation. La taxe de séjour, 3 € par personne et par jour pour les 3 premiers jours, ne s'applique pas non plus aux moins de 12 ans.",
      },
      { type: "h2", text: "Lit bébé et services pour les plus petits" },
      {
        type: "p",
        text: "Si vous voyagez avec un bébé, renseignez-vous sur le lit bébé avant de partir : toutes les structures n'en ont pas, et le prix varie. À La Mora, un lit bébé est disponible sur demande, pour 15 € par séjour : signalez-le lors de la réservation. Le baby-sitting peut aussi être organisé sur demande.",
      },
      { type: "h2", text: "Et le soir, où manger ?" },
      {
        type: "p",
        text: "Après une journée de visites, on n'a pas toujours envie de cuisiner : demandez s'il y a des restaurants adaptés aux enfants. Le Ristorante Carfagna, partenaire de La Mora, à 7,0 km, propose aux hôtes un menu enfant à 15 € pour les enfants de 3 à 10 ans, à convenir selon leurs besoins.",
      },
      { type: "h2", text: "Que faire aux alentours ?" },
      {
        type: "p",
        text: "L'emplacement compte autant que la structure : avec des enfants, mieux vaut des trajets courts. Depuis La Mora, la basilique Sainte-Marie-des-Anges est à 2,1 km, environ 3 minutes en voiture ; la Piazza del Comune, au centre d'Assise, à 6,8 km, environ 14 minutes ; Pérouse à 21,0 km. Dans nos guides, vous trouverez que faire à Assise avec des enfants en un ou deux jours et des idées pour un week-end en Ombrie.",
      },
      { type: "h2", text: "Les questions à poser, en bref" },
      {
        type: "list",
        items: [
          "combien de personnes le logement accueille et comment la cuisine est équipée ;",
          "ce qu'il y a dehors pour jouer, et avec quelles règles ;",
          "la période, les horaires et les règles de la piscine ;",
          "les réductions pour les enfants, tranche par tranche ;",
          "s'il y a un lit bébé et combien il coûte ;",
          "à quelle distance se trouvent les lieux que vous voulez visiter.",
        ],
      },
      {
        type: "links",
        heading: "Pour organiser le séjour",
        items: [
          { label: "Vacances en famille à La Mora", href: "/vacanza-in-famiglia/" },
          { label: "L'appartement Bilancia, jusqu'à 8 personnes", href: "/alloggi/bilancia/" },
          { label: "L'appartement Sagittario, jusqu'à 6 personnes", href: "/alloggi/sagittario/" },
          { label: "La piscine", href: "/piscina/" },
          { label: "Les activités à l'agritourisme", href: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
          { label: "Notre restaurant partenaire", href: "/ristorante-convenzionato/" },
          { label: "Assise avec des enfants", href: "/blog/assisi-con-i-bambini/" },
          { label: "L'Ombrie avec des enfants : idées de week-end", href: "/blog/umbria-con-i-bambini-weekend/" },
        ],
      },
    ],
    faq: {
      heading: "Questions fréquentes sur les vacances avec des enfants",
      items: [
        { q: "Y a-t-il des réductions pour les enfants à La Mora ?", a: "Oui : de 0 à 2 ans gratuit, de 3 ans à moins de 8 ans réduction de 50 %, de 8 ans à moins de 11 ans réduction de 30 %. Indiquez l'âge des enfants lors de la réservation." },
        { q: "Y a-t-il un lit bébé ?", a: "Oui, sur demande, pour 15 € par séjour." },
        { q: "L'aire de jeux est-elle toujours ouverte ?", a: "Oui, elle est toujours accessible, sous la surveillance des adultes." },
        { q: "Le bonnet de bain est-il obligatoire à la piscine ?", a: "Oui, pour les enfants jusqu'à 16 ans. La piscine est ouverte du 1er mai au 28 septembre, de 9h00 à 19h00." },
        { q: "Quel est le plus grand appartement ?", a: "Bilancia, qui accueille jusqu'à 8 personnes." },
        { q: "Y a-t-il un menu enfant au restaurant partenaire ?", a: "Oui, au Ristorante Carfagna le menu enfant coûte 15 €, pour les enfants de 3 à 10 ans." },
      ],
    },
    disclaimer: CHECKED.fr,
    finalCtaHeading: "Des vacances en famille dans la campagne d'Assise.",
    finalCtaBody: "Cinq appartements avec cuisine, l'aire de jeux et la piscine.",
    finalCtaLabel: "Voir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "agriturismo-con-bambini-come-scegliere",
    topics: ["family"],
    category: "Mit Familie",
    title: "Agriturismo mit Kindern: So finden Sie den richtigen",
    excerpt:
      "Platz, Pool, Preise für Kinder, Babybett und Essen: die Fragen vor der Buchung eines Agriturismo mit Kindern, mit den Antworten des La Mora bei Assisi.",
    metaDescription:
      "Agriturismo mit Kindern: So wählen Sie richtig. Die richtigen Fragen und die Antworten des La Mora in Assisi: Spielplatz, Pool, Ermäßigungen von 0 bis 11 Jahren.",
    image: PISCINA,
    alt: "Der Pool des Agriturismo La Mora an einem sonnigen Tag, mit Rasen und Hecken ringsum",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "0 bis 2 Jahre", value: "kostenlos" },
        { label: "3 bis unter 8 Jahre", value: "50 % Ermäßigung" },
        { label: "8 bis unter 11 Jahre", value: "30 % Ermäßigung" },
        { label: "Babybett", value: "auf Anfrage, 15 € pro Aufenthalt" },
        { label: "Spielplatz", value: "immer zugänglich, unter Aufsicht der Erwachsenen" },
        { label: "Pool", value: "1. Mai – 28. September, Badekappe bis 16 Jahre" },
      ],
    },
    intro:
      "Mit Kindern entscheidet sich der Urlaub im Detail: wo sie schlafen, wo sie spielen, was man isst, was es wirklich kostet. Ein Agriturismo kann für eine Familie perfekt sein, aber nicht jeder ist es im gleichen Maß. Hier ist, was Sie vor der Buchung fragen sollten, Frage für Frage, mit den Antworten des Agriturismo La Mora auf dem Land bei Assisi.",
    content: [
      { type: "h2", text: "Zimmer oder Ferienwohnung?" },
      {
        type: "p",
        text: "Mit kleinen Kindern verändert eine unabhängige Ferienwohnung die Tage: ein Raum für den Mittagsschlaf, ein Tisch für die Zwischenmahlzeit, die Möglichkeit, die Kleinen ins Bett zu bringen und im Nebenzimmer noch wach zu bleiben. Fragen Sie, wie viele Personen die Unterkunft wirklich aufnimmt und wie die Betten verteilt sind.",
      },
      {
        type: "p",
        text: "Das La Mora hat fünf Ferienwohnungen, alle unabhängig, mit ausgestatteter Küche und eigenem Bad. Für große Familien gibt es Bilancia, für bis zu 8 Gäste; Sagittario bietet Platz für bis zu 6; Gemelli, Pesci und Acquario für bis zu 4.",
      },
      { type: "h2", text: "Eine Küche ganz für Sie" },
      {
        type: "p",
        text: "Brei, warme Milch, Snacks zu unmöglichen Uhrzeiten: Eine richtige Küche ist mehr wert als viele Leistungen. Prüfen Sie, ob sie gut ausgestattet ist und nicht nur eine Kochnische, und fragen Sie, ob das Frühstück im Preis inbegriffen ist oder extra kostet.",
      },
      {
        type: "p",
        text: "Alle Ferienwohnungen des La Mora haben eine ausgestattete Küche. Das Bio-Frühstück wird jeden Morgen von 8:00 bis 9:30 Uhr serviert, und einige Direkttarife schließen es ein.",
      },
      { type: "h2", text: "Wo spielen die Kinder?" },
      {
        type: "p",
        text: "Platz im Freien und Spiele sind der Grund, warum viele Familien das Land wählen. Fragen Sie, was es gibt und welche Regeln gelten: einen frei zugänglichen Spielplatz, eine Wiese zum Rennen, etwas auch für die Größeren.",
      },
      {
        type: "p",
        text: "Im La Mora ist der Spielplatz mit Schaukeln, Rutschen und Karussells immer zugänglich, unter Aufsicht der Erwachsenen. Ringsum gibt es ein Fünf-gegen-fünf-Feld aus Naturrasen, die Tischtennisplatte und die Pferde des landwirtschaftlichen Betriebs, die man aus der Nähe sehen kann.",
      },
      {
        type: "image",
        src: PARCO_GIOCHI,
        alt: "Der Spielplatz des Agriturismo La Mora: Schaukeln, gelbe Rutsche, Tischtennisplatte und Fußballtor auf der Wiese",
        caption: "Der Spielplatz und die Wiese des La Mora.",
      },
      { type: "h2", text: "Der Pool: Saison, Öffnungszeiten und Regeln" },
      {
        type: "p",
        text: "Wenn Sie im Sommer reisen, wird der Pool zum Mittelpunkt des Tages. Fragen Sie, in welchen Monaten er geöffnet ist, zu welchen Zeiten und welche Regeln für Kinder gelten: besser vorher wissen als am Beckenrand erfahren.",
      },
      {
        type: "p",
        text: "Der Pool des La Mora misst 6×12 Meter und ist vom 1. Mai bis 28. September von 9:00 bis 19:00 Uhr geöffnet. Für Kinder bis 16 Jahre ist eine Badekappe Pflicht: Packen Sie sie ein.",
      },
      { type: "h2", text: "Was kosten die Kinder?" },
      {
        type: "p",
        text: "Die Preise für Kinder sind von Haus zu Haus sehr unterschiedlich: Manche gewähren Ermäßigungen nach Altersgruppen, andere berechnen Kinder wie Erwachsene. Fragen Sie nach den genauen Altersgruppen und geben Sie bei der Buchung immer das Alter der Kinder an.",
      },
      {
        type: "p",
        text: "Im La Mora gibt es Ermäßigungen für Kinder: Von 0 bis 2 Jahren sind sie kostenlos, von 3 bis unter 8 Jahren beträgt die Ermäßigung 50 %, von 8 bis unter 11 Jahren 30 %. Geben Sie bei der Buchung das Alter der Kinder an. Auch die Kurtaxe, 3 € pro Person und Tag für die ersten 3 Tage, fällt für Kinder unter 12 Jahren nicht an.",
      },
      { type: "h2", text: "Babybett und Service für die Kleinsten" },
      {
        type: "p",
        text: "Wenn Sie mit einem Baby reisen, fragen Sie vor der Abreise nach einem Babybett: Nicht jedes Haus hat eines, und der Preis ist unterschiedlich. Im La Mora gibt es ein Babybett auf Anfrage für 15 € pro Aufenthalt: Geben Sie es bei der Buchung an. Auf Anfrage lässt sich auch ein Babysitter organisieren.",
      },
      { type: "h2", text: "Und abends, wo isst man?" },
      {
        type: "p",
        text: "Nach einem Tag unterwegs hat man nicht immer Lust zu kochen: Fragen Sie, ob es in der Nähe kinderfreundliche Restaurants gibt. Das Ristorante Carfagna, Partnerrestaurant des La Mora in 7,0 km Entfernung, bietet den Gästen ein Kindermenü für 15 € für Kinder von 3 bis 10 Jahren, abgestimmt auf ihre Bedürfnisse.",
      },
      { type: "h2", text: "Was gibt es in der Umgebung zu tun?" },
      {
        type: "p",
        text: "Die Lage zählt so viel wie das Haus selbst: Mit Kindern sind kurze Wege am besten. Vom La Mora ist die Basilika Santa Maria degli Angeli 2,1 km entfernt, rund 3 Minuten mit dem Auto; die Piazza del Comune im Zentrum von Assisi 6,8 km, rund 14 Minuten; Perugia 21,0 km. In unseren Ratgebern finden Sie, was man in Assisi mit Kindern an ein oder zwei Tagen unternehmen kann, und Ideen für ein Wochenende in Umbrien.",
      },
      { type: "h2", text: "Die wichtigsten Fragen im Überblick" },
      {
        type: "list",
        items: [
          "wie viele Personen die Unterkunft aufnimmt und wie die Küche ausgestattet ist;",
          "was es draußen zum Spielen gibt und welche Regeln gelten;",
          "Saison, Öffnungszeiten und Regeln des Pools;",
          "die Ermäßigungen für Kinder, Altersgruppe für Altersgruppe;",
          "ob es ein Babybett gibt und was es kostet;",
          "wie weit die Orte entfernt sind, die Sie besuchen möchten.",
        ],
      },
      {
        type: "links",
        heading: "Den Aufenthalt planen",
        items: [
          { label: "Familienurlaub im La Mora", href: "/vacanza-in-famiglia/" },
          { label: "Die Ferienwohnung Bilancia, bis zu 8 Gäste", href: "/alloggi/bilancia/" },
          { label: "Die Ferienwohnung Sagittario, bis zu 6 Gäste", href: "/alloggi/sagittario/" },
          { label: "Der Pool", href: "/piscina/" },
          { label: "Aktivitäten im Agriturismo", href: "/agriturismo-famiglie-ad-assisi-e-dintorni/" },
          { label: "Unser Partnerrestaurant", href: "/ristorante-convenzionato/" },
          { label: "Assisi mit Kindern", href: "/blog/assisi-con-i-bambini/" },
          { label: "Umbrien mit Kindern: Ideen für ein Wochenende", href: "/blog/umbria-con-i-bambini-weekend/" },
        ],
      },
    ],
    faq: {
      heading: "Häufige Fragen zum Urlaub mit Kindern",
      items: [
        { q: "Gibt es im La Mora Ermäßigungen für Kinder?", a: "Ja: 0 bis 2 Jahre kostenlos, 3 bis unter 8 Jahre 50 % Ermäßigung, 8 bis unter 11 Jahre 30 % Ermäßigung. Geben Sie bei der Buchung das Alter der Kinder an." },
        { q: "Gibt es ein Babybett?", a: "Ja, auf Anfrage, für 15 € pro Aufenthalt." },
        { q: "Ist der Spielplatz immer geöffnet?", a: "Ja, er ist immer zugänglich, unter Aufsicht der Erwachsenen." },
        { q: "Braucht man im Pool eine Badekappe?", a: "Ja, für Kinder bis 16 Jahre ist die Badekappe Pflicht. Der Pool ist vom 1. Mai bis 28. September von 9:00 bis 19:00 Uhr geöffnet." },
        { q: "Welches ist die größte Ferienwohnung?", a: "Bilancia, mit Platz für bis zu 8 Personen." },
        { q: "Gibt es im Partnerrestaurant ein Kindermenü?", a: "Ja, im Ristorante Carfagna kostet das Kindermenü 15 €, für Kinder von 3 bis 10 Jahren." },
      ],
    },
    disclaimer: CHECKED.de,
    finalCtaHeading: "Familienurlaub auf dem Land bei Assisi.",
    finalCtaBody: "Fünf Ferienwohnungen mit Küche, Spielplatz und Pool.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};

/* "Assisi con i bambini: cosa fare in 1 o 2 giorni". Fonti verificate il
   21/10/2026:
   - Rocca Maggiore, Foro Romano, Tempio di Minerva, parcheggi e ZTL:
     visit-assisi.it (portale turistico del Comune; schede Rocca e Foro
     modificate l'08/10/2026). Prezzo del biglietto combinato NON citato:
     due pagine ufficiali danno cifre diverse;
   - Bosco di San Francesco: fondoambiente.it (orari 2026/27, biglietti,
     sentiero di 1,5 km, ingressi);
   - Basilica di San Francesco: prenotazioni.sanfrancesco.org (ingresso
     gratuito) e basilica.sanfrancesco.org/orari (solo l'orario estivo
     della Chiesa inferiore: quello invernale sul sito ha un refuso);
   - Basilica di Santa Chiara: assisisantachiara.it;
   - San Damiano: santuariosandamiano.org; Eremo delle Carceri:
     eremodellecarceri.it.
   Tolti perché non verificabili: scale mobili di Mojano, autobus per
   l'Eremo, regole su abbigliamento e foto in Basilica, attività per
   bambini nei musei. */
const ROCCA_MAGGIORE = "/images/territorio/assisi/rocca maggiore assisi.jpg";
const BOSCO_DALL_ALTO = "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg";
const PIAZZA_DEL_COMUNE = "/images/territorio/assisi/piazza del comune assisi.jpg";
const VISIT_ASSISI_ROCCA = "https://www.visit-assisi.it/monumenti/edifici-medievali/rocca-maggiore/";
const FAI_BOSCO = "https://fondoambiente.it/luoghi/bosco-di-san-francesco/visita";
const BASILICA_ORARI = "https://basilica.sanfrancesco.org/orari";

export const ASSISI_KIDS_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "assisi-con-i-bambini",
    topics: ["family"],
    category: "In famiglia",
    title: "Assisi con i bambini: cosa fare in 1 o 2 giorni",
    excerpt:
      "Un itinerario per visitare Assisi con i bambini in uno o due giorni: Rocca Maggiore, Foro Romano sotterraneo, Basilica di San Francesco e la camminata nel Bosco del FAI, con orari e biglietti.",
    metaDescription:
      "Assisi con i bambini in 1 o 2 giorni: Rocca Maggiore, Foro Romano, Basilica di San Francesco e Bosco del FAI. Orari, biglietti ridotti e dove parcheggiare.",
    image: ROCCA_MAGGIORE,
    alt: "La Rocca Maggiore di Assisi, sulla cima del colle, sopra i cipressi e i tetti della città",
    imagePosition: "50% 35%",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Rocca Maggiore", value: "gratis fino a 8 anni · 6 € dai 9 ai 18" },
        { label: "Foro Romano", value: "gratis fino a 8 anni · 5 € dai 9 ai 18" },
        { label: "Bosco di San Francesco (FAI)", value: "gratis fino a 5 anni · famiglia 16 €" },
        { label: "Basilica di San Francesco", value: "ingresso gratuito" },
        { label: "Da La Mora", value: "Piazza del Comune a 6,8 km · circa 14 min" },
        { label: "In auto", value: "centro storico in gran parte ZTL: si parcheggia fuori" },
      ],
    },
    intro:
      "Assisi non è solo una città da visitare in silenzio: per i bambini ci sono un castello da esplorare, una piazza romana nascosta sotto terra e un sentiero tra gli ulivi. Ecco un itinerario per uno o due giorni, con orari e biglietti verificati sulle fonti ufficiali e i consigli di chi abita a pochi chilometri, ad Agriturismo La Mora.",
    content: [
      { type: "h2", text: "Prima di partire: auto e parcheggi" },
      {
        type: "p",
        text: "Il centro storico di Assisi è in gran parte zona a traffico limitato: si parcheggia alle porte della città e si prosegue a piedi. Il parcheggio più vicino alla Basilica di San Francesco è il Giovanni Paolo II, quello più vicino a Santa Chiara è a Porta Nuova. Da La Mora, Piazza del Comune è a 6,8 km, circa 14 minuti in auto.",
      },
      {
        type: "p",
        text: "Le strade del centro sono in salita e spesso a gradini: con i più piccoli un marsupio è più comodo del passeggino, e scarpe comode valgono per tutti.",
      },
      { type: "h2", text: "Giorno 1, mattina: la Basilica di San Francesco" },
      {
        type: "p",
        text: "Si comincia dalla Basilica di San Francesco, a ingresso gratuito per i visitatori singoli. Con l'ora legale la Chiesa inferiore è aperta dalle 6:00 alle 19:00 (il mercoledì fino alle 18:00) e la Chiesa superiore dalle 8:30 alle 18:45; d'inverno la Chiesa superiore chiude alle 18:00. Per i bambini, gli affreschi della Chiesa superiore sono un grande libro illustrato: cercate insieme la scena della predica agli uccelli.",
      },
      { type: "h2", text: "Giorno 1, mezzogiorno: la piazza e il Foro Romano sotto terra" },
      {
        type: "p",
        text: "Lungo via San Francesco si arriva in Piazza del Comune, dove le colonne del Tempio di Minerva, a ingresso gratuito, raccontano che qui c'era una città romana. La prova è sotto i piedi: da via Portica si scende nel Foro Romano, tra resti e reperti, una visita breve che ai bambini sembra un'esplorazione.",
      },
      {
        type: "p",
        text: "Il Foro Romano costa 7 € (ridotto 5 € dai 9 ai 18 anni) ed è gratuito fino a 8 anni. Da novembre a febbraio è aperto dalle 10:00 alle 17:00, chiuso il martedì; negli altri mesi tutti i giorni dalle 10:00, fino alle 18:00 o, a luglio e agosto, alle 19:00.",
      },
      {
        type: "image",
        src: PIAZZA_DEL_COMUNE,
        alt: "Piazza del Comune ad Assisi, con la Torre del Popolo e le colonne del Tempio di Minerva",
        caption: "Piazza del Comune, con il Tempio di Minerva.",
        portrait: true,
      },
      { type: "h2", text: "Giorno 1, pomeriggio: Santa Chiara e la Rocca Maggiore" },
      {
        type: "p",
        text: "Dall'altra parte della piazza si scende alla Basilica di Santa Chiara, a ingresso gratuito, che custodisce il Crocifisso di San Damiano. Poi si sale alla Rocca Maggiore, la fortezza che domina la città: torri, camminamenti e una vista sulla valle che i bambini ricordano a lungo.",
      },
      {
        type: "p",
        text: "La Rocca apre alle 10:00 e chiude alle 17:00 da novembre a febbraio, più tardi negli altri mesi (fino alle 20:00 d'estate); la biglietteria chiude 45 minuti prima, e il 25 dicembre è chiusa. Il biglietto costa 8 €, 6 € dai 9 ai 18 anni, ed è gratuito fino a 8 anni. La scheda ufficiale la indica come non accessibile: il passeggino resta in auto.",
      },
      { type: "h2", text: "Giorno 2: il Bosco di San Francesco" },
      {
        type: "p",
        text: "Il secondo giorno è all'aria aperta. Il Bosco di San Francesco, del FAI, è un sentiero di 1,5 km in pendenza, con fondo naturale e alcuni gradini, che sotto la Basilica attraversa uliveti e bosco; lungo il percorso si incontra il Terzo Paradiso di Michelangelo Pistoletto, tre grandi cerchi di ulivi da scoprire insieme. Ci sono due ingressi: dalla piazza della Basilica superiore, con una breve scalinata, e dal complesso benedettino di Santa Croce.",
      },
      {
        type: "p",
        text: "Dal 25 ottobre 2026 al 6 gennaio 2027 il Bosco è aperto dalle 10:00 alle 16:00, con ultimo ingresso alle 14:00; chiude il lunedì, dal 24 al 26 dicembre e il 1° gennaio. Il biglietto costa 6 €, 3 € dai 6 ai 18 anni, ed è gratuito fino a 5 anni; il biglietto famiglia, per due adulti e i figli dai 6 ai 18 anni, costa 16 €.",
      },
      {
        type: "image",
        src: BOSCO_DALL_ALTO,
        alt: "Il Bosco di San Francesco visto dall'alto, con gli ulivi del Terzo Paradiso disposti in cerchi sul prato e i boschi intorno",
        caption: "Il Bosco di San Francesco visto dall'alto.",
      },
      {
        type: "p",
        text: "Per una passeggiata più breve, da Porta Nuova si segue il cartello per il Santuario di San Damiano, a ingresso gratuito: si visita dalle 10:00 alle 12:00 e dalle 14:00 alle 18:00 (alle 16:30 con l'ora solare).",
      },
      { type: "h2", text: "E per finire: Santa Maria degli Angeli e la campagna" },
      {
        type: "p",
        text: "Sulla strada del ritorno, la Basilica di Santa Maria degli Angeli è a 2,1 km da La Mora: dentro c'è la Porziuncola, la chiesetta di Francesco, minuscola sotto la grande cupola. Poi si torna in campagna, al parco giochi e, d'estate, in piscina.",
      },
      {
        type: "links",
        heading: "Per organizzare la gita",
        items: [
          { label: "Vacanza in famiglia a La Mora", href: "/vacanza-in-famiglia/" },
          { label: "Il Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
          { label: "Il Santuario di San Damiano", href: "/blog/santuario-san-damiano/" },
          { label: "Santa Maria degli Angeli e la Porziuncola", href: "/blog/basilica-santa-maria-degli-angeli/" },
          { label: "Agriturismo con bambini: come scegliere", href: "/blog/agriturismo-con-bambini-come-scegliere/" },
          { label: "Cosa vedere intorno a La Mora", href: "/territorio/" },
          { label: "Rocca Maggiore: scheda ufficiale", href: VISIT_ASSISI_ROCCA },
          { label: "Bosco di San Francesco: FAI", href: FAI_BOSCO },
          { label: "Basilica di San Francesco: orari", href: BASILICA_ORARI },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti su Assisi con i bambini",
      items: [
        { q: "I bambini pagano alla Rocca Maggiore?", a: "Fino a 8 anni l'ingresso è gratuito; dai 9 ai 18 anni il ridotto costa 6 €, l'intero 8 €." },
        { q: "Si paga per entrare nella Basilica di San Francesco?", a: "No: per i visitatori singoli l'ingresso è gratuito e non serve biglietto." },
        { q: "Il Bosco di San Francesco è adatto ai bambini?", a: "Sì, con scarpe comode: è un sentiero di 1,5 km in pendenza, con alcuni gradini. Gratis fino a 5 anni, 3 € dai 6 ai 18." },
        { q: "Si può girare Assisi con il passeggino?", a: "Il centro è in salita e con molti gradini, e la Rocca Maggiore non è accessibile: meglio un marsupio." },
        { q: "Dove si parcheggia per visitare Assisi?", a: "Fuori dal centro storico, che è in gran parte ZTL: il parcheggio più vicino alla Basilica di San Francesco è il Giovanni Paolo II, quello più vicino a Santa Chiara è a Porta Nuova." },
      ],
    },
    disclaimer: CHECKED.it,
    finalCtaHeading: "Assisi di giorno, la campagna la sera.",
    finalCtaBody: "Appartamenti con cucina, parco giochi e piscina a 6,8 km dal centro.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "assisi-con-i-bambini",
    topics: ["family"],
    category: "Family",
    title: "Assisi with children: what to do in 1 or 2 days",
    excerpt:
      "An itinerary for visiting Assisi with children in one or two days: the Rocca Maggiore, the underground Roman Forum, the Basilica of St. Francis and the FAI woodland walk, with opening times and tickets.",
    metaDescription:
      "Assisi with children in 1 or 2 days: Rocca Maggiore, Roman Forum, Basilica of St. Francis and the FAI woodland. Opening times, reduced tickets and parking.",
    image: ROCCA_MAGGIORE,
    alt: "The Rocca Maggiore of Assisi on the hilltop, above the cypresses and the rooftops of the town",
    imagePosition: "50% 35%",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Rocca Maggiore", value: "free up to age 8 · €6 ages 9 to 18" },
        { label: "Roman Forum", value: "free up to age 8 · €5 ages 9 to 18" },
        { label: "Bosco di San Francesco (FAI)", value: "free up to age 5 · family €16" },
        { label: "Basilica of St. Francis", value: "free admission" },
        { label: "From La Mora", value: "Piazza del Comune 6.8 km · about 14 min" },
        { label: "By car", value: "historic centre largely ZTL: park outside" },
      ],
    },
    intro:
      "Assisi is not just a town to visit in silence: for children there is a castle to explore, a Roman square hidden underground and a path among the olive trees. Here is an itinerary for one or two days, with opening times and tickets checked against official sources, and tips from people who live a few kilometres away, at Agriturismo La Mora.",
    content: [
      { type: "h2", text: "Before you go: car and parking" },
      {
        type: "p",
        text: "The historic centre of Assisi is largely a limited traffic zone (ZTL): you park at the gates of the town and continue on foot. The car park nearest the Basilica of St. Francis is Giovanni Paolo II; the one nearest Santa Chiara is at Porta Nuova. From La Mora, Piazza del Comune is 6.8 km away, about 14 minutes by car.",
      },
      {
        type: "p",
        text: "The streets of the centre climb and often have steps: with little ones a baby carrier is easier than a pushchair, and comfortable shoes are a must for everyone.",
      },
      { type: "h2", text: "Day 1, morning: the Basilica of St. Francis" },
      {
        type: "p",
        text: "Start at the Basilica of St. Francis, free for individual visitors. During summer time the Lower Church is open from 6:00 to 19:00 (on Wednesdays until 18:00) and the Upper Church from 8:30 to 18:45; in winter the Upper Church closes at 18:00. For children, the frescoes of the Upper Church are a huge picture book: look together for the scene of the sermon to the birds.",
      },
      { type: "h2", text: "Day 1, midday: the square and the underground Roman Forum" },
      {
        type: "p",
        text: "Along via San Francesco you reach Piazza del Comune, where the columns of the Temple of Minerva, free to enter, tell you that a Roman town stood here. The proof is under your feet: from via Portica you go down into the Roman Forum, among ruins and finds, a short visit that feels like an expedition to children.",
      },
      {
        type: "p",
        text: "The Roman Forum costs €7 (reduced €5 for ages 9 to 18) and is free up to age 8. From November to February it is open from 10:00 to 17:00, closed on Tuesdays; in the other months every day from 10:00, until 18:00 or, in July and August, 19:00.",
      },
      {
        type: "image",
        src: PIAZZA_DEL_COMUNE,
        alt: "Piazza del Comune in Assisi, with the Torre del Popolo and the columns of the Temple of Minerva",
        caption: "Piazza del Comune, with the Temple of Minerva.",
        portrait: true,
      },
      { type: "h2", text: "Day 1, afternoon: Santa Chiara and the Rocca Maggiore" },
      {
        type: "p",
        text: "On the other side of the square, walk down to the Basilica of Santa Chiara, free to enter, which keeps the San Damiano Crucifix. Then climb to the Rocca Maggiore, the fortress that dominates the town: towers, walkways and a view over the valley that children remember for a long time.",
      },
      {
        type: "p",
        text: "The Rocca opens at 10:00 and closes at 17:00 from November to February, later in the other months (until 20:00 in summer); the ticket office closes 45 minutes earlier, and it is closed on 25 December. Tickets cost €8, €6 for ages 9 to 18, and admission is free up to age 8. The official listing describes it as not accessible: leave the pushchair in the car.",
      },
      { type: "h2", text: "Day 2: the Bosco di San Francesco" },
      {
        type: "p",
        text: "Day two is spent outdoors. The Bosco di San Francesco, run by FAI, is a 1.5 km sloping path with a natural surface and a few steps, running below the Basilica through olive groves and woodland; along the way you find Michelangelo Pistoletto's Third Paradise, three great circles of olive trees to discover together. There are two entrances: from the square of the Upper Basilica, via a short flight of steps, and from the Benedictine complex of Santa Croce.",
      },
      {
        type: "p",
        text: "From 25 October 2026 to 6 January 2027 the Bosco is open from 10:00 to 16:00, with last entry at 14:00; it is closed on Mondays, from 24 to 26 December and on 1 January. Tickets cost €6, €3 for ages 6 to 18, and are free up to age 5; the family ticket, for two adults and children aged 6 to 18, costs €16.",
      },
      {
        type: "image",
        src: BOSCO_DALL_ALTO,
        alt: "The Bosco di San Francesco from above, with the olive trees of the Third Paradise arranged in circles on the meadow and woods all around",
        caption: "The Bosco di San Francesco from above.",
      },
      {
        type: "p",
        text: "For a shorter walk, from Porta Nuova follow the sign for the Sanctuary of San Damiano, free to enter: visits are from 10:00 to 12:00 and from 14:00 to 18:00 (16:30 in winter time).",
      },
      { type: "h2", text: "To finish: Santa Maria degli Angeli and the countryside" },
      {
        type: "p",
        text: "On the way back, the Basilica of Santa Maria degli Angeli is 2.1 km from La Mora: inside is the Porziuncola, Francis's little church, tiny beneath the great dome. Then it's back to the countryside, to the playground and, in summer, the pool.",
      },
      {
        type: "links",
        heading: "Plan the day",
        items: [
          { label: "Family holidays at La Mora", href: "/vacanza-in-famiglia/" },
          { label: "The Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
          { label: "The Sanctuary of San Damiano", href: "/blog/santuario-san-damiano/" },
          { label: "Santa Maria degli Angeli and the Porziuncola", href: "/blog/basilica-santa-maria-degli-angeli/" },
          { label: "Agriturismo with children: how to choose", href: "/blog/agriturismo-con-bambini-come-scegliere/" },
          { label: "What to see around La Mora", href: "/territorio/" },
          { label: "Rocca Maggiore: official page", href: VISIT_ASSISI_ROCCA },
          { label: "Bosco di San Francesco: FAI", href: FAI_BOSCO },
          { label: "Basilica of St. Francis: opening times", href: BASILICA_ORARI },
        ],
      },
    ],
    faq: {
      heading: "Frequently asked questions about Assisi with children",
      items: [
        { q: "Do children pay at the Rocca Maggiore?", a: "Admission is free up to age 8; from 9 to 18 the reduced ticket costs €6, the full ticket €8." },
        { q: "Do you pay to enter the Basilica of St. Francis?", a: "No: admission is free for individual visitors and no ticket is needed." },
        { q: "Is the Bosco di San Francesco suitable for children?", a: "Yes, with comfortable shoes: it is a 1.5 km sloping path with a few steps. Free up to age 5, €3 from 6 to 18." },
        { q: "Can you get around Assisi with a pushchair?", a: "The centre is hilly with many steps, and the Rocca Maggiore is not accessible: a baby carrier is better." },
        { q: "Where do you park to visit Assisi?", a: "Outside the historic centre, which is largely ZTL: the car park nearest the Basilica of St. Francis is Giovanni Paolo II, the one nearest Santa Chiara is at Porta Nuova." },
      ],
    },
    disclaimer: CHECKED.en,
    finalCtaHeading: "Assisi by day, the countryside in the evening.",
    finalCtaBody: "Apartments with a kitchen, a playground and a pool, 6.8 km from the centre.",
    finalCtaLabel: "See the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "assisi-con-i-bambini",
    topics: ["family"],
    category: "En famille",
    title: "Assise avec des enfants : que faire en 1 ou 2 jours",
    excerpt:
      "Un itinéraire pour visiter Assise avec des enfants en un ou deux jours : la Rocca Maggiore, le Forum romain souterrain, la basilique Saint-François et la balade dans le bois du FAI, avec horaires et billets.",
    metaDescription:
      "Assise avec des enfants en 1 ou 2 jours : Rocca Maggiore, Forum romain, basilique Saint-François et bois du FAI. Horaires, billets réduits et parkings.",
    image: ROCCA_MAGGIORE,
    alt: "La Rocca Maggiore d'Assise au sommet de la colline, au-dessus des cyprès et des toits de la ville",
    imagePosition: "50% 35%",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "Rocca Maggiore", value: "gratuit jusqu'à 8 ans · 6 € de 9 à 18 ans" },
        { label: "Forum romain", value: "gratuit jusqu'à 8 ans · 5 € de 9 à 18 ans" },
        { label: "Bosco di San Francesco (FAI)", value: "gratuit jusqu'à 5 ans · famille 16 €" },
        { label: "Basilique Saint-François", value: "entrée gratuite" },
        { label: "Depuis La Mora", value: "Piazza del Comune à 6,8 km · environ 14 min" },
        { label: "En voiture", value: "centre historique en grande partie en ZTL : on se gare dehors" },
      ],
    },
    intro:
      "Assise n'est pas seulement une ville à visiter en silence : pour les enfants, il y a un château à explorer, une place romaine cachée sous terre et un sentier parmi les oliviers. Voici un itinéraire pour un ou deux jours, avec des horaires et des billets vérifiés auprès des sources officielles, et les conseils de ceux qui habitent à quelques kilomètres, à l'Agriturismo La Mora.",
    content: [
      { type: "h2", text: "Avant de partir : voiture et parkings" },
      {
        type: "p",
        text: "Le centre historique d'Assise est en grande partie une zone à trafic limité (ZTL) : on se gare aux portes de la ville et on continue à pied. Le parking le plus proche de la basilique Saint-François est le Giovanni Paolo II, celui le plus proche de Santa Chiara est à Porta Nuova. Depuis La Mora, la Piazza del Comune est à 6,8 km, environ 14 minutes en voiture.",
      },
      {
        type: "p",
        text: "Les rues du centre montent et ont souvent des marches : avec les tout-petits, un porte-bébé est plus pratique qu'une poussette, et de bonnes chaussures, pour tous.",
      },
      { type: "h2", text: "Jour 1, matin : la basilique Saint-François" },
      {
        type: "p",
        text: "On commence par la basilique Saint-François, gratuite pour les visiteurs individuels. À l'heure d'été, l'église inférieure est ouverte de 6h00 à 19h00 (le mercredi jusqu'à 18h00) et l'église supérieure de 8h30 à 18h45 ; en hiver, l'église supérieure ferme à 18h00. Pour les enfants, les fresques de l'église supérieure sont un grand livre d'images : cherchez ensemble la scène du sermon aux oiseaux.",
      },
      { type: "h2", text: "Jour 1, midi : la place et le Forum romain souterrain" },
      {
        type: "p",
        text: "Par la via San Francesco, on arrive sur la Piazza del Comune, où les colonnes du temple de Minerve, en accès libre, rappellent qu'ici se trouvait une ville romaine. La preuve est sous vos pieds : depuis la via Portica, on descend dans le Forum romain, parmi les vestiges et les objets retrouvés, une courte visite qui ressemble à une exploration.",
      },
      {
        type: "p",
        text: "Le Forum romain coûte 7 € (réduit 5 € de 9 à 18 ans) et il est gratuit jusqu'à 8 ans. De novembre à février, il est ouvert de 10h00 à 17h00, fermé le mardi ; les autres mois, tous les jours à partir de 10h00, jusqu'à 18h00 ou, en juillet et août, 19h00.",
      },
      {
        type: "image",
        src: PIAZZA_DEL_COMUNE,
        alt: "La Piazza del Comune à Assise, avec la Torre del Popolo et les colonnes du temple de Minerve",
        caption: "La Piazza del Comune et le temple de Minerve.",
        portrait: true,
      },
      { type: "h2", text: "Jour 1, après-midi : Santa Chiara et la Rocca Maggiore" },
      {
        type: "p",
        text: "De l'autre côté de la place, on descend vers la basilique Sainte-Claire, en entrée libre, qui conserve le crucifix de San Damiano. Puis on monte à la Rocca Maggiore, la forteresse qui domine la ville : tours, chemins de ronde et une vue sur la vallée dont les enfants se souviennent longtemps.",
      },
      {
        type: "p",
        text: "La Rocca ouvre à 10h00 et ferme à 17h00 de novembre à février, plus tard les autres mois (jusqu'à 20h00 en été) ; la billetterie ferme 45 minutes avant, et elle est fermée le 25 décembre. Le billet coûte 8 €, 6 € de 9 à 18 ans, et l'entrée est gratuite jusqu'à 8 ans. La fiche officielle l'indique comme non accessible : la poussette reste dans la voiture.",
      },
      { type: "h2", text: "Jour 2 : le Bosco di San Francesco" },
      {
        type: "p",
        text: "Le deuxième jour, on sort au grand air. Le Bosco di San Francesco, géré par le FAI, est un sentier de 1,5 km en pente, au sol naturel et avec quelques marches, qui traverse oliveraies et bois sous la basilique ; en chemin, on découvre le Troisième Paradis de Michelangelo Pistoletto, trois grands cercles d'oliviers. Il y a deux entrées : depuis la place de la basilique supérieure, par un court escalier, et depuis le complexe bénédictin de Santa Croce.",
      },
      {
        type: "p",
        text: "Du 25 octobre 2026 au 6 janvier 2027, le Bosco est ouvert de 10h00 à 16h00, avec dernière entrée à 14h00 ; il est fermé le lundi, du 24 au 26 décembre et le 1er janvier. Le billet coûte 6 €, 3 € de 6 à 18 ans, et il est gratuit jusqu'à 5 ans ; le billet famille, pour deux adultes et les enfants de 6 à 18 ans, coûte 16 €.",
      },
      {
        type: "image",
        src: BOSCO_DALL_ALTO,
        alt: "Le Bosco di San Francesco vu d'en haut, avec les oliviers du Troisième Paradis disposés en cercles sur le pré et les bois autour",
        caption: "Le Bosco di San Francesco vu d'en haut.",
      },
      {
        type: "p",
        text: "Pour une promenade plus courte, depuis Porta Nuova, suivez le panneau du sanctuaire de San Damiano, en entrée libre : les visites ont lieu de 10h00 à 12h00 et de 14h00 à 18h00 (16h30 à l'heure d'hiver).",
      },
      { type: "h2", text: "Pour finir : Sainte-Marie-des-Anges et la campagne" },
      {
        type: "p",
        text: "Sur le chemin du retour, la basilique Sainte-Marie-des-Anges est à 2,1 km de La Mora : à l'intérieur se trouve la Portioncule, la petite église de François, minuscule sous l'immense coupole. Puis retour à la campagne, à l'aire de jeux et, l'été, à la piscine.",
      },
      {
        type: "links",
        heading: "Pour organiser la journée",
        items: [
          { label: "Vacances en famille à La Mora", href: "/vacanza-in-famiglia/" },
          { label: "Le Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
          { label: "Le sanctuaire de San Damiano", href: "/blog/santuario-san-damiano/" },
          { label: "Sainte-Marie-des-Anges et la Portioncule", href: "/blog/basilica-santa-maria-degli-angeli/" },
          { label: "Agritourisme avec enfants : comment choisir", href: "/blog/agriturismo-con-bambini-come-scegliere/" },
          { label: "Que voir autour de La Mora", href: "/territorio/" },
          { label: "Rocca Maggiore : fiche officielle", href: VISIT_ASSISI_ROCCA },
          { label: "Bosco di San Francesco : FAI", href: FAI_BOSCO },
          { label: "Basilique Saint-François : horaires", href: BASILICA_ORARI },
        ],
      },
    ],
    faq: {
      heading: "Questions fréquentes sur Assise avec des enfants",
      items: [
        { q: "Les enfants paient-ils à la Rocca Maggiore ?", a: "L'entrée est gratuite jusqu'à 8 ans ; de 9 à 18 ans, le billet réduit coûte 6 €, le plein tarif 8 €." },
        { q: "Faut-il payer pour entrer dans la basilique Saint-François ?", a: "Non : l'entrée est gratuite pour les visiteurs individuels et aucun billet n'est nécessaire." },
        { q: "Le Bosco di San Francesco convient-il aux enfants ?", a: "Oui, avec de bonnes chaussures : c'est un sentier de 1,5 km en pente, avec quelques marches. Gratuit jusqu'à 5 ans, 3 € de 6 à 18 ans." },
        { q: "Peut-on visiter Assise en poussette ?", a: "Le centre est en pente, avec beaucoup de marches, et la Rocca Maggiore n'est pas accessible : mieux vaut un porte-bébé." },
        { q: "Où se garer pour visiter Assise ?", a: "En dehors du centre historique, en grande partie en ZTL : le parking le plus proche de la basilique Saint-François est le Giovanni Paolo II, celui le plus proche de Santa Chiara est à Porta Nuova." },
      ],
    },
    disclaimer: CHECKED.fr,
    finalCtaHeading: "Assise le jour, la campagne le soir.",
    finalCtaBody: "Des appartements avec cuisine, une aire de jeux et une piscine, à 6,8 km du centre.",
    finalCtaLabel: "Voir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "assisi-con-i-bambini",
    topics: ["family"],
    category: "Mit Familie",
    title: "Assisi mit Kindern: was man an 1 oder 2 Tagen unternehmen kann",
    excerpt:
      "Eine Route für Assisi mit Kindern an ein oder zwei Tagen: die Rocca Maggiore, das unterirdische Forum Romanum, die Basilika San Francesco und der Spaziergang im FAI-Wald, mit Öffnungszeiten und Tickets.",
    metaDescription:
      "Assisi mit Kindern an 1 oder 2 Tagen: Rocca Maggiore, Forum Romanum, Basilika San Francesco und FAI-Wald. Öffnungszeiten, ermäßigte Tickets und Parkplätze.",
    image: ROCCA_MAGGIORE,
    alt: "Die Rocca Maggiore von Assisi auf dem Hügel, über den Zypressen und den Dächern der Stadt",
    imagePosition: "50% 35%",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "Rocca Maggiore", value: "frei bis 8 Jahre · 6 € von 9 bis 18" },
        { label: "Forum Romanum", value: "frei bis 8 Jahre · 5 € von 9 bis 18" },
        { label: "Bosco di San Francesco (FAI)", value: "frei bis 5 Jahre · Familie 16 €" },
        { label: "Basilika San Francesco", value: "Eintritt frei" },
        { label: "Vom La Mora", value: "Piazza del Comune 6,8 km · rund 14 Min." },
        { label: "Mit dem Auto", value: "Altstadt großteils ZTL: draußen parken" },
      ],
    },
    intro:
      "Assisi ist nicht nur eine Stadt, die man in Stille besichtigt: Für Kinder gibt es eine Burg zum Erkunden, einen römischen Platz unter der Erde und einen Weg zwischen Olivenbäumen. Hier ist eine Route für ein oder zwei Tage, mit Öffnungszeiten und Tickets, die wir bei den offiziellen Quellen geprüft haben, und Tipps von Menschen, die ein paar Kilometer entfernt wohnen, im Agriturismo La Mora.",
    content: [
      { type: "h2", text: "Vor der Abfahrt: Auto und Parkplätze" },
      {
        type: "p",
        text: "Die Altstadt von Assisi ist großteils verkehrsberuhigte Zone (ZTL): Man parkt an den Toren der Stadt und geht zu Fuß weiter. Der Parkplatz am nächsten zur Basilika San Francesco ist Giovanni Paolo II, der nächste zu Santa Chiara liegt an der Porta Nuova. Vom La Mora ist die Piazza del Comune 6,8 km entfernt, rund 14 Minuten mit dem Auto.",
      },
      {
        type: "p",
        text: "Die Straßen im Zentrum sind steil und haben oft Stufen: Mit kleinen Kindern ist eine Babytrage praktischer als ein Kinderwagen, und bequeme Schuhe sind für alle Pflicht.",
      },
      { type: "h2", text: "Tag 1, vormittags: die Basilika San Francesco" },
      {
        type: "p",
        text: "Los geht es bei der Basilika San Francesco, für Einzelbesucher kostenlos. Während der Sommerzeit ist die Unterkirche von 6:00 bis 19:00 Uhr geöffnet (mittwochs bis 18:00 Uhr) und die Oberkirche von 8:30 bis 18:45 Uhr; im Winter schließt die Oberkirche um 18:00 Uhr. Für Kinder sind die Fresken der Oberkirche ein großes Bilderbuch: Sucht gemeinsam die Szene der Vogelpredigt.",
      },
      { type: "h2", text: "Tag 1, mittags: die Piazza und das unterirdische Forum Romanum" },
      {
        type: "p",
        text: "Über die Via San Francesco erreicht man die Piazza del Comune, wo die Säulen des Minervatempels, Eintritt frei, davon erzählen, dass hier eine römische Stadt stand. Der Beweis liegt unter den Füßen: Von der Via Portica steigt man hinab ins Forum Romanum, zwischen Ruinen und Fundstücken, ein kurzer Besuch, der Kindern wie eine Expedition vorkommt.",
      },
      {
        type: "p",
        text: "Das Forum Romanum kostet 7 € (ermäßigt 5 € von 9 bis 18 Jahren) und ist bis 8 Jahre frei. Von November bis Februar ist es von 10:00 bis 17:00 Uhr geöffnet, dienstags geschlossen; in den übrigen Monaten täglich ab 10:00 Uhr, bis 18:00 Uhr oder, im Juli und August, bis 19:00 Uhr.",
      },
      {
        type: "image",
        src: PIAZZA_DEL_COMUNE,
        alt: "Die Piazza del Comune in Assisi, mit der Torre del Popolo und den Säulen des Minervatempels",
        caption: "Die Piazza del Comune mit dem Minervatempel.",
        portrait: true,
      },
      { type: "h2", text: "Tag 1, nachmittags: Santa Chiara und die Rocca Maggiore" },
      {
        type: "p",
        text: "Auf der anderen Seite der Piazza geht es hinunter zur Basilika Santa Chiara, Eintritt frei, die das Kreuz von San Damiano bewahrt. Dann steigt man zur Rocca Maggiore hinauf, der Festung über der Stadt: Türme, Wehrgänge und ein Blick über das Tal, an den sich Kinder lange erinnern.",
      },
      {
        type: "p",
        text: "Die Rocca öffnet um 10:00 Uhr und schließt von November bis Februar um 17:00 Uhr, in den übrigen Monaten später (im Sommer bis 20:00 Uhr); die Kasse schließt 45 Minuten vorher, und am 25. Dezember ist geschlossen. Das Ticket kostet 8 €, 6 € von 9 bis 18 Jahren, bis 8 Jahre ist der Eintritt frei. Die offizielle Seite nennt sie nicht barrierefrei: Der Kinderwagen bleibt im Auto.",
      },
      { type: "h2", text: "Tag 2: der Bosco di San Francesco" },
      {
        type: "p",
        text: "Der zweite Tag gehört der frischen Luft. Der Bosco di San Francesco, betreut vom FAI, ist ein 1,5 km langer, abschüssiger Weg mit Naturboden und einigen Stufen, der unterhalb der Basilika durch Olivenhaine und Wald führt; unterwegs trifft man auf das Dritte Paradies von Michelangelo Pistoletto, drei große Kreise aus Olivenbäumen zum gemeinsamen Entdecken. Es gibt zwei Eingänge: vom Platz der Oberkirche, über eine kurze Treppe, und vom Benediktinerkomplex Santa Croce.",
      },
      {
        type: "p",
        text: "Vom 25. Oktober 2026 bis 6. Januar 2027 ist der Bosco von 10:00 bis 16:00 Uhr geöffnet, letzter Einlass um 14:00 Uhr; montags, vom 24. bis 26. Dezember und am 1. Januar ist geschlossen. Das Ticket kostet 6 €, 3 € von 6 bis 18 Jahren, und ist bis 5 Jahre frei; das Familienticket für zwei Erwachsene und Kinder von 6 bis 18 Jahren kostet 16 €.",
      },
      {
        type: "image",
        src: BOSCO_DALL_ALTO,
        alt: "Der Bosco di San Francesco von oben, mit den Olivenbäumen des Dritten Paradieses in Kreisen auf der Wiese und Wald ringsum",
        caption: "Der Bosco di San Francesco von oben.",
      },
      {
        type: "p",
        text: "Für einen kürzeren Spaziergang folgen Sie ab der Porta Nuova dem Schild zum Heiligtum San Damiano, Eintritt frei: Besuche sind von 10:00 bis 12:00 und von 14:00 bis 18:00 Uhr möglich (zur Winterzeit bis 16:30 Uhr).",
      },
      { type: "h2", text: "Zum Abschluss: Santa Maria degli Angeli und das Land" },
      {
        type: "p",
        text: "Auf dem Rückweg liegt die Basilika Santa Maria degli Angeli 2,1 km vom La Mora entfernt: Darin steht die Portiuncula, das Kirchlein des Franziskus, winzig unter der großen Kuppel. Dann geht es zurück aufs Land, zum Spielplatz und, im Sommer, in den Pool.",
      },
      {
        type: "links",
        heading: "Den Tag planen",
        items: [
          { label: "Familienurlaub im La Mora", href: "/vacanza-in-famiglia/" },
          { label: "Der Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
          { label: "Das Heiligtum San Damiano", href: "/blog/santuario-san-damiano/" },
          { label: "Santa Maria degli Angeli und die Portiuncula", href: "/blog/basilica-santa-maria-degli-angeli/" },
          { label: "Agriturismo mit Kindern: richtig wählen", href: "/blog/agriturismo-con-bambini-come-scegliere/" },
          { label: "Sehenswertes rund um das La Mora", href: "/territorio/" },
          { label: "Rocca Maggiore: offizielle Seite", href: VISIT_ASSISI_ROCCA },
          { label: "Bosco di San Francesco: FAI", href: FAI_BOSCO },
          { label: "Basilika San Francesco: Öffnungszeiten", href: BASILICA_ORARI },
        ],
      },
    ],
    faq: {
      heading: "Häufige Fragen zu Assisi mit Kindern",
      items: [
        { q: "Zahlen Kinder bei der Rocca Maggiore?", a: "Bis 8 Jahre ist der Eintritt frei; von 9 bis 18 Jahren kostet das ermäßigte Ticket 6 €, das volle 8 €." },
        { q: "Kostet der Eintritt in die Basilika San Francesco etwas?", a: "Nein: Für Einzelbesucher ist der Eintritt frei, ein Ticket ist nicht nötig." },
        { q: "Ist der Bosco di San Francesco für Kinder geeignet?", a: "Ja, mit bequemen Schuhen: Es ist ein 1,5 km langer, abschüssiger Weg mit einigen Stufen. Frei bis 5 Jahre, 3 € von 6 bis 18." },
        { q: "Kann man Assisi mit dem Kinderwagen besichtigen?", a: "Das Zentrum ist steil und hat viele Stufen, und die Rocca Maggiore ist nicht barrierefrei: Besser eine Babytrage." },
        { q: "Wo parkt man, um Assisi zu besichtigen?", a: "Außerhalb der Altstadt, die großteils ZTL ist: Der Parkplatz am nächsten zur Basilika San Francesco ist Giovanni Paolo II, der nächste zu Santa Chiara liegt an der Porta Nuova." },
      ],
    },
    disclaimer: CHECKED.de,
    finalCtaHeading: "Tagsüber Assisi, abends das Land.",
    finalCtaBody: "Ferienwohnungen mit Küche, Spielplatz und Pool, 6,8 km vom Zentrum.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};

/* "Assisi con il cane". Fonti verificate il 21/10/2026:
   - Ordinanza del Ministero della Salute del 6/8/2013 (GU n. 209 del
     6/9/2013, art. 1: guinzaglio max 1,50 m, museruola al seguito,
     raccolta delle deiezioni), prorogata da ultimo con l'ordinanza del
     16/7/2026 (GU n. 206 del 5/9/2026) per dodici mesi dal 5/9/2026;
   - Bosco di San Francesco: fondoambiente.it ("I cani sono ammessi, sempre
     al guinzaglio"; nella chiesa di Santa Croce solo cani guida e di
     assistenza);
   - Parco del Monte Subasio: regolamento pubblicato da regione.umbria.it
     (art. 13; documento del piano di gestione, quindi "il regolamento
     prevede"), consiglio sui caprioli dall'ecomanuale della Regione;
   - parcheggi e ZTL: visit-assisi.it; San Damiano: santuariosandamiano.org.
   NON verificabili, quindi non affermati: regole sui cani nelle basiliche
   e alla Rocca Maggiore, regolamento comunale di Assisi sui cani. */
const ROCCA_MINORE = "/images/territorio/assisi/rocca minore assisi.jpg";
const BOSCO = "/images/territorio/assisi/bosco di san francesco assisi.jpg";
const ORDINANZA_CANI = "https://www.trovanorme.salute.gov.it/norme/dettaglioAtto?id=114315";

export const ASSISI_DOG_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "assisi-con-il-cane",
    topics: ["pets"],
    category: "Con il cane",
    title: "Assisi con il cane: regole, passeggiate e posti dove andare",
    excerpt:
      "Visitare Assisi con il cane: guinzaglio e museruola, dove parcheggiare, il Bosco di San Francesco del FAI, la passeggiata fino a San Damiano e i sentieri del Monte Subasio.",
    metaDescription:
      "Assisi con il cane: guinzaglio e museruola, parcheggi, il Bosco di San Francesco del FAI (cani al guinzaglio), San Damiano e il Monte Subasio. Con le fonti.",
    image: ROCCA_MINORE,
    alt: "La Rocca Minore sulle mura di Assisi, tra il bosco e le pendici del Monte Subasio",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Guinzaglio", value: "al massimo 1,50 m in città e nei luoghi pubblici" },
        { label: "Museruola", value: "da portare con sé, da usare in caso di rischio" },
        { label: "Bosco di San Francesco (FAI)", value: "cani ammessi, sempre al guinzaglio" },
        { label: "Basiliche", value: "i siti ufficiali non indicano regole sui cani: chiedi prima" },
        { label: "Monte Subasio", value: "Eremo delle Carceri a 12,2 km da La Mora" },
        { label: "Da La Mora", value: "Piazza del Comune a 6,8 km · circa 14 min" },
      ],
    },
    intro:
      "Assisi si gira a piedi, tra vicoli in pietra, scalinate e panorami sulla valle: una città fatta per camminare, anche a quattro zampe. Con qualche attenzione: le regole su guinzaglio e museruola, i luoghi dove il cane è ammesso e quelli dove conviene informarsi prima. Ecco cosa abbiamo verificato sulle fonti ufficiali, con i consigli di Agriturismo La Mora, dove Gemelli e Sagittario accolgono chi viaggia con il proprio cane.",
    content: [
      { type: "h2", text: "Guinzaglio, museruola e sacchetti: le regole" },
      {
        type: "p",
        text: "In tutta Italia vale l'ordinanza del Ministero della Salute del 2013 sulla tutela dell'incolumità pubblica dai cani, prorogata più volte: l'ultima proroga, del luglio 2026, la estende di dodici mesi dal 5 settembre 2026. Chi porta a spasso il cane deve:",
      },
      {
        type: "list",
        items: [
          "usare sempre il guinzaglio, lungo al massimo 1,50 metri, nelle aree urbane e nei luoghi aperti al pubblico;",
          "portare con sé una museruola, rigida o morbida, da mettere al cane in caso di rischio;",
          "raccogliere le deiezioni in città e avere con sé gli strumenti per farlo.",
        ],
      },
      {
        type: "p",
        text: "Sul sito del Comune di Assisi non abbiamo trovato regole aggiuntive sui cani.",
      },
      { type: "h2", text: "Arrivare in centro" },
      {
        type: "p",
        text: "Il centro storico è in gran parte zona a traffico limitato: si parcheggia fuori e si sale a piedi. Il parcheggio più vicino alla Basilica di San Francesco è il Giovanni Paolo II, quello più vicino a Santa Chiara è a Porta Nuova. Da La Mora, Piazza del Comune è a 6,8 km, circa 14 minuti in auto.",
      },
      {
        type: "p",
        text: "Le strade sono in pietra, spesso in salita e a gradini. D'estate la pietra si scalda: meglio uscire la mattina presto o nel tardo pomeriggio, con una ciotola e una bottiglia d'acqua nello zaino.",
      },
      { type: "h2", text: "Chiese e musei: informati prima" },
      {
        type: "p",
        text: "I siti ufficiali delle basiliche di San Francesco, di Santa Chiara e di Santa Maria degli Angeli non pubblicano regole sugli animali, e nemmeno la scheda ufficiale della Rocca Maggiore. Prima di entrare chiedi al personale; se siete in due, entrate a turno mentre l'altro aspetta fuori con il cane.",
      },
      {
        type: "p",
        text: "L'unica regola esplicita che abbiamo trovato riguarda la chiesa di Santa Croce, dentro il Bosco di San Francesco: il FAI vi ammette soltanto i cani guida e i cani di assistenza.",
      },
      { type: "h2", text: "Il Bosco di San Francesco: cani ammessi al guinzaglio" },
      {
        type: "p",
        text: "Il posto più adatto per una passeggiata insieme è il Bosco di San Francesco, del FAI, che lo scrive chiaramente: «I cani sono ammessi, sempre al guinzaglio». È un sentiero di 1,5 km in pendenza, con fondo naturale e alcuni gradini, che sotto la Basilica attraversa uliveti e bosco fino al Terzo Paradiso di Michelangelo Pistoletto. Si entra dalla piazza della Basilica superiore o dal complesso di Santa Croce.",
      },
      {
        type: "p",
        text: "Dal 25 ottobre 2026 al 6 gennaio 2027 il Bosco è aperto dalle 10:00 alle 16:00, con ultimo ingresso alle 14:00; chiude il lunedì, dal 24 al 26 dicembre e il 1° gennaio. Il biglietto intero costa 6 €; la pagina del FAI non prevede biglietti per i cani.",
      },
      {
        type: "image",
        src: BOSCO,
        alt: "Il Bosco di San Francesco ad Assisi, con gli ulivi del Terzo Paradiso nel prato e le colline boscose intorno",
        caption: "Il Bosco di San Francesco, sotto la Basilica.",
      },
      { type: "h2", text: "A piedi fino a San Damiano" },
      {
        type: "p",
        text: "Da Porta Nuova si segue il cartello «Santuario San Damiano»: secondo il santuario, dal parcheggio sono circa 10 minuti a piedi, tra gli ulivi sotto la città. La chiesa è riservata alla preghiera silenziosa: anche qui, uno di voi entra e l'altro resta fuori con il cane.",
      },
      { type: "h2", text: "Sul Monte Subasio" },
      {
        type: "p",
        text: "Per una camminata più lunga si sale al Monte Subasio, il parco regionale sopra Assisi: l'Eremo delle Carceri, da cui partono i sentieri principali, è a 12,2 km da La Mora, circa 20 minuti in auto.",
      },
      {
        type: "p",
        text: "Il regolamento del parco pubblicato dalla Regione Umbria prevede che i cani siano registrati all'anagrafe canina e condotti al guinzaglio, non più lungo di 1,5 metri, che non vengano mai lasciati liberi e che lungo i sentieri si raccolgano le deiezioni. La Regione raccomanda anche di non lasciare che i cani inseguano caprioli e altri animali selvatici.",
      },
      { type: "h2", text: "Dopo la passeggiata" },
      {
        type: "p",
        text: "La sera si torna in campagna. A La Mora gli appartamenti Gemelli e Sagittario, al piano terra, hanno ciascuno il proprio giardino privato e accolgono il tuo cane con un supplemento di 25 € a soggiorno; nelle aree comuni della struttura gli animali vanno tenuti al guinzaglio.",
      },
      {
        type: "links",
        heading: "Per organizzare la gita",
        items: [
          { label: "Vacanza con animali a La Mora", href: "/vacanza-con-animali/" },
          { label: "L'appartamento Gemelli", href: "/alloggi/gemelli/" },
          { label: "L'appartamento Sagittario", href: "/alloggi/sagittario/" },
          { label: "Agriturismo pet friendly: cosa chiedere", href: "/blog/agriturismo-pet-friendly-umbria/" },
          { label: "Cascata delle Marmore con il cane", href: "/blog/cascata-delle-marmore-con-il-cane/" },
          { label: "Il Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
          { label: "Il Monte Subasio", href: "/blog/monte-subasio/" },
          { label: "Ordinanza sui cani", href: ORDINANZA_CANI },
          { label: "Bosco di San Francesco: FAI", href: FAI_BOSCO },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti su Assisi con il cane",
      items: [
        { q: "Si può entrare in chiesa con il cane ad Assisi?", a: "I siti ufficiali delle basiliche non indicano regole sugli animali: chiedi al personale prima di entrare. Nella chiesa di Santa Croce, dentro il Bosco di San Francesco, il FAI ammette solo cani guida e di assistenza." },
        { q: "I cani possono entrare nel Bosco di San Francesco?", a: "Sì: il FAI li ammette, sempre al guinzaglio." },
        { q: "Quanto deve essere lungo il guinzaglio?", a: "Al massimo 1,50 metri nelle aree urbane e nei luoghi aperti al pubblico, secondo l'ordinanza del Ministero della Salute, prorogata fino a settembre 2027." },
        { q: "Serve la museruola?", a: "L'ordinanza chiede di portarla con sé e di usarla in caso di rischio; alcuni luoghi, come la Cascata delle Marmore, la richiedono sempre." },
        { q: "Quali appartamenti di La Mora accettano cani?", a: "Gemelli e Sagittario, al piano terra con giardino privato, con un supplemento di 25 € a soggiorno." },
      ],
    },
    disclaimer: CHECKED.it,
    finalCtaHeading: "Assisi a piedi con il cane, la campagna la sera.",
    finalCtaBody: "Gemelli e Sagittario, al piano terra con giardino privato.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "assisi-con-il-cane",
    topics: ["pets"],
    category: "With your dog",
    title: "Assisi with your dog: rules, walks and places to go",
    excerpt:
      "Visiting Assisi with your dog: leads and muzzles, where to park, FAI's Bosco di San Francesco, the walk to San Damiano and the trails of Monte Subasio.",
    metaDescription:
      "Assisi with your dog: leads and muzzles, parking, FAI's Bosco di San Francesco (dogs on a lead), San Damiano and Monte Subasio. With sources.",
    image: ROCCA_MINORE,
    alt: "The Rocca Minore on the walls of Assisi, between the woods and the slopes of Monte Subasio",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Lead", value: "maximum 1.50 m in towns and public places" },
        { label: "Muzzle", value: "carry one, to use if there is a risk" },
        { label: "Bosco di San Francesco (FAI)", value: "dogs allowed, always on a lead" },
        { label: "Basilicas", value: "official websites give no rules on dogs: ask first" },
        { label: "Monte Subasio", value: "Eremo delle Carceri 12.2 km from La Mora" },
        { label: "From La Mora", value: "Piazza del Comune 6.8 km · about 14 min" },
      ],
    },
    intro:
      "Assisi is explored on foot, through stone alleys, flights of steps and views over the valley: a town made for walking, on four legs too. With a little care: the rules on leads and muzzles, the places where dogs are welcome and those where it is better to ask first. Here is what we checked against official sources, with tips from Agriturismo La Mora, where Gemelli and Sagittario welcome guests travelling with their dog.",
    content: [
      { type: "h2", text: "Leads, muzzles and bags: the rules" },
      {
        type: "p",
        text: "Throughout Italy, the Ministry of Health's 2013 ordinance on protecting the public from dogs applies, extended several times: the latest extension, of July 2026, prolongs it for twelve months from 5 September 2026. Anyone walking a dog must:",
      },
      {
        type: "list",
        items: [
          "always use a lead no longer than 1.50 metres in urban areas and places open to the public;",
          "carry a muzzle, rigid or soft, to put on the dog if there is a risk;",
          "pick up after the dog in town and carry the means to do so.",
        ],
      },
      {
        type: "p",
        text: "We found no additional rules on dogs on the website of the Comune di Assisi.",
      },
      { type: "h2", text: "Getting into the centre" },
      {
        type: "p",
        text: "The historic centre is largely a limited traffic zone: you park outside and walk up. The car park nearest the Basilica of St. Francis is Giovanni Paolo II; the one nearest Santa Chiara is at Porta Nuova. From La Mora, Piazza del Comune is 6.8 km away, about 14 minutes by car.",
      },
      {
        type: "p",
        text: "The streets are stone, often uphill and stepped. In summer the stone heats up: go out early in the morning or late in the afternoon, with a bowl and a bottle of water in your backpack.",
      },
      { type: "h2", text: "Churches and museums: ask first" },
      {
        type: "p",
        text: "The official websites of the basilicas of St. Francis, Santa Chiara and Santa Maria degli Angeli publish no rules on animals, and neither does the official page of the Rocca Maggiore. Ask the staff before going in; if there are two of you, take turns while the other waits outside with the dog.",
      },
      {
        type: "p",
        text: "The only explicit rule we found concerns the church of Santa Croce, inside the Bosco di San Francesco: FAI admits only guide dogs and assistance dogs there.",
      },
      { type: "h2", text: "The Bosco di San Francesco: dogs welcome on a lead" },
      {
        type: "p",
        text: "The best place for a walk together is the Bosco di San Francesco, run by FAI, which says it plainly: 'Dogs are admitted, always on a lead.' It is a 1.5 km sloping path with a natural surface and a few steps, running below the Basilica through olive groves and woodland to Michelangelo Pistoletto's Third Paradise. You enter from the square of the Upper Basilica or from the Santa Croce complex.",
      },
      {
        type: "p",
        text: "From 25 October 2026 to 6 January 2027 the Bosco is open from 10:00 to 16:00, with last entry at 14:00; it is closed on Mondays, from 24 to 26 December and on 1 January. A full ticket costs €6; FAI's page lists no tickets for dogs.",
      },
      {
        type: "image",
        src: BOSCO,
        alt: "The Bosco di San Francesco in Assisi, with the olive trees of the Third Paradise on the meadow and wooded hills around",
        caption: "The Bosco di San Francesco, below the Basilica.",
      },
      { type: "h2", text: "On foot to San Damiano" },
      {
        type: "p",
        text: "From Porta Nuova, follow the sign 'Santuario San Damiano': according to the sanctuary, it is about 10 minutes on foot from the car park, among the olive trees below the town. The church is reserved for silent prayer: here too, one of you goes in while the other stays outside with the dog.",
      },
      { type: "h2", text: "On Monte Subasio" },
      {
        type: "p",
        text: "For a longer walk, head up Monte Subasio, the regional park above Assisi: the Eremo delle Carceri, where the main trails begin, is 12.2 km from La Mora, about 20 minutes by car.",
      },
      {
        type: "p",
        text: "The park regulations published by the Umbria Region provide that dogs must be registered with the dog registry and kept on a lead no longer than 1.5 metres, must never be left to roam, and that you pick up after them along the trails. The Region also recommends not letting dogs chase roe deer and other wild animals.",
      },
      { type: "h2", text: "After the walk" },
      {
        type: "p",
        text: "In the evening, back to the countryside. At La Mora the Gemelli and Sagittario apartments, on the ground floor, each have their own private garden and welcome your dog for a supplement of €25 per stay; in the shared areas of the property pets must be kept on a lead.",
      },
      {
        type: "links",
        heading: "Plan the day",
        items: [
          { label: "Holidays with pets at La Mora", href: "/vacanza-con-animali/" },
          { label: "The Gemelli apartment", href: "/alloggi/gemelli/" },
          { label: "The Sagittario apartment", href: "/alloggi/sagittario/" },
          { label: "Pet-friendly agriturismo: what to ask", href: "/blog/agriturismo-pet-friendly-umbria/" },
          { label: "Marmore Falls with your dog", href: "/blog/cascata-delle-marmore-con-il-cane/" },
          { label: "The Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
          { label: "Monte Subasio", href: "/blog/monte-subasio/" },
          { label: "Ordinance on dogs (Italian)", href: ORDINANZA_CANI },
          { label: "Bosco di San Francesco: FAI", href: FAI_BOSCO },
        ],
      },
    ],
    faq: {
      heading: "Frequently asked questions about Assisi with your dog",
      items: [
        { q: "Can you take your dog into churches in Assisi?", a: "The basilicas' official websites give no rules on animals: ask the staff before going in. In the church of Santa Croce, inside the Bosco di San Francesco, FAI admits only guide and assistance dogs." },
        { q: "Are dogs allowed in the Bosco di San Francesco?", a: "Yes: FAI admits them, always on a lead." },
        { q: "How long can the lead be?", a: "No more than 1.50 metres in urban areas and places open to the public, under the Ministry of Health's ordinance, extended until September 2027." },
        { q: "Do you need a muzzle?", a: "The ordinance says to carry one and use it if there is a risk; some places, such as the Marmore Falls, always require it." },
        { q: "Which La Mora apartments accept dogs?", a: "Gemelli and Sagittario, on the ground floor with a private garden, for a supplement of €25 per stay." },
      ],
    },
    disclaimer: CHECKED.en,
    finalCtaHeading: "Assisi on foot with your dog, the countryside in the evening.",
    finalCtaBody: "Gemelli and Sagittario, on the ground floor with a private garden.",
    finalCtaLabel: "See the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "assisi-con-il-cane",
    topics: ["pets"],
    category: "Avec son chien",
    title: "Assise avec son chien : règles, promenades et lieux où aller",
    excerpt:
      "Visiter Assise avec son chien : laisse et muselière, où se garer, le Bosco di San Francesco du FAI, la promenade jusqu'à San Damiano et les sentiers du Monte Subasio.",
    metaDescription:
      "Assise avec son chien : laisse et muselière, parkings, le Bosco di San Francesco du FAI (chiens en laisse), San Damiano et le Monte Subasio. Avec les sources.",
    image: ROCCA_MINORE,
    alt: "La Rocca Minore sur les remparts d'Assise, entre le bois et les pentes du Monte Subasio",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "Laisse", value: "1,50 m maximum en ville et dans les lieux publics" },
        { label: "Muselière", value: "à garder sur soi, à utiliser en cas de risque" },
        { label: "Bosco di San Francesco (FAI)", value: "chiens admis, toujours en laisse" },
        { label: "Basiliques", value: "les sites officiels n'indiquent pas de règles : demandez avant" },
        { label: "Monte Subasio", value: "Eremo delle Carceri à 12,2 km de La Mora" },
        { label: "Depuis La Mora", value: "Piazza del Comune à 6,8 km · environ 14 min" },
      ],
    },
    intro:
      "Assise se découvre à pied, entre ruelles de pierre, escaliers et vues sur la vallée : une ville faite pour marcher, à quatre pattes aussi. Avec quelques précautions : les règles sur la laisse et la muselière, les lieux où le chien est admis et ceux où il vaut mieux se renseigner avant. Voici ce que nous avons vérifié auprès des sources officielles, avec les conseils de l'Agriturismo La Mora, où Gemelli et Sagittario accueillent ceux qui voyagent avec leur chien.",
    content: [
      { type: "h2", text: "Laisse, muselière et sacs : les règles" },
      {
        type: "p",
        text: "Dans toute l'Italie s'applique l'ordonnance de 2013 du ministère de la Santé sur la protection du public face aux chiens, prorogée à plusieurs reprises : la dernière prorogation, de juillet 2026, la prolonge de douze mois à partir du 5 septembre 2026. Quiconque promène un chien doit :",
      },
      {
        type: "list",
        items: [
          "toujours utiliser une laisse de 1,50 mètre maximum dans les zones urbaines et les lieux ouverts au public ;",
          "avoir sur soi une muselière, rigide ou souple, à mettre au chien en cas de risque ;",
          "ramasser ses déjections en ville et avoir sur soi de quoi le faire.",
        ],
      },
      {
        type: "p",
        text: "Nous n'avons pas trouvé de règles supplémentaires sur les chiens sur le site de la commune d'Assise.",
      },
      { type: "h2", text: "Arriver dans le centre" },
      {
        type: "p",
        text: "Le centre historique est en grande partie une zone à trafic limité : on se gare à l'extérieur et on monte à pied. Le parking le plus proche de la basilique Saint-François est le Giovanni Paolo II, celui le plus proche de Santa Chiara est à Porta Nuova. Depuis La Mora, la Piazza del Comune est à 6,8 km, environ 14 minutes en voiture.",
      },
      {
        type: "p",
        text: "Les rues sont en pierre, souvent en montée et avec des marches. L'été, la pierre chauffe : sortez tôt le matin ou en fin d'après-midi, avec une gamelle et une bouteille d'eau dans le sac.",
      },
      { type: "h2", text: "Églises et musées : renseignez-vous avant" },
      {
        type: "p",
        text: "Les sites officiels des basiliques Saint-François, Sainte-Claire et Sainte-Marie-des-Anges ne publient pas de règles sur les animaux, pas plus que la fiche officielle de la Rocca Maggiore. Demandez au personnel avant d'entrer ; si vous êtes deux, entrez à tour de rôle pendant que l'autre attend dehors avec le chien.",
      },
      {
        type: "p",
        text: "La seule règle explicite que nous ayons trouvée concerne l'église de Santa Croce, dans le Bosco di San Francesco : le FAI n'y admet que les chiens guides et les chiens d'assistance.",
      },
      { type: "h2", text: "Le Bosco di San Francesco : chiens admis en laisse" },
      {
        type: "p",
        text: "Le meilleur endroit pour une promenade ensemble est le Bosco di San Francesco, géré par le FAI, qui l'écrit clairement : « Les chiens sont admis, toujours en laisse ». C'est un sentier de 1,5 km en pente, au sol naturel et avec quelques marches, qui traverse oliveraies et bois sous la basilique jusqu'au Troisième Paradis de Michelangelo Pistoletto. On entre par la place de la basilique supérieure ou par le complexe de Santa Croce.",
      },
      {
        type: "p",
        text: "Du 25 octobre 2026 au 6 janvier 2027, le Bosco est ouvert de 10h00 à 16h00, avec dernière entrée à 14h00 ; il est fermé le lundi, du 24 au 26 décembre et le 1er janvier. Le billet plein tarif coûte 6 € ; la page du FAI ne prévoit pas de billet pour les chiens.",
      },
      {
        type: "image",
        src: BOSCO,
        alt: "Le Bosco di San Francesco à Assise, avec les oliviers du Troisième Paradis sur le pré et les collines boisées autour",
        caption: "Le Bosco di San Francesco, sous la basilique.",
      },
      { type: "h2", text: "À pied jusqu'à San Damiano" },
      {
        type: "p",
        text: "Depuis Porta Nuova, suivez le panneau « Santuario San Damiano » : selon le sanctuaire, il faut environ 10 minutes à pied depuis le parking, parmi les oliviers sous la ville. L'église est réservée à la prière silencieuse : là aussi, l'un de vous entre pendant que l'autre reste dehors avec le chien.",
      },
      { type: "h2", text: "Sur le Monte Subasio" },
      {
        type: "p",
        text: "Pour une marche plus longue, montez au Monte Subasio, le parc régional qui domine Assise : l'Eremo delle Carceri, d'où partent les principaux sentiers, est à 12,2 km de La Mora, environ 20 minutes en voiture.",
      },
      {
        type: "p",
        text: "Le règlement du parc publié par la Région Ombrie prévoit que les chiens soient inscrits au fichier canin et tenus en laisse, d'une longueur maximale de 1,5 mètre, qu'ils ne soient jamais laissés en liberté et que l'on ramasse leurs déjections le long des sentiers. La Région recommande aussi de ne pas laisser les chiens poursuivre les chevreuils et les autres animaux sauvages.",
      },
      { type: "h2", text: "Après la promenade" },
      {
        type: "p",
        text: "Le soir, retour à la campagne. À La Mora, les appartements Gemelli et Sagittario, au rez-de-chaussée, ont chacun leur jardin privé et accueillent votre chien moyennant un supplément de 25 € par séjour ; dans les espaces communs de la structure, les animaux doivent être tenus en laisse.",
      },
      {
        type: "links",
        heading: "Pour organiser la journée",
        items: [
          { label: "Vacances avec animaux à La Mora", href: "/vacanza-con-animali/" },
          { label: "L'appartement Gemelli", href: "/alloggi/gemelli/" },
          { label: "L'appartement Sagittario", href: "/alloggi/sagittario/" },
          { label: "Agritourisme qui accepte les chiens : que demander", href: "/blog/agriturismo-pet-friendly-umbria/" },
          { label: "La cascade des Marmore avec son chien", href: "/blog/cascata-delle-marmore-con-il-cane/" },
          { label: "Le Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
          { label: "Le Monte Subasio", href: "/blog/monte-subasio/" },
          { label: "Ordonnance sur les chiens (en italien)", href: ORDINANZA_CANI },
          { label: "Bosco di San Francesco : FAI", href: FAI_BOSCO },
        ],
      },
    ],
    faq: {
      heading: "Questions fréquentes sur Assise avec son chien",
      items: [
        { q: "Peut-on entrer dans les églises d'Assise avec son chien ?", a: "Les sites officiels des basiliques n'indiquent pas de règles sur les animaux : demandez au personnel avant d'entrer. Dans l'église de Santa Croce, dans le Bosco di San Francesco, le FAI n'admet que les chiens guides et d'assistance." },
        { q: "Les chiens peuvent-ils entrer dans le Bosco di San Francesco ?", a: "Oui : le FAI les admet, toujours en laisse." },
        { q: "Quelle longueur de laisse est autorisée ?", a: "1,50 mètre maximum dans les zones urbaines et les lieux ouverts au public, selon l'ordonnance du ministère de la Santé, prorogée jusqu'en septembre 2027." },
        { q: "La muselière est-elle obligatoire ?", a: "L'ordonnance demande de l'avoir sur soi et de l'utiliser en cas de risque ; certains lieux, comme la cascade des Marmore, l'exigent toujours." },
        { q: "Quels appartements de La Mora acceptent les chiens ?", a: "Gemelli et Sagittario, au rez-de-chaussée avec jardin privé, moyennant un supplément de 25 € par séjour." },
      ],
    },
    disclaimer: CHECKED.fr,
    finalCtaHeading: "Assise à pied avec votre chien, la campagne le soir.",
    finalCtaBody: "Gemelli et Sagittario, au rez-de-chaussée avec jardin privé.",
    finalCtaLabel: "Voir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "assisi-con-il-cane",
    topics: ["pets"],
    category: "Mit Hund",
    title: "Assisi mit Hund: Regeln, Spaziergänge und Ausflugsziele",
    excerpt:
      "Assisi mit Hund besuchen: Leine und Maulkorb, wo man parkt, der Bosco di San Francesco des FAI, der Spaziergang nach San Damiano und die Wege am Monte Subasio.",
    metaDescription:
      "Assisi mit Hund: Leine und Maulkorb, Parkplätze, der Bosco di San Francesco des FAI (Hunde an der Leine), San Damiano und der Monte Subasio. Mit Quellen.",
    image: ROCCA_MINORE,
    alt: "Die Rocca Minore auf der Stadtmauer von Assisi, zwischen Wald und den Hängen des Monte Subasio",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "Leine", value: "höchstens 1,50 m in Städten und an öffentlichen Orten" },
        { label: "Maulkorb", value: "dabeihaben, bei Gefahr anlegen" },
        { label: "Bosco di San Francesco (FAI)", value: "Hunde erlaubt, immer an der Leine" },
        { label: "Basiliken", value: "offizielle Websites nennen keine Regeln: vorher fragen" },
        { label: "Monte Subasio", value: "Eremo delle Carceri 12,2 km vom La Mora" },
        { label: "Vom La Mora", value: "Piazza del Comune 6,8 km · rund 14 Min." },
      ],
    },
    intro:
      "Assisi entdeckt man zu Fuß, durch Gassen aus Stein, über Treppen und mit Blicken ins Tal: eine Stadt wie gemacht zum Gehen, auch auf vier Pfoten. Mit ein wenig Umsicht: die Regeln zu Leine und Maulkorb, die Orte, an denen Hunde willkommen sind, und die, bei denen man besser vorher fragt. Hier ist, was wir bei den offiziellen Quellen geprüft haben, mit Tipps vom Agriturismo La Mora, wo Gemelli und Sagittario Gäste mit Hund aufnehmen.",
    content: [
      { type: "h2", text: "Leine, Maulkorb und Beutel: die Regeln" },
      {
        type: "p",
        text: "In ganz Italien gilt die Verordnung des Gesundheitsministeriums von 2013 zum Schutz der Öffentlichkeit vor Hunden, die mehrfach verlängert wurde: Die letzte Verlängerung vom Juli 2026 gilt für zwölf Monate ab dem 5. September 2026. Wer einen Hund ausführt, muss:",
      },
      {
        type: "list",
        items: [
          "in städtischen Gebieten und an öffentlich zugänglichen Orten immer eine Leine von höchstens 1,50 Metern verwenden;",
          "einen Maulkorb, starr oder weich, dabeihaben und ihn dem Hund bei Gefahr anlegen;",
          "in der Stadt den Kot aufsammeln und das nötige Material dabeihaben.",
        ],
      },
      {
        type: "p",
        text: "Auf der Website der Gemeinde Assisi haben wir keine zusätzlichen Regeln für Hunde gefunden.",
      },
      { type: "h2", text: "Ins Zentrum kommen" },
      {
        type: "p",
        text: "Die Altstadt ist großteils verkehrsberuhigte Zone: Man parkt außerhalb und geht zu Fuß hinauf. Der Parkplatz am nächsten zur Basilika San Francesco ist Giovanni Paolo II, der nächste zu Santa Chiara liegt an der Porta Nuova. Vom La Mora ist die Piazza del Comune 6,8 km entfernt, rund 14 Minuten mit dem Auto.",
      },
      {
        type: "p",
        text: "Die Straßen sind aus Stein, oft steil und mit Stufen. Im Sommer heizt sich der Stein auf: Gehen Sie früh am Morgen oder am späten Nachmittag los, mit einem Napf und einer Flasche Wasser im Rucksack.",
      },
      { type: "h2", text: "Kirchen und Museen: vorher fragen" },
      {
        type: "p",
        text: "Die offiziellen Websites der Basiliken San Francesco, Santa Chiara und Santa Maria degli Angeli nennen keine Regeln für Tiere, ebenso wenig die offizielle Seite der Rocca Maggiore. Fragen Sie vor dem Eintreten das Personal; wenn Sie zu zweit sind, gehen Sie abwechselnd hinein, während der andere draußen mit dem Hund wartet.",
      },
      {
        type: "p",
        text: "Die einzige ausdrückliche Regel, die wir gefunden haben, betrifft die Kirche Santa Croce im Bosco di San Francesco: Dort lässt der FAI nur Blindenführhunde und Assistenzhunde zu.",
      },
      { type: "h2", text: "Der Bosco di San Francesco: Hunde an der Leine willkommen" },
      {
        type: "p",
        text: "Der beste Ort für einen gemeinsamen Spaziergang ist der Bosco di San Francesco des FAI, der es klar schreibt: „Hunde sind erlaubt, immer an der Leine.“ Es ist ein 1,5 km langer, abschüssiger Weg mit Naturboden und einigen Stufen, der unterhalb der Basilika durch Olivenhaine und Wald bis zum Dritten Paradies von Michelangelo Pistoletto führt. Eingänge gibt es am Platz der Oberkirche und im Komplex Santa Croce.",
      },
      {
        type: "p",
        text: "Vom 25. Oktober 2026 bis 6. Januar 2027 ist der Bosco von 10:00 bis 16:00 Uhr geöffnet, letzter Einlass um 14:00 Uhr; montags, vom 24. bis 26. Dezember und am 1. Januar ist geschlossen. Das volle Ticket kostet 6 €; auf der Seite des FAI gibt es keine Tickets für Hunde.",
      },
      {
        type: "image",
        src: BOSCO,
        alt: "Der Bosco di San Francesco in Assisi, mit den Olivenbäumen des Dritten Paradieses auf der Wiese und bewaldeten Hügeln ringsum",
        caption: "Der Bosco di San Francesco unterhalb der Basilika.",
      },
      { type: "h2", text: "Zu Fuß nach San Damiano" },
      {
        type: "p",
        text: "Ab der Porta Nuova folgen Sie dem Schild „Santuario San Damiano“: Laut dem Heiligtum sind es vom Parkplatz rund 10 Minuten zu Fuß, zwischen Olivenbäumen unterhalb der Stadt. Die Kirche ist dem stillen Gebet vorbehalten: Auch hier geht einer hinein, während der andere draußen beim Hund bleibt.",
      },
      { type: "h2", text: "Auf dem Monte Subasio" },
      {
        type: "p",
        text: "Für eine längere Wanderung geht es hinauf zum Monte Subasio, dem Regionalpark oberhalb von Assisi: Die Einsiedelei Eremo delle Carceri, wo die wichtigsten Wege beginnen, ist 12,2 km vom La Mora entfernt, rund 20 Minuten mit dem Auto.",
      },
      {
        type: "p",
        text: "Die von der Region Umbrien veröffentlichte Parkordnung sieht vor, dass Hunde im Hunderegister eingetragen sind und an einer höchstens 1,5 Meter langen Leine geführt werden, nie frei herumlaufen dürfen und dass man ihren Kot entlang der Wege aufsammelt. Die Region empfiehlt außerdem, Hunde keine Rehe oder anderen Wildtiere jagen zu lassen.",
      },
      { type: "h2", text: "Nach dem Spaziergang" },
      {
        type: "p",
        text: "Abends geht es zurück aufs Land. Im La Mora haben die Ferienwohnungen Gemelli und Sagittario im Erdgeschoss jeweils einen eigenen Garten und nehmen Ihren Hund gegen einen Zuschlag von 25 € pro Aufenthalt auf; in den Gemeinschaftsbereichen müssen Tiere an der Leine bleiben.",
      },
      {
        type: "links",
        heading: "Den Tag planen",
        items: [
          { label: "Urlaub mit Haustieren im La Mora", href: "/vacanza-con-animali/" },
          { label: "Die Ferienwohnung Gemelli", href: "/alloggi/gemelli/" },
          { label: "Die Ferienwohnung Sagittario", href: "/alloggi/sagittario/" },
          { label: "Hundefreundlicher Agriturismo: was fragen", href: "/blog/agriturismo-pet-friendly-umbria/" },
          { label: "Marmore-Wasserfälle mit Hund", href: "/blog/cascata-delle-marmore-con-il-cane/" },
          { label: "Der Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
          { label: "Der Monte Subasio", href: "/blog/monte-subasio/" },
          { label: "Verordnung zu Hunden (italienisch)", href: ORDINANZA_CANI },
          { label: "Bosco di San Francesco: FAI", href: FAI_BOSCO },
        ],
      },
    ],
    faq: {
      heading: "Häufige Fragen zu Assisi mit Hund",
      items: [
        { q: "Darf man in Assisi mit dem Hund in die Kirchen?", a: "Die offiziellen Websites der Basiliken nennen keine Regeln für Tiere: Fragen Sie vor dem Eintreten das Personal. In der Kirche Santa Croce im Bosco di San Francesco lässt der FAI nur Blindenführ- und Assistenzhunde zu." },
        { q: "Dürfen Hunde in den Bosco di San Francesco?", a: "Ja: Der FAI lässt sie zu, immer an der Leine." },
        { q: "Wie lang darf die Leine sein?", a: "Höchstens 1,50 Meter in städtischen Gebieten und an öffentlich zugänglichen Orten, laut der Verordnung des Gesundheitsministeriums, verlängert bis September 2027." },
        { q: "Ist ein Maulkorb Pflicht?", a: "Die Verordnung verlangt, ihn dabeizuhaben und bei Gefahr anzulegen; manche Orte, etwa die Marmore-Wasserfälle, verlangen ihn immer." },
        { q: "Welche Ferienwohnungen im La Mora nehmen Hunde auf?", a: "Gemelli und Sagittario, im Erdgeschoss mit eigenem Garten, gegen einen Zuschlag von 25 € pro Aufenthalt." },
      ],
    },
    disclaimer: CHECKED.de,
    finalCtaHeading: "Assisi zu Fuß mit Hund, abends das Land.",
    finalCtaBody: "Gemelli und Sagittario, im Erdgeschoss mit eigenem Garten.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};

/* "Cascata delle Marmore con il cane". Fonti verificate il 21/10/2026, sito
   ufficiale cascatadellemarmore.info: regolamento del parco (cani nelle aree
   comuni tranne aree con cartello e aree giochi; guinzaglio max 2 m;
   museruola per tutti, esclusi i cuccioli sotto i 6 mesi), "Come funziona"
   (sentieri, ingressi, grata del sentiero 1, Balcone solo con visita
   guidata), orari "ANNO 2026" (novembre e dicembre), biglietteria (tariffe
   2026). Storia e altezza: articolo cascate-delle-marmore (già verificato).
   NON verificabili: biglietto per i cani, cani alla visita del Balcone degli
   Innamorati, calendario 2027. Distanza: 77,3 km (places/blog-ctas). */
const MARMORE = "/images/territorio/dintorni/cascate delle marmore (2).jpg";
const MARMORE_REGOLAMENTO = "https://www.cascatadellemarmore.info/regolamento-del-parco-e-avvertenze/";
const MARMORE_ORARI = "https://cascatadellemarmore.info/orari-e-aperture/";

export const MARMORE_DOG_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "cascata-delle-marmore-con-il-cane",
    topics: ["pets"],
    category: "Con il cane",
    title: "Cascata delle Marmore con il cane: regole, sentieri e orari",
    excerpt:
      "Una gita alla Cascata delle Marmore con il cane: guinzaglio e museruola come chiede il regolamento del parco, quali sentieri scegliere, gli orari dell'acqua e i biglietti.",
    metaDescription:
      "Cascata delle Marmore con il cane: guinzaglio fino a 2 metri e museruola, quali sentieri scegliere, orari dell'acqua e biglietti. A un'ora da Assisi.",
    image: MARMORE,
    alt: "La Cascata delle Marmore, con i salti d'acqua bianca tra la vegetazione",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Cani", value: "ammessi nelle aree comuni del parco" },
        { label: "Guinzaglio", value: "lungo al massimo 2 metri" },
        { label: "Museruola", value: "obbligatoria, tranne per i cuccioli sotto i 6 mesi" },
        { label: "Biglietto", value: "12 € dai 10 anni · gratis fino a 4" },
        { label: "Acqua a novembre e dicembre 2026", value: "solo nel fine settimana e in alcuni festivi" },
        { label: "Da La Mora", value: "77,3 km · poco più di un'ora in auto" },
      ],
    },
    intro:
      "La Cascata delle Marmore, vicino a Terni, è una delle gite più spettacolari da fare partendo da Assisi, e si può fare anche con il cane. Il parco ha un regolamento preciso, più severo delle regole che valgono in città: ecco cosa prevede, quali sentieri scegliere e quando viene aperta l'acqua, con le informazioni del sito ufficiale della Cascata.",
    content: [
      { type: "h2", text: "Una cascata costruita dai Romani" },
      {
        type: "p",
        text: "La Cascata delle Marmore nasce da un'opera dei Romani: nel 271 a.C. il console Manio Curio Dentato fece defluire il fiume Velino verso il Nera per liberare la piana di Rieti dalle acque stagnanti. Il risultato è un salto di 165 metri in tre balzi, a flusso controllato: l'acqua scende al massimo solo negli orari di apertura stabiliti dal calendario.",
      },
      { type: "h2", text: "Le regole per i cani nel parco" },
      {
        type: "p",
        text: "Secondo il regolamento del parco, i cani possono entrare in tutte le aree comuni, tranne quelle segnalate da un cartello di divieto e le aree giochi per i bambini. Devono essere tenuti al guinzaglio, lungo al massimo 2 metri, e devono indossare la museruola, qualunque sia la razza: ne sono esentati solo i cuccioli che non hanno ancora compiuto sei mesi.",
      },
      {
        type: "p",
        text: "È una regola più severa di quella valida in città, dove la museruola basta averla con sé: se il tuo cane non è abituato a portarla, fagliela provare a casa nei giorni prima della gita. La pagina della biglietteria non parla di biglietti per i cani: se hai un dubbio, chiedi all'ingresso.",
      },
      { type: "h2", text: "Quale sentiero scegliere" },
      {
        type: "p",
        text: "Il parco ha due ingressi, al Belvedere superiore (località Marmore) e al Belvedere inferiore (località Collestatte Piano), e sei sentieri di difficoltà diversa:",
      },
      {
        type: "list",
        items: [
          "sentieri 2 e 3, verso il Belvedere inferiore: facili e suggestivi, con gradini e fondo irregolare;",
          "sentiero 5, al Belvedere superiore: pianeggiante, ma non offre una buona vista della cascata;",
          "sentiero 1: difficile, con oltre 600 gradoni irregolari; sulla scala in ferro c'è una grata in cui possono incastrarsi le unghie dei cani, e il parco invita a fare attenzione;",
          "sentiero 6: esterno al parco, adatto solo a escursionisti esperti.",
        ],
      },
      {
        type: "p",
        text: "Il Balcone degli Innamorati si visita solo con una visita guidata: il sito non dice se i cani possano partecipare, quindi chiedilo prima di prenotare.",
      },
      {
        type: "image",
        src: MARMORE,
        alt: "I salti della Cascata delle Marmore con gli spruzzi bianchi e il bosco intorno",
        caption: "La Cascata delle Marmore durante il rilascio dell'acqua.",
      },
      { type: "h2", text: "Quando andare: gli orari dell'acqua" },
      {
        type: "p",
        text: "Il calendario ufficiale per novembre e dicembre 2026 prevede:",
      },
      {
        type: "list",
        items: [
          "parco aperto nei giorni feriali dalle 10:00 alle 16:30, il sabato e la domenica dalle 10:00 alle 17:00;",
          "nei giorni feriali nessun rilascio dell'acqua;",
          "a novembre, il sabato, la domenica e il 2 novembre, acqua dalle 12:00 alle 13:00 e dalle 15:00 alle 16:00;",
          "a dicembre, il sabato, la domenica e il 7, 8, 24, 25 e dal 28 al 31 dicembre, acqua dalle 12:00 alle 13:00 e dalle 14:00 alle 15:00.",
        ],
      },
      {
        type: "p",
        text: "Il calendario 2027 non è ancora pubblicato e il sito avverte che gli orari possono cambiare: controllalo a ridosso della gita. Con l'acqua aperta il rumore è forte: se il tuo cane è sensibile ai rumori, tienilo vicino a te nei punti più esposti.",
      },
      { type: "h2", text: "Biglietti" },
      {
        type: "p",
        text: "Con le tariffe 2026 il biglietto intero costa 12 € dai 10 anni in su, il ridotto 10 € dai 5 ai 9 anni e oltre i 70; fino a 4 anni si entra gratis. Nei giorni d'inverno senza rilascio dell'acqua c'è un biglietto da 6 €.",
      },
      { type: "h2", text: "Da La Mora alla cascata" },
      {
        type: "p",
        text: "Da Agriturismo La Mora la Cascata delle Marmore è a 77,3 km, poco più di un'ora in auto secondo Google Maps: si parte la mattina e si rientra nel pomeriggio. Dopo una giornata di sentieri, Gemelli e Sagittario, al piano terra con giardino privato, accolgono te e il tuo cane con un supplemento di 25 € a soggiorno.",
      },
      {
        type: "links",
        heading: "Per organizzare la gita",
        items: [
          { label: "La guida alle Cascate delle Marmore", href: "/blog/cascate-delle-marmore/" },
          { label: "Vacanza con animali a La Mora", href: "/vacanza-con-animali/" },
          { label: "L'appartamento Gemelli", href: "/alloggi/gemelli/" },
          { label: "L'appartamento Sagittario", href: "/alloggi/sagittario/" },
          { label: "Assisi con il cane", href: "/blog/assisi-con-il-cane/" },
          { label: "Regolamento del parco della Cascata", href: MARMORE_REGOLAMENTO },
          { label: "Orari e aperture della Cascata", href: MARMORE_ORARI },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti sulla Cascata delle Marmore con il cane",
      items: [
        { q: "I cani possono entrare alla Cascata delle Marmore?", a: "Sì, in tutte le aree comuni del parco, tranne quelle segnalate da un cartello di divieto e le aree giochi per bambini." },
        { q: "Serve la museruola?", a: "Sì: il regolamento la richiede per tutti i cani, qualunque sia la razza; ne sono esentati solo i cuccioli sotto i sei mesi." },
        { q: "Quanto può essere lungo il guinzaglio?", a: "Al massimo 2 metri." },
        { q: "Qual è il sentiero più semplice con il cane?", a: "I sentieri 2 e 3, verso il Belvedere inferiore, sono descritti come facili. Sul sentiero 1 fai attenzione alla grata della scala in ferro, dove possono incastrarsi le unghie." },
        { q: "Quando viene aperta l'acqua?", a: "A novembre e dicembre 2026 solo il sabato, la domenica e in alcuni festivi, in due fasce di un'ora; nei giorni feriali non c'è rilascio. Il calendario aggiornato è sul sito ufficiale." },
        { q: "Quanto dista la Cascata da La Mora?", a: "77,3 km, poco più di un'ora in auto secondo Google Maps." },
      ],
    },
    disclaimer: CHECKED.it,
    finalCtaHeading: "La cascata di giorno, il giardino privato la sera.",
    finalCtaBody: "Gemelli e Sagittario accolgono te e il tuo cane.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "cascata-delle-marmore-con-il-cane",
    topics: ["pets"],
    category: "With your dog",
    title: "Marmore Falls with your dog: rules, trails and opening times",
    excerpt:
      "A day at the Marmore Falls with your dog: lead and muzzle as the park regulations require, which trails to choose, when the water is released and tickets.",
    metaDescription:
      "Marmore Falls with your dog: lead up to 2 metres and muzzle, which trails to choose, water release times and tickets. About an hour from Assisi.",
    image: MARMORE,
    alt: "The Marmore Falls, with white cascades among the greenery",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Dogs", value: "allowed in the park's shared areas" },
        { label: "Lead", value: "no longer than 2 metres" },
        { label: "Muzzle", value: "compulsory, except for puppies under 6 months" },
        { label: "Ticket", value: "€12 from age 10 · free up to 4" },
        { label: "Water in November and December 2026", value: "weekends and some holidays only" },
        { label: "From La Mora", value: "77.3 km · just over an hour by car" },
      ],
    },
    intro:
      "A trip to the Marmore Falls, near Terni, is one of the most spectacular days out from Assisi, and you can do it with your dog too. The park has precise regulations, stricter than the rules that apply in towns: here is what they say, which trails to choose and when the water is released, using information from the Falls' official website.",
    content: [
      { type: "h2", text: "A waterfall built by the Romans" },
      {
        type: "p",
        text: "The Marmore Falls began as a Roman project: in 271 BC the consul Manius Curius Dentatus diverted the Velino river towards the Nera to drain the stagnant water from the Rieti plain. The result is a 165-metre drop in three leaps, with a controlled flow: the water runs at full strength only during the release times set in the calendar.",
      },
      { type: "h2", text: "The rules for dogs in the park" },
      {
        type: "p",
        text: "According to the park regulations, dogs may enter all shared areas except those marked with a no-entry sign and children's play areas. They must be kept on a lead no longer than 2 metres and must wear a muzzle, whatever the breed: only puppies under six months old are exempt.",
      },
      {
        type: "p",
        text: "This is stricter than the rule in towns, where you only need to carry a muzzle: if your dog is not used to wearing one, let it try it at home in the days before the trip. The ticket page says nothing about tickets for dogs: if in doubt, ask at the entrance.",
      },
      { type: "h2", text: "Which trail to choose" },
      {
        type: "p",
        text: "The park has two entrances, at the Belvedere superiore (Marmore) and the Belvedere inferiore (Collestatte Piano), and six trails of varying difficulty:",
      },
      {
        type: "list",
        items: [
          "trails 2 and 3, towards the Belvedere inferiore: easy and scenic, with steps and uneven ground;",
          "trail 5, at the Belvedere superiore: flat, but without a good view of the falls;",
          "trail 1: difficult, with over 600 uneven steps; the iron staircase has a grating that can catch dogs' claws, and the park asks owners to take care;",
          "trail 6: outside the park, suitable only for experienced hikers.",
        ],
      },
      {
        type: "p",
        text: "The Balcone degli Innamorati can only be visited on a guided tour: the website does not say whether dogs may join, so ask before booking.",
      },
      {
        type: "image",
        src: MARMORE,
        alt: "The leaps of the Marmore Falls with white spray and woodland around",
        caption: "The Marmore Falls during a water release.",
      },
      { type: "h2", text: "When to go: water release times" },
      {
        type: "p",
        text: "The official calendar for November and December 2026 sets out:",
      },
      {
        type: "list",
        items: [
          "park open on weekdays from 10:00 to 16:30, on Saturdays and Sundays from 10:00 to 17:00;",
          "no water release on weekdays;",
          "in November, on Saturdays, Sundays and 2 November, water from 12:00 to 13:00 and from 15:00 to 16:00;",
          "in December, on Saturdays, Sundays and on 7, 8, 24, 25 and 28 to 31 December, water from 12:00 to 13:00 and from 14:00 to 15:00.",
        ],
      },
      {
        type: "p",
        text: "The 2027 calendar has not been published yet, and the website warns that times may change: check it shortly before your trip. When the water is released the noise is loud: if your dog is sensitive to noise, keep it close in the most exposed spots.",
      },
      { type: "h2", text: "Tickets" },
      {
        type: "p",
        text: "Under the 2026 prices, a full ticket costs €12 from age 10, the reduced ticket €10 for ages 5 to 9 and over 70; admission is free up to age 4. On winter days without a water release there is a €6 ticket.",
      },
      { type: "h2", text: "From La Mora to the falls" },
      {
        type: "p",
        text: "From Agriturismo La Mora the Marmore Falls are 77.3 km away, just over an hour by car according to Google Maps: leave in the morning and be back in the afternoon. After a day on the trails, Gemelli and Sagittario, on the ground floor with a private garden, welcome you and your dog for a supplement of €25 per stay.",
      },
      {
        type: "links",
        heading: "Plan the trip",
        items: [
          { label: "Our guide to the Marmore Falls", href: "/blog/cascate-delle-marmore/" },
          { label: "Holidays with pets at La Mora", href: "/vacanza-con-animali/" },
          { label: "The Gemelli apartment", href: "/alloggi/gemelli/" },
          { label: "The Sagittario apartment", href: "/alloggi/sagittario/" },
          { label: "Assisi with your dog", href: "/blog/assisi-con-il-cane/" },
          { label: "Park regulations (Italian)", href: MARMORE_REGOLAMENTO },
          { label: "Opening times of the Falls (Italian)", href: MARMORE_ORARI },
        ],
      },
    ],
    faq: {
      heading: "Frequently asked questions about the Marmore Falls with your dog",
      items: [
        { q: "Are dogs allowed at the Marmore Falls?", a: "Yes, in all the park's shared areas, except those marked with a no-entry sign and children's play areas." },
        { q: "Is a muzzle required?", a: "Yes: the regulations require it for all dogs, whatever the breed; only puppies under six months are exempt." },
        { q: "How long can the lead be?", a: "No more than 2 metres." },
        { q: "Which is the easiest trail with a dog?", a: "Trails 2 and 3, towards the Belvedere inferiore, are described as easy. On trail 1, watch out for the grating on the iron staircase, where claws can get caught." },
        { q: "When is the water released?", a: "In November and December 2026 only on Saturdays, Sundays and some holidays, in two one-hour slots; there is no release on weekdays. The updated calendar is on the official website." },
        { q: "How far are the Falls from La Mora?", a: "77.3 km, just over an hour by car according to Google Maps." },
      ],
    },
    disclaimer: CHECKED.en,
    finalCtaHeading: "The falls by day, a private garden in the evening.",
    finalCtaBody: "Gemelli and Sagittario welcome you and your dog.",
    finalCtaLabel: "See the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "cascata-delle-marmore-con-il-cane",
    topics: ["pets"],
    category: "Avec son chien",
    title: "La cascade des Marmore avec son chien : règles, sentiers et horaires",
    excerpt:
      "Une sortie à la cascade des Marmore avec son chien : laisse et muselière comme l'exige le règlement du parc, quels sentiers choisir, les horaires de l'eau et les billets.",
    metaDescription:
      "Cascade des Marmore avec son chien : laisse de 2 mètres maximum et muselière, quels sentiers choisir, horaires de l'eau et billets. À une heure d'Assise.",
    image: MARMORE,
    alt: "La cascade des Marmore, avec ses chutes d'eau blanche dans la végétation",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "Chiens", value: "admis dans les espaces communs du parc" },
        { label: "Laisse", value: "2 mètres maximum" },
        { label: "Muselière", value: "obligatoire, sauf pour les chiots de moins de 6 mois" },
        { label: "Billet", value: "12 € dès 10 ans · gratuit jusqu'à 4 ans" },
        { label: "Eau en novembre et décembre 2026", value: "seulement le week-end et certains jours fériés" },
        { label: "Depuis La Mora", value: "77,3 km · un peu plus d'une heure en voiture" },
      ],
    },
    intro:
      "La cascade des Marmore, près de Terni, est l'une des sorties les plus spectaculaires au départ d'Assise, et on peut la faire avec son chien. Le parc a un règlement précis, plus strict que les règles en vigueur en ville : voici ce qu'il prévoit, quels sentiers choisir et quand l'eau est lâchée, d'après le site officiel de la cascade.",
    content: [
      { type: "h2", text: "Une cascade construite par les Romains" },
      {
        type: "p",
        text: "La cascade des Marmore est née d'un ouvrage romain : en 271 av. J.-C., le consul Manius Curius Dentatus fit dévier le Velino vers la Nera pour libérer la plaine de Rieti des eaux stagnantes. Le résultat est une chute de 165 mètres en trois sauts, au débit contrôlé : l'eau ne coule à pleine puissance qu'aux heures de lâcher fixées par le calendrier.",
      },
      { type: "h2", text: "Les règles pour les chiens dans le parc" },
      {
        type: "p",
        text: "Selon le règlement du parc, les chiens peuvent entrer dans tous les espaces communs, sauf ceux signalés par un panneau d'interdiction et les aires de jeux pour enfants. Ils doivent être tenus en laisse, de 2 mètres maximum, et porter une muselière, quelle que soit la race : seuls les chiots de moins de six mois en sont dispensés.",
      },
      {
        type: "p",
        text: "C'est plus strict qu'en ville, où il suffit d'avoir la muselière sur soi : si votre chien n'a pas l'habitude de la porter, faites-la-lui essayer à la maison les jours précédents. La page de la billetterie ne parle pas de billet pour les chiens : en cas de doute, demandez à l'entrée.",
      },
      { type: "h2", text: "Quel sentier choisir" },
      {
        type: "p",
        text: "Le parc a deux entrées, au Belvedere superiore (Marmore) et au Belvedere inferiore (Collestatte Piano), et six sentiers de difficulté variable :",
      },
      {
        type: "list",
        items: [
          "sentiers 2 et 3, vers le Belvedere inferiore : faciles et spectaculaires, avec des marches et un sol irrégulier ;",
          "sentier 5, au Belvedere superiore : plat, mais sans bonne vue sur la cascade ;",
          "sentier 1 : difficile, avec plus de 600 marches irrégulières ; l'escalier en fer a une grille où les griffes des chiens peuvent se coincer, et le parc invite à la prudence ;",
          "sentier 6 : à l'extérieur du parc, réservé aux randonneurs expérimentés.",
        ],
      },
      {
        type: "p",
        text: "Le Balcone degli Innamorati ne se visite qu'avec une visite guidée : le site ne dit pas si les chiens peuvent y participer, renseignez-vous avant de réserver.",
      },
      {
        type: "image",
        src: MARMORE,
        alt: "Les sauts de la cascade des Marmore, avec les embruns blancs et le bois autour",
        caption: "La cascade des Marmore pendant un lâcher d'eau.",
      },
      { type: "h2", text: "Quand y aller : les horaires de l'eau" },
      {
        type: "p",
        text: "Le calendrier officiel de novembre et décembre 2026 prévoit :",
      },
      {
        type: "list",
        items: [
          "parc ouvert en semaine de 10h00 à 16h30, le samedi et le dimanche de 10h00 à 17h00 ;",
          "en semaine, aucun lâcher d'eau ;",
          "en novembre, le samedi, le dimanche et le 2 novembre, eau de 12h00 à 13h00 et de 15h00 à 16h00 ;",
          "en décembre, le samedi, le dimanche et les 7, 8, 24, 25 et du 28 au 31 décembre, eau de 12h00 à 13h00 et de 14h00 à 15h00.",
        ],
      },
      {
        type: "p",
        text: "Le calendrier 2027 n'est pas encore publié et le site prévient que les horaires peuvent changer : consultez-le juste avant la sortie. Quand l'eau est lâchée, le bruit est fort : si votre chien est sensible au bruit, gardez-le près de vous aux endroits les plus exposés.",
      },
      { type: "h2", text: "Billets" },
      {
        type: "p",
        text: "Aux tarifs 2026, le billet plein tarif coûte 12 € dès 10 ans, le réduit 10 € de 5 à 9 ans et au-delà de 70 ans ; l'entrée est gratuite jusqu'à 4 ans. Les jours d'hiver sans lâcher d'eau, il existe un billet à 6 €.",
      },
      { type: "h2", text: "De La Mora à la cascade" },
      {
        type: "p",
        text: "Depuis l'Agriturismo La Mora, la cascade des Marmore est à 77,3 km, un peu plus d'une heure en voiture selon Google Maps : on part le matin et on rentre l'après-midi. Après une journée de sentiers, Gemelli et Sagittario, au rez-de-chaussée avec jardin privé, vous accueillent avec votre chien moyennant un supplément de 25 € par séjour.",
      },
      {
        type: "links",
        heading: "Pour organiser la sortie",
        items: [
          { label: "Notre guide de la cascade des Marmore", href: "/blog/cascate-delle-marmore/" },
          { label: "Vacances avec animaux à La Mora", href: "/vacanza-con-animali/" },
          { label: "L'appartement Gemelli", href: "/alloggi/gemelli/" },
          { label: "L'appartement Sagittario", href: "/alloggi/sagittario/" },
          { label: "Assise avec son chien", href: "/blog/assisi-con-il-cane/" },
          { label: "Règlement du parc (en italien)", href: MARMORE_REGOLAMENTO },
          { label: "Horaires de la cascade (en italien)", href: MARMORE_ORARI },
        ],
      },
    ],
    faq: {
      heading: "Questions fréquentes sur la cascade des Marmore avec son chien",
      items: [
        { q: "Les chiens sont-ils admis à la cascade des Marmore ?", a: "Oui, dans tous les espaces communs du parc, sauf ceux signalés par un panneau d'interdiction et les aires de jeux pour enfants." },
        { q: "La muselière est-elle obligatoire ?", a: "Oui : le règlement l'exige pour tous les chiens, quelle que soit la race ; seuls les chiots de moins de six mois en sont dispensés." },
        { q: "Quelle longueur de laisse est autorisée ?", a: "2 mètres maximum." },
        { q: "Quel est le sentier le plus simple avec un chien ?", a: "Les sentiers 2 et 3, vers le Belvedere inferiore, sont décrits comme faciles. Sur le sentier 1, attention à la grille de l'escalier en fer, où les griffes peuvent se coincer." },
        { q: "Quand l'eau est-elle lâchée ?", a: "En novembre et décembre 2026, seulement le samedi, le dimanche et certains jours fériés, sur deux créneaux d'une heure ; aucun lâcher en semaine. Le calendrier à jour est sur le site officiel." },
        { q: "À quelle distance de La Mora se trouve la cascade ?", a: "77,3 km, un peu plus d'une heure en voiture selon Google Maps." },
      ],
    },
    disclaimer: CHECKED.fr,
    finalCtaHeading: "La cascade le jour, un jardin privé le soir.",
    finalCtaBody: "Gemelli et Sagittario vous accueillent avec votre chien.",
    finalCtaLabel: "Voir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "cascata-delle-marmore-con-il-cane",
    topics: ["pets"],
    category: "Mit Hund",
    title: "Marmore-Wasserfälle mit Hund: Regeln, Wege und Öffnungszeiten",
    excerpt:
      "Ein Ausflug zu den Marmore-Wasserfällen mit Hund: Leine und Maulkorb laut Parkordnung, welche Wege man wählt, wann das Wasser freigegeben wird und die Tickets.",
    metaDescription:
      "Marmore-Wasserfälle mit Hund: Leine bis 2 Meter und Maulkorb, welche Wege man wählt, Zeiten der Wasserfreigabe und Tickets. Rund eine Stunde von Assisi.",
    image: MARMORE,
    alt: "Die Marmore-Wasserfälle mit weißen Kaskaden im Grünen",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "Hunde", value: "in den Gemeinschaftsbereichen des Parks erlaubt" },
        { label: "Leine", value: "höchstens 2 Meter" },
        { label: "Maulkorb", value: "Pflicht, außer für Welpen unter 6 Monaten" },
        { label: "Ticket", value: "12 € ab 10 Jahren · frei bis 4" },
        { label: "Wasser im November und Dezember 2026", value: "nur am Wochenende und an einigen Feiertagen" },
        { label: "Vom La Mora", value: "77,3 km · gut eine Stunde mit dem Auto" },
      ],
    },
    intro:
      "Ein Ausflug zu den Marmore-Wasserfällen bei Terni ist einer der spektakulärsten Tagesausflüge ab Assisi, und man kann ihn auch mit Hund machen. Der Park hat eine genaue Ordnung, strenger als die Regeln in der Stadt: Hier steht, was sie vorsieht, welche Wege Sie wählen sollten und wann das Wasser freigegeben wird, nach den Angaben der offiziellen Website der Wasserfälle.",
    content: [
      { type: "h2", text: "Ein Wasserfall, gebaut von den Römern" },
      {
        type: "p",
        text: "Die Marmore-Wasserfälle gehen auf ein römisches Bauwerk zurück: 271 v. Chr. ließ der Konsul Manius Curius Dentatus den Fluss Velino in die Nera umleiten, um die Ebene von Rieti von stehendem Wasser zu befreien. Das Ergebnis ist ein Fall von 165 Metern in drei Stufen, mit gesteuertem Durchfluss: Mit voller Kraft fließt das Wasser nur zu den im Kalender festgelegten Zeiten.",
      },
      { type: "h2", text: "Die Regeln für Hunde im Park" },
      {
        type: "p",
        text: "Laut Parkordnung dürfen Hunde in alle Gemeinschaftsbereiche, außer in die mit einem Verbotsschild gekennzeichneten Bereiche und auf Kinderspielplätze. Sie müssen an einer höchstens 2 Meter langen Leine geführt werden und einen Maulkorb tragen, unabhängig von der Rasse: Nur Welpen unter sechs Monaten sind davon ausgenommen.",
      },
      {
        type: "p",
        text: "Das ist strenger als in der Stadt, wo es reicht, den Maulkorb dabeizuhaben: Wenn Ihr Hund ihn nicht gewohnt ist, lassen Sie ihn in den Tagen vor dem Ausflug zu Hause üben. Die Ticketseite sagt nichts über Tickets für Hunde: Im Zweifel fragen Sie am Eingang.",
      },
      { type: "h2", text: "Welchen Weg wählen" },
      {
        type: "p",
        text: "Der Park hat zwei Eingänge, am Belvedere superiore (Marmore) und am Belvedere inferiore (Collestatte Piano), und sechs Wege unterschiedlicher Schwierigkeit:",
      },
      {
        type: "list",
        items: [
          "Wege 2 und 3, zum Belvedere inferiore: leicht und eindrucksvoll, mit Stufen und unebenem Boden;",
          "Weg 5, am Belvedere superiore: eben, aber ohne guten Blick auf den Wasserfall;",
          "Weg 1: schwierig, mit über 600 unregelmäßigen Stufen; an der Eisentreppe gibt es ein Gitter, in dem sich Hundekrallen verfangen können, und der Park bittet um Vorsicht;",
          "Weg 6: außerhalb des Parks, nur für erfahrene Wanderer.",
        ],
      },
      {
        type: "p",
        text: "Der Balcone degli Innamorati ist nur mit Führung zu besichtigen: Die Website sagt nicht, ob Hunde teilnehmen dürfen, fragen Sie also vor der Buchung.",
      },
      {
        type: "image",
        src: MARMORE,
        alt: "Die Stufen der Marmore-Wasserfälle mit weißer Gischt und Wald ringsum",
        caption: "Die Marmore-Wasserfälle während einer Wasserfreigabe.",
      },
      { type: "h2", text: "Wann hinfahren: die Zeiten der Wasserfreigabe" },
      {
        type: "p",
        text: "Der offizielle Kalender für November und Dezember 2026 sieht vor:",
      },
      {
        type: "list",
        items: [
          "Park werktags von 10:00 bis 16:30 Uhr geöffnet, samstags und sonntags von 10:00 bis 17:00 Uhr;",
          "werktags keine Wasserfreigabe;",
          "im November samstags, sonntags und am 2. November Wasser von 12:00 bis 13:00 und von 15:00 bis 16:00 Uhr;",
          "im Dezember samstags, sonntags sowie am 7., 8., 24., 25. und vom 28. bis 31. Dezember Wasser von 12:00 bis 13:00 und von 14:00 bis 15:00 Uhr.",
        ],
      },
      {
        type: "p",
        text: "Der Kalender für 2027 ist noch nicht veröffentlicht, und die Website weist darauf hin, dass sich die Zeiten ändern können: Prüfen Sie ihn kurz vor dem Ausflug. Wenn das Wasser fließt, ist es laut: Ist Ihr Hund geräuschempfindlich, halten Sie ihn an den exponiertesten Stellen nah bei sich.",
      },
      { type: "h2", text: "Tickets" },
      {
        type: "p",
        text: "Zu den Preisen von 2026 kostet das volle Ticket 12 € ab 10 Jahren, das ermäßigte 10 € von 5 bis 9 Jahren und über 70; bis 4 Jahre ist der Eintritt frei. An Wintertagen ohne Wasserfreigabe gibt es ein Ticket für 6 €.",
      },
      { type: "h2", text: "Vom La Mora zum Wasserfall" },
      {
        type: "p",
        text: "Vom Agriturismo La Mora sind die Marmore-Wasserfälle 77,3 km entfernt, laut Google Maps gut eine Stunde mit dem Auto: morgens los, nachmittags zurück. Nach einem Tag auf den Wegen nehmen Gemelli und Sagittario im Erdgeschoss mit eigenem Garten Sie und Ihren Hund gegen einen Zuschlag von 25 € pro Aufenthalt auf.",
      },
      {
        type: "links",
        heading: "Den Ausflug planen",
        items: [
          { label: "Unser Ratgeber zu den Marmore-Wasserfällen", href: "/blog/cascate-delle-marmore/" },
          { label: "Urlaub mit Haustieren im La Mora", href: "/vacanza-con-animali/" },
          { label: "Die Ferienwohnung Gemelli", href: "/alloggi/gemelli/" },
          { label: "Die Ferienwohnung Sagittario", href: "/alloggi/sagittario/" },
          { label: "Assisi mit Hund", href: "/blog/assisi-con-il-cane/" },
          { label: "Parkordnung (italienisch)", href: MARMORE_REGOLAMENTO },
          { label: "Öffnungszeiten der Wasserfälle (italienisch)", href: MARMORE_ORARI },
        ],
      },
    ],
    faq: {
      heading: "Häufige Fragen zu den Marmore-Wasserfällen mit Hund",
      items: [
        { q: "Dürfen Hunde zu den Marmore-Wasserfällen?", a: "Ja, in alle Gemeinschaftsbereiche des Parks, außer in die mit Verbotsschild gekennzeichneten Bereiche und auf Kinderspielplätze." },
        { q: "Ist ein Maulkorb Pflicht?", a: "Ja: Die Parkordnung verlangt ihn für alle Hunde, unabhängig von der Rasse; nur Welpen unter sechs Monaten sind ausgenommen." },
        { q: "Wie lang darf die Leine sein?", a: "Höchstens 2 Meter." },
        { q: "Welcher Weg ist mit Hund am einfachsten?", a: "Die Wege 2 und 3 zum Belvedere inferiore gelten als leicht. Auf Weg 1 achten Sie auf das Gitter der Eisentreppe, in dem sich Krallen verfangen können." },
        { q: "Wann wird das Wasser freigegeben?", a: "Im November und Dezember 2026 nur samstags, sonntags und an einigen Feiertagen, in zwei Zeitfenstern von je einer Stunde; werktags gibt es keine Freigabe. Der aktuelle Kalender steht auf der offiziellen Website." },
        { q: "Wie weit sind die Wasserfälle vom La Mora entfernt?", a: "77,3 km, laut Google Maps gut eine Stunde mit dem Auto." },
      ],
    },
    disclaimer: CHECKED.de,
    finalCtaHeading: "Tagsüber der Wasserfall, abends der eigene Garten.",
    finalCtaBody: "Gemelli und Sagittario nehmen Sie und Ihren Hund auf.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};

/* "Umbria con i bambini: idee per un weekend da Assisi". Fonti verificate il
   21/10/2026:
   - Minimetrò: minimetrospa.it (stazioni, orari, 1,50 € la corsa singola,
     gratis fino a 6 anni);
   - Città del Cioccolato: cittadelcioccolato.it (pagina "acquista"
     aggiornata il 15/10/2026: orari, biglietti, tariffa famiglia,
     laboratori);
   - Cascata delle Marmore: cascatadellemarmore.info (sentieri adatti ai
     bambini, niente passeggino, tariffe 2026, orari di novembre e
     dicembre 2026);
   - Oasi La Valle: oasinaturalisticalavalle.it (orari 1/10–31/5, 4 €,
     gratis sotto i 6 anni, binocolo incluso);
   - Rocca del Leone: palazzodellacorgna.it (orari novembre–marzo; prezzi
     NON verificabili, non citati);
   - Città della Domenica: cittadelladomenica.it (calendario 2026, prezzi);
   - Albero di Natale del Trasimeno: articolo albero-di-natale-lago-trasimeno.
   Tolti perché non verificabili: funivia di Gubbio (prezzi e regole per i
   bambini), orario invernale dei battelli del Trasimeno. */
const PERUGIA = "/images/territorio/perugia/perugia vista alto.jpg";
const MARMORE_COVER = "/images/territorio/dintorni/cascate delle marmore.jpg";
const CITTA_CIOCCOLATO = "https://www.cittadelcioccolato.it/acquista";
const OASI_LA_VALLE = "https://www.oasinaturalisticalavalle.it/";

export const UMBRIA_KIDS_POST: Record<Locale, BlogPost> = {
  it: {
    slug: "umbria-con-i-bambini-weekend",
    topics: ["family"],
    category: "In famiglia",
    title: "Umbria con i bambini: idee per un weekend partendo da Assisi",
    excerpt:
      "Un weekend in Umbria con i bambini partendo da Assisi: Perugia con il Minimetrò e la Città del Cioccolato, la Cascata delle Marmore, il Lago Trasimeno. Con orari, biglietti ed età.",
    metaDescription:
      "Umbria con i bambini: idee per un weekend da Assisi. Perugia e la Città del Cioccolato, Cascata delle Marmore e Lago Trasimeno, con orari e biglietti.",
    image: PERUGIA,
    alt: "Perugia vista dall'alto, con i tetti del centro storico, i campanili e le colline intorno",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "In breve",
      items: [
        { label: "Perugia", value: "21,0 km da La Mora · circa 23 min" },
        { label: "Minimetrò", value: "gratis fino a 6 anni" },
        { label: "Città del Cioccolato", value: "tutti i giorni 10:00–19:00 · laboratori dai 3 agli 8 anni" },
        { label: "Cascata delle Marmore", value: "gratis fino a 4 anni · 77,3 km" },
        { label: "Lago Trasimeno", value: "Castiglione del Lago a 64,3 km" },
        { label: "Città della Domenica", value: "stagione 2026: 22 marzo – 8 novembre" },
      ],
    },
    intro:
      "L'Umbria con i bambini funziona bene in piccolo: tragitti brevi, una cosa grande al giorno, il pomeriggio libero per giocare. Ecco alcune idee per un weekend partendo dalla campagna di Assisi, solo con luoghi aperti nella stagione indicata e con orari, biglietti ed età verificati sui siti ufficiali.",
    content: [
      { type: "h2", text: "Sabato: Perugia, tra Minimetrò e cioccolato" },
      {
        type: "p",
        text: "Perugia è a 21,0 km da La Mora, circa 23 minuti in auto. Per salire verso il centro senza fatica c'è il Minimetrò, la linea che dalla stazione di Pian di Massiano arriva al Terminal Pincetto, sotto il centro storico: passa in media ogni 2,5 minuti, la corsa singola costa 1,50 € e i bambini fino a 6 anni viaggiano gratis. Funziona dal lunedì al venerdì dalle 7:00 alle 21:05, il sabato dalle 7:00 all'1:05 (fino al 26 dicembre 2026) e la domenica dalle 9:00 alle 20:45.",
      },
      {
        type: "p",
        text: "A 150 metri dall'uscita del Minimetrò c'è la Città del Cioccolato, nell'ex Mercato Coperto di piazza Matteotti, aperta tutti i giorni dalle 10:00 alle 19:00. Il biglietto costa 14 € nei feriali e 16 € nei festivi, il ridotto dai 7 ai 17 anni 8 € e 10 €; con la tariffa famiglia gli adulti pagano 12 € e 15 € e i bambini fino a 6 anni entrano gratis. Per i più piccoli, dai 3 agli 8 anni, ci sono i laboratori ChocoLab e ColoraLab, di 20 minuti, a 6 € ciascuno: il museo avverte che la programmazione può cambiare.",
      },
      { type: "h2", text: "Domenica: la Cascata delle Marmore" },
      {
        type: "p",
        text: "La Cascata delle Marmore, vicino a Terni, è a 77,3 km da La Mora, poco più di un'ora in auto: un salto di 165 metri in tre balzi, creato dai Romani. Con i bambini il parco indica come più adatti i sentieri 2 e 3, verso il Belvedere inferiore, che però non sono percorribili con il passeggino; nei punti scivolosi i bambini vanno tenuti per mano.",
      },
      {
        type: "p",
        text: "Il biglietto intero costa 12 € dai 10 anni, il ridotto 10 € dai 5 ai 9 anni; fino a 4 anni si entra gratis. Le famiglie con due genitori e almeno tre figli minorenni pagano 6 € per ogni bambino, con una tariffa che non si compra online. A novembre e dicembre 2026 l'acqua viene aperta solo il sabato, la domenica e in alcuni festivi, in due fasce di un'ora intorno a mezzogiorno e nel primo pomeriggio: controlla il calendario ufficiale prima di partire.",
      },
      {
        type: "image",
        src: MARMORE_COVER,
        alt: "La Cascata delle Marmore tra i boschi, con la nebbiolina sollevata dall'acqua",
        caption: "La Cascata delle Marmore.",
      },
      { type: "h2", text: "In alternativa: il Lago Trasimeno" },
      {
        type: "p",
        text: "Se preferite l'acqua calma del lago, l'Oasi naturalistica La Valle, a San Savino di Magione, è aperta dal 1° ottobre al 31 maggio: dal martedì al venerdì dalle 9:00 alle 13:00, il sabato e la domenica anche dalle 15:00 alle 18:00, chiusa il lunedì. Il biglietto costa 4 € e include il noleggio di un binocolo; sotto i 6 anni non si paga.",
      },
      {
        type: "p",
        text: "Sulla sponda ovest, a Castiglione del Lago (64,3 km da La Mora, circa 50 minuti), secondo il gestore la Rocca del Leone è aperta da novembre a marzo tutti i giorni dalle 10:00 alle 17:00, con ultimo ingresso 45 minuti prima. Dal 5 dicembre 2026 al 6 gennaio 2027 sul lago si accende l'albero di Natale, con ingresso gratuito fino a 12 anni: lo raccontiamo in una guida dedicata.",
      },
      credited(TRASIMENO_VELE_PHOTO, "it"),
      { type: "h2", text: "Da marzo a novembre: la Città della Domenica" },
      {
        type: "p",
        text: "In primavera e in autunno c'è anche la Città della Domenica, il parco divertimenti di Perugia: nella stagione 2026 è stata aperta dal 22 marzo all'8 novembre, mentre da dicembre a metà marzo resta chiusa. Nei giorni festivi l'ingresso costa 24,50 € (18 € il ridotto dai 3 ai 10 anni), nei feriali 16,50 € (13,50 €); sotto i 3 anni non si paga. Le date del 2027 sono da verificare sul calendario ufficiale.",
      },
      { type: "h2", text: "La base: un appartamento in campagna" },
      {
        type: "p",
        text: "Con i bambini aiuta tornare ogni sera nello stesso posto. A La Mora gli appartamenti sono indipendenti e con cucina, il parco giochi è sempre libero sotto la supervisione degli adulti e ci sono riduzioni per i bambini fino agli 11 anni non compiuti. Dalla campagna di Assisi, Perugia è a 21,0 km, Castiglione del Lago a 64,3 km e la Cascata delle Marmore a 77,3 km.",
      },
      {
        type: "links",
        heading: "Per organizzare il weekend",
        items: [
          { label: "Vacanza in famiglia a La Mora", href: "/vacanza-in-famiglia/" },
          { label: "Assisi con i bambini", href: "/blog/assisi-con-i-bambini/" },
          { label: "Agriturismo con bambini: come scegliere", href: "/blog/agriturismo-con-bambini-come-scegliere/" },
          { label: "La guida alle Cascate delle Marmore", href: "/blog/cascate-delle-marmore/" },
          { label: "L'albero di Natale sul Lago Trasimeno", href: "/blog/albero-di-natale-lago-trasimeno/" },
          { label: "Città del Cioccolato: orari e biglietti", href: CITTA_CIOCCOLATO },
          { label: "Cascata delle Marmore: orari", href: MARMORE_ORARI },
          { label: "Oasi naturalistica La Valle", href: OASI_LA_VALLE },
        ],
      },
    ],
    faq: {
      heading: "Domande frequenti sull'Umbria con i bambini",
      items: [
        { q: "Cosa fare in Umbria con i bambini d'inverno?", a: "Perugia con il Minimetrò e la Città del Cioccolato, aperta tutti i giorni dalle 10:00 alle 19:00; la Cascata delle Marmore nei giorni di rilascio dell'acqua; l'Oasi La Valle sul Trasimeno, aperta dal 1° ottobre al 31 maggio." },
        { q: "La Città della Domenica è aperta d'inverno?", a: "No: nella stagione 2026 è stata aperta dal 22 marzo all'8 novembre, e da dicembre a metà marzo resta chiusa." },
        { q: "I bambini pagano alla Cascata delle Marmore?", a: "Fino a 4 anni no; dai 5 ai 9 anni il ridotto costa 10 €, dai 10 anni l'intero 12 €." },
        { q: "Si va alla Cascata delle Marmore con il passeggino?", a: "I sentieri 2 e 3, i più adatti ai bambini, non sono percorribili con il passeggino." },
        { q: "I bambini pagano il Minimetrò di Perugia?", a: "Fino a 6 anni viaggiano gratis; la corsa singola costa 1,50 €." },
        { q: "Quanto dista Perugia da La Mora?", a: "21,0 km, circa 23 minuti in auto secondo Google Maps." },
      ],
    },
    disclaimer: CHECKED.it,
    finalCtaHeading: "Una gita al giorno, la sera in campagna.",
    finalCtaBody: "Appartamenti con cucina, parco giochi e piscina vicino ad Assisi.",
    finalCtaLabel: "Scopri gli appartamenti",
    finalCtaHref: "/alloggi/",
  },
  en: {
    slug: "umbria-con-i-bambini-weekend",
    topics: ["family"],
    category: "Family",
    title: "Umbria with children: weekend ideas from Assisi",
    excerpt:
      "A weekend in Umbria with children starting from Assisi: Perugia with the Minimetrò and the Città del Cioccolato, the Marmore Falls, Lake Trasimeno. With opening times, tickets and ages.",
    metaDescription:
      "Umbria with children: weekend ideas from Assisi. Perugia and the Città del Cioccolato, the Marmore Falls and Lake Trasimeno, with times and tickets.",
    image: PERUGIA,
    alt: "Perugia from above, with the rooftops of the historic centre, the bell towers and the hills around",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "At a glance",
      items: [
        { label: "Perugia", value: "21.0 km from La Mora · about 23 min" },
        { label: "Minimetrò", value: "free up to age 6" },
        { label: "Città del Cioccolato", value: "daily 10:00–19:00 · workshops for ages 3 to 8" },
        { label: "Marmore Falls", value: "free up to age 4 · 77.3 km" },
        { label: "Lake Trasimeno", value: "Castiglione del Lago 64.3 km away" },
        { label: "Città della Domenica", value: "2026 season: 22 March – 8 November" },
      ],
    },
    intro:
      "Umbria with children works best on a small scale: short journeys, one big thing a day, the afternoon free for play. Here are some ideas for a weekend starting from the Assisi countryside, only with places open in the season stated, and with opening times, tickets and ages checked on the official websites.",
    content: [
      { type: "h2", text: "Saturday: Perugia, the Minimetrò and chocolate" },
      {
        type: "p",
        text: "Perugia is 21.0 km from La Mora, about 23 minutes by car. To get up towards the centre without effort there is the Minimetrò, the line that runs from Pian di Massiano station to the Pincetto terminal, below the historic centre: it runs on average every 2.5 minutes, a single ride costs €1.50 and children up to age 6 travel free. It operates Monday to Friday from 7:00 to 21:05, on Saturdays from 7:00 to 1:05 (until 26 December 2026) and on Sundays from 9:00 to 20:45.",
      },
      {
        type: "p",
        text: "150 metres from the Minimetrò exit is the Città del Cioccolato, in the former covered market on Piazza Matteotti, open every day from 10:00 to 19:00. Tickets cost €14 on weekdays and €16 on public holidays, the reduced ticket for ages 7 to 17 €8 and €10; with the family rate adults pay €12 and €15 and children up to age 6 go in free. For the youngest, aged 3 to 8, there are the 20-minute ChocoLab and ColoraLab workshops at €6 each: the museum warns that the programme may change.",
      },
      { type: "h2", text: "Sunday: the Marmore Falls" },
      {
        type: "p",
        text: "The Marmore Falls, near Terni, are 77.3 km from La Mora, just over an hour by car: a 165-metre drop in three leaps, created by the Romans. With children, the park recommends trails 2 and 3, towards the Belvedere inferiore, though they are not suitable for pushchairs; in slippery spots children should be held by the hand.",
      },
      {
        type: "p",
        text: "A full ticket costs €12 from age 10, the reduced ticket €10 for ages 5 to 9; admission is free up to age 4. Families with two parents and at least three children under 18 pay €6 for each child, a rate that cannot be bought online. In November and December 2026 the water is released only on Saturdays, Sundays and some holidays, in two one-hour slots around midday and in the early afternoon: check the official calendar before you go.",
      },
      {
        type: "image",
        src: MARMORE_COVER,
        alt: "The Marmore Falls among the woods, with mist rising from the water",
        caption: "The Marmore Falls.",
      },
      { type: "h2", text: "Alternatively: Lake Trasimeno" },
      {
        type: "p",
        text: "If you prefer the calm water of the lake, the Oasi naturalistica La Valle nature reserve, at San Savino di Magione, is open from 1 October to 31 May: Tuesday to Friday from 9:00 to 13:00, Saturday and Sunday also from 15:00 to 18:00, closed on Mondays. Tickets cost €4 and include binocular hire; under-6s go in free.",
      },
      {
        type: "p",
        text: "On the west shore, at Castiglione del Lago (64.3 km from La Mora, about 50 minutes), according to its operator the Rocca del Leone is open every day from November to March from 10:00 to 17:00, with last entry 45 minutes before closing. From 5 December 2026 to 6 January 2027 the Christmas tree lights up on the lake, free for children up to 12: we cover it in a dedicated guide.",
      },
      credited(TRASIMENO_VELE_PHOTO, "en"),
      { type: "h2", text: "From March to November: the Città della Domenica" },
      {
        type: "p",
        text: "In spring and autumn there is also the Città della Domenica, Perugia's amusement park: in the 2026 season it was open from 22 March to 8 November, and it stays closed from December to mid-March. On public holidays admission costs €24.50 (€18 reduced for ages 3 to 10), on weekdays €16.50 (€13.50); under-3s go in free. The 2027 dates should be checked on the official calendar.",
      },
      { type: "h2", text: "Your base: an apartment in the countryside" },
      {
        type: "p",
        text: "With children it helps to come back to the same place every evening. At La Mora the apartments are independent with a kitchen, the playground is always open under adult supervision, and there are reductions for children under 11. From the Assisi countryside, Perugia is 21.0 km away, Castiglione del Lago 64.3 km and the Marmore Falls 77.3 km.",
      },
      {
        type: "links",
        heading: "Plan the weekend",
        items: [
          { label: "Family holidays at La Mora", href: "/vacanza-in-famiglia/" },
          { label: "Assisi with children", href: "/blog/assisi-con-i-bambini/" },
          { label: "Agriturismo with children: how to choose", href: "/blog/agriturismo-con-bambini-come-scegliere/" },
          { label: "Our guide to the Marmore Falls", href: "/blog/cascate-delle-marmore/" },
          { label: "The Christmas tree on Lake Trasimeno", href: "/blog/albero-di-natale-lago-trasimeno/" },
          { label: "Città del Cioccolato: times and tickets", href: CITTA_CIOCCOLATO },
          { label: "Marmore Falls: opening times (Italian)", href: MARMORE_ORARI },
          { label: "Oasi naturalistica La Valle", href: OASI_LA_VALLE },
        ],
      },
    ],
    faq: {
      heading: "Frequently asked questions about Umbria with children",
      items: [
        { q: "What can you do in Umbria with children in winter?", a: "Perugia with the Minimetrò and the Città del Cioccolato, open every day from 10:00 to 19:00; the Marmore Falls on water-release days; the Oasi La Valle on Lake Trasimeno, open from 1 October to 31 May." },
        { q: "Is the Città della Domenica open in winter?", a: "No: in the 2026 season it was open from 22 March to 8 November, and it stays closed from December to mid-March." },
        { q: "Do children pay at the Marmore Falls?", a: "Not up to age 4; from 5 to 9 the reduced ticket costs €10, from age 10 the full ticket €12." },
        { q: "Can you visit the Marmore Falls with a pushchair?", a: "Trails 2 and 3, the most suitable for children, are not passable with a pushchair." },
        { q: "Do children pay on Perugia's Minimetrò?", a: "Children up to age 6 travel free; a single ride costs €1.50." },
        { q: "How far is Perugia from La Mora?", a: "21.0 km, about 23 minutes by car according to Google Maps." },
      ],
    },
    disclaimer: CHECKED.en,
    finalCtaHeading: "One outing a day, evenings in the countryside.",
    finalCtaBody: "Apartments with a kitchen, a playground and a pool near Assisi.",
    finalCtaLabel: "See the apartments",
    finalCtaHref: "/alloggi/",
  },
  fr: {
    slug: "umbria-con-i-bambini-weekend",
    topics: ["family"],
    category: "En famille",
    title: "L'Ombrie avec des enfants : idées de week-end au départ d'Assise",
    excerpt:
      "Un week-end en Ombrie avec des enfants au départ d'Assise : Pérouse avec le Minimetrò et la Città del Cioccolato, la cascade des Marmore, le lac Trasimène. Avec horaires, billets et âges.",
    metaDescription:
      "L'Ombrie avec des enfants : idées de week-end au départ d'Assise. Pérouse et la Città del Cioccolato, cascade des Marmore et lac Trasimène, horaires et billets.",
    image: PERUGIA,
    alt: "Pérouse vue d'en haut, avec les toits du centre historique, les clochers et les collines autour",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "En bref",
      items: [
        { label: "Pérouse", value: "21,0 km de La Mora · environ 23 min" },
        { label: "Minimetrò", value: "gratuit jusqu'à 6 ans" },
        { label: "Città del Cioccolato", value: "tous les jours 10h00–19h00 · ateliers de 3 à 8 ans" },
        { label: "Cascade des Marmore", value: "gratuit jusqu'à 4 ans · 77,3 km" },
        { label: "Lac Trasimène", value: "Castiglione del Lago à 64,3 km" },
        { label: "Città della Domenica", value: "saison 2026 : 22 mars – 8 novembre" },
      ],
    },
    intro:
      "L'Ombrie avec des enfants se vit à petite échelle : trajets courts, une grande sortie par jour, l'après-midi libre pour jouer. Voici quelques idées pour un week-end au départ de la campagne d'Assise, uniquement avec des lieux ouverts à la saison indiquée, et des horaires, billets et âges vérifiés sur les sites officiels.",
    content: [
      { type: "h2", text: "Samedi : Pérouse, entre Minimetrò et chocolat" },
      {
        type: "p",
        text: "Pérouse est à 21,0 km de La Mora, environ 23 minutes en voiture. Pour monter vers le centre sans effort, il y a le Minimetrò, la ligne qui relie la station de Pian di Massiano au terminus du Pincetto, sous le centre historique : il passe en moyenne toutes les 2,5 minutes, le trajet simple coûte 1,50 € et les enfants jusqu'à 6 ans voyagent gratuitement. Il circule du lundi au vendredi de 7h00 à 21h05, le samedi de 7h00 à 1h05 (jusqu'au 26 décembre 2026) et le dimanche de 9h00 à 20h45.",
      },
      {
        type: "p",
        text: "À 150 mètres de la sortie du Minimetrò se trouve la Città del Cioccolato, dans l'ancien marché couvert de la piazza Matteotti, ouverte tous les jours de 10h00 à 19h00. Le billet coûte 14 € en semaine et 16 € les jours fériés, le réduit de 7 à 17 ans 8 € et 10 € ; avec le tarif famille, les adultes paient 12 € et 15 € et les enfants jusqu'à 6 ans entrent gratuitement. Pour les plus petits, de 3 à 8 ans, il y a les ateliers ChocoLab et ColoraLab, de 20 minutes, à 6 € chacun : le musée prévient que la programmation peut changer.",
      },
      { type: "h2", text: "Dimanche : la cascade des Marmore" },
      {
        type: "p",
        text: "La cascade des Marmore, près de Terni, est à 77,3 km de La Mora, un peu plus d'une heure en voiture : une chute de 165 mètres en trois sauts, créée par les Romains. Avec des enfants, le parc conseille les sentiers 2 et 3, vers le Belvedere inferiore, qui ne sont toutefois pas praticables en poussette ; dans les passages glissants, il faut tenir les enfants par la main.",
      },
      {
        type: "p",
        text: "Le billet plein tarif coûte 12 € dès 10 ans, le réduit 10 € de 5 à 9 ans ; l'entrée est gratuite jusqu'à 4 ans. Les familles avec deux parents et au moins trois enfants mineurs paient 6 € par enfant, un tarif qui ne s'achète pas en ligne. En novembre et décembre 2026, l'eau n'est lâchée que le samedi, le dimanche et certains jours fériés, sur deux créneaux d'une heure vers midi et en début d'après-midi : consultez le calendrier officiel avant de partir.",
      },
      {
        type: "image",
        src: MARMORE_COVER,
        alt: "La cascade des Marmore dans les bois, avec la brume qui s'élève de l'eau",
        caption: "La cascade des Marmore.",
      },
      { type: "h2", text: "Autre option : le lac Trasimène" },
      {
        type: "p",
        text: "Si vous préférez l'eau calme du lac, l'Oasi naturalistica La Valle, à San Savino di Magione, est ouverte du 1er octobre au 31 mai : du mardi au vendredi de 9h00 à 13h00, le samedi et le dimanche aussi de 15h00 à 18h00, fermée le lundi. Le billet coûte 4 € et comprend la location de jumelles ; c'est gratuit pour les moins de 6 ans.",
      },
      {
        type: "p",
        text: "Sur la rive ouest, à Castiglione del Lago (64,3 km de La Mora, environ 50 minutes), selon son gestionnaire, la Rocca del Leone est ouverte tous les jours de novembre à mars, de 10h00 à 17h00, avec dernière entrée 45 minutes avant. Du 5 décembre 2026 au 6 janvier 2027, le sapin de Noël s'allume sur le lac, gratuit jusqu'à 12 ans : nous lui consacrons un guide.",
      },
      credited(TRASIMENO_VELE_PHOTO, "fr"),
      { type: "h2", text: "De mars à novembre : la Città della Domenica" },
      {
        type: "p",
        text: "Au printemps et en automne, il y a aussi la Città della Domenica, le parc d'attractions de Pérouse : pendant la saison 2026, il a été ouvert du 22 mars au 8 novembre, et il reste fermé de décembre à mi-mars. Les jours fériés, l'entrée coûte 24,50 € (18 € le réduit de 3 à 10 ans), en semaine 16,50 € (13,50 €) ; c'est gratuit pour les moins de 3 ans. Les dates 2027 sont à vérifier sur le calendrier officiel.",
      },
      { type: "h2", text: "Le camp de base : un appartement à la campagne" },
      {
        type: "p",
        text: "Avec des enfants, il est rassurant de revenir chaque soir au même endroit. À La Mora, les appartements sont indépendants et équipés d'une cuisine, l'aire de jeux est toujours accessible sous la surveillance des adultes, et il y a des réductions pour les enfants de moins de 11 ans. Depuis la campagne d'Assise, Pérouse est à 21,0 km, Castiglione del Lago à 64,3 km et la cascade des Marmore à 77,3 km.",
      },
      {
        type: "links",
        heading: "Pour organiser le week-end",
        items: [
          { label: "Vacances en famille à La Mora", href: "/vacanza-in-famiglia/" },
          { label: "Assise avec des enfants", href: "/blog/assisi-con-i-bambini/" },
          { label: "Agritourisme avec enfants : comment choisir", href: "/blog/agriturismo-con-bambini-come-scegliere/" },
          { label: "Notre guide de la cascade des Marmore", href: "/blog/cascate-delle-marmore/" },
          { label: "Le sapin de Noël sur le lac Trasimène", href: "/blog/albero-di-natale-lago-trasimeno/" },
          { label: "Città del Cioccolato : horaires et billets", href: CITTA_CIOCCOLATO },
          { label: "Cascade des Marmore : horaires (en italien)", href: MARMORE_ORARI },
          { label: "Oasi naturalistica La Valle", href: OASI_LA_VALLE },
        ],
      },
    ],
    faq: {
      heading: "Questions fréquentes sur l'Ombrie avec des enfants",
      items: [
        { q: "Que faire en Ombrie avec des enfants en hiver ?", a: "Pérouse avec le Minimetrò et la Città del Cioccolato, ouverte tous les jours de 10h00 à 19h00 ; la cascade des Marmore les jours de lâcher d'eau ; l'Oasi La Valle sur le lac Trasimène, ouverte du 1er octobre au 31 mai." },
        { q: "La Città della Domenica est-elle ouverte en hiver ?", a: "Non : pendant la saison 2026, elle a été ouverte du 22 mars au 8 novembre, et elle reste fermée de décembre à mi-mars." },
        { q: "Les enfants paient-ils à la cascade des Marmore ?", a: "Pas jusqu'à 4 ans ; de 5 à 9 ans, le réduit coûte 10 €, dès 10 ans le plein tarif 12 €." },
        { q: "Peut-on aller à la cascade des Marmore en poussette ?", a: "Les sentiers 2 et 3, les plus adaptés aux enfants, ne sont pas praticables en poussette." },
        { q: "Les enfants paient-ils le Minimetrò de Pérouse ?", a: "Jusqu'à 6 ans, ils voyagent gratuitement ; le trajet simple coûte 1,50 €." },
        { q: "À quelle distance de La Mora se trouve Pérouse ?", a: "21,0 km, environ 23 minutes en voiture selon Google Maps." },
      ],
    },
    disclaimer: CHECKED.fr,
    finalCtaHeading: "Une sortie par jour, le soir à la campagne.",
    finalCtaBody: "Des appartements avec cuisine, une aire de jeux et une piscine près d'Assise.",
    finalCtaLabel: "Voir les appartements",
    finalCtaHref: "/alloggi/",
  },
  de: {
    slug: "umbria-con-i-bambini-weekend",
    topics: ["family"],
    category: "Mit Familie",
    title: "Umbrien mit Kindern: Ideen für ein Wochenende ab Assisi",
    excerpt:
      "Ein Wochenende in Umbrien mit Kindern ab Assisi: Perugia mit dem Minimetrò und der Città del Cioccolato, die Marmore-Wasserfälle, der Trasimenische See. Mit Öffnungszeiten, Tickets und Altersangaben.",
    metaDescription:
      "Umbrien mit Kindern: Ideen für ein Wochenende ab Assisi. Perugia und die Città del Cioccolato, Marmore-Wasserfälle und Trasimenischer See, mit Zeiten und Tickets.",
    image: PERUGIA,
    alt: "Perugia von oben, mit den Dächern der Altstadt, den Glockentürmen und den Hügeln ringsum",
    datePublished: PUBLISHED,
    schemaType: "BlogPosting",
    inBreve: {
      heading: "Auf einen Blick",
      items: [
        { label: "Perugia", value: "21,0 km vom La Mora · rund 23 Min." },
        { label: "Minimetrò", value: "frei bis 6 Jahre" },
        { label: "Città del Cioccolato", value: "täglich 10:00–19:00 · Workshops von 3 bis 8 Jahren" },
        { label: "Marmore-Wasserfälle", value: "frei bis 4 Jahre · 77,3 km" },
        { label: "Trasimenischer See", value: "Castiglione del Lago 64,3 km entfernt" },
        { label: "Città della Domenica", value: "Saison 2026: 22. März – 8. November" },
      ],
    },
    intro:
      "Umbrien mit Kindern funktioniert am besten im Kleinen: kurze Wege, ein großes Erlebnis pro Tag, der Nachmittag frei zum Spielen. Hier sind einige Ideen für ein Wochenende ab dem Land bei Assisi, nur mit Orten, die in der angegebenen Saison geöffnet sind, und mit Öffnungszeiten, Tickets und Altersangaben, die wir auf den offiziellen Websites geprüft haben.",
    content: [
      { type: "h2", text: "Samstag: Perugia, Minimetrò und Schokolade" },
      {
        type: "p",
        text: "Perugia ist 21,0 km vom La Mora entfernt, rund 23 Minuten mit dem Auto. Bequem Richtung Zentrum kommt man mit dem Minimetrò, der Linie von der Station Pian di Massiano zum Terminal Pincetto unterhalb der Altstadt: Er fährt im Schnitt alle 2,5 Minuten, die Einzelfahrt kostet 1,50 €, und Kinder bis 6 Jahre fahren gratis. Betrieb ist montags bis freitags von 7:00 bis 21:05 Uhr, samstags von 7:00 bis 1:05 Uhr (bis 26. Dezember 2026) und sonntags von 9:00 bis 20:45 Uhr.",
      },
      {
        type: "p",
        text: "150 Meter vom Ausgang des Minimetrò liegt die Città del Cioccolato, in der ehemaligen Markthalle an der Piazza Matteotti, täglich von 10:00 bis 19:00 Uhr geöffnet. Das Ticket kostet werktags 14 € und an Feiertagen 16 €, ermäßigt von 7 bis 17 Jahren 8 € und 10 €; mit dem Familientarif zahlen Erwachsene 12 € und 15 €, Kinder bis 6 Jahre sind frei. Für die Kleinsten von 3 bis 8 Jahren gibt es die 20-minütigen Workshops ChocoLab und ColoraLab für je 6 €: Das Museum weist darauf hin, dass sich das Programm ändern kann.",
      },
      { type: "h2", text: "Sonntag: die Marmore-Wasserfälle" },
      {
        type: "p",
        text: "Die Marmore-Wasserfälle bei Terni liegen 77,3 km vom La Mora entfernt, gut eine Stunde mit dem Auto: ein Fall von 165 Metern in drei Stufen, angelegt von den Römern. Mit Kindern empfiehlt der Park die Wege 2 und 3 zum Belvedere inferiore, die allerdings nicht mit dem Kinderwagen begehbar sind; an rutschigen Stellen sollte man die Kinder an der Hand halten.",
      },
      {
        type: "p",
        text: "Das volle Ticket kostet 12 € ab 10 Jahren, das ermäßigte 10 € von 5 bis 9 Jahren; bis 4 Jahre ist der Eintritt frei. Familien mit zwei Eltern und mindestens drei minderjährigen Kindern zahlen 6 € pro Kind, ein Tarif, der nicht online erhältlich ist. Im November und Dezember 2026 wird das Wasser nur samstags, sonntags und an einigen Feiertagen freigegeben, in zwei einstündigen Zeitfenstern um die Mittagszeit und am frühen Nachmittag: Prüfen Sie vor der Fahrt den offiziellen Kalender.",
      },
      {
        type: "image",
        src: MARMORE_COVER,
        alt: "Die Marmore-Wasserfälle im Wald, mit Sprühnebel über dem Wasser",
        caption: "Die Marmore-Wasserfälle.",
      },
      { type: "h2", text: "Alternativ: der Trasimenische See" },
      {
        type: "p",
        text: "Wer das ruhige Wasser des Sees vorzieht: Die Oasi naturalistica La Valle in San Savino di Magione ist vom 1. Oktober bis 31. Mai geöffnet, dienstags bis freitags von 9:00 bis 13:00 Uhr, samstags und sonntags auch von 15:00 bis 18:00 Uhr, montags geschlossen. Das Ticket kostet 4 € und enthält die Leihe eines Fernglases; unter 6 Jahren ist der Eintritt frei.",
      },
      {
        type: "p",
        text: "Am Westufer, in Castiglione del Lago (64,3 km vom La Mora, rund 50 Minuten), ist die Rocca del Leone laut Betreiber von November bis März täglich von 10:00 bis 17:00 Uhr geöffnet, letzter Einlass 45 Minuten vorher. Vom 5. Dezember 2026 bis 6. Januar 2027 leuchtet auf dem See der Weihnachtsbaum, für Kinder bis 12 Jahre kostenlos: Wir stellen ihn in einem eigenen Ratgeber vor.",
      },
      credited(TRASIMENO_VELE_PHOTO, "de"),
      { type: "h2", text: "Von März bis November: die Città della Domenica" },
      {
        type: "p",
        text: "Im Frühling und Herbst gibt es auch die Città della Domenica, den Freizeitpark von Perugia: In der Saison 2026 war er vom 22. März bis 8. November geöffnet, von Dezember bis Mitte März bleibt er geschlossen. An Feiertagen kostet der Eintritt 24,50 € (ermäßigt 18 € von 3 bis 10 Jahren), werktags 16,50 € (13,50 €); unter 3 Jahren ist er frei. Die Termine für 2027 stehen im offiziellen Kalender.",
      },
      { type: "h2", text: "Die Basis: eine Ferienwohnung auf dem Land" },
      {
        type: "p",
        text: "Mit Kindern hilft es, jeden Abend an denselben Ort zurückzukehren. Im La Mora sind die Ferienwohnungen unabhängig und haben eine Küche, der Spielplatz ist unter Aufsicht der Erwachsenen immer zugänglich, und für Kinder unter 11 Jahren gibt es Ermäßigungen. Vom Land bei Assisi sind es nach Perugia 21,0 km, nach Castiglione del Lago 64,3 km und zu den Marmore-Wasserfällen 77,3 km.",
      },
      {
        type: "links",
        heading: "Das Wochenende planen",
        items: [
          { label: "Familienurlaub im La Mora", href: "/vacanza-in-famiglia/" },
          { label: "Assisi mit Kindern", href: "/blog/assisi-con-i-bambini/" },
          { label: "Agriturismo mit Kindern: richtig wählen", href: "/blog/agriturismo-con-bambini-come-scegliere/" },
          { label: "Unser Ratgeber zu den Marmore-Wasserfällen", href: "/blog/cascate-delle-marmore/" },
          { label: "Der Weihnachtsbaum auf dem Trasimenischen See", href: "/blog/albero-di-natale-lago-trasimeno/" },
          { label: "Città del Cioccolato: Zeiten und Tickets", href: CITTA_CIOCCOLATO },
          { label: "Marmore-Wasserfälle: Öffnungszeiten (italienisch)", href: MARMORE_ORARI },
          { label: "Oasi naturalistica La Valle", href: OASI_LA_VALLE },
        ],
      },
    ],
    faq: {
      heading: "Häufige Fragen zu Umbrien mit Kindern",
      items: [
        { q: "Was kann man in Umbrien mit Kindern im Winter unternehmen?", a: "Perugia mit dem Minimetrò und der Città del Cioccolato, täglich von 10:00 bis 19:00 Uhr geöffnet; die Marmore-Wasserfälle an Tagen mit Wasserfreigabe; die Oasi La Valle am Trasimenischen See, geöffnet vom 1. Oktober bis 31. Mai." },
        { q: "Ist die Città della Domenica im Winter geöffnet?", a: "Nein: In der Saison 2026 war sie vom 22. März bis 8. November geöffnet, von Dezember bis Mitte März bleibt sie geschlossen." },
        { q: "Zahlen Kinder bei den Marmore-Wasserfällen?", a: "Bis 4 Jahre nicht; von 5 bis 9 Jahren kostet das ermäßigte Ticket 10 €, ab 10 Jahren das volle 12 €." },
        { q: "Kommt man mit dem Kinderwagen zu den Marmore-Wasserfällen?", a: "Die Wege 2 und 3, die für Kinder am besten geeignet sind, sind mit dem Kinderwagen nicht begehbar." },
        { q: "Zahlen Kinder im Minimetrò von Perugia?", a: "Bis 6 Jahre fahren sie gratis; die Einzelfahrt kostet 1,50 €." },
        { q: "Wie weit ist Perugia vom La Mora entfernt?", a: "21,0 km, laut Google Maps rund 23 Minuten mit dem Auto." },
      ],
    },
    disclaimer: CHECKED.de,
    finalCtaHeading: "Ein Ausflug pro Tag, abends auf dem Land.",
    finalCtaBody: "Ferienwohnungen mit Küche, Spielplatz und Pool bei Assisi.",
    finalCtaLabel: "Die Ferienwohnungen entdecken",
    finalCtaHref: "/alloggi/",
  },
};
