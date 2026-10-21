import type { Metadata } from "next";
import { RistoranteConvenzionatoPageView, getRistoranteMetadata } from "@/components/ristorante-convenzionato-page-view";

export const metadata: Metadata = getRistoranteMetadata("fr");

export default function RistoranteConvenzionatoPage() {
  return <RistoranteConvenzionatoPageView locale="fr" />;
}
