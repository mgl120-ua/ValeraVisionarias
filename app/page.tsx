import ValeraVisionariasLandingClient from "./ValeraVisionariasLandingClient"
import type { Metadata } from "next"
import FeaturedProperties from "@/components/FeaturedProperties"

export const metadata: Metadata = {
  title: { absolute: "Inmobiliaria en San Vicente del Raspeig | Valera Visionarias" },
  description:
    "Tu inmobiliaria en San Vicente del Raspeig (Alicante): venta, compra y alquiler de viviendas. Sin exclusivas forzadas y con valoración gratuita. Contáctanos hoy.",
  keywords: [
    "inmobiliaria San Vicente del Raspeig",
    "viviendas Alicante",
    "alquiler estudiantes Universidad Alicante",
    "valoración vivienda gratuita",
    "compra venta pisos San Vicente"
  ],
  openGraph: {
    title: "Valera Visionarias – Inmobiliaria en San Vicente del Raspeig",
    description:
      "Compra, venta y alquiler de viviendas cerca de la Universidad de Alicante. Expertos locales en resultados rápidos y trato transparente.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/hero-architecture.jpg",
        alt: "Inmobiliaria Valera Visionarias en San Vicente del Raspeig",
      },
    ],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valera Visionarias – Inmobiliaria San Vicente del Raspeig",
    description:
      "Compra, venta y alquiler de viviendas en San Vicente del Raspeig, cerca de la UA. Valoración gratuita.",
    images: ["/images/hero-architecture.jpg"],
  },
  alternates: { canonical: "/" },
}


export default function ValeraVisionariasLanding() {
  return (
    <ValeraVisionariasLandingClient
      featuredSlot={
        <FeaturedProperties />
      }
    />
  )
}
