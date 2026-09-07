import type { Metadata } from "next";
import { TermsPageView } from "@/components/terms-page-view";
import { getTermsMetadata } from "@/data/legal-metadata";

export const metadata: Metadata = getTermsMetadata("en");

export default function TermsPage() {
  return <TermsPageView locale="en" />;
}
