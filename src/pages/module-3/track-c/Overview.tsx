import React from 'react';
import Checkpoint from '../../../components/Checkpoint';
import Callout from '../../../components/Callout';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-c-overview');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const sections = [
  {
    number: '1',
    title: 'Problem statement',
    psip: '§ 1.1',
    questions: [
      'What common market problem does this solution solve?',
      'Who experiences this problem — what type of platform, vertical, or customer segment?',
      'Why is this hard to solve without a purpose-built integration?',
    ],
  },
  {
    number: '2',
    title: 'Primary use cases',
    psip: '§ 1.3',
    questions: [
      'What are the 2–3 core payment flows this solution needs to support?',
      'Which Stripe products are required to cover them (Connect, Terminal, Billing, etc.)?',
      'What is explicitly out of scope for this offering?',
    ],
  },
  {
    number: '3',
    title: 'Platform & sub-merchant model',
    psip: '§ 3.2 + § 4.1',
    questions: [
      'Who is the platform — what do they own and operate?',
      'Who are the sub-merchants — are they separate legal entities with their own bank accounts?',
      'Which Connect account type fits: Standard, Express, or Custom? Why?',
      'Who owns KYC/onboarding: the platform or Stripe?',
    ],
  },
  {
    number: '4',
    title: 'Money movement & fee model',
    psip: '§ 4.2',
    questions: [
      'How does money flow from payer → platform → sub-merchant?',
      'Does the platform take a fee? Is it a flat rate, percentage, or tiered?',
      'Are payouts automatic or controlled by the platform?',
      'Are there refunds, clawbacks, or disputes to handle — and who bears the liability?',
    ],
  },
  {
    number: '5',
    title: 'Configuration surface area',
    psip: '§ 3.1 + § 3.2',
    questions: [
      'What is standardized across all users of this solution (the 70–80%)?',
      'What must be configurable per customer (the 20–30%)?',
      'What are the required inputs from a customer before they can go live?',
    ],
  },
  {
    number: '6',
    title: 'Vertical-specific complexity',
    psip: '§ 4.3',
    questions: [
      'What makes this vertical different from a generic platform payments integration?',
      'Are there regulatory, compliance, or sector-specific constraints (HIPAA, DAC7, money transmission)?',
      'What edge cases — cancellations, split redemptions, pre-auths — are specific to this vertical?',
    ],
  },
];

export default function TrackCOverview() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3: Vertical Logic — Track C
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Define Your Scenario</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        This track is for partners who have a real client context to build against. Before writing any code, work through the questions below — they map directly to the Partner Solutions Innovation Plan (PSIP) and will shape every architectural decision you make.
      </p>

      <Callout type="tip" title="How to use this page">
        These are thinking prompts, not a form. Work through them in order with your SA. Your answers become the opening section of your DECISIONS.md and the foundation of your PSIP.
      </Callout>

      <div className="space-y-6 mt-6 mb-6">
        {sections.map(s => (
          <div key={s.number} className="rounded-xl border bg-white p-5" style={{ borderColor: '#E6EBF1' }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
                {s.number}
              </span>
              <h3 className="text-base font-semibold" style={{ color: '#0A2540' }}>{s.title}</h3>
              <span className="text-xs ml-auto" style={{ color: '#8898AA' }}>{s.psip}</span>
            </div>
            <ul className="space-y-2">
              {s.questions.map((q, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: '#425466' }}>
                  <span style={{ color: '#635BFF', flexShrink: 0 }}>→</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Callout type="decision" title="Before moving to Task 1">
        You should be able to answer every question above out loud. Write your answers into DECISIONS.md — this document is the artifact you'll present at the end of the lab.
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
