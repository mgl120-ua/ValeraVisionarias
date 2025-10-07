"use client"

import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const services = [
  {
    title: "Asesoría Personalizada",
    subtitle: "Te guiamos en cada paso con claridad y profesionalismo.",
    img: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nph9BXikU2sQi2RWxuUk_H0ZNyhlA_e9r1zqSe0GwSSIAHBRdS7POvzo_fYmD_gSYwVXA0tXnHTv_fG_j6PIXnowyOpf4RGoia-R00WMz588JEqVNd6YITTG4Bii9IvMC2mqQzS=s1360-w1360-h1020-rw",
  },
  {
    title: "Gestión de Alquileres",
    subtitle: "Filtrado de inquilinos, contratos y procesos seguros.",
    img: "https://images.unsplash.com/photo-1642522029691-029b5a432954?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Alquileres Estudiantiles",
    subtitle: "Habitaciones cerca de la UA con condiciones flexibles.",
    img: "https://eiffage.es/wp-content/uploads/2020/02/UNIVERSIDAD-ALICANTE_edited.jpg",
  },
  {
    title: "Brokers Especializados",
    subtitle: "Negociación efectiva para maximizar el valor de tu propiedad.",
    img: "https://plus.unsplash.com/premium_photo-1678903964473-1271ecfb0288?q=80&w=774&auto=format&fit=crop",
  },
  {
    title: "Valoraciones Gratuitas",
    subtitle: "Conoce el valor real de tu propiedad en San Vicente.",
    img: "https://plus.unsplash.com/premium_photo-1671089657650-a7d75104224f?q=80&w=1035&auto=format&fit=crop",
  },
]

export default function ServiciosShowcase() {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
    scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
  }

  return (
    <section id="servicios" className="relative bg-neutral-50 text-black py-20">
      <div className="max-w-7xl mx-auto mb-12 px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3">
          Nuestros Servicios
        </p>
        <h2 className="font-playfair text-4xl md:text-6xl font-light mb-4">
          Soluciones integrales
        </h2>
        <p className="text-stone-600 max-w-2xl">
          Desde la primera consulta hasta la entrega de llaves. Acompañamiento profesional en cada etapa de tu proyecto inmobiliario.
        </p>
      </div>

      {/* Contenedor horizontal */}
      <div className="relative">
        {/* Botones navegación */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md backdrop-blur-sm rounded-full p-3"
          aria-label="Anterior"
        >
          <ArrowLeft className="w-5 h-5 text-stone-700" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md backdrop-blur-sm rounded-full p-3"
          aria-label="Siguiente"
        >
          <ArrowRight className="w-5 h-5 text-stone-700" />
        </button>

        {/* Scrollable */}
        <div ref={scrollRef} className="overflow-x-scroll no-scrollbar px-6">
          <div className="flex gap-10 w-max">
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="relative flex-shrink-0 w-[70vw] sm:w-[50vw] lg:w-[32vw] xl:w-[28vw] h-[55vh] rounded-2xl overflow-hidden group bg-stone-100 shadow-lg"
              >
                {/* Fondo */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.img})` }}
                />
                {/* Capa sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                {/* Contenido */}
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                  <h3 className="font-playfair text-2xl md:text-3xl font-light mb-1">
                    {service.title}
                  </h3>
                  <p className="text-stone-200 text-sm md:text-base mb-5 max-w-md leading-relaxed">
                    {service.subtitle}
                  </p>
                  <Link
                    href="#contacto"
                    className="inline-flex items-center border border-white/40 hover:border-white text-white text-xs md:text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:text-black"
                  >
                    Consultar <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
