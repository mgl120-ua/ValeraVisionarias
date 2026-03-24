import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const form = await req.json()

    if (form.hp && form.hp.length > 0) {
      return NextResponse.json({ success: true })
    }

    if (!form.contacto) {
      return NextResponse.json({ error: "Falta el dato de contacto" }, { status: 400 })
    }

    const safeZone = form.zona || "No indicada"
    const safeType = form.tipo || "No indicado"

    const html = `
      <h2>Nueva solicitud de valoracion</h2>
      <p><strong>Zona:</strong> ${safeZone}</p>
      <p><strong>Tipo:</strong> ${safeType}</p>
      <p><strong>Nombre:</strong> ${form.name || "-"}</p>
      <p><strong>Superficie:</strong> ${form.superficie || "-"} m2</p>
      <p><strong>Habitaciones:</strong> ${form.habitaciones || "-"}</p>
      <p><strong>Banos:</strong> ${form.banos || "-"}</p>
      <p><strong>Estado:</strong> ${form.estado || "-"}</p>
      <p><strong>Planta:</strong> ${form.planta || "-"}</p>
      <p><strong>Ascensor:</strong> ${form.ascensor ? "Si" : "No"}</p>
      <p><strong>Garaje:</strong> ${form.garaje ? "Si" : "No"}</p>
      <p><strong>Terraza:</strong> ${form.terraza ? "Si" : "No"}</p>
      <p><strong>Piscina:</strong> ${form.piscina ? "Si" : "No"}</p>
      <p><strong>Exterior:</strong> ${form.exterior ? "Si" : "No"}</p>
      <p><strong>Orientacion:</strong> ${form.orientacion?.toUpperCase() || "N/D"}</p>
      <p><strong>Ano de construccion:</strong> ${form.anio || "N/D"}</p>
      <p><strong>Eficiencia energetica:</strong> ${form.eficiencia || "N/D"}</p>
      <p><strong>Plazo estimado:</strong> ${form.timeline || "-"}</p>
      <p><strong>Motivo de venta:</strong> ${form.reason || "-"}</p>
      <p><strong>Mensaje:</strong> ${form.message || "-"}</p>
      <p><strong>Origen:</strong> ${form.source || "web"}</p>
      <hr style="margin:12px 0;border:none;border-top:1px solid #ddd;">
      <p><strong>Contacto:</strong> ${form.contacto}</p>
    `

    await resend.emails.send({
      from: "Valera Visionarias <inmobiliaria@valeravisionarias.com>",
      to: "valeravisionarias@gmail.com",
      subject: `Nueva valoracion: ${safeType} en ${safeZone}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al enviar el correo:", error)
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 })
  }
}
