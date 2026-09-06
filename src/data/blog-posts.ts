import type { Locale } from "@/lib/i18n";

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
   territory-section.tsx e src/app/(it)/territorio/page.tsx, qui sviluppati
   in forma di articolo autonomo. Foto reali de La Mora (cartella
   public/images/territorio/). Tradotti in EN/FR/DE mantenendo esattamente
   gli stessi fatti dell'originale italiano — nessun dato aggiunto o
   rimosso in traduzione. */
const BLOG_POSTS_BY_LOCALE: Record<Locale, BlogPost[]> = {
  it: [
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
  ],
  en: [
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "The area",
      title: "Basilica of Santa Maria degli Angeli: what to see",
      excerpt: "The church that encloses the Porziuncola, the birthplace of the Franciscan order, minutes from La Mora.",
      image: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
      alt: "Porziuncola inside the Basilica of Santa Maria degli Angeli",
      body: [
        "The Basilica of Santa Maria degli Angeli is one of the largest churches in Christendom, built in the 16th century around a much smaller, much older building: the Porziuncola, the chapel where St. Francis spent much of his religious life and where he died, on October 3, 1226.",
        "Walking into the basilica and finding the tiny Porziuncola beneath the enormous dome is the experience most visitors remember best: a contrast that says more than any description about the distance between Francis's original simplicity and how his legacy was later celebrated.",
        "It's about 2 km from Agriturismo La Mora — the most convenient and quickest stop in the area, often the first our guests visit right after arriving, even before heading up to Assisi.",
      ],
    },
    {
      slug: "bosco-san-francesco",
      category: "Nature",
      title: "The Bosco di San Francesco, among the FAI trails",
      excerpt: "A protected natural area between Assisi and Santa Maria degli Angeli: olive groves, woodland and the Tescio stream, managed by FAI.",
      image: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
      alt: "Trail through the Bosco di San Francesco near Assisi",
      body: [
        "The Bosco di San Francesco is a nature trail of about 4 km connecting Assisi to Santa Maria degli Angeli, running through centuries-old olive groves, mixed woodland and the Tescio stream. Since 2008 it has been managed by FAI (the Italian National Trust), which maintains it and organises guided tours.",
        "It's a different way of experiencing Assisi compared to the historic centre: less stone, more greenery, a slow walking pace that pairs well with a day that also includes the pool and countryside. The main entrance is near the Basilica of Santa Maria degli Angeli — for hours and tickets it's always worth checking FAI's official website before you go, as they can vary by season.",
        "For guests staying at La Mora, it's one of the easiest trips to organise: a few minutes by car to the entrance, then it's all on foot.",
      ],
    },
    {
      slug: "santuario-san-damiano",
      category: "The area",
      title: "The Sanctuary of San Damiano, outside Assisi's walls",
      excerpt: "Where Francis heard the famous call to 'repair my church', and where Clare of Assisi spent most of her life.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Sanctuary of San Damiano near Assisi",
      body: [
        "San Damiano is a small sanctuary surrounded by olive trees, about two kilometres south of Assisi's walls. According to tradition, this is where the wooden crucifix spoke to Francis, calling on him to 'repair my church' — the episode that marked the beginning of his conversion.",
        "It's also where Clare of Assisi lived for over forty years, founding the order of the Poor Clares right here at this convent. Unlike the Basilica of St. Francis, San Damiano remains an intimate, quiet place, little touched by mass tourism despite its historical importance.",
        "It can be reached on foot from the centre of Assisi in about 20-25 minutes walking downhill (the climb back is more demanding), or by car in a few minutes. A stop we recommend for anyone looking for a moment of quiet after the Basilica.",
      ],
    },
    {
      slug: "cascate-delle-marmore",
      category: "Day trip",
      title: "Marmore Falls: how to get there from Assisi",
      excerpt: "Among the tallest man-made waterfalls in Europe, about an hour's drive from La Mora: a half-day trip.",
      image: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
      alt: "Marmore Falls in Umbria",
      body: [
        "The Marmore Falls, near Terni, are among the tallest man-made waterfalls in Europe: a total drop of 165 metres, created in Roman times to drain the area's marshes and today regulated for public opening according to set schedules (the water only flows during specific time slots — always check the official calendar before you go, as it changes by season).",
        "There are several viewpoints, reachable via trails of varying difficulty: the Belvedere Inferiore is the easiest and closest to the car park, while the upper trails take more time and a bit of fitness.",
        "From Agriturismo La Mora it's about 55-60 minutes by car: a trip that fits easily into half a day, which can be combined with a stop in Terni or timed to get back for an afternoon at the pool.",
      ],
    },
    {
      slug: "monte-subasio",
      category: "Nature",
      title: "Monte Subasio: the trails above Assisi",
      excerpt: "The natural park that dominates the city: high pastures, the cheese that shares its name, and trails for walking or cycling.",
      image: "/images/territorio/dintorni/monte-subasio.jpg",
      alt: "View from the high pastures of Monte Subasio",
      body: [
        "Monte Subasio is the massif that towers over Assisi, today a Regional Park: high pastures, holm oak and beech woods, and a network of trails linking the city to the Eremo delle Carceri and continuing on to the summit, at 1,290 metres.",
        "It's the place that gave its name to Subasio pecorino cheese, still produced today by the farms on the mountain, and the natural source of the famous pink stone that much of Assisi is built from.",
        "For those who love walking or cycling, the trails start right from the Eremo delle Carceri (reachable by car from Assisi in a few minutes) and offer views over the Umbrian valley that the historic centre, however beautiful, simply can't match.",
      ],
    },
  ],
  fr: [
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "Territoire",
      title: "Basilique Sainte-Marie-des-Anges : que voir",
      excerpt: "L'église qui abrite la Portioncule, le lieu de naissance de l'ordre franciscain, à quelques minutes de La Mora.",
      image: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
      alt: "La Portioncule à l'intérieur de la Basilique Sainte-Marie-des-Anges",
      body: [
        "La Basilique Sainte-Marie-des-Anges est l'une des plus grandes églises de la chrétienté, construite au XVIe siècle autour d'un édifice beaucoup plus petit et bien plus ancien : la Portioncule, la chapelle où saint François vécut une grande partie de sa vie religieuse et où il mourut, le 3 octobre 1226.",
        "Entrer dans la basilique et se retrouver devant la Portioncule, minuscule sous l'immense coupole, est l'expérience dont la plupart des visiteurs se souviennent le plus : un contraste qui en dit plus que n'importe quelle description sur la distance entre la simplicité originelle de François et la façon dont son héritage a ensuite été célébré.",
        "Elle se trouve à environ 2 km d'Agriturismo La Mora — l'étape la plus pratique et la plus rapide du territoire, souvent la première que nos hôtes visitent dès leur arrivée, avant même de monter à Assise.",
      ],
    },
    {
      slug: "bosco-san-francesco",
      category: "Nature",
      title: "Le Bosco di San Francesco, parmi les sentiers du FAI",
      excerpt: "Une aire naturelle protégée entre Assise et Sainte-Marie-des-Anges : oliveraies, bois et le torrent Tescio, gérés par le FAI.",
      image: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
      alt: "Sentier dans le Bosco di San Francesco près d'Assise",
      body: [
        "Le Bosco di San Francesco est un parcours naturaliste d'environ 4 km reliant Assise à Sainte-Marie-des-Anges, traversant des oliveraies centenaires, un bois mixte et le torrent Tescio. Depuis 2008, il est géré par le FAI (le Fonds pour l'environnement italien), qui en assure l'entretien et organise des visites guidées.",
        "C'est une autre façon de vivre Assise par rapport au centre historique : moins de pierre, plus de verdure, un rythme de marche lent qui s'accorde bien avec une journée passée aussi entre piscine et campagne. L'entrée principale se trouve près de la Basilique Sainte-Marie-des-Anges — pour les horaires et les billets, mieux vaut toujours consulter le site officiel du FAI avant de partir, car ils peuvent varier selon la saison.",
        "Pour les hôtes de La Mora, c'est l'une des excursions les plus simples à organiser : quelques minutes en voiture jusqu'à l'entrée, puis tout se fait à pied.",
      ],
    },
    {
      slug: "santuario-san-damiano",
      category: "Territoire",
      title: "Le sanctuaire de San Damiano, hors des murs d'Assise",
      excerpt: "Où François entendit le célèbre appel à 'réparer mon église', et où Claire d'Assise vécut la majeure partie de sa vie.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Sanctuaire de San Damiano près d'Assise",
      body: [
        "San Damiano est un petit sanctuaire niché parmi les oliviers, à environ deux kilomètres au sud des murs d'Assise. C'est ici que, selon la tradition, le crucifix de bois parla à François en l'invitant à 'réparer mon église' — l'épisode qui marqua le début de sa conversion.",
        "C'est aussi le lieu où Claire d'Assise vécut plus de quarante ans, fondant l'ordre des Clarisses dans ce même couvent. Contrairement à la Basilique Saint-François, San Damiano reste un lieu intime et silencieux, peu fréquenté par le tourisme de masse malgré son importance historique.",
        "On y accède à pied depuis le centre d'Assise en environ 20-25 minutes de marche en descente (la montée au retour est plus exigeante), ou en voiture en quelques minutes. Une étape que nous recommandons à qui cherche un moment de silence après la Basilique.",
      ],
    },
    {
      slug: "cascate-delle-marmore",
      category: "Excursion d'une journée",
      title: "Cascate delle Marmore : comment y aller depuis Assise",
      excerpt: "Parmi les plus hautes cascades artificielles d'Europe, à environ une heure de route de La Mora : une excursion d'une demi-journée.",
      image: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
      alt: "Cascate delle Marmore en Ombrie",
      body: [
        "Les Cascate delle Marmore, près de Terni, comptent parmi les plus hautes cascades artificielles d'Europe : une chute totale de 165 mètres, créée à l'époque romaine pour assainir les marais de la zone et aujourd'hui réglementée pour l'ouverture au public selon des horaires établis (l'eau ne coule qu'à certaines heures — vérifiez toujours le calendrier officiel avant de partir, il change selon la saison).",
        "Il existe plusieurs points de vue, accessibles par des parcours de difficulté variable : le Belvedere Inferiore est le plus simple et le plus proche du parking, tandis que les sentiers supérieurs demandent plus de temps et un peu d'entraînement.",
        "Depuis Agriturismo La Mora, comptez environ 55-60 minutes en voiture : une excursion réalisable en une demi-journée, que l'on peut combiner avec une halte à Terni ou faire coïncider avec un après-midi à la piscine.",
      ],
    },
    {
      slug: "monte-subasio",
      category: "Nature",
      title: "Le Mont Subasio : les sentiers au-dessus d'Assise",
      excerpt: "Le parc naturel qui domine la ville : pâturages d'altitude, le fromage du même nom, et des sentiers pour marcher ou pédaler.",
      image: "/images/territorio/dintorni/monte-subasio.jpg",
      alt: "Vue depuis les pâturages d'altitude du Mont Subasio",
      body: [
        "Le Mont Subasio est le massif qui surplombe Assise, aujourd'hui parc régional : pâturages d'altitude, forêts de chênes verts et de hêtres, et un réseau de sentiers reliant la ville à l'Ermitage des Prisons et se poursuivant jusqu'au sommet, à 1 290 mètres.",
        "C'est le lieu qui a donné son nom au fromage pecorino de Subasio, encore produit aujourd'hui par les élevages de la montagne, et l'arrière-pays naturel d'où est extraite la célèbre pierre rose avec laquelle est construite une grande partie d'Assise.",
        "Pour les amateurs de marche ou de vélo, les sentiers partent directement de l'Ermitage des Prisons (accessible en voiture depuis Assise en quelques minutes) et offrent sur la vallée ombrienne des vues que le centre historique, aussi beau soit-il, ne peut offrir.",
      ],
    },
  ],
  de: [
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "Umgebung",
      title: "Basilika Santa Maria degli Angeli: was man sehen sollte",
      excerpt: "Die Kirche, die die Portiuncula umschließt, den Geburtsort des Franziskanerordens, wenige Minuten von La Mora entfernt.",
      image: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
      alt: "Portiuncula im Inneren der Basilika Santa Maria degli Angeli",
      body: [
        "Die Basilika Santa Maria degli Angeli ist eine der größten Kirchen der Christenheit, im 16. Jahrhundert um ein viel kleineres, viel älteres Gebäude herum erbaut: die Portiuncula, die Kapelle, in der der Heilige Franziskus einen Großteil seines religiösen Lebens verbrachte und am 3. Oktober 1226 starb.",
        "Die Basilika zu betreten und vor der winzigen Portiuncula unter der riesigen Kuppel zu stehen, ist die Erfahrung, an die sich die meisten Besucher am meisten erinnern: ein Kontrast, der mehr als jede Beschreibung über die Distanz zwischen der ursprünglichen Einfachheit des Franziskus und der späteren Zelebrierung seines Erbes aussagt.",
        "Sie liegt etwa 2 km von Agriturismo La Mora entfernt — das bequemste und schnellste Ziel der Umgebung, oft das erste, das unsere Gäste gleich nach der Ankunft besuchen, noch bevor sie nach Assisi hinauffahren.",
      ],
    },
    {
      slug: "bosco-san-francesco",
      category: "Natur",
      title: "Der Bosco di San Francesco, zwischen den Wegen des FAI",
      excerpt: "Ein Naturschutzgebiet zwischen Assisi und Santa Maria degli Angeli: Olivenhaine, Wald und der Bach Tescio, verwaltet vom FAI.",
      image: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
      alt: "Wanderweg im Bosco di San Francesco bei Assisi",
      body: [
        "Der Bosco di San Francesco ist ein etwa 4 km langer Naturpfad, der Assisi mit Santa Maria degli Angeli verbindet und durch jahrhundertealte Olivenhaine, Mischwald und den Bach Tescio führt. Seit 2008 wird er vom FAI (dem italienischen Nationaltrust) verwaltet, der ihn pflegt und geführte Touren organisiert.",
        "Es ist eine andere Art, Assisi zu erleben als in der Altstadt: weniger Stein, mehr Grün, ein langsames Gehtempo, das gut zu einem Tag passt, der auch Pool und Landschaft einschließt. Der Haupteingang liegt in der Nähe der Basilika Santa Maria degli Angeli — für Öffnungszeiten und Tickets lohnt es sich immer, vorher die offizielle FAI-Website zu prüfen, da sie je nach Saison variieren können.",
        "Für Gäste von La Mora ist es einer der am einfachsten zu organisierenden Ausflüge: wenige Autominuten bis zum Eingang, dann geht es zu Fuß weiter.",
      ],
    },
    {
      slug: "santuario-san-damiano",
      category: "Umgebung",
      title: "Das Heiligtum San Damiano, außerhalb der Mauern Assisis",
      excerpt: "Wo Franziskus den berühmten Ruf hörte, 'meine Kirche zu reparieren', und wo Klara von Assisi den größten Teil ihres Lebens verbrachte.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Heiligtum San Damiano bei Assisi",
      body: [
        "San Damiano ist ein kleines, von Olivenbäumen umgebenes Heiligtum, etwa zwei Kilometer südlich der Mauern Assisis. Der Überlieferung nach sprach hier das hölzerne Kruzifix zu Franziskus und rief ihn auf, 'meine Kirche zu reparieren' — die Episode, die den Beginn seiner Bekehrung markierte.",
        "Es ist auch der Ort, an dem Klara von Assisi über vierzig Jahre lebte und genau in diesem Kloster den Orden der Klarissen gründete. Anders als die Basilika des Heiligen Franziskus bleibt San Damiano ein stiller, zurückgezogener Ort, trotz seiner historischen Bedeutung wenig vom Massentourismus berührt.",
        "Man erreicht es zu Fuß vom Zentrum Assisis in etwa 20-25 Minuten bergab (der Aufstieg auf dem Rückweg ist anspruchsvoller) oder in wenigen Autominuten. Ein Ziel, das wir allen empfehlen, die nach der Basilika einen Moment der Stille suchen.",
      ],
    },
    {
      slug: "cascate-delle-marmore",
      category: "Tagesausflug",
      title: "Marmore-Wasserfälle: Anfahrt von Assisi",
      excerpt: "Einer der höchsten künstlichen Wasserfälle Europas, etwa eine Autostunde von La Mora entfernt: ein halbtägiger Ausflug.",
      image: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
      alt: "Marmore-Wasserfälle in Umbrien",
      body: [
        "Die Marmore-Wasserfälle bei Terni gehören zu den höchsten künstlichen Wasserfällen Europas: ein Gesamtabsturz von 165 Metern, in römischer Zeit angelegt, um die Sümpfe der Gegend trockenzulegen, und heute nach festgelegten Zeiten für die Öffentlichkeit geregelt (das Wasser fließt nur zu bestimmten Zeiten — vor der Fahrt immer den offiziellen Kalender prüfen, da er je nach Saison wechselt).",
        "Es gibt mehrere Aussichtspunkte, die über unterschiedlich anspruchsvolle Wege erreichbar sind: der Belvedere Inferiore ist der einfachste und liegt am nächsten zum Parkplatz, während die oberen Wege mehr Zeit und etwas Kondition erfordern.",
        "Von Agriturismo La Mora sind es etwa 55-60 Autominuten: ein Ausflug, der gut in einen halben Tag passt und sich mit einem Halt in Terni oder einem Nachmittag am Pool danach kombinieren lässt.",
      ],
    },
    {
      slug: "monte-subasio",
      category: "Natur",
      title: "Monte Subasio: die Wege oberhalb von Assisi",
      excerpt: "Der Naturpark, der die Stadt überragt: Hochweiden, der gleichnamige Käse und Wege zum Wandern oder Radfahren.",
      image: "/images/territorio/dintorni/monte-subasio.jpg",
      alt: "Blick von den Hochweiden des Monte Subasio",
      body: [
        "Der Monte Subasio ist das Massiv, das sich über Assisi erhebt, heute ein Regionalpark: Hochweiden, Stein- und Buchenwälder und ein Netz von Wegen, die die Stadt mit der Eremo delle Carceri verbinden und weiter zum Gipfel auf 1.290 Metern führen.",
        "Er ist der Ort, der dem Pecorino-Käse aus Subasio seinen Namen gab, der noch heute von den Höfen am Berg produziert wird, und das natürliche Hinterland, aus dem der berühmte rosa Stein gewonnen wird, aus dem ein Großteil Assisis erbaut ist.",
        "Wander- und Radbegeisterte finden die Wege direkt bei der Eremo delle Carceri (von Assisi aus in wenigen Autominuten erreichbar); sie bieten Ausblicke auf das umbrische Tal, die die Altstadt, so schön sie auch ist, einfach nicht bieten kann.",
      ],
    },
  ],
};

export function getBlogPosts(locale: Locale): BlogPost[] {
  return BLOG_POSTS_BY_LOCALE[locale];
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  return BLOG_POSTS_BY_LOCALE[locale].find((p) => p.slug === slug);
}

/* Retro-compatibilità per eventuali import diretti dell'array italiano. */
export const BLOG_POSTS = BLOG_POSTS_BY_LOCALE.it;
