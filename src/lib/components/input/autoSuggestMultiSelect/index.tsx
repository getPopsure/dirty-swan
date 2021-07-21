import { useState } from 'react';

import { Option } from '../../../models/autoSuggestInput';
import Chip from '../../chip';
import AutoSuggestInput from '../autoSuggestInput';
import styles from './style.module.scss';

export default ({
  options,
  selectedValues,
  setValues,
  placeholder,
  chipsListClassName,
  multiSelectClassName,
}: {
  options: Option[];
  selectedValues?: Option[];
  setValues: (values: Option[]) => void;
  placeholder: string;
  chipsListClassName?: string;
  multiSelectClassName?: string;
}) => {
  const [suggestions, setSuggestions] = useState<Option[]>([]);
  const [currentOption, setCurrentOption] = useState('');

  return (
    <>
      {selectedValues && selectedValues.length > 0 && (
        <div
          className={`mb8 ${styles['chip-container']} ${chipsListClassName}`}
        >
          {selectedValues.map((value, index) => (
            <Chip
              key={`${value.value}-${index}`}
              value={value}
              onRemove={(value: Option) => {
                const newValues = [...selectedValues].filter(
                  (selectedValue) => selectedValue.value !== value.value
                );
                setValues(newValues);
              }}
            />
          ))}
        </div>
      )}
      <AutoSuggestInput
        className={multiSelectClassName}
        placeholder={placeholder}
        onChange={setCurrentOption}
        handleSuggestionSelected={(value) => {
          const newSelectedOptions = selectedValues ?? [];
          newSelectedOptions?.push(value);
          setValues(newSelectedOptions);
          setCurrentOption('');
        }}
        handleSuggestionFetchRequest={({ value }) => {
          const filteredOptions = options.filter(
            (option) =>
              option.value.toLowerCase().startsWith(value.toLowerCase()) &&
              selectedValues?.find(
                (selectedValue) => selectedValue.value === option.value
              ) === undefined
          );
          setSuggestions(filteredOptions);
        }}
        currentOption={currentOption}
        suggestions={suggestions}
        handleSuggestionClearRequest={() => setSuggestions([])}
      />
    </>
  );
};
