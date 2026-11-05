import type { Locale } from "@/lib/i18n";

/* Testi alternativi delle foto nelle pagine, nelle 4 lingue: un solo punto dati,
   riusato dove la stessa foto (o la stessa frase) compare in più pagine. Le
   gallerie di appartamenti e Villa hanno gli alt accanto alla foto, nei loro
   dati; blog e territorio li hanno già per lingua nei loro testi.
   Costanti separate, non un unico oggetto: a ogni pagina arriva solo quel che usa.
   Traduzioni fedeli dell'italiano: nessuna informazione in più. */
export type LocalizedAlt = Record<Locale, string>;

/* Piscina */
export const ALT_POOL: LocalizedAlt = {
  it: "Piscina di Agriturismo La Mora",
  en: "Agriturismo La Mora pool",
  fr: "Piscine de l'Agriturismo La Mora",
  de: "Pool von Agriturismo La Mora",
};
export const ALT_POOL_PANORAMIC: LocalizedAlt = {
  it: "Piscina panoramica di Agriturismo La Mora",
  en: "Panoramic pool of Agriturismo La Mora",
  fr: "Piscine panoramique de l'Agriturismo La Mora",
  de: "Panorama-Pool von Agriturismo La Mora",
};
export const ALT_POOL_PANORAMIC_SIDE: LocalizedAlt = {
  it: "Piscina panoramica di Agriturismo La Mora, vista laterale",
  en: "Panoramic pool of Agriturismo La Mora, side view",
  fr: "Piscine panoramique de l'Agriturismo La Mora, vue latérale",
  de: "Panorama-Pool von Agriturismo La Mora, Seitenansicht",
};
export const ALT_POOL_PANORAMIC_DAY: LocalizedAlt = {
  it: "La piscina panoramica di Agriturismo La Mora vista di giorno",
  en: "The panoramic pool of Agriturismo La Mora by day",
  fr: "La piscine panoramique de l'Agriturismo La Mora de jour",
  de: "Der Panorama-Pool von Agriturismo La Mora bei Tag",
};
export const ALT_POOL_DAY: LocalizedAlt = {
  it: "Piscina di Agriturismo La Mora durante il giorno",
  en: "Agriturismo La Mora pool during the day",
  fr: "Piscine de l'Agriturismo La Mora en journée",
  de: "Pool von Agriturismo La Mora am Tag",
};
export const ALT_POOL_EVENING: LocalizedAlt = {
  it: "Piscina di Agriturismo La Mora illuminata di sera",
  en: "Agriturismo La Mora pool lit up in the evening",
  fr: "Piscine de l'Agriturismo La Mora illuminée le soir",
  de: "Pool von Agriturismo La Mora, abends beleuchtet",
};
export const ALT_POOL_SIDE: LocalizedAlt = {
  it: "Vista laterale della piscina",
  en: "Side view of the pool",
  fr: "Vue latérale de la piscine",
  de: "Seitenansicht des Pools",
};
export const ALT_POOL_RELAX: LocalizedAlt = {
  it: "Area relax accanto alla piscina di Agriturismo La Mora",
  en: "Relaxation area next to the pool at Agriturismo La Mora",
  fr: "Espace détente à côté de la piscine de l'Agriturismo La Mora",
  de: "Ruhebereich neben dem Pool von Agriturismo La Mora",
};
export const ALT_POOLSIDE_CHAIRS: LocalizedAlt = {
  it: "Sedie a bordo piscina di Agriturismo La Mora",
  en: "Poolside chairs at Agriturismo La Mora",
  fr: "Chaises au bord de la piscine de l'Agriturismo La Mora",
  de: "Stühle am Pool von Agriturismo La Mora",
};

/* Struttura, giardino e attività */
export const ALT_AERIAL_COUNTRYSIDE: LocalizedAlt = {
  it: "Agriturismo La Mora visto dall'alto, nella campagna umbra vicino Assisi",
  en: "Agriturismo La Mora from above, in the Umbrian countryside near Assisi",
  fr: "L'Agriturismo La Mora vu d'en haut, dans la campagne ombrienne près d'Assise",
  de: "Agriturismo La Mora von oben, in der umbrischen Landschaft nahe Assisi",
};
export const ALT_AERIAL_ASSISI: LocalizedAlt = {
  it: "Vista dall'alto di Agriturismo La Mora, Assisi",
  en: "View from above of Agriturismo La Mora, Assisi",
  fr: "Vue d'en haut de l'Agriturismo La Mora, Assise",
  de: "Blick von oben auf Agriturismo La Mora, Assisi",
};
export const ALT_FARMHOUSE_AERIAL: LocalizedAlt = {
  it: "Il casale di Agriturismo La Mora visto dall'alto",
  en: "The Agriturismo La Mora farmhouse from above",
  fr: "La ferme de l'Agriturismo La Mora vue d'en haut",
  de: "Das Landhaus von Agriturismo La Mora von oben",
};
export const ALT_ENTRANCE: LocalizedAlt = {
  it: "Ingresso di Agriturismo La Mora",
  en: "Entrance of Agriturismo La Mora",
  fr: "Entrée de l'Agriturismo La Mora",
  de: "Eingang von Agriturismo La Mora",
};
export const ALT_ENTRANCE_CART: LocalizedAlt = {
  it: "Ingresso di Agriturismo La Mora con carretto d'epoca",
  en: "Entrance of Agriturismo La Mora with a vintage cart",
  fr: "Entrée de l'Agriturismo La Mora avec une charrette d'époque",
  de: "Eingang von Agriturismo La Mora mit historischem Karren",
};
export const ALT_COMMON_INTERIOR: LocalizedAlt = {
  it: "Interno arredato di uno degli spazi comuni di Agriturismo La Mora",
  en: "Furnished interior of one of the shared spaces at Agriturismo La Mora",
  fr: "Intérieur meublé de l'un des espaces communs de l'Agriturismo La Mora",
  de: "Möblierter Innenraum eines der Gemeinschaftsbereiche von Agriturismo La Mora",
};
export const ALT_GARDEN_CORNER: LocalizedAlt = {
  it: "Angolo di giardino di Agriturismo La Mora",
  en: "Corner of the garden at Agriturismo La Mora",
  fr: "Coin de jardin de l'Agriturismo La Mora",
  de: "Gartenecke von Agriturismo La Mora",
};
export const ALT_LAWN: LocalizedAlt = {
  it: "Prato verde di Agriturismo La Mora",
  en: "Green lawn of Agriturismo La Mora",
  fr: "Pelouse verte de l'Agriturismo La Mora",
  de: "Grüne Wiese von Agriturismo La Mora",
};
export const ALT_PLAYGROUND: LocalizedAlt = {
  it: "Parco giochi per bambini di Agriturismo La Mora",
  en: "Children's playground at Agriturismo La Mora",
  fr: "Aire de jeux pour enfants de l'Agriturismo La Mora",
  de: "Kinderspielplatz von Agriturismo La Mora",
};
export const ALT_KIDS_AREA: LocalizedAlt = {
  it: "Area giochi per bambini di Agriturismo La Mora",
  en: "Children's play area at Agriturismo La Mora",
  fr: "Espace de jeux pour enfants de l'Agriturismo La Mora",
  de: "Spielbereich für Kinder von Agriturismo La Mora",
};
export const ALT_FOOTBALL_GARDEN: LocalizedAlt = {
  it: "Campo da calcio e giardino di Agriturismo La Mora",
  en: "Football pitch and garden at Agriturismo La Mora",
  fr: "Terrain de football et jardin de l'Agriturismo La Mora",
  de: "Fußballplatz und Garten von Agriturismo La Mora",
};
export const ALT_HORSE: LocalizedAlt = {
  it: "Uno dei cavalli dell'azienda agricola di Agriturismo La Mora",
  en: "One of the horses on the Agriturismo La Mora farm",
  fr: "L'un des chevaux de l'exploitation agricole de l'Agriturismo La Mora",
  de: "Eines der Pferde auf dem Hof von Agriturismo La Mora",
};
export const ALT_HORSES: LocalizedAlt = {
  it: "I cavalli di Agriturismo La Mora",
  en: "The horses of Agriturismo La Mora",
  fr: "Les chevaux de l'Agriturismo La Mora",
  de: "Die Pferde von Agriturismo La Mora",
};
export const ALT_EBIKE_RENTAL: LocalizedAlt = {
  it: "Noleggio e-bike di Agriturismo La Mora",
  en: "E-bike rental at Agriturismo La Mora",
  fr: "Location de vélos électriques à l'Agriturismo La Mora",
  de: "E-Bike-Verleih im Agriturismo La Mora",
};
export const ALT_GUESTS_EBIKE: LocalizedAlt = {
  it: "Ospiti in e-bike sulla strada di campagna vicino ad Agriturismo La Mora",
  en: "Guests on e-bikes on the country road near Agriturismo La Mora",
  fr: "Hôtes à vélo électrique sur la route de campagne près de l'Agriturismo La Mora",
  de: "Gäste auf E-Bikes auf der Landstraße nahe Agriturismo La Mora",
};
export const ALT_EV_CHARGER: LocalizedAlt = {
  it: "Colonnina di ricarica per auto elettriche nel parcheggio di Agriturismo La Mora",
  en: "Electric car charging point in the Agriturismo La Mora car park",
  fr: "Borne de recharge pour voitures électriques sur le parking de l'Agriturismo La Mora",
  de: "Ladestation für Elektroautos auf dem Parkplatz von Agriturismo La Mora",
};
export const ALT_SMARTBOX: LocalizedAlt = {
  it: "Agriturismo La Mora, la struttura che ti aspetta con il tuo cofanetto Smartbox",
  en: "Agriturismo La Mora, the property waiting for you with your Smartbox voucher",
  fr: "L'Agriturismo La Mora, l'établissement qui vous attend avec votre coffret Smartbox",
  de: "Agriturismo La Mora, die Unterkunft, die Sie mit Ihrer Smartbox erwartet",
};

/* Appartamenti e colazione */
export const ALT_APARTMENT_KITCHEN: LocalizedAlt = {
  it: "Cucina arredata di uno degli appartamenti di Agriturismo La Mora",
  en: "Furnished kitchen in one of the Agriturismo La Mora apartments",
  fr: "Cuisine aménagée de l'un des appartements de l'Agriturismo La Mora",
  de: "Eingerichtete Küche in einem der Apartments von Agriturismo La Mora",
};
export const ALT_APARTMENT_KITCHEN_SHORT: LocalizedAlt = {
  it: "Cucina arredata di uno degli appartamenti",
  en: "Furnished kitchen in one of the apartments",
  fr: "Cuisine aménagée de l'un des appartements",
  de: "Eingerichtete Küche in einem der Apartments",
};
export const ALT_SAGITTARIO_GAZEBO: LocalizedAlt = {
  it: "Gazebo esterno privato dell'appartamento Sagittario, Agriturismo La Mora",
  en: "Private outdoor gazebo of the Sagittario apartment, Agriturismo La Mora",
  fr: "Gazebo extérieur privé de l'appartement Sagittario, Agriturismo La Mora",
  de: "Privater Außenpavillon des Apartments Sagittario, Agriturismo La Mora",
};
export const ALT_BREAKFAST: LocalizedAlt = {
  it: "Colazione biologica servita ad Agriturismo La Mora",
  en: "Organic breakfast served at Agriturismo La Mora",
  fr: "Petit-déjeuner biologique servi à l'Agriturismo La Mora",
  de: "Bio-Frühstück im Agriturismo La Mora",
};
export const ALT_BREAKFAST_ROOM: LocalizedAlt = {
  it: "Sala comune con la colazione pronta ad Agriturismo La Mora",
  en: "Shared room with breakfast ready at Agriturismo La Mora",
  fr: "Salle commune avec le petit-déjeuner prêt à l'Agriturismo La Mora",
  de: "Gemeinschaftsraum mit angerichtetem Frühstück im Agriturismo La Mora",
};

/* Territorio */
export const ALT_ASSISI_SUNSET: LocalizedAlt = {
  it: "Assisi al tramonto, vista dalla campagna umbra",
  en: "Assisi at sunset, seen from the Umbrian countryside",
  fr: "Assise au coucher du soleil, vue de la campagne ombrienne",
  de: "Assisi bei Sonnenuntergang, von der umbrischen Landschaft aus gesehen",
};
export const ALT_BASILICA_SAN_FRANCESCO: LocalizedAlt = {
  it: "Basilica di San Francesco d'Assisi",
  en: "Basilica of Saint Francis of Assisi",
  fr: "Basilique Saint-François d'Assise",
  de: "Basilika des heiligen Franziskus von Assisi",
};
export const ALT_BASILICA_DISTANCE: LocalizedAlt = {
  it: "Basilica di San Francesco ad Assisi, a 7,5 km da Agriturismo La Mora",
  en: "Basilica of Saint Francis in Assisi, 7.5 km from Agriturismo La Mora",
  fr: "Basilique Saint-François à Assise, à 7,5 km de l'Agriturismo La Mora",
  de: "Basilika des heiligen Franziskus in Assisi, 7,5 km von Agriturismo La Mora entfernt",
};
export const ALT_SANTA_MARIA_ANGELI: LocalizedAlt = {
  it: "Basilica di Santa Maria degli Angeli, vicino Assisi",
  en: "Basilica of Santa Maria degli Angeli, near Assisi",
  fr: "Basilique Sainte-Marie-des-Anges, près d'Assise",
  de: "Basilika Santa Maria degli Angeli, nahe Assisi",
};
export const ALT_EREMO_NEAR_ASSISI: LocalizedAlt = {
  it: "Eremo delle Carceri sul Monte Subasio, vicino Assisi",
  en: "Eremo delle Carceri on Monte Subasio, near Assisi",
  fr: "Ermitage des Carceri sur le mont Subasio, près d'Assise",
  de: "Eremo delle Carceri auf dem Monte Subasio, nahe Assisi",
};
export const ALT_EREMO_SUBASIO: LocalizedAlt = {
  it: "Eremo delle Carceri, sul Monte Subasio ad Assisi",
  en: "Eremo delle Carceri, on Monte Subasio in Assisi",
  fr: "Ermitage des Carceri, sur le mont Subasio à Assise",
  de: "Eremo delle Carceri, auf dem Monte Subasio in Assisi",
};
export const ALT_PERUGIA_AERIAL: LocalizedAlt = {
  it: "Perugia vista dall'alto, capoluogo dell'Umbria",
  en: "Perugia from above, the capital of Umbria",
  fr: "Pérouse vue d'en haut, chef-lieu de l'Ombrie",
  de: "Perugia von oben, die Hauptstadt Umbriens",
};
export const ALT_PERUGIA_CENTRE: LocalizedAlt = {
  it: "Vista dall'alto del centro storico di Perugia",
  en: "View from above of Perugia's historic centre",
  fr: "Vue d'en haut du centre historique de Pérouse",
  de: "Blick von oben auf die Altstadt von Perugia",
};
export const ALT_CENTENARY_ASSISI: LocalizedAlt = {
  it: "Assisi durante le celebrazioni per l'Ottavo Centenario di San Francesco",
  en: "Assisi during the celebrations for the 8th Centenary of St. Francis",
  fr: "Assise pendant les célébrations du huitième centenaire de saint François",
  de: "Assisi während der Feierlichkeiten zum 800. Todestag des Heiligen Franziskus",
};
export const ALT_SAINT_FRANCIS: LocalizedAlt = {
  it: "San Francesco d'Assisi",
  en: "Saint Francis of Assisi",
  fr: "Saint François d'Assise",
  de: "Der heilige Franziskus von Assisi",
};

/* Villa Relax */
export const ALT_VILLA_COUNTRYSIDE: LocalizedAlt = {
  it: "Villa Relax, villa indipendente nella campagna di Assisi",
  en: "Villa Relax, an independent villa in the Assisi countryside",
  fr: "Villa Relax, villa indépendante dans la campagne d'Assise",
  de: "Villa Relax, eine unabhängige Villa in der Landschaft von Assisi",
};
export const ALT_VILLA_POOL_NEAR_ASSISI: LocalizedAlt = {
  it: "Villa Relax, villa indipendente con piscina privata vicino ad Assisi",
  en: "Villa Relax, an independent villa with private pool near Assisi",
  fr: "Villa Relax, villa indépendante avec piscine privée près d'Assise",
  de: "Villa Relax, eine unabhängige Villa mit privatem Pool nahe Assisi",
};
export const ALT_VILLA_EXTERIOR_CLASSIC: LocalizedAlt = {
  it: "Esterno di Villa Relax, arredata in stile classico",
  en: "Exterior of Villa Relax, furnished in a classic style",
  fr: "Extérieur de Villa Relax, meublée dans un style classique",
  de: "Außenansicht der Villa Relax, im klassischen Stil eingerichtet",
};
export const ALT_VILLA_DINING: LocalizedAlt = {
  it: "Sala da pranzo interna di Villa Relax",
  en: "Indoor dining room of Villa Relax",
  fr: "Salle à manger intérieure de Villa Relax",
  de: "Esszimmer im Innenbereich der Villa Relax",
};
export const ALT_VILLA_POOL: LocalizedAlt = {
  it: "Piscina privata di Villa Relax",
  en: "Private pool of Villa Relax",
  fr: "Piscine privée de Villa Relax",
  de: "Privater Pool der Villa Relax",
};
