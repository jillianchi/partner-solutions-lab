import React from 'react';
import { ExternalLink } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import L300Sequence from '../../components/diagrams/L300Sequence';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'destination-charges');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function DestinationCharges() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 1: Foundation Concepts
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Destination Charges</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Destination charges are the primary fund-flow model used in this lab. The platform collects the full payment and Stripe automatically routes a portion to the connected account.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>How Destination Charges Work</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        When you create a Checkout Session or PaymentIntent with a <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>transfer_data.destination</code>, Stripe:
      </p>
      <ol className="space-y-1 mb-4 ml-4" style={{ color: '#425466' }}>
        <li className="text-sm">1. Charges the customer in full (e.g. $100.00)</li>
        <li className="text-sm">2. Deducts Stripe processing fees (e.g. 2.2% + $0.30 = $2.50)</li>
        <li className="text-sm">3. Deducts your platform fee via <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>application_fee_amount</code> (e.g. $2.50)</li>
        <li className="text-sm">4. Transfers the remainder (e.g. $95.00) to the connected account</li>
      </ol>

      <CodeBlock
        language="javascript"
        filename="server/routes/checkout.js"
        code={`const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  payment_method_types: ['card', 'paynow'],
  line_items: [{
    price_data: {
      currency: 'sgd',
      unit_amount: 10000, // $100.00 in cents
      product_data: { name: 'Dinner for 2' },
    },
    quantity: 1,
  }],
  payment_intent_data: {
    application_fee_amount: 250, // $2.50 platform fee
    transfer_data: {
      destination: 'acct_1P...', // connected account ID
    },
  },
  success_url: 'https://yourplatform.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://yourplatform.com/cancel',
});`}
      />

      <L300Sequence scenario="checkout" />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Platform Fee Calculation</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        The <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>application_fee_amount</code> is specified in the smallest currency unit (cents for SGD). This is your platform's revenue per transaction.
      </p>

      <div className="rounded-xl border p-4 mb-4 bg-white overflow-x-auto" style={{ borderColor: '#E6EBF1' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #E6EBF1' }}>
              <th className="text-left pb-2 font-semibold" style={{ color: '#0A2540' }}>Component</th>
              <th className="text-right pb-2 font-semibold" style={{ color: '#0A2540' }}>Amount</th>
              <th className="text-left pb-2 pl-4 font-semibold" style={{ color: '#0A2540' }}>Notes</th>
            </tr>
          </thead>
          <tbody style={{ color: '#425466' }}>
            <tr style={{ borderBottom: '1px solid #E6EBF1' }}>
              <td className="py-2">Customer pays</td>
              <td className="text-right py-2">$100.00</td>
              <td className="py-2 pl-4">Full charge amount</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E6EBF1' }}>
              <td className="py-2">Stripe processing fee</td>
              <td className="text-right py-2 text-red-600">-$2.50</td>
              <td className="py-2 pl-4">Deducted from platform</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E6EBF1' }}>
              <td className="py-2">Platform fee</td>
              <td className="text-right py-2" style={{ color: '#30B130' }}>+$2.50</td>
              <td className="py-2 pl-4">application_fee_amount</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold" style={{ color: '#0A2540' }}>Merchant receives</td>
              <td className="text-right py-2 font-semibold" style={{ color: '#0A2540' }}>$95.00</td>
              <td className="py-2 pl-4">Transferred to acct_xxx</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="Dynamic fee tiers">
        In Module 3A, you'll implement dynamic fee tiers — where high-volume restaurants pay a lower platform fee. This is done by calculating <code>application_fee_amount</code> server-side based on the merchant's tier.
      </Callout>

      <Callout type="info">
        <a href="https://stripe.com/docs/connect/destination-charges" target="_blank" rel="noreferrer" className="flex items-center gap-1" style={{ color: '#1E40AF', textDecoration: 'none' }}>
          <ExternalLink size={12} />
          Destination charges documentation
        </a>
      </Callout>

      <Checkpoint
        id="m1-charge-model-understood"
        label="I understand the destination charge model and fee calculation"
        description="Can you trace the money flow from customer payment to merchant payout, including where fees are deducted?"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
