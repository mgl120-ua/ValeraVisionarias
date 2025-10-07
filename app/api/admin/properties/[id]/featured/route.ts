import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceClient } from "@/lib/supabase/service";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin-session")?.value === "authenticated";
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { featured } = await req.json(); // boolean
  const supabase = createServiceClient();
  const { error } = await supabase.from("properties").update({ featured }).eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
