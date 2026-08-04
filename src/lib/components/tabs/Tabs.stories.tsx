import { useState } from 'react';
import { Tabs, TabsProps } from './Tabs';

const story = {
  title: 'JSX/Tabs',
  component: Tabs,
  argTypes: {
    tabs: {
      description: 'Array of tab items with id and label',
    },
    activeIndex: {
      description: 'The currently active tab index',
    },
    onTabChange: {
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    className: {
      description: 'Optional CSS class to apply to the tabs container',
    },
  },
  args: {
    tabs: [
      { id: 'basic', label: 'Basic' },
      { id: 'standard', label: 'Standard' },
      { id: 'premium', label: 'Premium' },
    ],
    activeIndex: 0,
  },
  parameters: {
    componentSubtitle:
      'A horizontal tab bar for switching between content sections.',
  },
};

export const Default = {
  render: ({ tabs, activeIndex, onTabChange }: TabsProps) => {
    const [index, setIndex] = useState(activeIndex);

    const handleChange = (newIndex: number) => {
      onTabChange?.(newIndex);
      setIndex(newIndex);
    };

    return <Tabs tabs={tabs} activeIndex={index} onTabChange={handleChange} />;
  },

  name: 'Default',
};

export const TwoTabs = {
  render: () => {
    const [index, setIndex] = useState(0);

    return (
      <Tabs
        tabs={[
          { id: 'monthly', label: 'Monthly' },
          { id: 'yearly', label: 'Yearly' },
        ]}
        activeIndex={index}
        onTabChange={setIndex}
      />
    );
  },

  name: 'Two Tabs',
};

export const ManyTabs = {
  render: () => {
    const [index, setIndex] = useState(0);

    return (
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'coverage', label: 'Coverage' },
          { id: 'pricing', label: 'Pricing' },
          { id: 'reviews', label: 'Reviews' },
          { id: 'faq', label: 'FAQ' },
        ]}
        activeIndex={index}
        onTabChange={setIndex}
      />
    );
  },

  name: 'Many Tabs',
};

export default story;
