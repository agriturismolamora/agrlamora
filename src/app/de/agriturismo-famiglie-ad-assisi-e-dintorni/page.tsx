import type { Metadata } from "next";
import { AttivitaPageView, getAttivitaMetadata } from "@/components/attivita-page-view";

export const metadata: Metadata = getAttivitaMetadata("de");

export default function AttivitaPage() {
  return <AttivitaPageView locale="de" />;
}
