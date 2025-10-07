"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up" role="alert" aria-live="polite">
      <Card className="max-w-4xl mx-auto border-2 border-stone-200 shadow-2xl">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-black mb-2 text-base sm:text-lg">
                Utilizamos cookies en nuestro sitio web
              </h3>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                Usamos cookies propias y de terceros para mejorar tu experiencia de navegación, analizar el tráfico y
                personalizar el contenido. Puedes aceptar todas las cookies o configurarlas.{" "}
                <Link href="/cookies" className="underline hover:text-black font-medium">
                  Más información
                </Link>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                onClick={rejectCookies}
                variant="outline"
                className="border-2 border-stone-300 text-black hover:bg-stone-100 w-full sm:w-auto bg-transparent"
              >
                Rechazar
              </Button>
              <Button onClick={acceptCookies} className="bg-black hover:bg-stone-800 text-white w-full sm:w-auto">
                Aceptar todas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
