
import { useState } from 'react';
import { CurrencyInput, CurrencyInputProps } from '.';
import sharedConfig from '../stories/config';

const story = {
  title: 'JSX/Inputs',
  component: CurrencyInput,
  argTypes: sharedConfig,
  parameters: {
    componentSubtitle: 'The default input component is used to gather informations from the user.'
  }
};

export const CurrencyInputStory = ({ 
  onChange,
  className,
  placeholder,
  value,
  label,
  hideLabel,
  prefix,
  error
}: CurrencyInputProps) => {
  const [newValue, setValue] = useState<number>(Number);

  const handleOnChange = (value: number) => {
    setValue(value)
    onChange?.(value);
  }

  return (
    <CurrencyInput 
      onChange={handleOnChange}
      value={newValue}
      className={className}
      placeholder={placeholder}
      label={label}
      hideLabel={hideLabel}
      prefix={prefix}
      error={error}
    />
  );
};

CurrencyInputStory.storyName = 'CurrencyInput';

export default story;
