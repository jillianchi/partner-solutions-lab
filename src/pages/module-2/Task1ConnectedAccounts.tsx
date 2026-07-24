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
        Create connected accounts for your platform's merchants using the v2 Accounts API.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Your Task</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        Open <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>server/routes/accounts.js</code> and implement the <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>POST /accounts</code> endpoint. It should:
      </p>
      <ol className="space-y-1 mb-4 ml-4" style={{ color: '#425466' }}>
        <li className="text-sm">1. Accept <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#F6F9FC' }}>merchant_name</code> and <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#F6F9FC' }}>country</code> in the request body</li>
        <li className="text-sm">2. Call <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#F6F9FC' }}>stripe.v2.core.accounts.create()</code> with your chosen UA config</li>
        <li className="text-sm">3. Store the <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#F6F9FC' }}>account.id</code> in your local database</li>
        <li className="text-sm">4. Return the account ID to the client</li>
      </ol>

      <CodeBlock
        language="javascript"
        filename="server/routes/accounts.js — starter stub"
        code={`router.post('/accounts', async (req, res) => {
  const { merchant_name, country = 'SG' } = req.body;

  // TODO: Create connected account via v2 API
  // const account = await stripe.v2.core.accounts.create({ ... })

  // TODO: Store account.id in your DB
  // await db.merchants.create({ name: merchant_name, stripe_account_id: account.id })

  // TODO: Return the account ID
  res.json({ accountId: '...' });
});`}
      />

      <L300Sequence scenario="account-creation" />

      <Callout type="decision" title="Choose your UA configuration">
        Before implementing, decide which configuration to use: PNP (no merchant dashboard), PEP (Express dashboard), or PNS (Stripe handles liability). Your choice here will drive the <code>stripe_dashboard.type</code> value you pass.
      </Callout>

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Verify Your Work</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        After creating an account, check:
      </p>
      <ol className="space-y-1 mb-4 ml-4" style={{ color: '#425466' }}>
        <li className="text-sm">1. The account appears at Dashboard → Connect → Accounts</li>
        <li className="text-sm">2. Your local DB has a record with the <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#F6F9FC' }}>acct_xxx</code> ID</li>
        <li className="text-sm">3. The UA config matches what you intended (check the account's capabilities)</li>
      </ol>

      <Checkpoint
        id="m2-accounts-created"
        label="Connected accounts created and verified in Dashboard"
        description="At least one connected account created with your chosen UA config."
      />
      <Checkpoint
        id="m2-decisions-documented"
        label="UA configuration decision documented"
        description="Note down which config you chose (PNP/PEP/PNS) and why — you'll reference this in Module 4."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
