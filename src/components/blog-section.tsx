import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/scroll-reveal";

/* Blog/editoriale (PLAN.md Blocco 6, mai costruito finora): i 20 articoli
   veri arriveranno con la produzione contenuti SEO/GEO — per ora 5 card
   placeholder coerenti nel tono, legate a luoghi reali del territorio non
   ancora fotografati altrove in home (TerritorySection copre già Basilica
   di San Francesco/Eremo delle Carceri/Perugia: qui solo posti diversi).
   Da sostituire con i link/anteprime reali quando gli articoli saranno
   pubblicati. */
const POSTS = [
  {
    category: "Territorio",
    title: "Basilica di Santa Maria degli Angeli: cosa vedere",
    image: "/images/territorio/assisi/basilica di santa maria degli angeli agriturismo la mora.jpg",
    alt: "Basilica di Santa Maria degli Angeli, ad Assisi",
  },
  {
    category: "Natura",
    title: "Il Bosco di San Francesco, tra i sentieri del FAI",
    image: "/images/territorio/assisi/bosco di san francesco assisi.jpg",
    alt: "Bosco di San Francesco ad Assisi",
  },
  {
    category: "Territorio",
    title: "Il Santuario di San Damiano, fuori dalle mura di Assisi",
    image: "/images/territorio/assisi/san damiano santuario dintorni assisi.jpg",
    alt: "Santuario di San Damiano, nei dintorni di Assisi",
  },
  {
    category: "Gita di un giorno",
    title: "Cascate delle Marmore: come arrivarci da Assisi",
    image: "/images/territorio/dintorni/cascate delle marmore.jpg",
    alt: "Cascate delle Marmore, in Umbria",
  },
  {
    category: "Natura",
    title: "Monte Subasio: i sentieri sopra Assisi",
    image: "/images/territorio/dintorni/monte subasio alto.jpg",
    alt: "Monte Subasio, sopra Assisi",
  },
] as const;

export function BlogSection() {
  return (
    <section id="section-blog" aria-labelledby="blog-heading" className="bg-cream-dim py-24 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-[640px]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-950">
              Dal blog de La Mora
            </span>
            <h2
              id="blog-heading"
              className="mt-5 font-display text-[clamp(26px,2.8vw,38px)] font-normal leading-[1.25] text-ink [text-wrap:balance]"
            >
              Storie, luoghi e consigli per vivere Assisi e l&apos;Umbria con calma.
            </h2>
          </div>
          <Link
            href="/blog/"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-[3px] bg-olive-950 px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.05em] text-cream transition-colors duration-200 hover:bg-[#141810]"
          >
            Tutti gli articoli
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>

        {/* Desktop/tablet: ventaglio di card sovrapposte, quella in hover
            prevale (scale + z-index) sulle altre senza spostarle. Mobile:
            striscia scorrevole con snap, niente sovrapposizione (l'hover non
            esiste su touch). Il reveal è su tutta la fila (non per-card):
            i margini negativi/z-index dell'overlap vivono sui Link, un
            fade-in per-card romperebbe quella geometria. */}
        <Reveal delay={100} className="mt-14 hidden sm:mt-16 lg:flex lg:justify-center">
          {POSTS.map((post, i) => (
            <Link
              key={post.title}
              href="/blog/"
              className={`group/card relative aspect-[3/4] w-[240px] shrink-0 overflow-hidden shadow-[0_25px_55px_-25px_rgba(28,33,23,0.5)] outline-none transition-transform duration-300 ease-out hover:z-20 hover:scale-[1.08] focus-visible:z-20 focus-visible:scale-[1.08] xl:w-[270px] ${
                i > 0 ? "-ml-16 xl:-ml-20" : ""
              }`}
              style={{ zIndex: i + 1 }}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="270px"
                className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.06]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(10,12,9,.85) 0%, rgba(10,12,9,.1) 55%, rgba(10,12,9,.35) 100%)" }}
              />
              <span className="absolute left-4 top-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-cream/80">
                {post.category}
              </span>
              <div className="absolute inset-x-4 bottom-4">
                <span className="block font-display text-[17px] leading-[1.25] text-cream [text-wrap:balance]">
                  {post.title}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-cream/85">
                  Scopri di più
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover/card:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </Reveal>

        <Reveal delay={100} className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:mt-16 lg:hidden">
          {POSTS.map((post) => (
            <Link
              key={post.title}
              href="/blog/"
              className="group/card relative aspect-[3/4] w-[220px] shrink-0 snap-start overflow-hidden"
            >
              <Image src={post.image} alt={post.alt} fill sizes="220px" className="object-cover" />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(10,12,9,.85) 0%, rgba(10,12,9,.1) 55%, rgba(10,12,9,.3) 100%)" }}
              />
              <span className="absolute left-4 top-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-cream/80">
                {post.category}
              </span>
              <div className="absolute inset-x-4 bottom-4">
                <span className="block font-display text-[16px] leading-[1.25] text-cream [text-wrap:balance]">
                  {post.title}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-cream/85">
                  Scopri di più
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
