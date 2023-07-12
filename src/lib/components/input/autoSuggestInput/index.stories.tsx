import { useState } from 'react';
import { AutoSuggestInput, AutoSuggestInputProps } from '.';
import { Option } from '../../../models/autoSuggestInput';
import featherLogo from '../../cards/icons/feather-logo.svg';

const story = {
  title: 'JSX/Inputs/AutoSuggestInput',
  component: AutoSuggestInput,
  argTypes: {
    suggestions: {
      description: 'List of suggestions that should be displayed to the respective input',
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
      ]
    },
    currentOption: {
      defaultValue: 'feather',
      description: 'Current input of the component by user',
    },
    placeholder: {
      defaultValue: 'Placeholder',
      description: 'Placeholder for DirtySwan Input component'
    },
    className: {
      defaultValue: '',
      description: 'Class name for the most parent element',
      control: { type: 'text' }
    },
    wrapText: {
      defaultValue: false,
      description: 'Wether or not wrap the entries in the dropdown or hide overflown text',
    },
    inputProps: {
      defaultValue: {},
      description: 'Pass through arbitrary props to the input.',
      control: { type: 'object' },
      table: {
        type: { 
          summary: 'InputHTMLAttributes'
        },
      },
    },
    handleSuggestionSelected: {
      description: 'Function that runs when a suggestion is selected from the dropdown',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    onChange: {
      description: 'Function that is called when value of current input changes',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    handleSuggestionFetchRequest: {
      description: 'Function that allows control of which suggestions should be displayed',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
    handleSuggestionClearRequest: {
      description: 'Function that runs when suggestions are cleared (eg. input removal, selecting suggestion)',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
  },
  parameters: {
    componentSubtitle: 'This component allows quick search via the input field to find an option for selection',
    customTypes: {
      Option: `interface Option {
      value: string; // value of option to be stored and displayed on UI
      leftIcon?: string; // image of the provided option to be displayed on UI
}`
    }
  },
};

export const AutoSuggestInputStory = ({
  currentOption = '', 
  suggestions,
  handleSuggestionSelected,
  onChange,
  handleSuggestionFetchRequest,
  handleSuggestionClearRequest,
  placeholder,
  className,
  wrapText,
  inputProps,
}: AutoSuggestInputProps) => {
  
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState(currentOption);
  const [options, setOptions] = useState([]);

  const handleSelected = (value: Option) => {
    handleSuggestionSelected(value);

    const newSelectedOptions = [...selectedValues, value];
    setSelectedValues(newSelectedOptions);
    setSelectedOption(value.value);
  };

  const handleFetchRequest = (value: Option) => {
    handleSuggestionFetchRequest(value);

    const filteredOptions = options.filter((option: Option) =>
      option.value.toLowerCase().startsWith(option.value.toLowerCase())
    );
    setSelectedValues(filteredOptions);
  };

  const handleClearSuggestions = () => {
    handleSuggestionClearRequest();

    setOptions([]);
  };

  const handleOnChange = (value: string) => {
    onChange(value);

    setSelectedOption(value);
  };

  return (
    <div style={{ minHeight: '300px' }}>
      <AutoSuggestInput
        currentOption={selectedOption}
        suggestions={suggestions}
        handleSuggestionSelected={handleSelected}
        onChange={handleOnChange}
        handleSuggestionFetchRequest={handleFetchRequest}
        handleSuggestionClearRequest={handleClearSuggestions}
        placeholder={placeholder}
        className={className}
        wrapText={wrapText}
        inputProps={inputProps}
      />
    </div>
  );
};

AutoSuggestInputStory.storyName = "AutoSuggestInput";

export default story;
