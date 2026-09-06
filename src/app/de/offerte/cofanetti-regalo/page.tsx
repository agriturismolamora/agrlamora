import type { Metadata } from "next";
import { CofanettiPageView, getCofanettiMetadata } from "@/components/cofanetti-page-view";

export const metadata: Metadata = getCofanettiMetadata("de");

export default function CofanettiRegaloPage() {
  return <CofanettiPageView locale="de" />;
}
