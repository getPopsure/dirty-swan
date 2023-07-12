import { useState } from 'react';
import { AutoSuggestMultiSelect, AutoSuggestMultiSelectProps } from '.';
import { Option } from '../../../models/autoSuggestInput';
import featherLogo from '../../cards/icons/feather-logo.svg';

const story = {
  title: 'JSX/Inputs/AutoSuggestMultiSelect',
  subtitle: 'sgsg',
  component: AutoSuggestMultiSelect,
  argTypes: {
    options: {
      description: 'List of all options available to search from',
      defaultValue: [
        { value: 'feather', leftIcon: featherLogo },
        { value: 'feather2', leftIcon: featherLogo },
        {
          value: 'feather3',
          leftIcon: featherLogo,
        },
        {
          value: 'dirtyswan',
          leftIcon: featherLogo,
        },
        {
          value: 'test value',
          leftIcon: featherLogo,
        },
      ],
      table: {
        type: { 
          summary: 'Option[]'
        },
      },
    },
    selectedValues: {
      description: 'List of all selected values',
      defaultValue: [
        { value: 'feather', leftIcon: featherLogo },
        { value: 'feather2', leftIcon: featherLogo },
      ],
      table: {
        type: { 
          summary: 'Option[]'
        },
      },
    },
    placeholder: {
      defaultValue: 'Placeholder',
      description: 'Placeholder for DirtySwan Input component'
    },
    chipsListClassName: {
      defaultValue: '',
      description: 'Class name for the most parent element of the Chip component',
      control: { type: 'text' }
    },
    multiSelectClassName: {
      defaultValue: '',
      description: 'Class name for the most parent element of the AutoSuggestInput component',
      control: { type: 'text' }
    },
    wrapText: {
      defaultValue: false,
      description: 'Wether or not wrap the entries in the dropdown or hide overflown text',
    },
    setValues: {
      description: 'Function that runs when selecting values',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
  },
  parameters: {
    componentSubtitle: 'AutoSuggestMultiSelect is a combination of the AutoSuggestInput and Chip components',
    docs: {
      description: {
        component: `This component allows quick search via the input field to find an option for selection.
        \nUpon selecting an option, the option is displayed above the input field as a chip.
        \nThe chip can be removed by clicking on the X button. Multi options can be selected as well.
        \nProp \`setValues\` function must be provided to keep track of removed and added option selections.`
      },
    },
    customTypes: {
      Option: `interface Option {
      value: string; // value of option to be stored and displayed on UI
      leftIcon?: string; // image of the provided option to be displayed on UI
}`
    }
  },
};

export const AutoSuggestMultiSelectStory = ({
  options,
  selectedValues,
  setValues,
  placeholder,
  chipsListClassName,
  multiSelectClassName,
  wrapText,
}: AutoSuggestMultiSelectProps) => {
  const [values, setSelectedValues] = useState(selectedValues);

  const handleSetValues = (options: Option[]) => {
    setValues(options);
    setSelectedValues(options);
  }

  return (
    <div style={{ minHeight: '240px' }}>
      <AutoSuggestMultiSelect
       options={options}
       selectedValues={values}
       setValues={handleSetValues}
       placeholder={placeholder}
       chipsListClassName={chipsListClassName}
       multiSelectClassName={multiSelectClassName}
       wrapText={wrapText}
      />
    </div>
  );
};

AutoSuggestMultiSelectStory.storyName = "AutoSuggestMultiSelect";

export default story;
