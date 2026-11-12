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

const FEE = 499;
const FEE_LABEL = `₹${FEE}`;

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3.5 text-[#1b1b1b] outline-none transition placeholder:text-black/35 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15";

type Applicant = { applicationId: string; name: string; email: string; phone: string; idea: string };

const STEPS = ["Your details", "Payment", "Confirmed"];

function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Lock() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" strokeLinecap="round" />
    </svg>
  );
}

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [paidId, setPaidId] = useState("");

  // Step 1: save the application (payment pending), then show the payment screen
  async function handleDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const details = {
      name: String(form.get("name")),
      email: String(form.get("email")),
      phone: String(form.get("phone")),
      idea: String(form.get("idea")),
    };

    const { data: applicationId, error: saveError } = await supabase.rpc("submit_application", {
      p_full_name: details.name,
      p_email: details.email,
      p_phone: details.phone,
      p_startup_idea: details.idea,
    });

    setLoading(false);
    if (saveError) {
      setError(
        saveError.code === "23505"
          ? "You have already applied and paid with this email."
          : "Something went wrong. Please try again."
      );
      console.error(saveError);
      return;
    }

    setApplicant({ applicationId, ...details });
    setStep(1);
  }

  // Step 2: create the order and open Razorpay's secure checkout
  async function handlePay() {
    if (!applicant) return;
    setLoading(true);
    setError("");

    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId: applicant.applicationId }),
    });
    const order = await orderRes.json().catch(() => ({ error: "Server sent an empty reply" }));
    if (!orderRes.ok) {
      setLoading(false);
      setError(order.error ?? "Could not start payment.");
      return;
    }

    if (!window.Razorpay) {
      setLoading(false);
      setError("Payment window didn't load. Check your internet and try again.");
      return;
    }

    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: "INR",
      order_id: order.orderId,
      name: "Demo Day",
      description: `Application fee – ${applicant.applicationId}`,
      prefill: { name: applicant.name, email: applicant.email, contact: applicant.phone },
      theme: { color: "#ea580c" },
      handler: async (response: Record<string, string>) => {
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const result = await verifyRes.json().catch(() => ({}));
        setLoading(false);
        if (verifyRes.ok) {
          setPaidId(result.applicationId);
          setStep(2);
        } else {
          setError("Payment received but verification failed. Contact us with your Application ID: " + applicant.applicationId);
        }
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
          setError("Payment cancelled. You can try again; nothing was charged.");
        },
      },
    });
    rzp.on("payment.failed", () => setError("Payment failed. Please try again or use another method."));
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
        {/* Left: intro + progress */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Round 1 application</p>
          <h1 className={`${serif.className} mt-4 text-5xl leading-[1.05] sm:text-6xl`}>Register your startup</h1>
          <p className="mt-5 text-lg leading-8 text-black/65">
            Takes about 2 minutes. You&apos;ll get your Application ID as soon as your payment goes through.
          </p>

          <ol className="mt-10 space-y-5">
            {STEPS.map((label, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={label} className="flex items-center gap-4">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                      done
                        ? "bg-emerald-600 text-white"
                        : current
                          ? "bg-orange-600 text-white ring-4 ring-orange-600/15"
                          : "bg-black/5 text-black/40"
                    }`}
                  >
                    {done ? <Check /> : i + 1}
                  </span>
                  <span className={`font-semibold ${current ? "text-[#1b1b1b]" : done ? "text-black/60" : "text-black/35"}`}>
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right: card for the current step */}
        <div className="rounded-2xl bg-white p-7 shadow-xl ring-1 ring-black/5 sm:p-10">
          {/* STEP 1: details */}
          {step === 0 && (
            <form onSubmit={handleDetails} className="space-y-5">
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

              {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-orange-600 px-6 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Continue to payment →"}
              </button>
            </form>
          )}

          {/* STEP 2: payment summary */}
          {step === 1 && applicant && (
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Payment summary</h2>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Payment pending</span>
              </div>

              {/* Applicant */}
              <div className="mt-6 rounded-xl bg-[#faf8f3] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{applicant.name}</p>
                    <p className="text-sm text-black/55">{applicant.email} · {applicant.phone}</p>
                  </div>
                  <button
                    onClick={() => { setStep(0); setError(""); }}
                    className="shrink-0 text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Edit
                  </button>
                </div>
                <p className="mt-3 border-t border-black/10 pt-3 text-sm italic text-black/65">&ldquo;{applicant.idea}&rdquo;</p>
              </div>

              {/* Bill */}
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-black/55">Application ID</dt>
                  <dd className="font-mono font-semibold">{applicant.applicationId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-black/55">Demo Day 2027 · Round 1 application fee</dt>
                  <dd className="font-semibold">{FEE_LABEL}</dd>
                </div>
                <div className="flex justify-between border-t border-dashed border-black/15 pt-3 text-base">
                  <dt className="font-semibold">Total payable</dt>
                  <dd className="text-2xl font-semibold">{FEE_LABEL}</dd>
                </div>
              </dl>

              {/* Payment methods */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-black/45">Pay using</p>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {["UPI", "Cards", "Net banking", "Wallets"].map((m) => (
                    <span key={m} className="rounded-lg border border-black/10 px-3 py-2 text-center text-sm font-medium text-black/70">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {error && <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}

              <button
                onClick={handlePay}
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
              >
                <Lock />
                {loading ? "Opening secure payment..." : `Pay ${FEE_LABEL} securely`}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-black/45">
                <Lock /> Payments processed by Razorpay. We never see your card or UPI details.
              </p>
              <p className="mt-2 text-center text-xs text-black/45">
                The fee is non-refundable. See our{" "}
                <a href="/refund" className="underline">Refund Policy</a>.
              </p>
            </div>
          )}

          {/* STEP 3: confirmed */}
          {step === 2 && (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check className="h-8 w-8" />
              </div>
              <h2 className={`${serif.className} mt-5 text-4xl`}>You&apos;re in!</h2>
              <p className="mt-3 text-black/60">Payment of {FEE_LABEL} received. Your Application ID is:</p>
              <p className="mt-4 rounded-lg bg-[#faf8f3] px-4 py-4 font-mono text-2xl font-bold tracking-wider sm:text-3xl">
                {paidId}
              </p>
              <p className="mt-4 text-sm text-black/50">Save this ID. Shortlisted founders are contacted for Round 2.</p>
              <a href="/" className="mt-8 inline-block font-semibold text-orange-600 hover:text-orange-700">
                ← Back to home
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
