import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// En producción, esta contraseña debe estar en variables de entorno
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      // Establecer cookie de sesión (válida por 24 horas)
      const cookieStore = await cookies()
      cookieStore.set("admin-session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 horas
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
