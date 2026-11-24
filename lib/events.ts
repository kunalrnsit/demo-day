/* ==================================================================
   UPCOMING EVENTS: edit this list to add or remove events.

   • Every event here shows in the moving banner on the homepage
     and on the "Upcoming Events" tab.
   • Soonest events show first (sorted by `date`, YYYY-MM-DD).
   • When an event is over, delete it from this list (and add it to
     lib/sessions.ts as a past session if you want it in SKH Sessions).
   • If the list is empty, the banner hides and the tab shows
     "No upcoming events right now".
================================================================== */

export type UpcomingEvent = {
  slug: string; // unique, lowercase-with-dashes
  title: string;
  date: string; // YYYY-MM-DD, used for sorting (and shown unless dateLabel is set)
  dateLabel?: string; // optional text instead of the date, e.g. "January 2027"
  time?: string; // e.g. "5:00 PM – 8:00 PM"
  city: string; // or "Online"
  venue?: string;
  type: string; // SKH Session, Demo Day, Founder Wheels, Workshop...
  summary: string; // one or two lines
  image?: string; // "/sessions/photo.jpg" or a full image link
  registerLink: string; // "/register", a Google Form, a Luma/Insider link...
  registerLabel?: string; // button text, default "Register"
  fee?: string; // e.g. "₹499" or "Free"
  banner?: string; // short text for the moving banner (default: title + date)
};

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    slug: "demo-day-2027",
    title: "Demo Day 2027",
    date: "2027-01-01", // ← put the real date
    dateLabel: "2027 · Date to be announced", // ← delete this line once the date is set
    city: "Hyderabad", // ← confirm
    type: "Demo Day",
    summary: "Pitch your startup idea. 1,000+ ideas, 300 deep dives and 30 founders pitching live to investors.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    registerLink: "/register",
    registerLabel: "Register for Demo Day",
    fee: "₹499",
    banner: "Demo Day 2027 registrations are open",
  },
  // Example: the next SKH Session
  // {
  //   slug: "skh-session-2-bengaluru",
  //   title: "SKH Session 2 · Bengaluru",
  //   date: "2026-12-13",
  //   time: "5:00 PM – 8:00 PM",
  //   city: "Bengaluru",
  //   venue: "Venue name, area",
  //   type: "SKH Session",
  //   summary: "Founders meet investors over dinner.",
  //   image: "/sessions/blr-1-1.jpg",
  //   registerLink: "https://forms.gle/...",
  //   fee: "Free",
  // },
];

/* ---------- Helpers (no need to edit) ---------- */

export function upcomingEvents(): UpcomingEvent[] {
  return [...UPCOMING_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
}

export function eventDateText(e: UpcomingEvent): string {
  if (e.dateLabel) return e.dateLabel;
  const [y, m, d] = e.date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  if (Number.isNaN(dt.getTime())) return e.date;
  return dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export function isExternal(href: string): boolean {
  return href.startsWith("http");
}
