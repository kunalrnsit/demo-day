import { SKH } from "@/lib/skh";

const LINKS = [
  { key: "home", label: "Home", href: "/" },
  { key: "demo-day", label: "Demo Day", href: "/demo-day" },
  { key: "events", label: "SKH Events", href: "/events" },
  { key: "founder-caravan", label: "Founder Caravan", href: "/founder-caravan" },
  { key: "portfolio", label: "Portfolio", href: "/portfolio" },
  { key: "about", label: "About", href: "/#about" },
  { key: "contact", label: "Contact", href: "/#contact" },
];

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-600 text-xs font-black tracking-tight text-white">
        {SKH.short}
      </span>
      <span className="leading-tight">
        <span className="block text-base font-semibold tracking-tight">{SKH.name}</span>
      </span>
    </a>
  );
}

export default function Nav({ active = "home" }: { active?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[#faf8f3]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Logo />

        {/* Desktop tabs */}
        <div className="hidden items-center gap-1 text-sm lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={`rounded-md px-3 py-2 transition ${
                active === l.key ? "bg-black/5 font-semibold text-[#1b1b1b]" : "text-black/65 hover:text-black"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/register"
            className="hidden rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700 sm:inline-block"
          >
            Apply
          </a>

          {/* Mobile menu (works without JavaScript) */}
          <details className="group relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-black/15 px-3 py-2 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 4h12M2 8h12M2 12h12" strokeLinecap="round" />
              </svg>
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-60 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/10">
              {LINKS.map((l) => (
                <a
                  key={l.key}
                  href={l.href}
                  className={`block rounded-lg px-3 py-2.5 text-sm ${
                    active === l.key ? "bg-orange-50 font-semibold text-orange-700" : "text-black/75 hover:bg-black/5"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a href="/register" className="mt-1 block rounded-lg bg-orange-600 px-3 py-2.5 text-center text-sm font-semibold text-white">
                Apply to Demo Day
              </a>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
