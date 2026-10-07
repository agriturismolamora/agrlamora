import type { Metadata } from "next";
import { PrivacyPolicyPageView } from "@/components/privacy-policy-page-view";
import { getPrivacyPolicyMetadata } from "@/data/legal-metadata";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = getPrivacyPolicyMetadata("it");

export default function PrivacyPage() {
  return (
    <>
      <StructuredData locale="it" path="/privacy/" />
      <PrivacyPolicyPageView locale="it" />
    </>
  );
}
