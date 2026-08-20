import React from 'react';
import { ExternalLink } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import L300Sequence from '../../components/diagrams/L300Sequence';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'connected-accounts');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function ConnectedAccounts() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 1: Foundation Concepts
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Connected Accounts</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Each merchant on your platform gets their own Stripe connected account. Here's how they're created and what they represent.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Creating a Connected Account</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        In this lab, accounts are created as <strong>Express accounts</strong> — they come with a lightweight, Stripe-hosted dashboard and Stripe-hosted onboarding out of the box.
      </p>

      <CodeBlock
        language="javascript"
        filename="server/routes/accounts.js"
        code={`const account = await stripe.accounts.create({
  type: 'express',
  country: 'SG',
  business_profile: {
    name: 'The Golden Fork Restaurant',
    product_description: 'restaurant',
  },
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  settings: {
    payouts: {
      schedule: { interval: 'manual' }, // platform controls payout timing
    },
  },
});

console.log(account.id); // acct_1P...`}
      />

      <h2 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#0A2540' }}>Account Creation Sequence</h2>
      <L300Sequence scenario="account-creation" />

      <h2 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#0A2540' }}>Onboarding Your Merchants</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        After creating the account, you redirect the merchant through Stripe's hosted onboarding to collect their KYC details. Express accounts use an account link — Stripe hosts the entire flow, so you never touch sensitive KYC data directly.
      </p>

      <CodeBlock
        language="javascript"
        filename="server/routes/onboarding.js"
        code={`// Create an onboarding link for the merchant
const accountLink = await stripe.accountLinks.create({
  account: 'acct_1P...',
  refresh_url: 'https://yourplatform.com/onboarding/refresh',
  return_url: 'https://yourplatform.com/onboarding/complete',
  type: 'account_onboarding',
});

// Redirect merchant to accountLink.url`}
      />

      <Callout type="tip" title="Save the account ID">
        Store <code>account.id</code> in your database alongside the merchant record. You'll need it for every subsequent API call involving that merchant.
      </Callout>

      <Callout type="info">
        <a href="https://stripe.com/docs/connect/accounts" target="_blank" rel="noreferrer" className="flex items-center gap-1" style={{ color: '#1E40AF', textDecoration: 'none' }}>
          <ExternalLink size={12} />
          Connected Accounts documentation
        </a>
      </Callout>

      <Checkpoint
        id="m1-accounts-understood"
        label="I understand how connected accounts are created and stored"
        description="Can you describe the account creation API call and what data you need to persist?"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
