

"use client"

import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageCircle,
  Key,
  GraduationCap,
  Briefcase,
  PiggyBank,
  Calculator,
  Home,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Navigation,
  Search,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import TestimonialsSection from "@/components/testimonials-section"
import AchievementsSection from "@/components/achievements-section"
import SanVicenteSection from "@/components/san-vicente-section"
import FAQSection from "@/components/faq-section"
import InteriorismoCarousel from "@/components/InteriorismoCarousel"
import ServiciosScroll from "@/components/ServiciosScroll"
import ContactForm from "@/components/ContactForm"

export default function ValeraVisionariasLandingClient({
  featuredSlot,
}: {
  featuredSlot?: ReactNode
}) {
  const year = new Date().getFullYear()

  return (
    <>
      {/* 🧠 JSON-LD Unificado: Organization + LocalBusiness + RealEstateAgent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness", "RealEstateAgent"],
            "@id": "https://www.valeravisionarias.com#organization",
            name: "Valera Visionarias",
            url: "https://www.valeravisionarias.com",
            logo: "https://www.valeravisionarias.com/images/logo-dark.png",
            image: [
              "https://www.valeravisionarias.com/images/logo-dark.png",
              "https://www.valeravisionarias.com/images/hero-architecture.jpg",
            ],
            description:
              "Inmobiliaria en San Vicente del Raspeig especializada en compraventa y alquiler de viviendas cerca de la Universidad de Alicante. Sin exclusivas forzadas, trato transparente y resultados garantizados.",
            telephone: "+34 645 68 03 39",
            email: "Valeravisionarias@gmail.com",
            priceRange: "€€",
            areaServed: "San Vicente del Raspeig, Alicante",
            sameAs: [
              "https://www.instagram.com/valeravisionarias",
              "https://www.facebook.com/valeravisionarias",
              "https://www.google.com/maps?cid=XXXXXXXXXXXX" // <-- Añade tu CID de Google Maps si lo tienes
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Villafranqueza 50, local 1",
              addressLocality: "San Vicente del Raspeig",
              addressRegion: "Alicante",
              postalCode: "03690",
              addressCountry: "ES",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 38.3936,
              longitude: -0.5247,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "19:00",
              },
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+34 645 68 03 39",
                contactType: "customer service",
                areaServed: "ES",
                availableLanguage: ["Spanish", "English"],
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "3",
              bestRating: "5",
              worstRating: "1",
            },
            review: [
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Propietario" },
                reviewBody:
                  "El trato fue exquisito y el trabajo impoluto. Laura es una gran profesional. Recomiendo trabajar con Valera Visionarias.",
                reviewRating: { "@type": "Rating", ratingValue: "5" },
              },
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Compradores" },
                reviewBody:
                  "Profesional, atenta y formal. Nos acompañó durante todo el proceso de compra con transparencia total.",
                reviewRating: { "@type": "Rating", ratingValue: "5" },
              },
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Vendedora" },
                reviewBody:
                  "Vendí mi casa en poco tiempo y por el precio estipulado. Muy recomendable.",
                reviewRating: { "@type": "Rating", ratingValue: "5" },
              },
            ],
          }),
        }}
      />

      {/* 🧾 FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "¿Cuánto tiempo tardan en venderse las propiedades?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "El 80% de nuestras ventas se cierran en menos de una semana, muchas en menos de 48 horas. El 20% restante, siempre al precio estipulado, no tarda más de tres meses.",
                },
              },
              {
                "@type": "Question",
                name: "¿Qué zonas de San Vicente del Raspeig recomiendan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Las zonas más demandadas son las cercanas a la Universidad de Alicante, el centro urbano y áreas residenciales tranquilas como Villafranqueza. Cada zona tiene ventajas según tu perfil: familia, estudiante o inversor.",
                },
              },
              {
                "@type": "Question",
                name: "¿Qué rentabilidad puedo esperar del alquiler en San Vicente?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "La rentabilidad media ronda el 5-7% anual, especialmente en propiedades cercanas a la Universidad de Alicante. Alta demanda de alquiler estudiantil todo el año.",
                },
              },
              {
                "@type": "Question",
                name: "¿Cuáles son los gastos de compraventa que debo considerar?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "En la compra: ITP (8%), IVA + AJD (10% + 1.5%), notaría, registro y gestoría. En la venta: plusvalía municipal e IRPF si hay ganancia patrimonial.",
                },
              },
            ],
          }),
        }}
      />

      {/* 🔍 WebSite + SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Valera Visionarias",
            url: "https://www.valeravisionarias.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.valeravisionarias.com/propiedades?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        
        {/* Hero */}
        <section
          id="main-content"
          className="relative min-h-[30vh] flex items-center justify-center overflow-hidden pt-20 scroll-mt-20"
          aria-label="Héroe"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero-architecture.jpg"
              alt="Arquitectura moderna en San Vicente del Raspeig"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={85}
            />
            {/* Overlay mejorado para contraste AA */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/65" />
          </div>

          <div className="relative z-10 text-center text-white w-full px-4 sm:px-6 py-24">
            <p className="mx-auto mb-3 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] backdrop-blur-sm">
              Inmobiliaria en San Vicente
            </p>

            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
              Tu hogar ideal
              <span className="block mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                en San Vicente del Raspeig
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl font-light mt-5 sm:mt-6 max-w-2xl mx-auto leading-relaxed text-white/90">
              Compra, venta y alquiler cerca de la Universidad de Alicante. Resultados rápidos, procesos seguros y trato
              transparente.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link href="#propiedades">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-stone-100 px-8 sm:px-10 h-12 sm:h-14 text-sm sm:text-base w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Search className="w-5 h-5 mr-2" aria-hidden="true" />
                  Buscar Propiedades
                </Button>
              </Link>

              <Link href="/colabora">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-8 sm:px-10 h-12 sm:h-14 text-sm sm:text-base w-full sm:w-auto bg-transparent focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Gana 1.500€ captando
                </Button>
              </Link>
            </div>

            {/* Badge de confianza (sin dependencias) */}
            <div className="mt-6 text-xs text-white/80">
              Sin exclusivas forzadas · Honorarios claros · Especialistas UA
            </div>
          </div>
        </section>

        {/* Propiedades Destacadas (slot) */}
        <section id="propiedades" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-100 scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3 sm:mb-4">Propiedades Destacadas</p>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4 sm:mb-6 leading-tight">
                Viviendas en Alicante
              </h2>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                Selección de pisos y casas. Todas verificadas y con documentación
                completa.
              </p>
            </div>

            {featuredSlot ?? <div className="text-stone-600">Sin destacadas por ahora.</div>}

            <div className="text-center mt-12 sm:mt-16">
              <Link href="/propiedades">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-black text-black hover:bg-black hover:text-white px-8 sm:px-10 h-11 sm:h-12 text-sm sm:text-base bg-transparent focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  Ver Todas las Propiedades
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section
          id="servicios"
          className="relative py-20 md:py-28 bg-gradient-to-b from-stone-50 to-stone-100 scroll-mt-24"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            {/* Encabezado */}


          <ServiciosScroll />


    <div className="max-w-4xl mx-auto">
      <div className="relative border border-stone-200 rounded-2xl overflow-hidden bg-stone-50 hover:shadow-xl transition-all duration-300">
        {/* Fondo decorativo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1575516478880-7dfb1a114073?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>

        <div className="relative p-10 sm:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-xl">
            <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-4">
              Calculadoras financieras
            </h3>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Descubre en segundos cómo se adapta cada inversión a tu situación: calcula tu hipoteca, estima la rentabilidad
              o simula escenarios personalizados.
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="/simulador-hipoteca"
              className="inline-flex items-center justify-center bg-black text-white hover:bg-stone-800 transition-all px-6 py-3 rounded-full text-sm font-medium"
            >
              <span>Simulador Hipoteca</span>
            </Link>

            <Link
              href="/calculadora-rentabilidad"
              className="inline-flex items-center justify-center border border-stone-300 text-black hover:bg-black hover:text-white transition-all px-6 py-3 rounded-full text-sm font-medium"
            >
              <span>Calculadora Rentabilidad</span>
            </Link>

            <Link
              href="/calculadora-inversion"
              className="inline-flex items-center justify-center border border-stone-300 text-black hover:bg-black hover:text-white transition-all px-6 py-3 rounded-full text-sm font-medium"
            >
              <span>Calculadora Inversión</span>
            </Link>
          </div>
        </div>
      </div>
  </div>

            {/* Home Staging / Interiorismo 
            <div className="grid lg:grid-cols-2 gap-0 border border-stone-200 overflow-hidden rounded-xl">
              <InteriorismoCarousel />
              <div className="p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center bg-stone-50">
                <Home className="w-8 h-8 sm:w-10 sm:h-10 text-black mb-4 sm:mb-6" aria-hidden="true" />
                <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-4 sm:mb-6 leading-tight">
                  Diseño de Interiores & Home Staging
                </h3>
                <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-6 sm:mb-8">
                  Transformamos espacios en experiencias. Preparamos tu vivienda para destacar, atraer y aumentar su
                  valor. Proyectos creativos, accesibles y a medida.
                </p>
                <div className="bg-white border border-stone-200 p-4 sm:p-6 mb-6 sm:mb-8 rounded-lg">
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    <strong className="text-black font-medium">Proyecto destacado:</strong> Container de 60 m²
                    convertido en loft minimalista. Interiorismo low-cost sin renunciar a estilo ni funcionalidad.
                  </p>
                </div>
                <Link href="#contacto">
                  <Button className="w-full sm:w-auto bg-black hover:bg-stone-800 text-white px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
                    Contacto <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </div>*/}
          </div>
        </section>

        

        {/* Testimonios / Logros / San Vicente */}

        <section id="testimonios">
          <TestimonialsSection />
        </section>
        <AchievementsSection />
        <SanVicenteSection />

        {/* FAQ */}
        <section id="faq">
          <FAQSection />
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-stone-50 scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 max-w-7xl mx-auto">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3 sm:mb-4">Contacto</p>
                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6 sm:mb-8 leading-tight">
                  Comencemos tu proyecto inmobiliario
                </h2>
                <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-10 sm:mb-12">
                  Completa el formulario y te responderemos en menos de 24 horas. Consulta gratuita y sin compromiso.
                </p>

                <div className="space-y-6 sm:space-y-8 mb-8">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs sm:text-sm text-stone-600 mb-1">Teléfono</p>
                      <a
                        href="tel:+34645680339"
                        className="text-sm sm:text-base text-black font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded px-1"
                        aria-label="Llamar al 645 68 03 39"
                      >
                        645 68 03 39
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs sm:text-sm text-stone-600 mb-1">Email</p>
                      <a
                        href="mailto:Valeravisionarias@gmail.com"
                        className="text-sm sm:text-base text-black font-medium break-all hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded px-1"
                        aria-label="Enviar email a Valeravisionarias@gmail.com"
                      >
                        Valeravisionarias@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs sm:text-sm text-stone-600 mb-1">Oficina</p>
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

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Villafranqueza+50+local+1+San+Vicente+del+Raspeig+Alicante+03690"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver ubicación en Google Maps (se abre en nueva ventana)"
                >
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-black text-black hover:bg-black hover:text-white h-11 sm:h-12 px-6 bg-transparent focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  >
                    <Navigation className="w-4 h-4 mr-2" aria-hidden="true" />
                    Cómo llegar
                  </Button>
                </a>
              </div>

          {/* Formulario */}
            <div>
              <ContactForm />
            </div>

            </div>
          </div>
        </section>

        {/* Botón volver arriba */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 z-40"
          aria-label="Volver arriba"
        >
          <ArrowRight className="w-5 h-5 rotate-[-90deg]" aria-hidden="true" />
        </button>
      </div>
    </>
  )
}
