import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase/service";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin-session")?.value === "authenticated";
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { order } = await req.json().catch(() => ({ order: [] as { id: string; position: number }[] }));
  if (!Array.isArray(order) || order.length === 0) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const supabase = createServiceClient();

  for (const item of order) {
    const { error } = await supabase
      .from("property_images")
      .update({ position: item.position })
      .eq("id", item.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
