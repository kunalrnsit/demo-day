/* ==================================================================
   STARTUP KARNA HAI: ALL SITE CONTENT LIVES IN THIS ONE FILE.
   Change the text, numbers and lists below and every page updates.

   ⚠️ The numbers, startups and events below are SAMPLES.
   Replace them with your real data, then set SAMPLE_DATA to false.
   While it is true, the site shows a small "sample figures" notice.
================================================================== */

export const SAMPLE_DATA = true;

export const SKH = {
  name: "Startup Karna Hai",
  short: "SKH",
  tagline: "From idea to investment, with the right people beside you.",
  city: "Bengaluru",
  email: "kunalkumarbgs1262@gmail.com", // ← replace
  phone: "+91 9341517698", // ← replace
  whatsapp: "+91 9341517698", // ← replace: country code + number, no spaces or +
  social: {
    instagram: "#", // ← paste full profile links
    linkedin: "#",
    youtube: "#",
  },
};

/* ---------- Headline numbers (home + portfolio) ---------- */
export const STATS = [
  { value: "25+", label: "Startups supported" },
  { value: "60+", label: "Investors in our network" },
  { value: "12", label: "Investment bankers" },
  { value: "₹40 Cr+", label: "Capital facilitated" },
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

export const PORTFOLIO: PortfolioCompany[] = [
  { name: "Sample Startup 1", sector: "Fintech", stage: "Seed", status: "Invested", oneLiner: "Replace with what the startup does, in one line.", founderAlumni: "IIT" },
  { name: "Sample Startup 2", sector: "D2C", stage: "Pre-seed", status: "Invested", oneLiner: "Replace with what the startup does, in one line.", founderAlumni: "IIM" },
  { name: "Sample Startup 3", sector: "Climate", stage: "Seed", status: "Raising", oneLiner: "Replace with what the startup does, in one line.", founderAlumni: "ISB" },
  { name: "Sample Startup 4", sector: "Edtech", stage: "Pre-seed", status: "Raising", oneLiner: "Replace with what the startup does, in one line." },
  { name: "Sample Startup 5", sector: "SaaS", stage: "Series A", status: "Invested", oneLiner: "Replace with what the startup does, in one line.", founderAlumni: "IIT" },
  { name: "Sample Startup 6", sector: "Healthtech", stage: "Seed", status: "Raising", oneLiner: "Replace with what the startup does, in one line." },
];

/* ---------- Network ---------- */
export const NETWORK = {
  investors: "60+",
  investmentBankers: "12",
  startupsHelped: "25+",
  alumni: [
    { school: "IIT", count: "150+", label: "IIT alumni" },
    { school: "IIM", count: "120+", label: "IIM alumni" },
    { school: "ISB", count: "80+", label: "ISB alumni" },
  ],
};

/* ---------- Relationship-based investing ---------- */
export const INVESTING_STEPS = [
  { title: "Know the founder first", text: "We spend time with founders at events, Demo Day and the Caravan before any money is discussed." },
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

export const EVENTS: SkhEvent[] = [
  { title: "Sample: Founders' Evening", date: "Sat, 6 Dec 2026", city: "Bengaluru", kind: "Meetup", status: "upcoming", text: "Replace with your event description." },
  { title: "Sample: Investor Office Hours", date: "Sat, 20 Dec 2026", city: "Bengaluru", kind: "Office hours", status: "upcoming", text: "Replace with your event description." },
  { title: "Sample: Fundraising 101 Workshop", date: "Sat, 10 Jan 2027", city: "Online", kind: "Workshop", status: "upcoming", text: "Replace with your event description." },
  { title: "Sample: SKH Meetup #1", date: "Oct 2026", city: "Bengaluru", kind: "Meetup", status: "past", text: "Replace with a short recap." },
];

/* ---------- Founder Caravan ---------- */
export const CARAVAN = {
  intro:
    "Great founders are not only in Bengaluru, Delhi and Mumbai. Founder Caravan takes SKH on the road to meet founders in their own cities, and brings investors and mentors along.",
  stops: [
    { city: "Sample City 1", date: "Jan 2027", status: "Next stop" },
    { city: "Sample City 2", date: "Feb 2027", status: "Planned" },
    { city: "Sample City 3", date: "Mar 2027", status: "Planned" },
  ],
  whatHappens: [
    "Open pitch sessions for local founders",
    "1:1 office hours with investors and alumni mentors",
    "Shortlisted founders get a fast track to Demo Day",
  ],
};

/* ---------- FAQ (home) ---------- */
export const FAQS = [
  { q: "What is Startup Karna Hai?", a: "SKH is a founder community and investment network that helps early-stage founders build, pitch and raise, through Demo Day, SKH Events and Founder Caravan." },
  { q: "Does SKH invest directly?", a: "Investments come from our network of investors and alumni, who invest in founders they have come to know through SKH." },
  { q: "I'm an investor. How do I join the network?", a: "Write to us from the Contact section with a little about yourself and the kind of startups you back." },
  { q: "How do I get started as a founder?", a: "Apply to Demo Day, or come to an SKH Event near you." },
];
