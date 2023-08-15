import { CardWithTopLeftIcon, CardWithTopLeftIconProps } from '.';

const story = {
  title: 'JSX/Cards/CardWithTopLeftIcon',
  component: CardWithTopLeftIcon,
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
      defaultValue: 'logo',
      description: 'Icon displayed on the left of the card.',
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
      defaultValue: '',
      type: 'text',
      description: 'Class name for most top parent element',
    },
  },
};

export const CardWithTopLeftIconStory = ({
  title,
  dropshadow,
  children,
  className,
  cardSize,
  leftIcon,
  rightIcon,
  state,
}: CardWithTopLeftIconProps) => {
  return (
    <CardWithTopLeftIcon
      cardSize={cardSize}
      className={className}
      dropshadow={dropshadow}
      state={state}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      title={title}
    >
      {children}
    </CardWithTopLeftIcon>
  );
}

CardWithTopLeftIconStory.storyName = "CardWithTopLeftIcon";

export default story;
