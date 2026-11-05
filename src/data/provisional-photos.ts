import type { Locale } from "@/lib/i18n";

/* Foto PROVVISORIE inviate da Paolo (novembre 2026): il prato è stato rifatto
   e le foto notturne sono in arrivo, le definitive sostituiranno queste.
   Un solo punto dati per foto. Per sostituirne una basta sovrascrivere il file
   in public/ con lo stesso nome (o cambiare `src` qui): gallerie e pagine si
   aggiornano da sole, gli alt si cambiano solo se cambia il soggetto.
   Filigrana: la aggiunge WatermarkedImage, i file non la contengono. */
export type LocalizedPhoto = { src: string; alt: Record<Locale, string> };

/* Galleria di Sagittario, in coda alle foto esistenti (vedi apartment-details.ts). */
export const SAGITTARIO_GARDEN_GAZEBO: LocalizedPhoto = {
  src: "/images/alloggi/appartamento sagittario/sagittario-giardino-gazebo-prato.webp",
  alt: {
    it: "Giardino dell'appartamento Sagittario: gazebo con tavolo e sedie, prato e muro in pietra",
    en: "Garden of the Sagittario apartment: gazebo with table and chairs, lawn and stone wall",
    fr: "Jardin de l'appartement Sagittario : gazebo avec table et chaises, pelouse et mur en pierre",
    de: "Garten des Apartments Sagittario: Pavillon mit Tisch und Stühlen, Rasen und Steinmauer",
  },
};

export const SAGITTARIO_GARDEN_FARMHOUSE: LocalizedPhoto = {
  src: "/images/alloggi/appartamento sagittario/sagittario-giardino-casale-gazebo.webp",
  alt: {
    it: "Giardino di Sagittario visto da lontano: prato e gazebo, con il casale alle spalle",
    en: "Sagittario's garden seen from a distance: lawn and gazebo, with the farmhouse behind",
    fr: "Le jardin de Sagittario vu de loin : pelouse et gazebo, avec la ferme à l'arrière-plan",
    de: "Der Garten von Sagittario aus der Ferne: Rasen und Pavillon, dahinter das Landhaus",
  },
};

/* Chi siamo ("Chi c'è dietro La Mora") e Offerte ("Bentornati a La Mora"):
   ritaglio 4:5, la stessa proporzione dei due riquadri. */
export const FARMHOUSE_LAWN_ENTRANCE: LocalizedPhoto = {
  src: "/images/struttura/casale-prato-ingresso.webp",
  alt: {
    it: "Il casale di Agriturismo La Mora con il prato e l'ingresso",
    en: "The Agriturismo La Mora farmhouse with its lawn and entrance",
    fr: "La ferme de l'Agriturismo La Mora avec sa pelouse et son entrée",
    de: "Das Landhaus von Agriturismo La Mora mit Rasen und Eingang",
  },
};
