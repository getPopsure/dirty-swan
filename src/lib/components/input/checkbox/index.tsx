import classNames from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';
export interface CheckboxWithDescription {
  title: ReactNode;
  description?: string;
  icon?: (selected: boolean) => ReactNode;
}

export interface CheckboxProps<ValueType extends string> {
  options: Record<ValueType, ReactNode | CheckboxWithDescription>;
  value?: ValueType[];
  onChange: (value: ValueType[]) => void;
  wide?: boolean;
  inlineLayout?: boolean;
  bordered?: Boolean;
  classNames?: {
    container?: string;
    label?: string;
    option?: string;
  };
  fieldLegend?: string;
}

export const Checkbox = <ValueType extends string>({
  options,
  value = [],
  onChange,
  wide = false,
  inlineLayout = false,
  bordered = true,
  classNames: classNamesObj,
  fieldLegend,
}: CheckboxProps<ValueType> & {}) => {
  const hasNoneValue = Object.keys(options).includes('NONE');

  const handleOnChange = (newValue: ValueType) => {
    if (value?.includes(newValue)) {
      const filteredCheckboxValues = value.filter(
        (selectedValue) => selectedValue !== newValue
      );

      onChange(filteredCheckboxValues);
      return;
    }

    if (hasNoneValue && newValue === 'NONE') {
      onChange([newValue]);
      return;
    }

    if (hasNoneValue && newValue !== 'NONE') {
      const newValues = value
        ? [...value.filter((v) => v !== 'NONE'), newValue]
        : [newValue];
      onChange(newValues);
      return;
    }

    const newValues = value ? [...value, newValue] : [newValue];
    onChange(newValues);
  };

  const entries = Object.entries(options) as [
    ValueType,
    ReactNode | CheckboxWithDescription
  ][];

  const isCheckboxLabelObject = (
    label: ReactNode | CheckboxWithDescription
  ): label is CheckboxWithDescription => {
    return (label as CheckboxWithDescription).title !== undefined;
  };

  return (
    <fieldset
      className={classNames(
        classNamesObj?.container,
        styles.container,
        'd-flex gap8',
        {
          [styles.narrow]: !wide,
          'fd-row': inlineLayout,
          'f-wrap': inlineLayout,
          'fd-column': !inlineLayout,
        }
      )}
    >
      <legend className="sr-only">
        {fieldLegend ?? 'Select one or more options'}
      </legend>
      {entries.map(([currentValue, label]) => {
        const checked = value?.includes(currentValue);
        const customIcon = (label as CheckboxWithDescription)?.icon;

        return (
          <div className={classNamesObj?.option} key={currentValue}>
            <input
              className={classNames('p-checkbox', {
                'p-checkbox--no-icon': customIcon,
              })}
              id={currentValue}
              type="checkbox"
              value={currentValue}
              onChange={() => handleOnChange(currentValue)}
              checked={checked}
              data-testid={`checkbox-input-${currentValue}`}
            />

            <label
              htmlFor={currentValue}
              className={classNames(classNamesObj?.label, 'p-label pr16', {
                'p-label--bordered': bordered,
                'jc-center': customIcon,
                'fd-column': customIcon,
              })}
              data-cy={`checkbox-${currentValue}`}
              data-testid={`checkbox-${currentValue}`}
            >
              {customIcon && <div className="mt8">{customIcon?.(checked)}</div>}

              {isCheckboxLabelObject(label) ? (
                <div>
                  <p className="p-p">{label.title}</p>
                  <span className="d-block p-p p-p--small tc-grey-600">
                    {label.description}
                  </span>
                </div>
              ) : (
                label
              )}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};
