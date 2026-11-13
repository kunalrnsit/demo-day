"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Investor = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organisation: string | null;
  investor_type: string;
  ticket_size: string | null;
  sectors: string[];
  linkedin: string | null;
  note: string | null;
  status: string;
  created_at: string;
};

const TYPE_LABEL: Record<string, string> = {
  angel: "Angel",
  vc: "VC fund",
  family_office: "Family office",
  banker: "Investment banker",
  corporate: "Corporate / CVC",
  other: "Other",
};

const STATUS: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "bg-orange-100 text-orange-800" },
  contacted: { label: "Contacted", className: "bg-blue-100 text-blue-800" },
  onboarded: { label: "Onboarded", className: "bg-emerald-100 text-emerald-800" },
  not_a_fit: { label: "Not a fit", className: "bg-slate-100 text-slate-600" },
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function whatsappLink(phone: string, name: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits;
  return `https://wa.me/${digits}?text=${encodeURIComponent(`Hi ${name.split(" ")[0]}, this is the SKH team. Thanks for joining our investor network!`)}`;
}

function downloadCsv(rows: Investor[]) {
  const headers = ["Name", "Email", "Phone", "Organisation", "Type", "Cheque size", "Sectors", "LinkedIn", "Note", "Status", "Joined"];
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [r.name, r.email, r.phone, r.organisation, TYPE_LABEL[r.investor_type] ?? r.investor_type, r.ticket_size,
     r.sectors.join("; "), r.linkedin, r.note, STATUS[r.status]?.label ?? r.status, formatDate(r.created_at)]
      .map(escape)
      .join(",")
  );
  const blob = new Blob(["﻿" + [headers.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `skh-investors-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminInvestorsPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const load = useCallback(async (accessToken: string) => {
    setLoading(true);
    const res = await fetch("/api/admin/investors", { headers: { Authorization: `Bearer ${accessToken}` } });
    const body = await res.json().catch(() => ({ error: "Server sent an empty reply" }));
    setLoading(false);
    if (!res.ok) {
      setError(res.status === 401 ? "This account is not an admin. Check ADMIN_EMAILS." : body.error);
      return;
    }
    setError("");
    setInvestors(body.investors);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
        return;
      }
      setToken(data.session.access_token);
      load(data.session.access_token);
    });
  }, [router, load]);

  async function setStatus(id: string, status: string) {
    const res = await fetch("/api/admin/investors", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setError("Could not update. Please try again.");
      return;
    }
    setInvestors((list) => list.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  const stats = useMemo(
    () => [
      { label: "Total sign-ups", value: investors.length },
      { label: "New", value: investors.filter((i) => i.status === "new").length },
      { label: "Onboarded", value: investors.filter((i) => i.status === "onboarded").length },
      { label: "Angels", value: investors.filter((i) => i.investor_type === "angel").length },
      { label: "Funds & family offices", value: investors.filter((i) => ["vc", "family_office", "corporate"].includes(i.investor_type)).length },
      { label: "Investment bankers", value: investors.filter((i) => i.investor_type === "banker").length },
    ],
    [investors]
  );

  const visible = useMemo(() => {
    let list = investors;
    if (statusTab !== "all") list = list.filter((i) => i.status === statusTab);
    if (typeFilter !== "all") list = list.filter((i) => i.investor_type === typeFilter);
    const q = search.trim().toLowerCase();
    if (q)
      list = list.filter((i) =>
        [i.name, i.email, i.phone ?? "", i.organisation ?? "", i.sectors.join(" "), i.note ?? ""].some((v) => v.toLowerCase().includes(q))
      );
    return list;
  }, [investors, statusTab, typeFilter, search]);

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#1b1b1b]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-600 text-[10px] font-black text-white">SKH</span>
            <span className="font-semibold">Admin</span>
          </div>
          <nav className="flex items-center gap-1 text-sm">
            <a href="/admin" className="rounded-md px-3 py-1.5 font-semibold text-black/60 hover:text-black">Applications</a>
            <a href="/admin/messages" className="rounded-md px-3 py-1.5 font-semibold text-black/60 hover:text-black">Messages</a>
            <a href="/admin/investors" className="rounded-md bg-black/5 px-3 py-1.5 font-semibold">Investors</a>
            <a href="/" className="hidden rounded-md px-3 py-1.5 font-semibold text-black/60 hover:text-black sm:inline">View site</a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="text-2xl font-semibold">Investor network</h1>
        <p className="mt-1 text-sm text-black/55">Investors who joined through the Portfolio page.</p>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-white p-4 ring-1 ring-black/5">
              <p className="text-xs font-medium text-black/50">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {[["all", "All"], ...Object.entries(STATUS).map(([k, v]) => [k, v.label])].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setStatusTab(key)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  statusTab === key ? "bg-[#1b1b1b] text-white" : "bg-white text-black/65 ring-1 ring-black/10 hover:text-black"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500"
            >
              <option value="all">All types</option>
              {Object.entries(TYPE_LABEL).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, firm, sector..."
              className="w-full rounded-lg border border-black/15 bg-white px-3.5 py-2 text-sm outline-none focus:border-orange-500 sm:w-60"
            />
            <button onClick={() => downloadCsv(visible)} className="rounded-lg bg-white px-3.5 py-2 text-sm font-semibold ring-1 ring-black/10 hover:bg-black/5">
              Export CSV
            </button>
            <button onClick={() => load(token)} className="rounded-lg bg-white px-3.5 py-2 text-sm font-semibold ring-1 ring-black/10 hover:bg-black/5">
              Refresh
            </button>
          </div>
        </div>

        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {loading && <p className="rounded-xl bg-white p-8 text-center text-black/50 ring-1 ring-black/5 md:col-span-2">Loading investors...</p>}
          {!loading && visible.length === 0 && (
            <p className="rounded-xl bg-white p-8 text-center text-black/50 ring-1 ring-black/5 md:col-span-2">No investors here yet.</p>
          )}
          {!loading &&
            visible.map((i) => {
              const s = STATUS[i.status] ?? STATUS.new;
              return (
                <article key={i.id} className="flex flex-col rounded-xl bg-white p-5 ring-1 ring-black/5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{i.name}</p>
                      <p className="text-sm text-black/55">
                        {TYPE_LABEL[i.investor_type] ?? i.investor_type}
                        {i.organisation ? ` · ${i.organisation}` : ""}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${s.className}`}>{s.label}</span>
                  </div>

                  <dl className="mt-4 space-y-1.5 text-sm">
                    <div className="flex gap-3"><dt className="w-20 shrink-0 text-black/45">Email</dt><dd className="break-all">{i.email}</dd></div>
                    {i.phone && <div className="flex gap-3"><dt className="w-20 shrink-0 text-black/45">Phone</dt><dd>{i.phone}</dd></div>}
                    {i.ticket_size && <div className="flex gap-3"><dt className="w-20 shrink-0 text-black/45">Cheque</dt><dd>{i.ticket_size}</dd></div>}
                    <div className="flex gap-3"><dt className="w-20 shrink-0 text-black/45">Joined</dt><dd>{formatDate(i.created_at)}</dd></div>
                  </dl>

                  {i.sectors.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {i.sectors.map((sec) => (
                        <span key={sec} className="rounded-md bg-[#faf8f3] px-2 py-0.5 text-xs font-medium text-black/65 ring-1 ring-black/5">{sec}</span>
                      ))}
                    </div>
                  )}
                  {i.note && <p className="mt-3 rounded-lg bg-[#faf8f3] p-3 text-sm leading-6 text-black/70">{i.note}</p>}

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 text-sm">
                    <a href={`mailto:${i.email}?subject=${encodeURIComponent("Welcome to the SKH investor network")}`} className="rounded-lg bg-[#1b1b1b] px-3 py-1.5 font-semibold text-white hover:bg-black">
                      Email
                    </a>
                    {i.phone && (
                      <a href={whatsappLink(i.phone, i.name)} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#25D366] px-3 py-1.5 font-semibold text-white hover:bg-[#1ebe5b]">
                        WhatsApp
                      </a>
                    )}
                    {i.linkedin && (
                      <a href={i.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#0a66c2] px-3 py-1.5 font-semibold text-white hover:bg-[#09579f]">
                        LinkedIn
                      </a>
                    )}
                    <select
                      value={i.status}
                      onChange={(e) => setStatus(i.id, e.target.value)}
                      className="ml-auto rounded-lg border border-black/15 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-orange-500"
                      aria-label="Status"
                    >
                      {Object.entries(STATUS).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </div>
                </article>
              );
            })}
        </div>
        <p className="mt-3 text-xs text-black/45">Showing {visible.length} of {investors.length} investors.</p>
      </div>
    </main>
  );
}
