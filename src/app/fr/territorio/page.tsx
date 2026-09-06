import type { Metadata } from "next";
import { TerritorioPageView, getTerritorioMetadata } from "@/components/territorio-page-view";

export const metadata: Metadata = getTerritorioMetadata("fr");

export default function TerritorioPage() {
  return <TerritorioPageView locale="fr" />;
}
