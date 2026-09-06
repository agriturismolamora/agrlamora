import type { Metadata } from "next";
import { BlogIndexPageView, getBlogIndexMetadata } from "@/components/blog-index-page-view";

export const metadata: Metadata = getBlogIndexMetadata("de");

export default function BlogIndexPage() {
  return <BlogIndexPageView locale="de" />;
}
