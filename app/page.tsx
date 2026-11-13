import Nav from "@/components/skh/Nav";
import Footer, { SampleNotice } from "@/components/skh/Footer";
import Contact from "@/components/skh/Contact";
import PortfolioCard from "@/components/skh/PortfolioCard";
import { serif } from "@/lib/fonts";
import { SKH, STATS, PROGRAMS, PORTFOLIO, NETWORK, INVESTING_STEPS, EVENTS, FAQS } from "@/lib/skh";

export const metadata = {
  title: `${SKH.name} (${SKH.short}) | Build, pitch and raise`,
  description: SKH.tagline,
};

const HERO_IMAGE = "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=80";
const ABOUT_IMAGE = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80";

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const upcoming = EVENTS.filter((e) => e.status === "upcoming").slice(0, 3);

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <SampleNotice />
      <div className="bg-[#1b1b1b] px-4 py-2.5 text-center text-sm text-white/90">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-orange-500 align-middle" />
        Demo Day 2027 applications are open.{" "}
        <a href="/demo-day" className="font-semibold text-orange-400 underline-offset-4 hover:underline">
          Learn more →
        </a>
      </div>
      <Nav active="home" />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
            {SKH.name} · {SKH.short}
          </p>
          <h1 className={`${serif.className} mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl`}>
            Startup karna hai? <em className="text-orange-600">Chalo, karte hain.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-black/65">
            {SKH.short} helps early-stage founders build, pitch and raise, with a network of investors, investment
            bankers and IIT, IIM and ISB alumni who back people they know.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/demo-day"
              className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-orange-700"
            >
              Apply to Demo Day <Arrow />
            </a>
            <a href="/portfolio" className="inline-flex items-center gap-2 px-2 py-3.5 font-semibold text-black/70 hover:text-black">
              See our portfolio
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-black/10 shadow-xl">
            <img src={HERO_IMAGE} alt="Founder pitching to investors" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden w-60 rounded-xl border border-black/5 bg-white p-4 shadow-lg sm:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-black/45">Our network</p>
            <p className={`${serif.className} mt-1 text-4xl`}>{NETWORK.investors}</p>
            <p className="text-sm text-black/60">investors backing founders through {SKH.short}</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 md:grid-cols-4 md:divide-x md:divide-black/10">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-9 text-center">
              <p className={`${serif.className} text-5xl`}>{s.value}</p>
              <p className="mt-2 text-sm text-black/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">What we run</p>
            <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>Three ways in to {SKH.short}</h2>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((p) => (
            <a key={p.key} href={p.href} className="group overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition hover:shadow-xl">
              <div className="overflow-hidden bg-black/5">
                <img src={p.image} alt={p.title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">{p.tag}</span>
                <h3 className={`${serif.className} mt-4 text-3xl`}>{p.title}</h3>
                <p className="mt-3 leading-7 text-black/60">{p.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-orange-700">
                  Explore <Arrow />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-[#1b1b1b] py-24 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">About {SKH.short}</p>
            <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>
              Every founder deserves someone in their corner.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              {SKH.name} started with a simple belief: good ideas fail more often for lack of the right people than for
              lack of talent. So we built a community where founders meet investors, bankers and alumni mentors, and
              where trust comes before term sheets.
            </p>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Through Demo Day, SKH Events and Founder Caravan, we find founders early, get to know them, and open the
              doors they need, from the first pitch to the next round.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {NETWORK.alumni.map((a) => (
                <div key={a.school} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className={`${serif.className} text-3xl`}>{a.count}</p>
                  <p className="mt-1 text-sm text-white/60">{a.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white/5">
            <img src={ABOUT_IMAGE} alt="SKH community meetup" className="aspect-[4/5] w-full object-cover opacity-90" />
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Portfolio</p>
            <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>
              Startups we&apos;ve backed and are helping raise
            </h2>
          </div>
          <a href="/portfolio" className="inline-flex items-center gap-2 font-semibold text-orange-700 hover:text-orange-800">
            Full portfolio <Arrow />
          </a>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.slice(0, 6).map((c) => (
            <PortfolioCard key={c.name} company={c} />
          ))}
        </div>
      </section>

      {/* Relationship-based investing */}
      <section className="border-y border-black/10 bg-white py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">How we invest</p>
            <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>
              Relationship-based investing
            </h2>
            <p className="mt-5 text-lg leading-8 text-black/65">
              Our network has {NETWORK.investors} investors and {NETWORK.investmentBankers} investment bankers. They
              back founders they&apos;ve come to know, not pitch decks from strangers.
            </p>
          </div>
          <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {INVESTING_STEPS.map((s, i) => (
              <li key={s.title} className="border-t border-black/15 pt-6">
                <span className="text-sm font-semibold text-orange-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-7 text-black/60">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">SKH Events</p>
            <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>Coming up</h2>
          </div>
          <a href="/events" className="inline-flex items-center gap-2 font-semibold text-orange-700 hover:text-orange-800">
            All events <Arrow />
          </a>
        </div>
        <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
          {upcoming.map((e) => (
            <div key={e.title} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:gap-8">
              <p className="w-40 shrink-0 font-semibold text-orange-700">{e.date}</p>
              <div className="flex-1">
                <p className="text-lg font-semibold">{e.title}</p>
                <p className="text-sm text-black/55">{e.kind} · {e.city}</p>
              </div>
              <a href={e.link ?? "/#contact"} className="text-sm font-semibold text-black/70 hover:text-black">
                {e.link ? "Register →" : "Get notified →"}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-black/10 bg-[#faf8f3] py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className={`${serif.className} text-center text-4xl sm:text-5xl`}>Questions</h2>
          <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {f.q}
                  <span className="text-2xl font-light text-orange-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-7 text-black/60">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
