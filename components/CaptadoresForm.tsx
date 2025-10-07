"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function CaptadoresForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      nombre: formData.get("nombre"),
      apellidos: formData.get("apellidos"),
      email: formData.get("email"),
      telefono: formData.get("telefono"),
      mensaje: formData.get("mensaje"),
    }

    try {
      const res = await fetch("/api/captadores", {
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
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative">
      {/* Campos */}
      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
        <Input name="nombre" required placeholder="Nombre" className="border-stone-300 h-11 sm:h-12" />
        <Input name="apellidos" required placeholder="Apellidos" className="border-stone-300 h-11 sm:h-12" />
      </div>

      <Input type="email" name="email" required placeholder="tu@email.com" className="border-stone-300 h-11 sm:h-12" />
      <Input name="telefono" required placeholder="Teléfono" className="border-stone-300 h-11 sm:h-12" />

      <Textarea
        name="mensaje"
        placeholder="Cuéntanos por qué te interesa colaborar..."
        className="border-stone-300 min-h-[100px]"
      />

      {/* Botón */}
      <motion.button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-black hover:bg-stone-800 text-white h-11 sm:h-12 rounded-lg relative overflow-hidden disabled:opacity-70"
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
              ¡Enviado correctamente ✅!
            </motion.span>
          ) : status === "error" ? (
            <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Error al enviar ❌
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Solicitar información del programa
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Feedback */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            key="msg-success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-3 text-green-600 text-sm"
          >
            Tu solicitud se ha enviado correctamente. Te contactaremos pronto.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            key="msg-error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-3 text-red-600 text-sm"
          >
            Ocurrió un error al enviar. Intenta de nuevo.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
