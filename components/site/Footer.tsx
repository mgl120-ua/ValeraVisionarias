// components/site/Footer.tsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer({ year }: { year: number }) {
  return (
    <footer className="bg-black text-white py-12 sm:py-16 lg:py-20" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* --- Columna principal --- */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <Image src="/images/logo-light.png" alt="" width={32} height={32} className="w-8 h-8 sm:w-9 sm:h-9" />
              <div>
                <h3 className="font-playfair text-base sm:text-lg font-semibold">Valera Visionarias</h3>
                <p className="text-[9px] sm:text-[10px] text-stone-400 tracking-[0.2em] uppercase">Inmobiliaria</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-400 leading-relaxed max-w-md mb-6">
              Expertos en compraventa y alquiler de viviendas en San Vicente del Raspeig. Tu inmobiliaria de confianza
              cerca de la Universidad de Alicante.
            </p>

            <p className="text-xs text-stone-500 mb-4">
              NIF: B12345678 · Registro Mercantil de Alicante, Tomo 1234, Folio 56, Hoja A-12345
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-stone-400" aria-hidden="true" />
                <a href="tel:+34645680339" className="text-sm text-stone-300 hover:text-white transition-colors">
                  645 68 03 39
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-stone-400" aria-hidden="true" />
                <a
                  href="mailto:Valeravisionarias@gmail.com"
                  className="text-sm text-stone-300 hover:text-white transition-colors break-all"
                >
                  Valeravisionarias@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stone-400 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-stone-300">
                  Villafranqueza 50, local 1
                  <br />
                  San Vicente del Raspeig, 03690
                </p>
              </div>
            </div>

            <Link href="/#contacto">
              <Button
                variant="outline"
                className="border border-white text-white hover:bg-white hover:text-black text-sm px-6 h-10 bg-transparent"
              >
                Contactar ahora
              </Button>
            </Link>
          </div>

          {/* --- Columna Servicios --- */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wider">Servicios</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-stone-400">
              <li><Link href="/valoraciones" className="hover:text-white transition-colors">Valoración Gratuita</Link></li>
              <li><Link href="/propiedades" className="hover:text-white transition-colors">Comprar piso en San Vicente</Link></li>
              <li><Link href="/propiedades" className="hover:text-white transition-colors">Alquiler cerca Universidad</Link></li>
              <li><Link href="/simulador-hipoteca" className="hover:text-white transition-colors">Simulador de Hipoteca</Link></li>
              <li><Link href="/calculadora-rentabilidad" className="hover:text-white transition-colors">Calculadora de Rentabilidad</Link></li>
              <li><Link href="/colabora" className="hover:text-white transition-colors">Colabora con nosotros</Link></li>
            </ul>
          </div>

          {/* --- Columna Información + Horario --- */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wider">Información</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-stone-400 mb-6">
              <li><Link href="/nosotros" className="hover:text-white transition-colors">Quiénes Somos</Link></li>
              <li><Link href="/#testimonios" className="hover:text-white transition-colors">Testimonios</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
            </ul>

            {/* --- Horario añadido --- */}
            <div className="text-sm text-stone-700 leading-relaxed">
              <h3 className="font-semibold mb-2 text-stone-300">Horario</h3>
              <ul className="space-y-1 text-stone-400 text-xs sm:text-sm">
                <li>Lunes: 9:00–14:00, 16:00–19:00</li>
                <li>Martes: 9:00–14:00, 16:00–19:00</li>
                <li>Miércoles: 9:00–14:00, 16:00–19:00</li>
                <li>Jueves: 9:00–14:00, 16:00–19:00</li>
                <li>Viernes: 9:00–14:00, 16:00–19:00</li>
                <li>Sábado: 9:00–14:00</li>
                <li>Domingo: Cerrado</li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Pie final --- */}
        <div className="border-t border-stone-800 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-stone-500 text-center sm:text-left">
              &copy; {year} Valera Visionarias — Inmobiliaria en San Vicente del Raspeig. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/valeravisionarias" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">Facebook</a>
              <a href="https://www.instagram.com/lvaleravisionarias" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
