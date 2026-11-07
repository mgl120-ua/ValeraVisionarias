import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Calculadora de inversión inmobiliaria",
  description:
    "Simula cómo puede crecer una inversión con capital inicial, aportaciones mensuales y rentabilidad anual estimada. Herramienta orientativa de Valera Visionarias.",
  path: "/calculadora-inversion",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
