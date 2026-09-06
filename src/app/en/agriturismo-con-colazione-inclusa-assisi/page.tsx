import type { Metadata } from "next";
import { ColazionePageView, getColazioneMetadata } from "@/components/colazione-page-view";

export const metadata: Metadata = getColazioneMetadata("en");

export default function ColazionePage() {
  return <ColazionePageView locale="en" />;
}
