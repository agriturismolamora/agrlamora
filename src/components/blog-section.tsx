import { BlogSectionView } from "@/components/blog-section-view";
import { getBlogPosts } from "@/data/blog-posts";
import type { Locale } from "@/lib/i18n";

/* Sezione blog della home. Componente server: legge gli articoli qui e
   passa al ventaglio/striscia (client, blog-section-view.tsx) solo i campi
   delle card. Prima il componente client importava blog-posts.ts, e il
   testo completo di tutti gli articoli in 4 lingue (oltre 500 KB) finiva
   nel JavaScript della home. */
export function BlogSection({ locale }: { locale: Locale }) {
  const posts = getBlogPosts(locale).map(({ slug, image, alt, imagePosition, category, title, imageCredit }) => ({
    slug,
    image,
    alt,
    imagePosition,
    category,
    title,
    imageCredit,
  }));
  return <BlogSectionView locale={locale} posts={posts} />;
}
