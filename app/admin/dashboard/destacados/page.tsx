"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, X, Eye } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") // sin trailing slash
// ⬇️ Ajusta aquí si tu backend usa otra ruta o query
const ENDPOINT = "/props?featured=true"
// Ejemplos alternativos comunes:
// const ENDPOINT = "/api/props?featured=true"
// const ENDPOINT = "/properties?is_featured=true"
// const ENDPOINT = "/props?featured=1"

type Property = {
  id: string
  title: string
  address?: string
  price: number
  status: "venta" | "alquiler"
  imageUrl?: string | null
  featured?: boolean
  slug?: string | null
}

export default function DestacadosPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debug, setDebug] = useState<{ url?: string; status?: number; body?: string } | null>(null)

  const finalUrl = API_URL ? `${API_URL}${ENDPOINT}` : ""

  async function fetchFeatured() {
    setLoading(true)
    setError(null)
    setDebug(null)

    if (!API_URL) {
      setError("NEXT_PUBLIC_API_URL no está definido. Añádelo en .env.local y reinicia el servidor.")
      setLoading(false)
      return
    }

    try {
      const res = await fetch(finalUrl, { cache: "no-store" })
      if (!res.ok) {
        const body = await res.text().catch(() => "(no body)")
        setDebug({ url: finalUrl, status: res.status, body })
        throw new Error(`HTTP ${res.status}`)
      }
      const data = await res.json()
      if (!Array.isArray(data)) {
        setDebug({ url: finalUrl, status: 200, body: JSON.stringify(data).slice(0, 500) })
        throw new Error("La respuesta no es un array. Revisa el endpoint o el formato del API.")
      }
      setProperties(data)
    } catch (e: any) {
      setError(
        "Error al cargar destacados. Revisa NEXT_PUBLIC_API_URL o el endpoint configurado en ENDPOINT."
      )
      console.error("[Destacados] fetch error:", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeatured()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemoveFeatured = async (id: string) => {
    if (!API_URL) return
    const ok = window.confirm("¿Quitar esta propiedad de destacados?")
    if (!ok) return
    const prev = [...properties]
    setProperties(prev.filter((p) => p.id !== id))
    try {
      const res = await fetch(`${API_URL}/props/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: false }),
      })
      if (!res.ok) throw new Error("HTTP " + res.status)
    } catch {
      alert("No se pudo quitar de destacados. Revierte cambios locales.")
      setProperties(prev)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-light text-black mb-2">Propiedades Destacadas</h1>
        {loading ? (
          <p className="text-stone-600">Cargando propiedades…</p>
        ) : error ? (
          <p className="text-red-700">{error}</p>
        ) : (
          <p className="text-stone-600">{properties.length} propiedades destacadas actualmente</p>
        )}
      </div>

      {/* Info Card */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-medium text-blue-900 mb-1">Sobre las propiedades destacadas</p>
              <p className="text-sm text-blue-800">
                Las propiedades destacadas aparecen en la página principal con una etiqueta especial. Puedes destacar
                hasta 6 propiedades simultáneamente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-2 border-stone-200 animate-pulse h-80" />
          ))}
        </div>
      )}

      {/* Debug visible cuando hay error */}
      {error && debug && (
        <Card className="border-2 border-amber-300 bg-amber-50">
          <CardContent className="p-4 text-sm text-amber-900 space-y-2">
            <div><strong>URL:</strong> {debug.url}</div>
            {typeof debug.status !== "undefined" && <div><strong>Status:</strong> {debug.status}</div>}
            {debug.body && (
              <div className="max-h-40 overflow-auto">
                <strong>Respuesta:</strong>
                <pre className="whitespace-pre-wrap break-all text-xs mt-1">{debug.body}</pre>
              </div>
            )}
            <div className="text-amber-900/80">
              Si ves 404, cambia <code>ENDPOINT</code>. Si ves CORS, habilita el origen de tu web en el backend.
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista o vacío */}
      {!loading && !error && (
        <>
          {properties.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="border-2 border-stone-200 hover:border-black transition-all group">
                  <CardContent className="p-0">
                    <div className="relative h-48 bg-stone-200">
                      <Image
                        src={property.imageUrl || "/images/property-fallback.jpg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 right-3">
                        <div className="bg-yellow-400 p-2 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-600 text-yellow-600" aria-label="Destacada" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-playfair text-xl font-semibold text-black mb-2">{property.title}</h3>
                      {property.address && <p className="text-sm text-stone-600 mb-4">{property.address}</p>}

                      <div className="flex items-center justify-between mb-4">
                        <p className="text-2xl font-bold text-black">
                          €{Number(property.price ?? 0).toLocaleString("es-ES")}
                          {property.status === "alquiler" && <span className="text-sm text-stone-600">/mes</span>}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            property.status === "venta" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {property.status === "venta" ? "Venta" : "Alquiler"}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/propiedad/${property.slug || property.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full border-stone-300 hover:border-black">
                            <Eye className="w-4 h-4 mr-2" aria-hidden="true" />
                            Ver
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveFeatured(property.id)}
                          className="flex-1 border-red-300 hover:border-red-600 hover:text-red-600"
                        >
                          <X className="w-4 h-4 mr-2" aria-hidden="true" />
                          Quitar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-2 border-stone-200">
              <CardContent className="p-12 text-center">
                <Star className="w-16 h-16 text-stone-300 mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-playfair text-2xl font-light text-black mb-2">No hay propiedades destacadas</h3>
                <p className="text-stone-600 mb-6">
                  Ve a la sección de propiedades y activa la opción “Destacar” en las que quieras mostrar.
                </p>
                <Link href="/admin/dashboard/propiedades">
                  <Button className="bg-black hover:bg-stone-800 text-white">Ir a Propiedades</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Botón para refrescar */}
      {!loading && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={fetchFeatured}>
            Refrescar
          </Button>
        </div>
      )}
    </div>
  )
}
