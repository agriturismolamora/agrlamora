import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agriturismoinassisi.it"),
  title: {
    default: "Agriturismo La Mora | Agriturismo avec piscine à Assise, Ombrie",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, à Assise : 5 appartements indépendants au cœur de la campagne ombrienne, piscine panoramique, petit-déjeuner bio et activités pour familles. À 7 km de l'aéroport de Pérouse.",
  alternates: {
    canonical: "https://www.agriturismoinassisi.it/fr/",
    languages: {
      it: "https://www.agriturismoinassisi.it/",
      en: "https://www.agriturismoinassisi.it/en/",
      fr: "https://www.agriturismoinassisi.it/fr/",
      de: "https://www.agriturismoinassisi.it/de/",
    },
  },
  icons: {
    icon: "/images/favicon/favicon%20icona%20agriturismo%20la%20mora.png",
    apple: "/images/favicon/favicon%20icona%20agriturismo%20la%20mora.png",
  },
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="fr">{children}</RootShell>;
}
