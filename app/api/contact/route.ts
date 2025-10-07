import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, surname, email, phone, service, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 })
    }

    const response = await resend.emails.send({
      from: "Valera Visionarias <inmobiliaria@valeravisionarias.com>",
      to: "valeravisionarias@gmail.com",
      subject: `Nueva consulta — ${service}`,
      html: `
        <h2>Nueva consulta desde la web</h2>
        <p><strong>Nombre:</strong> ${name} ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Servicio:</strong> ${service}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    })

    console.log("✅ Respuesta de Resend:", response)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Error al enviar correo:", error)
    return NextResponse.json({ error: "Error interno al enviar correo" }, { status: 500 })
  }
}
