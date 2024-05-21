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

type ErrorField = 'all' | 'day' | 'month' | 'year' | undefined;

const isDateValid = (
  date: string | undefined,
  yearBoundaries: DateSelectorProps["yearBoundaries"]
): {
  isValid: boolean;
  field?: ErrorField;
} => {
  const { min = 0, max = 0 } = yearBoundaries;

  if (!date) {
    return { isValid: false, field: 'all' };
  }

  if (max && dayjs(date).isAfter(`${max}-01-01`, 'year')) { 
    return { isValid: false, field: 'year' };
  }
  
  if (min && dayjs(date).isBefore(`${min}-01-01`, 'year')) {  
    return { isValid: false, field: 'year' };
  }
  
  const isDateValid = dayjs(date, COLLECTABLE_DATE_FORMAT, true).isValid();

  return {
    isValid: isDateValid,
    field: isDateValid ? undefined : 'all',
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
  const [hasError, setHasError] = useState<ErrorField>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Partial<CalendarDate>>({});

  useEffect(() => {
    const calendarDateValue = value ? isoStringtoCalendarDate(value) : undefined;

    if(value !== calendarDateValue && calendarDateValue?.day && calendarDateValue?.month && calendarDateValue?.year) {
      const { isValid, field } = isDateValid(value, yearBoundaries)
      setInternalValue(calendarDateValue)
      setHasError(isValid ? undefined : field);
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
    
    const { isValid, field } = isDateValid(formattedDate, yearBoundaries);

    if (dayjs(formattedDate, COLLECTABLE_DATE_FORMAT, true).isValid()) {
      setIsDirty(true);
    }

    setHasError(isValid ? undefined : field);
    onChange(isValid ? formattedDate : "");
    setIsCalendarOpen(false);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    const currentInput = itemsRef.current?.[index];
    const inputSelectionStart = currentInput?.selectionStart;
    const inputSelectionEnd = currentInput?.selectionEnd;

    if (
      // is not day input
      index > 0 &&
      // has clicked backspace or arrow left
      ['Backspace', "ArrowLeft"].includes(event.key) && 
      // is focused at the first character of the input
      inputSelectionStart === 0 && inputSelectionEnd === 0
    ) {
      const prevInput = itemsRef.current?.[index - 1];

      event.preventDefault();
      prevInput?.focus();
      prevInput?.setSelectionRange(0, 3);
    }

    if (
        // is not year input
        index < 2
        // has clicked arrow right
        && event.key === "ArrowRight"
        // is focused at the last character of the input value
        && inputSelectionStart === currentInput.value.length
      ) {
      const nextInput = itemsRef.current?.[index + 1];
      
      event.preventDefault();
      nextInput?.focus();
      nextInput?.setSelectionRange(0, index === 1 ? 4 : 3);
    }
  }

  const handleOnKeyUp = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    const currentInput = itemsRef.current?.[index];
    const inputSelectionStart = currentInput?.selectionStart;

    if (
        // is not year input
        index < 2
        // is a number key
        && /^\d+$/.test(event.key)
        && (
          // is focused at the last character of the input value
          inputSelectionStart === currentInput.maxLength 
          // or month value is over 1 or day value is over 3
          || Number(currentInput.value) > (index === 1 ? 1 : 3)
        )
      ) {
      const nextInput = itemsRef.current?.[index + 1];
      
      event.preventDefault();
      event.stopPropagation();
      
      nextInput?.focus();
      nextInput?.setSelectionRange(0, index === 1 ? 4 : 3);
    }
  }

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
    error: (hasError && [key, 'all'].includes(hasError)) && isDirty,
    type: "text", 
    inputMode: "numeric",
    ref: (el: HTMLInputElement) => { itemsRef.current[index] = el }, 
    onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => handleOnKeyUp(event, index),
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => handleOnKeyDown(event, index),
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
        <p className="p-p--small tc-red-500 w100 mt8">
          {placeholders.error}
        </p>
      )}
    </div>
  );
};
