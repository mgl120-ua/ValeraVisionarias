import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ADMIN_COOKIE } from "@/lib/admin-session"

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(ADMIN_COOKIE)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
  }
}
