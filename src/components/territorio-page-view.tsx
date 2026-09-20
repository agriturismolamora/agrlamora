import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";
import { PuntiInteresseSection } from "@/components/punti-interesse-section";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Territorio",
    description: "Assisi, Santa Maria degli Angeli, Spello, Perugia: la guida al territorio umbro intorno ad Agriturismo La Mora, base ideale per visitare Assisi e dintorni.",
  },
  en: {
    title: "The Area",
    description: "Assisi, Santa Maria degli Angeli, Spello, Perugia: the guide to the Umbrian area around Agriturismo La Mora, an ideal base for visiting Assisi and its surroundings.",
  },
  fr: {
    title: "Le Territoire",
    description: "Assise, Santa Maria degli Angeli, Spello, Pérouse : le guide du territoire ombrien autour d'Agriturismo La Mora, base idéale pour visiter Assise et ses environs.",
  },
  de: {
    title: "Die Umgebung",
    description: "Assisi, Santa Maria degli Angeli, Spello, Perugia: der Leitfaden zur umbrischen Umgebung von Agriturismo La Mora, ideale Basis für Assisi und Umgebung.",
  },
};

export function getTerritorioMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return { title: m.title, description: m.description, alternates: { canonical: withLocale(locale, "/territorio/") } };
}

type Place = { name: string; src: string; alt: string; note: string; credit?: string };

const ASSISI_PLACES: Record<Locale, Place[]> = {
  it: [
    { name: "Basilica di San Francesco", src: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilica di San Francesco ad Assisi", note: "Il cuore della città, patrimonio UNESCO: gli affreschi di Giotto nella Basilica Superiore sono tra i motivi principali per cui si viene ad Assisi." },
    { name: "Basilica di Santa Maria degli Angeli", src: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg", alt: "Basilica di Santa Maria degli Angeli con la Porziuncola", note: "Custodisce al suo interno la Porziuncola, la piccola chiesa dove San Francesco fondò l'ordine francescano. A pochi minuti dalla struttura." },
    { name: "Eremo delle Carceri", src: "/images/territorio/assisi/eremo delle carceri assisi.jpg", alt: "Eremo delle Carceri sul Monte Subasio", note: "Il romitorio dove Francesco si ritirava in preghiera, immerso nel bosco del Monte Subasio: una tappa più silenziosa, lontana dal centro." },
    { name: "Bosco di San Francesco", src: "/images/territorio/assisi/bosco di san francesco assisi.jpg", alt: "Bosco di San Francesco, area naturale protetta dal FAI", note: "Un percorso naturalistico gestito dal FAI, tra uliveti, bosco e il torrente Tescio: una passeggiata diversa dal centro storico." },
    { name: "Santuario di San Damiano", src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg", alt: "Santuario di San Damiano nei dintorni di Assisi", note: "Dove Francesco udì il celebre invito a 'riparare la mia chiesa' e dove Chiara d'Assisi visse gran parte della sua vita." },
    { name: "Piazza del Comune", src: "/images/territorio/assisi/piazza del comune assisi.jpg", alt: "Piazza del Comune ad Assisi, con il Tempio di Minerva", note: "Il centro laico della città medievale, con il Tempio di Minerva e la Torre del Popolo: da qui si irradiano le vie del centro storico.", credit: "Berthold Werner, Wikimedia Commons (pubblico dominio)" },
    { name: "Rocca Maggiore", src: "/images/territorio/assisi/rocca maggiore assisi.jpg", alt: "Rocca Maggiore, la fortezza medievale che domina Assisi", note: "La fortezza che domina Assisi dall'alto da otto secoli, con una vista che arriva fino alla Valle Umbra.", credit: "Superchilum, Wikimedia Commons (CC BY-SA 3.0)" },
    { name: "Rocca Minore", src: "/images/territorio/assisi/rocca minore assisi.jpg", alt: "Rocca Minore, la fortificazione minore di Assisi verso nord-est", note: "La più piccola delle due rocche cittadine, verso nord-est: meno visitata, ma con la stessa vista sulla città.", credit: "LigaDue, Wikimedia Commons (CC BY 3.0)" },
  ],
  en: [
    { name: "Basilica of St. Francis", src: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilica of St. Francis in Assisi", note: "The heart of the city, a UNESCO World Heritage Site: Giotto's frescoes in the Upper Basilica are among the main reasons people come to Assisi." },
    { name: "Basilica of Santa Maria degli Angeli", src: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg", alt: "Basilica of Santa Maria degli Angeli with the Porziuncola", note: "Houses the Porziuncola, the small church where St. Francis founded the Franciscan order. Minutes from the property." },
    { name: "Eremo delle Carceri", src: "/images/territorio/assisi/eremo delle carceri assisi.jpg", alt: "Eremo delle Carceri hermitage on Monte Subasio", note: "The hermitage where Francis withdrew to pray, set in the woods of Monte Subasio: a quieter stop, away from the centre." },
    { name: "Bosco di San Francesco", src: "/images/territorio/assisi/bosco di san francesco assisi.jpg", alt: "Bosco di San Francesco, a protected natural area run by FAI", note: "A nature trail managed by the FAI (Italian National Trust), through olive groves, woodland and the Tescio stream: a different kind of walk from the historic centre." },
    { name: "Sanctuary of San Damiano", src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg", alt: "Sanctuary of San Damiano near Assisi", note: "Where Francis heard the famous call to 'repair my church' and where Clare of Assisi spent much of her life." },
    { name: "Piazza del Comune", src: "/images/territorio/assisi/piazza del comune assisi.jpg", alt: "Piazza del Comune in Assisi, with the Temple of Minerva", note: "The secular heart of the medieval city, with the Temple of Minerva and the Torre del Popolo: the streets of the historic centre radiate out from here.", credit: "Berthold Werner, Wikimedia Commons (public domain)" },
    { name: "Rocca Maggiore", src: "/images/territorio/assisi/rocca maggiore assisi.jpg", alt: "Rocca Maggiore, the medieval fortress overlooking Assisi", note: "The fortress that has overlooked Assisi for eight centuries, with a view reaching all the way to the Valle Umbra.", credit: "Superchilum, Wikimedia Commons (CC BY-SA 3.0)" },
    { name: "Rocca Minore", src: "/images/territorio/assisi/rocca minore assisi.jpg", alt: "Rocca Minore, the smaller fortification of Assisi to the north-east", note: "The smaller of the town's two fortresses, to the north-east: less visited, but with the same view over the city.", credit: "LigaDue, Wikimedia Commons (CC BY 3.0)" },
  ],
  fr: [
    { name: "Basilique Saint-François", src: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilique Saint-François à Assise", note: "Le cœur de la ville, patrimoine de l'UNESCO : les fresques de Giotto dans la basilique supérieure sont l'une des principales raisons de venir à Assise." },
    { name: "Basilique Sainte-Marie-des-Anges", src: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg", alt: "Basilique Sainte-Marie-des-Anges avec la Portioncule", note: "Elle abrite la Portioncule, la petite église où Saint François fonda l'ordre franciscain. À quelques minutes de la structure." },
    { name: "Ermitage des Carceri", src: "/images/territorio/assisi/eremo delle carceri assisi.jpg", alt: "Ermitage des Carceri sur le Mont Subasio", note: "L'ermitage où François se retirait pour prier, niché dans les bois du Mont Subasio : une étape plus silencieuse, loin du centre." },
    { name: "Bosco di San Francesco", src: "/images/territorio/assisi/bosco di san francesco assisi.jpg", alt: "Bosco di San Francesco, zone naturelle protégée par le FAI", note: "Un parcours naturaliste géré par le FAI, entre oliveraies, bois et le torrent Tescio : une promenade différente du centre historique." },
    { name: "Sanctuaire de San Damiano", src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg", alt: "Sanctuaire de San Damiano aux environs d'Assise", note: "Là où François entendit le célèbre appel à « réparer mon église » et où Claire d'Assise passa une grande partie de sa vie." },
    { name: "Piazza del Comune", src: "/images/territorio/assisi/piazza del comune assisi.jpg", alt: "Piazza del Comune à Assise, avec le temple de Minerve", note: "Le centre laïc de la ville médiévale, avec le temple de Minerve et la Torre del Popolo : c'est d'ici que rayonnent les rues du centre historique.", credit: "Berthold Werner, Wikimedia Commons (domaine public)" },
    { name: "Rocca Maggiore", src: "/images/territorio/assisi/rocca maggiore assisi.jpg", alt: "Rocca Maggiore, la forteresse médiévale qui domine Assise", note: "La forteresse qui domine Assise depuis huit siècles, avec une vue qui s'étend jusqu'à la Valle Umbra.", credit: "Superchilum, Wikimedia Commons (CC BY-SA 3.0)" },
    { name: "Rocca Minore", src: "/images/territorio/assisi/rocca minore assisi.jpg", alt: "Rocca Minore, la fortification mineure d'Assise vers le nord-est", note: "La plus petite des deux forteresses de la ville, vers le nord-est : moins visitée, mais avec la même vue sur la ville.", credit: "LigaDue, Wikimedia Commons (CC BY 3.0)" },
  ],
  de: [
    { name: "Basilika des Heiligen Franziskus", src: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilika des Heiligen Franziskus in Assisi", note: "Das Herz der Stadt, UNESCO-Welterbe: Giottos Fresken in der Oberkirche gehören zu den Hauptgründen, warum man nach Assisi kommt." },
    { name: "Basilika Santa Maria degli Angeli", src: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg", alt: "Basilika Santa Maria degli Angeli mit der Portiuncula", note: "Beherbergt die Portiuncula, die kleine Kirche, in der der Heilige Franziskus den Franziskanerorden gründete. Wenige Minuten von der Unterkunft entfernt." },
    { name: "Eremo delle Carceri", src: "/images/territorio/assisi/eremo delle carceri assisi.jpg", alt: "Einsiedelei Eremo delle Carceri auf dem Monte Subasio", note: "Die Einsiedelei, in die sich Franziskus zum Gebet zurückzog, mitten in den Wäldern des Monte Subasio: ein ruhigerer Ort, abseits des Zentrums." },
    { name: "Bosco di San Francesco", src: "/images/territorio/assisi/bosco di san francesco assisi.jpg", alt: "Bosco di San Francesco, ein vom FAI geschütztes Naturgebiet", note: "Ein vom FAI (italienischer Nationaltrust) verwalteter Naturpfad durch Olivenhaine, Wald und den Bach Tescio: ein anderer Spaziergang als die Altstadt." },
    { name: "Wallfahrtskirche San Damiano", src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg", alt: "Wallfahrtskirche San Damiano bei Assisi", note: "Wo Franziskus den berühmten Ruf hörte, „meine Kirche wieder aufzubauen“, und wo Klara von Assisi einen Großteil ihres Lebens verbrachte." },
    { name: "Piazza del Comune", src: "/images/territorio/assisi/piazza del comune assisi.jpg", alt: "Piazza del Comune in Assisi, mit dem Minerva-Tempel", note: "Das weltliche Zentrum der mittelalterlichen Stadt, mit dem Minerva-Tempel und dem Torre del Popolo: von hier strahlen die Gassen der Altstadt aus.", credit: "Berthold Werner, Wikimedia Commons (gemeinfrei)" },
    { name: "Rocca Maggiore", src: "/images/territorio/assisi/rocca maggiore assisi.jpg", alt: "Rocca Maggiore, die mittelalterliche Festung über Assisi", note: "Die Festung, die seit acht Jahrhunderten über Assisi thront, mit einem Ausblick bis in die Valle Umbra.", credit: "Superchilum, Wikimedia Commons (CC BY-SA 3.0)" },
    { name: "Rocca Minore", src: "/images/territorio/assisi/rocca minore assisi.jpg", alt: "Rocca Minore, die kleinere Festung von Assisi im Nordosten", note: "Die kleinere der beiden Festungen der Stadt, im Nordosten: weniger besucht, aber mit demselben Blick über die Stadt.", credit: "LigaDue, Wikimedia Commons (CC BY 3.0)" },
  ],
};

const DINTORNI_PLACES: Record<Locale, Place[]> = {
  it: [
    { name: "Monte Subasio", src: "/images/territorio/dintorni/monte subasio alto.jpg", alt: "Monte Subasio, il massiccio che domina Assisi", note: "Il parco naturale che sovrasta Assisi: sentieri per camminare o pedalare, e i pascoli d'altura che hanno dato il nome al formaggio locale." },
    { name: "Cascate delle Marmore", src: "/images/territorio/dintorni/cascate delle marmore.jpg", alt: "Cascate delle Marmore in Umbria", note: "Tra le cascate artificiali più alte d'Europa, a circa un'ora d'auto: una gita di mezza giornata per chi si ferma qualche notte in più." },
  ],
  en: [
    { name: "Monte Subasio", src: "/images/territorio/dintorni/monte subasio alto.jpg", alt: "Monte Subasio, the massif overlooking Assisi", note: "The natural park that rises above Assisi: trails for walking or cycling, and the upland pastures that gave the local cheese its name." },
    { name: "Marmore Falls", src: "/images/territorio/dintorni/cascate delle marmore.jpg", alt: "Marmore Falls in Umbria", note: "Among the tallest man-made waterfalls in Europe, about an hour's drive away: a half-day trip for those staying a few extra nights." },
  ],
  fr: [
    { name: "Mont Subasio", src: "/images/territorio/dintorni/monte subasio alto.jpg", alt: "Mont Subasio, le massif qui domine Assise", note: "Le parc naturel qui surplombe Assise : des sentiers pour marcher ou pédaler, et les pâturages d'altitude qui ont donné son nom au fromage local." },
    { name: "Cascate delle Marmore", src: "/images/territorio/dintorni/cascate delle marmore.jpg", alt: "Cascate delle Marmore en Ombrie", note: "Parmi les cascades artificielles les plus hautes d'Europe, à environ une heure de route : une excursion d'une demi-journée pour ceux qui restent quelques nuits de plus." },
  ],
  de: [
    { name: "Monte Subasio", src: "/images/territorio/dintorni/monte subasio alto.jpg", alt: "Monte Subasio, das Massiv über Assisi", note: "Der Naturpark, der über Assisi liegt: Wander- und Radwege sowie die Hochweiden, die dem lokalen Käse seinen Namen gaben." },
    { name: "Wasserfälle von Marmore", src: "/images/territorio/dintorni/cascate delle marmore.jpg", alt: "Wasserfälle von Marmore in Umbrien", note: "Einer der höchsten künstlichen Wasserfälle Europas, etwa eine Autostunde entfernt: ein Halbtagesausflug für alle, die ein paar Nächte länger bleiben." },
  ],
};

const TEXT: Record<
  Locale,
  {
    heroLabel: string;
    heroTitle: string;
    heroBody: string;
    assisiLabel: string;
    assisiHeading: string;
    fotoWord: string;
    dintorniLabel: string;
    dintorniHeading: string;
    dintorniBody: string;
    perugiaLabel: string;
    perugiaHeading: string;
    perugiaBody: string;
    bridgePrefix: string;
    bridgeOttavo: string;
    bridgeMiddle: string;
    bridgeAttivita: string;
    ctaHeading: string;
    ctaCta: string;
  }
> = {
  it: {
    heroLabel: "Il territorio",
    heroTitle: "Assisi fuori dalla finestra. L'Umbria tutt'intorno.",
    heroBody: "La Mora è a pochi minuti da Assisi, in posizione comoda anche per Santa Maria degli Angeli, Spello e Perugia. Una base per muoversi, non solo per dormire.",
    assisiLabel: "Assisi",
    assisiHeading: "La città di Francesco, a pochi minuti dalla struttura.",
    fotoWord: "Foto",
    dintorniLabel: "Dintorni",
    dintorniHeading: "Oltre Assisi, l'Umbria che si scopre in giornata.",
    dintorniBody: "A una quindicina di chilometri, Spello merita una tappa: un altro borgo medievale in pietra rosa, meno affollato di Assisi, noto per le Infiorate di giugno. Più lontano, il Monte Subasio e le Cascate delle Marmore allungano la giornata per chi si ferma qualche notte in più.",
    perugiaLabel: "Perugia",
    perugiaHeading: "Il capoluogo umbro, a mezz'ora d'auto.",
    perugiaBody: "Perugia ha un centro storico su un colle, l'Acquedotto medievale trasformato in passeggiata sospesa e una vita universitaria che la rende diversa, più mossa, rispetto ad Assisi. L'aeroporto dell'Umbria (Perugia San Francesco d'Assisi) è a soli 7 km dalla struttura.",
    bridgePrefix: "Il 2026 aggiunge un motivo in più per visitare Assisi: leggi di più sull'",
    bridgeOttavo: "Ottavo Centenario di San Francesco",
    bridgeMiddle: ". E se tra una tappa e l'altra cercate qualcosa da fare senza uscire dalla struttura, trovate tutto nella pagina",
    bridgeAttivita: "Attività",
    ctaHeading: "Una base comoda per vedere tutto questo.",
    ctaCta: "Scopri gli appartamenti",
  },
  en: {
    heroLabel: "The area",
    heroTitle: "Assisi outside the window. Umbria all around.",
    heroBody: "La Mora is minutes from Assisi, in a convenient position for Santa Maria degli Angeli, Spello and Perugia too. A base to move around from, not just to sleep in.",
    assisiLabel: "Assisi",
    assisiHeading: "The city of Francis, minutes from the property.",
    fotoWord: "Photo",
    dintorniLabel: "Nearby",
    dintorniHeading: "Beyond Assisi, the Umbria you can discover in a day.",
    dintorniBody: "About fifteen kilometres away, Spello is worth a stop: another medieval pink-stone town, less crowded than Assisi, known for its June flower festival (Infiorate). Further out, Monte Subasio and the Marmore Falls extend the day for those staying a few extra nights.",
    perugiaLabel: "Perugia",
    perugiaHeading: "Umbria's capital, half an hour by car.",
    perugiaBody: "Perugia has a historic centre on a hill, the medieval aqueduct turned into a suspended walkway, and a university life that makes it different, livelier, than Assisi. Umbria airport (Perugia San Francesco d'Assisi) is just 7 km from the property.",
    bridgePrefix: "2026 adds one more reason to visit Assisi: read more about the ",
    bridgeOttavo: "8th Centenary of St. Francis",
    bridgeMiddle: ". And if between stops you're looking for something to do without leaving the property, you'll find it all on the",
    bridgeAttivita: "Activities",
    ctaHeading: "A convenient base for seeing all of this.",
    ctaCta: "Discover the apartments",
  },
  fr: {
    heroLabel: "Le territoire",
    heroTitle: "Assise à votre fenêtre. L'Ombrie tout autour.",
    heroBody: "La Mora est à quelques minutes d'Assise, dans une position pratique aussi pour Santa Maria degli Angeli, Spello et Pérouse. Une base pour se déplacer, pas seulement pour dormir.",
    assisiLabel: "Assise",
    assisiHeading: "La ville de François, à quelques minutes de la structure.",
    fotoWord: "Photo",
    dintorniLabel: "Aux alentours",
    dintorniHeading: "Au-delà d'Assise, l'Ombrie à découvrir en une journée.",
    dintorniBody: "À une quinzaine de kilomètres, Spello mérite une halte : un autre village médiéval en pierre rose, moins fréquenté qu'Assise, connu pour ses Infiorate de juin. Plus loin, le Mont Subasio et les Cascate delle Marmore prolongent la journée pour ceux qui restent quelques nuits de plus.",
    perugiaLabel: "Pérouse",
    perugiaHeading: "Le chef-lieu de l'Ombrie, à une demi-heure en voiture.",
    perugiaBody: "Pérouse a un centre historique sur une colline, l'aqueduc médiéval transformé en promenade suspendue et une vie universitaire qui la rend différente, plus animée, qu'Assise. L'aéroport d'Ombrie (Pérouse Saint-François-d'Assise) est à seulement 7 km de la structure.",
    bridgePrefix: "2026 offre une raison de plus de visiter Assise : lisez-en plus sur le ",
    bridgeOttavo: "8e Centenaire de Saint François",
    bridgeMiddle: ". Et si entre deux étapes vous cherchez quelque chose à faire sans quitter la structure, vous trouverez tout sur la page",
    bridgeAttivita: "Activités",
    ctaHeading: "Une base pratique pour tout voir.",
    ctaCta: "Découvrir les appartements",
  },
  de: {
    heroLabel: "Die Umgebung",
    heroTitle: "Assisi vor dem Fenster. Umbrien ringsum.",
    heroBody: "La Mora liegt nur wenige Minuten von Assisi entfernt, auch praktisch gelegen für Santa Maria degli Angeli, Spello und Perugia. Eine Basis zum Erkunden, nicht nur zum Schlafen.",
    assisiLabel: "Assisi",
    assisiHeading: "Die Stadt des Franziskus, wenige Minuten von der Unterkunft entfernt.",
    fotoWord: "Foto",
    dintorniLabel: "Umgebung",
    dintorniHeading: "Jenseits von Assisi: das Umbrien, das man an einem Tag entdeckt.",
    dintorniBody: "Etwa fünfzehn Kilometer entfernt lohnt sich ein Abstecher nach Spello: ein weiterer mittelalterlicher Ort aus rosa Stein, weniger überlaufen als Assisi, bekannt für die Blumenfeste (Infiorate) im Juni. Weiter entfernt verlängern der Monte Subasio und die Wasserfälle von Marmore den Tag für alle, die ein paar Nächte länger bleiben.",
    perugiaLabel: "Perugia",
    perugiaHeading: "Die umbrische Hauptstadt, eine halbe Autostunde entfernt.",
    perugiaBody: "Perugia hat eine Altstadt auf einem Hügel, das mittelalterliche Aquädukt, das zu einem erhöhten Spazierweg umgebaut wurde, und ein Universitätsleben, das es anders, lebendiger als Assisi macht. Der Flughafen Umbrien (Perugia San Francesco d'Assisi) liegt nur 7 km von der Unterkunft entfernt.",
    bridgePrefix: "2026 bietet einen weiteren Grund, Assisi zu besuchen: lesen Sie mehr über den ",
    bridgeOttavo: "800. Todestag des Heiligen Franziskus",
    bridgeMiddle: ". Und wenn Sie zwischen den Ausflügen etwas unternehmen möchten, ohne die Unterkunft zu verlassen, finden Sie alles auf der Seite",
    bridgeAttivita: "Aktivitäten",
    ctaHeading: "Eine praktische Basis, um all das zu sehen.",
    ctaCta: "Die Apartments entdecken",
  },
};

export function TerritorioPageView({ locale }: { locale: Locale }) {
  const text = TEXT[locale];
  const assisiPlaces = ASSISI_PLACES[locale];
  const dintorniPlaces = DINTORNI_PLACES[locale];

  return (
    <>
      <section className="relative flex h-[64vh] min-h-[460px] items-end overflow-hidden">
        <Image
          src="/images/territorio/assisi/assisi con tramonto.jpg"
          alt="Assisi al tramonto vista dalla campagna umbra"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.78) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[900px] px-6 pb-14 text-center sm:px-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75">{text.heroLabel}</span>
          <h1 className="mt-4 font-display text-[clamp(34px,5.5vw,58px)] font-normal leading-[1.1] text-cream [text-wrap:balance]">
            {text.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.7] text-cream/80">{text.heroBody}</p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.assisiLabel}</span>
            <h2 className="mt-4 max-w-[600px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.assisiHeading}
            </h2>
          </Reveal>

          <div className="mt-10 space-y-14">
            {assisiPlaces.map((place, i) => (
              <Reveal key={place.name} delay={i * 40}>
                <div className={`grid grid-cols-1 items-center gap-8 sm:grid-cols-2 ${i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                    <Image src={place.src} alt={place.alt} fill sizes="(max-width: 640px) 100vw, 500px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display text-[22px] font-normal text-ink">{place.name}</h3>
                    <p className="mt-3 text-[14px] leading-[1.75] text-ink-soft">{place.note}</p>
                    {place.credit && (
                      <p className="mt-3 text-[11px] text-ink-soft/60">
                        {text.fotoWord}: {place.credit}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.dintorniLabel}</span>
            <h2 className="mt-4 max-w-[600px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.dintorniHeading}
            </h2>
            <p className="mt-5 max-w-[640px] text-[14px] leading-[1.75] text-ink-soft">{text.dintorniBody}</p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {dintorniPlaces.map((place, i) => (
              <Reveal key={place.name} delay={i * 60}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                  <Image src={place.src} alt={place.alt} fill sizes="(max-width: 640px) 100vw, 500px" className="object-cover" />
                </div>
                <h3 className="mt-4 font-display text-[20px] font-normal text-ink">{place.name}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">{place.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.perugiaLabel}</span>
            <h2 className="mt-4 max-w-[600px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.perugiaHeading}
            </h2>
            <p className="mt-5 max-w-[640px] text-[14px] leading-[1.75] text-ink-soft">{text.perugiaBody}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-[3px]">
              <Image
                src="/images/territorio/perugia/perugia vista alto.jpg"
                alt="Vista dall'alto del centro storico di Perugia"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-14 sm:py-16">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <p className="text-[14px] leading-[1.8] text-ink-soft">
              {text.bridgePrefix}
              <Link href={withLocale(locale, "/ottavo-centenario-san-francesco/")} className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry">
                {text.bridgeOttavo}
              </Link>
              {text.bridgeMiddle}{" "}
              <Link href={withLocale(locale, "/agriturismo-famiglie-ad-assisi-e-dintorni/")} className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry">
                {text.bridgeAttivita}
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <PuntiInteresseSection struttura="lamora" locale={locale} />

      <section className="bg-[#1f180e] py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[480px] px-6 sm:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,2.8vw,32px)] font-normal leading-[1.2] text-cream [text-wrap:balance]">
              {text.ctaHeading}
            </h2>
            <Link
              href={withLocale(locale, "/alloggi/")}
              className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-gold px-7 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-[#1f180e]"
            >
              <HoverFill color="#8f7330" />
              <span className="relative z-10 inline-flex items-center gap-2.5">
                {text.ctaCta}
                <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
