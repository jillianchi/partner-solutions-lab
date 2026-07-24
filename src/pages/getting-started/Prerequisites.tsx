import React from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'prerequisites');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const prereqs = [
  {
    name: 'Node.js 18+',
    detail: 'Required to run the lab starter server.',
    check: 'node --version',
    link: 'https://nodejs.org/',
  },
  {
    name: 'npm or yarn',
    detail: 'Package manager for installing dependencies.',
    check: 'npm --version',
  },
  {
    name: 'Git',
    detail: 'To clone the starter repository.',
    check: 'git --version',
  },
  {
    name: 'Stripe CLI',
    detail: 'For forwarding webhooks locally and testing the Stripe integration.',
    check: 'stripe --version',
    link: 'https://stripe.com/docs/stripe-cli',
  },
  {
    name: 'VS Code (recommended)',
    detail: 'Any code editor works, but VS Code with the Stripe extension gives the best DX.',
    link: 'https://code.visualstudio.com/',
  },
  {
    name: 'Stripe sandbox account',
    detail: 'Your account must have Connect, v2 Accounts API, and Terminal enabled. The Stripe team does this before the lab.',
  },
];

export default function Prerequisites() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Getting Started
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Prerequisites</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Make sure you have the following installed and configured before starting the lab.
      </p>

      <div className="space-y-3 mb-6">
        {prereqs.map((p, i) => (
          <div key={i} className="rounded-xl border p-4 bg-white flex items-start gap-4" style={{ borderColor: '#E6EBF1' }}>
            <CheckCircle2 size={18} style={{ color: '#30B130', flexShrink: 0, marginTop: 2 }} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-sm" style={{ color: '#0A2540' }}>{p.name}</span>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs" style={{ color: '#635BFF' }}>
                    <ExternalLink size={11} />
                    docs
                  </a>
                )}
              </div>
              <p className="text-sm" style={{ color: '#425466' }}>{p.detail}</p>
              {p.check && (
                <code className="text-xs mt-1 inline-block px-2 py-0.5 rounded" style={{ backgroundColor: '#F6F9FC', color: '#533AFD', fontFamily: 'monospace' }}>
                  {p.check}
                </code>
              )}
            </div>
          </div>
        ))}
      </div>

      <Callout type="warning" title="Stripe account must be pre-enabled">
        The Stripe team will enable your sandbox account with the required flags before the lab begins.
        If you're self-pacing, contact your Stripe partner manager to have these enabled:
        v2 Accounts API, GA Unified Account configurations (PNP/PEP/PNS), Terminal (S710), and PayNow in test mode.
      </Callout>

      <Checkpoint
        id="gs-prereqs-installed"
        label="All prerequisites installed and verified"
        description="Run each check command above and confirm the versions are correct."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
