import React from 'react';
import Checkpoint from '../../../components/Checkpoint';
import Callout from '../../../components/Callout';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-c-2');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const examples = [
  { vertical: 'Fitness / wellness', logic: 'Class cancellation refund + clawback · off-session no-show fee · class pack split-redemption' },
  { vertical: 'Education', logic: 'Term fee collection · excursion split payment · parent portal off-session charge' },
  { vertical: 'Healthcare / clinics', logic: 'Appointment deposit pre-auth · bulk billing reconciliation · multi-practitioner payout split' },
  { vertical: 'Property / real estate', logic: 'Rental bond hold + release · maintenance levy collection · multi-owner payout' },
  { vertical: 'Retail franchise', logic: 'Royalty % calculation · EOD settlement batch · promotional discount handling' },
];

export default function TrackCTask2() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3: Vertical Logic — Track C
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>3C.2 — Vertical Logic</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Implement the payment patterns that are specific to your vertical — the logic that repeats across every client in this industry and doesn't exist in the Stripe docs as a named pattern.
      </p>

      <Callout type="tip" title="This is your accelerator's IP">
        The core module (Modules 1–2) is the same for everyone. What you build here is what makes your solution specific and reusable. The vertical logic is what clients pay you for — not the Stripe integration itself.
      </Callout>

      <h2 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#0A2540' }}>What to build</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        From your scenario definition, identify the 2–3 payment patterns that are non-trivial and vertical-specific. Build them on top of the core module you completed in Module 2.
      </p>
      <p className="text-sm mb-6" style={{ color: '#425466' }}>
        Common patterns to look for: refund with clawback, pre-auth + delayed capture, off-session charges, dynamic fee calculation, payout holds, split payments to multiple parties.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Examples by vertical</h2>
      <div className="space-y-2 mb-6">
        {examples.map((e, i) => (
          <div key={i} className="rounded-xl border p-4 bg-white flex gap-4" style={{ borderColor: '#E6EBF1' }}>
            <div className="w-32 flex-shrink-0">
              <p className="text-xs font-semibold" style={{ color: '#0A2540' }}>{e.vertical}</p>
            </div>
            <p className="text-xs" style={{ color: '#425466' }}>{e.logic}</p>
          </div>
        ))}
      </div>

      <Callout type="info">
        If you get stuck, look at how Track A (TableOS) handles refund clawback and dynamic fee tiers — the pattern is the same regardless of vertical. Adapt the implementation to your scenario.
      </Callout>

      <Checkpoint
        id="m3c-vertical-logic-built"
        label="I've built 2–3 vertical-specific payment patterns"
        description="What patterns did you build? Are they things that repeat across every client in your vertical, or are they specific to this one client?"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
