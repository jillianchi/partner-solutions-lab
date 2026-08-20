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
        Implement a Checkout Session as a direct charge on the connected account. The merchant is the merchant of record; the platform collects an application fee on top.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Your Task</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        Open <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>server/routes/payments.js</code> and implement <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>POST /checkout</code>:
      </p>

      <CodeBlock
        language="javascript"
        filename="server/routes/payments.js — implement this"
        code={`router.post('/checkout', async (req, res) => {
  const { merchantId, amount } = req.body;
  const merchant = db.merchants.findById(merchantId);

  // TODO: Create (or reuse) a 9% GST Tax Rate on the connected account
  // A static Tax Rate avoids the address-collection friction automatic_tax would require
  // const gstTaxRateId = await ensureGstTaxRate(merchant)

  // TODO: Calculate the platform fee for this checkout
  // For now use a flat rate — Track A 3A.3 replaces this with a GMV-based tier
  // const monthlyGmv = await getMonthlyGmv(merchant.stripe_account_id)
  // const applicationFeeAmount = calculatePlatformFee(amount, monthlyGmv)

  // TODO: Create a Checkout Session directly on the connected account —
  // pass { stripeAccount: merchant.stripe_account_id } as the second argument.
  // No transfer_data — funds land on the connected account directly.
  // const session = await stripe.checkout.sessions.create({
  //   mode: 'payment',
  //   line_items: [{ price_data: { ... }, quantity: 1, tax_rates: [gstTaxRateId] }],
  //   payment_intent_data: {
  //     application_fee_amount: applicationFeeAmount,
  //   },
  //   success_url: '...',
  //   cancel_url: '...',
  // }, { stripeAccount: merchant.stripe_account_id })

  res.json({ url: session.url });
});`}
      />

      <Callout type="tip" title="GST and fee tiers, detailed elsewhere">
        Two things are introduced here at a basic level: a 9% GST Tax Rate applied per line item (Singapore requires GST on most F&B and hospitality sales), and a GMV-based fee tier via <code>server/lib/fees.js</code> and <code>server/lib/gmv.js</code>. Track A Task 3A.3 walks through the fee tier logic in depth — here, just wire both in.
      </Callout>

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
        After a successful test payment, check the PaymentIntent on the connected account in your Dashboard (Connect → Accounts → [account] → Payments). Under "Timeline" you should see the application fee collected — it lands directly in your platform's balance since there's no transfer step with direct charges.
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
