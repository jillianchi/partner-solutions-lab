import React from 'react';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-a-sp2');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function TrackASP2() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 4: Solution Pitch
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Track A: TableOS Pay — Solution Pitch</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Package what you've built as a Stripe SP2 (Solution Partner Program) accelerator. The SP2 pitch demonstrates a deployable, industry-specific Stripe integration that can be reused across multiple customers.
      </p>

      <Callout type="tip" title="What is SP2?">
        Stripe's Solution Partner Program (SP2) rewards partners who build reusable, deployable Stripe integrations for specific industries. Accelerators are pre-built implementations that reduce time-to-value for new customers.
      </Callout>

      <h2 className="text-xl font-semibold mb-4" style={{ color: '#0A2540' }}>Your Solution Pitch Components</h2>
      <div className="space-y-4 mb-8">
        {[
          {
            title: 'Problem Statement',
            desc: 'F&B platforms spend 3–6 months building payment infrastructure. TableOS Pay delivers a production-ready Connect integration in 2 weeks, including POS terminal, online ordering, and automated reconciliation.',
          },
          {
            title: 'Architecture Decisions',
            desc: 'Document your UA config choice (PNP/PEP/PNS) and justify it for the F&B vertical. Explain the manual payout model and why it suits restaurant cash flow patterns.',
          },
          {
            title: 'Technical Differentiators',
            desc: 'Dynamic fee tiers, refund-with-clawback, Terminal + online in one integration. These are not standard Connect capabilities — they require platform-layer logic that this accelerator provides.',
          },
          {
            title: 'Customer Journey',
            desc: 'Walk through the merchant onboarding → first payment → end-of-week payout → refund handling flow. This demonstrates end-to-end coverage.',
          },
        ].map(({ title, desc }) => (
          <div key={title} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <p className="font-semibold mb-1 text-sm" style={{ color: '#0A2540' }}>{title}</p>
            <p className="text-sm" style={{ color: '#425466' }}>{desc}</p>
          </div>
        ))}
      </div>

      <Callout type="warning" title="TODO: Complete this module">
        This module contains the SP2 pitch framework. The Stripe team will walk through the pitch structure during the facilitated session. For self-pacing, prepare a 5-minute pitch covering the four components above, referencing your implementation from Modules 2 and 3A.
      </Callout>

      <Checkpoint
        id="m4a-my-account-created"
        label="Created a test connected account in my own name to demo the onboarding flow"
        description="Walk through the merchant onboarding flow as if you are the prospect's restaurant."
      />
      <Checkpoint
        id="m4a-decisions-documented"
        label="Architecture decisions documented for SP2 pitch"
        description="Noted your UA config choice, payout model, fee tier logic, and any customisations for this vertical."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
