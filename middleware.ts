import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

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
  matcher: "/admin/:path*",
}
