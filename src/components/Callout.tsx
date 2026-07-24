import React from 'react';
import { Info, AlertTriangle, Lightbulb, Zap } from 'lucide-react';

interface CalloutProps {
  type: 'info' | 'warning' | 'tip' | 'decision';
  title?: string;
  children: React.ReactNode;
}

const config = {
  info: {
    bg: '#EFF6FF',
    border: '#3B82F6',
    text: '#1E40AF',
    icon: Info,
    defaultTitle: 'Info',
  },
  warning: {
    bg: '#FFFBEB',
    border: '#FF8C00',
    text: '#92400E',
    icon: AlertTriangle,
    defaultTitle: 'Warning',
  },
  tip: {
    bg: '#F0FFF4',
    border: '#30B130',
    text: '#166534',
    icon: Lightbulb,
    defaultTitle: 'Tip',
  },
  decision: {
    bg: '#EEF2FF',
    border: '#635BFF',
    text: '#3730A3',
    icon: Zap,
    defaultTitle: 'Decision Point',
  },
};

export default function Callout({ type, title, children }: CalloutProps) {
  const { bg, border, text, icon: Icon, defaultTitle } = config[type];

  return (
    <div
      className="rounded-lg p-4 my-4"
      style={{
        backgroundColor: bg,
        borderLeft: `4px solid ${border}`,
      }}
    >
      <div className="flex items-start gap-3">
        <Icon size={16} style={{ color: border, flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: text }}>
            {title || defaultTitle}
          </p>
          <div className="text-sm" style={{ color: text }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
