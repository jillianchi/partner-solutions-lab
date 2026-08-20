import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'module-review');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const reviewItems = [
  'Stripe Connect enables platforms to route payments between customers, platforms, and connected sub-merchants',
  'Connected accounts are created via stripe.accounts.create({ type: "express" }) — each merchant gets their own acct_xxx',
  "Connect account types (Standard, Express, Custom) determine Dashboard access, onboarding, and who's the merchant of record",
  'Direct charges are the fund-flow model: the connected account charges the customer directly and is the merchant of record; the platform collects an application fee on top',
  'The application_fee_amount parameter captures the platform fee per transaction',
  'Stripe Terminal extends this model to in-person payments — same API, same fund flow, card-present',
  'Webhooks are the source of truth for payment state — never trust client-side redirects for order fulfilment',
];

export default function ModuleReview() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 1: Foundation Concepts
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Module Review</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Before moving to the hands-on module, confirm you're solid on the foundational concepts.
      </p>

      <h2 className="text-xl font-semibold mb-4" style={{ color: '#0A2540' }}>Key Takeaways</h2>
      <div className="space-y-2 mb-8">
        {reviewItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F6F9FC' }}>
            <CheckCircle2 size={16} style={{ color: '#30B130', flexShrink: 0, marginTop: 2 }} />
            <p className="text-sm" style={{ color: '#425466' }}>{item}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Quick Quiz</h2>
      <div className="space-y-4 mb-8">
        {[
          {
            q: 'A customer pays $100 on a direct charge. The platform fee is $2.50. Stripe fees are $2.50. What does the connected account receive?',
            a: '$95.00. With direct charges, the connected account is the merchant of record — Stripe fees are debited from its balance directly, and the application fee is collected on top for the platform.',
          },
          {
            q: 'Your client wants merchants to get their own login to check payouts, without building a merchant-facing dashboard themselves. Which Connect account type?',
            a: 'Express — it ships with the Express Dashboard (a lightweight, Stripe-hosted view of balance and payouts) with no dashboard build effort. Standard gives merchants Stripe\'s full dashboard and their own Stripe relationship; Custom gives none — you build it all.',
          },
          {
            q: 'What is the difference between a connection token and a client secret in Terminal?',
            a: 'The connection token authenticates the reader to your Stripe account. The client secret is specific to a PaymentIntent and authorises the reader to collect payment for that charge.',
          },
        ].map(({ q, a }, i) => (
          <div key={i} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <p className="text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>Q{i + 1}: {q}</p>
            <p className="text-sm px-3 py-2 rounded-lg" style={{ backgroundColor: '#F0FFF4', color: '#166534' }}>
              <strong>A:</strong> {a}
            </p>
          </div>
        ))}
      </div>

      <Callout type="tip" title="Ready for Module 2?">
        Module 2 is the core hands-on module where you'll implement connected account creation, a Checkout Session,
        a Terminal payment, and a webhook handler — all working together.
      </Callout>

      <Checkpoint
        id="m1-review-complete"
        label="Module 1 review complete — ready for the hands-on lab"
        description="Tick this once you're confident on Connect fundamentals, UA configs, destination charges, and Terminal."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
