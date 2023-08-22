import classNames from "classnames";
import { ReactNode } from "react";

import styles from './styles.module.scss';
export interface RadioWithDescription {
  title: string;
  description?: string;
  icon?: (selected: boolean) => ReactNode;
  hideBox?: boolean;
}

export interface RadioProps<ValueType extends string> {
  options: Record<ValueType, string | RadioWithDescription>;
  value?: ValueType;
  onChange: (value: ValueType) => void;
  wide?: boolean;
  inlineLayout?: boolean;
  classNames?: {
    container?: string;
    label?: string;
    option?: string;
  };
  bordered?: boolean;
}

export const Radio = <ValueType extends string>({
  options,
  value,
  onChange,
  wide = false,
  inlineLayout = false,
  classNames: classNamesObj,
  bordered = true
}: RadioProps<ValueType>) => {
  const entries = Object.entries(options) as [
    ValueType,
    string | RadioWithDescription
  ][];


  return (
    <div
      className={classNames(classNamesObj?.container, styles.container, 'd-flex gap8', {
        [styles.wide]: wide,
        [styles.narrow]: !wide,
        'fd-row': inlineLayout,
        'f-wrap': inlineLayout,
        'fd-column': !inlineLayout,
      })}
    >
      {entries.map(([currentValue, label]) => {
        const checked = value === currentValue;
        const customIcon = (label as RadioWithDescription)?.icon;
        const hideIcon = (label as RadioWithDescription)?.hideBox;

        return (
          <div className={classNamesObj?.option} key={currentValue}>
            <input
              className={classNames(
                "p-radio", {
                  'p-radio--no-icon': customIcon || hideIcon,
                  'p-radio--centered': !label,
                }
              )}
              id={currentValue}
              type="radio"
              value={currentValue}
              onChange={() => onChange(currentValue)}
              checked={checked}
              data-testid={`radio-input-${currentValue}`}
            />

            <label
              htmlFor={currentValue}
              className={classNames(
                classNamesObj?.label,
                'p-label',
                {
                  'jc-center': customIcon,
                  'fd-column': customIcon,
                  'p-label--bordered': bordered
                }
              )}
              data-cy={`radio-${currentValue}`}
              data-testid={`radio-${currentValue}`}
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
