import type { Metadata } from "next";
import { TermsPageView } from "@/components/terms-page-view";
import { getTermsMetadata } from "@/data/legal-metadata";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = getTermsMetadata("fr");

export default function TermsPage() {
  return (
    <>
      <StructuredData locale="fr" path="/termini-e-condizioni/" />
      <TermsPageView locale="fr" />
    </>
  );
}
