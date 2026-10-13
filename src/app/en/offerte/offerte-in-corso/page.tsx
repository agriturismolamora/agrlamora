import type { Metadata } from "next";
import { OfferteInCorsoPageView, getOfferteInCorsoMetadata } from "@/components/offerte-in-corso-page-view";

export const metadata: Metadata = getOfferteInCorsoMetadata("en");

export default function OfferteInCorsoPage() {
  return <OfferteInCorsoPageView locale="en" />;
}
