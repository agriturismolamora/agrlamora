import type { Metadata } from "next";
import { CofanettiPageView, getCofanettiMetadata } from "@/components/cofanetti-page-view";

export const metadata: Metadata = getCofanettiMetadata("en");

export default function CofanettiRegaloPage() {
  return <CofanettiPageView locale="en" />;
}
