import type { Locale } from "@/lib/i18n";
import type { FaqItem } from "@/components/faq-accordion";

/* FAQ visibile in home (src/components/home-faq.tsx) e FAQPage nel JSON-LD
   della home: stesse domande e risposte. Solo fatti brevi già nel brief o
   nel sito: piscina (pagina Piscina), animali, colazione (pagina
   Colazione), colonnina da 22 kW, distanze di Google Maps (places.ts e
   blog-ctas.ts), sconti e caparra della prenotazione diretta. */
export const HOME_FAQ: Record<Locale, { label: string; heading: string; items: FaqItem[] }> = {
  it: {
    label: "Domande frequenti",
    heading: "Le risposte brevi, prima di prenotare.",
    items: [
      {
        question: "Quando è aperta la piscina?",
        answer: "Dal 1° maggio al 28 settembre, tutti i giorni dalle 9:00 alle 19:00. La vasca misura 6×12 metri; nelle ore più calde si aziona anche una fontana idromassaggio.",
      },
      {
        question: "Si possono portare animali?",
        answer: "Sì, negli appartamenti Gemelli e Sagittario, che hanno un giardino privato recintato: il supplemento è di 25 € a soggiorno e nella struttura gli animali vanno tenuti al guinzaglio. Negli altri appartamenti sono ammessi solo animali di piccola taglia, previo accordo con il proprietario, sempre a 25 € a soggiorno.",
      },
      {
        question: "La colazione è inclusa?",
        answer: "Dipende dalla tariffa: alcune tariffe dirette la includono. Altrimenti la colazione bio, servita dalle 8:00 alle 9:30, costa 5 € a persona al giorno (dolce); il supplemento salato è di 10 € a persona e quello senza glutine di 5 €.",
      },
      {
        question: "C'è una colonnina per ricaricare l'auto elettrica?",
        answer: "Sì, una colonnina da 22 kW nel parcheggio della struttura. Segnalalo quando prenoti, così ci organizziamo.",
      },
      {
        question: "Quanto dista La Mora da Assisi e da Perugia?",
        answer: "In auto, secondo Google Maps: Santa Maria degli Angeli 2,1 km; Piazza del Comune, nel centro di Assisi, 6,8 km (circa 14 minuti); Basilica di San Francesco 7,5 km (circa 18 minuti); centro storico di Perugia 21,0 km (circa 23 minuti); aeroporto di Perugia 11,4 km (circa 11 minuti).",
      },
      {
        question: "Perché prenotare direttamente sul sito?",
        answer: "Non paghi commissioni di intermediari e valgono gli sconti diretti: -10% per soggiorni da 7 notti, -10% per chi torna da noi e -10% con la tariffa non rimborsabile. Alla prenotazione si versa una caparra del 25%, il saldo all'arrivo.",
      },
      {
        question: "Quanti appartamenti ci sono?",
        answer: "Cinque appartamenti indipendenti (Pesci, Acquario, Sagittario, Gemelli e Bilancia), da 4 a 8 posti letto, ognuno con cucina attrezzata, aria condizionata e Wi-Fi. Il parcheggio è gratuito, all'interno della struttura.",
      },
    ],
  },
  en: {
    label: "Frequently asked questions",
    heading: "Quick answers before you book.",
    items: [
      {
        question: "When is the pool open?",
        answer: "From 1 May to 28 September, every day from 9am to 7pm. The pool measures 6×12 metres; in the hottest hours a hydromassage fountain is also turned on.",
      },
      {
        question: "Can I bring my pet?",
        answer: "Yes, in the Gemelli and Sagittario apartments, which have a private fenced garden: the supplement is €25 per stay and pets must be kept on a lead on the property. The other apartments accept small pets only, by prior agreement with the owner, also at €25 per stay.",
      },
      {
        question: "Is breakfast included?",
        answer: "It depends on the rate: some direct rates include it. Otherwise the organic breakfast, served from 8:00 to 9:30am, costs €5 per person per day (sweet); the savoury supplement is €10 per person and the gluten-free one €5.",
      },
      {
        question: "Is there an electric car charging point?",
        answer: "Yes, a 22 kW charging point in the property's car park. Let us know when you book so we can organise it.",
      },
      {
        question: "How far is La Mora from Assisi and Perugia?",
        answer: "By car, according to Google Maps: Santa Maria degli Angeli 2.1 km; Piazza del Comune, in the centre of Assisi, 6.8 km (about 14 minutes); the Basilica of San Francesco 7.5 km (about 18 minutes); Perugia's historic centre 21.0 km (about 23 minutes); Perugia airport 11.4 km (about 11 minutes).",
      },
      {
        question: "Why book directly on the website?",
        answer: "You pay no intermediary commissions and the direct discounts apply: 10% off stays of 7 nights or more, 10% off for returning guests and 10% off with the non-refundable rate. A 25% deposit is paid when you book, the balance on arrival.",
      },
      {
        question: "How many apartments are there?",
        answer: "Five independent apartments (Pesci, Acquario, Sagittario, Gemelli and Bilancia) sleeping 4 to 8, each with a fully equipped kitchen, air conditioning and Wi-Fi. Parking is free, inside the property.",
      },
    ],
  },
  fr: {
    label: "Questions fréquentes",
    heading: "Les réponses en bref, avant de réserver.",
    items: [
      {
        question: "Quand la piscine est-elle ouverte ?",
        answer: "Du 1er mai au 28 septembre, tous les jours de 9h à 19h. Le bassin mesure 6×12 mètres ; aux heures les plus chaudes, une fontaine hydromassante est aussi mise en marche.",
      },
      {
        question: "Peut-on venir avec un animal ?",
        answer: "Oui, dans les appartements Gemelli et Sagittario, qui ont un jardin privé clôturé : le supplément est de 25 € par séjour et, dans la structure, les animaux doivent être tenus en laisse. Les autres appartements acceptent uniquement les animaux de petite taille, après accord avec le propriétaire, également à 25 € par séjour.",
      },
      {
        question: "Le petit-déjeuner est-il inclus ?",
        answer: "Cela dépend du tarif : certains tarifs directs l'incluent. Sinon, le petit-déjeuner bio, servi de 8h à 9h30, coûte 5 € par personne et par jour (sucré) ; le supplément salé est de 10 € par personne et le supplément sans gluten de 5 €.",
      },
      {
        question: "Y a-t-il une borne de recharge pour voiture électrique ?",
        answer: "Oui, une borne de 22 kW sur le parking de la structure. Indiquez-le au moment de réserver, pour que nous puissions nous organiser.",
      },
      {
        question: "À quelle distance se trouve La Mora d'Assise et de Pérouse ?",
        answer: "En voiture, selon Google Maps : Santa Maria degli Angeli 2,1 km ; Piazza del Comune, au centre d'Assise, 6,8 km (environ 14 minutes) ; basilique Saint-François 7,5 km (environ 18 minutes) ; centre historique de Pérouse 21,0 km (environ 23 minutes) ; aéroport de Pérouse 11,4 km (environ 11 minutes).",
      },
      {
        question: "Pourquoi réserver directement sur le site ?",
        answer: "Aucune commission d'intermédiaire, et les remises directes s'appliquent : -10 % pour les séjours de 7 nuits ou plus, -10 % pour les clients qui reviennent et -10 % avec le tarif non remboursable. Un acompte de 25 % est versé à la réservation, le solde à l'arrivée.",
      },
      {
        question: "Combien d'appartements y a-t-il ?",
        answer: "Cinq appartements indépendants (Pesci, Acquario, Sagittario, Gemelli et Bilancia), de 4 à 8 couchages, chacun avec cuisine équipée, climatisation et Wi-Fi. Le parking est gratuit, à l'intérieur de la structure.",
      },
    ],
  },
  de: {
    label: "Häufige Fragen",
    heading: "Kurze Antworten vor der Buchung.",
    items: [
      {
        question: "Wann ist der Pool geöffnet?",
        answer: "Vom 1. Mai bis 28. September, täglich von 9 bis 19 Uhr. Das Becken misst 6×12 Meter; in den heißesten Stunden wird zusätzlich ein Hydromassage-Brunnen eingeschaltet.",
      },
      {
        question: "Sind Haustiere erlaubt?",
        answer: "Ja, in den Apartments Gemelli und Sagittario mit privatem, eingezäuntem Garten: Der Aufpreis beträgt 25 € pro Aufenthalt, und auf dem Gelände sind Tiere an der Leine zu führen. In den übrigen Apartments sind nur kleine Haustiere nach vorheriger Absprache mit dem Eigentümer erlaubt, ebenfalls für 25 € pro Aufenthalt.",
      },
      {
        question: "Ist das Frühstück inbegriffen?",
        answer: "Das hängt vom Tarif ab: Einige Direkttarife beinhalten es. Sonst kostet das Bio-Frühstück, serviert von 8 bis 9:30 Uhr, 5 € pro Person und Tag (süß); der herzhafte Zuschlag beträgt 10 € pro Person, der glutenfreie 5 €.",
      },
      {
        question: "Gibt es eine Ladestation für Elektroautos?",
        answer: "Ja, eine 22-kW-Ladestation auf dem Parkplatz der Unterkunft. Geben Sie es bitte bei der Buchung an, damit wir uns darauf einstellen können.",
      },
      {
        question: "Wie weit ist La Mora von Assisi und Perugia entfernt?",
        answer: "Mit dem Auto laut Google Maps: Santa Maria degli Angeli 2,1 km; Piazza del Comune im Zentrum von Assisi 6,8 km (rund 14 Minuten); Basilika San Francesco 7,5 km (rund 18 Minuten); Altstadt von Perugia 21,0 km (rund 23 Minuten); Flughafen Perugia 11,4 km (rund 11 Minuten).",
      },
      {
        question: "Warum direkt auf der Website buchen?",
        answer: "Es fallen keine Vermittlungsprovisionen an, und es gelten die Direktrabatte: 10 % ab 7 Nächten, 10 % für wiederkehrende Gäste und 10 % mit dem nicht erstattbaren Tarif. Bei der Buchung wird eine Anzahlung von 25 % fällig, der Rest bei Ankunft.",
      },
      {
        question: "Wie viele Apartments gibt es?",
        answer: "Fünf unabhängige Apartments (Pesci, Acquario, Sagittario, Gemelli und Bilancia) für 4 bis 8 Personen, jeweils mit voll ausgestatteter Küche, Klimaanlage und WLAN. Der Parkplatz ist kostenlos und liegt auf dem Gelände.",
      },
    ],
  },
};
