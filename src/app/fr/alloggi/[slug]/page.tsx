import type { Metadata } from "next";
import { apartmentStaticParams, apartmentMetadata, ApartmentPageView } from "@/components/apartment-page-view";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return apartmentStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return apartmentMetadata("fr", params);
}

export default async function ApartmentPage({ params }: { params: Promise<Params> }) {
  return ApartmentPageView({ locale: "fr", params });
}
