import { Home, LineChart, BadgeCheck } from "lucide-react"

const steps = [
  {
    title: "Valoración",
    description:
      "Revisamos tu vivienda, el momento de mercado y la zona para decidir con qué precio y enfoque conviene salir.",
    detail: "Aquí definimos expectativas, precio de salida y siguientes pasos.",
    note: "Primero entendemos el punto de partida.",
    icon: Home,
  },
  {
    title: "Estrategia",
    description:
      "Preparamos publicación, argumentario comercial y gestión de visitas para mover la vivienda con criterio.",
    detail: "Tu vivienda no se publica sin una estrategia clara detrás.",
    note: "Después activamos la parte comercial.",
    icon: LineChart,
  },
  {
    title: "Venta",
    description:
      "Filtramos ofertas, negociamos y coordinamos documentación hasta firma para cerrar con seguridad.",
    detail: "Te acompañamos hasta el final para evitar bloqueos de última hora.",
    note: "Cerramos sin perder control del proceso.",
    icon: BadgeCheck,
  },
]

export default function SellingProcess() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500">Cómo trabajamos la venta</p>
          <h2 className="font-playfair text-3xl font-light leading-tight text-black sm:text-4xl md:text-5xl">
            Un proceso claro para vender con menos dudas
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-700 sm:text-lg">
            Después de entender el valor que aportamos, esto es lo que pasa paso a paso cuando decides avanzar con
            nosotros.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <article key={step.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-stone-400">0{index + 1}</span>
                </div>

                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-stone-500">{step.note}</p>
                <h3 className="text-2xl font-light text-black">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">{step.description}</p>
                <p className="mt-4 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">
                  {step.detail}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
