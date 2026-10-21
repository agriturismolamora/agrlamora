import type { Metadata } from "next";
import { HubPageView, getHubMetadata } from "@/components/hub-page-view";

export const metadata: Metadata = getHubMetadata("family", "it");

export default function VacanzaInFamigliaPage() {
  return <HubPageView id="family" locale="it" />;
}
