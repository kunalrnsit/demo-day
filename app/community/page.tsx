import Nav from "@/components/skh/Nav";
import Footer, { SampleNotice } from "@/components/skh/Footer";
import { serif } from "@/lib/fonts";
import { SKH, NETWORK } from "@/lib/skh";
import { COMMUNITY } from "@/lib/community";

export const metadata = {
  title: `Community | ${SKH.name}`,
  description: "Join the SKH Community: founders, investors, mentors and IIT, IIM and ISB alumni who help each other build.",
};

const HERO_IMAGE = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80";

export default function CommunityPage() {
  const joinHref = COMMUNITY.joinLink || "/#contact";
  const external = COMMUNITY.joinLink.startsWith("http");

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <SampleNotice />
      <Nav active="community" />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">SKH Community</p>
          <h1 className={`${serif.className} mt-4 text-5xl leading-[1.05] sm:text-6xl`}>
            Building is lonely. <em className="text-orange-600">It doesn&apos;t have to be.</em>
          </h1>
          <p className="mt-6 text-lg leading-8 text-black/65">{COMMUNITY.intro}</p>
          <a
            href={joinHref}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-9 inline-block rounded-md bg-orange-600 px-6 py-3.5 font-semibold text-white hover:bg-orange-700"
          >
            Join the community →
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl bg-black/10 shadow-xl">
          <img src={HERO_IMAGE} alt="SKH community members" className="aspect-[4/3] w-full object-cover" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 md:grid-cols-4 md:divide-x md:divide-black/10">
          {COMMUNITY.stats.map((s) => (
            <div key={s.label} className="px-4 py-9 text-center">
              <p className={`${serif.className} text-5xl`}>{s.value}</p>
              <p className="mt-2 text-sm text-black/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who's in it */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <h2 className={`${serif.className} text-4xl leading-tight sm:text-5xl`}>Who&apos;s in the community</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY.who.map((w, i) => (
            <div key={w.title} className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <span className="text-sm font-semibold text-orange-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 leading-7 text-black/60">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni */}
      <section className="bg-[#1b1b1b] py-24 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">Alumni network</p>
          <h2 className={`${serif.className} mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl`}>
            Backed by alumni from India&apos;s top institutes.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {NETWORK.alumni.map((a) => (
              <div key={a.school} className="rounded-2xl bg-orange-600 p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">{a.school}</p>
                <p className={`${serif.className} mt-3 text-5xl`}>{a.count}</p>
                <p className="mt-1 text-white/85">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <h2 className={`${serif.className} text-4xl leading-tight sm:text-5xl`}>What members get</h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {COMMUNITY.benefits.map((b) => (
            <div key={b.title} className="flex gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="text-xl font-semibold">{b.title}</h3>
                <p className="mt-1 leading-7 text-black/60">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guidelines + CTA */}
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-24 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-9 ring-1 ring-black/5">
          <h3 className="text-2xl font-semibold">Community guidelines</h3>
          <ul className="mt-5 space-y-3">
            {COMMUNITY.guidelines.map((g) => (
              <li key={g} className="flex gap-3 leading-7 text-black/70">
                <span className="font-semibold text-orange-600">·</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-2xl bg-orange-600 p-9 text-white">
          <div>
            <h3 className={`${serif.className} text-4xl`}>Ready to join?</h3>
            <p className="mt-3 text-white/85">It&apos;s free. Tell us a little about yourself and we&apos;ll add you.</p>
          </div>
          <a
            href={joinHref}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-6 inline-block self-start rounded-md bg-[#1b1b1b] px-6 py-3.5 font-semibold hover:bg-black"
          >
            Join the community →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
