import type { Metadata } from "next";
import { TermsPageView } from "@/components/terms-page-view";
import { getTermsMetadata } from "@/data/legal-metadata";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = getTermsMetadata("it");

export default function TermsPage() {
  return (
    <>
      <StructuredData locale="it" path="/termini-e-condizioni/" />
      <TermsPageView locale="it" />
    </>
  );
}
