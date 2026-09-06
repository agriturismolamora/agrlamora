import type { Metadata } from "next";
import { ChiSiamoPageView, getChiSiamoMetadata } from "@/components/chi-siamo-page-view";

export const metadata: Metadata = getChiSiamoMetadata("fr");

export default async function ChiSiamoPage() {
  return <ChiSiamoPageView locale="fr" />;
}
