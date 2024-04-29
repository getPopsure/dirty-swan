import { Button, ButtonProps, ButtonVariant } from '.';
import { InfoIcon, PlusIcon, SendIcon } from '../icon';

const story = {
  title: 'JSX/Button',
  component: Button,
  argTypes: {
    as: {
      control: { type: 'text' },
      description: 'Allow wrapper element type to be custom defined'
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Click me',
      description: 'Text that is displayed inside the button. Hidden when hideLabel is set as true',
    },
    variant: {
      defaultValue: 'filledColor',
      description: 'Variant that defines the style of the Button',
    },
    leftIcon: {
      description: 'Icon to be displayed on the left side of the button. This makes use of [dirty swan Icon component](http://localhost:9009/?path=/docs/jsx-icon--icon-story).',
    },
    rightIcon: {
      description: 'Icon to be displayed on the right side of the button. This makes use of [dirty swan Icon component](http://localhost:9009/?path=/docs/jsx-icon--icon-story).',
    },
    loading: {
      defaultValue: false,
      description: 'Show button on a loading state.',
    },
    hideLabel: {
      defaultValue: false,
      description: 'Show button as an icon only button. This hides the label but still keeps it for accessibility purposes.',
    },
    className: {
      defaultValue: 'wmn3',
      type: 'text',
      description: 'Class name for most top parent element',
    },
  },
  parameters: {
    design: {
      url: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FMKs4cbojdVOBKUxv7okb93%2FDirty-Swan-Pattern-Library%3Fnode-id%3D251%253A26',
      type: 'figma'
    },
  },
};

export const ButtonStory = ({
  as,
  className,
  loading = false,
  children,
  variant,
  hideLabel
}: ButtonProps) => (
  <div className='wmx6'>
    <Button
      as={as}
      className={className}
      loading={loading}
      variant={variant}
      hideLabel={hideLabel}
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
          <h4 className={`p-h4 mb16 ${variant === "textWhite" ?? "tc-white"}`}>
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

export const ButtonAsOtherComponents = ({ children, as, onClick }: ButtonProps) => (
  <div className='d-flex fd-column gap16 p24 bg-grey-200'>
    <h3 className='p-h3'>As an anchor:</h3>
      <Button as="a" href="https://feather-insurance.com" target="_blank">
        {children}
      </Button>

    <h3 className='p-h3'>As a button:</h3>
      <Button as="button" onClick={onClick}>
        {children}
      </Button>

    <p className='p-p p-p--small fw-bold d-flex ai-center gap8 mt32'>
      <InfoIcon />
      Inspect elements to see the different HTML tags being rendered.
    </p>
  </div>
);

export default story;
