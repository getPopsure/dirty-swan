import { useState } from 'react';
import Autosuggest from 'react-autosuggest';

import styles from './style.module.scss';
import { limitTextLength } from '../../util/limitTextLength';
import { Option } from '../../models/suggestMultiSelect';
import ChipList from '../chipList';
import Input from '../input';

export default ({
  options,
  selectedValues,
  setValues,
  placeholder,
}: {
  options: Option[];
  selectedValues?: Option[];
  setValues: (values: Option[]) => void;
  placeholder: string;
}) => {
  const [suggestions, setSuggestions] = useState<Option[]>([]);
  const [currentOption, setCurrentOption] = useState('');

  const renderSuggestion = (suggestion: Option) => (
    <div className={styles['suggestion-option']}>
      {suggestion.img && (
        <img
          className={`mr16 ${styles['suggestion-img']}`}
          src={suggestion.img}
          alt={suggestion.value}
        />
      )}
      {limitTextLength(suggestion.value, 24)}
    </div>
  );

  const getSuggestionValue = (suggestion: Option) => suggestion.value;

  const handleSuggestionFetchRequest = ({ value }: Option) => {
    const filteredOptions = options.filter(
      (option) =>
        option.value.toLowerCase().startsWith(value.toLowerCase()) &&
        selectedValues?.find(
          (selectedValue) => selectedValue.value === option.value
        ) === undefined
    );
    setSuggestions(filteredOptions);
  };

  const handleSuggestionClearRequest = () => {
    setSuggestions([]);
  };

  const renderInputComponent = (inputProps: any) => (
    <Input
      {...inputProps}
      placeholder={placeholder}
      data-cy="suggest-multi-select-input"
    />
  );

  return (
    <>
      {selectedValues && selectedValues.length > 0 && (
        <ChipList
          values={selectedValues}
          onRemove={(value: Option) => {
            const newValues = [...selectedValues].filter(
              (selectedValue) => selectedValue.value !== value.value
            );
            setValues(newValues);
          }}
          className="wmx9 mb16"
        />
      )}
      <div className="wmx5">
        <Autosuggest
          theme={styles}
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleSuggestionFetchRequest}
          onSuggestionsClearRequested={handleSuggestionClearRequest}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          highlightFirstSuggestion={true}
          inputProps={{
            value: currentOption,
            onChange: (_, { newValue }) => {
              setCurrentOption(newValue);
            },
          }}
          onSuggestionSelected={(_, { suggestion }) => {
            const newSelectedOptions = selectedValues ?? [];
            newSelectedOptions?.push(suggestion);
            setValues(newSelectedOptions);
            setCurrentOption('');
          }}
          renderInputComponent={renderInputComponent}
        />
      </div>
    </>
  );
};
