import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const form = await req.json()

    // Seguridad básica
    if (form.hp && form.hp.length > 0) {
      return NextResponse.json({ success: true })
    }

    // Campos mínimos
    if (!form.contacto || !form.zona || !form.tipo) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    // Formatear mensaje HTML
    const html = `
      <h2>Nueva solicitud de valoración</h2>
      <p><strong>Zona:</strong> ${form.zona}</p>
      <p><strong>Tipo:</strong> ${form.tipo}</p>
      <p><strong>Superficie:</strong> ${form.superficie || "-"} m²</p>
      <p><strong>Habitaciones:</strong> ${form.habitaciones || "-"}</p>
      <p><strong>Baños:</strong> ${form.banos || "-"}</p>
      <p><strong>Estado:</strong> ${form.estado || "-"}</p>
      <p><strong>Planta:</strong> ${form.planta || "-"}</p>
      <p><strong>Ascensor:</strong> ${form.ascensor ? "Sí" : "No"}</p>
      <p><strong>Garaje:</strong> ${form.garaje ? "Sí" : "No"}</p>
      <p><strong>Terraza:</strong> ${form.terraza ? "Sí" : "No"}</p>
      <p><strong>Piscina:</strong> ${form.piscina ? "Sí" : "No"}</p>
      <p><strong>Exterior:</strong> ${form.exterior ? "Sí" : "No"}</p>
      <p><strong>Orientación:</strong> ${form.orientacion?.toUpperCase() || "N/D"}</p>
      <p><strong>Año de construcción:</strong> ${form.anio || "N/D"}</p>
      <p><strong>Eficiencia energética:</strong> ${form.eficiencia || "N/D"}</p>
      <hr style="margin:12px 0;border:none;border-top:1px solid #ddd;">
      <p><strong>Contacto:</strong> ${form.contacto}</p>
    `

    await resend.emails.send({
      from: "Valera Visionarias <inmobiliaria@valeravisionarias.com>",
      to: "valeravisionarias@gmail.com",
      subject: `Nueva valoración: ${form.tipo} en ${form.zona}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al enviar el correo:", error)
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 })
  }
}
