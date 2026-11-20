/* ==================================================================
   SKH COMMUNITY page content. Edit freely.
   Only real numbers here. The stats strip is hidden while the list is empty.
================================================================== */

export const COMMUNITY = {
  // Link people use to join, e.g. a WhatsApp Community invite link
  // ("https://chat.whatsapp.com/...") or a Google Form. Leave "" to send them to the contact form.
  joinLink: "",

  intro:
    "The SKH Community brings together founders, investors, operators and IIT, IIM and ISB alumni who help each other build, through honest advice, warm introductions and showing up for each other.",

  stats: [
    { value: "10+", label: "SKH Sessions" },
    { value: "10+", label: "Geography" },
    { value: "12+", label: "Investment bankers" },
    { value: "500+", label: "IIT alumni" },
  ],

  who: [
    { title: "Founders", text: "From idea stage to Series A, building across sectors and cities." },
    { title: "Investors", text: "Angels, VC partners and family offices who back early founders." },
    { title: "Mentors & operators", text: "People who've built and scaled companies, and give their time." },
    { title: "Alumni network", text: "IIT, IIM and ISB alumni who open doors in their industries." },
  ],

  benefits: [
    { title: "Private member groups", text: "Ask questions, share wins and get help from people who've been there." },
    { title: "First access to SKH Sessions", text: "Members hear about sessions first and get priority seats." },
    { title: "Warm introductions", text: "Meet investors, mentors and customers through people who know you." },
    { title: "Fast track to Demo Day", text: "Active members get noticed early in the Demo Day selection." },
  ],

  // Photo gallery on the Community page. Files live in public/community.
  // ⚠️ Photos marked "PanIIT" are from PanIIT alumni summits (other organisers' events):
  // confirm with the founder that SKH can show them, or delete those lines.
  gallery: [
    { src: "/community/moment-01.jpg", alt: "Community members at the PanIIT Andhra Pradesh Summit 2026" }, // PanIIT
    { src: "/community/moment-03.jpg", alt: "SKH members over lunch" },
    { src: "/community/moment-05.jpg", alt: "SKH members on a terrace in the evening" },
    { src: "/community/moment-02.jpg", alt: "Community members on stage at the PanIIT Hyderabad summit" }, // PanIIT
    { src: "/community/moment-07.jpg", alt: "SKH members meeting in a hotel lobby" },
    { src: "/community/moment-08.jpg", alt: "SKH members catching up at a café" },
    { src: "/community/moment-06.jpg", alt: "Community members at a summit expo" }, // PanIIT
    { src: "/community/moment-09.jpg", alt: "SKH members at an office visit" },
    { src: "/community/moment-04.jpg", alt: "Community members at the IIT alumni stall" }, // PanIIT
    { src: "/community/moment-10.jpg", alt: "Community members at a summit" }, // PanIIT
  ],

  guidelines: [
    "Give before you ask: help others the way you'd want to be helped.",
    "No spam or cold pitching inside member groups.",
    "What's shared in the community stays in the community.",
  ],
};
