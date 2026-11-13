"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const INVESTOR_TYPES = [
  { key: "angel", label: "Angel investor" },
  { key: "vc", label: "VC fund" },
  { key: "family_office", label: "Family office" },
  { key: "banker", label: "Investment banker" },
  { key: "corporate", label: "Corporate / CVC" },
  { key: "other", label: "Other" },
];

const TICKET_SIZES = ["Under ₹5L", "₹5–25L", "₹25L–1Cr", "₹1Cr+", "Varies"];

const SECTORS = ["Fintech", "D2C / Consumer", "SaaS", "AI", "Healthtech", "Edtech", "Climate", "Agritech", "Deeptech", "Any sector"];

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[#1b1b1b] outline-none transition placeholder:text-black/35 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15";

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
        active ? "bg-[#1b1b1b] text-white" : "bg-white text-black/70 ring-1 ring-black/10 hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

export default function InvestorForm() {
  const [type, setType] = useState("angel");
  const [ticket, setTicket] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [doneName, setDoneName] = useState("");

  function toggleSector(s: string) {
    setSectors((list) => (list.includes(s) ? list.filter((x) => x !== s) : [...list, s]));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (String(form.get("company_website") ?? "")) return; // bot trap

    let linkedin = String(form.get("linkedin") ?? "").trim();
    if (linkedin && !/^https?:\/\//i.test(linkedin)) linkedin = "https://" + linkedin;

    setLoading(true);
    setError("");
    const name = String(form.get("name"));
    const { data, error } = await supabase.rpc("submit_investor_signup", {
      p_name: name,
      p_email: String(form.get("email")),
      p_phone: String(form.get("phone") ?? ""),
      p_organisation: String(form.get("organisation") ?? ""),
      p_investor_type: type,
      p_ticket_size: ticket,
      p_sectors: sectors,
      p_linkedin: linkedin,
      p_note: String(form.get("note") ?? ""),
    });
    setLoading(false);

    if (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      return;
    }
    if (data?.result === "already") {
      setError("This email is already registered with SKH. We'll be in touch soon.");
      return;
    }
    if (data?.result !== "ok") {
      setError("Please check your name, email and LinkedIn link, then try again.");
      return;
    }
    setDoneName(name.split(" ")[0]);
  }

  if (doneName) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-black/5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <svg viewBox="0 0 16 16" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl font-semibold">Welcome to the network, {doneName}!</h3>
        <p className="mt-2 text-black/60">The SKH team will reach out within a few days to understand what you look for in founders.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 ring-1 ring-black/5 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="i-name" className="mb-1.5 block text-sm font-semibold">Full name</label>
          <input id="i-name" name="name" required maxLength={100} placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="i-email" className="mb-1.5 block text-sm font-semibold">Email</label>
          <input id="i-email" name="email" type="email" required maxLength={200} placeholder="you@example.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="i-phone" className="mb-1.5 block text-sm font-semibold">
            Phone / WhatsApp <span className="font-normal text-black/45">(optional)</span>
          </label>
          <input id="i-phone" name="phone" type="tel" maxLength={20} placeholder="10-digit mobile number" className={inputClass} />
        </div>
        <div>
          <label htmlFor="i-org" className="mb-1.5 block text-sm font-semibold">
            Firm / organisation <span className="font-normal text-black/45">(optional)</span>
          </label>
          <input id="i-org" name="organisation" maxLength={150} placeholder="Blank if you invest personally" className={inputClass} />
        </div>
      </div>

      <p className="mt-6 text-sm font-semibold">You invest as</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {INVESTOR_TYPES.map((t) => (
          <Pill key={t.key} active={type === t.key} onClick={() => setType(t.key)}>
            {t.label}
          </Pill>
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold">
        Typical cheque size <span className="font-normal text-black/45">(optional)</span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TICKET_SIZES.map((t) => (
          <Pill key={t} active={ticket === t} onClick={() => setTicket(ticket === t ? "" : t)}>
            {t}
          </Pill>
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold">
        Sectors you like <span className="font-normal text-black/45">(pick any)</span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {SECTORS.map((s) => (
          <Pill key={s} active={sectors.includes(s)} onClick={() => toggleSector(s)}>
            {s}
          </Pill>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <label htmlFor="i-linkedin" className="mb-1.5 block text-sm font-semibold">
            LinkedIn profile <span className="font-normal text-black/45">(optional)</span>
          </label>
          <input id="i-linkedin" name="linkedin" maxLength={300} placeholder="linkedin.com/in/your-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="i-note" className="mb-1.5 block text-sm font-semibold">
            Anything else? <span className="font-normal text-black/45">(optional)</span>
          </label>
          <textarea
            id="i-note"
            name="note"
            rows={3}
            maxLength={1000}
            placeholder="Past investments, the kind of founders you like to back..."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {error && <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-orange-600 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
      >
        {loading ? "Joining..." : "Join the SKH investor network →"}
      </button>
      <p className="mt-3 text-center text-xs text-black/45">
        We only use your details to introduce you to founders. See our <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
