// components/contact/ContactForm.tsx
"use client"

import { useState } from "react"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const schema = z.object({
  nombre: z.string().min(2, "Introduce tu nombre"),
  apellidos: z.string().min(2, "Introduce tus apellidos"),
  email: z.string().email("Email no válido"),
  telefono: z
    .string()
    .min(6, "Teléfono no válido")
    .regex(/^[0-9+\s-]+$/, "Sólo números y + - espacios"),
  servicio: z.string().optional(),
  mensaje: z.string().min(5, "Cuéntanos un poco más"),
  // Honeypot anti-spam
  company: z.string().optional(),
})

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<null | boolean>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setOk(null)
    setError(null)

    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    const parsed = schema.safeParse(payload)
    if (!parsed.success) {
      setLoading(false)
      setOk(false)
      setError(parsed.error.errors[0].message)
      return
    }

    // honeypot: si el bot rellena "company" cancelamos
    if (parsed.data.company && parsed.data.company.trim().length > 0) {
      setLoading(false)
      setOk(true) // fingimos OK para bots
      return
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    })

    setLoading(false)
    if (res.ok) {
      setOk(true)
      e.currentTarget.reset()
    } else {
      const msg = await res.text()
      setOk(false)
      setError(msg || "No se pudo enviar el mensaje.")
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6" aria-label="Formulario de contacto">
      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label htmlFor="nombre" className="block text-xs sm:text-sm text-stone-800 mb-2 font-medium">
            Nombre *
          </label>
          <Input id="nombre" name="nombre" required className="h-11 sm:h-12" />
        </div>
        <div>
          <label htmlFor="apellidos" className="block text-xs sm:text-sm text-stone-800 mb-2 font-medium">
            Apellidos *
          </label>
          <Input id="apellidos" name="apellidos" required className="h-11 sm:h-12" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-xs sm:text-sm text-stone-800 mb-2 font-medium">
          Email *
        </label>
        <Input id="email" name="email" type="email" inputMode="email" required className="h-11 sm:h-12" />
      </div>

      <div>
        <label htmlFor="telefono" className="block text-xs sm:text-sm text-stone-800 mb-2 font-medium">
          Teléfono *
        </label>
        <Input id="telefono" name="telefono" type="tel" inputMode="tel" required className="h-11 sm:h-12" />
      </div>

      <div>
        <label htmlFor="servicio" className="block text-xs sm:text-sm text-stone-800 mb-2 font-medium">
          Servicio
        </label>
        <select
          id="servicio"
          name="servicio"
          className="w-full border border-stone-300 h-11 sm:h-12 px-3 sm:px-4 bg-white text-sm sm:text-base rounded-md focus:border-black focus:ring-black"
        >
          <option value="">Selecciona una opción</option>
          <option>Valoración de propiedad</option>
          <option>Comprar piso en San Vicente</option>
          <option>Alquiler cerca Universidad Alicante</option>
          <option>Asesoramiento de inversión</option>
          <option>Consulta general</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-xs sm:text-sm text-stone-800 mb-2 font-medium">
          Mensaje *
        </label>
        <Textarea id="mensaje" name="mensaje" minLength={5} className="min-h-[120px]" required />
      </div>

      {/* Honeypot (oculto a humanos) */}
      <input type="text" name="company" aria-hidden="true" tabIndex={-1} className="hidden" />

      <Button type="submit" className="w-full bg-black hover:bg-stone-800 text-white h-11 sm:h-12" disabled={loading}>
        {loading ? "Enviando..." : "Enviar consulta"}
      </Button>

      {/* Feedback */}
      {ok === true && (
        <p className="text-green-700 text-sm" role="status">
          ¡Gracias! Te responderemos en menos de 24 horas.
        </p>
      )}
      {ok === false && error && (
        <p className="text-red-700 text-sm" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
