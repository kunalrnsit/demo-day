/* ==================================================================
   STARTUP KARNA HAI: ALL SITE CONTENT LIVES IN THIS ONE FILE.
   Change the text, numbers and lists below and every page updates.

   Only real, confirmed numbers go here. Anything left empty ("" or [])
   is hidden on the site automatically, and appears once you fill it in.
   SAMPLE_DATA = true shows a yellow "samples" notice on every page.
================================================================== */

export const SAMPLE_DATA = false;

export const SKH = {
  name: "Startup Karna Hai",
  short: "SKH",
  tagline: "From idea to investment, with the right people beside you.",
  city: "Hyderabad",
  email: "vibhor@investhaglobal.com",
  phone: "+91 80084 35970",
  whatsapp: "918008435970", // country code + number, no spaces or +
  social: {
    instagram: "#", // ← paste full profile links
    linkedin: "#",
    youtube: "#",
  },
};

/* ---------- Headline numbers (home + portfolio) ---------- */
export const STATS = [
  { value: "10+", label: "SKH Sessions" },
  { value: "10+", label: "Geography" },
  { value: "12+", label: "Investment bankers" },
  { value: "500+", label: "IIT alumni" },
];

/* ---------- Programs (cards on home + nav tabs) ---------- */
export const PROGRAMS = [
  {
    key: "demo-day",
    title: "Demo Day",
    href: "/demo-day",
    tag: "Applications open",
    text: "A 3-round pitch competition: 1,000 ideas, 300 deep dives, 30 founders on stage in front of investors.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
  },
  {
    key: "events",
    title: "SKH Events",
    href: "/events",
    tag: "Meetups & sessions",
    text: "Founder meetups, investor office hours and workshops where builders meet the people who can back them.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  },
  {
    key: "founder-caravan",
    title: "Founder Caravan",
    href: "/founder-caravan",
    tag: "On the road",
    text: "SKH travels city to city to find founders beyond the usual metros and bring investors to them.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  },
];

/* ---------- Portfolio ----------
   status: "Invested" = SKH network invested
           "Raising"  = SKH is helping them raise                   */
export type PortfolioCompany = {
  name: string;
  sector: string;
  stage: string;
  status: "Invested" | "Raising";
  oneLiner: string;
  founderAlumni?: string; // e.g. "IIT Delhi"
  website?: string;
};

// Add real startups here, e.g.:
// { name: "Startup name", sector: "Fintech", stage: "Seed", status: "Invested", oneLiner: "What they do, in one line.", founderAlumni: "IIT Delhi", website: "https://..." },
export const PORTFOLIO: PortfolioCompany[] = [];

/* ---------- Network ---------- */
export const NETWORK = {
  investors: "", // number of investors, e.g. "100+" (hidden while empty)
  investmentBankers: "12+",
  startupsHelped: "", // e.g. "100+" (hidden while empty)
  alumni: [
    { school: "IIT", count: "500+", label: "IIT alumni" },
    { school: "IIM", count: "120+", label: "IIM alumni" },
    { school: "ISB", count: "80+", label: "ISB alumni" },
  ],
};

/* ---------- Relationship-based investing ---------- */
export const INVESTING_STEPS = [
  { title: "Know the founder first", text: "We spend time with founders at events, Demo Day and Founder Wheels before any money is discussed." },
  { title: "Warm introductions only", text: "Founders meet investors and bankers through someone who knows them both, not cold emails." },
  { title: "Back people, then plans", text: "Our network invests in founders it trusts, often alongside alumni who know the space." },
  { title: "Stay after the cheque", text: "Mentors and alumni keep helping with hiring, customers and the next round." },
];

/* ---------- Events ---------- */
export type SkhEvent = {
  title: string;
  date: string; // free text, e.g. "Sat, 6 Dec 2026"
  city: string;
  kind: string; // Meetup, Workshop, Office hours...
  status: "upcoming" | "past";
  text: string;
  link?: string; // registration link, if any
};

export const EVENTS: SkhEvent[] = []; // not used: sessions live in lib/sessions.ts

/* ---------- Founder Wheels (shown on the SKH Sessions page) ---------- */
export const CARAVAN = {
  intro:
    "Great founders are not only in Bengaluru, Delhi and Mumbai. Founder Wheels takes SKH on the road to meet founders in their own cities, and brings investors and mentors along.",
  // Upcoming stops, e.g. { city: "Pune", date: "Jan 2027", status: "Next stop" }. Hidden while empty.
  stops: [] as { city: string; date: string; status: string }[],
  whatHappens: [
    "Open pitch sessions for local founders",
    "1:1 office hours with investors and alumni mentors",
    "Shortlisted founders get a fast track to Demo Day",
  ],
};

/* ---------- FAQ (home) ---------- */
export const FAQS = [
  { q: "What is Startup Karna Hai (SKH)?", a: "SKH is a founder community and investment network that helps early-stage founders build, pitch and raise, through Demo Day, SKH Events and Founder Caravan." },
  { q: "Does SKH invest directly?", a: "Investments come from our network of investors and alumni, who invest in founders they have come to know through SKH." },
  { q: "I'm an investor. How do I join the network?", a: "Write to us from the Contact section with a little about yourself and the kind of startups you back." },
  { q: "How do I get started as a founder?", a: "Register for Demo Day, or come to an SKH Event near you." },
];
