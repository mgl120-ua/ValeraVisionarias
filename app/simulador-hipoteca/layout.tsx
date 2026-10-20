import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Simulador de hipoteca: calcula tu cuota mensual",
  description:
    "Calcula la cuota mensual, los intereses y el coste total de tu hipoteca para comprar vivienda en San Vicente del Raspeig y Alicante. Resultado orientativo.",
  alternates: { canonical: "/simulador-hipoteca" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
