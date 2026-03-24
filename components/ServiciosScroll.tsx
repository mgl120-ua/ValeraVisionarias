"use client"

import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight, BadgeCheck, Camera, LineChart, ShieldCheck, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { trackSellerEvent } from "@/lib/seller-leads"

const services = [
  {
    title: "Precio de salida con criterio",
    subtitle: "No improvisamos. Cruzamos comparables, demanda real y contexto de San Vicente para salir mejor posicionados.",
    benefit: "Reducimos el riesgo de quedarte fuera de mercado o de empezar negociando a la baja.",
    proof: "Valoracion gratuita y sin compromiso",
    cta: "Pedir valoracion",
    img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop",
    icon: LineChart,
  },
  {
    title: "Anuncio que transmite valor",
    subtitle: "Cuidamos imagen, enfoque y copy para que tu vivienda se perciba mejor desde el primer impacto.",
    benefit: "Atraes mas interes cualificado y mejoras la calidad de las visitas.",
    proof: "Mas claridad, menos friccion",
    cta: "Ver como lo trabajamos",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    icon: Camera,
  },
  {
    title: "Negociacion con filtro y criterio",
    subtitle: "Priorizamos compradores con mas opciones de cerrar y defendemos tu precio durante todo el proceso.",
    benefit: "Evitas perder tiempo con visitas que no avanzan o con ofertas mal planteadas.",
    proof: "Compradores mejor filtrados",
    cta: "Hablar con un asesor",
    img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1200&auto=format&fit=crop",
    icon: Sparkles,
  },
  {
    title: "Acompanamiento hasta firma",
    subtitle: "Reservas, arras, documentos y coordinacion hasta notaria para que no tengas que pelearte con cada paso.",
    benefit: "Mas tranquilidad y menos carga mental desde la primera llamada hasta el cierre.",
    proof: "Seguimiento completo",
    cta: "Resolver mis dudas",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
    icon: ShieldCheck,
  },
]

export default function ServiciosShowcase() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const scrollAmount = direction === "left" ? scrollLeft - clientWidth * 0.88 : scrollLeft + clientWidth * 0.88
    scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const cardWidth = clientWidth < 640 ? clientWidth * 0.84 + 24 : clientWidth < 1024 ? clientWidth * 0.6 + 24 : 32 * 16 + 32
    const nextIndex = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.max(0, Math.min(services.length - 1, nextIndex)))
  }

  return (
    <section id="servicios" className="relative bg-neutral-50 py-20 text-black">
      <div className="mx-auto mb-12 max-w-7xl px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500">Por que elegirnos para vender</p>
            <h2 className="font-playfair text-4xl font-light md:text-6xl">Todo lo que ayuda a vender mejor y con menos desgaste</h2>
            <p className="mt-4 max-w-2xl text-stone-600">
              Esta parte resume el valor que nota un propietario: mejor posicionamiento, mejor presentacion, mejor filtro
              comercial y menos friccion hasta el cierre.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-stone-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-stone-500 md:inline-flex">
              Desliza para ver ventajas
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="rounded-full border border-stone-200 bg-white p-3 shadow-sm transition hover:border-black hover:bg-stone-50"
                aria-label="Anterior"
              >
                <ArrowLeft className="h-5 w-5 text-stone-700" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="rounded-full border border-stone-200 bg-white p-3 shadow-sm transition hover:border-black hover:bg-stone-50"
                aria-label="Siguiente"
              >
                <ArrowRight className="h-5 w-5 text-stone-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-x-scroll px-6 pb-3 no-scrollbar"
          aria-label="Listado horizontal de ventajas para propietarios"
        >
          <div className="flex w-max gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon

              return (
                <motion.article
                  key={service.title}
                  whileHover={{ y: -4 }}
                  className="group relative flex h-[31rem] w-[84vw] flex-shrink-0 overflow-hidden rounded-[28px] border border-stone-200 bg-stone-100 shadow-lg sm:w-[60vw] lg:w-[32rem]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${service.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />

                  <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        Diferencial
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
                        <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                        {service.proof}
                      </div>
                    </div>

                    <div className="max-w-xl">
                      <h3 className="font-playfair text-3xl font-light leading-tight md:text-[2.4rem]">{service.title}</h3>
                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone-200 md:text-base">{service.subtitle}</p>

                      <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/65">Lo que ganas</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">{service.benefit}</p>
                      </div>

                      <Link
                        href="#seller-contact-form"
                        onClick={() =>
                          trackSellerEvent("cta_click", {
                            placement: "services-scroll",
                            target: "seller-contact-form",
                            service: service.title,
                            index,
                          })
                        }
                        className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-stone-100"
                      >
                        {service.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {services.map((service, index) => (
            <button
              key={service.title}
              type="button"
              onClick={() => {
                const container = scrollRef.current
                if (!container) return
                const cardWidth = container.clientWidth < 640 ? container.clientWidth * 0.84 + 24 : container.clientWidth < 1024 ? container.clientWidth * 0.6 + 24 : 32 * 16 + 32
                container.scrollTo({ left: index * cardWidth, behavior: "smooth" })
              }}
              className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-black" : "w-2.5 bg-stone-300"}`}
              aria-label={`Ir a la tarjeta ${index + 1}`}
            />
          ))}
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
