import type { Metadata } from "next";
import { CookiePolicyPageView } from "@/components/cookie-policy-page-view";
import { getCookiePolicyMetadata } from "@/data/legal-metadata";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = getCookiePolicyMetadata("it");

export default function CookiePolicyPage() {
  return (
    <>
      <StructuredData locale="it" path="/cookie-policy/" />
      <CookiePolicyPageView locale="it" />
    </>
  );
}
