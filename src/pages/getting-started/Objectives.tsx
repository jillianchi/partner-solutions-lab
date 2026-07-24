import React from 'react';
import { Clock, Users, CheckCircle2 } from 'lucide-react';
import Checkpoint from '../../components/Checkpoint';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'objectives');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const outcomes = [
  'A platform account with two connected sub-merchant accounts onboarded via Stripe Connect',
  'A working Checkout Session with destination charges and platform fee capture',
  'An in-person Terminal payment routed to the correct connected account',
  'A webhook handler that drives reconciliation across your platform',
  'Vertical-specific payment logic — F&B payout flows or hotel pre-auth and folio capture',
  'A documented set of architectural decisions (your DECISIONS.md) — a reusable reference you can take into the next client engagement with the same problem',
];

const audience = [
  { label: 'ISV and SaaS platform builders', detail: 'Adding embedded payments to your platform product' },
  { label: 'Services partners', detail: 'Building reusable Stripe Connect implementations for enterprise clients' },
  { label: 'Technical consultants', detail: 'Scoping or delivering a Connect integration for the first time' },
  { label: 'Platform architects', detail: 'Evaluating Stripe Connect for a multi-entity payments structure' },
];

const prereqKnow = [
  'JavaScript / Node.js fundamentals',
  'Basic REST API concepts (HTTP, JSON)',
  'How to use a terminal and run npm commands',
  'Git basics',
];

const prereqStripe = [
  'Familiarity with Stripe payments is assumed',
  'No prior Connect experience needed — Module 1 covers the platform-specific concepts',
];

export default function Objectives() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
          Getting Started
        </div>
        <h1 className="text-4xl font-bold mb-3" style={{ color: '#0A2540' }}>
          Partner Solutions Lab
        </h1>
        <p className="text-xl mb-2" style={{ color: '#425466' }}>
          A hands-on lab for building an embedded payment platform — accepting online and in-person payments across a multi-merchant structure, and the foundation for a validated partner solution.
        </p>
      </div>

      {/* Lab outcome */}
      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Lab outcome</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        By the end of this lab, you'll have a working v0.1 of an embedded payments module that a real platform client could demo against — plus the architectural decisions documented for reuse.
      </p>
      <div className="rounded-xl border p-5 mb-8 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <div className="space-y-3">
          {outcomes.map((outcome, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 size={16} style={{ color: '#635BFF', flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm" style={{ color: '#425466' }}>{outcome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two tracks */}
      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Choose your track</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        Both tracks build on the same Stripe architecture. Pick the vertical that matches your client experience. Modules 1 and 2 are shared — tracks diverge in Module 3.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border p-5 bg-white" style={{ borderColor: '#E6EBF1' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#EEF2FF' }}>
            <span className="text-sm font-bold" style={{ color: '#635BFF' }}>A</span>
          </div>
          <h3 className="font-semibold mb-1" style={{ color: '#0A2540' }}>Track A — TableOS</h3>
          <p className="text-xs mb-3" style={{ color: '#635BFF', fontWeight: 500 }}>F&B SaaS · Restaurant management platform</p>
          <p className="text-sm mb-3" style={{ color: '#425466' }}>
            A restaurant management SaaS embedding payments for 60+ outlets. Build manual payouts, refund clawback logic, and dynamic fee tiers.
          </p>
          <div className="flex flex-wrap gap-1">
            {['Destination charges', 'Terminal', 'Manual payouts', 'Fee tiers'].map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border p-5 bg-white" style={{ borderColor: '#E6EBF1' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#EEF2FF' }}>
            <span className="text-sm font-bold" style={{ color: '#635BFF' }}>B</span>
          </div>
          <h3 className="font-semibold mb-1" style={{ color: '#0A2540' }}>Track B — Kalapa Hotels</h3>
          <p className="text-xs mb-3" style={{ color: '#635BFF', fontWeight: 500 }}>Hospitality · Multi-property hotel group</p>
          <p className="text-sm mb-3" style={{ color: '#425466' }}>
            A boutique hotel group unifying payments across 3 properties. Build pre-authorisation at check-in, folio capture at checkout, and off-session charges.
          </p>
          <div className="flex flex-wrap gap-1">
            {['Destination charges', 'Terminal', 'Pre-auth', 'Off-session'].map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Who this is for */}
      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Who this is for</h2>
      <div className="rounded-xl border p-5 mb-6 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <div className="flex items-start gap-2 mb-3">
          <Users size={16} style={{ color: '#635BFF', flexShrink: 0, marginTop: 2 }} />
          <p className="text-sm font-medium" style={{ color: '#0A2540' }}>Perfect if you're:</p>
        </div>
        <div className="space-y-2 ml-6">
          {audience.map((a, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-sm font-medium flex-shrink-0" style={{ color: '#0A2540' }}>{a.label}</span>
              <span className="text-sm" style={{ color: '#425466' }}>— {a.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>What you should know</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>You should know</p>
          <ul className="space-y-1">
            {prereqKnow.map((p, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: '#425466' }}>
                <span style={{ color: '#635BFF' }}>·</span>{p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: '#0A2540' }}>Stripe experience</p>
          <ul className="space-y-1">
            {prereqStripe.map((p, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: '#425466' }}>
                <span style={{ color: '#635BFF' }}>·</span>{p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Time */}
      <div className="rounded-xl border p-4 mb-8 flex items-center gap-4" style={{ borderColor: '#E6EBF1', backgroundColor: '#F6F9FC' }}>
        <Clock size={18} style={{ color: '#425466', flexShrink: 0 }} />
        <div>
          <p className="text-sm font-medium" style={{ color: '#0A2540' }}>Estimated time</p>
          <p className="text-sm" style={{ color: '#425466' }}>3–4 hours self-paced &nbsp;·&nbsp; 80 minutes facilitated &nbsp;·&nbsp; Skill level: intermediate</p>
        </div>
      </div>

      <Checkpoint
        id="gs-objectives-read"
        label="I've read the objectives and chosen my track"
        description="Which track are you following — TableOS (F&B) or Kalapa Hotels (Hospitality)?"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
