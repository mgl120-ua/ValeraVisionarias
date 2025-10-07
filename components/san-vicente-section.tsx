"use client"

import { useState, useEffect } from "react"
import { Users, GraduationCap, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const images = [
  "/sanvi.jpeg",
  "/sanvi2.jpg",
  "/sanvi3.jpg",
  "/sanvi4.jpg",
]

export default function SanVicenteSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Rotación automática cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="san-vicente" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          
          {/* Carrusel de imágenes */}
          <div className="relative h-64 sm:h-80 lg:h-[500px] rounded-lg overflow-hidden">
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`San Vicente del Raspeig ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ))}

            {/* Indicadores */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentIndex ? "bg-black scale-110" : "bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Contenido descriptivo */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3 sm:mb-4">San Vicente del Raspeig</p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-black mb-6 sm:mb-8 leading-tight">
              Vive, estudia, invierte en San Vicente
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 sm:mb-10">
              San Vicente del Raspeig es ideal para familias, estudiantes e inversores: ubicación estratégica, servicios
              de calidad y entorno tranquilo cerca de Alicante.
            </p>

            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-10">
              <Feature
                Icon={Users}
                title="Para Familias"
                text="Zonas residenciales seguras, colegios de calidad y amplios espacios verdes para disfrutar en familia."
              />
              <Feature
                Icon={GraduationCap}
                title="Para Estudiantes"
                text="A pocos minutos de la Universidad de Alicante, con excelente conectividad y todas las comodidades."
              />
              <Feature
                Icon={TrendingUp}
                title="Para Inversores"
                text="Alta demanda de vivienda, especialmente para alquiler estudiantil. Gran rentabilidad y revalorización constante."
              />
            </div>

            <Link href="#contacto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-black hover:bg-stone-800 text-white px-8 sm:px-10 h-11 sm:h-12 text-sm sm:text-base"
              >
                Descubre propiedades en San Vicente
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Feature({ Icon, title, text }: { Icon: any; title: string; text: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-stone-100 rounded-full flex items-center justify-center">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
      </div>
      <div>
        <h3 className="font-playfair text-lg sm:text-xl font-semibold text-black mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
