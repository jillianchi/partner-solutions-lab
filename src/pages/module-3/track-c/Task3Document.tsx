import React from 'react';
import Checkpoint from '../../../components/Checkpoint';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-c-3');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const acceleratorTemplate = `## 5. Vertical-specific logic

### [Pattern name — e.g. Refund with clawback]
**When it applies:** [Trigger condition]
**Implementation:** [What API calls, in what order]
**Why this approach:** [Alternatives considered and why you rejected them]

### [Pattern name — e.g. Dynamic fee tier]
**When it applies:** [Trigger condition]
**Implementation:** [What API calls, in what order]
**Why this approach:** [Alternatives considered and why you rejected them]

## 6. What changes per client (the 30%)

- [ ] Fee percentage and tier thresholds
- [ ] Payout cadence and hold period
- [ ] UA configuration (PNP / PEP / PNS)
- [ ] Payment methods per market
- [ ] Integration point with client's existing system
- [ ] [Add your own]

## 7. What to call this and who to pitch it to

**Accelerator name:** [e.g. FitPay — embedded payments for fitness platforms]
**Next client I'd pitch this to:** [Specific company or type]
**Why they'd buy it:** [What problem this solves that they can't self-serve]`;

export default function TrackCTask3() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3: Vertical Logic — Track C
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>3C.3 — Document Your Accelerator</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Complete your DECISIONS.md with the vertical-specific patterns you built. This is what you hand to the next client — and what you'd submit for Partner Solutions Program validation.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Finish your DECISIONS.md</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        Add sections 5–7 to what you started in Task 1.
      </p>
      <CodeBlock code={acceleratorTemplate} language="markdown" filename="DECISIONS.md — sections 5–7" />

      <h2 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#0A2540' }}>Name your accelerator</h2>
      <p className="text-sm mb-6" style={{ color: '#425466' }}>
        A named accelerator is something you can quote, demo, and submit. "We built a Connect integration" is not a product. "FitPay — embedded payments for fitness platforms, deployable in 4 weeks" is.
      </p>

      <Callout type="decision" title="The PSP question">
        Could you submit this as a Partner Solutions Program entry? What's missing — a customer delivery, a rate card, reference architecture documentation? Note the gaps here. They're your roadmap from lab to validated solution.
      </Callout>

      <Checkpoint
        id="m3c-decisions-documented"
        label="DECISIONS.md is complete and my accelerator has a name"
        description="If a new client called tomorrow with the same problem, could you send them this document and quote a deployment? If yes — you're done."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
