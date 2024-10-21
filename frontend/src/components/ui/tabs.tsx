import React, { useState } from 'react';

interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  children: React.ReactNode;
}

interface TabsListProps {
  tabs: Tab[];
  selectedTab: string;
  onSelect: (value: string) => void;
}

const TabsList: React.FC<TabsListProps> = ({ tabs, selectedTab, onSelect }) => (
  <div className="flex border-b">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        className={`py-2 px-4 focus:outline-none ${selectedTab === tab.value ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => onSelect(tab.value)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

// Removed duplicate TabsContent declaration

export const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  return (
    <div>
      <TabsList tabs={tabs} selectedTab={selectedTab} onSelect={setSelectedTab} />
      <TabsContent value={selectedTab}>{children}</TabsContent>
    </div>
  );
};

export const TabsTrigger: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <div>{children}</div>
);

export const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <div>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.props.value === value) {
        return child;
      }
      return null;
    })}
  </div>
);
