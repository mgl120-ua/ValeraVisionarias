"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  size: z.coerce.number().positive(),
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(0),
  address: z.string().min(3),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  category: z.enum(["venta", "alquiler"]),
  status: z.enum(["activo", "inactivo"]).default("activo"),
  featured: z.boolean().default(false),
});

export type PropertyFormValues = z.infer<typeof schema>;

export default function PropertyForm({
  defaultValues,
  propertyId, // si existe, es edición
}: {
  defaultValues?: Partial<PropertyFormValues>;
  propertyId?: string;
}) {
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      size: 0,
      bedrooms: 0,
      bathrooms: 0,
      address: "",
      city: "San Vicente del Raspeig",
      postal_code: "",
      category: "venta",
      status: "activo",
      featured: false,
      ...defaultValues,
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: PropertyFormValues) => {
    setSubmitting(true);

    let id = propertyId;

    // 1) Crear / actualizar
    if (!id) {
      const res = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const txt = await res.text();
        alert("Error creando propiedad: " + txt);
        setSubmitting(false);
        return;
      }
      const j = (await res.json()) as { id: string };
      id = j.id;
    } else {
      const res = await fetch(`/api/admin/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const txt = await res.text();
        alert("Error actualizando: " + txt);
        setSubmitting(false);
        return;
      }
    }

    // 2) Subir imágenes
    if (files.length && id) {
      const fd = new FormData();
      files.forEach((f, i) => {
        fd.append("files", f);
        fd.append("positions", String(i));
      });

      const res = await fetch(`/api/admin/properties/${id}/images`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const txt = await res.text();
        alert("Error subiendo imágenes: " + txt);
        setSubmitting(false);
        return;
      }
    }

    setSubmitting(false);
    window.location.href = "/admin/dashboard/propiedades";
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" {...form.register("title")} />
        </div>
        <div>
          <Label htmlFor="price">Precio</Label>
          <Input id="price" type="number" step="0.01" {...form.register("price")} />
        </div>
        <div>
          <Label htmlFor="size">Metros (m²)</Label>
          <Input id="size" type="number" {...form.register("size")} />
        </div>
        <div>
          <Label htmlFor="bedrooms">Dormitorios</Label>
          <Input id="bedrooms" type="number" {...form.register("bedrooms")} />
        </div>
        <div>
          <Label htmlFor="bathrooms">Baños</Label>
          <Input id="bathrooms" type="number" {...form.register("bathrooms")} />
        </div>
        <div>
          <Label htmlFor="category">Categoría</Label>
          <select id="category" className="w-full h-10 border rounded px-3" {...form.register("category")}>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </div>
        <div>
          <Label htmlFor="status">Estado</Label>
          <select id="status" className="w-full h-10 border rounded px-3" {...form.register("status")}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input id="featured" type="checkbox" {...form.register("featured")} />
          <Label htmlFor="featured">Destacada</Label>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" {...form.register("address")} />
        </div>
        <div>
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" {...form.register("city")} />
        </div>
        <div>
          <Label htmlFor="postal_code">Código Postal</Label>
          <Input id="postal_code" {...form.register("postal_code")} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" rows={5} {...form.register("description")} />
        </div>
      </div>

      {/* Imágenes */}
      <div className="space-y-2">
        <Label>Imágenes</Label>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />
        {files.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {files.map((f, i) => (
              <div key={i} className="relative w-28 h-20 rounded overflow-hidden bg-stone-200">
                <Image alt={f.name} src={URL.createObjectURL(f)} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" className="bg-black text-white" disabled={submitting}>
        {submitting ? "Guardando..." : propertyId ? "Guardar cambios" : "Crear propiedad"}
      </Button>
    </form>
  );
}
