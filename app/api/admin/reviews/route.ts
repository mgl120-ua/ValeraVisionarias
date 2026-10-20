import { NextResponse } from "next/server"
import { getGoogleReviews } from "@/lib/google-reviews"
import { isAdminRequest } from "@/lib/admin-session"

// Comprobación rápida de la conexión con Google: devuelve lo mismo que muestra la portada
export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (!process.env.GOOGLE_MAPS_API_KEY || !process.env.GOOGLE_PLACE_ID) {
    return NextResponse.json({ error: "Faltan GOOGLE_MAPS_API_KEY o GOOGLE_PLACE_ID" }, { status: 500 })
  }

  const data = await getGoogleReviews()
  if (!data) {
    return NextResponse.json({ error: "No se pudieron obtener las reseñas de Google" }, { status: 502 })
  }

  return NextResponse.json(data)
}
