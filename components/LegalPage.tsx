import Nav from "@/components/skh/Nav";
import Footer from "@/components/skh/Footer";
import { serif } from "@/lib/fonts";
import { SITE } from "@/lib/site";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1b1b1b] antialiased">
      <Nav active="" />

      <article className="mx-auto max-w-3xl px-5 py-16">
        <h1 className={`${serif.className} text-5xl leading-tight`}>{title}</h1>
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

      <Footer />
    </main>
  );
}
