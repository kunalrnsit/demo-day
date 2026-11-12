"use client";

import { useState } from "react";
import Script from "next/script";
import { Instrument_Serif } from "next/font/google";
import { supabase } from "@/lib/supabase";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"] });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { Razorpay: any }
}

const FEE_LABEL = "₹499";

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3.5 text-[#1b1b1b] outline-none transition placeholder:text-black/35 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paidId, setPaidId] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name"));
    const email = String(form.get("email"));
    const phone = String(form.get("phone"));

    const { data: applicationId, error: saveError } = await supabase.rpc("submit_application", {
      p_full_name: name,
      p_email: email,
      p_phone: phone,
      p_startup_idea: String(form.get("idea")),
    });

    if (saveError) {
      setLoading(false);
      setError(
        saveError.code === "23505"
          ? "You have already applied and paid with this email."
          : "Something went wrong. Please try again."
      );
      console.error(saveError);
      return;
    }

    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId }),
    });
    const order = await orderRes.json().catch(() => ({ error: "Server sent an empty reply" }));
    if (!orderRes.ok) {
      setLoading(false);
      setError(order.error ?? "Could not start payment.");
      return;
    }

    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: "INR",
      order_id: order.orderId,
      name: "Demo Day",
      description: `Application fee – ${applicationId}`,
      prefill: { name, email, contact: phone },
      theme: { color: "#ea580c" },
      handler: async (response: Record<string, string>) => {
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const result = await verifyRes.json().catch(() => ({}));
        setLoading(false);
        if (verifyRes.ok) setPaidId(result.applicationId);
        else setError("Payment received but verification failed. Contact us with your Application ID: " + applicationId);
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
          setError("Payment cancelled. Submit again with the same email to retry.");
        },
      },
    });
    rzp.on("payment.failed", () => setError("Payment failed. Please try again."));
    rzp.open();
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <header className="border-b border-black/5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-600 text-sm font-bold text-white">
              D
            </span>
            <span className="text-lg font-semibold tracking-tight">Demo Day</span>
          </a>
          <a href="/" className="text-sm font-semibold text-black/60 hover:text-black">
            ← Back to home
          </a>
        </nav>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1fr_1.1fr] md:py-20">
        {/* Left: what happens */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Round 1 application</p>
          <h1 className={`${serif.className} mt-4 text-5xl leading-[1.05] sm:text-6xl`}>
            Register your startup
          </h1>
          <p className="mt-5 text-lg leading-8 text-black/65">
            Takes about 2 minutes. You&apos;ll get your Application ID as soon as your payment goes through.
          </p>

          <ol className="mt-10 space-y-6">
            {[
              ["Fill in your details", "Your name, contact and your idea in one line."],
              [`Pay ${FEE_LABEL} securely`, "UPI, cards or net banking via Razorpay."],
              ["Get your Application ID", "Shortlisted founders are contacted for Round 2."],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-black/55">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: form card */}
        <div className="rounded-2xl bg-white p-7 shadow-xl ring-1 ring-black/5 sm:p-10">
          {paidId ? (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <svg viewBox="0 0 16 16" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className={`${serif.className} mt-5 text-4xl`}>You&apos;re in!</h2>
              <p className="mt-3 text-black/60">Payment successful. Your Application ID is:</p>
              <p className="mt-4 rounded-lg bg-[#faf8f3] px-4 py-4 font-mono text-2xl font-bold tracking-wider sm:text-3xl">
                {paidId}
              </p>
              <p className="mt-4 text-sm text-black/50">Save this ID. You&apos;ll need it for the next rounds.</p>
              <a href="/" className="mt-8 inline-block font-semibold text-orange-600 hover:text-orange-700">
                ← Back to home
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">Full name</label>
                <input id="name" name="name" required placeholder="Your full name" className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">Phone</label>
                <input id="phone" name="phone" type="tel" required minLength={10} maxLength={15} placeholder="10-digit mobile number" className={inputClass} />
              </div>
              <div>
                <label htmlFor="idea" className="mb-1.5 block text-sm font-semibold">Your startup idea, in one line</label>
                <input id="idea" name="idea" required maxLength={200} placeholder="e.g. UPI-based credit for kirana stores" className={inputClass} />
                <p className="mt-1.5 text-xs text-black/45">Maximum 200 characters</p>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-orange-600 px-6 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
              >
                {loading ? "Processing..." : `Pay ${FEE_LABEL} & Submit →`}
              </button>
              <p className="text-center text-xs text-black/45">
                Secure payment via Razorpay · By applying you agree to our{" "}
                <a href="/terms" className="underline">Terms</a> and{" "}
                <a href="/refund" className="underline">Refund Policy</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
