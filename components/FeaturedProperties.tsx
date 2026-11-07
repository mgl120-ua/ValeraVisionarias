// components/FeaturedProperties.tsx
import Link from "next/link"
import { createSupabaseServer } from "@/lib/supabase/server"
import { propertyPath } from "@/lib/seo"

export const revalidate = 60 // optional: ISR

export default async function FeaturedProperties() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      id,
      title,
      description,
      price,
      size,
      bedrooms,
      bathrooms,
      city,
      featured,
      created_at,
      property_images (
        url,
        position
      )
    `
    )
    .eq("status", "activo")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(6)

  if (error) {
    return (
      <p className="text-stone-600">
        Ahora mismo no podemos mostrar las viviendas destacadas. Puedes verlas todas en la página de propiedades.
      </p>
    )
  }

  if (!data || data.length === 0) return null

  return (
    <div>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p: any) => {
          const imgs: any[] = p.property_images ?? []
          const sortedImgs = [...imgs].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
          const mainImg = sortedImgs[0]?.url
          return (
            <article
              key={p.id}
              className="group relative block"
            >
              <Link href={propertyPath(p)} className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-200 shadow-subtle">
                  {mainImg ? (
                    <img
                      src={mainImg}
                      alt={`Propiedad en ${p.city || "San Vicente del Raspeig"} – ${p.title}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-stone-400 text-sm">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="pt-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{p.city || "San Vicente del Raspeig"}</p>
                  <h3 className="mt-2 text-xl font-light tracking-[-0.02em] text-black line-clamp-1 sm:text-[23px]">{p.title}</h3>
                  <p className="mt-3 text-[23px] font-light tracking-[-0.03em] text-black">
                    {Number(p.price).toLocaleString("es-ES")} €
                  </p>
                  <p className="mt-2 text-sm text-stone-600">
                    {p.size} m² · {p.bedrooms} hab · {p.bathrooms} baños
                  </p>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
