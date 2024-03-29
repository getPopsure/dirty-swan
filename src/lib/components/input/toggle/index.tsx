import { ReactNode } from "react";
import classNames from "classnames";

import styles from './styles.module.scss';
export interface ToggleWithDescription {
  title: ReactNode;
  description?: string;
}

export interface ToggleProps<ValueType extends string> {
  options: Record<ValueType, ReactNode | ToggleWithDescription>;
  value?: ValueType[];
  onChange: (value: ValueType[]) => void;
  inlineLayout?: boolean;
  disabled?: boolean;
  bordered?: boolean,
  classNames?: {
    container?: string;
    label?: string;
    option?: string;
  }
}

export const Toggle = <ValueType extends string>({
  options,
  value = [],
  onChange,
  inlineLayout = false,
  bordered = true,
  classNames: classNamesObj,
  disabled,
}: ToggleProps<ValueType> & {  }) => {
  const hasNoneValue = Object.keys(options).includes('NONE');

  const isToggleLabelObject = (
    label: ReactNode | ToggleWithDescription
  ): label is ToggleWithDescription => {
    return (label as ToggleWithDescription).title !== undefined;
  };

  const handleOnChange = (newValue: ValueType) => {
    if (value?.includes(newValue)) {
      const filteredToggleValues = value.filter(
        (selectedValue) => selectedValue !== newValue
      );

      onChange(filteredToggleValues);
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

    const newValues = value
      ? [...value, newValue]
      : [newValue];
    onChange(newValues);
  };


  const entries = Object.entries(options) as [
    ValueType,
    string | ToggleWithDescription
  ][];

  return (
    <div
      className={classNames(classNamesObj?.container, styles.container, 'd-flex gap8', {
        'fd-row': inlineLayout,
        'f-wrap': inlineLayout,
        'fd-column': !inlineLayout,
      })}
    >
      {entries.map(([currentValue, label]) => {
        const checked = value?.includes(currentValue);

        return (
          <div className={classNamesObj?.option} key={currentValue}>
            <label
              className={classNames(
                styles.label,
                classNamesObj?.label,
                'p-label pr16 gap16',
                {
                  'p-label--bordered': bordered,
                }
              )}
              data-cy={`toggle-${currentValue}`}
              data-testid={`toggle-${currentValue}`}
            >
              <span className={classNames(styles.toggleContainer, 'd-inline-block')}>
                <input 
                  checked={checked}
                  className={styles.input}
                  data-testid={`toggle-input-${currentValue}`}
                  onChange={() => handleOnChange(currentValue)}
                  type="checkbox" 
                  value={currentValue}
                  disabled={disabled}
                />
                <span className={styles.toggle} />
              </span>
              
              {isToggleLabelObject(label) ? (
                <div>
                  <p className="p-p">{label.title}</p>
                  <span className="d-block p-p p-p--small tc-grey-600">
                    {label.description}
                  </span>
                </div>
              ) : label}
            </label>
          </div>
        );
      })}
    </div>
  );
};
