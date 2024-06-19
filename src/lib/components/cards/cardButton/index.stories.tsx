import { CardButton, CardButtonProps } from '.';

const story = {
  title: 'JSX/Cards/CardButton',
  component: CardButton,
  argTypes: {
    title: {
      defaultValue: 'Risky Sports',
      description: 'Title text that needs to be displayed',
    },
    description: {
      defaultValue: 'Mountain or rock climbing, Bouldering, Martial arts, Extreme sports, Scuba diving, Sky diving, Bungee jumping, Mountain or rock climbing, Bouldering, Martial arts,',
      description: 'Description text that is displayed under title',
    },
    disabled: {
      defaultValue: false,
      description: 'Disabled state of the button',
    },
    className: {
      defaultValue: '',
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
      defaultValue: 'https://feather-insurance.com/',
      description: 'Redirect URL on click of the button',
    },
  },
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
