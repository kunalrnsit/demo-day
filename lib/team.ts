/* ==================================================================
   SKH TEAM: edit this file to change the Team section on the homepage.

   Photos: put each photo in the "public/team" folder (square, at least
   400×400; it is shown as a circle), then set photo to "/team/file-name.jpg".
   Leave photo as "" and the card shows the person's initials instead.
================================================================== */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  alumni?: string; // e.g. "IIT Delhi", "IIM Ahmedabad", "ISB"
  photo: string; // e.g. "/team/rahul.jpg", or "" for initials
  linkedin?: string; // full link, e.g. "https://www.linkedin.com/in/..."
};

export const CORE_TEAM: TeamMember[] = [
  {
    name: "Sanjeev", // ← add surname if he wants it shown
    role: "Founder",
    bio: "Entrepreneur, Mentor, Investor",
    photo: "/team/sanjeev.jpg",
    linkedin: "",
  },
  {
    name: "Vibhor Garg",
    role: "Co-founder",
    bio: "IIT Alumni, Serial entrepreneur, Big\u00a04",
    photo: "/team/vibhor-garg.jpg",
    linkedin: "",
  },
  {
    name: "Akshat Chopra",
    role: "Founding team member",
    bio: "Startup Fundraising | Venture Ecosystem",
    photo: "/team/akshat-chopra.jpg",
    linkedin: "",
  },
  {
    name: "Yuthika Dagar",
    role: "Founding team member", // ← confirm her role
    bio: "", // ← add a one-line description
    photo: "/team/yuthika-dagar.jpg",
    linkedin: "",
  },
];

// Advisors & mentors: the section stays hidden while this list is empty.
// To add one: { name: "Full Name", role: "Angel investor", bio: "", alumni: "ISB", photo: "", linkedin: "" },
export const ADVISORS: TeamMember[] = [];
