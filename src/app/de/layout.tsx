import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agriturismoinassisi.it"),
  title: {
    default: "Agriturismo La Mora | Agriturismo mit Pool in Assisi, Umbrien",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, in Assisi: 5 unabhängige Apartments inmitten der umbrischen Landschaft, Panorama-Pool, Bio-Frühstück und Aktivitäten für Familien. 7 km vom Flughafen Perugia entfernt.",
  alternates: {
    canonical: "https://www.agriturismoinassisi.it/de/",
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

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="de">{children}</RootShell>;
}
