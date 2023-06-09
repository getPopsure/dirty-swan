import classNames from "classnames";
import { ReactNode } from "react";

export interface CheckboxWithDescription {
  title: string;
  description?: string;
  icon?: (selected: boolean) => ReactNode;
}

export interface CheckboxProps<ValueType extends string> {
  options: Record<ValueType, string | CheckboxWithDescription>;
  value?: ValueType[];
  onChange: (value: ValueType[]) => void;
  wide?: boolean;
  inlineLayout?: boolean;
  className?: string;
  labelClassName?: string;
  optionClassName?: string
}

export const Checkbox = <ValueType extends string>({
  options,
  value = [],
  onChange,
  wide = false,
  inlineLayout = false,
  className = '',
  labelClassName = '',
  optionClassName = '',
}: CheckboxProps<ValueType> & {  }) => {
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

    const newValues = value
      ? [...value, newValue]
      : [newValue];
    onChange(newValues);
  };


  const entries = Object.entries(options) as [
    ValueType,
    string | CheckboxWithDescription
  ][];

  return (
    <div
      className={classNames(className, 'd-flex gap8', {
        ws10: wide,
        ws6: !wide,
        'fd-row': inlineLayout,
        'f-wrap': inlineLayout,
        'fd-column': !inlineLayout,
      })}
    >
      {entries.map(([currentValue, label]) => {
        const checked = value?.includes(currentValue);
        const customIcon = (label as CheckboxWithDescription)?.icon;

        return (
          <div className={optionClassName} key={currentValue}>
            <input
              className={classNames(
                "p-checkbox", {
                  'p-checkbox--no-icon': customIcon
                }
              )}
              id={currentValue}
              type="checkbox"
              value={currentValue}
              onChange={() => handleOnChange(currentValue)}
              checked={checked}
              data-testid={`checkbox-input-${currentValue}`}
            />

            <label
              htmlFor={currentValue}
              className={classNames(
                labelClassName,
                'p-label p-label--bordered pr16',
                {
                  'jc-center': customIcon,
                  'fd-column': customIcon
                }
              )}
              data-cy={`checkbox-${currentValue}`}
              data-testid={`checkbox-${currentValue}`}
            >
              {customIcon && (
                <div className="mt8">{customIcon?.(checked)}</div>
              )}

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
