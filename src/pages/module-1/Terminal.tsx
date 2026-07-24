import React from 'react';
import { ExternalLink } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import L300Sequence from '../../components/diagrams/L300Sequence';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'terminal');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function Terminal() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 1: Foundation Concepts
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Stripe Terminal</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Stripe Terminal extends Connect to physical payment acceptance — the same API, the same fund flow, but card-present via hardware readers.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>What is Terminal?</h2>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        Terminal lets your POS application accept chip, tap, and swipe payments using Stripe-certified readers. In this lab, you'll use the <strong>S710</strong> — a compact Bluetooth reader certified for Singapore.
      </p>
      <p className="text-sm mb-4" style={{ color: '#425466' }}>
        The key difference from online payments: with Terminal, the customer presents their card physically. The SDK handles the card read, and your server-side code creates and confirms the PaymentIntent.
      </p>

      <h2 className="text-xl font-semibold mb-3" style={{ color: '#0A2540' }}>Terminal with Connect</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        Terminal payments work with destination charges exactly like online payments — you specify <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>transfer_data.destination</code> on the PaymentIntent and Stripe routes the funds accordingly.
      </p>

      <CodeBlock
        language="javascript"
        filename="server/routes/terminal.js"
        code={`// 1. Create a connection token (called from POS app on load)
const connectionToken = await stripe.terminal.connectionTokens.create({
  location: 'tml_abc123', // Your registered location ID
});

// 2. Create a PaymentIntent for Terminal (server-side)
const paymentIntent = await stripe.paymentIntents.create({
  amount: 8500, // $85.00
  currency: 'sgd',
  payment_method_types: ['card_present'],
  capture_method: 'automatic',
  application_fee_amount: 215, // 2.5% platform fee
  transfer_data: {
    destination: 'acct_1P...', // Restaurant's connected account
  },
});

// Return client_secret to the POS app
return { clientSecret: paymentIntent.client_secret };`}
      />

      <L300Sequence scenario="terminal" />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>S710 Setup</h2>
      <div className="space-y-2 mb-4">
        {[
          'Register a Location in the Stripe Dashboard (Dashboard → Terminal → Locations)',
          'Register the S710 reader to your location',
          'Install the Stripe Terminal SDK in your POS app',
          'Call connectBluetoothReader() in your app to pair the device',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>{i + 1}</span>
            <p className="text-sm" style={{ color: '#425466' }}>{step}</p>
          </div>
        ))}
      </div>

      <Callout type="tip" title="Workshop: simulated reader">
        In this lab you can use the Stripe Terminal simulator if a physical S710 is not available.
        Call <code>discoverReaders({'{'} simulated: true {'}'} )</code> in the Terminal SDK to use the built-in simulator.
      </Callout>

      <Callout type="info">
        <a href="https://stripe.com/docs/terminal" target="_blank" rel="noreferrer" className="flex items-center gap-1" style={{ color: '#1E40AF', textDecoration: 'none' }}>
          <ExternalLink size={12} />
          Stripe Terminal documentation
        </a>
      </Callout>

      <Checkpoint
        id="m1-terminal-understood"
        label="I understand Stripe Terminal and how it integrates with Connect"
        description="Can you describe the connection token flow and how a Terminal PaymentIntent differs from an online one?"
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
