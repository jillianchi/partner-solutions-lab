import React from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { useProgressContext } from '../App';

interface CheckpointProps {
  id: string;
  label: string;
  description?: string;
}

export default function Checkpoint({ id, label, description }: CheckpointProps) {
  const { completed, markComplete, markIncomplete } = useProgressContext();
  const isComplete = completed.has(id);

  const toggle = () => {
    if (isComplete) {
      markIncomplete(id);
    } else {
      markComplete(id);
    }
  };

  return (
    <button
      onClick={toggle}
      className="w-full text-left rounded-lg border-2 p-4 transition-all duration-200 my-2"
      style={{
        borderColor: isComplete ? '#30B130' : '#FF8C00',
        backgroundColor: isComplete ? '#F0FFF4' : '#FFFBF5',
        cursor: 'pointer',
      }}
    >
      <div className="flex items-start gap-3">
        <div style={{ flexShrink: 0, marginTop: 2 }}>
          {isComplete
            ? <CheckSquare size={20} style={{ color: '#30B130' }} />
            : <Square size={20} style={{ color: '#FF8C00' }} />
          }
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: isComplete ? '#166534' : '#92400E' }}>
              {label}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: isComplete ? '#DCFCE7' : '#FEF3C7',
                color: isComplete ? '#166534' : '#92400E',
              }}
            >
              {isComplete ? 'Complete' : 'Pending'}
            </span>
          </div>
          {description && (
            <p className="text-xs mt-1" style={{ color: isComplete ? '#166534' : '#92400E' }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
