import type { Metadata } from "next";
import { HubPageView, getHubMetadata } from "@/components/hub-page-view";

export const metadata: Metadata = getHubMetadata("pets", "fr");

export default function VacanzaConAnimaliPage() {
  return <HubPageView id="pets" locale="fr" />;
}
