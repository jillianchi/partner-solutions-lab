import React from 'react';
import CodeBlock from '../../../components/CodeBlock';
import Checkpoint from '../../../components/Checkpoint';
import Callout from '../../../components/Callout';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-a-1');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function TrackATask1() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3A: TableOS
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>3A.1: Manual Payout</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        TableOS pays restaurants weekly. Implement a manual payout that moves funds from the connected account's Stripe balance to their external bank account.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>How Manual Payouts Work</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        By default, Stripe automatically pays out connected accounts on a rolling basis. For TableOS, we set <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>payout_schedule.interval = manual</code> on the account and trigger payouts explicitly via the API.
      </p>

      <CodeBlock
        language="javascript"
        filename="server/routes/payouts.js"
        code={`// Called from TableOS admin dashboard — weekly payout run
router.post('/payouts/trigger', async (req, res) => {
  const { merchantId } = req.body;
  // const merchant = await db.merchants.findById(merchantId)

  // TODO: Create a payout on behalf of the connected account
  // Note: use stripe-account header to act on behalf of the connected account
  const payout = await stripe.payouts.create(
    {
      amount: await getAvailableBalance(merchant.stripe_account_id),
      currency: 'sgd',
      statement_descriptor: 'TableOS Weekly',
    },
    {
      stripeAccount: merchant.stripe_account_id,
    }
  );

  res.json({ payoutId: payout.id, amount: payout.amount });
});

// Helper: get available balance for connected account
async function getAvailableBalance(stripeAccountId) {
  const balance = await stripe.balance.retrieve({
    stripeAccount: stripeAccountId,
  });
  const sgdBalance = balance.available.find(b => b.currency === 'sgd');
  return sgdBalance?.amount || 0;
}`}
      />

      <Callout type="warning" title="stripeAccount header is required">
        When creating a payout, you must pass <code>{'{ stripeAccount: accountId }'}</code> as the second argument.
        Without it, Stripe will attempt to pay out your platform account's balance, not the connected account's.
      </Callout>

      <Callout type="tip">
        In the Stripe Dashboard, you can verify the payout by navigating to Connect → Accounts → [your test account] → Payouts.
      </Callout>

      <Checkpoint
        id="m3a-payout-triggered"
        label="Manual payout triggered and verified in Dashboard"
        description="A payout appears in the connected account's payout history with status 'in_transit' or 'paid'."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
