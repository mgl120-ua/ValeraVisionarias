import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  isPasswordValid,
} from "@/lib/admin-session"

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ADMIN_PASSWORD) {
      console.error("ADMIN_PASSWORD no está configurada: acceso al panel deshabilitado")
      return NextResponse.json({ error: "Acceso no configurado" }, { status: 503 })
    }

    const { password } = await request.json()

    if (isPasswordValid(password)) {
      // Cookie de sesión firmada (válida 24 horas)
      cookies().set(ADMIN_COOKIE, await createAdminSessionToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: ADMIN_SESSION_MAX_AGE,
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
  } catch (error) {
    console.error("Error en autenticación:", error)
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
  }
}
