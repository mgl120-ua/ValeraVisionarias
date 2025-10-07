"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface InteriorismoCarouselProps {
  images?: string[]
  interval?: number
}

export default function InteriorismoCarousel({
  images = [
    "/images/interiorismo.png",
    "/images/interiorismo2.png",
    "/images/interiorismo3.png",
    "/images/interiorismo4.png",
    "/images/interiorismo5.png",
  ],
  interval = 2000,
}: InteriorismoCarouselProps) {
  const [current, setCurrent] = useState(0)

  // Cambio automático de imagen
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  return (
    <div className="relative h-64 sm:h-80 lg:h-auto min-h-[300px] overflow-hidden rounded-xl">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Proyecto de interiorismo ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      ))}

      {/* Indicadores */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-black scale-110" : "bg-white/70 hover:bg-white"
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
