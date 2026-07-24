import React from 'react';

type Scenario = 'account-creation' | 'checkout' | 'terminal' | 'webhook' | 'preauth';

interface Step {
  from: number;
  to: number;
  label: string;
  y: number;
  dashed?: boolean;
}

interface ScenarioData {
  title: string;
  actors: string[];
  steps: Step[];
}

const scenarios: Record<Scenario, ScenarioData> = {
  'account-creation': {
    title: 'Connected Account Creation',
    actors: ['Platform', 'Stripe API', 'Connected Acct'],
    steps: [
      { from: 0, to: 1, label: 'POST /v2/core/accounts', y: 100 },
      { from: 1, to: 2, label: 'Account provisioned (acct_xxx)', y: 140 },
      { from: 1, to: 0, label: '{ id: "acct_xxx" }', y: 175, dashed: true },
      { from: 0, to: 1, label: 'POST /v1/account_links (onboarding)', y: 215 },
      { from: 1, to: 0, label: 'onboarding URL', y: 250, dashed: true },
    ],
  },
  checkout: {
    title: 'Checkout Session with Destination Charge',
    actors: ['Customer', 'Platform', 'Stripe API'],
    steps: [
      { from: 0, to: 1, label: 'Initiate checkout', y: 100 },
      { from: 1, to: 2, label: 'POST /v1/checkout/sessions (destination=acct_xxx)', y: 135 },
      { from: 2, to: 1, label: 'session.url returned', y: 170, dashed: true },
      { from: 1, to: 0, label: 'Redirect to Stripe Checkout', y: 205, dashed: true },
      { from: 0, to: 2, label: 'Customer completes payment', y: 245 },
      { from: 2, to: 1, label: 'checkout.session.completed webhook', y: 280, dashed: true },
    ],
  },
  terminal: {
    title: 'Terminal In-Person Payment',
    actors: ['POS App', 'Platform Server', 'Stripe API', 'S710'],
    steps: [
      { from: 0, to: 1, label: 'Create payment', y: 90 },
      { from: 1, to: 2, label: 'POST /v1/payment_intents', y: 120 },
      { from: 2, to: 1, label: 'client_secret', y: 150, dashed: true },
      { from: 1, to: 0, label: 'client_secret', y: 180, dashed: true },
      { from: 0, to: 3, label: 'collectPaymentMethod(client_secret)', y: 210 },
      { from: 3, to: 0, label: 'Card tap / insert', y: 240, dashed: true },
      { from: 0, to: 2, label: 'confirmPaymentIntent()', y: 270 },
      { from: 2, to: 0, label: 'payment_intent.succeeded', y: 300, dashed: true },
    ],
  },
  webhook: {
    title: 'Webhook Reconciliation Handler',
    actors: ['Stripe', 'Webhook Handler', 'Platform DB'],
    steps: [
      { from: 0, to: 1, label: 'POST /webhook payment_intent.succeeded', y: 100 },
      { from: 1, to: 1, label: 'Verify Stripe-Signature header', y: 140 },
      { from: 1, to: 2, label: 'Upsert payment record', y: 180 },
      { from: 2, to: 1, label: 'ACK', y: 215, dashed: true },
      { from: 1, to: 0, label: 'HTTP 200', y: 250, dashed: true },
    ],
  },
  preauth: {
    title: 'Pre-Auth & Folio Capture (Hotel)',
    actors: ['PMS', 'Stripe API', 'Guest Card'],
    steps: [
      { from: 0, to: 1, label: 'POST /v1/payment_intents  capture_method=manual', y: 100 },
      { from: 1, to: 2, label: 'Authorize $200 hold', y: 135 },
      { from: 2, to: 1, label: 'Auth confirmed', y: 168, dashed: true },
      { from: 1, to: 0, label: 'pi.status = requires_capture', y: 200, dashed: true },
      { from: 0, to: 1, label: 'POST /v1/payment_intents/:id/capture  amount=18300', y: 240 },
      { from: 1, to: 2, label: 'Capture $183', y: 273 },
      { from: 1, to: 0, label: 'pi.status = succeeded', y: 305, dashed: true },
    ],
  },
};

interface L300SequenceProps {
  scenario: Scenario;
}

export default function L300Sequence({ scenario }: L300SequenceProps) {
  const data = scenarios[scenario];
  if (!data) return null;

  const actorCount = data.actors.length;
  const svgWidth = 800;
  const maxY = Math.max(...data.steps.map(s => s.y));
  const svgHeight = maxY + 50;
  const actorSpacing = svgWidth / (actorCount + 1);
  const actorXs = data.actors.map((_, i) => actorSpacing * (i + 1));

  return (
    <div className="my-6 overflow-x-auto rounded-lg border p-4 bg-white" style={{ borderColor: '#E6EBF1' }}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#425466' }}>
        L300 — {data.title}
      </p>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ minWidth: 500 }}>
        <defs>
          <marker id="seqBlurple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#533AFD" />
          </marker>
          <marker id="seqGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#95A4BA" />
          </marker>
        </defs>

        {/* Actor boxes */}
        {data.actors.map((actor, i) => (
          <g key={i}>
            <rect
              x={actorXs[i] - 65}
              y={30}
              width={130}
              height={32}
              rx="4"
              fill="white"
              stroke="#635BFF"
              strokeWidth="1.5"
            />
            <text
              x={actorXs[i]}
              y={51}
              textAnchor="middle"
              fontFamily="Inter,sans-serif"
              fontSize="11"
              fontWeight="600"
              fill="#0A2540"
            >
              {actor}
            </text>
            {/* Lifeline */}
            <line
              x1={actorXs[i]}
              y1={63}
              x2={actorXs[i]}
              y2={svgHeight - 10}
              stroke="#E6EBF1"
              strokeWidth="1"
              strokeDasharray="4,3"
            />
          </g>
        ))}

        {/* Steps */}
        {data.steps.map((step, i) => {
          const fromX = actorXs[step.from];
          const toX = actorXs[step.to];
          const isSelf = step.from === step.to;
          const color = step.dashed ? '#95A4BA' : '#533AFD';
          const marker = step.dashed ? 'url(#seqGray)' : 'url(#seqBlurple)';
          const midX = (fromX + toX) / 2;

          if (isSelf) {
            return (
              <g key={i}>
                <path
                  d={`M${fromX} ${step.y} C${fromX + 45} ${step.y} ${fromX + 45} ${step.y + 22} ${fromX} ${step.y + 22}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.5"
                  markerEnd={marker}
                />
                <text
                  x={fromX + 50}
                  y={step.y + 14}
                  fontFamily="Inter,sans-serif"
                  fontSize="9"
                  fill={color}
                >
                  {step.label}
                </text>
              </g>
            );
          }

          return (
            <g key={i}>
              <line
                x1={fromX}
                y1={step.y}
                x2={toX}
                y2={step.y}
                stroke={color}
                strokeWidth="1.5"
                strokeDasharray={step.dashed ? '5,3' : undefined}
                markerEnd={marker}
              />
              <text
                x={midX}
                y={step.y - 5}
                textAnchor="middle"
                fontFamily="Inter,sans-serif"
                fontSize="9"
                fill={color}
              >
                {step.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
