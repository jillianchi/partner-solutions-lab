import React from 'react';
import L200FundFlow from '../../../components/diagrams/L200FundFlow';
import Callout from '../../../components/Callout';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-a-overview');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function TrackAOverview() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3: Track A — TableOS
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Track A: TableOS Overview</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        TableOS is a restaurant management platform. The platform manages multiple restaurant connected accounts. This track implements F&amp;B-specific payment logic.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>What You'll Build</h2>
      <div className="space-y-3 mb-6">
        {[
          { num: '3A.1', title: 'Manual Payout', desc: 'Restaurants in TableOS are paid out weekly. You\'ll implement a manual payout trigger that moves funds from the connected account to the restaurant\'s bank account.' },
          { num: '3A.2', title: 'Refund with Clawback', desc: 'When a customer refunds an order, the platform needs to claw back its fee from the connected account. You\'ll implement a refund that correctly reverses both the customer charge and the platform fee.' },
          { num: '3A.3', title: 'Dynamic Fee Tier', desc: 'High-volume restaurants get a lower platform fee. You\'ll implement a tiered fee calculation based on the restaurant\'s monthly GMV.' },
        ].map(task => (
          <div key={task.num} className="rounded-xl border p-4 bg-white flex gap-4" style={{ borderColor: '#E6EBF1' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF2FF' }}>
              <span className="text-xs font-bold" style={{ color: '#635BFF' }}>{task.num}</span>
            </div>
            <div>
              <p className="font-semibold mb-1 text-sm" style={{ color: '#0A2540' }}>{task.title}</p>
              <p className="text-sm" style={{ color: '#425466' }}>{task.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Fund Flow</h2>
      <L200FundFlow track="a" />

      <Callout type="info" title="UA Configuration for TableOS">
        TableOS uses <strong>PNP</strong> — the platform controls pricing and the merchant experience end-to-end. Restaurants don't have a Stripe Dashboard. Reconciliation is handled within the TableOS platform UI.
      </Callout>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
