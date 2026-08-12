import React from 'react';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'ncs-scoping');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const questions = [
  {
    n: '01',
    question: 'What types of applications does iConnect power?',
    why: 'Billing portals, e-services, citizen portals, government procurement systems? Determines which Stripe products are relevant (Checkout Sessions vs Elements vs Billing).',
  },
  {
    n: '02',
    question: 'Does SSOE (MOE) have a payments or fee-collection component?',
    why: 'School fees, vendor procurement, parent-facing portals? Likely the pilot entry point — determines scope immediately.',
  },
  {
    n: '03',
    question: 'What triggered this evaluation?',
    why: 'Is there a live project with a payments requirement, or is this exploratory? Helps us prioritise: live project = move fast; exploratory = design for reuse.',
  },
  {
    n: '04',
    question: 'What does "payment/billing module" mean to your team?',
    why: 'One-time checkout, recurring scheduled payments, invoicing, or all three? Shapes the architecture recommendation significantly.',
  },
  {
    n: '05',
    question: 'Who owns the payment stack decision?',
    why: 'NCS architecture team, or the end client (e.g. MOE)? Determines who we need to align with for sign-off.',
  },
  {
    n: '06',
    question: 'Which payment methods matter most?',
    why: 'PayNow is likely essential for SG government; what about cards, BNPL, corporate payment? Informs Stripe product and method configuration.',
  },
];

export default function Scoping() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#E0F2FE', color: '#0570DE' }}>
        NCS: iConnect Workshop
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Aligning on Scope</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Before the architecture, let's confirm what we're building and for whom.
      </p>

      <div className="space-y-3 mb-6">
        {questions.map(({ n, question, why }) => (
          <div key={n} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <div className="flex gap-3 items-start">
              <span className="text-sm font-bold shrink-0" style={{ color: '#0570DE' }}>{n}</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#0A2540' }}>{question}</p>
                <p className="text-xs" style={{ color: '#425466' }}><span className="font-semibold">Why it matters:</span> {why}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="tip" title="How to use this page">
        Work through these questions as a discussion. Answers shape which sections of today's workshop are most relevant.
      </Callout>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
