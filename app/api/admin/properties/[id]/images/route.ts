import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-session";
import { createServiceClient } from "@/lib/supabase/service";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const isAdmin = await isAdminRequest();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServiceClient();
  const form = await req.formData();
  const files = form.getAll("files") as File[];        // <input name="files" multiple />
  const positions = form.getAll("positions") as string[]; // opcional

  if (!files.length) return NextResponse.json({ error: "No files" }, { status: 400 });

  const inserted: { id: string; url: string }[] = [];

  // Sube cada archivo y guarda en property_images
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const pos = Number(positions?.[i] ?? i);

    const path = `${params.id}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("properties").upload(path, file, {
      upsert: false,
      contentType: file.type,
    });
    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });

    const { data: pub } = supabase.storage.from("properties").getPublicUrl(path);
    const url = pub.publicUrl;

    const { data, error: insErr } = await supabase
      .from("property_images")
      .insert({ property_id: params.id, url, position: pos })
      .select("id,url")
      .single();

    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 400 });
    inserted.push(data);
  }

  return NextResponse.json({ images: inserted });
}
