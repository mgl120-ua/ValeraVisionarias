"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Send, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  type SellerLeadPayload,
  type SellerPropertyType,
  isValidSellerContact,
  submitSellerLead,
  trackSellerEvent,
} from "@/lib/seller-leads"

interface SellerMiniFormState {
  zona: string
  tipo: SellerPropertyType
  contacto: string
}

interface SellerMiniFormErrors {
  zona?: string
  tipo?: string
  contacto?: string
}

const initialState: SellerMiniFormState = {
  zona: "",
  tipo: "",
  contacto: "",
}

export default function SellerMiniForm() {
  const [formData, setFormData] = useState<SellerMiniFormState>(initialState)
  const [errors, setErrors] = useState<SellerMiniFormErrors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle")

  const handleChange = <K extends keyof SellerMiniFormState>(field: K, value: SellerMiniFormState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({
      ...prev,
      [field]:
        field === "zona" && typeof value === "string" && !value.trim()
          ? "Indica la zona o dirección."
          : field === "tipo" && !value
            ? "Selecciona el tipo de vivienda."
            : field === "contacto" &&
                typeof value === "string" &&
                value.length > 2 &&
                !isValidSellerContact(value)
              ? "Introduce un teléfono o email válido."
              : undefined,
    }))
  }

  const validate = () => {
    const nextErrors: SellerMiniFormErrors = {}

    if (!formData.zona.trim()) nextErrors.zona = "Indica la zona o dirección."
    if (!formData.tipo) nextErrors.tipo = "Selecciona el tipo de vivienda."
    if (!isValidSellerContact(formData.contacto)) {
      nextErrors.contacto = "Introduce un teléfono o email válido."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return

    setStatus("sending")

    const payload: SellerLeadPayload = {
      ...formData,
      source: "hero-mini-form",
    }

    const result = await submitSellerLead(payload)
    trackSellerEvent("lead_form_submit", {
      source: payload.source,
      property_type: payload.tipo,
      form_name: "seller-mini-form",
      fallback: result.fallback,
    })

    setStatus("success")
    setFormData(initialState)
    window.setTimeout(() => setStatus("idle"), 4500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
      className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/15 bg-black/25 p-4 shadow-2xl backdrop-blur-md sm:p-5"
    >
      <form onSubmit={handleSubmit} className="grid gap-3 lg:grid-cols-[1.35fr_0.95fr_1.05fr_auto] lg:items-end">
        <div>
          <label
            htmlFor="hero-zona"
            className="mb-2 block text-left text-xs font-medium uppercase tracking-[0.2em] text-white/80"
          >
            Zona o dirección
          </label>
          <Input
            id="hero-zona"
            autoComplete="street-address"
            value={formData.zona}
            onChange={(event) => handleChange("zona", event.target.value)}
            placeholder="Ej. Centro, Haygón, calle..."
            aria-invalid={Boolean(errors.zona)}
            className="h-12 border-white/20 bg-white text-black placeholder:text-stone-500"
          />
          {errors.zona ? <p className="mt-2 text-left text-xs text-amber-200">{errors.zona}</p> : null}
        </div>

        <div>
          <label
            htmlFor="hero-tipo"
            className="mb-2 block text-left text-xs font-medium uppercase tracking-[0.2em] text-white/80"
          >
            Tipo de vivienda
          </label>
          <select
            id="hero-tipo"
            value={formData.tipo}
            onChange={(event) => handleChange("tipo", event.target.value as SellerPropertyType)}
            aria-invalid={Boolean(errors.tipo)}
            className="h-12 w-full rounded-md border border-white/20 bg-white px-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <option value="">Selecciona</option>
            <option value="piso">Piso</option>
            <option value="atico">Atico</option>
            <option value="chalet">Chalet</option>
            <option value="adosado">Adosado</option>
            <option value="duplex">Duplex</option>
            <option value="bungalow">Bungalow</option>
            <option value="otro">Otro</option>
          </select>
          {errors.tipo ? <p className="mt-2 text-left text-xs text-amber-200">{errors.tipo}</p> : null}
        </div>

        <div>
          <label
            htmlFor="hero-contacto"
            className="mb-2 block text-left text-xs font-medium uppercase tracking-[0.2em] text-white/80"
          >
            Teléfono o email
          </label>
          <Input
            id="hero-contacto"
            autoComplete="email"
            inputMode="email"
            value={formData.contacto}
            onChange={(event) => handleChange("contacto", event.target.value)}
            placeholder="600 123 123 o tu@email.com"
            aria-invalid={Boolean(errors.contacto)}
            className="h-12 border-white/20 bg-white text-black placeholder:text-stone-500"
          />
          {errors.contacto ? <p className="mt-2 text-left text-xs text-amber-200">{errors.contacto}</p> : null}
        </div>

        <div className="flex items-end lg:min-w-[230px]">
          <Button
            type="submit"
            disabled={status === "sending"}
            className="h-12 w-full bg-white px-5 text-sm font-medium text-black transition-transform duration-200 hover:-translate-y-0.5 hover:bg-stone-100"
          >
            {status === "success" ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Enviado
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                {status === "sending" ? "Enviando..." : "Solicitar valoración"}
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-3 flex flex-col gap-2 text-left text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
        <p>Valoración orientativa gratuita. Revisamos tu caso y te respondemos en menos de 24h.</p>
        <p className="inline-flex items-center gap-1 text-white/90">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Datos protegidos. Sin compromiso.
        </p>
      </div>
    </motion.div>
  )
}
