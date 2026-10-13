import Image from "next/image";
import { Fragment } from "react";
import { WatermarkedImage } from "@/components/watermarked-image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";
import { PhotoCreditLine } from "@/components/photo-credit";
import { getBlogPost, type BlogPost } from "@/data/blog-posts";
import { HoverFill } from "@/components/hover-fill";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import { getPlace, type PlaceKey } from "@/data/places";
import { MapsButton } from "@/components/maps-button";
import { EUROCHOCOLATE_2026 } from "@/data/promo";
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

const METADATA_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Territorio",
    description: "Assisi, Santa Maria degli Angeli, Spello, Perugia: la guida al territorio umbro intorno ad Agriturismo La Mora, base ideale per visitare Assisi e dintorni.",
  },
  en: {
    title: "Around Assisi: what to see nearby",
    description: "Assisi, Santa Maria degli Angeli, Spello, Perugia: the guide to the Umbrian area around Agriturismo La Mora, an ideal base for visiting Assisi and its surroundings.",
  },
  fr: {
    title: "Autour d'Assise : que voir à proximité",
    description: "Assise, Santa Maria degli Angeli, Spello, Pérouse : le guide du territoire ombrien autour d'Agriturismo La Mora, base idéale pour visiter Assise et ses environs.",
  },
  de: {
    title: "Rund um Assisi: Sehenswertes in der Nähe",
    description: "Assisi, Santa Maria degli Angeli, Spello, Perugia: der Leitfaden zur umbrischen Umgebung von Agriturismo La Mora, ideale Basis für Assisi und Umgebung.",
  },
};

export function getTerritorioMetadata(locale: Locale) {
  const m = METADATA_TEXT[locale];
  return pageMetadata({ locale, path: "/territorio/", title: m.title, description: m.description });
}

/* article: slug dell'articolo del blog dedicato al luogo (src/data/
   blog-posts.ts), linkato sotto la scheda con il suo titolo. */
type Place = { name: string; src: string; alt: string; note: string; credit?: string; maps?: PlaceKey; article?: string };

/* Testo con link interni: stringhe e link. href è il path italiano, la
   lingua la aggiunge withLocale() al render. */
type RichText = (string | { text: string; href: string })[];
type GuideBlock = { heading: string; paragraphs: RichText[] };

/* Guida per zone: SOLO luoghi già trattati in src/data/places.ts e negli
   articoli del blog, con distanze e tempi in auto già verificati nel
   progetto (Google Maps: places.ts, FAQ della home, articoli del blog che
   lo dichiarano; date e fatti dagli articoli, che citano le loro fonti
   ufficiali). Ogni link porta all'articolo che approfondisce il luogo. */
const GUIDE: Record<
  Locale,
  { assisiIntro: RichText[]; pianaLabel: string; pianaHeading: string; piana: GuideBlock[]; dintorni: GuideBlock[]; perugiaMore: RichText; onBlog: string }
> = {
  it: {
    assisiIntro: [
      [
        "Da La Mora a Piazza del Comune, nel cuore di Assisi, sono 6,8 km, circa 14 minuti in auto; la Basilica di San Francesco è a 7,5 km, circa 18 minuti (distanze di Google Maps). Una volta in centro, tutto si visita a piedi: le basiliche, le piazze, le due rocche e i santuari appena fuori dalle mura.",
      ],
      [
        "A circa 1 km a piedi dalla Basilica di San Francesco, lungo via San Francesco, c'è il Santuario della Spogliazione, dove riposa ",
        { text: "San Carlo Acutis, canonizzato il 7 settembre 2025", href: "/blog/carlo-acutis-assisi/" },
        ". Scendendo invece da Piazza del Comune, in circa 21 minuti a piedi (1,5 km), si arriva al ",
        { text: "santuario di San Damiano", href: "/blog/santuario-san-damiano/" },
        ", luogo della conversione di Francesco, dove Chiara visse gran parte della sua vita. Per una pausa dalla pietra del centro, il ",
        { text: "Bosco di San Francesco del FAI", href: "/blog/bosco-san-francesco/" },
        " scende per 1,5 km tra uliveti e bosco, dalla Basilica fino al complesso di Santa Croce.",
      ],
    ],
    pianaLabel: "Nella piana",
    pianaHeading: "Santa Maria degli Angeli, Rivotorto e Bastia Umbra.",
    piana: [
      {
        heading: "Santa Maria degli Angeli e Rivotorto",
        paragraphs: [
          [
            "La meta più vicina è anche una delle più importanti: a 2,1 km da La Mora, nella piana sotto Assisi, la ",
            { text: "Basilica di Santa Maria degli Angeli", href: "/blog/basilica-santa-maria-degli-angeli/" },
            " fu costruita tra il 1569 e il 1679, su progetto di Galeazzo Alessi, intorno alla Porziuncola, la piccola chiesa dove San Francesco fondò l'ordine francescano. Dentro c'è anche la Cappella del Transito; l'ingresso è gratuito.",
          ],
          [
            "A Rivotorto, un'altra frazione di Assisi, si trova ",
            { text: "Villa Relax", href: "/villa-relax-assisi/" },
            ", la villa indipendente della stessa proprietà di La Mora: fino a 16 ospiti in 6 camere, con piscina privata, a 2 km dal Santuario di Rivotorto. Per gruppi numerosi o due famiglie che viaggiano insieme è l'alternativa agli appartamenti.",
          ],
        ],
      },
      {
        heading: "Bastia Umbra e Umbriafiere",
        paragraphs: [
          [
            "Il polo fieristico più vicino è Umbriafiere, a Bastia Umbra: 3,4 km da La Mora, circa 6 minuti in auto. Qui si svolgono, tra le altre, ",
            { text: "Agriumbria, la mostra nazionale di agricoltura, zootecnia e alimentazione", href: "/blog/agriumbria-umbriafiere/" },
            ", in genere a fine marzo, e ",
            { text: "Caccia Village, la fiera dedicata alla caccia", href: "/blog/caccia-village-umbriafiere/" },
            ", in genere a metà maggio. Per chi viene per lavoro, La Mora è una base tranquilla in campagna a pochi minuti dai padiglioni.",
          ],
        ],
      },
    ],
    dintorni: [
      {
        heading: "Borghi vicini",
        paragraphs: [
          ["Spello è a 15,1 km, circa 18 minuti in auto: un borgo medievale in pietra rosa, meno affollato di Assisi, noto per le Infiorate di giugno."],
          [
            "In comune di Foligno, ",
            { text: "Rasiglia, la «piccola Venezia dell'Umbria»", href: "/blog/rasiglia-piccola-venezia-umbria/" },
            ", è un borgo a circa 600 metri di quota attraversato da ruscelli, canali e cascatelle: 36,5 km, circa 37 minuti in auto. Più lontano, Gubbio (54,7 km, circa 42 minuti) è la città dell'albero di Natale da Guinness sul Monte Ingino: lo raccontiamo nella guida ai ",
            { text: "mercatini di Natale in Umbria", href: "/blog/mercatini-di-natale-umbria/" },
            ".",
          ],
        ],
      },
      {
        heading: "Natura, laghi e cascate",
        paragraphs: [
          [
            "Sopra Assisi si apre il ",
            { text: "parco regionale del Monte Subasio", href: "/blog/monte-subasio/" },
            ", con la vetta a 1.290 metri, pascoli d'altura e boschi attraversati da sentieri per camminare, andare in mountain bike o in e-bike. I sentieri principali partono dall'Eremo delle Carceri, a 12,2 km da La Mora, circa 20 minuti in auto.",
          ],
          [
            "Per una gita di mezza giornata, le ",
            { text: "Cascate delle Marmore", href: "/blog/cascate-delle-marmore/" },
            " sono a 77,3 km, circa 1 ora e 10 minuti: un salto di 165 metri in tre balzi, creato dai Romani vicino a Terni, con l'acqua aperta solo a orari stabiliti (da controllare prima di partire). D'inverno vale il viaggio anche il lago Trasimeno: a Castiglione del Lago, a 64,3 km (circa 50 minuti), dal 5 dicembre 2026 al 6 gennaio 2027 si accende l'",
            { text: "albero di Natale di luci sull'acqua del Trasimeno", href: "/blog/albero-di-natale-lago-trasimeno/" },
            ", lungo 1.080 metri.",
          ],
        ],
      },
    ],
    perugiaMore: [
      "In genere da fine novembre all'Epifania il centro si riempie di luci e mercatini di Natale: li raccontiamo, insieme a Gubbio e al Trasimeno, nella guida ai ",
      { text: "mercatini di Natale in Umbria", href: "/blog/mercatini-di-natale-umbria/" },
      ".",
    ],
    onBlog: "Sul blog",
  },
  en: {
    assisiIntro: [
      [
        "From La Mora to Piazza del Comune, in the heart of Assisi, it's 6.8 km, about 14 minutes by car; the Basilica of St. Francis is 7.5 km away, about 18 minutes (Google Maps distances). Once in town, everything is on foot: the basilicas, the squares, the two fortresses and the sanctuaries just outside the walls.",
      ],
      [
        "About 1 km on foot from the Basilica of St. Francis, along Via San Francesco, is the Santuario della Spogliazione, where ",
        { text: "Saint Carlo Acutis, canonised on 7 September 2025", href: "/blog/carlo-acutis-assisi/" },
        " rests. Heading down from Piazza del Comune instead, about 21 minutes on foot (1.5 km), you reach the ",
        { text: "Sanctuary of San Damiano", href: "/blog/santuario-san-damiano/" },
        ", the place of Francis's conversion, where Clare spent much of her life. For a break from the stone of the centre, the ",
        { text: "FAI's Bosco di San Francesco", href: "/blog/bosco-san-francesco/" },
        " runs 1.5 km down through olive groves and woodland, from the Basilica to the Santa Croce complex.",
      ],
    ],
    pianaLabel: "On the plain",
    pianaHeading: "Santa Maria degli Angeli, Rivotorto and Bastia Umbra.",
    piana: [
      {
        heading: "Santa Maria degli Angeli and Rivotorto",
        paragraphs: [
          [
            "The nearest sight is also one of the most important: 2.1 km from La Mora, on the plain below Assisi, the ",
            { text: "Basilica of Santa Maria degli Angeli", href: "/blog/basilica-santa-maria-degli-angeli/" },
            " was built between 1569 and 1679, to a design by Galeazzo Alessi, around the Porziuncola, the small church where St. Francis founded the Franciscan order. Inside is also the Chapel of the Transito; entry is free.",
          ],
          [
            "Rivotorto, another village in the municipality of Assisi, is home to ",
            { text: "Villa Relax", href: "/villa-relax-assisi/" },
            ", the independent villa owned by the same family as La Mora: up to 16 guests in 6 bedrooms, with a private pool, 2 km from the Sanctuary of Rivotorto. For large groups or two families travelling together, it's the alternative to the apartments.",
          ],
        ],
      },
      {
        heading: "Bastia Umbra and Umbriafiere",
        paragraphs: [
          [
            "The nearest exhibition centre is Umbriafiere, in Bastia Umbra: 3.4 km from La Mora, about 6 minutes by car. Among other events it hosts ",
            { text: "Agriumbria, the national agriculture, livestock and food show", href: "/blog/agriumbria-umbriafiere/" },
            ", usually at the end of March, and ",
            { text: "Caccia Village, the hunting fair", href: "/blog/caccia-village-umbriafiere/" },
            ", usually in mid-May. For business travellers, La Mora is a quiet countryside base a few minutes from the halls.",
          ],
        ],
      },
    ],
    dintorni: [
      {
        heading: "Villages nearby",
        paragraphs: [
          ["Spello is 15.1 km away, about 18 minutes by car: a medieval town of pink stone, less crowded than Assisi, known for its June flower festival (Infiorate)."],
          [
            "In the municipality of Foligno, ",
            { text: "Rasiglia, the “little Venice of Umbria”", href: "/blog/rasiglia-piccola-venezia-umbria/" },
            ", is a village at about 600 metres, crossed by streams, channels and small waterfalls: 36.5 km, about 37 minutes by car. Further away, Gubbio (54.7 km, about 42 minutes) is the town of the record-breaking Christmas tree of lights on Monte Ingino: we cover it in our guide to ",
            { text: "Christmas markets in Umbria", href: "/blog/mercatini-di-natale-umbria/" },
            ".",
          ],
        ],
      },
      {
        heading: "Nature, lakes and waterfalls",
        paragraphs: [
          [
            "Above Assisi lies the ",
            { text: "Monte Subasio regional park", href: "/blog/monte-subasio/" },
            ", with its summit at 1,290 metres, upland pastures and woods crossed by trails for walking, mountain biking and e-biking. The main trails start from the Eremo delle Carceri, 12.2 km from La Mora, about 20 minutes by car.",
          ],
          [
            "For a half-day trip, the ",
            { text: "Marmore Falls", href: "/blog/cascate-delle-marmore/" },
            " are 77.3 km away, about 1 hour 10 minutes: a 165-metre waterfall in three drops, created by the Romans near Terni, with the water released only at set times (check before you go). In winter Lake Trasimeno is worth the drive too: at Castiglione del Lago, 64.3 km away (about 50 minutes), from 5 December 2026 to 6 January 2027 the ",
            { text: "Christmas tree of lights on Lake Trasimeno", href: "/blog/albero-di-natale-lago-trasimeno/" },
            " is lit, 1,080 metres long.",
          ],
        ],
      },
    ],
    perugiaMore: [
      "Usually from late November to Epiphany the centre fills with Christmas lights and markets: we cover them, together with Gubbio and Lake Trasimeno, in our guide to ",
      { text: "Christmas markets in Umbria", href: "/blog/mercatini-di-natale-umbria/" },
      ".",
    ],
    onBlog: "On the blog",
  },
  fr: {
    assisiIntro: [
      [
        "De La Mora à la Piazza del Comune, au cœur d'Assise, il y a 6,8 km, environ 14 minutes en voiture ; la basilique Saint-François est à 7,5 km, environ 18 minutes (distances Google Maps). Une fois en ville, tout se visite à pied : les basiliques, les places, les deux forteresses et les sanctuaires juste à l'extérieur des remparts.",
      ],
      [
        "À environ 1 km à pied de la basilique Saint-François, par la via San Francesco, se trouve le Santuario della Spogliazione, où repose ",
        { text: "saint Carlo Acutis, canonisé le 7 septembre 2025", href: "/blog/carlo-acutis-assisi/" },
        ". En descendant de la Piazza del Comune, en 21 minutes environ à pied (1,5 km), on rejoint le ",
        { text: "sanctuaire de San Damiano", href: "/blog/santuario-san-damiano/" },
        ", lieu de la conversion de François, où Claire passa une grande partie de sa vie. Pour une pause loin de la pierre du centre, le ",
        { text: "Bosco di San Francesco du FAI", href: "/blog/bosco-san-francesco/" },
        " descend sur 1,5 km entre oliveraies et bois, de la basilique jusqu'au complexe de Santa Croce.",
      ],
    ],
    pianaLabel: "Dans la plaine",
    pianaHeading: "Santa Maria degli Angeli, Rivotorto et Bastia Umbra.",
    piana: [
      {
        heading: "Santa Maria degli Angeli et Rivotorto",
        paragraphs: [
          [
            "Le site le plus proche est aussi l'un des plus importants : à 2,1 km de La Mora, dans la plaine sous Assise, la ",
            { text: "basilique Sainte-Marie-des-Anges", href: "/blog/basilica-santa-maria-degli-angeli/" },
            " a été construite entre 1569 et 1679, sur un projet de Galeazzo Alessi, autour de la Portioncule, la petite église où saint François fonda l'ordre franciscain. À l'intérieur se trouve aussi la chapelle du Transitus ; l'entrée est gratuite.",
          ],
          [
            "À Rivotorto, un autre hameau de la commune d'Assise, se trouve ",
            { text: "Villa Relax", href: "/villa-relax-assisi/" },
            ", la villa indépendante des mêmes propriétaires que La Mora : jusqu'à 16 personnes dans 6 chambres, avec piscine privée, à 2 km du sanctuaire de Rivotorto. Pour les grands groupes ou deux familles qui voyagent ensemble, c'est l'alternative aux appartements.",
          ],
        ],
      },
      {
        heading: "Bastia Umbra et Umbriafiere",
        paragraphs: [
          [
            "Le parc des expositions le plus proche est Umbriafiere, à Bastia Umbra : à 3,4 km de La Mora, environ 6 minutes en voiture. Il accueille notamment ",
            { text: "Agriumbria, le salon national de l'agriculture, de l'élevage et de l'alimentation", href: "/blog/agriumbria-umbriafiere/" },
            ", en général fin mars, et ",
            { text: "Caccia Village, le salon de la chasse", href: "/blog/caccia-village-umbriafiere/" },
            ", en général à la mi-mai. Pour un déplacement professionnel, La Mora est une base tranquille à la campagne, à quelques minutes des pavillons.",
          ],
        ],
      },
    ],
    dintorni: [
      {
        heading: "Villages voisins",
        paragraphs: [
          ["Spello est à 15,1 km, environ 18 minutes en voiture : un bourg médiéval en pierre rose, moins fréquenté qu'Assise, connu pour ses Infiorate de juin."],
          [
            "Sur la commune de Foligno, ",
            { text: "Rasiglia, la « petite Venise de l'Ombrie »", href: "/blog/rasiglia-piccola-venezia-umbria/" },
            ", est un village à environ 600 mètres d'altitude, traversé de ruisseaux, de canaux et de petites cascades : 36,5 km, environ 37 minutes en voiture. Plus loin, Gubbio (54,7 km, environ 42 minutes) est la ville du sapin de Noël record sur le mont Ingino : nous en parlons dans notre guide des ",
            { text: "marchés de Noël en Ombrie", href: "/blog/mercatini-di-natale-umbria/" },
            ".",
          ],
        ],
      },
      {
        heading: "Nature, lacs et cascades",
        paragraphs: [
          [
            "Au-dessus d'Assise s'étend le ",
            { text: "parc régional du Mont Subasio", href: "/blog/monte-subasio/" },
            ", qui culmine à 1 290 mètres : pâturages d'altitude et bois traversés de sentiers pour la randonnée, le VTT et le vélo électrique. Les principaux sentiers partent de l'Eremo delle Carceri, à 12,2 km de La Mora, environ 20 minutes en voiture.",
          ],
          [
            "Pour une excursion d'une demi-journée, les ",
            { text: "Cascate delle Marmore", href: "/blog/cascate-delle-marmore/" },
            " sont à 77,3 km, environ 1 h 10 : une chute de 165 mètres en trois sauts, créée par les Romains près de Terni, avec l'eau lâchée seulement à des horaires fixés (à vérifier avant de partir). En hiver, le lac Trasimène vaut aussi le trajet : à Castiglione del Lago, à 64,3 km (environ 50 minutes), du 5 décembre 2026 au 6 janvier 2027 s'allume le ",
            { text: "sapin de Noël de lumières sur le lac Trasimène", href: "/blog/albero-di-natale-lago-trasimeno/" },
            ", long de 1 080 mètres.",
          ],
        ],
      },
    ],
    perugiaMore: [
      "En général de fin novembre à l'Épiphanie, le centre se remplit d'illuminations et de marchés de Noël : nous les présentons, avec Gubbio et le lac Trasimène, dans notre guide des ",
      { text: "marchés de Noël en Ombrie", href: "/blog/mercatini-di-natale-umbria/" },
      ".",
    ],
    onBlog: "Sur le blog",
  },
  de: {
    assisiIntro: [
      [
        "Von La Mora bis zur Piazza del Comune im Herzen von Assisi sind es 6,8 km, rund 14 Minuten mit dem Auto; die Basilika des Heiligen Franziskus liegt 7,5 km entfernt, rund 18 Minuten (Entfernungen laut Google Maps). In der Stadt erreicht man alles zu Fuß: die Basiliken, die Plätze, die beiden Festungen und die Heiligtümer direkt vor den Mauern.",
      ],
      [
        "Rund 1 km zu Fuß von der Basilika des Heiligen Franziskus, über die Via San Francesco, liegt das Santuario della Spogliazione, in dem ",
        { text: "der heilige Carlo Acutis, heiliggesprochen am 7. September 2025,", href: "/blog/carlo-acutis-assisi/" },
        " ruht. Bergab von der Piazza del Comune erreicht man in rund 21 Minuten zu Fuß (1,5 km) die ",
        { text: "Wallfahrtskirche San Damiano", href: "/blog/santuario-san-damiano/" },
        ", den Ort der Bekehrung des Franziskus, wo Klara einen Großteil ihres Lebens verbrachte. Für eine Pause vom Stein der Altstadt führt der ",
        { text: "Bosco di San Francesco des FAI", href: "/blog/bosco-san-francesco/" },
        " 1,5 km durch Olivenhaine und Wald hinab, von der Basilika bis zum Komplex Santa Croce.",
      ],
    ],
    pianaLabel: "In der Ebene",
    pianaHeading: "Santa Maria degli Angeli, Rivotorto und Bastia Umbra.",
    piana: [
      {
        heading: "Santa Maria degli Angeli und Rivotorto",
        paragraphs: [
          [
            "Das nächstgelegene Ziel ist auch eines der wichtigsten: 2,1 km von La Mora, in der Ebene unterhalb von Assisi, wurde die ",
            { text: "Basilika Santa Maria degli Angeli", href: "/blog/basilica-santa-maria-degli-angeli/" },
            " zwischen 1569 und 1679 nach einem Entwurf von Galeazzo Alessi um die Portiuncula errichtet, die kleine Kirche, in der der Heilige Franziskus den Franziskanerorden gründete. Im Inneren liegt auch die Transitus-Kapelle; der Eintritt ist frei.",
          ],
          [
            "In Rivotorto, einem weiteren Ortsteil von Assisi, liegt ",
            { text: "Villa Relax", href: "/villa-relax-assisi/" },
            ", die unabhängige Villa derselben Eigentümer wie La Mora: bis zu 16 Gäste in 6 Schlafzimmern, mit privatem Pool, 2 km von der Wallfahrtskirche Rivotorto. Für große Gruppen oder zwei Familien, die zusammen reisen, ist sie die Alternative zu den Apartments.",
          ],
        ],
      },
      {
        heading: "Bastia Umbra und Umbriafiere",
        paragraphs: [
          [
            "Das nächstgelegene Messegelände ist Umbriafiere in Bastia Umbra: 3,4 km von La Mora, rund 6 Minuten mit dem Auto. Hier finden unter anderem die ",
            { text: "Agriumbria, die nationale Messe für Landwirtschaft, Viehzucht und Ernährung", href: "/blog/agriumbria-umbriafiere/" },
            ", meist Ende März, und das ",
            { text: "Caccia Village, die Jagdmesse", href: "/blog/caccia-village-umbriafiere/" },
            ", meist Mitte Mai, statt. Für Geschäftsreisende ist La Mora ein ruhiger Ausgangspunkt auf dem Land, wenige Minuten von den Messehallen entfernt.",
          ],
        ],
      },
    ],
    dintorni: [
      {
        heading: "Orte in der Nähe",
        paragraphs: [
          ["Spello liegt 15,1 km entfernt, rund 18 Minuten mit dem Auto: ein mittelalterlicher Ort aus rosa Stein, weniger überlaufen als Assisi, bekannt für die Blumenfeste (Infiorate) im Juni."],
          [
            "In der Gemeinde Foligno liegt ",
            { text: "Rasiglia, das „kleine Venedig Umbriens“", href: "/blog/rasiglia-piccola-venezia-umbria/" },
            ", ein Dorf auf rund 600 Metern Höhe, durchzogen von Bächen, Kanälen und kleinen Wasserfällen: 36,5 km, rund 37 Minuten mit dem Auto. Weiter entfernt ist Gubbio (54,7 km, rund 42 Minuten) die Stadt des Rekord-Weihnachtsbaums aus Lichtern am Monte Ingino: mehr dazu in unserem Ratgeber zu den ",
            { text: "Weihnachtsmärkten in Umbrien", href: "/blog/mercatini-di-natale-umbria/" },
            ".",
          ],
        ],
      },
      {
        heading: "Natur, Seen und Wasserfälle",
        paragraphs: [
          [
            "Über Assisi erstreckt sich der ",
            { text: "Regionalpark Monte Subasio", href: "/blog/monte-subasio/" },
            ", mit dem Gipfel auf 1.290 Metern, Hochweiden und Wäldern, durch die Wege zum Wandern, Mountainbiken und E-Biken führen. Die wichtigsten Wege beginnen an der Eremo delle Carceri, 12,2 km von La Mora, rund 20 Minuten mit dem Auto.",
          ],
          [
            "Für einen Halbtagesausflug liegen die ",
            { text: "Wasserfälle von Marmore", href: "/blog/cascate-delle-marmore/" },
            " 77,3 km entfernt, rund 1 Stunde 10 Minuten: 165 Meter in drei Stufen, von den Römern bei Terni angelegt, mit Wasser nur zu festgelegten Zeiten (vorher prüfen). Im Winter lohnt auch der Trasimenische See die Fahrt: In Castiglione del Lago, 64,3 km entfernt (rund 50 Minuten), leuchtet vom 5. Dezember 2026 bis 6. Januar 2027 der ",
            { text: "Weihnachtsbaum aus Lichtern auf dem Trasimenischen See", href: "/blog/albero-di-natale-lago-trasimeno/" },
            ", 1.080 Meter lang.",
          ],
        ],
      },
    ],
    perugiaMore: [
      "Meist von Ende November bis zum Dreikönigstag füllt sich die Altstadt mit Weihnachtslichtern und -märkten: Wir stellen sie zusammen mit Gubbio und dem Trasimenischen See in unserem Ratgeber zu den ",
      { text: "Weihnachtsmärkten in Umbrien", href: "/blog/mercatini-di-natale-umbria/" },
      " vor.",
    ],
    onBlog: "Im Blog",
  },
};

/* "Approfondisci sul blog": TUTTI gli articoli, raggruppati per tema.
   Solo gli slug: titolo, estratto, copertina e credito arrivano da
   src/data/blog-posts.ts nella lingua corrente (nessun testo duplicato). */
const BLOG_GROUPS: { id: string; slugs: string[] }[] = [
  { id: "francescani", slugs: ["santuario-san-damiano", "basilica-santa-maria-degli-angeli", "carlo-acutis-assisi"] },
  { id: "natura", slugs: ["monte-subasio", "bosco-san-francesco", "cascate-delle-marmore", "rasiglia-piccola-venezia-umbria"] },
  {
    id: "eventi",
    slugs: ["eurochocolate-2026-dove-dormire", "mercatini-di-natale-umbria", "albero-di-natale-lago-trasimeno", "agriumbria-umbriafiere", "caccia-village-umbriafiere"],
  },
];

const BLOG_TEXT: Record<Locale, { label: string; heading: string; intro: string; groups: Record<string, string>; readMore: string; allArticles: string }> = {
  it: {
    label: "Dal blog de La Mora",
    heading: "Approfondisci sul blog",
    intro: "Le nostre guide ai luoghi di questa pagina: distanze da La Mora, come arrivare, orari e consigli pratici, luogo per luogo.",
    groups: { francescani: "Assisi e i luoghi francescani", natura: "Natura e gite di un giorno", eventi: "Eventi in Umbria" },
    readMore: "Leggi l'articolo",
    allArticles: "Tutti gli articoli del blog",
  },
  en: {
    label: "From La Mora's blog",
    heading: "Read more on the blog",
    intro: "Our guides to the places on this page: distances from La Mora, how to get there, opening times and practical tips, place by place.",
    groups: { francescani: "Assisi and the Franciscan places", natura: "Nature and day trips", eventi: "Events in Umbria" },
    readMore: "Read the article",
    allArticles: "All blog articles",
  },
  fr: {
    label: "Le blog de La Mora",
    heading: "Approfondir sur le blog",
    intro: "Nos guides des lieux de cette page : distances depuis La Mora, accès, horaires et conseils pratiques, lieu par lieu.",
    groups: { francescani: "Assise et les lieux franciscains", natura: "Nature et excursions d'une journée", eventi: "Événements en Ombrie" },
    readMore: "Lire l'article",
    allArticles: "Tous les articles du blog",
  },
  de: {
    label: "Aus dem Blog von La Mora",
    heading: "Mehr im Blog",
    intro: "Unsere Ratgeber zu den Orten auf dieser Seite: Entfernungen von La Mora, Anreise, Öffnungszeiten und praktische Tipps, Ort für Ort.",
    groups: { francescani: "Assisi und die franziskanischen Stätten", natura: "Natur und Tagesausflüge", eventi: "Veranstaltungen in Umbrien" },
    readMore: "Artikel lesen",
    allArticles: "Alle Blogartikel",
  },
};

const LINK_CLASS = "text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry";

/* Link verso Villa Relax: <a> pieno, non <Link> (confine La Mora <-> Villa,
   vedi rooms-widget-script.tsx). */
function Rich({ parts, locale }: { parts: RichText; locale: Locale }) {
  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") return <Fragment key={i}>{part}</Fragment>;
        const href = withLocale(locale, part.href);
        return part.href.startsWith("/villa-relax-assisi") ? (
          <a key={i} href={href} className={LINK_CLASS}>
            {part.text}
          </a>
        ) : (
          <Link key={i} href={href} className={LINK_CLASS}>
            {part.text}
          </Link>
        );
      })}
    </>
  );
}

function GuideBlocks({ blocks, locale }: { blocks: GuideBlock[]; locale: Locale }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
      {blocks.map((block) => (
        <div key={block.heading}>
          <h3 className="font-display text-[22px] font-normal leading-[1.25] text-ink">{block.heading}</h3>
          {block.paragraphs.map((p, i) => (
            <p key={i} className="mt-3 text-[14px] leading-[1.8] text-ink-soft">
              <Rich parts={p} locale={locale} />
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

/* Link all'articolo del luogo, con il titolo dell'articolo come testo. */
function PlaceArticleLink({ slug, locale, label }: { slug: string; locale: Locale; label: string }) {
  const post = getBlogPost(locale, slug);
  if (!post) return null;
  return (
    <p className="mt-3 text-[13px] leading-[1.6] text-ink-soft">
      {label}:{" "}
      <Link href={withLocale(locale, `/blog/${slug}/`)} className={LINK_CLASS}>
        {post.title}
      </Link>
    </p>
  );
}

function BlogCard({ post, locale, readMore }: { post: BlogPost; locale: Locale; readMore: string }) {
  return (
    <Link href={withLocale(locale, `/blog/${post.slug}/`)} className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          style={{ objectPosition: post.imagePosition }}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 340px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">{post.category}</span>
      <h4 className="mt-1.5 font-display text-[19px] leading-[1.3] text-ink [text-wrap:balance]">{post.title}</h4>
      <p className="mt-2 line-clamp-3 text-[13px] leading-[1.65] text-ink-soft">{post.excerpt}</p>
      {post.imageCredit && (
        <PhotoCreditLine credit={post.imageCredit} locale={locale} linked={false} className="mt-2 block text-[10px] leading-[1.4] text-ink-soft" />
      )}
      <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-raspberry">
        {readMore}
        <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

const ASSISI_PLACES: Record<Locale, Place[]> = {
  it: [
    { name: "Basilica di San Francesco", src: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilica di San Francesco ad Assisi", note: "Il cuore della città, patrimonio UNESCO: gli affreschi di Giotto nella Basilica Superiore sono tra i motivi principali per cui si viene ad Assisi.", maps: "basilica" },
    { name: "Basilica di Santa Maria degli Angeli", src: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg", article: "basilica-santa-maria-degli-angeli", alt: "Basilica di Santa Maria degli Angeli con la Porziuncola", note: "Custodisce al suo interno la Porziuncola, la piccola chiesa dove San Francesco fondò l'ordine francescano. A 2,1 km dalla struttura." },
    { name: "Eremo delle Carceri", src: "/images/territorio/assisi/eremo delle carceri assisi.jpg", article: "monte-subasio", alt: "Eremo delle Carceri sul Monte Subasio", note: "Il romitorio dove Francesco si ritirava in preghiera, immerso nel bosco del Monte Subasio: una tappa più silenziosa, lontana dal centro." },
    { name: "Bosco di San Francesco", src: "/images/territorio/assisi/bosco di san francesco assisi.jpg", article: "bosco-san-francesco", alt: "Bosco di San Francesco, area naturale protetta dal FAI", note: "Un percorso naturalistico gestito dal FAI, tra uliveti, bosco e il torrente Tescio: una passeggiata diversa dal centro storico." },
    { name: "Santuario di San Damiano", src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg", article: "santuario-san-damiano", alt: "Santuario di San Damiano nei dintorni di Assisi", note: "Dove Francesco udì il celebre invito a 'riparare la mia chiesa' e dove Chiara d'Assisi visse gran parte della sua vita." },
    { name: "Piazza del Comune", src: "/images/territorio/assisi/piazza del comune assisi.jpg", alt: "Piazza del Comune ad Assisi, con il Tempio di Minerva", note: "Il centro laico della città medievale, con il Tempio di Minerva e la Torre del Popolo: da qui si irradiano le vie del centro storico.", credit: "Berthold Werner, Wikimedia Commons (pubblico dominio)", maps: "piazzaDelComune" },
    { name: "Rocca Maggiore", src: "/images/territorio/assisi/rocca maggiore assisi.jpg", alt: "Rocca Maggiore, la fortezza medievale che domina Assisi", note: "La fortezza che domina Assisi dall'alto da otto secoli, con una vista che arriva fino alla Valle Umbra.", credit: "Superchilum, Wikimedia Commons (CC BY-SA 3.0)", maps: "roccaMaggiore" },
    { name: "Rocca Minore", src: "/images/territorio/assisi/rocca minore assisi.jpg", alt: "Rocca Minore, la fortificazione minore di Assisi verso nord-est", note: "La più piccola delle due rocche cittadine, verso nord-est: meno visitata, ma con la stessa vista sulla città.", credit: "LigaDue, Wikimedia Commons (CC BY 3.0)", maps: "roccaMinore" },
  ],
  en: [
    { name: "Basilica of St. Francis", src: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilica of St. Francis in Assisi", note: "The heart of the city, a UNESCO World Heritage Site: Giotto's frescoes in the Upper Basilica are among the main reasons people come to Assisi.", maps: "basilica" },
    { name: "Basilica of Santa Maria degli Angeli", src: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg", article: "basilica-santa-maria-degli-angeli", alt: "Basilica of Santa Maria degli Angeli with the Porziuncola", note: "Houses the Porziuncola, the small church where St. Francis founded the Franciscan order. 2.1 km from the property." },
    { name: "Eremo delle Carceri", src: "/images/territorio/assisi/eremo delle carceri assisi.jpg", article: "monte-subasio", alt: "Eremo delle Carceri hermitage on Monte Subasio", note: "The hermitage where Francis withdrew to pray, set in the woods of Monte Subasio: a quieter stop, away from the centre." },
    { name: "Bosco di San Francesco", src: "/images/territorio/assisi/bosco di san francesco assisi.jpg", article: "bosco-san-francesco", alt: "Bosco di San Francesco, a protected natural area run by FAI", note: "A nature trail managed by the FAI (Italian National Trust), through olive groves, woodland and the Tescio stream: a different kind of walk from the historic centre." },
    { name: "Sanctuary of San Damiano", src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg", article: "santuario-san-damiano", alt: "Sanctuary of San Damiano near Assisi", note: "Where Francis heard the famous call to 'repair my church' and where Clare of Assisi spent much of her life." },
    { name: "Piazza del Comune", src: "/images/territorio/assisi/piazza del comune assisi.jpg", alt: "Piazza del Comune in Assisi, with the Temple of Minerva", note: "The secular heart of the medieval city, with the Temple of Minerva and the Torre del Popolo: the streets of the historic centre radiate out from here.", credit: "Berthold Werner, Wikimedia Commons (public domain)", maps: "piazzaDelComune" },
    { name: "Rocca Maggiore", src: "/images/territorio/assisi/rocca maggiore assisi.jpg", alt: "Rocca Maggiore, the medieval fortress overlooking Assisi", note: "The fortress that has overlooked Assisi for eight centuries, with a view reaching all the way to the Valle Umbra.", credit: "Superchilum, Wikimedia Commons (CC BY-SA 3.0)", maps: "roccaMaggiore" },
    { name: "Rocca Minore", src: "/images/territorio/assisi/rocca minore assisi.jpg", alt: "Rocca Minore, the smaller fortification of Assisi to the north-east", note: "The smaller of the town's two fortresses, to the north-east: less visited, but with the same view over the city.", credit: "LigaDue, Wikimedia Commons (CC BY 3.0)", maps: "roccaMinore" },
  ],
  fr: [
    { name: "Basilique Saint-François", src: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilique Saint-François à Assise", note: "Le cœur de la ville, patrimoine de l'UNESCO : les fresques de Giotto dans la basilique supérieure sont l'une des principales raisons de venir à Assise.", maps: "basilica" },
    { name: "Basilique Sainte-Marie-des-Anges", src: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg", article: "basilica-santa-maria-degli-angeli", alt: "Basilique Sainte-Marie-des-Anges avec la Portioncule", note: "Elle abrite la Portioncule, la petite église où Saint François fonda l'ordre franciscain. À 2,1 km de la structure." },
    { name: "Ermitage des Carceri", src: "/images/territorio/assisi/eremo delle carceri assisi.jpg", article: "monte-subasio", alt: "Ermitage des Carceri sur le Mont Subasio", note: "L'ermitage où François se retirait pour prier, niché dans les bois du Mont Subasio : une étape plus silencieuse, loin du centre." },
    { name: "Bosco di San Francesco", src: "/images/territorio/assisi/bosco di san francesco assisi.jpg", article: "bosco-san-francesco", alt: "Bosco di San Francesco, zone naturelle protégée par le FAI", note: "Un parcours naturaliste géré par le FAI, entre oliveraies, bois et le torrent Tescio : une promenade différente du centre historique." },
    { name: "Sanctuaire de San Damiano", src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg", article: "santuario-san-damiano", alt: "Sanctuaire de San Damiano aux environs d'Assise", note: "Là où François entendit le célèbre appel à « réparer mon église » et où Claire d'Assise passa une grande partie de sa vie." },
    { name: "Piazza del Comune", src: "/images/territorio/assisi/piazza del comune assisi.jpg", alt: "Piazza del Comune à Assise, avec le temple de Minerve", note: "Le centre laïc de la ville médiévale, avec le temple de Minerve et la Torre del Popolo : c'est d'ici que rayonnent les rues du centre historique.", credit: "Berthold Werner, Wikimedia Commons (domaine public)", maps: "piazzaDelComune" },
    { name: "Rocca Maggiore", src: "/images/territorio/assisi/rocca maggiore assisi.jpg", alt: "Rocca Maggiore, la forteresse médiévale qui domine Assise", note: "La forteresse qui domine Assise depuis huit siècles, avec une vue qui s'étend jusqu'à la Valle Umbra.", credit: "Superchilum, Wikimedia Commons (CC BY-SA 3.0)", maps: "roccaMaggiore" },
    { name: "Rocca Minore", src: "/images/territorio/assisi/rocca minore assisi.jpg", alt: "Rocca Minore, la fortification mineure d'Assise vers le nord-est", note: "La plus petite des deux forteresses de la ville, vers le nord-est : moins visitée, mais avec la même vue sur la ville.", credit: "LigaDue, Wikimedia Commons (CC BY 3.0)", maps: "roccaMinore" },
  ],
  de: [
    { name: "Basilika des Heiligen Franziskus", src: "/images/territorio/assisi/basilica di assisi.jpg", alt: "Basilika des Heiligen Franziskus in Assisi", note: "Das Herz der Stadt, UNESCO-Welterbe: Giottos Fresken in der Oberkirche gehören zu den Hauptgründen, warum man nach Assisi kommt.", maps: "basilica" },
    { name: "Basilika Santa Maria degli Angeli", src: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg", article: "basilica-santa-maria-degli-angeli", alt: "Basilika Santa Maria degli Angeli mit der Portiuncula", note: "Beherbergt die Portiuncula, die kleine Kirche, in der der Heilige Franziskus den Franziskanerorden gründete. 2,1 km von der Unterkunft entfernt." },
    { name: "Eremo delle Carceri", src: "/images/territorio/assisi/eremo delle carceri assisi.jpg", article: "monte-subasio", alt: "Einsiedelei Eremo delle Carceri auf dem Monte Subasio", note: "Die Einsiedelei, in die sich Franziskus zum Gebet zurückzog, mitten in den Wäldern des Monte Subasio: ein ruhigerer Ort, abseits des Zentrums." },
    { name: "Bosco di San Francesco", src: "/images/territorio/assisi/bosco di san francesco assisi.jpg", article: "bosco-san-francesco", alt: "Bosco di San Francesco, ein vom FAI geschütztes Naturgebiet", note: "Ein vom FAI (italienischer Nationaltrust) verwalteter Naturpfad durch Olivenhaine, Wald und den Bach Tescio: ein anderer Spaziergang als die Altstadt." },
    { name: "Wallfahrtskirche San Damiano", src: "/images/territorio/assisi/santuario san-damiano-assisi.jpg", article: "santuario-san-damiano", alt: "Wallfahrtskirche San Damiano bei Assisi", note: "Wo Franziskus den berühmten Ruf hörte, „meine Kirche wieder aufzubauen“, und wo Klara von Assisi einen Großteil ihres Lebens verbrachte." },
    { name: "Piazza del Comune", src: "/images/territorio/assisi/piazza del comune assisi.jpg", alt: "Piazza del Comune in Assisi, mit dem Minerva-Tempel", note: "Das weltliche Zentrum der mittelalterlichen Stadt, mit dem Minerva-Tempel und dem Torre del Popolo: von hier strahlen die Gassen der Altstadt aus.", credit: "Berthold Werner, Wikimedia Commons (gemeinfrei)", maps: "piazzaDelComune" },
    { name: "Rocca Maggiore", src: "/images/territorio/assisi/rocca maggiore assisi.jpg", alt: "Rocca Maggiore, die mittelalterliche Festung über Assisi", note: "Die Festung, die seit acht Jahrhunderten über Assisi thront, mit einem Ausblick bis in die Valle Umbra.", credit: "Superchilum, Wikimedia Commons (CC BY-SA 3.0)", maps: "roccaMaggiore" },
    { name: "Rocca Minore", src: "/images/territorio/assisi/rocca minore assisi.jpg", alt: "Rocca Minore, die kleinere Festung von Assisi im Nordosten", note: "Die kleinere der beiden Festungen der Stadt, im Nordosten: weniger besucht, aber mit demselben Blick über die Stadt.", credit: "LigaDue, Wikimedia Commons (CC BY 3.0)", maps: "roccaMinore" },
  ],
};

const DINTORNI_PLACES: Record<Locale, Place[]> = {
  it: [
    { name: "Monte Subasio", src: "/images/territorio/dintorni/monte subasio alto.jpg", article: "monte-subasio", alt: "Monte Subasio, il massiccio che domina Assisi", note: "Il parco naturale che sovrasta Assisi: sentieri per camminare o pedalare, e i pascoli d'altura che hanno dato il nome al formaggio locale." },
    { name: "Cascate delle Marmore", src: "/images/territorio/dintorni/cascate delle marmore.jpg", article: "cascate-delle-marmore", alt: "Cascate delle Marmore in Umbria", note: "Tra le cascate più alte d'Europa, a 77 km, poco più di un'ora d'auto: una gita di mezza giornata per chi si ferma qualche notte in più." },
  ],
  en: [
    { name: "Monte Subasio", src: "/images/territorio/dintorni/monte subasio alto.jpg", article: "monte-subasio", alt: "Monte Subasio, the massif overlooking Assisi", note: "The natural park that rises above Assisi: trails for walking or cycling, and the upland pastures that gave the local cheese its name." },
    { name: "Marmore Falls", src: "/images/territorio/dintorni/cascate delle marmore.jpg", article: "cascate-delle-marmore", alt: "Marmore Falls in Umbria", note: "Among the highest waterfalls in Europe, 77 km away, just over an hour by car: a half-day trip for those staying a few extra nights." },
  ],
  fr: [
    { name: "Mont Subasio", src: "/images/territorio/dintorni/monte subasio alto.jpg", article: "monte-subasio", alt: "Mont Subasio, le massif qui domine Assise", note: "Le parc naturel qui surplombe Assise : des sentiers pour marcher ou pédaler, et les pâturages d'altitude qui ont donné son nom au fromage local." },
    { name: "Cascate delle Marmore", src: "/images/territorio/dintorni/cascate delle marmore.jpg", article: "cascate-delle-marmore", alt: "Cascate delle Marmore en Ombrie", note: "Parmi les plus hautes cascades d'Europe, à 77 km, un peu plus d'une heure de route : une excursion d'une demi-journée pour ceux qui restent quelques nuits de plus." },
  ],
  de: [
    { name: "Monte Subasio", src: "/images/territorio/dintorni/monte subasio alto.jpg", article: "monte-subasio", alt: "Monte Subasio, das Massiv über Assisi", note: "Der Naturpark, der über Assisi liegt: Wander- und Radwege sowie die Hochweiden, die dem lokalen Käse seinen Namen gaben." },
    { name: "Wasserfälle von Marmore", src: "/images/territorio/dintorni/cascate delle marmore.jpg", article: "cascate-delle-marmore", alt: "Wasserfälle von Marmore in Umbrien", note: "Einer der höchsten Wasserfälle Europas, 77 km entfernt, gut eine Autostunde: ein Halbtagesausflug für alle, die ein paar Nächte länger bleiben." },
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
    perugiaLabel: string;
    perugiaHeading: string;
    perugiaBody: string;
    perugiaEvent: string;
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
    heroBody: "La Mora è a 6,8 km dal centro di Assisi (circa 14 minuti in auto), in posizione comoda anche per Santa Maria degli Angeli (2,1 km), Spello e Perugia (21,0 km). Una base per muoversi, non solo per dormire.",
    assisiLabel: "Assisi",
    assisiHeading: "La città di Francesco, a 6,8 km dalla struttura.",
    fotoWord: "Foto",
    dintorniLabel: "Dintorni",
    dintorniHeading: "Oltre Assisi, l'Umbria che si scopre in giornata.",
    perugiaLabel: "Perugia",
    perugiaHeading: "Il capoluogo umbro, a 23 minuti d'auto.",
    perugiaBody: "Il centro storico di Perugia è a 21,0 km da La Mora, circa 23 minuti in auto. La città ha un centro su un colle, l'Acquedotto medievale trasformato in passeggiata sospesa e una vita universitaria che la rende diversa, più mossa, rispetto ad Assisi. L'aeroporto dell'Umbria (Perugia San Francesco d'Assisi) è a 11,4 km, circa 11 minuti in auto.",
    perugiaEvent: "Eurochocolate 2026 a Perugia (13–22 novembre): date, programma e dove dormire →",
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
    heroBody: "La Mora is 6.8 km from the centre of Assisi (about 14 minutes by car), in a convenient position for Santa Maria degli Angeli (2.1 km), Spello and Perugia (21.0 km) too. A base to move around from, not just to sleep in.",
    assisiLabel: "Assisi",
    assisiHeading: "The city of Francis, 6.8 km from the property.",
    fotoWord: "Photo",
    dintorniLabel: "Nearby",
    dintorniHeading: "Beyond Assisi, the Umbria you can discover in a day.",
    perugiaLabel: "Perugia",
    perugiaHeading: "Umbria's capital, 23 minutes by car.",
    perugiaBody: "The historic centre of Perugia is 21.0 km from La Mora, about 23 minutes by car. The city has a hilltop centre, the medieval aqueduct turned into a suspended walkway, and a university life that makes it different, livelier, than Assisi. Umbria airport (Perugia San Francesco d'Assisi) is 11.4 km away, about 11 minutes by car.",
    perugiaEvent: "Eurochocolate 2026 in Perugia (13–22 November): dates, programme and where to stay →",
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
    heroBody: "La Mora est à 6,8 km du centre d'Assise (environ 14 minutes en voiture), dans une position pratique aussi pour Santa Maria degli Angeli (2,1 km), Spello et Pérouse (21,0 km). Une base pour se déplacer, pas seulement pour dormir.",
    assisiLabel: "Assise",
    assisiHeading: "La ville de François, à 6,8 km de la structure.",
    fotoWord: "Photo",
    dintorniLabel: "Aux alentours",
    dintorniHeading: "Au-delà d'Assise, l'Ombrie à découvrir en une journée.",
    perugiaLabel: "Pérouse",
    perugiaHeading: "Le chef-lieu de l'Ombrie, à 23 minutes en voiture.",
    perugiaBody: "Le centre historique de Pérouse est à 21,0 km de La Mora, environ 23 minutes en voiture. La ville a un centre perché sur une colline, l'aqueduc médiéval transformé en promenade suspendue et une vie universitaire qui la rend différente, plus animée, qu'Assise. L'aéroport d'Ombrie (Pérouse Saint-François-d'Assise) est à 11,4 km, environ 11 minutes en voiture.",
    perugiaEvent: "Eurochocolate 2026 à Pérouse (13–22 novembre) : dates, programme et où dormir →",
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
    heroBody: "La Mora liegt 6,8 km vom Zentrum Assisis entfernt (rund 14 Minuten mit dem Auto), auch praktisch gelegen für Santa Maria degli Angeli (2,1 km), Spello und Perugia (21,0 km). Eine Basis zum Erkunden, nicht nur zum Schlafen.",
    assisiLabel: "Assisi",
    assisiHeading: "Die Stadt des Franziskus, 6,8 km von der Unterkunft entfernt.",
    fotoWord: "Foto",
    dintorniLabel: "Umgebung",
    dintorniHeading: "Jenseits von Assisi: das Umbrien, das man an einem Tag entdeckt.",
    perugiaLabel: "Perugia",
    perugiaHeading: "Die umbrische Hauptstadt, 23 Autominuten entfernt.",
    perugiaBody: "Die Altstadt von Perugia liegt 21,0 km von La Mora entfernt, rund 23 Minuten mit dem Auto. Die Stadt hat ein Zentrum auf einem Hügel, das mittelalterliche Aquädukt, das zu einem erhöhten Spazierweg umgebaut wurde, und ein Universitätsleben, das sie anders, lebendiger als Assisi macht. Der Flughafen Umbrien (Perugia San Francesco d'Assisi) liegt 11,4 km entfernt, rund 11 Autominuten.",
    perugiaEvent: "Eurochocolate 2026 in Perugia (13.–22. November): Termine, Programm und Unterkunft →",
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
  const guide = GUIDE[locale];
  const blog = BLOG_TEXT[locale];

  return (
    <>
      <StructuredData locale={locale} path="/territorio/" />
      <section className="relative flex h-[64vh] min-h-[460px] items-end overflow-hidden">
        <WatermarkedImage
          src="/images/territorio/assisi/assisi con tramonto.jpg"
          alt="Assisi al tramonto vista dalla campagna umbra"
          fill
          priority
          fetchPriority="high"
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
            {guide.assisiIntro.map((p, i) => (
              <p key={i} className="mt-5 max-w-[720px] text-[15px] leading-[1.8] text-ink-soft">
                <Rich parts={p} locale={locale} />
              </p>
            ))}
          </Reveal>

          <div className="mt-10 space-y-14">
            {assisiPlaces.map((place, i) => (
              <Reveal key={place.name} delay={i * 40}>
                <div className={`grid grid-cols-1 items-center gap-8 sm:grid-cols-2 ${i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                    {/* Foto di terzi con credito (Wikimedia): niente logo La Mora sopra. */}
                    {place.credit ? (
                      <Image src={place.src} alt={place.alt} fill sizes="(max-width: 640px) 100vw, 500px" className="object-cover" />
                    ) : (
                      <WatermarkedImage src={place.src} alt={place.alt} fill sizes="(max-width: 640px) 100vw, 500px" className="object-cover" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-[22px] font-normal text-ink">{place.name}</h3>
                    <p className="mt-3 text-[14px] leading-[1.75] text-ink-soft">{place.note}</p>
                    {place.article && <PlaceArticleLink slug={place.article} locale={locale} label={guide.onBlog} />}
                    {place.maps && <MapsButton place={getPlace(place.maps)} locale={locale} className="mt-4" />}
                    {place.credit && (
                      <p className="mt-3 text-[11px] text-ink-soft">
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
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{guide.pianaLabel}</span>
            <h2 className="mt-4 max-w-[640px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {guide.pianaHeading}
            </h2>
            <GuideBlocks blocks={guide.piana} locale={locale} />
            <MapsButton place={getPlace("umbriafiere")} locale={locale} showName className="mt-6" />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.dintorniLabel}</span>
            <h2 className="mt-4 max-w-[600px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.dintorniHeading}
            </h2>
            <GuideBlocks blocks={guide.dintorni} locale={locale} />
            <div className="mt-6 flex flex-wrap gap-2.5">
              <MapsButton place={getPlace("spello")} locale={locale} showName />
              <MapsButton place={getPlace("rasiglia")} locale={locale} showName />
              <MapsButton place={getPlace("gubbio")} locale={locale} showName />
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {dintorniPlaces.map((place, i) => (
              <Reveal key={place.name} delay={i * 60}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                  <WatermarkedImage src={place.src} alt={place.alt} fill sizes="(max-width: 640px) 100vw, 500px" className="object-cover" />
                </div>
                <h3 className="mt-4 font-display text-[20px] font-normal text-ink">{place.name}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">{place.note}</p>
                {place.article && <PlaceArticleLink slug={place.article} locale={locale} label={guide.onBlog} />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{text.perugiaLabel}</span>
            <h2 className="mt-4 max-w-[600px] font-display text-[clamp(26px,3vw,36px)] font-normal leading-[1.2] text-ink [text-wrap:balance]">
              {text.perugiaHeading}
            </h2>
            <p className="mt-5 max-w-[640px] text-[14px] leading-[1.75] text-ink-soft">{text.perugiaBody}</p>
            <p className="mt-4 max-w-[640px] text-[14px] leading-[1.75] text-ink-soft">
              <Rich parts={guide.perugiaMore} locale={locale} />
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <MapsButton place={getPlace("perugia")} locale={locale} showName />
              <MapsButton place={getPlace("aeroporto")} locale={locale} showName />
            </div>
            <p className="mt-5 max-w-[640px] text-[14px] leading-[1.75] text-ink-soft">
              <Link
                href={withLocale(locale, `/blog/${EUROCHOCOLATE_2026.articleSlug}/`)}
                className="text-raspberry underline decoration-raspberry/30 underline-offset-4 hover:decoration-raspberry"
              >
                {text.perugiaEvent}
              </Link>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-[3px]">
              <WatermarkedImage
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

      <section className="bg-cream py-14 sm:py-16">
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

      <section aria-labelledby="territorio-blog-heading" className="bg-cream-dim py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">{blog.label}</span>
            <h2 id="territorio-blog-heading" className="mt-4 font-display text-[clamp(30px,3.6vw,42px)] font-normal leading-[1.15] text-ink">
              {blog.heading}
            </h2>
            <p className="mt-4 max-w-[640px] text-[15px] leading-[1.75] text-ink-soft">{blog.intro}</p>
          </Reveal>
          {BLOG_GROUPS.map((group) => {
            const posts = group.slugs.map((slug) => getBlogPost(locale, slug)).filter((p): p is BlogPost => Boolean(p));
            if (posts.length === 0) return null;
            return (
              <div key={group.id} className="mt-12 border-t border-ink/10 pt-10">
                <h3 className="font-display text-[24px] font-normal leading-[1.2] text-ink">{blog.groups[group.id]}</h3>
                {/* Un solo Reveal per gruppo, non uno per card: meno
                    componenti client da idratare in una pagina già lunga. */}
                <Reveal>
                  <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                      <li key={post.slug}>
                        <BlogCard post={post} locale={locale} readMore={blog.readMore} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
          <div className="mt-12">
            <Link href={withLocale(locale, "/blog/")} className={`text-[13px] font-semibold ${LINK_CLASS}`}>
              {blog.allArticles} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

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
