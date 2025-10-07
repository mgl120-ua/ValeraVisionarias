// components/FeaturedProperties.tsx
import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase/server";

export const revalidate = 60; // opcional: ISR

export default async function FeaturedProperties() {
  const supabase = createSupabaseServer();

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
    .limit(6);

  if (error) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Destacadas</h2>
        <p className="text-red-600 text-sm">Error: {error.message}</p>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return null; // nada destacado
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Propiedades destacadas</h2>
        <Link href="/propiedades" className="text-sm underline underline-offset-2">
          Ver todas
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p: any) => {
          const imgs: any[] = p.property_images ?? [];
          const mainImg =
            imgs.length > 0
              ? [...imgs].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.url
              : undefined;

          return (
            <Link
              key={p.id}
              href={`/propiedad/${p.id}`}
              className="group block rounded-xl border border-stone-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/10] bg-stone-100">
                {mainImg ? (
                  <img
                    src={mainImg}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-stone-400 text-sm">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-medium line-clamp-1">
                    {p.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wide bg-black text-white px-2 py-1 rounded">
                    Destacada
                  </span>
                </div>

                <p className="mt-2 text-sm text-stone-600 line-clamp-2">
                  {p.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-stone-700">
                  <span className="font-semibold">
                    {Number(p.price).toLocaleString("es-ES")} €
                  </span>
                  <span>· {p.size} m²</span>
                  <span>· {p.bedrooms} hab</span>
                  <span>· {p.bathrooms} baños</span>
                </div>

                <p className="mt-1 text-xs text-stone-500">{p.city}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
