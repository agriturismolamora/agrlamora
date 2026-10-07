import type { Locale } from "@/lib/i18n";
import { getPlace, type PlaceKey } from "@/data/places";

/* Testi delle CTA di prenotazione degli articoli del blog (componente
   src/components/blog-booking-cta.tsx), diversi per articolo e per lingua:
   - intro (CTA A, dopo l'intro e "In breve"): riga contestuale, poi
     "Prenota" (modale bed-and-breakfast.it) e "Vedi gli appartamenti";
   - distance (CTA B, a metà articolo): "Dormi a X km da [luogo]" con la
     distanza reale e una riga sull'articolo;
   - la CTA C (chiusura) usa il finalCtaHeading dell'articolo e i vantaggi
     della prenotazione diretta, fissi nel componente.
   Per gli articoli senza voce qui si usa DEFAULT_BLOG_CTA.

   Distanze in auto da La Mora (Google Maps, percorso consigliato): quelle
   dei luoghi già in src/data/places.ts vengono da lì; le altre sono state
   lette il 07/10/2026 tra le 01:08 e le 01:10, con place_id ricavati e
   verificati riaprendo Google Maps con place_id:<id>:
   - Basilica di Santa Maria degli Angeli (ChIJK5P5xqqdLhMRn0_7PQ_T7Gc):
     2,1 km, 3 min;
   - San Damiano (ChIJz8dioi2dLhMRI9RBQWI3kL8): 7,4 km, 11 min;
   - Cascata delle Marmore (ChIJyyTZlFf5LhMRDr13ZgsiNlI): 77,3 km, 1 h 1 min;
   - Eremo delle Carceri (ChIJKfdSlu6CLhMRLZocHOTnygg): 12,2 km, 20 min.
   Bosco di San Francesco: il FAI indica due ingressi, dalla piazza della
   Basilica superiore e da Santa Croce (Ponte dei Galli); qui la distanza è
   quella della Basilica di San Francesco (places.ts). */

export type BlogCtaDistance = {
  /* km nel formato italiano ("6,8"); in inglese il componente usa il punto. */
  km: string;
  minutes: number;
  /* "da [luogo]" già declinato nella lingua: "dal Santuario...", "from..." */
  from: Record<Locale, string>;
  line: Record<Locale, string>;
};

export type BlogCtaCopy = {
  intro: Record<Locale, string>;
  distance: BlogCtaDistance;
};

function fromPlace(key: PlaceKey, from: Record<Locale, string>, line: Record<Locale, string>): BlogCtaDistance {
  const place = getPlace(key);
  return { km: place.km, minutes: place.minutes, from, line };
}

const PERUGIA_FROM: Record<Locale, string> = { it: "da Perugia", en: "from Perugia", fr: "de Pérouse", de: "von Perugia" };
const UMBRIAFIERE_FROM: Record<Locale, string> = { it: "da Umbriafiere", en: "from Umbriafiere", fr: "d'Umbriafiere", de: "von Umbriafiere" };

const BLOG_CTAS: Record<string, BlogCtaCopy> = {
  "eurochocolate-2026-dove-dormire": {
    intro: {
      it: "Nei giorni di Eurochocolate Perugia è molto richiesta: controlla subito la disponibilità per le tue date.",
      en: "Perugia is in high demand during Eurochocolate: check availability for your dates now.",
      fr: "Pendant Eurochocolate, Pérouse est très demandée : vérifiez dès maintenant les disponibilités pour vos dates.",
      de: "Während der Eurochocolate ist Perugia sehr gefragt: Prüfen Sie jetzt die Verfügbarkeit für Ihre Daten.",
    },
    distance: fromPlace("perugia", PERUGIA_FROM, {
      it: "Di giorno il festival, la sera la tranquillità della campagna.",
      en: "The festival by day, the quiet of the countryside at night.",
      fr: "Le festival le jour, le calme de la campagne le soir.",
      de: "Tagsüber das Festival, abends die Ruhe auf dem Land.",
    }),
  },
  "carlo-acutis-assisi": {
    intro: {
      it: "Vieni ad Assisi per San Carlo Acutis? Scegli le date e controlla la disponibilità.",
      en: "Coming to Assisi for Saint Carlo Acutis? Choose your dates and check availability.",
      fr: "Vous venez à Assise pour saint Carlo Acutis ? Choisissez vos dates et vérifiez les disponibilités.",
      de: "Sie kommen wegen des heiligen Carlo Acutis nach Assisi? Wählen Sie Ihre Daten und prüfen Sie die Verfügbarkeit.",
    },
    distance: fromPlace(
      "santuarioSpogliazione",
      { it: "dal Santuario della Spogliazione", en: "from the Sanctuary of Renunciation", fr: "du Sanctuaire du Dépouillement", de: "vom Heiligtum der Entkleidung" },
      {
        it: "Visiti il santuario e il centro di Assisi, poi torni in campagna, con il parcheggio gratuito in struttura.",
        en: "Visit the sanctuary and the centre of Assisi, then return to the countryside, with free parking on site.",
        fr: "Visitez le sanctuaire et le centre d'Assise, puis retrouvez la campagne, avec parking gratuit sur place.",
        de: "Besuchen Sie das Heiligtum und die Altstadt von Assisi und kehren Sie dann aufs Land zurück, mit kostenlosem Parkplatz vor Ort.",
      },
    ),
  },
  "mercatini-di-natale-umbria": {
    intro: {
      it: "Un weekend tra mercatini e luci di Natale? Scegli le date e controlla la disponibilità.",
      en: "A weekend of Christmas markets and lights? Choose your dates and check availability.",
      fr: "Un week-end de marchés et de lumières de Noël ? Choisissez vos dates et vérifiez les disponibilités.",
      de: "Ein Wochenende mit Weihnachtsmärkten und Lichtern? Wählen Sie Ihre Daten und prüfen Sie die Verfügbarkeit.",
    },
    distance: fromPlace("perugia", PERUGIA_FROM, {
      it: "Da qui anche Gubbio, Rasiglia e il Trasimeno si raggiungono in giornata.",
      en: "From here, Gubbio, Rasiglia and Lake Trasimeno are easy day trips too.",
      fr: "D'ici, Gubbio, Rasiglia et le lac Trasimène se rejoignent aussi dans la journée.",
      de: "Von hier aus erreichen Sie auch Gubbio, Rasiglia und den Trasimenischen See bequem an einem Tag.",
    }),
  },
  "albero-di-natale-lago-trasimeno": {
    intro: {
      it: "Vuoi vedere l'albero sul lago e i mercatini dell'Umbria? Controlla la disponibilità per le tue date.",
      en: "Want to see the tree on the lake and Umbria's Christmas markets? Check availability for your dates.",
      fr: "Envie de voir le sapin sur le lac et les marchés de Noël de l'Ombrie ? Vérifiez les disponibilités pour vos dates.",
      de: "Sie möchten den Baum auf dem See und Umbriens Weihnachtsmärkte sehen? Prüfen Sie die Verfügbarkeit für Ihre Daten.",
    },
    distance: fromPlace(
      "roccaDelLeone",
      { it: "da Castiglione del Lago", en: "from Castiglione del Lago", fr: "de Castiglione del Lago", de: "von Castiglione del Lago" },
      {
        it: "Una base in campagna vicino ad Assisi, comoda anche per Perugia e Gubbio.",
        en: "A countryside base near Assisi, handy for Perugia and Gubbio too.",
        fr: "Une base à la campagne près d'Assise, pratique aussi pour Pérouse et Gubbio.",
        de: "Ein Ausgangspunkt auf dem Land bei Assisi, praktisch auch für Perugia und Gubbio.",
      },
    ),
  },
  "rasiglia-piccola-venezia-umbria": {
    intro: {
      it: "Una gita a Rasiglia e qualche giorno in campagna? Controlla la disponibilità per le tue date.",
      en: "A day trip to Rasiglia and a few days in the countryside? Check availability for your dates.",
      fr: "Une excursion à Rasiglia et quelques jours à la campagne ? Vérifiez les disponibilités pour vos dates.",
      de: "Ein Ausflug nach Rasiglia und ein paar Tage auf dem Land? Prüfen Sie die Verfügbarkeit für Ihre Daten.",
    },
    distance: fromPlace(
      "rasiglia",
      { it: "da Rasiglia", en: "from Rasiglia", fr: "de Rasiglia", de: "von Rasiglia" },
      {
        it: "Una giornata tra ruscelli e vicoli, poi la sera in appartamento, con cucina attrezzata e Wi-Fi.",
        en: "A day among streams and lanes, then evenings in your apartment, with a fully equipped kitchen and Wi-Fi.",
        fr: "Une journée entre ruisseaux et ruelles, puis le soir dans votre appartement, avec cuisine équipée et Wi-Fi.",
        de: "Ein Tag zwischen Bächen und Gassen, abends dann in Ihrer Ferienwohnung mit voll ausgestatteter Küche und WLAN.",
      },
    ),
  },
  "basilica-santa-maria-degli-angeli": {
    intro: {
      it: "Vuoi visitare la Porziuncola con calma? Controlla la disponibilità per le tue date.",
      en: "Want to visit the Porziuncola without rushing? Check availability for your dates.",
      fr: "Envie de visiter la Portioncule sans vous presser ? Vérifiez les disponibilités pour vos dates.",
      de: "Sie möchten die Portiuncula in Ruhe besuchen? Prüfen Sie die Verfügbarkeit für Ihre Daten.",
    },
    distance: {
      km: "2,1",
      minutes: 3,
      from: { it: "dalla Basilica di Santa Maria degli Angeli", en: "from the Basilica of Santa Maria degli Angeli", fr: "de la basilique Sainte-Marie-des-Anges", de: "von der Basilika Santa Maria degli Angeli" },
      line: {
        it: "La Basilica e la Porziuncola a pochi minuti, e il resto di Assisi poco più in là.",
        en: "The Basilica and the Porziuncola are minutes away, with the rest of Assisi just beyond.",
        fr: "La basilique et la Portioncule à quelques minutes, et le reste d'Assise juste après.",
        de: "Die Basilika und die Portiuncula sind nur wenige Minuten entfernt, der Rest von Assisi gleich dahinter.",
      },
    },
  },
  "bosco-san-francesco": {
    intro: {
      it: "Una camminata tra gli ulivi del Bosco e il ritorno in campagna? Controlla la disponibilità.",
      en: "A walk among the olive trees of the Bosco and back to the countryside? Check availability.",
      fr: "Une promenade parmi les oliviers du Bosco et le retour à la campagne ? Vérifiez les disponibilités.",
      de: "Ein Spaziergang zwischen den Olivenbäumen des Bosco und zurück aufs Land? Prüfen Sie die Verfügbarkeit.",
    },
    distance: fromPlace(
      "basilica",
      { it: "dalla Basilica di San Francesco", en: "from the Basilica of San Francesco", fr: "de la basilique Saint-François", de: "von der Basilika San Francesco" },
      {
        it: "Dalla piazza della Basilica superiore si entra nel Bosco; l'altro ingresso è a Santa Croce, ai piedi di Assisi.",
        en: "You enter the Bosco from the square of the Upper Basilica; the other entrance is at Santa Croce, at the foot of Assisi.",
        fr: "On entre dans le Bosco depuis la place de la basilique supérieure ; l'autre entrée se trouve à Santa Croce, au pied d'Assise.",
        de: "Man betritt den Bosco vom Platz der Oberkirche aus; der andere Eingang liegt bei Santa Croce am Fuß von Assisi.",
      },
    ),
  },
  "santuario-san-damiano": {
    intro: {
      it: "Un soggiorno tranquillo per visitare San Damiano e Assisi? Controlla la disponibilità per le tue date.",
      en: "A quiet stay to visit San Damiano and Assisi? Check availability for your dates.",
      fr: "Un séjour au calme pour visiter San Damiano et Assise ? Vérifiez les disponibilités pour vos dates.",
      de: "Ein ruhiger Aufenthalt, um San Damiano und Assisi zu besuchen? Prüfen Sie die Verfügbarkeit für Ihre Daten.",
    },
    distance: {
      km: "7,4",
      minutes: 11,
      from: { it: "dal Santuario di San Damiano", en: "from the Sanctuary of San Damiano", fr: "du sanctuaire de San Damiano", de: "vom Heiligtum San Damiano" },
      line: {
        it: "San Damiano e il centro di Assisi a portata di mano, e la sera la quiete della campagna.",
        en: "San Damiano and the centre of Assisi close at hand, and the quiet of the countryside at night.",
        fr: "San Damiano et le centre d'Assise à portée de main, et le calme de la campagne le soir.",
        de: "San Damiano und die Altstadt von Assisi ganz nah, abends die Ruhe auf dem Land.",
      },
    },
  },
  "cascate-delle-marmore": {
    intro: {
      it: "Le Cascate delle Marmore in giornata e la sera in campagna vicino ad Assisi? Controlla la disponibilità.",
      en: "The Marmore Falls as a day trip, evenings in the countryside near Assisi? Check availability.",
      fr: "Les cascades des Marmore dans la journée, le soir à la campagne près d'Assise ? Vérifiez les disponibilités.",
      de: "Die Marmore-Wasserfälle als Tagesausflug, abends auf dem Land bei Assisi? Prüfen Sie die Verfügbarkeit.",
    },
    distance: {
      km: "77,3",
      minutes: 61,
      from: { it: "dalle Cascate delle Marmore", en: "from the Marmore Falls", fr: "des cascades des Marmore", de: "von den Marmore-Wasserfällen" },
      line: {
        it: "Una gita in giornata, e al ritorno Assisi è a pochi minuti.",
        en: "An easy day trip, and back home Assisi is just minutes away.",
        fr: "Une excursion à la journée, et au retour Assise est à quelques minutes.",
        de: "Ein Tagesausflug, und zurück ist Assisi nur wenige Minuten entfernt.",
      },
    },
  },
  "monte-subasio": {
    intro: {
      it: "Sentieri del Subasio di giorno, la sera in appartamento? Controlla la disponibilità per le tue date.",
      en: "Monte Subasio's trails by day, your apartment at night? Check availability for your dates.",
      fr: "Les sentiers du Subasio le jour, votre appartement le soir ? Vérifiez les disponibilités pour vos dates.",
      de: "Tagsüber die Wege des Subasio, abends die Ferienwohnung? Prüfen Sie die Verfügbarkeit für Ihre Daten.",
    },
    distance: {
      km: "12,2",
      minutes: 20,
      from: { it: "dall'Eremo delle Carceri", en: "from the Eremo delle Carceri", fr: "de l'Eremo delle Carceri", de: "vom Eremo delle Carceri" },
      line: {
        it: "L'Eremo è il punto di partenza dei sentieri principali, e in struttura c'è il noleggio di e-bike.",
        en: "The Eremo is the starting point of the main trails, and e-bikes can be rented at the farm.",
        fr: "L'Eremo est le point de départ des principaux sentiers, et des vélos électriques sont à louer sur place.",
        de: "Das Eremo ist Ausgangspunkt der wichtigsten Wege, und vor Ort können Sie E-Bikes mieten.",
      },
    },
  },
  "agriumbria-umbriafiere": {
    intro: {
      it: "Vieni ad Agriumbria? Controlla la disponibilità per i giorni della fiera.",
      en: "Coming to Agriumbria? Check availability for the days of the fair.",
      fr: "Vous venez à Agriumbria ? Vérifiez les disponibilités pour les jours de la foire.",
      de: "Sie kommen zur Agriumbria? Prüfen Sie die Verfügbarkeit für die Messetage.",
    },
    distance: fromPlace("umbriafiere", UMBRIAFIERE_FROM, {
      it: "Esci dalla fiera e sei subito in campagna, con il parcheggio gratuito in struttura.",
      en: "Leave the fair and you're straight into the countryside, with free parking on site.",
      fr: "En sortant de la foire, vous êtes tout de suite à la campagne, avec parking gratuit sur place.",
      de: "Von der Messe aus sind Sie sofort auf dem Land, mit kostenlosem Parkplatz vor Ort.",
    }),
  },
  "caccia-village-umbriafiere": {
    intro: {
      it: "Vieni a Caccia Village? Controlla la disponibilità per i giorni della fiera.",
      en: "Coming to Caccia Village? Check availability for the days of the fair.",
      fr: "Vous venez à Caccia Village ? Vérifiez les disponibilités pour les jours de la foire.",
      de: "Sie kommen zum Caccia Village? Prüfen Sie die Verfügbarkeit für die Messetage.",
    },
    distance: fromPlace("umbriafiere", UMBRIAFIERE_FROM, {
      it: "Cinque appartamenti indipendenti con cucina: comodi anche per chi resta più giorni in fiera.",
      en: "Five independent apartments with a kitchen: handy if you're at the fair for several days.",
      fr: "Cinq appartements indépendants avec cuisine : pratiques si vous restez plusieurs jours à la foire.",
      de: "Fünf unabhängige Ferienwohnungen mit Küche: praktisch, wenn Sie mehrere Tage auf der Messe sind.",
    }),
  },
};

/* Testo di riserva per gli articoli senza voce in BLOG_CTAS. */
export const DEFAULT_BLOG_CTA: BlogCtaCopy = {
  intro: {
    it: "Scegli le date e controlla la disponibilità ad Agriturismo La Mora.",
    en: "Choose your dates and check availability at Agriturismo La Mora.",
    fr: "Choisissez vos dates et vérifiez les disponibilités à l'Agriturismo La Mora.",
    de: "Wählen Sie Ihre Daten und prüfen Sie die Verfügbarkeit im Agriturismo La Mora.",
  },
  distance: fromPlace(
    "basilica",
    { it: "dalla Basilica di San Francesco", en: "from the Basilica of San Francesco", fr: "de la basilique Saint-François", de: "von der Basilika San Francesco" },
    {
      it: "Cinque appartamenti indipendenti nella campagna di Assisi, con parcheggio gratuito in struttura.",
      en: "Five independent apartments in the countryside outside Assisi, with free parking on site.",
      fr: "Cinq appartements indépendants dans la campagne d'Assise, avec parking gratuit sur place.",
      de: "Fünf unabhängige Ferienwohnungen auf dem Land bei Assisi, mit kostenlosem Parkplatz vor Ort.",
    },
  ),
};

/* undefined se l'articolo non ha testi propri: la pagina usa allora la riga
   introCtaHeading dell'articolo (se c'è) e DEFAULT_BLOG_CTA. */
export function getBlogCta(slug: string): BlogCtaCopy | undefined {
  return BLOG_CTAS[slug];
}
