import { CTACell } from './CTACell';

const story = {
  title: 'JSX/Table/Cells',
  component: CTACell,
  argTypes: {},
  args: {
    content: 'Premium',
    subContent: '€277',
    grey: false,
    narrow: false,
  },
};

export const CTACellStory = ({
  content,
  subContent,
  grey,
  narrow,
}: React.ComponentProps<typeof CTACell>) => (
  <div className="p48 d-flex fd-column gap16 bg-white">
    <CTACell
      content={content}
      subContent={subContent}
      href=""
      grey={grey}
      narrow={narrow}
    />
  </div>
);

CTACellStory.storyName = 'CTACell';

export default story;
