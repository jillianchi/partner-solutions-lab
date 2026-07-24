import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import Checkpoint from '../components/Checkpoint';
import Callout from '../components/Callout';
import L100Architecture from '../components/diagrams/L100Architecture';
import PageNav from '../components/PageNav';
import { getAllPages } from '../config/navigation';
import { useProgressContext } from '../App';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'complete');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const architectureItems = [
  'Connected accounts created via the v2 Accounts API with a chosen UA configuration',
  'Destination charges used for all payments — platform fee captured via application_fee_amount',
  'Stripe Terminal integrated for card-present payments with the same fund-flow model',
  'Webhook handler as the authoritative payment confirmation signal',
  'Vertical-specific logic: manual payouts + fee tiers (Track A) or pre-auth + off-session (Track B)',
  'SP2 accelerator pitch prepared with architecture decisions documented',
];

export default function WorkshopComplete() {
  const { completedCount, totalCheckpoints, percentComplete } = useProgressContext();

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10 py-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#EEF2FF' }}>
          <Trophy size={32} style={{ color: '#635BFF' }} />
        </div>
        <h1 className="text-4xl font-bold mb-3" style={{ color: '#0A2540' }}>Lab Complete!</h1>
        <p className="text-xl mb-4" style={{ color: '#425466' }}>
          You've built a production-ready Stripe Connect integration for a vertical SaaS platform.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
          {completedCount} / {totalCheckpoints} checkpoints · {percentComplete}% complete
        </div>
      </div>

      {/* Architecture review */}
      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Architecture Review</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        Here's what your platform architecture looks like after completing the lab:
      </p>
      <L100Architecture />

      <h2 className="text-xl font-semibold mb-4 mt-6" style={{ color: '#0A2540' }}>What You Built</h2>
      <div className="space-y-2 mb-8">
        {architectureItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-lg" style={{ backgroundColor: '#F0FFF4' }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#30B130' }}>
              <span className="text-white text-xs font-bold">{i + 1}</span>
            </div>
            <p className="text-sm" style={{ color: '#166534' }}>{item}</p>
          </div>
        ))}
      </div>

      <Callout type="tip" title="Bonus modules available">
        If you have time, the Bonus section covers multi-market expansion and PSP/PSS configurations — advanced scenarios for larger platform deployments.
      </Callout>

      <h2 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#0A2540' }}>Next Steps</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { title: 'Submit your SP2 accelerator', desc: 'Work with your Stripe partner manager to submit the accelerator for SP2 review.' },
          { title: 'Book a technical review', desc: 'Schedule a Stripe Solutions Architecture review of your implementation for production readiness.' },
          { title: 'Explore advanced features', desc: 'Radar for Connect, Stripe Tax, Financial Connections — layer in value-adds for your customers.' },
          { title: 'Run a customer demo', desc: 'Use the starter repo to demo the full flow to a prospect in your next meeting.' },
        ].map(({ title, desc }) => (
          <div key={title} className="rounded-xl border p-4 bg-white flex gap-3" style={{ borderColor: '#E6EBF1' }}>
            <ArrowRight size={16} style={{ color: '#635BFF', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: '#0A2540' }}>{title}</p>
              <p className="text-xs" style={{ color: '#425466' }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Checkpoint
        id="ws-arch-reviewed"
        label="Architecture review complete — I can describe the full system"
        description="Can you draw the architecture from memory and explain each component's role?"
      />
      <Checkpoint
        id="ws-accelerator-named"
        label="My SP2 accelerator has a name and a one-sentence value proposition"
        description="e.g. 'TableOS Pay: a pre-built Stripe Connect integration for F&B platforms that cuts payment integration time from 4 months to 2 weeks.'"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
