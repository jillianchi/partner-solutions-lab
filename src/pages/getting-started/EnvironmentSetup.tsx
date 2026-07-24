import React from 'react';
import CodeBlock from '../../components/CodeBlock';
import Checkpoint from '../../components/Checkpoint';
import Callout from '../../components/Callout';
import PageNav from '../../components/PageNav';
import { getAllPages } from '../../config/navigation';

const pages = getAllPages();
const currentIdx = pages.findIndex(p => p.id === 'environment-setup');
const prevPage = pages[currentIdx - 1];
const nextPage = pages[currentIdx + 1];

export default function EnvironmentSetup() {
  return (
    <div>
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: '#EEF2FF', color: '#635BFF' }}>
        Getting Started
      </div>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#0A2540' }}>Environment Setup</h1>
      <p className="text-lg mb-6" style={{ color: '#425466' }}>
        Clone the starter repo, configure your environment variables, and start the development server.
      </p>

      {/* Step 1 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#0A2540' }}>1. Clone the Starter Repository</h2>
        <p className="text-sm mb-2" style={{ color: '#425466' }}>
          The starter repo contains a minimal Express backend and React frontend with stub files for each task.
        </p>
        <CodeBlock
          language="bash"
          filename="Terminal"
          code={`git clone https://github.com/stripe-samples/partner-solutions-lab-starter.git
cd partner-solutions-lab-starter`}
        />
        <Callout type="info" title="Starter repo URL">
          The final GitHub URL will be shared by the Stripe team before the lab. If self-pacing, check with your Stripe partner manager.
        </Callout>
        <Checkpoint
          id="gs-repo-cloned"
          label="Repository cloned and directory opened"
          description="Run ls in the directory and confirm you can see server/, client/, and .env.example"
        />
      </div>

      {/* Step 2 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#0A2540' }}>2. Install Dependencies</h2>
        <CodeBlock
          language="bash"
          filename="Terminal"
          code={`npm install`}
        />
      </div>

      {/* Step 3 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#0A2540' }}>3. Configure Environment Variables</h2>
        <p className="text-sm mb-2" style={{ color: '#425466' }}>
          Copy the example env file and fill in your Stripe API keys from the previous step.
        </p>
        <CodeBlock
          language="bash"
          filename="Terminal"
          code={`cp .env.example .env`}
        />
        <CodeBlock
          language="bash"
          filename=".env"
          code={`# Stripe API Keys (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Webhook signing secret (get from: stripe listen --print-secret)
STRIPE_WEBHOOK_SECRET=whsec_...

# Server config
PORT=3000
NODE_ENV=development`}
        />
        <Callout type="warning" title="Never commit .env">
          The .gitignore already excludes .env — double-check before your first commit.
        </Callout>
        <Checkpoint
          id="gs-env-configured"
          label="Environment variables configured"
          description="Confirm .env has your sk_test_ and pk_test_ keys and the file is NOT tracked by git."
        />
      </div>

      {/* Step 4 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#0A2540' }}>4. Start the Development Server</h2>
        <CodeBlock
          language="bash"
          filename="Terminal"
          code={`npm run dev`}
        />
        <p className="text-sm mb-2" style={{ color: '#425466' }}>Verify the server is running:</p>
        <CodeBlock
          language="bash"
          filename="Terminal"
          code={`curl localhost:3000/health
# Expected: { "status": "ok", "stripe": "connected" }`}
        />
        <p className="text-sm mb-2 mt-3" style={{ color: '#425466' }}>In a separate terminal, start the Stripe CLI webhook listener:</p>
        <CodeBlock
          language="bash"
          filename="Terminal (tab 2)"
          code={`stripe listen --forward-to localhost:3000/webhook`}
        />
        <Checkpoint
          id="gs-server-running"
          label="Server running and health check passing"
          description="Confirm curl localhost:3000/health returns { status: 'ok' } and stripe listen is forwarding events."
        />
      </div>

      <PageNav prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}
