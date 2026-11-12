import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata = { title: `Refund & Cancellation Policy | ${SITE.name}` };

export default function RefundPage() {
  return (
    <LegalPage title="Refund & Cancellation Policy">
      <p>
        This policy applies to the {SITE.fee} application fee paid to {SITE.legalName} for {SITE.name}.
      </p>

      <h2>1. Application fee is non-refundable</h2>
      <p>
        The application fee covers the review of your application. Once your application is submitted and
        the payment is successful, the fee is non-refundable, including if your application is not
        shortlisted, if you choose to withdraw, or if the event is rescheduled or cancelled.
      </p>

      <h2>2. Payment errors only</h2>
      <p>The only exceptions are payment errors, where no valid application was created:</p>
      <ul>
        <li>
          <strong>Duplicate payment:</strong> if you were charged more than once for the same application.
        </li>
        <li>
          <strong>Failed application:</strong> if money was deducted but you did not receive an Application
          ID.
        </li>
      </ul>

      <h2>3. How to request a refund</h2>
      <p>
        Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> within 7 days of payment with your name, the
        email used to apply, your Application ID (if you have one) and the payment reference from your
        bank or UPI app.
      </p>

      <h2>4. Refund timeline</h2>
      <p>
        Approved refunds are processed within 5–7 working days to the original payment method. Your bank
        may take a few additional days to show it in your account.
      </p>

      <h2>5. Cancellation</h2>
      <p>
        You can cancel before paying by simply closing the payment window. No amount is charged for
        incomplete payments.
      </p>

      <h2>6. Contact</h2>
      <p>
        For any payment question, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
        {SITE.phone}.
      </p>
    </LegalPage>
  );
}
