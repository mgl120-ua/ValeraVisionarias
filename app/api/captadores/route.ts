import { NextResponse } from "next/server"
import { Resend } from "resend"
import { escapeHtml } from "@/lib/escape-html"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { nombre, apellidos, email, telefono, mensaje } = await req.json()

    const { error: sendError } = await resend.emails.send({
      from: "Valera Visionarias <inmobiliaria@valeravisionarias.com>",
      to: "valeravisionarias@gmail.com",
      subject: "Programa de captadores",
      html: `
        <h2>Nueva solicitud de colaboración</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(nombre)} ${escapeHtml(apellidos)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
        <p><strong>Motivación:</strong></p>
        <p>${escapeHtml(mensaje)}</p>
      `,
    })

    // Resend no lanza excepción si falla el envío: lo comprobamos para no perder el contacto
    if (sendError) throw sendError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al enviar correo:", error)
    return NextResponse.json({ error: "Error al enviar correo" }, { status: 500 })
  }
}
