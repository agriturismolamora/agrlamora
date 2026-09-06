import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agriturismoinassisi.it"),
  title: {
    default: "Agriturismo La Mora | Agriturismo con piscina ad Assisi, Umbria",
    template: "%s | Agriturismo La Mora",
  },
  description:
    "Agriturismo La Mora, ad Assisi: 5 appartamenti immersi nel verde umbro, piscina panoramica, colazione bio e attività per famiglie. A 7 km dall'aeroporto di Perugia.",
  alternates: {
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

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="it">{children}</RootShell>;
}
