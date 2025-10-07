"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Info, Calculator, Percent, Euro, Home, Calendar } from "lucide-react"

function eur(n: number) {
  return n.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 2 })
}
function pct(n: number) {
  return `${n.toFixed(2)}%`
}

export default function SimuladorHipotecaPage() {
  // Valores por defecto realistas en España
  const [precio, setPrecio] = useState(180_000)
  const [entrada, setEntrada] = useState(20) // %
  const [plazo, setPlazo] = useState(30) // años
  const [tin, setTin] = useState(3.25) // % TIN anual
  const [tipo, setTipo] = useState<"fija" | "variable">("fija")
  const [mostrarTabla, setMostrarTabla] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const principal = useMemo(() => {
    const p = precio * (1 - entrada / 100)
    return Math.max(0, Math.round(p))
  }, [precio, entrada])

  const { cuota, interesesTotales, totalAPagar, ltv, taeAprox, schedule } = useMemo(() => {
    const n = plazo * 12
    const r = (tin / 100) / 12 // interés mensual
    const ltv = (principal / precio) * 100 || 0

    // Fórmula de amortización francesa
    const cuota = n > 0 && r > 0
      ? principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : (n > 0 ? principal / n : 0)

    // TAE aproximada añadiendo 0.1–0.3% de gastos recurrentes (muy simplificado)
    const taeAprox = tin + 0.2

    // Generar tabla de amortización (opcional)
    const schedule: Array<{ mes: number; cuota: number; interes: number; amortizacion: number; pendiente: number }> = []
    let restante = principal
    for (let mes = 1; mes <= n; mes++) {
      const interes = restante * r
      const amortizacion = cuota - interes
      restante = Math.max(0, restante - amortizacion)
      if (mes <= 360) { // cap para no crecer infinito en UI
        schedule.push({ mes, cuota, interes, amortizacion, pendiente: restante })
      }
    }
    const interesesTotales = Math.max(0, schedule.reduce((acc, x) => acc + x.interes, 0))
    const totalAPagar = principal + interesesTotales

    return { cuota, interesesTotales, totalAPagar, ltv, taeAprox, schedule }
  }, [plazo, tin, principal, precio])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    // Aquí podrías enviar evento de analytics si quieres
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-wider">
          <Calculator className="h-4 w-4" /> Simulador de Hipoteca
        </span>
        <h1 className="font-playfair mt-4 text-3xl sm:text-4xl md:text-5xl">
          Calcula tu cuota mensual
        </h1>
        <p className="text-muted-foreground mt-3 text-base md:text-lg">
          Conoce tu cuota, el LTV y una TAE aproximada según tus condiciones.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-5">
        {/* Panel de entrada */}
        <Card className="md:col-span-2">
          <CardContent className="space-y-5 p-6">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="precio" className="flex items-center gap-2">
                  <Home className="h-4 w-4" /> Precio de la vivienda
                </Label>
                <div className="flex items-center gap-3">
                  <Euro className="h-4 w-4 opacity-60" />
                  <Input
                    id="precio"
                    inputMode="numeric"
                    value={precio}
                    onChange={(e) => setPrecio(Number(e.target.value.replace(/\D/g, "")) || 0)}
                  />
                </div>
                <Slider
                  value={[precio]}
                  onValueChange={(v) => setPrecio(v[0])}
                  min={50_000}
                  max={1_000_000}
                  step={5_000}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{eur(50_000)}</span>
                  <span>{eur(1_000_000)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="entrada" className="flex items-center gap-2">
                  <Percent className="h-4 w-4" /> Entrada (%)
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="entrada"
                    inputMode="decimal"
                    value={entrada}
                    onChange={(e) => {
                      const v = Number(e.target.value.replace(",", ".")) || 0
                      setEntrada(Math.min(80, Math.max(0, v)))
                    }}
                  />
                  <span className="text-sm text-muted-foreground">({eur((precio * entrada) / 100)} de entrada)</span>
                </div>
                <Slider
                  value={[entrada]}
                  onValueChange={(v) => setEntrada(v[0])}
                  min={0}
                  max={80}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>80%</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="plazo" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Plazo (años)
                  </Label>
                  <Input
                    id="plazo"
                    inputMode="numeric"
                    value={plazo}
                    onChange={(e) => {
                      const v = Number(e.target.value.replace(/\D/g, "")) || 0
                      setPlazo(Math.min(40, Math.max(5, v)))
                    }}
                  />
                  <Slider
                    value={[plazo]}
                    onValueChange={(v) => setPlazo(v[0])}
                    min={5}
                    max={40}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tin" className="flex items-center gap-2">
                    <Percent className="h-4 w-4" /> TIN anual (%)
                  </Label>
                  <Input
                    id="tin"
                    inputMode="decimal"
                    value={tin}
                    onChange={(e) => {
                      const v = Number(e.target.value.replace(",", ".")) || 0
                      setTin(Math.min(12, Math.max(0.1, v)))
                    }}
                  />
                  <Slider
                    value={[tin]}
                    onValueChange={(v) => setTin(v[0])}
                    min={0.1}
                    max={12}
                    step={0.05}
                    className="mt-2"
                  />
                </div>
              </div>

              <Tabs value={tipo} onValueChange={(v) => setTipo(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="fija">Fija</TabsTrigger>
                  <TabsTrigger value="variable">Variable</TabsTrigger>
                </TabsList>
                <TabsContent value="fija" />
                <TabsContent value="variable">
                  <p className="text-xs text-muted-foreground mt-2">
                    Para hipoteca variable se usa el TIN actual como tipo medio. El resultado es orientativo.
                  </p>
                </TabsContent>
              </Tabs>

              <Button type="submit" className="w-full h-11 text-base">
                Calcular ahora
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">Cuota estimada</p>
                  <p className="mt-1 text-2xl font-semibold">{eur(cuota || 0)}</p>
                  <p className="text-xs text-muted-foreground">al mes</p>
                </div>
                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">Importe a financiar</p>
                  <p className="mt-1 text-2xl font-semibold">{eur(principal)}</p>
                  <p className="text-xs text-muted-foreground">Entrada: {eur((precio * entrada) / 100)}</p>
                </div>
                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">LTV</p>
                  <p className="mt-1 text-2xl font-semibold">{pct(ltv || 0)}</p>
                  <p className="text-xs text-muted-foreground">Objetivo habitual: ≤ 80%</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 mt-4">
                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">Intereses totales</p>
                  <p className="mt-1 text-xl font-semibold">{eur(interesesTotales)}</p>
                </div>
                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">Total a pagar</p>
                  <p className="mt-1 text-xl font-semibold">{eur(totalAPagar)}</p>
                </div>
                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">TAE aprox.</p>
                  <p className="mt-1 text-xl font-semibold">{pct(taeAprox)}</p>
                  <p className="text-xs text-muted-foreground">Orientativa, sin comisiones</p>
                </div>
              </div>

              {submitted && (
                <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="mt-[2px] h-4 w-4 shrink-0" />
                  Resultado orientativo. No constituye oferta vinculante. Pueden aplicar comisiones, seguros y requisitos
                  del banco. Consúltanos y te ayudamos a conseguir la mejor financiación.
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button variant="secondary" onClick={() => setMostrarTabla((s) => !s)}>
                  {mostrarTabla ? "Ocultar amortización" : "Ver amortización"}
                </Button>
                <Button variant="outline" asChild>
                  <a href="/contacto">Quiero asesoramiento gratuito</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de amortización */}
          {mostrarTabla && (
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left">Mes</th>
                      <th className="px-4 py-3 text-left">Cuota</th>
                      <th className="px-4 py-3 text-left">Interés</th>
                      <th className="px-4 py-3 text-left">Amortización</th>
                      <th className="px-4 py-3 text-left">Pendiente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.slice(0, 240).map((row) => (
                      <tr key={row.mes} className="border-t">
                        <td className="px-4 py-2">{row.mes}</td>
                        <td className="px-4 py-2">{eur(row.cuota)}</td>
                        <td className="px-4 py-2">{eur(row.interes)}</td>
                        <td className="px-4 py-2">{eur(row.amortizacion)}</td>
                        <td className="px-4 py-2">{eur(row.pendiente)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="px-4 py-3 text-xs text-muted-foreground">
                  Mostrando los {Math.min(240, schedule.length)} primeros meses para una vista rápida.
                </p>
              </CardContent>
            </Card>
          )}

          {/* SEO / Ayuda adicional */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg">¿Cómo calculamos la cuota?</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Usamos la amortización francesa: cuota = P · r · (1+r)<sup>n</sup> / ((1+r)<sup>n</sup> − 1), donde P es el
                principal, r el tipo mensual (TIN/12) y n el número de cuotas. La TAE mostrada es orientativa y no
                incluye comisiones ni seguros.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
