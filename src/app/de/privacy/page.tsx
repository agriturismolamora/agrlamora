import type { Metadata } from "next";
import { PrivacyPolicyPageView } from "@/components/privacy-policy-page-view";
import { getPrivacyPolicyMetadata } from "@/data/legal-metadata";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = getPrivacyPolicyMetadata("de");

export default function PrivacyPage() {
  return (
    <>
      <StructuredData locale="de" path="/privacy/" />
      <PrivacyPolicyPageView locale="de" />
    </>
  );
}
