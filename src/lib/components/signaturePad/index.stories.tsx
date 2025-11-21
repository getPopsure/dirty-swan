import { SignaturePad, SignaturePadProps } from '.';

const story = {
  title: 'JSX/SignaturePad',
  component: SignaturePad,
  argTypes: {
    onChange: {
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
  },
  parameters: {
    componentSubtitle:
      'Signature pad are user interface elements which allow user sign any legal document.',
  },
};

export const SignaturePadStory = {
  render: ({ onChange }: SignaturePadProps) => {
    const handleOnChange = (newIndex: string) => {
      onChange?.(newIndex);
    };

    return <SignaturePad onChange={handleOnChange} />;
  },

  name: 'SignaturePad',
};

export default story;
