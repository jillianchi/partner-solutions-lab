import React, { useState } from 'react';
import Checkpoint from '../../../components/Checkpoint';
import Callout from '../../../components/Callout';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-c-overview');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const fields = [
  { id: 'platform-name', label: 'Platform name', placeholder: 'e.g. BookingOS, FitPay, CareConnect' },
  { id: 'platform-does', label: 'What does the platform do?', placeholder: 'e.g. A gym management SaaS that manages class bookings, memberships, and staff scheduling for 40+ fitness studios' },
  { id: 'sub-merchants', label: 'Who are the sub-merchants?', placeholder: 'e.g. Individual gym studios — each a separate legal entity with their own bank account' },
  { id: 'payment-surfaces', label: 'What are the payment surfaces?', placeholder: 'e.g. Online class bookings, in-person counter payments (Terminal), off-session membership renewals' },
  { id: 'fee-model', label: 'How does the platform make money from payments?', placeholder: 'e.g. 2% platform fee on every transaction processed through the platform' },
  { id: 'vertical-specific', label: 'What\'s the vertical-specific complexity?', placeholder: 'e.g. Class cancellations require refund + fee clawback; class packs need split-redemption logic' },
];

export default function TrackCOverview() {
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3: Vertical Logic — Track C
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Define Your Scenario</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        This track is for partners who have a real client context to build against. Before writing any code, define the scenario you're solving for — this becomes the foundation of your accelerator.
      </p>

      <Callout type="tip" title="Who this track is for">
        You have an active or recent client with a platform payments problem. You want to build the reference implementation for that vertical, not a worked example. The SA will validate your architectural decisions against your scenario — not a prescribed one.
      </Callout>

      <h2 className="text-xl font-semibold mb-4 mt-6" style={{ color: '#0A2540' }}>Your scenario</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        Fill this in before you start building. Your answers here drive every architectural decision that follows. Be specific — the more concrete this is, the more useful your DECISIONS.md will be.
      </p>

      <div className="space-y-4 mb-6">
        {fields.map(f => (
          <div key={f.id} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <label className="text-sm font-medium block mb-2" style={{ color: '#0A2540' }}>{f.label}</label>
            <textarea
              rows={2}
              placeholder={f.placeholder}
              value={values[f.id] || ''}
              onChange={e => setValues(prev => ({ ...prev, [f.id]: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 text-sm resize-none focus:outline-none focus:border-blue-400"
              style={{ borderColor: '#E6EBF1', color: '#0A2540' }}
            />
          </div>
        ))}
      </div>

      <Callout type="decision" title="Copy this into your DECISIONS.md">
        Your scenario definition is the first entry in your DECISIONS.md. It sets the context for every choice you make in the next two tasks. Update it as you learn more during the build.
      </Callout>

      <Checkpoint
        id="m3c-scenario-defined"
        label="I've defined my scenario"
        description="Can you describe in one sentence what platform you're building for, who the sub-merchants are, and what the payment surfaces are?"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
