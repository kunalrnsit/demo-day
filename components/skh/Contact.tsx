import { SKH } from "@/lib/skh";
import { serif } from "@/lib/fonts";

const REASONS = [
  { title: "I'm a founder", text: "Building something? Tell us what and where you are.", subject: "Founder - I'd like to connect with SKH" },
  { title: "I'm an investor", text: "Join the network and meet founders through warm intros.", subject: "Investor - Joining the SKH network" },
  { title: "Partner with SKH", text: "Host an event, sponsor Demo Day or bring the Caravan to your city.", subject: "Partnership with SKH" },
];

export default function Contact() {
  const mail = (subject: string) => `mailto:${SKH.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Contact us</p>
          <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>Let&apos;s talk.</h2>
          <p className="mt-5 text-lg leading-8 text-black/65">
            Founder, investor or partner, write to us and the SKH team will get back within two working days.
          </p>

          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-black/45">Email</dt>
              <dd className="mt-1 text-lg font-medium"><a href={`mailto:${SKH.email}`} className="hover:text-orange-700">{SKH.email}</a></dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-black/45">Phone / WhatsApp</dt>
              <dd className="mt-1 text-lg font-medium">
                <a href={`https://wa.me/${SKH.whatsapp}`} className="hover:text-orange-700">{SKH.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-black/45">Based in</dt>
              <dd className="mt-1 text-lg font-medium">{SKH.city}, India</dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-4">
          {REASONS.map((r) => (
            <a
              key={r.title}
              href={mail(r.subject)}
              className="group flex items-center justify-between gap-6 rounded-2xl bg-[#faf8f3] p-6 ring-1 ring-black/5 transition hover:ring-orange-300"
            >
              <div>
                <p className="text-lg font-semibold">{r.title}</p>
                <p className="mt-1 text-black/60">{r.text}</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-orange-600 ring-1 ring-black/10 transition group-hover:bg-orange-600 group-hover:text-white">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
