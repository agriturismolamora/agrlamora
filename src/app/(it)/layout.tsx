import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lamoraassisi.com"),
  title: {
    default: "Agriturismo La Mora | Agriturismo con piscina ad Assisi, Umbria",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, ad Assisi: 5 appartamenti immersi nel verde umbro, piscina panoramica, colazione bio e attività per famiglie. A 7 km dall'aeroporto di Perugia.",
  alternates: {
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

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="it">{children}</RootShell>;
}
