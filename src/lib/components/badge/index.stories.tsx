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
    showDot: {
      description: 'Whether to show a dot indicator',
    }
  },
  args: {
    children: 'Value',
    className: '',
    size: 'medium',
    variant: 'information',
    showDot: false
  }
};
 
export const BadgeStory = ({
  children,
  className,
  size,
  variant,
  showDot,
}: BadgeProps) => (
  <Badge
    className={className}
    size={size}
    variant={variant}
    showDot={showDot}
  >
    {children}
  </Badge>
);

BadgeStory.storyName = "Badge";

const variants: BadgeProps['variant'][] = [
  'white',
  'neutral',
  'neutralStrong',
  'information',
  'warning',
  'primary',
  'error',
  'success',
  'secondary',
  'secondaryStrong',
  'black',
];

export const Variants = () => (
  <div className='d-flex fd-column gap16'>
    {variants.map((variant) => (
      <div key={variant} className='d-flex'>
        <div className='ws3'>
          <Badge variant={variant}>
            {variant}
          </Badge>
        </div>
        <div className='ws3 ml32'>
          <Badge
            variant={variant}
            showDot
          >
            {variant}
          </Badge>
        </div>
      </div>
    ))}
  </div>
);

const sizes: BadgeProps['size'][] = ['xsmall', 'small', 'medium', 'large'];

export const Sizes = () => (
  <div className='d-flex fd-column gap16'>
    {sizes.map((size) => (
      <div key={size} className='d-flex'>
        <div className='ws3'>
          <Badge size={size}>
            {size}
          </Badge>
        </div>
        <div className='ws3 ml32'>
          <Badge size={size} showDot>
            {size}
          </Badge>
        </div>
      </div>
    ))}
  </div>
);

BadgeStory.storyName = "Badge";

export default story;
