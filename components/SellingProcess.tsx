const steps = [
  {
    title: "Valoración",
    description:
      "Revisamos tu vivienda, el momento de mercado y la zona para decidir con qué precio y enfoque conviene salir.",
    detail: "Aquí definimos expectativas, precio de salida y siguientes pasos.",
  },
  {
    title: "Estrategia",
    description:
      "Preparamos publicación, argumentario comercial y gestión de visitas para mover la vivienda con criterio.",
    detail: "Tu vivienda no se publica sin una estrategia clara detrás.",
  },
  {
    title: "Venta",
    description:
      "Filtramos ofertas, negociamos y coordinamos documentación hasta firma para cerrar con seguridad.",
    detail: "Te acompañamos hasta el final para evitar bloqueos de última hora.",
  },
]

export default function SellingProcess() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-4">Cómo trabajamos la venta</p>
          <h2 className="section-title text-black">
            Un proceso claro para vender con menos dudas
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-[1.33] text-stone-600">
            Esto es lo que pasa, paso a paso, cuando decides vender tu vivienda con nosotros.
          </p>
        </div>

        <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t border-black pt-6">
              <span className="block text-[60px] font-light leading-none tracking-[-0.05em] text-stone-300" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-[30px] font-light leading-[1.14] tracking-[-0.03em] text-black">{step.title}</h3>
              <p className="mt-4 text-base leading-[1.49] text-stone-700">{step.description}</p>
              <p className="mt-4 text-sm leading-[1.5] text-stone-500">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
