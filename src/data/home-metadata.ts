import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

/* Title e description delle 4 home, dichiarati nel page.tsx di ogni home
   (non nel layout: il canonical verrebbe ereditato da tutte le pagine).
   Solo fatti del brief: 5 appartamenti indipendenti, piscina aperta dal 1°
   maggio al 28 settembre, animali (Gemelli e Sagittario), prenotazione
   diretta senza commissioni e con sconti, senza prezzi. Title <= 60
   caratteri, description 140–160. */
const HOME_TEXT: Record<Locale, { title: string; description: string }> = {
  it: {
    title: "Agriturismo La Mora Assisi | Con piscina, sito ufficiale",
    description:
      "Sito ufficiale di Agriturismo La Mora ad Assisi: 5 appartamenti indipendenti e piscina da maggio a settembre. Prenoti diretto, senza commissioni e con sconti.",
  },
  en: {
    title: "Agriturismo La Mora Assisi | Official Site, Pool & Farm Stay",
    description:
      "Official site of Agriturismo La Mora in Assisi: 5 independent apartments, a seasonal pool, pets welcome. Book direct: no commission and exclusive discounts.",
  },
  fr: {
    title: "Agriturismo La Mora, Assise | Site officiel et appartements",
    description:
      "Site officiel de l'Agriturismo La Mora à Assise : 5 appartements indépendants, piscine de mai à septembre. Réservation directe sans commission, avec réductions.",
  },
  de: {
    title: "Agriturismo La Mora Assisi | Ferienwohnungen mit Pool",
    description:
      "Offizielle Website des Agriturismo La Mora in Assisi: 5 Ferienwohnungen, Pool von Mai bis September. Direkt buchen ohne Provision und mit Rabatten.",
  },
};

export function getHomeMetadata(locale: Locale): Metadata {
  const m = HOME_TEXT[locale];
  return pageMetadata({ locale, path: "/", title: m.title, description: m.description, absoluteTitle: true });
}
