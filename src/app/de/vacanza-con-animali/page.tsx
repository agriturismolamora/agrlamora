import type { Metadata } from "next";
import { HubPageView, getHubMetadata } from "@/components/hub-page-view";

export const metadata: Metadata = getHubMetadata("pets", "de");

export default function VacanzaConAnimaliPage() {
  return <HubPageView id="pets" locale="de" />;
}
