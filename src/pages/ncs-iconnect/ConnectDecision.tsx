import React from 'react';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'ncs-connect');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function ConnectDecision() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#E0F2FE', color: '#0570DE' }}>
        NCS: iConnect Workshop
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Connect: When It Applies</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Stripe Connect is for platforms collecting payments on behalf of others. Here's how to tell if NCS needs it.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>The Core Question</h2>
      <div className="rounded-xl border p-5 mb-5 bg-white text-center" style={{ borderColor: '#E6EBF1' }}>
        <p className="text-base font-semibold" style={{ color: '#0A2540' }}>
          Does this NCS application collect payments that belong to someone else — a different entity that needs to receive the funds?
        </p>
      </div>

      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="rounded-xl border p-4" style={{ backgroundColor: '#F0FFF4', borderColor: '#30B130' }}>
          <p className="font-semibold text-sm mb-2" style={{ color: '#1a7a1a' }}>Direct integration</p>
          <p className="text-sm" style={{ color: '#425466' }}>
            If the answer is <strong>no</strong> — the payments belong to a single entity (e.g. MOE, a government agency, one enterprise client) — use a direct Stripe integration. The PaymentService pattern from the previous section is all you need.
          </p>
        </div>
        <div className="rounded-xl border p-4" style={{ backgroundColor: '#EEF2FF', borderColor: '#635BFF' }}>
          <p className="font-semibold text-sm mb-2" style={{ color: '#635BFF' }}>Stripe Connect</p>
          <p className="text-sm" style={{ color: '#425466' }}>
            If the answer is <strong>yes</strong> — NCS is building a platform that routes funds to multiple sub-entities — Connect is the right architecture. The platform holds one Stripe account and routes funds to connected accounts for each sub-entity.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>SSOE Example</h2>
      <div className="rounded-xl border p-5 mb-6 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <div className="space-y-2">
          {[
            { label: 'Scenario', value: 'MOE uses SSOE for school fee collection' },
            { label: 'Payer', value: 'Parent / guardian' },
            { label: 'Recipient', value: 'MOE (single entity)' },
            { label: 'Verdict', value: 'Direct integration. MOE has one Stripe account. Parents pay, funds go to MOE. No Connect needed.' },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-3 text-sm">
              <span className="font-semibold w-24 shrink-0" style={{ color: '#0A2540' }}>{label}</span>
              <span style={{ color: '#425466' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>When Connect Would Apply</h2>
      <div className="space-y-3 mb-6">
        {[
          'NCS builds a platform where multiple government agencies each collect their own revenue through one NCS-managed integration',
          'NCS builds a marketplace (e.g. vendor procurement) where multiple suppliers need to receive payouts',
          'NCS operates as a payment facilitator on behalf of its clients (rather than each client having their own Stripe account)',
        ].map((scenario, i) => (
          <div key={i} className="rounded-xl border p-4 bg-white flex gap-3 items-start" style={{ borderColor: '#E6EBF1' }}>
            <span className="text-sm font-bold shrink-0" style={{ color: '#0570DE' }}>0{i + 1}</span>
            <p className="text-sm" style={{ color: '#425466' }}>{scenario}</p>
          </div>
        ))}
      </div>

      <Callout type="info">
        For a deeper walkthrough of the five Connect decisions (monetisation, risk, dashboard, fund flow, onboarding), the Partner Solutions Lab has an interactive decision guide — we can walk through it together if Connect applies to your use case.
      </Callout>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
