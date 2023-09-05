
import { useState } from 'react';
import { Checkbox, CheckboxProps } from '.';
import { images } from '../../../util/images';

const story = {
  title: 'JSX/Inputs/Checkbox',
  component: Checkbox,
  argTypes: {
    options: {
      description: 'Object that contains the possible options for rendering in the input.',
      defaultValue: {
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
      }
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
    wide: {
      description: 'Property that defines if options should fill 100% of available horizontal space',
      defaultValue: false
    },
    bordered: {
      control: { type: 'boolean' },
      description: 'Property that defines if checkbox should show the border around each label',
      defaultValue: true
    },
    inlineLayout: {
      description: 'Property that defines if options should show inline instead of block. Check inline checkbox options story for examples.',
      defaultValue: false
    },
    className: {
      description: 'ClassNames for custom styling',
      defaultValue: {
        container: '',
        label: '',
        option: ''
      }
    },
  }
};

export const CheckboxStory = ({ 
  onChange,
  options,
  wide,
  bordered,
  classNames,
  inlineLayout,
}: CheckboxProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[]) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Checkbox 
      wide={wide}
      options={options} 
      onChange={handleOnChange}
      value={checkedValues}
      bordered={bordered}
      classNames={classNames}
      inlineLayout={inlineLayout}
    />
  );
}

export const CheckboxWithCustomWrapperStyles = ({ onChange }: CheckboxProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[] = []) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Checkbox 
      onChange={handleOnChange}
      value={checkedValues}
      options={{
        CAT1: 'Cat',
        DOG1: 'Dog',
      }} 
      classNames={{ container: "p32 bg-primary-300 br24 bs-lg" }}
    />
  );
}

export const CheckboxWithCustomOptionStyles = ({ onChange }: CheckboxProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[] = []) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Checkbox 
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

export const CheckboxWithCustomLabelStyles = ({ onChange }: CheckboxProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[] = []) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Checkbox 
      onChange={handleOnChange}
      value={checkedValues}
      options={{
        CAT3: 'Cat',
        DOG3: 'Dog',
      }} 
      classNames={{ label: "bg-grey-900 tc-white" }}
    />
  );
}

export const CheckboxWithInlineLayout = ({ onChange }: CheckboxProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[] = []) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Checkbox 
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
      wide
    />
  );
}

export const CheckboxWithCustomLabel = ({ onChange, wide, classNames, inlineLayout }: CheckboxProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleOnChange = (newValue: string[] = []) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Checkbox 
      options={{
        BIGDOG: {
          icon: () => <img src={images.bigDog} alt='' />,
          title: 'Dog',
        },
        FISH:{
          icon: () => <img src={images.brokenAquarium} alt='' />,
          title: 'Fish',
        },
        OTHER:{
          icon: () => <img src={images.brokenGlass} alt='' />,
          title: 'Other',
        }
      }} 
      onChange={handleOnChange}
      value={checkedValues}
      classNames={{ option: "w30" }}
      inlineLayout
    />
  );
}

CheckboxStory.storyName = 'Checkbox';

export default story;
