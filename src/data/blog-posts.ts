import type { Locale } from "@/lib/i18n";

/* Contenuto editoriale del blog: non semplici paragrafi ma un piccolo
   sistema di blocchi (ContentBlock), per poter alternare titoli, immagini,
   liste e box informativi come in un vero articolo — non un unico muro di
   testo. intro/introCta* e finalCta* sono fissi (aprono e chiudono ogni
   articolo con lo stesso ritmo), il resto vive nell'array `content`, dove
   può comparire anche un singolo blocco `cta` di tipo "centrale".
   Le CTA che puntano a pagine interne usano un path semplice (es.
   "/alloggi/"): withLocale() lo risolve nella lingua giusta al momento del
   render, qui non va mai scritto già completo di prefisso lingua. */
export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "facts"; items: { label: string; value: string }[] }
  | { type: "cta"; heading: string; body?: string; label: string; href: string };

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  image: string;
  alt: string;
  intro: string;
  introCtaHeading: string;
  introCtaLabel: string;
  introCtaHref: string;
  content: ContentBlock[];
  finalCtaHeading: string;
  finalCtaBody: string;
  finalCtaLabel: string;
  finalCtaHref: string;
};

const BLOG_POSTS_BY_LOCALE: Record<Locale, BlogPost[]> = {
  it: [
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "Territorio",
      title: "Basilica di Santa Maria degli Angeli: cosa vedere",
      excerpt: "La chiesa che racchiude la Porziuncola, il luogo dove nacque l'ordine francescano, a pochi minuti da La Mora.",
      metaDescription: "Guida alla Basilica di Santa Maria degli Angeli ad Assisi: Porziuncola, Cappella del Transito, Roseto, orari e distanza da Agriturismo La Mora (2 km).",
      image: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg",
      alt: "Facciata della Basilica di Santa Maria degli Angeli, ad Assisi",
      intro:
        "A due chilometri da Agriturismo La Mora, nella piana sotto Assisi, sorge una delle chiese più grandi della cristianità — costruita nel Cinquecento intorno a un edificio molto più piccolo e molto più antico: la Porziuncola.",
      introCtaHeading: "Programmi la visita? Scegli dove alloggiare a 2 km dalla Basilica.",
      introCtaLabel: "Scopri gli appartamenti",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "La Porziuncola, il cuore dentro il cuore" },
        {
          type: "p",
          text: "La Porziuncola è la piccola cappella dove San Francesco visse gran parte della sua vita religiosa e dove morì, il 3 ottobre 1226. Nel Cinquecento, per proteggerla e accogliere il crescente flusso di pellegrini, venne costruita intorno a essa un'enorme basilica: oggi, entrando, ci si trova davanti a una cappella minuscola sotto una cupola immensa — un contrasto che racconta, meglio di qualunque descrizione, la distanza tra la semplicità originaria di Francesco e come la sua eredità è stata poi celebrata.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
          alt: "Interno della Porziuncola, all'interno della Basilica di Santa Maria degli Angeli",
          caption: "La Porziuncola vista da dentro la navata della basilica.",
        },
        { type: "h2", text: "Cosa vedere oltre alla Porziuncola" },
        {
          type: "list",
          items: [
            "Cappella del Transito — la cella dove Francesco morì, oggi trasformata in cappella.",
            "Il Roseto — le rose senza spine legate alla leggenda di Francesco che si gettò tra i rovi per resistere a una tentazione.",
            "Il Museo della Porziuncola — reperti e opere legate alla storia del luogo e dell'ordine francescano.",
            "La statua di San Francesco nel piazzale antistante, punto di riferimento per chi arriva.",
          ],
        },
        { type: "h2", text: "Informazioni pratiche" },
        {
          type: "facts",
          items: [
            { label: "Ingresso", value: "Gratuito" },
            { label: "Distanza da La Mora", value: "2 km" },
            { label: "Parcheggio", value: "Disponibile nei pressi della basilica" },
            { label: "Consigliato con", value: "Bosco di San Francesco (a piedi, stesso ingresso)" },
          ],
        },
        {
          type: "cta",
          heading: "Prenota direttamente e organizza la visita senza pensieri.",
          body: "Scrivendoci parli con chi gestisce La Mora ogni giorno: nessun intermediario, condizioni migliori di quelle delle piattaforme.",
          label: "Vai alla prenotazione diretta",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Come arrivare da Agriturismo La Mora" },
        {
          type: "p",
          text: "Il tragitto è di pochi minuti in auto, lungo la piana che collega la campagna dove sorge La Mora al centro di Assisi: la Basilica è la prima tappa naturale per chi arriva in giornata, spesso ancora prima di salire al centro storico. Chi preferisce muoversi in modo più leggero può anche noleggiare una e-bike direttamente in struttura.",
        },
        {
          type: "image",
          src: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
          alt: "Esterno di Agriturismo La Mora, punto di partenza per la Basilica di Santa Maria degli Angeli",
          caption: "Si parte da qui: pochi minuti d'auto, o una pedalata in e-bike.",
        },
      ],
      finalCtaHeading: "A pochi minuti da qui, in campagna.",
      finalCtaBody: "Cinque appartamenti indipendenti, una piscina panoramica, e la Basilica a due passi.",
      finalCtaLabel: "Scopri gli appartamenti",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "bosco-san-francesco",
      category: "Natura",
      title: "Il Bosco di San Francesco, tra i sentieri del FAI",
      excerpt: "Un'area naturale protetta tra Assisi e Santa Maria degli Angeli: uliveti, bosco e il torrente Tescio, gestiti dal FAI.",
      metaDescription: "Il Bosco di San Francesco ad Assisi: percorso FAI di 4 km tra uliveti e torrente Tescio, orari e come arrivare da Agriturismo La Mora.",
      image: "/images/territorio/assisi/bosco di san francesco assisi.jpg",
      alt: "Vista aerea del Bosco di San Francesco, con gli uliveti circolari e le mura di Assisi sullo sfondo",
      intro:
        "Tra Assisi e Santa Maria degli Angeli, un percorso naturalistico di circa 4 km attraversa uliveti secolari, bosco misto e il torrente Tescio — un modo diverso di vivere il territorio, lontano dalla pietra del centro storico.",
      introCtaHeading: "Vuoi camminare tra gli ulivi e tornare in piscina lo stesso pomeriggio?",
      introCtaLabel: "Verifica la disponibilità",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "Un bosco gestito dal FAI" },
        {
          type: "p",
          text: "Dal 2008 il Bosco di San Francesco è affidato al FAI (Fondo Ambiente Italiano), che ne cura la manutenzione e organizza visite guidate lungo il percorso. Il sentiero collega idealmente due luoghi simbolo del francescanesimo — Assisi in alto, Santa Maria degli Angeli in basso — attraversando un paesaggio che è rimasto agricolo: uliveti ancora coltivati, terrazzamenti, il corso del Tescio che accompagna buona parte del cammino.",
        },
        { type: "h3", text: "Cosa si vede lungo il percorso" },
        {
          type: "p",
          text: "Oltre agli uliveti, il percorso include un'installazione artistica permanente — un grande cerchio di ulivi visibile anche dall'alto — pensata come luogo di sosta e riflessione, oltre a punti panoramici sulle mura di Assisi che dominano la vallata da entrambi i lati del bosco.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
          alt: "Sentiero tra gli ulivi nel Bosco di San Francesco",
        },
        { type: "h2", text: "Informazioni pratiche" },
        {
          type: "facts",
          items: [
            { label: "Lunghezza", value: "Circa 4 km" },
            { label: "Gestione", value: "FAI, dal 2008" },
            { label: "Ingresso principale", value: "Vicino a Santa Maria degli Angeli" },
            { label: "Orari e biglietti", value: "Variano per stagione — verificare sul sito FAI" },
          ],
        },
        {
          type: "cta",
          heading: "Un soggiorno di più giorni rende più semplice organizzare ogni gita.",
          body: "Da 7 notti in su, prenotando direttamente hai il 10% di sconto.",
          label: "Scopri gli appartamenti",
          href: "/alloggi/",
        },
        { type: "h2", text: "Da Agriturismo La Mora" },
        {
          type: "p",
          text: "L'ingresso principale del bosco è a pochi minuti d'auto da La Mora: si lascia la macchina nei pressi di Santa Maria degli Angeli e si prosegue a piedi. È una delle gite più semplici da organizzare durante il soggiorno — non serve una giornata intera, si può abbinare comodamente a una visita alla Basilica o a un pomeriggio in piscina al ritorno.",
        },
      ],
      finalCtaHeading: "Ci si arriva in pochi minuti, si torna per il resto della giornata.",
      finalCtaBody: "La piscina panoramica di La Mora è a pochi passi dagli appartamenti.",
      finalCtaLabel: "Scopri la piscina",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "santuario-san-damiano",
      category: "Territorio",
      title: "Il Santuario di San Damiano, fuori dalle mura di Assisi",
      excerpt: "Dove Francesco udì il celebre invito a 'riparare la mia chiesa', e dove Chiara d'Assisi visse gran parte della sua vita.",
      metaDescription: "San Damiano, Assisi: il santuario dove Francesco ricevette la sua chiamata e Chiara fondò le Clarisse. Come arrivare da Agriturismo La Mora.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Santuario di San Damiano tra gli ulivi, nei dintorni di Assisi",
      intro:
        "A circa due chilometri a sud delle mura di Assisi, immerso negli ulivi, un piccolo santuario custodisce due delle storie più importanti del francescanesimo: la conversione di Francesco e la vita di Chiara.",
      introCtaHeading: "Un momento di silenzio dopo la Basilica: organizza il soggiorno.",
      introCtaLabel: "Verifica la disponibilità",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "‘Ripara la mia chiesa’" },
        {
          type: "p",
          text: "Secondo la tradizione, è qui che il crocifisso ligneo oggi conservato nella Basilica di Santa Chiara parlò a Francesco, invitandolo a 'riparare la mia chiesa' — l'episodio che segnò l'inizio della sua conversione. Francesco interpretò letteralmente l'invito e restaurò con le proprie mani l'edificio, allora in rovina.",
        },
        { type: "h2", text: "Il convento di Chiara" },
        {
          type: "p",
          text: "San Damiano è anche il luogo dove Chiara d'Assisi visse per oltre quarant'anni, fondando in questo stesso convento l'ordine delle Clarisse. A differenza della Basilica di San Francesco, San Damiano resta un luogo raccolto e silenzioso, poco battuto dal turismo di massa nonostante la sua importanza storica: probabilmente la tappa più autentica per chi cerca un momento di raccoglimento lontano dai flussi del centro.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg",
          alt: "Vista del santuario di San Damiano tra gli ulivi",
        },
        { type: "h2", text: "Come arrivarci" },
        {
          type: "facts",
          items: [
            { label: "Distanza dal centro", value: "Circa 2 km" },
            { label: "A piedi", value: "20-25 minuti in discesa" },
            { label: "In auto", value: "Pochi minuti" },
            { label: "Consigliato dopo", value: "La Basilica di San Francesco" },
          ],
        },
        {
          type: "cta",
          heading: "Prenoti direttamente, risparmi di più.",
          body: "Nessuna commissione di intermediazione, sconti dedicati a chi prenota diretto.",
          label: "Scopri il vantaggio diretto",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Da Agriturismo La Mora" },
        {
          type: "p",
          text: "San Damiano si raggiunge attraversando il centro di Assisi, quindi il modo più comodo per chi soggiorna a La Mora è combinarlo con una giornata già dedicata al centro storico: si lascia l'auto vicino alle mura e si prosegue a piedi. La salita al ritorno è più impegnativa della discesa — conviene tenerlo a mente per chi cammina con bambini piccoli.",
        },
      ],
      finalCtaHeading: "Torna a La Mora, e rilassati in piscina.",
      finalCtaBody: "A pochi minuti da Assisi, la campagna umbra aspetta con calma.",
      finalCtaLabel: "Scopri gli appartamenti",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "cascate-delle-marmore",
      category: "Gita di un giorno",
      title: "Cascate delle Marmore: come arrivarci da Assisi",
      excerpt: "Tra le cascate artificiali più alte d'Europa, a circa un'ora d'auto da La Mora: una gita di mezza giornata.",
      metaDescription: "Guida alle Cascate delle Marmore vicino Terni: altezza, punti panoramici, orari dell'acqua e distanza in auto da Agriturismo La Mora.",
      image: "/images/territorio/dintorni/cascate delle marmore.jpg",
      alt: "Le Cascate delle Marmore in Umbria",
      intro:
        "A circa un'ora d'auto da La Mora, vicino Terni, un salto d'acqua di 165 metri creato in epoca romana è oggi tra le cascate artificiali più alte d'Europa — una gita di mezza giornata che si organizza facilmente durante il soggiorno.",
      introCtaHeading: "Una gita fuori porta, un ritorno comodo: dove alloggiare nel mezzo.",
      introCtaLabel: "Scopri gli appartamenti",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Una cascata costruita dai romani" },
        {
          type: "p",
          text: "Le Cascate delle Marmore nascono da un'opera di ingegneria romana: il taglio Roscius, realizzato nel 271 a.C. per far defluire le acque del fiume Velino nel Nera e bonificare le paludi della zona. Il risultato, nei secoli, è diventato uno dei salti d'acqua artificiali più alti al mondo, con un dislivello complessivo di 165 metri su tre salti successivi.",
        },
        { type: "h2", text: "I punti panoramici" },
        {
          type: "list",
          items: [
            "Belvedere Inferiore — il più semplice, vicino al parcheggio, la vista classica sulla cascata.",
            "Belvedere Superiore e sentiero dei percorsi alti — richiedono più tempo e un po' di allenamento, ma offrono viste dall'alto sul salto e sulla valle.",
            "Grotta di Nettuno e Grotta della Pulce — percorsi laterali per chi vuole vedere la cascata da vicino, in condizioni di sentiero permettendo.",
          ],
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
          alt: "Vista ravvicinata delle Cascate delle Marmore in piena portata",
        },
        { type: "h2", text: "Quando vedere l'acqua" },
        {
          type: "p",
          text: "L'acqua delle cascate è regolata: scorre solo in fasce orarie specifiche, decise per bilanciare la produzione idroelettrica con l'apertura al pubblico. Gli orari cambiano per stagione e giorno della settimana — prima di partire conviene sempre controllare il calendario ufficiale del parco, per non trovarsi davanti a un salto asciutto.",
        },
        {
          type: "cta",
          heading: "Organizza la gita con calma: prenota direttamente il tuo soggiorno.",
          label: "Verifica la disponibilità",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Da Agriturismo La Mora" },
        {
          type: "facts",
          items: [
            { label: "Distanza", value: "Circa 55-60 minuti d'auto" },
            { label: "Dislivello cascata", value: "165 metri" },
            { label: "Realizzata", value: "271 a.C., epoca romana" },
            { label: "Da combinare con", value: "Una sosta a Terni" },
          ],
        },
        {
          type: "p",
          text: "Il tragitto rende le Marmore una gita fattibile in mezza giornata: si parte al mattino, si visita la cascata con calma, e si può ancora rientrare in tempo per un pomeriggio in piscina, oppure allungare la giornata con una sosta nel centro di Terni.",
        },
      ],
      finalCtaHeading: "Rientra a La Mora per il resto della giornata.",
      finalCtaBody: "Piscina panoramica aperta da maggio a settembre, a due passi dagli appartamenti.",
      finalCtaLabel: "Scopri la piscina",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "monte-subasio",
      category: "Natura",
      title: "Monte Subasio: i sentieri sopra Assisi",
      excerpt: "Il parco naturale che domina la città: pascoli d'altura, il formaggio omonimo, e sentieri per camminare o pedalare.",
      metaDescription: "Monte Subasio, Parco Regionale sopra Assisi: sentieri da Eremo delle Carceri, pascoli d'altura e pecorino di Subasio. Vicino ad Agriturismo La Mora.",
      image: "/images/territorio/dintorni/monte subasio alto.jpg",
      alt: "Vista aerea dai pascoli d'altura del Monte Subasio al tramonto",
      intro:
        "Sopra Assisi, il massiccio che dà il nome al celebre pecorino si apre in pascoli d'altura e boschi di lecci e faggi — un parco regionale attraversato da sentieri per camminare o pedalare, con viste sulla valle umbra che il centro storico non può dare.",
      introCtaHeading: "Una base comoda per chi vuole camminare o pedalare in Umbria.",
      introCtaLabel: "Scopri gli appartamenti",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Dalla città al parco" },
        {
          type: "p",
          text: "Il Monte Subasio è oggi Parco Regionale: una rete di sentieri collega Assisi all'Eremo delle Carceri — il romitorio dove Francesco si ritirava in preghiera, incastonato nella roccia del monte — e prosegue verso la vetta, a 1.290 metri. Il paesaggio cambia gradualmente lungo il percorso: dai boschi fitti vicino all'Eremo si sale verso pascoli d'altura aperti, dove lo sguardo arriva fino alla valle umbra.",
        },
        { type: "h2", text: "Il pecorino di Subasio" },
        {
          type: "p",
          text: "È il monte che ha dato il nome al pecorino di Subasio, prodotto ancora oggi dagli allevamenti che pascolano in quota. Lo stesso massiccio è anche il retroterra naturale da cui viene estratta la celebre pietra rosa con cui è costruita gran parte di Assisi — la pietra che dà alla città il colore che si vede da lontano, soprattutto al tramonto.",
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/monte-subasio.jpg",
          alt: "Sentiero tra i pascoli del Monte Subasio",
        },
        { type: "h2", text: "Camminare o pedalare" },
        {
          type: "facts",
          items: [
            { label: "Altitudine vetta", value: "1.290 metri" },
            { label: "Punto di partenza", value: "Eremo delle Carceri" },
            { label: "Statuto", value: "Parco Regionale" },
            { label: "Adatto a", value: "Trekking e mountain bike / e-bike" },
          ],
        },
        {
          type: "cta",
          heading: "Noleggia una e-bike direttamente in struttura.",
          body: "Comoda per salire senza fatica anche nei tratti più impegnativi.",
          label: "Scopri le attività",
          href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
        },
        { type: "h2", text: "Da Agriturismo La Mora" },
        {
          type: "p",
          text: "L'Eremo delle Carceri, punto di partenza dei sentieri principali, è raggiungibile in auto da Assisi in pochi minuti — e Assisi, a sua volta, è a pochi minuti da La Mora. Per chi preferisce muoversi in modo più leggero, l'e-bike a noleggio in struttura rende più semplice affrontare i tratti in salita senza rinunciare alla gita.",
        },
      ],
      finalCtaHeading: "Torna a La Mora, tra piscina e campagna.",
      finalCtaBody: "Cinque appartamenti indipendenti, a pochi minuti da Assisi e dal Subasio.",
      finalCtaLabel: "Scopri gli appartamenti",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "agriumbria-umbriafiere",
      category: "Eventi",
      title: "Agriumbria a Umbriafiere: dove dormire vicino alla fiera",
      excerpt: "Ogni anno, generalmente a fine marzo, la mostra nazionale di agricoltura, zootecnia e alimentazione più importante dell'Umbria si tiene a Bastia Umbra, a pochi minuti da La Mora.",
      metaDescription: "Agriumbria a Umbriafiere (Bastia Umbra): cosa vedere in fiera, quando si svolge e dove dormire vicino ad Agriumbria — Agriturismo La Mora, a 3 km, con Assisi a due passi.",
      image: "/images/blog/agriumbria-mucche-fiera-agricola.jpg",
      alt: "Bestiame condotto da espositori durante una fiera agricola all'aperto",
      intro:
        "Ogni anno, generalmente a fine marzo, Umbriafiere a Bastia Umbra ospita Agriumbria: la mostra nazionale di agricoltura, zootecnia e alimentazione più importante della regione — a soli 3 km da Agriturismo La Mora.",
      introCtaHeading: "Stai organizzando il soggiorno per Agriumbria?",
      introCtaLabel: "Verifica la disponibilità",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "Cos'è Agriumbria" },
        {
          type: "p",
          text: "Agriumbria è la Mostra Nazionale di Agricoltura, Zootecnia e Alimentazione: una delle fiere di settore più importanti del centro Italia, organizzata ogni anno a Umbriafiere, il quartiere fieristico di Bastia Umbra. L'edizione 2026 ha tagliato il traguardo della 57ª edizione, svolta dal 27 al 29 marzo — la fiera ricorre tipicamente in questo periodo, a fine marzo, anche se le date esatte di ogni edizione vanno sempre verificate sul calendario ufficiale di Umbriafiere, che può cambiare di anno in anno.",
        },
        { type: "h2", text: "Cosa trovi in fiera" },
        {
          type: "list",
          items: [
            "Macchinari e attrezzature agricole, dalle grandi aziende ai piccoli produttori.",
            "Mostre di razze bovine, ovine e avicole nazionali — tra cui Chianina, Limousine, Charolaise e Romagnola.",
            "Tecnologie per la produzione di olio, vino e per i caseifici.",
            "Un'area prodotti tipici e degustazioni, che attira anche chi non lavora nel settore.",
          ],
        },
        {
          type: "image",
          src: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
          alt: "Campagna umbra intorno ad Agriturismo La Mora, a pochi minuti da Umbriafiere",
        },
        { type: "h2", text: "Dove dormire vicino a Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distanza da Umbriafiere", value: "Circa 3 km" },
            { label: "Distanza da Assisi", value: "5 km" },
            { label: "Appartamenti", value: "5 indipendenti, con cucina propria" },
            { label: "Prenotazione", value: "Diretta, senza intermediari" },
          ],
        },
        {
          type: "p",
          text: "Per chi espone, lavora alla fiera o la visita per più giorni, un agriturismo vicino ad Agriumbria è spesso più comodo di un hotel in città: cinque appartamenti indipendenti, ciascuno con cucina propria, in campagna invece che nel traffico di Bastia Umbra — a pochi minuti da Umbriafiere ma abbastanza fuori per tornare la sera in un posto tranquillo.",
        },
        {
          type: "cta",
          heading: "Prenota direttamente: niente commissioni, condizioni migliori.",
          body: "Scrivendoci parli con chi gestisce La Mora ogni giorno.",
          label: "Scopri gli appartamenti",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi a due passi, anche durante la fiera" },
        {
          type: "p",
          text: "Chi soggiorna vicino a Umbriafiere per Agriumbria ha anche Assisi a portata di mano: la Basilica di San Francesco, la Basilica di Santa Maria degli Angeli e il centro storico sono a pochi minuti d'auto da La Mora, comodi da abbinare a una giornata di fiera o a una pausa tra due appuntamenti.",
        },
      ],
      finalCtaHeading: "Prenota il tuo soggiorno per Agriumbria.",
      finalCtaBody: "A 3 km da Umbriafiere, a 5 km da Assisi: la base comoda per la fiera.",
      finalCtaLabel: "Prenota direttamente",
      finalCtaHref: "/#section-price-comparison",
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Eventi",
      title: "Caccia Village a Umbriafiere: dove dormire per la fiera della caccia",
      excerpt: "Ogni anno, generalmente a metà maggio, centinaia di aziende del mondo venatorio si radunano a Bastia Umbra, tra Perugia e Assisi, a pochi minuti da La Mora.",
      metaDescription: "Caccia Village a Umbriafiere (Bastia Umbra): date, espositori e dove dormire vicino alla fiera della caccia — Agriturismo La Mora, a 3 km, con Assisi a due passi.",
      image: "/images/blog/caccia-village-campagna-umbria.jpg",
      alt: "Campagna umbra con balle di fieno al tramonto",
      intro:
        "Ogni anno, generalmente a metà maggio, Umbriafiere a Bastia Umbra ospita Caccia Village: la fiera dedicata al mondo della caccia, tra Perugia e Assisi — a soli 3 km da Agriturismo La Mora.",
      introCtaHeading: "Stai organizzando il soggiorno per Caccia Village?",
      introCtaLabel: "Verifica la disponibilità",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "Cos'è Caccia Village" },
        {
          type: "p",
          text: "Caccia Village è la fiera dedicata al mondo della caccia che si tiene ogni anno a Umbriafiere, il quartiere fieristico di Bastia Umbra, tra Perugia e Assisi. L'edizione 2026 si è svolta dal 16 al 18 maggio, con oltre 250 aziende espositrici — la partecipazione più alta nella storia della manifestazione: la fiera ricorre tipicamente in questo periodo, a metà maggio, anche se le date esatte vanno sempre verificate sul calendario ufficiale di Umbriafiere.",
        },
        { type: "h2", text: "Cosa trovi in fiera" },
        {
          type: "list",
          items: [
            "Armi e munizioni, sempre esposte disattivate.",
            "Abbigliamento e attrezzatura tecnica per l'outdoor.",
            "Ottiche e strumentazione specializzata.",
            "Uno spazio ENCI dedicato ai cani da caccia e alle prove cinofile.",
            "Gastronomia di selvaggina e banchi di macelleria specializzata.",
          ],
        },
        {
          type: "image",
          src: "/images/piscina/piscina agriturismo la mora.webp",
          alt: "Piscina panoramica di Agriturismo La Mora, a pochi minuti da Umbriafiere",
        },
        { type: "h2", text: "Dove dormire vicino a Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distanza da Umbriafiere", value: "Circa 3 km" },
            { label: "Distanza da Assisi", value: "5 km" },
            { label: "Appartamenti", value: "5 indipendenti, con cucina propria" },
            { label: "Prenotazione", value: "Diretta, senza intermediari" },
          ],
        },
        {
          type: "p",
          text: "Anche per chi arriva da fuori regione solo per la fiera, un agriturismo vicino a Caccia Village è un punto d'appoggio comodo in campagna: cinque appartamenti indipendenti a pochi minuti da Umbriafiere, con la possibilità — tra una giornata di fiera e l'altra — di dedicare qualche ora ad Assisi, a un quarto d'ora di distanza.",
        },
        {
          type: "cta",
          heading: "Prenota direttamente: niente commissioni, condizioni migliori.",
          body: "Scrivendoci parli con chi gestisce La Mora ogni giorno.",
          label: "Scopri gli appartamenti",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi e la campagna umbra, oltre la fiera" },
        {
          type: "p",
          text: "Chi soggiorna a La Mora durante Caccia Village trova anche una struttura pensata per famiglie e gruppi: piscina panoramica aperta da maggio a settembre — proprio nel periodo della fiera — parco giochi e spazi comuni per chi viaggia con bambini mentre un altro membro del gruppo è impegnato in fiera.",
        },
      ],
      finalCtaHeading: "Prenota il tuo soggiorno per Caccia Village.",
      finalCtaBody: "A 3 km da Umbriafiere, a 5 km da Assisi: la base comoda per la fiera.",
      finalCtaLabel: "Prenota direttamente",
      finalCtaHref: "/#section-price-comparison",
    },
  ],
  en: [
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "Territory",
      title: "Basilica di Santa Maria degli Angeli: what to see",
      excerpt: "The church holding the Porziuncola, birthplace of the Franciscan order, just minutes from La Mora.",
      metaDescription: "Guide to the Basilica di Santa Maria degli Angeli in Assisi: Porziuncola, Chapel of the Transito, Rose Garden, opening hours and distance from Agriturismo La Mora (2 km).",
      image: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg",
      alt: "Facade of the Basilica di Santa Maria degli Angeli, in Assisi",
      intro:
        "Two kilometres from Agriturismo La Mora, on the plain below Assisi, stands one of the largest churches in Christendom — built in the 16th century around a much smaller, much older building: the Porziuncola.",
      introCtaHeading: "Planning your visit? Choose where to stay 2 km from the Basilica.",
      introCtaLabel: "Discover the apartments",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "The Porziuncola, a heart within a heart" },
        {
          type: "p",
          text: "The Porziuncola is the small chapel where Saint Francis spent much of his religious life and where he died, on 3 October 1226. In the 16th century, to protect it and welcome the growing flow of pilgrims, an enormous basilica was built around it: today, walking in, you find a tiny chapel beneath an immense dome — a contrast that tells, better than any description, the distance between Francis's original simplicity and how his legacy was later celebrated.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
          alt: "Interior of the Porziuncola, inside the Basilica di Santa Maria degli Angeli",
          caption: "The Porziuncola seen from inside the basilica's nave.",
        },
        { type: "h2", text: "What to see beyond the Porziuncola" },
        {
          type: "list",
          items: [
            "Chapel of the Transito — the cell where Francis died, now a chapel.",
            "The Rose Garden — thornless roses linked to the legend of Francis throwing himself into brambles to resist temptation.",
            "The Porziuncola Museum — artefacts and works tied to the history of the place and the Franciscan order.",
            "The statue of Saint Francis in the square outside, a landmark for arriving visitors.",
          ],
        },
        { type: "h2", text: "Practical information" },
        {
          type: "facts",
          items: [
            { label: "Admission", value: "Free" },
            { label: "Distance from La Mora", value: "2 km" },
            { label: "Parking", value: "Available near the basilica" },
            { label: "Pair with", value: "Bosco di San Francesco (on foot, same entrance)" },
          ],
        },
        {
          type: "cta",
          heading: "Book directly and plan your visit without a worry.",
          body: "By writing to us, you speak directly with the people who run La Mora every day: no middlemen, better terms than the platforms.",
          label: "Go to direct booking",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Getting there from Agriturismo La Mora" },
        {
          type: "p",
          text: "It's a short drive along the plain connecting the countryside around La Mora to the centre of Assisi: the Basilica is a natural first stop for a day out, often even before heading up to the historic centre. Those who prefer to travel lighter can also rent an e-bike directly at the property.",
        },
        {
          type: "image",
          src: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
          alt: "Exterior of Agriturismo La Mora, starting point for the Basilica di Santa Maria degli Angeli",
          caption: "It starts here: a few minutes by car, or a ride on an e-bike.",
        },
      ],
      finalCtaHeading: "Minutes from here, in the countryside.",
      finalCtaBody: "Five independent apartments, a panoramic pool, and the Basilica just around the corner.",
      finalCtaLabel: "Discover the apartments",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "bosco-san-francesco",
      category: "Nature",
      title: "Bosco di San Francesco, on the FAI trails",
      excerpt: "A protected natural area between Assisi and Santa Maria degli Angeli: olive groves, woodland and the Tescio stream, cared for by the FAI.",
      metaDescription: "Bosco di San Francesco in Assisi: a 4 km FAI trail through olive groves and the Tescio stream, opening hours and how to get there from Agriturismo La Mora.",
      image: "/images/territorio/assisi/bosco di san francesco assisi.jpg",
      alt: "Aerial view of Bosco di San Francesco, with its circular olive grove and the walls of Assisi in the background",
      intro:
        "Between Assisi and Santa Maria degli Angeli, a roughly 4 km nature trail crosses centuries-old olive groves, mixed woodland and the Tescio stream — a different way to experience the area, away from the stone of the historic centre.",
      introCtaHeading: "Want to walk among the olive trees and be back at the pool the same afternoon?",
      introCtaLabel: "Check availability",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "A wood cared for by the FAI" },
        {
          type: "p",
          text: "Since 2008, Bosco di San Francesco has been entrusted to the FAI (Italian National Trust), which maintains it and organises guided visits along the trail. The path ideally connects two symbolic Franciscan sites — Assisi above, Santa Maria degli Angeli below — crossing a landscape that has stayed agricultural: olive groves still cultivated, terracing, and the Tescio stream running alongside much of the walk.",
        },
        { type: "h3", text: "What you'll see along the way" },
        {
          type: "p",
          text: "Besides the olive groves, the trail includes a permanent art installation — a large circle of olive trees visible even from above — designed as a place to pause and reflect, along with panoramic points looking onto the walls of Assisi, which dominate the valley from both sides of the wood.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
          alt: "Path among the olive trees in Bosco di San Francesco",
        },
        { type: "h2", text: "Practical information" },
        {
          type: "facts",
          items: [
            { label: "Length", value: "About 4 km" },
            { label: "Managed by", value: "FAI, since 2008" },
            { label: "Main entrance", value: "Near Santa Maria degli Angeli" },
            { label: "Hours and tickets", value: "Vary by season — check the FAI website" },
          ],
        },
        {
          type: "cta",
          heading: "A longer stay makes it easier to plan every day trip.",
          body: "From 7 nights, direct booking gets you a 10% discount.",
          label: "Discover the apartments",
          href: "/alloggi/",
        },
        { type: "h2", text: "From Agriturismo La Mora" },
        {
          type: "p",
          text: "The wood's main entrance is a short drive from La Mora: you leave the car near Santa Maria degli Angeli and continue on foot. It's one of the easiest trips to fit into your stay — no need for a full day, it pairs comfortably with a visit to the Basilica or an afternoon at the pool on the way back.",
        },
      ],
      finalCtaHeading: "You're there in minutes, and back for the rest of the day.",
      finalCtaBody: "La Mora's panoramic pool is steps from the apartments.",
      finalCtaLabel: "Discover the pool",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "santuario-san-damiano",
      category: "Territory",
      title: "The Sanctuary of San Damiano, outside Assisi's walls",
      excerpt: "Where Francis heard the famous call to 'repair my church', and where Clare of Assisi lived most of her life.",
      metaDescription: "San Damiano, Assisi: the sanctuary where Francis received his calling and Clare founded the Poor Clares. How to get there from Agriturismo La Mora.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Sanctuary of San Damiano among the olive trees, near Assisi",
      intro:
        "About two kilometres south of Assisi's walls, surrounded by olive trees, a small sanctuary holds two of the most important stories in Franciscan history: Francis's conversion and Clare's life.",
      introCtaHeading: "A moment of quiet after the Basilica: plan your stay.",
      introCtaLabel: "Check availability",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "‘Repair my church’" },
        {
          type: "p",
          text: "According to tradition, it was here that the wooden crucifix now kept in the Basilica of Santa Chiara spoke to Francis, calling him to 'repair my church' — the episode that marked the start of his conversion. Francis took the call literally and restored the building, then in ruins, with his own hands.",
        },
        { type: "h2", text: "Clare's convent" },
        {
          type: "p",
          text: "San Damiano is also where Clare of Assisi lived for over forty years, founding the order of the Poor Clares in this very convent. Unlike the Basilica of San Francesco, San Damiano remains a quiet, intimate place, little touched by mass tourism despite its historical importance — probably the most authentic stop for anyone seeking a moment of quiet away from the crowds in the centre.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg",
          alt: "View of the Sanctuary of San Damiano among the olive trees",
        },
        { type: "h2", text: "How to get there" },
        {
          type: "facts",
          items: [
            { label: "Distance from the centre", value: "About 2 km" },
            { label: "On foot", value: "20-25 minutes downhill" },
            { label: "By car", value: "A few minutes" },
            { label: "Recommended after", value: "The Basilica of San Francesco" },
          ],
        },
        {
          type: "cta",
          heading: "Book directly, save more.",
          body: "No booking commission, and discounts dedicated to direct bookings.",
          label: "Discover the direct-booking advantage",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "From Agriturismo La Mora" },
        {
          type: "p",
          text: "San Damiano is reached by crossing the centre of Assisi, so the easiest way for guests staying at La Mora is to combine it with a day already dedicated to the historic centre: leave the car near the walls and continue on foot. The walk back uphill is more demanding than the way down — worth keeping in mind for anyone walking with small children.",
        },
      ],
      finalCtaHeading: "Back to La Mora, and unwind by the pool.",
      finalCtaBody: "Minutes from Assisi, the Umbrian countryside waits with no rush.",
      finalCtaLabel: "Discover the apartments",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "cascate-delle-marmore",
      category: "Day trip",
      title: "Cascate delle Marmore: how to get there from Assisi",
      excerpt: "Among the tallest man-made waterfalls in Europe, about an hour's drive from La Mora: a half-day trip.",
      metaDescription: "Guide to the Cascate delle Marmore near Terni: height, viewpoints, water schedule and driving distance from Agriturismo La Mora.",
      image: "/images/territorio/dintorni/cascate delle marmore.jpg",
      alt: "The Cascate delle Marmore in Umbria",
      intro:
        "About an hour's drive from La Mora, near Terni, a 165-metre waterfall created in Roman times is today among the tallest man-made falls in Europe — a half-day trip that's easy to fit into your stay.",
      introCtaHeading: "A day trip out and an easy way back: where to stay in between.",
      introCtaLabel: "Discover the apartments",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "A waterfall built by the Romans" },
        {
          type: "p",
          text: "The Cascate delle Marmore began as a piece of Roman engineering: the Curiano Ditch, cut in 271 BC to channel the waters of the Velino river into the Nera and drain the marshes of the area. Over the centuries, the result became one of the tallest artificial waterfalls in the world, with a total drop of 165 metres across three successive falls.",
        },
        { type: "h2", text: "The viewpoints" },
        {
          type: "list",
          items: [
            "Belvedere Inferiore — the simplest, near the car park, with the classic view of the falls.",
            "Belvedere Superiore and the upper trails — take more time and a bit of fitness, but offer views down onto the falls and the valley.",
            "Grotta di Nettuno and Grotta della Pulce — side paths for those who want to see the falls up close, trail conditions permitting.",
          ],
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
          alt: "Close-up view of the Cascate delle Marmore at full flow",
        },
        { type: "h2", text: "When the water flows" },
        {
          type: "p",
          text: "The waterfall's flow is regulated: the water runs only during set time slots, decided to balance hydroelectric production with public access. Hours change by season and day of the week — before heading out, it's always worth checking the park's official calendar, so you don't arrive to a dry falls.",
        },
        {
          type: "cta",
          heading: "Plan the trip with no rush: book your stay directly.",
          label: "Check availability",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "From Agriturismo La Mora" },
        {
          type: "facts",
          items: [
            { label: "Distance", value: "About 55-60 minutes by car" },
            { label: "Waterfall drop", value: "165 metres" },
            { label: "Built", value: "271 BC, Roman era" },
            { label: "Pair with", value: "A stop in Terni" },
          ],
        },
        {
          type: "p",
          text: "The drive makes the Marmore falls a feasible half-day trip: leave in the morning, visit the falls at your own pace, and still be back in time for an afternoon at the pool — or extend the day with a stop in the centre of Terni.",
        },
      ],
      finalCtaHeading: "Back to La Mora for the rest of the day.",
      finalCtaBody: "Panoramic pool open from May to September, steps from the apartments.",
      finalCtaLabel: "Discover the pool",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "monte-subasio",
      category: "Nature",
      title: "Monte Subasio: the trails above Assisi",
      excerpt: "The natural park overlooking the city: high pastures, its namesake cheese, and trails for walking or cycling.",
      metaDescription: "Monte Subasio, Regional Park above Assisi: trails from Eremo delle Carceri, high pastures and Subasio pecorino cheese. Near Agriturismo La Mora.",
      image: "/images/territorio/dintorni/monte subasio alto.jpg",
      alt: "Aerial view of the high pastures of Monte Subasio at sunset",
      intro:
        "Above Assisi, the massif that gives its name to the famous pecorino cheese opens into high pastures and woods of oak and beech — a regional park crossed by trails for walking or cycling, with views over the Umbrian valley that the historic centre can't offer.",
      introCtaHeading: "A convenient base for walking or cycling in Umbria.",
      introCtaLabel: "Discover the apartments",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "From the city to the park" },
        {
          type: "p",
          text: "Monte Subasio is today a Regional Park: a network of trails connects Assisi to the Eremo delle Carceri — the hermitage where Francis retreated to pray, set into the mountain's rock — and continues towards the summit, at 1,290 metres. The landscape changes gradually along the way: from the dense woods near the Eremo, the trail climbs towards open high pastures, where the view stretches all the way to the Umbrian valley.",
        },
        { type: "h2", text: "Subasio pecorino cheese" },
        {
          type: "p",
          text: "It's the mountain that gave its name to Subasio pecorino, still produced today by the flocks grazing at altitude. The same massif is also the natural source of the famous pink stone used to build much of Assisi — the stone that gives the town the colour visible from afar, especially at sunset.",
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/monte-subasio.jpg",
          alt: "Trail through the pastures of Monte Subasio",
        },
        { type: "h2", text: "Walking or cycling" },
        {
          type: "facts",
          items: [
            { label: "Summit altitude", value: "1,290 metres" },
            { label: "Starting point", value: "Eremo delle Carceri" },
            { label: "Status", value: "Regional Park" },
            { label: "Suited for", value: "Trekking and mountain / e-biking" },
          ],
        },
        {
          type: "cta",
          heading: "Rent an e-bike directly at the property.",
          body: "Handy for climbing effortlessly even on the steeper stretches.",
          label: "Discover the activities",
          href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
        },
        { type: "h2", text: "From Agriturismo La Mora" },
        {
          type: "p",
          text: "The Eremo delle Carceri, starting point of the main trails, is a few minutes' drive from Assisi — and Assisi, in turn, is minutes from La Mora. For those who prefer to travel lighter, the e-bike available for hire at the property makes the uphill stretches much easier without giving up on the trip.",
        },
      ],
      finalCtaHeading: "Back to La Mora, between the pool and the countryside.",
      finalCtaBody: "Five independent apartments, minutes from Assisi and the Subasio.",
      finalCtaLabel: "Discover the apartments",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "agriumbria-umbriafiere",
      category: "Events",
      title: "Agriumbria at Umbriafiere: where to stay near the fair",
      excerpt: "Every year, generally in late March, Umbria's leading agriculture, livestock and food trade show takes place in Bastia Umbra, minutes from La Mora.",
      metaDescription: "Agriumbria at Umbriafiere (Bastia Umbra): what to see at the fair, when it takes place and where to stay near Agriumbria — Agriturismo La Mora, 3 km away, with Assisi close by.",
      image: "/images/blog/agriumbria-mucche-fiera-agricola.jpg",
      alt: "Livestock led by exhibitors during an outdoor agricultural fair",
      intro:
        "Every year, generally in late March, Umbriafiere in Bastia Umbra hosts Agriumbria: the region's leading agriculture, livestock and food trade show — just 3 km from Agriturismo La Mora.",
      introCtaHeading: "Planning your stay for Agriumbria?",
      introCtaLabel: "Check availability",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "What is Agriumbria" },
        {
          type: "p",
          text: "Agriumbria is the National Exhibition of Agriculture, Livestock and Food: one of central Italy's most important trade fairs, held every year at Umbriafiere, the exhibition grounds in Bastia Umbra. The 2026 edition marked its 57th year, running from 27 to 29 March — the fair typically falls around this time, in late March, though exact dates for each edition should always be checked on Umbriafiere's official calendar, which can change year to year.",
        },
        { type: "h2", text: "What you'll find at the fair" },
        {
          type: "list",
          items: [
            "Agricultural machinery and equipment, from large companies to small producers.",
            "Showcases of national cattle, sheep and poultry breeds — including Chianina, Limousin, Charolais and Romagnola.",
            "Technology for olive oil and wine production and for dairies.",
            "A local-produce and tasting area, which draws visitors beyond the trade itself.",
          ],
        },
        {
          type: "image",
          src: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
          alt: "Umbrian countryside around Agriturismo La Mora, minutes from Umbriafiere",
        },
        { type: "h2", text: "Where to stay near Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distance from Umbriafiere", value: "About 3 km" },
            { label: "Distance from Assisi", value: "5 km" },
            { label: "Apartments", value: "5 independent, each with its own kitchen" },
            { label: "Booking", value: "Direct, no intermediaries" },
          ],
        },
        {
          type: "p",
          text: "For exhibitors, workers or multi-day visitors, an agriturismo near Agriumbria is often more convenient than a hotel in town: five independent apartments, each with its own kitchen, set in the countryside rather than Bastia Umbra's traffic — minutes from Umbriafiere but far enough to come back to somewhere quiet in the evening.",
        },
        {
          type: "cta",
          heading: "Book directly: no commissions, better terms.",
          body: "By writing to us, you speak directly with the people who run La Mora every day.",
          label: "Discover the apartments",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi close by, even during the fair" },
        {
          type: "p",
          text: "Guests staying near Umbriafiere for Agriumbria also have Assisi within easy reach: the Basilica of San Francesco, the Basilica di Santa Maria degli Angeli and the historic centre are minutes by car from La Mora, easy to pair with a day at the fair or a break between appointments.",
        },
      ],
      finalCtaHeading: "Book your stay for Agriumbria.",
      finalCtaBody: "3 km from Umbriafiere, 5 km from Assisi: the convenient base for the fair.",
      finalCtaLabel: "Book directly",
      finalCtaHref: "/#section-price-comparison",
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Events",
      title: "Caccia Village at Umbriafiere: where to stay for the hunting fair",
      excerpt: "Every year, generally in mid-May, hundreds of companies from the hunting world gather in Bastia Umbra, between Perugia and Assisi, minutes from La Mora.",
      metaDescription: "Caccia Village at Umbriafiere (Bastia Umbra): dates, exhibitors and where to stay near the hunting fair — Agriturismo La Mora, 3 km away, with Assisi close by.",
      image: "/images/blog/caccia-village-campagna-umbria.jpg",
      alt: "Umbrian countryside with hay bales at sunset",
      intro:
        "Every year, generally in mid-May, Umbriafiere in Bastia Umbra hosts Caccia Village: the trade fair dedicated to the hunting world, between Perugia and Assisi — just 3 km from Agriturismo La Mora.",
      introCtaHeading: "Planning your stay for Caccia Village?",
      introCtaLabel: "Check availability",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "What is Caccia Village" },
        {
          type: "p",
          text: "Caccia Village is the trade fair dedicated to the hunting world, held every year at Umbriafiere, the exhibition grounds in Bastia Umbra, between Perugia and Assisi. The 2026 edition ran from 16 to 18 May, with over 250 exhibiting companies — the highest turnout in the event's history: the fair typically falls around this time, in mid-May, though exact dates should always be checked on Umbriafiere's official calendar.",
        },
        { type: "h2", text: "What you'll find at the fair" },
        {
          type: "list",
          items: [
            "Firearms and ammunition, always displayed deactivated.",
            "Outdoor clothing and technical gear.",
            "Optics and specialised equipment.",
            "An ENCI area dedicated to hunting dogs and field trials.",
            "Game-meat food stalls and specialist butchery counters.",
          ],
        },
        {
          type: "image",
          src: "/images/piscina/piscina agriturismo la mora.webp",
          alt: "Panoramic pool at Agriturismo La Mora, minutes from Umbriafiere",
        },
        { type: "h2", text: "Where to stay near Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distance from Umbriafiere", value: "About 3 km" },
            { label: "Distance from Assisi", value: "5 km" },
            { label: "Apartments", value: "5 independent, each with its own kitchen" },
            { label: "Booking", value: "Direct, no intermediaries" },
          ],
        },
        {
          type: "p",
          text: "Even for visitors coming from out of region just for the fair, an agriturismo near Caccia Village is a convenient base in the countryside: five independent apartments minutes from Umbriafiere, with the chance — between one fair day and the next — to spend a few hours in Assisi, a quarter of an hour away.",
        },
        {
          type: "cta",
          heading: "Book directly: no commissions, better terms.",
          body: "By writing to us, you speak directly with the people who run La Mora every day.",
          label: "Discover the apartments",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi and the Umbrian countryside, beyond the fair" },
        {
          type: "p",
          text: "Guests staying at La Mora during Caccia Village also find a property designed for families and groups: a panoramic pool open from May to September — right during the fair's season — a playground and shared spaces for those travelling with children while another member of the group is at the fair.",
        },
      ],
      finalCtaHeading: "Book your stay for Caccia Village.",
      finalCtaBody: "3 km from Umbriafiere, 5 km from Assisi: the convenient base for the fair.",
      finalCtaLabel: "Book directly",
      finalCtaHref: "/#section-price-comparison",
    },
  ],
  fr: [
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "Territoire",
      title: "Basilique Santa Maria degli Angeli : que voir",
      excerpt: "L'église qui abrite la Portioncule, berceau de l'ordre franciscain, à quelques minutes de La Mora.",
      metaDescription: "Guide de la basilique Santa Maria degli Angeli à Assise : Portioncule, Chapelle du Transitus, roseraie, horaires et distance depuis Agriturismo La Mora (2 km).",
      image: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg",
      alt: "Façade de la basilique Santa Maria degli Angeli, à Assise",
      intro:
        "À deux kilomètres d'Agriturismo La Mora, dans la plaine en contrebas d'Assise, se dresse l'une des plus grandes églises de la chrétienté — construite au XVIe siècle autour d'un édifice bien plus petit et bien plus ancien : la Portioncule.",
      introCtaHeading: "Vous préparez votre visite ? Choisissez où loger à 2 km de la basilique.",
      introCtaLabel: "Découvrir les appartements",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "La Portioncule, un cœur dans le cœur" },
        {
          type: "p",
          text: "La Portioncule est la petite chapelle où saint François passa une grande partie de sa vie religieuse et où il mourut, le 3 octobre 1226. Au XVIe siècle, pour la protéger et accueillir l'afflux croissant de pèlerins, une immense basilique fut construite tout autour : aujourd'hui, en entrant, on se retrouve face à une chapelle minuscule sous une coupole immense — un contraste qui raconte, mieux que toute description, la distance entre la simplicité originelle de François et la manière dont son héritage a ensuite été célébré.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
          alt: "Intérieur de la Portioncule, à l'intérieur de la basilique Santa Maria degli Angeli",
          caption: "La Portioncule vue depuis la nef de la basilique.",
        },
        { type: "h2", text: "Que voir au-delà de la Portioncule" },
        {
          type: "list",
          items: [
            "Chapelle du Transitus — la cellule où François mourut, aujourd'hui transformée en chapelle.",
            "La roseraie — des roses sans épines liées à la légende de François se jetant dans les ronces pour résister à une tentation.",
            "Le musée de la Portioncule — objets et œuvres liés à l'histoire du lieu et de l'ordre franciscain.",
            "La statue de saint François sur la place, un repère pour les visiteurs qui arrivent.",
          ],
        },
        { type: "h2", text: "Informations pratiques" },
        {
          type: "facts",
          items: [
            { label: "Entrée", value: "Gratuite" },
            { label: "Distance depuis La Mora", value: "2 km" },
            { label: "Parking", value: "Disponible près de la basilique" },
            { label: "À combiner avec", value: "Bosco di San Francesco (à pied, même entrée)" },
          ],
        },
        {
          type: "cta",
          heading: "Réservez en direct et organisez votre visite sans souci.",
          body: "En nous écrivant, vous parlez directement à ceux qui gèrent La Mora au quotidien : aucun intermédiaire, de meilleures conditions que sur les plateformes.",
          label: "Aller à la réservation directe",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Comment y aller depuis Agriturismo La Mora" },
        {
          type: "p",
          text: "Le trajet ne dure que quelques minutes en voiture, le long de la plaine qui relie la campagne de La Mora au centre d'Assise : la basilique est l'étape naturelle pour une visite d'une journée, souvent avant même de monter au centre historique. Ceux qui préfèrent se déplacer autrement peuvent aussi louer un vélo électrique directement sur place.",
        },
        {
          type: "image",
          src: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
          alt: "Extérieur d'Agriturismo La Mora, point de départ pour la basilique Santa Maria degli Angeli",
          caption: "On part d'ici : quelques minutes en voiture, ou un tour en vélo électrique.",
        },
      ],
      finalCtaHeading: "À quelques minutes d'ici, à la campagne.",
      finalCtaBody: "Cinq appartements indépendants, une piscine panoramique, et la basilique à deux pas.",
      finalCtaLabel: "Découvrir les appartements",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "bosco-san-francesco",
      category: "Nature",
      title: "Le Bosco di San Francesco, sur les sentiers du FAI",
      excerpt: "Une zone naturelle protégée entre Assise et Santa Maria degli Angeli : oliveraies, bois et le torrent Tescio, gérés par le FAI.",
      metaDescription: "Le Bosco di San Francesco à Assise : parcours FAI de 4 km entre oliveraies et torrent Tescio, horaires et comment y aller depuis Agriturismo La Mora.",
      image: "/images/territorio/assisi/bosco di san francesco assisi.jpg",
      alt: "Vue aérienne du Bosco di San Francesco, avec ses oliviers disposés en cercle et les remparts d'Assise en arrière-plan",
      intro:
        "Entre Assise et Santa Maria degli Angeli, un parcours naturaliste d'environ 4 km traverse des oliveraies séculaires, un bois mixte et le torrent Tescio — une autre façon de découvrir le territoire, loin de la pierre du centre historique.",
      introCtaHeading: "Envie de marcher parmi les oliviers et de retrouver la piscine le même après-midi ?",
      introCtaLabel: "Vérifier les disponibilités",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "Un bois géré par le FAI" },
        {
          type: "p",
          text: "Depuis 2008, le Bosco di San Francesco est confié au FAI (Fondo Ambiente Italiano), qui en assure l'entretien et organise des visites guidées le long du parcours. Le sentier relie symboliquement deux hauts lieux du franciscanisme — Assise en haut, Santa Maria degli Angeli en bas — en traversant un paysage resté agricole : oliveraies encore cultivées, terrasses, et le cours du Tescio qui accompagne une bonne partie du chemin.",
        },
        { type: "h3", text: "Ce que l'on découvre le long du parcours" },
        {
          type: "p",
          text: "Outre les oliveraies, le parcours comprend une installation artistique permanente — un grand cercle d'oliviers visible même depuis le ciel — conçue comme un lieu de halte et de réflexion, ainsi que des points de vue sur les remparts d'Assise qui dominent la vallée des deux côtés du bois.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
          alt: "Sentier parmi les oliviers dans le Bosco di San Francesco",
        },
        { type: "h2", text: "Informations pratiques" },
        {
          type: "facts",
          items: [
            { label: "Longueur", value: "Environ 4 km" },
            { label: "Gestion", value: "FAI, depuis 2008" },
            { label: "Entrée principale", value: "Près de Santa Maria degli Angeli" },
            { label: "Horaires et billets", value: "Variables selon la saison — vérifier sur le site du FAI" },
          ],
        },
        {
          type: "cta",
          heading: "Un séjour de plusieurs jours facilite l'organisation de chaque excursion.",
          body: "À partir de 7 nuits, la réservation directe donne droit à 10 % de réduction.",
          label: "Découvrir les appartements",
          href: "/alloggi/",
        },
        { type: "h2", text: "Depuis Agriturismo La Mora" },
        {
          type: "p",
          text: "L'entrée principale du bois est à quelques minutes en voiture de La Mora : on laisse la voiture près de Santa Maria degli Angeli et on continue à pied. C'est l'une des excursions les plus simples à organiser pendant le séjour — pas besoin d'y consacrer une journée entière, elle se combine facilement avec une visite de la basilique ou un après-midi à la piscine au retour.",
        },
      ],
      finalCtaHeading: "On y arrive en quelques minutes, on revient pour le reste de la journée.",
      finalCtaBody: "La piscine panoramique de La Mora est à deux pas des appartements.",
      finalCtaLabel: "Découvrir la piscine",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "santuario-san-damiano",
      category: "Territoire",
      title: "Le sanctuaire de San Damiano, hors des remparts d'Assise",
      excerpt: "Où François entendit le célèbre appel à 'réparer mon église', et où Claire d'Assise vécut une grande partie de sa vie.",
      metaDescription: "San Damiano, Assise : le sanctuaire où François reçut son appel et où Claire fonda les Clarisses. Comment y aller depuis Agriturismo La Mora.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Sanctuaire de San Damiano parmi les oliviers, aux abords d'Assise",
      intro:
        "À environ deux kilomètres au sud des remparts d'Assise, niché parmi les oliviers, un petit sanctuaire abrite deux des histoires les plus importantes du franciscanisme : la conversion de François et la vie de Claire.",
      introCtaHeading: "Un moment de calme après la basilique : organisez votre séjour.",
      introCtaLabel: "Vérifier les disponibilités",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "‘Répare mon église’" },
        {
          type: "p",
          text: "Selon la tradition, c'est ici que le crucifix en bois aujourd'hui conservé dans la basilique Santa Chiara parla à François, l'invitant à 'réparer mon église' — l'épisode qui marqua le début de sa conversion. François prit l'appel au pied de la lettre et restaura de ses propres mains l'édifice, alors en ruine.",
        },
        { type: "h2", text: "Le couvent de Claire" },
        {
          type: "p",
          text: "San Damiano est aussi le lieu où Claire d'Assise vécut plus de quarante ans, fondant dans ce même couvent l'ordre des Clarisses. Contrairement à la basilique Saint-François, San Damiano reste un lieu recueilli et silencieux, peu fréquenté par le tourisme de masse malgré son importance historique : sans doute l'étape la plus authentique pour qui cherche un moment de recueillement loin de l'affluence du centre.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg",
          alt: "Vue du sanctuaire de San Damiano parmi les oliviers",
        },
        { type: "h2", text: "Comment y arriver" },
        {
          type: "facts",
          items: [
            { label: "Distance depuis le centre", value: "Environ 2 km" },
            { label: "À pied", value: "20-25 minutes en descente" },
            { label: "En voiture", value: "Quelques minutes" },
            { label: "Recommandé après", value: "La basilique Saint-François" },
          ],
        },
        {
          type: "cta",
          heading: "Réservez en direct, économisez davantage.",
          body: "Aucune commission d'intermédiation, des réductions dédiées à la réservation directe.",
          label: "Découvrir l'avantage direct",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Depuis Agriturismo La Mora" },
        {
          type: "p",
          text: "San Damiano se rejoint en traversant le centre d'Assise ; la façon la plus pratique pour les hôtes de La Mora est donc de le combiner avec une journée déjà consacrée au centre historique : on laisse la voiture près des remparts et on continue à pied. La montée au retour est plus exigeante que la descente — à garder à l'esprit pour ceux qui marchent avec de jeunes enfants.",
        },
      ],
      finalCtaHeading: "Retour à La Mora, pour se détendre à la piscine.",
      finalCtaBody: "À quelques minutes d'Assise, la campagne ombrienne attend, sans hâte.",
      finalCtaLabel: "Découvrir les appartements",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "cascate-delle-marmore",
      category: "Excursion d'une journée",
      title: "Cascate delle Marmore : comment y aller depuis Assise",
      excerpt: "Parmi les plus hautes cascades artificielles d'Europe, à environ une heure de route de La Mora : une excursion d'une demi-journée.",
      metaDescription: "Guide des Cascate delle Marmore près de Terni : hauteur, points de vue, horaires de l'eau et distance en voiture depuis Agriturismo La Mora.",
      image: "/images/territorio/dintorni/cascate delle marmore.jpg",
      alt: "Les Cascate delle Marmore en Ombrie",
      intro:
        "À environ une heure de route de La Mora, près de Terni, une chute d'eau de 165 mètres créée à l'époque romaine figure aujourd'hui parmi les plus hautes cascades artificielles d'Europe — une excursion d'une demi-journée facile à organiser pendant le séjour.",
      introCtaHeading: "Une excursion hors les murs, un retour tranquille : où loger entre les deux.",
      introCtaLabel: "Découvrir les appartements",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Une cascade construite par les Romains" },
        {
          type: "p",
          text: "Les Cascate delle Marmore naissent d'un ouvrage d'ingénierie romain : le canal Curiano, creusé en 271 av. J.-C. pour faire s'écouler les eaux du Velino dans le Nera et assainir les marais de la zone. Le résultat, au fil des siècles, est devenu l'une des plus hautes chutes d'eau artificielles au monde, avec un dénivelé total de 165 mètres réparti sur trois sauts successifs.",
        },
        { type: "h2", text: "Les points de vue" },
        {
          type: "list",
          items: [
            "Belvedere Inferiore — le plus simple, près du parking, la vue classique sur la cascade.",
            "Belvedere Superiore et les sentiers hauts — demandent plus de temps et un peu d'entraînement, mais offrent des vues en surplomb sur la chute et la vallée.",
            "Grotta di Nettuno et Grotta della Pulce — parcours latéraux pour voir la cascade de près, selon l'état des sentiers.",
          ],
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
          alt: "Vue rapprochée des Cascate delle Marmore en plein débit",
        },
        { type: "h2", text: "Quand voir l'eau" },
        {
          type: "p",
          text: "Le débit de la cascade est réglementé : l'eau ne coule que sur des plages horaires précises, définies pour équilibrer production hydroélectrique et ouverture au public. Les horaires changent selon la saison et le jour de la semaine — avant de partir, mieux vaut toujours vérifier le calendrier officiel du parc, pour ne pas se retrouver devant une chute à sec.",
        },
        {
          type: "cta",
          heading: "Organisez l'excursion tranquillement : réservez votre séjour en direct.",
          label: "Vérifier les disponibilités",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Depuis Agriturismo La Mora" },
        {
          type: "facts",
          items: [
            { label: "Distance", value: "Environ 55-60 minutes en voiture" },
            { label: "Dénivelé de la cascade", value: "165 mètres" },
            { label: "Réalisée en", value: "271 av. J.-C., époque romaine" },
            { label: "À combiner avec", value: "Une halte à Terni" },
          ],
        },
        {
          type: "p",
          text: "Le trajet fait des Marmore une excursion réalisable en une demi-journée : on part le matin, on visite la cascade tranquillement, et on peut encore rentrer à temps pour un après-midi à la piscine, ou prolonger la journée par une halte dans le centre de Terni.",
        },
      ],
      finalCtaHeading: "Retour à La Mora pour le reste de la journée.",
      finalCtaBody: "Piscine panoramique ouverte de mai à septembre, à deux pas des appartements.",
      finalCtaLabel: "Découvrir la piscine",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "monte-subasio",
      category: "Nature",
      title: "Monte Subasio : les sentiers au-dessus d'Assise",
      excerpt: "Le parc naturel qui domine la ville : pâturages d'altitude, le fromage du même nom, et des sentiers pour marcher ou pédaler.",
      metaDescription: "Monte Subasio, parc régional au-dessus d'Assise : sentiers depuis l'Eremo delle Carceri, pâturages d'altitude et pecorino di Subasio. Près d'Agriturismo La Mora.",
      image: "/images/territorio/dintorni/monte subasio alto.jpg",
      alt: "Vue aérienne des pâturages d'altitude du Monte Subasio au coucher du soleil",
      intro:
        "Au-dessus d'Assise, le massif qui donne son nom au célèbre pecorino s'ouvre en pâturages d'altitude et en bois de chênes et de hêtres — un parc régional traversé par des sentiers pour marcher ou pédaler, avec des vues sur la vallée ombrienne que le centre historique ne peut offrir.",
      introCtaHeading: "Une base pratique pour qui veut marcher ou pédaler en Ombrie.",
      introCtaLabel: "Découvrir les appartements",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "De la ville au parc" },
        {
          type: "p",
          text: "Le Monte Subasio est aujourd'hui un parc régional : un réseau de sentiers relie Assise à l'Eremo delle Carceri — l'ermitage où François se retirait pour prier, enchâssé dans la roche du mont — et se poursuit vers le sommet, à 1 290 mètres. Le paysage change progressivement le long du parcours : des bois denses près de l'Eremo, on monte vers des pâturages d'altitude ouverts, où le regard porte jusqu'à la vallée ombrienne.",
        },
        { type: "h2", text: "Le pecorino di Subasio" },
        {
          type: "p",
          text: "C'est ce mont qui a donné son nom au pecorino di Subasio, encore produit aujourd'hui par les troupeaux qui paissent en altitude. Le même massif est aussi la source naturelle de la célèbre pierre rose avec laquelle est construite une grande partie d'Assise — la pierre qui donne à la ville la couleur que l'on voit de loin, surtout au coucher du soleil.",
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/monte-subasio.jpg",
          alt: "Sentier parmi les pâturages du Monte Subasio",
        },
        { type: "h2", text: "Marcher ou pédaler" },
        {
          type: "facts",
          items: [
            { label: "Altitude du sommet", value: "1 290 mètres" },
            { label: "Point de départ", value: "Eremo delle Carceri" },
            { label: "Statut", value: "Parc régional" },
            { label: "Adapté à", value: "Randonnée et VTT / vélo électrique" },
          ],
        },
        {
          type: "cta",
          heading: "Louez un vélo électrique directement sur place.",
          body: "Pratique pour monter sans effort même sur les tronçons les plus exigeants.",
          label: "Découvrir les activités",
          href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
        },
        { type: "h2", text: "Depuis Agriturismo La Mora" },
        {
          type: "p",
          text: "L'Eremo delle Carceri, point de départ des principaux sentiers, se rejoint en voiture depuis Assise en quelques minutes — et Assise, elle, est à quelques minutes de La Mora. Pour qui préfère se déplacer autrement, le vélo électrique loué sur place facilite les tronçons en montée sans renoncer à l'excursion.",
        },
      ],
      finalCtaHeading: "Retour à La Mora, entre piscine et campagne.",
      finalCtaBody: "Cinq appartements indépendants, à quelques minutes d'Assise et du Subasio.",
      finalCtaLabel: "Découvrir les appartements",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "agriumbria-umbriafiere",
      category: "Événements",
      title: "Agriumbria à Umbriafiere : où loger près du salon",
      excerpt: "Chaque année, généralement fin mars, le plus grand salon régional de l'agriculture, de l'élevage et de l'alimentation se tient à Bastia Umbra, à quelques minutes de La Mora.",
      metaDescription: "Agriumbria à Umbriafiere (Bastia Umbra) : ce qu'il y a à voir, dates et où loger près d'Agriumbria — Agriturismo La Mora, à 3 km, avec Assise à deux pas.",
      image: "/images/blog/agriumbria-mucche-fiera-agricola.jpg",
      alt: "Bétail conduit par des exposants lors d'un salon agricole en plein air",
      intro:
        "Chaque année, généralement fin mars, Umbriafiere à Bastia Umbra accueille Agriumbria : le plus grand salon régional de l'agriculture, de l'élevage et de l'alimentation — à seulement 3 km d'Agriturismo La Mora.",
      introCtaHeading: "Vous organisez votre séjour pour Agriumbria ?",
      introCtaLabel: "Vérifier les disponibilités",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "Qu'est-ce qu'Agriumbria" },
        {
          type: "p",
          text: "Agriumbria est le Salon national de l'agriculture, de l'élevage et de l'alimentation : l'un des salons professionnels les plus importants du centre de l'Italie, organisé chaque année à Umbriafiere, le parc des expositions de Bastia Umbra. L'édition 2026 a franchi le cap de la 57e édition, qui s'est tenue du 27 au 29 mars — le salon a généralement lieu à cette période, fin mars, mais les dates exactes de chaque édition doivent toujours être vérifiées sur le calendrier officiel d'Umbriafiere, qui peut changer d'une année à l'autre.",
        },
        { type: "h2", text: "Ce que l'on trouve au salon" },
        {
          type: "list",
          items: [
            "Machines et équipements agricoles, des grandes entreprises aux petits producteurs.",
            "Expositions de races bovines, ovines et avicoles nationales — dont Chianina, Limousine, Charolaise et Romagnola.",
            "Technologies pour la production d'huile, de vin et pour les laiteries.",
            "Un espace produits typiques et dégustations, qui attire aussi les visiteurs extérieurs au secteur.",
          ],
        },
        {
          type: "image",
          src: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
          alt: "Campagne ombrienne autour d'Agriturismo La Mora, à quelques minutes d'Umbriafiere",
        },
        { type: "h2", text: "Où loger près d'Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distance depuis Umbriafiere", value: "Environ 3 km" },
            { label: "Distance depuis Assise", value: "5 km" },
            { label: "Appartements", value: "5 indépendants, avec cuisine propre" },
            { label: "Réservation", value: "Directe, sans intermédiaire" },
          ],
        },
        {
          type: "p",
          text: "Pour les exposants, ceux qui travaillent au salon ou le visitent sur plusieurs jours, un agriturismo près d'Agriumbria est souvent plus pratique qu'un hôtel en ville : cinq appartements indépendants, chacun avec sa propre cuisine, à la campagne plutôt que dans la circulation de Bastia Umbra — à quelques minutes d'Umbriafiere mais assez à l'écart pour retrouver le calme le soir.",
        },
        {
          type: "cta",
          heading: "Réservez en direct : aucune commission, de meilleures conditions.",
          body: "En nous écrivant, vous parlez directement à ceux qui gèrent La Mora au quotidien.",
          label: "Découvrir les appartements",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assise à deux pas, même pendant le salon" },
        {
          type: "p",
          text: "Les hôtes logeant près d'Umbriafiere pour Agriumbria ont aussi Assise à portée de main : la basilique Saint-François, la basilique Santa Maria degli Angeli et le centre historique sont à quelques minutes en voiture de La Mora, faciles à combiner avec une journée de salon ou une pause entre deux rendez-vous.",
        },
      ],
      finalCtaHeading: "Réservez votre séjour pour Agriumbria.",
      finalCtaBody: "À 3 km d'Umbriafiere, à 5 km d'Assise : la base pratique pour le salon.",
      finalCtaLabel: "Réserver en direct",
      finalCtaHref: "/#section-price-comparison",
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Événements",
      title: "Caccia Village à Umbriafiere : où loger pour le salon de la chasse",
      excerpt: "Chaque année, généralement mi-mai, des centaines d'entreprises du monde de la chasse se réunissent à Bastia Umbra, entre Pérouse et Assise, à quelques minutes de La Mora.",
      metaDescription: "Caccia Village à Umbriafiere (Bastia Umbra) : dates, exposants et où loger près du salon de la chasse — Agriturismo La Mora, à 3 km, avec Assise à deux pas.",
      image: "/images/blog/caccia-village-campagna-umbria.jpg",
      alt: "Campagne ombrienne avec des bottes de foin au coucher du soleil",
      intro:
        "Chaque année, généralement mi-mai, Umbriafiere à Bastia Umbra accueille Caccia Village : le salon dédié au monde de la chasse, entre Pérouse et Assise — à seulement 3 km d'Agriturismo La Mora.",
      introCtaHeading: "Vous organisez votre séjour pour Caccia Village ?",
      introCtaLabel: "Vérifier les disponibilités",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "Qu'est-ce que Caccia Village" },
        {
          type: "p",
          text: "Caccia Village est le salon dédié au monde de la chasse qui se tient chaque année à Umbriafiere, le parc des expositions de Bastia Umbra, entre Pérouse et Assise. L'édition 2026 s'est déroulée du 16 au 18 mai, avec plus de 250 entreprises exposantes — la participation la plus élevée de l'histoire de l'événement : le salon a généralement lieu à cette période, mi-mai, mais les dates exactes doivent toujours être vérifiées sur le calendrier officiel d'Umbriafiere.",
        },
        { type: "h2", text: "Ce que l'on trouve au salon" },
        {
          type: "list",
          items: [
            "Armes et munitions, toujours exposées désactivées.",
            "Vêtements et équipements techniques outdoor.",
            "Optiques et instruments spécialisés.",
            "Un espace ENCI dédié aux chiens de chasse et aux épreuves cynophiles.",
            "Gastronomie de gibier et étals de boucherie spécialisée.",
          ],
        },
        {
          type: "image",
          src: "/images/piscina/piscina agriturismo la mora.webp",
          alt: "Piscine panoramique d'Agriturismo La Mora, à quelques minutes d'Umbriafiere",
        },
        { type: "h2", text: "Où loger près d'Umbriafiere" },
        {
          type: "facts",
          items: [
            { label: "Distance depuis Umbriafiere", value: "Environ 3 km" },
            { label: "Distance depuis Assise", value: "5 km" },
            { label: "Appartements", value: "5 indépendants, avec cuisine propre" },
            { label: "Réservation", value: "Directe, sans intermédiaire" },
          ],
        },
        {
          type: "p",
          text: "Même pour les visiteurs venus d'une autre région uniquement pour le salon, un agriturismo près de Caccia Village est un point d'ancrage pratique à la campagne : cinq appartements indépendants à quelques minutes d'Umbriafiere, avec la possibilité — entre deux journées de salon — de consacrer quelques heures à Assise, à un quart d'heure de route.",
        },
        {
          type: "cta",
          heading: "Réservez en direct : aucune commission, de meilleures conditions.",
          body: "En nous écrivant, vous parlez directement à ceux qui gèrent La Mora au quotidien.",
          label: "Découvrir les appartements",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assise et la campagne ombrienne, au-delà du salon" },
        {
          type: "p",
          text: "Les hôtes qui séjournent à La Mora pendant Caccia Village trouvent aussi une structure pensée pour les familles et les groupes : piscine panoramique ouverte de mai à septembre — justement pendant la période du salon — aire de jeux et espaces communs pour ceux qui voyagent avec des enfants pendant qu'un autre membre du groupe est au salon.",
        },
      ],
      finalCtaHeading: "Réservez votre séjour pour Caccia Village.",
      finalCtaBody: "À 3 km d'Umbriafiere, à 5 km d'Assise : la base pratique pour le salon.",
      finalCtaLabel: "Réserver en direct",
      finalCtaHref: "/#section-price-comparison",
    },
  ],
  de: [
    {
      slug: "basilica-santa-maria-degli-angeli",
      category: "Umgebung",
      title: "Basilika Santa Maria degli Angeli: was man sehen sollte",
      excerpt: "Die Kirche, die die Portiunkula beherbergt, den Geburtsort des Franziskanerordens, nur wenige Minuten von La Mora entfernt.",
      metaDescription: "Führer zur Basilika Santa Maria degli Angeli in Assisi: Portiunkula, Transitus-Kapelle, Rosengarten, Öffnungszeiten und Entfernung von Agriturismo La Mora (2 km).",
      image: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg",
      alt: "Fassade der Basilika Santa Maria degli Angeli in Assisi",
      intro:
        "Zwei Kilometer von Agriturismo La Mora entfernt, in der Ebene unterhalb von Assisi, erhebt sich eine der größten Kirchen der Christenheit — im 16. Jahrhundert um ein viel kleineres, viel älteres Bauwerk herum errichtet: die Portiunkula.",
      introCtaHeading: "Planen Sie den Besuch? Wählen Sie eine Unterkunft 2 km von der Basilika entfernt.",
      introCtaLabel: "Die Apartments entdecken",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Die Portiunkula, ein Herz im Herzen" },
        {
          type: "p",
          text: "Die Portiunkula ist die kleine Kapelle, in der der heilige Franziskus einen Großteil seines geistlichen Lebens verbrachte und wo er am 3. Oktober 1226 starb. Im 16. Jahrhundert wurde, um sie zu schützen und den wachsenden Pilgerstrom aufzunehmen, eine riesige Basilika um sie herum errichtet: Wer heute eintritt, findet eine winzige Kapelle unter einer gewaltigen Kuppel vor — ein Kontrast, der besser als jede Beschreibung den Abstand zwischen der ursprünglichen Einfachheit des Franziskus und der Art zeigt, wie sein Erbe später gefeiert wurde.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/porzincola di santa maria degli angeli assisi.jpg",
          alt: "Innenansicht der Portiunkula, im Inneren der Basilika Santa Maria degli Angeli",
          caption: "Die Portiunkula, vom Kirchenschiff der Basilika aus gesehen.",
        },
        { type: "h2", text: "Was man neben der Portiunkula sehen sollte" },
        {
          type: "list",
          items: [
            "Transitus-Kapelle — die Zelle, in der Franziskus starb, heute eine Kapelle.",
            "Der Rosengarten — dornenlose Rosen, verbunden mit der Legende, wie Franziskus sich in Dornen warf, um einer Versuchung zu widerstehen.",
            "Das Portiunkula-Museum — Exponate und Werke zur Geschichte des Ortes und des Franziskanerordens.",
            "Die Franziskus-Statue auf dem Vorplatz, ein Orientierungspunkt für ankommende Besucher.",
          ],
        },
        { type: "h2", text: "Praktische Informationen" },
        {
          type: "facts",
          items: [
            { label: "Eintritt", value: "Kostenlos" },
            { label: "Entfernung von La Mora", value: "2 km" },
            { label: "Parken", value: "In der Nähe der Basilika verfügbar" },
            { label: "Kombinieren mit", value: "Bosco di San Francesco (zu Fuß, gleicher Eingang)" },
          ],
        },
        {
          type: "cta",
          heading: "Buchen Sie direkt und planen Sie den Besuch ganz ohne Sorgen.",
          body: "Wenn Sie uns schreiben, sprechen Sie direkt mit denen, die La Mora jeden Tag führen: kein Vermittler, bessere Konditionen als auf den Plattformen.",
          label: "Zur Direktbuchung",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Anfahrt von Agriturismo La Mora" },
        {
          type: "p",
          text: "Die Fahrt dauert nur wenige Minuten mit dem Auto, entlang der Ebene, die die Landschaft um La Mora mit dem Zentrum von Assisi verbindet: Die Basilika ist der natürliche erste Halt für einen Tagesausflug, oft schon bevor man in die Altstadt hinaufsteigt. Wer lieber leichter unterwegs ist, kann auch direkt vor Ort ein E-Bike mieten.",
        },
        {
          type: "image",
          src: "/images/home/esterno agriturismo la mora carretto e agriturismo.webp",
          alt: "Außenansicht von Agriturismo La Mora, Ausgangspunkt für die Basilika Santa Maria degli Angeli",
          caption: "Hier startet man: wenige Minuten mit dem Auto, oder eine Fahrt mit dem E-Bike.",
        },
      ],
      finalCtaHeading: "Wenige Minuten von hier, mitten auf dem Land.",
      finalCtaBody: "Fünf unabhängige Apartments, ein Panorama-Pool, und die Basilika gleich um die Ecke.",
      finalCtaLabel: "Die Apartments entdecken",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "bosco-san-francesco",
      category: "Natur",
      title: "Der Bosco di San Francesco, auf den Wegen des FAI",
      excerpt: "Ein geschütztes Naturgebiet zwischen Assisi und Santa Maria degli Angeli: Olivenhaine, Wald und der Bach Tescio, gepflegt vom FAI.",
      metaDescription: "Der Bosco di San Francesco in Assisi: 4 km langer FAI-Weg durch Olivenhaine und entlang des Bachs Tescio, Öffnungszeiten und Anfahrt von Agriturismo La Mora.",
      image: "/images/territorio/assisi/bosco di san francesco assisi.jpg",
      alt: "Luftaufnahme des Bosco di San Francesco mit dem kreisförmigen Olivenhain und den Mauern von Assisi im Hintergrund",
      intro:
        "Zwischen Assisi und Santa Maria degli Angeli führt ein etwa 4 km langer Naturpfad durch jahrhundertealte Olivenhaine, Mischwald und entlang des Bachs Tescio — eine andere Art, die Gegend zu erleben, fernab vom Stein der Altstadt.",
      introCtaHeading: "Lust, zwischen Olivenbäumen zu spazieren und am selben Nachmittag wieder am Pool zu sein?",
      introCtaLabel: "Verfügbarkeit prüfen",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "Ein vom FAI gepflegter Wald" },
        {
          type: "p",
          text: "Seit 2008 wird der Bosco di San Francesco vom FAI (italienischer Nationaltrust) betreut, der ihn instand hält und Führungen entlang des Weges organisiert. Der Pfad verbindet symbolisch zwei Franziskus-Stätten — Assisi oben, Santa Maria degli Angeli unten — und durchquert dabei eine Landschaft, die landwirtschaftlich geblieben ist: noch bewirtschaftete Olivenhaine, Terrassen und der Tescio, der einen Großteil des Weges begleitet.",
        },
        { type: "h3", text: "Was man unterwegs sieht" },
        {
          type: "p",
          text: "Neben den Olivenhainen umfasst der Weg eine dauerhafte Kunstinstallation — ein großer Olivenbaum-Kreis, der sogar von oben sichtbar ist — als Ort zum Innehalten und Nachdenken gedacht, sowie Aussichtspunkte auf die Mauern von Assisi, die das Tal von beiden Seiten des Waldes dominieren.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/bosco di san francesco assisi agriturismo la mora.jpg",
          alt: "Weg zwischen den Olivenbäumen im Bosco di San Francesco",
        },
        { type: "h2", text: "Praktische Informationen" },
        {
          type: "facts",
          items: [
            { label: "Länge", value: "Etwa 4 km" },
            { label: "Verwaltung", value: "FAI, seit 2008" },
            { label: "Haupteingang", value: "Nahe Santa Maria degli Angeli" },
            { label: "Öffnungszeiten und Tickets", value: "Saisonabhängig — auf der FAI-Website prüfen" },
          ],
        },
        {
          type: "cta",
          heading: "Ein längerer Aufenthalt erleichtert die Planung jedes Ausflugs.",
          body: "Ab 7 Nächten gibt es bei Direktbuchung 10 % Rabatt.",
          label: "Die Apartments entdecken",
          href: "/alloggi/",
        },
        { type: "h2", text: "Von Agriturismo La Mora aus" },
        {
          type: "p",
          text: "Der Haupteingang des Waldes ist wenige Autominuten von La Mora entfernt: Man lässt das Auto in der Nähe von Santa Maria degli Angeli stehen und geht zu Fuß weiter. Es ist einer der einfachsten Ausflüge während des Aufenthalts — kein ganzer Tag nötig, gut kombinierbar mit einem Besuch der Basilika oder einem Nachmittag am Pool danach.",
        },
      ],
      finalCtaHeading: "In wenigen Minuten dort, und zurück für den Rest des Tages.",
      finalCtaBody: "Der Panorama-Pool von La Mora liegt nur wenige Schritte von den Apartments entfernt.",
      finalCtaLabel: "Den Pool entdecken",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "santuario-san-damiano",
      category: "Umgebung",
      title: "Das Heiligtum San Damiano, außerhalb der Mauern von Assisi",
      excerpt: "Wo Franziskus den berühmten Ruf 'stelle meine Kirche wieder her' vernahm und wo Klara von Assisi den Großteil ihres Lebens verbrachte.",
      metaDescription: "San Damiano, Assisi: das Heiligtum, in dem Franziskus seine Berufung empfing und Klara die Klarissen gründete. Anfahrt von Agriturismo La Mora.",
      image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
      alt: "Heiligtum San Damiano zwischen Olivenbäumen, in der Nähe von Assisi",
      intro:
        "Etwa zwei Kilometer südlich der Mauern von Assisi, umgeben von Olivenbäumen, bewahrt ein kleines Heiligtum zwei der wichtigsten Geschichten des Franziskanertums: die Bekehrung des Franziskus und das Leben der Klara.",
      introCtaHeading: "Ein ruhiger Moment nach der Basilika: planen Sie den Aufenthalt.",
      introCtaLabel: "Verfügbarkeit prüfen",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "‘Stelle meine Kirche wieder her’" },
        {
          type: "p",
          text: "Der Überlieferung nach sprach hier das heute in der Basilika Santa Chiara aufbewahrte Holzkreuz zu Franziskus und forderte ihn auf, 'meine Kirche wieder herzustellen' — die Episode, die den Beginn seiner Bekehrung markierte. Franziskus nahm den Ruf wörtlich und restaurierte das damals verfallene Gebäude mit eigenen Händen.",
        },
        { type: "h2", text: "Das Kloster der Klara" },
        {
          type: "p",
          text: "San Damiano ist auch der Ort, an dem Klara von Assisi über vierzig Jahre lang lebte und in eben diesem Kloster den Orden der Klarissen gründete. Anders als die Basilika San Francesco bleibt San Damiano trotz seiner historischen Bedeutung ein stiller, zurückgezogener Ort, wenig vom Massentourismus berührt — wohl die authentischste Station für alle, die einen Moment der Einkehr abseits des Andrangs im Zentrum suchen.",
        },
        {
          type: "image",
          src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg",
          alt: "Blick auf das Heiligtum San Damiano zwischen den Olivenbäumen",
        },
        { type: "h2", text: "Anfahrt" },
        {
          type: "facts",
          items: [
            { label: "Entfernung vom Zentrum", value: "Etwa 2 km" },
            { label: "Zu Fuß", value: "20-25 Minuten bergab" },
            { label: "Mit dem Auto", value: "Wenige Minuten" },
            { label: "Empfohlen nach", value: "Der Basilika San Francesco" },
          ],
        },
        {
          type: "cta",
          heading: "Direkt buchen, mehr sparen.",
          body: "Keine Vermittlungsgebühr, Rabatte speziell für die Direktbuchung.",
          label: "Den Direktbuchungs-Vorteil entdecken",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Von Agriturismo La Mora aus" },
        {
          type: "p",
          text: "San Damiano erreicht man, indem man durch das Zentrum von Assisi geht; für Gäste von La Mora ist es daher am praktischsten, den Besuch mit einem Tag zu kombinieren, der bereits der Altstadt gewidmet ist: Auto in der Nähe der Mauern abstellen und zu Fuß weitergehen. Der Aufstieg auf dem Rückweg ist anstrengender als der Abstieg — für Familien mit kleinen Kindern ein wichtiger Hinweis.",
        },
      ],
      finalCtaHeading: "Zurück nach La Mora, zum Entspannen am Pool.",
      finalCtaBody: "Wenige Minuten von Assisi entfernt wartet die umbrische Landschaft, ganz ohne Eile.",
      finalCtaLabel: "Die Apartments entdecken",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "cascate-delle-marmore",
      category: "Tagesausflug",
      title: "Cascate delle Marmore: Anfahrt von Assisi",
      excerpt: "Einer der höchsten künstlichen Wasserfälle Europas, etwa eine Autostunde von La Mora entfernt: ein Halbtagesausflug.",
      metaDescription: "Führer zu den Cascate delle Marmore bei Terni: Höhe, Aussichtspunkte, Wasserzeiten und Fahrzeit von Agriturismo La Mora.",
      image: "/images/territorio/dintorni/cascate delle marmore.jpg",
      alt: "Die Cascate delle Marmore in Umbrien",
      intro:
        "Etwa eine Autostunde von La Mora entfernt, nahe Terni, zählt ein in römischer Zeit angelegter, 165 Meter hoher Wasserfall heute zu den höchsten künstlichen Wasserfällen Europas — ein Halbtagesausflug, der sich leicht in den Aufenthalt einbauen lässt.",
      introCtaHeading: "Ein Ausflug, eine entspannte Rückfahrt: wo man dazwischen übernachtet.",
      introCtaLabel: "Die Apartments entdecken",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Ein von den Römern erbauter Wasserfall" },
        {
          type: "p",
          text: "Die Cascate delle Marmore entstanden aus einem römischen Ingenieursbauwerk: dem Cavo Curiano, 271 v. Chr. angelegt, um das Wasser des Flusses Velino in den Nera abzuleiten und die Sümpfe der Gegend trockenzulegen. Im Laufe der Jahrhunderte wurde daraus einer der höchsten künstlichen Wasserfälle der Welt, mit einem Gesamtgefälle von 165 Metern über drei aufeinanderfolgende Stufen.",
        },
        { type: "h2", text: "Die Aussichtspunkte" },
        {
          type: "list",
          items: [
            "Belvedere Inferiore — der einfachste, nahe dem Parkplatz, mit dem klassischen Blick auf den Wasserfall.",
            "Belvedere Superiore und die oberen Wege — brauchen mehr Zeit und etwas Kondition, bieten dafür Blicke von oben auf den Fall und das Tal.",
            "Grotta di Nettuno und Grotta della Pulce — Seitenwege für alle, die den Wasserfall aus der Nähe sehen möchten, je nach Wegzustand.",
          ],
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/cascate delle marmore (2).jpg",
          alt: "Nahaufnahme der Cascate delle Marmore bei voller Wasserführung",
        },
        { type: "h2", text: "Wann das Wasser fließt" },
        {
          type: "p",
          text: "Der Wasserfall wird reguliert: Das Wasser fließt nur zu bestimmten Zeiten, festgelegt, um Stromerzeugung und öffentlichen Zugang in Einklang zu bringen. Die Zeiten ändern sich je nach Saison und Wochentag — vor der Fahrt lohnt sich immer ein Blick auf den offiziellen Kalender des Parks, um nicht vor einem trockenen Fall zu stehen.",
        },
        {
          type: "cta",
          heading: "Planen Sie den Ausflug entspannt: buchen Sie Ihren Aufenthalt direkt.",
          label: "Verfügbarkeit prüfen",
          href: "/#section-price-comparison",
        },
        { type: "h2", text: "Von Agriturismo La Mora aus" },
        {
          type: "facts",
          items: [
            { label: "Entfernung", value: "Etwa 55-60 Minuten mit dem Auto" },
            { label: "Gefälle des Wasserfalls", value: "165 Meter" },
            { label: "Erbaut", value: "271 v. Chr., römische Epoche" },
            { label: "Kombinieren mit", value: "Einem Halt in Terni" },
          ],
        },
        {
          type: "p",
          text: "Die Fahrzeit macht die Marmore-Fälle zu einem machbaren Halbtagesausflug: morgens losfahren, den Wasserfall in Ruhe besichtigen und trotzdem rechtzeitig für einen Nachmittag am Pool zurück sein — oder den Tag mit einem Halt im Zentrum von Terni verlängern.",
        },
      ],
      finalCtaHeading: "Zurück nach La Mora für den Rest des Tages.",
      finalCtaBody: "Panorama-Pool von Mai bis September geöffnet, nur wenige Schritte von den Apartments entfernt.",
      finalCtaLabel: "Den Pool entdecken",
      finalCtaHref: "/piscina/",
    },
    {
      slug: "monte-subasio",
      category: "Natur",
      title: "Monte Subasio: die Wanderwege über Assisi",
      excerpt: "Der Naturpark, der die Stadt überragt: Almweiden in der Höhe, der gleichnamige Käse, und Wege zum Wandern oder Radfahren.",
      metaDescription: "Monte Subasio, Regionalpark über Assisi: Wege ab der Eremo delle Carceri, Almweiden und Pecorino di Subasio. In der Nähe von Agriturismo La Mora.",
      image: "/images/territorio/dintorni/monte subasio alto.jpg",
      alt: "Luftaufnahme der Almweiden des Monte Subasio bei Sonnenuntergang",
      intro:
        "Über Assisi öffnet sich das Massiv, das dem berühmten Pecorino seinen Namen gibt, zu Almweiden und Eichen- und Buchenwäldern — ein Regionalpark, durchzogen von Wegen zum Wandern oder Radfahren, mit Blicken auf das umbrische Tal, die die Altstadt nicht bieten kann.",
      introCtaHeading: "Ein praktischer Ausgangspunkt für Wandern oder Radfahren in Umbrien.",
      introCtaLabel: "Die Apartments entdecken",
      introCtaHref: "/alloggi/",
      content: [
        { type: "h2", text: "Von der Stadt in den Park" },
        {
          type: "p",
          text: "Der Monte Subasio ist heute Regionalpark: Ein Wegenetz verbindet Assisi mit der Eremo delle Carceri — der Einsiedelei, in die sich Franziskus zum Gebet zurückzog, in den Fels des Berges eingebettet — und führt weiter zum Gipfel, auf 1.290 Metern. Die Landschaft verändert sich entlang des Weges allmählich: Von den dichten Wäldern nahe der Eremo steigt man zu offenen Almweiden auf, von wo der Blick bis ins umbrische Tal reicht.",
        },
        { type: "h2", text: "Der Pecorino di Subasio" },
        {
          type: "p",
          text: "Dieser Berg gab dem Pecorino di Subasio seinen Namen, der noch heute von den in der Höhe weidenden Herden hergestellt wird. Dasselbe Massiv ist auch die natürliche Quelle des berühmten rosafarbenen Steins, aus dem ein Großteil von Assisi gebaut ist — der Stein, der der Stadt die Farbe verleiht, die man von weitem sieht, besonders bei Sonnenuntergang.",
        },
        {
          type: "image",
          src: "/images/territorio/dintorni/monte-subasio.jpg",
          alt: "Weg durch die Weiden des Monte Subasio",
        },
        { type: "h2", text: "Wandern oder Radfahren" },
        {
          type: "facts",
          items: [
            { label: "Gipfelhöhe", value: "1.290 Meter" },
            { label: "Ausgangspunkt", value: "Eremo delle Carceri" },
            { label: "Status", value: "Regionalpark" },
            { label: "Geeignet für", value: "Trekking und Mountainbike / E-Bike" },
          ],
        },
        {
          type: "cta",
          heading: "Mieten Sie ein E-Bike direkt vor Ort.",
          body: "Praktisch, um auch die anspruchsvolleren Abschnitte mühelos zu bewältigen.",
          label: "Die Aktivitäten entdecken",
          href: "/agriturismo-famiglie-ad-assisi-e-dintorni/",
        },
        { type: "h2", text: "Von Agriturismo La Mora aus" },
        {
          type: "p",
          text: "Die Eremo delle Carceri, Ausgangspunkt der wichtigsten Wege, ist von Assisi aus in wenigen Autominuten erreichbar — und Assisi wiederum liegt nur wenige Minuten von La Mora entfernt. Wer lieber leichter unterwegs ist, dem erleichtert das vor Ort mietbare E-Bike die Anstiege, ohne auf den Ausflug verzichten zu müssen.",
        },
      ],
      finalCtaHeading: "Zurück nach La Mora, zwischen Pool und Landschaft.",
      finalCtaBody: "Fünf unabhängige Apartments, wenige Minuten von Assisi und dem Subasio entfernt.",
      finalCtaLabel: "Die Apartments entdecken",
      finalCtaHref: "/alloggi/",
    },
    {
      slug: "agriumbria-umbriafiere",
      category: "Veranstaltungen",
      title: "Agriumbria auf der Umbriafiere: wo man in Messenähe übernachtet",
      excerpt: "Jedes Jahr, in der Regel Ende März, findet in Bastia Umbra die wichtigste Messe Umbriens für Landwirtschaft, Viehzucht und Ernährung statt, nur wenige Minuten von La Mora entfernt.",
      metaDescription: "Agriumbria auf der Umbriafiere (Bastia Umbra): was man auf der Messe sieht, wann sie stattfindet und wo man in Messenähe übernachtet — Agriturismo La Mora, 3 km entfernt, mit Assisi ganz in der Nähe.",
      image: "/images/blog/agriumbria-mucche-fiera-agricola.jpg",
      alt: "Von Ausstellern geführtes Vieh auf einer landwirtschaftlichen Freiluftmesse",
      intro:
        "Jedes Jahr, in der Regel Ende März, beherbergt die Umbriafiere in Bastia Umbra die Agriumbria: die wichtigste regionale Messe für Landwirtschaft, Viehzucht und Ernährung — nur 3 km von Agriturismo La Mora entfernt.",
      introCtaHeading: "Planen Sie den Aufenthalt für die Agriumbria?",
      introCtaLabel: "Verfügbarkeit prüfen",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "Was ist die Agriumbria" },
        {
          type: "p",
          text: "Die Agriumbria ist die Nationale Messe für Landwirtschaft, Viehzucht und Ernährung: eine der wichtigsten Fachmessen Mittelitaliens, die jedes Jahr auf der Umbriafiere, dem Messegelände von Bastia Umbra, stattfindet. Die Ausgabe 2026 markierte die 57. Auflage, die vom 27. bis 29. März stattfand — die Messe findet typischerweise in diesem Zeitraum, Ende März, statt, auch wenn die genauen Termine jeder Ausgabe stets im offiziellen Kalender der Umbriafiere überprüft werden sollten, da sie sich von Jahr zu Jahr ändern können.",
        },
        { type: "h2", text: "Was man auf der Messe findet" },
        {
          type: "list",
          items: [
            "Landmaschinen und -geräte, von großen Unternehmen bis zu kleinen Erzeugern.",
            "Ausstellungen nationaler Rinder-, Schaf- und Geflügelrassen — darunter Chianina, Limousin, Charolais und Romagnola.",
            "Technologien für die Öl- und Weinherstellung sowie für Molkereien.",
            "Ein Bereich für typische Produkte und Verkostungen, der auch Besucher außerhalb der Branche anzieht.",
          ],
        },
        {
          type: "image",
          src: "/images/servizi-extra/e-bike/immagine di due persone con ebike.webp",
          alt: "Umbrische Landschaft rund um Agriturismo La Mora, wenige Minuten von der Umbriafiere entfernt",
        },
        { type: "h2", text: "Wo man in Messenähe übernachtet" },
        {
          type: "facts",
          items: [
            { label: "Entfernung von Umbriafiere", value: "Etwa 3 km" },
            { label: "Entfernung von Assisi", value: "5 km" },
            { label: "Apartments", value: "5 unabhängige, mit eigener Küche" },
            { label: "Buchung", value: "Direkt, ohne Vermittler" },
          ],
        },
        {
          type: "p",
          text: "Für Aussteller, Messearbeitende oder mehrtägige Besucher ist ein Agriturismo in der Nähe der Agriumbria oft praktischer als ein Hotel in der Stadt: fünf unabhängige Apartments, jedes mit eigener Küche, auf dem Land statt im Verkehr von Bastia Umbra — wenige Minuten von der Umbriafiere entfernt, aber weit genug, um abends an einen ruhigen Ort zurückzukehren.",
        },
        {
          type: "cta",
          heading: "Direkt buchen: keine Provisionen, bessere Konditionen.",
          body: "Wenn Sie uns schreiben, sprechen Sie direkt mit denen, die La Mora jeden Tag führen.",
          label: "Die Apartments entdecken",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi ganz in der Nähe, auch während der Messe" },
        {
          type: "p",
          text: "Gäste, die während der Agriumbria in Messenähe übernachten, haben auch Assisi in greifbarer Nähe: die Basilika San Francesco, die Basilika Santa Maria degli Angeli und die Altstadt sind wenige Autominuten von La Mora entfernt, gut kombinierbar mit einem Messetag oder einer Pause zwischen zwei Terminen.",
        },
      ],
      finalCtaHeading: "Buchen Sie Ihren Aufenthalt für die Agriumbria.",
      finalCtaBody: "3 km von der Umbriafiere, 5 km von Assisi: der praktische Ausgangspunkt für die Messe.",
      finalCtaLabel: "Direkt buchen",
      finalCtaHref: "/#section-price-comparison",
    },
    {
      slug: "caccia-village-umbriafiere",
      category: "Veranstaltungen",
      title: "Caccia Village auf der Umbriafiere: wo man für die Jagdmesse übernachtet",
      excerpt: "Jedes Jahr, in der Regel Mitte Mai, versammeln sich Hunderte Unternehmen der Jagdwelt in Bastia Umbra, zwischen Perugia und Assisi, wenige Minuten von La Mora entfernt.",
      metaDescription: "Caccia Village auf der Umbriafiere (Bastia Umbra): Termine, Aussteller und wo man in Nähe der Jagdmesse übernachtet — Agriturismo La Mora, 3 km entfernt, mit Assisi ganz in der Nähe.",
      image: "/images/blog/caccia-village-campagna-umbria.jpg",
      alt: "Umbrische Landschaft mit Heuballen bei Sonnenuntergang",
      intro:
        "Jedes Jahr, in der Regel Mitte Mai, beherbergt die Umbriafiere in Bastia Umbra das Caccia Village: die Messe für die Welt der Jagd, zwischen Perugia und Assisi — nur 3 km von Agriturismo La Mora entfernt.",
      introCtaHeading: "Planen Sie den Aufenthalt für Caccia Village?",
      introCtaLabel: "Verfügbarkeit prüfen",
      introCtaHref: "/#section-price-comparison",
      content: [
        { type: "h2", text: "Was ist Caccia Village" },
        {
          type: "p",
          text: "Caccia Village ist die der Jagdwelt gewidmete Messe, die jedes Jahr auf der Umbriafiere, dem Messegelände von Bastia Umbra zwischen Perugia und Assisi, stattfindet. Die Ausgabe 2026 fand vom 16. bis 18. Mai statt, mit über 250 ausstellenden Unternehmen — die höchste Teilnehmerzahl in der Geschichte der Veranstaltung: Die Messe findet typischerweise in diesem Zeitraum, Mitte Mai, statt, auch wenn die genauen Termine stets im offiziellen Kalender der Umbriafiere überprüft werden sollten.",
        },
        { type: "h2", text: "Was man auf der Messe findet" },
        {
          type: "list",
          items: [
            "Waffen und Munition, stets deaktiviert ausgestellt.",
            "Bekleidung und technische Ausrüstung für den Outdoor-Bereich.",
            "Optik und Spezialausrüstung.",
            "Ein ENCI-Bereich für Jagdhunde und Hundeprüfungen.",
            "Wildgastronomie und spezialisierte Metzgereistände.",
          ],
        },
        {
          type: "image",
          src: "/images/piscina/piscina agriturismo la mora.webp",
          alt: "Panorama-Pool von Agriturismo La Mora, wenige Minuten von der Umbriafiere entfernt",
        },
        { type: "h2", text: "Wo man in Messenähe übernachtet" },
        {
          type: "facts",
          items: [
            { label: "Entfernung von Umbriafiere", value: "Etwa 3 km" },
            { label: "Entfernung von Assisi", value: "5 km" },
            { label: "Apartments", value: "5 unabhängige, mit eigener Küche" },
            { label: "Buchung", value: "Direkt, ohne Vermittler" },
          ],
        },
        {
          type: "p",
          text: "Auch für Besucher, die nur für die Messe von außerhalb der Region anreisen, ist ein Agriturismo in der Nähe von Caccia Village ein praktischer Ausgangspunkt auf dem Land: fünf unabhängige Apartments wenige Minuten von der Umbriafiere entfernt, mit der Möglichkeit, zwischen zwei Messetagen ein paar Stunden in Assisi zu verbringen, eine Viertelstunde entfernt.",
        },
        {
          type: "cta",
          heading: "Direkt buchen: keine Provisionen, bessere Konditionen.",
          body: "Wenn Sie uns schreiben, sprechen Sie direkt mit denen, die La Mora jeden Tag führen.",
          label: "Die Apartments entdecken",
          href: "/alloggi/",
        },
        { type: "h2", text: "Assisi und die umbrische Landschaft, über die Messe hinaus" },
        {
          type: "p",
          text: "Gäste, die während Caccia Village bei La Mora übernachten, finden auch eine auf Familien und Gruppen ausgerichtete Unterkunft: Panorama-Pool von Mai bis September geöffnet — genau in der Messesaison — Spielplatz und Gemeinschaftsbereiche für alle, die mit Kindern reisen, während ein anderes Gruppenmitglied auf der Messe ist.",
        },
      ],
      finalCtaHeading: "Buchen Sie Ihren Aufenthalt für Caccia Village.",
      finalCtaBody: "3 km von der Umbriafiere, 5 km von Assisi: der praktische Ausgangspunkt für die Messe.",
      finalCtaLabel: "Direkt buchen",
      finalCtaHref: "/#section-price-comparison",
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
