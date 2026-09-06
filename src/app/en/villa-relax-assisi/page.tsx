import type { Metadata } from "next";
import { VillaRelaxPageView, getVillaRelaxMetadata } from "@/components/villa-relax-page-view";

export const metadata: Metadata = getVillaRelaxMetadata("en");

export default function VillaRelaxPage() {
  return <VillaRelaxPageView locale="en" />;
}
