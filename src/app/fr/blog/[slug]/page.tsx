import type { Metadata } from "next";
import { BlogArticlePageView, blogArticleStaticParams, blogArticleMetadata } from "@/components/blog-article-page-view";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogArticleStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return blogArticleMetadata("fr", params);
}

export default function BlogArticlePage({ params }: { params: Promise<Params> }) {
  return <BlogArticlePageView locale="fr" params={params} />;
}
