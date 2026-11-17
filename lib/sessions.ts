/* ==================================================================
   SKH SESSIONS: edit this file to add or change sessions.

   • Newest sessions show first automatically (sorted by `date`).
   • `date` must be written as YYYY-MM-DD, e.g. "2026-12-06".
   • Photos: put them in "public/sessions" and write "/sessions/file.jpg",
     or paste a full image link. The first photo is the card cover.
   • status: "upcoming" shows an Upcoming badge and a Register button
     (if you add a registerLink). Change it to "past" after the session,
     then fill in the takeaways and outcomes.

   ⚠️ Photos and dates are real. Speakers, stats, takeaways and outcomes
   are empty until the founder sends them (empty parts are hidden).
================================================================== */

export type Speaker = {
  name: string;
  role: string; // e.g. "Partner, XYZ Ventures"
  photo?: string; // "/sessions/speaker.jpg" or "" for initials
  linkedin?: string;
};

export type Session = {
  slug: string; // short web name, lowercase with dashes, unique: "fundraising-101"
  title: string;
  date: string; // YYYY-MM-DD
  dateLabel?: string; // optional text shown instead of the date, e.g. "Date to be confirmed"
  time?: string; // e.g. "5:00 PM – 8:00 PM"
  city: string; // or "Online"
  venue?: string;
  status: "upcoming" | "past";
  format: string; // Panel, Workshop, Fireside chat, Meetup, Office hours...
  summary: string; // one or two lines
  photos: string[]; // first one is the cover
  video?: string; // optional short clip, e.g. "/sessions/clip.mp4"
  speakers: Speaker[];
  stats: { value: string; label: string }[]; // e.g. { value: "120", label: "Attendees" }
  takeaways: string[]; // key lessons from the session
  outcomes: string[]; // what happened because of it: intros, deals, hires...
  registerLink?: string; // for upcoming sessions
};

export const SESSIONS: Session[] = [
  {
    slug: "skh-session-1-bengaluru",
    title: "SKH Session 1 · Bengaluru",
    date: "2026-11-07",
    city: "Bengaluru",
    status: "past",
    format: "Founders' dinner",
    summary: "Our first session in Bengaluru: founders, investors and alumni from the SKH network around one long table.",
    photos: ["/sessions/blr-1-1.jpg", "/sessions/blr-1-2.jpg"],
    video: "/sessions/blr-1-clip.mp4",
    speakers: [], // add: { name: "Full Name", role: "Partner, XYZ Ventures", photo: "" }
    stats: [], // add: { value: "40", label: "Attendees" }
    takeaways: [],
    outcomes: [],
  },
  {
    slug: "skh-session-4-hyderabad",
    title: "SKH Session 4 · Hyderabad",
    date: "2026-10-17",
    city: "Hyderabad",
    status: "past",
    format: "Meetup",
    summary: "The fourth SKH Session in Hyderabad, bringing founders and investors together on the terrace.",
    photos: ["/sessions/hyd-4-1.jpg", "/sessions/hyd-4-2.jpg"],
    speakers: [],
    stats: [],
    takeaways: [],
    outcomes: [],
  },
  {
    slug: "skh-session-3-hyderabad",
    title: "SKH Session 3 · Hyderabad",
    date: "2026-08-22",
    city: "Hyderabad",
    status: "past",
    format: "Meetup",
    summary: "The third SKH Session in Hyderabad: an evening of conversations between founders, investors and alumni.",
    photos: ["/sessions/hyd-3-1.jpg", "/sessions/hyd-3-2.jpg"],
    speakers: [],
    stats: [],
    takeaways: [],
    outcomes: [],
  },
  {
    slug: "skh-session-2-hyderabad",
    title: "SKH Session 2 · Hyderabad",
    date: "2026-06-01", // ⚠️ real date not known yet: replace, then delete the dateLabel line below
    dateLabel: "Date to be confirmed",
    city: "Hyderabad",
    status: "past",
    format: "Meetup",
    summary: "The second SKH Session in Hyderabad, where founders and investors from the network met to share notes.",
    photos: ["/sessions/hyd-2-1.jpg", "/sessions/hyd-2-2.jpg"],
    speakers: [],
    stats: [],
    takeaways: [],
    outcomes: [],
  },
  {
    slug: "skh-session-1-hyderabad",
    title: "SKH Session 1 · Hyderabad",
    date: "2026-04-18",
    city: "Hyderabad",
    status: "past",
    format: "Meetup",
    summary: "Where SKH Sessions began: the first founders-and-investors meetup in Hyderabad.",
    photos: ["/sessions/hyd-1-1.jpg", "/sessions/hyd-1-2.jpg"],
    speakers: [],
    stats: [],
    takeaways: [],
    outcomes: [],
  },
];

/* ---------- Helpers (no need to edit) ---------- */

export function sortedSessions(): Session[] {
  return [...SESSIONS].sort((a, b) => b.date.localeCompare(a.date));
}

export function isUpcoming(s: Session): boolean {
  return s.status === "upcoming";
}

export function sessionDateText(s: Session): string {
  return s.dateLabel || formatSessionDate(s.date);
}

export function formatSessionDate(date: string): string {
  const [y, m, day] = date.split("-").map(Number);
  const d = new Date(Date.UTC(y, (m || 1) - 1, day || 1));
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
