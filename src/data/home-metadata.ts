import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

/* Title e description delle 4 home, dichiarati nel page.tsx di ogni home
   (non nel layout: il canonical verrebbe ereditato da tutte le pagine).
   Solo fatti del brief: 5 appartamenti indipendenti, piscina aperta dal 1°
   maggio al 28 settembre, animali in Gemelli e Sagittario, prenotazione
   diretta. Title <= 60 caratteri, description 140–160. */
const HOME_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Agriturismo La Mora Assisi | Con piscina, sito ufficiale",
    description:
      "Sito ufficiale di Agriturismo La Mora ad Assisi: 5 appartamenti indipendenti, piscina da maggio a settembre, animali in Gemelli e Sagittario. Prenota diretto.",
  },
  en: {
    title: "Agriturismo La Mora Assisi | Official Site, Pool & Farm Stay",
    description:
      "Official website of Agriturismo La Mora in Assisi: 5 independent apartments, a pool open May to September, pets welcome in Gemelli and Sagittario. Book direct.",
  },
  fr: {
    title: "Agriturismo La Mora Assise | Agritourisme avec piscine",
    description:
      "Site officiel de l'Agriturismo La Mora, Assise : 5 appartements indépendants, piscine de mai à septembre, animaux à Gemelli et Sagittario. Réservez en direct.",
  },
  de: {
    title: "Agriturismo La Mora Assisi | Ferienwohnungen mit Pool",
    description:
      "Offizielle Website des Agriturismo La Mora in Assisi: 5 Ferienwohnungen, Pool von Mai bis September, Haustiere in Gemelli und Sagittario. Direkt bei uns buchen.",
  },
};

export function getHomeMetadata(locale: Locale): Metadata {
  const m = HOME_TEXT[locale];
  return pageMetadata({ locale, path: "/", title: m.title, description: m.description, absoluteTitle: true });
}
