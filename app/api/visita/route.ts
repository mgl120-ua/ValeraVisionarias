import { NextResponse } from "next/server"
import { Resend } from "resend"
import { escapeHtml } from "@/lib/escape-html"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { nombre, email, telefono, fecha, mensaje, propiedad, propiedadUrl } = await req.json()

    if (!nombre || !email || !fecha || !propiedad) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    const { error: sendError } = await resend.emails.send({
      from: "Valera Visionarias <inmobiliaria@valeravisionarias.com>",
      to: "valeravisionarias@gmail.com",
      subject: `Solicitud de visita — ${propiedad}`,
      html: `
        <h2>Nueva solicitud de visita</h2>
        <p><strong>Propiedad:</strong> ${escapeHtml(propiedad)}</p>
        <p><strong>Enlace:</strong> <a href="${escapeHtml(propiedadUrl)}">${escapeHtml(propiedadUrl)}</a></p>
        <p><strong>Fecha solicitada:</strong> ${escapeHtml(fecha)}</p>
        <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
        ${mensaje ? `<p><strong>Mensaje:</strong> ${escapeHtml(mensaje)}</p>` : ""}
      `,
    })

    // Resend no lanza excepción si falla el envío: lo comprobamos para no perder el contacto
    if (sendError) throw sendError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al enviar correo:", error)
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 })
  }
}
