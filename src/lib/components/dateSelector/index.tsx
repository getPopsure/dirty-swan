import { useState, useEffect } from 'react';
import moment from 'moment';
import { CalendarDate } from '@popsure/public-models';
import DayPicker from 'react-day-picker';

import {
  calendarDateToISODate,
  isoStringtoCalendarDate,
} from '../../util/calendarDate';
import styles from './style.module.scss';
import './datepicker.scss';
import calendarIcon from './icons/calendar.svg';

const COLLECTABLE_DATE_FORMAT = 'YYYY-MM-DD';

/*
  Fill an array with an increment from a number to another number.
  i.e. fillArray from 1 to 4 will return the following: [1, 2, 3, 4]
  
  You can fill descending by flipping the to value
  i.e. fillArray from 4 to 1 will return the following: [4, 3, 2, 1]
*/
export const fillArray = (from: number, to: number): number[] => {
  const ascending = from > to;
  const arraySize = Math.abs(from - to) + 1;
  const toReturn = new Array(arraySize).fill(0).map((_, index) => {
    return ascending ? to + index : from + index;
  });

  if (ascending) {
    return toReturn.reverse();
  }

  return toReturn;
};

/*
  Return the maximum number of days given a month and a year.
*/
export const daysInMonthOfYear = ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  return moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
};

const DateSelector = ({
  value,
  onChange,
  yearBoundaries,
  displayCalendar,
}: {
  value?: string;
  onChange: (date: string) => void;
  yearBoundaries: { min: number; max: number };
  displayCalendar?: boolean;
}) => {
  const calendarDateValue = value ? isoStringtoCalendarDate(value) : undefined;
  const daysInSelectedDate = calendarDateValue
    ? daysInMonthOfYear({
        month: calendarDateValue.month,
        year: calendarDateValue.year,
      })
    : 31;
  const availableDays = fillArray(1, daysInSelectedDate);
  const availableYears = fillArray(yearBoundaries.max, yearBoundaries.min);
  const availableMonths = moment.monthsShort();

  const [date, setDate] = useState<Partial<CalendarDate>>(
    calendarDateValue ?? {}
  );
  const [openCalendar, setOpenCalendar] = useState(false);

  const selectedDateInDateType = value ? moment(value).toDate() : undefined;
  const dateCalendarFromMonth = moment(String(yearBoundaries.min))
    .startOf('year')
    .toDate();
  const dateCalendarToMonth = moment(String(yearBoundaries.max))
    .endOf('year')
    .toDate();

  useEffect(() => {
    if (calendarDateValue) {
      setDate(calendarDateValue);
    }
  }, [value]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      date.year !== undefined &&
      date.month !== undefined &&
      date.day !== undefined
    ) {
      if (
        calendarDateValue === undefined ||
        date.day !== calendarDateValue.day ||
        date.month !== calendarDateValue.month ||
        date.year !== calendarDateValue.year
      ) {
        onChange(
          calendarDateToISODate({
            day: date.day,
            month: date.month,
            year: date.year,
          })
        );
      }
    }
  }, [date]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleOnChange = (key: keyof CalendarDate, v: number) => {
    const newValue = { ...date, [key]: v };
    if (
      key !== 'day' &&
      newValue.month !== undefined &&
      newValue.year !== undefined &&
      newValue.day !== undefined
    ) {
      const cappedDays = Math.min(
        daysInMonthOfYear({ month: newValue.month, year: newValue.year }),
        newValue.day
      );
      setDate({ ...newValue, day: cappedDays });
    } else {
      setDate(newValue);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['date-selector-container']}>
        <div className={styles['row-container']}>
          <select
            data-cy="date-selector-day"
            className={`p-select ${styles['day-select']}`}
            id="day"
            name="day"
            required={true}
            value={date.day ?? ''}
            onChange={(e) => {
              handleOnChange('day', parseInt(e.target.value, 10));
            }}
          >
            <option value="" disabled={true}>
              Day
            </option>
            {availableDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            data-cy="date-selector-month"
            className={`p-select ${styles['month-select']}`}
            id="month"
            name="month"
            required={true}
            value={date.month ?? ''}
            onChange={(e) => {
              handleOnChange('month', parseInt(e.target.value, 10));
            }}
          >
            <option value="" disabled={true}>
              Month
            </option>
            {availableMonths.map((month, i) => (
              <option key={month} value={i + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <select
          data-cy="date-selector-year"
          className={`p-select ${styles['year-select']}`}
          id="year"
          name="year"
          required={true}
          value={date.year ?? ''}
          onChange={(e) => {
            handleOnChange('year', parseInt(e.target.value, 10));
          }}
        >
          <option value="" disabled={true}>
            Year
          </option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {displayCalendar === true && (
        <div className={styles['date-calendar-container']}>
          <img
            className="c-pointer"
            src={calendarIcon}
            alt="calendar"
            onClick={() => setOpenCalendar(!openCalendar)}
          />
          {openCalendar && (
            <DayPicker
              month={selectedDateInDateType}
              showOutsideDays={true}
              fromMonth={dateCalendarFromMonth}
              toMonth={dateCalendarToMonth}
              selectedDays={selectedDateInDateType}
              onDayClick={(date: Date) => {
                const selectedDate = moment(date).format(
                  COLLECTABLE_DATE_FORMAT
                );
                onChange(selectedDate);
                setOpenCalendar(false);
              }}
              pagedNavigation={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DateSelector;
