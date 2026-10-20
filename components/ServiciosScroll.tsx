"use client"

import { useMemo, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { trackSellerEvent } from "@/lib/seller-leads"

const services = [
  {
    title: "Precio de salida con criterio",
    subtitle:
      "No improvisamos. Cruzamos comparables, demanda real y contexto de San Vicente para salir mejor posicionados.",
    benefit:
      "Reducimos el riesgo de quedarte fuera de mercado o de empezar negociando a la baja.",
    cta: "Pedir valoración",
    img: "/images/services/precio.png",
  },
  {
    title: "Anuncio que transmite valor",
    subtitle:
      "Cuidamos imagen, enfoque y copy para que tu vivienda se perciba mejor desde el primer impacto.",
    benefit: "Atraes más interés cualificado y mejoras la calidad de las visitas.",
    cta: "Ver cómo lo trabajamos",
    img: "/images/services/Anuncio_que_transmite_valor.jpg",
  },
  {
    title: "Negociación con filtro y criterio",
    subtitle:
      "Priorizamos compradores con más opciones de cerrar y defendemos tu precio durante todo el proceso.",
    benefit: "Evitas perder tiempo con visitas que no avanzan o con ofertas mal planteadas.",
    cta: "Hablar con un asesor",
    img: "/images/services/negociacion.jpg",
  },
  {
    title: "Acompañamiento hasta firma",
    subtitle:
      "Reservas, arras, documentos y coordinación hasta notaría para que no tengas que pelearte con cada paso.",
    benefit: "Más tranquilidad y menos carga mental desde la primera llamada hasta el cierre.",
    cta: "Resolver mis dudas",
    img: "/images/services/firma.jpg",
  },
]

export default function ServiciosShowcase() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const cardStep = useMemo(() => {
    const container = scrollRef.current
    if (!container) return 540

    if (container.clientWidth < 640) return window.innerWidth * 0.8 + 24
    if (container.clientWidth < 1024) return window.innerWidth * 0.46 + 24
    return 26 * 16 + 40
  }, [scrollRef.current])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const scrollAmount = direction === "left" ? scrollLeft - clientWidth * 0.88 : scrollLeft + clientWidth * 0.88
    scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const nextIndex = Math.round(scrollRef.current.scrollLeft / cardStep)
    setActiveIndex(Math.max(0, Math.min(services.length - 1, nextIndex)))
  }

  return (
    <div className="relative overflow-hidden text-black">

      <div className="mb-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Por qué elegirnos para vender</p>
            <h2 className="section-title max-w-4xl">
              Todo lo que ayuda a vender mejor y con menos desgaste
            </h2>
            <p className="mt-5 max-w-2xl text-balance text-lg leading-[1.33] text-stone-600">
              Precio, presentación, filtro comercial y acompañamiento hasta notaría: así trabajamos la venta de tu
              vivienda.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs uppercase tracking-[0.18em] text-stone-500 md:inline-flex">
              Desliza para ver ventajas
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="rounded-xl bg-white p-3 shadow-subtle transition hover:shadow-soft"
                aria-label="Anterior"
              >
                <ArrowLeft className="h-5 w-5 text-stone-700" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="rounded-xl bg-white p-3 shadow-subtle transition hover:shadow-soft"
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
          className="-mx-4 overflow-x-scroll px-4 pb-3 no-scrollbar sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
          aria-label="Listado horizontal de ventajas para propietarios"
        >
          <div className="flex w-max gap-6 lg:gap-10">
            {services.map((service, index) => {
              return (
                <motion.article
                  key={service.title}
                  whileHover={{ y: -4 }}
                  className="group flex w-[80vw] flex-shrink-0 flex-col sm:w-[46vw] lg:w-[26rem]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-200 shadow-subtle">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      style={{ backgroundImage: `url(${service.img})` }}
                      role="img"
                      aria-label={service.title}
                    />
                    <span className="absolute left-4 top-4 rounded-3xl bg-white/90 px-3 py-1 text-xs text-black backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="pt-6">
                    <h3 className="text-[26px] font-light leading-[1.14] tracking-[-0.03em] text-black sm:text-[30px]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-base leading-[1.49] text-stone-600">{service.subtitle}</p>
                    <p className="mt-3 text-base leading-[1.49] text-black">{service.benefit}</p>

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
                      className="mt-5 inline-flex items-center rounded-3xl bg-black/[0.04] px-4 py-2 text-sm text-black transition-colors hover:bg-black/[0.08]"
                    >
                      {service.cta}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
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
                if (!scrollRef.current) return
                scrollRef.current.scrollTo({ left: index * cardStep, behavior: "smooth" })
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
    </div>
  )
}
