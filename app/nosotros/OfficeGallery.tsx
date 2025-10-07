// app/(secciones)/nosotros/OfficeGallery.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { officeImages } from "./office-images"

export default function OfficeGallery() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  const openAt = (i: number) => {
    setCurrent(i)
    setOpen(true)
  }

  const prev = () => setCurrent((i) => (i - 1 + officeImages.length) % officeImages.length)
  const next = () => setCurrent((i) => (i + 1) % officeImages.length)

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-10 sm:mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-3">Nuestra Oficina</p>
          <h3 className="font-playfair text-3xl sm:text-4xl font-light text-black">
            Un espacio pensado para acompañarte
          </h3>
        </div>

        {/* Masonry simple con CSS grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 [orphans:1] [widows:1]">
          {officeImages.map((src, i) => (
            <button
              key={i}
              onClick={() => openAt(i)}
              className="group relative w-full overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              aria-label={`Abrir foto ${i + 1} de la oficina`}
            >
              <Image
                src={src}
                alt={`Oficina Valera Visionarias ${i + 1}`}
                width={1360}
                height={1020}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-stone-200/70 rounded-xl" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox minimal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada foto de oficina"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white px-3 py-2 rounded-full text-sm"
            aria-label="Foto anterior"
          >
            ‹
          </button>

          <div className="relative max-w-6xl w-full aspect-[4/3]">
            <Image
              src={officeImages[current]}
              alt={`Oficina Valera Visionarias ampliada ${current + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white px-3 py-2 rounded-full text-sm"
            aria-label="Foto siguiente"
          >
            ›
          </button>

          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white px-3 py-2 rounded-full text-sm"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}
