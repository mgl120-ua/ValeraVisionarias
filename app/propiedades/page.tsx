import { createSupabaseServer } from "@/lib/supabase/server";
import PropiedadesClient from "./PropiedadesClient";

export const revalidate = 60;

export default async function PropiedadesPage() {
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("status", "activo")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  const propiedades = Array.isArray(data) ? data : [];

  return <PropiedadesClient propiedades={propiedades} />;
}
