"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Cookie se establece automáticamente desde el servidor
        router.push("/admin/dashboard")
        router.refresh()
      } else {
        setError(data.error || "Contraseña incorrecta")
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-stone-300 shadow-2xl">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="flex justify-center mb-4">
            <Image src="/images/logo-dark.png" alt="Valera Visionarias" width={60} height={60} className="w-15 h-15" />
          </div>
          <CardTitle className="font-playfair text-3xl font-light text-black">Panel de Administración</CardTitle>
          <p className="text-sm text-stone-600">Acceso restringido solo para administradores</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-stone-800 flex items-center gap-2">
                <Lock className="w-4 h-4" aria-hidden="true" />
                Contraseña de administrador
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-stone-300 focus:border-black focus:ring-black"
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div
                className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !password}
              className="w-full h-12 bg-black hover:bg-stone-800 text-white text-base font-medium"
            >
              {isLoading ? "Verificando..." : "Acceder al Panel"}
            </Button>

            <div className="pt-4 border-t border-stone-200">
              <p className="text-xs text-center text-stone-600">
                ¿Problemas para acceder?{" "}
                <a href="mailto:Valeravisionarias@gmail.com" className="text-black hover:underline font-medium">
                  Contacta al soporte
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
