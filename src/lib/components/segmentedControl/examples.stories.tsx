import { useState } from 'react';
import SegmentedControl from '.';

const story = {
  title: 'JSX/SegmentedControl/Examples/AddingSubtitle',
  parameters: {
    docs: {
      description: {
        component: 'A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button.',
      },
    },
  },
};

export const AddingSubtitle = () => {
  const [index, setIndex] = useState(0);

  const handleOnChange = (newIndex: number) => {
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
