import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  storageKey?: string;
}

export default function Tabs({ tabs, storageKey }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (storageKey) {
      return localStorage.getItem(`tab_${storageKey}`) || tabs[0]?.id || '';
    }
    return tabs[0]?.id || '';
  });

  const selectTab = (id: string) => {
    setActiveTab(id);
    if (storageKey) {
      localStorage.setItem(`tab_${storageKey}`, id);
    }
  };

  const activeContent = tabs.find(t => t.id === activeTab)?.children;

  return (
    <div className="my-4">
      <div className="flex border-b" style={{ borderColor: '#E6EBF1' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => selectTab(tab.id)}
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              borderBottom: activeTab === tab.id ? '2px solid #635BFF' : '2px solid transparent',
              color: activeTab === tab.id ? '#635BFF' : '#425466',
              background: 'none',
              cursor: 'pointer',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{activeContent}</div>
    </div>
  );
}
