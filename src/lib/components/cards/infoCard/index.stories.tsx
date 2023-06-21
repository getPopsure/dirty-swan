import { InfoCard, InfoCardProps } from '.';
import { images } from '../../../util/images';

const story = {
  title: 'JSX/Cards/InfoCard',
  component: InfoCard,
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
      description: 'Icon displayed on the top of the card, inside the purple circle',
    },
    rightIcon: {
      defaultValue: {
        src: images.washingMachine,
        alt: 'Icon alt'
      },
      description: 'Icon displayed on the top right corner of the card',
    },
    dropshadow: {
      defaultValue: true,
      description: 'If the card should have a box-shadow or not',
    },
    className: {
      defaultValue: '',
      description: 'Class name for most top parent element',
    },
  },
};

export const InfoCardStory = ({
  title,
  dropshadow,
  children,
  className,
  rightIcon,
  state,
  topIcon
}: InfoCardProps) => {
  return (
    <InfoCard
      className={className}
      dropshadow={dropshadow}
      state={state}
      rightIcon={rightIcon}
      title={title}
      topIcon={topIcon}
    >
      {children}
    </InfoCard>
  );
}

InfoCardStory.storyName = "InfoCard";

export default story;
