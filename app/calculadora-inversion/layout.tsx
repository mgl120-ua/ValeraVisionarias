import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calculadora de inversión inmobiliaria",
  description:
    "Simula cómo puede crecer una inversión con capital inicial, aportaciones mensuales y rentabilidad anual estimada. Herramienta orientativa de Valera Visionarias.",
  alternates: { canonical: "/calculadora-inversion" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
