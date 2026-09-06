import type { Metadata } from "next";
import { CofanettiPageView, getCofanettiMetadata } from "@/components/cofanetti-page-view";

export const metadata: Metadata = getCofanettiMetadata("fr");

export default function CofanettiRegaloPage() {
  return <CofanettiPageView locale="fr" />;
}
