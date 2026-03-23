import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DollarSign,
  Clock,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Users,
} from "lucide-react"
import type { Metadata } from "next"
import CaptadoresForm from "@/components/CaptadoresForm"
import { contactInfo } from "@/lib/contact-info"

export const metadata: Metadata = {
  title: "Colabora con Valera Visionarias | Gana 1.500€ por captación",
  description:
    "Únete a nuestro equipo como captador inmobiliario. Gana 1.500€ mínimo por cada inmueble que captes. Flexibilidad total e ingresos ilimitados.",
}

export default function ColaboraPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-16 sm:h-20"></div>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white to-stone-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full mb-6 sm:mb-8">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>

            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-black mb-6 sm:mb-8 leading-tight">
              ¡Gana 1.500€ por cada inmueble que captes!
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-12 sm:mb-16">
              Únete a Valera Visionarias como captador inmobiliario y genera ingresos extra con total flexibilidad.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <Card className="border border-stone-200 hover:border-black transition-all">
                <CardContent className="p-6 sm:p-8 text-center">
                  <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-black mx-auto mb-4 sm:mb-6" />
                  <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-black mb-3">1.500€ mínimo</h3>
                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                    Por cada inmueble que captes y se cierre
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-stone-200 hover:border-black transition-all">
                <CardContent className="p-6 sm:p-8 text-center">
                  <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-black mx-auto mb-4 sm:mb-6" />
                  <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-black mb-3">
                    Total flexibilidad
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                    Sin horarios fijos. Trabaja cuando quieras
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-stone-200 hover:border-black transition-all">
                <CardContent className="p-6 sm:p-8 text-center">
                  <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-black mx-auto mb-4 sm:mb-6" />
                  <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-black mb-3">
                    Ingresos ilimitados
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                    Cuantas más captaciones, más ganas
                  </p>
                </CardContent>
              </Card>
            </div>

            <a href="#formulario">
              <Button
                size="lg"
                className="bg-black hover:bg-stone-800 text-white px-10 sm:px-12 h-12 sm:h-14 text-base sm:text-lg"
              >
                Solicitar detalles del contrato
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="formulario" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 max-w-7xl mx-auto">
            {/* Lado izquierdo: Info */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3 sm:mb-4">Únete al equipo</p>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-black mb-6 sm:mb-8 leading-tight">
                Solicita información sobre el programa de captadores
              </h2>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-10 sm:mb-12">
                Completa el formulario y te enviaremos toda la información sobre nuestro programa de colaboradores,
                incluyendo el contrato y condiciones detalladas.
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-4">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-stone-500 mb-1">Teléfono</p>
                    <a href={contactInfo.phoneHref} className="text-sm sm:text-base text-black font-medium hover:underline">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-stone-500 mb-1">Email</p>
                    <a
                      href={contactInfo.emailHref}
                      className="text-sm sm:text-base text-black font-medium break-all hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-stone-500 mb-1">Oficina</p>
                    <p className="text-sm sm:text-base text-black font-medium">
                      {contactInfo.addressLine1}
                      <br />
                      {contactInfo.addressLine2}
                      <br />
                      {contactInfo.postalCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-stone-500 mb-1">WhatsApp</p>
                    <a
                      href={contactInfo.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-black font-medium hover:underline"
                    >
                      Contacto directo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado derecho: Formulario */}
            <Card className="border border-stone-200 bg-white">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <CaptadoresForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
