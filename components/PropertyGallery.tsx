// components/PropertyGallery.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyGallery({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const hasImages = images && images.length > 0;

  if (!hasImages) {
    return (
      <div className="aspect-[16/10] w-full rounded-xl bg-stone-100 grid place-items-center text-stone-400">
        Sin imagen
      </div>
    );
  }

  const go = (dir: -1 | 1) => {
    setIdx((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div className="space-y-3">
      {/* Principal */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-100">
        <img
          src={images[idx]}
          alt={`Imagen ${idx + 1}`}
          className="w-full h-full object-cover"
          loading="eager"
        />

        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-2 hover:bg-black"
              onClick={() => go(-1)}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-2 hover:bg-black"
              onClick={() => go(1)}
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              className={`relative h-16 w-24 rounded-md overflow-hidden border ${
                i === idx ? "border-black" : "border-black/[0.08]"
              }`}
              onClick={() => setIdx(i)}
              aria-label={`Ir a imagen ${i + 1}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
