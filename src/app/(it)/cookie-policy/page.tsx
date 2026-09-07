import type { Metadata } from "next";
import { CookiePolicyPageView } from "@/components/cookie-policy-page-view";
import { getCookiePolicyMetadata } from "@/data/legal-metadata";

export const metadata: Metadata = getCookiePolicyMetadata("it");

export default function CookiePolicyPage() {
  return <CookiePolicyPageView locale="it" />;
}
