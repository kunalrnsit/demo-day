/* ==================================================================
   SKH TEAM: edit this file to change the Team section on the homepage.

   Photos: put each photo in the "public/team" folder (square works best,
   at least 400×400), then set photo to "/team/file-name.jpg".
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
    name: "Founder Name",
    role: "Founder",
    bio: "Replace with 1–2 lines: background, what they've built, why they started SKH.",
    alumni: "IIT",
    photo: "",
    linkedin: "",
  },
  {
    name: "Co-founder Name",
    role: "Co-founder",
    bio: "Replace with 1–2 lines about their experience and what they lead at SKH.",
    alumni: "IIM",
    photo: "",
    linkedin: "",
  },
  {
    name: "Team Member",
    role: "Head of Investor Relations",
    bio: "Replace with 1–2 lines about their role and background.",
    photo: "",
    linkedin: "",
  },
  {
    name: "Team Member",
    role: "Community & Events Lead",
    bio: "Replace with 1–2 lines about their role and background.",
    photo: "",
    linkedin: "",
  },
];

export const ADVISORS: TeamMember[] = [
  { name: "Advisor Name", role: "Angel investor", bio: "One line about the advisor.", alumni: "ISB", photo: "", linkedin: "" },
  { name: "Advisor Name", role: "Investment banker", bio: "One line about the advisor.", photo: "", linkedin: "" },
  { name: "Advisor Name", role: "Founder, scaled startup", bio: "One line about the advisor.", alumni: "IIT", photo: "", linkedin: "" },
  { name: "Advisor Name", role: "VC partner", bio: "One line about the advisor.", alumni: "IIM", photo: "", linkedin: "" },
];
