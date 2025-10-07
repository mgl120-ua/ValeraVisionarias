import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase/service";

// GET /api/admin/properties?search=&category=venta|alquiler|all&page=1&pageSize=10
export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin-session")?.value === "authenticated";
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  // permitimos "category" y, por compatibilidad, "status" (que algunas UIs usan para enviar venta/alquiler)
  const category = (url.searchParams.get("category") || url.searchParams.get("status") || "all") as
    | "venta"
    | "alquiler"
    | "all";
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const pageSize = Math.max(1, Math.min(100, parseInt(url.searchParams.get("pageSize") || "10", 10)));

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = createServiceClient();

  let query = supabase
    .from("properties")
    .select(
      `
      id,
      title,
      address,
      price,
      category,
      status,
      featured,
      created_at,
      bedrooms,
      bathrooms,
      property_images ( url, position )
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (category !== "all") {
    query = query.eq("category", category);
  }
  if (search.trim()) {
    query = query.or(`title.ilike.%${search}%,address.ilike.%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({
    data: data ?? [],
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
  });
}

// POST /api/admin/properties  (crear)
export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin-session")?.value === "authenticated";
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("properties")
    .insert({
      title: body.title,
      description: body.description,
      price: body.price,
      size: body.size,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      address: body.address,
      city: body.city ?? "San Vicente del Raspeig",
      postal_code: body.postal_code ?? null,
      category: body.category,         // 'venta' | 'alquiler'
      status: body.status ?? "activo", // 'activo' | 'inactivo'
      featured: !!body.featured,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ id: data.id }, { status: 201 });
}
