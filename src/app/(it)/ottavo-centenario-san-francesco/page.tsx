import type { Metadata } from "next";
import { OttavoCentenarioPageView, getOttavoCentenarioMetadata } from "@/components/ottavo-centenario-page-view";

export const metadata: Metadata = getOttavoCentenarioMetadata("it");

export default function OttavoCentenarioPage() {
  return <OttavoCentenarioPageView locale="it" />;
}
