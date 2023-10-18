import classNames from "classnames";

import styles from './styles.module.scss';
export interface ToggleWithDescription {
  title: string;
  description?: string;
}

export interface ToggleProps<ValueType extends string> {
  options: Record<ValueType, string | ToggleWithDescription>;
  value?: ValueType[];
  onChange: (value: ValueType[]) => void;
  inlineLayout?: boolean;
  bordered?: Boolean,
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
}: ToggleProps<ValueType> & {  }) => {
  const hasNoneValue = Object.keys(options).includes('NONE');

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
                />
                <span className={styles.toggle} />
              </span>
              
              {typeof label === 'string' ? label : (
                <div>
                  <p className="p-p">{label.title}</p>
                  <span className="d-block p-p p-p--small tc-grey-600">
                    {label.description}
                  </span>
                </div>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
};
