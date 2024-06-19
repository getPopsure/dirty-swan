import { Button, ButtonProps, ButtonVariant } from '.';
import { PlusIcon, SendIcon } from '../icon';

const story = {
  title: 'JSX/Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
      description: 'Text that is displayed inside the button. Hidden when hideLabel is set as true',
    },
    variant: {
      description: 'Variant that defines the style of the Button',
    },
    leftIcon: {
      description: 'Icon to be displayed on the left side of the button. This makes use of [dirty swan Icon component](http://localhost:9009/?path=/docs/jsx-icon--icon-story).',
    },
    rightIcon: {
      description: 'Icon to be displayed on the right side of the button. This makes use of [dirty swan Icon component](http://localhost:9009/?path=/docs/jsx-icon--icon-story).',
    },
    loading: {
      description: 'Show button on a loading state.',
    },
    hideLabel: {
      description: 'Show button as an icon only button. This hides the label but still keeps it for accessibility purposes.',
    },
    className: {
      type: 'text',
      description: 'Class name for most top parent element',
    },
  },
  args: {
    children: 'Click me',
    disabled: false,
    variant: 'filledColor',
    loading: false,
    hideLabel: false,
    className: 'wmn3',
  },
  parameters: {
    design: {
      url: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FMKs4cbojdVOBKUxv7okb93%2FDirty-Swan-Pattern-Library%3Fnode-id%3D251%253A26',
      type: 'figma'
    },
  },
};

export const ButtonStory = ({
  className,
  loading = false,
  children,
  variant,
  hideLabel,
  leftIcon,
  rightIcon,
  disabled,
}: ButtonProps) => (
  <div className='wmx6'>
    <Button
      className={className}
      loading={loading}
      variant={variant}
      hideLabel={hideLabel}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      disabled={disabled}
    >
      {children}
    </Button>
  </div>
);

ButtonStory.storyName = "Button";

export const ButtonVariants = ({ children, onClick }: ButtonProps) => (
  <div>
    <h3 className='p-h3 mb24'>Filled variants</h3>
    <div className='d-flex gap16 p24 bg-grey-300 br8'>
      {[ "filledColor", "filledGray", "filledWhite"].map((variant) => (
          <div key={variant}>
            <h4 className='p-h4 mb16'>
              {variant}
            </h4>

            <Button onClick={onClick} variant={variant as ButtonVariant}>
              {children}
            </Button>
          </div>
      ))}
    </div>

    <h3 className='p-h3 my24'>Text variants</h3>
    <div className='d-flex gap16 p24 bg-grey-300 br8'>
      {["textColor", "textWhite"].map((variant, index) => (
        <div key={variant} className={variant === "textWhite" ? "bg-primary-500 px32 br8" : ""}>
          <h4 className={`p-h4 mb16 ${variant === "textWhite" ? "tc-white" : ''}`}>
            {variant}
          </h4>

          <Button onClick={onClick} variant={variant as ButtonVariant}>
            {children}
          </Button>
        </div>
      ))}
    </div>

    <h3 className='p-h3 my24'>Outline variants</h3>
    <div className='d-flex gap16 p24 bg-primary-500 br8'>
      <div>
        <h4 className='p-h4 mb16 tc-white'>
          outlineWhite
        </h4>

        <Button onClick={onClick} variant={'outlineWhite'}>
          {children}
        </Button>
      </div>
    </div>
    
    <h3 className='p-h3 my24'>State variants</h3>
    <div className='d-flex gap16 p24 bg-grey-300 br8'>
      {["filledSuccess", "filledError"].map((variant) => (
          <div key={variant}>
            <h4 className='p-h4 mb16'>
              {variant}
            </h4>

            <Button onClick={onClick} variant={variant as ButtonVariant}>
              {children}
            </Button>
          </div>
      ))}
    </div>
  </div>
);

export const ButtonOnBackgrounds = ({ onClick }: ButtonProps) => (
  <div>
    <div className='p24 bg-white br8'>
      <h3 className='p-h3 mb16'>On white</h3>
      <div className='d-flex gap16'>
        {[ "filledColor", "filledGray", "textColor"].map((variant) => (
          <Button key={variant} onClick={onClick} variant={variant as ButtonVariant}>
            {variant}
          </Button>
        ))}
      </div>
    </div>

    <div className='p24 bg-grey-200 br8'>
      <h3 className='p-h3 mb16'>On grey</h3>
      <div className='d-flex gap16'>
        {[ "filledColor", "filledWhite", "textColor"].map((variant) => (
          <Button key={variant} onClick={onClick} variant={variant as ButtonVariant}>
            {variant}
          </Button>
        ))}
      </div>
    </div>

    <div className='p24 bg-primary-500 br8'>
      <h3 className='p-h3 mb16 tc-white'>On primary</h3>
      <div className='d-flex gap16'>
        {["filledWhite", "outlineWhite", "textWhite"].map((variant) => (
          <Button key={variant} onClick={onClick} variant={variant as ButtonVariant}>
            {variant}
          </Button>
        ))}
      </div>
    </div>
  </div>
);

export const ButtonWithIcons = ({ children, onClick }: ButtonProps) => (
  <div className='d-flex gap16'>
    <Button leftIcon={<SendIcon />} onClick={onClick}>
      {children}
    </Button>
    <Button rightIcon={<SendIcon />} onClick={onClick}>
      {children}
    </Button>
  </div>
);

export const ButtonWithIconOnly = ({ children, onClick }: ButtonProps) => (
  <Button leftIcon={<PlusIcon />} hideLabel onClick={onClick}>
    {children}
  </Button>
);

export const ButtonLoading = ({ children, onClick }: ButtonProps) => (
  <Button loading onClick={onClick}>
    {children}
  </Button>
);

export const ButtonDisabled = ({ children, onClick }: ButtonProps) => (
  <Button disabled onClick={onClick}>
    {children}
  </Button>
);

export default story;
