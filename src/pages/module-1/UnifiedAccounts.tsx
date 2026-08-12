import React, { useState } from 'react';
import { ExternalLink, ChevronRight, CheckCircle2 } from 'lucide-react';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'unified-accounts');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const decisions = [
  {
    number: '01',
    title: 'Monetization',
    question: 'How does your platform make money from payments?',
    options: [
      {
        label: 'Revenue share',
        description: 'Stripe handles pricing and collects fees from your merchants. Stripe shares a portion of revenue with your platform. Lowest effort — no pricing strategy needed.',
        color: '#4498FF',
        bg: '#EFF6FF',
      },
      {
        label: 'Buy-rate',
        description: "Your platform sets its own pricing, pays Stripe's rate, and keeps the margin. More revenue potential — but you own the pricing strategy and absorb network cost variance.",
        color: '#635BFF',
        bg: '#EEF2FF',
        recommended: true,
      },
    ],
    workshopNote: 'Both TableOS and Kalapa Hotels use buy-rate — they want to control pricing and capture the margin on every transaction.',
    docsLink: 'https://stripe.com/docs/connect/platform-pricing-tools',
    docsLabel: 'Platform pricing tools',
  },
  {
    number: '02',
    title: 'Merchant Risk',
    question: 'Who is responsible if a merchant has an unrecoverable negative balance?',
    options: [
      {
        label: 'Stripe Managed Risk',
        description: "Stripe assumes loss liability, monitors merchants 24/7, and handles risk interventions. Your platform is protected from unrecoverable losses. Recommended for platforms new to payments.",
        color: '#30B130',
        bg: '#F0FFF4',
        recommended: true,
      },
      {
        label: 'Platform Managed Risk',
        description: 'Your platform assumes liability for merchant losses. You use Stripe\'s risk tools (Radar, Connect risk toolkit) to monitor and intervene. More control — but requires a dedicated risk team.',
        color: '#FF8C00',
        bg: '#FFFBF5',
      },
    ],
    workshopNote: 'For this lab we use Stripe Managed Risk — it is the right starting point for a new Connect integration and the most common choice for SEA platforms.',
    docsLink: 'https://stripe.com/docs/connect/managed-risk',
    docsLabel: 'Stripe Managed Risk',
  },
  {
    number: '03',
    title: 'Merchant Dashboard',
    question: 'What payment experience do your merchants get?',
    options: [
      {
        label: 'Stripe-hosted dashboard',
        description: "Merchants access Stripe's own full dashboard. No build effort — but merchants see Stripe's branding and UI, not yours.",
        color: '#4498FF',
        bg: '#EFF6FF',
      },
      {
        label: 'Embedded components',
        description: "Stripe's pre-built UI components (payments, payouts, reporting) embedded inside your platform's product. Stripe branding is minimal — looks like your product.",
        color: '#635BFF',
        bg: '#EEF2FF',
        recommended: true,
      },
      {
        label: 'Fully custom (API)',
        description: 'Your platform builds the entire merchant payments UI on top of Stripe APIs. Maximum control — but highest engineering investment and ongoing maintenance.',
        color: '#FF8C00',
        bg: '#FFFBF5',
      },
    ],
    workshopNote: "For both tracks, we use Stripe's hosted onboarding to get merchants live quickly. In production, platforms typically move to embedded components for a white-labeled experience.",
    docsLink: 'https://stripe.com/docs/connect/get-started-connect-embedded-components',
    docsLabel: 'Connect Embedded Components',
  },
  {
    number: '04',
    title: 'Fund Flow',
    question: 'Who is the merchant of record for customer payments?',
    options: [
      {
        label: 'Direct Charges',
        description: 'The connected account (merchant) is the merchant of record. Stripe fees are charged to the merchant. Platform collects an application fee. Best when each merchant operates independently.',
        color: '#4498FF',
        bg: '#EFF6FF',
      },
      {
        label: 'Destination Charges',
        description: 'The platform is the merchant of record. Stripe fees come from the platform. Payment is automatically transferred to the connected account minus the platform fee. Best for SaaS platforms where the platform is the customer-facing brand.',
        color: '#635BFF',
        bg: '#EEF2FF',
        recommended: true,
      },
      {
        label: 'Separate Charges & Transfers',
        description: 'Platform is merchant of record. Payments and transfers are decoupled — you can split one payment to multiple parties or delay payouts. Most flexible, most complex.',
        color: '#FF8C00',
        bg: '#FFFBF5',
      },
    ],
    workshopNote: 'Both tracks use Destination Charges — the platform (TableOS or Kalapa Hotels) is the merchant of record, and each outlet/property is the destination. This is the right choice when the platform controls the customer relationship.',
    docsLink: 'https://stripe.com/docs/connect/destination-charges',
    docsLabel: 'Destination Charges docs',
  },
  {
    number: '05',
    title: 'Merchant Onboarding',
    question: 'How are merchants verified and onboarded onto your platform?',
    options: [
      {
        label: 'Stripe-hosted onboarding',
        description: "Merchants are redirected to Stripe's onboarding flow. Stripe handles all KYC, AML, and identity verification. Fastest to launch — days of effort.",
        color: '#30B130',
        bg: '#F0FFF4',
        recommended: true,
      },
      {
        label: 'Embedded onboarding',
        description: "Stripe's onboarding UI components embedded in your platform. Same KYC compliance as hosted — but inside your product's experience.",
        color: '#635BFF',
        bg: '#EEF2FF',
      },
      {
        label: 'Platform-built (API)',
        description: "Your platform collects all merchant information and calls Stripe's KYC API directly. Full control — but you own the compliance complexity.",
        color: '#FF8C00',
        bg: '#FFFBF5',
      },
    ],
    workshopNote: 'This lab uses Stripe-hosted onboarding. For the SP2 accelerator, you would evaluate embedded onboarding for a white-labeled experience.',
    docsLink: 'https://stripe.com/docs/connect/onboarding',
    docsLabel: 'Connect onboarding',
  },
];

export default function UnifiedAccounts() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 1: Foundation Concepts
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Designing a Connect Integration</h1>
      <p className="text-lg mb-2" style={{ color: '#425466' }}>
        Every Connect integration is defined by five decisions. Getting these right upfront determines your compliance obligations, the merchant experience, and how you monetise payments.
      </p>
      <p className="text-sm mb-6" style={{ color: '#425466' }}>
        There is no single right answer — different clients need different configurations. Part of your accelerator's value is knowing how to advise on these decisions.
      </p>

      <Callout type="info">
        This framework comes from Stripe's{' '}
        <a href="https://docs.stripe.com/connect/design-an-integration" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium" style={{ color: '#1E40AF' }}>
          Design an Integration guide <ExternalLink size={11} />
        </a>
        . Read it before scoping any Connect project.
      </Callout>

      {/* Decision accordion */}
      <div className="space-y-3 my-6">
        {decisions.map((d, i) => (
          <div key={i} className="rounded-xl border overflow-hidden bg-white" style={{ borderColor: expanded === i ? '#635BFF' : '#E6EBF1' }}>
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left"
            >
              <span className="text-xs font-bold w-6 flex-shrink-0" style={{ color: '#635BFF' }}>{d.number}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: '#0A2540' }}>{d.title}</p>
                <p className="text-xs mt-0.5" style={{ color: '#425466' }}>{d.question}</p>
              </div>
              <ChevronRight
                size={16}
                style={{
                  color: '#425466',
                  flexShrink: 0,
                  transform: expanded === i ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              />
            </button>

            {expanded === i && (
              <div className="px-5 pb-5 border-t" style={{ borderColor: '#E6EBF1' }}>
                <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: `repeat(${d.options.length}, 1fr)` }}>
                  {d.options.map((opt, j) => (
                    <div
                      key={j}
                      className="rounded-lg border p-4 relative"
                      style={{ borderColor: opt.recommended ? opt.color : '#E6EBF1', backgroundColor: opt.recommended ? opt.bg : 'white' }}
                    >
                      {opt.recommended && (
                        <div className="flex items-center gap-1 mb-2">
                          <CheckCircle2 size={12} style={{ color: opt.color }} />
                          <span className="text-xs font-semibold" style={{ color: opt.color }}>Recommended starting point</span>
                        </div>
                      )}
                      <p className="font-semibold text-sm mb-2" style={{ color: '#0A2540' }}>{opt.label}</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#425466' }}>{opt.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg px-4 py-3" style={{ backgroundColor: '#F6F9FC' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#0A2540' }}>For this lab</p>
                  <p className="text-xs" style={{ color: '#425466' }}>{d.workshopNote}</p>
                </div>

                <a
                  href={d.docsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium"
                  style={{ color: '#635BFF', textDecoration: 'none' }}
                >
                  <ExternalLink size={12} />
                  {d.docsLabel}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>How this lab is configured</h2>
      <div className="rounded-xl border p-5 mb-6 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <div className="grid grid-cols-2 gap-3">
          {[
            ['Monetization', 'Buy-rate'],
            ['Merchant Risk', 'Stripe Managed Risk'],
            ['Dashboard', 'Stripe-hosted (workshop) → Embedded (production)'],
            ['Fund Flow', 'Destination Charges'],
            ['Onboarding', 'Stripe-hosted'],
          ].map(([decision, choice]) => (
            <div key={decision} className="flex gap-3">
              <div className="w-1.5 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: '#635BFF', height: 'calc(100% - 4px)' }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: '#0A2540' }}>{decision}</p>
                <p className="text-xs mt-0.5" style={{ color: '#425466' }}>{choice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>UA configuration shorthand</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        You'll see PNP, PEP, and PNS used as shorthand throughout the lab. Each letter maps to a dimension of your configuration:
      </p>
      <div className="rounded-xl border overflow-hidden mb-6 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: '#F6F9FC', borderBottom: '1px solid #E6EBF1' }}>
              <th className="text-left px-4 py-2 font-semibold" style={{ color: '#0A2540' }}>Acronym</th>
              <th className="text-left px-4 py-2 font-semibold" style={{ color: '#0A2540' }}>Pricing</th>
              <th className="text-left px-4 py-2 font-semibold" style={{ color: '#0A2540' }}>Merchant dashboard</th>
              <th className="text-left px-4 py-2 font-semibold" style={{ color: '#0A2540' }}>Loss liability</th>
            </tr>
          </thead>
          <tbody style={{ color: '#425466' }}>
            {[
              ['PNP', 'Platform (buy-rate)', 'None', 'Platform'],
              ['PEP', 'Platform (buy-rate)', 'Express dashboard', 'Platform'],
              ['PNS', 'Platform (buy-rate)', 'None', 'Stripe'],
            ].map(([acronym, pricing, dashboard, liability]) => (
              <tr key={acronym} style={{ borderBottom: '1px solid #E6EBF1' }}>
                <td className="px-4 py-2 font-bold" style={{ color: '#635BFF' }}>{acronym}</td>
                <td className="px-4 py-2">{pricing}</td>
                <td className="px-4 py-2">{dashboard}</td>
                <td className="px-4 py-2">{liability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="decision" title="Your DECISIONS.md starts here">
        When you begin building, your first task is to justify these choices for your specific client. A restaurant platform and a hotel group will likely make different decisions — especially on risk and dashboard. Document your reasoning. That's the IP of your accelerator.
      </Callout>

      <Checkpoint
        id="m1-ua-config-chosen"
        label="I understand the five Connect decisions"
        description="Can you explain each decision and why Destination Charges + Stripe Managed Risk is the right starting point for this lab?"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
