// components/PropertyGallery.tsx
"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyGallery({ images, title }: { images: string[]; title?: string }) {
  const [idx, setIdx] = useState(0);
  // Fotos verticales: se muestran enteras (object-contain) para no recortarlas en móvil
  const [portrait, setPortrait] = useState<Record<number, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const hasImages = images && images.length > 0;
  const label = title || "Vivienda";

  if (!hasImages) {
    return (
      <div className="aspect-[4/3] w-full rounded-xl bg-stone-100 grid place-items-center text-stone-400 sm:aspect-[16/10]">
        Sin imagen
      </div>
    );
  }

  const go = (dir: -1 | 1) => {
    setIdx((i) => (i + dir + images.length) % images.length);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <div className="min-w-0 space-y-3">
      {/* Principal */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100 sm:aspect-[16/10]"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={images[idx]}
          src={images[idx]}
          alt={`${label} – foto ${idx + 1} de ${images.length}`}
          className={`absolute inset-0 h-full w-full ${portrait[idx] ? "object-contain" : "object-cover"}`}
          loading="eager"
          decoding="async"
          onLoad={(e) => {
            const { naturalWidth, naturalHeight } = e.currentTarget;
            if (naturalHeight > naturalWidth) setPortrait((p) => ({ ...p, [idx]: true }));
          }}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-2 hover:bg-black"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-2 hover:bg-black"
              onClick={() => go(1)}
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white" aria-live="polite">
              {idx + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Miniaturas: desplazables en horizontal sin ensanchar la página */}
      {images.length > 1 && (
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
          {images.map((src, i) => (
            <button
              type="button"
              key={i}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border sm:h-16 sm:w-24 ${
                i === idx ? "border-black" : "border-black/[0.08]"
              }`}
              onClick={() => setIdx(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === idx}
            >
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
