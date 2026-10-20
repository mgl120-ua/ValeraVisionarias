"use client"

import { useState, useEffect } from "react"
import { Users, GraduationCap, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
    <section id="san-vicente" className="py-24 md:py-32">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* Carrusel de imágenes */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-200 shadow-subtle sm:aspect-[4/3] lg:aspect-[4/5]">
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
            <p className="eyebrow mb-4">San Vicente del Raspeig</p>
            <h2 className="section-title text-black mb-6 sm:mb-8">
              Vive, estudia, invierte en San Vicente
            </h2>
            <p className="mb-10 text-lg leading-[1.33] text-stone-600">
              San Vicente del Raspeig es ideal para familias, estudiantes e inversores: ubicación estratégica, servicios
              de calidad y entorno tranquilo cerca de Alicante.
            </p>

            <div className="mb-10">
              <Feature
                Icon={Users}
                title="Para familias"
                text="Zonas residenciales seguras, colegios de calidad y amplios espacios verdes para disfrutar en familia."
              />
              <Feature
                Icon={GraduationCap}
                title="Para estudiantes"
                text="A pocos minutos de la Universidad de Alicante, con excelente conectividad y todas las comodidades."
              />
              <Feature
                Icon={TrendingUp}
                title="Para inversores"
                text="Demanda de alquiler, sobre todo estudiantil, por la cercanía a la Universidad de Alicante."
              />
            </div>

            <Link
              href="/propiedades"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-black px-7 text-[15px] text-white transition-colors hover:bg-stone-800 sm:w-auto"
            >
              Descubre propiedades en San Vicente
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Feature({ Icon, title, text }: { Icon: any; title: string; text: string }) {
  return (
    <div className="flex items-start gap-4 border-t border-black/10 py-5">
      <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-black" aria-hidden="true" />
      <div>
        <h3 className="text-xl font-light tracking-[-0.02em] text-black">{title}</h3>
        <p className="mt-1 text-base leading-[1.49] text-stone-600">{text}</p>
      </div>
    </div>
  )
}
