import { upcomingEvents, eventDateText, isExternal } from "@/lib/events";

// Moving "register for upcoming events" strip for the homepage.
// Hidden when there are no upcoming events. Pauses on hover; stays still
// for visitors who have "reduce motion" turned on.
export default function EventBanner() {
  const events = upcomingEvents();
  if (events.length === 0) return null;

  const items = events.map((e) => ({
    key: e.slug,
    text: e.banner || `${e.title} · ${eventDateText(e)} · ${e.city}`,
    href: e.registerLink,
    label: e.registerLabel || "Register",
  }));
  // Repeat the items so the strip is always full, then show it twice for a seamless loop
  const row = Array.from({ length: Math.max(1, Math.ceil(4 / items.length)) }, () => items).flat();

  const Row = ({ hidden }: { hidden?: boolean }) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {row.map((it, i) => (
        <a
          key={`${it.key}-${i}`}
          href={it.href}
          tabIndex={hidden ? -1 : undefined}
          {...(isExternal(it.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex items-center gap-3 whitespace-nowrap px-8 py-2.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Upcoming</span>
          <span className="text-white/90">{it.text}</span>
          <span className="font-semibold text-orange-400 group-hover:underline">{it.label} →</span>
        </a>
      ))}
    </div>
  );

  return (
    <div className="skh-marquee overflow-hidden bg-[#1b1b1b] text-sm" role="region" aria-label="Upcoming events">
      <div className="skh-marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
