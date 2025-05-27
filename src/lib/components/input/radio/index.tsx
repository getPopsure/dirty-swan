import classNames from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';
import generateId from '../../../util/generateId';
export interface RadioWithDescription {
  title: ReactNode;
  description?: string;
  icon?: (selected: boolean) => ReactNode;
  hideBox?: boolean;
}

export interface RadioProps<ValueType extends string> {
  options: Record<ValueType, ReactNode | RadioWithDescription>;
  value?: ValueType;
  onChange: (value: ValueType) => void;
  wide?: boolean;
  inlineLayout?: boolean;
  inlineIcon?: boolean;
  classNames?: {
    container?: string;
    label?: string;
    option?: string;
  };
  bordered?: boolean;
  disabled?: boolean;
  fieldLegend?: string;
  groupName?: string;
}

export const Radio = <ValueType extends string>({
  options,
  value,
  onChange,
  wide = false,
  inlineLayout = false,
  inlineIcon = false,
  classNames: classNamesObj,
  bordered = true,
  disabled = false,
  fieldLegend = 'Select an option',
  groupName,
}: RadioProps<ValueType>) => {
  const entries = Object.entries(options) as [
    ValueType,
    ReactNode | RadioWithDescription
  ][];

  const name = groupName ?? generateId();

  return (
    <fieldset
      className={classNames(
        classNamesObj?.container,
        styles.container,
        'd-flex gap8',
        {
          [styles.wide]: wide,
          [styles.narrow]: !wide,
          'fd-row': inlineLayout,
          'f-wrap': inlineLayout,
          'fd-column': !inlineLayout,
        }
      )}
    >
      <legend className="sr-only">{fieldLegend}</legend>
      {entries.map(([currentValue, label]) => {
        const checked = value === currentValue;
        const customIcon = (label as RadioWithDescription)?.icon;
        const hideIcon = (label as RadioWithDescription)?.hideBox;

        const isRadioLabelObject = (
          label: ReactNode | RadioWithDescription
        ): label is RadioWithDescription => {
          return (label as RadioWithDescription).title !== undefined;
        };

        return (
          <div className={classNamesObj?.option} key={currentValue}>
            <input
              className={classNames('p-radio', {
                'p-radio--no-icon': customIcon || hideIcon,
                'p-radio--centered': !label,
              })}
              id={currentValue}
              type="radio"
              value={currentValue}
              onChange={() => onChange(currentValue)}
              checked={checked}
              data-testid={`radio-input-${currentValue}`}
              disabled={disabled}
              name={name}
            />

            <label
              htmlFor={currentValue}
              className={classNames(classNamesObj?.label, 'p-label', {
                'jc-center': customIcon && !inlineIcon,
                'fd-column': customIcon && !inlineIcon,
                'p-label--bordered': bordered,
              })}
              data-cy={`radio-${currentValue}`}
              data-testid={`radio-${currentValue}`}
            >
              {customIcon && (
                <div
                  className={classNames(
                    'd-inline-flex ai-center jc-center',
                    inlineIcon ? 'mr8' : 'mt8'
                  )}
                >
                  {customIcon?.(checked)}
                </div>
              )}

              {isRadioLabelObject(label) ? (
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
