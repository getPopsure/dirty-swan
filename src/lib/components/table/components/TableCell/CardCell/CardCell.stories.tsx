import { DentalPlusIcon, PlaneIcon } from '../../../../icon';
import { CardCell } from './CardCell';

const story = {
  title: 'JSX/Table/Cells',
  component: CardCell,
  argTypes: {},
  args: {
    title: 'Dental add-on',
    description: 'Get your dental cleanings and additional treatments covered for just 10.90€ a month.',
    icon: <DentalPlusIcon size={24} noMargin />,
    href: 'https://example.com',
  },
};

export const CardCellStory = ({
  title,
  description,
  icon,
  href,
}: React.ComponentProps<typeof CardCell>) => (
  <div className="p48 d-flex fd-column gap16 bg-white">
    <CardCell
      title={title}
      description={description}
      icon={icon}
      href={href}
    />
  </div>
);

CardCellStory.storyName = 'CardCell';

export default story;
