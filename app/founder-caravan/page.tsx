import Nav from "@/components/skh/Nav";
import Footer, { SampleNotice } from "@/components/skh/Footer";
import { serif } from "@/lib/fonts";
import { SKH, CARAVAN } from "@/lib/skh";

export const metadata = {
  title: `Founder Caravan | ${SKH.name}`,
  description: "SKH on the road: meeting founders in their own cities and bringing investors along.",
};

const HERO_IMAGE = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80";

export default function FounderCaravanPage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <SampleNotice />
      <Nav active="founder-caravan" />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Founder Caravan</p>
          <h1 className={`${serif.className} mt-4 text-5xl leading-[1.05] sm:text-6xl`}>
            {SKH.short} on the road, <em className="text-orange-600">coming to your city.</em>
          </h1>
          <p className="mt-6 text-lg leading-8 text-black/65">{CARAVAN.intro}</p>
          <a
            href="/#contact"
            className="mt-9 inline-block rounded-md bg-orange-600 px-6 py-3.5 font-semibold text-white hover:bg-orange-700"
          >
            Bring the Caravan to your city →
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl bg-black/10 shadow-xl">
          <img src={HERO_IMAGE} alt="Founders working together" className="aspect-[4/3] w-full object-cover" />
        </div>
      </section>

      {/* Route */}
      <section className="bg-[#1b1b1b] py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className={`${serif.className} text-4xl sm:text-5xl`}>The route</h2>
          <ol className="relative mt-12 grid gap-6 md:grid-cols-3">
            {CARAVAN.stops.map((s, i) => (
              <li key={s.city} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      s.status === "Next stop" ? "bg-orange-500 text-white" : "bg-white/10 text-white/70"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className={`${serif.className} mt-5 text-3xl`}>{s.city}</p>
                <p className="mt-1 text-white/60">{s.date}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What happens */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <h2 className={`${serif.className} text-4xl sm:text-5xl`}>What happens at each stop</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {CARAVAN.whatHappens.map((item, i) => (
            <li key={item} className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <span className="text-sm font-semibold text-orange-600">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-lg font-semibold leading-7">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-24 md:grid-cols-2">
        <div className="rounded-2xl bg-orange-600 p-9 text-white">
          <h3 className={`${serif.className} text-4xl`}>Founder in a Caravan city?</h3>
          <p className="mt-3 text-white/85">Apply to Demo Day now and mention the Caravan stop near you.</p>
          <a href="/demo-day" className="mt-6 inline-block rounded-md bg-[#1b1b1b] px-5 py-3 font-semibold hover:bg-black">
            Apply to Demo Day →
          </a>
        </div>
        <div className="rounded-2xl bg-white p-9 ring-1 ring-black/5">
          <h3 className={`${serif.className} text-4xl`}>Host a stop</h3>
          <p className="mt-3 text-black/60">Colleges, incubators and co-working spaces can host the Caravan.</p>
          <a href="/#contact" className="mt-6 inline-block rounded-md bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700">
            Get in touch →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
