import { NextResponse } from "next/server"

type GoogleReview = {
  author_name: string
  profile_photo_url?: string
  rating: number
  relative_time_description?: string
  text?: string
}

export const revalidate = 60 // evita hammering si llaman directo

export async function GET() {
  const key = process.env.GOOGLE_MAPS_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!key || !placeId) {
    return NextResponse.json(
      { error: "Faltan GOOGLE_MAPS_API_KEY o GOOGLE_PLACE_ID" },
      { status: 500 },
    )
  }

  const fields = [
    "rating",
    "user_ratings_total",
    "reviews(author_name,profile_photo_url,rating,relative_time_description,text)",
  ].join(",")

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
    placeId,
  )}&fields=${encodeURIComponent(fields)}&key=${encodeURIComponent(key)}`

  const resp = await fetch(url, { cache: "no-store" })
  const json = await resp.json()

  if (json.status !== "OK" || !json.result) {
    return NextResponse.json(
      { error: "No se pudieron obtener las reseñas", details: json.status },
      { status: 502 },
    )
  }

  const reviews: GoogleReview[] = json.result.reviews ?? []

  // Nos quedamos con 3-6 reseñas útiles
  const cleaned = reviews
    .filter(r => r?.text && r?.rating >= 4)
    .slice(0, 6)
    .map(r => ({
      author: r.author_name,
      image: r.profile_photo_url,
      rating: r.rating,
      time: r.relative_time_description,
      content: r.text,
    }))

  const aggregate = {
    rating: json.result.rating,
    total: json.result.user_ratings_total,
  }

  return NextResponse.json({ aggregate, reviews: cleaned })
}
