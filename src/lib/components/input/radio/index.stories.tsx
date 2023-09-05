
import { useState } from 'react';
import { Radio, RadioProps } from '.';
import { images } from '../../../util/images';

const story = {
  title: 'JSX/Inputs/Radio',
  component: Radio,
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
    inlineLayout: {
      description: 'Property that defines if options should show inline instead of block. Check inline radio options story for examples.',
      defaultValue: false
    },
    classNames: {
      description: 'ClassNames for custom styling',
      defaultValue: {
        container: '',
        label: '',
        option: ''
      }
    },
    bordered: {
      description: 'Property that defines if option should show with border',
      defaultValue: true
    },
  }
};

export const RadioStory = ({ 
  onChange,
  options,
  wide,
  classNames,
  inlineLayout,
  bordered,
}: RadioProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string>();

  const handleOnChange = (newValue: string) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Radio 
      wide={wide}
      options={options} 
      onChange={handleOnChange}
      value={checkedValues}
      classNames={classNames}
      inlineLayout={inlineLayout}
      bordered={bordered}
    />
  );
}

export const RadioWithCustomWrapperStyles = ({ onChange }: RadioProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string>();

  const handleOnChange = (newValue: string) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Radio 
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

export const RadioWithCustomOptionStyles = ({ onChange }: RadioProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string>();

  const handleOnChange = (newValue: string) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Radio 
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

export const RadioWithCustomLabelStyles = ({ onChange }: RadioProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string>();

  const handleOnChange = (newValue: string  ) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Radio 
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

export const RadioWithInlineLayout = ({ onChange }: RadioProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string>();

  const handleOnChange = (newValue: string) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Radio 
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

export const RadioWithCustomLabel = ({ onChange, wide, classNames, inlineLayout }: RadioProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string>();

  const handleOnChange = (newValue: string) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Radio 
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

RadioStory.storyName = 'Radio';

export const RadioIconOnly = ({ onChange, wide, classNames, inlineLayout }: RadioProps<string>) => {
  const [checkedValues, setCheckedValues] = useState<string>();

  const handleOnChange = (newValue: string) => {
    setCheckedValues(newValue);
    onChange(newValue);
  }

  return (
    <Radio 
      options={{ NOTHING: '' }} 
      onChange={handleOnChange}
      classNames={{ label: 'jc-start' }}
      value={checkedValues}
      bordered={false}
    />
  );
}

RadioStory.storyName = 'Radio';

export default story;
