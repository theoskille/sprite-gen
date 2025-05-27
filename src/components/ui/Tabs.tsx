'use client';

import { ReactNode, useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <>
      <div className="flex bg-[#27272a] rounded-t-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === tab.id 
                ? 'bg-black text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#18181b] rounded-b-lg p-6">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </>
  );
} 