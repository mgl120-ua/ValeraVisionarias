import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { nombre, apellidos, email, telefono, mensaje } = await req.json()

    await resend.emails.send({
      from: "Valera Visionarias <inmobiliaria@valeravisionarias.com>",
      to: "valeravisionarias@gmail.com",
      subject: "Programa de captadores",
      html: `
        <h2>Nueva solicitud de colaboración</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Motivación:</strong></p>
        <p>${mensaje}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al enviar correo:", error)
    return NextResponse.json({ error: "Error al enviar correo" }, { status: 500 })
  }
}
