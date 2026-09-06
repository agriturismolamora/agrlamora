import type { Metadata } from "next";
import { VillaRelaxPageView, getVillaRelaxMetadata } from "@/components/villa-relax-page-view";

export const metadata: Metadata = getVillaRelaxMetadata("it");

export default function VillaRelaxPage() {
  return <VillaRelaxPageView locale="it" />;
}
