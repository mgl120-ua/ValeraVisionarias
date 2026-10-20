import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      content:
        "El trato fue exquisito y el trabajo impecable. Nos asesoraron desde la valoración hasta la firma y sentimos que defendían nuestro precio en cada paso.",
      role: "Propietario vendedor",
      rating: 5,
    },
    {
      content:
        "Muy buena profesional. Vendí mi casa en poco tiempo y por el precio estipulado. Se encargaron de los trámites y me fueron informando siempre de cómo iba cada visita.",
      role: "Vendedora",
      rating: 5,
    },
    {
      content:
        "Transmiten confianza, filtran a los compradores y te quitan mucha carga. Noté diferencia desde la preparación del anuncio hasta la negociación final.",
      role: "Propietaria",
      rating: 5,
    },
  ]

  return (
    <section id="testimonios" className="py-24 md:py-32">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <div className="mb-12 max-w-3xl sm:mb-16 lg:mb-20">
          <p className="eyebrow mb-4">Testimonios</p>
          <h2 className="section-title mb-4 text-black sm:mb-6">
            Propietarios que ya han vendido con nosotros
          </h2>
          <p className="text-lg leading-[1.33] text-stone-600">
            Lo que cuentan los propietarios que han confiado en nosotros para vender su vivienda.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure key={index} className="flex flex-col justify-between rounded-2xl bg-stone-100 p-7 shadow-subtle sm:p-9">
              <blockquote className="text-lg font-light leading-[1.33] tracking-[-0.015em] text-black sm:text-[21px] sm:leading-[1.3]">
                “{testimonial.content}”
              </blockquote>
              <figcaption className="mt-10 flex items-center justify-between gap-4 border-t border-black/10 pt-5">
                <span className="text-sm text-stone-600">{testimonial.role}</span>
                <span className="flex gap-0.5" aria-label={`Valoración: ${testimonial.rating} de 5 estrellas`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-black text-black" aria-hidden="true" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:mt-16 sm:flex-row sm:items-center">
          <p className="text-center text-sm text-stone-600 sm:text-left">
            ¿Quieres vender con una estrategia parecida? Cuéntanos tu caso y te orientamos.
          </p>

          <a
            href="#seller-contact-form"
            className="inline-flex h-12 items-center rounded-xl bg-black px-7 text-[15px] text-white transition-colors hover:bg-stone-800"
          >
            Quiero mi valoración
          </a>
        </div>
      </div>
    </section>
  )
}
