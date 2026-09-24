import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lamoraassisi.com"),
  title: {
    default: "Agriturismo La Mora | Agriturismo with a Pool in Assisi, Umbria",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, in Assisi: 5 independent apartments surrounded by Umbrian countryside, a panoramic pool, organic breakfast and activities for families. 7 km from Perugia airport.",
  alternates: {
    canonical: "https://www.lamoraassisi.com/en/",
    languages: {
      it: "https://www.lamoraassisi.com/",
      en: "https://www.lamoraassisi.com/en/",
      fr: "https://www.lamoraassisi.com/fr/",
      de: "https://www.lamoraassisi.com/de/",
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
