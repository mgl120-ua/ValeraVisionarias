import { ArrowUpRight, Star } from "lucide-react"
import { contactInfo } from "@/lib/contact-info"
import type { GoogleReviewsData } from "@/lib/google-reviews"

const formatRating = (n: number) => n.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 })

function Stars({ rating, className = "h-3.5 w-3.5" }: { rating: number; className?: string }) {
  const full = Math.round(rating)
  return (
    <span className="flex gap-0.5" aria-label={`${formatRating(rating)} de 5 estrellas`} role="img">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${i < full ? "fill-black text-black" : "fill-transparent text-black/25"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

// Reseñas reales de Google. Sin API configurada solo se muestra la valoración media con enlace a la ficha.
export default function TestimonialsSection({ data }: { data?: GoogleReviewsData | null }) {
  const rating = data?.rating != null ? formatRating(data.rating) : contactInfo.googleRating
  const total = data?.total != null ? `${data.total}` : contactInfo.googleReviewCount
  const profileHref = data?.reviewsUrl ?? contactInfo.googleProfileHref
  const reviews = data?.reviews.slice(0, 3) ?? []

  return (
    <section id="testimonios" className="py-24 md:py-32">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-col gap-8 sm:mb-16 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Reseñas en Google</p>
            <h2 className="section-title mb-4 text-black sm:mb-6">Lo que dicen nuestros clientes</h2>
            <p className="text-lg leading-[1.33] text-stone-600">
              Opiniones publicadas por clientes en nuestra ficha de Google.
            </p>
          </div>

          <a
            href={profileHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-2xl bg-stone-100 px-6 py-5 shadow-subtle transition-colors hover:bg-stone-200"
          >
            <span className="text-[44px] font-light leading-none tracking-[-0.04em] text-black">{rating}</span>
            <span className="flex flex-col gap-1.5">
              <Stars rating={Number(rating.replace(",", "."))} />
              <span className="text-sm text-stone-600">{total} reseñas en Google</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-black transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            <span className="sr-only">(abre la ficha de Google en una ventana nueva)</span>
          </a>
        </div>

        {reviews.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((review, index) => (
              <figure key={index} className="flex flex-col justify-between rounded-2xl bg-stone-100 p-7 shadow-subtle sm:p-9">
                <div>
                  <Stars rating={review.rating} />
                  <blockquote className="mt-5 line-clamp-[8] text-lg font-light leading-[1.33] tracking-[-0.015em] text-black sm:text-[19px]">
                    “{review.text}”
                  </blockquote>
                </div>
                <figcaption className="mt-10 flex items-center gap-3 border-t border-black/10 pt-5">
                  {review.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.photo}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <span className="flex flex-col text-sm">
                    {review.authorUrl ? (
                      <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-black hover:underline">
                        {review.author}
                      </a>
                    ) : (
                      <span className="font-medium text-black">{review.author}</span>
                    )}
                    <span className="text-stone-500">
                      {review.time ? `${review.time} · ` : ""}Google
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:mt-16 sm:flex-row sm:items-center">
          <a href={profileHref} target="_blank" rel="noopener noreferrer" className="text-sm text-black underline underline-offset-4">
            Ver todas las reseñas en Google
          </a>

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
