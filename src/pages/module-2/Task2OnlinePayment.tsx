import React from 'react';
import CodeBlock from '../../components/CodeBlock';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import L200FundFlow from '../../components/diagrams/L200FundFlow';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'task-2');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function Task2OnlinePayment() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 2: Core Module
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Task 2.2: Online Payment</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Implement a Checkout Session with a destination charge and platform fee. This is the core online payment flow for both tracks.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Your Task</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        Open <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>server/routes/checkout.js</code> and implement <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>POST /checkout</code>:
      </p>

      <CodeBlock
        language="javascript"
        filename="server/routes/checkout.js — implement this"
        code={`router.post('/checkout', async (req, res) => {
  const { merchantId, amount, description } = req.body;

  // TODO: Look up the merchant's stripe_account_id from your DB
  // const merchant = await db.merchants.findById(merchantId)

  // TODO: Calculate platform fee (e.g. 2.5% of amount)
  // const platformFee = Math.round(amount * 0.025)

  // TODO: Create Checkout Session with destination charge
  // const session = await stripe.checkout.sessions.create({
  //   mode: 'payment',
  //   line_items: [{ price_data: { ... }, quantity: 1 }],
  //   payment_intent_data: {
  //     application_fee_amount: platformFee,
  //     transfer_data: { destination: merchant.stripe_account_id },
  //   },
  //   success_url: '...',
  //   cancel_url: '...',
  // })

  res.json({ url: session.url });
});`}
      />

      <L200FundFlow track="a" />

      <h2 className="text-xl font-semibold mb-3 mt-2" style={{ color: '#0A2540' }}>Test Cards</h2>
      <div className="rounded-xl border p-4 mb-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <div className="space-y-2">
          {[
            { card: '4242 4242 4242 4242', result: 'Successful payment' },
            { card: '4000 0000 0000 9995', result: 'Insufficient funds (declined)' },
            { card: '4000 0027 6000 3184', result: 'Requires 3D Secure authentication' },
          ].map(({ card, result }) => (
            <div key={card} className="flex items-center gap-4">
              <code className="text-xs px-2 py-1 rounded font-mono" style={{ backgroundColor: '#1A1F36', color: '#E8E8FF', fontFamily: 'monospace' }}>{card}</code>
              <span className="text-sm" style={{ color: '#425466' }}>{result}</span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: '#425466' }}>Use any future expiry date and any 3-digit CVC.</p>
      </div>

      <Callout type="tip" title="Verify the fee split">
        After a successful test payment, check the PaymentIntent in your Dashboard. Under "Timeline" you should see the transfer to the connected account and the platform fee retained in your platform account.
      </Callout>

      <Checkpoint
        id="m2-checkout-session-created"
        label="Checkout Session created and payment completed with test card"
        description="A successful test payment appears in your Stripe Dashboard."
      />
      <Checkpoint
        id="m2-fee-verified"
        label="Platform fee verified in Dashboard"
        description="Confirm the application_fee_amount appears in the PaymentIntent timeline and was retained by the platform account."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
