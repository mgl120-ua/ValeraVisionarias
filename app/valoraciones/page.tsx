import type { Metadata } from "next"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import Link from "next/link"
import ValoracionesSection from "@/components/valoraciones-section"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = pageMetadata({
  title: "Valoración gratuita de vivienda en San Vicente del Raspeig",
  absoluteTitle: true,
  description:
    "Solicita una valoración orientativa y gratuita de tu piso o casa en San Vicente del Raspeig. Analizamos el mercado de tu zona y te contactamos sin compromiso.",
  path: "/valoraciones",
  ogDescription: "Descubre cuánto puede valer tu vivienda. Valoración orientativa, gratuita y sin compromiso.",
})

export default function ValoracionesPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Valoración gratuita", path: "/valoraciones" }])),
        }}
      />
      <ValoracionesSection />

      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title text-black mb-4 sm:mb-6 px-4 text-balance">
              ¿Prefieres que veamos la vivienda en persona?
            </h2>
            <p className="text-base sm:text-lg text-stone-600 mb-8 sm:mb-10 leading-relaxed px-4">
              Podemos visitarla para tener en cuenta los detalles que influyen en su precio de mercado y preparar
              contigo una estrategia de venta. Una valoración comercial no sustituye a una tasación oficial.
            </p>
            <Link href="/contacto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-black hover:bg-stone-800 text-white px-8 sm:px-10 h-11 sm:h-12 text-sm sm:text-base"
              >
                Pedir una visita de valoración
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
