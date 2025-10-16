import ValeraVisionariasLandingClient from "./ValeraVisionariasLandingClient"
import type { Metadata } from "next"
import FeaturedProperties from "@/components/FeaturedProperties"

export const metadata: Metadata = {
  title: "Inmobiliaria en San Vicente del Raspeig | Valera Visionarias – Compra, Alquiler y Venta cerca UA",
  description:
    "Tu inmobiliaria de confianza en San Vicente del Raspeig (Alicante). 80 % de ventas en menos de una semana. Sin exclusivas forzadas y valoración gratuita. Contáctanos hoy.",
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
    url: "https://www.valeravisionarias.com/",
    images: [
      {
        url: "https://www.valeravisionarias.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Inmobiliaria Valera Visionarias en San Vicente del Raspeig",
      },
    ],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@valeravisionarias",
    title: "Valera Visionarias – Inmobiliaria San Vicente del Raspeig",
    description:
      "80 % de ventas en menos de 1 semana. Compra, venta y alquiler de viviendas cerca de la UA.",
    images: ["https://www.valeravisionarias.com/images/og-image.jpg"],
  },
  alternates: { canonical: "https://www.valeravisionarias.com/" },
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
