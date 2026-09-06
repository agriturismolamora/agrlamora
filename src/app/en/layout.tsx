import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agriturismoinassisi.it"),
  title: {
    default: "Agriturismo La Mora | Agriturismo with a Pool in Assisi, Umbria",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, in Assisi: 5 independent apartments surrounded by Umbrian countryside, a panoramic pool, organic breakfast and activities for families. 7 km from Perugia airport.",
  alternates: {
    canonical: "https://www.agriturismoinassisi.it/en/",
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

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
