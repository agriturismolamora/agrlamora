import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { LocationMap } from "@/components/location-map";
import { NewsletterSection } from "@/components/newsletter-section";
import { CertificationsMarquee } from "@/components/certifications-marquee";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Colazione Bio",
    description: "Colazione biologica dalle 8:00 alle 9:30 ad Assisi: dolci tipici umbri di alta pasticceria, frutta di stagione, olio EVO. Dolce 5€/persona/giorno, supplemento salata +10€, inclusa per chi prenota diretto.",
  },
  en: {
    title: "Organic Breakfast",
    description: "Organic breakfast from 8am to 9:30am in Assisi: fine Umbrian pastries, seasonal fruit, EVO olive oil. Sweet €5/person/day, savoury supplement +€10, included for direct bookings.",
  },
  fr: {
    title: "Petit-Déjeuner Bio",
    description: "Petit-déjeuner biologique de 8h à 9h30 à Assise : pâtisseries typiques d'Ombrie, fruits de saison, huile d'olive extra vierge. Formule sucrée 5€/personne/jour, supplément salé +10€, inclus pour les réservations directes.",
  },
  de: {
    title: "Bio-Frühstück",
    description: "Bio-Frühstück von 8 bis 9:30 Uhr in Assisi: feines umbrisches Gebäck, saisonales Obst, natives Olivenöl extra. Süß 5€/Person/Tag, herzhafter Zuschlag +10€, bei Direktbuchung inklusive.",
  },
};

export function getColazioneMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/agriturismo-con-colazione-inclusa-assisi/") } };
}

function getFaqItems(locale: Locale): FaqItem[] {
  const items: Record<Locale, FaqItem[]> = {
    it: [
      { question: "A che ora si serve la colazione?", answer: "Ogni mattina dalle 8:00 alle 9:30, nella sala comune della struttura — comoda anche per chi deve partire presto verso Assisi o l'aeroporto di Perugia." },
      { question: "La colazione è inclusa nel prezzo della camera?", answer: "Dipende dalla tariffa scelta: alcune tariffe dirette la includono già (vale anche per la promozione Ottavo Centenario). Se non è inclusa, si aggiunge a parte: 5€ a persona al giorno per la colazione dolce, +10€ a persona per il supplemento salata." },
      { question: "Cosa include la colazione dolce?", answer: "Dolci tipici umbri di alta pasticceria, frutta di stagione, olio EVO della struttura. Caffè, cappuccino, tè o ginseng vengono preparati al momento, su richiesta." },
      { question: "Il menu cambia durante l'anno?", answer: "Sì: l'offerta varia in base alla stagionalità e ai prodotti disponibili in azienda, non è un buffet standardizzato uguale tutto l'anno." },
      { question: "È disponibile un'opzione senza glutine?", answer: "Sì, su richiesta, con un supplemento di 5€ a persona: la colazione dolce senza glutine ha quindi un costo di 10€ a persona al giorno." },
    ],
    en: [
      { question: "What time is breakfast served?", answer: "Every morning from 8am to 9:30am, in the property's common room — convenient for those who need to head out early to Assisi or Perugia airport." },
      { question: "Is breakfast included in the room price?", answer: "It depends on the rate you choose: some direct rates already include it (this also applies to the 8th Centenary promotion). If not included, it's added separately: €5 per person per day for the sweet breakfast, +€10 per person for the savoury supplement." },
      { question: "What does the sweet breakfast include?", answer: "Fine Umbrian pastries, seasonal fruit, the property's own EVO olive oil. Coffee, cappuccino, tea or ginseng coffee are prepared on the spot, on request." },
      { question: "Does the menu change during the year?", answer: "Yes: the offering varies based on seasonality and what's available on the farm — it's not a standardised buffet that's the same all year round." },
      { question: "Is a gluten-free option available?", answer: "Yes, on request, with a €5 per person supplement: gluten-free sweet breakfast therefore costs €10 per person per day." },
    ],
    fr: [
      { question: "À quelle heure le petit-déjeuner est-il servi ?", answer: "Chaque matin de 8h à 9h30, dans la salle commune de la structure — pratique aussi pour ceux qui doivent partir tôt vers Assise ou l'aéroport de Pérouse." },
      { question: "Le petit-déjeuner est-il inclus dans le prix de la chambre ?", answer: "Cela dépend du tarif choisi : certains tarifs directs l'incluent déjà (valable aussi pour la promotion du 8e Centenaire). S'il n'est pas inclus, il s'ajoute séparément : 5€ par personne et par jour pour la formule sucrée, +10€ par personne pour le supplément salé." },
      { question: "Que comprend le petit-déjeuner sucré ?", answer: "Des pâtisseries typiques d'Ombrie, des fruits de saison, l'huile d'olive extra vierge de la structure. Café, cappuccino, thé ou ginseng sont préparés sur place, sur demande." },
      { question: "Le menu change-t-il pendant l'année ?", answer: "Oui : l'offre varie selon la saisonnalité et les produits disponibles dans l'exploitation, ce n'est pas un buffet standardisé identique toute l'année." },
      { question: "Une option sans gluten est-elle disponible ?", answer: "Oui, sur demande, avec un supplément de 5€ par personne : le petit-déjeuner sucré sans gluten coûte donc 10€ par personne et par jour." },
    ],
    de: [
      { question: "Um wie viel Uhr wird das Frühstück serviert?", answer: "Jeden Morgen von 8 bis 9:30 Uhr im Gemeinschaftsraum der Unterkunft — praktisch auch für alle, die früh nach Assisi oder zum Flughafen Perugia aufbrechen müssen." },
      { question: "Ist das Frühstück im Zimmerpreis inbegriffen?", answer: "Das hängt vom gewählten Tarif ab: einige Direkttarife beinhalten es bereits (gilt auch für die Aktion zum 800. Todestag). Ist es nicht inbegriffen, kommt es separat hinzu: 5€ pro Person und Tag für das süße Frühstück, +10€ pro Person für den herzhaften Zuschlag." },
      { question: "Was beinhaltet das süße Frühstück?", answer: "Feines umbrisches Gebäck, saisonales Obst, natives Olivenöl extra der Unterkunft. Kaffee, Cappuccino, Tee oder Ginseng-Kaffee werden auf Wunsch frisch zubereitet." },
      { question: "Ändert sich das Menü im Laufe des Jahres?", answer: "Ja: das Angebot variiert je nach Saison und verfügbaren Produkten des Hofs — kein standardisiertes Buffet, das das ganze Jahr über gleich bleibt." },
      { question: "Gibt es eine glutenfreie Option?", answer: "Ja, auf Anfrage, mit einem Aufpreis von 5€ pro Person: das glutenfreie süße Frühstück kostet somit 10€ pro Person und Tag." },
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
    tavolaLabel: string;
    tavolaHeading: string;
    tavolaBody1: string;
    tavolaBody2: string;
    doveLabel: string;
    doveHeading: string;
    doveBody: string;
    facts: { value: string; label: string; detail: string }[];
    factsNote: string;
    promoLabel: string;
    promoHeading: string;
    promoBody: string;
    promoCta: string;
    pauseHeading: string;
    pauseBody: string;
    pauseCta: string;
    faqLabel: string;
    faqHeading: string;
  }
> = {
  it: {
    heroLabel: "Colazione bio · Agriturismo La Mora",
    heroTitle: "Dolci tipici umbri, non un buffet standardizzato.",
    introQuote: "È biologica: frutta di stagione, olio extravergine della struttura, e i dolci della migliore pasticceria umbra al posto di un buffet standardizzato. Cambia con quello che offre la stagione, non con un listino fisso.",
    tavolaLabel: "Cosa portiamo in tavola",
    tavolaHeading: "Il meglio della pasticceria umbra, in tavola ogni mattina.",
    tavolaBody1: "Dolci tipici umbri di alta pasticceria, frutta di stagione, olio extravergine di oliva della struttura. Non è un buffet uguale ogni giorno dell'anno — cambia con quello che c'è davvero in azienda in quel momento, restando sempre biologica.",
    tavolaBody2: "A richiesta, caffè, cappuccino, tè o ginseng vengono preparati al momento. Chi vuole un pasto più sostanzioso può aggiungere una colazione salata, con un supplemento a persona.",
    doveLabel: "Dove e quando",
    doveHeading: "Nella sala comune, con calma, prima di uscire.",
    doveBody: "Si serve ogni mattina dalle 8:00 alle 9:30 nella sala comune della struttura — comoda anche per chi deve partire verso Assisi, l'aeroporto di Perugia o la giornata in campagna.",
    facts: [
      { value: "08:00–09:30", label: "Orario", detail: "Ogni mattina, nella sala comune della struttura." },
      { value: "5€", label: "Colazione dolce", detail: "A persona, al giorno — dove non è già inclusa nella tariffa." },
      { value: "+10€", label: "Supplemento salata", detail: "A persona, per chi vuole un pasto più sostanzioso." },
      { value: "+5€", label: "Senza glutine", detail: "Supplemento a persona — colazione dolce senza glutine: 10€ totali." },
    ],
    factsNote: "L'offerta varia in base alla stagionalità e ai prodotti disponibili in azienda.",
    promoLabel: "Prenotazione diretta",
    promoHeading: "Colazione inclusa, per chi prenota direttamente.",
    promoBody: "Per l'Ottavo Centenario di San Francesco, la colazione bio è inclusa a chi scrive direttamente a noi invece di passare da un intermediario — valida su ogni prenotazione diretta, non solo durante le celebrazioni.",
    promoCta: "Scopri la promozione",
    pauseHeading: "Colazione con calma, poi si parte per Assisi.",
    pauseBody: "Il centro storico è a pochi minuti: si fa colazione presto e si arriva in tempo per una mattinata tranquilla, prima dell'afflusso dei bus turistici.",
    pauseCta: "Scopri il territorio",
    faqLabel: "Domande frequenti",
    faqHeading: "Le domande che ci fate più spesso.",
  },
  en: {
    heroLabel: "Organic breakfast · Agriturismo La Mora",
    heroTitle: "Fine Umbrian pastries, not a standardised buffet.",
    introQuote: "It's organic: seasonal fruit, the property's own extra virgin olive oil, and pastries from the best Umbrian patisseries instead of a standardised buffet. It changes with what the season offers, not with a fixed menu.",
    tavolaLabel: "What we bring to the table",
    tavolaHeading: "The best of Umbrian patisserie, on the table every morning.",
    tavolaBody1: "Fine Umbrian pastries, seasonal fruit, the property's own extra virgin olive oil. It's not the same buffet every day of the year — it changes with what's really available on the farm at that moment, always staying organic.",
    tavolaBody2: "On request, coffee, cappuccino, tea or ginseng coffee are prepared on the spot. Anyone wanting something more substantial can add a savoury breakfast, with a supplement per person.",
    doveLabel: "Where and when",
    doveHeading: "In the common room, unhurried, before heading out.",
    doveBody: "Served every morning from 8am to 9:30am in the property's common room — convenient for those heading towards Assisi, Perugia airport, or a day in the countryside.",
    facts: [
      { value: "08:00–09:30", label: "Hours", detail: "Every morning, in the property's common room." },
      { value: "€5", label: "Sweet breakfast", detail: "Per person, per day — where not already included in the rate." },
      { value: "+€10", label: "Savoury supplement", detail: "Per person, for those wanting something more substantial." },
      { value: "+€5", label: "Gluten-free", detail: "Supplement per person — gluten-free sweet breakfast: €10 total." },
    ],
    factsNote: "The offering varies based on seasonality and what's available on the farm.",
    promoLabel: "Direct booking",
    promoHeading: "Breakfast included, for those who book directly.",
    promoBody: "For the 8th Centenary of St. Francis, organic breakfast is included for those who write to us directly instead of going through a middleman — valid on every direct booking, not just during the celebrations.",
    promoCta: "Discover the promotion",
    pauseHeading: "Breakfast at a relaxed pace, then off to Assisi.",
    pauseBody: "The historic centre is minutes away: have breakfast early and arrive in time for a quiet morning, before the tour buses arrive.",
    pauseCta: "Discover the area",
    faqLabel: "Frequently asked questions",
    faqHeading: "The questions we're asked most often.",
  },
  fr: {
    heroLabel: "Petit-déjeuner bio · Agriturismo La Mora",
    heroTitle: "Pâtisseries typiques d'Ombrie, pas un buffet standardisé.",
    introQuote: "Il est biologique : fruits de saison, huile d'olive extra vierge de la structure, et les pâtisseries de la meilleure tradition ombrienne au lieu d'un buffet standardisé. Il change selon ce qu'offre la saison, pas selon une carte fixe.",
    tavolaLabel: "Ce que nous mettons sur la table",
    tavolaHeading: "Le meilleur de la pâtisserie ombrienne, sur la table chaque matin.",
    tavolaBody1: "Pâtisseries typiques d'Ombrie, fruits de saison, huile d'olive extra vierge de la structure. Ce n'est pas le même buffet chaque jour de l'année — il change selon ce qui est vraiment disponible dans l'exploitation à ce moment-là, tout en restant toujours biologique.",
    tavolaBody2: "Sur demande, café, cappuccino, thé ou ginseng sont préparés sur place. Ceux qui souhaitent un repas plus consistant peuvent ajouter un petit-déjeuner salé, avec un supplément par personne.",
    doveLabel: "Où et quand",
    doveHeading: "Dans la salle commune, tranquillement, avant de sortir.",
    doveBody: "Servi chaque matin de 8h à 9h30 dans la salle commune de la structure — pratique aussi pour ceux qui doivent partir vers Assise, l'aéroport de Pérouse ou une journée à la campagne.",
    facts: [
      { value: "08h00–09h30", label: "Horaires", detail: "Chaque matin, dans la salle commune de la structure." },
      { value: "5€", label: "Petit-déjeuner sucré", detail: "Par personne et par jour — quand non déjà inclus dans le tarif." },
      { value: "+10€", label: "Supplément salé", detail: "Par personne, pour un repas plus consistant." },
      { value: "+5€", label: "Sans gluten", detail: "Supplément par personne — petit-déjeuner sucré sans gluten : 10€ au total." },
    ],
    factsNote: "L'offre varie selon la saisonnalité et les produits disponibles dans l'exploitation.",
    promoLabel: "Réservation directe",
    promoHeading: "Petit-déjeuner inclus, pour une réservation directe.",
    promoBody: "Pour le 8e Centenaire de Saint François, le petit-déjeuner bio est inclus pour ceux qui nous écrivent directement plutôt que de passer par un intermédiaire — valable sur toute réservation directe, pas seulement pendant les célébrations.",
    promoCta: "Découvrir la promotion",
    pauseHeading: "Petit-déjeuner tranquille, puis départ pour Assise.",
    pauseBody: "Le centre historique est à quelques minutes : on prend son petit-déjeuner tôt et on arrive à temps pour une matinée calme, avant l'afflux des bus touristiques.",
    pauseCta: "Découvrir le territoire",
    faqLabel: "Questions fréquentes",
    faqHeading: "Les questions que l'on nous pose le plus souvent.",
  },
  de: {
    heroLabel: "Bio-Frühstück · Agriturismo La Mora",
    heroTitle: "Feines umbrisches Gebäck, kein standardisiertes Buffet.",
    introQuote: "Es ist biologisch: saisonales Obst, natives Olivenöl extra der Unterkunft und Gebäck aus der besten umbrischen Konditorei statt eines standardisierten Buffets. Es ändert sich je nach Saison, nicht nach einer festen Karte.",
    tavolaLabel: "Was wir auf den Tisch bringen",
    tavolaHeading: "Das Beste der umbrischen Konditorei, jeden Morgen auf dem Tisch.",
    tavolaBody1: "Feines umbrisches Gebäck, saisonales Obst, natives Olivenöl extra der Unterkunft. Es ist nicht jeden Tag im Jahr dasselbe Buffet — es ändert sich je nachdem, was auf dem Hof gerade wirklich verfügbar ist, bleibt aber immer biologisch.",
    tavolaBody2: "Auf Wunsch werden Kaffee, Cappuccino, Tee oder Ginseng-Kaffee frisch zubereitet. Wer etwas Herzhafteres möchte, kann ein herzhaftes Frühstück gegen Aufpreis pro Person hinzufügen.",
    doveLabel: "Wo und wann",
    doveHeading: "Im Gemeinschaftsraum, in Ruhe, bevor es losgeht.",
    doveBody: "Serviert wird jeden Morgen von 8 bis 9:30 Uhr im Gemeinschaftsraum der Unterkunft — praktisch auch für alle, die Richtung Assisi, zum Flughafen Perugia oder zu einem Tag auf dem Land aufbrechen.",
    facts: [
      { value: "08:00–09:30", label: "Öffnungszeiten", detail: "Jeden Morgen, im Gemeinschaftsraum der Unterkunft." },
      { value: "5€", label: "Süßes Frühstück", detail: "Pro Person und Tag — wo nicht bereits im Tarif enthalten." },
      { value: "+10€", label: "Herzhafter Zuschlag", detail: "Pro Person, für alle, die etwas Herzhafteres möchten." },
      { value: "+5€", label: "Glutenfrei", detail: "Aufpreis pro Person — glutenfreies süßes Frühstück: 10€ insgesamt." },
    ],
    factsNote: "Das Angebot variiert je nach Saison und den auf dem Hof verfügbaren Produkten.",
    promoLabel: "Direktbuchung",
    promoHeading: "Frühstück inklusive, bei Direktbuchung.",
    promoBody: "Zum 800. Todestag des Heiligen Franziskus ist das Bio-Frühstück für alle inklusive, die uns direkt schreiben, statt über einen Vermittler zu buchen — gültig für jede Direktbuchung, nicht nur während der Feierlichkeiten.",
    promoCta: "Aktion entdecken",
    pauseHeading: "In Ruhe frühstücken, dann geht's nach Assisi.",
    pauseBody: "Die Altstadt ist nur wenige Minuten entfernt: früh frühstücken und rechtzeitig für einen ruhigen Morgen ankommen, bevor die Touristenbusse eintreffen.",
    pauseCta: "Die Umgebung entdecken",
    faqLabel: "Häufig gestellte Fragen",
    faqHeading: "Die Fragen, die uns am häufigsten gestellt werden.",
  },
};

export function ColazionePageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  return (
    <>
      <section className="relative flex h-[86vh] min-h-[560px] items-end overflow-hidden">
        <Image
          src="/images/colazione/colazione bio agriturismo la mora.webp"
          alt="Colazione biologica servita ad Agriturismo La Mora"
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
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/80">
              {text.heroLabel}
            </span>
            <h1 className="mt-5 font-display text-[clamp(34px,6vw,60px)] font-normal leading-[1.1] text-cream [text-wrap:balance]">
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
                src="/images/colazione/sala con colazione pronta agriturismo.webp"
                alt="Sala comune con la colazione pronta ad Agriturismo La Mora"
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
                  src="/images/colazione/colazione bio agriturismo la mora.webp"
                  alt="Colazione biologica servita ad Agriturismo La Mora"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
              <div className="order-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
                  {text.tavolaLabel}
                </span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  {text.tavolaHeading}
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
                  {text.tavolaBody1}
                </p>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
                  {text.tavolaBody2}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-20 grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16 sm:mt-24">
              <div className="order-2 sm:order-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
                  {text.doveLabel}
                </span>
                <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  {text.doveHeading}
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
                  {text.doveBody}
                </p>
              </div>
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[3px] sm:order-2 sm:aspect-[16/11]">
                <Image
                  src="/images/colazione/sala con colazione pronta agriturismo.webp"
                  alt="Sala comune con la colazione pronta ad Agriturismo La Mora"
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <Reveal>
            <dl className="grid grid-cols-2 gap-10 border-t border-ink/10 pt-10 text-center sm:grid-cols-4">
              {text.facts.map((point) => (
                <div key={point.label}>
                  <dt className="font-display text-4xl text-raspberry">{point.value}</dt>
                  <dd className="mt-3">
                    <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.05em] text-ink">
                      {point.label}
                    </span>
                    <span className="mt-2 block text-[13px] leading-[1.6] text-ink-soft">{point.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mx-auto mt-10 max-w-[520px] text-center text-[12px] leading-[1.7] text-ink-soft/80">
              {text.factsNote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-10 px-6 sm:grid-cols-2 sm:gap-16 sm:px-10">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[16/11]">
              <Image
                src="/images/ottavo centenario san francesco/basilica di san francesco di assisi ottavo centenario.webp"
                alt="Basilica di San Francesco d'Assisi"
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.promoLabel}</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.2vw,38px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.promoHeading}
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-ink-soft">
              {text.promoBody}
            </p>
            <Link
              href={withLocale(locale, "/ottavo-centenario-san-francesco/")}
              className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
            >
              <HoverFill color="#8a3844" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.promoCta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative flex h-[64vh] min-h-[440px] items-center justify-center overflow-hidden">
        <Image
          src="/images/territorio/assisi/assisi con tramonto.jpg"
          alt="Assisi al tramonto, vista dalla campagna umbra"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
        <div className="relative z-[1] mx-auto max-w-[520px] px-6 text-center sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(26px,3.4vw,36px)] font-normal leading-[1.3] text-cream [text-wrap:balance]">
              {text.pauseHeading}
            </h2>
            <p className="mt-4 text-[14px] leading-[1.75] text-cream/75">
              {text.pauseBody}
            </p>
            <Link
              href={withLocale(locale, "/territorio/")}
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.pauseCta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
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

      <LocationMap locale={locale} />
      <NewsletterSection locale={locale} />
      <CertificationsMarquee locale={locale} />
    </>
  );
}
