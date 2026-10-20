// Reseñas de la ficha de Google Business Profile mediante Places API (New).
// Necesita en Vercel: GOOGLE_MAPS_API_KEY (con "Places API (New)" activada) y GOOGLE_PLACE_ID.
// Si faltan o Google falla, devuelve null y la web muestra el resumen fijo con enlace a Google.

export type GoogleReview = {
  author: string
  authorUrl?: string
  photo?: string
  rating: number
  time?: string
  text: string
  googleUrl?: string
}

export type GoogleReviewsData = {
  rating: number | null
  total: number | null
  mapsUrl: string | null
  reviewsUrl: string | null
  reviews: GoogleReview[]
}

// Se refresca cada 12 h: suficiente para reseñas nuevas y evita coste por visita
const REVALIDATE_SECONDS = 60 * 60 * 12

type PlacesReview = {
  rating?: number
  text?: { text?: string }
  originalText?: { text?: string }
  relativePublishTimeDescription?: string
  googleMapsUri?: string
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
}

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_MAPS_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return null

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,googleMapsLinks.reviewsUri,reviews",
      },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["google-reviews"] },
    })
    if (!res.ok) {
      console.error("[google-reviews] Places API", res.status, await res.text().catch(() => ""))
      return null
    }
    const json = await res.json()

    const reviews: GoogleReview[] = ((json.reviews ?? []) as PlacesReview[])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Cliente de Google",
        authorUrl: r.authorAttribution?.uri,
        photo: r.authorAttribution?.photoUri,
        rating: r.rating ?? 0,
        time: r.relativePublishTimeDescription,
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        googleUrl: r.googleMapsUri,
      }))
      // Solo reseñas con comentario; Google devuelve como máximo 5, ordenadas por relevancia
      .filter((r) => r.text.length > 0 && r.rating >= 4)

    return {
      rating: typeof json.rating === "number" ? json.rating : null,
      total: typeof json.userRatingCount === "number" ? json.userRatingCount : null,
      mapsUrl: json.googleMapsUri ?? null,
      reviewsUrl: json.googleMapsLinks?.reviewsUri ?? json.googleMapsUri ?? null,
      reviews,
    }
  } catch (err) {
    console.error("[google-reviews]", err)
    return null
  }
}
