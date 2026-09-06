import type { Metadata } from "next";
import { VillaRelaxPageView, getVillaRelaxMetadata } from "@/components/villa-relax-page-view";

export const metadata: Metadata = getVillaRelaxMetadata("de");

export default function VillaRelaxPage() {
  return <VillaRelaxPageView locale="de" />;
}
