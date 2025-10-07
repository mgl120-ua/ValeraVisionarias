import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase/service";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string; imageId: string } }) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin-session")?.value === "authenticated";
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServiceClient();
  // 1) obtener URL para borrar el archivo físico
  const { data: img, error: getErr } = await supabase
    .from("property_images").select("url").eq("id", params.imageId).single();
  if (getErr) return NextResponse.json({ error: getErr.message }, { status: 400 });

  // convertir public URL a path del bucket
  const url = new URL(img.url);
  const path = url.pathname.split("/storage/v1/object/public/properties/")[1]; // bucket público
  if (path) {
    await supabase.storage.from("properties").remove([path]);
  }

  // 2) borrar fila
  const { error } = await supabase.from("property_images").delete().eq("id", params.imageId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
