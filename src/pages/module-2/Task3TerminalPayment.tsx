import React from 'react';
import CodeBlock from '../../components/CodeBlock';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import L300Sequence from '../../components/diagrams/L300Sequence';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'task-3');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function Task3TerminalPayment() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 2: Core Module
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Task 2.3: Terminal Payment</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Implement a card-present payment using Stripe Terminal — <strong>server-driven</strong>, no client SDK. The restaurant's existing POS or a hotel's front-desk system calls these routes directly; the S710 reader is driven entirely via the API.
      </p>

      <L300Sequence scenario="terminal" />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Step 1: Register a Reader</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        Readers must belong to a Terminal Location. Create one for the merchant, then register the physical (or simulated) S710 to it using the registration code shown on the device.
      </p>
      <CodeBlock
        language="javascript"
        filename="server/routes/terminal.js"
        code={`// One-time setup per merchant
router.post('/terminal/readers/register', async (req, res) => {
  const merchant = db.merchants.findById(req.body.merchantId);
  const { registrationCode, label } = req.body;

  // TODO: Create a Terminal Location for the merchant (reuse if one already exists)
  // const location = await stripe.terminal.locations.create({
  //   display_name: merchant.name,
  //   address: { line1: '1 Raffles Place', city: 'Singapore', postal_code: '048616', country: 'SG' },
  // }, { stripeAccount: merchant.stripe_account_id });

  // TODO: Register the reader to that location
  // const reader = await stripe.terminal.readers.create({
  //   registration_code: registrationCode,
  //   location: location.id,
  //   label,
  // }, { stripeAccount: merchant.stripe_account_id });

  res.json({ readerId: '...', status: '...' });
});`}
      />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Step 2: Create the PaymentIntent</h2>
      <CodeBlock
        language="javascript"
        filename="server/routes/terminal.js"
        code={`router.post('/terminal/payment-intent', async (req, res) => {
  const merchant = db.merchants.findById(req.body.merchantId);
  const { amount } = req.body;

  // TODO: Create a direct-charge PaymentIntent for card_present
  // const monthlyGmv = await getMonthlyGmv(merchant.stripe_account_id);
  // const applicationFeeAmount = calculatePlatformFee(amount, monthlyGmv);
  //
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount,
  //   currency: 'sgd',
  //   payment_method_types: ['card_present'],
  //   capture_method: 'automatic',
  //   application_fee_amount: applicationFeeAmount,
  // }, { stripeAccount: merchant.stripe_account_id });

  res.json({ paymentIntentId: '...' });
});`}
      />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Step 3: Push the Payment to the Reader</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        This is the step that replaces the client SDK — the reader is told to start collecting a card entirely from the server side.
      </p>
      <CodeBlock
        language="javascript"
        filename="server/routes/terminal.js"
        code={`router.post('/terminal/process', async (req, res) => {
  const merchant = db.merchants.findById(req.body.merchantId);
  const { readerId, paymentIntentId } = req.body;

  // TODO: Push the PaymentIntent to the reader — the guest taps/inserts their card
  // const reader = await stripe.terminal.readers.processPaymentIntent(
  //   readerId,
  //   { payment_intent: paymentIntentId },
  //   { stripeAccount: merchant.stripe_account_id }
  // );

  res.json({ readerId: '...', action: '...' });
});`}
      />

      <Callout type="info" title="GST on Terminal is computed manually">
        PaymentIntents don't support <code>tax_rates</code> the way Checkout Sessions do — there's no line-item structure. If your vertical needs GST or a service charge on card-present payments, calculate it yourself before creating the PaymentIntent and pass the final total as <code>amount</code>.
      </Callout>

      <Callout type="tip" title="No physical reader? Simulate the card tap">
        In test mode, call <code>stripe.testHelpers.terminal.readers.presentPaymentMethod()</code> against a simulated reader to trigger the "card tap" without hardware. See <code>server/routes/terminal.js</code>'s <code>/terminal/simulate-card</code> endpoint (already implemented) — use it after Step 3 to complete the payment, then poll the PaymentIntent status.
      </Callout>

      <Checkpoint
        id="m2-terminal-payment-complete"
        label="Terminal payment completed (simulator or physical reader)"
        description="A card_present PaymentIntent appears as succeeded in the connected account's Dashboard."
      />
      <Checkpoint
        id="m2-split-verified"
        label="Fund split verified — platform fee collected on the connected account"
        description="Check the PaymentIntent in Dashboard and confirm the application_fee_amount was collected by the platform."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
