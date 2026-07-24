import React from 'react';
import { ExternalLink } from 'lucide-react';
import L100Architecture from '../../components/diagrams/L100Architecture';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'what-is-connect');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function WhatIsConnect() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 1: Foundation Concepts
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>What is Stripe Connect?</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Stripe Connect is the API layer that enables a platform to move money between customers, the platform itself, and the platform's merchants or service providers.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>The Core Idea</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        Without Connect, a platform would need to collect customer payments, receive the funds into a business bank account, and then manually pay out to each merchant — taking on significant compliance, treasury, and reconciliation burden.
      </p>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        With Connect, Stripe sits in the middle: the platform instructs Stripe on how to split each payment, Stripe routes funds automatically, and the platform collects its fee without ever touching the merchant's money directly.
      </p>

      <L100Architecture />

      <h2 className="text-xl font-semibold mb-3 mt-6" style={{ color: '#0A2540' }}>Three Key Concepts</h2>
      <div className="space-y-3 mb-6">
        <div className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
          <p className="font-semibold text-sm mb-1" style={{ color: '#0A2540' }}>1. Platform Account</p>
          <p className="text-sm" style={{ color: '#425466' }}>
            Your Stripe account. It creates all API objects (PaymentIntents, Checkout Sessions), specifies how funds are split, and receives platform fee income. The platform is legally responsible to Stripe for the integration.
          </p>
        </div>
        <div className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
          <p className="font-semibold text-sm mb-1" style={{ color: '#0A2540' }}>2. Connected Accounts</p>
          <p className="text-sm" style={{ color: '#425466' }}>
            Each sub-merchant (restaurant, hotel property) gets a Stripe connected account. Funds are routed to them via the destination charge model. The configuration of these accounts (who controls the Dashboard, who bears liability) is determined by the Unified Account configuration you choose.
          </p>
        </div>
        <div className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
          <p className="font-semibold text-sm mb-1" style={{ color: '#0A2540' }}>3. Fund Flows</p>
          <p className="text-sm" style={{ color: '#425466' }}>
            The mechanism by which money moves. In this lab you'll use <strong>destination charges</strong> — the platform charges the customer in full, deducts a platform fee, and transfers the remainder to the connected account. The connected account then pays out to its bank on a schedule.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Why Connect for Vertical SaaS?</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        Vertical SaaS platforms (POS, PMS, practice management) have a unique opportunity: they control the transaction at the point of sale. By embedding payments via Connect, they can:
      </p>
      <ul className="space-y-1 mb-6 ml-4" style={{ color: '#425466' }}>
        <li className="text-sm">• Capture a payments revenue stream without building payment infrastructure</li>
        <li className="text-sm">• Reduce merchant churn by owning the payments relationship</li>
        <li className="text-sm">• Offer merchants a unified dashboard (Stripe-hosted) for reconciliation</li>
        <li className="text-sm">• Unlock advanced flows (pre-auth, off-session, terminal) within the same API</li>
      </ul>

      <Callout type="info">
        <a href="https://stripe.com/docs/connect" target="_blank" rel="noreferrer" className="flex items-center gap-1" style={{ color: '#1E40AF', textDecoration: 'none' }}>
          <ExternalLink size={12} />
          Full Connect documentation at stripe.com/docs/connect
        </a>
      </Callout>

      <Checkpoint
        id="m1-connect-understood"
        label="I understand what Stripe Connect does"
        description="Can you explain the difference between the platform account and a connected account to a colleague?"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
