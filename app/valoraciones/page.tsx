import ValoracionesSection from "@/components/valoraciones-section"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MobileNav from "@/components/mobile-nav"

export default function ValoracionesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Sección de Valoraciones */}
      <ValoracionesSection />

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-light text-black mb-4 sm:mb-6 leading-tight px-4">
              ¿Necesitas una valoración más detallada?
            </h2>
            <p className="text-base sm:text-lg text-stone-600 mb-8 sm:mb-10 leading-relaxed px-4">
              Nuestros expertos pueden realizar una tasación profesional presencial de tu propiedad, analizando todos
              los detalles que pueden afectar su valor de mercado.
            </p>
            <Link href="/#contacto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-black hover:bg-stone-800 text-white px-8 sm:px-10 h-11 sm:h-12 text-sm sm:text-base mx-4"
              >
                Solicitar Visita de Tasación
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
