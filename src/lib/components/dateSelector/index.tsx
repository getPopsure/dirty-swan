import { useState, useEffect, ChangeEvent, useRef, KeyboardEvent } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { CalendarDate } from '@popsure/public-models';

import {
  calendarDateToISODate,
  isoStringtoCalendarDate,
} from '../../util/calendarDate';

import styles from './style.module.scss';
import { Input } from '../input';
import classNames from 'classnames';
import { Calendar } from './components/Calendar';

dayjs.extend(localeData);
const COLLECTABLE_DATE_FORMAT = 'YYYY-MM-DD';

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


const isDateValid = (date: string | undefined, yearBoundaries: DateSelectorProps["yearBoundaries"]): boolean => {
  const { min = 0, max = 0 } = yearBoundaries;
  
  if (!date) {
    return false;
  }

  if (max && dayjs(date).isAfter(`${max}-01-01`, 'year')) { 
    return false;
  }
  
  if (min && dayjs(date).isBefore(`${min}-01-01`, 'year')) {  
    return false;
  }
  
  return dayjs(date, COLLECTABLE_DATE_FORMAT, true).isValid();
}

export const DateSelector = ({
  value,
  onChange,
  placeholders: placeholdersProps,
  yearBoundaries,
  displayCalendar,
  dayjsLocale,
  firstDayOfWeek = 0,
}: DateSelectorProps) => {
  const placeholders = {
    ...defaultPlaceholders,
    ...placeholdersProps
  }

  const itemsRef = useRef<HTMLInputElement[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Partial<CalendarDate>>({});

  useEffect(() => {
    const calendarDateValue = value ? isoStringtoCalendarDate(value) : undefined;

    if(value !== calendarDateValue && calendarDateValue?.day && calendarDateValue?.month && calendarDateValue?.year) {
      setInternalValue(calendarDateValue)
      setHasError(!isDateValid(value, yearBoundaries));
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
    
    const isValid = isDateValid(formattedDate, yearBoundaries);

    if (dayjs(formattedDate, COLLECTABLE_DATE_FORMAT, true).isValid()) {
      setIsDirty(true);
    }

    setHasError(!isValid);
    onChange(isValid ? formattedDate : "");
    setIsCalendarOpen(false);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    const currentInput = itemsRef.current?.[index];
    const inputSelectionStart = currentInput?.selectionStart;
    const inputSelectionEnd = currentInput?.selectionEnd;

    if (index > 0 && ['Backspace', "ArrowLeft"].includes(event.key) && inputSelectionStart === 0 && inputSelectionEnd === 0) {
      const prevInput = itemsRef.current?.[index - 1];

      event.preventDefault();
      prevInput?.focus();
      prevInput?.setSelectionRange(0, 3);
    }

    if (
        index < 2
        && event.key === "ArrowRight"
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
        index < 2
        && /^\d+$/.test(event.key)
        && (
          inputSelectionStart === currentInput.maxLength 
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

  const getInputProps = (key: keyof CalendarDate, index: number) => ({
    className: styles[`${key}Input`],
    id: key,
    name: key,
    maxLength: 2,
    required: true,
    label: placeholders?.[key],
    placeholder: placeholders?.[`${key}Format`],
    labelInsideInput: true,
    value: internalValue[key] ?? '',
    error: hasError && isDirty,
    type: "text", 
    ref: (el: HTMLInputElement) => { itemsRef.current[index] = el },
    onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => handleOnKeyUp(event, index),
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => handleOnKeyDown(event, index),
    onChange: ({ target }: ChangeEvent<HTMLInputElement>) => handleOnChange(key, target.value),
  });

  return (
    <div>
      <div className="d-flex ai-center">
        <div className={classNames(styles.container, "d-flex gap8")}>
          <div className={"d-flex gap8 jc-between"}>
            <Input
              data-cy="date-selector-day"
              {...getInputProps('day', 0)}
              inputMode='numeric'
            />

            <Input
              data-cy="date-selector-month"
              {...getInputProps('month', 1)}
              inputMode='numeric'
            />
          </div>

          <Input
            data-cy="date-selector-year"
            {...getInputProps('year', 2)}
            inputMode='numeric'
            maxLength={4}
          />
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
