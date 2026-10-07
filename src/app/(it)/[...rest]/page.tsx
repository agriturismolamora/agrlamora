import type { Metadata } from "next";
import { notFound } from "next/navigation";

/* Ogni URL senza pagina finisce qui: notFound() mostra la 404 della lingua
   (not-found.tsx accanto al layout), con header, footer e stato 404.
   Senza questa route Next servirebbe la sua 404 di default, fuori dal sito. */
export const metadata: Metadata = { title: "Pagina non trovata" };

export default function CatchAllNotFound() {
  notFound();
}
