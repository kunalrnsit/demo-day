import Nav from "@/components/skh/Nav";
import Footer from "@/components/skh/Footer";
import { serif } from "@/lib/fonts";

export const metadata = {
  title: "Demo Day 2027 | Startup Karna Hai",
  description: "Pitch your startup idea: 1,000 ideas, 300 deep dives, 30 founders on stage.",
};

/* ------------------------------------------------------------------
   EDIT THESE: event details, fee and photos.
   To use your own photos, put them in the "public/images" folder and
   change a link below to "/images/your-photo.jpg".
------------------------------------------------------------------- */
const EVENT = {
  name: "Demo Day",
  fee: "₹499",
  deadline: "Applications close soon",
  city: "Bengaluru",
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80",
  stage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  pitch: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
  meeting: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80",
  workshop: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  laptop: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
  crowd: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
};

const stats = [
  { value: "3", label: "Rounds to the stage" },
  { value: "1,000", label: "Ideas in Round 1" },
  { value: "300", label: "Make it to Round 2" },
  { value: "30", label: "Pitch live on stage" },
];

const stages = [
  {
    step: "01",
    title: "Apply",
    text: "Tell us who you are and the problem you're solving, in one line. Pay the application fee and get your Application ID instantly.",
    image: IMAGES.laptop,
    tag: "1,000 applicants",
  },
  {
    step: "02",
    title: "Idea evaluation",
    text: "Shortlisted founders share a deeper look at their startup: market, traction, team and the plan for the next 12 months.",
    image: IMAGES.meeting,
    tag: "300 shortlisted",
  },
  {
    step: "03",
    title: "Live pitch",
    text: "Finalists pitch on stage to a panel of investors and operators, in front of a room full of builders.",
    image: IMAGES.stage,
    tag: "30 finalists",
  },
];

const benefits = [
  { title: "Stage time", text: "Pitch your startup live to investors, operators and a room full of founders." },
  { title: "Investor intros", text: "Finalists get in front of people who write cheques and open doors." },
  { title: "Expert feedback", text: "Honest notes on your idea, pitch and go-to-market from people who've built companies." },
  { title: "Reach", text: "Get your startup in front of a wider audience of founders, builders and startup fans." },
  { title: "Founder network", text: "Meet the other 29 finalists. Many of your future hires and partners are in this room." },
  { title: "Momentum", text: "A deadline and a stage are the fastest way to sharpen an idea. Use this to ship." },
];

const audience = [
  "First-time founders with an idea they can't stop thinking about",
  "Early-stage teams with a prototype, MVP or first users",
  "Students and working professionals building on the side",
  "Founders from any city, any sector: tech, D2C, fintech, climate, edtech and more",
];

const faqs = [
  {
    q: "Who can apply?",
    a: "Anyone with a startup idea or an early-stage startup. You don't need funding, a registered company or a team to apply.",
  },
  {
    q: `Why is there a ${EVENT.fee} application fee?`,
    a: "The fee keeps applications serious and covers the cost of reviewing every idea properly. It is paid securely through Razorpay (UPI, cards, net banking).",
  },
  {
    q: "What happens after I apply?",
    a: "You get an Application ID immediately. Shortlisted applicants are contacted by email for Round 2, where you share more details about your startup.",
  },
  {
    q: "How are startups selected?",
    a: "We look at the problem, the founder's insight, early signs of demand and how clearly the idea is explained.",
  },
  {
    q: "Is the fee refundable?",
    a: "The application fee is non-refundable once your application is submitted. See our Refund Policy for details.",
  },
  {
    q: "Where does the final pitch happen?",
    a: `The live pitch round takes place in ${EVENT.city}. Exact venue and date are shared with finalists.`,
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DemoDayPage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      {/* Announcement bar */}
      <div className="bg-[#1b1b1b] px-4 py-2.5 text-center text-sm text-white/90">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-orange-500 align-middle" />
        Applications are open for {EVENT.name} 2027 by Startup Karna Hai.{" "}
        <a href="/register" className="font-semibold text-orange-400 underline-offset-4 hover:underline">
          Apply now →
        </a>
      </div>

      <Nav active="demo-day" />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
            {EVENT.name} · {EVENT.city}
          </p>
          <h1 className={`${serif.className} mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl`}>
            Pitch your idea to the people who can <em className="text-orange-600">make it real.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-black/65">
            1,000 ideas. 300 deep dives. 30 founders on stage. {EVENT.name} is where early-stage founders get
            seen, get feedback, and get their first real shot.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-orange-700"
            >
              Apply for {EVENT.name} <Arrow />
            </a>
            <a href="#how" className="inline-flex items-center gap-2 px-2 py-3.5 font-semibold text-black/70 hover:text-black">
              See how it works
            </a>
          </div>
          <p className="mt-6 text-sm text-black/45">
            Application fee {EVENT.fee} · Takes about 2 minutes · {EVENT.deadline}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-black/10 shadow-xl">
            <img src={IMAGES.hero} alt="Audience at a startup event" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden w-56 rounded-xl border border-black/5 bg-white p-4 shadow-lg sm:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-black/45">Final round</p>
            <p className={`${serif.className} mt-1 text-4xl`}>30</p>
            <p className="text-sm text-black/60">founders pitch live on stage</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-black/10 px-5 md:grid-cols-4 md:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-9 text-center">
              <p className={`${serif.className} text-5xl text-[#1b1b1b]`}>{s.value}</p>
              <p className="mt-2 text-sm text-black/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About + photo */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <img src={IMAGES.team} alt="Founders working together" className="aspect-[3/4] w-full rounded-xl bg-black/10 object-cover" />
          <img src={IMAGES.pitch} alt="Founder presenting" className="mt-10 aspect-[3/4] w-full rounded-xl bg-black/10 object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Why we&apos;re doing this</p>
          <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>
            Every great company was once a one-line idea.
          </h2>
          <p className="mt-6 text-lg leading-8 text-black/65">
            Most early founders never get in front of the right people. Not because their ideas are bad, but
            because they don&apos;t have the network. {EVENT.name} fixes that.
          </p>
          <p className="mt-4 text-lg leading-8 text-black/65">
            {EVENT.name} gives you a structured path from application to stage, with real feedback at
            every round and a room full of the right people at the end.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-[#1b1b1b] py-24 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">How it works</p>
          <h2 className={`${serif.className} mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl`}>
            Three rounds. From 1,000 ideas to 30 founders on stage.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {stages.map((s) => (
              <div key={s.step} className="group overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
                <div className="overflow-hidden bg-white/5">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="aspect-[16/10] w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-orange-400">Round {s.step}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{s.tag}</span>
                  </div>
                  <h3 className={`${serif.className} mt-4 text-3xl`}>{s.title}</h3>
                  <p className="mt-3 leading-7 text-white/60">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Why apply</p>
          <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>
            What you get from {EVENT.name}
          </h2>
        </div>
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div key={b.title} className="border-t border-black/15 pt-6">
              <span className="text-sm font-semibold text-orange-600">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-semibold">{b.title}</h3>
              <p className="mt-2 leading-7 text-black/60">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo strip */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 md:grid-cols-4">
        {[IMAGES.crowd, IMAGES.workshop, IMAGES.meeting, IMAGES.stage].map((src, i) => (
          <img key={i} src={src} alt="Startup event" className="aspect-square w-full rounded-xl bg-black/10 object-cover" />
        ))}
      </section>

      {/* Who should apply */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Who should apply</p>
          <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>
            If you&apos;re building something, this is for you.
          </h2>
          <p className="mt-6 text-lg leading-8 text-black/65">
            You don&apos;t need a pitch deck, a company or a co-founder to apply. You need an idea and the drive
            to take it further.
          </p>
        </div>
        <ul className="space-y-4">
          {audience.map((item) => (
            <li key={item} className="flex gap-4 rounded-xl bg-white p-5 ring-1 ring-black/5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="leading-7 text-black/75">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-black/10 bg-white py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className={`${serif.className} text-center text-4xl sm:text-5xl`}>Frequently asked questions</h2>
          <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
            {faqs.map((f) => (
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

      {/* Final CTA */}
      <section className="bg-orange-600 px-5 py-24 text-center text-white">
        <h2 className={`${serif.className} mx-auto max-w-3xl text-4xl leading-tight sm:text-6xl`}>
          Your idea deserves a stage.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
          Apply in 2 minutes. Get your Application ID instantly.
        </p>
        <a
          href="/register"
          className="mt-9 inline-flex items-center gap-2 rounded-md bg-[#1b1b1b] px-7 py-4 font-semibold text-white transition hover:bg-black"
        >
          Apply now · {EVENT.fee} <Arrow />
        </a>
      </section>

      <Footer />
    </main>
  );
}
