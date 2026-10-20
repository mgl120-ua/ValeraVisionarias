"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function VisitForm({
  propiedad,
  propiedadUrl,
}: {
  propiedad: string
  propiedadUrl: string
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      telefono: formData.get("telefono"),
      fecha: formData.get("fecha"),
      mensaje: formData.get("mensaje"),
      propiedad,
      propiedadUrl,
    }

    try {
      const res = await fetch("/api/visita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      form.reset()
      setTimeout(() => setStatus("idle"), 4000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
      <Input name="nombre" required placeholder="Tu nombre" className="h-10 sm:h-11" />
      <Input name="email" required type="email" placeholder="tu@email.com" className="h-10 sm:h-11" />
      <Input name="telefono" required placeholder="Teléfono" className="h-10 sm:h-11" />

      {/* Campo de fecha */}
      <div>
        <label className="block text-xs sm:text-sm text-stone-700 mb-1">Fecha de visita</label>
        <Input type="date" name="fecha" required className="h-10 sm:h-11" />
      </div>

      <Textarea
        name="mensaje"
        placeholder="Mensaje o disponibilidad adicional..."
        className="min-h-[80px]"
      />

      <motion.button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-black hover:bg-stone-800 text-white h-11 rounded-lg disabled:opacity-70"
        whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {status === "sending" ? (
            <motion.span
              key="sending"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center justify-center gap-2"
            >
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Enviando...
            </motion.span>
          ) : status === "success" ? (
            <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              ✅ Solicitud enviada
            </motion.span>
          ) : status === "error" ? (
            <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              ❌ Error al enviar
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Pedir visita
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="text-xs text-stone-500">
        Usaremos tus datos solo para gestionar tu solicitud de visita.{" "}
        <a href="/privacidad" className="underline hover:text-black">
          Política de privacidad
        </a>
      </p>
    </form>
  )
}
// API Route: app/api/visita/route.ts