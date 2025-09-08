
import { useState } from 'react';
import { Toggle, ToggleProps } from '.';

const story = {
  title: 'JSX/Inputs/Toggle',
  component: Toggle,
  argTypes: {
    options: {
      description: 'Object that contains the possible options for rendering in the input. To create an icon-only toggle, pass an empty string.',
    },
    value: {
      description: 'Current checked values.',
    },
    onChange: {
      description: 'Function called everytime a value changes.',
      action: true,
      table: {
        category: "Callbacks",
      },
    },
    bordered: {
      description: 'Property that defines if checkbox should show the border around each label',
    },
    inlineLayout: {
      description: 'Property that defines if options should show inline instead of block. Check inline checkbox options story for examples.',
    },
    disabled: {
      description: 'Shows toggle on a disabled state.',
    },
    className: {
      description: 'ClassNames for custom styling',
    },
  },
  args: {
    options:{
      CAT:{
        title: 'Cat',
        description: 'At least 1'
      },
      DOG:{
        title: 'Dog',
        description: 'At least 2'
      },
      NONE:{
        title: 'None',
        description: 'No pets'
      }
    },
    value: [],
    bordered: true,
    inlineLayout: false,
    disabled: false,
    className: {
      container: '',
      label: '',
      option: ''
    }
  
  }
};

export const ToggleStory = ({ 
  onChange,
  options,
  bordered,
  classNames,
  inlineLayout,
  disabled,
}: ToggleProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[]) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Toggle 
      options={options} 
      onChange={handleOnChange}
      value={checkedValues}
      bordered={bordered}
      classNames={classNames}
      inlineLayout={inlineLayout}
      disabled={disabled}
    />
  );
}

export const ToggleWithCustomWrapperStyles = ({ onChange }: ToggleProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[] = []) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Toggle 
      onChange={handleOnChange}
      value={checkedValues}
      options={{
        CAT1: 'Cat',
        DOG1: 'Dog',
      }} 
      classNames={{ container: "p32 bg-purple-500 br24 bs-lg" }}
    />
  );
}

export const ToggleWithCustomOptionStyles = ({ onChange }: ToggleProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[] = []) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Toggle 
      onChange={handleOnChange}
      value={checkedValues}
      options={{
        CAT2: 'Cat',
        DOG2: 'Dog',
      }} 
      classNames={{ option: "mb32 p24 bg-green-100 br12 bs-lg" }}
    />
  );
}

export const ToggleWithCustomLabelStyles = ({ onChange }: ToggleProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[] = []) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Toggle 
      onChange={handleOnChange}
      value={checkedValues}
      options={{
        CAT3: 'Cat',
        DOG3: 'Dog',
      }} 
      classNames={{ label: "bg-neutral-900 tc-white" }}
    />
  );
}

export const ToggleWithInlineLayout = ({ onChange }: ToggleProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[] = []) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Toggle 
      onChange={handleOnChange}
      value={checkedValues}
      options={{
        CAT4: 'Cat',
        DOG4: 'Dog',
        FISHER: 'Fish',
        RABBIT: 'Rabbit',
        RAT: 'Rat',
        ANOTHER: 'Other',
      }} 
      classNames={{ option: "w30" }}
      inlineLayout
    />
  );
}

export const ToggleIconOnly = ({ onChange }: ToggleProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[] = []) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Toggle 
      options={{ CAT: '' }} 
      onChange={handleOnChange}
      value={checkedValues}
      bordered={false}
    />
  );
}

ToggleStory.storyName = 'Toggle';

export default story;
