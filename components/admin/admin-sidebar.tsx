"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, Star, Settings, Menu, X } from "lucide-react"
import Image from "next/image"

const navigationItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Propiedades", href: "/admin/dashboard/propiedades", icon: Building2 },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 lg:transform-none ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-stone-800">
            <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
              <Image src="/images/logo-light.png" alt="" width={36} height={36} className="w-9 h-9" />
              <div>
                <p className="font-display text-lg font-semibold">Admin Panel</p>
                <p className="text-xs text-stone-400">Valera Visionarias</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-white text-black font-medium" : "text-stone-300 hover:bg-stone-900 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-stone-800">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-stone-400 hover:text-white transition-colors block text-center"
            >
              Ver sitio web →
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
