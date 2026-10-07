import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lamoraassisi.com"),
  /* Canonical, hreflang, og e twitter li dichiara ogni pagina (src/lib/seo.ts):
     qui verrebbero ereditati da tutte le pagine della lingua. */
  title: {
    default: "Agriturismo La Mora | Agriturismo con piscina ad Assisi, Umbria",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, ad Assisi: 5 appartamenti immersi nel verde umbro, piscina panoramica, colazione bio e attività per famiglie. A circa 11 km dall'aeroporto di Perugia.",
  icons: {
    // Ridotte dallo stesso disegno: l'originale (1254 px, 1,5 MB) lo scaricava ogni pagina.
    icon: [{ url: "/images/favicon/favicon-agriturismo-la-mora-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/images/favicon/apple-touch-icon-agriturismo-la-mora-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="it">{children}</RootShell>;
}
