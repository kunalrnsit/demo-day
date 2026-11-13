"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const REASONS = [
  { key: "founder", label: "I'm a founder" },
  { key: "investor", label: "I'm an investor" },
  { key: "partner", label: "Partner with SKH" },
  { key: "other", label: "Something else" },
];

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[#1b1b1b] outline-none transition placeholder:text-black/35 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15";

const MESSAGES: Record<string, string> = {
  invalid: "Please fill in your name, a valid email and a message (at least a few words).",
  too_many: "You've sent several messages just now. Please wait a few minutes and try again.",
};

export default function ContactForm() {
  const [reason, setReason] = useState("founder");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    // Hidden field that only bots fill in
    if (String(form.get("company_website") ?? "")) return;

    setLoading(true);
    setError("");
    const name = String(form.get("name"));
    const { data, error } = await supabase.rpc("submit_contact_message", {
      p_name: name,
      p_email: String(form.get("email")),
      p_phone: String(form.get("phone") ?? ""),
      p_reason: reason,
      p_message: String(form.get("message")),
    });
    setLoading(false);

    if (error) {
      console.error(error);
      setError("Something went wrong. Please try again, or message us on WhatsApp.");
      return;
    }
    if (data?.result !== "ok") {
      setError(MESSAGES[data?.result] ?? "Something went wrong. Please try again.");
      return;
    }
    setSentTo(name.split(" ")[0]);
  }

  if (sentTo) {
    return (
      <div className="rounded-2xl bg-[#faf8f3] p-9 text-center ring-1 ring-black/5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <svg viewBox="0 0 16 16" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl font-semibold">Thanks, {sentTo}!</h3>
        <p className="mt-2 text-black/60">We&apos;ve got your message and will get back to you within two working days.</p>
        <button onClick={() => setSentTo("")} className="mt-6 text-sm font-semibold text-orange-700 hover:text-orange-800">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-[#faf8f3] p-6 ring-1 ring-black/5 sm:p-8">
      <p className="text-sm font-semibold">What brings you here?</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {REASONS.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setReason(r.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              reason === r.key ? "bg-[#1b1b1b] text-white" : "bg-white text-black/70 ring-1 ring-black/10 hover:text-black"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-semibold">Name</label>
          <input id="c-name" name="name" required maxLength={100} placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm font-semibold">Email</label>
          <input id="c-email" name="email" type="email" required maxLength={200} placeholder="you@example.com" className={inputClass} />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="c-phone" className="mb-1.5 block text-sm font-semibold">
          Phone / WhatsApp <span className="font-normal text-black/45">(optional)</span>
        </label>
        <input id="c-phone" name="phone" type="tel" maxLength={20} placeholder="10-digit mobile number" className={inputClass} />
      </div>
      <div className="mt-4">
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-semibold">Message</label>
        <textarea
          id="c-message"
          name="message"
          required
          minLength={5}
          maxLength={2000}
          rows={4}
          placeholder={
            reason === "investor"
              ? "Tell us about you and the kind of startups you back."
              : reason === "partner"
                ? "How would you like to work with SKH?"
                : "Tell us what you're building and how we can help."
          }
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Bots fill this in; people never see it */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-orange-600 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send message →"}
      </button>
    </form>
  );
}
