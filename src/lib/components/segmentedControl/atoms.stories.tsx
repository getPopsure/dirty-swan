import { useState } from 'react';
import SegmentedControl from '.';

const story = {
  title: 'JSX/SegmentedControl/Atoms/ButtonAtom',
  parameters: {
    docs: {
      description: {
        component: 'A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button.',
      },
    },
  },
};

export const ButtonAtom = () => {
  const [index, setIndex] = useState(0);

  const handleOnChange = (newIndex: number) => {
    setIndex(newIndex);
  };

  return (
    <SegmentedControl
      values={['Earth', 'Sun', 'Moon']}
      selectedIndex={index}
      onChange={handleOnChange}
    />
  );
};


export default story;
