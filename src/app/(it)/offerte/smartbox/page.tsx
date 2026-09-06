import type { Metadata } from "next";
import { SmartboxPageView, getSmartboxMetadata } from "@/components/smartbox-page-view";

export const metadata: Metadata = getSmartboxMetadata("it");

export default function SmartboxPage() {
  return <SmartboxPageView locale="it" />;
}
