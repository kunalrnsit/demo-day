import Nav from "@/components/skh/Nav";
import Footer from "@/components/skh/Footer";
import { serif } from "@/lib/fonts";

export const metadata = {
  title: "Page not found | Startup Karna Hai",
};

const LINKS = [
  { title: "Home", text: "Start from the beginning", href: "/" },
  { title: "Demo Day", text: "Apply and pitch your startup", href: "/demo-day" },
  { title: "Portfolio", text: "Startups we back", href: "/portfolio" },
  { title: "Contact", text: "Talk to the SKH team", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <Nav active="" />

      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Error 404</p>
        <h1 className={`${serif.className} mt-4 text-5xl leading-tight sm:text-6xl`}>
          This page took a <em className="text-orange-600">pivot.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-black/60">
          We couldn&apos;t find what you were looking for. It may have moved, or the link may be wrong.
        </p>

        <div className="mt-12 grid gap-3 text-left sm:grid-cols-2">
          {LINKS.map((l) => (
            <a
              key={l.title}
              href={l.href}
              className="group flex items-center justify-between rounded-xl bg-white p-5 ring-1 ring-black/5 transition hover:ring-orange-300"
            >
              <div>
                <p className="font-semibold">{l.title}</p>
                <p className="text-sm text-black/55">{l.text}</p>
              </div>
              <span className="text-orange-600 transition group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
