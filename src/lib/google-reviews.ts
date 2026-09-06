export type GoogleReview = {
  id: string;
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  relativeTime: string;
  text: string;
  time: number;
};

export type GoogleReviewsResult = {
  configured: boolean;
  rating: number | null;
  totalReviews: number | null;
  reviews: GoogleReview[];
  mapsUrl: string;
};

const MAPS_SHARE_URL = "https://share.google/TEqoqARZRfiv0if2z";

/* URL reale "scrivi una recensione": Google non permette di pubblicare una
   recensione sul profilo Business tramite form/API di terze parti (policy
   anti-fake-review) — l'unico modo legittimo è aprire il compositore di
   recensione reale di Google, precompilato con il place_id della struttura
   (stesso GOOGLE_PLACE_ID già usato per leggere le recensioni). Se non
   configurato, il fallback è lo stesso link Maps reale usato altrove — mai
   un finto "invio recensione" gestito da noi. */
export function getWriteReviewUrl(): string {
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!placeId) return MAPS_SHARE_URL;
  return `https://search.google.com/local/writereview?placeid=${placeId}`;
}

type PlacesApiReview = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

/* Integrazione reale con Google Places API (Place Details), non simulata:
   finché GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID non sono configurate come
   variabili d'ambiente (vanno create su Google Cloud Console dal
   titolare), la funzione ritorna configured:false e la UI mostra uno
   stato onesto con link reali alle recensioni — MAI recensioni inventate.
   Limite noto: la Places API restituisce al massimo 5 recensioni per
   luogo, è un vincolo di Google, non risolvibile lato nostro. */
export async function getGoogleReviews(): Promise<GoogleReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return { configured: false, rating: null, totalReviews: null, reviews: [], mapsUrl: MAPS_SHARE_URL };
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&reviews_sort=newest&language=it&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Google Places API error: ${res.status}`);
    const data = await res.json();
    if (data.status !== "OK") throw new Error(`Google Places API status: ${data.status}`);

    const result = data.result ?? {};
    const rawReviews: PlacesApiReview[] = result.reviews ?? [];
    const reviews: GoogleReview[] = rawReviews
      .filter((r) => r.rating >= 4)
      .map((r) => ({
        id: `${r.time}-${r.author_name}`,
        authorName: r.author_name,
        authorPhotoUrl: r.profile_photo_url ?? null,
        rating: r.rating,
        relativeTime: r.relative_time_description,
        text: r.text,
        time: r.time,
      }))
      .sort((a, b) => b.time - a.time);

    return {
      configured: true,
      rating: typeof result.rating === "number" ? result.rating : null,
      totalReviews: typeof result.user_ratings_total === "number" ? result.user_ratings_total : null,
      reviews,
      mapsUrl: MAPS_SHARE_URL,
    };
  } catch {
    return { configured: false, rating: null, totalReviews: null, reviews: [], mapsUrl: MAPS_SHARE_URL };
  }
}
