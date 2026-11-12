import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId) throw new Error("RAZORPAY_KEY_ID is missing in .env.local");
    if (!keySecret) throw new Error("RAZORPAY_KEY_SECRET is missing in .env.local");

    const amount = Number(process.env.APPLICATION_FEE_PAISE);
    if (!amount) throw new Error("APPLICATION_FEE_PAISE is missing in .env.local");

    const supabaseAdmin = getSupabaseAdmin();
    const { applicationId } = await request.json();

    const { data: app, error: dbError } = await supabaseAdmin
      .from("applications")
      .select("application_id, payment_status")
      .eq("application_id", applicationId)
      .single();

    if (dbError || !app)
      throw new Error("Application not found. " + (dbError?.message ?? ""));
    if (app.payment_status === "paid")
      return NextResponse.json({ error: "Already paid" }, { status: 400 });

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: app.application_id,
      notes: { application_id: app.application_id },
    });

    await supabaseAdmin
      .from("applications")
      .update({ razorpay_order_id: order.id, amount_paise: amount })
      .eq("application_id", app.application_id);

    return NextResponse.json({ orderId: order.id, amount, keyId });
  } catch (err: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = err as any;
    const message = e?.error?.description ?? e?.message ?? "Unknown server error";
    console.error("create-order failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}