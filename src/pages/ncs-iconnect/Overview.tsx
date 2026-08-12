import React from 'react';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'ncs-overview');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function Overview() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#E0F2FE', color: '#0570DE' }}>
        NCS: iConnect Workshop
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Stripe + NCS iConnect: Technical Workshop</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Exploring Stripe as a reusable payment module within the iConnect Spring Boot framework.
      </p>

      <div className="rounded-xl border p-5 mb-6 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <h2 className="text-base font-semibold mb-3" style={{ color: '#0A2540' }}>Session Details</h2>
        <div className="space-y-2">
          {[
            { label: 'Date', value: '4 August 2026' },
            { label: 'Attendees', value: 'Chee Yong Lee (NCS), Soh See Theng (NCS), Jillian Chi (Stripe)' },
            { label: 'Format', value: 'Technical workshop — discussion + architecture walkthrough' },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-3 text-sm">
              <span className="font-semibold w-24 shrink-0" style={{ color: '#0A2540' }}>{label}</span>
              <span style={{ color: '#425466' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Agenda</h2>
      <div className="space-y-3 mb-6">
        {[
          { n: '1', title: 'Scoping', desc: 'Align on use cases and payment requirements' },
          { n: '2', title: 'Stripe in iConnect', desc: 'Spring Boot integration pattern + PayNow' },
          { n: '3', title: 'Recurring & Billing', desc: 'Scheduled payments, subscriptions, and when each fits' },
          { n: '4', title: 'Connect: When It Applies', desc: 'Multi-tenant / platform scenarios' },
          { n: '5', title: 'Next Steps', desc: 'Pilot project and action items' },
        ].map(({ n, title, desc }) => (
          <div key={n} className="rounded-xl border p-4 bg-white flex gap-4 items-start" style={{ borderColor: '#E6EBF1' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: '#E0F2FE', color: '#0570DE' }}>
              {n}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#0A2540' }}>{title}</p>
              <p className="text-sm" style={{ color: '#425466' }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout type="info">
        iConnect is NCS's internal Spring Boot framework used across client engagements. The goal today is to evaluate Stripe as a reusable PaymentService module that any iConnect application can inherit — so NCS builds the payment integration once and every project gets it.
      </Callout>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
