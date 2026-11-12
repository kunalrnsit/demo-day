import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";

const ALLOWED_STATUSES = ["registered", "round2", "round2_submitted", "finalist", "rejected"];

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return NextResponse.json({ error: "Not authorised" }, { status: 401 });

    const { applicationIds, status } = await request.json();
    if (!Array.isArray(applicationIds) || applicationIds.length === 0)
      return NextResponse.json({ error: "No applications selected" }, { status: 400 });
    if (!ALLOWED_STATUSES.includes(status))
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });

    const supabaseAdmin = getSupabaseAdmin();
    let query = supabaseAdmin
      .from("applications")
      .update({ status })
      .in("application_id", applicationIds)
      .eq("payment_status", "paid");

    // Only applicants still in Round 1 can be invited to Round 2
    if (status === "round2") query = query.eq("status", "registered");

    const { error } = await query;

    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("admin/update-status failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}