"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calculator, TrendingUp, PiggyBank } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

// Formateadores
function eur(n: number) {
  return n.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
}
function pct(n: number) {
  return `${n.toFixed(2)}%`
}

// ✅ Componente principal
export default function CalculadoraInversion() {
  const [capital, setCapital] = useState(20000)
  const [aportacion, setAportacion] = useState(200)
  const [rentabilidad, setRentabilidad] = useState(6)
  const [plazo, setPlazo] = useState(10)

  const resultado = useMemo(() => {
    // Cálculo compuesto con aportaciones mensuales
    const i = rentabilidad / 100 / 12
    const n = plazo * 12
    const fvAportaciones = aportacion * ((Math.pow(1 + i, n) - 1) / i)
    const fvCapital = capital * Math.pow(1 + i, n)
    const totalFinal = fvCapital + fvAportaciones
    const invertidoTotal = capital + aportacion * n
    const beneficio = totalFinal - invertidoTotal
    const rentabilidadReal = (beneficio / invertidoTotal) * 100
    return { totalFinal, beneficio, rentabilidadReal, invertidoTotal }
  }, [capital, aportacion, rentabilidad, plazo])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <RentabilidadHeader />

      <div className="grid gap-6 md:grid-cols-5">
        {/* Panel de entrada */}
        <Card className="md:col-span-2">
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label>Capital inicial (€)</Label>
              <Input
                inputMode="numeric"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value.replace(/\D/g, "")) || 0)}
              />
              <Slider
                value={[capital]}
                onValueChange={(v) => setCapital(v[0])}
                min={1000}
                max={500000}
                step={1000}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{eur(1000)}</span>
                <span>{eur(500000)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Aportación mensual (€)</Label>
              <Input
                inputMode="numeric"
                value={aportacion}
                onChange={(e) => setAportacion(Number(e.target.value.replace(/\D/g, "")) || 0)}
              />
              <Slider
                value={[aportacion]}
                onValueChange={(v) => setAportacion(v[0])}
                min={0}
                max={2000}
                step={50}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{eur(0)}</span>
                <span>{eur(2000)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rentabilidad anual esperada (%)</Label>
              <Input
                inputMode="decimal"
                value={rentabilidad}
                onChange={(e) => setRentabilidad(Number(e.target.value.replace(",", ".")) || 0)}
              />
              <Slider
                value={[rentabilidad]}
                onValueChange={(v) => setRentabilidad(v[0])}
                min={0}
                max={15}
                step={0.1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>15%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Plazo (años)</Label>
              <Input
                inputMode="numeric"
                value={plazo}
                onChange={(e) => setPlazo(Number(e.target.value.replace(/\D/g, "")) || 0)}
              />
              <Slider
                value={[plazo]}
                onValueChange={(v) => setPlazo(v[0])}
                min={1}
                max={40}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 año</span>
                <span>40 años</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card className="md:col-span-3">
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">Total invertido</p>
                <p className="mt-1 text-2xl font-semibold">{eur(resultado.invertidoTotal)}</p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">Beneficio estimado</p>
                <p className="mt-1 text-2xl font-semibold text-green-700">{eur(resultado.beneficio)}</p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">Rentabilidad total</p>
                <p className="mt-1 text-2xl font-semibold">{pct(resultado.rentabilidadReal)}</p>
              </div>
            </div>

            <div className="rounded-xl border bg-stone-50 p-5 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <h3 className="font-medium">Consejo</h3>
              </div>
              <p className="text-sm text-stone-700">
                Aumentar las aportaciones mensuales y mantener una rentabilidad constante a largo plazo puede
                multiplicar tus beneficios por el efecto del <strong>interés compuesto</strong>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// 🪶 Encabezado con diseño premium cálido
function RentabilidadHeader() {
  return (
    <section className="relative mb-12 overflow-hidden rounded-3xl from-stone-50 via-amber-50/40 to-white py-20 text-center shadow-subtle">
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/60 px-3 py-1 text-xs uppercase tracking-wider backdrop-blur-sm"
        >
          <PiggyBank className="h-4 w-4 text-amber-700" /> Calculadora de Inversión
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="page-title mt-6 text-stone-900"
        >
          Calcula el crecimiento de tu inversión
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-muted-foreground mt-4 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Simula cómo crece tu dinero con aportaciones mensuales y rentabilidad anual compuesta.
        </motion.p>
      </div>
    </section>
  )
}
