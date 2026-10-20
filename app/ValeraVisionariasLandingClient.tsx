"use client"

import { useEffect, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { MessageCircle, Phone, Mail, MapPin, Navigation, Search, ShieldCheck, Clock3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ContactForm from "@/components/ContactForm"
import SellerMiniForm from "@/components/SellerMiniForm"
import SellerStickyBar from "@/components/SellerStickyBar"
import SellerTrustBar from "@/components/SellerTrustBar"
import { contactInfo } from "@/lib/contact-info"
import { getSellerWhatsAppMessage, sellerExperiment, setupScrollDepthTracking, trackSellerEvent } from "@/lib/seller-leads"

const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"))
const AchievementsSection = dynamic(() => import("@/components/achievements-section"))
const SanVicenteSection = dynamic(() => import("@/components/san-vicente-section"))
const FAQSection = dynamic(() => import("@/components/faq-section"))
const ServiciosScroll = dynamic(() => import("@/components/ServiciosScroll"))
const SellingProcess = dynamic(() => import("@/components/SellingProcess"))

export default function ValeraVisionariasLandingClient({
  featuredSlot,
}: {
  featuredSlot?: ReactNode
}) {
  useEffect(() => {
    return setupScrollDepthTracking()
  }, [])

  return (
    <>
      <div className="min-h-screen bg-white">
        <section
          className="relative flex min-h-[72vh] items-center justify-center overflow-hidden"
          aria-labelledby="hero-title"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero-architecture.jpg"
              alt="Viviendas en San Vicente del Raspeig"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
          </div>

          <div className="relative z-10 w-full px-4 py-24 text-white sm:px-6">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mx-auto mb-3 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] backdrop-blur-sm">
                Especialistas en venta de vivienda en San Vicente
              </p>

              <h1 id="hero-title" className="mx-auto max-w-6xl font-playfair text-4xl font-light leading-[1.04] tracking-tight sm:text-5xl md:text-[4.1rem] lg:text-[4.5rem]">
                <span className="block lg:whitespace-nowrap">{sellerExperiment.heroTitle}</span>
                <span className="mx-auto mt-4 block max-w-4xl text-3xl leading-[1.08] sm:text-4xl md:text-[2.5rem] lg:text-[2.9rem] lg:whitespace-nowrap">
                  {sellerExperiment.heroSubtitle}
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-balance text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-[1.1rem]">
                Descubre cuánto puede valer tu vivienda, cómo posicionarla mejor y qué estrategia seguir para vender sin
                malvender ni perder meses.
              </p>

              <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm text-white/85">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Sin compromiso
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  Respuesta en menos de 24h
                </span>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <Link href="#seller-contact-form">
                  <Button
                    size="lg"
                    onClick={() => trackSellerEvent("cta_click", { placement: "hero", target: "seller-contact-form" })}
                    className="h-12 w-full bg-white px-8 text-sm text-black transition-transform duration-200 hover:-translate-y-0.5 hover:bg-stone-100 sm:h-14 sm:w-auto sm:px-10 sm:text-base"
                  >
                    {sellerExperiment.primaryCta}
                  </Button>
                </Link>

                <Link href="#propiedades">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => trackSellerEvent("cta_click", { placement: "hero-secondary", target: "propiedades" })}
                    className="h-12 w-full border border-white/35 bg-white/5 px-8 text-sm text-white/90 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white sm:h-14 sm:w-auto sm:px-10 sm:text-base"
                  >
                    <Search className="mr-2 h-5 w-5" aria-hidden="true" />
                    {sellerExperiment.secondaryCta}
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-sm text-white/80">
                Te orientamos antes de que tomes ninguna decisión: precio, estrategia y siguientes pasos.
              </p>

              <SellerMiniForm />
            </div>
          </div>
        </section>

        <SellerTrustBar />

        <section id="propiedades" className="scroll-mt-24 bg-neutral-100 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-12 max-w-3xl sm:mb-16 lg:mb-20">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500 sm:mb-4">Propiedades destacadas</p>
              <h2 className="mb-4 font-playfair text-3xl font-light leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl sm:mb-6">
                Viviendas en San Vicente del Raspeig
              </h2>
              <p className="text-base leading-relaxed text-stone-700 sm:text-lg">
                Una selección de los pisos y casas que tenemos ahora en venta y alquiler en San Vicente del Raspeig y
                alrededores.
              </p>
            </div>

            {featuredSlot ?? <div className="text-stone-600">Sin destacadas por ahora.</div>}

            <div className="mt-12 text-center sm:mt-16">
              <Link href="/propiedades">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => trackSellerEvent("cta_click", { placement: "properties-section", target: "/propiedades" })}
                  className="h-11 w-full border-2 border-black bg-transparent px-8 text-sm text-black hover:bg-black hover:text-white sm:h-12 sm:w-auto sm:px-10 sm:text-base"
                >
                  Ver todas las propiedades
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section
          id="servicios"
          className="relative scroll-mt-24 bg-gradient-to-b from-stone-50 to-stone-100 py-20 md:py-28"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <ServiciosScroll />

            <div className="mx-auto mt-12 max-w-4xl">
              <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 transition-all duration-300 hover:shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-10"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1575516478880-7dfb1a114073?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                  }}
                />

                <div className="relative flex flex-col items-start justify-between gap-10 p-10 sm:p-14 lg:flex-row lg:items-center">
                  <div className="max-w-xl">
                    <h3 className="mb-4 font-playfair text-2xl font-light text-black sm:text-3xl lg:text-4xl">
                      Calculadoras y recursos inmobiliarios
                    </h3>
                    <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
                      Recursos útiles para calcular hipoteca, estimar rentabilidad y analizar una inversión inmobiliaria
                      en Alicante. Un bloque pensado para resolver dudas frecuentes y ayudarte a comparar escenarios con
                      más contexto.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {[
                        "Calcular hipoteca",
                        "Estimar rentabilidad",
                        "Analizar inversión inmobiliaria en Alicante",
                      ].map((item) => (
                        <span
                          key={item}
                          className="inline-flex rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <Link
                      href="/simulador-hipoteca"
                      className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:bg-stone-800"
                    >
                      <span>Simulador hipoteca</span>
                    </Link>

                    <Link
                      href="/calculadora-rentabilidad"
                      className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-black transition-all hover:bg-black hover:text-white"
                    >
                      <span>Calculadora rentabilidad</span>
                    </Link>

                    <Link
                      href="/calculadora-inversion"
                      className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-black transition-all hover:bg-black hover:text-white"
                    >
                      <span>Calculadora inversión</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SellingProcess />

        <TestimonialsSection />
        <AchievementsSection />
        <SanVicenteSection />

        <FAQSection />

        <section id="contacto" className="scroll-mt-24 bg-stone-50 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 sm:gap-16">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500 sm:mb-4">Contacto para propietarios</p>
                <h2 className="mb-6 font-playfair text-3xl font-light leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl sm:mb-8">
                  Recibe una valoración y tu plan de venta
                </h2>
                <p className="mb-10 text-base leading-relaxed text-stone-700 sm:text-lg sm:mb-12">
                  Completa el formulario y revisaremos contigo precio, estrategia comercial y tiempos de venta. Respuesta
                  en menos de 24 horas.
                </p>

                <div className="mb-8 space-y-6 sm:space-y-8">
                  <div className="flex items-start space-x-4">
                    <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" aria-hidden="true" />
                    <div>
                      <p className="mb-1 text-xs text-stone-600 sm:text-sm">Teléfono</p>
                      <a
                        href={contactInfo.phoneHref}
                        className="rounded px-1 text-sm font-medium text-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:text-base"
                        aria-label={`Llamar al ${contactInfo.phone}`}
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" aria-hidden="true" />
                    <div>
                      <p className="mb-1 text-xs text-stone-600 sm:text-sm">Email</p>
                      <a
                        href={contactInfo.emailHref}
                        className="break-all rounded px-1 text-sm font-medium text-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:text-base"
                        aria-label={`Enviar email a ${contactInfo.email}`}
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" aria-hidden="true" />
                    <div>
                      <p className="mb-1 text-xs text-stone-600 sm:text-sm">Oficina</p>
                      <p className="text-sm font-medium text-black sm:text-base">
                        {contactInfo.addressLine1}
                        <br />
                        {contactInfo.addressLine2}
                        <br />
                        {contactInfo.postalCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MessageCircle className="mt-1 h-4 w-4 flex-shrink-0 text-black sm:h-5 sm:w-5" aria-hidden="true" />
                    <div>
                      <p className="mb-1 text-xs text-stone-600 sm:text-sm">WhatsApp y redes</p>
                      <div className="flex flex-wrap gap-3 text-sm sm:text-base">
                        <a
                          href={`${contactInfo.whatsappHref}?text=${encodeURIComponent(getSellerWhatsAppMessage("contact"))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-black hover:underline"
                          onClick={() => trackSellerEvent("whatsapp_click", { placement: "contact-section" })}
                        >
                          WhatsApp directo
                        </a>
                        <a
                          href={contactInfo.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-black hover:underline"
                        >
                          Instagram
                        </a>
                        <a
                          href={contactInfo.socialLinks.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-black hover:underline"
                        >
                          TikTok
                        </a>
                        <a
                          href={contactInfo.socialLinks.idealista}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-black hover:underline"
                        >
                          Idealista
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5">
                    <p className="mb-1 text-sm font-medium text-black">Horario</p>
                    <p className="text-sm text-stone-700">{contactInfo.hoursSummary}</p>
                    <p className="mt-1 text-sm text-stone-700">{contactInfo.appointmentNote}</p>
                  </div>
                </div>

                <a
                  href={contactInfo.mapsSearchHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver ubicación en Google Maps (se abre en nueva ventana)"
                >
                  <Button
                    variant="outline"
                    className="h-11 w-full border-2 border-black bg-transparent px-6 text-black hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:h-12 sm:w-auto"
                  >
                    <Navigation className="mr-2 h-4 w-4" aria-hidden="true" />
                    Cómo llegar
                  </Button>
                </a>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <SellerStickyBar />
      </div>
    </>
  )
}
