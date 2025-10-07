"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bell, LogOut, Globe } from "lucide-react"
import { useState } from "react"

export default function AdminTopbar() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white border-b border-stone-200 z-30">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg sm:text-xl font-semibold text-black">Panel de Administración</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Logout */}
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="outline"
            className="border-stone-300 hover:border-black hover:bg-black hover:text-white bg-transparent"
            size="sm"
          >
            <LogOut className="w-4 h-4 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:inline">{isLoggingOut ? "Cerrando..." : "Cerrar Sesión"}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
