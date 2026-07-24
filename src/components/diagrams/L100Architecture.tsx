import React from 'react';
import MermaidDiagram from '../MermaidDiagram';

const CHART_A = `
flowchart LR
    subgraph CL["Customer"]
        WEB["Web / Mobile App"]
        WALKIN["Walk-in Customer"]
    end

    subgraph PL["TableOS Platform"]
        BE["SaaS Backend\norders · reservations · staff"]
        DB[("Database")]
    end

    subgraph PAY["Payment Infrastructure — Stripe"]
        SC["Stripe Connect\nplatform account"]
        CHK["Checkout Sessions\nonline payments"]
        TERM["Terminal\nin-person payments"]
        WH["Webhooks\npayment events"]
    end

    subgraph SM["Sub-Merchants"]
        RA["Restaurant A\nconnected account"]
        RB["Restaurant B\nconnected account"]
    end

    subgraph BK["Banking"]
        BA[("Bank A")]
        BB[("Bank B")]
    end

    S710["S710 Terminal\nCounter / table service"]

    WEB -->|request| BE
    WALKIN --> S710
    BE --> DB
    BE -->|API call| SC
    BE -->|API call| CHK
    WH -->|event| BE
    S710 -->|card present| TERM
    TERM --> SC
    CHK --> SC
    SC -->|transfer| RA
    SC -->|transfer| RB
    WH -.->|webhook| BE
    RA -->|payout| BA
    RB -->|payout| BB
`;

const CHART_B = `
flowchart LR
    subgraph CL["Customer"]
        WEB["Online Booking\nPortal"]
        GUEST["Walk-in Guest"]
    end

    subgraph PL["Kalapa Hotels Platform"]
        PMS["PMS + Booking Engine\nrooms · folios · check-in"]
        DB[("Database")]
    end

    subgraph PAY["Payment Infrastructure — Stripe"]
        SC["Stripe Connect\nplatform account"]
        CHK["Checkout Sessions\nonline bookings"]
        TERM["Terminal\nfront desk + restaurant"]
        WH["Webhooks\npayment events"]
    end

    subgraph SM["Properties"]
        PA["The Duxton\nconnected account"]
        PB["The Ann Siang\nconnected account"]
    end

    subgraph BK["Banking"]
        BA[("Bank A")]
        BB[("Bank B")]
    end

    S710["S710 Terminal\nFront desk / restaurant"]

    WEB -->|booking| PMS
    GUEST --> S710
    PMS --> DB
    PMS -->|API call| SC
    PMS -->|API call| CHK
    WH -->|event| PMS
    S710 -->|card present| TERM
    TERM --> SC
    CHK --> SC
    SC -->|transfer| PA
    SC -->|transfer| PB
    WH -.->|webhook| PMS
    PA -->|payout| BA
    PB -->|payout| BB
`;

export default function L100Architecture({ track }: { track?: 'a' | 'b' }) {
  const chart = track === 'b' ? CHART_B : CHART_A;
  const caption = track === 'b'
    ? 'Kalapa Hotels platform — Stripe handles payment processing across properties. PMS orchestrates rooms, folios, and guest flows.'
    : 'TableOS platform — Stripe handles payment processing across outlets. The SaaS backend orchestrates orders, reservations, and reporting.';

  return (
    <MermaidDiagram
      label="L100 — Platform Architecture"
      caption={caption}
      chart={chart}
    />
  );
}
