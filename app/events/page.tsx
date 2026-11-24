import Nav from "@/components/skh/Nav";
import Footer from "@/components/skh/Footer";
import { serif } from "@/lib/fonts";
import { SKH } from "@/lib/skh";
import { upcomingEvents, eventDateText, isExternal } from "@/lib/events";

export const metadata = {
  title: `Upcoming Events | ${SKH.name}`,
  description: "Register for upcoming Startup Karna Hai events: SKH Sessions, Demo Day and Founder Wheels.",
};

export default function UpcomingEventsPage() {
  const events = upcomingEvents();
  const whatsapp = `https://wa.me/${SKH.whatsapp}?text=${encodeURIComponent("Hi SKH, please tell me about your next event.")}`;

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <Nav active="events" />

      <section className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Upcoming events</p>
        <h1 className={`${serif.className} mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl`}>
          Be in the room <em className="text-orange-600">where it happens.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
          Register for the next SKH Sessions, Demo Day and Founder Wheels stops. Seats are limited, so register early.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        {events.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-black/5">
            <h2 className={`${serif.className} text-4xl`}>No upcoming events right now.</h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-black/60">
              New dates are announced soon. Message us on WhatsApp and we&apos;ll tell you about the next one.
            </p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-md bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700">
              Get notified on WhatsApp →
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {events.map((e) => (
              <article key={e.slug} className="grid overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 md:grid-cols-[1fr_1.2fr]">
                <div className="relative bg-[#1b1b1b]">
                  {e.image ? (
                    <img src={e.image} alt={e.title} className="aspect-[16/10] h-full w-full object-cover" />
                  ) : (
                    <div className="aspect-[16/10] h-full w-full bg-gradient-to-br from-orange-500 to-orange-700" />
                  )}
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">Upcoming</span>
                    <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{e.type}</span>
                  </div>
                </div>
                <div className="flex flex-col p-7">
                  <p className="text-sm font-semibold text-orange-700">
                    {eventDateText(e)} · {e.city}
                  </p>
                  <h2 className={`${serif.className} mt-2 text-4xl leading-tight`}>{e.title}</h2>
                  <p className="mt-3 leading-7 text-black/65">{e.summary}</p>
                  <dl className="mt-5 grid gap-2 text-sm">
                    {e.time && <div className="flex gap-3"><dt className="w-14 shrink-0 text-black/45">Time</dt><dd className="font-semibold">{e.time}</dd></div>}
                    {e.venue && <div className="flex gap-3"><dt className="w-14 shrink-0 text-black/45">Venue</dt><dd className="font-semibold">{e.venue}</dd></div>}
                    {e.fee && <div className="flex gap-3"><dt className="w-14 shrink-0 text-black/45">Fee</dt><dd className="font-semibold">{e.fee}</dd></div>}
                  </dl>
                  <div className="mt-auto flex flex-wrap gap-3 pt-7">
                    <a
                      href={e.registerLink}
                      {...(isExternal(e.registerLink) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="rounded-md bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
                    >
                      {e.registerLabel || "Register"} →
                    </a>
                    {e.type === "Demo Day" && (
                      <a href="/demo-day" className="rounded-md px-4 py-3 font-semibold text-black/70 hover:text-black">
                        How it works
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#1b1b1b] p-9 text-white md:flex-row md:items-center">
          <div>
            <h2 className={`${serif.className} text-4xl`}>Missed one?</h2>
            <p className="mt-2 text-white/75">See photos, speakers and takeaways from past SKH Sessions.</p>
          </div>
          <a href="/sessions" className="shrink-0 rounded-md bg-orange-600 px-6 py-3.5 font-semibold hover:bg-orange-700">
            Past sessions →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
