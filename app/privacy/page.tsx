import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = { title: `Privacy Policy | ${SITE.name}` };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This Privacy Policy explains what information {SITE.legalName} (&quot;we&quot;, &quot;us&quot;), operator of{" "}
        {SITE.name}, collects when you use {SITE.website}, why we collect it, and the choices you have.
      </p>

      <h2>1. Information we collect</h2>
      <p>We only collect what you give us through the forms on this site, plus basic technical data.</p>
      <ul>
        <li>
          <strong>Demo Day applications:</strong> your name, email, phone number and one-line startup idea. If you
          are shortlisted, also your Round 2 answers about your startup.
        </li>
        <li>
          <strong>Payments:</strong> payment status, amount, and the Razorpay order and payment IDs. Card, UPI and bank
          details are entered directly with Razorpay and are never seen or stored by us.
        </li>
        <li>
          <strong>Contact form:</strong> your name, email, phone number (optional), the reason you are writing, and
          your message.
        </li>
        <li>
          <strong>Investor sign-up:</strong> your name, email, phone number (optional), firm or organisation, investor
          type, typical cheque size, sectors of interest, LinkedIn profile and any note you add.
        </li>
        <li>
          <strong>Visit statistics:</strong> anonymous, aggregated data such as pages viewed, country and device type,
          collected by our hosting provider&apos;s analytics. It does not use cookies and does not identify you.
        </li>
      </ul>

      <h2>2. How we use it</h2>
      <ul>
        <li>To process Demo Day applications and payments, and give you an Application ID.</li>
        <li>To evaluate startups and contact applicants about selection and next rounds.</li>
        <li>To reply to messages sent through the contact form or WhatsApp.</li>
        <li>
          To introduce founders and investors to each other. We share an investor&apos;s or founder&apos;s details with
          the other side only when we make an introduction you would expect from joining the network.
        </li>
        <li>To send you updates about {SITE.name} programs and events. You can ask us to stop at any time.</li>
        <li>To understand how the site is used and improve it, and to meet legal, tax and accounting requirements.</li>
      </ul>

      <h2>3. Who we share it with</h2>
      <ul>
        <li>Razorpay, to process payments.</li>
        <li>Service providers that host the website, database and analytics (Vercel and Supabase).</li>
        <li>Evaluators and judges, who see applicants&apos; names and startup details for selection.</li>
        <li>Investors and founders in the {SITE.name} network, as part of an introduction (see above).</li>
        <li>Authorities, if required by law.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>4. How long we keep it</h2>
      <p>
        We keep application, payment and network records for as long as needed to run our programs and to meet legal
        and accounting requirements. Contact messages are kept for up to two years. After that, data is deleted.
      </p>

      <h2>5. Security</h2>
      <p>
        Data is sent over encrypted (HTTPS) connections and stored in a database that the public cannot read
        directly. Only authorised team members can see it, after signing in. No system is completely secure, but we
        take reasonable steps to protect your information.
      </p>

      <h2>6. Your choices</h2>
      <p>
        You can ask us to see, correct or delete the personal information we hold about you, or to stop sending you
        updates, by emailing <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We will respond within a reasonable
        time. Payment records we must keep by law cannot be deleted before the required period ends.
      </p>

      <h2>7. Changes</h2>
      <p>We may update this policy as the site changes. The latest version is always on this page.</p>

      <h2>8. Contact</h2>
      <p>
        {SITE.legalName}
        <br />
        {SITE.address}
        <br />
        Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalPage>
  );
}
