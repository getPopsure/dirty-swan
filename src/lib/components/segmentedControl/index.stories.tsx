import { useState } from 'react';
import { SegmentedControl, SegmentedControlProps } from '.';

const story = {
  title: 'JSX/SegmentedControl',
  component: SegmentedControl,
  argTypes: {
    values: {
      description: 'Array containing the text that needs to be displayed',
      table: {
        type: { 
          summary: 'string[] OR { title: string; subtitle: string;}[]'
        },
      },
    },
    selectedIndex: {
      description: 'The currently selected index',
    },
    onChange: {
      action: true,
      table: {
        category: "Callbacks",
      },
    },
  },
  args: {
    values: ['Earth', 'Sun', 'Moon'],
    selectedIndex: 0,
  },
  parameters: {
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

SegmentedControlStory.storyName = "SegmentedControl";

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

export default story;
