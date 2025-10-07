import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, Clock, TrendingUp, Phone, Mail, MapPin, CheckCircle, Users } from "lucide-react"
import MobileNav from "@/components/mobile-nav"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Colabora con Valera Visionarias | Gana 1.500€ por captación",
  description:
    "Únete a nuestro equipo como captador inmobiliario. Gana 1.500€ mínimo por cada inmueble que captes. Flexibilidad total e ingresos ilimitados.",
}

export default function ColaboraPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Spacer */}
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

            <div className="bg-white border border-stone-200 p-8 sm:p-10 lg:p-12 rounded-lg mb-12 sm:mb-16">
              <h2 className="font-playfair text-2xl sm:text-3xl font-light text-black mb-6 sm:mb-8">
                ¿Tienes contactos que quieran vender?
              </h2>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-8">
                Si conoces a alguien que esté pensando en vender su propiedad en San Vicente del Raspeig o alrededores,
                ¡esta es tu oportunidad! Te pagamos por cada captación exitosa. Sin inversión inicial, sin riesgos.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-stone-700">No necesitas experiencia previa en inmobiliaria</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-stone-700">Nosotros nos encargamos de todo el proceso</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-stone-700">Comisiones transparentes y sin letra pequeña</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-stone-700">Pagos rápidos al cierre de cada operación</p>
                </div>
              </div>
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

      {/* Contact Form */}
      <section id="formulario" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 max-w-7xl mx-auto">
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
                    <a
                      href="tel:+34645680339"
                      className="text-sm sm:text-base text-black font-medium hover:underline"
                      aria-label="Llamar a Valera Visionarias"
                    >
                      645 68 03 39
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-stone-500 mb-1">Email</p>
                    <a
                      href="mailto:Valeravisionarias@gmail.com"
                      className="text-sm sm:text-base text-black font-medium break-all hover:underline"
                      aria-label="Enviar email a Valera Visionarias"
                    >
                      Valeravisionarias@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-stone-500 mb-1">Oficina</p>
                    <p className="text-sm sm:text-base text-black font-medium">
                      Villafranqueza 50, local 1
                      <br />
                      San Vicente del Raspeig, Alicante
                      <br />
                      03690
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="border border-stone-200 bg-white">
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <form className="space-y-5 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                      <div>
                        <label htmlFor="nombre" className="block text-xs sm:text-sm text-stone-700 mb-2">
                          Nombre
                        </label>
                        <Input
                          id="nombre"
                          name="nombre"
                          className="border-stone-300 h-11 sm:h-12 text-sm sm:text-base"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label htmlFor="apellidos" className="block text-xs sm:text-sm text-stone-700 mb-2">
                          Apellidos
                        </label>
                        <Input
                          id="apellidos"
                          name="apellidos"
                          className="border-stone-300 h-11 sm:h-12 text-sm sm:text-base"
                          placeholder="Tus apellidos"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm text-stone-700 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="border-stone-300 h-11 sm:h-12 text-sm sm:text-base"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-xs sm:text-sm text-stone-700 mb-2">
                        Teléfono
                      </label>
                      <Input
                        id="telefono"
                        name="telefono"
                        className="border-stone-300 h-11 sm:h-12 text-sm sm:text-base"
                        placeholder="645 68 03 39"
                      />
                    </div>

                    <div>
                      <label htmlFor="mensaje" className="block text-xs sm:text-sm text-stone-700 mb-2">
                        ¿Por qué te interesa colaborar con nosotros?
                      </label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        className="border-stone-300 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                        placeholder="Cuéntanos sobre tu experiencia, tus contactos o tu motivación..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-black hover:bg-stone-800 text-white h-11 sm:h-12 text-sm sm:text-base"
                    >
                      Solicitar información del programa
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
