/* ==================================================================
   SKH SESSIONS: edit this file to add or change sessions.

   • Newest sessions show first automatically (sorted by `date`).
   • `date` must be written as YYYY-MM-DD, e.g. "2026-12-06".
   • Photos: put them in "public/sessions" and write "/sessions/file.jpg",
     or paste a full image link. The first photo is the card cover.
   • status: "upcoming" shows an Upcoming badge and a Register button
     (if you add a registerLink). Change it to "past" after the session,
     then fill in the takeaways and outcomes.

   ⚠️ The sessions below are SAMPLES. Replace them with real ones.
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
  time?: string; // e.g. "5:00 PM – 8:00 PM"
  city: string; // or "Online"
  venue?: string;
  status: "upcoming" | "past";
  format: string; // Panel, Workshop, Fireside chat, Meetup, Office hours...
  summary: string; // one or two lines
  photos: string[]; // first one is the cover
  speakers: Speaker[];
  stats: { value: string; label: string }[]; // e.g. { value: "120", label: "Attendees" }
  takeaways: string[]; // key lessons from the session
  outcomes: string[]; // what happened because of it: intros, deals, hires...
  registerLink?: string; // for upcoming sessions
};

export const SESSIONS: Session[] = [
  {
    slug: "sample-investor-office-hours",
    title: "Sample: Investor Office Hours",
    date: "2026-12-20",
    time: "4:00 PM – 7:00 PM",
    city: "Bengaluru",
    venue: "Venue to be announced",
    status: "upcoming",
    format: "Office hours",
    summary: "Replace with a short description: who it's for and what attendees will get.",
    photos: ["https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80"],
    speakers: [
      { name: "Speaker Name", role: "Angel investor", photo: "" },
      { name: "Speaker Name", role: "Partner, VC fund", photo: "" },
    ],
    stats: [
      { value: "40", label: "Seats" },
      { value: "8", label: "Investors" },
    ],
    takeaways: [],
    outcomes: [],
    registerLink: "/#contact",
  },
  {
    slug: "sample-fundraising-101",
    title: "Sample: Fundraising 101 for First-time Founders",
    date: "2026-11-08",
    time: "5:00 PM – 8:00 PM",
    city: "Bengaluru",
    venue: "Sample venue, HSR Layout",
    status: "past",
    format: "Workshop",
    summary: "Replace with a short description of the session.",
    photos: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    ],
    speakers: [
      { name: "Speaker Name", role: "Founder, Sample Startup", photo: "" },
      { name: "Speaker Name", role: "Investment banker", photo: "" },
      { name: "Speaker Name", role: "IIM alumnus, angel investor", photo: "" },
    ],
    stats: [
      { value: "150+", label: "Attendees" },
      { value: "3", label: "Speakers" },
      { value: "12", label: "Investor intros" },
      { value: "4.8/5", label: "Rating" },
    ],
    takeaways: [
      "Replace with a key lesson, e.g. raise when you have proof, not just a plan.",
      "Replace with a key lesson, e.g. know your numbers before the first meeting.",
      "Replace with a key lesson, e.g. warm intros convert far better than cold emails.",
    ],
    outcomes: [
      "Replace with an outcome, e.g. 12 founders introduced to investors.",
      "Replace with an outcome, e.g. 2 startups moved to term-sheet discussions.",
    ],
  },
  {
    slug: "sample-founders-evening",
    title: "Sample: Founders' Evening",
    date: "2026-10-11",
    time: "6:00 PM – 9:00 PM",
    city: "Bengaluru",
    status: "past",
    format: "Meetup",
    summary: "Replace with a short description of the session.",
    photos: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    ],
    speakers: [{ name: "Speaker Name", role: "Founder, Sample Startup", photo: "" }],
    stats: [
      { value: "90", label: "Attendees" },
      { value: "25", label: "Startups" },
      { value: "6", label: "Investors" },
    ],
    takeaways: [
      "Replace with a key lesson from the session.",
      "Replace with a key lesson from the session.",
    ],
    outcomes: ["Replace with an outcome, e.g. 5 founders shortlisted for Demo Day."],
  },
];

/* ---------- Helpers (no need to edit) ---------- */

export function sortedSessions(): Session[] {
  return [...SESSIONS].sort((a, b) => b.date.localeCompare(a.date));
}

export function isUpcoming(s: Session): boolean {
  return s.status === "upcoming";
}

export function formatSessionDate(date: string): string {
  const [y, m, day] = date.split("-").map(Number);
  const d = new Date(Date.UTC(y, (m || 1) - 1, day || 1));
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
