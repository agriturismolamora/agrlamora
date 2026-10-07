import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lamoraassisi.com"),
  /* Canonical, hreflang, og e twitter li dichiara ogni pagina (src/lib/seo.ts):
     qui verrebbero ereditati da tutte le pagine della lingua. */
  title: {
    default: "Agriturismo La Mora | Agriturismo with a Pool in Assisi, Umbria",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, in Assisi: 5 independent apartments surrounded by Umbrian countryside, a panoramic pool, organic breakfast and activities for families. About 11 km from Perugia airport.",
  icons: {
    // Ridotte dallo stesso disegno: l'originale (1254 px, 1,5 MB) lo scaricava ogni pagina.
    icon: [{ url: "/images/favicon/favicon-agriturismo-la-mora-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/images/favicon/apple-touch-icon-agriturismo-la-mora-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
