import Script from "next/script"
import { createSupabaseServer } from "@/lib/supabase/server"
import PropiedadesClient from "./PropiedadesClient"

export const revalidate = 60

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
            telephone: "+34 645 68 03 39",
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
      "Catálogo de viviendas en San Vicente del Raspeig y Alicante: pisos, chalets y apartamentos en venta o alquiler. Todas las propiedades verificadas por Valera Visionarias.",
    provider: {
      "@type": "RealEstateAgent",
      name: "Valera Visionarias",
      url: "https://www.valeravisionarias.com",
      logo: "https://www.valeravisionarias.com/images/logo-dark.png",
      telephone: "+34 645 68 03 39",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Villafranqueza 50, local 1",
        addressLocality: "San Vicente del Raspeig",
        addressRegion: "Alicante",
        postalCode: "03690",
        addressCountry: "ES",
      },
    },
    hasPart: listings,
  }

  return (
    <>
      {/* ✅ JSON-LD catálogo inmobiliario */}
      <Script
        id="catalog-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCatalog) }}
      />

      {/* Render normal */}
      <PropiedadesClient propiedades={propiedades} />
    </>
  )
}
