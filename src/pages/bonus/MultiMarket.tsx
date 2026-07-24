import React from 'react';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'multi-market');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function MultiMarket() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#F0FFF4', color: '#30B130' }}>
        Bonus: Advanced Topics
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Multi-Market Expansion</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        How to extend a single-market Connect integration to support multiple countries and currencies.
      </p>

      <Callout type="warning" title="Bonus module — in development">
        This bonus module is being prepared. It will cover cross-border payouts, currency conversion handling, local payment methods (PayNow, GrabPay, FPX), and multi-entity platform structures for SEA market expansion.
      </Callout>

      <h2 className="text-xl font-semibold mb-4" style={{ color: '#0A2540' }}>Topics Covered</h2>
      <div className="space-y-3">
        {[
          { title: 'Multi-currency destination charges', desc: 'Charge in the customer\'s local currency while the platform account settles in a different currency.' },
          { title: 'Local payment methods', desc: 'PayNow (SG), DuitNow (MY), PromptPay (TH) — integrating regional payment rails via Stripe.' },
          { title: 'Cross-border connected accounts', desc: 'Creating connected accounts in different countries and handling the cross-border transfer rules.' },
          { title: 'Multi-entity platform structure', desc: 'When your platform has a Singapore entity and a Malaysia entity, how to structure the API architecture.' },
        ].map(({ title, desc }) => (
          <div key={title} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <p className="font-semibold text-sm mb-1" style={{ color: '#0A2540' }}>{title}</p>
            <p className="text-sm" style={{ color: '#425466' }}>{desc}</p>
          </div>
        ))}
      </div>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
