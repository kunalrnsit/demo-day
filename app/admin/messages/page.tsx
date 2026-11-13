"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  reason: string;
  message: string;
  status: string;
  created_at: string;
};

const REASON_LABEL: Record<string, { label: string; className: string }> = {
  founder: { label: "Founder", className: "bg-orange-100 text-orange-800" },
  investor: { label: "Investor", className: "bg-emerald-100 text-emerald-800" },
  partner: { label: "Partner", className: "bg-blue-100 text-blue-800" },
  other: { label: "Other", className: "bg-slate-100 text-slate-700" },
};

const TABS = [
  { key: "new", label: "New" },
  { key: "replied", label: "Replied" },
  { key: "archived", label: "Archived" },
  { key: "all", label: "All" },
];

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function whatsappLink(phone: string, name: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits;
  return `https://wa.me/${digits}?text=${encodeURIComponent(`Hi ${name.split(" ")[0]}, this is the SKH team replying to your message.`)}`;
}

export default function AdminMessagesPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("new");
  const [search, setSearch] = useState("");

  const load = useCallback(async (accessToken: string) => {
    setLoading(true);
    const res = await fetch("/api/admin/messages", { headers: { Authorization: `Bearer ${accessToken}` } });
    const body = await res.json().catch(() => ({ error: "Server sent an empty reply" }));
    setLoading(false);
    if (!res.ok) {
      setError(res.status === 401 ? "This account is not an admin. Check ADMIN_EMAILS." : body.error);
      return;
    }
    setError("");
    setMessages(body.messages);
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
    const res = await fetch("/api/admin/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setError("Could not update the message. Please try again.");
      return;
    }
    setMessages((list) => list.map((m) => (m.id === id ? { ...m, status } : m)));
  }

  const counts = useMemo(
    () => ({
      new: messages.filter((m) => m.status === "new").length,
      replied: messages.filter((m) => m.status === "replied").length,
      archived: messages.filter((m) => m.status === "archived").length,
      all: messages.length,
    }),
    [messages]
  );

  const visible = useMemo(() => {
    let list = tab === "all" ? messages : messages.filter((m) => m.status === tab);
    const q = search.trim().toLowerCase();
    if (q) list = list.filter((m) => [m.name, m.email, m.phone ?? "", m.message].some((v) => v.toLowerCase().includes(q)));
    return list;
  }, [messages, tab, search]);

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#1b1b1b]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-600 text-[10px] font-black text-white">SKH</span>
            <span className="font-semibold">Admin</span>
          </div>
          <nav className="flex items-center gap-1 text-sm">
            <a href="/admin" className="rounded-md px-3 py-1.5 font-semibold text-black/60 hover:text-black">Applications</a>
            <a href="/admin/messages" className="rounded-md bg-black/5 px-3 py-1.5 font-semibold">Messages</a>
            <a href="/" className="rounded-md px-3 py-1.5 font-semibold text-black/60 hover:text-black">View site</a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8">
        <h1 className="text-2xl font-semibold">Contact messages</h1>
        <p className="mt-1 text-sm text-black/55">From the contact form on the SKH website.</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  tab === t.key ? "bg-[#1b1b1b] text-white" : "bg-white text-black/65 ring-1 ring-black/10 hover:text-black"
                }`}
              >
                {t.label} <span className="opacity-60">{counts[t.key as keyof typeof counts]}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, message..."
              className="w-full rounded-lg border border-black/15 bg-white px-3.5 py-2 text-sm outline-none focus:border-orange-500 sm:w-64"
            />
            <button onClick={() => load(token)} className="rounded-lg bg-white px-3.5 py-2 text-sm font-semibold ring-1 ring-black/10 hover:bg-black/5">
              Refresh
            </button>
          </div>
        </div>

        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}

        <div className="mt-5 space-y-3">
          {loading && <p className="rounded-xl bg-white p-8 text-center text-black/50 ring-1 ring-black/5">Loading messages...</p>}
          {!loading && visible.length === 0 && (
            <p className="rounded-xl bg-white p-8 text-center text-black/50 ring-1 ring-black/5">No messages here.</p>
          )}
          {!loading &&
            visible.map((m) => {
              const r = REASON_LABEL[m.reason] ?? REASON_LABEL.other;
              return (
                <article key={m.id} className={`rounded-xl bg-white p-5 ring-1 ${m.status === "new" ? "ring-orange-300" : "ring-black/5"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{m.name}</p>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.className}`}>{r.label}</span>
                        {m.status === "new" && <span className="h-2 w-2 rounded-full bg-orange-500" title="New" />}
                      </div>
                      <p className="mt-0.5 text-sm text-black/55">
                        {m.email}
                        {m.phone ? ` · ${m.phone}` : ""}
                      </p>
                    </div>
                    <p className="text-xs text-black/45">{formatDate(m.created_at)}</p>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap leading-7 text-black/80">{m.message}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <a
                      href={`mailto:${m.email}?subject=${encodeURIComponent("Re: your message to SKH")}`}
                      className="rounded-lg bg-[#1b1b1b] px-3.5 py-2 font-semibold text-white hover:bg-black"
                    >
                      Reply by email
                    </a>
                    {m.phone && (
                      <a
                        href={whatsappLink(m.phone, m.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[#25D366] px-3.5 py-2 font-semibold text-white hover:bg-[#1ebe5b]"
                      >
                        WhatsApp
                      </a>
                    )}
                    {m.status !== "replied" && (
                      <button onClick={() => setStatus(m.id, "replied")} className="rounded-lg bg-white px-3.5 py-2 font-semibold ring-1 ring-black/15 hover:bg-black/5">
                        Mark replied
                      </button>
                    )}
                    {m.status !== "archived" ? (
                      <button onClick={() => setStatus(m.id, "archived")} className="rounded-lg px-3.5 py-2 font-semibold text-black/55 hover:text-black">
                        Archive
                      </button>
                    ) : (
                      <button onClick={() => setStatus(m.id, "new")} className="rounded-lg px-3.5 py-2 font-semibold text-black/55 hover:text-black">
                        Move back to New
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </main>
  );
}
