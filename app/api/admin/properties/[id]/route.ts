import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-session";
import { createServiceClient } from "@/lib/supabase/service";

// ✅ UPDATE
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const isAdmin = await isAdminRequest();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("properties")
    .update({
      title: body.title,
      description: body.description,
      price: body.price,
      size: body.size,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      address: body.address,
      city: body.city,
      postal_code: body.postal_code,
      category: body.category,   // 'venta' | 'alquiler'
      status: body.status,       // 'activo' | 'inactivo'
      featured: body.featured,
    })
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

// ✅ DELETE
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const isAdmin = await isAdminRequest();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServiceClient();
  const { error } = await supabase.from("properties").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}

// (Opcional) pequeño GET para comprobar desde el navegador que la ruta existe
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ ok: true, id: params.id, route: "/api/admin/properties/[id]" });
}
