import React, { createContext, useContext } from 'react'; // v2
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useProgress } from './hooks/useProgress';
import Layout from './components/Layout';

// Getting Started pages
import Program from './pages/getting-started/Program';
import Objectives from './pages/getting-started/Objectives';
import ArchitectureOverview from './pages/getting-started/ArchitectureOverview';
import Prerequisites from './pages/getting-started/Prerequisites';
import StripeAccount from './pages/getting-started/StripeAccount';
import EnvironmentSetup from './pages/getting-started/EnvironmentSetup';

// Module 1 pages
import WhatIsConnect from './pages/module-1/WhatIsConnect';
import ConnectedAccounts from './pages/module-1/ConnectedAccounts';
import UnifiedAccounts from './pages/module-1/UnifiedAccounts';
import DestinationCharges from './pages/module-1/DestinationCharges';
import Terminal from './pages/module-1/Terminal';
import ModuleReview from './pages/module-1/ModuleReview';

// Module 2 pages
import M2Overview from './pages/module-2/Overview';
import Task1ConnectedAccounts from './pages/module-2/Task1ConnectedAccounts';
import Task2OnlinePayment from './pages/module-2/Task2OnlinePayment';
import Task3TerminalPayment from './pages/module-2/Task3TerminalPayment';
import Task4Webhook from './pages/module-2/Task4Webhook';

// Module 3 pages
import TrackSelect from './pages/module-3/TrackSelect';
import TrackAOverview from './pages/module-3/track-a/Overview';
import TrackATask1 from './pages/module-3/track-a/Task1Payout';
import TrackATask2 from './pages/module-3/track-a/Task2Clawback';
import TrackATask3 from './pages/module-3/track-a/Task3FeeTier';
import TrackBOverview from './pages/module-3/track-b/Overview';
import TrackBTask1 from './pages/module-3/track-b/Task1PreAuth';
import TrackBTask2 from './pages/module-3/track-b/Task2OffSession';
import TrackCOverview from './pages/module-3/track-c/Overview';
import TrackCTask1 from './pages/module-3/track-c/Task1Platform';
import TrackCTask2 from './pages/module-3/track-c/Task2VerticalLogic';
import TrackCTask3 from './pages/module-3/track-c/Task3Document';

// Module 4 pages
import TrackASP2 from './pages/module-4/TrackASP2';
import TrackBSP2 from './pages/module-4/TrackBSP2';

// Other pages
import WorkshopComplete from './pages/WorkshopComplete';
import MultiMarket from './pages/bonus/MultiMarket';
import AdvancedConfigs from './pages/bonus/AdvancedConfigs';

export type ProgressContextType = ReturnType<typeof useProgress>;
export const ProgressContext = createContext<ProgressContextType | null>(null);

export function useProgressContext() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgressContext must be used within ProgressContext.Provider');
  return ctx;
}

export default function App() {
  const progress = useProgress();

  return (
    <ProgressContext.Provider value={progress}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/getting-started/program" replace />} />
            <Route path="getting-started/program" element={<Program />} />
            <Route path="getting-started/objectives" element={<Objectives />} />
            <Route path="getting-started/architecture" element={<ArchitectureOverview />} />
            <Route path="getting-started/prerequisites" element={<Prerequisites />} />
            <Route path="getting-started/stripe-account" element={<StripeAccount />} />
            <Route path="getting-started/environment-setup" element={<EnvironmentSetup />} />
            <Route path="module-1/what-is-connect" element={<WhatIsConnect />} />
            <Route path="module-1/connected-accounts" element={<ConnectedAccounts />} />
            <Route path="module-1/unified-accounts" element={<UnifiedAccounts />} />
            <Route path="module-1/destination-charges" element={<DestinationCharges />} />
            <Route path="module-1/terminal" element={<Terminal />} />
            <Route path="module-1/module-review" element={<ModuleReview />} />
            <Route path="module-2/overview" element={<M2Overview />} />
            <Route path="module-2/task-1" element={<Task1ConnectedAccounts />} />
            <Route path="module-2/task-2" element={<Task2OnlinePayment />} />
            <Route path="module-2/task-3" element={<Task3TerminalPayment />} />
            <Route path="module-2/task-4" element={<Task4Webhook />} />
            <Route path="module-3/track-select" element={<TrackSelect />} />
            <Route path="module-3/track-a/overview" element={<TrackAOverview />} />
            <Route path="module-3/track-a/task-1" element={<TrackATask1 />} />
            <Route path="module-3/track-a/task-2" element={<TrackATask2 />} />
            <Route path="module-3/track-a/task-3" element={<TrackATask3 />} />
            <Route path="module-3/track-b/overview" element={<TrackBOverview />} />
            <Route path="module-3/track-b/task-1" element={<TrackBTask1 />} />
            <Route path="module-3/track-b/task-2" element={<TrackBTask2 />} />
            <Route path="module-3/track-c/overview" element={<TrackCOverview />} />
            <Route path="module-3/track-c/task-1" element={<TrackCTask1 />} />
            <Route path="module-3/track-c/task-2" element={<TrackCTask2 />} />
            <Route path="module-3/track-c/task-3" element={<TrackCTask3 />} />
            <Route path="module-4/track-a" element={<TrackASP2 />} />
            <Route path="module-4/track-b" element={<TrackBSP2 />} />
            <Route path="lab-complete" element={<WorkshopComplete />} />
            <Route path="bonus/multi-market" element={<MultiMarket />} />
            <Route path="bonus/advanced-configs" element={<AdvancedConfigs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressContext.Provider>
  );
}
