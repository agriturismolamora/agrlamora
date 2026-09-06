import type { Metadata } from "next";
import { AlloggiPageView, getAlloggiMetadata } from "@/components/alloggi-page-view";

export const metadata: Metadata = getAlloggiMetadata("en");

export default function AlloggiPage() {
  return <AlloggiPageView locale="en" />;
}
