import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session"
import { propertyPath } from "@/lib/seo"

const BARE_PROPERTY_URL = /^\/propiedad\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/?$/i

/**
 * URLs antiguas de fichas (/propiedad/<uuid>) → URL descriptiva con 308.
 * Se hace aquí porque, con el loading.tsx de la ficha, la página ya ha empezado a enviarse
 * cuando se sabe el título y Next.js solo puede responder con un meta refresh (estado 200).
 * Solo consulta Supabase para URLs sin texto, que únicamente llegan desde enlaces antiguos.
 */
async function redirectLegacyPropertyUrl(request: NextRequest) {
  const match = request.nextUrl.pathname.match(BARE_PROPERTY_URL)
  if (!match) return null

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null

  try {
    const res = await fetch(`${url}/rest/v1/properties?select=id,title&id=eq.${match[1]}&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    })
    if (!res.ok) return null
    const [property] = (await res.json()) as Array<{ id: string; title: string | null }>
    if (!property) return null // la página devolverá el 404

    const target = request.nextUrl.clone()
    target.pathname = propertyPath(property)
    if (target.pathname === request.nextUrl.pathname) return null
    return NextResponse.redirect(target, 308)
  } catch {
    // Si Supabase falla, la página sigue funcionando y redirige con meta refresh
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/propiedad/")) {
    return (await redirectLegacyPropertyUrl(request)) ?? NextResponse.next()
  }

  // Proteger todas las rutas del admin excepto el login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const isAuthenticated = await verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE)?.value)

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/propiedad/:path*"],
}
