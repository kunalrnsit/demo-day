import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = { title: `Privacy Policy | ${SITE.name}` };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This Privacy Policy explains how {SITE.legalName} (&quot;we&quot;, &quot;us&quot;) collects and
        uses your information when you visit {SITE.website} or apply to {SITE.name}.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>Details you give us: your full name, email address, phone number and one-line startup idea.</li>
        <li>Payment details: payment status, amount and Razorpay order and payment IDs.</li>
        <li>Basic technical information, such as browser type, collected by our hosting provider.</li>
      </ul>
      <p>
        Card, UPI and bank details are entered directly with Razorpay and are never stored by us.
      </p>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To process your application and payment and give you an Application ID.</li>
        <li>To evaluate your startup idea and contact you about selection and next rounds.</li>
        <li>To send you important updates about {SITE.name}.</li>
        <li>To meet legal, tax and accounting requirements.</li>
      </ul>

      <h2>3. Who we share it with</h2>
      <ul>
        <li>Razorpay, to process payments.</li>
        <li>Service providers that host our website and database (Vercel and Supabase).</li>
        <li>Evaluators and judges, who see your name and startup details for selection.</li>
        <li>Authorities, if required by law.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>4. How long we keep it</h2>
      <p>
        We keep application records for as long as needed to run {SITE.name} and to meet legal and
        accounting requirements, after which they are deleted.
      </p>

      <h2>5. Security</h2>
      <p>
        Your data is stored with access controls and sent over encrypted (HTTPS) connections. No system is
        completely secure, but we take reasonable steps to protect your information.
      </p>

      <h2>6. Your choices</h2>
      <p>
        You can ask us to access, correct or delete your personal information by emailing{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We will respond within a reasonable time.
      </p>

      <h2>7. Changes</h2>
      <p>We may update this policy. The latest version will always be on this page.</p>

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
