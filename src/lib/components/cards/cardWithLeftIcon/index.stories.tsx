import { CardWithLeftIcon, CardWithLeftIconProps } from '.';
import { images } from '../../../util/images';

const story = {
  title: 'JSX/Cards/CardWithLeftIcon',
  component: CardWithLeftIcon,
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
    leftIcon: {
      defaultValue: {
        src: images.mortgage,
        alt: 'Image alt'
      },
      description: 'Icon displayed on the left of the card.',
    },
    rightIcon: {
      defaultValue: {
        src: images.washingMachine,
        alt: 'Icon alt'
      },
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
      defaultValue: '',
      type: 'text',
      description: 'Class name for most top parent element',
    },
  },
};

export const CardWithLeftIconStory = ({
  title,
  dropshadow,
  children,
  className,
  cardSize,
  leftIcon,
  rightIcon,
  state,
}: CardWithLeftIconProps) => {
  return (
    <CardWithLeftIcon
      cardSize={cardSize}
      className={className}
      dropshadow={dropshadow}
      state={state}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      title={title}
    >
      {children}
    </CardWithLeftIcon>
  );
}

CardWithLeftIconStory.storyName = "CardWithLeftIcon";

export default story;
