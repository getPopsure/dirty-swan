import { IconWrapper, IconWrapperProps } from './IconWrapper';
import * as icons from './icons';

const iconsList = Object.keys(icons);
type IconKey = typeof iconsList[number];

const story = {
  title: 'JSX/Icon',
  component: IconWrapper,
  argTypes: {
    icon: {
      defaultValue: 'InfoIcon',
      description: 'Identifier key of the icon',
      table: {
        type: { 
          summary: 'IconKey (see Available Icons story for all icons)'
        },
      },
      control: { 
        options: iconsList,
        type: 'select',
      },
    },
    size: {
      defaultValue: 32,
      description: 'Icon size',
    },
    color: {
      defaultValue: 'primary-500',
      description: 'Icon color',
    },
    className: {
      description: 'Class name for updating components styles',
      table: {
        type: { 
          summary: 'Your own custom classnames can be added here'
        },
      },
    },
  },
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
