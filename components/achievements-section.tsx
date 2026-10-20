import Link from "next/link"

export default function AchievementsSection() {
  const metrics = [
    {
      value: "4,3/5",
      label: "Valoración en Google",
      description: "Más de 20 reseñas de clientes en nuestra ficha de Google.",
    },
    {
      value: "Gratis",
      label: "Valoración de tu vivienda",
      description: "Te orientamos sobre precio y estrategia de venta sin coste y sin compromiso.",
    },
    {
      value: "24 h",
      label: "Respuesta a tu solicitud",
      description: "Revisamos tu caso y te contactamos en menos de 24 horas.",
    },
  ]

  return (
    <section id="logros" className="relative overflow-hidden bg-black py-24 md:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523130746625-d4146b1f88bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40" aria-hidden="true" />

      <div className="relative mx-auto max-w-page px-4 text-white sm:px-6 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-white/70">Confianza local</p>
          <h2 className="section-title text-white">Por qué confiar en nosotros</h2>
          <p className="mt-5 max-w-2xl text-lg leading-[1.33] text-white/80">
            Conocemos el mercado de San Vicente del Raspeig y te acompañamos de principio a fin, con trato directo y
            transparente.
          </p>
        </div>

        <dl className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="border-t border-white/40 pt-6">
              <dt className="text-sm text-white/70">{metric.label}</dt>
              <dd className="mt-3 text-[60px] font-light leading-[0.96] tracking-[-0.045em]">{metric.value}</dd>
              <dd className="mt-4 max-w-xs text-base leading-[1.49] text-white/75">{metric.description}</dd>
            </div>
          ))}
        </dl>

        <Link
          href="#seller-contact-form"
          className="mt-16 inline-flex h-12 items-center rounded-xl bg-white px-7 text-[15px] text-black transition-colors hover:bg-stone-100"
        >
          Agenda tu valoración gratuita
        </Link>
      </div>
    </section>
  )
}
