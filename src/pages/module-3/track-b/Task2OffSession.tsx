import React from 'react';
import CodeBlock from '../../../components/CodeBlock';
import Checkpoint from '../../../components/Checkpoint';
import Callout from '../../../components/Callout';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-b-2');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function TrackBTask2() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3B: Kalapa Hotels
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>3B.2: Off-Session Charge</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        After a guest checks out, the hotel may discover additional charges (minibar, late check-out fee). Implement an off-session charge using the card saved at check-in — no guest interaction required.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>What is an Off-Session Charge?</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        An off-session charge is a PaymentIntent created when the customer is not actively in the session. You use a previously saved <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>PaymentMethod</code> ID and Stripe processes it without a new authentication step (using network tokens and merchant-initiated transaction rules).
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Step 1: Save the Card at Check-In</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        The cleanest approach is to add <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>setup_future_usage: 'off_session'</code> directly to the check-in PaymentIntent from Task 3B.1 — Stripe will save the payment method to the customer automatically after it's confirmed.
      </p>
      <CodeBlock
        language="javascript"
        filename="server/routes/checkin.js (update check-in PaymentIntent)"
        code={`// Add to the check-in PaymentIntent from Task 3B.1
const paymentIntent = await stripe.paymentIntents.create(
  {
    amount: estimatedAmount,
    currency: 'sgd',
    payment_method: paymentMethodId,
    capture_method: 'manual',
    confirm: true,
    setup_future_usage: 'off_session', // <-- saves card for incidentals
    application_fee_amount: Math.round(estimatedAmount * 0.025),
    transfer_data: { destination: hotelAccountId },
  },
  { stripeAccount: hotelAccountId }
);

// Store the payment method ID for later off-session charges
await db.guests.update({ id: guestId }, {
  saved_payment_method_id: paymentMethodId,
});`}
      />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Step 2: Charge Off-Session</h2>
      <CodeBlock
        language="javascript"
        filename="server/routes/off-session.js"
        code={`router.post('/charges/off-session', async (req, res) => {
  const { guestId, amount, description, hotelAccountId } = req.body;
  // const guest = await db.guests.findById(guestId)

  // TODO: Create off-session PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount,
      currency: 'sgd',
      customer: guest.stripe_customer_id,
      payment_method: guest.saved_payment_method_id,
      off_session: true,    // Indicates guest is not present
      confirm: true,        // Confirm immediately
      application_fee_amount: Math.round(amount * 0.025),
      transfer_data: { destination: hotelAccountId },
    },
    { stripeAccount: hotelAccountId } // PI must be created on the connected account
  );

  res.json({ paymentIntentId: paymentIntent.id, status: paymentIntent.status });
});`}
      />

      <Callout type="warning" title="Handle authentication_required errors">
        Some cards require 3D Secure even for off-session charges. If Stripe returns an error with <code>code: 'authentication_required'</code>, you must send a payment link to the guest to complete authentication.
      </Callout>

      <Callout type="tip" title="Test off-session with test card">
        Use test card <code>4000 0027 6000 3184</code> to simulate a card that requires authentication. Use <code>4000 0035 6008 0010</code> to simulate a card that allows off-session charges without re-authentication.
      </Callout>

      <Checkpoint
        id="m3b-offsession-complete"
        label="Off-session charge implemented and tested"
        description="Successfully charged a saved payment method without the guest present. Check the PaymentIntent in Dashboard."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
