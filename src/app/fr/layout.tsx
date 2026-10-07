import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lamoraassisi.com"),
  /* Canonical, hreflang, og e twitter li dichiara ogni pagina (src/lib/seo.ts):
     qui verrebbero ereditati da tutte le pagine della lingua. */
  title: {
    default: "Agriturismo La Mora | Agriturismo avec piscine à Assise, Ombrie",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, à Assise : 5 appartements indépendants au cœur de la campagne ombrienne, piscine panoramique, petit-déjeuner bio et activités pour familles. À environ 11 km de l'aéroport de Pérouse.",
  icons: {
    // Ridotte dallo stesso disegno: l'originale (1254 px, 1,5 MB) lo scaricava ogni pagina.
    icon: [{ url: "/images/favicon/favicon-agriturismo-la-mora-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/images/favicon/apple-touch-icon-agriturismo-la-mora-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="fr">{children}</RootShell>;
}
