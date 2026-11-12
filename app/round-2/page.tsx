"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const QUESTIONS = [
  { key: "problem", label: "Problem", hint: "What problem are you solving, and for whom?" },
  { key: "solution", label: "Solution", hint: "How does your product solve it?" },
  { key: "customer", label: "Customer & business model", hint: "Who will pay for it, and how will you make money?" },
  { key: "progress", label: "Progress so far", hint: "What have you built or achieved? Users, revenue, prototype..." },
  { key: "why_you", label: "Why you", hint: "Why are you the right person or team to build this?" },
];

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3.5 outline-none transition placeholder:text-black/35 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15";

const MESSAGES: Record<string, string> = {
  not_found: "We couldn't find a paid application with this ID and email. Please check both.",
  not_shortlisted: "This application hasn't been shortlisted for Round 2.",
  already_submitted: "You've already submitted your Round 2 answers. We'll be in touch!",
  not_allowed: "This application can't submit Round 2 answers right now.",
  invalid: "Please answer all 5 questions (maximum 300 characters each).",
};

export default function Round2Page() {
  const [step, setStep] = useState<"verify" | "form" | "done">("verify");
  const [applicationId, setApplicationId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await supabase.rpc("check_round2", {
      p_application_id: applicationId,
      p_email: email,
    });
    setLoading(false);
    if (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
      return;
    }
    if (data.result !== "eligible") {
      setError(MESSAGES[data.result] ?? "Something went wrong.");
      return;
    }
    setName(data.name);
    setStep("form");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await supabase.rpc("submit_round2", {
      p_application_id: applicationId,
      p_email: email,
      p_problem: answers.problem ?? "",
      p_solution: answers.solution ?? "",
      p_customer: answers.customer ?? "",
      p_progress: answers.progress ?? "",
      p_why_you: answers.why_you ?? "",
    });
    setLoading(false);
    if (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
      return;
    }
    if (data.result !== "ok") {
      setError(MESSAGES[data.result] ?? "Something went wrong.");
      return;
    }
    setStep("done");
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <header className="border-b border-black/5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-600 text-sm font-bold text-white">D</span>
            <span className="text-lg font-semibold tracking-tight">Demo Day</span>
          </a>
          <a href="/" className="text-sm font-semibold text-black/60 hover:text-black">← Back to home</a>
        </nav>
      </header>

      <div className="mx-auto max-w-2xl px-5 py-14 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Round 2 · Idea evaluation</p>

        {step === "verify" && (
          <>
            <h1 className="mt-4 font-serif text-5xl leading-tight">Tell us more about your startup</h1>
            <p className="mt-4 text-lg leading-8 text-black/65">
              Congratulations on being shortlisted! Enter your Application ID and the email you applied with to
              open your Round 2 form.
            </p>
            <form onSubmit={handleVerify} className="mt-10 space-y-5 rounded-2xl bg-white p-7 shadow-xl ring-1 ring-black/5 sm:p-9">
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Application ID</label>
                <input value={applicationId} onChange={(e) => setApplicationId(e.target.value)} required placeholder="DD-2026-000001" className={`${inputClass} uppercase`} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@example.com" className={inputClass} />
              </div>
              {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}
              <button type="submit" disabled={loading} className="w-full rounded-lg bg-orange-600 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60">
                {loading ? "Checking..." : "Continue →"}
              </button>
            </form>
          </>
        )}

        {step === "form" && (
          <>
            <h1 className="mt-4 font-serif text-5xl leading-tight">Hi {name.split(" ")[0]}, 5 quick questions</h1>
            <p className="mt-4 text-lg leading-8 text-black/65">
              Keep each answer short and specific, one or two lines. You can submit only once.
            </p>
            <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl bg-white p-7 shadow-xl ring-1 ring-black/5 sm:p-9">
              {QUESTIONS.map((q, i) => (
                <div key={q.key}>
                  <label className="mb-1 block font-semibold">
                    <span className="mr-2 text-orange-600">{i + 1}.</span>
                    {q.label}
                  </label>
                  <p className="mb-2 text-sm text-black/50">{q.hint}</p>
                  <textarea
                    required
                    rows={2}
                    maxLength={300}
                    value={answers[q.key] ?? ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.key]: e.target.value }))}
                    className={`${inputClass} resize-none`}
                  />
                  <p className="mt-1 text-right text-xs text-black/40">{(answers[q.key] ?? "").length}/300</p>
                </div>
              ))}
              {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}
              <button type="submit" disabled={loading} className="w-full rounded-lg bg-orange-600 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60">
                {loading ? "Submitting..." : "Submit Round 2 →"}
              </button>
            </form>
          </>
        )}

        {step === "done" && (
          <div className="mt-6 rounded-2xl bg-white p-9 text-center shadow-xl ring-1 ring-black/5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg viewBox="0 0 16 16" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="mt-5 font-serif text-4xl">Round 2 submitted!</h1>
            <p className="mt-3 text-black/60">
              Thanks, {name.split(" ")[0]}. We&apos;ll review your answers and let finalists know by email.
            </p>
            <p className="mt-4 font-mono font-semibold">{applicationId.toUpperCase()}</p>
          </div>
        )}
      </div>
    </main>
  );
}