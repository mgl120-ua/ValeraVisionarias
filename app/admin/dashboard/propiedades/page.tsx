"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
// Para evitar problemas de dominios con next/image en admin, usamos <img>
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Star, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type PropertyImage = {
  url: string;
  position?: number | null;
};

type Property = {
  id: string;
  title: string;
  address: string | null;
  price: number;
  category: "venta" | "alquiler" | null; // en BD es category
  status: "activo" | "inactivo";         // visibilidad
  featured: boolean | null;
  created_at: string;
  bedrooms: number | null;
  bathrooms: number | null;
  property_images?: PropertyImage[];
};

export default function PropiedadesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | "venta" | "alquiler">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);

  // Debounce
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const load = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: String(currentPage),
        pageSize: String(itemsPerPage),
      });
      if (filterCategory !== "all") {
        params.set("category", filterCategory);
        params.set("status", filterCategory); // compat
      }
      if (debouncedSearch) params.set("search", debouncedSearch);

      const res = await fetch(`/api/admin/properties?${params.toString()}`, {
        cache: "no-store",
      });

      let json: any = null;
      let text = "";
      try {
        json = await res.json();
      } catch {
        text = await res.text();
      }

      if (!res.ok) {
        console.error(json?.error || text || "Error fetching properties");
        setProperties([]);
        setTotal(0);
        return;
      }

      setProperties(json.data || []);
      setTotal(json.total ?? 0);
    } catch (e) {
      console.error(e);
      setProperties([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };


  const toggleFeatured = async (id: string, newVal: boolean) => {
    const res = await fetch(`/api/admin/properties/${id}/featured`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: newVal }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j.error || "No se pudo actualizar.");
      return;
    }
    await load();
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filterCategory, currentPage]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / itemsPerPage)),
    [total]
  );

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta propiedad?")) return;
    const res = await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j.error || "No se pudo eliminar.");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-light text-black mb-2">Gestión de Propiedades</h1>
          <p className="text-stone-600">{loading ? "Cargando…" : `${total} propiedades totales`}</p>
        </div>
        <Link href="/admin/dashboard/propiedades/nueva">
          <Button className="bg-black hover:bg-stone-800 text-white">
            <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
            Nueva Propiedad
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="border-2 border-stone-200">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" aria-hidden="true" />
                <Input
                  type="search"
                  placeholder="Buscar por título o dirección..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 h-11 border-stone-300 focus:border-black focus:ring-black"
                />
              </div>
            </div>

            <div>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value as "all" | "venta" | "alquiler");
                  setCurrentPage(1);
                }}
                className="w-full h-11 border border-stone-300 rounded-md px-3 bg-white focus:border-black focus:ring-black"
              >
                <option value="all">Todas las categorías</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>

            <Button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
                setCurrentPage(1);
              }}
              variant="outline"
              className="border-stone-300 hover:border-black bg-transparent"
            >
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-2 border-stone-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-stone-200">
                <TableHead className="w-[120px]">Imagen</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">Dirección</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="hidden lg:table-cell">Categoría</TableHead>
                <TableHead className="hidden xl:table-cell">Publicado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((p) => {
                const mainImg = (p.property_images && p.property_images.length > 0)
                  ? [...p.property_images].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]?.url
                  : undefined;

                return (
                  <TableRow key={p.id} className="border-stone-200 hover:bg-stone-50">
                    <TableCell>
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-stone-200">
                        {mainImg ? (
                          <img
                            src={mainImg}
                            alt={p.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <img
                            src="/placeholder.svg"
                            alt="Sin imagen"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        )}
                        {p.featured && (
                          <div className="absolute top-1 right-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-label="Destacada" />
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="font-medium text-black">{p.title}</TableCell>
                    <TableCell className="hidden md:table-cell text-stone-600 text-sm">
                      {p.address ?? "—"}
                    </TableCell>

                    <TableCell className="font-semibold text-black">
                      €{Number(p.price ?? 0).toLocaleString("es-ES")}
                      {p.category === "alquiler" && <span className="text-xs text-stone-600">/mes</span>}
                    </TableCell>

                    <TableCell className="hidden lg:table-cell">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          p.category === "venta" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {p.category === "venta" ? "Venta" : "Alquiler"}
                      </span>
                    </TableCell>

                    <TableCell className="hidden xl:table-cell text-stone-600 text-sm">
                      {new Date(p.created_at).toLocaleDateString("es-ES")}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/propiedad/${p.id}`} target="_blank">
                          <Button variant="ghost" size="sm" className="hover:bg-stone-100" aria-label="Ver propiedad">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>

                        <Link href={`/admin/dashboard/propiedades/${p.id}`}>
                          <Button variant="ghost" size="sm" className="hover:bg-stone-100" aria-label="Editar propiedad">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatured(p.id, !p.featured)}
                          className="hover:bg-yellow-50"
                          aria-label="Destacar"
                          title={p.featured ? "Quitar de destacadas" : "Marcar como destacada"}
                        >
                          <Star className={`w-4 h-4 ${p.featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(p.id)}
                          className="hover:bg-red-50 hover:text-red-600"
                          aria-label="Eliminar propiedad"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {properties.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-stone-500 py-8">
                    No se encontraron propiedades.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-stone-200">
            <p className="text-sm text-stone-600">
              Página {currentPage} de {totalPages} — {total} propiedades
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border-stone-300 hover:border-black bg-transparent"
              >
                Anterior
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, currentPage - 3), Math.max(0, currentPage - 3) + 5)
                  .map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-black text-white"
                          : "border-stone-300 hover:border-black bg-transparent"
                      }
                    >
                      {page}
                    </Button>
                  ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="border-stone-300 hover:border-black bg-transparent"
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
