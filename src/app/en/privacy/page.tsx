import type { Metadata } from "next";
import { PrivacyPolicyPageView } from "@/components/privacy-policy-page-view";
import { getPrivacyPolicyMetadata } from "@/data/legal-metadata";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = getPrivacyPolicyMetadata("en");

export default function PrivacyPage() {
  return (
    <>
      <StructuredData locale="en" path="/privacy/" />
      <PrivacyPolicyPageView locale="en" />
    </>
  );
}
