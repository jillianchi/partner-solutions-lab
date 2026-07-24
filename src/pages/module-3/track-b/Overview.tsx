import React from 'react';
import L200FundFlow from '../../../components/diagrams/L200FundFlow';
import Callout from '../../../components/Callout';
import PageNav from '../../../components/PageNav';
import { getAllPages } from '../../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-b-overview');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function TrackBOverview() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3: Track B — Kalapa Hotels
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Track B: Kalapa Hotels Overview</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Kalapa Hotels is a property management system (PMS) for boutique hotel groups. The platform manages multiple hotel properties, each as a connected account. This track implements hospitality-specific payment patterns.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>What You'll Build</h2>
      <div className="space-y-3 mb-6">
        {[
          {
            num: '3B.1',
            title: 'Pre-Auth & Folio Capture',
            desc: 'At check-in, the PMS places a hold on the guest\'s card for the estimated stay cost. At check-out, it captures the actual folio amount (which may be higher or lower than the hold).',
          },
          {
            num: '3B.2',
            title: 'Off-Session Charge',
            desc: 'After check-out, the hotel may need to charge the guest for incidentals (minibar, room service). You\'ll implement off-session charging using the card saved at check-in.',
          },
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
      <L200FundFlow track="b" />

      <Callout type="info" title="UA Configuration for Kalapa Hotels">
        Kalapa Hotels uses <strong>PEP</strong> — each hotel property has access to a Stripe Express Dashboard for their own reconciliation. The platform retains pricing control and bears liability.
      </Callout>

      <Callout type="decision" title="Key design decision: capture_method=manual">
        The entire Track B flow depends on setting <code>capture_method: 'manual'</code> on the PaymentIntent at check-in. This creates an authorization hold without charging the card. You capture (charge) later with the actual folio amount.
      </Callout>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
