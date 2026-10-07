import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lamoraassisi.com"),
  /* Canonical, hreflang, og e twitter li dichiara ogni pagina (src/lib/seo.ts):
     qui verrebbero ereditati da tutte le pagine della lingua. */
  title: {
    default: "Agriturismo La Mora | Agriturismo mit Pool in Assisi, Umbrien",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, in Assisi: 5 unabhängige Apartments inmitten der umbrischen Landschaft, Panorama-Pool, Bio-Frühstück und Aktivitäten für Familien. Etwa 11 km vom Flughafen Perugia entfernt.",
  icons: {
    // Ridotte dallo stesso disegno: l'originale (1254 px, 1,5 MB) lo scaricava ogni pagina.
    icon: [{ url: "/images/favicon/favicon-agriturismo-la-mora-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/images/favicon/apple-touch-icon-agriturismo-la-mora-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="de">{children}</RootShell>;
}
