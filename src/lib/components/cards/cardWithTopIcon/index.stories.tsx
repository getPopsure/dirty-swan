import { CardWithTopIcon, CardWithTopIconProps } from '.';
import { images } from '../../../util/images';

const story = {
  title: 'JSX/Cards/CardWithTopIcon',
  component: CardWithTopIcon,
  argTypes: {
    title: {
      defaultValue: 'Lorem Ipsum',
      description: 'Title text that needs to be displayed',
    },
    children: {
      type: 'text',
      defaultValue: 'Mountain or rock climbing, Bouldering, Martial arts, Extreme sports, Scuba diving, Sky diving, Bungee jumping, Mountain or rock climbing, Bouldering, Martial arts,',
      description: 'Content that is displayed inside the card',
    },
    state: {
      defaultValue: 'actionable',
      description: 'State that describe the interation with the card',
    },
    topIcon: {
      defaultValue: {
        src: images.mortgage,
        alt: 'Image alt'
      },
      description: 'Icon displayed on the top of the card.',
    },
    topIconSize: {
      defaultValue: {
        width: 48,
        height: 48
      },
      description: 'Size of the top icon',
    },
    rightIcon: {
      defaultValue: 'arrow',
      description: 'Icon displayed on the top right corner of the card',
    },
    cardSize: {
      control: { type: 'select' },
      defaultValue: 'medium',
      description: 'Size of the card'
    },
    dropshadow: {
      defaultValue: true,
      description: 'If the card should have a box-shadow or not',
    },
    className: {
      defaultValue: 'ws6',
      type: 'text',
      description: 'Class name for most top parent element',
    },
  },
};

export const CardWithTopIconStory = ({
  title,
  dropshadow,
  cardSize,
  children,
  className,
  topIcon,
  topIconSize,
  rightIcon,
  state,
}: CardWithTopIconProps) => (
  <CardWithTopIcon
    cardSize={cardSize}
    className={className}
    dropshadow={dropshadow}
    state={state}
    topIcon={topIcon}
    topIconSize={topIconSize}
    rightIcon={rightIcon}
    title={title}
  >
    <p className="p-p mt16 tc-grey-600">
      {children}
    </p>
  </CardWithTopIcon>
);

CardWithTopIconStory.storyName = "CardWithTopIcon";

export default story;
