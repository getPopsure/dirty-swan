
import { ChangeEvent, useState } from 'react';
import { Input, InputProps } from '.';
import sharedConfig from './stories/config';

const story = {
  title: 'JSX/Inputs/Input',
  component: Input,
  argTypes: sharedConfig,
  parameters: {
    componentSubtitle: 'The default input component is used to gather informations from the user.'
  }
};

export const InputStory = ({ 
  onChange,
  className,
  placeholder,
  value,
  label,
  hideLabel,
  labelInsideInput,
  prefix,
  error
}: InputProps) => {
  const [newValue, setValue] = useState(value);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onChange?.(event);
  }

  return (
    <Input 
      onChange={handleOnChange}
      value={newValue}
      className={className}
      placeholder={placeholder}
      label={label}
      hideLabel={hideLabel}
      labelInsideInput={labelInsideInput}
      prefix={prefix}
      error={error}
    />
  );
};

InputStory.storyName = 'Input';

export default story;
