import { useState, useCallback } from 'react';
import { getAllCheckpoints } from '../config/navigation';

const STORAGE_KEY = 'psl_lab_progress';

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const markComplete = useCallback((checkpointId: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(checkpointId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const markIncomplete = useCallback((checkpointId: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.delete(checkpointId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setCompleted(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const totalCheckpoints = getAllCheckpoints().length;
  const completedCount = completed.size;
  const percentComplete = totalCheckpoints > 0 ? Math.round((completedCount / totalCheckpoints) * 100) : 0;

  return { completed, markComplete, markIncomplete, resetAll, totalCheckpoints, completedCount, percentComplete };
}
