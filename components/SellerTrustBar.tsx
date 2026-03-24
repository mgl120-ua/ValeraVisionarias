const trustItems = [
  "Valoración gratuita",
  "Sin compromiso",
  "Respuesta en menos de 24h",
]

export default function SellerTrustBar() {
  return (
    <section className="border-y border-stone-200 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-3 py-4 text-sm text-stone-700 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-6">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-black" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
