import Nav from "@/components/skh/Nav";
import Footer, { SampleNotice } from "@/components/skh/Footer";
import { WhatsAppIcon } from "@/components/skh/Contact";
import { serif } from "@/lib/fonts";
import { SKH, NETWORK } from "@/lib/skh";

export const metadata = {
  title: `Collab | ${SKH.name}`,
  description: "Partner with Startup Karna Hai: co-host SKH Sessions, back Demo Day, bring Founder Wheels to your city or build programs for founders.",
};

const HERO_IMAGE = "/sessions/hyd-1-2.jpg";

// Who SKH partners with
const PARTNERS = [
  { title: "Brands & companies", text: "Reach founders and early adopters, and back the next wave of Indian startups." },
  { title: "Colleges & universities", text: "Bring founders, investors and alumni mentors to your campus." },
  { title: "Incubators & co-working spaces", text: "Host SKH Sessions and give your startups a direct line to investors." },
  { title: "Funds & angel networks", text: "Meet founders early, through people who already know them." },
];

// Ways to collaborate
const WAYS = [
  { title: "Co-host an SKH Session", text: "A talk, workshop or investor office hours, run together at your venue or online." },
  { title: "Back Demo Day", text: "Partner on Demo Day, join the jury, or support the founders who make it to the stage." },
  { title: "Bring Founder Wheels to your city", text: "Host a stop and meet the best founders in your region." },
  { title: "Build a program together", text: "Mentorship, a fundraising bootcamp or a founder track designed with SKH." },
];

export default function CollabPage() {
  const whatsapp = `https://wa.me/${SKH.whatsapp}?text=${encodeURIComponent("Hi SKH, I'd like to collaborate with you.")}`;

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <SampleNotice />
      <Nav active="collab" />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Collab</p>
          <h1 className={`${serif.className} mt-4 text-5xl leading-[1.05] sm:text-6xl`}>
            Build the startup ecosystem <em className="text-orange-600">with us.</em>
          </h1>
          <p className="mt-6 text-lg leading-8 text-black/65">
            Partner with {SKH.short} to reach founders early, alongside {NETWORK.investors} investors and IIT, IIM and ISB alumni.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="/#contact" className="rounded-md bg-orange-600 px-6 py-3.5 font-semibold text-white hover:bg-orange-700">
              Partner with us →
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 font-semibold text-[#1b1b1b] hover:bg-[#1ebe5b]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp us
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-black/10 shadow-xl">
          <img src={HERO_IMAGE} alt="SKH partners in a meeting" className="aspect-[4/3] w-full object-cover" />
        </div>
      </section>

      {/* Who we partner with */}
      <section className="border-y border-black/10 bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className={`${serif.className} text-4xl leading-tight sm:text-5xl`}>Who we partner with</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p, i) => (
              <div key={p.title} className="rounded-2xl bg-[#faf8f3] p-6 ring-1 ring-black/5">
                <span className="text-sm font-semibold text-orange-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 leading-7 text-black/60">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to collaborate */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <h2 className={`${serif.className} text-4xl leading-tight sm:text-5xl`}>Ways to collaborate</h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {WAYS.map((w) => (
            <div key={w.title} className="flex gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="text-xl font-semibold">{w.title}</h3>
                <p className="mt-1 leading-7 text-black/60">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#1b1b1b] p-9 text-white md:flex-row md:items-center">
          <div>
            <h2 className={`${serif.className} text-4xl`}>Have an idea for a collab?</h2>
            <p className="mt-2 text-white/75">Tell us about it. The {SKH.short} team replies within two working days.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a href="/#contact" className="rounded-md bg-orange-600 px-6 py-3.5 font-semibold hover:bg-orange-700">
              Send a message →
            </a>
            <a href={`mailto:${SKH.email}`} className="rounded-md bg-white/10 px-6 py-3.5 font-semibold ring-1 ring-white/20 hover:bg-white/15">
              {SKH.email}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
