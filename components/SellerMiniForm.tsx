"use client"

import { useState } from "react"
import Link from "next/link"
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
import { contactInfo } from "@/lib/contact-info"

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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

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
    if (!result.ok) {
      setStatus("error")
      return
    }

    trackSellerEvent("lead_form_submit", {
      source: payload.source,
      property_type: payload.tipo,
      form_name: "seller-mini-form",
    })

    setStatus("success")
    setFormData(initialState)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
      className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft sm:p-7"
    >
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-2xl font-light tracking-[-0.03em] text-black sm:text-[30px]">¿Cuánto vale tu vivienda?</h2>
        <p className="text-sm text-stone-500">Valoración orientativa, gratuita y sin compromiso</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 lg:grid-cols-[1.35fr_0.95fr_1.05fr_auto] lg:items-end">
        <div>
          <label
            htmlFor="hero-zona"
            className="mb-2 block text-left text-sm text-stone-600"
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
            aria-describedby={errors.zona ? "hero-zona-error" : undefined}
            className="h-12 text-base text-black placeholder:text-stone-400"
          />
          {errors.zona ? <p id="hero-zona-error" className="mt-2 text-left text-xs text-red-700">{errors.zona}</p> : null}
        </div>

        <div>
          <label
            htmlFor="hero-tipo"
            className="mb-2 block text-left text-sm text-stone-600"
          >
            Tipo de vivienda
          </label>
          <select
            id="hero-tipo"
            value={formData.tipo}
            onChange={(event) => handleChange("tipo", event.target.value as SellerPropertyType)}
            aria-invalid={Boolean(errors.tipo)}
            aria-describedby={errors.tipo ? "hero-tipo-error" : undefined}
            className="h-12 w-full rounded-xl border border-black/10 bg-black/[0.03] px-3 text-base text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Selecciona</option>
            <option value="piso">Piso</option>
            <option value="atico">Ático</option>
            <option value="chalet">Chalet</option>
            <option value="adosado">Adosado</option>
            <option value="duplex">Dúplex</option>
            <option value="bungalow">Bungalow</option>
            <option value="otro">Otro</option>
          </select>
          {errors.tipo ? <p id="hero-tipo-error" className="mt-2 text-left text-xs text-red-700">{errors.tipo}</p> : null}
        </div>

        <div>
          <label
            htmlFor="hero-contacto"
            className="mb-2 block text-left text-sm text-stone-600"
          >
            Teléfono o email
          </label>
          <Input
            id="hero-contacto"
            value={formData.contacto}
            onChange={(event) => handleChange("contacto", event.target.value)}
            placeholder="600 123 123 o tu@email.com"
            aria-invalid={Boolean(errors.contacto)}
            aria-describedby={errors.contacto ? "hero-contacto-error" : undefined}
            className="h-12 text-base text-black placeholder:text-stone-400"
          />
          {errors.contacto ? <p id="hero-contacto-error" className="mt-2 text-left text-xs text-red-700">{errors.contacto}</p> : null}
        </div>

        <div className="flex items-end lg:min-w-[230px]">
          <Button
            type="submit"
            disabled={status === "sending"}
            className="h-12 w-full bg-black px-5 text-[15px] font-normal text-white hover:bg-stone-800"
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

      <div aria-live="polite" className="text-left text-sm">
        {status === "success" ? (
          <p className="mt-4 rounded-xl bg-stone-100 px-4 py-3 text-black">
            Solicitud recibida. Te contactaremos por el teléfono o email indicado para preparar tu valoración.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-red-800">
            No se ha podido enviar. Inténtalo de nuevo o llámanos al{" "}
            <a href={contactInfo.phoneHref} className="font-medium underline">
              {contactInfo.phone}
            </a>
            .
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-2 text-left text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Valoración orientativa gratuita. Revisamos tu caso y te respondemos en menos de 24h.</p>
        <p className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Sin compromiso.{" "}
          <Link href="/privacidad" className="underline hover:text-black">
            Política de privacidad
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
