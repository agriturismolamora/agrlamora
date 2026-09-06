import type { Metadata } from "next";
import { TerritorioPageView, getTerritorioMetadata } from "@/components/territorio-page-view";

export const metadata: Metadata = getTerritorioMetadata("en");

export default function TerritorioPage() {
  return <TerritorioPageView locale="en" />;
}
