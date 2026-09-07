import type { Metadata } from "next";
import { PrivacyPolicyPageView } from "@/components/privacy-policy-page-view";
import { getPrivacyPolicyMetadata } from "@/data/legal-metadata";

export const metadata: Metadata = getPrivacyPolicyMetadata("de");

export default function PrivacyPage() {
  return <PrivacyPolicyPageView locale="de" />;
}
