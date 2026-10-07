import type { Locale } from "@/lib/i18n";
import { breadcrumbNode, graphJson, siteNodes, type JsonLdNode } from "@/lib/structured-data";

/* Un solo <script type="application/ld+json"> per pagina con l'intero
   @graph (src/lib/structured-data.ts): WebSite e La Mora, i nodi propri
   della pagina e, sulle pagine interne, la BreadcrumbList. `path` è il
   path italiano della pagina ("/alloggi/gemelli/"); `crumbName` è il nome
   dell'ultima briciola per le schede (appartamenti, articoli). */
export function StructuredData({
  locale,
  path,
  nodes = [],
  crumbName,
}: {
  locale: Locale;
  path: string;
  nodes?: JsonLdNode[];
  crumbName?: string;
}) {
  const graph = [...siteNodes(locale), ...nodes, ...(path === "/" ? [] : [breadcrumbNode(locale, path, crumbName)])];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graphJson(graph) }} />;
}
