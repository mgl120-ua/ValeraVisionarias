// app/api/contact/route.ts
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Cambia este destinatario si prefieres otro
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "Valeravisionarias@gmail.com"
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Valera Visionarias <no-reply@valeravisionarias.com>"

export async function POST(req: Request) {
  try {
    const { nombre, apellidos, email, telefono, servicio, mensaje, company } = await req.json()

    // Honeypot
    if (company && String(company).trim().length > 0) {
      return new NextResponse("OK", { status: 200 })
    }

    if (!nombre || !apellidos || !email || !telefono || !mensaje) {
      return new NextResponse("Faltan campos obligatorios.", { status: 400 })
    }

    const subject = `Nuevo contacto: ${nombre} ${apellidos} — ${servicio || "Consulta"}`
    const html = `
      <h2>Nuevo mensaje desde la web</h2>
      <p><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Servicio:</strong> ${servicio || "-"}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${(mensaje || "").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>Enviado desde valeravisionarias.com/contacto</p>
    `

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email, // para responder directo al cliente
      subject,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return new NextResponse("No se pudo enviar el email.", { status: 500 })
    }

    return new NextResponse("OK", { status: 200 })
  } catch (e) {
    console.error(e)
    return new NextResponse("Error del servidor.", { status: 500 })
  }
}
