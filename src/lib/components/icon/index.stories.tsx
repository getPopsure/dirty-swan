import { IconWrapper, IconWrapperProps } from './IconWrapper';
import * as icons from './icons';

const iconsList = Object.keys(icons);
type IconKey = typeof iconsList[number];

const story = {
  title: 'JSX/Icon',
  component: IconWrapper,
  argTypes: {
    icon: {
      description: 'Identifier key of the icon',
      table: {
        type: { 
          summary: 'IconKey (see Available Icons story for all icons)'
        },
      },
      control: 'select',
      options: iconsList,
    },
    size: {
      description: 'Icon size',
    },
    color: {
      description: 'Icon color',
    },
    className: {
      description: 'Class name for updating components styles',
      control: 'text',
      table: {
        type: { 
          summary: 'Your own custom classnames can be added here'
        },
      },
    },
  },
  args: {
    icon: 'InfoIcon',
    size: 32,
    color: 'purple-600',
    noMargin: false,
    className: ''
  }
};

export const IconStory = ({ color, className, icon, size }: IconWrapperProps & { icon: IconKey }) => {
  // @ts-ignore
  const Icon = icons?.[icon];

  return Icon && (
    <Icon
      size={size}
      color={color}
      className={className}
    />
  );
}

IconStory.storyName = "Icon";

export default story;
