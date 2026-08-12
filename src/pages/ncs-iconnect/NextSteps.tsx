import React from 'react';
import { ExternalLink } from 'lucide-react';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'ncs-next-steps');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const ncsActions = [
  {
    title: 'Confirm SSOE scope',
    desc: 'Does SSOE include a payments or fee-collection component? If yes, share the technical requirements so Stripe can validate the integration pattern.',
  },
  {
    title: 'Define the payment module spec',
    desc: "Based on today's session: which Stripe products (Checkout Sessions, Billing), which payment methods (PayNow, card), and which patterns (one-time, recurring) does the base iConnect module need?",
  },
  {
    title: 'Identify the decision-maker',
    desc: 'For the pilot project: who on the client side (e.g. MOE) needs to approve the Stripe integration?',
  },
];

const stripeActions = [
  {
    title: 'Integration support',
    desc: 'Stripe solution architects will review the iConnect PaymentService design and provide technical feedback before production.',
  },
  {
    title: 'Sandbox access',
    desc: 'Test API keys, PayNow test flows, and webhook testing for the pilot project.',
  },
  {
    title: 'Partner resources',
    desc: "Stripe's Java SDK, documentation, and sample code are all available immediately; no procurement needed to start building.",
  },
];

const links = [
  { label: 'Stripe Java SDK', href: 'https://github.com/stripe/stripe-java' },
  { label: 'Checkout Sessions quickstart (Java)', href: 'https://docs.stripe.com/payments/quickstart-checkout-sessions?lang=java' },
  { label: 'PayNow documentation', href: 'https://docs.stripe.com/payments/paynow' },
  { label: 'Stripe Billing quickstart', href: 'https://docs.stripe.com/billing/quickstart' },
  { label: 'Stripe Connect overview', href: 'https://docs.stripe.com/connect' },
];

export default function NextSteps() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#E0F2FE', color: '#0570DE' }}>
        NCS: iConnect Workshop
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Next Steps</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        From workshop to pilot — what we're each taking away.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Identify the Pilot Project</h2>
      <div className="rounded-xl border p-5 mb-6 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <p className="text-sm" style={{ color: '#425466' }}>
          The most valuable next step is agreeing on one specific project to use as a proof-of-concept for the iConnect payment module. A good pilot is a real project (not a sandbox exercise) with a defined payment requirement, a timeline, and a technical owner.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>What NCS Takes Away</h2>
      <div className="space-y-3 mb-6">
        {ncsActions.map(({ title, desc }) => (
          <div key={title} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <p className="font-semibold text-sm mb-1" style={{ color: '#0A2540' }}>{title}</p>
            <p className="text-sm" style={{ color: '#425466' }}>{desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>What Stripe Provides</h2>
      <div className="space-y-3 mb-6">
        {stripeActions.map(({ title, desc }) => (
          <div key={title} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <p className="font-semibold text-sm mb-1" style={{ color: '#0A2540' }}>{title}</p>
            <p className="text-sm" style={{ color: '#425466' }}>{desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Useful Links</h2>
      <div className="rounded-xl border p-4 mb-6 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <ul className="space-y-2">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm"
                style={{ color: '#1E40AF', textDecoration: 'none' }}
              >
                <ExternalLink size={12} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Callout type="tip" title="Ready to start?">
        The iConnect PaymentService skeleton from today's session is ready to test against Stripe's sandbox. Reach out to Jillian (jills@stripe.com) for test API keys and to schedule a follow-up technical review.
      </Callout>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
