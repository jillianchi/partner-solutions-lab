import React from 'react';

interface L200FundFlowProps {
  track: 'a' | 'b';
}

export default function L200FundFlow({ track }: L200FundFlowProps) {
  if (track === 'a') {
    return (
      <div className="my-6 overflow-x-auto rounded-lg border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#425466' }}>
          L200 — Track A: TableOS Fund Flow
        </p>
        <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ minWidth: 600 }}>
          <defs>
            <marker id="fa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#533AFD" />
            </marker>
            <marker id="faGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#95A4BA" />
            </marker>
          </defs>

          {/* Swim lane backgrounds */}
          <rect x="5" y="5" width="190" height="260" rx="6" fill="#F0F4FF" stroke="#E6EBF1" strokeWidth="1" />
          <rect x="205" y="5" width="190" height="260" rx="6" fill="#FFF8F5" stroke="#E6EBF1" strokeWidth="1" />
          <rect x="405" y="5" width="190" height="260" rx="6" fill="#F0F4FF" stroke="#E6EBF1" strokeWidth="1" />
          <rect x="605" y="5" width="205" height="260" rx="6" fill="#F5FFF7" stroke="#E6EBF1" strokeWidth="1" />

          {/* Lane headers */}
          <text x="100" y="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#4498FF">Customer</text>
          <text x="300" y="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#FF6118">TableOS Platform</text>
          <text x="500" y="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#533AFD">Stripe</text>
          <text x="707" y="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#30B130">Restaurant Account</text>

          {/* Step 1: Customer checkout */}
          <rect x="25" y="50" width="145" height="34" rx="4" fill="white" stroke="#4498FF" strokeWidth="1.5" />
          <text x="97" y="73" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#0A2540">Initiate Checkout</text>
          <line x1="172" y1="67" x2="201" y2="67" stroke="#533AFD" strokeWidth="1.5" markerEnd="url(#fa)" />

          {/* Step 2: Platform creates session */}
          <rect x="220" y="50" width="155" height="34" rx="4" fill="white" stroke="#FF6118" strokeWidth="1.5" />
          <text x="297" y="65" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#0A2540">Create Checkout</text>
          <text x="297" y="78" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#FF6118">Session + fee</text>
          <line x1="377" y1="67" x2="401" y2="67" stroke="#533AFD" strokeWidth="1.5" markerEnd="url(#fa)" />

          {/* Step 3: Stripe charges */}
          <rect x="420" y="50" width="155" height="34" rx="4" fill="white" stroke="#533AFD" strokeWidth="1.5" />
          <text x="497" y="65" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#533AFD">Charge: $100.00</text>
          <text x="497" y="78" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#425466">destination charge</text>

          {/* Split */}
          <line x1="497" y1="86" x2="497" y2="120" stroke="#533AFD" strokeWidth="1.5" />
          <line x1="497" y1="120" x2="350" y2="120" stroke="#533AFD" strokeWidth="1" strokeDasharray="3,2" />
          <line x1="497" y1="120" x2="620" y2="120" stroke="#533AFD" strokeWidth="1.5" markerEnd="url(#fa)" />

          {/* Platform fee */}
          <rect x="230" y="128" width="155" height="34" rx="4" fill="white" stroke="#FF6118" strokeWidth="1.5" />
          <text x="307" y="143" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#FF6118">Platform Fee</text>
          <text x="307" y="156" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#FF6118">$2.50</text>

          {/* Restaurant receives */}
          <rect x="620" y="108" width="170" height="34" rx="4" fill="white" stroke="#30B130" strokeWidth="1.5" />
          <text x="705" y="123" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#30B130">Restaurant Receives</text>
          <text x="705" y="136" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#30B130">$97.50</text>

          {/* Payout trigger */}
          <line x1="705" y1="144" x2="705" y2="178" stroke="#FFC01F" strokeWidth="1.5" strokeDasharray="4,3" />
          <rect x="620" y="180" width="170" height="34" rx="4" fill="white" stroke="#FFC01F" strokeWidth="1.5" />
          <text x="705" y="195" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#92400E">Manual Payout</text>
          <text x="705" y="208" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="600" fill="#92400E">→ Bank account</text>

          {/* Webhook back */}
          <line x1="401" y1="185" x2="377" y2="185" stroke="#95A4BA" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#faGray)" />
          <text x="388" y="198" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="8" fill="#95A4BA">payment_intent.succeeded</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-x-auto rounded-lg border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#425466' }}>
        L200 — Track B: Kalapa Hotels Fund Flow
      </p>
      <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ minWidth: 600 }}>
        <defs>
          <marker id="fb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#533AFD" />
          </marker>
          <marker id="fbGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#95A4BA" />
          </marker>
          <marker id="fbCyan" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#00A1C2" />
          </marker>
        </defs>

        <rect x="5" y="5" width="190" height="280" rx="6" fill="#F0F4FF" stroke="#E6EBF1" strokeWidth="1" />
        <rect x="205" y="5" width="190" height="280" rx="6" fill="#FFF8F5" stroke="#E6EBF1" strokeWidth="1" />
        <rect x="405" y="5" width="190" height="280" rx="6" fill="#F0F4FF" stroke="#E6EBF1" strokeWidth="1" />
        <rect x="605" y="5" width="205" height="280" rx="6" fill="#F5FFF7" stroke="#E6EBF1" strokeWidth="1" />

        <text x="100" y="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#4498FF">Guest</text>
        <text x="300" y="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#FF6118">Kalapa Platform</text>
        <text x="500" y="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#533AFD">Stripe</text>
        <text x="707" y="28" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#30B130">Hotel Property</text>

        {/* Check-in: card on file */}
        <rect x="20" y="50" width="160" height="34" rx="4" fill="white" stroke="#4498FF" strokeWidth="1.5" />
        <text x="100" y="65" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#0A2540">Check-in</text>
        <text x="100" y="78" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#4498FF">Save card on file</text>
        <line x1="182" y1="67" x2="201" y2="67" stroke="#533AFD" strokeWidth="1.5" markerEnd="url(#fb)" />

        {/* Pre-auth */}
        <rect x="218" y="50" width="160" height="34" rx="4" fill="white" stroke="#FF6118" strokeWidth="1.5" />
        <text x="297" y="65" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#0A2540">Pre-Auth Hold</text>
        <text x="297" y="78" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#FF6118">$200 estimate</text>
        <line x1="380" y1="67" x2="401" y2="67" stroke="#533AFD" strokeWidth="1.5" markerEnd="url(#fb)" />

        <rect x="418" y="50" width="160" height="34" rx="4" fill="white" stroke="#533AFD" strokeWidth="1.5" />
        <text x="497" y="65" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#533AFD">Auth hold placed</text>
        <text x="497" y="78" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#425466">capture_method: manual</text>

        {/* Stay period */}
        <line x1="100" y1="86" x2="100" y2="118" stroke="#4498FF" strokeWidth="1" strokeDasharray="3,2" />
        <text x="100" y="113" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#425466">[ stay in progress ]</text>

        {/* Off-session charges */}
        <rect x="20" y="120" width="160" height="34" rx="4" fill="white" stroke="#00A1C2" strokeWidth="1.5" />
        <text x="100" y="135" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#00A1C2">Off-session charge</text>
        <text x="100" y="148" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#425466">minibar / room service</text>
        <line x1="182" y1="137" x2="201" y2="137" stroke="#00A1C2" strokeWidth="1.5" markerEnd="url(#fbCyan)" />
        <rect x="218" y="120" width="160" height="34" rx="4" fill="white" stroke="#00A1C2" strokeWidth="1.5" />
        <text x="297" y="137" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#00A1C2">Confirm off-session PI</text>

        {/* Checkout / folio capture */}
        <rect x="218" y="180" width="160" height="34" rx="4" fill="white" stroke="#FF6118" strokeWidth="1.5" />
        <text x="297" y="195" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#0A2540">Folio Capture</text>
        <text x="297" y="208" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#FF6118">Actual: $183</text>
        <line x1="380" y1="197" x2="401" y2="197" stroke="#533AFD" strokeWidth="1.5" markerEnd="url(#fb)" />

        <rect x="418" y="180" width="160" height="34" rx="4" fill="white" stroke="#533AFD" strokeWidth="1.5" />
        <text x="497" y="195" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#533AFD">Capture charge: $183</text>
        <line x1="580" y1="197" x2="601" y2="197" stroke="#533AFD" strokeWidth="1.5" markerEnd="url(#fb)" />

        <rect x="618" y="180" width="170" height="34" rx="4" fill="white" stroke="#30B130" strokeWidth="1.5" />
        <text x="703" y="195" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#30B130">Property Receives</text>
        <text x="703" y="208" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#30B130">$178.10 (net)</text>

        <line x1="100" y1="156" x2="100" y2="178" stroke="#4498FF" strokeWidth="1" strokeDasharray="3,2" />
        <text x="100" y="174" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="8" fill="#425466">check-out</text>
      </svg>
    </div>
  );
}
