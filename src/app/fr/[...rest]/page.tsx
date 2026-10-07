import type { Metadata } from "next";
import { notFound } from "next/navigation";

/* Vedi src/app/(it)/[...rest]/page.tsx. */
export const metadata: Metadata = { title: "Page introuvable" };

export default function CatchAllNotFound() {
  notFound();
}
