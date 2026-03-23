"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { contactInfo } from "@/lib/contact-info"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Botón del menú */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 shadow-sm text-black hover:bg-white transition-all z-[70]"
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay de fondo */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Panel lateral */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl border-l border-stone-200 
        z-[90] transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
          <span className="font-playfair text-xl text-black">Menú</span>
          <button
            ref={closeBtnRef}
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-stone-100"
            aria-label="Cerrar menú"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto py-6 px-6 bg-white">
          <ul className="space-y-1">
            {[
              { href: "/#servicios", label: "Servicios" },
              { href: "/propiedades", label: "Propiedades" },
              { href: "/#testimonios", label: "Testimonios" },
              { href: "/#san-vicente", label: "San Vicente" },
              { href: "/nosotros", label: "Nosotros" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-3 px-4 text-[1.05rem] font-medium text-stone-700 rounded-lg hover:bg-stone-100 hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Desplegable Calculadoras */}
            <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex justify-between items-center py-3 px-4 text-[1.05rem] font-medium text-stone-700 rounded-lg hover:bg-stone-100 hover:text-black transition-colors"
              >
                Calculadoras
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Submenú */}
              {isDropdownOpen && (
                <ul className="pl-6 mt-1 space-y-1 border-l border-stone-200">
                  <li>
                    <Link
                      href="/simulador-hipoteca"
                      onClick={closeMenu}
                      className="block py-2 text-[1rem] text-stone-600 hover:text-black transition-colors"
                    >
                      🏠 Hipoteca
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculadora-rentabilidad"
                      onClick={closeMenu}
                      className="block py-2 text-[1rem] text-stone-600 hover:text-black transition-colors"
                    >
                      💰 Rentabilidad
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculadora-inversion"
                      onClick={closeMenu}
                      className="block py-2 text-[1rem] text-stone-600 hover:text-black transition-colors"
                    >
                      📈 Inversión
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Botones destacados */}
          <div className="mt-10 space-y-4">
            <Link href="/valoraciones" onClick={closeMenu}>
              <Button className="w-full h-12 rounded-full bg-black text-white hover:bg-stone-800 text-base">
                Valoración Gratuita
              </Button>
            </Link>
            <Link href="/colabora" onClick={closeMenu}>
              <Button
                variant="outline"
                className="w-full h-12 rounded-full border-2 border-black text-black hover:bg-black hover:text-white text-base"
              >
                Colabora con nosotros
              </Button>
            </Link>
          </div>
        </nav>

        {/* Contacto */}
        <div className="p-6 border-t border-stone-200 bg-stone-50">
          <p className="text-xs uppercase tracking-wide text-stone-500 mb-2">Contacto directo</p>
          <a
            href={contactInfo.phoneHref}
            className="block text-base font-semibold text-black hover:underline"
          >
            {contactInfo.phone}
          </a>
          <a
            href={contactInfo.emailHref}
            className="block text-sm text-stone-700 hover:underline break-all"
          >
            {contactInfo.email}
          </a>
          <a
            href={contactInfo.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-sm font-medium text-stone-700 hover:underline"
          >
            WhatsApp directo
          </a>
        </div>
      </aside>
    </>
  )
}
