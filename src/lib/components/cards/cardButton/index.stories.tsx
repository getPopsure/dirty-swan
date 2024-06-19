import { CardButton, CardButtonProps } from '.';

const story = {
  title: 'JSX/Cards/CardButton',
  component: CardButton,
  argTypes: {
    title: {
      description: 'Title text that needs to be displayed',
    },
    description: {
      description: 'Description text that is displayed under title',
    },
    disabled: {
      description: 'Disabled state of the button',
    },
    className: {
      description: 'Class name for most top parent element',
    },
    onClick: {
      description: 'Function that runs on click of the button',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    href: {
      description: 'Redirect URL on click of the button',
    },
  },
  args: {
    title: 'Risky Sports',
    description: 'Mountain or rock climbing, Bouldering, Martial arts, Extreme sports, Scuba diving, Sky diving, Bungee jumping, Mountain or rock climbing, Bouldering, Martial arts,',
    disabled: false,
    className: '',
    href: 'https://feather-insurance.com/',
  }
};

export const CardButtonStory = ({
  title,
  description,
  disabled,
  className,
  href,
  onClick,
}: CardButtonProps) => (
  <CardButton
    title={title}
    description={description}
    disabled={disabled}
    className={className}
    href={href}
    onClick={onClick}
  />
);

CardButtonStory.storyName = "CardButton";

export default story;
