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
    size: 's',
  },
};

export const SpinnerStory = {
  render: ({ size }: SpinnerProps) => <Spinner size={size} />,
  name: 'Spinner',
};

export default story;
