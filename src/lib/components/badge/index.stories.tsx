import { Badge, BadgeProps } from '.';

const story = {
  title: 'JSX/Badge',
  component: Badge,
  argTypes: {
    children: {
      control: 'text',
      description: 'Content that is displayed inside the badge',
    },
    className: {
      description: 'Class name for the most parent element',
      control: 'text'
    },
    size: {
      description: 'Define the size of the badge',
    },
    variant: {
      description: 'Variant that defines the style of the Badge',
    },
  },
  args: {
    children: 'Value',
    className: '',
    size: 'medium',
    variant: 'information',
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
