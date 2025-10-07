import ValeraVisionariasLandingClient from "./ValeraVisionariasLandingClient"
import type { Metadata } from "next"
import FeaturedProperties from "@/components/FeaturedProperties"

export const metadata: Metadata = {
  title: "Valera Visionarias | Inmobiliaria en San Vicente del Raspeig cerca Universidad Alicante",
  description:
    "Expertos en compraventa y alquiler de viviendas en San Vicente del Raspeig. Venta rápida, asesoramiento profesional. 80% ventas en menos de 1 semana. ¡Contáctanos!",
  keywords:
    "inmobiliaria San Vicente del Raspeig, pisos Universidad Alicante, comprar casa San Vicente, alquiler estudiantes, inversión inmobiliaria",
  openGraph: {
    title: "Valera Visionarias | Inmobiliaria San Vicente del Raspeig",
    description: "Tu inmobiliaria de confianza cerca de la Universidad de Alicante. Resultados garantizados.",
    type: "website",
    locale: "es_ES",
  },
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
