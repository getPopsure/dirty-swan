import { InformationBox, InformationBoxProps } from '.';

const story = {
  title: 'JSX/InformationBox',
  component: InformationBox,
  argTypes: {
    children: {
      description: 'Content that is displayed inside the information box',
    },
    title: {
      description: 'Title of the information box',
    },
    showIcon: {
      description: 'Whether or not to show the info icon',
    },
    size: {
      description: 'Size to display the component',
    },
    variant: {
      description: 'Variant that defines the style of the InformationBox',
    },
  },
  args: {
    children: 'It seems that you already have an account with us! Sign in now',
    title: 'Log in to your account',
    showIcon: false,
    size: 'default',
    variant: 'information',
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
