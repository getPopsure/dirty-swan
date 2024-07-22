import { CTACell } from './CTACell';

const story = {
  title: 'JSX/Table/Cells',
  component: CTACell,
  argTypes: {},
  args: {
    title: 'Premium',
    price: '€277',
    buttonCaption: 'Get covered',
    grey: false,
    narrow: false,
  },
};

export const CTACellStory = ({
  title,
  price,
  buttonCaption,
  grey,
  narrow,
}: React.ComponentProps<typeof CTACell>) => (
  <div className="p48 d-flex fd-column gap16 bg-white">
    <CTACell
      title={title}
      price={price}
      buttonCaption={buttonCaption}
      href=""
      grey={grey}
      narrow={narrow}
    />
  </div>
);

CTACellStory.storyName = 'CTACell';

export default story;
