import React from 'react';
import { ExternalLink, Key, Shield, Terminal, CreditCard } from 'lucide-react';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'stripe-account');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function StripeAccount() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Getting Started
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Stripe Account Setup</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Your lab uses your own existing Stripe sandbox account. The Stripe team enables the features you need before the event.
      </p>

      {/* What's been enabled */}
      <h2 className="text-xl font-semibold mb-4" style={{ color: '#0A2540' }}>Features Enabled on Your Account</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: Shield, title: 'v2 Accounts API', detail: '/v2/core/accounts — the new unified account creation endpoint', color: '#635BFF' },
          { icon: Shield, title: 'Unified Account Configs', detail: 'GA configurations: PNP, PEP, PNS — choose your architecture', color: '#635BFF' },
          { icon: Terminal, title: 'Stripe Terminal', detail: 'S710 reader in test mode for in-person payment simulation', color: '#00A1C2' },
          { icon: CreditCard, title: 'PayNow (test mode)', detail: 'Singapore QR payment method for local market testing', color: '#30B130' },
        ].map(({ icon: Icon, title, detail, color }, i) => (
          <div key={i} className="rounded-xl border p-4 bg-white flex items-start gap-3" style={{ borderColor: '#E6EBF1' }}>
            <Icon size={18} style={{ color, flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="font-semibold text-sm mb-0.5" style={{ color: '#0A2540' }}>{title}</p>
              <p className="text-xs" style={{ color: '#425466' }}>{detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Get your API keys */}
      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Get Your API Keys</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        You'll need your <strong>Publishable key</strong> (starts with <code className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>pk_test_</code>) and <strong>Secret key</strong> (starts with <code className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>sk_test_</code>) from the Stripe Dashboard.
      </p>

      <div className="rounded-xl border p-4 mb-6 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <div className="flex items-center gap-3 mb-2">
          <Key size={16} style={{ color: '#635BFF' }} />
          <span className="font-semibold text-sm" style={{ color: '#0A2540' }}>Dashboard → Developers → API keys</span>
        </div>
        <a
          href="https://dashboard.stripe.com/test/apikeys"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-sm"
          style={{ color: '#635BFF', textDecoration: 'none' }}
        >
          <ExternalLink size={14} />
          https://dashboard.stripe.com/test/apikeys
        </a>
        <p className="text-xs mt-2" style={{ color: '#425466' }}>
          Make sure you're in <strong>Test mode</strong> (toggle in the top-left of the Dashboard). Never use live keys in this lab.
        </p>
      </div>

      <Callout type="warning" title="Keep your secret key safe">
        Never commit your secret key to git. The starter repo's <code>.env.example</code> shows where to put it.
        Add <code>.env</code> to <code>.gitignore</code> before you start.
      </Callout>

      <Checkpoint
        id="gs-account-ready"
        label="My Stripe account is configured and I have my API keys"
        description="Confirm you can see Connect features in your Dashboard and you have both pk_test_ and sk_test_ keys ready."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
