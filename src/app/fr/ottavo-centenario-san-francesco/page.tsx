import type { Metadata } from "next";
import { OttavoCentenarioPageView, getOttavoCentenarioMetadata } from "@/components/ottavo-centenario-page-view";

export const metadata: Metadata = getOttavoCentenarioMetadata("fr");

export default function OttavoCentenarioPage() {
  return <OttavoCentenarioPageView locale="fr" />;
}
