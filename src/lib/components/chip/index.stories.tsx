import { Chip } from '.';

const story = {
  title: 'JSX/Chip',
  component: Chip,
  args: {
    value: { value: 'Earth' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/MKs4cbojdVOBKUxv7okb93/Dirty-Swan-Design-System?type=design&node-id=1967%3A4&t=glyH1DDnSeyyE7TF-1',
    },
  },
};

export const ChipStory = ({
  onRemove,
  value,
}: {
  value: { value: string; leftIcon?: string };
  onRemove?: () => void;
}) => {
  return <Chip value={value} />;
};

ChipStory.storyName = 'Chip';

export default story;
