import type { Metadata } from "next"
import { createSupabaseServer } from "@/lib/supabase/server"
import PropiedadesClient from "./PropiedadesClient"
import { contactInfo } from "@/lib/contact-info"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Pisos y casas en venta y alquiler en San Vicente del Raspeig",
  description:
    "Consulta las viviendas en venta y alquiler de Valera Visionarias en San Vicente del Raspeig y alrededores: fotos, características y contacto directo.",
  alternates: { canonical: "/propiedades" },
  openGraph: {
    title: "Viviendas en venta y alquiler en San Vicente del Raspeig",
    url: "/propiedades",
  },
}

export default async function PropiedadesPage() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("status", "activo")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })

  const propiedades = Array.isArray(data) ? data : []

  // ✅ Construcción de JSON-LD para catálogo inmobiliario
  const listings =
    propiedades.map((p: any) => {
      const imgs: any[] = p.property_images ?? []
      const sortedImgs = [...imgs].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      const mainImgs =
        sortedImgs.length > 0
          ? sortedImgs.map((i) =>
              i.url.startsWith("http")
                ? i.url
                : `https://www.valeravisionarias.com${i.url}`
            )
          : ["https://www.valeravisionarias.com/images/logo-dark.png"]

      return {
        "@type": "Offer",
        url: `https://www.valeravisionarias.com/propiedad/${p.id}`,
        price: Number(p.price),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Apartment",
          name: p.title,
          description: p.description,
          numberOfRoomsTotal: Number(p.bedrooms),
          numberOfBathroomsTotal: Number(p.bathrooms),
          floorSize: {
            "@type": "QuantitativeValue",
            value: Number(p.size),
            unitCode: "MTK",
          },
          image: mainImgs,
          address: {
            "@type": "PostalAddress",
            addressLocality: p.city ?? "San Vicente del Raspeig",
            addressRegion: "Alicante",
            postalCode: "03690",
            addressCountry: {
              "@type": "Country",
              name: "ES",
            },
          },
          seller: {
            "@type": "RealEstateAgent",
            name: "Valera Visionarias",
            url: "https://www.valeravisionarias.com",
            telephone: contactInfo.phoneE164,
            logo: "https://www.valeravisionarias.com/images/logo-dark.png",
          },
        },
      }
    }) ?? []

  const jsonLdCatalog = {
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "OfferCatalog"],
    "@id": "https://www.valeravisionarias.com/propiedades/#catalog",
    mainEntityOfPage: "https://www.valeravisionarias.com/propiedades",
    name: "Propiedades en venta y alquiler — Valera Visionarias",
    description:
      "Catálogo de viviendas en San Vicente del Raspeig y Alicante: pisos, chalets y apartamentos en venta o alquiler.",
    provider: {
      "@type": "RealEstateAgent",
      name: "Valera Visionarias",
      url: "https://www.valeravisionarias.com",
      logo: "https://www.valeravisionarias.com/images/logo-dark.png",
      telephone: contactInfo.phoneE164,
      address: {
        "@type": "PostalAddress",
        streetAddress: contactInfo.addressLine1,
        addressLocality: "San Vicente del Raspeig",
        addressRegion: "Alicante",
        postalCode: contactInfo.postalCode,
        addressCountry: "ES",
      },
    },
    hasPart: listings,
  }

  return (
    <>
      {/* ✅ JSON-LD catálogo inmobiliario */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCatalog) }}
      />

      {/* Render normal */}
      <PropiedadesClient propiedades={propiedades} />
    </>
  )
}
