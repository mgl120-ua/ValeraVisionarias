import ValeraVisionariasLandingClient from "./ValeraVisionariasLandingClient"
import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import FeaturedProperties from "@/components/FeaturedProperties"
import TestimonialsSection from "@/components/testimonials-section"
import { getGoogleReviews } from "@/lib/google-reviews"

export const metadata: Metadata = pageMetadata({
  title: "Inmobiliaria en San Vicente del Raspeig | Valera Visionarias",
  absoluteTitle: true,
  description:
    "Tu inmobiliaria en San Vicente del Raspeig (Alicante): venta, compra y alquiler de viviendas. Sin exclusivas forzadas y con valoración gratuita. Contáctanos hoy.",
  path: "/",
  ogDescription:
    "Compra, venta y alquiler de viviendas en San Vicente del Raspeig, junto a la Universidad de Alicante. Valoración gratuita y trato cercano.",
})


export default async function ValeraVisionariasLanding() {
  const googleReviews = await getGoogleReviews()

  return (
    <ValeraVisionariasLandingClient
      featuredSlot={
        <FeaturedProperties />
      }
      reviewsSlot={<TestimonialsSection data={googleReviews} />}
    />
  )
}
