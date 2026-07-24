import React from 'react';
import MermaidDiagram from '../../components/MermaidDiagram';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'architecture');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

// Full platform landscape — generic vertical SaaS
// Stripe is one zone. The rest of the platform already exists.
const FULL_LANDSCAPE = `
flowchart TD
    subgraph CUSTOMER["Customer Touchpoints"]
        direction LR
        WEB["Web / Mobile"]
        POS["In-Person · S710"]
    end

    subgraph PLATFORM["Platform — TableOS / Kalapa Hotels"]
        direction LR
        CORE["Core Application\nbookings · orders · operations"]
        DATA["Data & Analytics\nreporting · CRM · loyalty"]
    end

    subgraph THIRD["Third-Party Systems"]
        direction TB
        CHANNELS["Distribution Channels\nBooking.com · GrabFood · Agoda"]
        ERP["Finance & ERP\nXero · SAP · QuickBooks"]
        OPS["Operational Tools\nHR · scheduling · inventory"]
    end

    STRIPE["Stripe\nPayment Infrastructure"]

    subgraph OUTLETS["Sub-Merchants / Outlets"]
        direction LR
        OA["Outlet A"]
        OB["Outlet B"]
    end

    BANK["Bank Accounts"]

    CUSTOMER -->|payment request| PLATFORM
    PLATFORM -->|payment API| STRIPE
    PLATFORM -->|sync| CHANNELS
    PLATFORM -->|ops data| OPS
    STRIPE -.->|payout events| ERP
    CHANNELS -.->|own payment flow| BANK
    STRIPE -->|fund transfer| OUTLETS
    OUTLETS -->|payout| BANK
`;

const systemNotes = [
  {
    zone: 'Platform Core',
    note: 'The SaaS product your client has already built — bookings, orders, CRM, reporting. This is what their engineering team maintains. Your integration has to fit into this, not replace it.',
  },
  {
    zone: 'Operational Systems',
    note: 'Third-party systems already in use. Delivery aggregators (GrabFood, Foodpanda) and OTAs (Booking.com, Agoda) have their own payment processing — those transactions do not flow through Stripe. Accounting systems need reconciliation data from Stripe payouts.',
  },
  {
    zone: 'Stripe — Embedded Payments',
    note: 'What you build in this lab. Stripe handles payment acceptance (online + in-person), fund routing to outlets, and webhook events. This is one zone in a much larger system.',
  },
  {
    zone: 'Distribution Channels',
    note: 'A common scoping trap: assuming all transactions flow through Stripe. Delivery and OTA channels collect payment themselves and remit net proceeds separately. Clarify this early — it affects reconciliation design.',
  },
];

export default function ArchitectureOverview() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Getting Started
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Architecture Overview</h1>
      <p className="text-lg mb-2" style={{ color: '#425466' }}>
        Before scoping any embedded payments engagement, map the full system landscape. Stripe is one component — understanding what surrounds it determines how complex the integration actually is.
      </p>
      <p className="text-sm mb-6" style={{ color: '#425466' }}>
        The diagram below shows a typical vertical SaaS platform. The Stripe zone is what you'll build in this lab. Everything else already exists in your client's environment.
      </p>

      <MermaidDiagram
        label="L100 — Full Platform Landscape"
        caption="Generic vertical SaaS platform. Track-specific systems (PMS, OMS, KDS, channel manager) appear in Module 3."
        chart={FULL_LANDSCAPE}
      />

      <Callout type="warning" title="Not everything flows through Stripe">
        Delivery aggregators (GrabFood, Foodpanda) and OTA channels (Booking.com, Agoda) collect payment directly and remit net proceeds to the merchant separately. Those transactions sit outside Stripe and need separate reconciliation handling. Establish this boundary early in every engagement.
      </Callout>

      <h2 className="text-xl font-semibold mb-4 mt-8" style={{ color: '#0A2540' }}>What each zone means for your engagement</h2>
      <div className="space-y-3 mb-8">
        {systemNotes.map((n, i) => (
          <div key={i} className="rounded-xl border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
            <div className="flex items-start gap-3">
              <div className="w-1.5 rounded-full flex-shrink-0 mt-1 self-stretch" style={{ backgroundColor: '#635BFF', minHeight: 16 }} />
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#0A2540' }}>{n.zone}</p>
                <p className="text-sm" style={{ color: '#425466' }}>{n.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="info" title="Track-specific architecture">
        Module 3 introduces the vertical-specific systems for your chosen track — the PMS and OTA channel manager for Kalapa Hotels, or the OMS and delivery integrations for TableOS. You'll build the architecture diagram for your track there.
      </Callout>

      <Checkpoint
        id="gs-arch-reviewed"
        label="I understand where Stripe sits in the full platform landscape"
        description="Can you identify which transactions flow through Stripe and which don't? Where does reconciliation data need to go?"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
