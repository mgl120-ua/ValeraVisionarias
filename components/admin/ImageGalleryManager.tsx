"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";

type Img = { id: string; url: string; position?: number | null; created_at?: string };

interface Props {
  propertyId: string;
  initialImages?: Img[];
}

function ImageGalleryManager({ propertyId, initialImages = [] }: Props) {
  const [images, setImages] = useState<Img[]>([]);

  useEffect(() => {
    const sorted = [...initialImages].sort(
      (a, b) => (a.position ?? 0) - (b.position ?? 0)
    );
    setImages(sorted);
  }, [initialImages]);

  // Drag & Drop con HTML5
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const handleDragStart = (idx: number) => setDragIndex(idx);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDrop = (idx: number) => {
    if (dragIndex === null || dragIndex === idx) return;
    const copy = [...images];
    const [moved] = copy.splice(dragIndex, 1);
    copy.splice(idx, 0, moved);
    setImages(copy);
    setDragIndex(null);
  };

  const saveOrder = async () => {
    const order = images.map((img, i) => ({ id: img.id, position: i }));
    const res = await fetch(`/api/admin/properties/${propertyId}/images/reorder`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order }),
    });
    if (!res.ok) {
      const t = await res.text();
      alert(`No se pudo guardar el orden: ${t}`);
      return;
    }
    // refresca posiciones locales
    setImages((prev) => prev.map((img, i) => ({ ...img, position: i })));
  };

  const remove = async (imageId: string) => {
    if (!confirm("¿Eliminar esta imagen?")) return;
    const res = await fetch(`/api/admin/properties/${propertyId}/images/${imageId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const t = await res.text();
      alert(`No se pudo eliminar: ${t}`);
      return;
    }
    setImages((prev) => prev.filter((x) => x.id !== imageId));
  };

  const hasChanges = useMemo(
    () => images.some((img, i) => (img.position ?? i) !== i),
    [images]
  );

  return (
    <div className="space-y-3">
      {images.length === 0 ? (
        <p className="text-sm text-stone-500">Sin imágenes por ahora.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div
              key={img.id}
              className="group relative rounded-lg overflow-hidden border border-stone-200 bg-stone-50"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              title="Arrastra para reordenar"
            >
              <img src={img.url} alt="" className="w-full h-28 object-cover" loading="lazy" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-1 opacity-0 group-hover:opacity-100 transition">
                <span className="inline-flex items-center gap-1 bg-black/70 text-white text-[10px] px-2 py-1 rounded">
                  <GripVertical className="w-3 h-3" /> {index + 1}
                </span>

                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/90 hover:bg-white text-red-600"
                  onClick={() => remove(img.id)}
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          onClick={saveOrder}
          disabled={images.length < 2}
          className="bg-black text-white"
        >
          Guardar orden
        </Button>
        {hasChanges && <span className="text-xs text-stone-600">Tienes cambios sin guardar</span>}
      </div>
    </div>
  );
}

export default ImageGalleryManager;
