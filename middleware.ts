import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proteger todas las rutas del admin excepto el login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const isAuthenticated = request.cookies.get("admin-session")?.value

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
