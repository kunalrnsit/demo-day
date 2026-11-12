import { SITE } from "@/lib/site";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <header className="border-b border-black/5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-600 text-sm font-bold text-white">
              D
            </span>
            <span className="text-lg font-semibold tracking-tight">{SITE.name}</span>
          </a>
          <a
            href="/register"
            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
          >
            Apply
          </a>
        </nav>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-serif text-5xl leading-tight">{title}</h1>
        <p className="mt-3 text-sm text-black/50">Last updated: {SITE.lastUpdated}</p>

        <div
          className="mt-10 space-y-5 leading-7 text-black/75
            [&_a]:text-orange-700 [&_a]:underline
            [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#1b1b1b]
            [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2"
        >
          {children}
        </div>
      </article>

      <footer className="bg-[#1b1b1b] px-5 py-10 text-sm text-white/55">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/refund" className="hover:text-white">Refund Policy</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
