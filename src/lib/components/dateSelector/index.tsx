import { useState, useEffect, ChangeEvent, useRef, KeyboardEvent } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { CalendarDate } from '@popsure/public-models';

import {
  calendarDateToISODate,
  isoStringtoCalendarDate,
} from '../../util/calendarDate';

import styles from './style.module.scss';
import { Input, InputProps } from '../input';
import classNames from 'classnames';
import { Calendar } from './components/Calendar';

dayjs.extend(localeData);
const COLLECTABLE_DATE_FORMAT = 'YYYY-MM-DD';
type FormatPlaceholder = 'dayFormat' | 'monthFormat' | 'yearFormat';

interface DateSelectorInputProps extends InputProps {
  'data-cy': string;
  'data-testid': string;
  ref: (el: HTMLInputElement) => void;
}

export interface DateSelectorProps {
  value?: string;
  onChange: (date: string) => void;
  yearBoundaries: { min: number; max: number };
  displayCalendar?: boolean;
  dayjsLocale?: ILocale;
  placeholders?: {
    day?: string;
    dayFormat?: string;
    month?: string;
    monthFormat?: string;
    year?: string;
    yearFormat?: string;
    error?: string;
    errorBeforeMinYear?: string;
    errorAfterMaxYear?: string;
  };
  firstDayOfWeek?: number;
  inputProps?: (key: keyof CalendarDate) => Partial<DateSelectorInputProps>;
}

const defaultPlaceholders: DateSelectorProps["placeholders"] = {
  day: "Day",
  dayFormat: "DD",
  month: "Month",
  monthFormat: "MM",
  year: "Year",
  yearFormat: "YYYY",
  error: "Please enter a valid date"
}

type ErrorType = 'afterMax' | 'beforeMin' | 'default';

const isDateValid = (
  date: string | undefined,
  yearBoundaries: DateSelectorProps["yearBoundaries"],
  dateObject: Partial<CalendarDate>,
): {
  isValid: boolean;
  errorType?: ErrorType;
} => {
  const { min = 0, max = 0 } = yearBoundaries;
  
  if (!date) {
    return { isValid: false, errorType: 'default' };
  }

  const isValidYear = dateObject?.year && String(dateObject?.year).length === 4;

  if (max && dayjs(date).isAfter(`${max}-01-01`, 'year')) { 
    return { isValid: false, errorType: isValidYear ? 'afterMax' : 'default' };
  }
  
  if (min && dayjs(date).isBefore(`${min}-01-01`, 'year')) {  
    return { isValid: false, errorType: isValidYear ? 'beforeMin' : 'default' };
  }
  
  const isValidDate = dayjs(date, COLLECTABLE_DATE_FORMAT, true).isValid();

  return {
    isValid: isValidDate,
    errorType: 'default'
  };
}

export const DateSelector = ({
  value,
  onChange,
  placeholders: placeholdersProps,
  yearBoundaries,
  displayCalendar,
  dayjsLocale,
  firstDayOfWeek = 0,
  inputProps,
}: DateSelectorProps) => {
  const placeholders = {
    ...defaultPlaceholders,
    ...placeholdersProps
  }

  const itemsRef = useRef<HTMLInputElement[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [hasError, setHasError] = useState<ErrorType>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Partial<CalendarDate>>({});

  useEffect(() => {
    const calendarDateValue = value ? isoStringtoCalendarDate(value) : undefined;

    if(value !== calendarDateValue && calendarDateValue?.day && calendarDateValue?.month && calendarDateValue?.year) {
      const { isValid, errorType } = isDateValid(value, yearBoundaries, calendarDateValue)
      setInternalValue(calendarDateValue)
      setHasError(isValid ? undefined : errorType);
      setIsDirty(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]); 


  const handleOnChange = (key: keyof CalendarDate, v?: string) => {
    const tempValue = { ...internalValue, [key]: v || undefined };
    setInternalValue(tempValue);

    const formattedDate =  calendarDateToISODate({
      day: tempValue.day || 0,
      month: tempValue.month || 0,
      year: tempValue.year || 0,
    })
    
    const { isValid, errorType } = isDateValid(formattedDate, yearBoundaries, tempValue);
    const isDateInValidFormat = dayjs(formattedDate, COLLECTABLE_DATE_FORMAT, true).isValid();
    
    if (isDateInValidFormat) {
      setIsDirty(true);
    }

    setHasError(isValid ? undefined : errorType);
    setIsCalendarOpen(false);

    if (isDateInValidFormat || isDirty) {
      onChange(isValid ? formattedDate : "");
    }
  };

  const getInputProps = (key: keyof CalendarDate, index: number): DateSelectorInputProps => ({
    'data-cy': `date-selector-${key}`,
    'data-testid': `date-selector-${key}`,
    className: styles[`${key}Input`],
    id: key,
    name: key,
    maxLength: key === 'year' ? 4 : 2,
    required: true,
    label: placeholders?.[key],
    placeholder: placeholders?.[`${key}Format` as FormatPlaceholder] ?? "",
    labelInsideInput: true,
    value: internalValue[key] ?? '',
    error: hasError && isDirty,
    type: "text", 
    inputMode: "numeric",
    ref: (el: HTMLInputElement) => { itemsRef.current[index] = el }, 
    onChange: ({ target }: ChangeEvent<HTMLInputElement>) => handleOnChange(key, target.value),
    ...inputProps?.(key) || {},
  });

  return (
    <div>
      <div className="d-flex ai-center">
        <div className={classNames(styles.container, "d-flex gap8")}>
          <div className={"d-flex gap8 jc-between"}>
            <Input {...getInputProps('day', 0)} />

            <Input {...getInputProps('month', 1)} />
          </div>

          <Input {...getInputProps('year', 2)} />
        </div>

        <Calendar
          dateFormat={COLLECTABLE_DATE_FORMAT}
          yearBoundaries={yearBoundaries}
          displayCalendar={displayCalendar}
          dayjsLocale={dayjsLocale}
          firstDayOfWeek={firstDayOfWeek}
          isOpen={isCalendarOpen}
          setCalendarOpen={setIsCalendarOpen}
          value={value}
          onChange={onChange}
        />
      </div>

      {hasError && isDirty && (
        <p 
          className={classNames(
            hasError && isDirty ? 'd-block' : 'd-none',
            "p-p--small tc-red-500 w100 mt8"
          )}
          data-testid="date-error-message"
        >
          {{
            default: placeholders.error,
            afterMax: placeholders.errorAfterMaxYear || `Please choose a date before ${yearBoundaries.max + 1}`,
            beforeMin: placeholders.errorBeforeMinYear || `Please choose a date after ${yearBoundaries.min - 1}`,
          }[hasError || "default"]}
        </p>
      )}
    </div>
  );
};
