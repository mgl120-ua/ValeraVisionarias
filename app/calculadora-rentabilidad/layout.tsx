import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calculadora de rentabilidad de alquiler",
  description:
    "Estima la rentabilidad bruta y neta de una vivienda en alquiler en San Vicente del Raspeig y Alicante con gastos e ingresos. Resultado orientativo.",
  alternates: { canonical: "/calculadora-rentabilidad" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
