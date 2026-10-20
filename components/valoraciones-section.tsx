"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { contactInfo } from "@/lib/contact-info"
import { Mail, Send } from "lucide-react"

interface FormData {
  zona: string
  tipo: "piso" | "atico" | "chalet" | "adosado" | "duplex" | "loft" | "estudio" | ""
  superficie: string
  habitaciones: string
  banos: string
  estado: "nuevo" | "reformado" | "bueno" | "a reformar" | ""
  planta: string
  ascensor: boolean
  garaje: boolean
  terraza: boolean
  piscina: boolean
  exterior: boolean
  orientacion: "n" | "s" | "e" | "o" | "ne" | "no" | "se" | "so" | ""
  anio: string
  eficiencia: "A" | "B" | "C" | "D" | "E" | "F" | "G" | ""
  contacto: string // email o teléfono
  hp?: string // honeypot
}

interface FormErrors { [k: string]: string | undefined }

export default function ValoracionesSection() {
  const [formData, setFormData] = useState<FormData>({
    zona: "",
    tipo: "",
    superficie: "",
    habitaciones: "",
    banos: "",
    estado: "",
    planta: "",
    ascensor: true,
    garaje: false,
    terraza: false,
    piscina: false,
    exterior: true,
    orientacion: "",
    anio: "",
    eficiencia: "",
    contacto: "",
    hp: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState<null | { ok: boolean; msg: string }>(null)

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }))
    if (errors[field as string]) setErrors((prev) => ({ ...prev, [field as string]: undefined }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.zona.trim()) newErrors.zona = "La zona es obligatoria"
    if (!formData.tipo) newErrors.tipo = "Selecciona un tipo de propiedad"

    const sup = Number(formData.superficie)
    if (!sup || sup <= 10 || sup > 1000) newErrors.superficie = "Introduce m² válidos (10–1000)"

    const hab = Number(formData.habitaciones)
    if (isNaN(hab) || hab < 0 || hab > 12) newErrors.habitaciones = "Habitaciones fuera de rango"

    const ban = Number(formData.banos)
    if (!ban || ban < 1 || ban > 8) newErrors.banos = "Baños fuera de rango (1–8)"

    if (!formData.estado) newErrors.estado = "Selecciona el estado"

    // contacto: email o teléfono (regex simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9+()\-\s]{7,}$/
    if (!formData.contacto || (!emailRegex.test(formData.contacto) && !phoneRegex.test(formData.contacto))) {
      newErrors.contacto = "Introduce un email o teléfono válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSent(null)
    if (!validateForm()) return

    // honeypot
    if (formData.hp && formData.hp.length > 0) {
      setSent({ ok: true, msg: "Gracias. (hp)" })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/valoraciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "pagina-valoraciones" }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Error al enviar la solicitud")
      }

      setSent({ ok: true, msg: "¡Solicitud enviada! Revisaremos los datos y te contactaremos con tu valoración." })
      // Opcional: limpiar algunos campos
      // setFormData({...formData, contacto: ""})
    } catch (err: any) {
      setSent({ ok: false, msg: `No se ha podido enviar. Inténtalo de nuevo o llámanos al ${contactInfo.phone}.` })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3 sm:mb-4">Valoración gratuita</p>
          <h1 className="page-title text-black mb-4 sm:mb-6 text-balance">
            ¿Cuánto vale tu vivienda en San Vicente del Raspeig?
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
            Cuéntanos cómo es tu vivienda y te prepararemos una valoración orientativa según el mercado de la zona,
            sin coste y sin compromiso.
          </p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-3 max-w-4xl">
            {[
              { title: "Nos envías los datos", text: "Solo lo básico: zona, tipo, superficie y cómo contactarte." },
              { title: "Analizamos el mercado", text: "Revisamos viviendas comparables en tu zona y su situación." },
              { title: "Te contactamos", text: "Te explicamos el rango de precio y, si quieres, la estrategia de venta." },
            ].map((item, index) => (
              <li key={item.title} className="rounded-xl border border-black/[0.08] bg-stone-50 p-4 sm:p-5">
                <span className="font-display text-2xl text-stone-400" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-medium text-black">{item.title}</p>
                <p className="mt-1 text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <Card className="border border-black/[0.08] bg-white">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
              {/* Contacto */}
              <div className="space-y-2">
                <Label htmlFor="contacto" className="text-xs sm:text-sm text-stone-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Correo o teléfono para enviarte la valoración
                </Label>
                <Input
                  id="contacto"
                  type="text"
                  placeholder="tu-email@ejemplo.com o 600 123 123"
                  value={formData.contacto}
                  onChange={(e) => handleInputChange("contacto", e.target.value)}
                  className={`h-11 sm:h-12 border-black/10 text-sm sm:text-base ${errors.contacto ? "border-red-500" : ""}`}
                />
                {errors.contacto && <p className="text-xs sm:text-sm text-red-600">{errors.contacto}</p>}
              </div>

              {/* Honeypot oculto */}
              <input
                type="text"
                name="website"
                aria-hidden
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                value={formData.hp}
                onChange={(e) => handleInputChange("hp", e.target.value)}
              />

              {/* Zona y tipo */}
              <div className="space-y-2">
                <Label htmlFor="zona" className="text-xs sm:text-sm text-stone-700">Zona o Dirección</Label>
                <Input
                  id="zona"
                  type="text"
                  placeholder="Ej: Haygon / UA, San Vicente"
                  value={formData.zona}
                  onChange={(e) => handleInputChange("zona", e.target.value)}
                  className={`h-11 sm:h-12 border-black/10 text-sm sm:text-base ${errors.zona ? "border-red-500" : ""}`}
                />
                {errors.zona && <p className="text-xs sm:text-sm text-red-600">{errors.zona}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <Label htmlFor="tipo" className="text-xs sm:text-sm text-stone-700">Tipo de Propiedad</Label>
                  <select
                    id="tipo"
                    value={formData.tipo}
                    onChange={(e) => handleInputChange("tipo", e.target.value)}
                    className={`w-full h-11 sm:h-12 px-3 sm:px-4 border border-black/10 bg-white text-sm sm:text-base rounded-md ${errors.tipo ? "border-red-500" : ""}`}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="piso">Piso</option>
                    <option value="atico">Ático</option>
                    <option value="duplex">Dúplex</option>
                    <option value="loft">Loft</option>
                    <option value="estudio">Estudio</option>
                    <option value="chalet">Chalet</option>
                    <option value="adosado">Adosado</option>
                  </select>
                  {errors.tipo && <p className="text-xs sm:text-sm text-red-600">{errors.tipo}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="superficie" className="text-xs sm:text-sm text-stone-700">Superficie (m²)</Label>
                  <Input
                    id="superficie"
                    type="number"
                    min="10"
                    placeholder="Ej: 85"
                    value={formData.superficie}
                    onChange={(e) => handleInputChange("superficie", e.target.value)}
                    className={`h-11 sm:h-12 border-black/10 text-sm sm:text-base ${errors.superficie ? "border-red-500" : ""}`}
                  />
                  {errors.superficie && <p className="text-xs sm:text-sm text-red-600">{errors.superficie}</p>}
                </div>
              </div>

              {/* Habitaciones y baños */}
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <Label htmlFor="habitaciones" className="text-xs sm:text-sm text-stone-700">Habitaciones</Label>
                  <Input
                    id="habitaciones"
                    type="number"
                    min="0"
                    max="12"
                    placeholder="Ej: 3"
                    value={formData.habitaciones}
                    onChange={(e) => handleInputChange("habitaciones", e.target.value)}
                    className={`h-11 sm:h-12 border-black/10 text-sm sm:text-base ${errors.habitaciones ? "border-red-500" : ""}`}
                  />
                  {errors.habitaciones && <p className="text-xs sm:text-sm text-red-600">{errors.habitaciones}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="banos" className="text-xs sm:text-sm text-stone-700">Baños</Label>
                  <Input
                    id="banos"
                    type="number"
                    min="1"
                    max="8"
                    placeholder="Ej: 2"
                    value={formData.banos}
                    onChange={(e) => handleInputChange("banos", e.target.value)}
                    className={`h-11 sm:h-12 border-black/10 text-sm sm:text-base ${errors.banos ? "border-red-500" : ""}`}
                  />
                  {errors.banos && <p className="text-xs sm:text-sm text-red-600">{errors.banos}</p>}
                </div>
              </div>

              {/* Estado y planta */}
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <Label htmlFor="estado" className="text-xs sm:text-sm text-stone-700">Estado</Label>
                  <select
                    id="estado"
                    value={formData.estado}
                    onChange={(e) => handleInputChange("estado", e.target.value)}
                    className={`w-full h-11 sm:h-12 px-3 sm:px-4 border border-black/10 bg-white text-sm sm:text-base rounded-md ${errors.estado ? "border-red-500" : ""}`}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="nuevo">Nuevo (Obra nueva)</option>
                    <option value="reformado">Reformado</option>
                    <option value="bueno">Buen estado</option>
                    <option value="a reformar">A reformar</option>
                  </select>
                  {errors.estado && <p className="text-xs sm:text-sm text-red-600">{errors.estado}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="planta" className="text-xs sm:text-sm text-stone-700">Planta</Label>
                  <Input
                    id="planta"
                    type="number"
                    placeholder="Ej: 4"
                    value={formData.planta}
                    onChange={(e) => handleInputChange("planta", e.target.value)}
                    className={`h-11 sm:h-12 border-black/10 text-sm sm:text-base ${errors.planta ? "border-red-500" : ""}`}
                  />
                  {errors.planta && <p className="text-xs sm:text-sm text-red-600">{errors.planta}</p>}
                </div>
              </div>

              {/* Checkboxes de extras */}
              <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                <div className="flex items-center space-x-2">
                  <Checkbox id="ascensor" checked={formData.ascensor} onCheckedChange={(v) => handleInputChange("ascensor", Boolean(v))} />
                  <Label htmlFor="ascensor">Ascensor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="garaje" checked={formData.garaje} onCheckedChange={(v) => handleInputChange("garaje", Boolean(v))} />
                  <Label htmlFor="garaje">Garaje</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terraza" checked={formData.terraza} onCheckedChange={(v) => handleInputChange("terraza", Boolean(v))} />
                  <Label htmlFor="terraza">Terraza/Balcón</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="piscina" checked={formData.piscina} onCheckedChange={(v) => handleInputChange("piscina", Boolean(v))} />
                  <Label htmlFor="piscina">Piscina</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="exterior" checked={formData.exterior} onCheckedChange={(v) => handleInputChange("exterior", Boolean(v))} />
                  <Label htmlFor="exterior">Exterior</Label>
                </div>
              </div>

              {/* Orientación, año, eficiencia */}
              <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <Label htmlFor="orientacion" className="text-xs sm:text-sm text-stone-700">Orientación</Label>
                  <select
                    id="orientacion"
                    value={formData.orientacion}
                    onChange={(e) => handleInputChange("orientacion", e.target.value)}
                    className="w-full h-11 sm:h-12 px-3 sm:px-4 border border-black/10 bg-white text-sm sm:text-base rounded-md"
                  >
                    <option value="">N/D</option>
                    <option value="n">N</option>
                    <option value="ne">NE</option>
                    <option value="e">E</option>
                    <option value="se">SE</option>
                    <option value="s">S</option>
                    <option value="so">SO</option>
                    <option value="o">O</option>
                    <option value="no">NO</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="anio" className="text-xs sm:text-sm text-stone-700">Año construcción</Label>
                  <Input
                    id="anio"
                    type="number"
                    placeholder="Ej: 1998"
                    value={formData.anio}
                    onChange={(e) => handleInputChange("anio", e.target.value)}
                    className={`h-11 sm:h-12 border-black/10 text-sm sm:text-base ${errors.anio ? "border-red-500" : ""}`}
                  />
                  {errors.anio && <p className="text-xs sm:text-sm text-red-600">{errors.anio}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eficiencia" className="text-xs sm:text-sm text-stone-700">Eficiencia energética</Label>
                  <select
                    id="eficiencia"
                    value={formData.eficiencia}
                    onChange={(e) => handleInputChange("eficiencia", e.target.value)}
                    className="w-full h-11 sm:h-12 px-3 sm:px-4 border border-black/10 bg-white text-sm sm:text-base rounded-md"
                  >
                    <option value="">N/D</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                  </select>
                </div>
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-black hover:bg-stone-800 text-white h-12 sm:h-14 text-sm sm:text-base">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {submitting ? "Enviando…" : "Solicitar valoración"}
              </Button>

              <div aria-live="polite">
                {sent && (
                  <div className={`mt-4 text-sm ${sent.ok ? "text-green-700" : "text-red-700"}`}>{sent.msg}</div>
                )}
              </div>

              <p className="text-xs text-center text-stone-500 mt-2 leading-relaxed">
                La valoración es orientativa y no sustituye a una tasación oficial. Usaremos tus datos solo para
                responder a tu solicitud. Más información en la{" "}
                <Link href="/privacidad" className="underline hover:text-black">
                  política de privacidad
                </Link>
                .
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
