import React from 'react';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-b-sp2');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function TrackBSP2() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 4: Solution Pitch
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Track B: Kalapa Connect — Solution Pitch</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Package the Kalapa Hotels implementation as a Stripe SP2 accelerator for the hospitality vertical.
      </p>

      <Callout type="tip" title="What is SP2?">
        Stripe's Solution Partner Program (SP2) rewards partners who build reusable, deployable Stripe integrations for specific industries. Accelerators are pre-built implementations that reduce time-to-value for new customers.
      </Callout>

      <h2 className="text-xl font-semibold mb-4" style={{ color: '#0A2540' }}>Your Solution Pitch Components</h2>
      <div className="space-y-4 mb-8">
        {[
          {
            title: 'Problem Statement',
            desc: 'Hotel groups using legacy PMS systems struggle with card-on-file management, incidental billing, and property-level reconciliation. Kalapa Connect solves all three with a single Stripe integration.',
          },
          {
            title: 'Architecture Decisions',
            desc: 'Document your UA config (PEP gives Express Dashboard to hotel properties — critical for independent hotel chains that want their own financial reporting). Explain why capture_method=manual is fundamental to the pre-auth / folio model.',
          },
          {
            title: 'Technical Differentiators',
            desc: 'Pre-auth with folio capture, off-session charging for incidentals, property-level payout and reconciliation via Express Dashboard. The integration handles the full guest lifecycle from check-in to post-stay charges.',
          },
          {
            title: 'Dispute Handling Demo',
            desc: 'Walk through a guest-disputes-charge scenario. Show how the platform can respond to a dispute using the Stripe Dashboard, and how the Express Dashboard gives hotel staff visibility into the dispute.',
          },
        ].map(({ title, desc }) => (
          <div key={title} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <p className="font-semibold mb-1 text-sm" style={{ color: '#0A2540' }}>{title}</p>
            <p className="text-sm" style={{ color: '#425466' }}>{desc}</p>
          </div>
        ))}
      </div>

      <Callout type="warning" title="TODO: Complete this module">
        This module contains the SP2 pitch framework. For self-pacing, prepare a 5-minute pitch covering the four components above, then simulate a dispute resolution to demonstrate the Express Dashboard value.
      </Callout>

      <Checkpoint
        id="m4b-dispute-resolved"
        label="Simulated a dispute resolution via Dashboard"
        description="Create a test charge with a dispute test card (4000000000000259), then submit evidence in the Dashboard."
      />
      <Checkpoint
        id="m4b-decisions-documented"
        label="Architecture decisions documented for SP2 pitch"
        description="Noted your UA config choice (PEP), pre-auth model, off-session pattern, and Express Dashboard value proposition."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
