import { NextResponse } from "next/server"
import { Resend } from "resend"
import { escapeHtml } from "@/lib/escape-html"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, surname, email, phone, service, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 })
    }

    const { error: sendError } = await resend.emails.send({
      from: "Valera Visionarias <inmobiliaria@valeravisionarias.com>",
      to: "valeravisionarias@gmail.com",
      subject: `Nueva consulta — ${service}`,
      html: `
        <h2>Nueva consulta desde la web</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)} ${escapeHtml(surname)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Servicio:</strong> ${escapeHtml(service)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message)}</p>
      `,
    })

    // Resend no lanza excepción si falla el envío: lo comprobamos para no perder el contacto
    if (sendError) throw sendError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Error al enviar correo:", error)
    return NextResponse.json({ error: "Error interno al enviar correo" }, { status: 500 })
  }
}
