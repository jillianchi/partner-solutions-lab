import React from 'react';
import CodeBlock from '../../../components/CodeBlock';
import Checkpoint from '../../../components/Checkpoint';
import Callout from '../../../components/Callout';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-a-3');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function TrackATask3() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3A: TableOS
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>3A.3: Dynamic Fee Tier</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        High-volume restaurants deserve better economics. Implement a tiered fee structure where the platform fee rate decreases as a restaurant's monthly GMV increases.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Fee Tier Structure</h2>
      <div className="rounded-xl border p-4 mb-6 bg-white overflow-x-auto" style={{ borderColor: '#E6EBF1' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #E6EBF1' }}>
              <th className="text-left pb-2 font-semibold" style={{ color: '#0A2540' }}>Tier</th>
              <th className="text-left pb-2 font-semibold" style={{ color: '#0A2540' }}>Monthly GMV</th>
              <th className="text-right pb-2 font-semibold" style={{ color: '#0A2540' }}>Platform Fee Rate</th>
            </tr>
          </thead>
          <tbody style={{ color: '#425466' }}>
            {[
              ['Starter', '< $10,000', '2.5%'],
              ['Growth', '$10,000 – $50,000', '2.0%'],
              ['Pro', '$50,000 – $200,000', '1.5%'],
              ['Enterprise', '> $200,000', '1.0%'],
            ].map(([tier, gmv, rate]) => (
              <tr key={tier} style={{ borderBottom: '1px solid #E6EBF1' }}>
                <td className="py-2 font-medium" style={{ color: '#0A2540' }}>{tier}</td>
                <td className="py-2">{gmv}</td>
                <td className="py-2 text-right font-semibold" style={{ color: '#635BFF' }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock
        language="javascript"
        filename="server/lib/fees.js"
        code={`// Fee tier calculation based on monthly GMV
const FEE_TIERS = [
  { maxGmv: 1_000_000,  rate: 0.025 }, // Starter: < $10k
  { maxGmv: 5_000_000,  rate: 0.020 }, // Growth: $10k–$50k
  { maxGmv: 20_000_000, rate: 0.015 }, // Pro: $50k–$200k
  { maxGmv: Infinity,   rate: 0.010 }, // Enterprise: > $200k
];

export function calculatePlatformFee(amount, monthlyGmvCents) {
  const tier = FEE_TIERS.find(t => monthlyGmvCents < t.maxGmv);
  return Math.round(amount * tier.rate);
}

// In your checkout route:
// const monthlyGmv = await getMonthlyGmv(merchant.stripe_account_id)
// const platformFee = calculatePlatformFee(amount, monthlyGmv)
// Use platformFee as application_fee_amount`}
      />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Calculating Monthly GMV</h2>
      <CodeBlock
        language="javascript"
        filename="server/lib/gmv.js"
        code={`// Query Stripe balance transactions to calculate GMV for the current month
async function getMonthlyGmv(stripeAccountId) {
  const startOfMonth = Math.floor(new Date(new Date().getFullYear(), new Date().getMonth(), 1) / 1000);

  const transactions = await stripe.balanceTransactions.list(
    {
      type: 'payment',
      created: { gte: startOfMonth },
      limit: 100,
    },
    { stripeAccount: stripeAccountId }
  );

  return transactions.data.reduce((sum, tx) => sum + tx.amount, 0);
}`}
      />

      <Callout type="tip" title="Cache the GMV calculation">
        Querying balance transactions on every checkout is expensive. Cache the monthly GMV in your database and refresh it hourly, or use a Stripe-side aggregation if available for your account tier.
      </Callout>

      <Checkpoint
        id="m3a-fee-tier-implemented"
        label="Dynamic fee tier implemented and verified"
        description="Create payments for two different merchants with different GMV levels and confirm different fee rates were applied."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
