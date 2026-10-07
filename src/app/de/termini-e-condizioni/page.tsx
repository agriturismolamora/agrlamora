import type { Metadata } from "next";
import { TermsPageView } from "@/components/terms-page-view";
import { getTermsMetadata } from "@/data/legal-metadata";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = getTermsMetadata("de");

export default function TermsPage() {
  return (
    <>
      <StructuredData locale="de" path="/termini-e-condizioni/" />
      <TermsPageView locale="de" />
    </>
  );
}
