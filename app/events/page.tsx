import Nav from "@/components/skh/Nav";
import Footer, { SampleNotice } from "@/components/skh/Footer";
import { serif } from "@/lib/fonts";
import { SKH, EVENTS } from "@/lib/skh";

export const metadata = {
  title: `SKH Events | ${SKH.name}`,
  description: "Founder meetups, investor office hours and workshops by Startup Karna Hai.",
};

const HERO_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80";

export default function EventsPage() {
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const past = EVENTS.filter((e) => e.status === "past");

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <SampleNotice />
      <Nav active="events" />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">SKH Events</p>
          <h1 className={`${serif.className} mt-4 text-5xl leading-[1.05] sm:text-6xl`}>
            Where founders meet the people who back them.
          </h1>
          <p className="mt-6 text-lg leading-8 text-black/65">
            Meetups, investor office hours and hands-on workshops, in {SKH.city} and online. Come to one, and you&apos;re
            part of the {SKH.short} community.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl bg-black/10 shadow-xl">
          <img src={HERO_IMAGE} alt="Audience at an SKH event" className="aspect-[4/3] w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-2xl font-semibold">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-black/55">New events are announced soon. Follow us to hear first.</p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <article key={e.title} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-black/5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">{e.kind}</span>
                  <span className="text-sm text-black/50">{e.city}</span>
                </div>
                <p className="mt-5 font-semibold text-orange-700">{e.date}</p>
                <h3 className="mt-1 text-xl font-semibold">{e.title}</h3>
                <p className="mt-2 flex-1 leading-7 text-black/60">{e.text}</p>
                <a
                  href={e.link ?? "/#contact"}
                  className="mt-6 rounded-md bg-[#1b1b1b] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-black"
                >
                  {e.link ? "Register" : "Get notified"}
                </a>
              </article>
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="border-t border-black/10 bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-2xl font-semibold">Past events</h2>
            <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
              {past.map((e) => (
                <div key={e.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:gap-8">
                  <p className="w-36 shrink-0 text-sm text-black/50">{e.date}</p>
                  <p className="flex-1 font-semibold">{e.title}</p>
                  <p className="text-sm text-black/55">{e.kind} · {e.city}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-orange-600 px-5 py-20 text-center text-white">
        <h2 className={`${serif.className} mx-auto max-w-2xl text-4xl sm:text-5xl`}>Want to host or partner on an event?</h2>
        <a href="/#contact" className="mt-8 inline-block rounded-md bg-[#1b1b1b] px-6 py-3.5 font-semibold hover:bg-black">
          Talk to us →
        </a>
      </section>

      <Footer />
    </main>
  );
}
