import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = { title: `Contact Us | ${SITE.name}` };

export default function ContactPage() {
  const items = [
    { label: "Operated by", value: SITE.legalName },
    { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
    { label: "Address", value: SITE.address },
  ];

  return (
    <LegalPage title="Contact Us">
      <p>
        Have a question about your application, payment or {SITE.name}? Get in touch. We usually reply
        within 1–2 working days.
      </p>

      <div className="not-prose mt-8 divide-y divide-black/10 rounded-2xl bg-white ring-1 ring-black/5">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:gap-8">
            <p className="w-32 shrink-0 text-sm font-semibold text-black/50">{item.label}</p>
            {item.href ? (
              <a href={item.href} className="font-medium">
                {item.value}
              </a>
            ) : (
              <p className="font-medium text-[#1b1b1b]">{item.value}</p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-8">
        When writing about an application, please include your Application ID (for example,
        DD-2026-000001) so we can help you faster.
      </p>
    </LegalPage>
  );
}
