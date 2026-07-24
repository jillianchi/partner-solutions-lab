import React from 'react';
import { Layers } from 'lucide-react';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'overview');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const tasks = [
  { num: '2.1', title: 'Connected Accounts', desc: 'Create connected accounts for your merchants using the v2 Accounts API. Store the account IDs and verify they appear in your Stripe Dashboard.' },
  { num: '2.2', title: 'Online Payment', desc: 'Create a Checkout Session with a destination charge and platform fee. Test the payment with a Stripe test card and verify the fee split.' },
  { num: '2.3', title: 'Terminal Payment', desc: 'Implement a Terminal PaymentIntent. Use the simulator or a physical S710 to complete a card-present payment.' },
  { num: '2.4', title: 'Reconciliation Hook', desc: 'Write a webhook handler that processes payment_intent.succeeded events and marks orders as paid in your database.' },
];

export default function M2Overview() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 2: Core Module
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Module 2: Core Module Overview</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        This is the core build module. You'll implement the four pillars of an embedded payment platform: sub-merchant onboarding, online payments via Checkout, in-person payments via Terminal, and webhook-driven reconciliation.
      </p>

      <div className="space-y-3 mb-8">
        {tasks.map(task => (
          <div key={task.num} className="rounded-xl border p-4 bg-white flex items-start gap-4" style={{ borderColor: '#E6EBF1' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF2FF' }}>
              <span className="text-sm font-bold" style={{ color: '#635BFF' }}>{task.num}</span>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: '#0A2540' }}>{task.title}</p>
              <p className="text-sm" style={{ color: '#425466' }}>{task.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout type="tip" title="Work at your own pace">
        Each task builds on the previous one. Complete them in order. If you get stuck, the solution branch in the starter repo has reference implementations.
      </Callout>

      <Callout type="info" title="Estimated time">
        Module 2 takes approximately 60–90 minutes self-paced. In a facilitated lab, the Stripe team will walk through key steps together.
      </Callout>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
