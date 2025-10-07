// app/admin/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createSupabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic"; // asegura fresh data en dev

export default async function AdminDashboardPage() {
  const supabase = createSupabaseServer();

  // Totales (ojo: con la policy de arriba, esto cuenta SOLO 'activo' para anon)
  const { count: totalActivas } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true }); // status='activo' por RLS

  const { count: totalDestacadas } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("featured", true); // y además 'activo' por RLS

  // Últimas 5 propiedades (activas por RLS)
  const { data: recent, error: recentError } = await supabase
    .from("properties")
    .select("id,title,status,created_at,featured")
    .order("created_at", { ascending: false })
    .limit(5);

  if (recentError) {
    console.error(recentError);
  }

  const stats = [
    {
      name: "Total Propiedades (activas)",
      value: totalActivas ?? 0,
      change: "", // si quieres, calcula variación mensual en otra consulta
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Destacadas",
      value: totalDestacadas ?? 0,
      change: "Activas",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Visitas totales",
      value: "—",
      change: "Próximamente (analytics)",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Consultas",
      value: "—",
      change: "Próximamente (CRM)",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-light text-black mb-2">
            Bienvenido al Dashboard
          </h1>
          <p className="text-stone-600">Resumen de tu inmobiliaria</p>
        </div>
        <Link href="/admin/dashboard/propiedades/nueva">
          <Button className="bg-black hover:bg-stone-800 text-white">
            <Building2 className="w-4 h-4 mr-2" aria-hidden="true" />
            Nueva Propiedad
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-2 border-stone-200 hover:border-black transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} aria-hidden="true" />
                </div>
              </div>
              <p className="text-sm text-stone-600 mb-1">{stat.name}</p>
              <p className="text-3xl font-bold text-black mb-2">
                {String(stat.value)}
              </p>
              {stat.change ? <p className="text-xs text-stone-500">{stat.change}</p> : null}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Properties */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-2 border-stone-200">
          <CardHeader>
            <CardTitle className="font-playfair text-2xl font-light">Propiedades Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(recent ?? []).map((p) => {
                const statusBadge =
                  p.status === "activo"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800";
                const date = new Date(p.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                });
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-black">
                        {p.title} {p.featured ? "✨" : ""}
                      </p>
                      <p className="text-sm text-stone-600">{date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge}`}>
                      {p.status === "activo" ? "Publicada" : "Borrador"}
                    </span>
                  </div>
                );
              })}
            </div>
            <Link href="/admin/dashboard/propiedades">
              <Button variant="outline" className="w-full mt-4 border-stone-300 hover:border-black bg-transparent">
                Ver todas las propiedades
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 border-stone-200">
          <CardHeader>
            <CardTitle className="font-playfair text-2xl font-light">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/dashboard/propiedades/nueva">
              <Button className="w-full bg-black hover:bg-stone-800 text-white justify-start">
                <Building2 className="w-4 h-4 mr-2" aria-hidden="true" />
                Crear Nueva Propiedad
              </Button>
            </Link>
            <p>Próximamente más acciones rápidas...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
