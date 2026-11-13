import Nav from "@/components/skh/Nav";
import Footer, { SampleNotice } from "@/components/skh/Footer";
import PortfolioCard from "@/components/skh/PortfolioCard";
import InvestorForm from "@/components/skh/InvestorForm";
import { serif } from "@/lib/fonts";
import { SKH, PORTFOLIO, NETWORK, INVESTING_STEPS } from "@/lib/skh";

export const metadata = {
  title: `Portfolio | ${SKH.name}`,
  description: `Startups backed by the ${SKH.short} network and founders we are helping raise.`,
};

export default function PortfolioPage() {
  const invested = PORTFOLIO.filter((c) => c.status === "Invested");
  const raising = PORTFOLIO.filter((c) => c.status === "Raising");

  const numbers = [
    { value: String(invested.length), label: "Startups invested in" },
    { value: String(raising.length), label: "Startups raising with SKH" },
    { value: NETWORK.investors, label: "Investors in the network" },
    { value: NETWORK.investmentBankers, label: "Investment bankers" },
    { value: NETWORK.startupsHelped, label: "Startups helped so far" },
  ];

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <SampleNotice />
      <Nav active="portfolio" />

      {/* Header */}
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 md:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">{SKH.short} Portfolio</p>
        <h1 className={`${serif.className} mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl`}>
          The founders we back, and the people who back them.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
          Startups our network has invested in, startups we are helping raise, and the investors, bankers and alumni
          who make it happen.
        </p>
      </section>

      {/* Numbers */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-black/10">
          {numbers.map((n) => (
            <div key={n.label} className="px-4 py-8 text-center">
              <p className={`${serif.className} text-5xl`}>{n.value}</p>
              <p className="mt-2 text-sm text-black/55">{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Invested */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-2xl font-semibold">Invested by the {SKH.short} network</h2>
          <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-sm text-black/60">{invested.length}</span>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {invested.map((c) => (
            <PortfolioCard key={c.name} company={c} />
          ))}
        </div>

        <div className="mt-16 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          <h2 className="text-2xl font-semibold">Raising with {SKH.short}</h2>
          <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-sm text-black/60">{raising.length}</span>
        </div>
        <p className="mt-2 text-black/55">Founders we are introducing to investors in our network right now.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {raising.map((c) => (
            <PortfolioCard key={c.name} company={c} />
          ))}
        </div>
      </section>

      {/* Network */}
      <section className="bg-[#1b1b1b] py-24 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">Our network</p>
          <h2 className={`${serif.className} mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl`}>
            Investors, bankers and an alumni network from India&apos;s top institutes.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
              <p className={`${serif.className} text-6xl`}>{NETWORK.investors}</p>
              <p className="mt-2 text-lg font-semibold">Investors</p>
              <p className="mt-2 leading-7 text-white/60">Angels, family offices and fund partners who meet founders through {SKH.short}.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
              <p className={`${serif.className} text-6xl`}>{NETWORK.investmentBankers}</p>
              <p className="mt-2 text-lg font-semibold">Investment bankers</p>
              <p className="mt-2 leading-7 text-white/60">Help with structuring rounds, valuations and later-stage fundraising.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {NETWORK.alumni.map((a) => (
              <div key={a.school} className="rounded-2xl bg-orange-600 p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">{a.school}</p>
                <p className={`${serif.className} mt-3 text-5xl`}>{a.count}</p>
                <p className="mt-1 text-white/85">{a.label} in the network</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relationship-based investing */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Our approach</p>
          <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>Relationship-based investing</h2>
          <p className="mt-5 text-lg leading-8 text-black/65">
            Trust comes before term sheets. Here is how a founder goes from first meeting to funded with {SKH.short}.
          </p>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {INVESTING_STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 leading-7 text-black/60">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Join as an investor */}
      <section id="join" className="scroll-mt-20 border-y border-black/10 bg-[#f3efe6] py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">For investors</p>
            <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>Join the {SKH.short} investor network</h2>
            <p className="mt-5 text-lg leading-8 text-black/65">
              Meet founders we&apos;ve come to know through Demo Day, SKH Events and Founder Caravan, introduced
              personally, matched to the sectors and cheque sizes you care about.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Curated introductions, not a flood of decks",
                "Early access to Demo Day finalists",
                "Co-invest alongside IIT, IIM and ISB alumni",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-black/75">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <InvestorForm />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-24 md:grid-cols-2">
        <div className="rounded-2xl bg-orange-600 p-9 text-white">
          <h3 className={`${serif.className} text-4xl`}>Founder?</h3>
          <p className="mt-3 text-white/85">Start with Demo Day. The best founders get introduced to the network.</p>
          <a href="/demo-day" className="mt-6 inline-block rounded-md bg-[#1b1b1b] px-5 py-3 font-semibold hover:bg-black">
            Apply to Demo Day →
          </a>
        </div>
        <div className="rounded-2xl bg-white p-9 ring-1 ring-black/5">
          <h3 className={`${serif.className} text-4xl`}>Investor?</h3>
          <p className="mt-3 text-black/60">Join the {SKH.short} network and meet founders through warm introductions.</p>
          <a href="#join" className="mt-6 inline-block rounded-md bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700">
            Join the network →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
