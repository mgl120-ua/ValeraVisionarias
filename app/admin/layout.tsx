// app/layout.tsx  (RootLayout)
import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "Valera Visionarias",
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh bg-white text-stone-900">
        {children}
      </body>
    </html>
  )
}
