import { InfoCard, InfoCardProps } from '.';
import { images } from '../../../util/images';

const story = {
  title: 'JSX/Cards/InfoCard',
  component: InfoCard,
  argTypes: {
    title: {
      description: 'Title text that needs to be displayed',
    },
    children: {
      type: 'text',
      description: 'Content that is displayed inside the card',
    },
    state: {
      description: 'State that describe the interation with the card',
    },
    topIcon: {
      description: 'Icon displayed on the top of the card, inside the purple circle',
    },
    rightIcon: {
      description: 'Icon displayed on the top right corner of the card',
    },
    dropshadow: {
      description: 'If the card should have a box-shadow or not',
    },
    className: {
      description: 'Class name for most top parent element',
    },
  },
  args: {
    title: 'Lorem Ipsum',
    children: 'Mountain or rock climbing, Bouldering, Martial arts, Extreme sports, Scuba diving, Sky diving, Bungee jumping, Mountain or rock climbing, Bouldering, Martial arts,',
    state: 'actionable',
    topIcon: {
      src: images.mortgage,
      alt: 'Image alt'
    },
    rightIcon: {
       src: images.washingMachine,
       alt: 'Icon alt'
    },
    dropshadow: true,
    className: '',
  }
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
