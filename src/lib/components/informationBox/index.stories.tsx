import { InformationBox, InformationBoxProps } from '.';

const story = {
  title: 'JSX/InformationBox',
  component: InformationBox,
  argTypes: {
    children: {
      control: { type: 'text' },
      defaultValue: 'It seems that you already have an account with us! Sign in now',
      description: 'Content that is displayed inside the information box',
    },
    title: {
      defaultValue: 'Log in to your account',
      description: 'Title of the information box',
    },
    showIcon: {
      defaultValue: false,
      description: 'Whether or not to show the info icon',
    },
    size: {
      defaultValue: 'default',
      description: 'Size to display the component',
    },
    variant: {
      defaultValue: 'information',
      description: 'Variant that defines the style of the InformationBox',
    },
  }
};

export const InformationBoxStory = ({
  children,
  showIcon,
  title,
  size,
  variant,
}: InformationBoxProps) => (
  <div className='wmx6'>
    <InformationBox
      children={children}
      showIcon={showIcon}
      title={title}
      size={size}
      variant={variant}
    />
  </div>
);

InformationBoxStory.storyName = "InformationBox";

export default story;
