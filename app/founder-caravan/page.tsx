import { redirect } from "next/navigation";

// Founder Caravan (now Founder Wheels) lives inside the SKH Sessions page. Old links still work.
export default function FounderCaravanRedirect() {
  redirect("/sessions#founder-wheels");
}
