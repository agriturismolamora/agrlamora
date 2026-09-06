import type { Metadata } from "next";
import { PiscinaPageView, getPiscinaMetadata } from "@/components/piscina-page-view";

export const metadata: Metadata = getPiscinaMetadata("fr");

export default function PiscinaPage() {
  return <PiscinaPageView locale="fr" />;
}
