import React from 'react';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'advanced-configs');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function AdvancedConfigs() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#F0FFF4', color: '#30B130' }}>
        Bonus: Advanced Topics
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>PSP / PSS Configurations</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Advanced Unified Account configurations for Payment Service Providers (PSP) and Payment Service Structures (PSS) that require full platform control over every aspect of the payment experience.
      </p>

      <Callout type="warning" title="Bonus module — in development">
        This bonus module is being prepared. It covers PSP and PSS-level configurations, including Stripe's issuing capabilities, embedded finance patterns, and white-label checkout experiences.
      </Callout>

      <h2 className="text-xl font-semibold mb-4" style={{ color: '#0A2540' }}>Topics Covered</h2>
      <div className="space-y-3">
        {[
          { title: 'PSP Configuration', desc: 'Full platform control over payment methods, pricing, and the entire payment experience. Platform is a licensed PSP and acts as the merchant of record.' },
          { title: 'PSS Configuration', desc: 'Payment Software Structure — the platform provides the software layer but Stripe handles all financial services and compliance obligations.' },
          { title: 'Stripe Issuing with Connect', desc: 'Issue virtual and physical cards to connected accounts for B2B expense management use cases.' },
          { title: 'Embedded Finance Patterns', desc: 'Banking-as-a-service patterns built on Stripe: working capital, spend management, and treasury accounts for connected accounts.' },
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
