import type { Metadata } from "next";
import { CookiePolicyPageView } from "@/components/cookie-policy-page-view";
import { getCookiePolicyMetadata } from "@/data/legal-metadata";

export const metadata: Metadata = getCookiePolicyMetadata("de");

export default function CookiePolicyPage() {
  return <CookiePolicyPageView locale="de" />;
}
