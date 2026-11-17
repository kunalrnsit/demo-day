import Nav from "@/components/skh/Nav";
import Footer, { SampleNotice } from "@/components/skh/Footer";
import SessionCard from "@/components/skh/SessionCard";
import { serif } from "@/lib/fonts";
import { SKH } from "@/lib/skh";
import { sortedSessions, SESSIONS } from "@/lib/sessions";

export const metadata = {
  title: `SKH Sessions | ${SKH.name}`,
  description: "Founder talks, investor office hours and workshops by Startup Karna Hai, with speakers, stats, takeaways and outcomes.",
};

export default function SessionsPage() {
  const sessions = sortedSessions(); // newest first

  // Totals across all sessions, for the strip at the top
  const attendees = SESSIONS.reduce((sum, s) => {
    const stat = s.stats.find((x) => /attend/i.test(x.label));
    const n = stat ? parseInt(stat.value.replace(/[^0-9]/g, ""), 10) : 0;
    return sum + (Number.isNaN(n) ? 0 : n);
  }, 0);
  const speakers = new Set(SESSIONS.flatMap((s) => s.speakers.map((sp) => `${sp.name}|${sp.role}`))).size;
  const cities = new Set(SESSIONS.map((s) => s.city)).size;

  // Attendees and Speakers only appear once sessions have that data filled in
  const totals = [
    { value: String(SESSIONS.length), label: "Sessions" },
    attendees > 0 ? { value: `${attendees}+`, label: "Attendees" } : null,
    speakers > 0 ? { value: String(speakers), label: "Speakers" } : null,
    { value: String(cities), label: cities === 1 ? "City" : "Cities" },
  ].filter((t): t is { value: string; label: string } => t !== null);
  const totalCols = totals.length === 2 ? "grid-cols-2" : totals.length === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4";

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <SampleNotice />
      <Nav active="sessions" />

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-14 md:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">SKH Sessions</p>
        <h1 className={`${serif.className} mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl`}>
          Learn from people who&apos;ve <em className="text-orange-600">done it.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
          Founder talks, investor office hours and hands-on workshops. Every session ends with real takeaways, and
          often with real introductions.
        </p>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className={`mx-auto grid max-w-6xl px-5 divide-x divide-black/10 ${totalCols}`}>
          {totals.map((t) => (
            <div key={t.label} className="px-4 py-8 text-center">
              <p className={`${serif.className} text-5xl`}>{t.value}</p>
              <p className="mt-2 text-sm text-black/55">{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold">All sessions</h2>
          <p className="text-sm text-black/50">Newest first</p>
        </div>
        {sessions.length === 0 ? (
          <p className="mt-6 text-black/55">New sessions are announced soon.</p>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {sessions.map((s) => (
              <SessionCard key={s.slug} session={s} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-orange-600 px-5 py-20 text-center text-white">
        <h2 className={`${serif.className} mx-auto max-w-2xl text-4xl sm:text-5xl`}>Want to speak at or host a session?</h2>
        <a href="/#contact" className="mt-8 inline-block rounded-md bg-[#1b1b1b] px-6 py-3.5 font-semibold hover:bg-black">
          Talk to us →
        </a>
      </section>

      <Footer />
    </main>
  );
}
