import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";

const STATUSES = ["new", "contacted", "onboarded", "not_a_fit"];

// List all investor sign-ups (admins only)
export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return NextResponse.json({ error: "Not authorised" }, { status: 401 });

    const { data, error } = await getSupabaseAdmin()
      .from("investor_signups")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return NextResponse.json({ investors: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("admin/investors GET failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Change an investor's status (admins only)
export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return NextResponse.json({ error: "Not authorised" }, { status: 401 });

    const { id, status } = await request.json();
    if (typeof id !== "string" || !STATUSES.includes(status))
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const { error } = await getSupabaseAdmin().from("investor_signups").update({ status }).eq("id", id);
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("admin/investors POST failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
