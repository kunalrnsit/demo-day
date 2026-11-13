import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";

const STATUSES = ["new", "replied", "archived"];

// List all contact messages (admins only)
export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return NextResponse.json({ error: "Not authorised" }, { status: 401 });

    const { data, error } = await getSupabaseAdmin()
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return NextResponse.json({ messages: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("admin/messages GET failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Change a message's status: new / replied / archived (admins only)
export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return NextResponse.json({ error: "Not authorised" }, { status: 401 });

    const { id, status } = await request.json();
    if (typeof id !== "string" || !STATUSES.includes(status))
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const { error } = await getSupabaseAdmin().from("contact_messages").update({ status }).eq("id", id);
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("admin/messages POST failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
