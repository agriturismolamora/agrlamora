export type FacebookPhoto = {
  id: string;
  src: string;
  alt: string;
};

export type FacebookPhotosResult = {
  configured: boolean;
  photos: FacebookPhoto[];
};

type GraphApiPhoto = {
  id: string;
  name?: string;
  images?: { source: string; width: number; height: number }[];
};

/* Integrazione reale con la Graph API di Facebook (foto della Pagina), non
   simulata: finché FACEBOOK_PAGE_ACCESS_TOKEN e FACEBOOK_PAGE_ID non sono
   configurate come variabili d'ambiente (il titolare genera il token da
   Meta for Developers → Graph API Explorer, permesso
   pages_read_engagement, poi lo rende "mai in scadenza" da Impostazioni
   Pagina → Ruoli), la funzione ritorna configured:false e la UI mostra
   foto reali della struttura come riempimento onesto — MAI foto finte o
   placeholder generici spacciati per il feed Facebook. */
export async function getFacebookPhotos(): Promise<FacebookPhotosResult> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!token || !pageId) {
    return { configured: false, photos: [] };
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${pageId}/photos?type=uploaded&fields=name,images&limit=10&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Facebook Graph API error: ${res.status}`);
    const data = await res.json();
    const raw: GraphApiPhoto[] = data.data ?? [];

    const photos: FacebookPhoto[] = raw
      .map((p) => ({
        id: p.id,
        src: p.images?.[0]?.source ?? null,
        alt: p.name?.trim() || "Foto dalla pagina Facebook di Agriturismo La Mora",
      }))
      .filter((p): p is FacebookPhoto => Boolean(p.src));

    return { configured: true, photos };
  } catch {
    return { configured: false, photos: [] };
  }
}
