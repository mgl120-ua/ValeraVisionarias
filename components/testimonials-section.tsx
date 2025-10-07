import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      content:
        "El trato fue exquisito, el trabajo impoluto. Laura a pesar de ser tan joven, es una gran profesional. Claramente aconsejaría sin dudar a mi contacto, trabajar con Valera Visionarias!!!",
      role: "Propietario",
      rating: 5,
    },
    {
      content:
        "Gran profesional, seria, formal, atenta en todos los detalles, con asesoramiento completo del principio al final de la operación de compra. Nuestra experiencia ha sido de 10 y la recomendamos 100% para quien necesite comprar o vender su casa.",
      role: "Compradores",
      rating: 5,
    },
    {
      content:
        "Muy buena profesional. He vendido mi casa en poco tiempo y por el precio estipulado. Se encargan de todos los trámites y facilitan mucho la operación de compra venta.",
      role: "Vendedora",
      rating: 5,
    },
  ]

  return (
    <section id="testimonios" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Cabecera */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3 sm:mb-4">Testimonios</p>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4 sm:mb-6 leading-tight">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
            La confianza de nuestros clientes es nuestro mayor logro. Sus experiencias hablan por sí solas.
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-stone-200 hover:border-black transition-all">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <p className="text-stone-600 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4" aria-label={`Valoración: ${testimonial.rating} de 5 estrellas`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" aria-hidden="true" />
                  ))}
                </div>

                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-stone-300 mb-4" aria-hidden="true" />
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA al final */}
        <div className="max-w-6xl mx-auto mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-stone-600 text-center sm:text-left">
            ¿Has trabajado con nosotros? Nos encantaría conocer tu experiencia.
          </p>

          <a
            href="https://search.google.com/local/writereview?placeid=ChIJkd5T31M3Yg0RFZlh_cFG74g"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            <Star className="w-4 h-4 fill-current" />
            Déjanos tu reseña
          </a>
        </div>
      </div>
    </section>
  )
}
