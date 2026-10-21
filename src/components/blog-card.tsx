import Image from "next/image";
import Link from "next/link";
import { PhotoCreditLine } from "@/components/photo-credit";
import type { BlogPost } from "@/data/blog-posts";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

/* Card di un articolo del blog (copertina, categoria, titolo, estratto,
   credito foto): Territorio, "Vacanza con animali", "Vacanza in famiglia".
   `heading`: livello del titolo, uno sotto quello della sezione (h4 in
   Territorio, dove le card stanno sotto i gruppi h3; h3 negli hub). */
export function BlogCard({ post, locale, readMore, heading: Heading = "h4" }: { post: BlogPost; locale: Locale; readMore: string; heading?: "h3" | "h4" }) {
  return (
    <Link href={withLocale(locale, `/blog/${post.slug}/`)} className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          style={{ objectPosition: post.imagePosition }}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 340px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">{post.category}</span>
      <Heading className="mt-1.5 font-display text-[19px] leading-[1.3] text-ink [text-wrap:balance]">{post.title}</Heading>
      <p className="mt-2 line-clamp-3 text-[13px] leading-[1.65] text-ink-soft">{post.excerpt}</p>
      {post.imageCredit && (
        <PhotoCreditLine credit={post.imageCredit} locale={locale} linked={false} className="mt-2 block text-[10px] leading-[1.4] text-ink-soft" />
      )}
      <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-raspberry">
        {readMore}
        <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
