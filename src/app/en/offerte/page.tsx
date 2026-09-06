import type { Metadata } from "next";
import { OffertePageView, getOfferteMetadata } from "@/components/offerte-page-view";

export const metadata: Metadata = getOfferteMetadata("en");

export default function OffertePage() {
  return <OffertePageView locale="en" />;
}
