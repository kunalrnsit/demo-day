"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Round2 = {
  problem: string;
  solution: string;
  customer: string;
  progress: string;
  why_you: string;
  submitted_at: string;
};

type Application = {
  application_id: string;
  full_name: string;
  email: string;
  phone: string;
  startup_idea: string;
  status: string;
  payment_status: string;
  amount_paise: number | null;
  razorpay_payment_id: string | null;
  created_at: string;
  paid_at: string | null;
  round2_answers: Round2 | Round2[] | null;
};

const STATUS: Record<string, { label: string; className: string }> = {
  registered: { label: "Applied", className: "bg-slate-100 text-slate-700" },
  round2: { label: "Round 2 invited", className: "bg-blue-100 text-blue-700" },
  round2_submitted: { label: "Round 2 submitted", className: "bg-violet-100 text-violet-700" },
  finalist: { label: "Finalist", className: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700" },
};

const TABS = [
  { key: "all", label: "All paid" },
  { key: "registered", label: "Applied" },
  { key: "round2", label: "Round 2 invited" },
  { key: "round2_submitted", label: "Round 2 submitted" },
  { key: "finalist", label: "Finalists" },
  { key: "rejected", label: "Rejected" },
  { key: "unpaid", label: "Unpaid" },
];

const ROUND2_QUESTIONS: [keyof Round2, string][] = [
  ["problem", "Problem"],
  ["solution", "Solution"],
  ["customer", "Customer & business model"],
  ["progress", "Progress so far"],
  ["why_you", "Why you"],
];

function getRound2(app: Application): Round2 | null {
  if (!app.round2_answers) return null;
  return Array.isArray(app.round2_answers) ? app.round2_answers[0] ?? null : app.round2_answers;
}

function formatDate(value: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function StatusBadge({ status, paid }: { status: string; paid: boolean }) {
  if (!paid) return <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">Payment pending</span>;
  const s = STATUS[status] ?? { label: status, className: "bg-slate-100 text-slate-700" };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${s.className}`}>{s.label}</span>;
}

function downloadCsv(rows: Application[]) {
  const headers = [
    "Application ID", "Name", "Email", "Phone", "Idea", "Status", "Payment", "Paid at",
    "Problem", "Solution", "Customer", "Progress", "Why you",
  ];
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = rows.map((a) => {
    const r2 = getRound2(a);
    return [
      a.application_id, a.full_name, a.email, a.phone, a.startup_idea,
      STATUS[a.status]?.label ?? a.status, a.payment_status, a.paid_at ?? "",
      r2?.problem, r2?.solution, r2?.customer, r2?.progress, r2?.why_you,
    ].map(escape).join(",");
  });
  const blob = new Blob(["﻿" + [headers.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `demo-day-applications-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async (accessToken: string) => {
    setLoading(true);
    const res = await fetch("/api/admin/applications", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const body = await res.json().catch(() => ({ error: "Server sent an empty reply" }));
    setLoading(false);
    if (!res.ok) {
      setError(res.status === 401 ? "This account is not an admin. Check ADMIN_EMAILS." : body.error);
      return;
    }
    setError("");
    setApps(body.applications);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
        return;
      }
      setToken(data.session.access_token);
      setAdminEmail(data.session.user.email ?? "");
      load(data.session.access_token);
    });
  }, [router, load]);

  async function updateStatus(applicationIds: string[], status: string) {
    setBusy(true);
    const res = await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ applicationIds, status }),
    });
    const body = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      alertError(body.error ?? "Could not update status");
      return;
    }
    setSelected([]);
    await load(token);
  }

  function alertError(message: string) {
    setError(message);
    setTimeout(() => setError(""), 5000);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  function copyRound2Link() {
    navigator.clipboard.writeText(`${window.location.origin}/round-2`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const paidApps = useMemo(() => apps.filter((a) => a.payment_status === "paid"), [apps]);

  const stats = useMemo(() => {
    const count = (s: string) => paidApps.filter((a) => a.status === s).length;
    const revenue = paidApps.reduce((sum, a) => sum + (a.amount_paise ?? 0), 0) / 100;
    return [
      { label: "Paid applications", value: paidApps.length },
      { label: "Payment pending", value: apps.length - paidApps.length },
      { label: "Round 2 invited", value: count("round2") },
      { label: "Round 2 submitted", value: count("round2_submitted") },
      { label: "Finalists", value: count("finalist") },
      { label: "Collected", value: `₹${revenue.toLocaleString("en-IN")}` },
    ];
  }, [apps, paidApps]);

  const visible = useMemo(() => {
    let list = tab === "unpaid" ? apps.filter((a) => a.payment_status !== "paid") : paidApps;
    if (tab !== "all" && tab !== "unpaid") list = list.filter((a) => a.status === tab);
    const q = search.trim().toLowerCase();
    if (q)
      list = list.filter((a) =>
        [a.application_id, a.full_name, a.email, a.phone, a.startup_idea].some((v) => v?.toLowerCase().includes(q))
      );
    return list;
  }, [apps, paidApps, tab, search]);

  const openApp = apps.find((a) => a.application_id === openId) ?? null;
  const openRound2 = openApp ? getRound2(openApp) : null;
  const selectable = visible.filter((a) => a.payment_status === "paid");
  const allSelected = selectable.length > 0 && selectable.every((a) => selected.includes(a.application_id));

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#1b1b1b]">
      {/* Top bar */}
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-600 text-sm font-bold text-white">D</span>
            <span className="font-semibold">SKH Admin · Applications</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/admin/messages" className="font-semibold text-black/70 hover:text-black">Messages</a>
            <a href="/" className="font-semibold text-black/70 hover:text-black">View site</a>
            <span className="hidden text-black/50 sm:inline">{adminEmail}</span>
            <button onClick={signOut} className="font-semibold text-black/70 hover:text-black">Sign out</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-white p-4 ring-1 ring-black/5">
              <p className="text-xs font-medium text-black/50">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setSelected([]); }}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  tab === t.key ? "bg-[#1b1b1b] text-white" : "bg-white text-black/65 ring-1 ring-black/10 hover:text-black"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, ID, idea..."
              className="w-full rounded-lg border border-black/15 bg-white px-3.5 py-2 text-sm outline-none focus:border-orange-500 sm:w-72"
            />
            <button onClick={copyRound2Link} className="rounded-lg bg-white px-3.5 py-2 text-sm font-semibold ring-1 ring-black/10 hover:bg-black/5">
              {copied ? "Copied!" : "Copy Round 2 link"}
            </button>
            <button onClick={() => downloadCsv(visible)} className="rounded-lg bg-white px-3.5 py-2 text-sm font-semibold ring-1 ring-black/10 hover:bg-black/5">
              Export CSV
            </button>
            <button onClick={() => load(token)} className="rounded-lg bg-white px-3.5 py-2 text-sm font-semibold ring-1 ring-black/10 hover:bg-black/5">
              Refresh
            </button>
          </div>
        </div>

        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}

        {/* Bulk actions */}
        {selected.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-[#1b1b1b] px-4 py-3 text-sm text-white">
            <span className="mr-2 font-semibold">{selected.length} selected</span>
            <button disabled={busy} onClick={() => updateStatus(selected, "round2")} className="rounded-md bg-blue-500 px-3 py-1.5 font-semibold hover:bg-blue-600 disabled:opacity-50">Move to Round 2</button>
            <button disabled={busy} onClick={() => updateStatus(selected, "finalist")} className="rounded-md bg-emerald-500 px-3 py-1.5 font-semibold hover:bg-emerald-600 disabled:opacity-50">Make finalist</button>
            <button disabled={busy} onClick={() => updateStatus(selected, "rejected")} className="rounded-md bg-red-500 px-3 py-1.5 font-semibold hover:bg-red-600 disabled:opacity-50">Reject</button>
            <button onClick={() => setSelected([])} className="ml-auto text-white/70 hover:text-white">Clear</button>
          </div>
        )}

        {/* Table */}
        <div className="mt-4 overflow-x-auto rounded-xl bg-white ring-1 ring-black/5">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-black/10 text-xs uppercase tracking-wide text-black/50">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => setSelected(allSelected ? [] : selectable.map((a) => a.application_id))}
                  />
                </th>
                <th className="px-4 py-3">Application</th>
                <th className="px-4 py-3">Startup idea</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-black/50">Loading applications...</td></tr>
              )}
              {!loading && visible.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-black/50">No applications here yet.</td></tr>
              )}
              {!loading &&
                visible.map((a) => (
                  <tr key={a.application_id} onClick={() => setOpenId(a.application_id)} className="cursor-pointer hover:bg-orange-50/50">
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      {a.payment_status === "paid" && (
                        <input
                          type="checkbox"
                          checked={selected.includes(a.application_id)}
                          onChange={() =>
                            setSelected((s) =>
                              s.includes(a.application_id) ? s.filter((x) => x !== a.application_id) : [...s, a.application_id]
                            )
                          }
                        />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">{a.full_name}</p>
                      <p className="text-xs text-black/50">{a.application_id} · {a.email}</p>
                    </td>
                    <td className="max-w-sm px-4 py-3 text-black/75"><p className="line-clamp-2">{a.startup_idea}</p></td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} paid={a.payment_status === "paid"} /></td>
                    <td className="whitespace-nowrap px-4 py-3 text-black/55">{formatDate(a.created_at)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-black/45">Showing {visible.length} of {apps.length} applications. Click a row to see full details.</p>
      </div>

      {/* Detail drawer */}
      {openApp && (
        <div className="fixed inset-0 z-40 flex justify-end bg-black/30" onClick={() => setOpenId(null)}>
          <aside className="h-full w-full max-w-lg overflow-y-auto bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-black/45">{openApp.application_id}</p>
                <h2 className="mt-1 text-2xl font-semibold">{openApp.full_name}</h2>
                <div className="mt-2"><StatusBadge status={openApp.status} paid={openApp.payment_status === "paid"} /></div>
              </div>
              <button onClick={() => setOpenId(null)} className="text-2xl leading-none text-black/40 hover:text-black">×</button>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              {[
                ["Email", openApp.email],
                ["Phone", openApp.phone],
                ["Applied", formatDate(openApp.created_at)],
                ["Paid", openApp.payment_status === "paid" ? `₹${(openApp.amount_paise ?? 0) / 100} on ${formatDate(openApp.paid_at)}` : "Not paid"],
                ["Payment ID", openApp.razorpay_payment_id ?? "-"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4">
                  <dt className="w-24 shrink-0 text-black/45">{k}</dt>
                  <dd className="break-all font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-xl bg-[#faf8f3] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-black/45">Round 1 · One-line idea</p>
              <p className="mt-2 leading-7">{openApp.startup_idea}</p>
            </div>

            <div className="mt-4 rounded-xl bg-[#faf8f3] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-black/45">Round 2 · Startup details</p>
              {openRound2 ? (
                <div className="mt-3 space-y-4">
                  {ROUND2_QUESTIONS.map(([key, label]) => (
                    <div key={key}>
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="mt-1 leading-7 text-black/75">{openRound2[key]}</p>
                    </div>
                  ))}
                  <p className="text-xs text-black/45">Submitted {formatDate(openRound2.submitted_at)}</p>
                </div>
              ) : (
                <p className="mt-2 text-sm text-black/50">
                  {openApp.status === "round2" ? "Invited. Waiting for their answers." : "Not submitted."}
                </p>
              )}
            </div>

            {openApp.payment_status === "paid" && (
              <div className="mt-6 flex flex-wrap gap-2">
                {openApp.status === "registered" && (
                  <button disabled={busy} onClick={() => updateStatus([openApp.application_id], "round2")} className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
                    Move to Round 2
                  </button>
                )}
                {openApp.status !== "finalist" && (
                  <button disabled={busy} onClick={() => updateStatus([openApp.application_id], "finalist")} className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
                    Make finalist
                  </button>
                )}
                {openApp.status !== "rejected" && (
                  <button disabled={busy} onClick={() => updateStatus([openApp.application_id], "rejected")} className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-50 disabled:opacity-50">
                    Reject
                  </button>
                )}
                {openApp.status === "rejected" && (
                  <button disabled={busy} onClick={() => updateStatus([openApp.application_id], openRound2 ? "round2_submitted" : "registered")} className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold ring-1 ring-black/15 hover:bg-black/5 disabled:opacity-50">
                    Undo reject
                  </button>
                )}
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
