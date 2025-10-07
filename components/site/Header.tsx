"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import MobileNav from "@/components/mobile-nav"

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false)

  const toggleDropdown = () => setOpenDropdown((prev) => !prev)
  const closeDropdown = () => setOpenDropdown(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/80 supports-[backdrop-filter]:bg-white/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between py-3 lg:py-4">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-lg"
            aria-label="Ir al inicio"
          >
            <Image
              src="/images/logo-dark.png"
              alt="Valera Visionarias - Inmobiliaria en San Vicente del Raspeig"
              width={36}
              height={36}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded"
              priority
            />
            <div className="leading-tight">
              <span className="font-playfair text-base sm:text-lg font-semibold text-black tracking-tight">
                Valera Visionarias
              </span>
              <span className="block text-[10px] sm:text-[11px] text-stone-600 tracking-[0.24em] uppercase">
                Inmobiliaria
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2 relative" aria-label="Navegación principal">
            <Link
              href="/#servicios"
              className="px-3 py-2 text-sm text-stone-700 hover:text-black hover:bg-stone-100 rounded-md"
            >
              Servicios
            </Link>

            <Link
              href="/propiedades"
              className="px-3 py-2 text-sm text-stone-700 hover:text-black hover:bg-stone-100 rounded-md"
            >
              Propiedades
            </Link>

            <Link
              href="/nosotros"
              className="px-3 py-2 text-sm text-stone-700 hover:text-black hover:bg-stone-100 rounded-md"
            >
              Nosotros
            </Link>

            {/* Dropdown Calculadoras */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 px-3 py-2 text-sm text-stone-700 hover:text-black hover:bg-stone-100 rounded-md focus:outline-none"
              >
                Calculadoras
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openDropdown ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {openDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-lg py-2 z-50">
                  <Link
                    href="/simulador-hipoteca"
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-black"
                  >
                    Hipoteca
                  </Link>
                  <Link
                    href="/calculadora-rentabilidad"
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-black"
                  >
                    Rentabilidad
                  </Link>
                  <Link
                    href="/calculadora-inversion"
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-black"
                  >
                    Inversión
                  </Link>
                </div>
              )}
            </div>

            {/* Botones destacados */}
            <div className="flex items-center gap-2 ml-2">
              <Link href="/valoraciones">
                <Button className="bg-black hover:bg-stone-800 text-white text-sm px-5 h-10">
                  Valoración Gratuita
                </Button>
              </Link>

              <Link href="/contacto">
                <Button
                  variant="outline"
                  className="border border-black text-black hover:bg-black hover:text-white text-sm px-5 h-10 transition-colors"
                >
                  Contactar
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile nav */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
