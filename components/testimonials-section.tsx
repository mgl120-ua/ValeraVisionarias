import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      content:
        "El trato fue exquisito y el trabajo impecable. Nos asesoraron desde la valoración hasta la firma y sentimos que defendían nuestro precio en cada paso.",
      role: "Propietario vendedor",
      rating: 5,
      highlight: "Vendida con estrategia clara",
      result: "Operación cerrada con acompañamiento completo",
    },
    {
      content:
        "Muy buena profesional. Vendí mi casa en poco tiempo y por el precio estipulado. Se encargaron de los trámites y me fueron informando siempre de cómo iba cada visita.",
      role: "Vendedora",
      rating: 5,
      highlight: "Tiempo de venta: poco tiempo",
      result: "Resultado: precio acordado",
    },
    {
      content:
        "Transmiten confianza, filtran a los compradores y te quitan mucha carga. Noté diferencia desde la preparación del anuncio hasta la negociación final.",
      role: "Propietaria",
      rating: 5,
      highlight: "Visitas mejor filtradas",
      result: "Resultado: proceso más ágil y seguro",
    },
  ]

  return (
    <section id="testimonios" className="bg-white py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12 max-w-3xl sm:mb-16 lg:mb-20">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500 sm:mb-4">Testimonios</p>
          <h2 className="mb-4 font-playfair text-3xl font-light leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl sm:mb-6">
            Propietarios que ya han vendido con nosotros
          </h2>
          <p className="text-base leading-relaxed text-stone-700 sm:text-lg">
            Reseñas centradas en lo que más importa al vender: tiempo, acompañamiento y resultado final.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-stone-200 transition-all hover:border-black">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div>
                    <p className="text-xs text-stone-600 sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                    {testimonial.highlight}
                  </div>
                  <p className="text-sm font-medium text-black">{testimonial.result}</p>
                </div>

                <div className="mb-4 flex gap-1" aria-label={`Valoración: ${testimonial.rating} de 5 estrellas`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-black text-black" aria-hidden="true" />
                  ))}
                </div>

                <Quote className="mb-4 h-8 w-8 text-stone-300 sm:h-10 sm:w-10" aria-hidden="true" />
                <p className="text-sm italic leading-relaxed text-stone-700 sm:text-base">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-6 sm:mt-16 sm:flex-row">
          <p className="text-center text-sm text-stone-600 sm:text-left">
            ¿Quieres vender con una estrategia parecida? Cuéntanos tu caso y te orientamos.
          </p>

          <a
            href="#seller-contact-form"
            className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            <Star className="h-4 w-4 fill-current" aria-hidden="true" />
            Quiero mi valoración
          </a>
        </div>
      </div>
    </section>
  )
}
