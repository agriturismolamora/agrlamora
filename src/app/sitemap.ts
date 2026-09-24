import type { MetadataRoute } from "next";
import { APARTMENTS } from "@/data/apartments";
import { getBlogPosts } from "@/data/blog-posts";
import { LOCALES, withLocale, type Locale } from "@/lib/i18n";

/* Sitemap su dominio canonico www.lamoraassisi.com (servita su
   /sitemap.xml). Solo pagine reali: le statiche sono quelle presenti in
   src/app per tutte e 4 le lingue, gli appartamenti arrivano da
   APARTMENTS (stessi href del sito) e gli articoli dal blog di ciascuna
   lingua — niente slug scritti a mano qui. Ogni voce dichiara le versioni
   nelle altre lingue (hreflang) solo dove la pagina esiste davvero.
   Nessun lastModified: il progetto non ha date di modifica affidabili per
   pagina, e una data inventata è peggio di nessuna. */
const SITE_URL = "https://www.lamoraassisi.com";

const STATIC_PATHS = [
  "/",
  "/chi-siamo/",
  "/territorio/",
  "/alloggi/",
  "/agriturismo-con-colazione-inclusa-assisi/",
  "/agriturismo-famiglie-ad-assisi-e-dintorni/",
  "/ottavo-centenario-san-francesco/",
  "/offerte/",
  "/offerte/cofanetti-regalo/",
  "/offerte/smartbox/",
  "/piscina/",
  "/villa-relax-assisi/",
  "/blog/",
  "/privacy/",
  "/cookie-policy/",
  "/termini-e-condizioni/",
];

function absolute(locale: Locale, path: string) {
  return `${SITE_URL}${withLocale(locale, path)}`;
}

/* Una voce per ogni lingua in cui il path esiste, ciascuna con l'elenco
   completo delle alternative linguistiche. */
function entries(path: string, locales: readonly Locale[]): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, absolute(l, path)]));
  return locales.map((locale) => ({ url: absolute(locale, path), alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.flatMap((path) => entries(path, LOCALES));
  const apartmentEntries = APARTMENTS.flatMap((apt) => entries(apt.href, LOCALES));

  const blogSlugs = [...new Set(LOCALES.flatMap((l) => getBlogPosts(l).map((p) => p.slug)))];
  const blogEntries = blogSlugs.flatMap((slug) =>
    entries(
      `/blog/${slug}/`,
      LOCALES.filter((l) => getBlogPosts(l).some((p) => p.slug === slug))
    )
  );

  return [...staticEntries, ...apartmentEntries, ...blogEntries];
}
