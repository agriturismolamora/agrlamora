import type { Metadata } from "next";
import { CookiePolicyPageView } from "@/components/cookie-policy-page-view";
import { getCookiePolicyMetadata } from "@/data/legal-metadata";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = getCookiePolicyMetadata("de");

export default function CookiePolicyPage() {
  return (
    <>
      <StructuredData locale="de" path="/cookie-policy/" />
      <CookiePolicyPageView locale="de" />
    </>
  );
}
