import type { MetadataRoute } from "next";

/* robots.txt (servito su /robots.txt): tutte le pagine pubbliche
   indicizzabili; escluse solo le route API (oggi /api/verify-recaptcha),
   che non sono pagine. /_next/ resta consentito di proposito: JS e CSS
   servono a Google per renderizzare le pagine. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://www.lamoraassisi.com/sitemap.xml",
  };
}
