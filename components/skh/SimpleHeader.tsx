import { Logo } from "@/components/skh/Nav";

// Slim header for focused pages (Demo Day registration, Round 2)
export default function SimpleHeader({ backHref = "/demo-day", backLabel = "Back to Demo Day" }: { backHref?: string; backLabel?: string }) {
  return (
    <header className="border-b border-black/5 bg-[#faf8f3]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Logo />
        <a href={backHref} className="text-sm font-semibold text-black/60 hover:text-black">
          ← {backLabel}
        </a>
      </nav>
    </header>
  );
}
