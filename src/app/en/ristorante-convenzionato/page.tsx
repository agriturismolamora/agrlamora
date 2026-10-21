import type { Metadata } from "next";
import { RistoranteConvenzionatoPageView, getRistoranteMetadata } from "@/components/ristorante-convenzionato-page-view";

export const metadata: Metadata = getRistoranteMetadata("en");

export default function RistoranteConvenzionatoPage() {
  return <RistoranteConvenzionatoPageView locale="en" />;
}
