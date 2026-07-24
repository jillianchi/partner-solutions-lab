import React from 'react';
import CodeBlock from '../../components/CodeBlock';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import L300Sequence from '../../components/diagrams/L300Sequence';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'task-4');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function Task4Webhook() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Module 2: Core Module
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Task 2.4: Reconciliation Webhook</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Implement a webhook handler that listens for <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>payment_intent.succeeded</code> events and updates your platform's order state.
      </p>

      <Callout type="warning" title="Never trust client-side redirects for order fulfilment">
        The Checkout success_url redirect can be intercepted or spoofed. Always use webhooks as the authoritative signal that a payment succeeded. Your success page should show a "processing" state and update when the webhook fires.
      </Callout>

      <L300Sequence scenario="webhook" />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Implement the Webhook Handler</h2>
      <CodeBlock
        language="javascript"
        filename="server/routes/webhook.js"
        code={`const express = require('express');
const router = express.Router();

// IMPORTANT: Must use raw body (not parsed JSON) for signature verification
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    // TODO: Verify the webhook signature
    // event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      // TODO: Find the order associated with this PaymentIntent
      // await db.orders.update(
      //   { stripe_payment_intent_id: paymentIntent.id },
      //   { status: 'paid', paid_at: new Date() }
      // )
      console.log(\`Payment \${paymentIntent.id} succeeded: \${paymentIntent.amount / 100} SGD\`);
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      // TODO: Mark order as failed, notify merchant
      break;
    }
    default:
      console.log(\`Unhandled event type: \${event.type}\`);
  }

  // Return 200 to acknowledge receipt
  res.json({ received: true });
});

module.exports = router;`}
      />

      <h2 className="text-xl font-semibold mb-3 mt-4" style={{ color: '#0A2540' }}>Test the Webhook</h2>
      <p className="text-sm mb-3" style={{ color: '#425466' }}>
        With <code className="text-xs px-1 py-0.5 rounded" style={{ backgroundColor: '#EEF2FF', color: '#533AFD' }}>stripe listen</code> running, trigger a test event:
      </p>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`# Forward events to your local server
stripe listen --forward-to localhost:3000/webhook

# In another terminal, trigger a test event
stripe trigger payment_intent.succeeded`}
      />

      <Callout type="tip" title="Idempotency">
        Stripe may deliver the same webhook event more than once. Your handler should be idempotent — check if the order is already marked as paid before updating it. Use the PaymentIntent ID as the deduplication key.
      </Callout>

      <Checkpoint
        id="m2-webhook-handler-written"
        label="Webhook handler implemented and tested with stripe trigger"
        description="The handler verifies the signature, handles payment_intent.succeeded, and returns HTTP 200."
      />

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
