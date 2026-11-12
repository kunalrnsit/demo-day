// SERVER ONLY. Checks that a request comes from a signed-in admin.
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function requireAdmin(request: Request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user?.email) return null;

  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return allowed.includes(data.user.email.toLowerCase()) ? data.user : null;
}