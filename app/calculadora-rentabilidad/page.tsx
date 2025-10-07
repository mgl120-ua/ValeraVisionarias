"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Calculator, TrendingUp } from "lucide-react"

type Num = number | ""

function toNum(v: string): Num {
  if (v.trim() === "") return ""
  const n = Number(v.replace(",", "."))
  return Number.isFinite(n) ? n : ""
}

const fmt = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
const fmt2 = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 })

export default function RentabilidadPage() {
  const [precio, setPrecio] = useState<Num>(150000)
  const [alquilerMes, setAlquilerMes] = useState<Num>(850)
  const [reforma, setReforma] = useState<Num>(10000)
  const [gastosCierre, setGastosCierre] = useState<Num>(8000)

  // Gastos anuales fijos (IBI, comunidad, seguro, mantenimiento)
  const [ibi, setIbi] = useState<Num>(350)
  const [comunidad, setComunidad] = useState<Num>(45) // mensual
  const [seguro, setSeguro] = useState<Num>(180)
  const [mantenimientoPct, setMantenimientoPct] = useState<Num>(5) // % del alquiler anual

  // Vacancia y gestión
  const [vacanciaPct, setVacanciaPct] = useState<Num>(5)
  const [gestionPct, setGestionPct] = useState<Num>(0)

  // Hipoteca
  const [usaHipoteca, setUsaHipoteca] = useState(true)
  const [entradaPct, setEntradaPct] = useState<Num>(20)
  const [interes, setInteres] = useState<Num>(3.5) // TIN anual
  const [plazoAnios, setPlazoAnios] = useState<Num>(30)

  const resultado = useMemo(() => {
    if (
      precio === "" ||
      alquilerMes === "" ||
      reforma === "" ||
      gastosCierre === "" ||
      ibi === "" ||
      comunidad === "" ||
      seguro === "" ||
      mantenimientoPct === "" ||
      vacanciaPct === "" ||
      gestionPct === "" ||
      interes === "" ||
      plazoAnios === "" ||
      entradaPct === ""
    ) {
      return null
    }

    // Inversión total inicial
    const entrada = usaHipoteca ? (precio * (entradaPct / 100)) : precio
    const inversionInicial = entrada + reforma + gastosCierre

    // Hipoteca
    const principal = usaHipoteca ? precio - entrada : 0
    const i = (interes / 100) / 12
    const n = (plazoAnios * 12)
    const cuotaHipotecaMes = usaHipoteca && i > 0 && n > 0
      ? principal * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
      : usaHipoteca && n > 0 ? principal / n : 0

    // Ingresos y gastos
    const ingresosAnuales = alquilerMes * 12
    const vacancia = ingresosAnuales * (vacanciaPct / 100)
    const gestion = ingresosAnuales * (gestionPct / 100)
    const mantenimiento = ingresosAnuales * (mantenimientoPct / 100)
    const comunidadAnual = comunidad * 12

    const gastosOperativos = vacancia + gestion + mantenimiento + comunidadAnual + ibi + seguro
    const noi = ingresosAnuales - gastosOperativos // Net Operating Income (sin deuda)

    const deudaAnual = cuotaHipotecaMes * 12
    const cashFlowAnual = noi - (usaHipoteca ? deudaAnual : 0)
    const cashFlowMensual = cashFlowAnual / 12

    // Métricas
    const rentabilidadBruta = ingresosAnuales / precio * 100
    const rentabilidadNeta = noi / precio * 100
    const cashOnCash = inversionInicial > 0 ? (cashFlowAnual / inversionInicial) * 100 : 0

    // Punto de equilibrio: alquiler mínimo para cash-flow 0
    // CF = (alquiler*12 - gastosOperativosVar(alquiler) - gastosFijos) - deuda
    // gastosOperativosVar = (vacancia% + gestion% + mantenimiento%) * alquiler*12
    const varPct = (vacanciaPct + gestionPct + mantenimientoPct) / 100
    const gastosFijosAnuales = comunidadAnual + ibi + seguro
    const alquilerAnualBreakEven = (usaHipoteca ? deudaAnual : 0) + gastosFijosAnuales
      // dividir por (1 - varPct) para "desaplicar" el porcentaje variable
      / (1 - varPct || 1)
    const alquilerMensualBreakEven = alquilerAnualBreakEven / 12

    return {
      inversionInicial,
      cuotaHipotecaMes,
      ingresosAnuales,
      gastosOperativos,
      noi,
      deudaAnual,
      cashFlowAnual,
      cashFlowMensual,
      rentabilidadBruta,
      rentabilidadNeta,
      cashOnCash,
      alquilerMensualBreakEven
    }
  }, [
    precio, alquilerMes, reforma, gastosCierre,
    ibi, comunidad, seguro, mantenimientoPct,
    vacanciaPct, gestionPct, usaHipoteca,
    entradaPct, interes, plazoAnios
  ])

  const reset = () => {
    setPrecio(150000); setAlquilerMes(850); setReforma(10000); setGastosCierre(8000)
    setIbi(350); setComunidad(45); setSeguro(180); setMantenimientoPct(5)
    setVacanciaPct(5); setGestionPct(0)
    setUsaHipoteca(true); setEntradaPct(20); setInteres(3.5); setPlazoAnios(30)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="font-playfair text-3xl sm:text-4xl tracking-tight">Calculadora de Rentabilidad</h1>
        <p className="text-stone-600 mt-2">
          Estima rentabilidad bruta y neta, cash-flow y cash-on-cash con gastos reales y opción de hipoteca.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-8">
            {/* Precio / Alquiler */}
            <section className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Precio de compra (€)</Label>
                <Input inputMode="decimal" value={precio} onChange={(e)=>setPrecio(toNum(e.target.value))} />
              </div>
              <div>
                <Label>Alquiler mensual objetivo (€)</Label>
                <Input inputMode="decimal" value={alquilerMes} onChange={(e)=>setAlquilerMes(toNum(e.target.value))} />
              </div>
              <div>
                <Label>Reforma (€)</Label>
                <Input inputMode="decimal" value={reforma} onChange={(e)=>setReforma(toNum(e.target.value))} />
              </div>
              <div>
                <Label>Gastos de cierre / impuestos (€)</Label>
                <Input inputMode="decimal" value={gastosCierre} onChange={(e)=>setGastosCierre(toNum(e.target.value))} />
              </div>
            </section>

            {/* Gastos recurrentes */}
            <section>
              <h3 className="font-medium mb-3">Gastos recurrentes</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label>IBI anual (€)</Label>
                  <Input inputMode="decimal" value={ibi} onChange={(e)=>setIbi(toNum(e.target.value))}/>
                </div>
                <div>
                  <Label>Comunidad mensual (€)</Label>
                  <Input inputMode="decimal" value={comunidad} onChange={(e)=>setComunidad(toNum(e.target.value))}/>
                </div>
                <div>
                  <Label>Seguro anual (€)</Label>
                  <Input inputMode="decimal" value={seguro} onChange={(e)=>setSeguro(toNum(e.target.value))}/>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label>Mantenimiento (% de alquiler)</Label>
                  <Input inputMode="decimal" value={mantenimientoPct} onChange={(e)=>setMantenimientoPct(toNum(e.target.value))}/>
                </div>
                <div>
                  <Label>Vacancia (% del año)</Label>
                  <Input inputMode="decimal" value={vacanciaPct} onChange={(e)=>setVacanciaPct(toNum(e.target.value))}/>
                </div>
                <div>
                  <Label>Gestión (% del alquiler)</Label>
                  <Input inputMode="decimal" value={gestionPct} onChange={(e)=>setGestionPct(toNum(e.target.value))}/>
                </div>
              </div>
            </section>

            {/* Hipoteca */}
            <section className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium">Hipoteca</h3>
                <Button variant={usaHipoteca ? "default" : "secondary"} size="sm" onClick={()=>setUsaHipoteca(v=>!v)}>
                  {usaHipoteca ? "Con hipoteca" : "Sin hipoteca"}
                </Button>
              </div>

              <div className={`grid sm:grid-cols-3 gap-4 transition-opacity ${usaHipoteca ? "opacity-100" : "opacity-60"}`}>
                <div>
                  <Label>Entrada (%)</Label>
                  <div className="flex items-center gap-3">
                    <Input inputMode="decimal" value={entradaPct} onChange={(e)=>setEntradaPct(toNum(e.target.value))}/>
                    <span className="text-sm text-stone-500 whitespace-nowrap">{fmt.format(Number(precio||0)*(Number(entradaPct||0)/100))}</span>
                  </div>
                </div>
                <div>
                  <Label>Interés TIN (% anual)</Label>
                  <Input inputMode="decimal" value={interes} onChange={(e)=>setInteres(toNum(e.target.value))}/>
                </div>
                <div>
                  <Label>Plazo (años)</Label>
                  <Input inputMode="numeric" value={plazoAnios} onChange={(e)=>setPlazoAnios(toNum(e.target.value))}/>
                </div>
              </div>
            </section>

            <div className="pt-2 flex gap-3">
              <Button variant="secondary" onClick={reset}>Restablecer</Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              <h3 className="font-medium">Resultados</h3>
            </div>

            {!resultado ? (
              <p className="text-sm text-stone-600">Rellena todos los campos para ver los cálculos.</p>
            ) : (
              <div className="space-y-4">
                <Stat label="Inversión inicial" value={fmt.format(resultado.inversionInicial)} />
                <hr className="border-stone-200" />
                <Stat label="Rentabilidad bruta" value={`${fmt2.format(resultado.rentabilidadBruta)} %`} />
                <Stat label="Rentabilidad neta (NOI/Precio)" value={`${fmt2.format(resultado.rentabilidadNeta)} %`} />
                <hr className="border-stone-200" />
                <Stat label="Cash-flow mensual" value={fmt.format(resultado.cashFlowMensual)} emphasis />
                <Stat label="Cash-on-Cash (año 1)" value={`${fmt2.format(resultado.cashOnCash)} %`} />
                {resultado.cuotaHipotecaMes > 0 && (
                  <Stat label="Cuota hipoteca (mes)" value={fmt.format(resultado.cuotaHipotecaMes)} />
                )}
                <hr className="border-stone-200" />
                <Stat label="Alquiler de equilibrio (mes)" value={fmt.format(resultado.alquilerMensualBreakEven)} />
              </div>
            )}

            <div className="mt-6 rounded-xl border border-stone-200 p-4 bg-stone-50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <p className="font-medium">Consejo rápido</p>
              </div>
              <p className="text-sm text-stone-700">
                Sube <span className="font-medium">entrada</span> o baja <span className="font-medium">vacancia/gestión</span> para mejorar el
                <span className="font-medium"> cash-flow</span>. La <span className="font-medium">rentabilidad neta</span> compara mejor activos que la bruta.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Stat({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-stone-600">{label}</span>
      <span className={`tabular-nums ${emphasis ? "text-xl font-semibold" : "font-medium"}`}>{value}</span>
    </div>
  )
}
