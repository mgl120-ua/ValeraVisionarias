import type { Metadata } from "next"
import { breadcrumbJsonLd, organizationRef, pageMetadata, propertyPath } from "@/lib/seo"
import { createSupabaseServer } from "@/lib/supabase/server"
import PropiedadesClient from "./PropiedadesClient"
import { SITE_URL, absoluteUrl } from "@/lib/site"

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: "Pisos y casas en venta y alquiler en San Vicente del Raspeig",
  absoluteTitle: true,
  description:
    "Consulta las viviendas en venta y alquiler de Valera Visionarias en San Vicente del Raspeig y alrededores: fotos, características y contacto directo.",
  path: "/propiedades",
})

export default async function PropiedadesPage() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("status", "activo")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })

  const propiedades = Array.isArray(data) ? data : []

  // Datos estructurados: listado de fichas (cada ficha lleva su propio RealEstateListing) + migas de pan
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${absoluteUrl("/propiedades")}#webpage`,
      url: absoluteUrl("/propiedades"),
      name: "Pisos y casas en venta y alquiler en San Vicente del Raspeig",
      inLanguage: "es-ES",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: organizationRef,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: propiedades.length,
        itemListElement: propiedades.map((p: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(propertyPath(p)),
          name: p.title,
        })),
      },
    },
    breadcrumbJsonLd([{ name: "Propiedades", path: "/propiedades" }]),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PropiedadesClient propiedades={propiedades} />
    </>
  )
}
