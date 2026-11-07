import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Simulador de hipoteca: calcula tu cuota",
  description:
    "Calcula la cuota mensual, los intereses y el coste total de tu hipoteca para comprar vivienda en San Vicente del Raspeig y Alicante. Resultado orientativo.",
  path: "/simulador-hipoteca",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
