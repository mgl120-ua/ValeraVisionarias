import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { nombre, email, telefono, fecha, mensaje, propiedad, propiedadUrl } = await req.json()

    if (!nombre || !email || !fecha || !propiedad) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    await resend.emails.send({
      from: "Valera Visionarias <inmobiliaria@valeravisionarias.com>",
      to: "valeravisionarias@gmail.com",
      subject: `Solicitud de visita — ${propiedad}`,
      html: `
        <h2>Nueva solicitud de visita</h2>
        <p><strong>Propiedad:</strong> ${propiedad}</p>
        <p><strong>Enlace:</strong> <a href="${propiedadUrl}">${propiedadUrl}</a></p>
        <p><strong>Fecha solicitada:</strong> ${fecha}</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ""}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al enviar correo:", error)
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 })
  }
}
