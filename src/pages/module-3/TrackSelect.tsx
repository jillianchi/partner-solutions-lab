import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'track-select');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

const tracks = [
  {
    id: 'A',
    title: 'Track A: TableOS',
    subtitle: 'F&B SaaS · worked example',
    description: 'A restaurant management SaaS embedding payments for 60+ outlets. Pre-built scenario — good if you\'re new to Connect or want a guided path.',
    tasks: ['3A.1 Manual Payout', '3A.2 Refund with Clawback', '3A.3 Dynamic Fee Tier'],
    path: '/module-3/track-a/overview',
    cta: 'Start Track A',
  },
  {
    id: 'B',
    title: 'Track B: Kalapa Hotels',
    subtitle: 'Hospitality · worked example',
    description: 'A boutique hotel group unifying payments across 3 properties. Pre-built scenario — good if hospitality is your vertical or you want to explore pre-auth and folio flows.',
    tasks: ['3B.1 Pre-Auth & Folio Capture', '3B.2 Off-Session Charge'],
    path: '/module-3/track-b/overview',
    cta: 'Start Track B',
  },
  {
    id: 'C',
    title: 'Track C: Bring Your Own',
    subtitle: 'Your vertical · for experienced partners',
    description: 'You have a real client scenario. Build the reference implementation for your vertical — define the scenario, make the architectural decisions, implement the vertical-specific logic.',
    tasks: ['3C.1 Platform Structure & DECISIONS.md', '3C.2 Vertical Logic', '3C.3 Document Your Accelerator'],
    path: '/module-3/track-c/overview',
    cta: 'Start Track C',
  },
];

export default function TrackSelect() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 3: Vertical Logic
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Choose Your Track</h1>
      <p className="text-lg mb-2" style={{ color: '#425466' }}>
        Tracks A and B are worked examples for specific verticals. Track C is for partners who have a real client scenario to build against.
      </p>
      <p className="text-sm mb-8" style={{ color: '#425466' }}>
        The Stripe architecture is the same across all three. Tracks diverge only in the vertical-specific payment patterns.
      </p>

      <div className="space-y-4 mb-8">
        {tracks.map(track => (
          <div key={track.id} className="rounded-xl border-2 p-6 bg-white" style={{ borderColor: '#635BFF' }}>
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF2FF' }}>
                <span className="text-lg font-bold" style={{ color: '#635BFF' }}>{track.id}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-base font-bold" style={{ color: '#0A2540' }}>{track.title}</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F6F9FC', color: '#425466' }}>{track.subtitle}</span>
                </div>
                <p className="text-sm mb-3" style={{ color: '#425466' }}>{track.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                  {track.tasks.map(t => (
                    <p key={t} className="text-xs" style={{ color: '#635BFF' }}>· {t}</p>
                  ))}
                </div>
                <Link
                  to={track.path}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: '#EEF2FF', color: '#635BFF', textDecoration: 'none' }}
                >
                  {track.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
