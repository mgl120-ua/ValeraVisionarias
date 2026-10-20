import { TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AchievementsSection() {
  const metrics = [
    {
      value: "+120",
      label: "Viviendas vendidas",
      description: "Operaciones cerradas con seguimiento completo y foco en propietarios.",
      tag: "Resultados reales",
    },
    {
      value: "21 días",
      label: "Tiempo medio de venta",
      description: "Ventas rápidas gracias a precio, presentación y filtrado comercial.",
      tag: "Ventas rápidas",
    },
    {
      value: "4,3/5",
      label: "Valoración en Google",
      description: "Más de 20 reseñas de clientes en nuestra ficha de Google.",
      tag: "Confianza local",
    },
  ]

  return (
    <section id="logros" className="relative bg-neutral-200 py-16 sm:py-20 md:py-24 lg:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523130746625-d4146b1f88bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      <div className="relative container mx-auto px-4 text-center text-white sm:px-6 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 sm:mb-8 sm:h-16 sm:w-16">
            <TrendingUp className="h-7 w-7 text-white sm:h-8 sm:w-8" aria-hidden="true" />
          </div>

          <h2 className="mb-6 font-playfair text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Resultados reales
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Menos tiempo en mercado, mejor preparación comercial y una experiencia cuidada de principio a fin.
          </p>

          <div className="mb-10 grid gap-6 sm:mb-12 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/30 bg-white/90 p-6 text-left text-black backdrop-blur-sm sm:p-8"
              >
                <p className="mb-4 inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-stone-600">
                  {metric.tag}
                </p>
                <p className="mb-2 font-playfair text-4xl font-light sm:text-5xl">{metric.value}</p>
                <p className="text-lg font-medium text-black">{metric.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">{metric.description}</p>
              </div>
            ))}
          </div>

          <Link href="#seller-contact-form">
            <Button size="lg" className="h-11 bg-white px-8 text-sm font-medium text-black hover:bg-stone-100 sm:h-12 sm:px-10 sm:text-base">
              Agenda tu valoración gratuita
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
