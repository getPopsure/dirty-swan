import { on } from 'events';
import Chip, { ChipProps } from '.';

import featherLogo from '../cards/icons/feather-logo.svg';
import { useState } from 'react';

const story = {
  title: 'JSX/Chip',
  component: Chip,
  argTypes: {
    value: {
      description: 'Value that is displayed inside the Chip',
    },
    onRemove: {
      description: 'Function that is called when the remove button is clicked',
      table: {
        category: 'Callbacks'
      },
    },
    className: {
      description: 'Class name for the most parent element',
    },
  },
  args: {
    value: {
      value: 'feather3',
      leftIcon: featherLogo,
    },
    className: '',
  },
  parameters: {
    componentSubtitle: 'Chip component displays text and image (optional) of given values.'
  }
};
 
export const ChipStory = ({
  onRemove,
  value,
  className,
}: ChipProps) => (
  <Chip
    onRemove={onRemove}
    value={value}
    className={className}
  />
);

ChipStory.storyName = "Chip";

export const MultipleChips = () => {
  const values = [
    { value: 'feather', leftIcon: featherLogo },
    { value: 'feather2', leftIcon: featherLogo },
    {
      value: 'feather3',
      leftIcon: featherLogo,
    },
    {
      value: 'dirtyswan',
      leftIcon: featherLogo,
    },
    {
      value: 'test value',
      leftIcon: featherLogo,
    },
  ];
  const [selectedValues, setSelectedValues] = useState(values);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {selectedValues.map((value) => (
        <Chip
          value={value}
          onRemove={(value) => {
            const newValues = [...selectedValues].filter(
              (selectedValue) => selectedValue.value !== value.value
            );
            setSelectedValues(newValues);
          }}
        />
      ))}
    </div>
  );
};

export default story;
