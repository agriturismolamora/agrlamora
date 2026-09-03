import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog-posts";
import { Reveal } from "@/components/scroll-reveal";
import { HoverFill } from "@/components/hover-fill";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = BLOG_POSTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const post = BLOG_POSTS[index];
  const related = BLOG_POSTS.filter((_, i) => i !== index).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative flex h-[56vh] min-h-[400px] items-end overflow-hidden">
        <Image src={post.image} alt={post.alt} fill priority sizes="100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(20,14,7,.05) 0%, rgba(20,14,7,.78) 100%)" }}
        />
        <div className="relative z-[1] mx-auto w-full max-w-[760px] px-6 pb-12 sm:px-10">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-cream/75 transition-colors hover:text-cream"
          >
            <span aria-hidden="true">←</span> Tutti gli articoli
          </Link>
          <span className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">{post.category}</span>
          <h1 className="mt-3 font-display text-[clamp(28px,4.4vw,44px)] font-normal leading-[1.15] text-cream [text-wrap:balance]">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-[680px] px-6 sm:px-10">
          <Reveal>
            <div className="space-y-5">
              {post.body.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.85] text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 rounded-[3px] bg-cream-dim px-7 py-7 text-center">
              <p className="font-display text-[19px] font-normal leading-[1.4] text-ink [text-wrap:balance]">
                A pochi minuti da qui, in campagna.
              </p>
              <Link
                href="/alloggi/"
                className="group relative mt-5 inline-flex items-center gap-2.5 overflow-hidden rounded-lg bg-raspberry px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream"
              >
                <HoverFill color="#8a3844" />
                <span className="relative z-10">Scopri gli appartamenti</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-dim py-14 sm:py-16">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Altri articoli</span>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link href={`/blog/${p.slug}/`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, 340px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 font-display text-[16px] leading-[1.3] text-ink [text-wrap:balance]">{p.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
