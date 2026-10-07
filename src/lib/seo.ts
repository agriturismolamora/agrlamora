import type { Metadata } from "next";
import { LOCALES, withLocale, type Locale } from "@/lib/i18n";

/* Metadata SEO di ogni pagina in un solo punto: canonical assoluto
   autoreferenziale, hreflang reciproci (it, en, fr, de + x-default verso
   l'italiano, come in sitemap.ts), Open Graph e Twitter. Le pagine
   chiamano pageMetadata() dalla loro generateMetadata / export const
   metadata; i layout di lingua NON dichiarano canonical né alternates
   (verrebbero ereditati da tutte le pagine della lingua). */

export const SITE_URL = "https://www.lamoraassisi.com";
export const SITE_NAME = "Agriturismo La Mora";

const OG_LOCALE: Record<Locale, string> = { it: "it_IT", en: "en_GB", fr: "fr_FR", de: "de_DE" };

export type SeoImage = { src: string; alt: string; width?: number; height?: number };

/* Immagine social di default: foto reale di La Mora dall'alto (public/images/
   home/foto dell agriturismo dall alto.webp), ritagliata a 1200×630. */
const DEFAULT_IMAGE_ALT: Record<Locale, string> = {
  it: "Agriturismo La Mora ad Assisi visto dall'alto: la casa, la piscina, il prato e la campagna intorno",
  en: "Agriturismo La Mora in Assisi from above: the farmhouse, the pool, the lawn and the surrounding countryside",
  fr: "L'Agriturismo La Mora à Assise vu d'en haut : la maison, la piscine, la pelouse et la campagne autour",
  de: "Das Agriturismo La Mora in Assisi von oben: das Haus, der Pool, die Wiese und die Landschaft ringsum",
};
export function defaultSeoImage(locale: Locale): SeoImage {
  return { src: "/images/og/agriturismo-la-mora-assisi-1200x630.jpg", alt: DEFAULT_IMAGE_ALT[locale], width: 1200, height: 630 };
}

/* URL assoluto sul dominio canonico. I path delle foto in public/ possono
   avere spazi: si codificano una sola volta (decode prima, per non
   ricodificare un "%20" già presente). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${encodeURI(decodeURI(path))}`;
}

/* hreflang di un path italiano "nudo" (es. "/alloggi/"), per le lingue in
   cui la pagina esiste; x-default = versione italiana. */
export function hreflangLanguages(path: string, locales: readonly Locale[] = LOCALES): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${SITE_URL}${withLocale(l, path)}`;
  if (locales.includes("it")) languages["x-default"] = `${SITE_URL}${path}`;
  return languages;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  type = "website",
  absoluteTitle = false,
  locales = LOCALES,
  publishedTime,
}: {
  locale: Locale;
  /* Path italiano della pagina, con barra finale (es. "/piscina/"). */
  path: string;
  title: string;
  description: string;
  image?: SeoImage;
  type?: "website" | "article";
  /* true: il titolo è già completo (home), niente "| Agriturismo La Mora". */
  absoluteTitle?: boolean;
  locales?: readonly Locale[];
  publishedTime?: string;
}): Metadata {
  const url = `${SITE_URL}${withLocale(locale, path)}`;
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const img = image ?? defaultSeoImage(locale);
  const ogImage = {
    url: absoluteUrl(img.src),
    alt: img.alt,
    ...(img.width && img.height ? { width: img.width, height: img.height } : {}),
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: hreflangLanguages(path, locales) },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      title: fullTitle,
      description,
      images: [ogImage],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: ogImage.url, alt: img.alt }],
    },
  };
}
