"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    }

    try {
      const res = await fetch("/api/contact", {
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md relative">
      {/* Nombre y Apellidos */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1 text-stone-700">Nombre *</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-stone-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-stone-700">Apellidos </label>
          <input
            type="text"
            name="surname"
            className="w-full border border-stone-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
          />
        </div>
      </div>

      {/* Email y Teléfono */}
      <div>
        <label className="block text-sm font-medium mb-1 text-stone-700">Email *</label>
        <input
          type="email"
          name="email"
          required
          className="w-full border border-stone-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-stone-700">Teléfono </label>
        <input
          type="tel"
          name="phone"
          className="w-full border border-stone-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
        />
      </div>

      {/* Desplegable de servicio */}
      <div>
        <label className="block text-sm font-medium mb-1 text-stone-700">Servicio</label>
        <select
          name="service"
          className="w-full border border-stone-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >          
          <option value="Consulta general">Consulta general</option>
          <option value="Valoración de propiedad">Valoración de propiedad</option>
          <option value="Comprar piso en San Vicente">Comprar piso en San Vicente</option>
          <option value="Alquiler cerca Universidad Alicante">Alquiler cerca Universidad Alicante</option>
          <option value="Asesoramiento de inversión">Asesoramiento de inversión</option>
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-sm font-medium mb-1 text-stone-700">Mensaje</label>
        <textarea
          name="message"
          rows={4}
          className="w-full border border-stone-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
        />
      </div>

      {/* Botón con animación */}
      <motion.button
        type="submit"
        disabled={status === "sending"}
        className="relative bg-black text-white px-6 py-2 rounded-lg overflow-hidden transition-all disabled:opacity-80 disabled:cursor-not-allowed"
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
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Enviando...
            </motion.span>
          ) : status === "success" ? (
            <motion.span
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              Enviado ✅
            </motion.span>
          ) : status === "error" ? (
            <motion.span
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              Error ❌: Envía correo a valeravisionarias@gmail.com 
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              Enviar Consulta
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  )
}
