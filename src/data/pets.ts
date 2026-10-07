import type { Locale } from "@/lib/i18n";
import type { FaqItem } from "@/components/faq-accordion";

/* Sezione "Agriturismo ad Assisi con animali" (src/components/pets-section.tsx)
   su /alloggi/ e sulle schede di Gemelli e Sagittario, con FAQPage nel
   JSON-LD di quelle pagine. Solo regole di PROJECT-BRIEF.md (sezione 2):
   Gemelli e Sagittario con giardino privato recintato, 25 € a soggiorno,
   guinzaglio nella struttura; negli altri appartamenti solo piccola taglia,
   previo accordo, sempre 25 € a soggiorno. */
export const PETS_TEXT: Record<Locale, { label: string; heading: string; body: string; faq: FaqItem[] }> = {
  it: {
    label: "Animali",
    heading: "Agriturismo ad Assisi con animali",
    body: "Gemelli e Sagittario, al piano terra con giardino privato recintato, accolgono chi viaggia con il proprio animale: il supplemento è di 25 € a soggiorno. Nelle aree comuni della struttura gli animali vanno tenuti al guinzaglio. Negli appartamenti Pesci, Acquario e Bilancia sono ammessi solo animali di piccola taglia, previo accordo con il proprietario, sempre a 25 € a soggiorno.",
    faq: [
      { question: "Quali appartamenti accettano animali?", answer: "Gemelli e Sagittario, al piano terra con giardino privato recintato. Negli altri appartamenti (Pesci, Acquario e Bilancia) sono ammessi solo animali di piccola taglia, previo accordo con il proprietario." },
      { question: "Quanto costa portare un animale?", answer: "Il supplemento è di 25 € a soggiorno, non a notte." },
      { question: "Gli animali devono stare al guinzaglio?", answer: "Sì, nelle aree comuni della struttura. Nel giardino privato recintato di Gemelli e Sagittario possono muoversi liberamente." },
      { question: "Come segnalo che viaggio con un animale?", answer: "Indicalo quando prenoti o nella richiesta: nel modulo c'è la voce «Viaggio con animali», con taglia e tipo di animale." },
    ],
  },
  en: {
    label: "Pets",
    heading: "Pet-friendly agriturismo in Assisi",
    body: "Gemelli and Sagittario, on the ground floor with a private fenced garden, welcome guests travelling with their pet: the supplement is €25 per stay. In the shared areas of the property pets must be kept on a lead. The Pesci, Acquario and Bilancia apartments accept small pets only, by prior agreement with the owner, also at €25 per stay.",
    faq: [
      { question: "Which apartments accept pets?", answer: "Gemelli and Sagittario, on the ground floor with a private fenced garden. The other apartments (Pesci, Acquario and Bilancia) accept small pets only, by prior agreement with the owner." },
      { question: "How much does it cost to bring a pet?", answer: "The supplement is €25 per stay, not per night." },
      { question: "Do pets have to be kept on a lead?", answer: "Yes, in the shared areas of the property. In the private fenced garden of Gemelli and Sagittario they can move around freely." },
      { question: "How do I tell you I'm travelling with a pet?", answer: "Mention it when you book or in your request: the form has a 'Travelling with pets' option, with the animal's size and type." },
    ],
  },
  fr: {
    label: "Animaux",
    heading: "Agritourisme à Assise avec animaux",
    body: "Gemelli et Sagittario, au rez-de-chaussée avec jardin privé clôturé, accueillent les voyageurs avec leur animal : le supplément est de 25 € par séjour. Dans les espaces communs de la structure, les animaux doivent être tenus en laisse. Les appartements Pesci, Acquario et Bilancia acceptent uniquement les animaux de petite taille, après accord avec le propriétaire, également à 25 € par séjour.",
    faq: [
      { question: "Quels appartements acceptent les animaux ?", answer: "Gemelli et Sagittario, au rez-de-chaussée avec jardin privé clôturé. Les autres appartements (Pesci, Acquario et Bilancia) acceptent uniquement les animaux de petite taille, après accord avec le propriétaire." },
      { question: "Combien coûte la venue d'un animal ?", answer: "Le supplément est de 25 € par séjour, et non par nuit." },
      { question: "Les animaux doivent-ils être tenus en laisse ?", answer: "Oui, dans les espaces communs de la structure. Dans le jardin privé clôturé de Gemelli et Sagittario, ils peuvent circuler librement." },
      { question: "Comment signaler que je voyage avec un animal ?", answer: "Indiquez-le lors de la réservation ou dans votre demande : le formulaire comporte l'option « Je voyage avec des animaux », avec la taille et le type d'animal." },
    ],
  },
  de: {
    label: "Haustiere",
    heading: "Agriturismo in Assisi mit Haustieren",
    body: "Gemelli und Sagittario im Erdgeschoss, mit privatem, eingezäuntem Garten, nehmen Gäste mit ihrem Haustier auf: Der Aufpreis beträgt 25 € pro Aufenthalt. In den gemeinsamen Bereichen der Unterkunft sind Tiere an der Leine zu führen. In den Apartments Pesci, Acquario und Bilancia sind nur kleine Haustiere nach vorheriger Absprache mit dem Eigentümer erlaubt, ebenfalls für 25 € pro Aufenthalt.",
    faq: [
      { question: "Welche Apartments nehmen Haustiere auf?", answer: "Gemelli und Sagittario im Erdgeschoss, mit privatem, eingezäuntem Garten. In den übrigen Apartments (Pesci, Acquario und Bilancia) sind nur kleine Haustiere nach vorheriger Absprache mit dem Eigentümer erlaubt." },
      { question: "Was kostet die Mitnahme eines Haustiers?", answer: "Der Aufpreis beträgt 25 € pro Aufenthalt, nicht pro Nacht." },
      { question: "Müssen Tiere an der Leine geführt werden?", answer: "Ja, in den gemeinsamen Bereichen der Unterkunft. Im privaten, eingezäunten Garten von Gemelli und Sagittario können sie sich frei bewegen." },
      { question: "Wie gebe ich an, dass ich mit Haustier reise?", answer: "Geben Sie es bei der Buchung oder in Ihrer Anfrage an: Im Formular gibt es die Option „Ich reise mit Haustieren“, mit Größe und Art des Tieres." },
    ],
  },
};
