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
    subtitle: {
      defaultValue: 'Lorem Ipsum dolorem',
      description: 'Subitle text that needs to be displayed',
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
    leftIconSize: {
      defaultValue: {
        width: 48,
        height: 48
      },
      description: 'Size of the left icon',
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
  subtitle,
  dropshadow,
  children,
  className,
  cardSize,
  leftIcon,
  leftIconSize,
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
      leftIconSize={leftIconSize}
      rightIcon={rightIcon}
      title={title}
      subtitle={subtitle}
    >
      {children}
    </CardWithLeftIcon>
  );
}

CardWithLeftIconStory.storyName = "CardWithLeftIcon";

export default story;
