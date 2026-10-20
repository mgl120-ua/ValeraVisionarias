"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ValoracionForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      nombre: formData.get("nombre"),
      telefono: formData.get("telefono"),
      email: formData.get("email"),
      direccion: formData.get("direccion"),
      tipo: formData.get("tipo"),
      fecha: formData.get("fecha"),
    }

    try {
      const res = await fetch("/api/valoraciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 relative">
      <div>
        <label className="block text-sm text-stone-700 mb-1">Tipo de propiedad</label>
        <select
          name="tipo"
          className="w-full border border-black/10 rounded-xl p-2 text-sm"
          defaultValue=""
          required
        >
          <option value="" disabled>Selecciona una opción</option>
          <option value="Piso">Piso</option>
          <option value="Chalet / Casa">Chalet / Casa</option>
          <option value="Terreno">Terreno</option>
          <option value="Local / Oficina">Local / Oficina</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-stone-700 mb-1">Dirección aproximada</label>
        <Textarea
          name="direccion"
          required
          className="border-black/10 min-h-[80px] text-sm"
          placeholder="Calle, zona o urbanización..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-stone-700 mb-1">Nombre</label>
          <Input name="nombre" required placeholder="Tu nombre" className="h-10" />
        </div>
        <div>
          <label className="block text-sm text-stone-700 mb-1">Teléfono</label>
          <Input name="telefono" required placeholder="Tu teléfono" className="h-10" />
        </div>
      </div>

      <Input type="email" name="email" placeholder="tu@email.com" className="h-10" />

      <div>
        <label className="block text-sm text-stone-700 mb-1">Fecha preferida</label>
        <Input type="date" name="fecha" className="h-10" />
      </div>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-black hover:bg-stone-800 text-white h-11 rounded-xl disabled:opacity-70"
        whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {status === "sending" ? (
            <motion.span key="sending" className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Enviando...
            </motion.span>
          ) : status === "success" ? (
            <motion.span key="success">✅ Enviado correctamente</motion.span>
          ) : status === "error" ? (
            <motion.span key="error">❌ Error al enviar</motion.span>
          ) : (
            <motion.span key="idle">Solicitar Visita de Tasación</motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {status === "success" && (
        <p className="text-green-600 text-sm mt-2">Tu solicitud se ha enviado. Te contactaremos pronto.</p>
      )}
    </form>
  )
}
