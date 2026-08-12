import React from 'react';
import CodeBlock from '../../../components/CodeBlock';
import Checkpoint from '../../../components/Checkpoint';
import Callout from '../../../components/Callout';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-a-2');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function TrackATask2() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3A: TableOS
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>3A.2: Refund with Clawback</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        When a customer requests a refund, the platform must reverse the customer charge <em>and</em> reclaim the platform fee from the connected account. This is called a "clawback" or "reverse transfer."
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>The Problem</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        When you refund a destination charge, Stripe refunds the customer from the platform account's balance. But the connected account already received the net funds. To make the platform whole, you must reverse the transfer to the connected account simultaneously.
      </p>

      <CodeBlock
        language="javascript"
        filename="server/routes/refunds.js"
        code={`router.post('/refunds', async (req, res) => {
  const { paymentIntentId, reason = 'requested_by_customer' } = req.body;

  // TODO: Create the refund with reverse_transfer=true
  // This refunds the customer AND reverses the transfer to the connected account
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    reason,
    reverse_transfer: true,     // Reverses the transfer to connected account
    refund_application_fee: true, // Reclaims the platform fee
  });

  res.json({
    refundId: refund.id,
    amount: refund.amount,
    status: refund.status,
  });
});`}
      />

      <Callout type="decision" title="reverse_transfer vs refund_application_fee">
        <p className="mb-1">Two parameters control what gets clawed back:</p>
        <ul className="space-y-1">
          <li><strong>reverse_transfer: true</strong> — reverses the funds transferred to the connected account (they pay back the net amount)</li>
          <li><strong>refund_application_fee: true</strong> — the platform fee is returned to the customer as part of the refund (the platform forgoes its fee income on this transaction)</li>
        </ul>
        <p className="mt-2">For a full refund where the platform absorbs no cost, use both. For a partial platform goodwill refund, omit <code>refund_application_fee</code>.</p>
      </Callout>

      <Checkpoint
        id="m3a-clawback-complete"
        label="Refund with clawback implemented and tested"
        description="Create a test payment, then refund it. Verify the connected account balance was reversed in Dashboard."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
