import { serif } from "@/lib/fonts";
import { formatSessionDate, isUpcoming, type Session, type Speaker } from "@/lib/sessions";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function SpeakerAvatar({ speaker, size = "sm" }: { speaker: Speaker; size?: "sm" | "md" }) {
  const box = size === "md" ? "h-14 w-14 text-base" : "h-9 w-9 text-xs";
  if (speaker.photo) {
    return <img src={speaker.photo} alt={speaker.name} className={`${box} shrink-0 rounded-full bg-black/5 object-cover ring-2 ring-white`} />;
  }
  return (
    <span
      className={`${box} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-700 font-semibold text-white ring-2 ring-white`}
      aria-hidden="true"
    >
      {initials(speaker.name)}
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Grid columns that match the number of stats, so there are no empty boxes
const STAT_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export default function SessionCard({ session, compact = false }: { session: Session; compact?: boolean }) {
  const upcoming = isUpcoming(session);
  const cover = session.photos[0];
  const takeaways = compact ? session.takeaways.slice(0, 2) : session.takeaways.slice(0, 3);
  const outcomes = compact ? session.outcomes.slice(0, 1) : session.outcomes.slice(0, 2);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition hover:shadow-xl">
      {/* Cover */}
      <a href={`/sessions/${session.slug}`} className="relative block overflow-hidden bg-[#1b1b1b]">
        {cover ? (
          <img src={cover} alt={session.title} className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="aspect-[16/9] w-full bg-gradient-to-br from-orange-500 to-orange-700" />
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${upcoming ? "bg-orange-600 text-white" : "bg-white/95 text-[#1b1b1b]"}`}>
            {upcoming ? "Upcoming" : "Past session"}
          </span>
          <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{session.format}</span>
        </div>
        {session.photos.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {session.photos.length} photos
          </span>
        )}
      </a>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-orange-700">
          {formatSessionDate(session.date)} · {session.city}
        </p>
        <h3 className={`${serif.className} mt-2 text-3xl leading-tight`}>
          <a href={`/sessions/${session.slug}`} className="hover:text-orange-700">{session.title}</a>
        </h3>
        <p className="mt-2 leading-7 text-black/60">{session.summary}</p>

        {/* Speakers */}
        {session.speakers.length > 0 && (
          <div className="mt-5 flex items-center gap-3">
            <div className="flex -space-x-2">
              {session.speakers.slice(0, 4).map((sp, i) => (
                <SpeakerAvatar key={`${sp.name}-${i}`} speaker={sp} />
              ))}
            </div>
            <p className="min-w-0 truncate text-sm text-black/60">
              <span className="font-semibold text-[#1b1b1b]">{session.speakers[0].name}</span>
              {session.speakers.length > 1 ? ` + ${session.speakers.length - 1} more` : `, ${session.speakers[0].role}`}
            </p>
          </div>
        )}

        {/* Stats */}
        {session.stats.length > 0 && (
          <div className={`mt-5 grid gap-px overflow-hidden rounded-xl bg-black/10 ring-1 ring-black/10 ${STAT_COLS[Math.min(session.stats.length, 4)]}`}>
            {session.stats.slice(0, 4).map((st) => (
              <div key={st.label} className="bg-[#faf8f3] px-3 py-3 text-center">
                <p className="text-xl font-semibold">{st.value}</p>
                <p className="mt-0.5 text-xs text-black/55">{st.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Takeaways & outcomes */}
        {(takeaways.length > 0 || outcomes.length > 0) && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {takeaways.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-black/45">Key takeaways</p>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-black/70">
                  {takeaways.map((t, i) => (
                    <li key={i} className="flex gap-2"><span className="text-orange-600"><Check /></span>{t}</li>
                  ))}
                </ul>
              </div>
            )}
            {outcomes.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-black/45">Outcomes</p>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-black/70">
                  {outcomes.map((o, i) => (
                    <li key={i} className="flex gap-2"><span className="text-emerald-600"><Check /></span>{o}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <a href={`/sessions/${session.slug}`} className="rounded-md bg-[#1b1b1b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-black">
            View session →
          </a>
          {upcoming && session.registerLink && (
            <a href={session.registerLink} className="rounded-md bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700">
              Register
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
