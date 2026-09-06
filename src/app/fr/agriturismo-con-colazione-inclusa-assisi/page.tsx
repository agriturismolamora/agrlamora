import type { Metadata } from "next";
import { ColazionePageView, getColazioneMetadata } from "@/components/colazione-page-view";

export const metadata: Metadata = getColazioneMetadata("fr");

export default function ColazionePage() {
  return <ColazionePageView locale="fr" />;
}
