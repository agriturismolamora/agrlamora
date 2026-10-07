import type { Metadata } from "next";
import { notFound } from "next/navigation";

/* Vedi src/app/(it)/[...rest]/page.tsx. */
export const metadata: Metadata = { title: "Page not found" };

export default function CatchAllNotFound() {
  notFound();
}
