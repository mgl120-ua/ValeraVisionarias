import { TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AchievementsSection() {
  return (
    <section
      id="logros"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-200"
    >
      {/* Fondo con imagen y overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523130746625-d4146b1f88bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Contenido */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/10 border border-white/20 rounded-full mb-6 sm:mb-8">
            <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 sm:mb-8 leading-tight">
            Un año de grandes logros
          </h2>

          <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12">
            <div className="bg-white/90 text-black border border-white/30 p-6 sm:p-8 lg:p-10 rounded-lg backdrop-blur-sm">
              <p className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-light mb-3 sm:mb-4">80%</p>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                de nuestras ventas se cerraron en{" "}
                <strong className="font-semibold">menos de una semana</strong>
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white/90 text-black border border-white/30 p-6 sm:p-8 rounded-lg backdrop-blur-sm">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light mb-3 sm:mb-4">48h</p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                  La mayoría de ventas, incluso en{" "}
                  <strong className="font-semibold">menos de 48 horas</strong>
                </p>
              </div>

              <div className="bg-white/90 text-black border border-white/30 p-6 sm:p-8 rounded-lg backdrop-blur-sm">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light mb-3 sm:mb-4">100%</p>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                  El 20% restante, siempre{" "}
                  <strong className="font-semibold">al precio estipulado</strong>, en menos de 3 meses
                </p>
              </div>
            </div>
          </div>

          <Link href="#contacto">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-stone-100 px-8 sm:px-10 h-11 sm:h-12 text-sm sm:text-base font-medium"
            >
              Agenda tu valoración gratuita
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
