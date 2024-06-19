import { Spinner, SpinnerProps } from '.';

const story = {
  title: 'JSX/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: { type: 'select' },
      description: 'Property that allows to customize the size of the spinner.',
    },
  },
  args: {
    size: 's'
  }
};

export const SpinnerStory = ({ size }: SpinnerProps) => <Spinner size={size} />;

SpinnerStory.storyName = 'Spinner';

export default story;
