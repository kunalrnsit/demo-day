import { redirect } from "next/navigation";

// "SKH Events" was renamed to "SKH Sessions". Old links still work.
export default function EventsRedirect() {
  redirect("/sessions");
}
