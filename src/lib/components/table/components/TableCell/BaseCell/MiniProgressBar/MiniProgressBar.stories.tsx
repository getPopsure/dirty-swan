import { MiniProgressBar } from './MiniProgressBar';

const story = {
  title: 'JSX/Table/Misc',
  component: MiniProgressBar,
  argTypes: {
    nFilledBars: {
      description: 'Number of filled bars to show (0-5)',
      control: {
        min: 0,
        max: 5,
        type: 'number',
      },
    },
  },
  args: {
    nFilledBars: 3,
  },
};

export const MiniProgressBarStory = {
  render: ({ nFilledBars }: React.ComponentProps<typeof MiniProgressBar>) => (
    <MiniProgressBar nFilledBars={nFilledBars} />
  ),

  name: 'MiniProgressBar',
};

export default story;
