import { useState } from 'react';
import SegmentedControl, { SegmentedControlProps } from '.';

const story = {
  title: 'JSX/SegmentedControl',
  argTypes: {
    values: {
      type: { required: true },
      control: { type: 'object' },
      description: 'Array containing the text that needs to be displayed',
      table: {
        type: { 
          summary: 'string[] OR { title: string; subtitle: string;}[]'
        },
      },
    },
    selectedIndex: {
      type: { required: true },
      control: { type: 'number' },
      description: 'The currently selected index',
      table: {
        type: { 
          summary: 'number'
        },
      },
    },
    onChange: {
      type: { required: true },
      action: true,
      control: false,
      table: {
        category: "Callbacks",
        type: { 
          summary: '(newSelectedIndex: number) => void;'
        },
      },
    },
  },
  args: {
    values: ['Earth', 'Sun', 'Moon'],
    selectedIndex: 0,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FMKs4cbojdVOBKUxv7okb93%2FDirty-Swan-Pattern-Library%3Fnode-id%3D251%253A26",
    },
    customTypes: {
      CellBaseProps: `interface CellBaseProps<T> {
        label?: React.ReactNode;
        render?: (value: any, element: T) => React.ReactNode;
        key: Extract<keyof T, string>;
        addonId?: string | number;
      }`,
      Row: `interface Row<T> {
        label?: React.ReactNode;
        render?: (value: any, element: T) => React.ReactNode;
        key: Extract<keyof T, string>;
        addonId?: string | number;
      }`
    },
    docs: {
      description: {
        component: 'A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button.',
      },
    },
  },
};

export const SegmentedControlStory = ({
  onChange,
  selectedIndex,
  values
}: SegmentedControlProps) => {
  const [index, setIndex] = useState(selectedIndex);

  const handleOnChange = (newIndex: number) => {
    onChange?.(newIndex);
    setIndex(newIndex);
  };

  return (
    <SegmentedControl
      values={values}
      selectedIndex={index}
      onChange={handleOnChange}
    />
  );
};

export const SegmentedControlWithSubtitle = ({
  onChange,
  selectedIndex,
  values
}: SegmentedControlProps) => {
  const [index, setIndex] = useState(selectedIndex);

  const handleOnChange = (newIndex: number) => {
    onChange?.(newIndex);
    setIndex(newIndex);
  };

  return (
    <SegmentedControl
      values={[
        { title: 'Basic', subtitle: '€288,65' },
        { title: 'Premium', subtitle: '€288,65' },
      ]}
      selectedIndex={index}
      onChange={handleOnChange}
    />
  );
};

SegmentedControlStory.storyName = "SegmentedControl";

export default story;
