import crypto from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature)
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("applications")
      .update({ payment_status: "paid", razorpay_payment_id, paid_at: new Date().toISOString() })
      .eq("razorpay_order_id", razorpay_order_id)
      .select("application_id")
      .single();

    if (error || !data) throw new Error("Could not update application. " + (error?.message ?? ""));

    return NextResponse.json({ applicationId: data.application_id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    console.error("verify-payment failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}