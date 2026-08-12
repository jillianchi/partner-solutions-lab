export interface NavPage {
  id: string;
  label: string;
  path: string;
  checkpoints?: string[];
}

export interface NavGroup {
  id: string;
  label: string;
  color?: string;
  pages: NavPage[];
}

// A module item is either a standalone page or a collapsible group of pages
export type NavItem = NavPage | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return 'pages' in item;
}

export interface NavModule {
  id: string;
  label: string;
  items: NavItem[];
}

export const navigation: NavModule[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    items: [
      { id: 'program', label: 'Partner Solutions Program', path: '/getting-started/program' },
      { id: 'objectives', label: 'Objectives', path: '/getting-started/objectives', checkpoints: ['gs-objectives-read'] },
      { id: 'architecture', label: 'Architecture Overview', path: '/getting-started/architecture', checkpoints: ['gs-arch-reviewed'] },
      { id: 'prerequisites', label: 'Prerequisites', path: '/getting-started/prerequisites', checkpoints: ['gs-prereqs-installed'] },
      { id: 'stripe-account', label: 'Stripe Account', path: '/getting-started/stripe-account', checkpoints: ['gs-account-ready'] },
      { id: 'environment-setup', label: 'Environment Setup', path: '/getting-started/environment-setup', checkpoints: ['gs-repo-cloned', 'gs-env-configured', 'gs-server-running'] },
    ],
  },
  {
    id: 'module-1',
    label: 'Module 1: Foundation Concepts',
    items: [
      { id: 'what-is-connect', label: 'What is Stripe Connect?', path: '/module-1/what-is-connect', checkpoints: ['m1-connect-understood'] },
      { id: 'connected-accounts', label: 'Connected Accounts', path: '/module-1/connected-accounts', checkpoints: ['m1-accounts-understood'] },
      { id: 'unified-accounts', label: 'Designing Your Integration', path: '/module-1/unified-accounts', checkpoints: ['m1-ua-config-chosen'] },
      { id: 'destination-charges', label: 'Destination Charges', path: '/module-1/destination-charges', checkpoints: ['m1-charge-model-understood'] },
      { id: 'terminal', label: 'Stripe Terminal', path: '/module-1/terminal', checkpoints: ['m1-terminal-understood'] },
      { id: 'module-review', label: 'Module Review', path: '/module-1/module-review', checkpoints: ['m1-review-complete'] },
    ],
  },
  {
    id: 'module-2',
    label: 'Module 2: Core Module',
    items: [
      { id: 'overview', label: 'Overview', path: '/module-2/overview' },
      { id: 'task-1', label: '2.1 Connected Accounts', path: '/module-2/task-1', checkpoints: ['m2-accounts-created', 'm2-decisions-documented'] },
      { id: 'task-2', label: '2.2 Online Payment', path: '/module-2/task-2', checkpoints: ['m2-checkout-session-created', 'm2-fee-verified'] },
      { id: 'task-3', label: '2.3 Terminal Payment', path: '/module-2/task-3', checkpoints: ['m2-terminal-payment-complete', 'm2-split-verified'] },
      { id: 'task-4', label: '2.4 Reconciliation Hook', path: '/module-2/task-4', checkpoints: ['m2-webhook-handler-written'] },
    ],
  },
  {
    id: 'module-3',
    label: 'Module 3: Vertical Logic',
    items: [
      { id: 'track-select', label: 'Choose Your Track', path: '/module-3/track-select' },
      {
        id: 'track-a',
        label: 'Track A: TableOS',
        pages: [
          { id: 'track-a-overview', label: 'Overview', path: '/module-3/track-a/overview' },
          { id: 'track-a-1', label: '3A.1 Manual Payout', path: '/module-3/track-a/task-1', checkpoints: ['m3a-payout-triggered'] },
          { id: 'track-a-2', label: '3A.2 Refund with Clawback', path: '/module-3/track-a/task-2', checkpoints: ['m3a-clawback-complete'] },
          { id: 'track-a-3', label: '3A.3 Dynamic Fee Tier', path: '/module-3/track-a/task-3', checkpoints: ['m3a-fee-tier-implemented'] },
        ],
      },
      {
        id: 'track-b',
        label: 'Track B: Kalapa Hotels',
        pages: [
          { id: 'track-b-overview', label: 'Overview', path: '/module-3/track-b/overview' },
          { id: 'track-b-1', label: '3B.1 Pre-Auth & Folio Capture', path: '/module-3/track-b/task-1', checkpoints: ['m3b-preauth-complete', 'm3b-capture-complete'] },
          { id: 'track-b-2', label: '3B.2 Off-Session Charge', path: '/module-3/track-b/task-2', checkpoints: ['m3b-offsession-complete'] },
        ],
      },
      {
        id: 'track-c',
        label: 'Track C: Bring Your Own',
        pages: [
          { id: 'track-c-overview', label: 'Define Your Scenario', path: '/module-3/track-c/overview', checkpoints: ['m3c-scenario-defined'] },
          { id: 'track-c-1', label: '3C.1 Platform Structure', path: '/module-3/track-c/task-1', checkpoints: ['m3c-platform-defined'] },
          { id: 'track-c-2', label: '3C.2 Vertical Logic', path: '/module-3/track-c/task-2', checkpoints: ['m3c-vertical-logic-built'] },
          { id: 'track-c-3', label: '3C.3 Document Your Accelerator', path: '/module-3/track-c/task-3', checkpoints: ['m3c-decisions-documented'] },
        ],
      },
    ],
  },
  {
    id: 'module-4',
    label: 'Module 4: Solution Pitch',
    items: [
      { id: 'track-a-sp2', label: 'Track A: TableOS Pay', path: '/module-4/track-a', checkpoints: ['m4a-my-account-created', 'm4a-decisions-documented'] },
      { id: 'track-b-sp2', label: 'Track B: Kalapa Connect', path: '/module-4/track-b', checkpoints: ['m4b-dispute-resolved', 'm4b-decisions-documented'] },
    ],
  },
  {
    id: 'lab-complete',
    label: 'Lab Complete',
    items: [
      { id: 'complete', label: 'Architecture Review', path: '/lab-complete', checkpoints: ['ws-arch-reviewed', 'ws-accelerator-named'] },
    ],
  },
  {
    id: 'bonus',
    label: 'Bonus: Advanced Topics',
    items: [
      { id: 'multi-market', label: 'Multi-Market Expansion', path: '/bonus/multi-market' },
      { id: 'advanced-configs', label: 'PSP/PSS Configurations', path: '/bonus/advanced-configs' },
    ],
  },
];

export const getAllCheckpoints = (): string[] => {
  return navigation.flatMap(m =>
    m.items.flatMap(item =>
      isNavGroup(item)
        ? item.pages.flatMap(p => p.checkpoints || [])
        : (item.checkpoints || [])
    )
  );
};

export const getAllPages = (): NavPage[] => {
  return navigation.flatMap(m =>
    m.items.flatMap(item => isNavGroup(item) ? item.pages : [item])
  );
};
