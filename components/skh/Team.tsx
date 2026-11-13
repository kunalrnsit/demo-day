import { serif } from "@/lib/fonts";
import { SKH } from "@/lib/skh";
import { CORE_TEAM, ADVISORS, type TeamMember } from "@/lib/team";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function Avatar({ member, size }: { member: TeamMember; size: "lg" | "sm" }) {
  const box = size === "lg" ? "aspect-square w-full rounded-2xl" : "h-14 w-14 rounded-full";
  if (member.photo) {
    return <img src={member.photo} alt={member.name} className={`${box} bg-black/5 object-cover`} />;
  }
  return (
    <div
      className={`${box} flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-700 font-semibold text-white ${
        size === "lg" ? "text-5xl" : "text-lg"
      }`}
      aria-hidden="true"
    >
      <span className={size === "lg" ? serif.className : ""}>{initials(member.name)}</span>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">The team</p>
        <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>The people behind {SKH.short}</h2>
        <p className="mt-5 text-lg leading-8 text-black/65">
          Founders, operators and investors who&apos;ve been where you are, and want to help you get further.
        </p>
      </div>

      {/* Core team */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CORE_TEAM.map((m, i) => (
          <article key={`${m.name}-${i}`} className="group">
            <div className="overflow-hidden rounded-2xl">
              <Avatar member={m} size="lg" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{m.name}</h3>
                <p className="text-sm font-medium text-orange-700">{m.role}</p>
              </div>
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a66c2] text-white transition hover:bg-[#09579f]"
                >
                  <LinkedInIcon />
                </a>
              )}
            </div>
            {m.alumni && (
              <span className="mt-2 inline-block rounded-md bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-800 ring-1 ring-orange-200">
                {m.alumni} alumni
              </span>
            )}
            <p className="mt-2 leading-6 text-black/60">{m.bio}</p>
          </article>
        ))}
      </div>

      {/* Advisors */}
      {ADVISORS.length > 0 && (
        <>
          <h3 className="mt-20 text-2xl font-semibold">Advisors & mentors</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVISORS.map((m, i) => (
              <article key={`${m.name}-${i}`} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
                <Avatar member={m} size="sm" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold">{m.name}</p>
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} className="text-[#0a66c2]">
                        <LinkedInIcon />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-black/55">{m.role}</p>
                  {m.alumni && <p className="mt-1 text-xs font-medium text-orange-700">{m.alumni} alumni</p>}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
