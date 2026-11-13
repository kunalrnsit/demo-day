import { SKH } from "@/lib/skh";
import { WhatsAppIcon } from "@/components/skh/Contact";

// Floating WhatsApp button, bottom-right of every SKH page
export default function WhatsAppButton() {
  const link = `https://wa.me/${SKH.whatsapp}?text=${encodeURIComponent("Hi SKH, I found you on your website and would like to connect.")}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SKH on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-black/20 transition hover:bg-[#1ebe5b] sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden pr-1 text-sm font-semibold sm:group-hover:inline">Chat with us</span>
    </a>
  );
}
