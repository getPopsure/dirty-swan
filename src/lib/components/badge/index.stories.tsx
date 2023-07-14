import { Badge, BadgeProps } from '.';

const story = {
  title: 'JSX/Badge',
  component: Badge,
  argTypes: {
    children: {
      control: { type: 'text' },
      defaultValue: 'Value',
      description: 'Content that is displayed inside the badge',
    },
    className: {
      defaultValue: '',
      description: 'Class name for the most parent element',
      control: { type: 'text' }
    },
    size: {
      defaultValue: 'medium',
      description: 'Define the size of the badge',
    },
    variant: {
      defaultValue: 'information',
      description: 'Variant that defines the style of the Badge',
    },
  }
};
 
export const BadgeStory = ({
  children,
  className,
  size,
  variant,
}: BadgeProps) => (
  <Badge
    className={className}
    size={size}
    variant={variant}
  >
    {children}
  </Badge>
);

BadgeStory.storyName = "Badge";

export default story;
