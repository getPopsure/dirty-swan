import { PlaneIcon } from '../../../../icon';
import { CTACell } from './CTACell';

const story = {
  title: 'JSX/Table/Cells',
  component: CTACell,
  argTypes: {},
  args: {
    title: 'BARMER',
    price: '€277',
    icon: <PlaneIcon size={24} noMargin />,
    buttonCaption: 'Get covered',
    grey: false,
    narrow: false,
  },
};

export const CTACellStory = {
  render: ({
    title,
    price,
    icon,
    buttonCaption,
    grey,
    narrow,
  }: React.ComponentProps<typeof CTACell>) => (
    <div className="p48 d-flex fd-column gap16 bg-white">
      <CTACell
        title={title}
        price={price}
        icon={icon}
        buttonCaption={buttonCaption}
        href=""
        grey={grey}
        narrow={narrow}
      />
    </div>
  ),

  name: 'CTACell',
};

export default story;
