import Autosuggest from 'react-autosuggest';

import styles from './style.module.scss';
import { Option } from '../../../models/autoSuggestInput';
import Input from '../index';

export default ({
  currentOption,
  suggestions,
  handleSuggestionSelected,
  onChange,
  handleSuggestionFetchRequest,
  handleSuggestionClearRequest,
  placeholder,
  className,
}: {
  currentOption: string;
  suggestions: Option[];
  handleSuggestionSelected: (value: Option) => void;
  onChange: (value: string) => void;
  handleSuggestionFetchRequest: (value: Option) => void;
  handleSuggestionClearRequest: () => void;
  placeholder: string;
  className?: string;
}) => {
  const renderSuggestion = (suggestion: Option) => (
    <div className={`${styles['suggestion-option']}`}>
      {suggestion.leftIcon && (
        <img
          className={`mr16 ${styles['suggestion-img']}`}
          src={suggestion.leftIcon}
          alt={suggestion.value}
        />
      )}
      <div className={styles['suggestion-text']}>{suggestion.value}</div>
    </div>
  );

  const getSuggestionValue = (suggestion: Option) => suggestion.value;

  const renderInputComponent = (inputProps: any) => (
    <Input
      {...inputProps}
      placeholder={placeholder}
      data-cy="suggest-multi-select-input"
    />
  );

  return (
    <div className={className}>
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
            onChange(newValue);
          },
        }}
        onSuggestionSelected={(_, { suggestion }) => {
          handleSuggestionSelected(suggestion);
        }}
        renderInputComponent={renderInputComponent}
      />
    </div>
  );
};
