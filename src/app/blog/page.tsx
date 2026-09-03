import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog-posts";
import { Reveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Storie, luoghi e consigli per vivere Assisi e l'Umbria con calma: la Basilica di San Damiano, il Bosco di San Francesco, le Cascate delle Marmore e altro, dal blog di Agriturismo La Mora.",
  alternates: { canonical: "/blog/" },
};

/* Editoriale reale (5 articoli veri, non 20 pezzi finti per riempire un
   calendario che non esiste): la struttura è pronta per crescere quando
   arriveranno nuovi contenuti, semplicemente aggiungendo voci a
   src/data/blog-posts.ts. */
export default function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      <section className="bg-cream pb-4 pt-16 sm:pt-20">
        <div className="mx-auto max-w-[900px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">Dal blog de La Mora</span>
            <h1 className="mx-auto mt-5 max-w-[640px] font-display text-[clamp(32px,4.6vw,52px)] font-normal leading-[1.15] text-ink [text-wrap:balance]">
              Storie, luoghi e consigli per vivere Assisi con calma.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal>
            <Link href={`/blog/${featured.slug}/`} className="group grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center sm:gap-10">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[3px]">
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-950">{featured.category}</span>
                <h2 className="mt-3 font-display text-[28px] font-normal leading-[1.2] text-ink [text-wrap:balance]">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.7] text-ink-soft">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-raspberry">
                  Leggi l&apos;articolo
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-10 border-t border-ink/10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
                <Link href={`/blog/${post.slug}/`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, 280px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">
                    {post.category}
                  </span>
                  <h3 className="mt-1.5 font-display text-[17px] leading-[1.3] text-ink [text-wrap:balance]">{post.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
