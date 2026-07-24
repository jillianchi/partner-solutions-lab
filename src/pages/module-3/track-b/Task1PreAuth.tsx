import React from 'react';
import CodeBlock from '../../../components/CodeBlock';
import Checkpoint from '../../../components/Checkpoint';
import Callout from '../../../components/Callout';
import L300Sequence from '../../../components/diagrams/L300Sequence';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-b-1');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function TrackBTask1() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3B: Kalapa Hotels
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>3B.1: Pre-Auth & Folio Capture</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        At guest check-in, place an authorisation hold on the card. At check-out, capture the actual folio amount. The card is never charged until check-out.
      </p>

      <L300Sequence scenario="preauth" />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Step 1: Check-In — Create the Auth Hold</h2>
      <CodeBlock
        language="javascript"
        filename="server/routes/checkin.js"
        code={`// Called when guest checks in
router.post('/checkin', async (req, res) => {
  const { guestId, hotelAccountId, estimatedAmount, paymentMethodId } = req.body;

  // TODO: Create PaymentIntent with capture_method: 'manual'
  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: estimatedAmount, // e.g. 20000 = $200 SGD
      currency: 'sgd',
      payment_method: paymentMethodId,
      capture_method: 'manual',       // <-- key: auth only, no charge yet
      confirm: true,
      application_fee_amount: Math.round(estimatedAmount * 0.025),
      transfer_data: { destination: hotelAccountId },
      off_session: false,             // guest is present at check-in
    },
    { stripeAccount: hotelAccountId }
  );

  // Store paymentIntent.id — needed for folio capture at check-out
  await db.reservations.update({ guestId }, {
    stripe_payment_intent_id: paymentIntent.id,
    status: 'checked_in',
  });

  res.json({ paymentIntentId: paymentIntent.id, status: paymentIntent.status });
  // Expected: status = 'requires_capture'
});`}
      />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Step 2: Check-Out — Capture the Folio</h2>
      <CodeBlock
        language="javascript"
        filename="server/routes/checkout-folio.js"
        code={`// Called when guest checks out with final folio amount
router.post('/checkout-folio', async (req, res) => {
  const { reservationId, actualAmount } = req.body;
  // const reservation = await db.reservations.findById(reservationId)

  // TODO: Capture the PaymentIntent with actual amount
  // Note: amount_to_capture must be <= the original authorized amount
  const paymentIntent = await stripe.paymentIntents.capture(
    reservation.stripe_payment_intent_id,
    {
      amount_to_capture: actualAmount, // actual folio, e.g. 18300 = $183
    }
  );

  res.json({ status: paymentIntent.status, amount: paymentIntent.amount_received });
  // Expected: status = 'succeeded'
});`}
      />

      <Callout type="warning" title="Authorization window">
        Stripe authorization holds expire after 7 days (or less for some card networks). If the guest's stay exceeds 7 days, you must increment the authorization before it expires.
        Use <code>stripe.paymentIntents.update(id, {'{'} amount: newEstimate, {'}'} )</code> to extend the hold.
      </Callout>

      <Checkpoint
        id="m3b-preauth-complete"
        label="Pre-auth implemented — PaymentIntent in requires_capture state"
        description="Create a test reservation and verify the PaymentIntent status is 'requires_capture' in Dashboard."
      />
      <Checkpoint
        id="m3b-capture-complete"
        label="Folio capture implemented — PaymentIntent in succeeded state"
        description="Capture the folio at checkout. Verify the actual amount charged differs from the auth hold."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
