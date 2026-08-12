import React from 'react';
import Checkpoint from '../../../components/Checkpoint';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-c-1');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const decisionsTemplate = `# DECISIONS.md

## Scenario
[Paste your scenario definition from Define Your Scenario]

## 1. UA Configuration
**Choice:** [PNP / PEP / PNS]
**Why:** [Your reasoning — what about your client's business drove this decision?]
**What changes if sub-merchants demand dashboard access later:** [Your answer]

## 2. Charge model
**Choice:** [Destination charges / Direct charges / SC&T]
**Why:** [Who is the merchant of record? Why?]
**What would break if you needed to split a single payment to multiple sub-merchants:** [Your answer]

## 3. Platform fee structure
**Model:** [Flat fee / Percentage / Tiered]
**Rate:** [e.g. 1.8% standard, 1.2% for high-volume]
**Why this model for this client:** [Your reasoning]

## 4. Payout approach
**Choice:** [Automatic / Manual]
**Cadence:** [Daily / Weekly / On-demand]
**Why:** [Does this client need to hold funds before releasing? Any clawback requirements?]`;

export default function TrackCTask1() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3: Vertical Logic — Track C
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>3C.1 — Platform Structure</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Apply the five Connect decisions to your scenario. This is where your accelerator's architectural IP gets defined.
      </p>

      <Callout type="info">
        You've already built the core module (connected accounts, Checkout, Terminal, webhooks). This task is about making the decisions that are specific to your vertical — and documenting them so they're reusable.
      </Callout>

      <h2 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#0A2540' }}>What to do</h2>
      <div className="space-y-3 mb-6">
        {[
          'Review the five Connect decisions from Module 1 in the context of your scenario',
          'For each decision, write your choice and your reasoning in DECISIONS.md',
          'Be specific about your client — "the platform wants to own the customer relationship" is a real reason; "it seemed right" is not',
          'Note any decisions where you\'re uncertain — those are the SA conversation points',
        ].map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#EEF2FF' }}>
              <span className="text-xs font-bold" style={{ color: '#635BFF' }}>{i + 1}</span>
            </div>
            <p className="text-sm" style={{ color: '#425466' }}>{step}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>DECISIONS.md template</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        Start here. Fill in the blanks for your scenario.
      </p>
      <CodeBlock code={decisionsTemplate} language="markdown" filename="DECISIONS.md" />

      <Callout type="decision" title="This is the SA checkpoint">
        Before moving to Task 2, share your DECISIONS.md with the SA. The conversation about your choices — especially the charge model and UA config — is the most valuable part of this track.
      </Callout>

      <Checkpoint
        id="m3c-platform-defined"
        label="DECISIONS.md sections 1–4 are filled in"
        description="Have you discussed your charge model and UA config choice with the SA? Can you justify each decision in the context of your specific client?"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
