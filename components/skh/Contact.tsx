import { SKH } from "@/lib/skh";
import { serif } from "@/lib/fonts";
import ContactForm from "@/components/skh/ContactForm";

export default function Contact() {
  const whatsappLink = `https://wa.me/${SKH.whatsapp}?text=${encodeURIComponent("Hi SKH, I found you on your website and would like to connect.")}`;

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Contact us</p>
          <h2 className={`${serif.className} mt-4 text-4xl leading-tight sm:text-5xl`}>Let&apos;s talk.</h2>
          <p className="mt-5 text-lg leading-8 text-black/65">
            Founder, investor or partner, send us a message and the {SKH.short} team will get back within two working
            days.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:bg-[#1ebe5b]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat on WhatsApp
          </a>

          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-black/45">Email</dt>
              <dd className="mt-1 text-lg font-medium"><a href={`mailto:${SKH.email}`} className="hover:text-orange-700">{SKH.email}</a></dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-black/45">Phone</dt>
              <dd className="mt-1 text-lg font-medium"><a href={`tel:${SKH.phone.replace(/\s/g, "")}`} className="hover:text-orange-700">{SKH.phone}</a></dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-black/45">Based in</dt>
              <dd className="mt-1 text-lg font-medium">{SKH.city}, India</dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.73 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.18 8.18 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}
