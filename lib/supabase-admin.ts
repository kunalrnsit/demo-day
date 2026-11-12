// SERVER ONLY. Never import this file in a "use client" page.
import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing in .env.local");
  if (!key) throw new Error("SUPABASE_SECRET_KEY is missing in .env.local");
  return createClient(url, key, { auth: { persistSession: false } });
}