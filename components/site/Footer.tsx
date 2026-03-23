import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"
import { contactInfo } from "@/lib/contact-info"

export default function Footer({ year }: { year: number }) {
  return (
    <footer className="bg-black py-12 text-white sm:py-16 lg:py-20" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4 sm:gap-10 lg:gap-12">
          <div className="sm:col-span-2">
            <div className="mb-6 flex items-center gap-2 sm:mb-8 sm:gap-3">
              <Image src="/images/logo-light.png" alt="" width={32} height={32} className="h-8 w-8 sm:h-9 sm:w-9" />
              <div>
                <h3 className="font-playfair text-base font-semibold sm:text-lg">Valera Visionarias</h3>
                <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 sm:text-[10px]">Inmobiliaria</p>
              </div>
            </div>

            <p className="mb-6 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
              Expertos en compraventa y alquiler de viviendas en San Vicente del Raspeig. Atencion personal con cita
              previa y contacto directo por WhatsApp.
            </p>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-stone-400" aria-hidden="true" />
                <a href={contactInfo.phoneHref} className="text-sm text-stone-300 transition-colors hover:text-white">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-stone-400" aria-hidden="true" />
                <a
                  href={contactInfo.emailHref}
                  className="break-all text-sm text-stone-300 transition-colors hover:text-white"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-stone-400" aria-hidden="true" />
                <p className="text-sm text-stone-300">
                  {contactInfo.addressLine1}
                  <br />
                  {contactInfo.addressLine2}, {contactInfo.postalCode}
                </p>
              </div>
              <p className="text-xs text-stone-400">{contactInfo.hoursSummary}</p>
              <p className="text-xs text-stone-400">{contactInfo.appointmentNote}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/#contacto">
                <Button
                  variant="outline"
                  className="h-10 border border-white bg-transparent px-6 text-sm text-white hover:bg-white hover:text-black"
                >
                  Contactar ahora
                </Button>
              </Link>
              <a href={contactInfo.whatsappHref} target="_blank" rel="noopener noreferrer">
                <Button className="h-10 bg-white px-6 text-sm text-black hover:bg-stone-200">WhatsApp</Button>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider sm:mb-6 sm:text-sm">Servicios</h4>
            <ul className="space-y-2 text-xs text-stone-400 sm:space-y-3 sm:text-sm">
              <li><Link href="/valoraciones" className="transition-colors hover:text-white">Valoracion Gratuita</Link></li>
              <li><Link href="/propiedades" className="transition-colors hover:text-white">Comprar piso en San Vicente</Link></li>
              <li><Link href="/propiedades" className="transition-colors hover:text-white">Alquiler cerca Universidad</Link></li>
              <li><Link href="/simulador-hipoteca" className="transition-colors hover:text-white">Simulador de Hipoteca</Link></li>
              <li><Link href="/calculadora-rentabilidad" className="transition-colors hover:text-white">Calculadora de Rentabilidad</Link></li>
              <li><Link href="/colabora" className="transition-colors hover:text-white">Colabora con nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider sm:mb-6 sm:text-sm">Informacion</h4>
            <ul className="mb-6 space-y-2 text-xs text-stone-400 sm:space-y-3 sm:text-sm">
              <li><Link href="/nosotros" className="transition-colors hover:text-white">Quienes Somos</Link></li>
              <li><Link href="/#testimonios" className="transition-colors hover:text-white">Testimonios</Link></li>
              <li><Link href="/#faq" className="transition-colors hover:text-white">Preguntas Frecuentes</Link></li>
            </ul>

            <div className="flex flex-wrap gap-4 text-sm">
              <a href={contactInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 transition-colors hover:text-white">
                Instagram
              </a>
              <a href={contactInfo.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-stone-400 transition-colors hover:text-white">
                TikTok
              </a>
              <a href={contactInfo.socialLinks.idealista} target="_blank" rel="noopener noreferrer" className="text-stone-400 transition-colors hover:text-white">
                Idealista
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 sm:pt-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-xs text-stone-500 sm:text-left sm:text-sm">
              &copy; {year} Valera Visionarias - Inmobiliaria en San Vicente del Raspeig. Todos los derechos reservados.
            </p>
            <a href={contactInfo.mapsSearchHref} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 transition-colors hover:text-white">
              Ver oficina en Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
