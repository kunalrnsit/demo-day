import { notFound } from "next/navigation";
import Nav from "@/components/skh/Nav";
import Footer, { SampleNotice } from "@/components/skh/Footer";
import { SpeakerAvatar } from "@/components/skh/SessionCard";
import { serif } from "@/lib/fonts";
import { SKH } from "@/lib/skh";
import { SESSIONS, formatSessionDate, isUpcoming } from "@/lib/sessions";

export function generateStaticParams() {
  return SESSIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SESSIONS.find((x) => x.slug === slug);
  if (!s) return { title: `Session not found | ${SKH.name}` };
  return { title: `${s.title} | SKH Sessions`, description: s.summary };
}

export default async function SessionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SESSIONS.find((x) => x.slug === slug);
  if (!s) notFound();

  const upcoming = isUpcoming(s);
  const [cover, ...gallery] = s.photos;

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <SampleNotice />
      <Nav active="sessions" />

      {/* Header */}
      <section className="mx-auto max-w-6xl px-5 pt-10">
        <a href="/sessions" className="text-sm font-semibold text-black/55 hover:text-black">← All sessions</a>
        <div className="mt-6 grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${upcoming ? "bg-orange-600 text-white" : "bg-black/5 text-black/70"}`}>
                {upcoming ? "Upcoming" : "Past session"}
              </span>
              <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">{s.format}</span>
            </div>
            <h1 className={`${serif.className} mt-4 text-5xl leading-[1.05] sm:text-6xl`}>{s.title}</h1>
            <p className="mt-5 text-lg leading-8 text-black/65">{s.summary}</p>
          </div>
          <dl className="grid gap-3 rounded-2xl bg-white p-6 text-sm ring-1 ring-black/5">
            <div className="flex gap-4"><dt className="w-16 shrink-0 text-black/45">Date</dt><dd className="font-semibold">{formatSessionDate(s.date)}</dd></div>
            {s.time && <div className="flex gap-4"><dt className="w-16 shrink-0 text-black/45">Time</dt><dd className="font-semibold">{s.time}</dd></div>}
            <div className="flex gap-4"><dt className="w-16 shrink-0 text-black/45">Where</dt><dd className="font-semibold">{s.venue ? `${s.venue}, ${s.city}` : s.city}</dd></div>
            {upcoming && s.registerLink && (
              <a href={s.registerLink} className="mt-2 rounded-md bg-orange-600 px-4 py-3 text-center font-semibold text-white hover:bg-orange-700">
                Register for this session
              </a>
            )}
          </dl>
        </div>
      </section>

      {/* Cover */}
      {cover && (
        <section className="mx-auto max-w-6xl px-5 pt-10">
          <img src={cover} alt={s.title} className="aspect-[21/9] w-full rounded-2xl bg-black/10 object-cover" />
        </section>
      )}

      {/* Stats */}
      {s.stats.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-10">
          <div className={`grid gap-px overflow-hidden rounded-2xl bg-black/10 ring-1 ring-black/10 ${
            s.stats.length === 1 ? "grid-cols-1" : s.stats.length === 2 ? "grid-cols-2" : s.stats.length === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"
          }`}>
            {s.stats.map((st) => (
              <div key={st.label} className="bg-white px-4 py-7 text-center">
                <p className={`${serif.className} text-5xl`}>{st.value}</p>
                <p className="mt-2 text-sm text-black/55">{st.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Speakers */}
      {s.speakers.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-16">
          <h2 className="text-2xl font-semibold">Speakers</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.speakers.map((sp, i) => (
              <div key={`${sp.name}-${i}`} className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
                <SpeakerAvatar speaker={sp} size="md" />
                <div className="min-w-0">
                  <p className="font-semibold">{sp.name}</p>
                  <p className="text-sm text-black/55">{sp.role}</p>
                  {sp.linkedin && (
                    <a href={sp.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#0a66c2] hover:underline">
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Takeaways & outcomes */}
      {(s.takeaways.length > 0 || s.outcomes.length > 0) && (
        <section className="mx-auto grid max-w-6xl gap-6 px-5 pt-16 md:grid-cols-2">
          {s.takeaways.length > 0 && (
            <div className="rounded-2xl bg-white p-7 ring-1 ring-black/5">
              <h2 className="text-2xl font-semibold">Key takeaways</h2>
              <ol className="mt-5 space-y-4">
                {s.takeaways.map((t, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">{i + 1}</span>
                    <p className="leading-7 text-black/75">{t}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {s.outcomes.length > 0 && (
            <div className="rounded-2xl bg-[#1b1b1b] p-7 text-white">
              <h2 className="text-2xl font-semibold">Outcomes</h2>
              <ul className="mt-5 space-y-4">
                {s.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="leading-7 text-white/85">{o}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-16">
          <h2 className="text-2xl font-semibold">Photos</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((src, i) => (
              <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-xl bg-black/10">
                <img src={src} alt={`${s.title} photo ${i + 2}`} className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105" />
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-orange-600 p-9 text-white md:flex-row md:items-center">
          <div>
            <h2 className={`${serif.className} text-4xl`}>Don&apos;t miss the next one.</h2>
            <p className="mt-2 text-white/85">Join the SKH Community to hear about sessions first.</p>
          </div>
          <a href="/community" className="shrink-0 rounded-md bg-[#1b1b1b] px-6 py-3.5 font-semibold hover:bg-black">
            Join the community →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
