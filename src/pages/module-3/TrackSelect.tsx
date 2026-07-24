import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-select');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function TrackSelect() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3: Vertical Logic
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Choose Your Track</h1>
      <p className="text-lg mb-8" style={{ color: '#425466' }}>
        Module 3 has two tracks based on the vertical you're exploring. Pick the one that matches your client's use case, or complete both if you have time.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Track A */}
        <div className="rounded-xl border-2 p-6 bg-white" style={{ borderColor: '#635BFF' }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#EEF2FF' }}>
            <span className="text-lg font-bold" style={{ color: '#635BFF' }}>A</span>
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: '#0A2540' }}>Track A: TableOS</h2>
          <p className="text-sm mb-4" style={{ color: '#425466' }}>
            Food & Beverage platform with restaurant POS and online ordering. You'll implement manual payouts,
            refund with clawback, and dynamic fee tiers based on GMV.
          </p>
          <div className="space-y-1 mb-4">
            {['3A.1 Manual Payout Trigger', '3A.2 Refund with Clawback', '3A.3 Dynamic Fee Tier'].map(t => (
              <p key={t} className="text-xs" style={{ color: '#635BFF' }}>• {t}</p>
            ))}
          </div>
          <Link
            to="/module-3/track-a/overview"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: '#EEF2FF', color: '#635BFF', textDecoration: 'none' }}
          >
            Start Track A <ArrowRight size={14} />
          </Link>
        </div>

        {/* Track B */}
        <div className="rounded-xl border-2 p-6 bg-white" style={{ borderColor: '#635BFF' }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#EEF2FF' }}>
            <span className="text-lg font-bold" style={{ color: '#635BFF' }}>B</span>
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: '#0A2540' }}>Track B: Kalapa Hotels</h2>
          <p className="text-sm mb-4" style={{ color: '#425466' }}>
            Hospitality platform for boutique hotel groups. You'll implement pre-authorisation,
            folio capture at checkout, and off-session charges for post-stay incidentals.
          </p>
          <div className="space-y-1 mb-4">
            {['3B.1 Pre-Auth & Folio Capture', '3B.2 Off-Session Charge'].map(t => (
              <p key={t} className="text-xs" style={{ color: '#635BFF' }}>• {t}</p>
            ))}
          </div>
          <Link
            to="/module-3/track-b/overview"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: '#EEF2FF', color: '#635BFF', textDecoration: 'none' }}
          >
            Start Track B <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
