import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = { title: `Terms & Conditions | ${SITE.name}` };

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>
        These Terms &amp; Conditions govern your use of {SITE.website} and your application to {SITE.name}.
        The website and {SITE.name} are operated by {SITE.legalName} (&quot;we&quot;, &quot;us&quot;,
        &quot;our&quot;). By submitting an application or making a payment, you agree to these terms.
      </p>

      <h2>1. About {SITE.name}</h2>
      <p>
        {SITE.name} is a startup pitch programme. Applicants submit their startup idea, a shortlist is
        selected for further evaluation, and a final group of founders is invited to pitch live to a panel.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old to apply. If you apply on behalf of a team, you confirm that you
        are authorised to do so. You must provide true, accurate and complete information.
      </p>

      <h2>3. Application and fee</h2>
      <ul>
        <li>An application is complete only after the application fee of {SITE.fee} is paid successfully.</li>
        <li>Payments are processed securely by Razorpay. We do not store your card, UPI or bank details.</li>
        <li>On successful payment you receive a unique Application ID. Please keep it for future reference.</li>
        <li>The fee is governed by our <a href="/refund">Refund &amp; Cancellation Policy</a>.</li>
      </ul>

      <h2>4. Selection</h2>
      <p>
        Selection for each round is at our sole discretion and our decisions are final. Paying the
        application fee does not guarantee selection to any further round. We may contact you by email or
        phone about your application.
      </p>

      <h2>5. Your idea and content</h2>
      <p>
        You keep full ownership of your idea and any material you submit. You confirm that you have the
        right to share it. You allow us to review it for selection and, for finalists, to mention your
        startup name and one-line description when promoting {SITE.name}. We will not publish other
        details without your permission. Since ideas are reviewed by evaluators and may be pitched in
        public, we cannot guarantee confidentiality, so please do not share trade secrets.
      </p>

      <h2>6. Conduct</h2>
      <p>
        We may reject or withdraw any application that contains false information, offensive or unlawful
        content, or that infringes anyone else&apos;s rights.
      </p>

      <h2>7. Changes to the event</h2>
      <p>
        We may change the schedule, format, venue or number of selected applicants. The application fee
        remains non-refundable, as described in our <a href="/refund">Refund Policy</a>.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the extent permitted by law, our total liability to you for any claim related to {SITE.name} is
        limited to the application fee you paid.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the
        courts in Bengaluru, Karnataka.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or see our{" "}
        <a href="/contact">Contact page</a>.
      </p>
    </LegalPage>
  );
}
