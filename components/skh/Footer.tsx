import { SKH, SAMPLE_DATA } from "@/lib/skh";
import WhatsAppButton from "@/components/skh/WhatsAppButton";

export function SampleNotice() {
  if (!SAMPLE_DATA) return null;
  return (
    <div className="bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-900">
      Figures, startups and events on this site are samples for now.
    </div>
  );
}

export default function Footer() {
  const groups = [
    {
      title: "Programs",
      links: [
        ["Demo Day", "/demo-day"],
        ["SKH Events", "/events"],
        ["Founder Caravan", "/founder-caravan"],
      ],
    },
    {
      title: "SKH",
      links: [
        ["About", "/#about"],
        ["Team", "/#team"],
        ["Portfolio", "/portfolio"],
        ["Contact", "/#contact"],
      ],
    },
    {
      title: "Legal",
      links: [
        ["Terms", "/terms"],
        ["Privacy", "/privacy"],
        ["Refund Policy", "/refund"],
        ["Contact details", "/contact"],
      ],
    },
  ];

  return (
    <footer className="bg-[#1b1b1b] px-5 pb-10 pt-16 text-sm text-white/60">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-600 text-xs font-black text-white">
              {SKH.short}
            </span>
            <span className="text-base font-semibold text-white">{SKH.name}</span>
          </div>
          <p className="mt-4 max-w-xs leading-6">{SKH.tagline}</p>
          <div className="mt-5 flex gap-4">
            <a href={SKH.social.linkedin} className="hover:text-white">LinkedIn</a>
            <a href={SKH.social.instagram} className="hover:text-white">Instagram</a>
            <a href={SKH.social.youtube} className="hover:text-white">YouTube</a>
          </div>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <p className="font-semibold text-white">{g.title}</p>
            <ul className="mt-4 space-y-2.5">
              {g.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-white">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs">
        © 2026 {SKH.name} ({SKH.short}). All rights reserved.
      </div>
      <WhatsAppButton />
    </footer>
  );
}
