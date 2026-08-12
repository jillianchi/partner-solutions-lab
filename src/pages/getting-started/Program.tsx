import React from 'react';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'program');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const benefits = [
  {
    title: 'Internal visibility',
    description: "Validated solutions are featured in Stripe's discovery channels and surfaced directly to Stripe's global sales teams.",
  },
  {
    title: 'Co-selling support',
    description: 'Eligible partners access data-driven account mapping and repeatable co-sell plays orchestrated by dedicated Partner Sales Managers.',
  },
  {
    title: 'External visibility',
    description: 'Placement in the Stripe partner solutions directory to build trust and differentiation with enterprise prospects.',
  },
  {
    title: 'Pilot funding',
    description: 'Potential access to innovation funding for building out reference implementations for pilot customers with strong ROI potential.',
  },
];

const requirements = [
  { label: 'The 70/30 rule', detail: 'At least 70% of the solution must be a fixed, prebuilt technical foundation. 30% is reserved for customer-specific configuration.' },
  { label: 'Proven delivery', detail: 'Validated through at least one active, successful enterprise customer delivery or active pilot.' },
  { label: 'Commercial readiness', detail: 'A full go-to-market package including transparent rate cards and concise value propositions.' },
  { label: 'Technical rigour', detail: 'Reference architectures, Postman Collections, and operational runbooks governed by the Partner Solution Innovation Plan.' },
];

export default function Program() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Getting Started
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Stripe Partner Solutions Program</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        This lab is the starting point for building a validated Stripe partner solution — a reusable embedded payments platform you can deploy for multiple clients and list in Stripe's partner directory.
      </p>

      {/* What the program is */}
      <div className="rounded-xl border p-6 mb-6 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <h2 className="text-base font-semibold mb-3" style={{ color: '#0A2540' }}>What is the Partner Solutions Program?</h2>
        <p className="text-sm mb-4" style={{ color: '#425466' }}>
          The Stripe Partner Solutions Program equips services partners with verified, high-performance assets. By shifting focus from one-off consulting engagements to scalable, productized architectures, the program helps partners transform technical capabilities into marketable commercial assets — accelerating time-to-value for enterprise customers.
        </p>
        <p className="text-sm" style={{ color: '#425466' }}>
          Validated solutions are awarded the <strong style={{ color: '#0A2540' }}>Stripe Solutions Validated</strong> designation and listed publicly in the Stripe partner solutions directory.
        </p>
        <a
          href="https://stripe.partners/solutions"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium"
          style={{ color: '#635BFF', textDecoration: 'none' }}
        >
          <ExternalLink size={13} />
          Browse validated solutions at stripe.partners/solutions
        </a>
      </div>

      {/* Solution models */}
      <h2 className="text-base font-semibold mb-3" style={{ color: '#0A2540' }}>Solution models</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        By aligning with these solution models, you signal to the market that you deliver proven, accelerated outcomes — avoiding custom builds from scratch on every engagement.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border-2 p-5 bg-white" style={{ borderColor: '#635BFF' }}>
          <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mb-3" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
            Solution
          </div>
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>For specific verticals and use cases</h3>
          <p className="text-xs leading-relaxed" style={{ color: '#425466' }}>
            End-to-end, industry-focused implementations that bundle multiple Stripe products to automate complex workflows. Built for a defined vertical — payments, onboarding, reconciliation, and payout logic included.
          </p>
        </div>
        <div className="rounded-xl border-2 p-5 bg-white" style={{ borderColor: '#635BFF' }}>
          <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mb-3" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
            Accelerator
          </div>
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>For horizontal or cross-industry use cases</h3>
          <p className="text-xs leading-relaxed" style={{ color: '#425466' }}>
            Reusable capabilities and reference architectures designed to speed adoption across multiple clients. The 70% prebuilt foundation deploys repeatedly — the 30% configures per client.
          </p>
        </div>
      </div>

      {/* Certifications note */}
      <div className="rounded-lg border px-4 py-3 mb-6 flex items-center gap-3" style={{ borderColor: '#E6EBF1', backgroundColor: '#F6F9FC' }}>
        <ExternalLink size={14} style={{ color: '#635BFF', flexShrink: 0 }} />
        <p className="text-xs" style={{ color: '#425466' }}>
          <strong style={{ color: '#0A2540' }}>Stripe certifications are a prerequisite for PSP validation.</strong>{' '}
          If you haven't completed yours yet,{' '}
          <a href="https://stripe.com/en-gb/partners/certification" target="_blank" rel="noreferrer" style={{ color: '#635BFF' }}>get certified here</a>{' '}
          before submitting a solution.
        </p>
      </div>

      {/* Validation requirements */}
      <h2 className="text-base font-semibold mb-3" style={{ color: '#0A2540' }}>Validation requirements</h2>
      <div className="space-y-3 mb-6">
        {requirements.map((r, i) => (
          <div key={i} className="flex gap-3">
            <CheckCircle2 size={16} style={{ color: '#635BFF', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-sm font-medium" style={{ color: '#0A2540' }}>{r.label}</p>
              <p className="text-xs mt-0.5" style={{ color: '#425466' }}>{r.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <h2 className="text-base font-semibold mb-3" style={{ color: '#0A2540' }}>Partner benefits once validated</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {benefits.map((b, i) => (
          <div key={i} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <p className="text-sm font-medium mb-1" style={{ color: '#0A2540' }}>{b.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: '#425466' }}>{b.description}</p>
          </div>
        ))}
      </div>

      {/* How this lab fits */}
      <div className="rounded-xl border p-5 mb-6" style={{ borderColor: '#E6EBF1', backgroundColor: '#F6F9FC' }}>
        <div className="flex items-start gap-3">
          <ArrowRight size={16} style={{ color: '#635BFF', flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#0A2540' }}>This lab is the co-development pathway</p>
            <p className="text-sm" style={{ color: '#425466' }}>
              The Partner Solutions Program offers two routes to validation: independent development with retroactive review, or co-development with Stripe partner solutions architects from day one. This lab is the co-development pathway — you build to the validation criteria upfront, with the architecture decisions guided by Stripe.
            </p>
          </div>
        </div>
      </div>

      <a
        href="https://drive.google.com/file/d/1_T9A8Unh1R7g2jDIsHM9eeLOzI28Pehx/view"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: '#635BFF', textDecoration: 'none' }}
      >
        <ExternalLink size={13} />
        Read the full Partner Solutions Program overview
      </a>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
