import React from 'react';
import CodeBlock from '../../components/CodeBlock';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import L300Sequence from '../../components/diagrams/L300Sequence';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'task-3');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function Task3TerminalPayment() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 2: Core Module
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Task 2.3: Terminal Payment</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Implement a card-present payment using Stripe Terminal. The same destination charge model applies — Stripe just collects the card details from a physical reader instead of a browser form.
      </p>

      <L300Sequence scenario="terminal" />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Step 1: Connection Token Endpoint</h2>
      <CodeBlock
        language="javascript"
        filename="server/routes/terminal.js"
        code={`// Called by the POS app when it loads — authenticates the reader
router.post('/terminal/connection-token', async (req, res) => {
  // TODO: Create a Terminal connection token
  // const token = await stripe.terminal.connectionTokens.create()
  res.json({ secret: token.secret });
});`}
      />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Step 2: Create PaymentIntent for Terminal</h2>
      <CodeBlock
        language="javascript"
        filename="server/routes/terminal.js"
        code={`router.post('/terminal/payment-intent', async (req, res) => {
  const { merchantId, amount } = req.body;

  // TODO: Create PaymentIntent with card_present payment method type
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount,
  //   currency: 'sgd',
  //   payment_method_types: ['card_present'],
  //   capture_method: 'automatic',
  //   application_fee_amount: Math.round(amount * 0.025),
  //   transfer_data: { destination: merchant.stripe_account_id },
  // })

  res.json({ clientSecret: paymentIntent.client_secret });
});`}
      />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Step 3: POS App (Client-Side)</h2>
      <CodeBlock
        language="javascript"
        filename="client/terminal.js"
        code={`import { loadStripeTerminal } from '@stripe/terminal-js';

const terminal = await loadStripeTerminal().create({
  onFetchConnectionToken: async () => {
    const { secret } = await fetch('/terminal/connection-token', { method: 'POST' }).then(r => r.json());
    return secret;
  },
  onUnexpectedReaderDisconnect: () => console.log('Reader disconnected'),
});

// Discover and connect to reader (or simulator)
const { discoveredReaders } = await terminal.discoverReaders({ simulated: true });
await terminal.connectBluetoothReader(discoveredReaders[0]);

// Collect payment
const { clientSecret } = await fetch('/terminal/payment-intent', {
  method: 'POST',
  body: JSON.stringify({ merchantId, amount }),
}).then(r => r.json());

const { paymentIntent } = await terminal.collectPaymentMethod(clientSecret);
await terminal.confirmPaymentIntent(paymentIntent);`}
      />

      <Callout type="tip" title="Use the simulator if no reader available">
        Pass <code>simulated: true</code> to <code>discoverReaders()</code> to use the built-in software simulator.
        No physical hardware required for the lab.
      </Callout>

      <Checkpoint
        id="m2-terminal-payment-complete"
        label="Terminal payment completed (simulator or physical reader)"
        description="A card_present PaymentIntent appears as succeeded in your Dashboard."
      />
      <Checkpoint
        id="m2-split-verified"
        label="Fund split verified — platform fee retained, remainder transferred"
        description="Check the PaymentIntent in Dashboard and confirm transfer_data.destination received the correct amount."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
