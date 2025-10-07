"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

interface Propiedad {
  id: string | number;
  title: string;
  description: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  featured: boolean;
  property_images?: { url: string; position?: number }[];
}

export default function PropiedadesClient({
  propiedades = [],
}: {
  propiedades?: Propiedad[];
}) {
  // --- Estado filtros (simple y eficaz)
  const [filtro, setFiltro] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    city: "",
  });

  const lista = useMemo(() => (Array.isArray(propiedades) ? propiedades : []), [propiedades]);

  const propiedadesFiltradas = useMemo(() => {
    const min = Number(filtro.minPrice) || 0;
    const max = Number(filtro.maxPrice) || 0;
    const beds = Number(filtro.bedrooms) || 0;
    const city = filtro.city.trim().toLowerCase();

    return lista.filter((p) => {
      if (!p) return false;
      if (min && p.price < min) return false;
      if (max && p.price > max) return false;
      if (beds && p.bedrooms !== beds) return false;
      if (city && !p.city?.toLowerCase().includes(city)) return false;
      return true;
    });
  }, [lista, filtro]);

  const clearFilters = () =>
    setFiltro({ minPrice: "", maxPrice: "", bedrooms: "", city: "" });

  return (
    <>
      {/* HERO — coherente con la landing */}
      <section
        aria-label="Cabecera de Propiedades"
        className="relative min-h-[48vh] flex items-end pt-20"
      >
        {/* Fondo */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-architecture.jpg"
            alt="Arquitectura moderna en San Vicente del Raspeig"
            fill
            className="object-cover"
            priority={false}
            sizes="100vw"
            quality={85}
          />
          {/* Overlay para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
        </div>

        {/* Contenido */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-white pb-10">
          {/* Breadcrumb simple */}
          <nav aria-label="Breadcrumb" className="mb-2 text-white/80 text-xs sm:text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:underline">Inicio</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">Propiedades</li>
            </ol>
          </nav>

          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight">
            Propiedades en Alicante
          </h1>
          <p className="mt-3 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl">
            Transparencia, rapidez y acompañamiento experto.
          </p>

          {/* Badges/Highlights opcionales (coherentes con la landing) */}
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-white/85">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 backdrop-blur-sm">
              Sin exclusivas forzadas
            </span>
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 backdrop-blur-sm">
              Honorarios claros
            </span>
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 backdrop-blur-sm">
              Especialistas UA
            </span>
          </div>
        </div>
      </section>

      {/* BARRA DE FILTROS — pegajosa y limpia */}
      <section
        id="buscador"
        className="sticky top-[68px] sm:top-[76px] z-40 bg-white/85 backdrop-blur-md border-b border-stone-200/70 supports-[backdrop-filter]:bg-white/70"
        aria-label="Filtros de propiedades"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <form
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 py-3 lg:py-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="col-span-2 lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                value={filtro.city}
                onChange={(e) => setFiltro((f) => ({ ...f, city: e.target.value }))}
                type="text"
                inputMode="search"
                placeholder="Ciudad / zona (p.ej. San Vicente)"
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <input
              value={filtro.minPrice}
              onChange={(e) => setFiltro((f) => ({ ...f, minPrice: e.target.value }))}
              type="number"
              min={0}
              placeholder="Precio mín. (€)"
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              value={filtro.maxPrice}
              onChange={(e) => setFiltro((f) => ({ ...f, maxPrice: e.target.value }))}
              type="number"
              min={0}
              placeholder="Precio máx. (€)"
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              value={filtro.bedrooms}
              onChange={(e) => setFiltro((f) => ({ ...f, bedrooms: e.target.value }))}
              type="number"
              min={0}
              placeholder="Habitaciones"
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-black text-white rounded-lg px-4 py-2.5 hover:bg-stone-800 transition"
              >
                Aplicar
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 border border-stone-300 text-stone-800 rounded-lg px-4 py-2.5 hover:bg-stone-50 transition"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* LISTADO */}
      <main className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Estado vacío elegante */}
          {propiedadesFiltradas.length === 0 && (
            <div className="rounded-2xl border border-stone-200 bg-white p-8 sm:p-10 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold">Sin resultados</h2>
              <p className="mt-2 text-stone-600">
                No encontramos propiedades con esos criterios. Prueba a ajustar los filtros
                o contáctanos para una búsqueda personalizada.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-lg border border-stone-300 hover:bg-stone-50"
                >
                  Quitar filtros
                </button>
                <Link
                  href="/valoraciones"
                  className="px-6 py-3 rounded-lg bg-black text-white hover:bg-stone-800"
                >
                  Valoración gratuita
                </Link>
              </div>
            </div>
          )}

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {propiedadesFiltradas.map((p) => {
              const imgs = p.property_images ?? [];
              const mainImg =
                imgs.length > 0
                  ? [...imgs].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.url
                  : undefined;

              return (
                <article
                  key={p.id}
                  className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition"
                >
                  <div className="relative aspect-[16/10] bg-stone-100">
                    {mainImg ? (
                      <Image
                        src={mainImg}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-stone-400">
                        Sin imagen
                      </div>
                    )}

                    {/* Etiqueta destacada */}
                    {p.featured && (
                      <span className="absolute top-3 left-3 z-10 bg-black/90 text-white text-[11px] uppercase tracking-wide px-2 py-1 rounded">
                        Destacada
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-medium">{p.title}</h2>
                    </div>

                    <p className="mt-2 text-sm text-stone-600 line-clamp-2">{p.description}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-stone-700">
                      <span className="font-semibold">
                        {Number(p.price).toLocaleString("es-ES")} €
                      </span>
                      <span>· {p.size} m²</span>
                      <span>· {p.bedrooms} hab</span>
                      <span>· {p.bathrooms} baños</span>
                    </div>

                    <p className="mt-1 text-xs text-stone-500">{p.city}</p>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/propiedad/${p.id}`}
                        className="flex-1 text-center bg-black text-white py-2.5 rounded-md hover:bg-stone-800 transition"
                      >
                        Ver detalle
                      </Link>
                      <Link
                        href={`/contacto?propiedad=${encodeURIComponent(String(p.id))}`}
                        className="flex-1 text-center border border-stone-300 py-2.5 rounded-md hover:bg-stone-50 transition"
                      >
                        Contactar
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* CTA final coherente */}
          {propiedadesFiltradas.length > 0 && (
            <div className="mt-14 text-center">
              <Link
                href="/contacto"
                className="inline-block px-8 py-4 bg-black text-white rounded-lg hover:bg-stone-800 text-base"
              >
                ¿No ves lo que buscas? Te ayudamos a encontrarlo
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
