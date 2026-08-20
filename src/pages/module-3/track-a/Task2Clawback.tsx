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
        When a customer requests a refund, the platform typically wants to give up its application fee too — this is the "clawback."
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>The Problem</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        With a direct charge, the connected account is the merchant of record — the charge and its funds already live on that account, there's no transfer to reverse. The refund itself must be created <em>on the connected account</em>, and you separately decide whether the platform keeps or forgoes its application fee.
      </p>

      <CodeBlock
        language="javascript"
        filename="server/routes/refunds.js"
        code={`router.post('/refunds', async (req, res) => {
  const { paymentIntentId, merchantId, reason = 'requested_by_customer' } = req.body;
  const merchant = db.merchants.findById(merchantId);

  // TODO: Create the refund on the connected account
  // reverse_transfer does NOT apply to direct charges — there is no transfer to reverse
  const refund = await stripe.refunds.create(
    {
      payment_intent: paymentIntentId,
      reason,
      refund_application_fee: true, // platform forgoes its fee on this transaction
    },
    { stripeAccount: merchant.stripe_account_id }
  );

  res.json({
    refundId: refund.id,
    amount: refund.amount,
    status: refund.status,
  });
});`}
      />

      <Callout type="decision" title="refund_application_fee is your only lever here">
        <p className="mb-1">Direct charges don't use <code>transfer_data</code>, so <code>reverse_transfer</code> is irrelevant — omitting it (or setting it) has no effect. The only decision is:</p>
        <ul className="space-y-1">
          <li><strong>refund_application_fee: true</strong> — the platform's fee is returned to the customer as part of the refund (the platform forgoes its fee income on this transaction)</li>
          <li><strong>refund_application_fee: false</strong> (default) — the platform keeps its fee; only the merchant's net proceeds are refunded</li>
        </ul>
        <p className="mt-2">For a full goodwill refund, set it true. For a partial refund where the platform isn't at fault, consider leaving it false.</p>
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
