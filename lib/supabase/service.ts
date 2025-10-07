import { createClient } from "@supabase/supabase-js";

export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!; // ¡no exponer en el cliente!
  return createClient(url, key, { auth: { persistSession: false } });
}
