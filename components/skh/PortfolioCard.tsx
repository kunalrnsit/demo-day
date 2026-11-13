import type { PortfolioCompany } from "@/lib/skh";

export default function PortfolioCard({ company }: { company: PortfolioCompany }) {
  const initials = company.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1b1b1b] text-sm font-bold text-white">
          {initials}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            company.status === "Invested" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
          }`}
        >
          {company.status === "Invested" ? "Invested" : "Raising with SKH"}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold">{company.name}</h3>
      <p className="mt-2 leading-6 text-black/60">{company.oneLiner}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-black/60">
        <span className="rounded-md bg-[#faf8f3] px-2 py-1 ring-1 ring-black/5">{company.sector}</span>
        <span className="rounded-md bg-[#faf8f3] px-2 py-1 ring-1 ring-black/5">{company.stage}</span>
        {company.founderAlumni && (
          <span className="rounded-md bg-orange-50 px-2 py-1 text-orange-800 ring-1 ring-orange-200">
            {company.founderAlumni} alumni founder
          </span>
        )}
      </div>
    </>
  );

  const className = "block rounded-2xl bg-white p-6 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg";
  return company.website ? (
    <a href={company.website} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}
