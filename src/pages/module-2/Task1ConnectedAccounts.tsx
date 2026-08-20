import React from 'react';
import CodeBlock from '../../components/CodeBlock';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import L300Sequence from '../../components/diagrams/L300Sequence';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'task-1');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function Task1ConnectedAccounts() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 2: Core Module
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Task 2.1: Connected Accounts</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Create Express connected accounts for your platform's merchants, then generate a hosted onboarding link.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Your Task</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        Open <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>server/routes/accounts.js</code> and implement <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>POST /accounts</code> and <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>GET /accounts/:id/onboard</code>. Together they should:
      </p>
      <ol className="space-y-1 mb-4 ml-4" style={{ color: '#425466' }}>
        <li className="text-sm">1. Look up the merchant by ID in your local database</li>
        <li className="text-sm">2. Create an Express connected account with manual payouts</li>
        <li className="text-sm">3. Store the <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#F6F9FC' }}>account.id</code> on the merchant record</li>
        <li className="text-sm">4. Generate a Stripe-hosted onboarding link for that account</li>
      </ol>

      <CodeBlock
        language="javascript"
        filename="server/routes/accounts.js — starter stub"
        code={`router.post('/accounts', async (req, res) => {
  const { merchantId } = req.body;
  const merchant = db.merchants.findById(merchantId);

  // TODO: Create an Express connected account
  // const account = await stripe.accounts.create({
  //   type: 'express',
  //   country: 'SG',
  //   business_profile: { name: merchant.name, product_description: merchant.type },
  //   capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
  //   settings: { payouts: { schedule: { interval: 'manual' } } },
  // });

  // TODO: Store account.id in your DB
  // db.merchants.update(merchantId, { stripe_account_id: account.id });

  // TODO: Return the account ID
  res.json({ accountId: '...' });
});

router.get('/accounts/:id/onboard', async (req, res) => {
  const merchant = db.merchants.findById(req.params.id);

  // TODO: Create an account link for hosted onboarding
  // const accountLink = await stripe.accountLinks.create({
  //   account: merchant.stripe_account_id,
  //   refresh_url: '...',
  //   return_url: '...',
  //   type: 'account_onboarding',
  // });
  res.json({ url: '...' });
});`}
      />

      <L300Sequence scenario="account-creation" />

      <Callout type="decision" title="Why Express?">
        Express accounts ship with Stripe-hosted onboarding and a lightweight Express Dashboard — merchants can log in to see their own balance and payouts without you building anything. See Module 1 for how this compares to Standard and Custom accounts.
      </Callout>

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Verify Your Work</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        After creating an account, check:
      </p>
      <ol className="space-y-1 mb-4 ml-4" style={{ color: '#425466' }}>
        <li className="text-sm">1. The account appears at Dashboard → Connect → Accounts</li>
        <li className="text-sm">2. Your local DB has a record with the <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#F6F9FC' }}>acct_xxx</code> ID</li>
        <li className="text-sm">3. Opening the onboarding link takes you through Stripe-hosted KYC, and <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#F6F9FC' }}>charges_enabled</code>/<code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#F6F9FC' }}>payouts_enabled</code> become true afterward</li>
      </ol>

      <Checkpoint
        id="m2-accounts-created"
        label="Connected accounts created and verified in Dashboard"
        description="At least one connected account created and onboarded via the hosted flow."
      />
      <Checkpoint
        id="m2-decisions-documented"
        label="Account type decision documented"
        description="Note down why Express fits this lab's merchants — you'll reference this in Module 4."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
