import classNames from 'classnames';
import Autosuggest, { RenderInputComponentProps } from 'react-autosuggest';

import styles from './style.module.scss';
import { Option } from '../../../models/autoSuggestInput';
import { Input, InputProps } from '../index';

export interface AutoSuggestInputProps {
  currentOption: string;
  suggestions: Option[];
  handleSuggestionSelected: (value: Option) => void;
  onChange: (value: string) => void;
  handleSuggestionFetchRequest: (value: Option) => void;
  handleSuggestionClearRequest: () => void;
  placeholder: string;
  className?: string;
  wrapText?: boolean;
  inputProps?: Omit<RenderInputComponentProps, 'value' | 'onChange'>;
}

export const AutoSuggestInput = ({
  currentOption,
  suggestions,
  handleSuggestionSelected,
  onChange,
  handleSuggestionFetchRequest,
  handleSuggestionClearRequest,
  placeholder,
  className,
  wrapText,
  inputProps
}: AutoSuggestInputProps) => {
  const renderSuggestion = (suggestion: Option) => (
    <div className={`${styles['suggestion-option']}`}>
      {suggestion.leftIcon && (
        <img
          className={`mr16 ${styles['suggestion-img']}`}
          src={suggestion.leftIcon}
          alt={suggestion.value}
        />
      )}
      <div
        className={classNames(styles['suggestion-text'], {
          [styles.nowrap]: !wrapText,
        })}
      >
        {suggestion.value}
      </div>
    </div>
  );

  const getSuggestionValue = (suggestion: Option) => suggestion.value;

  const renderInputComponent = (autoSuggestInputProps: Omit<InputProps, 'ref'>) => (
    <Input
      {...autoSuggestInputProps}
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
          ...inputProps,
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
