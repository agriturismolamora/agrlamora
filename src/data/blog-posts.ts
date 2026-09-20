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
    {
      slug: "agriumbria-umbriafiere",
      category: "Eventi",
      title: "Agriumbria a Umbriafiere: la fiera dell'agricoltura a 3 km da La Mora",
      excerpt: "Ogni anno, generalmente a fine marzo, la mostra nazionale di agricoltura, zootecnia e alimentazione più importante dell'Umbria si tiene a Bastia Umbra, a pochi minuti da La Mora.",
      image: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
      alt: "Esterno di Agriturismo La Mora, base comoda per chi visita Umbriafiere",
      /* Fatti verificati sul sito ufficiale agriumbria.eu (settembre 2026):
         57ª edizione 2026 il 27-29 marzo, tre settori (agricoltura,
         zootecnia, alimentazione), razze bovine nazionali in mostra
         (Chianina, Limousine, Charolaise, Romagnola). Nessuna foto reale
         della fiera disponibile in public/: usata una foto reale della
         struttura, non un'immagine della fiera stessa (mai inventata). */
      body: [
        "Agriumbria è la Mostra Nazionale di Agricoltura, Zootecnia e Alimentazione: una delle fiere di settore più importanti del centro Italia, organizzata ogni anno a Umbriafiere, il quartiere fieristico di Bastia Umbra. L'edizione 2026 ha tagliato il traguardo della 57ª edizione, svolta dal 27 al 29 marzo — la fiera ricorre tipicamente in questo periodo, a fine marzo.",
        "Il percorso copre l'intera filiera, dal campo alla tavola: macchinari e attrezzature agricole, mostre di razze bovine, ovine e avicole nazionali (tra cui Chianina, Limousine, Charolaise e Romagnola), tecnologie per olio, vino e caseifici, oltre a un'area prodotti tipici e degustazioni che attira anche chi non lavora nel settore.",
        "Umbriafiere dista circa 3 km da Agriturismo La Mora: comodo sia per chi espone o lavora alla fiera e non vuole affrontare ogni giorno lunghi spostamenti, sia per chi la visita e preferisce soggiornare in campagna invece che in un hotel di città, con la possibilità di aggiungere una gita ad Assisi ai margini della trasferta.",
        "Bastia Umbra e Umbriafiere ospitano manifestazioni per gran parte dell'anno, non solo Agriumbria: tra queste anche Caccia Village, dedicata al mondo della caccia (ne parliamo in un altro articolo). Per le date esatte di ogni edizione, il riferimento resta sempre il calendario ufficiale di Umbriafiere, che può variare di anno in anno.",
      ],
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Eventi",
      title: "Caccia Village a Umbriafiere: la fiera della caccia vicino ad Assisi",
      excerpt: "Ogni anno, generalmente a metà maggio, centinaia di aziende del mondo venatorio si radunano a Bastia Umbra, tra Perugia e Assisi, a pochi minuti da La Mora.",
      image: "/images/struttura/foto dell esterno della struttura.webp",
      alt: "Esterno di Agriturismo La Mora, base comoda per chi visita Caccia Village",
      /* Fatti verificati (settembre 2026) su fonti giornalistiche/di settore
         (all4shooters.com) per l'edizione 2026: 16-18 maggio, oltre 250
         espositori (la maggior affluenza di sempre), armi e munizioni
         disattivate, abbigliamento tecnico, ottiche, cani da caccia con
         area ENCI, gastronomia di selvaggina. Nessuna foto reale della
         fiera disponibile in public/: usata una foto reale della
         struttura. */
      body: [
        "Caccia Village è la fiera dedicata al mondo della caccia che si tiene ogni anno a Umbriafiere, il quartiere fieristico di Bastia Umbra, tra Perugia e Assisi. L'edizione 2026 si è svolta dal 16 al 18 maggio, con oltre 250 aziende espositrici — la partecipazione più alta nella storia della manifestazione: la fiera ricorre tipicamente in questo periodo, a metà maggio.",
        "Il programma copre armi e munizioni (sempre esposte disattivate), abbigliamento e attrezzatura tecnica, ottiche e strumentazione, un'area dedicata ai cani da caccia con lo spazio ENCI per le prove cinofile, oltre a gastronomia di selvaggina e banchi di macelleria specializzata.",
        "Anche per chi arriva da fuori regione solo per la fiera, Umbriafiere è a circa 3 km da Agriturismo La Mora: un punto d'appoggio comodo in campagna, con la possibilità — tra una giornata di fiera e l'altra — di dedicare qualche ora ad Assisi, a pochi minuti di distanza.",
        "Caccia Village non è l'unico appuntamento importante ospitato da Umbriafiere: tra le altre manifestazioni del calendario c'è anche Agriumbria, la mostra nazionale di agricoltura e zootecnia (ne parliamo in un altro articolo). Le date di ogni edizione vanno sempre verificate sul calendario ufficiale di Umbriafiere, che può cambiare di anno in anno.",
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
    {
      slug: "agriumbria-umbriafiere",
      category: "Events",
      title: "Agriumbria at Umbriafiere: the agriculture fair 3 km from La Mora",
      excerpt: "Every year, generally in late March, Umbria's most important national exhibition of agriculture, livestock and food is held in Bastia Umbra, minutes from La Mora.",
      image: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
      alt: "Exterior of Agriturismo La Mora, a convenient base for visiting Umbriafiere",
      body: [
        "Agriumbria is the National Exhibition of Agriculture, Livestock and Food: one of central Italy's most important trade fairs, held every year at Umbriafiere, the exhibition centre in Bastia Umbra. The 2026 edition marked its 57th year, running March 27-29 — the fair typically falls in this period, at the end of March.",
        "It covers the whole supply chain, from field to table: agricultural machinery and equipment, exhibitions of national cattle, sheep and poultry breeds (including Chianina, Limousine, Charolaise and Romagnola), technology for oil, wine and dairy production, plus a local-products and tasting area that draws visitors well beyond the industry itself.",
        "Umbriafiere is about 3 km from Agriturismo La Mora: convenient both for exhibitors or workers at the fair who don't want a long commute every day, and for visitors who'd rather stay in the countryside than in a city hotel, with the option of fitting in a trip to Assisi around the fair days.",
        "Bastia Umbra and Umbriafiere host events for much of the year, not just Agriumbria: among them is also Caccia Village, dedicated to hunting (we cover it in another article). For exact dates of each edition, always check Umbriafiere's official calendar, which can vary from year to year.",
      ],
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Events",
      title: "Caccia Village at Umbriafiere: the hunting fair near Assisi",
      excerpt: "Every year, generally in mid-May, hundreds of companies from the hunting world gather in Bastia Umbra, between Perugia and Assisi, minutes from La Mora.",
      image: "/images/struttura/foto dell esterno della struttura.webp",
      alt: "Exterior of Agriturismo La Mora, a convenient base for visiting Caccia Village",
      body: [
        "Caccia Village is the fair dedicated to the world of hunting, held every year at Umbriafiere, the exhibition centre in Bastia Umbra, between Perugia and Assisi. The 2026 edition ran May 16-18, with over 250 exhibiting companies — the highest turnout in the event's history: the fair typically falls in this period, in mid-May.",
        "The programme covers firearms and ammunition (always displayed deactivated), technical clothing and equipment, optics and instruments, an area dedicated to hunting dogs with an ENCI space for canine trials, plus game meat gastronomy and specialised butchery stalls.",
        "Even for those arriving from outside the region just for the fair, Umbriafiere is about 3 km from Agriturismo La Mora: a convenient base in the countryside, with the option — between fair days — of spending a few hours in Assisi, minutes away.",
        "Caccia Village isn't the only major event hosted by Umbriafiere: the calendar also includes Agriumbria, the national exhibition of agriculture and livestock (we cover it in another article). Dates for each edition should always be checked on Umbriafiere's official calendar, which can change from year to year.",
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
    {
      slug: "agriumbria-umbriafiere",
      category: "Événements",
      title: "Agriumbria à Umbriafiere : la foire de l'agriculture à 3 km de La Mora",
      excerpt: "Chaque année, généralement fin mars, la plus importante exposition nationale d'agriculture, d'élevage et d'alimentation d'Ombrie se tient à Bastia Umbra, à quelques minutes de La Mora.",
      image: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
      alt: "Extérieur d'Agriturismo La Mora, une base pratique pour visiter Umbriafiere",
      body: [
        "Agriumbria est l'Exposition Nationale d'Agriculture, d'Élevage et d'Alimentation : l'une des foires professionnelles les plus importantes du centre de l'Italie, organisée chaque année à Umbriafiere, le parc des expositions de Bastia Umbra. L'édition 2026 a marqué sa 57e édition, du 27 au 29 mars — la foire tombe généralement à cette période, fin mars.",
        "Le parcours couvre toute la filière, du champ à la table : machines et équipements agricoles, expositions de races bovines, ovines et avicoles nationales (dont Chianina, Limousine, Charolaise et Romagnola), technologies pour l'huile, le vin et les fromageries, ainsi qu'un espace produits typiques et dégustations qui attire aussi un public non professionnel.",
        "Umbriafiere se trouve à environ 3 km d'Agriturismo La Mora : pratique aussi bien pour les exposants ou le personnel de la foire qui ne veulent pas de longs trajets chaque jour, que pour les visiteurs qui préfèrent séjourner à la campagne plutôt qu'à l'hôtel en ville, avec la possibilité d'ajouter une visite à Assise en marge du séjour.",
        "Bastia Umbra et Umbriafiere accueillent des manifestations une grande partie de l'année, pas seulement Agriumbria : parmi elles, Caccia Village, dédiée au monde de la chasse (nous en parlons dans un autre article). Pour les dates exactes de chaque édition, référez-vous toujours au calendrier officiel d'Umbriafiere, qui peut varier d'une année à l'autre.",
      ],
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Événements",
      title: "Caccia Village à Umbriafiere : la foire de la chasse près d'Assise",
      excerpt: "Chaque année, généralement à la mi-mai, des centaines d'entreprises du monde de la chasse se réunissent à Bastia Umbra, entre Pérouse et Assise, à quelques minutes de La Mora.",
      image: "/images/struttura/foto dell esterno della struttura.webp",
      alt: "Extérieur d'Agriturismo La Mora, une base pratique pour visiter Caccia Village",
      body: [
        "Caccia Village est la foire dédiée au monde de la chasse qui se tient chaque année à Umbriafiere, le parc des expositions de Bastia Umbra, entre Pérouse et Assise. L'édition 2026 s'est déroulée du 16 au 18 mai, avec plus de 250 entreprises exposantes — la plus forte affluence de l'histoire de la manifestation : la foire tombe généralement à cette période, à la mi-mai.",
        "Le programme couvre les armes et munitions (toujours exposées désactivées), les vêtements et équipements techniques, l'optique et l'instrumentation, un espace dédié aux chiens de chasse avec l'espace ENCI pour les épreuves cynophiles, ainsi que la gastronomie de gibier et des étals de boucherie spécialisée.",
        "Même pour ceux qui viennent d'une autre région uniquement pour la foire, Umbriafiere se trouve à environ 3 km d'Agriturismo La Mora : une base pratique à la campagne, avec la possibilité — entre deux journées de foire — de consacrer quelques heures à Assise, à quelques minutes de là.",
        "Caccia Village n'est pas le seul rendez-vous important accueilli par Umbriafiere : le calendrier comprend aussi Agriumbria, l'exposition nationale d'agriculture et d'élevage (nous en parlons dans un autre article). Les dates de chaque édition doivent toujours être vérifiées sur le calendrier officiel d'Umbriafiere, qui peut changer d'une année à l'autre.",
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
    {
      slug: "agriumbria-umbriafiere",
      category: "Veranstaltungen",
      title: "Agriumbria bei Umbriafiere: die Landwirtschaftsmesse 3 km von La Mora",
      excerpt: "Jedes Jahr, in der Regel Ende März, findet Umbriens wichtigste nationale Ausstellung für Landwirtschaft, Viehzucht und Ernährung in Bastia Umbra statt, wenige Minuten von La Mora entfernt.",
      image: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
      alt: "Außenansicht von Agriturismo La Mora, eine praktische Basis für den Besuch von Umbriafiere",
      body: [
        "Agriumbria ist die Nationale Ausstellung für Landwirtschaft, Viehzucht und Ernährung: eine der wichtigsten Fachmessen Mittelitaliens, die jedes Jahr bei Umbriafiere, dem Messegelände von Bastia Umbra, stattfindet. Die Ausgabe 2026 markierte das 57. Jubiläum und lief vom 27. bis 29. März — die Messe findet typischerweise in diesem Zeitraum statt, Ende März.",
        "Der Rundgang deckt die gesamte Wertschöpfungskette ab, vom Feld bis zum Tisch: Landmaschinen und -geräte, Ausstellungen nationaler Rinder-, Schaf- und Geflügelrassen (darunter Chianina, Limousine, Charolaise und Romagnola), Technologien für Öl, Wein und Käsereien sowie ein Bereich für regionale Produkte und Verkostungen, der auch Besucher außerhalb der Branche anzieht.",
        "Umbriafiere liegt etwa 3 km von Agriturismo La Mora entfernt: praktisch sowohl für Aussteller oder Messepersonal, die nicht jeden Tag lange Wege zurücklegen möchten, als auch für Besucher, die lieber auf dem Land als in einem Stadthotel übernachten — mit der Möglichkeit, rund um den Messebesuch auch einen Ausflug nach Assisi einzuplanen.",
        "Bastia Umbra und Umbriafiere sind fast das ganze Jahr über Gastgeber für Veranstaltungen, nicht nur für Agriumbria: dazu gehört auch Caccia Village, gewidmet der Welt der Jagd (dazu mehr in einem weiteren Artikel). Die genauen Termine jeder Ausgabe sollten immer im offiziellen Kalender von Umbriafiere geprüft werden, da sie von Jahr zu Jahr variieren können.",
      ],
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Veranstaltungen",
      title: "Caccia Village bei Umbriafiere: die Jagdmesse nahe Assisi",
      excerpt: "Jedes Jahr, in der Regel Mitte Mai, versammeln sich Hunderte Unternehmen der Jagdbranche in Bastia Umbra, zwischen Perugia und Assisi, wenige Minuten von La Mora entfernt.",
      image: "/images/struttura/foto dell esterno della struttura.webp",
      alt: "Außenansicht von Agriturismo La Mora, eine praktische Basis für den Besuch von Caccia Village",
      body: [
        "Caccia Village ist die Messe für die Welt der Jagd, die jedes Jahr bei Umbriafiere, dem Messegelände von Bastia Umbra zwischen Perugia und Assisi, stattfindet. Die Ausgabe 2026 lief vom 16. bis 18. Mai mit über 250 ausstellenden Unternehmen — der höchste Besucherandrang in der Geschichte der Veranstaltung: die Messe findet typischerweise in diesem Zeitraum statt, Mitte Mai.",
        "Das Programm umfasst Waffen und Munition (immer deaktiviert ausgestellt), technische Bekleidung und Ausrüstung, Optik und Instrumente, einen Bereich für Jagdhunde mit ENCI-Fläche für Hundeprüfungen sowie Wildbret-Gastronomie und spezialisierte Metzgereistände.",
        "Auch für alle, die nur wegen der Messe von außerhalb der Region anreisen, liegt Umbriafiere etwa 3 km von Agriturismo La Mora entfernt: eine praktische Basis auf dem Land, mit der Möglichkeit, zwischen den Messetagen ein paar Stunden in Assisi zu verbringen, nur wenige Minuten entfernt.",
        "Caccia Village ist nicht die einzige wichtige Veranstaltung bei Umbriafiere: zum Kalender gehört auch Agriumbria, die nationale Ausstellung für Landwirtschaft und Viehzucht (dazu mehr in einem weiteren Artikel). Die Termine jeder Ausgabe sollten immer im offiziellen Kalender von Umbriafiere geprüft werden, da sie sich von Jahr zu Jahr ändern können.",
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
